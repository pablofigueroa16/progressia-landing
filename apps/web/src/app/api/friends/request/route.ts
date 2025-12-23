import { NextRequest, NextResponse } from 'next/server'
import { prisma } from 'database'
import { verifySession, checkRateLimit } from '@/lib/auth'
import { sendFriendRequestSchema } from 'shared'

export async function POST(req: NextRequest) {
  try {
    const session = await verifySession()
    if (!session) {
      return NextResponse.json({ error: 'No autorizado' }, { status: 401 })
    }

    // Rate limiting
    const allowed = await checkRateLimit(session.id, 'friend_request', 10, 60 * 60 * 1000)
    if (!allowed) {
      return NextResponse.json(
        { error: 'Has enviado demasiadas solicitudes. Espera un momento.' },
        { status: 429 }
      )
    }

    const body = await req.json()
    const validation = sendFriendRequestSchema.safeParse(body)

    if (!validation.success) {
      return NextResponse.json(
        { error: 'Datos inválidos' },
        { status: 400 }
      )
    }

    const { receiverId } = validation.data

    // Can't add yourself
    if (receiverId === session.id) {
      return NextResponse.json(
        { error: 'No puedes enviarte una solicitud a ti mismo' },
        { status: 400 }
      )
    }

    // Check if receiver exists
    const receiver = await prisma.user.findUnique({
      where: { id: receiverId },
    })

    if (!receiver) {
      return NextResponse.json(
        { error: 'Usuario no encontrado' },
        { status: 404 }
      )
    }

    // Check if already friends
    const existingFriendship = await prisma.friendship.findFirst({
      where: {
        OR: [
          { user1Id: session.id, user2Id: receiverId },
          { user1Id: receiverId, user2Id: session.id },
        ],
      },
    })

    if (existingFriendship) {
      return NextResponse.json(
        { error: 'Ya son amigos' },
        { status: 400 }
      )
    }

    // Check for existing request
    const existingRequest = await prisma.friendRequest.findFirst({
      where: {
        OR: [
          { senderId: session.id, receiverId },
          { senderId: receiverId, receiverId: session.id },
        ],
        status: 'PENDING',
      },
    })

    if (existingRequest) {
      if (existingRequest.senderId === receiverId) {
        // They already sent us a request - auto accept
        await prisma.$transaction([
          prisma.friendRequest.update({
            where: { id: existingRequest.id },
            data: { status: 'ACCEPTED' },
          }),
          prisma.friendship.create({
            data: {
              user1Id: session.id,
              user2Id: receiverId,
            },
          }),
        ])

        return NextResponse.json({
          success: true,
          message: 'Solicitud aceptada automáticamente',
          autoAccepted: true,
        })
      }

      return NextResponse.json(
        { error: 'Ya existe una solicitud pendiente' },
        { status: 400 }
      )
    }

    // Create friend request
    await prisma.friendRequest.create({
      data: {
        senderId: session.id,
        receiverId,
      },
    })

    return NextResponse.json({
      success: true,
      message: 'Solicitud enviada',
    })
  } catch (error) {
    console.error('Send friend request error:', error)
    return NextResponse.json(
      { error: 'Error al enviar solicitud' },
      { status: 500 }
    )
  }
}

// Get pending requests
export async function GET() {
  try {
    const session = await verifySession()
    if (!session) {
      return NextResponse.json({ error: 'No autorizado' }, { status: 401 })
    }

    const requests = await prisma.friendRequest.findMany({
      where: {
        receiverId: session.id,
        status: 'PENDING',
      },
      include: {
        sender: {
          include: {
            profile: true,
          },
        },
      },
      orderBy: { createdAt: 'desc' },
    })

    return NextResponse.json({
      requests: requests.map((r) => ({
        id: r.id,
        senderId: r.senderId,
        senderUsername: r.sender.profile?.username || 'usuario',
        senderDisplayName: r.sender.profile?.displayName || 'Usuario',
        senderAvatarUrl: r.sender.profile?.avatarUrl,
        createdAt: r.createdAt,
      })),
    })
  } catch (error) {
    console.error('Get friend requests error:', error)
    return NextResponse.json(
      { error: 'Error al obtener solicitudes' },
      { status: 500 }
    )
  }
}


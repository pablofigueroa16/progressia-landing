import { NextRequest, NextResponse } from 'next/server'
import { prisma } from 'database'
import { verifySession } from '@/lib/auth'

export async function POST(req: NextRequest) {
  try {
    const session = await verifySession()
    if (!session) {
      return NextResponse.json({ error: 'No autorizado' }, { status: 401 })
    }

    const body = await req.json()
    const { requestId } = body

    if (!requestId) {
      return NextResponse.json(
        { error: 'ID de solicitud requerido' },
        { status: 400 }
      )
    }

    // Find the request
    const request = await prisma.friendRequest.findUnique({
      where: { id: requestId },
    })

    if (!request) {
      return NextResponse.json(
        { error: 'Solicitud no encontrada' },
        { status: 404 }
      )
    }

    if (request.receiverId !== session.id) {
      return NextResponse.json(
        { error: 'No tienes permiso para aceptar esta solicitud' },
        { status: 403 }
      )
    }

    if (request.status !== 'PENDING') {
      return NextResponse.json(
        { error: 'Esta solicitud ya fue procesada' },
        { status: 400 }
      )
    }

    // Accept request and create friendship
    await prisma.$transaction([
      prisma.friendRequest.update({
        where: { id: requestId },
        data: { status: 'ACCEPTED' },
      }),
      prisma.friendship.create({
        data: {
          user1Id: request.senderId,
          user2Id: request.receiverId,
        },
      }),
    ])

    return NextResponse.json({
      success: true,
      message: 'Solicitud aceptada',
    })
  } catch (error) {
    console.error('Accept friend request error:', error)
    return NextResponse.json(
      { error: 'Error al aceptar solicitud' },
      { status: 500 }
    )
  }
}


import { NextResponse } from 'next/server'
import { verifySession } from '@/lib/auth'

export async function GET() {
  try {
    const session = await verifySession()

    if (!session) {
      return NextResponse.json(
        { error: 'No autorizado' },
        { status: 401 }
      )
    }

    return NextResponse.json({ user: session })
  } catch (error) {
    console.error('Get user error:', error)
    return NextResponse.json(
      { error: 'Error al obtener el usuario' },
      { status: 500 }
    )
  }
}


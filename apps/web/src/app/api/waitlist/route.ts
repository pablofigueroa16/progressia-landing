import { NextResponse } from 'next/server'
import { db } from '@/lib/db'
import { sendWaitlistWelcomeEmail } from '@/lib/mailer'

export async function POST(request: Request) {
  try {
    const body = await request.json()
    const { name, email } = body

    // Validación básica
    if (!name || !email) {
      return NextResponse.json(
        { error: 'Nombre y correo son requeridos' },
        { status: 400 }
      )
    }

    // Validar formato de email
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/
    if (!emailRegex.test(email)) {
      return NextResponse.json(
        { error: 'Correo electrónico inválido' },
        { status: 400 }
      )
    }

    // Verificar si el email ya existe
    const existingUser = await db.waitlistUser.findUnique({
      where: { email },
    })

    if (existingUser) {
      return NextResponse.json(
        { error: 'Este correo ya está en la lista de espera' },
        { status: 400 }
      )
    }

    // Guardar en la base de datos
    const waitlistUser = await db.waitlistUser.create({
      data: {
        name,
        email,
      },
    })

    // Enviar email de bienvenida
    try {
      await sendWaitlistWelcomeEmail({
        to: email,
        name,
      })

      // Actualizar que el email fue enviado
      await db.waitlistUser.update({
        where: { id: waitlistUser.id },
        data: {
          emailSent: true,
          emailSentAt: new Date(),
        },
      })
    } catch (emailError) {
      console.error('Error enviando email de bienvenida:', emailError)
      // No fallar la request si el email falla, pero loguear el error
    }

    return NextResponse.json(
      {
        message: 'Te has unido exitosamente a la lista de espera',
        id: waitlistUser.id,
      },
      { status: 201 }
    )
  } catch (error) {
    console.error('Error en /api/waitlist:', error)
    return NextResponse.json(
      { error: 'Error interno del servidor' },
      { status: 500 }
    )
  }
}

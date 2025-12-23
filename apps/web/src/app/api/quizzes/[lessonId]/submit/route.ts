import { NextRequest, NextResponse } from 'next/server'
import { prisma } from 'database'
import { verifySession } from '@/lib/auth'
import { awardXP, checkAndAwardBadges } from '@/lib/gamification'
import { submitQuizSchema } from 'shared'

export async function POST(
  req: NextRequest,
  { params }: { params: { lessonId: string } }
) {
  try {
    const session = await verifySession()
    if (!session) {
      return NextResponse.json({ error: 'No autorizado' }, { status: 401 })
    }

    const lessonId = params.lessonId
    const body = await req.json()

    // Validate input
    const validation = submitQuizSchema.safeParse({ lessonId, answers: body.answers })
    if (!validation.success) {
      return NextResponse.json(
        { error: 'Datos inválidos' },
        { status: 400 }
      )
    }

    const { answers } = validation.data

    // Get lesson with quiz questions
    const lesson = await prisma.lesson.findUnique({
      where: { id: lessonId },
      include: {
        quizQuestions: {
          orderBy: { order: 'asc' },
        },
      },
    })

    if (!lesson) {
      return NextResponse.json({ error: 'Lección no encontrada' }, { status: 404 })
    }

    if (lesson.quizQuestions.length === 0) {
      return NextResponse.json({ error: 'Esta lección no tiene quiz' }, { status: 400 })
    }

    // Grade the quiz
    const results: {
      questionId: string
      isCorrect: boolean
      correctAnswer: any
      userAnswer: any
    }[] = []

    let correctCount = 0

    for (const question of lesson.quizQuestions) {
      const userAnswer = answers.find((a) => a.questionId === question.id)?.answer
      const correctAnswer = question.correctAnswer

      let isCorrect = false

      if (question.type === 'ORDER_STEPS') {
        // Compare arrays
        isCorrect = JSON.stringify(userAnswer) === JSON.stringify(correctAnswer)
      } else {
        // Simple comparison
        isCorrect = userAnswer === correctAnswer
      }

      if (isCorrect) correctCount++

      results.push({
        questionId: question.id,
        isCorrect,
        correctAnswer,
        userAnswer,
      })
    }

    const totalQuestions = lesson.quizQuestions.length
    const score = Math.round((correctCount / totalQuestions) * 100)
    const isPerfect = correctCount === totalQuestions
    const passed = score >= 70

    // Calculate XP
    let xpEarned = 0

    if (passed) {
      // Award quiz pass XP
      const passXP = await awardXP(session.id, 'QUIZ_PASS', undefined, {
        lessonId,
        score,
      })
      xpEarned = passXP.xpAwarded

      if (isPerfect) {
        // Award perfect quiz bonus
        const perfectXP = await awardXP(session.id, 'QUIZ_PERFECT', undefined, {
          lessonId,
        })
        xpEarned += perfectXP.xpAwarded
      }
    }

    // Save quiz attempt
    await prisma.quizAttempt.create({
      data: {
        userId: session.id,
        lessonId,
        answers: answers as any,
        score,
        isPerfect,
        xpEarned,
      },
    })

    // Check for new badges (Quiz Master)
    const newBadges = await checkAndAwardBadges(session.id)

    return NextResponse.json({
      success: true,
      score,
      isPerfect,
      passed,
      xpEarned,
      correctAnswers: correctCount,
      totalQuestions,
      results,
      newBadges,
    })
  } catch (error) {
    console.error('Submit quiz error:', error)
    return NextResponse.json(
      { error: 'Error al enviar el quiz' },
      { status: 500 }
    )
  }
}


import { NextRequest, NextResponse } from 'next/server'
import { prisma } from 'database'
import { verifySession } from '@/lib/auth'
import { awardXP, updateStreak, checkAndAwardBadges } from '@/lib/gamification'

export async function POST(
  req: NextRequest,
  { params }: { params: { id: string } }
) {
  try {
    const session = await verifySession()
    if (!session) {
      return NextResponse.json({ error: 'No autorizado' }, { status: 401 })
    }

    const lessonId = params.id
    const body = await req.json()
    const { timeSpent } = body

    // Check if lesson exists
    const lesson = await prisma.lesson.findUnique({
      where: { id: lessonId },
      include: {
        unit: {
          include: {
            lessons: { select: { id: true } },
            level: {
              include: {
                units: {
                  include: {
                    lessons: { select: { id: true } },
                  },
                },
              },
            },
          },
        },
      },
    })

    if (!lesson) {
      return NextResponse.json({ error: 'Lección no encontrada' }, { status: 404 })
    }

    // Check if already completed
    const existingProgress = await prisma.userLessonProgress.findUnique({
      where: {
        userId_lessonId: {
          userId: session.id,
          lessonId,
        },
      },
    })

    if (existingProgress?.completed) {
      return NextResponse.json({
        success: true,
        alreadyCompleted: true,
        xpEarned: 0,
      })
    }

    // Mark lesson as completed
    await prisma.userLessonProgress.upsert({
      where: {
        userId_lessonId: {
          userId: session.id,
          lessonId,
        },
      },
      update: {
        completed: true,
        completedAt: new Date(),
        xpEarned: lesson.xpReward,
        timeSpent: timeSpent || 0,
      },
      create: {
        userId: session.id,
        lessonId,
        completed: true,
        completedAt: new Date(),
        xpEarned: lesson.xpReward,
        timeSpent: timeSpent || 0,
      },
    })

    // Award XP for lesson completion
    const xpResult = await awardXP(session.id, 'LESSON_COMPLETE', lesson.xpReward, {
      lessonId,
      lessonTitle: lesson.title,
    })

    // Update streak
    const streakResult = await updateStreak(session.id)

    // Check for unit completion
    const userLessonProgress = await prisma.userLessonProgress.findMany({
      where: {
        userId: session.id,
        completed: true,
        lesson: {
          unitId: lesson.unitId,
        },
      },
    })

    let unitCompleteBonus = 0
    if (userLessonProgress.length === lesson.unit.lessons.length) {
      const unitBonus = await awardXP(session.id, 'UNIT_COMPLETE', undefined, {
        unitId: lesson.unitId,
        unitTitle: lesson.unit.title,
      })
      unitCompleteBonus = unitBonus.xpAwarded
    }

    // Check for level completion
    let levelCompleteBonus = 0
    const allLevelLessons = lesson.unit.level.units.flatMap((u) => u.lessons)
    const completedLevelProgress = await prisma.userLessonProgress.count({
      where: {
        userId: session.id,
        completed: true,
        lessonId: { in: allLevelLessons.map((l) => l.id) },
      },
    })

    if (completedLevelProgress === allLevelLessons.length) {
      const levelBonus = await awardXP(session.id, 'LEVEL_COMPLETE', undefined, {
        levelId: lesson.unit.level.id,
        levelNumber: lesson.unit.level.number,
      })
      levelCompleteBonus = levelBonus.xpAwarded
    }

    // Check for new badges
    const newBadges = await checkAndAwardBadges(session.id)

    return NextResponse.json({
      success: true,
      xpEarned: xpResult.xpAwarded,
      totalXP: xpResult.newTotal,
      bonuses: {
        unitComplete: unitCompleteBonus,
        levelComplete: levelCompleteBonus,
        streakBonus: streakResult.bonusXP,
      },
      streak: {
        current: streakResult.currentStreak,
        increased: streakResult.streakIncreased,
      },
      newBadges,
    })
  } catch (error) {
    console.error('Complete lesson error:', error)
    return NextResponse.json(
      { error: 'Error al completar la lección' },
      { status: 500 }
    )
  }
}


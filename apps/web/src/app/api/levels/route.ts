import { NextResponse } from 'next/server'
import { prisma } from 'database'
import { verifySession } from '@/lib/auth'

export async function GET() {
  try {
    const session = await verifySession()
    
    if (!session) {
      return NextResponse.json({ error: 'No autorizado' }, { status: 401 })
    }

    // Get all published levels with their units
    const levels = await prisma.level.findMany({
      where: { isPublished: true },
      include: {
        units: {
          where: { isPublished: true },
          include: {
            lessons: {
              where: { isPublished: true },
              select: { id: true },
            },
          },
          orderBy: { order: 'asc' },
        },
      },
      orderBy: { order: 'asc' },
    })

    // Get user progress
    const userProgress = await prisma.userLessonProgress.findMany({
      where: {
        userId: session.id,
        completed: true,
      },
      select: { lessonId: true },
    })

    const completedLessonIds = new Set(userProgress.map((p) => p.lessonId))

    // Check if user is Pro
    const subscription = await prisma.subscription.findUnique({
      where: { userId: session.id },
    })
    const isPro = subscription?.plan !== 'FREE' && subscription?.status === 'ACTIVE'

    // Calculate progress for each level
    const levelsWithProgress = levels.map((level, levelIndex) => {
      const totalLessons = level.units.reduce(
        (sum, unit) => sum + unit.lessons.length,
        0
      )
      const completedLessons = level.units.reduce(
        (sum, unit) =>
          sum + unit.lessons.filter((l) => completedLessonIds.has(l.id)).length,
        0
      )

      // Previous level must be completed (or it's the first level)
      const previousLevel = levelIndex > 0 ? levels[levelIndex - 1] : null
      const previousLevelComplete = previousLevel
        ? previousLevel.units.every((unit) =>
            unit.lessons.every((l) => completedLessonIds.has(l.id))
          )
        : true

      const isLocked = level.isPro && !isPro || !previousLevelComplete

      return {
        id: level.id,
        number: level.number,
        title: level.title,
        description: level.description,
        imageUrl: level.imageUrl,
        isPro: level.isPro,
        isLocked,
        progress: totalLessons > 0 ? Math.round((completedLessons / totalLessons) * 100) : 0,
        unitsCompleted: level.units.filter((unit) =>
          unit.lessons.every((l) => completedLessonIds.has(l.id))
        ).length,
        totalUnits: level.units.length,
      }
    })

    return NextResponse.json({ levels: levelsWithProgress })
  } catch (error) {
    console.error('Get levels error:', error)
    return NextResponse.json(
      { error: 'Error al obtener los niveles' },
      { status: 500 }
    )
  }
}


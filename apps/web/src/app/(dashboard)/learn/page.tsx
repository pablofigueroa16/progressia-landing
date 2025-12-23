'use client'

import { useEffect, useMemo, useState } from 'react'
import Link from 'next/link'
import { motion } from 'framer-motion'
import {
  Lock,
  CheckCircle2,
  Flame,
  Target,
  Play,
  Star,
} from 'lucide-react'
import { Card, CardContent } from '@/components/ui/card'
import { cn } from '@/lib/utils'
import { BEGINNER_LEVEL } from '@/lib/learn/beginner-level'
import {
  getCompletedBeginnerLessonIds,
  LEARN_PROGRESS_EVENT,
} from '@/lib/learn/progress-storage'

function getSequentialProgressIndex(lessonIds: string[], completedIds: Set<string>) {
  for (let i = 0; i < lessonIds.length; i++) {
    if (!completedIds.has(lessonIds[i])) return i
  }
  return lessonIds.length
}

export default function LearnPage() {
  const [completedIds, setCompletedIds] = useState<string[]>([])

  useEffect(() => {
    const refresh = () => setCompletedIds(getCompletedBeginnerLessonIds())
    refresh()

    window.addEventListener('focus', refresh)
    window.addEventListener(LEARN_PROGRESS_EVENT, refresh)
    return () => {
      window.removeEventListener('focus', refresh)
      window.removeEventListener(LEARN_PROGRESS_EVENT, refresh)
    }
  }, [])

  const lessons = BEGINNER_LEVEL.lessons
  const completedSet = useMemo(() => new Set(completedIds), [completedIds])
  const lessonIds = useMemo(() => lessons.map((l) => l.id), [lessons])
  const currentIndex = useMemo(
    () => getSequentialProgressIndex(lessonIds, completedSet),
    [lessonIds, completedSet]
  )

  const progressPct = (completedSet.size / lessons.length) * 100
  const currentLesson = lessons[currentIndex]
  const currentLessonId = currentLesson?.id

  return (
    <div className="min-h-screen bg-dark-950 pb-24 md:pb-8">
      {/* Background */}
      <div className="fixed inset-0 bg-[radial-gradient(ellipse_at_top,_var(--tw-gradient-stops))] from-brand-900/10 via-dark-950 to-dark-950 pointer-events-none" />

      <div className="relative z-10 max-w-4xl mx-auto px-4 py-8">
        {/* Header */}
        <div className="mb-8">
          <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4 mb-6">
            <div>
              <h1 className="text-3xl font-bold text-white mb-2">Ruta de Progreso</h1>
              <p className="text-gray-400">Estilo Duolingo: completa una lección a la vez</p>
            </div>
            <div className="flex items-center gap-4">
              <div className="flex items-center gap-2 px-4 py-2 rounded-lg bg-accent-orange/10 border border-accent-orange/20">
                <Flame className="w-5 h-5 text-accent-orange" />
                <span className="text-accent-orange font-bold">Racha</span>
              </div>
            </div>
          </div>

          <Card className="bg-gradient-to-r from-dark-800 to-dark-900 border-dark-700">
            <CardContent className="p-6">
              <div className="flex items-start gap-4">
                <div className="w-12 h-12 rounded-xl bg-brand-500/20 flex items-center justify-center flex-shrink-0">
                  <Target className="w-6 h-6 text-brand-500" />
                </div>
                <div className="flex-1 min-w-0">
                  <div className="flex flex-wrap items-center gap-3 mb-2">
                    <h2 className="font-semibold text-white">{BEGINNER_LEVEL.label}</h2>
                    <span className="text-sm text-gray-500">
                      {completedSet.size}/{lessons.length} completadas
                    </span>
                  </div>
                  <p className="text-sm text-gray-400 mb-4">{BEGINNER_LEVEL.objective}</p>
                  <div className="duo-progress">
                    <div
                      className="duo-progress-bar"
                      style={{ width: `${progressPct}%` }}
                    />
                  </div>

                  {currentLessonId && (
                    <div className="mt-4 text-sm text-gray-400">
                      Siguiente: <span className="text-white font-medium">{currentLesson.sublevel} — {currentLesson.title}</span>
                    </div>
                  )}
                </div>
              </div>
            </CardContent>
          </Card>
        </div>

        {/* Vertical Path */}
        <div
          className="lesson-path px-1 sm:px-2 py-6"
          style={{ '--progress': `${progressPct}%` } as React.CSSProperties}
        >
          {lessons.map((lesson, index) => {
            const isCompleted = index < currentIndex
            const isCurrent = index === currentIndex
            const isLocked = index > currentIndex

            const href = isLocked ? '#' : `/learn/lesson/${lesson.id}`

            return (
              <motion.div
                key={lesson.id}
                initial={{ opacity: 0, scale: 0.8 }}
                animate={{ opacity: 1, scale: 1 }}
                transition={{ delay: index * 0.05, type: 'spring' }}
                className="relative flex justify-center py-6"
              >
                {/* Node */}
                <Link
                  href={href}
                  onClick={(e) => isLocked && e.preventDefault()}
                  aria-disabled={isLocked}
                  className={cn(isLocked && 'cursor-not-allowed')}
                >
                  <motion.div
                    whileHover={!isLocked ? { scale: 1.1 } : undefined}
                    whileTap={!isLocked ? { scale: 0.95 } : undefined}
                    className={cn(
                      'lesson-node',
                      isCompleted && 'completed',
                      isCurrent && 'current',
                      isLocked && 'locked'
                    )}
                  >
                    {isCompleted ? (
                      <CheckCircle2 className="w-9 h-9" />
                    ) : isCurrent ? (
                      <Play className="w-9 h-9 ml-1" />
                    ) : (
                      <Lock className="w-7 h-7" />
                    )}
                  </motion.div>
                </Link>

                {/* Bubble card */}
                <div
                  className={cn(
                    'absolute top-1/2 -translate-y-1/2 w-[min(320px,calc(50%-60px))]',
                    index % 2 === 0 ? 'right-1/2 mr-16 text-right' : 'left-1/2 ml-16 text-left'
                  )}
                >
                  <Link
                    href={href}
                    onClick={(e) => isLocked && e.preventDefault()}
                    className={cn(
                      'block rounded-2xl border-2 border-b-4 px-4 py-3 transition-all duration-200',
                      isLocked
                        ? 'bg-dark-800/40 border-dark-700 opacity-50 cursor-not-allowed'
                        : isCurrent
                        ? 'bg-brand-500/10 border-brand-500 hover:bg-brand-500/20 hover:scale-[1.02]'
                        : isCompleted
                        ? 'bg-dark-800 border-brand-600 hover:bg-dark-700 hover:scale-[1.02]'
                        : 'bg-dark-800/70 border-dark-700'
                    )}
                  >
                    <div className="flex items-center gap-2 justify-between">
                      <span className={cn(
                        'text-xs font-bold',
                        isCurrent ? 'text-brand-400' : isCompleted ? 'text-brand-500' : 'text-gray-500'
                      )}>
                        {`MISIÓN ${lesson.sublevel}`}
                      </span>
                      <span className={cn(
                        'inline-flex items-center gap-1 px-2 py-0.5 rounded-full text-xs font-bold',
                        isCompleted
                          ? 'bg-brand-500/20 text-brand-400'
                          : isCurrent
                          ? 'bg-yellow-500/20 text-yellow-400'
                          : 'bg-dark-700 text-gray-500'
                      )}>
                        <Star className="w-3 h-3" />
                        +{lesson.xpReward + lesson.quizXP} XP
                      </span>
                    </div>
                    <div className="mt-1.5 font-bold text-white text-base">{lesson.title}</div>
                    <div className="text-xs text-gray-500 mt-1 flex items-center gap-2">
                      <span>10 preguntas</span>
                      {isCompleted && (
                        <span className="text-brand-400 font-medium">✓ Completado</span>
                      )}
                      {isCurrent && (
                        <span className="text-yellow-400 font-medium">→ Siguiente</span>
                      )}
                    </div>
                  </Link>
                </div>
              </motion.div>
            )
          })}
        </div>
      </div>
    </div>
  )
}


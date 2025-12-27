'use client'

import { useMemo, useState, useEffect } from 'react'
import { useRouter, useSearchParams } from 'next/navigation'
import { motion, AnimatePresence } from 'framer-motion'
import {
  X,
  Check,
  Zap,
  Trophy,
  Star,
  Sparkles,
  Heart,
  HeartCrack,
  Crown,
} from 'lucide-react'
import { cn } from '@/lib/utils'
import { useAuth } from '@/components/providers'
import { getBeginnerLessonById } from '@/lib/learn/beginner-level'
import { markBeginnerLessonCompleted } from '@/lib/learn/progress-storage'
import { PRO_PLAN_BENEFITS } from '@/lib/billing/pro-benefits'
import { UpgradeSuccessModal } from '@/components/billing/upgrade-success-modal'

const MAX_LIVES = 3

// Mensajes motivacionales estilo Duolingo
const SUCCESS_MESSAGES = [
  { text: '¡Genial! 🎉', subtitle: 'Sigue así' },
  { text: '¡Increíble! 🔥', subtitle: 'Eres imparable' },
  { text: '¡Correcto! ⭐', subtitle: 'Muy bien' },
  { text: '¡Perfecto! 💪', subtitle: 'Lo dominas' },
  { text: '¡Excelente! 🚀', subtitle: 'A por más' },
]

const ERROR_MESSAGES = [
  { text: '¡Casi! 😅', subtitle: 'Perdiste una vida' },
  { text: 'No exactamente 🤔', subtitle: '-1 vida' },
  { text: 'Ups... 💭', subtitle: 'Vida perdida' },
]

const PRO_ERROR_MESSAGES: typeof SUCCESS_MESSAGES = [
  { text: '¡Casi! 😅', subtitle: 'Sin penalización por ser PRO' },
  { text: 'No exactamente 🤔', subtitle: 'Sigue intentando' },
  { text: 'Ups... 💭', subtitle: 'No pasa nada, tienes vidas infinitas' },
]

const FINAL_SUCCESS_MESSAGES = [
  '¡Eres una máquina! 🏆',
  '¡Lo lograste! 🎊',
  '¡Increíble trabajo! 🌟',
  '¡Misión cumplida! 🚀',
]

function getRandomMessage(messages: typeof SUCCESS_MESSAGES) {
  return messages[Math.floor(Math.random() * messages.length)]
}

// Confetti component
function Confetti() {
  const colors = ['#58CC02', '#1CB0F6', '#FF9600', '#FF4B4B', '#CE82FF']
  const confettiPieces = Array.from({ length: 50 }, (_, i) => ({
    id: i,
    left: Math.random() * 100,
    delay: Math.random() * 2,
    color: colors[Math.floor(Math.random() * colors.length)],
    size: Math.random() * 10 + 5,
  }))

  return (
    <div className="fixed inset-0 pointer-events-none z-50 overflow-hidden">
      {confettiPieces.map((piece) => (
        <div
          key={piece.id}
          className="confetti rounded-sm"
          style={{
            left: `${piece.left}%`,
            animationDelay: `${piece.delay}s`,
            backgroundColor: piece.color,
            width: piece.size,
            height: piece.size,
          }}
        />
      ))}
    </div>
  )
}

// Hearts display component
function LivesDisplay({
  lives,
  maxLives,
  isPro,
}: {
  lives: number
  maxLives: number
  isPro?: boolean
}) {
  if (isPro) {
    return (
      <div className="inline-flex items-center gap-2 px-3 py-1.5 rounded-full bg-gradient-to-r from-accent-purple/20 to-brand-500/20 border border-accent-purple/30">
        <Crown className="w-4 h-4 text-accent-purple" />
        <span className="text-sm font-bold text-white">Vidas infinitas</span>
        <span className="text-sm font-black text-accent-purple">∞</span>
      </div>
    )
  }

  return (
    <div className="flex items-center gap-1">
      {Array.from({ length: maxLives }).map((_, i) => (
        <motion.div
          key={i}
          initial={false}
          animate={i >= lives ? { scale: [1, 1.3, 0.8], opacity: [1, 1, 0.3] } : { scale: 1, opacity: 1 }}
          transition={{ duration: 0.3 }}
        >
          <Heart
            className={cn(
              'w-6 h-6 transition-colors',
              i < lives
                ? 'text-red-500 fill-red-500'
                : 'text-gray-600 fill-gray-700'
            )}
          />
        </motion.div>
      ))}
    </div>
  )
}

type Phase = 'content' | 'quiz' | 'results' | 'gameOver'

export default function LessonPage({ params }: { params: { id: string } }) {
  const router = useRouter()
  const searchParams = useSearchParams()
  const { user, refresh } = useAuth()
  const [phase, setPhase] = useState<Phase>('content')
  const [lives, setLives] = useState(MAX_LIVES)
  const [currentQuestion, setCurrentQuestion] = useState(0)
  const [answers, setAnswers] = useState<Record<string, number>>({})
  const [showFeedback, setShowFeedback] = useState(false)
  const [feedbackMessage, setFeedbackMessage] = useState<{ text: string; subtitle: string } | null>(null)
  const [showConfetti, setShowConfetti] = useState(false)
  const [isProModalOpen, setIsProModalOpen] = useState(false)
  const [isSubscribing, setIsSubscribing] = useState(false)
  const [showUpgradeThanks, setShowUpgradeThanks] = useState(false)
  const [results, setResults] = useState<{
    correct: number
    total: number
    xpEarned: number
    isPerfect: boolean
  } | null>(null)

  const lesson = useMemo(() => getBeginnerLessonById(params.id), [params.id])
  const isPro = !!user?.isPro
  const upgraded = searchParams.get('upgraded') === 'true'

  // Reset confetti after animation
  useEffect(() => {
    if (showConfetti) {
      const timer = setTimeout(() => setShowConfetti(false), 3000)
      return () => clearTimeout(timer)
    }
  }, [showConfetti])

  // PRO: vidas infinitas y evita quedarse en gameOver por estados anteriores
  useEffect(() => {
    if (!isPro) return
    if (lives !== MAX_LIVES) setLives(MAX_LIVES)
    if (phase === 'gameOver') setPhase('quiz')
  }, [isPro, lives, phase])

  // Mostrar agradecimiento al volver del checkout
  useEffect(() => {
    if (!upgraded) return
    // Para evitar doble-render del modal (content->quiz), llevamos al usuario a quiz
    // y mostramos el modal una sola vez allí.
    setPhase('quiz')
    setLives(MAX_LIVES)
    setShowUpgradeThanks(true)
    refresh()
    const t = setTimeout(() => refresh(), 1500)
    return () => clearTimeout(t)
  }, [upgraded, refresh])

  if (!lesson) {
    return (
      <div className="h-[100dvh] bg-dark-950 flex items-center justify-center px-4">
        <div className="bg-dark-800 border-2 border-dark-600 rounded-2xl p-8 max-w-md w-full text-center">
          <div className="text-6xl mb-4">😕</div>
          <h1 className="text-2xl font-bold text-white mb-2">Lección no encontrada</h1>
          <p className="text-gray-400 mb-6">Esta lección no existe o fue movida.</p>
          <button
            onClick={() => router.push('/learn')}
            className="duo-btn w-full"
          >
            Volver a Aprender
          </button>
        </div>
      </div>
    )
  }

  const totalQuestions = lesson.quiz.length
  const question = lesson.quiz[currentQuestion]
  const progress = totalQuestions ? ((currentQuestion) / totalQuestions) * 100 : 0

  const handleAnswer = (answerIndex: number) => {
    const isCorrectAnswer = answerIndex === question.correctAnswer
    setAnswers({ ...answers, [question.id]: answerIndex })
    setFeedbackMessage(
      getRandomMessage(
        isCorrectAnswer ? SUCCESS_MESSAGES : isPro ? PRO_ERROR_MESSAGES : ERROR_MESSAGES
      )
    )
    setShowFeedback(true)

    // Si es incorrecta, restar una vida
    if (!isCorrectAnswer && !isPro) {
      const newLives = lives - 1
      setLives(newLives)

      // Si se quedó sin vidas, ir a game over
      if (newLives <= 0) {
        setTimeout(() => {
          setPhase('gameOver')
        }, 1500)
      }
    }
  }

  const isCorrect = () => answers[question.id] === question.correctAnswer

  const nextQuestion = () => {
    // Si no tiene vidas, no continuar (ya se manejó en handleAnswer)
    if (!isPro && lives <= 0) return

    setShowFeedback(false)
    setFeedbackMessage(null)

    if (currentQuestion < totalQuestions - 1) {
      setCurrentQuestion(currentQuestion + 1)
      return
    }

    // Calculate results
    const correct = lesson.quiz.filter((q) => answers[q.id] === q.correctAnswer).length
    const isPerfect = correct === totalQuestions
    const xpEarned = lesson.xpReward + lesson.quizXP + (isPerfect ? lesson.perfectBonus : 0)

    setResults({ correct, total: totalQuestions, xpEarned, isPerfect })
    markBeginnerLessonCompleted(lesson.id)
    setShowConfetti(true)
    setPhase('results')
  }

  const handleSubscribePro = async () => {
    setIsSubscribing(true)
    try {
      const res = await fetch('/api/billing/create-checkout-session', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          plan: 'PRO_MONTHLY',
          successPath: `/learn/lesson/${params.id}?upgraded=true`,
          cancelPath: `/learn/lesson/${params.id}?upgradeCanceled=true`,
        }),
      })

      if (res.status === 401) {
        router.push('/pricing')
        return
      }

      const data = await res.json()
      if (data.url) {
        window.location.href = data.url
      }
    } catch (error) {
      console.error('Checkout error:', error)
    } finally {
      setIsSubscribing(false)
    }
  }

  // ==================== GAME OVER PHASE ====================
  if (phase === 'gameOver') {
    return (
      <div className="h-[100dvh] bg-dark-950 flex items-center justify-center px-4 overflow-hidden">
        <motion.div
          initial={{ scale: 0.8, opacity: 0 }}
          animate={{ scale: 1, opacity: 1 }}
          transition={{ type: 'spring', duration: 0.6 }}
          className="w-full max-w-md text-center"
        >
          {/* Broken heart animation */}
          <motion.div
            initial={{ y: -30, opacity: 0 }}
            animate={{ y: 0, opacity: 1 }}
            transition={{ delay: 0.2 }}
            className="mb-6"
          >
            <motion.div
              animate={{ scale: [1, 1.1, 1] }}
              transition={{ duration: 0.5, repeat: 2 }}
              className="w-32 h-32 mx-auto rounded-full bg-gradient-to-br from-red-500 to-red-700 flex items-center justify-center shadow-[0_0_60px_rgba(239,68,68,0.4)]"
            >
              <HeartCrack className="w-16 h-16 text-white" />
            </motion.div>
          </motion.div>

          {/* Message */}
          <motion.div
            initial={{ y: 20, opacity: 0 }}
            animate={{ y: 0, opacity: 1 }}
            transition={{ delay: 0.3 }}
          >
            <h1 className="text-4xl font-black text-white mb-2">
              ¡Sin vidas! 💔
            </h1>
            <p className="text-gray-400 text-lg mb-2">
              Has perdido todas tus vidas
            </p>
            <p className="text-gray-500 text-sm">
              Respondiste {currentQuestion} de {totalQuestions} preguntas
            </p>
          </motion.div>

          {/* Stats */}
          <motion.div
            initial={{ scale: 0 }}
            animate={{ scale: 1 }}
            transition={{ delay: 0.4, type: 'spring' }}
            className="my-8"
          >
            <div className="flex justify-center gap-2 mb-4">
              {Array.from({ length: MAX_LIVES }).map((_, i) => (
                <Heart
                  key={i}
                  className="w-10 h-10 text-gray-700 fill-gray-800"
                />
              ))}
            </div>
            <p className="text-red-400 font-medium">0 vidas restantes</p>
          </motion.div>

          {/* Action buttons */}
          <motion.div
            initial={{ y: 20, opacity: 0 }}
            animate={{ y: 0, opacity: 1 }}
            transition={{ delay: 0.5 }}
            className="space-y-3"
          >
            <button
              onClick={() => {
                setPhase('content')
                setLives(MAX_LIVES)
                setCurrentQuestion(0)
                setAnswers({})
                setShowFeedback(false)
                setFeedbackMessage(null)
                setResults(null)
              }}
              className="duo-btn w-full text-center justify-center"
              style={{ background: '#ef4444', boxShadow: '0 4px 0 #b91c1c' }}
            >
              INTENTAR DE NUEVO
            </button>

            {!user?.isPro && (
              <button
                onClick={() => setIsProModalOpen(true)}
                className="duo-btn w-full text-center justify-center"
                style={{
                  background: 'linear-gradient(to bottom, #a855f7 0%, #7c3aed 100%)',
                  boxShadow: '0 4px 0 #5b21b6, 0 6px 10px rgba(0,0,0,0.15)',
                }}
              >
                <span className="inline-flex items-center justify-center gap-2">
                  <Crown className="w-5 h-5" />
                  CONTINUAR CON PRO
                </span>
              </button>
            )}

            <button
              onClick={() => router.push('/learn')}
              className="duo-btn outline w-full text-center justify-center"
            >
              VOLVER A LA RUTA
            </button>
          </motion.div>
        </motion.div>

        <AnimatePresence>
          {isProModalOpen && (
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              className="fixed inset-0 z-50"
            >
              {/* Backdrop */}
              <button
                aria-label="Cerrar modal"
                onClick={() => setIsProModalOpen(false)}
                className="absolute inset-0 bg-black/70 backdrop-blur-sm"
              />

              {/* Modal */}
              <div className="absolute inset-0 flex items-center justify-center px-4 py-4">
                <motion.div
                  initial={{ y: 20, scale: 0.98, opacity: 0 }}
                  animate={{ y: 0, scale: 1, opacity: 1 }}
                  exit={{ y: 20, scale: 0.98, opacity: 0 }}
                  transition={{ type: 'spring', duration: 0.45 }}
                  className="w-full max-w-lg"
                >
                  <div className="bg-gradient-to-br from-brand-500/20 to-accent-purple/20 border-2 border-brand-500/30 rounded-3xl p-6 sm:p-7 text-left shadow-[0_0_80px_rgba(168,85,247,0.15)] max-h-[calc(100dvh-2rem)] overflow-hidden flex flex-col">
                    <div className="flex items-start justify-between gap-4">
                      <div>
                        <div className="inline-flex items-center gap-2 text-brand-300 font-semibold">
                          <Crown className="w-5 h-5" />
                          Progressia Pro
                        </div>
                        <h2 className="text-2xl sm:text-3xl font-black text-white mt-2">
                          Continúa esta lección sin quedarte sin vidas
                        </h2>
                      </div>

                      <button
                        onClick={() => setIsProModalOpen(false)}
                        className="p-2 rounded-xl text-gray-300 hover:text-white hover:bg-white/10 transition-colors"
                        aria-label="Cerrar"
                      >
                        <X className="w-6 h-6" />
                      </button>
                    </div>

                    <p className="text-gray-300 mt-3">
                      Suscríbete a Pro para desbloquear todo el contenido y seguir avanzando sin interrupciones.
                    </p>

                    {/* Scroll area (mantener botones visibles dentro de 100dvh) */}
                    <div className="mt-5 flex-1 min-h-0 overflow-auto pr-1">
                      <div className="text-sm font-semibold text-brand-300 mb-3">
                        Beneficios de Pro
                      </div>
                      <ul className="space-y-3">
                        {PRO_PLAN_BENEFITS.map((benefit) => (
                          <li key={benefit} className="flex items-start gap-3">
                            <div className="mt-0.5 w-6 h-6 rounded-lg bg-accent-purple/20 text-accent-purple flex items-center justify-center flex-shrink-0">
                              <Check className="w-4 h-4" />
                            </div>
                            <span className="text-gray-200">{benefit}</span>
                          </li>
                        ))}
                      </ul>
                    </div>

                    <div className="mt-6 space-y-3 flex-shrink-0">
                      <button
                        onClick={handleSubscribePro}
                        disabled={isSubscribing}
                        className={cn(
                          'duo-btn w-full text-center justify-center',
                          isSubscribing && 'opacity-80 pointer-events-none'
                        )}
                        style={{
                          background: 'linear-gradient(to bottom, #a855f7 0%, #7c3aed 100%)',
                          boxShadow: '0 4px 0 #5b21b6, 0 6px 10px rgba(0,0,0,0.15)',
                        }}
                      >
                        {isSubscribing ? 'CARGANDO...' : 'SUSCRIBIRSE'}
                      </button>

                      <button
                        onClick={() => setIsProModalOpen(false)}
                        className="duo-btn outline w-full text-center justify-center"
                      >
                        VOLVER
                      </button>
                    </div>

                    <p className="text-xs text-gray-400 mt-4 flex-shrink-0">
                      Al suscribirte, serás redirigido a un checkout seguro. Puedes cancelar cuando quieras.
                    </p>
                  </div>
                </motion.div>
              </div>
            </motion.div>
          )}
        </AnimatePresence>
      </div>
    )
  }

  // ==================== CONTENT PHASE ====================
  if (phase === 'content') {
    return (
      <div className="h-[100dvh] bg-dark-950 flex flex-col overflow-hidden">
        {/* Header */}
        <header className="bg-dark-900 border-b-2 border-dark-700 flex-shrink-0">
          <div className="max-w-4xl mx-auto px-4 h-16 flex items-center justify-between">
            <button
              onClick={() => router.push('/learn')}
              className="flex items-center gap-2 text-gray-400 hover:text-white transition-colors"
            >
              <X className="w-6 h-6" />
              <span className="hidden sm:inline font-medium">Salir</span>
            </button>

            <div className="flex items-center gap-3">
              <LivesDisplay lives={lives} maxLives={MAX_LIVES} isPro={isPro} />
            </div>

            <div className="w-20" /> {/* Spacer for centering */}
          </div>
        </header>

        {/* Content */}
        <main className="flex-1 px-4 flex items-center justify-center">
          <div className="w-full max-w-md sm:max-w-lg lg:max-w-xl">
            {/* Mission card */}
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              className="bg-gradient-to-br from-brand-500/20 to-brand-600/10 border-2 border-brand-500/30 rounded-3xl p-6 sm:p-8"
            >
              <div className="flex items-center gap-3 sm:gap-4 mb-3">
                <div className="w-12 h-12 sm:w-14 sm:h-14 rounded-xl bg-brand-500 flex items-center justify-center">
                  <Zap className="w-7 h-7 sm:w-8 sm:h-8 text-white" />
                </div>
                <div>
                  <div className="text-sm sm:text-base text-brand-400 font-semibold">MISIÓN {lesson.sublevel}</div>
                  <div className="text-xl sm:text-2xl font-bold text-white">{lesson.title}</div>
                </div>
              </div>
              <p className="text-gray-400 text-sm sm:text-base">
                Completa el quiz de 10 preguntas para desbloquear la siguiente lección. ¡Tienes {MAX_LIVES} vidas!
              </p>
              <div className="flex items-center gap-4 mt-5">
                <span className="inline-flex items-center gap-1.5 px-3 py-1.5 rounded-full bg-yellow-500/20 text-yellow-400 text-sm sm:text-base font-medium">
                  <Star className="w-4 h-4 sm:w-5 sm:h-5" />
                  +{lesson.xpReward + lesson.quizXP} XP
                </span>
                <span className="inline-flex items-center gap-1.5 px-3 py-1.5 rounded-full bg-purple-500/20 text-purple-400 text-sm sm:text-base font-medium">
                  <Trophy className="w-4 h-4 sm:w-5 sm:h-5" />
                  Bonus: +{lesson.perfectBonus}
                </span>
              </div>
            </motion.div>
          </div>
        </main>

        {/* Footer */}
        <footer className="bg-dark-900 border-t-2 border-dark-700 p-4 flex-shrink-0">
          <div className="max-w-3xl mx-auto">
            <button
              onClick={() => setPhase('quiz')}
              className="duo-btn w-full text-center justify-center"
            >
              ¡EMPEZAR QUIZ!
            </button>
          </div>
        </footer>
      </div>
    )
  }

  // ==================== QUIZ PHASE ====================
  if (phase === 'quiz') {
    return (
      <div className="h-[100dvh] bg-dark-950 flex flex-col overflow-hidden">
        <UpgradeSuccessModal
          open={showUpgradeThanks}
          onClose={() => {
            setShowUpgradeThanks(false)
            setPhase('quiz')
            setLives(MAX_LIVES)
            router.replace(`/learn/lesson/${params.id}`)
          }}
          onComplete={() => {
            setShowUpgradeThanks(false)
            setPhase('quiz')
            setLives(MAX_LIVES)
            router.replace(`/learn/lesson/${params.id}`)
          }}
          completeLabel="Continuar la lección"
          description="¡Bienvenido a Pro! Vidas infinitas activadas para que puedas continuar sin interrupciones."
        />

        {/* Header */}
        <header className="bg-dark-900 border-b-2 border-dark-700 flex-shrink-0">
          <div className="max-w-2xl mx-auto px-4 py-4">
            <div className="flex items-center justify-between mb-3">
              <button
                onClick={() => router.push('/learn')}
                className="text-gray-400 hover:text-white transition-colors"
              >
                <X className="w-7 h-7" />
              </button>

              {/* Progress bar */}
              <div className="flex-1 mx-4">
                <div className="duo-progress">
                  <motion.div
                    className="duo-progress-bar"
                    initial={{ width: 0 }}
                    animate={{ width: `${progress}%` }}
                    transition={{ duration: 0.5 }}
                  />
                </div>
              </div>

              <LivesDisplay lives={lives} maxLives={MAX_LIVES} isPro={isPro} />
            </div>
          </div>
        </header>

        {/* Question */}
        <main className="flex-1 flex flex-col justify-center px-4 py-6 overflow-hidden">
          <AnimatePresence mode="wait">
            <motion.div
              key={question.id}
              initial={{ opacity: 0, x: 30 }}
              animate={{ opacity: 1, x: 0 }}
              exit={{ opacity: 0, x: -30 }}
              className="w-full max-w-2xl mx-auto"
            >
              {/* Question text */}
              <h2 className="text-2xl sm:text-3xl font-bold text-white mb-8 text-center leading-tight">
                {question.question}
              </h2>

              {/* Options */}
              <div className="space-y-3">
                {question.options.map((option, index) => {
                  const isSelected = answers[question.id] === index
                  const isCorrectAnswer = index === question.correctAnswer
                  const showCorrect = showFeedback && isCorrectAnswer
                  const showIncorrect = showFeedback && isSelected && !isCorrectAnswer

                  return (
                    <motion.button
                      key={index}
                      onClick={() => !showFeedback && handleAnswer(index)}
                      disabled={showFeedback}
                      initial={{ opacity: 0, y: 20 }}
                      animate={{ opacity: 1, y: 0 }}
                      transition={{ delay: index * 0.1 }}
                      className={cn(
                        'quiz-option w-full text-left',
                        isSelected && !showFeedback && 'selected',
                        showCorrect && 'correct',
                        showIncorrect && 'incorrect'
                      )}
                    >
                      <div className="flex items-center gap-4">
                        <span
                          className={cn(
                            'w-10 h-10 rounded-xl flex items-center justify-center text-base font-bold transition-colors',
                            showCorrect
                              ? 'bg-green-500 text-white'
                              : showIncorrect
                                ? 'bg-red-500 text-white'
                                : isSelected
                                  ? 'bg-brand-500 text-white'
                                  : 'bg-dark-700 text-gray-300'
                          )}
                        >
                          {showCorrect ? (
                            <Check className="w-5 h-5" />
                          ) : showIncorrect ? (
                            <X className="w-5 h-5" />
                          ) : (
                            String.fromCharCode(65 + index)
                          )}
                        </span>
                        <span className="font-medium text-white text-lg">{option}</span>
                      </div>
                    </motion.button>
                  )
                })}
              </div>
            </motion.div>
          </AnimatePresence>
        </main>

        {/* Feedback Footer */}
        <AnimatePresence>
          {showFeedback && (
            <motion.footer
              initial={{ y: 100 }}
              animate={{ y: 0 }}
              exit={{ y: 100 }}
              className={cn(
                'border-t-2 p-5 flex-shrink-0',
                isCorrect()
                  ? 'bg-green-500/20 border-green-500'
                  : 'bg-red-500/20 border-red-500'
              )}
            >
              <div className="max-w-2xl mx-auto">
                <div className="flex items-center justify-between mb-4">
                  <div className="flex items-center gap-3">
                    {isCorrect() ? (
                      <motion.div
                        initial={{ scale: 0 }}
                        animate={{ scale: 1 }}
                        className="w-12 h-12 rounded-full bg-green-500 flex items-center justify-center"
                      >
                        <Check className="w-7 h-7 text-white" />
                      </motion.div>
                    ) : (
                      <motion.div
                        initial={{ scale: 0 }}
                        animate={{ scale: 1 }}
                        className="w-12 h-12 rounded-full bg-red-500 flex items-center justify-center"
                      >
                        <Heart className="w-7 h-7 text-white" />
                      </motion.div>
                    )}
                    <div>
                      <div className={cn(
                        'text-xl font-bold',
                        isCorrect() ? 'text-green-400' : 'text-red-400'
                      )}>
                        {feedbackMessage?.text}
                      </div>
                      <div className="text-sm text-gray-400">
                        {isCorrect()
                          ? feedbackMessage?.subtitle
                          : isPro
                            ? '∞ vidas restantes (PRO)'
                            : `${lives} ${lives === 1 ? 'vida restante' : 'vidas restantes'}`}
                      </div>
                    </div>
                  </div>

                  {isCorrect() && (
                    <motion.div
                      initial={{ scale: 0, rotate: -180 }}
                      animate={{ scale: 1, rotate: 0 }}
                      className="flex items-center gap-1 px-3 py-1.5 rounded-full bg-yellow-500/30 text-yellow-400 font-bold"
                    >
                      <Sparkles className="w-5 h-5" />
                      +{Math.ceil(lesson.quizXP / totalQuestions)} XP
                    </motion.div>
                  )}
                </div>

                {!isCorrect() && (
                  <p className="text-gray-300 text-sm mb-4">
                    <span className="text-green-400 font-medium">Respuesta correcta:</span>{' '}
                    {question.options[question.correctAnswer]}
                  </p>
                )}

                {/* Solo mostrar botón si aún tiene vidas */}
                {(isPro || lives > 0) && (
                  <button
                    onClick={nextQuestion}
                    className={cn(
                      'duo-btn w-full text-center justify-center',
                      !isCorrect() && 'bg-red-500 !shadow-[0_4px_0_#b91c1c]'
                    )}
                    style={!isCorrect() ? { background: '#ef4444' } : undefined}
                  >
                    {currentQuestion === totalQuestions - 1 ? 'VER RESULTADOS' : 'CONTINUAR'}
                  </button>
                )}
              </div>
            </motion.footer>
          )}
        </AnimatePresence>
      </div>
    )
  }

  // ==================== RESULTS PHASE ====================
  const percentCorrect = results ? Math.round((results.correct / results.total) * 100) : 0

  return (
    <div className="h-[100dvh] bg-dark-950 flex items-center justify-center px-4 overflow-hidden">
      {showConfetti && <Confetti />}

      <motion.div
        initial={{ scale: 0.8, opacity: 0 }}
        animate={{ scale: 1, opacity: 1 }}
        transition={{ type: 'spring', duration: 0.6 }}
        className="w-full max-w-md text-center"
      >
        {/* Trophy/Star animation */}
        <motion.div
          initial={{ y: -50, opacity: 0 }}
          animate={{ y: 0, opacity: 1 }}
          transition={{ delay: 0.2, type: 'spring' }}
          className="mb-6"
        >
          {results?.isPerfect ? (
            <div className="relative inline-block">
              <motion.div
                animate={{ rotate: [0, -10, 10, -10, 0] }}
                transition={{ duration: 0.5, delay: 0.5 }}
                className="w-32 h-32 mx-auto rounded-full bg-gradient-to-br from-yellow-400 to-yellow-600 flex items-center justify-center shadow-[0_0_60px_rgba(250,204,21,0.4)]"
              >
                <Trophy className="w-16 h-16 text-white trophy-bounce" />
              </motion.div>
              <motion.div
                initial={{ scale: 0 }}
                animate={{ scale: 1 }}
                transition={{ delay: 0.8 }}
                className="absolute -top-2 -right-2 w-12 h-12 rounded-full bg-green-500 flex items-center justify-center border-4 border-dark-950"
              >
                <Check className="w-6 h-6 text-white" />
              </motion.div>
            </div>
          ) : percentCorrect >= 70 ? (
            <div className="w-32 h-32 mx-auto rounded-full bg-gradient-to-br from-brand-400 to-brand-600 flex items-center justify-center shadow-[0_0_60px_rgba(88,204,2,0.3)]">
              <Star className="w-16 h-16 text-white" />
            </div>
          ) : (
            <div className="w-32 h-32 mx-auto rounded-full bg-gradient-to-br from-blue-400 to-blue-600 flex items-center justify-center">
              <Zap className="w-16 h-16 text-white" />
            </div>
          )}
        </motion.div>

        {/* Message */}
        <motion.div
          initial={{ y: 20, opacity: 0 }}
          animate={{ y: 0, opacity: 1 }}
          transition={{ delay: 0.3 }}
        >
          <h1 className="text-4xl font-black text-white mb-2">
            {results?.isPerfect
              ? FINAL_SUCCESS_MESSAGES[Math.floor(Math.random() * FINAL_SUCCESS_MESSAGES.length)]
              : percentCorrect >= 70
                ? '¡Muy bien! 🎉'
                : '¡Sigue practicando! 💪'}
          </h1>
          <p className="text-gray-400 text-lg">
            {results?.correct} de {results?.total} respuestas correctas
          </p>
          <p className="text-red-400 text-sm mt-1">
            {lives === MAX_LIVES ? '¡Sin errores!' : `${MAX_LIVES - lives} ${MAX_LIVES - lives === 1 ? 'error' : 'errores'}`}
          </p>
        </motion.div>

        {/* Score ring */}
        <motion.div
          initial={{ scale: 0 }}
          animate={{ scale: 1 }}
          transition={{ delay: 0.4, type: 'spring' }}
          className="my-8"
        >
          <div className="relative w-40 h-40 mx-auto">
            <svg className="w-full h-full transform -rotate-90">
              <circle
                cx="80"
                cy="80"
                r="70"
                stroke="currentColor"
                strokeWidth="12"
                fill="none"
                className="text-dark-700"
              />
              <motion.circle
                cx="80"
                cy="80"
                r="70"
                stroke="currentColor"
                strokeWidth="12"
                fill="none"
                strokeLinecap="round"
                className={cn(
                  percentCorrect >= 70 ? 'text-brand-500' : 'text-blue-500'
                )}
                initial={{ strokeDasharray: '0 440' }}
                animate={{ strokeDasharray: `${percentCorrect * 4.4} 440` }}
                transition={{ duration: 1, delay: 0.5 }}
              />
            </svg>
            <div className="absolute inset-0 flex items-center justify-center">
              <span className="text-4xl font-black text-white">{percentCorrect}%</span>
            </div>
          </div>
        </motion.div>

        {/* XP earned */}
        <motion.div
          initial={{ y: 20, opacity: 0 }}
          animate={{ y: 0, opacity: 1 }}
          transition={{ delay: 0.6 }}
          className="bg-dark-800 border-2 border-dark-600 rounded-2xl p-5 mb-6"
        >
          <div className="flex items-center justify-center gap-6">
            <div className="text-center">
              <div className="flex items-center justify-center gap-2 text-3xl font-black text-yellow-400">
                <Sparkles className="w-7 h-7" />
                +{results?.xpEarned}
              </div>
              <div className="text-sm text-gray-500 font-medium">XP GANADOS</div>
            </div>
            {results?.isPerfect && (
              <div className="text-center border-l-2 border-dark-600 pl-6">
                <div className="flex items-center justify-center gap-2 text-3xl font-black text-purple-400">
                  <Trophy className="w-7 h-7" />
                  +{lesson.perfectBonus}
                </div>
                <div className="text-sm text-gray-500 font-medium">BONUS PERFECTO</div>
              </div>
            )}
          </div>
        </motion.div>

        {/* Action buttons */}
        <motion.div
          initial={{ y: 20, opacity: 0 }}
          animate={{ y: 0, opacity: 1 }}
          transition={{ delay: 0.7 }}
          className="space-y-3"
        >
          <button
            onClick={() => router.push('/learn')}
            className="duo-btn w-full text-center justify-center"
          >
            CONTINUAR
          </button>
          <button
            onClick={() => {
              setPhase('content')
              setLives(MAX_LIVES)
              setCurrentQuestion(0)
              setAnswers({})
              setShowFeedback(false)
              setFeedbackMessage(null)
              setResults(null)
            }}
            className="duo-btn outline w-full text-center justify-center"
          >
            REPETIR LECCIÓN
          </button>
        </motion.div>
      </motion.div>
    </div>
  )
}

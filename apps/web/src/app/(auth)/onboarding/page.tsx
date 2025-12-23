'use client'

import { useState } from 'react'
import { useRouter } from 'next/navigation'
import { motion, AnimatePresence } from 'framer-motion'
import { 
  TrendingUp, 
  ChevronRight, 
  GraduationCap, 
  LineChart, 
  Copy,
  Clock,
  Target,
  Zap
} from 'lucide-react'
import { Button } from '@/components/ui/button'
import { cn } from '@/lib/utils'

const steps = [
  {
    id: 'experience',
    title: '¿Cuál es tu nivel de experiencia?',
    subtitle: 'Esto nos ayuda a personalizar tu aprendizaje',
    options: [
      {
        value: 'BEGINNER',
        label: 'Principiante',
        description: 'Nuevo en el mundo del trading',
        icon: GraduationCap,
      },
      {
        value: 'INTERMEDIATE',
        label: 'Intermedio',
        description: 'Conozco los conceptos básicos',
        icon: LineChart,
      },
      {
        value: 'PRO',
        label: 'Avanzado',
        description: 'Tengo experiencia operando',
        icon: TrendingUp,
      },
    ],
  },
  {
    id: 'objective',
    title: '¿Qué te gustaría lograr?',
    subtitle: 'Tu objetivo principal',
    options: [
      {
        value: 'LEARN',
        label: 'Aprender',
        description: 'Entender cómo funciona el trading',
        icon: GraduationCap,
      },
      {
        value: 'OPERATE',
        label: 'Operar',
        description: 'Hacer trading activo',
        icon: LineChart,
      },
      {
        value: 'COPY',
        label: 'Copy Trading',
        description: 'Copiar traders exitosos',
        icon: Copy,
      },
    ],
  },
  {
    id: 'dailyGoal',
    title: '¿Cuánto tiempo puedes dedicar al día?',
    subtitle: 'Tu meta diaria de aprendizaje',
    options: [
      {
        value: 5,
        label: '5 minutos',
        description: 'Casual',
        icon: Clock,
      },
      {
        value: 10,
        label: '10 minutos',
        description: 'Regular',
        icon: Target,
      },
      {
        value: 15,
        label: '15 minutos',
        description: 'Intensivo',
        icon: Zap,
      },
    ],
  },
]

export default function OnboardingPage() {
  const router = useRouter()
  const [currentStep, setCurrentStep] = useState(0)
  const [selections, setSelections] = useState<Record<string, any>>({})
  const [isLoading, setIsLoading] = useState(false)

  const step = steps[currentStep]

  const handleSelect = (value: any) => {
    setSelections({ ...selections, [step.id]: value })
  }

  const handleNext = async () => {
    if (currentStep < steps.length - 1) {
      setCurrentStep(currentStep + 1)
    } else {
      // Save preferences and redirect
      setIsLoading(true)
      try {
        await fetch('/api/profile/onboarding', {
          method: 'POST',
          headers: { 'Content-Type': 'application/json' },
          body: JSON.stringify(selections),
        })
        router.push('/learn')
      } catch (error) {
        console.error('Onboarding error:', error)
      } finally {
        setIsLoading(false)
      }
    }
  }

  const progress = ((currentStep + 1) / steps.length) * 100

  return (
    <div className="min-h-screen bg-dark-950 flex flex-col">
      {/* Background */}
      <div className="fixed inset-0 bg-[radial-gradient(ellipse_at_top,_var(--tw-gradient-stops))] from-brand-900/20 via-dark-950 to-dark-950" />
      
      {/* Progress bar */}
      <div className="relative z-10 w-full h-1 bg-dark-800">
        <motion.div
          className="h-full bg-gradient-to-r from-brand-500 to-accent-purple"
          initial={{ width: 0 }}
          animate={{ width: `${progress}%` }}
          transition={{ duration: 0.3 }}
        />
      </div>

      <div className="relative z-10 flex-1 flex items-center justify-center px-4 py-12">
        <div className="w-full max-w-lg">
          <AnimatePresence mode="wait">
            <motion.div
              key={step.id}
              initial={{ opacity: 0, x: 20 }}
              animate={{ opacity: 1, x: 0 }}
              exit={{ opacity: 0, x: -20 }}
              transition={{ duration: 0.3 }}
            >
              {/* Step header */}
              <div className="text-center mb-10">
                <p className="text-brand-400 text-sm font-medium mb-2">
                  Paso {currentStep + 1} de {steps.length}
                </p>
                <h1 className="text-3xl font-bold text-white mb-2">{step.title}</h1>
                <p className="text-gray-400">{step.subtitle}</p>
              </div>

              {/* Options */}
              <div className="space-y-4 mb-10">
                {step.options.map((option) => {
                  const isSelected = selections[step.id] === option.value
                  const Icon = option.icon

                  return (
                    <button
                      key={option.value}
                      onClick={() => handleSelect(option.value)}
                      className={cn(
                        'w-full p-5 rounded-xl border-2 transition-all duration-200 text-left flex items-center gap-4',
                        isSelected
                          ? 'border-brand-500 bg-brand-500/10'
                          : 'border-dark-700 bg-dark-800/50 hover:border-dark-600 hover:bg-dark-800'
                      )}
                    >
                      <div
                        className={cn(
                          'w-12 h-12 rounded-xl flex items-center justify-center',
                          isSelected
                            ? 'bg-brand-500 text-white'
                            : 'bg-dark-700 text-gray-400'
                        )}
                      >
                        <Icon className="w-6 h-6" />
                      </div>
                      <div>
                        <div className="font-semibold text-white">{option.label}</div>
                        <div className="text-sm text-gray-400">{option.description}</div>
                      </div>
                      {isSelected && (
                        <motion.div
                          initial={{ scale: 0 }}
                          animate={{ scale: 1 }}
                          className="ml-auto w-6 h-6 rounded-full bg-brand-500 flex items-center justify-center"
                        >
                          <svg className="w-4 h-4 text-white" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={3} d="M5 13l4 4L19 7" />
                          </svg>
                        </motion.div>
                      )}
                    </button>
                  )
                })}
              </div>

              {/* Navigation */}
              <div className="flex gap-4">
                {currentStep > 0 && (
                  <Button
                    variant="outline"
                    className="flex-1 border-dark-600 text-white hover:bg-dark-800"
                    onClick={() => setCurrentStep(currentStep - 1)}
                  >
                    Atrás
                  </Button>
                )}
                <Button
                  className="flex-1 group"
                  onClick={handleNext}
                  disabled={!selections[step.id]}
                  isLoading={isLoading}
                >
                  {currentStep === steps.length - 1 ? '¡Comenzar!' : 'Continuar'}
                  {!isLoading && (
                    <ChevronRight className="ml-2 w-5 h-5 group-hover:translate-x-1 transition-transform" />
                  )}
                </Button>
              </div>
            </motion.div>
          </AnimatePresence>
        </div>
      </div>
    </div>
  )
}


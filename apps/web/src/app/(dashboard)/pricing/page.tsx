'use client'

import { useState } from 'react'
import { motion } from 'framer-motion'
import {
  Check,
  Crown,
  Zap,
  Users,
  BarChart3,
  BookOpen,
  Gamepad2,
  MessageSquare,
  Sparkles,
} from 'lucide-react'
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card'
import { Button } from '@/components/ui/button'
import { Badge } from '@/components/ui/badge'
import { cn } from '@/lib/utils'

const plans = [
  {
    name: 'Gratis',
    price: 0,
    description: 'Perfecto para comenzar tu viaje',
    features: [
      { text: 'Niveles 1-2 completos', included: true },
      { text: 'Sistema de XP y rachas', included: true },
      { text: 'Leaderboard semanal', included: true },
      { text: 'Sistema de amigos', included: true },
      { text: '2 retos por semana', included: true },
      { text: 'Insignias básicas', included: true },
      { text: 'Niveles 3-5', included: false },
      { text: 'Retos ilimitados', included: false },
      { text: 'Estadísticas avanzadas', included: false },
    ],
    cta: 'Plan Actual',
    popular: false,
  },
  {
    name: 'Pro',
    price: 15.99,
    yearlyPrice: 149,
    description: 'Desbloquea todo el potencial',
    features: [
      { text: 'Todos los niveles desbloqueados', included: true },
      { text: 'Retos ilimitados', included: true },
      { text: 'Estadísticas avanzadas', included: true },
      { text: 'Gráficos de progreso detallados', included: true },
      { text: 'Journal de trading', included: true, soon: true },
      { text: 'Coach AI personalizado', included: true, soon: true },
      { text: 'Soporte prioritario', included: true },
      { text: 'Sin publicidad', included: true },
      { text: 'Nuevos contenidos primero', included: true },
    ],
    cta: 'Comenzar con Pro',
    popular: true,
  },
]

const faqs = [
  {
    q: '¿Puedo cancelar en cualquier momento?',
    a: 'Sí, puedes cancelar tu suscripción cuando quieras. Seguirás teniendo acceso hasta el final del período facturado.',
  },
  {
    q: '¿Qué métodos de pago aceptan?',
    a: 'Aceptamos todas las tarjetas de crédito y débito principales (Visa, Mastercard, American Express).',
  },
  {
    q: '¿Hay reembolsos disponibles?',
    a: 'Ofrecemos reembolso completo durante los primeros 7 días si no estás satisfecho.',
  },
  {
    q: '¿El contenido está en español?',
    a: '¡Sí! Todo el contenido está 100% en español, pensado para la comunidad hispanohablante.',
  },
]

export default function PricingPage() {
  const [isYearly, setIsYearly] = useState(false)
  const [isLoading, setIsLoading] = useState(false)

  const handleSubscribe = async (plan: string) => {
    if (plan === 'Gratis') return

    setIsLoading(true)
    try {
      const res = await fetch('/api/billing/create-checkout-session', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          plan: isYearly ? 'PRO_YEARLY' : 'PRO_MONTHLY',
          successPath: '/pricing?success=true',
          cancelPath: '/pricing?canceled=true',
        }),
      })

      const data = await res.json()

      if (data.url) {
        window.location.href = data.url
      }
    } catch (error) {
      console.error('Checkout error:', error)
    } finally {
      setIsLoading(false)
    }
  }

  return (
    <div className="min-h-screen bg-dark-950 pb-24 md:pb-8">
      <div className="fixed inset-0 bg-[radial-gradient(ellipse_at_top,_var(--tw-gradient-stops))] from-accent-purple/10 via-dark-950 to-dark-950 pointer-events-none" />

      <div className="relative z-10 max-w-5xl mx-auto px-4 py-12">
        {/* Header */}
        <div className="text-center mb-12">
          <h1 className="text-4xl font-bold text-white mb-4">
            Elige tu Plan
          </h1>
          <p className="text-gray-400 max-w-2xl mx-auto">
            Comienza gratis y actualiza cuando estés listo para desbloquear todo el contenido
          </p>

          {/* Billing toggle */}
          <div className="flex items-center justify-center gap-4 mt-8">
            <span className={cn('text-sm', !isYearly ? 'text-white' : 'text-gray-500')}>
              Mensual
            </span>
            <button
              onClick={() => setIsYearly(!isYearly)}
              className={cn(
                'relative w-14 h-7 rounded-full transition-colors',
                isYearly ? 'bg-brand-500' : 'bg-dark-600'
              )}
            >
              <motion.div
                className="absolute top-1 left-1 w-5 h-5 rounded-full bg-white"
                animate={{ x: isYearly ? 28 : 0 }}
                transition={{ type: 'spring', stiffness: 500, damping: 30 }}
              />
            </button>
            <span className={cn('text-sm', isYearly ? 'text-white' : 'text-gray-500')}>
              Anual
              <Badge variant="xp" className="ml-2">Ahorra 22%</Badge>
            </span>
          </div>
        </div>

        {/* Plans */}
        <div className="grid md:grid-cols-2 gap-8 mb-16">
          {plans.map((plan) => (
            <motion.div
              key={plan.name}
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              className="relative"
            >
              {plan.popular && (
                <div className="absolute -top-4 left-1/2 -translate-x-1/2 z-10">
                  <Badge variant="pro" className="gap-1 px-4 py-1">
                    <Sparkles className="w-3 h-3" />
                    Más Popular
                  </Badge>
                </div>
              )}
              <Card className={cn(
                'h-full overflow-hidden',
                plan.popular
                  ? 'bg-gradient-to-br from-dark-800 to-dark-900 border-brand-500/50'
                  : 'bg-dark-800 border-dark-700'
              )}>
                <CardHeader className="text-center pb-4">
                  <CardTitle className="text-2xl">{plan.name}</CardTitle>
                  <p className="text-gray-400 text-sm">{plan.description}</p>
                  <div className="mt-4">
                    <span className="text-4xl font-bold text-white">
                      ${isYearly && plan.yearlyPrice ? plan.yearlyPrice : plan.price}
                    </span>
                    <span className="text-gray-500">
                      /{isYearly ? 'año' : 'mes'}
                    </span>
                  </div>
                </CardHeader>
                <CardContent className="space-y-4">
                  <ul className="space-y-3">
                    {plan.features.map((feature, i) => (
                      <li key={i} className="flex items-start gap-3">
                        <div className={cn(
                          'w-5 h-5 rounded-full flex items-center justify-center flex-shrink-0 mt-0.5',
                          feature.included
                            ? 'bg-brand-500/20 text-brand-500'
                            : 'bg-dark-700 text-dark-500'
                        )}>
                          <Check className="w-3 h-3" />
                        </div>
                        <span className={cn(
                          'text-sm',
                          feature.included ? 'text-gray-300' : 'text-gray-500 line-through'
                        )}>
                          {feature.text}
                          {'soon' in feature && feature.soon && (
                            <Badge variant="secondary" className="ml-2 text-xs">Próximamente</Badge>
                          )}
                        </span>
                      </li>
                    ))}
                  </ul>

                  <Button
                    className="w-full mt-6"
                    variant={plan.popular ? 'premium' : 'outline'}
                    size="lg"
                    onClick={() => handleSubscribe(plan.name)}
                    disabled={plan.name === 'Gratis'}
                    isLoading={isLoading && plan.popular}
                  >
                    {plan.popular && <Crown className="w-4 h-4 mr-2" />}
                    {plan.cta}
                  </Button>
                </CardContent>
              </Card>
            </motion.div>
          ))}
        </div>

        {/* Features Grid */}
        <div className="mb-16">
          <h2 className="text-2xl font-bold text-white text-center mb-8">
            Lo que obtienes con Pro
          </h2>
          <div className="grid sm:grid-cols-2 md:grid-cols-3 gap-4">
            {[
              { icon: BookOpen, title: 'Todos los Niveles', desc: 'Acceso completo al contenido' },
              { icon: Gamepad2, title: 'Retos Ilimitados', desc: 'Sin límites semanales' },
              { icon: BarChart3, title: 'Estadísticas', desc: 'Análisis detallado de tu progreso' },
              { icon: MessageSquare, title: 'Coach AI', desc: 'Asistente personalizado (próximamente)' },
              { icon: Users, title: 'Comunidad Pro', desc: 'Acceso a grupo exclusivo' },
              { icon: Zap, title: 'Contenido Nuevo', desc: 'Acceso anticipado' },
            ].map((feature, i) => (
              <Card key={i} className="bg-dark-800 border-dark-700">
                <CardContent className="p-4 flex items-center gap-4">
                  <div className="w-10 h-10 rounded-lg bg-brand-500/20 flex items-center justify-center">
                    <feature.icon className="w-5 h-5 text-brand-500" />
                  </div>
                  <div>
                    <h3 className="font-medium text-white">{feature.title}</h3>
                    <p className="text-sm text-gray-500">{feature.desc}</p>
                  </div>
                </CardContent>
              </Card>
            ))}
          </div>
        </div>

        {/* FAQ */}
        <div>
          <h2 className="text-2xl font-bold text-white text-center mb-8">
            Preguntas Frecuentes
          </h2>
          <div className="grid md:grid-cols-2 gap-4">
            {faqs.map((faq, i) => (
              <Card key={i} className="bg-dark-800 border-dark-700">
                <CardContent className="p-6">
                  <h3 className="font-semibold text-white mb-2">{faq.q}</h3>
                  <p className="text-gray-400 text-sm">{faq.a}</p>
                </CardContent>
              </Card>
            ))}
          </div>
        </div>
      </div>
    </div>
  )
}


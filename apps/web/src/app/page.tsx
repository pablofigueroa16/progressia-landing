import Image from 'next/image'
import Link from 'next/link'
import { Button } from '@/components/ui/button'
import { PRO_PLAN_BENEFITS } from '@/lib/billing/pro-benefits'
import { StartProButton } from '@/components/billing/start-pro-button'
import {
  GraduationCap,
  Trophy,
  Users,
  Zap,
  Shield,
  Star,
  ChevronRight,
  Flame,
  Target
} from 'lucide-react'

export default function LandingPage() {
  return (
    <div className="min-h-screen bg-dark-950 text-white overflow-hidden">
      {/* Background effects */}
      <div className="fixed inset-0 bg-[radial-gradient(ellipse_at_top,_var(--tw-gradient-stops))] from-brand-900/20 via-dark-950 to-dark-950" />
      <div className="fixed inset-0 bg-[url('/grid.svg')] bg-center opacity-5" />

      {/* Navigation */}
      <nav className="relative z-10 border-b border-white/5">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex items-center justify-between h-16">
            <div className="flex items-center gap-2">
              <Image
                src="/progressia.png"
                alt="Progressia"
                width={200}
                height={80}
                className="h-20 w-auto"
                priority
              />
            </div>
            <div className="flex items-center gap-4">
              <Link href="/login">
                <Button variant="ghost" className="text-white/80 hover:text-white">
                  Iniciar Sesión
                </Button>
              </Link>
              <Link href="/register">
                <Button className="bg-brand-500 hover:bg-brand-600">
                  Comenzar Gratis
                </Button>
              </Link>
            </div>
          </div>
        </div>
      </nav>

      {/* Hero Section */}
      <section className="relative z-10 pt-20 pb-32 px-4">
        <div className="max-w-7xl mx-auto text-center">
          <div className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-brand-500/10 border border-brand-500/20 mb-8">
            <Flame className="w-4 h-4 text-accent-orange" />
            <span className="text-sm text-brand-400">Más de 10,000 traders aprendiendo</span>
          </div>

          <h1 className="text-5xl sm:text-6xl lg:text-7xl font-bold font-display leading-tight mb-6">
            Aprende Trading
            <br />
            <span className="bg-gradient-to-r from-brand-400 via-brand-500 to-accent-purple bg-clip-text text-transparent">
              Como un Juego
            </span>
          </h1>

          <p className="text-xl text-gray-400 max-w-2xl mx-auto mb-10">
            Domina el trading con lecciones interactivas, quizzes desafiantes y retos con amigos.
            Gana XP, mantén tu racha y escala en las ligas.
          </p>

          <div className="flex flex-col sm:flex-row gap-4 justify-center mb-16">
            <Link href="/register">
              <Button size="xl" className="w-full sm:w-auto group">
                Empezar Ahora - Es Gratis
                <ChevronRight className="ml-2 w-5 h-5 group-hover:translate-x-1 transition-transform" />
              </Button>
            </Link>
            <Link href="#features">
              <Button size="xl" variant="outline" className="w-full sm:w-auto border-white/20 text-white hover:bg-white/10">
                Ver Cómo Funciona
              </Button>
            </Link>
          </div>

          {/* Stats */}
          <div className="grid grid-cols-2 md:grid-cols-4 gap-8 max-w-3xl mx-auto">
            {[
              { value: '50+', label: 'Lecciones' },
              { value: '500+', label: 'Quizzes' },
              { value: '10K+', label: 'Usuarios' },
              { value: '4.9', label: 'Rating ⭐' },
            ].map((stat, i) => (
              <div key={i} className="text-center">
                <div className="text-3xl font-bold text-brand-400">{stat.value}</div>
                <div className="text-gray-500 text-sm">{stat.label}</div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Features Section */}
      <section id="features" className="relative z-10 py-24 px-4">
        <div className="max-w-7xl mx-auto">
          <div className="text-center mb-16">
            <h2 className="text-3xl sm:text-4xl font-bold font-display mb-4">
              Todo lo que Necesitas para Aprender Trading
            </h2>
            <p className="text-gray-400 max-w-2xl mx-auto">
              Una plataforma diseñada para mantenerte motivado y ayudarte a progresar día a día
            </p>
          </div>

          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
            {[
              {
                icon: GraduationCap,
                title: 'Lecciones Interactivas',
                description: 'Contenido estructurado desde los fundamentos hasta estrategias avanzadas',
                color: 'from-brand-500 to-brand-700',
              },
              {
                icon: Trophy,
                title: 'Gamificación Completa',
                description: 'Gana XP, badges y compite en ligas semanales con otros traders',
                color: 'from-accent-gold to-accent-orange',
              },
              {
                icon: Users,
                title: 'Retos con Amigos',
                description: 'Desafía a tus amigos en duelos 1v1 o retos grupales',
                color: 'from-accent-purple to-brand-500',
              },
              {
                icon: Zap,
                title: 'Quizzes Dinámicos',
                description: 'Pon a prueba tus conocimientos con quizzes variados y escenarios reales',
                color: 'from-yellow-500 to-orange-500',
              },
              {
                icon: Flame,
                title: 'Sistema de Rachas',
                description: 'Mantén tu racha diaria y desbloquea recompensas especiales',
                color: 'from-red-500 to-orange-500',
              },
              {
                icon: Target,
                title: 'Metas Personalizadas',
                description: 'Establece tu meta diaria de 5, 10 o 15 minutos',
                color: 'from-cyan-500 to-blue-500',
              },
            ].map((feature, i) => (
              <div
                key={i}
                className="group relative p-6 rounded-2xl bg-white/5 border border-white/10 hover:bg-white/10 transition-all duration-300"
              >
                <div className={`w-12 h-12 rounded-xl bg-gradient-to-br ${feature.color} flex items-center justify-center mb-4`}>
                  <feature.icon className="w-6 h-6 text-white" />
                </div>
                <h3 className="text-xl font-semibold mb-2">{feature.title}</h3>
                <p className="text-gray-400">{feature.description}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Pricing Section */}
      <section className="relative z-10 py-24 px-4">
        <div className="max-w-5xl mx-auto">
          <div className="text-center mb-16">
            <h2 className="text-3xl sm:text-4xl font-bold font-display mb-4">
              Elige tu Plan
            </h2>
            <p className="text-gray-400">
              Comienza gratis y actualiza cuando estés listo
            </p>
          </div>

          <div className="grid md:grid-cols-2 gap-8">
            {/* Free Plan */}
            <div className="p-8 rounded-2xl bg-white/5 border border-white/10">
              <div className="mb-6">
                <h3 className="text-2xl font-bold mb-2">Gratis</h3>
                <div className="text-4xl font-bold">$0<span className="text-lg text-gray-400">/mes</span></div>
              </div>
              <ul className="space-y-4 mb-8">
                {[
                  'Niveles 1-2 completos',
                  'Gamificación básica (XP, rachas)',
                  'Sistema de amigos',
                  '2 retos por semana',
                  'Leaderboard semanal',
                ].map((item, i) => (
                  <li key={i} className="flex items-center gap-3">
                    <Star className="w-5 h-5 text-brand-500" />
                    <span className="text-gray-300">{item}</span>
                  </li>
                ))}
              </ul>
              <Link href="/register">
                <Button variant="outline" className="w-full border-white/20 text-white hover:bg-white/10">
                  Comenzar Gratis
                </Button>
              </Link>
            </div>

            {/* Pro Plan */}
            <div className="relative p-8 rounded-2xl bg-gradient-to-br from-brand-500/20 to-accent-purple/20 border border-brand-500/30">
              <div className="absolute -top-4 left-1/2 -translate-x-1/2 px-4 py-1 bg-gradient-to-r from-brand-500 to-accent-purple rounded-full text-sm font-medium">
                Más Popular
              </div>
              <div className="mb-6">
                <h3 className="text-2xl font-bold mb-2">Pro</h3>
                <div className="text-4xl font-bold">$15.99<span className="text-lg text-gray-400">/mes</span></div>
                <p className="text-sm text-gray-400 mt-1">o $149/año (ahorra 22%)</p>
              </div>
              <ul className="space-y-4 mb-8">
                {PRO_PLAN_BENEFITS.map((item, i) => (
                  <li key={i} className="flex items-center gap-3">
                    <Star className="w-5 h-5 text-accent-gold" />
                    <span className="text-gray-300">{item}</span>
                  </li>
                ))}
              </ul>
              <StartProButton className="w-full" />
            </div>
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="relative z-10 py-24 px-4">
        <div className="max-w-4xl mx-auto text-center">
          <h2 className="text-3xl sm:text-4xl font-bold font-display mb-6">
            ¿Listo para Convertirte en un Mejor Trader?
          </h2>
          <p className="text-gray-400 mb-8 max-w-2xl mx-auto">
            Únete a miles de traders que ya están aprendiendo con Progressia.
            Comienza tu viaje hoy, es completamente gratis.
          </p>
          <Link href="/register">
            <Button size="xl" className="group">
              Crear Cuenta Gratis
              <ChevronRight className="ml-2 w-5 h-5 group-hover:translate-x-1 transition-transform" />
            </Button>
          </Link>
        </div>
      </section>

      {/* Footer */}
      <footer className="relative z-10 border-t border-white/5 py-12 px-4">
        <div className="max-w-7xl mx-auto">
          <div className="flex flex-col md:flex-row justify-between items-center gap-6">
            <div className="flex items-center gap-2">
              <Image
                src="/progressia.png"
                alt="Progressia"
                width={200}
                height={80}
                className="h-20 w-auto"
              />
            </div>
            <div className="flex items-center gap-6 text-sm text-gray-400">
              <Link href="/terms" className="hover:text-white transition-colors">Términos</Link>
              <Link href="/privacy" className="hover:text-white transition-colors">Privacidad</Link>
              <Link href="/contact" className="hover:text-white transition-colors">Contacto</Link>
            </div>
          </div>

          {/* Risk Disclaimer */}
          <div className="mt-8 p-4 rounded-lg bg-yellow-500/10 border border-yellow-500/20 text-sm text-yellow-200/80">
            <div className="flex items-start gap-3">
              <Shield className="w-5 h-5 text-yellow-500 flex-shrink-0 mt-0.5" />
              <p>
                <strong>Aviso de Riesgo:</strong> Progressia es una plataforma educativa.
                El contenido no constituye asesoría financiera. Operar en mercados financieros
                conlleva riesgos significativos. Consulta siempre con un profesional antes de invertir.
              </p>
            </div>
          </div>

          <div className="mt-8 text-center text-sm text-gray-500">
            © 2024 Progressia. Todos los derechos reservados.
          </div>
        </div>
      </footer>
    </div>
  )
}


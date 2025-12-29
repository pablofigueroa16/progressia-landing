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

      {/* Manifesto / Narrative Section */}
      <section className="relative z-10 py-24 px-4">
        <div className="max-w-7xl mx-auto">
          <div className="text-center mb-16">
            <h2 className="text-3xl sm:text-4xl font-bold font-display mb-4">
              Aprende a dominar el dinero.
              <br />
              <span className="bg-gradient-to-r from-brand-400 via-brand-500 to-accent-purple bg-clip-text text-transparent">
                Progreso real, todos los días.
              </span>
            </h2>
            <p className="text-gray-400 max-w-3xl mx-auto">
              Progressia es la primera plataforma de educación financiera y trading gamificada,
              diseñada para que cualquier persona —desde cero— pueda aprender, practicar y
              progresar de forma constante, clara y medible.
            </p>
          </div>

          <div className="grid lg:grid-cols-3 gap-6 mb-12">
            <div className="p-6 rounded-2xl bg-white/5 border border-white/10">
              <div className="flex items-center gap-3 mb-3">
                <GraduationCap className="w-6 h-6 text-brand-400" />
                <h3 className="text-xl font-semibold">No es teoría aburrida.</h3>
              </div>
              <p className="text-gray-400">
                Aprendes con micro-lecciones y práctica real, no con textos interminables.
              </p>
            </div>
            <div className="p-6 rounded-2xl bg-white/5 border border-white/10">
              <div className="flex items-center gap-3 mb-3">
                <Shield className="w-6 h-6 text-yellow-400" />
                <h3 className="text-xl font-semibold">No es promesas vacías.</h3>
              </div>
              <p className="text-gray-400">
                No vendemos humo ni rentabilidad. Formamos criterio y disciplina.
              </p>
            </div>
            <div className="p-6 rounded-2xl bg-white/5 border border-white/10">
              <div className="flex items-center gap-3 mb-3">
                <Flame className="w-6 h-6 text-accent-orange" />
                <h3 className="text-xl font-semibold">Es progreso diario, estructurado y comprobable.</h3>
              </div>
              <p className="text-gray-400">
                Avanzas con métricas claras: racha, XP, misiones completadas y niveles.
              </p>
            </div>
          </div>

          <div className="grid lg:grid-cols-2 gap-8 mb-12">
            <div className="p-8 rounded-2xl bg-gradient-to-br from-dark-900/60 to-dark-900/20 border border-white/10">
              <div className="flex items-center gap-3 mb-4">
                <Target className="w-6 h-6 text-brand-400" />
                <h3 className="text-2xl font-bold">🚀 El problema real</h3>
              </div>
              <p className="text-gray-400 mb-4">Hoy millones de personas:</p>
              <ul className="space-y-2 text-gray-300">
                <li className="flex gap-3">
                  <span className="text-brand-400 font-black">●</span>
                  No entienden cómo funciona el dinero
                </li>
                <li className="flex gap-3">
                  <span className="text-brand-400 font-black">●</span>
                  Pierden capital por falta de educación financiera
                </li>
                <li className="flex gap-3">
                  <span className="text-brand-400 font-black">●</span>
                  Se frustran con cursos largos, técnicos o confusos
                </li>
                <li className="flex gap-3">
                  <span className="text-brand-400 font-black">●</span>
                  Abandonan porque no ven resultados claros
                </li>
              </ul>
              <p className="text-gray-400 mt-4">
                La educación financiera tradicional no está diseñada para aprender, sino para informar.
              </p>
            </div>

            <div className="p-8 rounded-2xl bg-gradient-to-br from-brand-500/15 to-accent-purple/10 border border-brand-500/20">
              <div className="flex items-center gap-3 mb-4">
                <Zap className="w-6 h-6 text-accent-purple" />
                <h3 className="text-2xl font-bold">✅ La solución: Progressia</h3>
              </div>
              <p className="text-gray-400 mb-4">
                Progressia transforma la educación financiera en una experiencia diaria, simple y adictiva, usando:
              </p>
              <ul className="space-y-2 text-gray-300">
                {[
                  'Micro-lecciones',
                  'Retos diarios',
                  'Gamificación inteligente',
                  'Repetición estratégica',
                  'Progreso visible',
                ].map((item) => (
                  <li key={item} className="flex gap-3">
                    <span className="text-accent-purple font-black">●</span>
                    {item}
                  </li>
                ))}
              </ul>
              <p className="text-gray-300 mt-4 font-medium">
                Aprendes como en un juego, pero con impacto real en tu vida financiera.
              </p>
            </div>
          </div>

          <div className="grid lg:grid-cols-2 gap-8 mb-12">
            <div className="p-8 rounded-2xl bg-white/5 border border-white/10">
              <div className="flex items-center gap-3 mb-4">
                <GraduationCap className="w-6 h-6 text-brand-400" />
                <h3 className="text-2xl font-bold">🎯 ¿Qué es Progressia?</h3>
              </div>
              <p className="text-gray-400 mb-4">Una app educativa donde aprendes:</p>
              <ul className="grid sm:grid-cols-2 gap-2 text-gray-300">
                {[
                  'Educación financiera desde cero',
                  'Conceptos clave de trading e inversión',
                  'Psicología financiera',
                  'Gestión del riesgo',
                  'Lectura del mercado',
                  'Toma de decisiones racionales',
                ].map((item) => (
                  <li key={item} className="flex gap-3">
                    <span className="text-brand-400 font-black">●</span>
                    {item}
                  </li>
                ))}
              </ul>
              <p className="text-gray-400 mt-4">
                Todo dividido en niveles, misiones y retos diarios.
              </p>
            </div>

            <div className="p-8 rounded-2xl bg-white/5 border border-white/10">
              <div className="flex items-center gap-3 mb-4">
                <Flame className="w-6 h-6 text-accent-orange" />
                <h3 className="text-2xl font-bold">🧠 Método Progressia</h3>
              </div>
              <p className="text-gray-400 mb-4">
                Aprender no es acumular información. <span className="text-white font-semibold">Aprender es progresar.</span>
              </p>
              <div className="grid sm:grid-cols-2 gap-3 text-gray-300">
                {[
                  'Aprendizaje incremental (paso a paso)',
                  'Repetición inteligente',
                  'Evaluación constante',
                  'Refuerzo positivo',
                  'Competencia sana',
                ].map((item) => (
                  <div key={item} className="flex gap-3">
                    <span className="text-accent-orange font-black">●</span>
                    <span>{item}</span>
                  </div>
                ))}
              </div>
              <div className="mt-6 p-4 rounded-xl bg-white/5 border border-white/10">
                <p className="text-gray-300">
                  Cada día avanzas un poco. Cada semana eres mejor. Cada mes sabes más que el 90% de las personas.
                </p>
              </div>
            </div>
          </div>

          <div className="mb-12">
            <div className="text-center mb-10">
              <h3 className="text-2xl sm:text-3xl font-bold font-display">🧩 Niveles de aprendizaje</h3>
              <p className="text-gray-400 mt-2">Una ruta clara, estructurada y medible.</p>
            </div>

            <div className="grid lg:grid-cols-3 gap-6">
              <div className="p-7 rounded-2xl bg-gradient-to-br from-green-500/15 to-dark-900/30 border border-green-500/20">
                <div className="text-green-400 font-black mb-2">🟢 Nivel 1 — Estudiante</div>
                <ul className="space-y-2 text-gray-300">
                  {[
                    'Fundamentos del dinero',
                    'Conceptos financieros básicos',
                    'Introducción al trading',
                    'Vocabulario esencial',
                    'Hábitos financieros saludables',
                  ].map((item) => (
                    <li key={item} className="flex gap-3">
                      <span className="text-green-400 font-black">●</span>
                      {item}
                    </li>
                  ))}
                </ul>
              </div>

              <div className="p-7 rounded-2xl bg-gradient-to-br from-blue-500/15 to-dark-900/30 border border-blue-500/20">
                <div className="text-blue-400 font-black mb-2">🔵 Nivel 2 — Discípulo</div>
                <ul className="space-y-2 text-gray-300">
                  {[
                    'Análisis de mercado',
                    'Gestión de riesgo',
                    'Psicología del trader',
                    'Estrategias básicas',
                    'Disciplina y consistencia',
                  ].map((item) => (
                    <li key={item} className="flex gap-3">
                      <span className="text-blue-400 font-black">●</span>
                      {item}
                    </li>
                  ))}
                </ul>
              </div>

              <div className="p-7 rounded-2xl bg-gradient-to-br from-red-500/15 to-dark-900/30 border border-red-500/20">
                <div className="text-red-400 font-black mb-2">🔴 Nivel 3 — Maestro</div>
                <ul className="space-y-2 text-gray-300">
                  {[
                    'Pensamiento estratégico',
                    'Toma de decisiones avanzadas',
                    'Gestión emocional',
                    'Mentalidad profesional',
                    'Visión a largo plazo',
                  ].map((item) => (
                    <li key={item} className="flex gap-3">
                      <span className="text-red-400 font-black">●</span>
                      {item}
                    </li>
                  ))}
                </ul>
              </div>
            </div>
          </div>

          <div className="grid lg:grid-cols-2 gap-8 mb-12">
            <div className="p-8 rounded-2xl bg-white/5 border border-white/10">
              <div className="flex items-center gap-3 mb-4">
                <Trophy className="w-6 h-6 text-accent-gold" />
                <h3 className="text-2xl font-bold">🕹️ Gamificación que funciona</h3>
              </div>
              <ul className="space-y-2 text-gray-300">
                {[
                  'Ganas puntos por aprender',
                  'Desbloqueas niveles',
                  'Mantienes rachas diarias',
                  'Compites en rankings',
                  'Superas retos diarios',
                ].map((item) => (
                  <li key={item} className="flex gap-3">
                    <span className="text-accent-gold font-black">●</span>
                    {item}
                  </li>
                ))}
              </ul>
              <p className="text-gray-300 mt-4 font-semibold">
                Porque la constancia vence al talento.
              </p>
            </div>

            <div className="p-8 rounded-2xl bg-white/5 border border-white/10">
              <div className="flex items-center gap-3 mb-4">
                <Users className="w-6 h-6 text-brand-400" />
                <h3 className="text-2xl font-bold">🏆 Rankings & comunidad</h3>
              </div>
              <ul className="space-y-2 text-gray-300">
                {[
                  'Ranking global',
                  'Ranking por país',
                  'Ranking entre amigos',
                  'Retos individuales y grupales',
                ].map((item) => (
                  <li key={item} className="flex gap-3">
                    <span className="text-brand-400 font-black">●</span>
                    {item}
                  </li>
                ))}
              </ul>
              <p className="text-gray-400 mt-4">
                Aprendes mejor cuando no estás solo.
              </p>
            </div>
          </div>

          <div className="grid lg:grid-cols-2 gap-8 mb-12">
            <div className="p-8 rounded-2xl bg-white/5 border border-white/10">
              <div className="flex items-center gap-3 mb-4">
                <Zap className="w-6 h-6 text-accent-purple" />
                <h3 className="text-2xl font-bold">🎧 Contenido multimedia</h3>
              </div>
              <ul className="space-y-2 text-gray-300">
                {[
                  'Lecciones cortas',
                  'Audio-learning',
                  'Podcast educativo',
                  'Retos diarios guiados',
                  'Preguntas tipo Duolingo',
                ].map((item) => (
                  <li key={item} className="flex gap-3">
                    <span className="text-accent-purple font-black">●</span>
                    {item}
                  </li>
                ))}
              </ul>
              <p className="text-gray-400 mt-4">
                Aprende cuando quieras y donde quieras.
              </p>
            </div>

            <div className="p-8 rounded-2xl bg-white/5 border border-white/10">
              <div className="flex items-center gap-3 mb-4">
                <Shield className="w-6 h-6 text-yellow-400" />
                <h3 className="text-2xl font-bold">🔐 Educación con responsabilidad</h3>
              </div>
              <ul className="space-y-2 text-gray-300">
                {[
                  'No promete rentabilidad',
                  'No vende humo',
                  'No incentiva el riesgo irresponsable',
                ].map((item) => (
                  <li key={item} className="flex gap-3">
                    <span className="text-yellow-400 font-black">●</span>
                    {item}
                  </li>
                ))}
              </ul>
              <p className="text-gray-400 mt-4">
                Formamos personas educadas financieramente, no apostadores.
              </p>
            </div>
          </div>

          <div className="grid lg:grid-cols-2 gap-8 mb-12">
            <div className="p-8 rounded-2xl bg-white/5 border border-white/10">
              <div className="flex items-center gap-3 mb-4">
                <Users className="w-6 h-6 text-brand-400" />
                <h3 className="text-2xl font-bold">👤 ¿Para quién es Progressia?</h3>
              </div>
              <ul className="space-y-2 text-gray-300">
                {[
                  'Principiantes en finanzas',
                  'Personas que quieren entender el dinero',
                  'Traders en formación',
                  'Inversores a largo plazo',
                  'Jóvenes, adultos y profesionales',
                ].map((item) => (
                  <li key={item} className="flex gap-3">
                    <span className="text-brand-400 font-black">●</span>
                    {item}
                  </li>
                ))}
              </ul>
              <p className="text-gray-300 mt-4 font-medium">
                Si quieres progresar, Progressia es para ti.
              </p>
            </div>

            <div className="p-8 rounded-2xl bg-white/5 border border-white/10">
              <div className="flex items-center gap-3 mb-4">
                <Star className="w-6 h-6 text-accent-gold" />
                <h3 className="text-2xl font-bold">📈 Resultados reales</h3>
              </div>
              <ul className="space-y-2 text-gray-300">
                {[
                  'Más claridad financiera',
                  'Mejores decisiones',
                  'Menos errores costosos',
                  'Mayor disciplina',
                  'Mentalidad de largo plazo',
                ].map((item) => (
                  <li key={item} className="flex gap-3">
                    <span className="text-accent-gold font-black">●</span>
                    {item}
                  </li>
                ))}
              </ul>
              <div className="mt-4 p-4 rounded-xl bg-white/5 border border-white/10">
                <p className="text-gray-300">
                  No se trata de ganar rápido.{' '}
                  <span className="text-white font-semibold">Se trata de no perder por ignorancia.</span>
                </p>
              </div>
            </div>
          </div>

          <div className="p-8 rounded-2xl bg-gradient-to-r from-brand-500/15 to-accent-purple/10 border border-brand-500/20">
            <div className="grid lg:grid-cols-3 gap-8 items-start">
              <div className="lg:col-span-2">
                <h3 className="text-2xl font-bold mb-3">🌍 Nuestra visión</h3>
                <p className="text-gray-300 mb-4">
                  Creemos que la educación financiera debería ser tan básica como aprender a leer.
                  Progressia nace para democratizar el conocimiento financiero, formar generaciones más
                  conscientes y construir una relación sana con el dinero.
                </p>
                <div className="p-5 rounded-2xl bg-black/20 border border-white/10">
                  <p className="text-lg sm:text-xl text-white font-semibold italic">
                    “No se trata de saber más, sino de progresar cada día.”
                  </p>
                </div>
              </div>

              <div>
                <div className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-white/5 border border-white/10 mb-4">
                  <Flame className="w-4 h-4 text-accent-orange" />
                  <span className="text-sm text-gray-300 font-medium">El progreso no es un evento. Es un hábito.</span>
                </div>
                <h4 className="text-xl font-bold mb-3">📲 Empieza hoy. Progresa siempre.</h4>
                <div className="space-y-3">
                  <Link href="/register">
                    <Button size="lg" className="w-full">
                      Crea tu cuenta gratuita
                      <ChevronRight className="ml-2 w-5 h-5" />
                    </Button>
                  </Link>
                  <Link href="/learn">
                    <Button size="lg" variant="outline" className="w-full border-white/20 text-white hover:bg-white/10">
                      Completa tu primera lección
                    </Button>
                  </Link>
                  <StartProButton className="w-full" />
                </div>
                <p className="text-xs text-gray-400 mt-4">
                  “Descarga Progressia” (próximamente). Por ahora puedes usar la versión web.
                </p>
              </div>
            </div>
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


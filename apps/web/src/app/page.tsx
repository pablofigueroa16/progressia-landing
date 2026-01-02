import Image from 'next/image'
import Link from 'next/link'
import { ThemeToggle } from '@/components/theme-toggle'
import { Button } from '@/components/ui/button'
import { StartProButton } from '@/components/billing/start-pro-button'
import { FadeIn, FadeInLi, FadeInSection, FadeInStagger, Stagger, StaggerList } from '@/components/motion/fade-in'
import {
  GraduationCap,
  Zap,
  Shield,
  Star,
  ChevronRight,
} from 'lucide-react'

const SECTION_TITLE_COLOR = 'text-brand-500'

export default function LandingPage() {
  return (
    <div className="min-h-screen bg-slate-50 dark:bg-dark-950 text-slate-900 dark:text-white overflow-hidden">
      {/* Background effects */}
      <div className="fixed inset-0 bg-[radial-gradient(ellipse_at_top,_var(--tw-gradient-stops))] from-brand-500/10 via-slate-50 to-slate-50 dark:from-brand-900/20 dark:via-dark-950 dark:to-dark-950" />
      <div className="fixed inset-0 bg-[url('/grid.svg')] bg-center opacity-10 dark:opacity-5" />

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
              <ThemeToggle className="text-slate-700 hover:text-slate-900 dark:text-white/80 dark:hover:text-white" />
              <Link href="/login">
                <Button variant="ghost" className="text-slate-700 hover:text-slate-900 dark:text-white/80 dark:hover:text-white">
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
      <FadeInSection className="relative z-10 pt-20 pb-32 px-4">
        <div className="max-w-7xl mx-auto">
          <div className="grid lg:grid-cols-2 gap-12 lg:gap-16 items-center">
            <Stagger className="text-center lg:text-left">
              <FadeIn>
                <h1 className="text-5xl sm:text-6xl lg:text-7xl font-bold font-display leading-tight mb-6">
                  La forma simple y efectiva de
                  <br />
                  <span className="bg-gradient-to-r from-brand-400 via-brand-500 to-accent-purple bg-clip-text text-transparent">
                    aprender finanzas
                  </span>
                </h1>
              </FadeIn>

              <FadeIn>
                <p className="text-xl text-slate-600 dark:text-gray-400 max-w-2xl mx-auto lg:mx-0 mb-10">
                  Aprende educación financiera y trading un poco cada día, con lecciones cortas y prácticas.
                </p>
              </FadeIn>

              <FadeIn>
                <div className="flex flex-col sm:flex-row gap-4 justify-center lg:justify-start">
                  <Link href="/register">
                    <Button size="xl" className="w-full sm:w-auto group">
                      Empezar Ahora - Es Gratis
                      <ChevronRight className="ml-2 w-5 h-5 group-hover:translate-x-1 transition-transform" />
                    </Button>
                  </Link>
                  <Link href="/login">
                    <Button
                      size="xl"
                      variant="outline"
                      className="w-full sm:w-auto border-slate-300 text-slate-900 hover:bg-slate-100 dark:border-white/20 dark:text-white dark:hover:bg-white/10"
                    >
                      Ya tengo una cuenta
                    </Button>
                  </Link>
                </div>
              </FadeIn>
            </Stagger>

            <FadeIn className="relative mx-auto w-full max-w-xl lg:max-w-none">
              <Image
                src="/hero.png"
                alt="Progreso financiero con Progressia"
                width={1200}
                height={900}
                className="h-auto w-full rounded-2xl"
                priority
                sizes="(max-width: 1024px) 100vw, 50vw"
              />
            </FadeIn>
          </div>
        </div>
      </FadeInSection>

      {/* Value Proposition Section */}
      <FadeInSection className="relative z-10 py-24 px-4">
        <div className="max-w-7xl mx-auto">
          <Stagger className="text-center">
            <FadeIn>
              <h2 className="text-3xl sm:text-5xl font-bold font-display mb-4">
                <span className={SECTION_TITLE_COLOR}>Aprender no tiene por qué ser complicado</span>
              </h2>
            </FadeIn>

            <FadeIn className="mt-12 max-w-4xl mx-auto">
              <div className="p-8 sm:p-10 rounded-2xl bg-white/80 border border-slate-200/80 shadow-sm dark:bg-white/5 dark:border-white/10 dark:shadow-none">
                <div className="flex flex-col sm:flex-row items-center justify-center gap-3 mb-4">
                  <GraduationCap className="w-6 h-6 text-green-300" />
                  <p className="text-lg sm:text-xl text-slate-900 dark:text-white font-semibold text-center sm:text-left">
                    Progressia convierte la educación financiera en una experiencia clara y progresiva.
                  </p>
                </div>
                <p className="text-slate-700 dark:text-gray-300 text-base sm:text-lg">
                  Cada lección está pensada para ayudarte a entender, practicar y avanzar sin presión.
                </p>
              </div>
            </FadeIn>
          </Stagger>
        </div>
      </FadeInSection>

      {/* How it works Section */}
      <FadeInSection id="features" className="relative z-10 py-24 px-4">
        <div className="max-w-7xl mx-auto">
          <Stagger className="text-center">
            <FadeIn>
              <h2 className="text-3xl sm:text-5xl font-bold font-display mb-4">
                <span className={SECTION_TITLE_COLOR}>Aprende en pocos minutos al día</span>
              </h2>
            </FadeIn>

            <FadeIn className="mt-12 max-w-4xl mx-auto">
              <div className="p-8 sm:p-10 rounded-2xl bg-white/80 border border-slate-200/80 shadow-sm dark:bg-white/5 dark:border-white/10 dark:shadow-none">
                <div className="flex flex-col sm:flex-row items-center justify-center gap-3 mb-4">
                  <Zap className="w-6 h-6 text-green-300" />
                  <p className="text-lg sm:text-xl text-slate-900 dark:text-white font-semibold text-center sm:text-left">
                    Con lecciones cortas y ejercicios simples, Progressia te guía paso a paso.
                  </p>
                </div>
                <p className="text-slate-700 dark:text-gray-300 text-base sm:text-lg">
                  Aprendes algo nuevo cada día y refuerzas lo aprendido sin saturarte.
                </p>
              </div>
            </FadeIn>
          </Stagger>
        </div>
      </FadeInSection>

      {/* Method Section */}
      <FadeInSection className="relative z-10 py-24 px-4">
        <div className="max-w-7xl mx-auto">
          <Stagger>
            <FadeIn className="text-center mb-12">
              <h2 className="text-5xl sm:text-5xl font-bold font-display mb-4">
                <span className={SECTION_TITLE_COLOR}>Un sistema diseñado para avanzar</span>
              </h2>
            </FadeIn>

            <Stagger className="grid md:grid-cols-2 gap-6">
              <FadeIn className="group p-8 rounded-2xl bg-white/80 border border-slate-200/80 shadow-sm hover:bg-white transition-all duration-300 dark:bg-white/5 dark:border-white/10 dark:shadow-none dark:hover:bg-white/10">
                <h3 className="text-2xl font-bold mb-2">📘 Lecciones cortas</h3>
                <p className="text-slate-600 dark:text-gray-400">
                  Conceptos claros que puedes completar en minutos.
                </p>
              </FadeIn>

              <FadeIn className="group p-8 rounded-2xl bg-white/80 border border-slate-200/80 shadow-sm hover:bg-white transition-all duration-300 dark:bg-white/5 dark:border-white/10 dark:shadow-none dark:hover:bg-white/10">
                <h3 className="text-2xl font-bold mb-2">🔁 Práctica diaria</h3>
                <p className="text-slate-600 dark:text-gray-400">
                  Refuerza lo aprendido sin sentirte abrumado.
                </p>
              </FadeIn>
            </Stagger>
          </Stagger>
        </div>
      </FadeInSection>

      {/* Motivation Section */}
      <FadeInSection className="relative z-10 py-24 px-4">
        <div className="max-w-7xl mx-auto">
          <div className="grid lg:grid-cols-2 gap-12 lg:gap-16 items-center">
            <Stagger className="text-center lg:text-left">
              <FadeIn>
                <h2 className="text-3xl sm:text-5xl font-bold font-display mb-4">
                  <span className={SECTION_TITLE_COLOR}>La constancia es la verdadera ventaja</span>
                </h2>
              </FadeIn>

              <FadeIn>
                <p className="text-slate-600 dark:text-gray-400 max-w-2xl mx-auto lg:mx-0">
                  Progressia usa mecánicas de juego para ayudarte a mantener el hábito.
                </p>
              </FadeIn>
              <FadeIn>
                <p className="text-slate-700 dark:text-gray-300 mt-4 max-w-2xl mx-auto lg:mx-0">
                  Aprender se vuelve algo diario, natural y motivador.
                </p>
              </FadeIn>
            </Stagger>

            <FadeIn className="relative mx-auto w-full max-w-xl lg:max-w-none">
              <Image
                src="/seccion4.png"
                alt="Motivación y constancia con Progressia"
                width={1200}
                height={900}
                className="h-auto w-full rounded-2xl"
                sizes="(max-width: 1024px) 100vw, 50vw"
              />
            </FadeIn>
          </div>
        </div>
      </FadeInSection>

      {/* Learning Section */}
      <FadeInSection className="relative z-10 py-24 px-4">
        <div className="max-w-7xl mx-auto">
          <div className="grid lg:grid-cols-2 gap-12 lg:gap-16 items-center">
            <Stagger className="text-center lg:text-left">
              <FadeIn>
                <h2 className="text-3xl sm:text-5xl font-bold font-display mb-4">
                  <span className={SECTION_TITLE_COLOR}>Educación financiera hecha simple</span>
                </h2>
              </FadeIn>

              <FadeIn>
                <p className="text-slate-600 dark:text-gray-400 max-w-2xl mx-auto lg:mx-0">
                  Aprenderás los fundamentos del dinero, las finanzas personales y los conceptos básicos del trading,
                  todo explicado de forma clara y progresiva para ayudarte a tomar mejores decisiones.
                </p>
              </FadeIn>
            </Stagger>

            <FadeIn className="relative mx-auto w-full max-w-xl lg:max-w-none">
              <Image
                src="/seccion5.png"
                alt="Qué aprenderás en Progressia"
                width={1200}
                height={900}
                className="h-auto w-full rounded-2xl"
                sizes="(max-width: 1024px) 100vw, 50vw"
              />
            </FadeIn>
          </div>
        </div>
      </FadeInSection>

      {/* Audience Section */}
      <FadeInSection className="relative z-10 py-24 px-4">
        <div className="max-w-7xl mx-auto">
          <Stagger>
            <FadeIn className="text-center mb-12">
              <h2 className="text-3xl sm:text-5xl font-bold font-display mb-4">
                <span className={SECTION_TITLE_COLOR}>Hecho para personas reales</span>
              </h2>
            </FadeIn>

            <Stagger className="grid md:grid-cols-3 gap-6">
              <FadeIn className="group p-8 rounded-2xl bg-white/80 border border-slate-200/80 shadow-sm hover:bg-white transition-all duration-300 dark:bg-white/5 dark:border-white/10 dark:shadow-none dark:hover:bg-white/10">
                <h3 className="text-2xl font-bold mb-2">🟢 Principiantes</h3>
                <p className="text-slate-600 dark:text-gray-400">
                  Empieza desde cero, sin experiencia previa.
                </p>
              </FadeIn>

              <FadeIn className="group p-8 rounded-2xl bg-white/80 border border-slate-200/80 shadow-sm hover:bg-white transition-all duration-300 dark:bg-white/5 dark:border-white/10 dark:shadow-none dark:hover:bg-white/10">
                <h3 className="text-2xl font-bold mb-2">🔵 Personas curiosas</h3>
                <p className="text-slate-600 dark:text-gray-400">
                  Entiende cómo funciona el dinero en la vida real.
                </p>
              </FadeIn>

              <FadeIn className="group p-8 rounded-2xl bg-white/80 border border-slate-200/80 shadow-sm hover:bg-white transition-all duration-300 dark:bg-white/5 dark:border-white/10 dark:shadow-none dark:hover:bg-white/10">
                <h3 className="text-2xl font-bold mb-2">🟣 Traders en formación</h3>
                <p className="text-slate-600 dark:text-gray-400">
                  Refuerza bases, disciplina y criterio.
                </p>
              </FadeIn>
            </Stagger>
          </Stagger>
        </div>
      </FadeInSection>

      {/* Progress Section */}
      <FadeInSection className="relative z-10 py-24 px-4">
        <div className="max-w-7xl mx-auto">
          <div className="grid lg:grid-cols-2 gap-12 lg:gap-16 items-center">
            <Stagger className="text-center lg:text-left">
              <FadeIn>
                <h2 className="text-3xl sm:text-5xl font-bold font-display mb-4">
                  <span className={SECTION_TITLE_COLOR}>Tu progreso siempre visible</span>
                </h2>
              </FadeIn>

              <FadeIn>
                <p className="text-slate-600 dark:text-gray-400 max-w-2xl mx-auto lg:mx-0">
                  Progressia no mide cuánto tiempo pasas mirando la pantalla.
                </p>
              </FadeIn>
              <FadeIn>
                <p className="text-slate-700 dark:text-gray-300 mt-4 max-w-2xl mx-auto lg:mx-0">
                  Mide cuánto aprendes y avanzas, día tras día.
                </p>
              </FadeIn>
            </Stagger>

            <FadeIn className="relative mx-auto w-full max-w-xl lg:max-w-none">
              <Image
                src="/seccion7.png"
                alt="Progreso visible con Progressia"
                width={1200}
                height={900}
                className="h-auto w-full rounded-2xl"
                sizes="(max-width: 1024px) 100vw, 50vw"
              />
            </FadeIn>
          </div>
        </div>
      </FadeInSection>

      {/* Community Section */}
      <FadeInSection className="relative z-10 py-24 px-4">
        <div className="max-w-7xl mx-auto">
          <div className="grid lg:grid-cols-2 gap-12 lg:gap-16 items-center">
            <Stagger className="text-center lg:text-left">
              <FadeIn>
                <h2 className="text-3xl sm:text-5xl font-bold font-display mb-4">
                  <span className={SECTION_TITLE_COLOR}>Aprender acompañado motiva más</span>
                </h2>
              </FadeIn>

              <FadeIn>
                <p className="text-slate-600 dark:text-gray-400 max-w-2xl mx-auto lg:mx-0">
                  Comparte el camino con otros estudiantes, participa en rankings y mantente motivado
                  aprendiendo junto a personas con el mismo objetivo.
                </p>
              </FadeIn>
            </Stagger>

            <FadeIn className="relative mx-auto w-full max-w-xl lg:max-w-none">
              <Image
                src="/seccion8.png"
                alt="Comunidad y motivación en Progressia"
                width={1200}
                height={900}
                className="h-auto w-full rounded-2xl"
                sizes="(max-width: 1024px) 100vw, 50vw"
              />
            </FadeIn>
          </div>
        </div>
      </FadeInSection>

      {/* Responsible Education Section */}
      <FadeInSection className="relative z-10 py-24 px-4">
        <div className="max-w-7xl mx-auto">
          <div className="grid lg:grid-cols-2 gap-12 lg:gap-16 items-center">
            <Stagger className="text-center lg:text-left">
              <FadeIn>
                <h2 className="text-3xl sm:text-5xl font-bold font-display mb-4">
                  <span className={SECTION_TITLE_COLOR}>Aprender primero, decidir mejor</span>
                </h2>
              </FadeIn>

              <FadeIn>
                <p className="text-slate-600 dark:text-gray-400 max-w-2xl mx-auto lg:mx-0">
                  Progressia es una plataforma educativa.
                </p>
              </FadeIn>
              <FadeIn>
                <p className="text-slate-700 dark:text-gray-300 mt-4 max-w-2xl mx-auto lg:mx-0">
                  No es un broker ni promete resultados financieros. La educación es el primer paso para tomar buenas decisiones.
                </p>
              </FadeIn>
            </Stagger>

            <FadeIn className="relative mx-auto w-full max-w-xl lg:max-w-none">
              <Image
                src="/seccion9.png"
                alt="Educación responsable en Progressia"
                width={1200}
                height={900}
                className="h-auto w-full rounded-2xl"
                sizes="(max-width: 1024px) 100vw, 50vw"
              />
            </FadeIn>
          </div>
        </div>
      </FadeInSection>


      {/* Pricing Section */}
      <FadeInSection className="relative z-10 py-24 px-4">
        <div className="max-w-5xl mx-auto">
          <Stagger>
            <FadeIn className="text-center mb-16">
              <h2 className="text-3xl sm:text-5xl font-bold font-display mb-4">
                <span className={SECTION_TITLE_COLOR}>Empieza gratis. Mejora cuando quieras.</span>
              </h2>
              <p className="text-slate-600 dark:text-gray-400">
                Progressia es gratuita para comenzar.
                Si quieres avanzar más rápido y desbloquear todo el contenido, puedes elegir Progressia
                Plus.
              </p>
            </FadeIn>

            <Stagger className="grid md:grid-cols-2 gap-8">
              {/* Free Plan */}
              <FadeIn className="p-8 rounded-2xl bg-white/80 border border-slate-200/80 shadow-sm dark:bg-white/5 dark:border-white/10 dark:shadow-none">
                <Stagger>
                  <FadeIn className="mb-6">
                    <h3 className="text-2xl font-bold mb-2">Gratis</h3>
                    <p className="text-slate-600 dark:text-gray-400 mb-4">
                      Aprende lo esencial y crea el hábito diario.
                    </p>
                    <div className="mb-6 inline-flex items-center gap-2 px-4 py-2 rounded-full bg-green-500/10 border border-green-500/20">
                      <span className="text-sm text-green-700 dark:text-green-300 font-semibold">Perfecto para empezar</span>
                    </div>
                    <div className="text-4xl font-bold">$0<span className="text-lg text-slate-500 dark:text-gray-400">/mes</span></div>
                  </FadeIn>

                  <StaggerList className="space-y-4 mb-8">
                    {[
                      'Lecciones básicas',
                      'Retos diarios',
                      'Progreso y rachas',
                    ].map((item, i) => (
                      <FadeInLi key={i} className="flex items-center gap-3">
                        <Star className="w-5 h-5 text-brand-500" />
                        <span className="text-slate-700 dark:text-gray-300">{item}</span>
                      </FadeInLi>
                    ))}
                  </StaggerList>

                  <FadeIn>
                    <Link href="/register">
                      <Button variant="outline" className="w-full border-slate-300 text-slate-900 hover:bg-slate-100 dark:border-white/20 dark:text-white dark:hover:bg-white/10">
                        Comenzar Gratis
                      </Button>
                    </Link>
                  </FadeIn>
                </Stagger>
              </FadeIn>

              {/* Pro Plan */}
              <FadeIn className="relative p-8 rounded-2xl bg-white/80 border border-slate-200/80 shadow-sm dark:bg-gradient-to-br dark:from-brand-500/20 dark:to-accent-purple/20 dark:border-brand-500/30 dark:shadow-none">
                <div className="absolute -top-4 left-1/2 -translate-x-1/2 px-4 py-1 bg-gradient-to-r from-brand-500 to-accent-purple rounded-full text-sm font-medium text-white shadow-sm dark:shadow-none">
                  Más Popular
                </div>
                <Stagger>
                  <FadeIn className="mb-6">
                    <h3 className="text-2xl font-bold mb-2">Progressia Plus</h3>
                    <p className="text-slate-700 dark:text-gray-300 mb-4">
                      Acceso completo para aprender sin límites.
                    </p>
                    <div className="mb-6 inline-flex items-center gap-2 px-4 py-2 rounded-full bg-green-500/10 border border-green-500/20">
                      <span className="text-sm text-green-700 dark:text-green-300 font-semibold">Perfecto para empezar</span>
                    </div>
                    <div className="text-4xl font-bold">$15.99<span className="text-lg text-slate-500 dark:text-gray-400">/mes</span></div>
                    <p className="text-sm text-slate-600 dark:text-gray-400 mt-1">o $149/año (ahorra 22%)</p>
                  </FadeIn>

                  <StaggerList className="space-y-4 mb-8">
                    {[
                      'Todo el contenido disponible',
                      'Lecciones avanzadas',
                      'Estadísticas de progreso',
                      'Acceso prioritario a nuevas funciones',
                    ].map((item, i) => (
                      <FadeInLi key={i} className="flex items-center gap-3">
                        <Star className="w-5 h-5 text-accent-gold" />
                        <span className="text-slate-700 dark:text-gray-300">{item}</span>
                      </FadeInLi>
                    ))}
                  </StaggerList>

                  <FadeIn>
                    <StartProButton className="w-full" />
                  </FadeIn>
                </Stagger>
              </FadeIn>
            </Stagger>

            <FadeIn className="mt-10 text-center text-sm text-slate-600 dark:text-gray-400">
              Puedes cancelar en cualquier momento.
              <span className="text-slate-700 dark:text-gray-300"> Sin compromisos. Sin letra pequeña.</span>
            </FadeIn>
          </Stagger>
        </div>
      </FadeInSection>

      {/* Accessibility Section */}
      <FadeInSection className="relative z-10 py-24 px-4">
        <div className="max-w-7xl mx-auto">
          <div className="grid lg:grid-cols-2 gap-12 lg:gap-16 items-center">
            <Stagger className="text-center lg:text-left">
              <FadeIn>
                <h2 className="text-3xl sm:text-4xl font-bold font-display mb-4">
                  <span className={SECTION_TITLE_COLOR}>Aprende cuando quieras</span>
                </h2>
              </FadeIn>

              <FadeIn>
                <p className="text-slate-600 dark:text-gray-400 max-w-2xl mx-auto lg:mx-0">
                  Desde tu móvil, en cualquier momento y en solo unos minutos al día.
                </p>
              </FadeIn>
              <FadeIn>
                <p className="text-slate-700 dark:text-gray-300 mt-4 max-w-2xl mx-auto lg:mx-0">
                  Aprender se adapta a tu vida, no al revés.
                </p>
              </FadeIn>
            </Stagger>

            <FadeIn className="relative mx-auto w-full max-w-xl lg:max-w-none">
              <Image
                src="/seccion11.png"
                alt="Accesibilidad y aprendizaje flexible en Progressia"
                width={1200}
                height={900}
                className="h-auto w-full rounded-2xl"
                sizes="(max-width: 1024px) 100vw, 50vw"
              />
            </FadeIn>
          </div>
        </div>
      </FadeInSection>

      {/* Vision Section */}
      <FadeInSection className="relative z-10 py-24 px-4">
        <div className="max-w-5xl mx-auto">
          <Stagger className="text-center">
            <FadeIn>
              <h2 className="text-3xl sm:text-5xl font-bold font-display mb-4">
                <span className={SECTION_TITLE_COLOR}>Una idea simple</span>
              </h2>
            </FadeIn>

            <FadeIn className="mt-10 p-8 sm:p-10 rounded-2xl">
              <p className="text-slate-700 dark:text-gray-300 text-base sm:text-lg">
                La educación financiera debería ser clara, accesible y constante.
              </p>
              <p className="text-slate-700 dark:text-gray-300 text-base sm:text-lg mt-4">
                Progressia existe para ayudarte a progresar todos los días.
              </p>
            </FadeIn>
          </Stagger>
        </div>
      </FadeInSection>

      {/* CTA Section */}
      <FadeInSection className="relative z-10 py-24 px-4">
        <div className="max-w-4xl mx-auto text-center">
          <Stagger>
            <FadeIn>
              <h2 className="text-3xl sm:text-5xl font-bold font-display mb-6">
                <span className={SECTION_TITLE_COLOR}>Empieza hoy</span>
              </h2>
            </FadeIn>
            <FadeIn>
              <p className="text-slate-600 dark:text-gray-400 mb-8 max-w-2xl mx-auto">
                Crea tu cuenta gratuita y completa tu primera lección.
              </p>
            </FadeIn>
            <FadeIn>
              <Link href="/register">
                <Button size="xl" className="group">
                  Crear Cuenta Gratis
                  <ChevronRight className="ml-2 w-5 h-5 group-hover:translate-x-1 transition-transform" />
                </Button>
              </Link>
            </FadeIn>
            <FadeIn>
              <p className="text-slate-600 dark:text-gray-400 mt-4">
                ¿Ya tienes cuenta?{' '}
                <Link href="/login" className="text-brand-400 hover:text-brand-300 font-medium">
                  Inicia sesión
                </Link>
              </p>
            </FadeIn>
          </Stagger>
        </div>
      </FadeInSection>

      {/* Footer */}
      <footer className="relative z-10 border-t border-white/5 py-12 px-4">
        <FadeInStagger className="max-w-7xl mx-auto">
          <FadeIn className="flex flex-col md:flex-row justify-between items-center gap-6">
            <div className="flex items-center gap-2">
              <Image
                src="/progressia.png"
                alt="Progressia"
                width={200}
                height={80}
                className="h-20 w-auto"
              />
            </div>
            <div className="flex items-center gap-6 text-sm text-slate-600 dark:text-gray-400">
              <Link href="/terms" className="hover:text-slate-900 dark:hover:text-white transition-colors">Términos</Link>
              <Link href="/privacy" className="hover:text-slate-900 dark:hover:text-white transition-colors">Privacidad</Link>
              <Link href="/contact" className="hover:text-slate-900 dark:hover:text-white transition-colors">Contacto</Link>
            </div>
          </FadeIn>

          {/* Risk Disclaimer */}
          <FadeIn className="mt-8 p-4 rounded-lg bg-yellow-500/10 border border-yellow-500/20 text-sm text-yellow-900/80 dark:text-yellow-200/80">
            <div className="flex items-start gap-3">
              <Shield className="w-5 h-5 text-yellow-500 flex-shrink-0 mt-0.5" />
              <p>
                <strong>Aviso de Riesgo:</strong> Progressia es una plataforma educativa.
                El contenido no constituye asesoría financiera. Operar en mercados financieros
                conlleva riesgos significativos. Consulta siempre con un profesional antes de invertir.
              </p>
            </div>
          </FadeIn>

          <FadeIn className="mt-8 text-center text-sm text-slate-500 dark:text-gray-500">
            © 2024 Progressia. Todos los derechos reservados.
          </FadeIn>
        </FadeInStagger>
      </footer>
    </div>
  )
}


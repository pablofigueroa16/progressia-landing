'use client'

import Image from 'next/image'
import Link from 'next/link'
import { ThemeToggle } from '@/components/theme-toggle'
import { WaitlistButton } from '@/components/waitlist/waitlist-button'
import { TypingText } from '@/components/motion/typing-text'
import { FadeIn, FadeInLi, FadeInSection, FadeInStagger, Stagger, StaggerList } from '@/components/motion/fade-in'
import { BorderBeam } from '@/components/lightswind/border-beam'
import { SparkleParticles } from '@/components/ui/SparkleParticles'
import { useLanguage } from '@/contexts/language-context'
import { MethodLessonsIcon, MethodPracticeIcon, MethodProgressIcon } from '@/components/icons/method-icons'
import { AudienceBeginnersIcon, AudienceCuriousIcon, AudienceTradersIcon } from '@/components/icons/audience-icons'
import {
  Shield,
  Star,
} from 'lucide-react'
import { LanguageToggle } from '@/components/language-toggle'

const SECTION_TITLE_COLOR = 'text-brand-500'

export default function LandingPage() {
  const { t } = useLanguage()

  return (
    <div className="min-h-screen bg-slate-50 dark:bg-dark-950 text-slate-900 dark:text-white overflow-x-hidden">
      {/* Background effects */}
      <div className="fixed inset-0 bg-[radial-gradient(ellipse_at_top,_var(--tw-gradient-stops))] from-brand-500/10 via-slate-50 to-slate-50 dark:from-brand-900/20 dark:via-dark-950 dark:to-dark-950" />
      <div className="fixed inset-0 bg-[url('/grid.svg')] bg-center opacity-10 dark:opacity-5" />

      {/* Navigation */}
      <nav className="sticky top-0 z-50 border-b border-slate-200/60 bg-slate-50/80 backdrop-blur-xl supports-[backdrop-filter]:bg-slate-50/60 dark:border-white/10 dark:bg-dark-950/60">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-0">
          <div className="flex items-center justify-between h-16">
            <div className="flex items-center gap-2">
              <Image
                src="/logo2.png"
                alt="Progressia"
                width={960}
                height={240}
                quality={100}
                className="h-12 w-auto"
                priority
              />
            </div>
            <div className="flex items-center gap-2">
              <LanguageToggle className="text-slate-700 hover:text-slate-900 dark:text-white/80 dark:hover:text-white" />
              <ThemeToggle className="text-slate-700 hover:text-slate-900 dark:text-white/80 dark:hover:text-white" />
              {/* <Link href="/login">
                <Button variant="ghost" className="text-slate-700 hover:text-slate-900 dark:text-white/80 dark:hover:text-white">
                  Iniciar Sesión
                </Button>
              </Link>
              <Link href="/register">
                <Button className="bg-brand-500 hover:bg-brand-600">
                  Comenzar Gratis
                </Button>
              </Link> */}
            </div>
          </div>
        </div>
      </nav>

      {/* Hero Section */}
      <FadeInSection className="relative z-10 pt-12 pb-16 md:pt-16 md:pb-24 lg:pt-20 lg:pb-32 px-4 sm:px-6 lg:px-8">
        <div className="max-w-7xl mx-auto">
          <div className="grid lg:grid-cols-2 gap-12 lg:gap-16 items-center">
            <Stagger className="text-center lg:text-left">
              <FadeIn>
                <h1 className="text-5xl sm:text-6xl lg:text-7xl font-bold font-display leading-tight mb-6">
                  <span className="block mb-2">{t('hero.title1')}</span>
                  <span className="flex flex-wrap items-baseline justify-center lg:justify-start gap-x-2 sm:gap-x-3">
                    <span className="text-brand-500 whitespace-nowrap">{t('hero.title2')}</span>
                    <TypingText
                      words={[t('hero.word1'), t('hero.word2')]}
                      className="text-brand-500"
                    />
                  </span>
                </h1>
              </FadeIn>

              <FadeIn>
                <p className="text-xl text-slate-600 dark:text-gray-400 max-w-2xl mx-auto lg:mx-0 mb-10">
                  {t('hero.description')}
                </p>
              </FadeIn>

              <FadeIn>
                <div className="flex flex-col sm:flex-row gap-4 justify-center lg:justify-start">
                  <WaitlistButton />
                  {/* <Link href="/login">
                    <Button
                      size="xl"
                      variant="outline"
                      className="w-full sm:w-auto border-slate-300 text-slate-900 hover:bg-slate-100 dark:border-white/20 dark:text-white dark:hover:bg-white/10"
                    >
                      Ya tengo una cuenta
                    </Button>
                  </Link> */}
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
      <FadeInSection className="relative z-10 py-12 md:py-16 lg:py-24 px-4 sm:px-6 lg:px-8">
        <div className="max-w-7xl mx-auto">
          <div className="grid lg:grid-cols-2 gap-12 lg:gap-16 items-center">
            <Stagger className="text-center lg:text-left lg:order-2">
              <FadeIn>
                <h2 className="text-3xl sm:text-5xl font-bold font-display mb-4">
                  <span className={SECTION_TITLE_COLOR}>Aprender no tiene por qué ser complicado</span>
                </h2>
              </FadeIn>

              <FadeIn>
                <p className="text-slate-700 dark:text-gray-300 mt-4 max-w-2xl mx-auto lg:mx-0">
                  Progressia convierte la educación financiera en una experiencia clara y progresiva.
                </p>
              </FadeIn>
              <FadeIn>
                <p className="text-slate-600 dark:text-gray-400 max-w-2xl mx-auto lg:mx-0">
                  Cada lección está pensada para ayudarte a entender, practicar y avanzar sin presión.
                </p>
              </FadeIn>
            </Stagger>

            <FadeIn className="relative mx-auto w-full max-w-xl lg:max-w-none lg:order-1">
              <Image
                src="/seccion1.png"
                alt="Aprendizaje claro y progresivo con Progressia"
                width={1200}
                height={900}
                className="h-auto w-full rounded-2xl"
                sizes="(max-width: 1024px) 100vw, 50vw"
              />
            </FadeIn>
          </div>
        </div>
      </FadeInSection>

      {/* How it works Section */}
      <FadeInSection id="features" className="relative z-10 py-12 md:py-16 lg:py-24 px-4 sm:px-6 lg:px-8">
        <div className="max-w-7xl mx-auto">
          <div className="grid lg:grid-cols-2 gap-12 lg:gap-16 items-center">
            <Stagger className="text-center lg:text-left">
              <FadeIn>
                <h2 className="text-3xl sm:text-5xl font-bold font-display mb-4">
                  <span className={SECTION_TITLE_COLOR}>Aprende en pocos minutos al día</span>
                </h2>
              </FadeIn>

              <FadeIn>
                <p className="text-slate-700 dark:text-gray-300 mt-4 max-w-2xl mx-auto lg:mx-0">
                  Con lecciones cortas y ejercicios simples, Progressia te guía paso a paso.
                </p>
              </FadeIn>
              <FadeIn>
                <p className="text-slate-600 dark:text-gray-400 max-w-2xl mx-auto lg:mx-0">
                  Aprendes algo nuevo cada día y refuerzas lo aprendido sin saturarte.
                </p>
              </FadeIn>
            </Stagger>

            <FadeIn className="relative mx-auto w-full max-w-xl lg:max-w-none">
              <Image
                src="/seccion2.png"
                alt="Aprendizaje en pocos minutos al día con Progressia"
                width={1200}
                height={900}
                className="h-auto w-full rounded-2xl"
                sizes="(max-width: 1024px) 100vw, 50vw"
              />
            </FadeIn>
          </div>
        </div>
      </FadeInSection>

      {/* Method Section */}
      <FadeInSection className="relative z-10 py-12 md:py-16 lg:py-24 px-4 sm:px-6 lg:px-8">
        <div className="max-w-7xl mx-auto">
          <Stagger>
            <FadeIn className="text-center mb-12">
              <h2 className="text-5xl sm:text-5xl font-bold font-display mb-4">
                <span className={SECTION_TITLE_COLOR}>Un sistema diseñado para avanzar</span>
              </h2>
            </FadeIn>

            <Stagger className="grid md:grid-cols-3 gap-6">
              <FadeIn className="group p-8 rounded-2xl bg-white/80 border border-slate-200/80 shadow-sm hover:bg-white transition-all duration-300 dark:bg-white/5 dark:border-white/10 dark:shadow-none dark:hover:bg-white/10">
                <div className="flex items-center gap-3 mb-3">
                  <div className="inline-flex h-11 w-11 items-center justify-center rounded-xl bg-brand-500/20 text-brand-600 dark:bg-brand-500/10 dark:text-brand-400">
                    <MethodLessonsIcon />
                  </div>
                  <h3 className="text-2xl font-bold">Lecciones cortas</h3>
                </div>
                <p className="text-slate-600 dark:text-gray-400">
                  Conceptos claros que puedes completar en minutos.
                </p>
              </FadeIn>

              <FadeIn className="group p-8 rounded-2xl bg-white/80 border border-slate-200/80 shadow-sm hover:bg-white transition-all duration-300 dark:bg-white/5 dark:border-white/10 dark:shadow-none dark:hover:bg-white/10">
                <div className="flex items-center gap-3 mb-3">
                  <div className="inline-flex h-11 w-11 items-center justify-center rounded-xl bg-purple-500/10 text-purple-600 dark:bg-purple-500/10 dark:text-purple-400">
                    <MethodPracticeIcon />
                  </div>
                  <h3 className="text-2xl font-bold">Práctica diaria</h3>
                </div>
                <p className="text-slate-600 dark:text-gray-400">
                  Refuerza lo aprendido sin sentirte abrumado.
                </p>
              </FadeIn>

              <FadeIn className="group p-8 rounded-2xl bg-white/80 border border-slate-200/80 shadow-sm hover:bg-white transition-all duration-300 dark:bg-white/5 dark:border-white/10 dark:shadow-none dark:hover:bg-white/10">
                <div className="flex items-center gap-3 mb-3">
                  <div className="inline-flex h-11 w-11 items-center justify-center rounded-xl bg-amber-500/10 text-amber-600 dark:bg-amber-500/10 dark:text-amber-400">
                    <MethodProgressIcon />
                  </div>
                  <h3 className="text-2xl font-bold">Progreso visible</h3>
                </div>
                <p className="text-slate-600 dark:text-gray-400">
                  Sigue tu avance, mantén tu racha y sube de nivel.
                </p>
              </FadeIn>
            </Stagger>
          </Stagger>
        </div>
      </FadeInSection>

      {/* Motivation Section */}
      <FadeInSection className="relative z-10 py-12 md:py-16 lg:py-24 px-4 sm:px-6 lg:px-8">
        <div className="max-w-7xl mx-auto">
          <div className="grid lg:grid-cols-2 gap-12 lg:gap-16 items-center">
            <Stagger className="text-center lg:text-left lg:order-2">
              <FadeIn>
                <h2 className="text-3xl sm:text-5xl font-bold font-display mb-4">
                  <span className={SECTION_TITLE_COLOR}>La constancia es la verdadera ventaja</span>
                </h2>
              </FadeIn>

              <FadeIn>
                <p className="text-slate-700 dark:text-gray-300 mt-4 max-w-2xl mx-auto lg:mx-0">
                  Progressia usa mecánicas de juego para ayudarte a mantener el hábito.
                </p>
              </FadeIn>
              <FadeIn>
                <p className="text-slate-600 dark:text-gray-400 max-w-2xl mx-auto lg:mx-0">
                  Aprender se vuelve algo diario, natural y motivador.
                </p>
              </FadeIn>
            </Stagger>

            <FadeIn className="relative mx-auto w-full max-w-xl lg:max-w-none lg:order-1">
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
      <FadeInSection className="relative z-10 py-12 md:py-16 lg:py-24 px-4 sm:px-6 lg:px-8">
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
      <FadeInSection className="relative z-10 py-12 md:py-16 lg:py-24 px-4 sm:px-6 lg:px-8">
        <div className="max-w-7xl mx-auto">
          <Stagger>
            <FadeIn className="text-center mb-12">
              <h2 className="text-3xl sm:text-5xl font-bold font-display mb-4">
                <span className={SECTION_TITLE_COLOR}>Hecho para personas reales</span>
              </h2>
            </FadeIn>

            <Stagger className="grid md:grid-cols-3 gap-6">
              <FadeIn className="group p-8 rounded-2xl bg-white/80 border border-slate-200/80 shadow-sm hover:bg-white transition-all duration-300 dark:bg-white/5 dark:border-white/10 dark:shadow-none dark:hover:bg-white/10">
                <div className="flex items-center gap-3 mb-3">
                  <div className="inline-flex h-11 w-11 items-center justify-center rounded-xl bg-green-500/10 text-green-600 dark:bg-green-500/10 dark:text-green-400">
                    <AudienceBeginnersIcon />
                  </div>
                  <h3 className="text-2xl font-bold">Principiantes</h3>
                </div>
                <p className="text-slate-600 dark:text-gray-400">
                  Empieza desde cero, sin experiencia previa.
                </p>
              </FadeIn>

              <FadeIn className="group p-8 rounded-2xl bg-white/80 border border-slate-200/80 shadow-sm hover:bg-white transition-all duration-300 dark:bg-white/5 dark:border-white/10 dark:shadow-none dark:hover:bg-white/10">
                <div className="flex items-center gap-3 mb-3">
                  <div className="inline-flex h-11 w-11 items-center justify-center rounded-xl bg-sky-500/10 text-sky-600 dark:bg-sky-500/10 dark:text-sky-400">
                    <AudienceCuriousIcon />
                  </div>
                  <h3 className="text-2xl font-bold">Personas curiosas</h3>
                </div>
                <p className="text-slate-600 dark:text-gray-400">
                  Entiende cómo funciona el dinero en la vida real.
                </p>
              </FadeIn>

              <FadeIn className="group p-8 rounded-2xl bg-white/80 border border-slate-200/80 shadow-sm hover:bg-white transition-all duration-300 dark:bg-white/5 dark:border-white/10 dark:shadow-none dark:hover:bg-white/10">
                <div className="flex items-center gap-3 mb-3">
                  <div className="inline-flex h-11 w-11 items-center justify-center rounded-xl bg-fuchsia-500/10 text-fuchsia-600 dark:bg-fuchsia-500/10 dark:text-fuchsia-400">
                    <AudienceTradersIcon />
                  </div>
                  <h3 className="text-2xl font-bold">Traders en formación</h3>
                </div>
                <p className="text-slate-600 dark:text-gray-400">
                  Refuerza bases, disciplina y criterio.
                </p>
              </FadeIn>
            </Stagger>
          </Stagger>
        </div>
      </FadeInSection>

      {/* Progress Section */}
      <FadeInSection className="relative z-10 py-12 md:py-16 lg:py-24 px-4 sm:px-6 lg:px-8">
        <div className="max-w-7xl mx-auto">
          <div className="grid lg:grid-cols-2 gap-12 lg:gap-16 items-center">
            <Stagger className="text-center lg:text-left lg:order-2">
              <FadeIn>
                <h2 className="text-3xl sm:text-5xl font-bold font-display mb-4">
                  <span className={SECTION_TITLE_COLOR}>Tu progreso siempre visible</span>
                </h2>
              </FadeIn>

              <FadeIn>
                <p className="text-slate-700 dark:text-gray-300 mt-4 max-w-2xl mx-auto lg:mx-0">
                  Progressia no mide cuánto tiempo pasas mirando la pantalla.
                </p>
              </FadeIn>
              <FadeIn>
                <p className="text-slate-600 dark:text-gray-400 max-w-2xl mx-auto lg:mx-0">
                  Mide cuánto aprendes y avanzas, día tras día.
                </p>
              </FadeIn>
            </Stagger>

            <FadeIn className="relative mx-auto w-full max-w-xl lg:max-w-none lg:order-1">
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
      <FadeInSection className="relative z-10 py-12 md:py-16 lg:py-24 px-4 sm:px-6 lg:px-8">
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

      {/* Impact Numbers Section */}
      <FadeInSection className="relative z-10 pt-12 md:pt-16 lg:pt-24 px-4 sm:px-6 lg:px-8">
        <div className="max-w-7xl mx-auto">
          <Stagger className="text-center">
            <FadeIn>
              <h2 className="text-3xl sm:text-5xl font-bold font-display mb-4">
                <span className={SECTION_TITLE_COLOR}>Progressia en números</span>
              </h2>
            </FadeIn>

            <FadeIn>
              <p className="text-slate-600 font-bold dark:text-gray-400 text-lg max-w-3xl mx-auto mb-4">
                Aprender con impacto real
              </p>
            </FadeIn>

            <FadeIn>
              <p className="text-slate-700 dark:text-gray-300 text-base max-w-3xl mx-auto mb-2">
                Progressia nace con una misión clara:
              </p>
              <p className="text-slate-700 dark:text-gray-300 text-base max-w-3xl mx-auto mb-2">Educar mejor, llegar más lejos y generar impacto positivo.</p>
            </FadeIn>

            <Stagger className="grid md:grid-cols-3 gap-8 mt-12">
              {/* Card 1: +4,000 preguntas */}
              <FadeIn className="flex flex-col items-center">
                <div className="relative w-full max-w-sm">
                  <Image
                    src="/tarjeta sección +4000 preguntas.png"
                    alt="+4,000 preguntas sobre trading"
                    width={400}
                    height={400}
                    className="h-auto w-full"
                  />
                </div>
                <div className="mt-6 text-center px-4">
                  <h3 className="text-2xl font-bold mb-2 text-slate-900 dark:text-white">+4.000 preguntas</h3>
                  <p className="text-slate-600 dark:text-gray-400">
                    Sobre trading y educación financiera, diseñadas para aprender paso a paso.
                  </p>
                </div>
              </FadeIn>

              {/* Card 2: +750M usuarios */}
              <FadeIn className="flex flex-col items-center">
                <div className="relative w-full max-w-sm">
                  <Image
                    src="/tarjeta +750M usuarios.png"
                    alt="+750 millones de personas"
                    width={400}
                    height={400}
                    className="h-auto w-full"
                  />
                </div>
                <div className="mt-6 text-center px-4">
                  <h3 className="text-2xl font-bold mb-2 text-slate-900 dark:text-white">+750 millones de personas</h3>
                  <p className="text-slate-600 dark:text-gray-400">
                    Creemos que millones estudiarán con Progressia en los próximos años.
                  </p>
                </div>
              </FadeIn>

              {/* Card 3: 10% con propósito */}
              <FadeIn className="flex flex-col items-center">
                <div className="relative w-full max-w-sm">
                  <Image
                    src="/donaciontarjeta.png"
                    alt="10% con propósito"
                    width={400}
                    height={400}
                    className="h-auto w-full"
                  />
                </div>
                <div className="mt-6 text-center px-4">
                  <h3 className="text-2xl font-bold mb-2 text-slate-900 dark:text-white">10% con propósito</h3>
                  <p className="text-slate-600 dark:text-gray-400">
                    El 10% de lo que generemos irá a niños y jóvenes de Latinoamérica que necesiten acceso a educación de calidad.
                  </p>
                </div>
              </FadeIn>
            </Stagger>
          </Stagger>
        </div>
      </FadeInSection>

      {/* Responsible Education Section */}
      <FadeInSection className="relative z-10 py-12 md:py-16 lg:py-24 px-4 sm:px-6 lg:px-8">
        <div className="max-w-7xl mx-auto">
          <div className="grid lg:grid-cols-2 gap-12 lg:gap-16 items-center">
            <Stagger className="text-center lg:text-left lg:order-2">
              <FadeIn>
                <h2 className="text-3xl sm:text-5xl font-bold font-display mb-4">
                  <span className={SECTION_TITLE_COLOR}>Aprender primero, decidir mejor</span>
                </h2>
              </FadeIn>

              <FadeIn>
                <p className="text-slate-700 dark:text-gray-300 mt-4 max-w-2xl mx-auto lg:mx-0">
                  Progressia es una plataforma educativa.
                </p>
              </FadeIn>
              <FadeIn>
                <p className="text-slate-600 dark:text-gray-400 max-w-2xl mx-auto lg:mx-0">
                  No es un broker ni promete resultados financieros. La educación es el primer paso para tomar buenas decisiones.
                </p>
              </FadeIn>
            </Stagger>

            <FadeIn className="relative mx-auto w-full max-w-xl lg:max-w-none lg:order-1">
              <Image
                src="/educacion.png"
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


      {/* Progressia Smart Section */}
      <FadeInSection className="relative py-16 md:py-20 lg:py-28 px-4 sm:px-6 lg:px-8 bg-white dark:bg-black overflow-hidden">
        <SparkleParticles
          className="absolute inset-0 pointer-events-none"
          maxParticleSize={6}
          minParticleSize={3}
          maxSpeed={1}
          minMoveSpeed={0.2}
          maxOpacity={0.7}
          customDirection="top"
          opacityAnimationSpeed={2}
          minParticleOpacity={0.2}
          particleColor="#61c021"
          zIndexLevel={1}
          particleCount={30}
          particleShape="star"
        />
        <div className="max-w-7xl mx-auto relative z-20">
          <div className="grid lg:grid-cols-2 gap-12 lg:gap-16 items-center">
            <Stagger className="text-center lg:text-left">
              <FadeIn className="relative mx-auto w-full max-w-xl lg:max-w-none">
                {/* Light theme */}
                <Image
                  src="/smart_claro.png"
                  alt="Progressia Smart (tema claro)"
                  width={1000}
                  height={800}
                  className="block w-full h-auto dark:hidden"
                  sizes="(max-width: 1024px) 100vw, 50vw"
                />
                {/* Dark theme */}
                <Image
                  src="/smart_oscuro.png"
                  alt="Progressia Smart (tema oscuro)"
                  width={1000}
                  height={800}
                  className="hidden w-full h-auto dark:block"
                  sizes="(max-width: 1024px) 100vw, 50vw"
                />
              </FadeIn>
            </Stagger>

            <FadeIn className="relative mx-auto w-full max-w-xl lg:max-w-none">
              <div className="absolute top-10 left-1/2 -translate-x-1/2 w-full flex justify-center px-4">
                <h2 className="text-3xl sm:text-6xl font-bold font-display mb-4 dark:text-white text-brand-500">
                  ¡Crece sin limites!
                </h2>
              </div>
              <Image
                src="/progressia_smart.png"
                alt="Progressia Smart"
                width={1000}
                height={800}
                className="h-auto w-full"
                sizes="(max-width: 1024px) 100vw, 50vw"
              />
              <div className="absolute bottom-8 left-1/2 -translate-x-1/2 w-full flex justify-center px-4">
                <WaitlistButton />
              </div>
            </FadeIn>
          </div>
        </div>
      </FadeInSection>


      {/* Pricing Section */}
      <FadeInSection className="relative z-10 py-12 md:py-16 lg:py-24 px-4 sm:px-6 lg:px-8">
        <div className="max-w-5xl mx-auto">
          <Stagger>
            <FadeIn className="text-center mb-16">
              <h2 className="text-3xl sm:text-5xl font-bold font-display mb-4">
                <span className={SECTION_TITLE_COLOR}>Empieza gratis. Mejora cuando quieras.</span>
              </h2>
              <p className="font-bold text-slate-600 dark:text-gray-400 mb-4">
                Progressia es gratuita para comenzar.
              </p>
              <p className="text-slate-700 dark:text-gray-300 text-base mx-auto mb-2">Si quieres avanzar más rápido y desbloquear todo el contenido, puedes elegir Progressia
                Smart.</p>
            </FadeIn>

            <Stagger className="grid md:grid-cols-2 gap-8">
              {/* Free Plan */}
              <FadeIn className="relative p-1 rounded-2xl">
                <div className="relative p-8 rounded-2xl bg-white/80  border border-slate-200/80 dark:bg-white/5 dark:border-white/10 dark:shadow-none flex flex-col h-full z-10">
                  <Stagger className="flex flex-col h-full">
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

                    <StaggerList className="space-y-4 mb-8 flex-1">
                      {[
                        'Niveles 1-2 completos',
                        'Gamificación básica (XP, rachas, ranking)',
                        'Sistema de amigos',
                        '2 retos por semana',
                        'Leaderboard semanal',
                      ].map((item, i) => (
                        <FadeInLi key={i} className="flex items-center gap-3">
                          <Star className="w-5 h-5 text-brand-500" />
                          <span className="text-slate-700 dark:text-gray-300">{item}</span>
                        </FadeInLi>
                      ))}
                    </StaggerList>

                    <FadeIn className="mt-auto mb-4">
                      <WaitlistButton
                        text="Acceso anticipado"
                        variant="outline"
                        className="border-slate-300 text-slate-900 hover:bg-slate-100 dark:border-white/20 dark:text-white dark:hover:bg-white/10"
                      />
                    </FadeIn>
                  </Stagger>
                </div>
              </FadeIn>

              {/* Pro Plan */}
              <FadeIn className="relative p-1 rounded-2xl">
                <BorderBeam
                  colorFrom="#61c021"
                  colorTo="#7ed631"
                  size={300}
                  duration={4}
                  delay={0}
                  opacity={1}
                  borderThickness={10}
                  glowIntensity={10}
                  pauseOnHover={true}
                />
                <div className="absolute -top-4 left-1/2 -translate-x-1/2 px-4 py-1 bg-brand-500 rounded-full text-sm font-medium text-white shadow-sm dark:shadow-none z-20">
                  Más Popular
                </div>
                <div className="relative p-8 rounded-2xl bg-white/800 dark:bg-dark-950 dark:bg-gradient-to-br dark:from-brand-500/12 dark:via-dark-950 dark:to-accent-purple/10 dark:border-brand-500/30 dark:shadow-none flex flex-col h-full z-10">
                  <Stagger className="flex flex-col h-full">
                    <FadeIn className="mb-6">
                      <h3 className="text-2xl font-bold mb-2">Progressia Smart</h3>
                      <p className="text-slate-700 dark:text-gray-300 mb-4">
                        Acceso completo para aprender sin límites.
                      </p>
                      <div className="mb-6 inline-flex items-center gap-2 px-4 py-2 rounded-full bg-green-500/10 border border-green-500/20">
                        <span className="text-sm text-green-700 dark:text-green-300 font-semibold">Perfecto para empezar</span>
                      </div>
                      <div className="text-4xl font-bold">$15.99<span className="text-lg text-slate-500 dark:text-gray-400">/mes</span></div>
                      <p className="text-sm text-slate-600 dark:text-gray-400 mt-1">o $163.99/año (ahorra 15%)</p>
                    </FadeIn>

                    <StaggerList className="space-y-4 mb-8 flex-1">
                      {[
                        'Todos los niveles desbloqueados',
                        'Retos ilimitados',
                        'Estadísticas avanzadas',
                        'Certificación en blockchain',
                        'Coach AI personalizado (próximamente)',
                        'Soporte prioritario',
                        'Sin publicidad',
                      ].map((item, i) => (
                        <FadeInLi key={i} className="flex items-center gap-3">
                          <Star className="w-5 h-5 text-accent-gold" />
                          <span className="text-slate-700 dark:text-gray-300">{item}</span>
                        </FadeInLi>
                      ))}
                    </StaggerList>

                    <FadeIn className="mt-auto mb-4">
                      <WaitlistButton
                        text="Acceso anticipado"
                        className="bg-brand-500 hover:bg-brand-600"
                      />
                    </FadeIn>
                  </Stagger>
                </div>
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
      <FadeInSection className="relative z-10 py-12 md:py-16 lg:py-24 px-4 sm:px-6 lg:px-8">
        <div className="max-w-7xl mx-auto">
          <div className="grid lg:grid-cols-2 gap-12 lg:gap-16 items-center">
            <Stagger className="text-center lg:text-left">
              <FadeIn>
                <h2 className="text-3xl sm:text-4xl font-bold font-display mb-4">
                  <span className={SECTION_TITLE_COLOR}>Aprende cuando quieras</span>
                </h2>
              </FadeIn>

              <FadeIn>
                <p className="text-slate-700 dark:text-gray-300 mt-4 max-w-2xl mx-auto lg:mx-0">
                  Desde tu móvil, en cualquier momento y en solo unos minutos al día.
                </p>
              </FadeIn>
              <FadeIn>
                <p className="text-slate-600 dark:text-gray-400 max-w-2xl mx-auto lg:mx-0">
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
      <FadeInSection className="relative z-10 py-12 md:py-16 lg:py-24 px-4 sm:px-6 lg:px-8">
        <div className="max-w-6xl mx-auto">
          <FadeIn className="relative p-1 rounded-3xl">
            <BorderBeam
              colorFrom="#61c021"
              colorTo="#7ed631"
              size={300}
              duration={4}
              delay={0}
              opacity={1}
              borderThickness={10}
              glowIntensity={10}
              pauseOnHover={true}
            />
            <div className="relative overflow-hidden rounded-3xl">
              {/* Background image */}
              <div className="absolute inset-0 z-0">
                <Image
                  src="/seccion_vision.png"
                  alt=""
                  fill
                  className="object-cover object-[center_20%] opacity-50 dark:opacity-50"
                  sizes="100vw"
                />
              </div>

              {/* Content */}
              <div className="relative z-10 px-6 py-12 sm:px-12 sm:py-16 lg:px-16 lg:py-24 text-left">
                <Stagger>
                  <FadeIn>
                    <h2 className="text-3xl sm:text-5xl lg:text-6xl font-bold font-display mb-6 text-brand-500 dark:text-white">
                      Una idea simple
                    </h2>
                  </FadeIn>

                  <FadeIn>
                    <p className="text-left dark:text-gray-300 text-slate-700 text-base sm:text-lg lg:text-xl max-w-3xl mb-4">
                      La educación financiera debería ser clara, accesible y constante.
                    </p>
                    <p className="text-left dark:text-gray-400 text-slate-600 text-base sm:text-lg lg:text-xl max-w-3xl mb-10">
                      Progressia existe para ayudarte a progresar todos los días.
                    </p>
                  </FadeIn>

                  <FadeIn>
                    <WaitlistButton
                      text="Acceso anticipado"
                      className="bg-brand-500 hover:bg-brand-600"
                    />
                  </FadeIn>
                </Stagger>
              </div>
            </div>
          </FadeIn>
        </div>
      </FadeInSection>

      {/* CTA Section */}
      <FadeInSection className="relative z-10 py-12 md:py-16 lg:py-24 px-4 sm:px-6 lg:px-8">
        <div className="max-w-4xl mx-auto text-center">
          <Stagger>
            <FadeIn>
              <h2 className="text-3xl sm:text-5xl font-bold font-display mb-6">
                <span className={SECTION_TITLE_COLOR}>Progressia está llegando</span>
              </h2>
            </FadeIn>
            <FadeIn>
              <p className="text-slate-600 dark:text-gray-400 mb-8 max-w-2xl mx-auto">
                La nueva forma de aprender trading y educación financiera, paso a paso.
                Botón
              </p>
            </FadeIn>
            <FadeIn>
              <WaitlistButton
                text="Quiero acceso anticipado"
                className="bg-brand-500 hover:bg-brand-600"
              />
            </FadeIn>
            <FadeIn>
              <p className="text-slate-600 dark:text-gray-400 mt-4">
                Acceso limitado para los primeros usuarios.
              </p>
            </FadeIn>
          </Stagger>
        </div>
      </FadeInSection>

      {/* Footer */}
      <footer className="relative z-10 border-t border-white/5">
        <Image
          src="/footer.png"
          alt="Ilustración del footer"
          width={5000}
          height={2000}
          className="block w-full h-auto"
          sizes="100vw"
        />

        <div className="pt-0 pb-12 px-4 sm:px-6 lg:px-8 bg-[#61c021] dark:bg-[#61c021] text-white">
          <FadeInStagger className="max-w-7xl mx-auto">
            <FadeIn className="flex flex-col md:flex-row justify-between items-center gap-6">
              <div className="flex items-center gap-2">
                <Image
                  src="/logo.png"
                  alt="Progressia"
                  width={800}
                  height={320}
                  quality={100}
                  className="h-20 w-auto brightness-0 invert drop-shadow-[0_2px_6px_rgba(0,0,0,0.25)]"
                />
              </div>
              <div className="flex items-center gap-6 text-sm text-white/90">
                <Link href="/terms" className="hover:text-white transition-colors">Términos</Link>
                <Link href="/privacy" className="hover:text-white transition-colors">Privacidad</Link>
                <Link href="/contact" className="hover:text-white transition-colors">Contacto</Link>
              </div>
            </FadeIn>

            {/* Risk Disclaimer */}
            <FadeIn className="mt-8 p-4 rounded-lg bg-white/15 border border-white/25 text-sm text-white/90">
              <div className="flex items-start gap-3">
                <Shield className="w-5 h-5 text-yellow-200 flex-shrink-0 mt-0.5" />
                <p>
                  <strong>Aviso de Riesgo:</strong> Progressia es una plataforma educativa.
                  El contenido no constituye asesoría financiera. Operar en mercados financieros
                  conlleva riesgos significativos. Consulta siempre con un profesional antes de invertir.
                </p>
              </div>
            </FadeIn>

            <FadeIn className="mt-8 text-center text-sm text-white/70">
              © 2024 Progressia. Todos los derechos reservados.
            </FadeIn>
          </FadeInStagger>
        </div>
      </footer>
    </div>
  )
}


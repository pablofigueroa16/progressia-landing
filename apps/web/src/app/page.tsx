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
                  <WaitlistButton text={t('hero.cta')} />
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
                  <span className={SECTION_TITLE_COLOR}>{t('valueProposition.title')}</span>
                </h2>
              </FadeIn>

              <FadeIn>
                <p className="text-slate-700 dark:text-gray-300 mt-4 max-w-2xl mx-auto lg:mx-0">
                  {t('valueProposition.description1')}
                </p>
              </FadeIn>
              <FadeIn>
                <p className="text-slate-600 dark:text-gray-400 max-w-2xl mx-auto lg:mx-0">
                  {t('valueProposition.description2')}
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
                  <span className={SECTION_TITLE_COLOR}>{t('howItWorks.title')}</span>
                </h2>
              </FadeIn>

              <FadeIn>
                <p className="text-slate-700 dark:text-gray-300 mt-4 max-w-2xl mx-auto lg:mx-0">
                  {t('howItWorks.description1')}
                </p>
              </FadeIn>
              <FadeIn>
                <p className="text-slate-600 dark:text-gray-400 max-w-2xl mx-auto lg:mx-0">
                  {t('howItWorks.description2')}
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
                <span className={SECTION_TITLE_COLOR}>{t('method.title')}</span>
              </h2>
            </FadeIn>

            <Stagger className="grid md:grid-cols-3 gap-6">
              <FadeIn className="group p-8 rounded-2xl bg-white/80 border border-slate-200/80 shadow-sm hover:bg-white transition-all duration-300 dark:bg-white/5 dark:border-white/10 dark:shadow-none dark:hover:bg-white/10">
                <div className="flex items-center gap-3 mb-3">
                  <div className="inline-flex h-11 w-11 items-center justify-center rounded-xl bg-brand-500/20 text-brand-600 dark:bg-brand-500/10 dark:text-brand-400">
                    <MethodLessonsIcon />
                  </div>
                  <h3 className="text-2xl font-bold">{t('method.card1Title')}</h3>
                </div>
                <p className="text-slate-600 dark:text-gray-400">
                  {t('method.card1Description')}
                </p>
              </FadeIn>

              <FadeIn className="group p-8 rounded-2xl bg-white/80 border border-slate-200/80 shadow-sm hover:bg-white transition-all duration-300 dark:bg-white/5 dark:border-white/10 dark:shadow-none dark:hover:bg-white/10">
                <div className="flex items-center gap-3 mb-3">
                  <div className="inline-flex h-11 w-11 items-center justify-center rounded-xl bg-purple-500/10 text-purple-600 dark:bg-purple-500/10 dark:text-purple-400">
                    <MethodPracticeIcon />
                  </div>
                  <h3 className="text-2xl font-bold">{t('method.card2Title')}</h3>
                </div>
                <p className="text-slate-600 dark:text-gray-400">
                  {t('method.card2Description')}
                </p>
              </FadeIn>

              <FadeIn className="group p-8 rounded-2xl bg-white/80 border border-slate-200/80 shadow-sm hover:bg-white transition-all duration-300 dark:bg-white/5 dark:border-white/10 dark:shadow-none dark:hover:bg-white/10">
                <div className="flex items-center gap-3 mb-3">
                  <div className="inline-flex h-11 w-11 items-center justify-center rounded-xl bg-amber-500/10 text-amber-600 dark:bg-amber-500/10 dark:text-amber-400">
                    <MethodProgressIcon />
                  </div>
                  <h3 className="text-2xl font-bold">{t('method.card3Title')}</h3>
                </div>
                <p className="text-slate-600 dark:text-gray-400">
                  {t('method.card3Description')}
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
                  <span className={SECTION_TITLE_COLOR}>{t('motivation.title')}</span>
                </h2>
              </FadeIn>

              <FadeIn>
                <p className="text-slate-700 dark:text-gray-300 mt-4 max-w-2xl mx-auto lg:mx-0">
                  {t('motivation.description1')}
                </p>
              </FadeIn>
              <FadeIn>
                <p className="text-slate-600 dark:text-gray-400 max-w-2xl mx-auto lg:mx-0">
                  {t('motivation.description2')}
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
                  <span className={SECTION_TITLE_COLOR}>{t('learning.title')}</span>
                </h2>
              </FadeIn>

              <FadeIn>
                <p className="text-slate-600 dark:text-gray-400 max-w-2xl mx-auto lg:mx-0">
                  {t('learning.description')}
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
                <span className={SECTION_TITLE_COLOR}>{t('audience.title')}</span>
              </h2>
            </FadeIn>

            <Stagger className="grid md:grid-cols-3 gap-6">
              <FadeIn className="group p-8 rounded-2xl bg-white/80 border border-slate-200/80 shadow-sm hover:bg-white transition-all duration-300 dark:bg-white/5 dark:border-white/10 dark:shadow-none dark:hover:bg-white/10">
                <div className="flex items-center gap-3 mb-3">
                  <div className="inline-flex h-11 w-11 items-center justify-center rounded-xl bg-green-500/10 text-green-600 dark:bg-green-500/10 dark:text-green-400">
                    <AudienceBeginnersIcon />
                  </div>
                  <h3 className="text-2xl font-bold">{t('audience.card1Title')}</h3>
                </div>
                <p className="text-slate-600 dark:text-gray-400">
                  {t('audience.card1Description')}
                </p>
              </FadeIn>

              <FadeIn className="group p-8 rounded-2xl bg-white/80 border border-slate-200/80 shadow-sm hover:bg-white transition-all duration-300 dark:bg-white/5 dark:border-white/10 dark:shadow-none dark:hover:bg-white/10">
                <div className="flex items-center gap-3 mb-3">
                  <div className="inline-flex h-11 w-11 items-center justify-center rounded-xl bg-sky-500/10 text-sky-600 dark:bg-sky-500/10 dark:text-sky-400">
                    <AudienceCuriousIcon />
                  </div>
                  <h3 className="text-2xl font-bold">{t('audience.card2Title')}</h3>
                </div>
                <p className="text-slate-600 dark:text-gray-400">
                  {t('audience.card2Description')}
                </p>
              </FadeIn>

              <FadeIn className="group p-8 rounded-2xl bg-white/80 border border-slate-200/80 shadow-sm hover:bg-white transition-all duration-300 dark:bg-white/5 dark:border-white/10 dark:shadow-none dark:hover:bg-white/10">
                <div className="flex items-center gap-3 mb-3">
                  <div className="inline-flex h-11 w-11 items-center justify-center rounded-xl bg-fuchsia-500/10 text-fuchsia-600 dark:bg-fuchsia-500/10 dark:text-fuchsia-400">
                    <AudienceTradersIcon />
                  </div>
                  <h3 className="text-2xl font-bold">{t('audience.card3Title')}</h3>
                </div>
                <p className="text-slate-600 dark:text-gray-400">
                  {t('audience.card3Description')}
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
                  <span className={SECTION_TITLE_COLOR}>{t('progress.title')}</span>
                </h2>
              </FadeIn>

              <FadeIn>
                <p className="text-slate-700 dark:text-gray-300 mt-4 max-w-2xl mx-auto lg:mx-0">
                  {t('progress.description1')}
                </p>
              </FadeIn>
              <FadeIn>
                <p className="text-slate-600 dark:text-gray-400 max-w-2xl mx-auto lg:mx-0">
                  {t('progress.description2')}
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
                  <span className={SECTION_TITLE_COLOR}>{t('community.title')}</span>
                </h2>
              </FadeIn>

              <FadeIn>
                <p className="text-slate-600 dark:text-gray-400 max-w-2xl mx-auto lg:mx-0">
                  {t('community.description')}
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
                <span className={SECTION_TITLE_COLOR}>{t('impact.title')}</span>
              </h2>
            </FadeIn>

            <FadeIn>
              <p className="text-slate-600 font-bold dark:text-gray-400 text-lg max-w-3xl mx-auto mb-4">
                {t('impact.subtitle')}
              </p>
            </FadeIn>

            <FadeIn>
              <p className="text-slate-700 dark:text-gray-300 text-base max-w-3xl mx-auto mb-2">
                {t('impact.description1')}
              </p>
              <p className="text-slate-700 dark:text-gray-300 text-base max-w-3xl mx-auto mb-2">{t('impact.description2')}</p>
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
                  <h3 className="text-2xl font-bold mb-2 text-slate-900 dark:text-white">{t('impact.card1Title')}</h3>
                  <p className="text-slate-600 dark:text-gray-400">
                    {t('impact.card1Description')}
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
                  <h3 className="text-2xl font-bold mb-2 text-slate-900 dark:text-white">{t('impact.card2Title')}</h3>
                  <p className="text-slate-600 dark:text-gray-400">
                    {t('impact.card2Description')}
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
                  <h3 className="text-2xl font-bold mb-2 text-slate-900 dark:text-white">{t('impact.card3Title')}</h3>
                  <p className="text-slate-600 dark:text-gray-400">
                    {t('impact.card3Description')}
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
                  <span className={SECTION_TITLE_COLOR}>{t('responsible.title')}</span>
                </h2>
              </FadeIn>

              <FadeIn>
                <p className="text-slate-700 dark:text-gray-300 mt-4 max-w-2xl mx-auto lg:mx-0">
                  {t('responsible.description1')}
                </p>
              </FadeIn>
              <FadeIn>
                <p className="text-slate-600 dark:text-gray-400 max-w-2xl mx-auto lg:mx-0">
                  {t('responsible.description2')}
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
                <h2 className="whitespace-nowrap text-2xl sm:text-4xl md:text-5xl lg:text-6xl font-bold font-display mb-4 dark:text-white text-brand-500 leading-none">
                  {t('smart.title')}
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
                <WaitlistButton text={t('pricing.pro.cta')} />
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
                <span className={SECTION_TITLE_COLOR}>{t('pricing.title')}</span>
              </h2>
              <p className="font-bold text-slate-600 dark:text-gray-400 mb-4">
                {t('pricing.subtitle')}
              </p>
              <p className="text-slate-700 dark:text-gray-300 text-base mx-auto mb-2">
                {t('pricing.description')}
              </p>
            </FadeIn>

            <Stagger className="grid md:grid-cols-2 gap-8">
              {/* Free Plan */}
              <FadeIn className="relative p-1 rounded-2xl">
                <div className="relative p-8 rounded-2xl bg-white/80  border border-slate-200/80 dark:bg-white/5 dark:border-white/10 dark:shadow-none flex flex-col h-full z-10">
                  <Stagger className="flex flex-col h-full">
                    <FadeIn className="mb-6">
                      <h3 className="text-2xl font-bold mb-2">{t('pricing.free.title')}</h3>
                      <p className="text-slate-600 dark:text-gray-400 mb-4">
                        {t('pricing.free.description')}
                      </p>
                      <div className="mb-6 inline-flex items-center gap-2 px-4 py-2 rounded-full bg-green-500/10 border border-green-500/20">
                        <span className="text-sm text-green-700 dark:text-green-300 font-semibold">{t('pricing.free.badge')}</span>
                      </div>
                      <div className="text-4xl font-bold">
                        {t('pricing.free.price')}
                        <span className="text-lg text-slate-500 dark:text-gray-400">{t('pricing.free.perMonth')}</span>
                      </div>
                    </FadeIn>

                    <StaggerList className="space-y-4 mb-8 flex-1">
                      {[
                        t('pricing.free.features.feature1'),
                        t('pricing.free.features.feature2'),
                        t('pricing.free.features.feature3'),
                        t('pricing.free.features.feature4'),
                        t('pricing.free.features.feature5'),
                      ].map((item, i) => (
                        <FadeInLi key={i} className="flex items-center gap-3">
                          <Star className="w-5 h-5 text-brand-500" />
                          <span className="text-slate-700 dark:text-gray-300">{item}</span>
                        </FadeInLi>
                      ))}
                    </StaggerList>

                    <FadeIn className="mt-auto mb-4">
                      <WaitlistButton
                        text={t('pricing.free.cta')}
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
                  {t('pricing.pro.badge')}
                </div>
                <div className="relative p-8 rounded-2xl bg-white/800 dark:bg-dark-950 dark:bg-gradient-to-br dark:from-brand-500/12 dark:via-dark-950 dark:to-accent-purple/10 dark:border-brand-500/30 dark:shadow-none flex flex-col h-full z-10">
                  <Stagger className="flex flex-col h-full">
                    <FadeIn className="mb-6">
                      <h3 className="text-2xl font-bold mb-2">{t('pricing.pro.title')}</h3>
                      <p className="text-slate-700 dark:text-gray-300 mb-4">
                        {t('pricing.pro.description')}
                      </p>
                      <div className="mb-6 inline-flex items-center gap-2 px-4 py-2 rounded-full bg-green-500/10 border border-green-500/20">
                        <span className="text-sm text-green-700 dark:text-green-300 font-semibold">{t('pricing.pro.perfectBadge')}</span>
                      </div>
                      <div className="text-4xl font-bold">
                        {t('pricing.pro.price')}
                        <span className="text-lg text-slate-500 dark:text-gray-400">{t('pricing.pro.perMonth')}</span>
                      </div>
                      <p className="text-sm text-slate-600 dark:text-gray-400 mt-1">{t('pricing.pro.yearlyPrice')}</p>
                    </FadeIn>

                    <StaggerList className="space-y-4 mb-8 flex-1">
                      {[
                        t('pricing.pro.features.feature1'),
                        t('pricing.pro.features.feature2'),
                        t('pricing.pro.features.feature3'),
                        t('pricing.pro.features.feature4'),
                        t('pricing.pro.features.feature5'),
                        t('pricing.pro.features.feature6'),
                        t('pricing.pro.features.feature7'),
                      ].map((item, i) => (
                        <FadeInLi key={i} className="flex items-center gap-3">
                          <Star className="w-5 h-5 text-accent-gold" />
                          <span className="text-slate-700 dark:text-gray-300">{item}</span>
                        </FadeInLi>
                      ))}
                    </StaggerList>

                    <FadeIn className="mt-auto mb-4">
                      <WaitlistButton
                        text={t('pricing.pro.cta')}
                        className="bg-brand-500 hover:bg-brand-600"
                      />
                    </FadeIn>
                  </Stagger>
                </div>
              </FadeIn>
            </Stagger>

            <FadeIn className="mt-10 text-center text-sm text-slate-600 dark:text-gray-400">
              {t('pricing.disclaimer')}
              <span className="text-slate-700 dark:text-gray-300"> {t('pricing.noCommitment')}</span>
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
                  <span className={SECTION_TITLE_COLOR}>{t('accessibility.title')}</span>
                </h2>
              </FadeIn>

              <FadeIn>
                <p className="text-slate-700 dark:text-gray-300 mt-4 max-w-2xl mx-auto lg:mx-0">
                  {t('accessibility.description1')}
                </p>
              </FadeIn>
              <FadeIn>
                <p className="text-slate-600 dark:text-gray-400 max-w-2xl mx-auto lg:mx-0">
                  {t('accessibility.description2')}
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
                      {t('vision.title')}
                    </h2>
                  </FadeIn>

                  <FadeIn>
                    <p className="text-left dark:text-gray-300 text-slate-700 text-base sm:text-lg lg:text-xl max-w-3xl mb-4">
                      {t('vision.description1')}
                    </p>
                    <p className="text-left dark:text-gray-400 text-slate-600 text-base sm:text-lg lg:text-xl max-w-3xl mb-10">
                      {t('vision.description2')}
                    </p>
                  </FadeIn>

                  <FadeIn>
                    <WaitlistButton
                      text={t('vision.cta')}
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
                <span className={SECTION_TITLE_COLOR}>{t('cta.title')}</span>
              </h2>
            </FadeIn>
            <FadeIn>
              <p className="text-slate-600 dark:text-gray-400 mb-8 max-w-2xl mx-auto">
                {t('cta.description')}
              </p>
            </FadeIn>
            <FadeIn>
              <WaitlistButton
                text={t('cta.button')}
                className="bg-brand-500 hover:bg-brand-600"
              />
            </FadeIn>
            <FadeIn>
              <p className="text-slate-600 dark:text-gray-400 mt-4">
                {t('cta.limited')}
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
                <Link href="/terms" className="hover:text-white transition-colors">{t('footer.terms')}</Link>
                <Link href="/privacy" className="hover:text-white transition-colors">{t('footer.privacy')}</Link>
                <Link href="/contact" className="hover:text-white transition-colors">{t('footer.contact')}</Link>
              </div>
            </FadeIn>

            {/* Risk Disclaimer */}
            <FadeIn className="mt-8 p-4 rounded-lg bg-white/15 border border-white/25 text-sm text-white/90">
              <div className="flex items-start gap-3">
                <Shield className="w-5 h-5 text-yellow-200 flex-shrink-0 mt-0.5" />
                <p>
                  <strong>{t('footer.riskTitle')}</strong> {t('footer.riskDescription')}
                </p>
              </div>
            </FadeIn>

            <FadeIn className="mt-8 text-center text-sm text-white/70">
              {t('footer.copyright')}
            </FadeIn>
          </FadeInStagger>
        </div>
      </footer>
    </div>
  )
}


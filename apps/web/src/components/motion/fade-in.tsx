'use client'

import { motion, useReducedMotion, type HTMLMotionProps, type Variants } from 'framer-motion'

const EASE_OUT: [number, number, number, number] = [0.16, 1, 0.3, 1]

const containerVariants: Variants = {
  hidden: {},
  show: {
    transition: {
      staggerChildren: 0.12,
      delayChildren: 0.06,
    },
  },
}

const itemVariants: Variants = {
  hidden: { opacity: 0, y: 18 },
  show: {
    opacity: 1,
    y: 0,
    transition: { duration: 0.6, ease: EASE_OUT },
  },
}

const reducedItemVariants: Variants = {
  hidden: { opacity: 0 },
  show: { opacity: 1, transition: { duration: 0.25 } },
}

type FadeInSectionProps = HTMLMotionProps<'section'> & {
  /** Cuánto de la sección debe estar visible para disparar la animación (0..1) */
  amount?: number
  /** Si true, anima solo la primera vez */
  once?: boolean
}

export function FadeInSection({
  children,
  amount = 0.18,
  once = true,
  ...props
}: FadeInSectionProps) {
  const reduceMotion = useReducedMotion()

  return (
    <motion.section
      initial="hidden"
      whileInView="show"
      viewport={{ once, amount }}
      variants={containerVariants}
      {...props}
    >
      {children}
    </motion.section>
  )
}

type FadeInProps = HTMLMotionProps<'div'>

export function FadeIn({ children, ...props }: FadeInProps) {
  const reduceMotion = useReducedMotion()

  return (
    <motion.div
      variants={reduceMotion ? reducedItemVariants : itemVariants}
      {...props}
    >
      {children}
    </motion.div>
  )
}

type FadeInLiProps = HTMLMotionProps<'li'>

export function FadeInLi({ children, ...props }: FadeInLiProps) {
  const reduceMotion = useReducedMotion()

  return (
    <motion.li
      variants={reduceMotion ? reducedItemVariants : itemVariants}
      {...props}
    >
      {children}
    </motion.li>
  )
}

type FadeInStaggerProps = HTMLMotionProps<'div'> & {
  /** Cuánto del bloque debe estar visible para disparar la animación (0..1) */
  amount?: number
  /** Si true, anima solo la primera vez */
  once?: boolean
}

export function FadeInStagger({
  children,
  amount = 0.18,
  once = true,
  ...props
}: FadeInStaggerProps) {
  return (
    <motion.div
      initial="hidden"
      whileInView="show"
      viewport={{ once, amount }}
      variants={containerVariants}
      {...props}
    >
      {children}
    </motion.div>
  )
}

/** Container para hacer stagger de hijos cuando un ancestro dispara la variante `show`. */
export function Stagger(props: HTMLMotionProps<'div'>) {
  return <motion.div variants={containerVariants} {...props} />
}

/** Container semántico para listas (`<ul>`) con stagger. */
export function StaggerList(props: HTMLMotionProps<'ul'>) {
  return <motion.ul variants={containerVariants} {...props} />
}



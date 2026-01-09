'use client'

import React, { useEffect, useRef } from 'react'
import { cn } from '@/lib/utils'

interface Particle {
  x: number
  y: number
  size: number
  speedX: number
  speedY: number
  opacity: number
  opacityChange: number
}

interface SparkleParticlesProps {
  className?: string
  maxParticleSize?: number
  minParticleSize?: number
  baseDensity?: number
  maxSpeed?: number
  minMoveSpeed?: number
  maxOpacity?: number
  customDirection?: 'top' | 'bottom' | 'left' | 'right' | 'random'
  opacityAnimationSpeed?: number
  minParticleOpacity?: number
  particleColor?: string
  enableParallax?: boolean
  enableHoverGrab?: boolean
  backgroundColor?: string
  zIndexLevel?: number
  clickEffect?: boolean
  hoverMode?: 'grab' | 'repulse' | 'none'
  particleCount?: number
  particleShape?: 'circle' | 'star' | 'square'
  enableCollisions?: boolean
}

export function SparkleParticles({
  className,
  maxParticleSize = 4,
  minParticleSize = 2,
  maxSpeed = 1.5,
  minMoveSpeed = 0.3,
  maxOpacity = 0.9,
  customDirection = 'top',
  opacityAnimationSpeed = 3,
  minParticleOpacity = 0.3,
  particleColor = '#61c021',
  backgroundColor = 'transparent',
  zIndexLevel = 0,
  particleCount = 25,
  particleShape = 'star',
}: SparkleParticlesProps) {
  const canvasRef = useRef<HTMLCanvasElement>(null)
  const particlesRef = useRef<Particle[]>([])
  const animationRef = useRef<number>()

  useEffect(() => {
    const canvas = canvasRef.current
    if (!canvas) return

    const ctx = canvas.getContext('2d')
    if (!ctx) return

    // Set canvas size
    const setCanvasSize = () => {
      const rect = canvas.getBoundingClientRect()
      canvas.width = rect.width
      canvas.height = rect.height

      // Reinitialize particles when canvas size changes
      if (canvas.width > 0 && canvas.height > 0) {
        initParticles()
      }
    }

    const initParticles = () => {
      particlesRef.current = Array.from({ length: particleCount }, () => {
        const size = minParticleSize + Math.random() * (maxParticleSize - minParticleSize)
        let speedX = 0
        let speedY = 0

        switch (customDirection) {
          case 'top':
            speedY = -(minMoveSpeed + Math.random() * (maxSpeed - minMoveSpeed))
            speedX = (Math.random() - 0.5) * maxSpeed * 0.3
            break
          case 'bottom':
            speedY = minMoveSpeed + Math.random() * (maxSpeed - minMoveSpeed)
            speedX = (Math.random() - 0.5) * maxSpeed * 0.3
            break
          case 'left':
            speedX = -(minMoveSpeed + Math.random() * (maxSpeed - minMoveSpeed))
            speedY = (Math.random() - 0.5) * maxSpeed * 0.3
            break
          case 'right':
            speedX = minMoveSpeed + Math.random() * (maxSpeed - minMoveSpeed)
            speedY = (Math.random() - 0.5) * maxSpeed * 0.3
            break
          default:
            speedX = (Math.random() - 0.5) * maxSpeed
            speedY = (Math.random() - 0.5) * maxSpeed
        }

        return {
          x: Math.random() * canvas.width,
          y: Math.random() * canvas.height,
          size,
          speedX,
          speedY,
          opacity: minParticleOpacity + Math.random() * (maxOpacity - minParticleOpacity),
          opacityChange: (Math.random() - 0.5) * opacityAnimationSpeed / 1000,
        }
      })
    }

    const drawStar = (x: number, y: number, size: number, opacity: number) => {
      ctx.save()
      ctx.globalAlpha = opacity
      ctx.fillStyle = particleColor
      ctx.beginPath()

      const spikes = 5
      const outerRadius = size
      const innerRadius = size / 2
      let rot = (Math.PI / 2) * 3
      const step = Math.PI / spikes

      ctx.moveTo(x, y - outerRadius)
      for (let i = 0; i < spikes; i++) {
        ctx.lineTo(x + Math.cos(rot) * outerRadius, y + Math.sin(rot) * outerRadius)
        rot += step
        ctx.lineTo(x + Math.cos(rot) * innerRadius, y + Math.sin(rot) * innerRadius)
        rot += step
      }
      ctx.lineTo(x, y - outerRadius)
      ctx.closePath()
      ctx.fill()
      ctx.restore()
    }

    const drawCircle = (x: number, y: number, size: number, opacity: number) => {
      ctx.save()
      ctx.globalAlpha = opacity
      ctx.fillStyle = particleColor
      ctx.beginPath()
      ctx.arc(x, y, size, 0, Math.PI * 2)
      ctx.fill()
      ctx.restore()
    }

    const drawSquare = (x: number, y: number, size: number, opacity: number) => {
      ctx.save()
      ctx.globalAlpha = opacity
      ctx.fillStyle = particleColor
      ctx.fillRect(x - size / 2, y - size / 2, size, size)
      ctx.restore()
    }

    const animate = () => {
      ctx.clearRect(0, 0, canvas.width, canvas.height)

      particlesRef.current.forEach((particle) => {
        // Update position
        particle.x += particle.speedX
        particle.y += particle.speedY

        // Wrap around edges
        if (particle.x < -particle.size) particle.x = canvas.width + particle.size
        if (particle.x > canvas.width + particle.size) particle.x = -particle.size
        if (particle.y < -particle.size) particle.y = canvas.height + particle.size
        if (particle.y > canvas.height + particle.size) particle.y = -particle.size

        // Update opacity
        particle.opacity += particle.opacityChange
        if (particle.opacity >= maxOpacity || particle.opacity <= minParticleOpacity) {
          particle.opacityChange *= -1
        }

        // Draw particle
        if (particleShape === 'star') {
          drawStar(particle.x, particle.y, particle.size, particle.opacity)
        } else if (particleShape === 'square') {
          drawSquare(particle.x, particle.y, particle.size, particle.opacity)
        } else {
          drawCircle(particle.x, particle.y, particle.size, particle.opacity)
        }
      })

      animationRef.current = requestAnimationFrame(animate)
    }

    // Initialize
    setCanvasSize()
    window.addEventListener('resize', setCanvasSize)

    // Start animation after a short delay to ensure canvas is ready
    setTimeout(() => {
      animate()
    }, 100)

    return () => {
      window.removeEventListener('resize', setCanvasSize)
      if (animationRef.current) {
        cancelAnimationFrame(animationRef.current)
      }
    }
  }, [
    particleCount,
    maxParticleSize,
    minParticleSize,
    maxSpeed,
    minMoveSpeed,
    maxOpacity,
    minParticleOpacity,
    particleColor,
    customDirection,
    opacityAnimationSpeed,
    particleShape,
  ])

  return (
    <canvas
      ref={canvasRef}
      className={cn('w-full h-full', className)}
      style={{
        backgroundColor,
        zIndex: zIndexLevel,
        display: 'block',
      }}
    />
  )
}

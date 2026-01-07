'use client'

import { useState, useEffect, useMemo } from 'react'

interface TypingTextProps {
  words: string[]
  className?: string
}

export function TypingText({ words, className = '' }: TypingTextProps) {
  const [currentWordIndex, setCurrentWordIndex] = useState(0)
  const [displayText, setDisplayText] = useState('')
  const [isDeleting, setIsDeleting] = useState(false)

  // Encontrar la palabra más larga para reservar espacio
  const longestWord = useMemo(() => {
    return words.reduce((longest, word) => 
      word.length > longest.length ? word : longest
    , '')
  }, [words])

  useEffect(() => {
    const currentWord = words[currentWordIndex]
    
    const timeout = setTimeout(() => {
      if (!isDeleting) {
        // Typing
        if (displayText.length < currentWord.length) {
          setDisplayText(currentWord.slice(0, displayText.length + 1))
        } else {
          // Finished typing, wait then start deleting
          setTimeout(() => setIsDeleting(true), 2000)
        }
      } else {
        // Deleting
        if (displayText.length > 0) {
          setDisplayText(displayText.slice(0, -1))
        } else {
          // Finished deleting, move to next word
          setIsDeleting(false)
          setCurrentWordIndex((prev) => (prev + 1) % words.length)
        }
      }
    }, isDeleting ? 50 : 150) // Faster deleting, slower typing

    return () => clearTimeout(timeout)
  }, [displayText, isDeleting, currentWordIndex, words])

  return (
    <span className={`inline-block ${className}`}>
      {/* Texto invisible para reservar espacio (evita layout shift) */}
      <span className="invisible" aria-hidden="true">
        {longestWord}
      </span>
      {/* Texto visible animado (posicionado absolutamente) */}
      <span className="absolute left-0">
        {displayText}
        <span className="animate-pulse">|</span>
      </span>
    </span>
  )
}



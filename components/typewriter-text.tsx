"use client"

import { useState, useEffect } from "react"
import { motion } from "framer-motion"

interface TypewriterTextProps {
  text: string
  className?: string
  speed?: number
  delay?: number
  showCursor?: boolean
}

export default function TypewriterText({
  text,
  className = "",
  speed = 50,
  delay = 0,
  showCursor = true,
}: TypewriterTextProps) {
  const [displayText, setDisplayText] = useState("")
  const [currentIndex, setCurrentIndex] = useState(0)
  const [isComplete, setIsComplete] = useState(false)

  useEffect(() => {
    let timeout: NodeJS.Timeout

    // Reset when text changes
    setDisplayText("")
    setCurrentIndex(0)
    setIsComplete(false)

    // Initial delay
    const initialDelay = setTimeout(() => {
      // Start typing effect
      const interval = setInterval(() => {
        if (currentIndex < text.length) {
          setDisplayText((prev) => prev + text[currentIndex])
          setCurrentIndex((prev) => prev + 1)
        } else {
          clearInterval(interval)
          setIsComplete(true)
        }
      }, speed)

      return () => clearInterval(interval)
    }, delay)

    return () => {
      clearTimeout(initialDelay)
      clearTimeout(timeout)
    }
  }, [text, speed, delay, currentIndex])

  return (
    <span className={className}>
      {displayText}
      {showCursor && (
        <motion.span
          className="inline-block h-[1.2em] w-[3px] bg-emerald-400 align-middle"
          animate={{ opacity: isComplete ? [1, 0] : 1 }}
          transition={{
            repeat: isComplete ? Number.POSITIVE_INFINITY : 0,
            repeatType: "reverse",
            duration: 0.8,
          }}
          aria-hidden="true"
        />
      )}
    </span>
  )
}

"use client"

import type { ReactNode } from "react"
import { motion, type Variant } from "framer-motion"

type AnimationVariant = "fade" | "slideUp" | "slideRight" | "slideLeft" | "scale" | "fadeScale"

interface ScrollAnimationProps {
  children: ReactNode
  variant?: AnimationVariant
  delay?: number
  duration?: number
  className?: string
  once?: boolean
  margin?: string
}

export default function ScrollAnimation({
  children,
  variant = "fade",
  delay = 0,
  duration = 0.5,
  className = "",
  once = true,
  margin = "-100px",
}: ScrollAnimationProps) {
  // Define animation variants
  const variants = {
    hidden: {
      opacity: 0,
      y: variant === "slideUp" ? 40 : 0,
      x: variant === "slideRight" ? -40 : variant === "slideLeft" ? 40 : 0,
      scale: variant === "scale" || variant === "fadeScale" ? 0.95 : 1,
    } as Variant,
    visible: {
      opacity: 1,
      y: 0,
      x: 0,
      scale: 1,
      transition: {
        duration,
        delay,
        ease: [0.25, 0.1, 0.25, 1], // Custom easing function for smooth motion
      },
    } as Variant,
  }

  return (
    <motion.div
      className={className}
      initial="hidden"
      whileInView="visible"
      viewport={{ once, margin }}
      variants={variants}
    >
      {children}
    </motion.div>
  )
}

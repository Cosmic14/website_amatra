"use client"

import type { ReactNode } from "react"
import { motion } from "framer-motion"

interface StaggeredAnimationProps {
  children: ReactNode
  className?: string
  staggerDelay?: number
  duration?: number
  once?: boolean
  margin?: string
}

export default function StaggeredAnimation({
  children,
  className = "",
  staggerDelay = 0.1,
  duration = 0.5,
  once = true,
  margin = "-100px",
}: StaggeredAnimationProps) {
  const container = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: {
        staggerChildren: staggerDelay,
      },
    },
  }

  const item = {
    hidden: { opacity: 0, y: 20 },
    visible: {
      opacity: 1,
      y: 0,
      transition: {
        duration,
        ease: [0.25, 0.1, 0.25, 1],
      },
    },
  }

  return (
    <motion.div
      className={className}
      variants={container}
      initial="hidden"
      whileInView="visible"
      viewport={{ once, margin }}
    >
      {Array.isArray(children)
        ? children.map((child, index) => (
            <motion.div key={index} variants={item}>
              {child}
            </motion.div>
          ))
        : children}
    </motion.div>
  )
}

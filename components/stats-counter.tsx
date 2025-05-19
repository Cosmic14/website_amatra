"use client"

import { useEffect, useRef, useState } from "react"
import { motion, useAnimation } from "framer-motion"

interface StatsCounterProps {
  value: string
  label: string
  description: string
}

export default function StatsCounter({ value, label, description }: StatsCounterProps) {
  const [isVisible, setIsVisible] = useState(false)
  const ref = useRef<HTMLDivElement>(null)
  const controls = useAnimation()

  useEffect(() => {
    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          setIsVisible(true)
          controls.start("visible")
          observer.disconnect()
        }
      },
      { threshold: 0.1 },
    )

    if (ref.current) {
      observer.observe(ref.current)
    }

    return () => {
      observer.disconnect()
    }
  }, [controls])

  const variants = {
    hidden: { opacity: 0, y: 20 },
    visible: { opacity: 1, y: 0 },
  }

  return (
    <motion.div
      ref={ref}
      className="relative overflow-hidden rounded-lg border border-slate-800 bg-slate-900/80 p-6 text-center backdrop-blur-sm transition-all duration-300 hover:border-emerald-900/50 hover:shadow-[0_0_15px_rgba(16,185,129,0.15)]"
      initial="hidden"
      animate={controls}
      variants={variants}
      transition={{ duration: 0.5 }}
    >
      {/* Animated border effect */}
      <div className="absolute left-0 top-0 h-10 w-10 overflow-hidden">
        <div className="absolute left-0 top-0 h-px w-10 bg-emerald-500/30 transition-all duration-300 group-hover:bg-emerald-500/80"></div>
        <div className="absolute left-0 top-0 h-10 w-px bg-emerald-500/30 transition-all duration-300 group-hover:bg-emerald-500/80"></div>
      </div>
      <div className="absolute bottom-0 right-0 h-10 w-10 overflow-hidden">
        <div className="absolute bottom-0 right-0 h-px w-10 bg-emerald-500/30 transition-all duration-300 group-hover:bg-emerald-500/80"></div>
        <div className="absolute bottom-0 right-0 h-10 w-px bg-emerald-500/30 transition-all duration-300 group-hover:bg-emerald-500/80"></div>
      </div>

      <div className="relative z-10">
        <motion.div
          className="gradient-text text-3xl font-bold md:text-4xl"
          initial={{ opacity: 0, scale: 0.5 }}
          animate={isVisible ? { opacity: 1, scale: 1 } : { opacity: 0, scale: 0.5 }}
          transition={{ duration: 0.5, delay: 0.2 }}
        >
          {value}
        </motion.div>
        <motion.div
          className="mt-2 font-display text-lg font-medium text-white"
          initial={{ opacity: 0 }}
          animate={isVisible ? { opacity: 1 } : { opacity: 0 }}
          transition={{ duration: 0.5, delay: 0.3 }}
        >
          {label}
        </motion.div>
        <motion.div
          className="mt-1 text-sm text-slate-400"
          initial={{ opacity: 0 }}
          animate={isVisible ? { opacity: 1 } : { opacity: 0 }}
          transition={{ duration: 0.5, delay: 0.4 }}
        >
          {description}
        </motion.div>
      </div>
    </motion.div>
  )
}

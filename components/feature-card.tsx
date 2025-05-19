"use client"

import { useEffect, useRef, useState } from "react"
import type { ReactNode } from "react"
import { motion } from "framer-motion"

interface FeatureCardProps {
  icon: ReactNode
  title: string
  description: string
}

export default function FeatureCard({ icon, title, description }: FeatureCardProps) {
  const [isHovered, setIsHovered] = useState(false)
  const [isVisible, setIsVisible] = useState(false)
  const ref = useRef<HTMLDivElement>(null)

  useEffect(() => {
    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          setIsVisible(true)
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
  }, [])

  return (
    <motion.div
      ref={ref}
      className="group relative overflow-hidden rounded-lg border border-slate-800 bg-slate-900/80 p-6 backdrop-blur-sm transition-all duration-300 hover:border-emerald-900/50 hover:shadow-[0_0_15px_rgba(16,185,129,0.15)]"
      initial={{ opacity: 0, y: 20 }}
      animate={isVisible ? { opacity: 1, y: 0 } : { opacity: 0, y: 20 }}
      transition={{ duration: 0.5 }}
      onMouseEnter={() => setIsHovered(true)}
      onMouseLeave={() => setIsHovered(false)}
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

      {/* Background glow effect */}
      <div
        className={`absolute inset-0 bg-emerald-900/0 transition-all duration-500 ${
          isHovered ? "bg-emerald-900/10" : ""
        }`}
      />

      <div className="relative z-10">
        <div className="mb-4 rounded-full bg-slate-800 p-3 transition-all duration-300 group-hover:bg-emerald-900/30">
          <motion.div
            animate={isHovered ? { rotate: 360 } : { rotate: 0 }}
            transition={{ duration: 0.5 }}
            className="text-emerald-400"
          >
            {icon}
          </motion.div>
        </div>
        <h3 className="mb-2 font-display text-xl font-bold text-white">{title}</h3>
        <p className="text-slate-300">{description}</p>
      </div>
    </motion.div>
  )
}

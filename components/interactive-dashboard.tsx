"use client"

import { useEffect, useRef, useState } from "react"
import { motion } from "framer-motion"

export default function InteractiveDashboard() {
  const [isVisible, setIsVisible] = useState(false)
  const containerRef = useRef<HTMLDivElement>(null)

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

    if (containerRef.current) {
      observer.observe(containerRef.current)
    }

    return () => {
      observer.disconnect()
    }
  }, [])

  return (
    <div
      ref={containerRef}
      className="relative rounded-lg border border-slate-800 bg-slate-900 p-6 shadow-[0_4px_20px_rgba(0,0,0,0.2)]"
    >
      <motion.div
        className="text-white"
        initial={{ opacity: 0, y: 20 }}
        animate={isVisible ? { opacity: 1, y: 0 } : { opacity: 0, y: 20 }}
        transition={{ duration: 0.5 }}
      >
        Interactive Dashboard Placeholder
      </motion.div>
    </div>
  )
}

"use client"

import type { ReactNode } from "react"
import { motion } from "framer-motion"

interface FuturisticCardProps {
  children: ReactNode
  className?: string
  delay?: number
}

export default function FuturisticCard({ children, className = "", delay = 0 }: FuturisticCardProps) {
  return (
    <motion.div
      className={`group relative overflow-hidden rounded-lg border border-slate-800 bg-slate-900/80 p-6 backdrop-blur-sm transition-all duration-300 hover:border-emerald-900/50 hover:shadow-[0_0_15px_rgba(16,185,129,0.15)] ${className}`}
      initial={{ opacity: 0, y: 20 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, margin: "-100px" }}
      transition={{ duration: 0.5, delay }}
    >
      {/* Top left corner */}
      <div className="absolute left-0 top-0 h-10 w-10 overflow-hidden">
        <div className="absolute left-0 top-0 h-px w-10 bg-emerald-500/30 transition-all duration-300 group-hover:bg-emerald-500/80"></div>
        <div className="absolute left-0 top-0 h-10 w-px bg-emerald-500/30 transition-all duration-300 group-hover:bg-emerald-500/80"></div>
      </div>

      {/* Bottom right corner */}
      <div className="absolute bottom-0 right-0 h-10 w-10 overflow-hidden">
        <div className="absolute bottom-0 right-0 h-px w-10 bg-emerald-500/30 transition-all duration-300 group-hover:bg-emerald-500/80"></div>
        <div className="absolute bottom-0 right-0 h-10 w-px bg-emerald-500/30 transition-all duration-300 group-hover:bg-emerald-500/80"></div>
      </div>

      {children}
    </motion.div>
  )
}

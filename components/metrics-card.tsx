"use client"

import { useState, useEffect } from "react"
import Image from "next/image"
import { ArrowDown, ArrowUp, Minus } from "lucide-react"
import { motion } from "framer-motion"

interface Metric {
  label: string
  value: string
  change: number
  color: "emerald" | "red" | "amber" | "blue"
}

interface MetricsCardProps {
  title: string
  description: string
  imageSrc: string
  imageAlt: string
  metrics: Metric[]
}

export default function MetricsCard({ title, description, imageSrc, imageAlt, metrics }: MetricsCardProps) {
  const [isVisible, setIsVisible] = useState(false)
  const [isHovered, setIsHovered] = useState(false)

  useEffect(() => {
    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          setIsVisible(true)
        }
      },
      { threshold: 0.1 },
    )

    const element = document.getElementById(`metrics-card-${title.replace(/\s+/g, "-").toLowerCase()}`)
    if (element) {
      observer.observe(element)
    }

    return () => {
      if (element) {
        observer.unobserve(element)
      }
    }
  }, [title])

  const getColorClass = (color: string, isText = true) => {
    const prefix = isText ? "text" : "bg"
    switch (color) {
      case "emerald":
        return `${prefix}-emerald-500`
      case "red":
        return `${prefix}-red-500`
      case "amber":
        return `${prefix}-amber-500`
      case "blue":
        return `${prefix}-blue-500`
      default:
        return `${prefix}-emerald-500`
    }
  }

  return (
    <motion.div
      id={`metrics-card-${title.replace(/\s+/g, "-").toLowerCase()}`}
      className="group relative overflow-hidden rounded-lg border border-slate-800 bg-slate-900/80 backdrop-blur-sm transition-all duration-300 hover:border-emerald-900/50 hover:shadow-[0_0_15px_rgba(16,185,129,0.15)]"
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

      <div className="relative aspect-video w-full overflow-hidden">
        <motion.div
          animate={isHovered ? { scale: 1.05 } : { scale: 1 }}
          transition={{ duration: 0.5 }}
          className="relative h-full w-full"
        >
          <Image src={imageSrc || "/placeholder.svg"} alt={imageAlt} fill className="object-cover" priority />
          <div className="absolute bottom-0 left-0 right-0 bg-gradient-to-t from-slate-950 via-slate-950/80 to-transparent p-4 pt-16">
            <h3 className="text-xl font-bold text-white">{title}</h3>
            <p className="text-sm text-slate-300">{description}</p>
          </div>
        </motion.div>
        <div className="absolute inset-0 bg-emerald-500/10 mix-blend-overlay opacity-0 transition-opacity duration-300 group-hover:opacity-100"></div>
      </div>

      <div className="p-6">
        <div className="grid grid-cols-3 gap-4">
          {metrics.map((metric, index) => (
            <motion.div
              key={index}
              className="text-center"
              initial={{ opacity: 0, y: 10 }}
              animate={isVisible ? { opacity: 1, y: 0 } : { opacity: 0, y: 10 }}
              transition={{ duration: 0.5, delay: 0.1 * index }}
            >
              <div className={`text-lg font-bold ${getColorClass(metric.color)}`}>{metric.value}</div>
              <div className="text-xs text-slate-400">{metric.label}</div>
              <div className="mt-1 flex items-center justify-center text-xs">
                {metric.change > 0 ? (
                  <span className="flex items-center text-emerald-500">
                    <ArrowUp className="mr-1 h-3 w-3" />
                    {metric.change}%
                  </span>
                ) : metric.change < 0 ? (
                  <span className="flex items-center text-red-500">
                    <ArrowDown className="mr-1 h-3 w-3" />
                    {Math.abs(metric.change)}%
                  </span>
                ) : (
                  <span className="flex items-center text-slate-400">
                    <Minus className="mr-1 h-3 w-3" />
                    0%
                  </span>
                )}
              </div>
            </motion.div>
          ))}
        </div>
      </div>
    </motion.div>
  )
}

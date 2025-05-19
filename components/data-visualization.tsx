"use client"

import { useEffect, useRef, useState } from "react"
import { motion } from "framer-motion"

interface DataPoint {
  value: number
  label: string
  color: string
}

interface DataVisualizationProps {
  className?: string
}

export default function DataVisualization({ className }: DataVisualizationProps) {
  const [isVisible, setIsVisible] = useState(false)
  const containerRef = useRef<HTMLDivElement>(null)

  // Sample recovery score data
  const recoveryScores: DataPoint[] = [
    { value: 78, label: "Mon", color: "#10B981" },
    { value: 65, label: "Tue", color: "#FBBF24" },
    { value: 82, label: "Wed", color: "#10B981" },
    { value: 71, label: "Thu", color: "#10B981" },
    { value: 68, label: "Fri", color: "#FBBF24" },
    { value: 88, label: "Sat", color: "#10B981" },
    { value: 92, label: "Sun", color: "#10B981" },
  ]

  // Sample metrics data
  const metrics = [
    { name: "Sleep Quality", value: 87, color: "#10B981" },
    { name: "HRV", value: 72, color: "#FBBF24" },
    { name: "Muscle Readiness", value: 65, color: "#F59E0B" },
    { name: "Stress Level", value: 42, color: "#10B981" },
  ]

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
    <div ref={containerRef} className={`relative ${className}`}>
      {/* Recovery Score Line Chart */}
      <motion.div
        className="absolute left-0 top-0 h-48 w-64 rounded-lg bg-slate-800/80 p-4 backdrop-blur-sm"
        initial={{ opacity: 0, y: 20 }}
        animate={isVisible ? { opacity: 1, y: 0 } : { opacity: 0, y: 20 }}
        transition={{ duration: 0.5, delay: 0.2 }}
      >
        <h3 className="mb-2 text-sm font-medium text-slate-300">Recovery Score Trend</h3>
        <div className="flex h-28 items-end justify-between">
          {recoveryScores.map((score, index) => (
            <div key={index} className="flex flex-col items-center">
              <motion.div
                className="w-4 rounded-t"
                style={{ backgroundColor: score.color, height: 0 }}
                animate={{ height: `${score.value * 0.28}px` }}
                transition={{ duration: 1, delay: 0.4 + index * 0.1 }}
              />
              <span className="mt-1 text-xs text-slate-400">{score.label}</span>
            </div>
          ))}
        </div>
      </motion.div>

      {/* Athlete Readiness Gauge */}
      <motion.div
        className="absolute right-0 top-0 flex h-48 w-48 flex-col items-center justify-center rounded-lg bg-slate-800/80 p-4 backdrop-blur-sm"
        initial={{ opacity: 0, y: 20 }}
        animate={isVisible ? { opacity: 1, y: 0 } : { opacity: 0, y: 20 }}
        transition={{ duration: 0.5, delay: 0.4 }}
      >
        <h3 className="mb-2 text-sm font-medium text-slate-300">Team Readiness</h3>
        <div className="relative flex h-28 w-28 items-center justify-center">
          <svg className="h-full w-full" viewBox="0 0 100 100">
            <motion.circle cx="50" cy="50" r="45" fill="none" stroke="#1E293B" strokeWidth="8" />
            <motion.circle
              cx="50"
              cy="50"
              r="45"
              fill="none"
              stroke="#10B981"
              strokeWidth="8"
              strokeLinecap="round"
              strokeDasharray="283"
              initial={{ strokeDashoffset: 283 }}
              animate={{ strokeDashoffset: 283 - 283 * 0.82 }}
              transition={{ duration: 1.5, delay: 0.6, ease: "easeOut" }}
            />
          </svg>
          <motion.div
            className="absolute flex flex-col items-center justify-center"
            initial={{ scale: 0 }}
            animate={{ scale: 1 }}
            transition={{ duration: 0.5, delay: 1 }}
          >
            <span className="text-3xl font-bold text-white">82%</span>
            <span className="text-xs text-slate-300">Optimal</span>
          </motion.div>
        </div>
      </motion.div>

      {/* Metrics Grid */}
      <motion.div
        className="absolute bottom-0 left-0 h-48 w-64 rounded-lg bg-slate-800/80 p-4 backdrop-blur-sm"
        initial={{ opacity: 0, y: 20 }}
        animate={isVisible ? { opacity: 1, y: 0 } : { opacity: 0, y: 20 }}
        transition={{ duration: 0.5, delay: 0.6 }}
      >
        <h3 className="mb-2 text-sm font-medium text-slate-300">Key Metrics</h3>
        <div className="grid grid-cols-2 gap-2">
          {metrics.map((metric, index) => (
            <motion.div
              key={index}
              className="flex flex-col rounded-md bg-slate-700/50 p-2"
              initial={{ opacity: 0, scale: 0.9 }}
              animate={{ opacity: 1, scale: 1 }}
              transition={{ duration: 0.3, delay: 0.8 + index * 0.1 }}
            >
              <span className="text-xs text-slate-400">{metric.name}</span>
              <div className="mt-1 h-1.5 w-full rounded-full bg-slate-600">
                <motion.div
                  className="h-full rounded-full"
                  style={{ backgroundColor: metric.color, width: 0 }}
                  animate={{ width: `${metric.value}%` }}
                  transition={{ duration: 1, delay: 1 + index * 0.1 }}
                />
              </div>
              <span className="mt-1 text-right text-xs font-medium text-white">{metric.value}%</span>
            </motion.div>
          ))}
        </div>
      </motion.div>

      {/* Floating Data Points */}
      <motion.div
        className="absolute bottom-0 right-0 h-48 w-48 rounded-lg bg-slate-800/80 p-4 backdrop-blur-sm"
        initial={{ opacity: 0, y: 20 }}
        animate={isVisible ? { opacity: 1, y: 0 } : { opacity: 0, y: 20 }}
        transition={{ duration: 0.5, delay: 0.8 }}
      >
        <h3 className="mb-2 text-sm font-medium text-slate-300">Risk Analysis</h3>
        <div className="relative h-28">
          {[
            { x: "20%", y: "20%", size: 12, label: "Low", color: "#10B981" },
            { x: "70%", y: "30%", size: 8, label: "Low", color: "#10B981" },
            { x: "40%", y: "60%", size: 14, label: "Med", color: "#FBBF24" },
            { x: "80%", y: "70%", size: 10, label: "Low", color: "#10B981" },
            { x: "30%", y: "80%", size: 16, label: "High", color: "#EF4444" },
          ].map((point, index) => (
            <motion.div
              key={index}
              className="absolute flex flex-col items-center"
              style={{ left: point.x, top: point.y }}
              initial={{ opacity: 0, scale: 0 }}
              animate={{ opacity: 1, scale: 1 }}
              transition={{ duration: 0.5, delay: 1 + index * 0.1 }}
            >
              <motion.div
                className="flex items-center justify-center rounded-full"
                style={{
                  backgroundColor: point.color,
                  width: point.size,
                  height: point.size,
                }}
                animate={{
                  scale: [1, 1.2, 1],
                }}
                transition={{
                  repeat: Number.POSITIVE_INFINITY,
                  duration: 2,
                  delay: index * 0.3,
                }}
              />
              <span className="mt-1 text-xs text-slate-400">{point.label}</span>
            </motion.div>
          ))}
        </div>
      </motion.div>

      {/* Animated Connections */}
      <svg className="absolute inset-0 h-full w-full" style={{ zIndex: -1 }}>
        <motion.path
          d="M64 48 L160 48"
          stroke="#10B981"
          strokeWidth="1"
          strokeDasharray="10 5"
          initial={{ pathLength: 0, opacity: 0 }}
          animate={isVisible ? { pathLength: 1, opacity: 0.3 } : { pathLength: 0, opacity: 0 }}
          transition={{ duration: 1, delay: 1.5 }}
        />
        <motion.path
          d="M64 120 L160 120"
          stroke="#10B981"
          strokeWidth="1"
          strokeDasharray="10 5"
          initial={{ pathLength: 0, opacity: 0 }}
          animate={isVisible ? { pathLength: 1, opacity: 0.3 } : { pathLength: 0, opacity: 0 }}
          transition={{ duration: 1, delay: 1.6 }}
        />
        <motion.path
          d="M64 48 L64 120"
          stroke="#10B981"
          strokeWidth="1"
          strokeDasharray="10 5"
          initial={{ pathLength: 0, opacity: 0 }}
          animate={isVisible ? { pathLength: 1, opacity: 0.3 } : { pathLength: 0, opacity: 0 }}
          transition={{ duration: 1, delay: 1.7 }}
        />
        <motion.path
          d="M160 48 L160 120"
          stroke="#10B981"
          strokeWidth="1"
          strokeDasharray="10 5"
          initial={{ pathLength: 0, opacity: 0 }}
          animate={isVisible ? { pathLength: 1, opacity: 0.3 } : { pathLength: 0, opacity: 0 }}
          transition={{ duration: 1, delay: 1.8 }}
        />
      </svg>
    </div>
  )
}

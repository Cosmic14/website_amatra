"use client"

import { useEffect, useRef, useState } from "react"
import { Heart, Activity, Moon } from "lucide-react"

export default function RecoveryTrackingVisualization() {
  const [isVisible, setIsVisible] = useState(false)
  const ref = useRef<HTMLDivElement>(null)
  const canvasRef = useRef<HTMLCanvasElement>(null)
  const [heartRate, setHeartRate] = useState(65)
  const [hrvValue, setHrvValue] = useState(68)
  const [sleepScore, setSleepScore] = useState(82)

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

  useEffect(() => {
    if (!isVisible) return

    // Animate values with more natural, slower patterns
    const heartRateInterval = setInterval(() => {
      setHeartRate((prev) => {
        // Simulate natural heart rate fluctuations
        const change = Math.random() > 0.7 ? (Math.random() > 0.5 ? 1 : -1) : 0
        const newValue = prev + change
        return Math.max(62, Math.min(68, newValue))
      })
    }, 2000) // Slower updates

    const hrvInterval = setInterval(() => {
      setHrvValue((prev) => {
        // HRV changes more gradually
        const change = Math.random() > 0.6 ? (Math.random() > 0.5 ? 1 : -1) : 0
        const newValue = prev + change
        return Math.max(65, Math.min(72, newValue))
      })
    }, 3000) // Even slower updates

    const sleepInterval = setInterval(() => {
      setSleepScore((prev) => {
        // Sleep score is most stable
        const change = Math.random() > 0.8 ? (Math.random() > 0.5 ? 1 : -1) : 0
        const newValue = prev + change
        return Math.max(80, Math.min(84, newValue))
      })
    }, 4000) // Very slow updates

    return () => {
      clearInterval(heartRateInterval)
      clearInterval(hrvInterval)
      clearInterval(sleepInterval)
    }
  }, [isVisible])

  useEffect(() => {
    if (!isVisible || !canvasRef.current) return

    const canvas = canvasRef.current
    const ctx = canvas.getContext("2d")
    if (!ctx) return

    // Set canvas dimensions
    const setCanvasDimensions = () => {
      const dpr = window.devicePixelRatio || 1
      const rect = canvas.getBoundingClientRect()
      canvas.width = rect.width * dpr
      canvas.height = rect.height * dpr
      ctx.scale(dpr, dpr)
      canvas.style.width = `${rect.width}px`
      canvas.style.height = `${rect.height}px`
    }

    setCanvasDimensions()
    window.addEventListener("resize", setCanvasDimensions)

    // Draw HRV graph
    let animationFrameId: number
    let time = 0
    const points: { x: number; y: number }[] = []
    const maxPoints = 100

    // Initialize points with a realistic HRV pattern
    for (let i = 0; i < maxPoints; i++) {
      // Create a more realistic HRV pattern with respiratory sinus arrhythmia
      const respiratoryComponent = Math.sin(i * 0.1) * 15 // Breathing pattern
      const randomVariation = Math.random() * 5 - 2.5 // Small random variations
      const trend = Math.sin(i * 0.02) * 10 // Longer-term trend

      points.push({
        x: (canvas.width / maxPoints) * i,
        y: canvas.height / 2 + respiratoryComponent + randomVariation + trend,
      })
    }

    const animate = () => {
      time += 0.01
      ctx.clearRect(0, 0, canvas.width, canvas.height)

      // Draw grid lines
      ctx.strokeStyle = "rgba(100, 116, 139, 0.1)"
      ctx.lineWidth = 1

      // Horizontal grid lines
      for (let y = 0; y < canvas.height; y += 20) {
        ctx.beginPath()
        ctx.moveTo(0, y)
        ctx.lineTo(canvas.width, y)
        ctx.stroke()
      }

      // Vertical grid lines
      for (let x = 0; x < canvas.width; x += 40) {
        ctx.beginPath()
        ctx.moveTo(x, 0)
        ctx.lineTo(x, canvas.height)
        ctx.stroke()
      }

      // Shift points to the left
      points.shift()

      // Create a new point with realistic HRV pattern
      const respiratoryComponent = Math.sin(time * 2) * 15 // Breathing pattern
      const randomVariation = Math.random() * 5 - 2.5 // Small random variations
      const trend = Math.sin(time * 0.2) * 10 // Longer-term trend

      points.push({
        x: canvas.width,
        y: canvas.height / 2 + respiratoryComponent + randomVariation + trend,
      })

      // Recalculate x positions
      points.forEach((point, index) => {
        point.x = (canvas.width / maxPoints) * index
      })

      // Draw filled area under the line
      ctx.beginPath()
      ctx.moveTo(points[0].x, canvas.height)
      points.forEach((point) => {
        ctx.lineTo(point.x, point.y)
      })
      ctx.lineTo(points[points.length - 1].x, canvas.height)
      ctx.closePath()

      const gradient = ctx.createLinearGradient(0, 0, 0, canvas.height)
      gradient.addColorStop(0, "rgba(16, 185, 129, 0.2)")
      gradient.addColorStop(1, "rgba(16, 185, 129, 0)")
      ctx.fillStyle = gradient
      ctx.fill()

      // Draw line with glow effect
      ctx.beginPath()
      ctx.moveTo(points[0].x, points[0].y)
      for (let i = 1; i < points.length; i++) {
        // Use a smoother curve
        const xc = (points[i].x + points[i - 1].x) / 2
        const yc = (points[i].y + points[i - 1].y) / 2
        ctx.quadraticCurveTo(points[i - 1].x, points[i - 1].y, xc, yc)
      }

      // Add glow effect
      ctx.shadowColor = "rgba(16, 185, 129, 0.5)"
      ctx.shadowBlur = 5
      ctx.strokeStyle = "#10b981"
      ctx.lineWidth = 2
      ctx.stroke()
      ctx.shadowBlur = 0

      // Draw data points at intervals
      for (let i = 0; i < points.length; i += 10) {
        const point = points[i]

        // Glow effect
        ctx.beginPath()
        ctx.arc(point.x, point.y, 4, 0, Math.PI * 2)
        ctx.fillStyle = "rgba(16, 185, 129, 0.3)"
        ctx.fill()

        // Point
        ctx.beginPath()
        ctx.arc(point.x, point.y, 2, 0, Math.PI * 2)
        ctx.fillStyle = "#10b981"
        ctx.fill()
      }

      animationFrameId = requestAnimationFrame(animate)
    }

    animate()

    return () => {
      window.removeEventListener("resize", setCanvasDimensions)
      cancelAnimationFrame(animationFrameId)
    }
  }, [isVisible])

  return (
    <div ref={ref} className="w-full">
      <div className="border-b border-slate-800 bg-slate-900 p-3">
        <div className="flex items-center">
          <div className="mr-2 h-3 w-3 rounded-full bg-red-500"></div>
          <div className="mr-2 h-3 w-3 rounded-full bg-yellow-500"></div>
          <div className="h-3 w-3 rounded-full bg-green-500"></div>
          <div className="ml-4 text-xs font-medium text-slate-400">Recovery Metrics</div>
        </div>
      </div>
      <div className="p-6">
        <div className="grid grid-cols-3 gap-4 mb-6">
          <div
            className={`flex flex-col items-center justify-center rounded-lg border border-slate-800 bg-slate-900 p-4 transition-opacity duration-1000 ${isVisible ? "opacity-100" : "opacity-0"}`}
            style={{ transitionDelay: "200ms" }}
          >
            <div className="flex h-12 w-12 items-center justify-center rounded-full bg-emerald-900/30 text-emerald-400 mb-2">
              <Heart className="h-6 w-6" />
            </div>
            <div className="text-2xl font-bold text-white">{heartRate}</div>
            <div className="text-xs text-slate-400">Resting HR</div>
          </div>
          <div
            className={`flex flex-col items-center justify-center rounded-lg border border-slate-800 bg-slate-900 p-4 transition-opacity duration-1000 ${isVisible ? "opacity-100" : "opacity-0"}`}
            style={{ transitionDelay: "400ms" }}
          >
            <div className="flex h-12 w-12 items-center justify-center rounded-full bg-emerald-900/30 text-emerald-400 mb-2">
              <Activity className="h-6 w-6" />
            </div>
            <div className="text-2xl font-bold text-white">{hrvValue}</div>
            <div className="text-xs text-slate-400">HRV</div>
          </div>
          <div
            className={`flex flex-col items-center justify-center rounded-lg border border-slate-800 bg-slate-900 p-4 transition-opacity duration-1000 ${isVisible ? "opacity-100" : "opacity-0"}`}
            style={{ transitionDelay: "600ms" }}
          >
            <div className="flex h-12 w-12 items-center justify-center rounded-full bg-emerald-900/30 text-emerald-400 mb-2">
              <Moon className="h-6 w-6" />
            </div>
            <div className="text-2xl font-bold text-white">{sleepScore}</div>
            <div className="text-xs text-slate-400">Sleep Score</div>
          </div>
        </div>

        <div
          className={`rounded-lg border border-slate-800 bg-slate-900 p-4 transition-opacity duration-1000 ${isVisible ? "opacity-100" : "opacity-0"}`}
          style={{ transitionDelay: "800ms" }}
        >
          <div className="flex items-center justify-between mb-4">
            <h4 className="text-sm font-medium text-emerald-400">Heart Rate Variability (ms)</h4>
            <div className="flex items-center">
              <div className="h-2 w-2 rounded-full bg-emerald-500 mr-2"></div>
              <span className="text-xs text-slate-400">Live Data</span>
            </div>
          </div>
          <div className="h-40 w-full">
            <canvas ref={canvasRef} className="h-full w-full"></canvas>
          </div>
        </div>

        <div
          className={`mt-4 rounded-lg border border-slate-800 bg-slate-900 p-4 transition-opacity duration-1000 ${isVisible ? "opacity-100" : "opacity-0"}`}
          style={{ transitionDelay: "1000ms" }}
        >
          <div className="flex items-center justify-between mb-2">
            <h4 className="text-sm font-medium text-emerald-400">Recovery Score</h4>
            <span className="rounded-md bg-emerald-900/30 px-2 py-1 text-xs text-emerald-400">Good</span>
          </div>
          <div className="h-4 w-full rounded-full bg-slate-800 overflow-hidden">
            <div
              className="h-full rounded-full bg-gradient-to-r from-emerald-500 to-teal-500 transition-all duration-2000 ease-in-out"
              style={{ width: `${isVisible ? "78%" : "0%"}` }}
            ></div>
          </div>
          <div className="mt-1 flex justify-between text-xs text-slate-500">
            <span>0%</span>
            <span>78%</span>
            <span>100%</span>
          </div>
        </div>
      </div>
    </div>
  )
}

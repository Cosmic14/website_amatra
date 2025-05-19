"use client"

import { useEffect, useRef } from "react"

interface FlowingLinesBackgroundProps {
  className?: string
}

export default function FlowingLinesBackground({ className }: FlowingLinesBackgroundProps) {
  const canvasRef = useRef<HTMLCanvasElement>(null)
  const animationRef = useRef<number>(0)

  useEffect(() => {
    const canvas = canvasRef.current
    if (!canvas) return

    const ctx = canvas.getContext("2d")
    if (!ctx) return

    // Set canvas dimensions
    const setCanvasDimensions = () => {
      const dpr = window.devicePixelRatio || 1
      const width = window.innerWidth
      const height = window.innerHeight

      canvas.width = width * dpr
      canvas.height = height * dpr

      canvas.style.width = `${width}px`
      canvas.style.height = `${height}px`

      ctx.scale(dpr, dpr)
    }

    setCanvasDimensions()
    window.addEventListener("resize", setCanvasDimensions)

    // Create lines
    const lineCount = Math.min(12, Math.max(5, Math.floor(window.innerWidth / 120)))
    const lines = []

    // Colors
    const colors = [
      "rgba(16, 185, 129, 0.4)", // emerald
      "rgba(14, 165, 233, 0.4)", // sky blue
      "rgba(139, 92, 246, 0.4)", // purple
    ]

    // Create flowing lines
    for (let i = 0; i < lineCount; i++) {
      const points = []
      const pointCount = Math.floor(Math.random() * 3) + 2 // 2-4 points per line

      // Create points for this line
      for (let j = 0; j < pointCount; j++) {
        points.push({
          x: Math.random() * window.innerWidth,
          y: Math.random() * window.innerHeight,
          originX: Math.random() * window.innerWidth,
          originY: Math.random() * window.innerHeight,
          vx: (Math.random() - 0.5) * 0.5,
          vy: (Math.random() - 0.5) * 0.5,
        })
      }

      lines.push({
        points,
        color: colors[Math.floor(Math.random() * colors.length)],
        width: 1 + Math.random() * 2,
      })
    }

    // Animation function
    const animate = () => {
      ctx.clearRect(0, 0, canvas.width, canvas.height)

      // Update and draw each line
      lines.forEach((line) => {
        // Update points
        line.points.forEach((point) => {
          // Move point
          point.x += point.vx
          point.y += point.vy

          // Boundary check with smooth reversal
          if (point.x < 0 || point.x > window.innerWidth) {
            point.vx *= -1
          }
          if (point.y < 0 || point.y > window.innerHeight) {
            point.vy *= -1
          }

          // Gradually return to origin
          point.x += (point.originX - point.x) * 0.003
          point.y += (point.originY - point.y) * 0.003
        })

        // Draw line
        ctx.beginPath()
        ctx.moveTo(line.points[0].x, line.points[0].y)

        // Draw curve through points
        for (let i = 0; i < line.points.length - 1; i++) {
          const xc = (line.points[i].x + line.points[i + 1].x) / 2
          const yc = (line.points[i].y + line.points[i + 1].y) / 2
          ctx.quadraticCurveTo(line.points[i].x, line.points[i].y, xc, yc)
        }

        // Connect to last point
        const lastPoint = line.points[line.points.length - 1]
        ctx.lineTo(lastPoint.x, lastPoint.y)

        // Style and stroke
        ctx.strokeStyle = line.color
        ctx.lineWidth = line.width
        ctx.stroke()
      })

      animationRef.current = requestAnimationFrame(animate)
    }

    // Start animation
    animationRef.current = requestAnimationFrame(animate)

    // Cleanup
    return () => {
      cancelAnimationFrame(animationRef.current)
      window.removeEventListener("resize", setCanvasDimensions)
    }
  }, [])

  return <canvas ref={canvasRef} className={`fixed inset-0 z-0 ${className || ""}`} />
}

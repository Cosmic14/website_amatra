"use client"

import { useEffect, useRef } from "react"

interface GradientBackgroundProps {
  variant?: "green" | "blue" | "purple"
}

export default function GradientBackground({ variant = "green" }: GradientBackgroundProps) {
  const canvasRef = useRef<HTMLCanvasElement>(null)

  useEffect(() => {
    const canvas = canvasRef.current
    if (!canvas) return

    const ctx = canvas.getContext("2d")
    if (!ctx) return

    // Set canvas dimensions
    const setCanvasDimensions = () => {
      canvas.width = window.innerWidth
      canvas.height = window.innerHeight
    }

    setCanvasDimensions()
    window.addEventListener("resize", setCanvasDimensions)

    // Define colors based on variant
    let color1, color2, color3
    switch (variant) {
      case "blue":
        color1 = [6, 182, 212] // cyan-500
        color2 = [59, 130, 246] // blue-500
        color3 = [99, 102, 241] // indigo-500
        break
      case "purple":
        color1 = [99, 102, 241] // indigo-500
        color2 = [139, 92, 246] // purple-500
        color3 = [16, 185, 129] // emerald-500
        break
      default: // green
        color1 = [16, 185, 129] // emerald-500
        color2 = [20, 184, 166] // teal-500
        color3 = [6, 182, 212] // cyan-500
    }

    // Blob class
    class Blob {
      x: number
      y: number
      radius: number
      color: number[]
      angle: number
      velocity: number

      constructor(x: number, y: number, radius: number, color: number[]) {
        this.x = x
        this.y = y
        this.radius = radius
        this.color = color
        this.angle = Math.random() * Math.PI * 2
        this.velocity = 0.0005 + Math.random() * 0.0005
      }

      update() {
        this.angle += this.velocity
        this.x = canvas.width / 2 + Math.cos(this.angle) * (canvas.width / 4)
        this.y = canvas.height / 2 + Math.sin(this.angle) * (canvas.height / 4)
      }

      draw() {
        if (!ctx) return
        ctx.beginPath()
        const gradient = ctx.createRadialGradient(this.x, this.y, 0, this.x, this.y, this.radius)
        gradient.addColorStop(0, `rgba(${this.color[0]}, ${this.color[1]}, ${this.color[2]}, 0.8)`)
        gradient.addColorStop(1, `rgba(${this.color[0]}, ${this.color[1]}, ${this.color[2]}, 0)`)
        ctx.fillStyle = gradient
        ctx.arc(this.x, this.y, this.radius, 0, Math.PI * 2)
        ctx.fill()
      }
    }

    // Create blobs
    const blobs = [
      new Blob(canvas.width / 3, canvas.height / 3, canvas.width / 2, color1),
      new Blob((canvas.width / 3) * 2, canvas.height / 2, canvas.width / 2.5, color2),
      new Blob(canvas.width / 2, (canvas.height / 3) * 2, canvas.width / 3, color3),
    ]

    // Animation loop
    const animate = () => {
      if (!ctx) return
      ctx.clearRect(0, 0, canvas.width, canvas.height)

      // Draw and update blobs
      blobs.forEach((blob) => {
        blob.update()
        blob.draw()
      })

      requestAnimationFrame(animate)
    }

    animate()

    return () => {
      window.removeEventListener("resize", setCanvasDimensions)
    }
  }, [variant])

  return <canvas ref={canvasRef} className="h-full w-full" />
}

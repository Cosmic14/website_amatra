"use client"

import { useEffect, useRef } from "react"

interface ParticleBackgroundProps {
  density?: number
}

export default function ParticleBackground({ density = 50 }: ParticleBackgroundProps) {
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

    // Particle class
    class Particle {
      x: number
      y: number
      size: number
      speedX: number
      speedY: number
      color: string
      alpha: number
      baseAlpha: number
      pulseSpeed: number
      pulseDirection: number

      constructor() {
        this.x = Math.random() * canvas.width
        this.y = Math.random() * canvas.height
        this.size = Math.random() * 2 + 0.5
        this.speedX = (Math.random() - 0.5) * 0.3
        this.speedY = (Math.random() - 0.5) * 0.3
        this.baseAlpha = Math.random() * 0.3 + 0.1
        this.alpha = this.baseAlpha
        this.pulseSpeed = Math.random() * 0.01 + 0.005
        this.pulseDirection = 1

        // Choose from emerald/teal/cyan colors
        const colors = ["rgba(16, 185, 129, ", "rgba(20, 184, 166, ", "rgba(6, 182, 212, "]
        this.color = colors[Math.floor(Math.random() * colors.length)]
      }

      update() {
        this.x += this.speedX
        this.y += this.speedY

        if (this.x < 0 || this.x > canvas.width) {
          this.speedX = -this.speedX
        }

        if (this.y < 0 || this.y > canvas.height) {
          this.speedY = -this.speedY
        }

        // Pulsing effect
        this.alpha += this.pulseDirection * this.pulseSpeed
        if (this.alpha > this.baseAlpha + 0.2 || this.alpha < this.baseAlpha - 0.2) {
          this.pulseDirection *= -1
        }
      }

      draw() {
        if (!ctx) return
        ctx.fillStyle = `${this.color}${this.alpha})`
        ctx.beginPath()
        ctx.arc(this.x, this.y, this.size, 0, Math.PI * 2)
        ctx.fill()
      }
    }

    // Create particles
    const particles: Particle[] = []
    const particleCount = Math.min(density, Math.floor(window.innerWidth / 20))

    for (let i = 0; i < particleCount; i++) {
      particles.push(new Particle())
    }

    // Animation loop
    const animate = () => {
      if (!ctx) return
      ctx.clearRect(0, 0, canvas.width, canvas.height)

      // Draw and update particles
      particles.forEach((particle) => {
        particle.update()
        particle.draw()
      })

      // Draw connections
      ctx.strokeStyle = "rgba(16, 185, 129, 0.03)"
      ctx.lineWidth = 0.5
      for (let i = 0; i < particles.length; i++) {
        for (let j = i + 1; j < particles.length; j++) {
          const dx = particles[i].x - particles[j].x
          const dy = particles[i].y - particles[j].y
          const distance = Math.sqrt(dx * dx + dy * dy)

          if (distance < 100) {
            ctx.beginPath()
            ctx.moveTo(particles[i].x, particles[i].y)
            ctx.lineTo(particles[j].x, particles[j].y)
            ctx.stroke()
          }
        }
      }

      requestAnimationFrame(animate)
    }

    animate()

    return () => {
      window.removeEventListener("resize", setCanvasDimensions)
    }
  }, [density])

  return <canvas ref={canvasRef} className="h-full w-full" />
}

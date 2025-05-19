"use client"

import { useEffect, useRef } from "react"

interface AbstractDataVisualizationProps {
  variant?: "neural" | "wave" | "particles"
  className?: string
  primaryColor?: string
  secondaryColor?: string
  accentColor?: string
  density?: number
  speed?: number
}

export default function AbstractDataVisualization({
  variant = "neural",
  className = "",
  primaryColor = "rgba(16, 185, 129, 0.8)", // emerald
  secondaryColor = "rgba(14, 165, 233, 0.8)", // sky blue
  accentColor = "rgba(139, 92, 246, 0.8)", // violet
  density = 50,
  speed = 1.0,
}: AbstractDataVisualizationProps) {
  const canvasRef = useRef<HTMLCanvasElement>(null)
  const animationRef = useRef<number>(0)

  useEffect(() => {
    const canvas = canvasRef.current
    if (!canvas) return

    const ctx = canvas.getContext("2d")
    if (!ctx) return

    // Set canvas dimensions
    const resizeCanvas = () => {
      const { width, height } = canvas.getBoundingClientRect()
      const dpr = window.devicePixelRatio || 1
      canvas.width = width * dpr
      canvas.height = height * dpr
      ctx.scale(dpr, dpr)
    }

    resizeCanvas()
    window.addEventListener("resize", resizeCanvas)

    // Animation variables
    let time = 0
    const particles: any[] = []
    const nodes: any[] = []
    const waves: any[] = []

    // Calculate node count based on density and canvas size
    const calculateNodeCount = () => {
      const area = canvas.width * canvas.height
      return Math.min(200, Math.max(20, Math.floor((area * density) / 100000)))
    }

    // Initialize based on variant
    if (variant === "neural") {
      // Neural network visualization
      const nodeCount = calculateNodeCount()

      for (let i = 0; i < nodeCount; i++) {
        nodes.push({
          x: Math.random() * canvas.width,
          y: Math.random() * canvas.height,
          radius: Math.random() * 3 + 2, // Increased size for better visibility
          color: i % 3 === 0 ? primaryColor : i % 3 === 1 ? secondaryColor : accentColor,
          vx: (Math.random() - 0.5) * 0.5 * speed,
          vy: (Math.random() - 0.5) * 0.5 * speed,
          connections: [],
          pulseSpeed: Math.random() * 0.02 + 0.01,
          pulsePhase: Math.random() * Math.PI * 2,
        })
      }

      // Create connections
      for (let i = 0; i < nodeCount; i++) {
        const connectionCount = Math.floor(Math.random() * 3) + 2 // Increased minimum connections
        for (let j = 0; j < connectionCount; j++) {
          const targetIndex = Math.floor(Math.random() * nodeCount)
          if (targetIndex !== i && !nodes[i].connections.includes(targetIndex)) {
            nodes[i].connections.push(targetIndex)
          }
        }
      }
    } else if (variant === "wave") {
      // Wave visualization
      const waveCount = 5

      for (let i = 0; i < waveCount; i++) {
        waves.push({
          amplitude: 25 + Math.random() * 35, // Increased amplitude for better visibility
          frequency: 0.01 + Math.random() * 0.02,
          phase: Math.random() * Math.PI * 2,
          speed: (0.02 + Math.random() * 0.03) * speed,
          color: i % 3 === 0 ? primaryColor : i % 3 === 1 ? secondaryColor : accentColor,
          opacity: 0.9 - i * 0.15, // Increased opacity for better visibility
        })
      }
    } else if (variant === "particles") {
      // Particle system
      const particleCount = calculateNodeCount() * 1.5

      for (let i = 0; i < particleCount; i++) {
        particles.push({
          x: Math.random() * canvas.width,
          y: Math.random() * canvas.height,
          radius: Math.random() * 3 + 2, // Increased size for better visibility
          color: i % 3 === 0 ? primaryColor : i % 3 === 1 ? secondaryColor : accentColor,
          vx: (Math.random() - 0.5) * 0.5 * speed,
          vy: (Math.random() - 0.5) * 0.5 * speed,
          connectDistance: 120 + Math.random() * 60, // Increased connection distance
          pulseSpeed: Math.random() * 0.02 + 0.01,
          pulsePhase: Math.random() * Math.PI * 2,
        })
      }
    }

    // Animation loop
    const animate = () => {
      ctx.clearRect(0, 0, canvas.width, canvas.height)

      // Add a subtle background for better contrast
      ctx.fillStyle = "rgba(15, 23, 42, 0.2)"
      ctx.fillRect(0, 0, canvas.width, canvas.height)

      time += 0.01 * speed

      if (variant === "neural") {
        // Update and draw neural network

        // Update node positions
        nodes.forEach((node) => {
          node.x += node.vx
          node.y += node.vy

          // Boundary check with bounce
          if (node.x < 0 || node.x > canvas.width) node.vx *= -1
          if (node.y < 0 || node.y > canvas.height) node.vy *= -1

          // Keep within bounds
          node.x = Math.max(0, Math.min(canvas.width, node.x))
          node.y = Math.max(0, Math.min(canvas.height, node.y))
        })

        // Draw connections
        for (let i = 0; i < nodes.length; i++) {
          const node = nodes[i]

          for (let j = 0; j < node.connections.length; j++) {
            const targetNode = nodes[node.connections[j]]
            const dx = targetNode.x - node.x
            const dy = targetNode.y - node.y
            const distance = Math.sqrt(dx * dx + dy * dy)

            if (distance < 250) {
              // Increased connection distance
              // Draw connection line with gradient
              const gradient = ctx.createLinearGradient(node.x, node.y, targetNode.x, targetNode.y)
              gradient.addColorStop(0, node.color.replace(/[\d.]+\)$/, `${0.4 * (1 - distance / 250)})`)) // Increased opacity
              gradient.addColorStop(1, targetNode.color.replace(/[\d.]+\)$/, `${0.4 * (1 - distance / 250)})`)) // Increased opacity

              ctx.beginPath()
              ctx.moveTo(node.x, node.y)
              ctx.lineTo(targetNode.x, targetNode.y)
              ctx.strokeStyle = gradient
              ctx.lineWidth = 1.5 // Increased width
              ctx.stroke()

              // Draw pulse along the line
              const pulse = (Math.sin(time * node.pulseSpeed * 2 + node.pulsePhase) + 1) / 2
              const pulseX = node.x + dx * pulse
              const pulseY = node.y + dy * pulse

              // Enhanced pulse with glow
              ctx.shadowColor = node.color
              ctx.shadowBlur = 10
              ctx.beginPath()
              ctx.arc(pulseX, pulseY, 3, 0, Math.PI * 2) // Increased size
              ctx.fillStyle = node.color
              ctx.fill()
              ctx.shadowBlur = 0
            }
          }
        }

        // Draw nodes with pulsing effect
        nodes.forEach((node) => {
          const pulse = Math.sin(time * node.pulseSpeed + node.pulsePhase) * 0.5 + 1.5

          // Glow effect
          ctx.beginPath()
          ctx.arc(node.x, node.y, node.radius * pulse * 2.5, 0, Math.PI * 2) // Increased glow size
          ctx.fillStyle = node.color.replace(/[\d.]+\)$/, "0.2)")
          ctx.fill()

          // Node with glow
          ctx.shadowColor = node.color
          ctx.shadowBlur = 10
          ctx.beginPath()
          ctx.arc(node.x, node.y, node.radius * pulse, 0, Math.PI * 2)
          ctx.fillStyle = node.color
          ctx.fill()
          ctx.shadowBlur = 0
        })
      } else if (variant === "wave") {
        // Update and draw waves

        // Draw waves
        waves.forEach((wave, index) => {
          ctx.beginPath()

          // Start at bottom left
          ctx.moveTo(0, canvas.height)

          // Draw wave points
          for (let x = 0; x <= canvas.width; x += 5) {
            const normalizedX = x / canvas.width
            const y =
              canvas.height -
              canvas.height * 0.3 - // Base height
              Math.sin(normalizedX * 10 + time * wave.speed + wave.phase) * wave.amplitude -
              index * 25 // Increased offset for better separation

            ctx.lineTo(x, y)
          }

          // Complete the path to bottom right
          ctx.lineTo(canvas.width, canvas.height)
          ctx.closePath()

          // Fill wave with gradient
          const gradient = ctx.createLinearGradient(0, 0, 0, canvas.height)
          gradient.addColorStop(0, wave.color.replace(/[\d.]+\)$/, `${wave.opacity})`))
          gradient.addColorStop(1, wave.color.replace(/[\d.]+\)$/, "0)"))

          ctx.fillStyle = gradient
          ctx.fill()

          // Draw wave line with glow
          ctx.beginPath()

          for (let x = 0; x <= canvas.width; x += 5) {
            const normalizedX = x / canvas.width
            const y =
              canvas.height -
              canvas.height * 0.3 -
              Math.sin(normalizedX * 10 + time * wave.speed + wave.phase) * wave.amplitude -
              index * 25 // Increased offset

            if (x === 0) {
              ctx.moveTo(x, y)
            } else {
              ctx.lineTo(x, y)
            }
          }

          ctx.shadowColor = wave.color
          ctx.shadowBlur = 10
          ctx.strokeStyle = wave.color
          ctx.lineWidth = 2.5 // Increased width
          ctx.stroke()
          ctx.shadowBlur = 0

          // Add sparkles on the wave for better visibility
          if (index === 0 || index === 2) {
            for (let x = 0; x <= canvas.width; x += 40) {
              const normalizedX = x / canvas.width
              const y =
                canvas.height -
                canvas.height * 0.3 -
                Math.sin(normalizedX * 10 + time * wave.speed + wave.phase) * wave.amplitude -
                index * 25

              if (Math.random() > 0.7) {
                ctx.shadowColor = "rgba(255, 255, 255, 0.8)"
                ctx.shadowBlur = 10
                ctx.beginPath()
                ctx.arc(x, y, 2, 0, Math.PI * 2) // Increased size
                ctx.fillStyle = "rgba(255, 255, 255, 0.8)"
                ctx.fill()
                ctx.shadowBlur = 0
              }
            }
          }
        })
      } else if (variant === "particles") {
        // Update and draw particles

        // Update particle positions
        particles.forEach((particle) => {
          particle.x += particle.vx
          particle.y += particle.vy

          // Boundary check with wrap-around
          if (particle.x < 0) particle.x = canvas.width
          if (particle.x > canvas.width) particle.x = 0
          if (particle.y < 0) particle.y = canvas.height
          if (particle.y > canvas.height) particle.y = 0
        })

        // Draw connections between nearby particles
        for (let i = 0; i < particles.length; i++) {
          for (let j = i + 1; j < particles.length; j++) {
            const dx = particles[i].x - particles[j].x
            const dy = particles[i].y - particles[j].y
            const distance = Math.sqrt(dx * dx + dy * dy)

            if (distance < particles[i].connectDistance) {
              // Calculate opacity based on distance
              const opacity = 0.4 * (1 - distance / particles[i].connectDistance) // Increased opacity

              // Draw connection with gradient
              const gradient = ctx.createLinearGradient(particles[i].x, particles[i].y, particles[j].x, particles[j].y)
              gradient.addColorStop(0, particles[i].color.replace(/[\d.]+\)$/, `${opacity})`))
              gradient.addColorStop(1, particles[j].color.replace(/[\d.]+\)$/, `${opacity})`))

              ctx.beginPath()
              ctx.moveTo(particles[i].x, particles[i].y)
              ctx.lineTo(particles[j].x, particles[j].y)
              ctx.strokeStyle = gradient
              ctx.lineWidth = 1.5 // Increased width
              ctx.stroke()
            }
          }
        }

        // Draw particles with pulsing effect
        particles.forEach((particle) => {
          const pulse = Math.sin(time * particle.pulseSpeed + particle.pulsePhase) * 0.5 + 1.5

          // Glow effect
          ctx.beginPath()
          ctx.arc(particle.x, particle.y, particle.radius * pulse * 2.5, 0, Math.PI * 2) // Increased glow size
          ctx.fillStyle = particle.color.replace(/[\d.]+\)$/, "0.2)")
          ctx.fill()

          // Particle with glow
          ctx.shadowColor = particle.color
          ctx.shadowBlur = 10
          ctx.beginPath()
          ctx.arc(particle.x, particle.y, particle.radius * pulse, 0, Math.PI * 2)
          ctx.fillStyle = particle.color
          ctx.fill()
          ctx.shadowBlur = 0
        })
      }

      animationRef.current = requestAnimationFrame(animate)
    }

    // Start animation
    animationRef.current = requestAnimationFrame(animate)

    // Cleanup
    return () => {
      window.removeEventListener("resize", resizeCanvas)
      cancelAnimationFrame(animationRef.current)
    }
  }, [variant, primaryColor, secondaryColor, accentColor, density, speed])

  return (
    <div className={`relative rounded-lg border border-slate-800 bg-slate-900/50 p-1 shadow-lg ${className}`}>
      <canvas ref={canvasRef} className="w-full h-full rounded-lg" />
    </div>
  )
}

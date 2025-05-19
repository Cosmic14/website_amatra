"use client"

import { useEffect, useRef, useState } from "react"
import { motion } from "framer-motion"

interface FluidProcessVisualizationProps {
  className?: string
  activeStep?: number
}

export default function FluidProcessVisualization({ className = "", activeStep = 0 }: FluidProcessVisualizationProps) {
  const canvasRef = useRef<HTMLCanvasElement>(null)
  const animationRef = useRef<number>(0)
  const [dimensions, setDimensions] = useState({ width: 0, height: 0 })

  // Colors
  const emerald = "rgba(16, 185, 129, 1)"
  const emeraldLight = "rgba(16, 185, 129, 0.3)" // Increased opacity for better visibility
  const teal = "rgba(20, 184, 166, 1)"
  const blue = "rgba(14, 165, 233, 1)"
  const purple = "rgba(139, 92, 246, 1)"

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
      setDimensions({ width, height })
    }

    resizeCanvas()
    window.addEventListener("resize", resizeCanvas)

    // Animation variables
    let time = 0
    const nodes: any[] = []
    const connections: any[] = []
    const flowParticles: any[] = []

    // Create nodes
    const createNodes = () => {
      const nodeCount = 5 // One for each step
      const centerX = canvas.width / 2
      const centerY = canvas.height / 2
      const radius = Math.min(canvas.width, canvas.height) * 0.35

      for (let i = 0; i < nodeCount; i++) {
        const angle = (i / nodeCount) * Math.PI * 2 - Math.PI / 2
        const x = centerX + Math.cos(angle) * radius
        const y = centerY + Math.sin(angle) * radius

        nodes.push({
          id: i,
          x,
          y,
          radius: 15, // Increased size for better visibility
          color: i === activeStep ? emerald : emeraldLight,
          isActive: i === activeStep,
          angle,
          label: ["Data", "Baseline", "Analysis", "Insights", "Monitor"][i],
        })
      }

      // Create connections between nodes
      for (let i = 0; i < nodeCount; i++) {
        const nextIndex = (i + 1) % nodeCount
        connections.push({
          from: i,
          to: nextIndex,
          color: i < activeStep || (i === nodeCount - 1 && activeStep === 0) ? emerald : emeraldLight,
          isActive: i < activeStep || (i === nodeCount - 1 && activeStep === 0),
        })

        // Add flow particles for active connections
        if (i < activeStep || (i === nodeCount - 1 && activeStep === 0)) {
          for (let j = 0; j < 5; j++) {
            flowParticles.push({
              fromNode: i,
              toNode: nextIndex,
              progress: Math.random(),
              speed: 0.002 + Math.random() * 0.003,
              size: 4 + Math.random() * 3, // Increased size for better visibility
              color: [emerald, teal, blue][Math.floor(Math.random() * 3)],
            })
          }
        }
      }
    }

    createNodes()

    // Animation loop
    const animate = () => {
      ctx.clearRect(0, 0, canvas.width, canvas.height)
      time += 0.01

      // Draw background container
      ctx.fillStyle = "rgba(15, 23, 42, 0.6)" // Semi-transparent background
      ctx.fillRect(0, 0, canvas.width, canvas.height)

      // Draw outer container border
      ctx.strokeStyle = "rgba(30, 41, 59, 0.8)"
      ctx.lineWidth = 2
      ctx.strokeRect(0, 0, canvas.width, canvas.height)

      // Draw connections
      connections.forEach((connection) => {
        const fromNode = nodes[connection.from]
        const toNode = nodes[connection.to]

        // Draw connection line
        ctx.beginPath()
        ctx.moveTo(fromNode.x, fromNode.y)

        // Create a curved line
        const midX = (fromNode.x + toNode.x) / 2
        const midY = (fromNode.y + toNode.y) / 2
        const centerX = canvas.width / 2
        const centerY = canvas.height / 2

        // Pull the curve toward the center
        const curveX = midX + (centerX - midX) * 0.2
        const curveY = midY + (centerY - midY) * 0.2

        ctx.quadraticCurveTo(curveX, curveY, toNode.x, toNode.y)

        ctx.strokeStyle = connection.color
        ctx.lineWidth = connection.isActive ? 4 : 3 // Increased width for better visibility
        ctx.stroke()

        // Add glow effect for active connections
        if (connection.isActive) {
          ctx.beginPath()
          ctx.moveTo(fromNode.x, fromNode.y)
          ctx.quadraticCurveTo(curveX, curveY, toNode.x, toNode.y)
          ctx.strokeStyle = connection.color.replace("1)", "0.4)") // Increased opacity
          ctx.lineWidth = 10 // Increased glow size
          ctx.stroke()
        }
      })

      // Update and draw flow particles
      flowParticles.forEach((particle) => {
        const fromNode = nodes[particle.fromNode]
        const toNode = nodes[particle.toNode]
        const centerX = canvas.width / 2
        const centerY = canvas.height / 2

        // Update progress
        particle.progress += particle.speed
        if (particle.progress > 1) {
          particle.progress = 0
        }

        // Calculate position along the curve
        const t = particle.progress
        const midX = (fromNode.x + toNode.x) / 2
        const midY = (fromNode.y + toNode.y) / 2

        // Pull the curve toward the center
        const curveX = midX + (centerX - midX) * 0.2
        const curveY = midY + (centerY - midY) * 0.2

        // Quadratic bezier curve formula
        const x = Math.pow(1 - t, 2) * fromNode.x + 2 * (1 - t) * t * curveX + Math.pow(t, 2) * toNode.x
        const y = Math.pow(1 - t, 2) * fromNode.y + 2 * (1 - t) * t * curveY + Math.pow(t, 2) * toNode.y

        // Draw particle with enhanced glow
        ctx.shadowColor = particle.color
        ctx.shadowBlur = 10
        ctx.beginPath()
        ctx.arc(x, y, particle.size, 0, Math.PI * 2)
        ctx.fillStyle = particle.color
        ctx.fill()
        ctx.shadowBlur = 0

        // Add glow
        ctx.beginPath()
        ctx.arc(x, y, particle.size * 2, 0, Math.PI * 2)
        ctx.fillStyle = particle.color.replace("1)", "0.4)") // Increased opacity
        ctx.fill()
      })

      // Draw nodes
      nodes.forEach((node) => {
        // Draw node background glow
        if (node.isActive) {
          ctx.beginPath()
          ctx.arc(node.x, node.y, node.radius * 2.5, 0, Math.PI * 2)
          ctx.fillStyle = node.color.replace("1)", "0.3)") // Increased opacity
          ctx.fill()
        }

        // Draw node with shadow for better visibility
        ctx.shadowColor = "rgba(0, 0, 0, 0.5)"
        ctx.shadowBlur = 10
        ctx.beginPath()
        ctx.arc(node.x, node.y, node.radius, 0, Math.PI * 2)
        ctx.fillStyle = node.isActive ? node.color : "rgba(30, 41, 59, 1)"
        ctx.fill()
        ctx.strokeStyle = node.color
        ctx.lineWidth = 2
        ctx.stroke()
        ctx.shadowBlur = 0

        // Draw icon or number inside node
        ctx.fillStyle = "#ffffff"
        ctx.font = "bold 14px Inter, sans-serif" // Increased font size
        ctx.textAlign = "center"
        ctx.textBaseline = "middle"
        ctx.fillText((node.id + 1).toString(), node.x, node.y)

        // Draw label with shadow for better visibility
        ctx.shadowColor = "rgba(0, 0, 0, 0.8)"
        ctx.shadowBlur = 4
        ctx.font = "bold 14px Inter, sans-serif" // Increased font size and made bold
        ctx.fillStyle = node.isActive ? "#ffffff" : "rgba(203, 213, 225, 1)" // Lighter color for better contrast

        // Position label based on angle
        const labelDistance = node.radius * 2.8
        const labelX = node.x + Math.cos(node.angle) * labelDistance
        const labelY = node.y + Math.sin(node.angle) * labelDistance

        ctx.fillText(node.label, labelX, labelY)
        ctx.shadowBlur = 0
      })

      // Draw central content based on active step
      const centerX = canvas.width / 2
      const centerY = canvas.height / 2
      const centerRadius = Math.min(canvas.width, canvas.height) * 0.18 // Increased size

      // Draw central circle with enhanced visibility
      ctx.shadowColor = emerald.replace("1)", "0.5)")
      ctx.shadowBlur = 15
      ctx.beginPath()
      ctx.arc(centerX, centerY, centerRadius, 0, Math.PI * 2)
      ctx.fillStyle = "rgba(15, 23, 42, 0.9)" // Darker background for better contrast
      ctx.fill()
      ctx.strokeStyle = emerald
      ctx.lineWidth = 3 // Thicker border
      ctx.stroke()
      ctx.shadowBlur = 0

      // Draw central content based on active step
      drawCentralContent(ctx, centerX, centerY, centerRadius, activeStep, time)

      animationRef.current = requestAnimationFrame(animate)
    }

    // Draw central content based on active step
    const drawCentralContent = (
      ctx: CanvasRenderingContext2D,
      x: number,
      y: number,
      radius: number,
      step: number,
      time: number,
    ) => {
      switch (step) {
        case 0: // Data Collection
          // Draw data points flowing in
          for (let i = 0; i < 8; i++) {
            const angle = (time * 0.5 + (i * Math.PI) / 4) % (Math.PI * 2)
            const distance = radius * (0.3 + 0.4 * Math.sin(time * 2 + i))
            const pointX = x + Math.cos(angle) * distance
            const pointY = y + Math.sin(angle) * distance

            // Enhanced glow for better visibility
            ctx.shadowColor = [emerald, teal, blue][i % 3]
            ctx.shadowBlur = 10
            ctx.beginPath()
            ctx.arc(pointX, pointY, 5, 0, Math.PI * 2) // Increased size
            ctx.fillStyle = [emerald, teal, blue][i % 3]
            ctx.fill()
            ctx.shadowBlur = 0

            // Add connecting lines for better visibility
            ctx.beginPath()
            ctx.moveTo(x, y)
            ctx.lineTo(pointX, pointY)
            ctx.strokeStyle = [emerald, teal, blue][i % 3].replace("1)", "0.3)")
            ctx.lineWidth = 1
            ctx.stroke()
          }

          // Add label
          ctx.fillStyle = "#ffffff"
          ctx.font = "bold 14px Inter, sans-serif"
          ctx.textAlign = "center"
          ctx.fillText("Data Collection", x, y + radius * 0.7)
          break

        case 1: // Baseline
          // Draw baseline chart with enhanced visibility
          ctx.shadowColor = emerald.replace("1)", "0.5)")
          ctx.shadowBlur = 8
          ctx.beginPath()
          ctx.moveTo(x - radius * 0.7, y + radius * 0.2)

          for (let i = 0; i < 8; i++) {
            const pointX = x - radius * 0.7 + (radius * 1.4 * i) / 7
            const pointY = y + Math.sin(i * 0.8 + time) * radius * 0.3
            ctx.lineTo(pointX, pointY)
          }

          ctx.strokeStyle = emerald
          ctx.lineWidth = 3 // Thicker line
          ctx.stroke()
          ctx.shadowBlur = 0

          // Draw baseline range with better visibility
          ctx.beginPath()
          ctx.moveTo(x - radius * 0.7, y)
          ctx.lineTo(x + radius * 0.7, y)
          ctx.strokeStyle = "rgba(203, 213, 225, 0.7)" // Lighter color
          ctx.setLineDash([5, 5])
          ctx.lineWidth = 2 // Thicker line
          ctx.stroke()
          ctx.setLineDash([])

          // Add data points for better visibility
          for (let i = 0; i < 8; i++) {
            const pointX = x - radius * 0.7 + (radius * 1.4 * i) / 7
            const pointY = y + Math.sin(i * 0.8 + time) * radius * 0.3

            ctx.beginPath()
            ctx.arc(pointX, pointY, 3, 0, Math.PI * 2)
            ctx.fillStyle = emerald
            ctx.fill()
          }

          // Add label
          ctx.fillStyle = "#ffffff"
          ctx.font = "bold 14px Inter, sans-serif"
          ctx.textAlign = "center"
          ctx.fillText("Baseline Establishment", x, y + radius * 0.7)
          break

        case 2: // AI Analysis
          // Draw neural network with enhanced visibility
          const nodePositions = [
            { x: x - radius * 0.5, y: y - radius * 0.5 },
            { x: x + radius * 0.5, y: y - radius * 0.5 },
            { x: x, y: y },
            { x: x - radius * 0.5, y: y + radius * 0.5 },
            { x: x + radius * 0.5, y: y + radius * 0.5 },
          ]

          // Draw connections with better visibility
          for (let i = 0; i < nodePositions.length; i++) {
            for (let j = i + 1; j < nodePositions.length; j++) {
              ctx.beginPath()
              ctx.moveTo(nodePositions[i].x, nodePositions[i].y)
              ctx.lineTo(nodePositions[j].x, nodePositions[j].y)
              ctx.strokeStyle = "rgba(203, 213, 225, 0.5)" // Lighter color
              ctx.lineWidth = 2 // Thicker line
              ctx.stroke()
            }
          }

          // Draw nodes with enhanced glow
          nodePositions.forEach((node, i) => {
            const pulse = Math.sin(time * 2 + i) * 0.3 + 1
            const nodeColor = [emerald, teal, blue][i % 3]

            // Glow effect
            ctx.shadowColor = nodeColor
            ctx.shadowBlur = 10
            ctx.beginPath()
            ctx.arc(node.x, node.y, 6 * pulse, 0, Math.PI * 2) // Increased size
            ctx.fillStyle = nodeColor
            ctx.fill()
            ctx.shadowBlur = 0

            // Add outer glow
            ctx.beginPath()
            ctx.arc(node.x, node.y, 10 * pulse, 0, Math.PI * 2)
            ctx.fillStyle = nodeColor.replace("1)", "0.3)")
            ctx.fill()
          })

          // Add label
          ctx.fillStyle = "#ffffff"
          ctx.font = "bold 14px Inter, sans-serif"
          ctx.textAlign = "center"
          ctx.fillText("AI Analysis", x, y + radius * 0.7)
          break

        case 3: // Insights
          // Draw insights radiating out with enhanced visibility
          for (let i = 0; i < 5; i++) {
            const angle = ((Math.PI * 2) / 5) * i
            const startX = x + Math.cos(angle) * radius * 0.3
            const startY = y + Math.sin(angle) * radius * 0.3
            const endX = x + Math.cos(angle) * radius * 0.8
            const endY = y + Math.sin(angle) * radius * 0.8
            const rayColor = [emerald, teal, blue][i % 3]

            // Enhanced ray with glow
            ctx.shadowColor = rayColor
            ctx.shadowBlur = 8
            ctx.beginPath()
            ctx.moveTo(startX, startY)
            ctx.lineTo(endX, endY)
            ctx.strokeStyle = rayColor
            ctx.lineWidth = 3 // Thicker line
            ctx.stroke()
            ctx.shadowBlur = 0

            // Draw insight point with enhanced visibility
            ctx.shadowColor = rayColor
            ctx.shadowBlur = 10
            ctx.beginPath()
            ctx.arc(endX, endY, 6, 0, Math.PI * 2) // Increased size
            ctx.fillStyle = rayColor
            ctx.fill()
            ctx.shadowBlur = 0

            // Add outer glow
            ctx.beginPath()
            ctx.arc(endX, endY, 10, 0, Math.PI * 2)
            ctx.fillStyle = rayColor.replace("1)", "0.3)")
            ctx.fill()
          }

          // Draw central hub with enhanced visibility
          ctx.shadowColor = emerald.replace("1)", "0.5)")
          ctx.shadowBlur = 15
          ctx.beginPath()
          ctx.arc(x, y, radius * 0.3, 0, Math.PI * 2)
          ctx.fillStyle = emerald
          ctx.fill()
          ctx.shadowBlur = 0

          // Add label
          ctx.fillStyle = "#ffffff"
          ctx.font = "bold 14px Inter, sans-serif"
          ctx.textAlign = "center"
          ctx.fillText("Personalized Insights", x, y + radius * 0.7)
          break

        case 4: // Monitoring
          // Draw circular progress with enhanced visibility
          const progressAngle = time % (Math.PI * 2)

          // Background track with better visibility
          ctx.beginPath()
          ctx.arc(x, y, radius * 0.6, 0, Math.PI * 2)
          ctx.strokeStyle = "rgba(203, 213, 225, 0.5)" // Lighter color
          ctx.lineWidth = 6 // Thicker line
          ctx.stroke()

          // Progress arc with glow
          ctx.shadowColor = emerald.replace("1)", "0.5)")
          ctx.shadowBlur = 10
          ctx.beginPath()
          ctx.arc(x, y, radius * 0.6, -Math.PI / 2, -Math.PI / 2 + progressAngle)
          ctx.strokeStyle = emerald
          ctx.lineWidth = 6 // Thicker line
          ctx.stroke()
          ctx.shadowBlur = 0

          // Draw monitoring points with enhanced visibility
          for (let i = 0; i < 3; i++) {
            const angle = progressAngle + ((Math.PI * 2) / 3) * i
            const pointX = x + Math.cos(angle) * radius * 0.6
            const pointY = y + Math.sin(angle) * radius * 0.6
            const pointColor = [emerald, teal, blue][i % 3]

            // Enhanced glow
            ctx.shadowColor = pointColor
            ctx.shadowBlur = 10
            ctx.beginPath()
            ctx.arc(pointX, pointY, 7, 0, Math.PI * 2) // Increased size
            ctx.fillStyle = pointColor
            ctx.fill()
            ctx.shadowBlur = 0

            // Add outer glow
            ctx.beginPath()
            ctx.arc(pointX, pointY, 12, 0, Math.PI * 2)
            ctx.fillStyle = pointColor.replace("1)", "0.3)")
            ctx.fill()
          }

          // Add label
          ctx.fillStyle = "#ffffff"
          ctx.font = "bold 14px Inter, sans-serif"
          ctx.textAlign = "center"
          ctx.fillText("Continuous Monitoring", x, y + radius * 0.7)
          break
      }
    }

    // Start animation
    animationRef.current = requestAnimationFrame(animate)

    // Cleanup
    return () => {
      window.removeEventListener("resize", resizeCanvas)
      cancelAnimationFrame(animationRef.current)
    }
  }, [activeStep])

  return (
    <div className={`relative rounded-lg border-2 border-slate-800 bg-slate-900/80 p-1 shadow-lg ${className}`}>
      <canvas ref={canvasRef} className="w-full h-full rounded-lg" />
      {dimensions.width > 0 && (
        <div className="absolute inset-0 pointer-events-none rounded-lg overflow-hidden">
          <motion.div
            className="absolute inset-0 bg-gradient-to-r from-emerald-500/10 to-blue-500/10 rounded-lg opacity-0"
            animate={{ opacity: [0, 0.5, 0] }}
            transition={{ duration: 3, repeat: Number.POSITIVE_INFINITY, repeatType: "reverse" }}
          />
        </div>
      )}
    </div>
  )
}

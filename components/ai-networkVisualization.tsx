"use client"

import { useEffect, useRef, useState } from "react"

interface Node {
  id: number
  x: number
  y: number
  size: number
  vx: number
  vy: number
  connections: number[]
  type: "sleep" | "nutrition" | "hydration" | "stress" | "hrv" | "activity" | "recovery" | "central"
  label: string
  value: string
  impact: number // -1 to 1 impact on recovery
  pulseSpeed: number
  pulsePhase: number
  isHovered: boolean
}

export default function AINetworkVisualization() {
  const canvasRef = useRef<HTMLCanvasElement>(null)
  const [isVisible, setIsVisible] = useState(false)
  const containerRef = useRef<HTMLDivElement>(null)
  const [hoveredNode, setHoveredNode] = useState<Node | null>(null)
  const [mousePosition, setMousePosition] = useState({ x: 0, y: 0 })
  const animationRef = useRef<number>(0)
  const dprRef = useRef<number>(1)
  const nodesRef = useRef<Node[]>([])
  const timeRef = useRef<number>(0)

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

  // Initialize nodes
  useEffect(() => {
    if (!isVisible || !canvasRef.current) return

    const canvas = canvasRef.current
    dprRef.current = window.devicePixelRatio || 1

    // Set canvas dimensions
    const setCanvasDimensions = () => {
      const rect = canvas.getBoundingClientRect()
      canvas.width = rect.width * dprRef.current
      canvas.height = rect.height * dprRef.current
      canvas.style.width = `${rect.width}px`
      canvas.style.height = `${rect.height}px`
    }

    setCanvasDimensions()
    window.addEventListener("resize", setCanvasDimensions)

    // Create nodes
    const centerX = canvas.width / 2
    const centerY = canvas.height / 2
    const radius = Math.min(canvas.width, canvas.height) * 0.35

    // Create central node
    const newNodes: Node[] = [
      {
        id: 0,
        x: centerX,
        y: centerY,
        size: 12,
        vx: 0,
        vy: 0,
        connections: [],
        type: "central",
        label: "Recovery Score",
        value: "78%",
        impact: 0,
        pulseSpeed: 0.5,
        pulsePhase: 0,
        isHovered: false,
      },
    ]

    // Create behavior nodes
    const behaviorNodes = [
      { type: "sleep", label: "Sleep Quality", value: "7.2 hrs", impact: 0.8 },
      { type: "nutrition", label: "Nutrition", value: "Good", impact: 0.6 },
      { type: "hydration", label: "Hydration", value: "2.8L", impact: 0.5 },
      { type: "stress", label: "Stress Level", value: "Moderate", impact: -0.4 },
    ]

    // Create health metric nodes
    const healthNodes = [
      { type: "hrv", label: "HRV", value: "68ms", impact: 0.7 },
      { type: "activity", label: "Activity", value: "Moderate", impact: 0.3 },
      { type: "recovery", label: "Recovery Time", value: "14hrs", impact: 0.6 },
    ]

    // Position nodes in a circle
    const allNodeTypes = [...behaviorNodes, ...healthNodes]
    const angleStep = (2 * Math.PI) / allNodeTypes.length

    allNodeTypes.forEach((nodeData, i) => {
      const angle = i * angleStep
      const x = centerX + radius * Math.cos(angle)
      const y = centerY + radius * Math.sin(angle)

      const node: Node = {
        id: i + 1,
        x,
        y,
        size: 8 + Math.abs(nodeData.impact) * 4,
        vx: (Math.random() - 0.5) * 0.2,
        vy: (Math.random() - 0.5) * 0.2,
        connections: [0], // Connect to central node
        type: nodeData.type as Node["type"],
        label: nodeData.label,
        value: nodeData.value,
        impact: nodeData.impact,
        pulseSpeed: 0.3 + Math.random() * 0.2,
        pulsePhase: Math.random() * Math.PI * 2,
        isHovered: false,
      }

      // Connect central node back to this node
      newNodes[0].connections.push(i + 1)

      newNodes.push(node)
    })

    // Add some connections between nodes
    for (let i = 1; i < newNodes.length; i++) {
      // Connect to 1-2 other nodes besides the central one
      const connectionCount = 1 + Math.floor(Math.random() * 2)
      for (let j = 0; j < connectionCount; j++) {
        let targetIndex
        do {
          targetIndex = 1 + Math.floor(Math.random() * (newNodes.length - 1))
        } while (targetIndex === i || newNodes[i].connections.includes(targetIndex))

        newNodes[i].connections.push(targetIndex)
        // Make connections bidirectional
        if (!newNodes[targetIndex].connections.includes(i)) {
          newNodes[targetIndex].connections.push(i)
        }
      }
    }

    // Store nodes in ref instead of state to avoid re-renders
    nodesRef.current = newNodes

    return () => {
      window.removeEventListener("resize", setCanvasDimensions)
    }
  }, [isVisible])

  // Handle mouse interactions
  useEffect(() => {
    if (!isVisible || !canvasRef.current || nodesRef.current.length === 0) return

    const canvas = canvasRef.current

    const handleMouseMove = (e: MouseEvent) => {
      const rect = canvas.getBoundingClientRect()
      const x = (e.clientX - rect.left) * dprRef.current
      const y = (e.clientY - rect.top) * dprRef.current
      setMousePosition({ x, y })

      // Check if mouse is over any node
      let hoveredNodeFound = false

      // Update hover state in the ref without triggering re-renders
      nodesRef.current = nodesRef.current.map((node) => {
        const dx = node.x - x
        const dy = node.y - y
        const distance = Math.sqrt(dx * dx + dy * dy)
        const isHovered = distance < node.size * 2

        if (isHovered) {
          hoveredNodeFound = true
          setHoveredNode({ ...node, isHovered: true })
        }

        return { ...node, isHovered }
      })

      if (!hoveredNodeFound) {
        setHoveredNode(null)
      }
    }

    const handleClick = (e: MouseEvent) => {
      if (hoveredNode) {
        // Could implement additional click behavior here
        console.log(`Clicked on ${hoveredNode.label}: ${hoveredNode.value}`)
      }
    }

    canvas.addEventListener("mousemove", handleMouseMove)
    canvas.addEventListener("click", handleClick)

    return () => {
      canvas.removeEventListener("mousemove", handleMouseMove)
      canvas.removeEventListener("click", handleClick)
    }
  }, [isVisible, hoveredNode])

  // Animation loop
  useEffect(() => {
    if (!isVisible || !canvasRef.current || nodesRef.current.length === 0) return

    const canvas = canvasRef.current
    const ctx = canvas.getContext("2d")
    if (!ctx) return

    const animate = () => {
      timeRef.current += 0.01
      ctx.clearRect(0, 0, canvas.width, canvas.height)

      // Update node positions with gentle movement
      // Important: We're updating the ref directly, not using setState
      nodesRef.current = nodesRef.current.map((node) => {
        if (node.type === "central") {
          // Central node stays fixed
          return node
        }

        // Add slight movement
        let newX = node.x + node.vx
        let newY = node.y + node.vy

        // Calculate distance from center
        const centerX = canvas.width / 2
        const centerY = canvas.height / 2
        const dx = newX - centerX
        const dy = newY - centerY
        const distance = Math.sqrt(dx * dx + dy * dy)
        const idealRadius = Math.min(canvas.width, canvas.height) * 0.35

        // Apply force toward ideal radius
        const angle = Math.atan2(dy, dx)
        const radiusForce = (idealRadius - distance) * 0.01
        newX += Math.cos(angle) * radiusForce
        newY += Math.sin(angle) * radiusForce

        // Dampen velocity
        const newVx = node.vx * 0.98 + (Math.random() - 0.5) * 0.1
        const newVy = node.vy * 0.98 + (Math.random() - 0.5) * 0.1

        // Limit velocity
        const maxVel = 0.5
        const velMag = Math.sqrt(newVx * newVx + newVy * newVy)
        const limitedVx = velMag > maxVel ? (newVx / velMag) * maxVel : newVx
        const limitedVy = velMag > maxVel ? (newVy / velMag) * maxVel : newVy

        return {
          ...node,
          x: newX,
          y: newY,
          vx: limitedVx,
          vy: limitedVy,
        }
      })

      // Draw connections
      ctx.lineWidth = 1
      nodesRef.current.forEach((node) => {
        node.connections.forEach((targetIndex) => {
          const target = nodesRef.current[targetIndex]

          // Skip if target doesn't exist
          if (!target) return

          // Draw connection line
          ctx.beginPath()
          ctx.moveTo(node.x, node.y)
          ctx.lineTo(target.x, target.y)

          // Color based on impact
          let strokeColor
          const impactAvg = (node.impact + target.impact) / 2

          if (node.type === "central" || target.type === "central") {
            // Connection to central node
            const nonCentralNode = node.type === "central" ? target : node
            if (nonCentralNode.impact > 0) {
              strokeColor = `rgba(16, 185, 129, ${0.2 + Math.abs(nonCentralNode.impact) * 0.3})`
            } else {
              strokeColor = `rgba(239, 68, 68, ${0.2 + Math.abs(nonCentralNode.impact) * 0.3})`
            }
          } else {
            // Connection between regular nodes
            strokeColor = "rgba(148, 163, 184, 0.2)"
          }

          ctx.strokeStyle = strokeColor
          ctx.stroke()

          // Draw data flow particles along connections
          const dx = target.x - node.x
          const dy = target.y - node.y
          const distance = Math.sqrt(dx * dx + dy * dy)

          // Multiple particles per connection
          const particleCount = 2
          for (let p = 0; p < particleCount; p++) {
            // Calculate position along the line with offset for each particle
            const offset = (timeRef.current * 0.2 + p * 0.5) % 1
            const x = node.x + dx * offset
            const y = node.y + dy * offset

            // Draw particle
            ctx.beginPath()
            ctx.arc(x, y, 1.5, 0, Math.PI * 2)

            // Color based on node type
            let fillColor
            if (node.type === "central" || target.type === "central") {
              const nonCentralNode = node.type === "central" ? target : node
              if (nonCentralNode.impact > 0) {
                fillColor = "rgba(16, 185, 129, 0.8)"
              } else {
                fillColor = "rgba(239, 68, 68, 0.8)"
              }
            } else {
              fillColor = "rgba(148, 163, 184, 0.8)"
            }

            ctx.fillStyle = fillColor
            ctx.fill()
          }
        })
      })

      // Draw nodes
      nodesRef.current.forEach((node) => {
        // Pulse effect
        const pulse = node.isHovered ? 1.2 : 0.8 + Math.sin(timeRef.current * node.pulseSpeed + node.pulsePhase) * 0.2

        // Glow effect
        ctx.beginPath()
        ctx.arc(node.x, node.y, node.size * pulse * 1.5, 0, Math.PI * 2)

        // Color based on node type
        let glowColor
        if (node.type === "central") {
          glowColor = "rgba(79, 70, 229, 0.3)" // Indigo for central
        } else if (node.impact > 0) {
          glowColor = `rgba(16, 185, 129, ${0.2 + node.impact * 0.3})` // Green for positive
        } else {
          glowColor = `rgba(239, 68, 68, ${0.2 + Math.abs(node.impact) * 0.3})` // Red for negative
        }

        ctx.fillStyle = glowColor
        ctx.fill()

        // Node
        ctx.beginPath()
        ctx.arc(node.x, node.y, node.size * pulse, 0, Math.PI * 2)

        // Color based on node type
        let fillColor
        if (node.type === "central") {
          fillColor = "#4f46e5" // Indigo for central
        } else if (node.impact > 0) {
          fillColor = "#10b981" // Green for positive
        } else {
          fillColor = "#ef4444" // Red for negative
        }

        ctx.fillStyle = fillColor
        ctx.fill()

        // Add icon or letter in the center of the node
        if (node.size > 5) {
          ctx.fillStyle = "#ffffff"
          ctx.font = `${node.size}px Arial`
          ctx.textAlign = "center"
          ctx.textBaseline = "middle"

          // Use a simple letter instead of emoji to avoid the replace() error
          let icon = ""
          switch (node.type) {
            case "sleep":
              icon = "S"
              break
            case "nutrition":
              icon = "N"
              break
            case "hydration":
              icon = "H"
              break
            case "stress":
              icon = "T"
              break
            case "hrv":
              icon = "V"
              break
            case "activity":
              icon = "A"
              break
            case "recovery":
              icon = "R"
              break
            case "central":
              icon = "C"
              break
            default:
              icon = "."
          }

          // Draw text slightly smaller than node
          const fontSize = Math.max(node.size * 0.8, 1)
          ctx.font = `${fontSize}px Arial`
          ctx.fillText(icon, node.x, node.y)
        }
      })

      // Draw tooltip for hovered node
      if (hoveredNode) {
        const padding = 10 * dprRef.current
        const tooltipWidth = 180 * dprRef.current
        const tooltipHeight = 80 * dprRef.current
        const fontSize = 14 * dprRef.current

        // Position tooltip near mouse but keep on screen
        let tooltipX = mousePosition.x + 20 * dprRef.current
        let tooltipY = mousePosition.y - tooltipHeight - 10 * dprRef.current

        // Adjust if off screen
        if (tooltipX + tooltipWidth > canvas.width) {
          tooltipX = mousePosition.x - tooltipWidth - 20 * dprRef.current
        }
        if (tooltipY < 0) {
          tooltipY = mousePosition.y + 20 * dprRef.current
        }

        // Draw tooltip background
        ctx.fillStyle = "rgba(15, 23, 42, 0.9)"
        ctx.strokeStyle = hoveredNode.impact > 0 ? "rgba(16, 185, 129, 0.8)" : "rgba(239, 68, 68, 0.8)"
        ctx.lineWidth = 2 * dprRef.current
        ctx.beginPath()
        ctx.roundRect(tooltipX, tooltipY, tooltipWidth, tooltipHeight, 8 * dprRef.current)
        ctx.fill()
        ctx.stroke()

        // Draw tooltip content
        ctx.fillStyle = "#ffffff"
        ctx.font = `bold ${fontSize}px Arial`
        ctx.textAlign = "left"
        ctx.textBaseline = "top"
        ctx.fillText(hoveredNode.label, tooltipX + padding, tooltipY + padding)

        ctx.fillStyle = "#94a3b8"
        ctx.font = `${fontSize}px Arial`
        ctx.fillText(`Value: ${hoveredNode.value}`, tooltipX + padding, tooltipY + padding + fontSize * 1.5)

        const impactText = `Impact: ${Math.abs(Math.round(hoveredNode.impact * 100))}% ${hoveredNode.impact > 0 ? "Positive" : "Negative"}`
        ctx.fillStyle = hoveredNode.impact > 0 ? "#10b981" : "#ef4444"
        ctx.fillText(impactText, tooltipX + padding, tooltipY + padding + fontSize * 3)
      }

      animationRef.current = requestAnimationFrame(animate)
    }

    animate()

    return () => {
      cancelAnimationFrame(animationRef.current)
    }
  }, [isVisible, hoveredNode, mousePosition])

  return (
    <div ref={containerRef} className="h-full w-full">
      <canvas
        ref={canvasRef}
        className="h-full w-full cursor-pointer"
        aria-label="Interactive recovery network visualization showing behaviors and health metrics"
      ></canvas>
    </div>
  )
}

"use client"

import { useEffect, useRef } from "react"

interface TechIllustrationProps {
  variant?: "dashboard" | "wearable" | "brain" | "athlete"
  className?: string
  primaryColor?: string
  secondaryColor?: string
  accentColor?: string
  animated?: boolean
  animationSpeed?: number
}

export default function TechIllustration({
  variant = "dashboard",
  className = "",
  primaryColor = "rgba(16, 185, 129, 1)", // emerald
  secondaryColor = "rgba(20, 184, 166, 1)", // teal
  accentColor = "rgba(6, 182, 212, 1)", // cyan
  animated = true,
  animationSpeed = 1.0, // Default animation speed (lower = slower)
}: TechIllustrationProps) {
  const canvasRef = useRef<HTMLCanvasElement>(null)
  const containerRef = useRef<HTMLDivElement>(null)

  useEffect(() => {
    const canvas = canvasRef.current
    const container = containerRef.current
    if (!canvas || !container) return

    const ctx = canvas.getContext("2d")
    if (!ctx) return

    // Set canvas dimensions
    const resizeCanvas = () => {
      if (!canvas || !container) return

      // Get the actual dimensions of the container
      const { width, height } = container.getBoundingClientRect()

      // Set canvas size with device pixel ratio for sharp rendering
      const dpr = window.devicePixelRatio || 1
      canvas.width = width * dpr
      canvas.height = height * dpr

      // Set display size (css pixels)
      canvas.style.width = `${width}px`
      canvas.style.height = `${height}px`

      // Scale all drawing operations by the dpr
      const ctx = canvas.getContext("2d")
      if (ctx) {
        ctx.scale(dpr, dpr)

        // Clear and redraw when resized
        ctx.clearRect(0, 0, width, height)
      }
    }

    resizeCanvas()
    window.addEventListener("resize", resizeCanvas)

    // Animation variables
    let animationFrameId: number
    let time = 0

    // Draw based on variant
    const draw = () => {
      if (!canvas) return

      const ctx = canvas.getContext("2d")
      if (!ctx) return

      // Get current dimensions (in CSS pixels)
      const { width, height } = canvas.getBoundingClientRect()

      // Skip drawing if dimensions are too small
      if (width < 10 || height < 10) {
        animationFrameId = requestAnimationFrame(draw)
        return
      }

      // Clear the entire canvas
      ctx.clearRect(0, 0, width, height)

      if (animated) {
        time += 0.005 * animationSpeed // Slower animation speed
      }

      // Draw based on variant, passing the CSS pixel dimensions
      if (variant === "dashboard") {
        drawDashboard(ctx, width, height, time, primaryColor, secondaryColor, accentColor)
      } else if (variant === "wearable") {
        drawWearable(ctx, width, height, time, primaryColor, secondaryColor, accentColor)
      } else if (variant === "brain") {
        drawBrain(ctx, width, height, time, primaryColor, secondaryColor, accentColor)
      } else if (variant === "athlete") {
        drawAthlete(ctx, width, height, time, primaryColor, secondaryColor, accentColor)
      }

      animationFrameId = requestAnimationFrame(draw)
    }

    draw()

    // Cleanup
    return () => {
      window.removeEventListener("resize", resizeCanvas)
      if (animationFrameId) {
        cancelAnimationFrame(animationFrameId)
      }
    }
  }, [variant, primaryColor, secondaryColor, accentColor, animated, animationSpeed])

  return (
    <div ref={containerRef} className={`relative w-full h-full rounded-lg overflow-hidden ${className}`}>
      <canvas ref={canvasRef} className="w-full h-full" />
    </div>
  )
}

// Dashboard visualization
function drawDashboard(
  ctx: CanvasRenderingContext2D,
  width: number,
  height: number,
  time: number,
  primaryColor: string,
  secondaryColor: string,
  accentColor: string,
) {
  // Background with gradient
  const bgGradient = ctx.createLinearGradient(0, 0, 0, height)
  bgGradient.addColorStop(0, "#0f172a")
  bgGradient.addColorStop(1, "#1e293b")
  ctx.fillStyle = bgGradient
  ctx.fillRect(0, 0, width, height)

  // Grid lines
  ctx.strokeStyle = "rgba(100, 116, 139, 0.2)"
  ctx.lineWidth = 1

  // Vertical grid lines
  for (let x = 0; x < width; x += 40) {
    ctx.beginPath()
    ctx.moveTo(x, 0)
    ctx.lineTo(x, height)
    ctx.stroke()
  }

  // Horizontal grid lines
  for (let y = 0; y < height; y += 40) {
    ctx.beginPath()
    ctx.moveTo(0, y)
    ctx.lineTo(width, y)
    ctx.stroke()
  }

  // Draw charts
  const padding = 20
  const chartHeight = Math.max(10, (height - padding * 3) / 2)

  // Chart 1: Team Recovery Status
  ctx.save()
  ctx.translate(padding, padding)

  // Chart header with glow
  ctx.shadowColor = primaryColor.replace(/[\d.]+\)$/, "0.7)")
  ctx.shadowBlur = 15
  ctx.fillStyle = "#ffffff"
  ctx.font = "bold 16px sans-serif"
  ctx.fillText("Team Recovery Status", 0, 20)
  ctx.shadowBlur = 0

  // Chart background
  const chartWidth = Math.max(10, width - padding * 2)
  ctx.fillStyle = "rgba(15, 23, 42, 0.5)"
  ctx.fillRect(0, 30, chartWidth, chartHeight)

  // Chart border
  ctx.strokeStyle = "rgba(100, 116, 139, 0.5)"
  ctx.lineWidth = 1
  ctx.strokeRect(0, 30, chartWidth, chartHeight)

  // Generate realistic team recovery data (simulating a week of data)
  const dataPoints = 30
  const recoveryData = []

  // Create a more realistic pattern with trends
  for (let i = 0; i < dataPoints; i++) {
    // Base pattern: gradual improvement with some setbacks
    const dayOfWeek = i % 7
    let baseValue = 70 + (i / dataPoints) * 15 // Gradual improvement trend

    // Weekly pattern: lower on game days (assume day 0), recovery days after
    if (dayOfWeek === 0)
      baseValue -= 15 // Game day (lower recovery)
    else if (dayOfWeek === 1)
      baseValue -= 10 // Day after game
    else if (dayOfWeek === 6) baseValue -= 5 // Pre-game day

    // Add some natural variation
    const variation = Math.sin(i * 0.5 + time * 0.3) * 5

    recoveryData.push(baseValue + variation)
  }

  // Draw recovery line chart
  ctx.beginPath()
  for (let i = 0; i < dataPoints; i++) {
    const x = (i / (dataPoints - 1)) * chartWidth
    const y = 30 + chartHeight - (recoveryData[i] / 100) * chartHeight

    if (i === 0) {
      ctx.moveTo(x, y)
    } else {
      ctx.lineTo(x, y)
    }
  }

  // Line style with glow
  ctx.shadowColor = primaryColor.replace(/[\d.]+\)$/, "0.7)")
  ctx.shadowBlur = 15
  ctx.strokeStyle = primaryColor
  ctx.lineWidth = 3
  ctx.stroke()
  ctx.shadowBlur = 0

  // Fill area under the line
  ctx.lineTo(chartWidth, 30 + chartHeight)
  ctx.lineTo(0, 30 + chartHeight)
  ctx.closePath()

  const areaGradient = ctx.createLinearGradient(0, 30, 0, 30 + chartHeight)
  areaGradient.addColorStop(0, primaryColor.replace(/[\d.]+\)$/, "0.3)"))
  areaGradient.addColorStop(1, primaryColor.replace(/[\d.]+\)$/, "0.0)"))
  ctx.fillStyle = areaGradient
  ctx.fill()

  // Add data points at key positions
  for (let i = 0; i < dataPoints; i += 4) {
    const x = (i / (dataPoints - 1)) * chartWidth
    const y = 30 + chartHeight - (recoveryData[i] / 100) * chartHeight

    // Glow effect
    ctx.beginPath()
    ctx.arc(x, y, 6, 0, Math.PI * 2)
    ctx.fillStyle = primaryColor.replace(/[\d.]+\)$/, "0.4)")
    ctx.fill()

    // Data point
    ctx.shadowColor = primaryColor.replace(/[\d.]+\)$/, "0.7)")
    ctx.shadowBlur = 10
    ctx.beginPath()
    ctx.arc(x, y, 3, 0, Math.PI * 2)
    ctx.fillStyle = primaryColor
    ctx.fill()
    ctx.shadowBlur = 0
  }

  ctx.restore()

  // Chart 2: Athlete Availability
  ctx.save()
  ctx.translate(padding, padding * 2 + chartHeight)

  // Chart header with glow
  ctx.shadowColor = secondaryColor.replace(/[\d.]+\)$/, "0.7)")
  ctx.shadowBlur = 15
  ctx.fillStyle = "#ffffff"
  ctx.font = "bold 16px sans-serif"
  ctx.fillText("Athlete Availability", 0, 20)
  ctx.shadowBlur = 0

  // Chart background
  ctx.fillStyle = "rgba(15, 23, 42, 0.5)"
  ctx.fillRect(0, 30, chartWidth, chartHeight)

  // Chart border
  ctx.strokeStyle = "rgba(100, 116, 139, 0.5)"
  ctx.lineWidth = 1
  ctx.strokeRect(0, 30, chartWidth, chartHeight)

  // Draw bar chart
  const barCount = 7
  const barWidth = Math.max(5, chartWidth / barCount - 10)
  const barLabels = ["Mon", "Tue", "Wed", "Thu", "Fri", "Sat", "Sun"]

  // Generate realistic availability data
  const availabilityData = [
    95, // Monday - most players available
    90, // Tuesday
    85, // Wednesday - some players resting
    88, // Thursday
    80, // Friday - some players preparing for game
    75, // Saturday - game day, some injuries
    85, // Sunday - recovery day
  ]

  // Animate the bars growing from bottom
  const animationProgress = Math.min(1, time * 0.2) // Slower animation

  for (let i = 0; i < barCount; i++) {
    const value = availabilityData[i]
    const animatedValue = value * animationProgress
    const barHeight = (animatedValue / 100) * (chartHeight - 40)
    const x = i * (barWidth + 10)
    const y = 30 + chartHeight - barHeight

    // Bar gradient
    const gradient = ctx.createLinearGradient(x, y, x, 30 + chartHeight)

    // Color based on availability
    let barColor = primaryColor
    if (value < 80) barColor = "#FBBF24" // Yellow for medium availability
    if (value < 70) barColor = "#F43F5E" // Red for low availability

    gradient.addColorStop(0, barColor)
    gradient.addColorStop(1, barColor.replace(/[\d.]+\)$/, "0.2)"))

    // Bar with glow
    ctx.shadowColor = barColor.replace(/[\d.]+\)$/, "0.5)")
    ctx.shadowBlur = 10
    ctx.fillStyle = gradient
    ctx.fillRect(x, y, barWidth, barHeight)

    // Bar border
    ctx.strokeStyle = barColor
    ctx.lineWidth = 1
    ctx.strokeRect(x, y, barWidth, barHeight)
    ctx.shadowBlur = 0

    // Add value label
    ctx.shadowColor = "rgba(0, 0, 0, 0.7)"
    ctx.shadowBlur = 5
    ctx.fillStyle = "#ffffff"
    ctx.font = "bold 12px sans-serif"
    ctx.textAlign = "center"
    ctx.fillText(`${Math.floor(value)}%`, x + barWidth / 2, y - 5)
    ctx.shadowBlur = 0

    // Add day label
    ctx.fillStyle = "#94A3B8"
    ctx.font = "11px sans-serif"
    ctx.fillText(barLabels[i], x + barWidth / 2, 30 + chartHeight + 15)
  }

  ctx.restore()

  // Data points and connections - representing team connections
  const pointCount = 15 // Fewer points for clarity
  const points = []

  // Generate points in a more structured way (representing players)
  for (let i = 0; i < pointCount; i++) {
    // Create a more structured layout - players in formation
    const row = Math.floor(i / 5)
    const col = i % 5

    const baseX = width * 0.2 + col * (width * 0.15)
    const baseY = height * 0.3 + row * (height * 0.2)

    // Add some movement to simulate player movement
    const movementX = Math.sin(time * 0.3 + i * 0.5) * width * 0.03
    const movementY = Math.cos(time * 0.2 + i * 0.7) * height * 0.02

    points.push({
      x: baseX + movementX,
      y: baseY + movementY,
      size: 3 + (i % 3), // Vary size slightly
      color: i % 3 === 0 ? primaryColor : i % 3 === 1 ? secondaryColor : accentColor,
    })
  }

  // Draw connections between nearby points (representing team connections)
  for (let i = 0; i < pointCount; i++) {
    for (let j = i + 1; j < pointCount; j++) {
      const dx = points[j].x - points[i].x
      const dy = points[j].y - points[i].y
      const distance = Math.sqrt(dx * dx + dy * dy)

      if (distance < width * 0.15) {
        // Connect only nearby points
        // Connection strength varies with time to show changing team dynamics
        const connectionStrength = 0.3 + Math.sin(time * 0.2 + i * 0.1) * 0.1

        // Connection gradient
        const gradient = ctx.createLinearGradient(points[i].x, points[i].y, points[j].x, points[j].y)
        gradient.addColorStop(
          0,
          points[i].color.replace(/[\d.]+\)$/, `${connectionStrength * (1 - distance / (width * 0.15))})`),
        )
        gradient.addColorStop(
          1,
          points[j].color.replace(/[\d.]+\)$/, `${connectionStrength * (1 - distance / (width * 0.15))})`),
        )

        ctx.beginPath()
        ctx.moveTo(points[i].x, points[i].y)
        ctx.lineTo(points[j].x, points[j].y)
        ctx.strokeStyle = gradient
        ctx.lineWidth = 1
        ctx.stroke()
      }
    }
  }

  // Draw points with glow
  for (let i = 0; i < pointCount; i++) {
    // Pulse effect - players' status changing
    const pulse = 0.8 + Math.sin(time * 0.5 + i * 0.7) * 0.2

    // Glow effect
    ctx.beginPath()
    ctx.arc(points[i].x, points[i].y, points[i].size * pulse * 2, 0, Math.PI * 2)
    ctx.fillStyle = points[i].color.replace(/[\d.]+\)$/, "0.3)")
    ctx.fill()

    // Point
    ctx.shadowColor = points[i].color.replace(/[\d.]+\)$/, "0.5)")
    ctx.shadowBlur = 10
    ctx.beginPath()
    ctx.arc(points[i].x, points[i].y, points[i].size * pulse, 0, Math.PI * 2)
    ctx.fillStyle = points[i].color
    ctx.fill()
    ctx.shadowBlur = 0
  }
}

// Wearable visualization
function drawWearable(
  ctx: CanvasRenderingContext2D,
  width: number,
  height: number,
  time: number,
  primaryColor: string,
  secondaryColor: string,
  accentColor: string,
) {
  // Skip drawing if dimensions are too small
  if (width < 50 || height < 50) {
    // Draw a simple placeholder instead
    ctx.fillStyle = "#0f172a"
    ctx.fillRect(0, 0, width, height)
    return
  }

  // Background with gradient
  const bgGradient = ctx.createLinearGradient(0, 0, 0, height)
  bgGradient.addColorStop(0, "#0f172a")
  bgGradient.addColorStop(1, "#1e293b")
  ctx.fillStyle = bgGradient
  ctx.fillRect(0, 0, width, height)

  const centerX = width / 2
  const centerY = height / 2
  const watchSize = Math.min(width, height) * 0.5 // Slightly smaller to fit better
  const watchRadius = Math.max(10, watchSize / 2) // Ensure minimum radius

  // Draw watch body
  ctx.save()
  ctx.translate(centerX, centerY)

  // Watch outer case with glow
  ctx.shadowColor = primaryColor.replace(/[\d.]+\)$/, "0.5)")
  ctx.shadowBlur = 15
  ctx.beginPath()
  ctx.arc(0, 0, watchRadius, 0, Math.PI * 2)
  const gradient = ctx.createLinearGradient(-watchRadius, -watchRadius, watchRadius, watchRadius)
  gradient.addColorStop(0, "#334155")
  gradient.addColorStop(1, "#1e293b")
  ctx.fillStyle = gradient
  ctx.fill()

  ctx.strokeStyle = "#64748b"
  ctx.lineWidth = 3
  ctx.stroke()
  ctx.shadowBlur = 0

  // Watch screen
  ctx.beginPath()
  const screenRadius = Math.max(5, watchRadius * 0.9) // Ensure minimum radius
  ctx.arc(0, 0, screenRadius, 0, Math.PI * 2)
  const screenGradient = ctx.createRadialGradient(0, 0, 0, 0, 0, screenRadius)
  screenGradient.addColorStop(0, "#0f172a")
  screenGradient.addColorStop(1, "#0f172a")
  ctx.fillStyle = screenGradient
  ctx.fill()

  // Watch content - Heart rate monitor
  // Realistic heart rate that varies with breathing cycle
  const baseHeartRate = 74
  const heartRateVariation = Math.sin(time * 0.3) * 3 // Slower, more natural variation
  const heartRate = baseHeartRate + heartRateVariation

  // Heart rate text with glow
  ctx.shadowColor = primaryColor.replace(/[\d.]+\)$/, "0.5)")
  ctx.shadowBlur = 10
  ctx.fillStyle = "#ffffff"
  ctx.font = "bold 18px sans-serif"
  ctx.textAlign = "center"
  ctx.fillText(`${Math.floor(heartRate)} BPM`, 0, -watchRadius * 0.3)
  ctx.shadowBlur = 0

  // Heart icon with glow and pulse animation
  const heartPulse = 0.8 + Math.sin(time * 2) * 0.2 // Pulsing with heartbeat
  ctx.shadowColor = "rgba(239, 68, 68, 0.5)"
  ctx.shadowBlur = 10
  ctx.fillStyle = "#ef4444"

  // Animated heart that beats with the heart rate
  const heartScale = heartPulse
  ctx.save()
  ctx.scale(heartScale, heartScale)

  // Draw heart with safe radius values
  const heartCircleRadius = Math.max(1, 8) // Ensure positive radius
  ctx.beginPath()
  ctx.arc(-10, 0, heartCircleRadius, 0, Math.PI * 2)
  ctx.arc(10, 0, heartCircleRadius, 0, Math.PI * 2)
  ctx.fill()
  ctx.beginPath()
  ctx.moveTo(-18, 0)
  ctx.lineTo(0, 18)
  ctx.lineTo(18, 0)
  ctx.fill()

  ctx.restore()
  ctx.shadowBlur = 0

  // Heart rate graph - ECG style
  ctx.beginPath()
  const graphStartX = Math.max(-watchRadius * 0.7, -width / 2 + 10)
  const graphEndX = Math.min(watchRadius * 0.7, width / 2 - 10)
  ctx.moveTo(graphStartX, watchRadius * 0.3)

  // Draw a realistic ECG pattern
  for (let x = graphStartX; x <= graphEndX; x += 2) {
    const normalizedX = (x - graphStartX) / (graphEndX - graphStartX)
    let y = watchRadius * 0.3

    // Create ECG pattern that moves with time
    const ecgPhase = (normalizedX * 2 + time * 0.2) % 1

    // P wave
    if (ecgPhase < 0.1) {
      y += Math.sin(ecgPhase * Math.PI * 10) * 5
    }
    // QRS complex
    else if (ecgPhase < 0.2) {
      if (ecgPhase < 0.15) {
        y -= (ecgPhase - 0.1) * 200
      } else {
        y += (ecgPhase - 0.15) * 400 - 10
      }
    }
    // T wave
    else if (ecgPhase < 0.4) {
      y += Math.sin((ecgPhase - 0.2) * Math.PI * 5) * 8
    }

    ctx.lineTo(x, y)
  }

  // Line style with glow
  ctx.shadowColor = primaryColor.replace(/[\d.]+\)$/, "0.5)")
  ctx.shadowBlur = 10
  ctx.strokeStyle = primaryColor
  ctx.lineWidth = 2
  ctx.stroke()
  ctx.shadowBlur = 0

  ctx.restore()

  // Add health metrics in circular displays - only if there's enough space
  if (width >= 200 && height >= 200) {
    const metrics = [
      { label: "Sleep", value: "7.5h", color: accentColor, x: centerX - watchSize * 0.8, y: centerY - watchSize * 0.6 },
      {
        label: "Steps",
        value: "8,432",
        color: secondaryColor,
        x: centerX + watchSize * 0.8,
        y: centerY - watchSize * 0.6,
      },
      {
        label: "Recovery",
        value: "82%",
        color: primaryColor,
        x: centerX + watchSize * 0.8,
        y: centerY + watchSize * 0.6,
      },
    ]

    metrics.forEach((metric, index) => {
      // Draw metric bubble with glow
      ctx.shadowColor = metric.color.replace(/[\d.]+\)$/, "0.5)")
      ctx.shadowBlur = 10

      // Draw circular progress indicator
      const circleRadius = Math.max(5, watchSize * 0.2) // Ensure minimum radius
      const startAngle = -Math.PI / 2
      let endAngle

      // Different progress for each metric
      if (index === 0) {
        // Sleep - progress based on 8h being 100%
        endAngle = startAngle + (Number.parseFloat(metric.value) / 8) * Math.PI * 2
      } else if (index === 1) {
        // Steps - progress based on 10000 being 100%
        endAngle = startAngle + (Number.parseInt(metric.value.replace(",", "")) / 10000) * Math.PI * 2
      } else {
        // Recovery - progress based on percentage
        endAngle = startAngle + (Number.parseInt(metric.value) / 100) * Math.PI * 2
      }

      // Background circle
      ctx.beginPath()
      ctx.arc(metric.x, metric.y, circleRadius, 0, Math.PI * 2)
      ctx.strokeStyle = metric.color.replace(/[\d.]+\)$/, "0.2)")
      ctx.lineWidth = 5
      ctx.stroke()

      // Progress arc
      ctx.beginPath()
      ctx.arc(metric.x, metric.y, circleRadius, startAngle, endAngle)
      ctx.strokeStyle = metric.color
      ctx.lineWidth = 5
      ctx.stroke()

      // Inner circle for text
      ctx.beginPath()
      ctx.arc(metric.x, metric.y, Math.max(1, circleRadius - 10), 0, Math.PI * 2)
      ctx.fillStyle = "rgba(15, 23, 42, 0.7)"
      ctx.fill()

      // Draw metric text
      ctx.fillStyle = "#ffffff"
      ctx.font = "bold 14px sans-serif"
      ctx.textAlign = "center"
      ctx.fillText(metric.value, metric.x, metric.y)

      ctx.fillStyle = "#e2e8f0"
      ctx.font = "10px sans-serif"
      ctx.fillText(metric.label, metric.x, metric.y + 15)

      // Draw connection to watch
      ctx.beginPath()
      ctx.moveTo(centerX, centerY)
      ctx.lineTo(metric.x, metric.y)

      const connectionGradient = ctx.createLinearGradient(centerX, centerY, metric.x, metric.y)
      connectionGradient.addColorStop(0, metric.color.replace(/[\d.]+\)$/, "0.3)"))
      connectionGradient.addColorStop(1, metric.color.replace(/[\d.]+\)$/, "0.1)"))

      ctx.strokeStyle = connectionGradient
      ctx.setLineDash([2, 2])
      ctx.lineWidth = 1
      ctx.stroke()
      ctx.setLineDash([])

      // Animate data transmission along the connection
      const pulsePosition = (time * 0.3 + index * 0.2) % 1
      const pulseX = centerX + (metric.x - centerX) * pulsePosition
      const pulseY = centerY + (metric.y - centerY) * pulsePosition

      ctx.beginPath()
      ctx.arc(pulseX, pulseY, 3, 0, Math.PI * 2)
      ctx.fillStyle = metric.color
      ctx.fill()
    })

    // Add subtle background elements - data streams
    for (let i = 0; i < 5; i++) {
      const angle = (i / 5) * Math.PI * 2 + time * 0.1
      const length = Math.min(width, height) * 0.4

      ctx.beginPath()
      ctx.moveTo(centerX, centerY)
      const endX = centerX + Math.cos(angle) * length
      const endY = centerY + Math.sin(angle) * length

      const streamGradient = ctx.createLinearGradient(centerX, centerY, endX, endY)
      streamGradient.addColorStop(0, `rgba(16, 185, 129, 0.5)`)
      streamGradient.addColorStop(1, `rgba(16, 185, 129, 0.0)`)

      ctx.strokeStyle = streamGradient
      ctx.lineWidth = 1
      ctx.setLineDash([5, 5])
      ctx.stroke()
      ctx.setLineDash([])
    }
  }
}

// Brain visualization
function drawBrain(
  ctx: CanvasRenderingContext2D,
  width: number,
  height: number,
  time: number,
  primaryColor: string,
  secondaryColor: string,
  accentColor: string,
) {
  // Skip drawing if dimensions are too small
  if (width < 50 || height < 50) {
    // Draw a simple placeholder instead
    ctx.fillStyle = "#0f172a"
    ctx.fillRect(0, 0, width, height)
    return
  }

  // Background with gradient
  const bgGradient = ctx.createLinearGradient(0, 0, 0, height)
  bgGradient.addColorStop(0, "#0f172a")
  bgGradient.addColorStop(1, "#1e293b")
  ctx.fillStyle = bgGradient
  ctx.fillRect(0, 0, width, height)

  const centerX = width / 2
  const centerY = height / 2
  const brainRadius = Math.max(10, Math.min(width, height) * 0.35) // Ensure minimum radius

  // Draw brain outline
  ctx.save()
  ctx.translate(centerX, centerY)

  // Brain shape with glow
  ctx.shadowColor = primaryColor.replace(/[\d.]+\)$/, "0.5)")
  ctx.shadowBlur = 15
  ctx.beginPath()

  // Left hemisphere
  ctx.moveTo(-brainRadius * 0.2, -brainRadius * 0.8)
  ctx.bezierCurveTo(
    -brainRadius * 0.6,
    -brainRadius * 0.8,
    -brainRadius * 0.9,
    -brainRadius * 0.4,
    -brainRadius * 0.9,
    0,
  )
  ctx.bezierCurveTo(
    -brainRadius * 0.9,
    brainRadius * 0.6,
    -brainRadius * 0.6,
    brainRadius * 0.8,
    -brainRadius * 0.2,
    brainRadius * 0.7,
  )

  // Right hemisphere
  ctx.moveTo(brainRadius * 0.2, -brainRadius * 0.8)
  ctx.bezierCurveTo(brainRadius * 0.6, -brainRadius * 0.8, brainRadius * 0.9, -brainRadius * 0.4, brainRadius * 0.9, 0)
  ctx.bezierCurveTo(
    brainRadius * 0.9,
    brainRadius * 0.6,
    brainRadius * 0.6,
    brainRadius * 0.8,
    brainRadius * 0.2,
    brainRadius * 0.7,
  )

  ctx.strokeStyle = primaryColor
  ctx.lineWidth = 2
  ctx.stroke()
  ctx.shadowBlur = 0

  // Brain folds - more anatomically inspired
  const foldCount = 12
  const foldSets = [
    { radius: brainRadius * 0.7, count: 8, offset: 0 },
    { radius: brainRadius * 0.5, count: 6, offset: Math.PI / 12 },
    { radius: brainRadius * 0.3, count: 4, offset: Math.PI / 8 },
  ]

  foldSets.forEach((foldSet) => {
    for (let i = 0; i < foldSet.count; i++) {
      const angle = (i / foldSet.count) * Math.PI * 2 + foldSet.offset
      const radius = foldSet.radius
      const x1 = Math.cos(angle) * radius * 0.5
      const y1 = Math.sin(angle) * radius * 0.5
      const x2 = Math.cos(angle) * radius
      const y2 = Math.sin(angle) * radius

      ctx.beginPath()
      ctx.moveTo(x1, y1)

      // Add some subtle movement to the folds
      const controlX = (x1 + x2) / 2 + Math.sin(angle * 3 + time * 0.2) * 5
      const controlY = (y1 + y2) / 2 + Math.cos(angle * 3 + time * 0.2) * 5

      ctx.quadraticCurveTo(controlX, controlY, x2, y2)

      ctx.strokeStyle = primaryColor.replace(/[\d.]+\)$/, "0.4)")
      ctx.lineWidth = 1
      ctx.stroke()
    }
  })

  // Neural network nodes
  const nodeCount = 25 // Fewer nodes for clarity
  const nodes = []

  // Generate nodes in a more brain-like pattern
  for (let i = 0; i < nodeCount; i++) {
    // Place nodes in a more structured pattern resembling brain regions
    let angle, radius

    if (i < 10) {
      // Frontal lobe
      angle = (Math.PI / 3) * (i / 10) - Math.PI / 6
      radius = brainRadius * (0.4 + Math.random() * 0.3)
    } else if (i < 15) {
      // Temporal lobe - left
      angle = Math.PI / 2 + (Math.PI / 4) * ((i - 10) / 5)
      radius = brainRadius * (0.5 + Math.random() * 0.3)
    } else if (i < 20) {
      // Temporal lobe - right
      angle = -Math.PI / 2 - (Math.PI / 4) * ((i - 15) / 5)
      radius = brainRadius * (0.5 + Math.random() * 0.3)
    } else {
      // Occipital lobe
      angle = Math.PI + (Math.PI / 3) * ((i - 20) / 5) - Math.PI / 6
      radius = brainRadius * (0.4 + Math.random() * 0.3)
    }

    nodes.push({
      x: Math.cos(angle) * radius,
      y: Math.sin(angle) * radius,
      size: Math.max(1, 2 + Math.random() * 2), // Ensure positive size
      pulseSpeed: 0.05 + Math.random() * 0.05, // Slower pulse
      pulsePhase: Math.random() * Math.PI * 2,
      color: i % 3 === 0 ? primaryColor : i % 3 === 1 ? secondaryColor : accentColor,
      region: i < 10 ? "frontal" : i < 15 ? "temporal-left" : i < 20 ? "temporal-right" : "occipital",
    })
  }

  // Draw connections between nodes in the same region
  for (let i = 0; i < nodeCount; i++) {
    for (let j = i + 1; j < nodeCount; j++) {
      // Connect nodes in the same region more densely
      const sameRegion = nodes[i].region === nodes[j].region
      const dx = nodes[j].x - nodes[i].x
      const dy = nodes[j].y - nodes[i].y
      const distance = Math.sqrt(dx * dx + dy * dy)

      const maxDistance = sameRegion ? brainRadius * 0.4 : brainRadius * 0.3

      if (distance < maxDistance) {
        // Connection strength varies with time to simulate neural activity
        const baseStrength = sameRegion ? 0.4 : 0.2
        const activityPhase = time * 0.1 + i * 0.05 + j * 0.05
        const activityStrength = baseStrength + Math.sin(activityPhase) * 0.1

        // Pulse animation along the connection
        const pulse = (Math.sin(time * 0.3 + i * 0.1) + 1) / 2
        const pulseX = nodes[i].x + dx * pulse
        const pulseY = nodes[i].y + dy * pulse

        // Connection line with gradient
        const gradient = ctx.createLinearGradient(nodes[i].x, nodes[i].y, nodes[j].x, nodes[j].y)
        gradient.addColorStop(
          0,
          nodes[i].color.replace(/[\d.]+\)$/, `${activityStrength * (1 - distance / maxDistance)})`),
        )
        gradient.addColorStop(
          1,
          nodes[j].color.replace(/[\d.]+\)$/, `${activityStrength * (1 - distance / maxDistance)})`),
        )

        ctx.beginPath()
        ctx.moveTo(nodes[i].x, nodes[i].y)
        ctx.lineTo(nodes[j].x, nodes[j].y)
        ctx.strokeStyle = gradient
        ctx.lineWidth = 0.5
        ctx.stroke()

        // Pulse dot with glow - only show on some connections
        if ((i + j) % 3 === 0) {
          ctx.shadowColor = nodes[i].color.replace(/[\d.]+\)$/, "0.5)")
          ctx.shadowBlur = 5
          ctx.beginPath()
          ctx.arc(pulseX, pulseY, 1.5, 0, Math.PI * 2)
          ctx.fillStyle = nodes[i].color
          ctx.fill()
          ctx.shadowBlur = 0
        }
      }
    }
  }

  // Draw nodes with pulsing effect and glow
  for (let i = 0; i < nodeCount; i++) {
    const node = nodes[i]
    // Slower, more natural pulsing
    const pulse = Math.sin(time * node.pulseSpeed + node.pulsePhase) * 0.3 + 1.2

    // Glow effect
    ctx.beginPath()
    ctx.arc(node.x, node.y, node.size * pulse * 2, 0, Math.PI * 2)
    ctx.fillStyle = node.color.replace(/[\d.]+\)$/, "0.2)")
    ctx.fill()

    // Node with glow
    ctx.shadowColor = node.color.replace(/[\d.]+\)$/, "0.5)")
    ctx.shadowBlur = 5
    ctx.beginPath()
    ctx.arc(node.x, node.y, node.size * pulse, 0, Math.PI * 2)
    ctx.fillStyle = node.color
    ctx.fill()
    ctx.shadowBlur = 0
  }

  // Brain activity waves - EEG style
  ctx.beginPath()
  ctx.moveTo(-brainRadius, 0)

  // Draw a more realistic EEG pattern
  for (let x = -brainRadius; x <= brainRadius; x += 2) {
    const normalizedX = (x + brainRadius) / (brainRadius * 2)

    // Create a complex wave pattern that evolves over time
    const y =
      Math.sin(normalizedX * 20 + time * 0.5) * 5 +
      Math.sin(normalizedX * 10 + time * 0.3) * 3 +
      Math.sin(normalizedX * 5 + time * 0.7) * 2

    ctx.lineTo(x, y)
  }

  // Wave with glow
  ctx.shadowColor = secondaryColor.replace(/[\d.]+\)$/, "0.5)")
  ctx.shadowBlur = 10
  ctx.strokeStyle = secondaryColor
  ctx.lineWidth = 2
  ctx.stroke()
  ctx.shadowBlur = 0

  ctx.restore()

  // Add brain metrics - only if there's enough space
  if (width >= 200 && height >= 200) {
    const metrics = [
      { label: "Neural Activity", value: "High", color: primaryColor, x: width * 0.2, y: height * 0.2 },
      { label: "Cognitive Load", value: "Medium", color: secondaryColor, x: width * 0.8, y: height * 0.3 },
      { label: "Focus Level", value: "92%", color: accentColor, x: width * 0.7, y: height * 0.7 },
    ]

    metrics.forEach((metric) => {
      // Draw metric bubble with glow
      ctx.shadowColor = metric.color.replace(/[\d.]+\)$/, "0.5)")
      ctx.shadowBlur = 10
      ctx.beginPath()
      ctx.roundRect(metric.x - 60, metric.y - 20, 120, 40, 10)

      const metricGradient = ctx.createLinearGradient(metric.x - 60, metric.y, metric.x + 60, metric.y)
      metricGradient.addColorStop(0, metric.color.replace(/[\d.]+\)$/, "0.2)"))
      metricGradient.addColorStop(1, metric.color.replace(/[\d.]+\)$/, "0.1)"))

      ctx.fillStyle = metricGradient
      ctx.fill()
      ctx.strokeStyle = metric.color
      ctx.lineWidth = 1
      ctx.stroke()
      ctx.shadowBlur = 0

      // Draw metric text
      ctx.fillStyle = "#ffffff"
      ctx.font = "bold 12px sans-serif"
      ctx.textAlign = "center"
      ctx.fillText(metric.value, metric.x, metric.y)

      ctx.fillStyle = "#e2e8f0"
      ctx.font = "10px sans-serif"
      ctx.fillText(metric.label, metric.x, metric.y - 15)

      // Draw connection to brain center
      ctx.beginPath()
      ctx.moveTo(centerX, centerY)
      ctx.lineTo(metric.x, metric.y)

      const connectionGradient = ctx.createLinearGradient(centerX, centerY, metric.x, metric.y)
      connectionGradient.addColorStop(0, metric.color.replace(/[\d.]+\)$/, "0.3)"))
      connectionGradient.addColorStop(1, metric.color.replace(/[\d.]+\)$/, "0.1)"))

      ctx.strokeStyle = connectionGradient
      ctx.setLineDash([2, 2])
      ctx.lineWidth = 1
      ctx.stroke()
      ctx.setLineDash([])

      // Animate data transmission along the connection
      const pulsePosition = (time * 0.2 + metrics.indexOf(metric) * 0.1) % 1
      const pulseX = centerX + (metric.x - centerX) * pulsePosition
      const pulseY = centerY + (metric.y - centerY) * pulsePosition

      ctx.beginPath()
      ctx.arc(pulseX, pulseY, 2, 0, Math.PI * 2)
      ctx.fillStyle = metric.color
      ctx.fill()
    })
  }
}

// Athlete visualization
function drawAthlete(
  ctx: CanvasRenderingContext2D,
  width: number,
  height: number,
  time: number,
  primaryColor: string,
  secondaryColor: string,
  accentColor: string,
) {
  // Skip drawing if dimensions are too small
  if (width < 50 || height < 50) {
    // Draw a simple placeholder instead
    ctx.fillStyle = "#0f172a"
    ctx.fillRect(0, 0, width, height)
    return
  }

  // Background with gradient
  const bgGradient = ctx.createLinearGradient(0, 0, 0, height)
  bgGradient.addColorStop(0, "#0f172a")
  bgGradient.addColorStop(1, "#1e293b")
  ctx.fillStyle = bgGradient
  ctx.fillRect(0, 0, width, height)

  const centerX = width / 2
  const centerY = height / 2
  const scale = Math.max(0.001, Math.min(width, height) * 0.0035) // Ensure positive scale

  // Draw running figure
  ctx.save()
  ctx.translate(centerX, centerY)
  ctx.scale(scale, scale)

  // Animation parameters - slower, more natural running motion
  const runCycle = (time * 2) % (Math.PI * 2) // Slower running
  const legSwing = Math.sin(runCycle) * 30
  const armSwing = Math.sin(runCycle + Math.PI) * 45
  const bodyBob = Math.abs(Math.sin(runCycle)) * 10

  // Body with glow
  ctx.shadowColor = primaryColor.replace(/[\d.]+\)$/, "0.5)")
  ctx.shadowBlur = 15
  ctx.beginPath()
  ctx.moveTo(0, -50 + bodyBob)
  ctx.lineTo(0, 30 + bodyBob)
  ctx.strokeStyle = "#e2e8f0"
  ctx.lineWidth = 10
  ctx.stroke()
  ctx.shadowBlur = 0

  // Head with glow
  ctx.shadowColor = primaryColor.replace(/[\d.]+\)$/, "0.5)")
  ctx.shadowBlur = 15
  ctx.beginPath()
  ctx.arc(0, -80 + bodyBob, 30, 0, Math.PI * 2)
  const headGradient = ctx.createRadialGradient(0, -80 + bodyBob, 0, 0, -80 + bodyBob, 30)
  headGradient.addColorStop(0, "#f8fafc")
  headGradient.addColorStop(1, "#e2e8f0")
  ctx.fillStyle = headGradient
  ctx.fill()
  ctx.shadowBlur = 0

  // Arms with glow
  ctx.shadowColor = secondaryColor.replace(/[\d.]+\)$/, "0.5)")
  ctx.shadowBlur = 10
  ctx.beginPath()
  ctx.moveTo(0, -30 + bodyBob)
  ctx.lineTo(45 + armSwing, 0 + bodyBob)
  ctx.moveTo(0, -30 + bodyBob)
  ctx.lineTo(-45 - armSwing, 0 + bodyBob)
  ctx.strokeStyle = "#e2e8f0"
  ctx.lineWidth = 8
  ctx.stroke()
  ctx.shadowBlur = 0

  // Legs with glow
  ctx.shadowColor = secondaryColor.replace(/[\d.]+\)$/, "0.5)")
  ctx.shadowBlur = 10
  ctx.beginPath()
  ctx.moveTo(0, 30 + bodyBob)
  ctx.lineTo(30 + legSwing, 100 + bodyBob)
  ctx.moveTo(0, 30 + bodyBob)
  ctx.lineTo(-30 - legSwing, 100 + bodyBob)
  ctx.strokeStyle = "#e2e8f0"
  ctx.lineWidth = 8
  ctx.stroke()
  ctx.shadowBlur = 0

  ctx.restore()

  // Only draw data points if there's enough space
  if (width >= 200 && height >= 200) {
    // Data points around athlete - arranged in a more organized way
    const dataPoints = [
      { x: -100, y: -120, label: "Heart Rate", value: "158 BPM", color: primaryColor },
      { x: 100, y: -100, label: "Oxygen", value: "95%", color: secondaryColor },
      { x: -120, y: 0, label: "Strain", value: "7.8", color: accentColor },
      { x: 120, y: 20, label: "Speed", value: "12.4 km/h", color: primaryColor },
      { x: -80, y: 120, label: "Cadence", value: "172 spm", color: secondaryColor },
      { x: 80, y: 100, label: "Recovery", value: "68%", color: accentColor },
    ]

    ctx.save()
    ctx.translate(centerX, centerY)

    // Draw data points
    dataPoints.forEach((point, index) => {
      // Animate values to simulate real-time changes
      let displayValue = point.value

      if (point.label === "Heart Rate") {
        // Heart rate fluctuates with exertion
        const baseHR = 158
        const hrVariation = Math.sin(time * 0.5) * 5
        displayValue = `${Math.floor(baseHR + hrVariation)} BPM`
      } else if (point.label === "Speed") {
        // Speed varies slightly
        const baseSpeed = 12.4
        const speedVariation = Math.sin(time * 0.3) * 0.3
        displayValue = `${(baseSpeed + speedVariation).toFixed(1)} km/h`
      } else if (point.label === "Cadence") {
        // Cadence varies with speed
        const baseCadence = 172
        const cadenceVariation = Math.sin(time * 0.3) * 3
        displayValue = `${Math.floor(baseCadence + cadenceVariation)} spm`
      }

      // Subtle pulse animation
      const pulse = 0.9 + Math.sin(time * 0.3 + index * 0.5) * 0.1

      // Data point circle with glow
      ctx.shadowColor = point.color.replace(/[\d.]+\)$/, "0.5)")
      ctx.shadowBlur = 10
      ctx.beginPath()
      ctx.arc(point.x * scale, point.y * scale, Math.max(1, 6 * pulse), 0, Math.PI * 2)

      const pointGradient = ctx.createRadialGradient(
        point.x * scale,
        point.y * scale,
        0,
        point.x * scale,
        point.y * scale,
        Math.max(1, 6 * pulse),
      )
      pointGradient.addColorStop(0, point.color)
      pointGradient.addColorStop(1, point.color.replace(/[\d.]+\)$/, "0.5)"))

      ctx.fillStyle = pointGradient
      ctx.fill()
      ctx.shadowBlur = 0

      // Connection line with gradient
      ctx.beginPath()
      ctx.moveTo(0, 0)
      ctx.lineTo(point.x * scale, point.y * scale)

      const connectionGradient = ctx.createLinearGradient(0, 0, point.x * scale, point.y * scale)
      connectionGradient.addColorStop(0, point.color.replace(/[\d.]+\)$/, "0.5)"))
      connectionGradient.addColorStop(1, point.color.replace(/[\d.]+\)$/, "0.1)"))

      ctx.strokeStyle = connectionGradient
      ctx.lineWidth = 1
      ctx.stroke()

      // Label with glow
      ctx.shadowColor = point.color.replace(/[\d.]+\)$/, "0.5)")
      ctx.shadowBlur = 5
      ctx.fillStyle = "#e2e8f0"
      ctx.font = "12px sans-serif"
      ctx.textAlign = "center"
      ctx.fillText(point.label, point.x * scale, (point.y - 20) * scale)
      ctx.shadowBlur = 0

      // Value with glow
      ctx.shadowColor = point.color.replace(/[\d.]+\)$/, "0.5)")
      ctx.shadowBlur = 5
      ctx.fillStyle = point.color
      ctx.font = "bold 14px sans-serif"
      ctx.fillText(displayValue, point.x * scale, (point.y - 5) * scale)
      ctx.shadowBlur = 0

      // Animate data transmission along the connection
      const pulsePosition = (time * 0.2 + index * 0.1) % 1
      const pulseX = pulsePosition * point.x * scale
      const pulseY = pulsePosition * point.y * scale

      ctx.beginPath()
      ctx.arc(pulseX, pulseY, 2, 0, Math.PI * 2)
      ctx.fillStyle = point.color
      ctx.fill()
    })

    // Draw data waves - representing athlete biometrics
    ctx.beginPath()
    ctx.arc(0, 0, Math.max(1, 50 * scale), 0, Math.PI * 2)
    ctx.strokeStyle = "rgba(16, 185, 129, 0.2)"
    ctx.lineWidth = 2
    ctx.stroke()

    // Pulse wave with glow - representing heart rate
    ctx.shadowColor = primaryColor.replace(/[\d.]+\)$/, "0.3)")
    ctx.shadowBlur = 10
    ctx.beginPath()

    // Create a more heart-rate like pattern
    for (let angle = 0; angle < Math.PI * 2; angle += 0.05) {
      // Base circle
      const baseRadius = Math.max(1, 50 * scale)

      // Add heart beat pattern
      const beatPhase = (angle + time) % (Math.PI * 2)
      let radiusModifier = 0

      if (beatPhase < 0.5) {
        radiusModifier = Math.sin(beatPhase * 20) * 5 * scale
      }

      const radius = baseRadius + radiusModifier
      const x = Math.cos(angle) * radius
      const y = Math.sin(angle) * radius

      if (angle === 0) {
        ctx.moveTo(x, y)
      } else {
        ctx.lineTo(x, y)
      }
    }

    ctx.closePath()
    ctx.strokeStyle = primaryColor
    ctx.lineWidth = 2
    ctx.stroke()
    ctx.shadowBlur = 0

    // Add a performance zone indicator
    const zoneRadius = Math.max(1, 80 * scale)
    const zoneWidth = Math.max(1, 15 * scale)

    // Background zone circle
    ctx.beginPath()
    ctx.arc(0, 0, zoneRadius, 0, Math.PI * 2)
    ctx.strokeStyle = "rgba(100, 116, 139, 0.3)"
    ctx.lineWidth = zoneWidth
    ctx.stroke()

    // Performance zones (5 zones)
    const zones = [
      { color: "#10B981", end: 0.6 }, // Zone 1-3: Green (recovery/aerobic)
      { color: "#FBBF24", end: 0.8 }, // Zone 4: Yellow (threshold)
      { color: "#EF4444", end: 1.0 }, // Zone 5: Red (anaerobic)
    ]

    // Current athlete zone - animated to show changing intensity
    const currentZone = 0.5 + Math.sin(time * 0.2) * 0.3 // Varies between zones

    zones.forEach((zone) => {
      const zoneEnd = zone.end * Math.PI * 2
      const zoneStart = zone.end === 0.6 ? 0 : zones[zones.indexOf(zone) - 1].end * Math.PI * 2

      ctx.beginPath()
      ctx.arc(0, 0, zoneRadius, zoneStart, zoneEnd)
      ctx.strokeStyle = zone.color
      ctx.lineWidth = zoneWidth
      ctx.stroke()
    })

    // Current zone indicator
    const zoneIndicatorAngle = currentZone * Math.PI * 2
    ctx.beginPath()
    ctx.arc(0, 0, zoneRadius, zoneIndicatorAngle - 0.1, zoneIndicatorAngle + 0.1)
    ctx.strokeStyle = "#FFFFFF"
    ctx.lineWidth = zoneWidth + 2 * scale
    ctx.stroke()

    ctx.restore()
  }
}

"use client"

import { useState, useEffect, useRef } from "react"
import { ArrowRight } from "lucide-react"
import { Button } from "@/components/ui/button"
import Link from "next/link"
import { motion } from "framer-motion"
import FlowingLinesBackground from "./flowing-lines-background"
import AbstractDataVisualization from "./abstract-data-visualization"

export default function ModernHero() {
  const [line1, setLine1] = useState("")
  const [line2, setLine2] = useState("")
  const [line3, setLine3] = useState("")
  const [isTypingComplete, setIsTypingComplete] = useState(false)
  const [activeLine, setActiveLine] = useState(1)

  const text1 = "Enterprise-Grade"
  const text2 = "AI for Athlete"
  const text3 = "Recovery"

  // Use refs to track if component is mounted
  const isMounted = useRef(true)

  useEffect(() => {
    isMounted.current = true

    const typeText = async () => {
      // Type first line
      for (let i = 0; i <= text1.length; i++) {
        if (!isMounted.current) return
        setLine1(text1.slice(0, i))
        await new Promise((resolve) => setTimeout(resolve, 80))
      }

      if (!isMounted.current) return
      setActiveLine(2)
      await new Promise((resolve) => setTimeout(resolve, 200))

      // Type second line
      for (let i = 0; i <= text2.length; i++) {
        if (!isMounted.current) return
        setLine2(text2.slice(0, i))
        await new Promise((resolve) => setTimeout(resolve, 80))
      }

      if (!isMounted.current) return
      setActiveLine(3)
      await new Promise((resolve) => setTimeout(resolve, 200))

      // Type third line
      for (let i = 0; i <= text3.length; i++) {
        if (!isMounted.current) return
        setLine3(text3.slice(0, i))
        await new Promise((resolve) => setTimeout(resolve, 80))
      }

      if (!isMounted.current) return
      setActiveLine(0)
      await new Promise((resolve) => setTimeout(resolve, 300))

      if (!isMounted.current) return
      setIsTypingComplete(true)
    }

    typeText()

    return () => {
      isMounted.current = false
    }
  }, [])

  return (
    <section className="relative min-h-screen overflow-hidden bg-slate-950">
      {/* Background */}
      <FlowingLinesBackground density={80} speed={0.8} />

      {/* Content */}
      <div className="relative z-10 flex min-h-screen items-center">
        <div className="container mx-auto px-4 py-16">
          <div className="grid gap-12 md:grid-cols-2 md:items-center">
            {/* Text content */}
            <div>
              <h1 className="font-display text-4xl font-bold tracking-tight text-white sm:text-5xl md:text-6xl lg:text-7xl">
                <div className="relative mb-2">
                  <span className="bg-gradient-to-r from-emerald-400 via-teal-300 to-cyan-400 bg-clip-text text-transparent">
                    {line1}
                  </span>
                  {activeLine === 1 && (
                    <span className="ml-1 inline-block h-[1em] w-[6px] animate-blink bg-emerald-400"></span>
                  )}
                </div>

                <div className="relative mb-2">
                  <span>{line2}</span>
                  {activeLine === 2 && (
                    <span className="ml-1 inline-block h-[1em] w-[6px] animate-blink bg-emerald-400"></span>
                  )}
                </div>

                <div className="relative">
                  <span>{line3}</span>
                  {activeLine === 3 && (
                    <span className="ml-1 inline-block h-[1em] w-[6px] animate-blink bg-emerald-400"></span>
                  )}
                </div>
              </h1>

              <motion.p
                className="mt-6 max-w-2xl text-xl leading-relaxed text-slate-300"
                initial={{ opacity: 0 }}
                animate={{ opacity: isTypingComplete ? 1 : 0 }}
                transition={{ duration: 0.5 }}
              >
                The most advanced AI platform for athlete recovery management, trusted by elite sports teams worldwide.
                Powered by proprietary machine learning infrastructure.
              </motion.p>

              <motion.div
                className="mt-8 flex flex-wrap gap-4"
                initial={{ opacity: 0 }}
                animate={{ opacity: isTypingComplete ? 1 : 0 }}
                transition={{ duration: 0.5, delay: 0.2 }}
              >
                <Button
                  size="lg"
                  className="relative overflow-hidden bg-gradient-to-r from-emerald-600 to-teal-600 px-8 font-display text-white transition-all duration-300 hover:from-emerald-500 hover:to-teal-500"
                >
                  <span className="relative z-10 flex items-center">
                    Request Demo
                    <ArrowRight className="ml-2 h-4 w-4" />
                  </span>
                </Button>

                <Link href="/features">
                  <Button
                    variant="outline"
                    size="lg"
                    className="border-slate-700 font-display text-white transition-all duration-300 hover:bg-slate-800 hover:text-emerald-400"
                  >
                    Explore Features
                  </Button>
                </Link>
              </motion.div>
            </div>

            {/* Enhanced Data Visualization */}
            <motion.div
              className="relative hidden md:block"
              initial={{ opacity: 0, scale: 0.9 }}
              animate={{ opacity: isTypingComplete ? 1 : 0, scale: isTypingComplete ? 1 : 0.9 }}
              transition={{ duration: 0.7, delay: 0.4 }}
            >
              <div className="relative h-[500px] w-full rounded-lg border border-slate-800 bg-slate-900/50 p-1 backdrop-blur-sm">
                <div className="absolute -inset-px rounded-lg bg-gradient-to-r from-emerald-500/20 to-teal-500/20 opacity-50 blur-lg"></div>
                <div className="absolute -inset-0.5 rounded-lg bg-gradient-to-r from-emerald-500/10 via-transparent via-30% to-teal-500/10 opacity-30"></div>

                <div className="relative h-full w-full overflow-hidden rounded-lg border border-slate-800 bg-slate-900">
                  {/* Animated data points */}
                  <div className="absolute inset-0 z-10 flex items-center justify-center">
                    <div className="h-[300px] w-[300px] rounded-full border border-emerald-500/20">
                      <div className="absolute left-1/2 top-1/2 h-[200px] w-[200px] -translate-x-1/2 -translate-y-1/2 rounded-full border border-emerald-500/30"></div>
                      <div className="absolute left-1/2 top-1/2 h-[100px] w-[100px] -translate-x-1/2 -translate-y-1/2 rounded-full border border-emerald-500/40"></div>
                    </div>
                  </div>

                  {/* Main visualization */}
                  <AbstractDataVisualization
                    className="h-full w-full"
                    variant="neural"
                    primaryColor="rgba(16, 185, 129, 0.8)" // emerald
                    secondaryColor="rgba(20, 184, 166, 0.8)" // teal
                    accentColor="rgba(6, 182, 212, 0.8)" // cyan
                    density={80}
                    speed={1.2}
                  />

                  {/* Overlay elements */}
                  <div className="absolute inset-0 flex items-center justify-center">
                    <div className="pointer-events-none absolute left-[20%] top-[30%] flex h-16 w-16 items-center justify-center rounded-full bg-emerald-500/10 text-emerald-400">
                      <div className="h-2 w-2 rounded-full bg-emerald-400"></div>
                      <div className="absolute h-full w-full animate-ping rounded-full bg-emerald-400/20"></div>
                    </div>
                    <div className="pointer-events-none absolute left-[70%] top-[60%] flex h-12 w-12 items-center justify-center rounded-full bg-teal-500/10 text-teal-400">
                      <div className="h-2 w-2 rounded-full bg-teal-400"></div>
                      <div className="absolute h-full w-full animate-ping rounded-full bg-teal-400/20 animation-delay-700"></div>
                    </div>
                    <div className="pointer-events-none absolute left-[50%] top-[20%] flex h-10 w-10 items-center justify-center rounded-full bg-cyan-500/10 text-cyan-400">
                      <div className="h-2 w-2 rounded-full bg-cyan-400"></div>
                      <div className="absolute h-full w-full animate-ping rounded-full bg-cyan-400/20 animation-delay-1000"></div>
                    </div>
                  </div>

                  {/* Data labels */}
                  <div className="absolute inset-0">
                    <div className="absolute left-[15%] top-[25%] rounded-md bg-slate-800/80 px-2 py-1 text-xs font-medium text-emerald-400 backdrop-blur-sm">
                      HRV: 65ms
                    </div>
                    <div className="absolute left-[65%] top-[55%] rounded-md bg-slate-800/80 px-2 py-1 text-xs font-medium text-teal-400 backdrop-blur-sm">
                      Recovery: 82%
                    </div>
                    <div className="absolute left-[45%] top-[15%] rounded-md bg-slate-800/80 px-2 py-1 text-xs font-medium text-cyan-400 backdrop-blur-sm">
                      Sleep: 7.5h
                    </div>
                  </div>
                </div>
              </div>
            </motion.div>
          </div>
        </div>
      </div>

      {/* Bottom wave */}
      <div className="absolute bottom-0 left-0 right-0">
        <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 1440 320" className="text-slate-900">
          <path
            fill="currentColor"
            fillOpacity="1"
            d="M0,224L48,213.3C96,203,192,181,288,181.3C384,181,480,203,576,224C672,245,768,267,864,250.7C960,235,1056,181,1152,165.3C1248,149,1344,171,1392,181.3L1440,192L1440,320L1392,320C1344,320,1248,320,1152,320C1056,320,960,320,864,320C768,320,672,320,576,320C480,320,384,320,288,320C192,320,96,320,48,320L0,320Z"
          ></path>
        </svg>
      </div>
    </section>
  )
}

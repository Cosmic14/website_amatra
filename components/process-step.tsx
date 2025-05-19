"use client"

import { useEffect, useRef, useState } from "react"
import { Check } from "lucide-react"
import ProcessStepGraphic from "./process-step-graphic"

interface ProcessStepProps {
  number: string
  title: string
  description: string
  points: string[]
  reversed?: boolean
  step: "data-collection" | "baseline" | "ai-analysis" | "recommendations" | "implementation"
}

export default function ProcessStep({ number, title, description, points, reversed = false, step }: ProcessStepProps) {
  const [isVisible, setIsVisible] = useState(false)
  const ref = useRef<HTMLDivElement>(null)

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

  return (
    <div ref={ref} className={`relative ${isVisible ? "opacity-100" : "opacity-0"} transition-opacity duration-1000`}>
      <div className={`flex flex-col items-center gap-12 lg:flex-row ${reversed ? "lg:flex-row-reverse" : ""}`}>
        <div className="w-full lg:w-1/2">
          <div
            className={`overflow-hidden rounded-xl border border-slate-800 bg-slate-950 shadow-[0_0_25px_rgba(16,185,129,0.1)] ${
              isVisible
                ? "translate-y-0 opacity-100"
                : reversed
                  ? "translate-x-20 opacity-0"
                  : "-translate-x-20 opacity-0"
            } transition-all duration-1000 ease-out`}
          >
            <ProcessStepGraphic step={step} />
          </div>
        </div>
        <div
          className={`w-full lg:w-1/2 ${
            isVisible
              ? "translate-y-0 opacity-100"
              : reversed
                ? "-translate-x-20 opacity-0"
                : "translate-x-20 opacity-0"
          } transition-all duration-1000 ease-out delay-300`}
        >
          <div className="mb-4 flex items-center">
            <div className="mr-4 flex h-12 w-12 items-center justify-center rounded-full bg-gradient-to-r from-emerald-600 to-teal-600 text-white shadow-[0_0_15px_rgba(16,185,129,0.3)]">
              <span className="text-xl font-bold">{number}</span>
            </div>
            <h3 className="text-2xl font-bold text-white">{title}</h3>
          </div>
          <p className="mb-6 text-lg text-slate-300">{description}</p>
          <ul className="space-y-3">
            {points.map((point, index) => (
              <li key={index} className="flex items-start">
                <div className="mr-3 flex h-6 w-6 flex-shrink-0 items-center justify-center rounded-full bg-emerald-900/30 text-emerald-400">
                  <Check className="h-4 w-4" />
                </div>
                <span className="text-slate-300">{point}</span>
              </li>
            ))}
          </ul>
        </div>
      </div>
    </div>
  )
}

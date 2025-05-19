"use client"

import { useEffect, useRef, useState } from "react"
import { Check } from "lucide-react"
import FeatureGraphic from "./feature-graphic"

interface FeatureShowcaseProps {
  title: string
  description: string
  features: string[]
  reversed?: boolean
  graphicType: "data-integration" | "ai-analysis" | "team-dashboard" | "athlete-app" | "predictive"
}

export default function FeatureShowcase({
  title,
  description,
  features,
  reversed = false,
  graphicType,
}: FeatureShowcaseProps) {
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
    <section
      ref={ref}
      className={`relative bg-slate-900 py-20 ${isVisible ? "opacity-100" : "opacity-0"} transition-opacity duration-1000`}
    >
      <div className="absolute inset-0 opacity-5">
        <div className="h-full w-full bg-[radial-gradient(ellipse_at_center,_var(--tw-gradient-stops))] from-emerald-700 via-transparent to-transparent"></div>
      </div>
      <div className="container relative z-10 mx-auto px-4 sm:px-6 lg:px-8">
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
              <FeatureGraphic type={graphicType} />
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
            <h3 className="mb-4 text-3xl font-bold text-white">{title}</h3>
            <p className="mb-6 text-lg text-slate-300">{description}</p>
            <ul className="space-y-3">
              {features.map((feature, index) => (
                <li key={index} className="flex items-start">
                  <div className="mr-3 flex h-6 w-6 flex-shrink-0 items-center justify-center rounded-full bg-emerald-900/30 text-emerald-400">
                    <Check className="h-4 w-4" />
                  </div>
                  <span className="text-slate-300">{feature}</span>
                </li>
              ))}
            </ul>
          </div>
        </div>
      </div>
    </section>
  )
}

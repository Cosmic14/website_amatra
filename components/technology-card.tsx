"use client"

import { useEffect, useRef, useState } from "react"
import type { ReactNode } from "react"

interface TechnologyCardProps {
  icon: ReactNode
  title: string
  description: string
}

export default function TechnologyCard({ icon, title, description }: TechnologyCardProps) {
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
    <div
      ref={ref}
      className={`group flex flex-col rounded-lg border border-slate-800 bg-slate-900 p-6 shadow-[0_4px_20px_rgba(0,0,0,0.2)] transition-all duration-500 hover:border-emerald-900 hover:shadow-[0_0_15px_rgba(16,185,129,0.15)] ${
        isVisible ? "translate-y-0 opacity-100" : "translate-y-10 opacity-0"
      }`}
    >
      <div className="mb-4 rounded-full bg-slate-800 p-3 transition-all duration-300 group-hover:bg-emerald-900/30">
        {icon}
      </div>
      <h3 className="mb-2 text-xl font-bold text-white">{title}</h3>
      <p className="text-slate-300">{description}</p>
    </div>
  )
}

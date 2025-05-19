"use client"

import { useEffect, useRef, useState } from "react"
import Image from "next/image"
import { Award, Building, GraduationCap, Heart, Target } from "lucide-react"

// Change the interface to use string identifiers for icons instead of function components
interface TeamMemberProps {
  name: string
  title: string
  imageSrc: string
  imageAlt: string
  traits: string[]
  position: string
  points: {
    icon: string // Changed from LucideIcon to string
    text: string
  }[]
}

export default function TeamMember({ name, title, imageSrc, imageAlt, traits, position, points }: TeamMemberProps) {
  const [isVisible, setIsVisible] = useState(false)
  const ref = useRef<HTMLDivElement>(null)

  // Function to render the appropriate icon based on the string identifier
  const renderIcon = (iconName: string) => {
    switch (iconName) {
      case "Award":
        return <Award className="h-4 w-4" />
      case "Building":
        return <Building className="h-4 w-4" />
      case "Heart":
        return <Heart className="h-4 w-4" />
      case "GraduationCap":
        return <GraduationCap className="h-4 w-4" />
      case "Target":
        return <Target className="h-4 w-4" />
      default:
        return <Award className="h-4 w-4" />
    }
  }

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
      className={`rounded-lg border border-slate-800 bg-slate-900/80 p-6 shadow-[0_4px_20px_rgba(0,0,0,0.2)] backdrop-blur-sm transition-all duration-700 ${
        isVisible ? "translate-y-0 opacity-100" : "translate-y-10 opacity-0"
      }`}
    >
      <div className="flex flex-col items-center md:flex-row md:items-start">
        <div className="mb-4 md:mb-0 md:mr-6">
          <div className="overflow-hidden rounded-lg border-2 border-purple-500/30">
            <Image
              src={imageSrc.replace(".png", ".jpeg") || "/placeholder.svg"}
              alt={imageAlt}
              width={180}
              height={180}
              className="h-[180px] w-[180px] object-cover"
            />
          </div>
        </div>
        <div className="flex-1 text-center md:text-left">
          <h3 className="text-2xl font-bold text-white">{name}</h3>
          <p className="mb-3 text-purple-400">{title}</p>
          <div className="mb-4 flex flex-wrap justify-center gap-2 md:justify-start">
            <div className="rounded-full bg-purple-900/30 px-3 py-1 text-xs font-medium text-purple-400">
              Certified baller ({position})
            </div>
            <div className="rounded-full bg-purple-900/30 px-3 py-1 text-xs font-medium text-purple-400">
              [{traits.join(", ")}]
            </div>
          </div>
        </div>
      </div>

      <div className="mt-6 space-y-3">
        {points.map((point, index) => (
          <div key={index} className="flex items-start">
            <div className="mr-3 mt-0.5 flex h-5 w-5 flex-shrink-0 items-center justify-center text-purple-400">
              {renderIcon(point.icon)}
            </div>
            <span className="text-slate-300">{point.text}</span>
          </div>
        ))}
      </div>
    </div>
  )
}

"use client"

import { useState, useEffect } from "react"
import { ChevronLeft, ChevronRight } from "lucide-react"
import { Button } from "@/components/ui/button"
import { motion, AnimatePresence } from "framer-motion"

const testimonials = [
  {
    quote:
      "Amatra has transformed how we approach athlete recovery. The personalized insights have helped us reduce injury rates by 25% this season.",
    author: "Sarah Johnson",
    title: "Performance Director, Premier League Club",
  },
  {
    quote:
      "The ability to see the causal relationships between recovery activities and performance metrics has been game-changing for our medical team.",
    author: "Dr. Michael Chen",
    title: "Head of Medical, National Team",
  },
  {
    quote:
      "Our athletes love the personalized recommendations. It's helped us create a culture where recovery is taken as seriously as training.",
    author: "James Wilson",
    title: "Head Coach, Elite Rugby Team",
  },
]

export default function TestimonialSlider() {
  const [current, setCurrent] = useState(0)
  const [isAnimating, setIsAnimating] = useState(false)

  const next = () => {
    if (isAnimating) return
    setIsAnimating(true)
    setCurrent((current + 1) % testimonials.length)
    setTimeout(() => setIsAnimating(false), 500)
  }

  const prev = () => {
    if (isAnimating) return
    setIsAnimating(true)
    setCurrent((current - 1 + testimonials.length) % testimonials.length)
    setTimeout(() => setIsAnimating(false), 500)
  }

  useEffect(() => {
    const interval = setInterval(() => {
      next()
    }, 8000)
    return () => clearInterval(interval)
  }, [current])

  return (
    <motion.div
      className="relative mx-auto max-w-4xl overflow-hidden rounded-xl border border-slate-800 bg-slate-900/80 p-8 backdrop-blur-sm"
      initial={{ opacity: 0, y: 20 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, margin: "-100px" }}
      transition={{ duration: 0.5 }}
    >
      {/* Animated border effect */}
      <div className="absolute left-0 top-0 h-20 w-20 overflow-hidden">
        <div className="absolute left-0 top-0 h-px w-20 bg-emerald-500/30"></div>
        <div className="absolute left-0 top-0 h-20 w-px bg-emerald-500/30"></div>
      </div>
      <div className="absolute bottom-0 right-0 h-20 w-20 overflow-hidden">
        <div className="absolute bottom-0 right-0 h-px w-20 bg-emerald-500/30"></div>
        <div className="absolute bottom-0 right-0 h-20 w-px bg-emerald-500/30"></div>
      </div>

      {/* Glowing background effect */}
      <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_center,_var(--tw-gradient-stops))] from-emerald-900/10 via-transparent to-transparent opacity-50"></div>

      <div className="relative h-full">
        <AnimatePresence mode="wait">
          {testimonials.map(
            (testimonial, index) =>
              index === current && (
                <motion.div
                  key={index}
                  initial={{ opacity: 0, x: 100 }}
                  animate={{ opacity: 1, x: 0 }}
                  exit={{ opacity: 0, x: -100 }}
                  transition={{ duration: 0.5 }}
                  className="flex h-full flex-col items-center justify-center text-center"
                >
                  <blockquote className="mb-6 text-xl italic text-slate-200">"{testimonial.quote}"</blockquote>
                  <div className="mt-4">
                    <div className="font-display font-bold text-white">{testimonial.author}</div>
                    <div className="text-sm text-slate-400">{testimonial.title}</div>
                  </div>
                </motion.div>
              ),
          )}
        </AnimatePresence>
      </div>

      <div className="absolute bottom-4 left-0 right-0 flex justify-center space-x-2">
        {testimonials.map((_, index) => (
          <button
            key={index}
            className={`h-2 w-2 rounded-full transition-all ${
              index === current ? "bg-emerald-500 w-4" : "bg-slate-700"
            }`}
            onClick={() => setCurrent(index)}
            aria-label={`Go to testimonial ${index + 1}`}
          />
        ))}
      </div>

      <Button
        variant="outline"
        size="icon"
        className="absolute left-4 top-1/2 -translate-y-1/2 rounded-full border-slate-700 bg-slate-800/80 backdrop-blur-sm hover:bg-slate-700 hover:text-emerald-400"
        onClick={prev}
        aria-label="Previous testimonial"
      >
        <ChevronLeft className="h-4 w-4" />
      </Button>

      <Button
        variant="outline"
        size="icon"
        className="absolute right-4 top-1/2 -translate-y-1/2 rounded-full border-slate-700 bg-slate-800/80 backdrop-blur-sm hover:bg-slate-700 hover:text-emerald-400"
        onClick={next}
        aria-label="Next testimonial"
      >
        <ChevronRight className="h-4 w-4" />
      </Button>
    </motion.div>
  )
}

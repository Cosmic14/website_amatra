"use client"

import { useState } from "react"
import Image from "next/image"
import { motion } from "framer-motion"
import { ChevronLeft, ChevronRight, Maximize2 } from "lucide-react"
import { Button } from "@/components/ui/button"
import { Dialog, DialogContent, DialogTrigger } from "@/components/ui/dialog"

interface DashboardImage {
  src: string
  alt: string
  title: string
  description: string
}

interface DashboardShowcaseProps {
  images: DashboardImage[]
  className?: string
}

export default function DashboardShowcase({ images, className = "" }: DashboardShowcaseProps) {
  const [currentIndex, setCurrentIndex] = useState(0)

  const nextSlide = () => {
    setCurrentIndex((prevIndex) => (prevIndex + 1) % images.length)
  }

  const prevSlide = () => {
    setCurrentIndex((prevIndex) => (prevIndex - 1 + images.length) % images.length)
  }

  return (
    <div className={`relative overflow-hidden rounded-xl border border-slate-800 bg-slate-950 shadow-lg ${className}`}>
      <div className="relative aspect-video w-full overflow-hidden">
        {images.map((image, index) => (
          <motion.div
            key={index}
            className="absolute inset-0"
            initial={{ opacity: 0, x: index > currentIndex ? 100 : -100 }}
            animate={{
              opacity: index === currentIndex ? 1 : 0,
              x: index === currentIndex ? 0 : index > currentIndex ? 100 : -100,
              zIndex: index === currentIndex ? 10 : 0,
            }}
            transition={{ duration: 0.5 }}
          >
            <Dialog>
              <DialogTrigger asChild>
                <button className="absolute right-4 top-4 z-20 rounded-full bg-slate-800/80 p-2 text-slate-300 backdrop-blur-sm transition-colors hover:bg-slate-700 hover:text-emerald-400">
                  <Maximize2 className="h-4 w-4" />
                </button>
              </DialogTrigger>
              <DialogContent className="max-w-6xl border-slate-800 bg-slate-950 p-1">
                <Image
                  src={image.src || "/placeholder.svg"}
                  alt={image.alt}
                  width={1920}
                  height={1080}
                  className="h-auto w-full rounded-lg"
                />
              </DialogContent>
            </Dialog>
            <Image
              src={image.src || "/placeholder.svg"}
              alt={image.alt}
              fill
              className="object-cover"
              priority={index === 0}
            />
          </motion.div>
        ))}
      </div>

      <div className="absolute inset-x-0 bottom-0 z-20 bg-gradient-to-t from-slate-950 to-transparent pb-4 pt-12">
        <div className="container px-4">
          <h3 className="mb-1 text-xl font-bold text-white">{images[currentIndex].title}</h3>
          <p className="mb-4 text-sm text-slate-300">{images[currentIndex].description}</p>
          <div className="flex items-center justify-between">
            <div className="flex gap-2">
              {images.map((_, index) => (
                <button
                  key={index}
                  className={`h-2 w-2 rounded-full transition-all ${
                    index === currentIndex ? "bg-emerald-500 w-4" : "bg-slate-700"
                  }`}
                  onClick={() => setCurrentIndex(index)}
                  aria-label={`Go to slide ${index + 1}`}
                />
              ))}
            </div>
            <div className="flex gap-2">
              <Button
                variant="outline"
                size="icon"
                className="h-8 w-8 rounded-full border-slate-700 bg-slate-800/80 backdrop-blur-sm hover:bg-slate-700 hover:text-emerald-400"
                onClick={prevSlide}
                aria-label="Previous slide"
              >
                <ChevronLeft className="h-4 w-4" />
              </Button>
              <Button
                variant="outline"
                size="icon"
                className="h-8 w-8 rounded-full border-slate-700 bg-slate-800/80 backdrop-blur-sm hover:bg-slate-700 hover:text-emerald-400"
                onClick={nextSlide}
                aria-label="Next slide"
              >
                <ChevronRight className="h-4 w-4" />
              </Button>
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}

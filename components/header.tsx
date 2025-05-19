"use client"

import { useState, useEffect } from "react"
import Link from "next/link"
import { Menu, X } from "lucide-react"
import { Button } from "@/components/ui/button"
import { motion } from "framer-motion"

export default function Header() {
  const [isScrolled, setIsScrolled] = useState(false)
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false)

  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 10)
    }

    window.addEventListener("scroll", handleScroll)
    return () => window.removeEventListener("scroll", handleScroll)
  }, [])

  const navItems = [
    { name: "How It Works", href: "/how-it-works" },
    { name: "About", href: "/about" },
    { name: "Contact", href: "#contact" },
  ]

  return (
    <header
      className={`sticky top-0 z-50 w-full transition-all duration-300 ${
        isScrolled ? "bg-slate-950/80 backdrop-blur-md" : "bg-transparent"
      }`}
    >
      <div className="container mx-auto px-4 sm:px-6 lg:px-8">
        <div className="relative flex h-20 items-center justify-between">
          {/* Logo */}
          <div className="absolute left-0 flex items-center">
            <Link href="/" className="flex items-center">
              <motion.span
                className="font-display text-2xl font-bold gradient-text"
                initial={{ opacity: 0, y: -10 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.5 }}
              >
                Amatra
              </motion.span>
            </Link>
          </div>

          {/* Desktop Navigation - Absolutely centered */}
          <div className="hidden w-full flex-1 items-center justify-center md:flex">
            <nav className="flex items-center justify-center">
              {navItems.map((item, index) => (
                <motion.div
                  key={item.name}
                  initial={{ opacity: 0, y: -10 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ duration: 0.5, delay: 0.1 * index }}
                  className="px-6"
                >
                  <Link
                    href={item.href}
                    className="font-display text-sm font-medium text-slate-300 transition-colors hover:text-emerald-400"
                  >
                    {item.name}
                  </Link>
                </motion.div>
              ))}
            </nav>
          </div>

          {/* Button */}
          <div className="absolute right-0 flex items-center">
            <motion.div
              initial={{ opacity: 0, scale: 0.9 }}
              animate={{ opacity: 1, scale: 1 }}
              transition={{ duration: 0.5, delay: 0.4 }}
              className="hidden md:block"
            >
              <Button className="bg-gradient-to-r from-emerald-600 to-teal-600 font-display text-sm transition-all duration-300 hover:from-emerald-500 hover:to-teal-500">
                Request Demo
              </Button>
            </motion.div>
            <button
              className="inline-flex items-center justify-center rounded-md p-2 text-slate-300 hover:bg-slate-800 hover:text-emerald-400 md:hidden"
              onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
            >
              <span className="sr-only">Open main menu</span>
              {isMobileMenuOpen ? (
                <X className="h-6 w-6" aria-hidden="true" />
              ) : (
                <Menu className="h-6 w-6" aria-hidden="true" />
              )}
            </button>
          </div>
        </div>
      </div>

      {/* Mobile Navigation */}
      {isMobileMenuOpen && (
        <motion.div
          className="md:hidden"
          initial={{ opacity: 0, height: 0 }}
          animate={{ opacity: 1, height: "auto" }}
          exit={{ opacity: 0, height: 0 }}
          transition={{ duration: 0.3 }}
        >
          <div className="space-y-1 bg-slate-900/90 px-4 pb-3 pt-2 backdrop-blur-md">
            {navItems.map((item) => (
              <Link
                key={item.name}
                href={item.href}
                className="block rounded-md px-3 py-2 font-display text-base font-medium text-slate-300 hover:bg-slate-800 hover:text-emerald-400"
                onClick={() => setIsMobileMenuOpen(false)}
              >
                {item.name}
              </Link>
            ))}
            <div className="mt-4 px-3">
              <Button className="w-full bg-gradient-to-r from-emerald-600 to-teal-600 font-display hover:from-emerald-500 hover:to-teal-500">
                Request Demo
              </Button>
            </div>
          </div>
        </motion.div>
      )}
    </header>
  )
}

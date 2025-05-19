"use client"

import Link from "next/link"

export default function Footer() {
  const footerSections = [
    {
      title: "Product",
      links: [
        { name: "Features", href: "/features" },
        { name: "How It Works", href: "/how-it-works" },
        { name: "Pricing", href: "#" },
        { name: "Case Studies", href: "#" },
      ],
    },
    {
      title: "Company",
      links: [
        { name: "About Us", href: "#" },
        { name: "Team", href: "#" },
        { name: "Careers", href: "#" },
        { name: "Contact", href: "#" },
      ],
    },
    {
      title: "Resources",
      links: [
        { name: "Blog", href: "#" },
        { name: "Research", href: "#" },
        { name: "Documentation", href: "#" },
        { name: "Privacy Policy", href: "#" },
      ],
    },
  ]

  return (
    <footer className="relative overflow-hidden bg-slate-950 py-12 text-slate-300">
      <div className="absolute inset-0 z-0">
        <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_center,_var(--tw-gradient-stops))] from-slate-900 via-slate-950 to-slate-950 opacity-80"></div>
        <div className="absolute bottom-0 left-0 right-0 h-px bg-gradient-to-r from-transparent via-emerald-900/50 to-transparent"></div>
      </div>

      <div className="container relative z-10 mx-auto px-4 sm:px-6 lg:px-8">
        <div className="grid grid-cols-1 gap-8 md:grid-cols-4">
          <div>
            <h3 className="mb-4 font-display text-2xl font-bold gradient-text">Amatra</h3>
            <p className="mb-4 text-sm text-slate-400">
              AI-powered recovery systems for elite athletes. Maximize squad availability, reduce downtime, and recoup
              millions in injury costs.
            </p>
            <div className="flex space-x-4">
              <a href="#" className="text-slate-400 transition-colors hover:text-emerald-400">
                <span className="sr-only">Twitter</span>
                <svg className="h-6 w-6" fill="currentColor" viewBox="0 0 24 24" aria-hidden="true">
                  <path d="M8.29 20.251c7.547 0 11.675-6.253 11.675-11.675 0-.178 0-.355-.012-.53A8.348 8.348 0 0022 5.92a8.19 8.19 0 01-2.357.646 4.118 4.118 0 001.804-2.27 8.224 8.224 0 01-2.605.996 4.107 4.107 0 00-6.993 3.743 11.65 11.65 0 01-8.457-4.287 4.106 4.106 0 001.27 5.477A4.072 4.072 0 012.8 9.713v.052a4.105 4.105 0 003.292 4.022 4.095 4.095 0 01-1.853.07 4.108 4.108 0 003.834 2.85A8.233 8.233 0 012 18.407a11.616 11.616 0 006.29 1.84" />
                </svg>
              </a>
              <a href="#" className="text-slate-400 transition-colors hover:text-emerald-400">
                <span className="sr-only">LinkedIn</span>
                <svg className="h-6 w-6" fill="currentColor" viewBox="0 0 24 24" aria-hidden="true">
                  <path
                    fillRule="evenodd"
                    d="M19 0h-14c-2.761 0-5 2.239-5 5v14c0 2.761 2.239 5 5 5h14c2.762 0 5-2.239 5-5v-14c0-2.761-2.238-5-5-5zm-11 19h-3v-11h3v11zm-1.5-12.268c-.966 0-1.75-.79-1.75-1.764s.784-1.764 1.75-1.764 1.75.79 1.75 1.764-.783 1.764-1.75 1.764zm13.5 12.268h-3v-5.604c0-3.368-4-3.113-4 0v5.604h-3v-11h3v1.765c1.396-2.586 7-2.777 7 2.476v6.759z"
                    clipRule="evenodd"
                  />
                </svg>
              </a>
            </div>
          </div>

          {footerSections.map((section, index) => (
            <div key={section.title}>
              <h3 className="mb-4 font-display text-lg font-semibold text-white">{section.title}</h3>
              <ul className="space-y-2 text-sm text-slate-400">
                {section.links.map((link) => (
                  <li key={link.name}>
                    <Link href={link.href} className="transition-colors hover:text-emerald-400">
                      {link.name}
                    </Link>
                  </li>
                ))}
              </ul>
            </div>
          ))}
        </div>

        <div className="mt-12 border-t border-slate-800 pt-8 text-center text-sm text-slate-500">
          <p>&copy; {new Date().getFullYear()} Amatra. All rights reserved.</p>
        </div>
      </div>
    </footer>
  )
}

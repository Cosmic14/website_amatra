"use client"

import { useEffect, useRef, useState } from "react"

interface ProcessStepGraphicProps {
  step: "data-collection" | "baseline" | "ai-analysis" | "recommendations" | "implementation"
  className?: string
}

export default function ProcessStepGraphic({ step, className = "" }: ProcessStepGraphicProps) {
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

  const renderDataCollection = () => (
    <div className="relative h-full w-full overflow-hidden rounded-lg border border-slate-700 bg-slate-900">
      {/* Header */}
      <div className="border-b border-slate-800 bg-slate-900 p-3">
        <div className="flex items-center">
          <div className="mr-2 h-3 w-3 rounded-full bg-red-500"></div>
          <div className="mr-2 h-3 w-3 rounded-full bg-yellow-500"></div>
          <div className="h-3 w-3 rounded-full bg-green-500"></div>
          <div className="ml-4 text-xs font-medium text-slate-400">Data Collection</div>
        </div>
      </div>

      {/* Main Content */}
      <div className="p-4">
        {/* Wearables Section */}
        <div className="mb-6">
          <h4 className="mb-2 text-sm font-medium text-emerald-400">Data Sources</h4>
          <div className="grid grid-cols-2 gap-3">
            {[
              { name: "WHOOP", type: "Wearable" },
              { name: "Wellness Survey", type: "Behavioral" },
              { name: "Sleep Tracking", type: "Wearable" },
              { name: "Recovery Activities", type: "Behavioral" },
            ].map((source, index) => (
              <div
                key={index}
                className={`rounded-md border border-slate-700 bg-slate-800 p-3 ${
                  isVisible ? "translate-y-0 opacity-100" : "translate-y-4 opacity-0"
                } transition-all duration-500`}
                style={{
                  transitionDelay: `${index * 100}ms`,
                }}
              >
                <div className="text-xs font-medium text-white">{source.name}</div>
                <div className="text-xs text-slate-400">{source.type}</div>
              </div>
            ))}
          </div>
        </div>

        {/* Data Flow */}
        <div className="mb-6">
          <h4 className="mb-2 text-sm font-medium text-emerald-400">Data Flow</h4>
          <div className="relative h-24 rounded-md border border-slate-700 bg-slate-800 p-3">
            <div className="flex h-full items-center justify-between">
              <div
                className={`flex h-16 w-16 flex-col items-center justify-center rounded-md border border-slate-700 bg-slate-900 ${
                  isVisible ? "opacity-100" : "opacity-0"
                } transition-opacity duration-500`}
              >
                <div className="text-xs text-slate-400">Athlete</div>
                <div className="mt-1 h-6 w-6 rounded-full bg-slate-700"></div>
              </div>

              <div
                className={`h-0.5 w-12 bg-emerald-500 ${
                  isVisible ? "w-12 opacity-100" : "w-0 opacity-0"
                } transition-all duration-500 delay-300`}
              ></div>

              <div
                className={`flex h-16 w-16 flex-col items-center justify-center rounded-md border border-slate-700 bg-slate-900 ${
                  isVisible ? "opacity-100" : "opacity-0"
                } transition-opacity duration-500 delay-200`}
              >
                <div className="text-xs text-slate-400">Amatra</div>
                <div className="mt-1 h-6 w-6 rounded-md bg-emerald-900/30">
                  <div className="flex h-full w-full items-center justify-center">
                    <div className="h-3 w-3 rounded-full bg-emerald-500"></div>
                  </div>
                </div>
              </div>

              <div
                className={`h-0.5 w-12 bg-emerald-500 ${
                  isVisible ? "w-12 opacity-100" : "w-0 opacity-0"
                } transition-all duration-500 delay-500`}
              ></div>

              <div
                className={`flex h-16 w-16 flex-col items-center justify-center rounded-md border border-slate-700 bg-slate-900 ${
                  isVisible ? "opacity-100" : "opacity-0"
                } transition-opacity duration-500 delay-400`}
              >
                <div className="text-xs text-slate-400">Team</div>
                <div className="mt-1 flex space-x-0.5">
                  <div className="h-3 w-3 rounded-full bg-slate-700"></div>
                  <div className="h-3 w-3 rounded-full bg-slate-700"></div>
                  <div className="h-3 w-3 rounded-full bg-slate-700"></div>
                </div>
              </div>
            </div>
          </div>
        </div>

        {/* Privacy */}
        <div>
          <h4 className="mb-2 text-sm font-medium text-emerald-400">Privacy & Security</h4>
          <div
            className={`rounded-md border border-slate-700 bg-slate-800 p-3 ${
              isVisible ? "translate-y-0 opacity-100" : "translate-y-4 opacity-0"
            } transition-all duration-500 delay-600`}
          >
            <div className="flex items-center">
              <div className="mr-3 flex h-8 w-8 items-center justify-center rounded-full bg-emerald-900/30 text-emerald-400">
                <svg
                  className="h-4 w-4"
                  fill="none"
                  stroke="currentColor"
                  viewBox="0 0 24 24"
                  xmlns="http://www.w3.org/2000/svg"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth={2}
                    d="M12 15v2m-6 4h12a2 2 0 002-2v-6a2 2 0 00-2-2H6a2 2 0 00-2 2v6a2 2 0 002 2zm10-10V7a4 4 0 00-8 0v4h8z"
                  />
                </svg>
              </div>
              <div>
                <div className="text-xs font-medium text-white">Encrypted & De-identified</div>
                <div className="text-xs text-slate-400">GDPR-compliant data processing</div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  )

  const renderBaseline = () => (
    <div className="relative h-full w-full overflow-hidden rounded-lg border border-slate-700 bg-slate-900">
      {/* Header */}
      <div className="border-b border-slate-800 bg-slate-900 p-3">
        <div className="flex items-center">
          <div className="mr-2 h-3 w-3 rounded-full bg-red-500"></div>
          <div className="mr-2 h-3 w-3 rounded-full bg-yellow-500"></div>
          <div className="h-3 w-3 rounded-full bg-green-500"></div>
          <div className="ml-4 text-xs font-medium text-slate-400">Baseline Establishment</div>
        </div>
      </div>

      {/* Main Content */}
      <div className="p-4">
        {/* Athlete Profile */}
        <div className="mb-6">
          <h4 className="mb-2 text-sm font-medium text-emerald-400">Athlete Profile</h4>
          <div
            className={`rounded-md border border-slate-700 bg-slate-800 p-3 ${
              isVisible ? "translate-y-0 opacity-100" : "translate-y-4 opacity-0"
            } transition-all duration-500`}
          >
            <div className="flex items-center">
              <div className="mr-3 flex h-10 w-10 items-center justify-center rounded-full bg-slate-700">
                <div className="text-xs font-bold text-white">AJ</div>
              </div>
              <div>
                <div className="text-sm font-medium text-white">Alex Johnson</div>
                <div className="text-xs text-slate-400">Forward | Age: 24</div>
              </div>
            </div>
          </div>
        </div>

        {/* Baseline Metrics */}
        <div className="mb-6">
          <h4 className="mb-2 text-sm font-medium text-emerald-400">Normal Ranges</h4>
          <div className="space-y-3">
            {[
              { metric: "HRV", min: 45, max: 65, current: 55 },
              { metric: "Resting HR", min: 48, max: 56, current: 52 },
              { metric: "Sleep Quality", min: 70, max: 90, current: 82 },
            ].map((metric, index) => (
              <div
                key={index}
                className={`rounded-md border border-slate-700 bg-slate-800 p-3 ${
                  isVisible ? "translate-y-0 opacity-100" : "translate-y-4 opacity-0"
                } transition-all duration-500`}
                style={{
                  transitionDelay: `${200 + index * 150}ms`,
                }}
              >
                <div className="mb-1 flex items-center justify-between">
                  <span className="text-xs font-medium text-white">{metric.metric}</span>
                  <span className="text-xs text-emerald-400">
                    Normal: {metric.min}-{metric.max}
                  </span>
                </div>
                <div className="relative h-2 w-full rounded-full bg-slate-700">
                  <div
                    className="absolute h-full rounded-full bg-slate-600"
                    style={{
                      left: `${(metric.min / 100) * 100}%`,
                      width: `${((metric.max - metric.min) / 100) * 100}%`,
                      opacity: isVisible ? 1 : 0,
                      transition: "opacity 0.5s ease-in-out",
                      transitionDelay: `${400 + index * 150}ms`,
                    }}
                  ></div>
                  <div
                    className="absolute h-4 w-1 -translate-x-1/2 -translate-y-1/4 rounded-full bg-emerald-500"
                    style={{
                      left: `${(metric.current / 100) * 100}%`,
                      opacity: isVisible ? 1 : 0,
                      transition: "opacity 0.5s ease-in-out",
                      transitionDelay: `${600 + index * 150}ms`,
                    }}
                  ></div>
                </div>
                <div className="mt-1 flex justify-between text-xs text-slate-500">
                  <span>0</span>
                  <span>Current: {metric.current}</span>
                  <span>100</span>
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* Rolling Window */}
        <div>
          <h4 className="mb-2 text-sm font-medium text-emerald-400">Rolling Window Analysis</h4>
          <div
            className={`rounded-md border border-slate-700 bg-slate-800 p-3 ${
              isVisible ? "translate-y-0 opacity-100" : "translate-y-4 opacity-0"
            } transition-all duration-500 delay-700`}
          >
            <div className="flex items-center justify-between">
              <div className="text-xs font-medium text-white">Window Size</div>
              <div className="flex space-x-2">
                <div className="rounded-md bg-slate-700 px-2 py-1 text-xs text-slate-400">7 Days</div>
                <div className="rounded-md bg-emerald-900/30 px-2 py-1 text-xs text-emerald-400">30 Days</div>
                <div className="rounded-md bg-slate-700 px-2 py-1 text-xs text-slate-400">90 Days</div>
              </div>
            </div>
            <div className="mt-3 h-16">
              <svg
                className="h-full w-full"
                viewBox="0 0 100 30"
                preserveAspectRatio="none"
                style={{
                  opacity: isVisible ? 1 : 0,
                  transition: "opacity 1s ease-in-out",
                  transitionDelay: "800ms",
                }}
              >
                <defs>
                  <linearGradient id="baselineGradient" x1="0%" y1="0%" x2="100%" y2="0%">
                    <stop offset="0%" stopColor="#10b981" />
                    <stop offset="100%" stopColor="#14b8a6" />
                  </linearGradient>
                </defs>
                <path
                  d="M0,15 C10,13 20,17 30,10 C40,3 50,7 60,5 C70,3 80,0 90,5 L90,25 L0,25 Z"
                  fill="rgba(16, 185, 129, 0.1)"
                  stroke="none"
                />
                <path
                  d="M0,15 C10,13 20,17 30,10 C40,3 50,7 60,5 C70,3 80,0 90,5"
                  fill="none"
                  stroke="url(#baselineGradient)"
                  strokeWidth="1.5"
                  strokeLinecap="round"
                  style={{
                    strokeDasharray: "100",
                    strokeDashoffset: isVisible ? "0" : "100",
                    transition: "stroke-dashoffset 1.5s ease-in-out",
                    transitionDelay: "1000ms",
                  }}
                />
                <line x1="0" y1="15" x2="100" y2="15" stroke="#475569" strokeWidth="0.5" strokeDasharray="2,2" />
                <line x1="0" y1="5" x2="100" y2="5" stroke="#475569" strokeWidth="0.5" strokeDasharray="2,2" />
                <line x1="0" y1="25" x2="100" y2="25" stroke="#475569" strokeWidth="0.5" strokeDasharray="2,2" />
              </svg>
            </div>
          </div>
        </div>
      </div>
    </div>
  )

  const renderAIAnalysis = () => (
    <div className="relative h-full w-full overflow-hidden rounded-lg border border-slate-700 bg-slate-900">
      {/* Header */}
      <div className="border-b border-slate-800 bg-slate-900 p-3">
        <div className="flex items-center">
          <div className="mr-2 h-3 w-3 rounded-full bg-red-500"></div>
          <div className="mr-2 h-3 w-3 rounded-full bg-yellow-500"></div>
          <div className="h-3 w-3 rounded-full bg-green-500"></div>
          <div className="ml-4 text-xs font-medium text-slate-400">AI Analysis Engine</div>
        </div>
      </div>

      {/* Main Content */}
      <div className="p-4">
        {/* Deviation Detection */}
        <div className="mb-6">
          <h4 className="mb-2 text-sm font-medium text-emerald-400">Deviation Detection</h4>
          <div
            className={`rounded-md border border-slate-700 bg-slate-800 p-3 ${
              isVisible ? "translate-y-0 opacity-100" : "translate-y-4 opacity-0"
            } transition-all duration-500`}
          >
            <div className="mb-2 flex items-center justify-between">
              <div className="text-xs font-medium text-white">Recovery Score</div>
              <div className="rounded-md bg-red-900/30 px-2 py-1 text-xs text-red-400">-28% Deviation</div>
            </div>
            <div className="h-16">
              <svg
                className="h-full w-full"
                viewBox="0 0 100 30"
                preserveAspectRatio="none"
                style={{
                  opacity: isVisible ? 1 : 0,
                  transition: "opacity 1s ease-in-out",
                  transitionDelay: "200ms",
                }}
              >
                <defs>
                  <linearGradient id="deviationGradient" x1="0%" y1="0%" x2="100%" y2="0%">
                    <stop offset="0%" stopColor="#10b981" />
                    <stop offset="100%" stopColor="#14b8a6" />
                  </linearGradient>
                </defs>
                <path
                  d="M0,10 C10,8 20,12 30,15 C40,18 50,12 60,10 C70,8 75,5 80,25 L80,25 L0,25 Z"
                  fill="rgba(16, 185, 129, 0.1)"
                  stroke="none"
                />
                <path
                  d="M0,10 C10,8 20,12 30,15 C40,18 50,12 60,10 C70,8 75,5 80,25"
                  fill="none"
                  stroke="url(#deviationGradient)"
                  strokeWidth="1.5"
                  strokeLinecap="round"
                  style={{
                    strokeDasharray: "100",
                    strokeDashoffset: isVisible ? "0" : "100",
                    transition: "stroke-dashoffset 1.5s ease-in-out",
                    transitionDelay: "400ms",
                  }}
                />
                <circle
                  cx="80"
                  cy="25"
                  r="2"
                  fill="#ef4444"
                  style={{
                    opacity: isVisible ? 1 : 0,
                    transition: "opacity 0.5s ease-in-out",
                    transitionDelay: "600ms",
                  }}
                />
                <line x1="0" y1="15" x2="100" y2="15" stroke="#475569" strokeWidth="0.5" strokeDasharray="2,2" />
              </svg>
            </div>
          </div>
        </div>

        {/* Causal Analysis */}
        <div className="mb-6">
          <h4 className="mb-2 text-sm font-medium text-emerald-400">Causal Analysis</h4>
          <div className="space-y-2">
            {[
              { factor: "Late Caffeine", impact: -15, confidence: 92 },
              { factor: "Poor Sleep Quality", impact: -18, confidence: 88 },
              { factor: "High Training Load", impact: -8, confidence: 75 },
            ].map((item, index) => (
              <div
                key={index}
                className={`rounded-md border border-slate-700 bg-slate-800 p-2 ${
                  isVisible ? "translate-x-0 opacity-100" : "translate-x-10 opacity-0"
                } transition-all duration-500`}
                style={{
                  transitionDelay: `${700 + index * 150}ms`,
                }}
              >
                <div className="flex items-center justify-between">
                  <span className="text-xs font-medium text-slate-300">{item.factor}</span>
                  <span className="text-xs font-medium text-red-400">{item.impact}%</span>
                </div>
                <div className="mt-1 h-1.5 w-full rounded-full bg-slate-700">
                  <div
                    className="h-full rounded-full bg-red-500"
                    style={{
                      width: isVisible ? `${item.confidence}%` : "0%",
                      transition: "width 1s ease-in-out",
                      transitionDelay: `${900 + index * 150}ms`,
                    }}
                  ></div>
                </div>
                <div className="mt-1 text-right text-xs text-slate-500">{item.confidence}% confidence</div>
              </div>
            ))}
          </div>
        </div>

        {/* Machine Learning Model */}
        <div>
          <h4 className="mb-2 text-sm font-medium text-emerald-400">ML Model</h4>
          <div
            className={`rounded-md border border-slate-700 bg-slate-800 p-3 ${
              isVisible ? "translate-y-0 opacity-100" : "translate-y-4 opacity-0"
            } transition-all duration-500 delay-1200`}
          >
            <div className="relative h-24">
              {/* Neural Network Visualization */}
              <div className="absolute inset-0">
                {/* Nodes */}
                {[...Array(15)].map((_, i) => {
                  const x = 10 + Math.random() * 80
                  const y = 10 + Math.random() * 80
                  const size = 2 + Math.random() * 3

                  return (
                    <div
                      key={i}
                      className={`absolute rounded-full bg-emerald-500 ${
                        isVisible ? "opacity-100" : "opacity-0"
                      } transition-opacity duration-700`}
                      style={{
                        left: `${x}%`,
                        top: `${y}%`,
                        width: `${size}px`,
                        height: `${size}px`,
                        transitionDelay: `${1300 + i * 50}ms`,
                      }}
                    ></div>
                  )
                })}

                {/* Connections */}
                <svg
                  className="absolute inset-0 h-full w-full"
                  style={{
                    opacity: isVisible ? 1 : 0,
                    transition: "opacity 1s ease-in-out",
                    transitionDelay: "1400ms",
                  }}
                >
                  {[...Array(20)].map((_, i) => {
                    const x1 = 10 + Math.random() * 80
                    const y1 = 10 + Math.random() * 80
                    const x2 = 10 + Math.random() * 80
                    const y2 = 10 + Math.random() * 80

                    return (
                      <line
                        key={i}
                        x1={`${x1}%`}
                        y1={`${y1}%`}
                        x2={`${x2}%`}
                        y2={`${y2}%`}
                        stroke="rgba(16, 185, 129, 0.2)"
                        strokeWidth="1"
                      />
                    )
                  })}
                </svg>
              </div>

              <div className="absolute bottom-2 left-0 right-0 text-center text-xs text-slate-400">
                Bespoke Machine Learning Model
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  )

  const renderRecommendations = () => (
    <div className="relative h-full w-full overflow-hidden rounded-lg border border-slate-700 bg-slate-900">
      {/* Header */}
      <div className="border-b border-slate-800 bg-slate-900 p-3">
        <div className="flex items-center">
          <div className="mr-2 h-3 w-3 rounded-full bg-red-500"></div>
          <div className="mr-2 h-3 w-3 rounded-full bg-yellow-500"></div>
          <div className="h-3 w-3 rounded-full bg-green-500"></div>
          <div className="ml-4 text-xs font-medium text-slate-400">Personalized Insights</div>
        </div>
      </div>

      {/* Main Content */}
      <div className="p-4">
        {/* Athlete Card */}
        <div className="mb-6">
          <div
            className={`flex items-center rounded-md border border-slate-700 bg-slate-800 p-3 ${
              isVisible ? "translate-y-0 opacity-100" : "translate-y-4 opacity-0"
            } transition-all duration-500`}
          >
            <div className="mr-3 flex h-10 w-10 items-center justify-center rounded-full bg-slate-700">
              <div className="text-xs font-bold text-white">AJ</div>
            </div>
            <div className="flex-1">
              <div className="text-sm font-medium text-white">Alex Johnson</div>
              <div className="text-xs text-slate-400">Recovery Score: 45%</div>
            </div>
            <div className="rounded-md bg-red-900/30 px-2 py-1 text-xs text-red-400">At Risk</div>
          </div>
        </div>

        {/* Insights */}
        <div className="mb-6">
          <h4 className="mb-2 text-sm font-medium text-emerald-400">Key Insights</h4>
          <div
            className={`rounded-md border border-slate-700 bg-slate-800 p-3 ${
              isVisible ? "translate-y-0 opacity-100" : "translate-y-4 opacity-0"
            } transition-all duration-500 delay-200`}
          >
            <div className="space-y-2 text-xs text-slate-300">
              <div className="flex items-start">
                <div className="mr-2 mt-0.5 h-2 w-2 rounded-full bg-red-500"></div>
                <span>Late caffeine intake reduced sleep quality by 15%</span>
              </div>
              <div className="flex items-start">
                <div className="mr-2 mt-0.5 h-2 w-2 rounded-full bg-red-500"></div>
                <span>High training load combined with poor recovery</span>
              </div>
              <div className="flex items-start">
                <div className="mr-2 mt-0.5 h-2 w-2 rounded-full bg-emerald-500"></div>
                <span>Meditation sessions improve HRV by 7% on average</span>
              </div>
            </div>
          </div>
        </div>

        {/* Recommendations */}
        <div>
          <h4 className="mb-2 text-sm font-medium text-emerald-400">Recommendations</h4>
          <div className="space-y-2">
            {[
              "Limit caffeine intake after 2pm",
              "Reduce training intensity by 20% for 3 days",
              "10-minute meditation before bed",
              "Morning sunlight exposure for 15 minutes",
            ].map((rec, index) => (
              <div
                key={index}
                className={`rounded-md border border-slate-700 bg-slate-800 p-3 ${
                  isVisible ? "translate-x-0 opacity-100" : "translate-x-10 opacity-0"
                } transition-all duration-500`}
                style={{
                  transitionDelay: `${400 + index * 150}ms`,
                }}
              >
                <div className="flex items-center">
                  <div className="mr-3 flex h-6 w-6 flex-shrink-0 items-center justify-center rounded-full bg-emerald-900/30 text-emerald-400">
                    <svg
                      className="h-3 w-3"
                      fill="none"
                      stroke="currentColor"
                      viewBox="0 0 24 24"
                      xmlns="http://www.w3.org/2000/svg"
                    >
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
                    </svg>
                  </div>
                  <span className="text-xs text-slate-300">{rec}</span>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  )

  const renderImplementation = () => (
    <div className="relative h-full w-full overflow-hidden rounded-lg border border-slate-700 bg-slate-900">
      {/* Header */}
      <div className="border-b border-slate-800 bg-slate-900 p-3">
        <div className="flex items-center">
          <div className="mr-2 h-3 w-3 rounded-full bg-red-500"></div>
          <div className="mr-2 h-3 w-3 rounded-full bg-yellow-500"></div>
          <div className="h-3 w-3 rounded-full bg-green-500"></div>
          <div className="ml-4 text-xs font-medium text-slate-400">Implementation & Monitoring</div>
        </div>
      </div>

      {/* Main Content */}
      <div className="p-4">
        {/* Dashboard */}
        <div className="mb-6">
          <h4 className="mb-2 text-sm font-medium text-emerald-400">Team Dashboard</h4>
          <div
            className={`rounded-md border border-slate-700 bg-slate-800 p-3 ${
              isVisible ? "translate-y-0 opacity-100" : "translate-y-4 opacity-0"
            } transition-all duration-500`}
          >
            <div className="mb-2 grid grid-cols-3 gap-2">
              {[
                { label: "Team Recovery", value: "72%" },
                { label: "At Risk", value: "3" },
                { label: "Improving", value: "8" },
              ].map((stat, index) => (
                <div
                  key={index}
                  className="rounded-md bg-slate-900 p-2 text-center"
                  style={{
                    opacity: isVisible ? 1 : 0,
                    transform: isVisible ? "translateY(0)" : "translateY(10px)",
                    transition: "opacity 0.5s ease-in-out, transform 0.5s ease-in-out",
                    transitionDelay: `${200 + index * 100}ms`,
                  }}
                >
                  <div className="text-xs text-slate-400">{stat.label}</div>
                  <div className="text-sm font-bold text-white">{stat.value}</div>
                </div>
              ))}
            </div>
            <div className="h-12 rounded-md bg-slate-900">
              <div className="flex h-full items-center justify-around px-2">
                {["Overview", "Athletes", "Insights", "Reports"].map((tab, index) => (
                  <div
                    key={index}
                    className={`text-xs ${index === 0 ? "text-emerald-400" : "text-slate-400"}`}
                    style={{
                      opacity: isVisible ? 1 : 0,
                      transition: "opacity 0.5s ease-in-out",
                      transitionDelay: `${500 + index * 100}ms`,
                    }}
                  >
                    {tab}
                  </div>
                ))}
              </div>
            </div>
          </div>
        </div>

        {/* Athlete App */}
        <div className="mb-6">
          <h4 className="mb-2 text-sm font-medium text-emerald-400">Athlete Mobile App</h4>
          <div
            className={`rounded-md border border-slate-700 bg-slate-800 p-3 ${
              isVisible ? "translate-y-0 opacity-100" : "translate-y-4 opacity-0"
            } transition-all duration-500 delay-300`}
          >
            <div className="flex items-center">
              <div className="mr-3 h-16 w-8 rounded-md border border-slate-700 bg-slate-900">
                <div className="mt-2 flex flex-col items-center">
                  <div className="h-2 w-2 rounded-full bg-emerald-500"></div>
                  <div className="mt-1 h-1 w-4 rounded-full bg-slate-700"></div>
                  <div className="mt-1 h-1 w-4 rounded-full bg-slate-700"></div>
                  <div className="mt-1 h-1 w-4 rounded-full bg-slate-700"></div>
                </div>
              </div>
              <div className="flex-1">
                <div className="text-xs font-medium text-white">Personalized Recommendations</div>
                <div className="mt-1 text-xs text-slate-400">Daily insights and recovery protocols</div>
                <div
                  className="mt-2 h-1 w-full rounded-full bg-slate-700"
                  style={{
                    opacity: isVisible ? 1 : 0,
                    transition: "opacity 0.5s ease-in-out",
                    transitionDelay: "700ms",
                  }}
                >
                  <div
                    className="h-full rounded-full bg-emerald-500"
                    style={{
                      width: isVisible ? "85%" : "0%",
                      transition: "width 1s ease-in-out",
                      transitionDelay: "800ms",
                    }}
                  ></div>
                </div>
              </div>
            </div>
          </div>
        </div>

        {/* Feedback Loop */}
        <div>
          <h4 className="mb-2 text-sm font-medium text-emerald-400">Continuous Improvement</h4>
          <div
            className={`rounded-md border border-slate-700 bg-slate-800 p-3 ${
              isVisible ? "translate-y-0 opacity-100" : "translate-y-4 opacity-0"
            } transition-all duration-500 delay-600`}
          >
            <div className="flex items-center justify-between">
              <div className="flex h-16 w-16 flex-col items-center justify-center">
                <div className="text-xs text-slate-400">Data</div>
                <div
                  className="mt-1 h-6 w-6 rounded-md bg-slate-700"
                  style={{
                    opacity: isVisible ? 1 : 0,
                    transition: "opacity 0.5s ease-in-out",
                    transitionDelay: "900ms",
                  }}
                ></div>
              </div>

              <svg
                width="24"
                height="24"
                viewBox="0 0 24 24"
                fill="none"
                xmlns="http://www.w3.org/2000/svg"
                className="text-emerald-500"
                style={{
                  opacity: isVisible ? 1 : 0,
                  transition: "opacity 0.5s ease-in-out",
                  transitionDelay: "1000ms",
                }}
              >
                <path
                  d="M17.25 8.25L21 12m0 0l-3.75 3.75M21 12H3"
                  stroke="currentColor"
                  strokeWidth="1.5"
                  strokeLinecap="round"
                  strokeLinejoin="round"
                />
              </svg>

              <div className="flex h-16 w-16 flex-col items-center justify-center">
                <div className="text-xs text-slate-400">Analysis</div>
                <div
                  className="mt-1 h-6 w-6 rounded-md bg-emerald-900/30"
                  style={{
                    opacity: isVisible ? 1 : 0,
                    transition: "opacity 0.5s ease-in-out",
                    transitionDelay: "1100ms",
                  }}
                >
                  <div className="flex h-full w-full items-center justify-center">
                    <div className="h-3 w-3 rounded-full bg-emerald-500"></div>
                  </div>
                </div>
              </div>

              <svg
                width="24"
                height="24"
                viewBox="0 0 24 24"
                fill="none"
                xmlns="http://www.w3.org/2000/svg"
                className="text-emerald-500"
                style={{
                  opacity: isVisible ? 1 : 0,
                  transition: "opacity 0.5s ease-in-out",
                  transitionDelay: "1200ms",
                }}
              >
                <path
                  d="M17.25 8.25L21 12m0 0l-3.75 3.75M21 12H3"
                  stroke="currentColor"
                  strokeWidth="1.5"
                  strokeLinecap="round"
                  strokeLinejoin="round"
                />
              </svg>

              <div className="flex h-16 w-16 flex-col items-center justify-center">
                <div className="text-xs text-slate-400">Insights</div>
                <div
                  className="mt-1 h-6 w-6 rounded-md bg-slate-700"
                  style={{
                    opacity: isVisible ? 1 : 0,
                    transition: "opacity 0.5s ease-in-out",
                    transitionDelay: "1300ms",
                  }}
                ></div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  )

  return (
    <div
      ref={ref}
      className={`aspect-video w-full ${className} ${
        isVisible ? "opacity-100" : "opacity-0"
      } transition-opacity duration-1000`}
    >
      {step === "data-collection" && renderDataCollection()}
      {step === "baseline" && renderBaseline()}
      {step === "ai-analysis" && renderAIAnalysis()}
      {step === "recommendations" && renderRecommendations()}
      {step === "implementation" && renderImplementation()}
    </div>
  )
}

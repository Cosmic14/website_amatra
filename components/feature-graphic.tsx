"use client"

import { useEffect, useRef, useState } from "react"

interface FeatureGraphicProps {
  type: "data-integration" | "ai-analysis" | "team-dashboard" | "athlete-app" | "predictive"
  className?: string
}

export default function FeatureGraphic({ type, className = "" }: FeatureGraphicProps) {
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

  const renderDataIntegration = () => (
    <div className="relative h-full w-full overflow-hidden rounded-lg border border-slate-700 bg-slate-900">
      {/* Header */}
      <div className="border-b border-slate-800 bg-slate-900 p-3">
        <div className="flex items-center">
          <div className="mr-2 h-3 w-3 rounded-full bg-red-500"></div>
          <div className="mr-2 h-3 w-3 rounded-full bg-yellow-500"></div>
          <div className="h-3 w-3 rounded-full bg-green-500"></div>
          <div className="ml-4 text-xs font-medium text-slate-400">Data Integration Dashboard</div>
        </div>
      </div>

      {/* Main Content */}
      <div className="p-4">
        {/* Wearables Section */}
        <div className="mb-6">
          <h4 className="mb-2 text-sm font-medium text-emerald-400">Connected Wearables</h4>
          <div className="grid grid-cols-3 gap-3">
            {["WHOOP", "Oura", "Garmin"].map((device, index) => (
              <div
                key={index}
                className={`flex items-center justify-center rounded-md border border-slate-700 bg-slate-800 p-3 text-center text-xs font-medium ${
                  isVisible ? "translate-y-0 opacity-100" : "translate-y-4 opacity-0"
                } transition-all duration-500 delay-${index * 100}`}
                style={{
                  transitionDelay: `${index * 100}ms`,
                }}
              >
                <div>
                  <div className="mx-auto mb-2 flex h-8 w-8 items-center justify-center rounded-full bg-emerald-900/30">
                    <div className="h-3 w-3 rounded-full bg-emerald-500"></div>
                  </div>
                  <span className="text-slate-200">{device}</span>
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* Data Flow Visualization */}
        <div className="mb-6">
          <h4 className="mb-2 text-sm font-medium text-emerald-400">Data Flow</h4>
          <div className="relative h-20">
            <div
              className={`absolute left-0 top-1/2 h-1 w-full -translate-y-1/2 rounded bg-slate-800 ${
                isVisible ? "opacity-100" : "opacity-0"
              } transition-opacity duration-1000 delay-300`}
            ></div>

            {[0, 1, 2, 3, 4].map((i) => (
              <div
                key={i}
                className={`absolute top-1/2 h-3 w-3 -translate-y-1/2 rounded-full bg-emerald-500 ${
                  isVisible ? "opacity-100" : "opacity-0"
                } transition-all duration-500`}
                style={{
                  left: `${i * 25}%`,
                  transitionDelay: `${400 + i * 150}ms`,
                  animation: isVisible ? `pulse 1.5s infinite ${i * 0.3}s` : "none",
                }}
              ></div>
            ))}
          </div>
        </div>

        {/* Metrics Grid */}
        <div>
          <h4 className="mb-2 text-sm font-medium text-emerald-400">Collected Metrics</h4>
          <div className="grid grid-cols-2 gap-2">
            {["Sleep Quality", "HRV", "Recovery Score", "Resting HR", "Strain", "Behavioral Data"].map(
              (metric, index) => (
                <div
                  key={index}
                  className={`rounded-md border border-slate-700 bg-slate-800 p-2 text-xs ${
                    isVisible ? "translate-y-0 opacity-100" : "translate-y-4 opacity-0"
                  } transition-all duration-500`}
                  style={{
                    transitionDelay: `${600 + index * 100}ms`,
                  }}
                >
                  <div className="flex items-center">
                    <div className="mr-2 h-2 w-2 rounded-full bg-emerald-500"></div>
                    <span className="text-slate-300">{metric}</span>
                  </div>
                </div>
              ),
            )}
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
        {/* Neural Network Visualization */}
        <div className="mb-6">
          <h4 className="mb-2 text-sm font-medium text-emerald-400">Neural Network</h4>
          <div className="relative h-40 w-full">
            {/* Nodes */}
            {[...Array(20)].map((_, i) => {
              const x = 10 + Math.random() * 80
              const y = 10 + Math.random() * 80
              const size = 2 + Math.random() * 4

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
                    transitionDelay: `${i * 50}ms`,
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
                transitionDelay: "500ms",
              }}
            >
              {[...Array(30)].map((_, i) => {
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
        </div>

        {/* Analysis Results */}
        <div>
          <h4 className="mb-2 text-sm font-medium text-emerald-400">Causal Factors</h4>
          <div className="space-y-2">
            {[
              { factor: "Late Caffeine", impact: -12, confidence: 87 },
              { factor: "Morning Sunlight", impact: 8, confidence: 92 },
              { factor: "Meditation", impact: 15, confidence: 78 },
            ].map((item, index) => (
              <div
                key={index}
                className={`rounded-md border border-slate-700 bg-slate-800 p-2 ${
                  isVisible ? "translate-x-0 opacity-100" : "translate-x-10 opacity-0"
                } transition-all duration-500`}
                style={{
                  transitionDelay: `${800 + index * 150}ms`,
                }}
              >
                <div className="flex items-center justify-between">
                  <span className="text-xs font-medium text-slate-300">{item.factor}</span>
                  <span className={`text-xs font-medium ${item.impact > 0 ? "text-emerald-400" : "text-red-400"}`}>
                    {item.impact > 0 ? "+" : ""}
                    {item.impact}%
                  </span>
                </div>
                <div className="mt-1 h-1.5 w-full rounded-full bg-slate-700">
                  <div
                    className={`h-full rounded-full ${
                      item.impact > 0 ? "bg-emerald-500" : "bg-red-500"
                    } ${isVisible ? "w-full" : "w-0"} transition-all duration-1000`}
                    style={{
                      width: isVisible ? `${item.confidence}%` : "0%",
                      transitionDelay: `${1000 + index * 150}ms`,
                    }}
                  ></div>
                </div>
                <div className="mt-1 text-right text-xs text-slate-500">{item.confidence}% confidence</div>
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  )

  const renderTeamDashboard = () => (
    <div className="relative h-full w-full overflow-hidden rounded-lg border border-slate-700 bg-slate-900">
      {/* Header */}
      <div className="border-b border-slate-800 bg-slate-900 p-3">
        <div className="flex items-center justify-between">
          <div className="flex items-center">
            <div className="mr-2 h-3 w-3 rounded-full bg-red-500"></div>
            <div className="mr-2 h-3 w-3 rounded-full bg-yellow-500"></div>
            <div className="h-3 w-3 rounded-full bg-green-500"></div>
            <div className="ml-4 text-xs font-medium text-slate-400">Team Dashboard</div>
          </div>
          <div className="flex space-x-2">
            <div className="rounded-md bg-slate-800 px-2 py-1 text-xs text-emerald-400">Overview</div>
            <div className="rounded-md bg-transparent px-2 py-1 text-xs text-slate-400">Athletes</div>
            <div className="rounded-md bg-transparent px-2 py-1 text-xs text-slate-400">Insights</div>
          </div>
        </div>
      </div>

      {/* Main Content */}
      <div className="p-4">
        {/* Team Stats */}
        <div className="mb-4 grid grid-cols-3 gap-3">
          {[
            { label: "Team Recovery", value: "72%", trend: "up" },
            { label: "Availability", value: "85%", trend: "up" },
            { label: "Risk Level", value: "Low", trend: "down" },
          ].map((stat, index) => (
            <div
              key={index}
              className={`rounded-md border border-slate-700 bg-slate-800 p-3 ${
                isVisible ? "translate-y-0 opacity-100" : "translate-y-4 opacity-0"
              } transition-all duration-500`}
              style={{
                transitionDelay: `${index * 100}ms`,
              }}
            >
              <div className="text-xs text-slate-400">{stat.label}</div>
              <div className="flex items-center">
                <span className="text-lg font-bold text-white">{stat.value}</span>
                <span className={`ml-1 text-xs ${stat.trend === "up" ? "text-emerald-500" : "text-red-500"}`}>
                  {stat.trend === "up" ? "↑" : "↓"}
                </span>
              </div>
            </div>
          ))}
        </div>

        {/* Recovery Chart */}
        <div className="mb-4">
          <h4 className="mb-2 text-xs font-medium text-slate-400">Recovery Trend</h4>
          <div className="h-20 rounded-md border border-slate-700 bg-slate-800 p-2">
            <div className="relative h-full w-full">
              <svg
                className="h-full w-full"
                viewBox="0 0 100 30"
                preserveAspectRatio="none"
                style={{
                  opacity: isVisible ? 1 : 0,
                  transition: "opacity 1s ease-in-out",
                  transitionDelay: "400ms",
                }}
              >
                <defs>
                  <linearGradient id="chartGradient" x1="0%" y1="0%" x2="100%" y2="0%">
                    <stop offset="0%" stopColor="#10b981" />
                    <stop offset="100%" stopColor="#14b8a6" />
                  </linearGradient>
                </defs>
                <path
                  d="M0,20 C10,18 20,22 30,15 C40,8 50,12 60,10 C70,8 80,5 90,10 L90,30 L0,30 Z"
                  fill="rgba(16, 185, 129, 0.1)"
                  stroke="none"
                />
                <path
                  d="M0,20 C10,18 20,22 30,15 C40,8 50,12 60,10 C70,8 80,5 90,10"
                  fill="none"
                  stroke="url(#chartGradient)"
                  strokeWidth="1.5"
                  strokeLinecap="round"
                  style={{
                    strokeDasharray: "100",
                    strokeDashoffset: isVisible ? "0" : "100",
                    transition: "stroke-dashoffset 1.5s ease-in-out",
                    transitionDelay: "600ms",
                  }}
                />
              </svg>
            </div>
          </div>
        </div>

        {/* Athletes List */}
        <div>
          <h4 className="mb-2 text-xs font-medium text-slate-400">Athletes</h4>
          <div className="space-y-2">
            {[
              { name: "Alex Johnson", position: "Forward", recovery: 65, status: "Ready" },
              { name: "Maria Garcia", position: "Midfielder", recovery: 82, status: "Ready" },
              { name: "James Wilson", position: "Defender", recovery: 45, status: "At Risk" },
            ].map((athlete, index) => (
              <div
                key={index}
                className={`flex items-center justify-between rounded-md border border-slate-700 bg-slate-800 p-2 ${
                  isVisible ? "translate-x-0 opacity-100" : "translate-x-10 opacity-0"
                } transition-all duration-500`}
                style={{
                  transitionDelay: `${800 + index * 150}ms`,
                }}
              >
                <div className="flex items-center">
                  <div className="mr-3 flex h-8 w-8 items-center justify-center rounded-full bg-slate-700 text-xs font-bold text-white">
                    {athlete.name.charAt(0)}
                  </div>
                  <div>
                    <div className="text-xs font-medium text-white">{athlete.name}</div>
                    <div className="text-xs text-slate-400">{athlete.position}</div>
                  </div>
                </div>
                <div className="text-right">
                  <div
                    className={`text-sm font-bold ${
                      athlete.recovery > 70
                        ? "text-emerald-500"
                        : athlete.recovery > 50
                          ? "text-yellow-500"
                          : "text-red-500"
                    }`}
                  >
                    {athlete.recovery}%
                  </div>
                  <div className={`text-xs ${athlete.status === "Ready" ? "text-emerald-400" : "text-red-400"}`}>
                    {athlete.status}
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  )

  const renderAthleteApp = () => (
    <div className="relative h-full w-full">
      <div className="mx-auto w-[280px]">
        <div className="overflow-hidden rounded-[32px] border-[8px] border-slate-700 bg-slate-800 shadow-lg">
          <div className="relative h-[500px] w-full overflow-hidden bg-slate-900">
            {/* Status Bar */}
            <div className="flex h-6 items-center justify-between bg-slate-950 px-4 text-[10px] text-slate-400">
              <span>9:41</span>
              <div className="flex items-center space-x-1">
                <span>5G</span>
                <span>100%</span>
              </div>
            </div>

            {/* App Header */}
            <div className="border-b border-slate-800 bg-slate-900 p-4">
              <div className="flex items-center justify-between">
                <div>
                  <h3 className="text-lg font-bold text-emerald-400">Amatra</h3>
                  <p className="text-xs text-slate-400">Athlete Recovery</p>
                </div>
                <div className="flex h-8 w-8 items-center justify-center rounded-full bg-slate-800">
                  <div className="h-6 w-6 rounded-full bg-slate-700"></div>
                </div>
              </div>
            </div>

            {/* App Content */}
            <div className="p-4">
              {/* Today's Recovery */}
              <div
                className={`mb-4 rounded-lg border border-slate-800 bg-slate-800 p-3 ${
                  isVisible ? "translate-y-0 opacity-100" : "translate-y-4 opacity-0"
                } transition-all duration-500`}
              >
                <h4 className="mb-2 text-xs font-medium text-slate-400">Today's Recovery</h4>
                <div className="flex items-center justify-between">
                  <div className="text-2xl font-bold text-white">78%</div>
                  <div className="text-xs text-emerald-400">+5% from yesterday</div>
                </div>
                <div className="mt-2 h-2 w-full rounded-full bg-slate-700">
                  <div
                    className="h-full rounded-full bg-emerald-500"
                    style={{
                      width: isVisible ? "78%" : "0%",
                      transition: "width 1s ease-in-out",
                      transitionDelay: "300ms",
                    }}
                  ></div>
                </div>
              </div>

              {/* Recommendations */}
              <div
                className={`mb-4 ${
                  isVisible ? "translate-y-0 opacity-100" : "translate-y-4 opacity-0"
                } transition-all duration-500 delay-200`}
              >
                <h4 className="mb-2 text-xs font-medium text-slate-400">Recommendations</h4>
                <div className="space-y-2">
                  {["Limit caffeine after 2pm", "10 min meditation before bed", "Morning sunlight exposure"].map(
                    (rec, index) => (
                      <div
                        key={index}
                        className="rounded-md border border-slate-800 bg-slate-800 p-2 text-xs text-white"
                        style={{
                          opacity: isVisible ? 1 : 0,
                          transform: isVisible ? "translateX(0)" : "translateX(10px)",
                          transition: "opacity 0.5s ease-in-out, transform 0.5s ease-in-out",
                          transitionDelay: `${400 + index * 100}ms`,
                        }}
                      >
                        <div className="flex items-center">
                          <div className="mr-2 h-4 w-4 rounded-full bg-emerald-900/30 p-0.5">
                            <div className="h-full w-full rounded-full bg-emerald-500"></div>
                          </div>
                          {rec}
                        </div>
                      </div>
                    ),
                  )}
                </div>
              </div>

              {/* Metrics */}
              <div
                className={`${
                  isVisible ? "translate-y-0 opacity-100" : "translate-y-4 opacity-0"
                } transition-all duration-500 delay-500`}
              >
                <h4 className="mb-2 text-xs font-medium text-slate-400">Key Metrics</h4>
                <div className="grid grid-cols-2 gap-2">
                  {[
                    { label: "HRV", value: "65ms" },
                    { label: "Sleep", value: "7.5h" },
                    { label: "RHR", value: "52" },
                    { label: "Readiness", value: "82%" },
                  ].map((metric, index) => (
                    <div
                      key={index}
                      className="rounded-md border border-slate-800 bg-slate-800 p-2 text-center"
                      style={{
                        opacity: isVisible ? 1 : 0,
                        transform: isVisible ? "translateY(0)" : "translateY(10px)",
                        transition: "opacity 0.5s ease-in-out, transform 0.5s ease-in-out",
                        transitionDelay: `${700 + index * 100}ms`,
                      }}
                    >
                      <div className="text-xs text-slate-400">{metric.label}</div>
                      <div className="text-sm font-bold text-white">{metric.value}</div>
                    </div>
                  ))}
                </div>
              </div>
            </div>

            {/* Bottom Nav */}
            <div className="absolute bottom-0 left-0 right-0 flex h-12 items-center justify-around border-t border-slate-800 bg-slate-900">
              {["Home", "Insights", "History", "Profile"].map((item, index) => (
                <div
                  key={index}
                  className={`flex h-full w-full flex-col items-center justify-center text-[10px] ${
                    index === 0 ? "text-emerald-400" : "text-slate-400"
                  }`}
                >
                  <div
                    className={`mb-1 h-1.5 w-1.5 rounded-full ${index === 0 ? "bg-emerald-400" : "bg-transparent"}`}
                  ></div>
                  {item}
                </div>
              ))}
            </div>
          </div>
        </div>

        {/* Phone Shadow */}
        <div className="mx-auto -mt-2 h-4 w-[200px] rounded-full bg-black/20 blur-md"></div>
      </div>
    </div>
  )

  const renderPredictive = () => (
    <div className="relative h-full w-full overflow-hidden rounded-lg border border-slate-700 bg-slate-900">
      {/* Header */}
      <div className="border-b border-slate-800 bg-slate-900 p-3">
        <div className="flex items-center">
          <div className="mr-2 h-3 w-3 rounded-full bg-red-500"></div>
          <div className="mr-2 h-3 w-3 rounded-full bg-yellow-500"></div>
          <div className="h-3 w-3 rounded-full bg-green-500"></div>
          <div className="ml-4 text-xs font-medium text-slate-400">Predictive Analytics</div>
        </div>
      </div>

      {/* Main Content */}
      <div className="p-4">
        {/* Prediction Header */}
        <div className="mb-4 flex items-center justify-between">
          <h4 className="text-sm font-medium text-emerald-400">Injury Risk Forecast</h4>
          <div className="rounded-md bg-slate-800 px-2 py-1 text-xs text-slate-300">Next 7 Days</div>
        </div>

        {/* Risk Visualization */}
        <div className="mb-6">
          <div className="relative mb-2 h-8 w-full rounded-md bg-slate-800">
            <div
              className="absolute left-0 top-0 h-full rounded-md bg-gradient-to-r from-emerald-500 to-yellow-500"
              style={{
                width: isVisible ? "35%" : "0%",
                transition: "width 1s ease-in-out",
                transitionDelay: "300ms",
              }}
            ></div>
            <div className="absolute inset-0 flex items-center justify-center text-xs font-medium text-white">
              Current Risk: Low (35%)
            </div>
          </div>

          <div className="flex justify-between text-xs text-slate-400">
            <span>Low Risk</span>
            <span>Medium Risk</span>
            <span>High Risk</span>
          </div>
        </div>

        {/* Risk Factors */}
        <div className="mb-6">
          <h4 className="mb-2 text-sm font-medium text-emerald-400">Contributing Factors</h4>
          <div className="space-y-2">
            {[
              { factor: "Sleep Quality", impact: 15, direction: "positive" },
              { factor: "Training Load", impact: 8, direction: "negative" },
              { factor: "Recovery Score", impact: 12, direction: "positive" },
            ].map((item, index) => (
              <div
                key={index}
                className={`rounded-md border border-slate-700 bg-slate-800 p-2 ${
                  isVisible ? "translate-x-0 opacity-100" : "translate-x-10 opacity-0"
                } transition-all duration-500`}
                style={{
                  transitionDelay: `${500 + index * 150}ms`,
                }}
              >
                <div className="flex items-center justify-between">
                  <span className="text-xs font-medium text-slate-300">{item.factor}</span>
                  <span
                    className={`text-xs font-medium ${
                      item.direction === "positive" ? "text-emerald-400" : "text-red-400"
                    }`}
                  >
                    {item.direction === "positive" ? "+" : "-"}
                    {item.impact}%
                  </span>
                </div>
                <div className="mt-1 h-1.5 w-full rounded-full bg-slate-700">
                  <div
                    className={`h-full rounded-full ${item.direction === "positive" ? "bg-emerald-500" : "bg-red-500"}`}
                    style={{
                      width: isVisible ? `${item.impact * 5}%` : "0%",
                      transition: "width 1s ease-in-out",
                      transitionDelay: `${700 + index * 150}ms`,
                    }}
                  ></div>
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* Recommendations */}
        <div>
          <h4 className="mb-2 text-sm font-medium text-emerald-400">Preventive Recommendations</h4>
          <div className="rounded-md border border-slate-700 bg-slate-800 p-3">
            <ul className="space-y-2 text-xs text-slate-300">
              {[
                "Reduce high-intensity training by 20% this week",
                "Focus on sleep quality improvements",
                "Implement additional recovery protocols",
              ].map((rec, index) => (
                <li
                  key={index}
                  className={`flex items-start ${
                    isVisible ? "translate-y-0 opacity-100" : "translate-y-4 opacity-0"
                  } transition-all duration-500`}
                  style={{
                    transitionDelay: `${1000 + index * 150}ms`,
                  }}
                >
                  <div className="mr-2 mt-0.5 h-2 w-2 rounded-full bg-emerald-500"></div>
                  <span>{rec}</span>
                </li>
              ))}
            </ul>
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
      {type === "data-integration" && renderDataIntegration()}
      {type === "ai-analysis" && renderAIAnalysis()}
      {type === "team-dashboard" && renderTeamDashboard()}
      {type === "athlete-app" && renderAthleteApp()}
      {type === "predictive" && renderPredictive()}
    </div>
  )
}

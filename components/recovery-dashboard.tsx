"use client"

import { useEffect, useState } from "react"
import { BarChart, LineChart } from "lucide-react"
import { Button } from "@/components/ui/button"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"

export default function RecoveryDashboard() {
  const [loaded, setLoaded] = useState(false)

  useEffect(() => {
    setLoaded(true)
  }, [])

  return (
    <div className="overflow-hidden rounded-lg bg-slate-900 shadow-lg">
      <div className="flex items-center justify-between border-b border-slate-800 p-4">
        <div>
          <h3 className="text-lg font-medium text-white">Athlete Recovery Dashboard</h3>
          <p className="text-sm text-slate-400">Team overview and individual insights</p>
        </div>
        <div className="flex items-center gap-2">
          <Button
            variant="outline"
            size="sm"
            className="hidden border-slate-700 text-slate-300 hover:bg-slate-800 sm:flex"
          >
            <BarChart className="mr-1 h-4 w-4" />
            Reports
          </Button>
          <Button
            size="sm"
            className="bg-gradient-to-r from-emerald-600 to-teal-600 hover:from-emerald-500 hover:to-teal-500"
          >
            <LineChart className="mr-1 h-4 w-4" />
            Live Data
          </Button>
        </div>
      </div>

      <Tabs defaultValue="overview" className="w-full">
        <div className="border-b border-slate-800 px-4">
          <TabsList className="h-12 bg-transparent">
            <TabsTrigger
              value="overview"
              className="data-[state=active]:bg-slate-800 data-[state=active]:text-emerald-400"
            >
              Overview
            </TabsTrigger>
            <TabsTrigger
              value="athletes"
              className="data-[state=active]:bg-slate-800 data-[state=active]:text-emerald-400"
            >
              Athletes
            </TabsTrigger>
            <TabsTrigger
              value="insights"
              className="data-[state=active]:bg-slate-800 data-[state=active]:text-emerald-400"
            >
              Insights
            </TabsTrigger>
            <TabsTrigger
              value="trends"
              className="data-[state=active]:bg-slate-800 data-[state=active]:text-emerald-400"
            >
              Trends
            </TabsTrigger>
          </TabsList>
        </div>

        <TabsContent value="overview" className="p-0">
          <div className="grid grid-cols-1 gap-4 p-4 md:grid-cols-2 lg:grid-cols-3">
            {/* Recovery Score Card */}
            <div className="rounded-lg border border-slate-800 bg-slate-900 p-4 shadow-sm">
              <div className="mb-2 flex items-center justify-between">
                <h4 className="text-sm font-medium text-slate-400">Team Recovery Score</h4>
                <span className="rounded-full bg-emerald-900/30 px-2 py-1 text-xs font-medium text-emerald-400">
                  +5%
                </span>
              </div>
              <div className="mb-2 text-3xl font-bold text-white">78%</div>
              <div className="h-2 overflow-hidden rounded-full bg-slate-800">
                <div
                  className="h-full bg-gradient-to-r from-emerald-500 to-teal-500"
                  style={{ width: loaded ? "78%" : "0%", transition: "width 1s ease-in-out" }}
                ></div>
              </div>
              <div className="mt-2 text-xs text-slate-400">Based on HRV, sleep quality, and subjective readiness</div>
            </div>

            {/* Sleep Quality Card */}
            <div className="rounded-lg border border-slate-800 bg-slate-900 p-4 shadow-sm">
              <div className="mb-2 flex items-center justify-between">
                <h4 className="text-sm font-medium text-slate-400">Avg. Sleep Quality</h4>
                <span className="rounded-full bg-amber-900/30 px-2 py-1 text-xs font-medium text-amber-400">-2%</span>
              </div>
              <div className="mb-2 text-3xl font-bold text-white">82%</div>
              <div className="h-2 overflow-hidden rounded-full bg-slate-800">
                <div
                  className="h-full bg-gradient-to-r from-amber-500 to-yellow-500"
                  style={{ width: loaded ? "82%" : "0%", transition: "width 1s ease-in-out" }}
                ></div>
              </div>
              <div className="mt-2 text-xs text-slate-400">Average sleep efficiency across all athletes</div>
            </div>

            {/* HRV Trends Card */}
            <div className="rounded-lg border border-slate-800 bg-slate-900 p-4 shadow-sm">
              <div className="mb-2 flex items-center justify-between">
                <h4 className="text-sm font-medium text-slate-400">HRV Trend</h4>
                <span className="rounded-full bg-emerald-900/30 px-2 py-1 text-xs font-medium text-emerald-400">
                  +8%
                </span>
              </div>
              <div className="mb-2 text-3xl font-bold text-white">65ms</div>
              <div className="h-10">
                {loaded && (
                  <svg className="h-full w-full" viewBox="0 0 100 20">
                    <path
                      d="M0,10 L5,12 L10,8 L15,15 L20,7 L25,9 L30,6 L35,14 L40,4 L45,10 L50,8 L55,12 L60,6 L65,9 L70,5 L75,11 L80,7 L85,13 L90,4 L95,8 L100,6"
                      fill="none"
                      stroke="url(#emeraldGradient)"
                      strokeWidth="2"
                    />
                    <defs>
                      <linearGradient id="emeraldGradient" x1="0%" y1="0%" x2="100%" y2="0%">
                        <stop offset="0%" stopColor="#10b981" />
                        <stop offset="100%" stopColor="#14b8a6" />
                      </linearGradient>
                    </defs>
                  </svg>
                )}
              </div>
              <div className="mt-2 text-xs text-slate-400">7-day rolling average across team</div>
            </div>
          </div>

          {/* Chart Area */}
          <div className="p-4">
            <div className="rounded-lg border border-slate-800 bg-slate-900 p-4 shadow-sm">
              <div className="mb-4 flex items-center justify-between">
                <h4 className="font-medium text-white">Recovery Metrics Over Time</h4>
                <div className="flex gap-2">
                  <Button
                    variant="outline"
                    size="sm"
                    className="h-7 border-slate-700 text-xs text-slate-300 hover:bg-slate-800"
                  >
                    7 Days
                  </Button>
                  <Button
                    variant="outline"
                    size="sm"
                    className="h-7 border-slate-700 bg-slate-800 text-xs text-emerald-400"
                  >
                    30 Days
                  </Button>
                  <Button
                    variant="outline"
                    size="sm"
                    className="h-7 border-slate-700 text-xs text-slate-300 hover:bg-slate-800"
                  >
                    90 Days
                  </Button>
                </div>
              </div>
              <div className="h-64">
                {loaded && (
                  <svg className="h-full w-full" viewBox="0 0 800 200">
                    {/* Grid Lines */}
                    <line x1="0" y1="0" x2="800" y2="0" stroke="#334155" strokeWidth="1" />
                    <line x1="0" y1="50" x2="800" y2="50" stroke="#334155" strokeWidth="1" />
                    <line x1="0" y1="100" x2="800" y2="100" stroke="#334155" strokeWidth="1" />
                    <line x1="0" y1="150" x2="800" y2="150" stroke="#334155" strokeWidth="1" />
                    <line x1="0" y1="200" x2="800" y2="200" stroke="#334155" strokeWidth="1" />

                    {/* Recovery Score Line */}
                    <path
                      d="M0,100 C50,80 100,120 150,90 C200,60 250,110 300,80 C350,50 400,100 450,70 C500,40 550,90 600,60 C650,30 700,80 750,50 L750,200 L0,200 Z"
                      fill="url(#emeraldGradientFill)"
                      stroke="url(#emeraldGradientStroke)"
                      strokeWidth="2"
                    />

                    {/* Sleep Quality Line */}
                    <path
                      d="M0,120 C50,100 100,140 150,110 C200,80 250,130 300,100 C350,70 400,120 450,90 C500,60 550,110 600,80 C650,50 700,100 750,70"
                      fill="none"
                      stroke="url(#blueGradient)"
                      strokeWidth="2"
                      strokeDasharray="5,5"
                    />

                    <defs>
                      <linearGradient id="emeraldGradientFill" x1="0%" y1="0%" x2="100%" y2="0%">
                        <stop offset="0%" stopColor="rgba(16, 185, 129, 0.1)" />
                        <stop offset="100%" stopColor="rgba(20, 184, 166, 0.1)" />
                      </linearGradient>
                      <linearGradient id="emeraldGradientStroke" x1="0%" y1="0%" x2="100%" y2="0%">
                        <stop offset="0%" stopColor="#10b981" />
                        <stop offset="100%" stopColor="#14b8a6" />
                      </linearGradient>
                      <linearGradient id="blueGradient" x1="0%" y1="0%" x2="100%" y2="0%">
                        <stop offset="0%" stopColor="#0ea5e9" />
                        <stop offset="100%" stopColor="#06b6d4" />
                      </linearGradient>
                    </defs>
                  </svg>
                )}
              </div>
              <div className="mt-2 flex justify-center gap-6">
                <div className="flex items-center">
                  <div className="mr-2 h-3 w-3 rounded-full bg-emerald-500"></div>
                  <span className="text-xs text-slate-400">Recovery Score</span>
                </div>
                <div className="flex items-center">
                  <div className="mr-2 h-3 w-3 rounded-full bg-blue-500"></div>
                  <span className="text-xs text-slate-400">Sleep Quality</span>
                </div>
                <div className="flex items-center">
                  <div className="mr-2 h-3 w-3 rounded-full bg-purple-500"></div>
                  <span className="text-xs text-slate-400">HRV</span>
                </div>
              </div>
            </div>
          </div>

          {/* Athlete Cards */}
          <div className="p-4">
            <h4 className="mb-4 font-medium text-white">Athletes Requiring Attention</h4>
            <div className="grid grid-cols-1 gap-4 sm:grid-cols-2 lg:grid-cols-3">
              {[
                { name: "Alex Johnson", position: "Forward", recovery: 45, status: "Low HRV", trend: "down" },
                { name: "Maria Garcia", position: "Midfielder", recovery: 52, status: "Poor Sleep", trend: "down" },
                { name: "James Wilson", position: "Defender", recovery: 58, status: "High Stress", trend: "up" },
              ].map((athlete, index) => (
                <div
                  key={index}
                  className="flex items-center rounded-lg border border-slate-800 bg-slate-900 p-4 shadow-sm"
                >
                  <div className="mr-4 flex h-12 w-12 items-center justify-center rounded-full bg-slate-800 text-lg font-bold text-slate-200">
                    {athlete.name.charAt(0)}
                  </div>
                  <div className="flex-1">
                    <div className="font-medium text-white">{athlete.name}</div>
                    <div className="text-xs text-slate-400">{athlete.position}</div>
                  </div>
                  <div className="text-right">
                    <div className="flex items-center justify-end">
                      <span
                        className={`text-lg font-bold ${
                          athlete.recovery < 60
                            ? "text-red-500"
                            : athlete.recovery < 75
                              ? "text-amber-500"
                              : "text-emerald-500"
                        }`}
                      >
                        {athlete.recovery}%
                      </span>
                      <span className={`ml-1 ${athlete.trend === "up" ? "text-emerald-500" : "text-red-500"}`}>
                        {athlete.trend === "up" ? "↑" : "↓"}
                      </span>
                    </div>
                    <div className="text-xs text-slate-400">{athlete.status}</div>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </TabsContent>

        <TabsContent value="athletes" className="p-4">
          <div className="mb-4 flex flex-col space-y-4 sm:flex-row sm:items-center sm:justify-between sm:space-y-0">
            <div>
              <h4 className="font-medium text-white">Team Athletes</h4>
              <p className="text-sm text-slate-400">Monitor individual athlete recovery status and metrics</p>
            </div>
            <div className="flex items-center gap-2">
              <div className="relative">
                <input
                  type="text"
                  placeholder="Search athletes..."
                  className="h-9 w-full rounded-md border border-slate-700 bg-slate-800 px-3 py-1 text-sm text-slate-300 placeholder:text-slate-500 focus:border-emerald-600 focus:outline-none focus:ring-1 focus:ring-emerald-600"
                />
                <svg
                  className="absolute right-3 top-1/2 h-4 w-4 -translate-y-1/2 text-slate-500"
                  fill="none"
                  stroke="currentColor"
                  viewBox="0 0 24 24"
                  xmlns="http://www.w3.org/2000/svg"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth={2}
                    d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z"
                  />
                </svg>
              </div>
              <select className="h-9 rounded-md border border-slate-700 bg-slate-800 px-3 py-1 text-sm text-slate-300 focus:border-emerald-600 focus:outline-none focus:ring-1 focus:ring-emerald-600">
                <option value="all">All Positions</option>
                <option value="forward">Forwards</option>
                <option value="midfielder">Midfielders</option>
                <option value="defender">Defenders</option>
                <option value="goalkeeper">Goalkeepers</option>
              </select>
            </div>
          </div>

          <div className="grid grid-cols-1 gap-4 md:grid-cols-2 lg:grid-cols-3">
            {[
              {
                name: "Alex Johnson",
                position: "Forward",
                image: "/abstract-letter-aj.png",
                recovery: 45,
                sleep: 68,
                hrv: 52,
                readiness: 41,
                status: "At Risk",
                trend: "down",
              },
              {
                name: "Maria Garcia",
                position: "Midfielder",
                image: "/abstract-geometric-mg.png",
                recovery: 52,
                sleep: 72,
                hrv: 48,
                readiness: 55,
                status: "Caution",
                trend: "down",
              },
              {
                name: "James Wilson",
                position: "Defender",
                image: "/intertwined-letters.png",
                recovery: 58,
                sleep: 65,
                hrv: 62,
                readiness: 60,
                status: "Caution",
                trend: "up",
              },
              {
                name: "Sarah Ahmed",
                position: "Midfielder",
                image: "/abstract-geometric-sa.png",
                recovery: 78,
                sleep: 82,
                hrv: 75,
                readiness: 80,
                status: "Good",
                trend: "up",
              },
              {
                name: "David Chen",
                position: "Goalkeeper",
                image: "/dc-skyline-night.png",
                recovery: 88,
                sleep: 90,
                hrv: 85,
                readiness: 92,
                status: "Excellent",
                trend: "up",
              },
              {
                name: "Emma Thompson",
                position: "Forward",
                image: "/et-phone-home.png",
                recovery: 72,
                sleep: 75,
                hrv: 68,
                readiness: 70,
                status: "Good",
                trend: "stable",
              },
            ].map((athlete, index) => (
              <div
                key={index}
                className="rounded-lg border border-slate-800 bg-slate-900 p-4 shadow-sm transition-all duration-300 hover:border-emerald-900 hover:shadow-[0_0_15px_rgba(16,185,129,0.15)]"
              >
                <div className="mb-4 flex items-center">
                  <div className="mr-3 h-12 w-12 overflow-hidden rounded-full border border-slate-700">
                    <img
                      src={athlete.image || "/placeholder.svg"}
                      alt={athlete.name}
                      className="h-full w-full object-cover"
                    />
                  </div>
                  <div className="flex-1">
                    <div className="flex items-center justify-between">
                      <h5 className="font-medium text-white">{athlete.name}</h5>
                      <span
                        className={`ml-2 rounded-full px-2 py-1 text-xs font-medium ${
                          athlete.status === "Excellent"
                            ? "bg-emerald-900/30 text-emerald-400"
                            : athlete.status === "Good"
                              ? "bg-green-900/30 text-green-400"
                              : athlete.status === "Caution"
                                ? "bg-amber-900/30 text-amber-400"
                                : "bg-red-900/30 text-red-400"
                        }`}
                      >
                        {athlete.status}
                      </span>
                    </div>
                    <div className="text-xs text-slate-400">{athlete.position}</div>
                  </div>
                </div>

                <div className="mb-3 grid grid-cols-2 gap-2">
                  <div className="rounded-md bg-slate-800 p-2">
                    <div className="text-xs text-slate-400">Recovery</div>
                    <div className="flex items-center">
                      <span
                        className={`text-lg font-bold ${
                          athlete.recovery < 60
                            ? "text-red-500"
                            : athlete.recovery < 75
                              ? "text-amber-500"
                              : "text-emerald-500"
                        }`}
                      >
                        {athlete.recovery}%
                      </span>
                      <span
                        className={`ml-1 text-xs ${
                          athlete.trend === "up"
                            ? "text-emerald-500"
                            : athlete.trend === "down"
                              ? "text-red-500"
                              : "text-slate-400"
                        }`}
                      >
                        {athlete.trend === "up" ? "↑" : athlete.trend === "down" ? "↓" : "→"}
                      </span>
                    </div>
                  </div>
                  <div className="rounded-md bg-slate-800 p-2">
                    <div className="text-xs text-slate-400">Sleep</div>
                    <div className="text-lg font-bold text-white">{athlete.sleep}%</div>
                  </div>
                  <div className="rounded-md bg-slate-800 p-2">
                    <div className="text-xs text-slate-400">HRV</div>
                    <div className="text-lg font-bold text-white">{athlete.hrv}ms</div>
                  </div>
                  <div className="rounded-md bg-slate-800 p-2">
                    <div className="text-xs text-slate-400">Readiness</div>
                    <div className="text-lg font-bold text-white">{athlete.readiness}%</div>
                  </div>
                </div>

                <button className="w-full rounded-md border border-slate-700 bg-slate-800 py-1.5 text-sm text-slate-300 transition-colors hover:border-emerald-900 hover:bg-slate-800 hover:text-emerald-400">
                  View Details
                </button>
              </div>
            ))}
          </div>
        </TabsContent>

        <TabsContent value="insights" className="p-4">
          <div className="mb-4">
            <h4 className="font-medium text-white">AI-Generated Insights</h4>
            <p className="text-sm text-slate-400">
              Personalized recommendations based on recovery patterns and team data
            </p>
          </div>

          <div className="mb-6 rounded-lg border border-emerald-900 bg-emerald-900/10 p-4 shadow-[0_0_15px_rgba(16,185,129,0.1)]">
            <div className="mb-2 flex items-center">
              <div className="mr-3 flex h-8 w-8 items-center justify-center rounded-full bg-emerald-900">
                <svg
                  className="h-4 w-4 text-emerald-400"
                  fill="none"
                  stroke="currentColor"
                  viewBox="0 0 24 24"
                  xmlns="http://www.w3.org/2000/svg"
                >
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13 10V3L4 14h7v7l9-11h-7z" />
                </svg>
              </div>
              <h5 className="text-lg font-medium text-emerald-400">Team Recovery Alert</h5>
            </div>
            <p className="mb-3 text-slate-300">
              Team sleep quality has decreased by 8% over the past week, potentially impacting recovery rates. This
              correlates with the increased travel schedule and time zone changes.
            </p>
            <div className="rounded-md bg-emerald-900/20 p-3">
              <h6 className="mb-2 font-medium text-emerald-400">Recommended Actions:</h6>
              <ul className="ml-5 list-disc space-y-1 text-sm text-slate-300">
                <li>Implement 20-minute power naps after morning training sessions</li>
                <li>Adjust training intensity for players with sleep scores below 70%</li>
                <li>Schedule light therapy sessions for affected athletes</li>
              </ul>
            </div>
          </div>

          <div className="grid grid-cols-1 gap-4 md:grid-cols-2">
            <div className="rounded-lg border border-slate-800 bg-slate-900 p-4 shadow-sm">
              <div className="mb-3 flex items-center">
                <div className="mr-3 flex h-8 w-8 items-center justify-center rounded-full bg-slate-800">
                  <svg
                    className="h-4 w-4 text-amber-400"
                    fill="none"
                    stroke="currentColor"
                    viewBox="0 0 24 24"
                    xmlns="http://www.w3.org/2000/svg"
                  >
                    <path
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      strokeWidth={2}
                      d="M12 9v2m0 4h.01m-6.938 4h13.856c1.54 0 2.502-1.667 1.732-3L13.732 4c-.77-1.333-2.694-1.333-3.464 0L3.34 16c-.77 1.333.192 3 1.732 3z"
                    />
                  </svg>
                </div>
                <h5 className="font-medium text-white">Individual Risk Factors</h5>
              </div>
              <div className="space-y-3">
                <div className="rounded-md bg-slate-800 p-3">
                  <div className="mb-1 flex items-center justify-between">
                    <span className="font-medium text-white">Alex Johnson</span>
                    <span className="rounded-full bg-red-900/30 px-2 py-0.5 text-xs font-medium text-red-400">
                      High Risk
                    </span>
                  </div>
                  <p className="text-sm text-slate-400">
                    HRV consistently below baseline for 3 days. Sleep quality decreased by 15%.
                  </p>
                </div>
                <div className="rounded-md bg-slate-800 p-3">
                  <div className="mb-1 flex items-center justify-between">
                    <span className="font-medium text-white">Maria Garcia</span>
                    <span className="rounded-full bg-amber-900/30 px-2 py-0.5 text-xs font-medium text-amber-400">
                      Moderate Risk
                    </span>
                  </div>
                  <p className="text-sm text-slate-400">
                    Stress levels elevated after recent match. Recovery rate slower than team average.
                  </p>
                </div>
              </div>
            </div>

            <div className="rounded-lg border border-slate-800 bg-slate-900 p-4 shadow-sm">
              <div className="mb-3 flex items-center">
                <div className="mr-3 flex h-8 w-8 items-center justify-center rounded-full bg-slate-800">
                  <svg
                    className="h-4 w-4 text-blue-400"
                    fill="none"
                    stroke="currentColor"
                    viewBox="0 0 24 24"
                    xmlns="http://www.w3.org/2000/svg"
                  >
                    <path
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      strokeWidth={2}
                      d="M9 5H7a2 2 0 00-2 2v12a2 2 0 002 2h10a2 2 0 002-2V7a2 2 0 00-2-2h-2M9 5a2 2 0 002 2h2a2 2 0 002-2M9 5a2 2 0 012-2h2a2 2 0 012 2m-3 7h3m-3 4h3m-6-4h.01M9 16h.01"
                    />
                  </svg>
                </div>
                <h5 className="font-medium text-white">Recovery Protocols</h5>
              </div>
              <div className="space-y-3">
                <div className="rounded-md bg-slate-800 p-3">
                  <div className="mb-1 font-medium text-white">Cold Therapy Effectiveness</div>
                  <p className="mb-2 text-sm text-slate-400">
                    Cold therapy sessions show 18% improvement in recovery rates for defenders and midfielders.
                  </p>
                  <div className="h-2 overflow-hidden rounded-full bg-slate-700">
                    <div className="h-full bg-gradient-to-r from-blue-500 to-cyan-500" style={{ width: "78%" }}></div>
                  </div>
                </div>
                <div className="rounded-md bg-slate-800 p-3">
                  <div className="mb-1 font-medium text-white">Nutrition Impact</div>
                  <p className="mb-2 text-sm text-slate-400">
                    Athletes following the new nutrition plan show 12% higher HRV scores on average.
                  </p>
                  <div className="h-2 overflow-hidden rounded-full bg-slate-700">
                    <div
                      className="h-full bg-gradient-to-r from-emerald-500 to-green-500"
                      style={{ width: "62%" }}
                    ></div>
                  </div>
                </div>
              </div>
            </div>

            <div className="rounded-lg border border-slate-800 bg-slate-900 p-4 shadow-sm md:col-span-2">
              <div className="mb-3 flex items-center">
                <div className="mr-3 flex h-8 w-8 items-center justify-center rounded-full bg-slate-800">
                  <svg
                    className="h-4 w-4 text-purple-400"
                    fill="none"
                    stroke="currentColor"
                    viewBox="0 0 24 24"
                    xmlns="http://www.w3.org/2000/svg"
                  >
                    <path
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      strokeWidth={2}
                      d="M9.663 17h4.673M12 3v1m6.364 1.636l-.707.707M21 12h-1M4 12H3m3.343-5.657l-.707-.707m2.828 9.9a5 5 0 117.072 0l-.548.547A3.374 3.374 0 0014 18.469V19a2 2 0 11-4 0v-.531c0-.895-.356-1.754-.988-2.386l-.548-.547z"
                    />
                  </svg>
                </div>
                <h5 className="font-medium text-white">AI Prediction Model</h5>
              </div>
              <div className="rounded-md bg-slate-800 p-3">
                <p className="mb-3 text-sm text-slate-300">
                  Based on current recovery patterns, our AI model predicts the following outcomes for the upcoming
                  match:
                </p>
                <div className="grid grid-cols-1 gap-3 sm:grid-cols-3">
                  <div className="rounded-md bg-slate-700 p-2 text-center">
                    <div className="text-xs text-slate-400">Performance Readiness</div>
                    <div className="text-lg font-bold text-white">82%</div>
                    <div className="text-xs text-emerald-400">↑ 5% from last match</div>
                  </div>
                  <div className="rounded-md bg-slate-700 p-2 text-center">
                    <div className="text-xs text-slate-400">Injury Risk</div>
                    <div className="text-lg font-bold text-white">14%</div>
                    <div className="text-xs text-emerald-400">↓ 3% from last match</div>
                  </div>
                  <div className="rounded-md bg-slate-700 p-2 text-center">
                    <div className="text-xs text-slate-400">Optimal Lineup Strength</div>
                    <div className="text-lg font-bold text-white">88%</div>
                    <div className="text-xs text-emerald-400">↑ 7% from last match</div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </TabsContent>

        <TabsContent value="trends" className="p-4">
          <div className="mb-4 flex flex-col space-y-4 sm:flex-row sm:items-center sm:justify-between sm:space-y-0">
            <div>
              <h4 className="font-medium text-white">Recovery Trends</h4>
              <p className="text-sm text-slate-400">Long-term analysis of team and individual recovery metrics</p>
            </div>
            <div className="flex items-center gap-2">
              <select className="h-9 rounded-md border border-slate-700 bg-slate-800 px-3 py-1 text-sm text-slate-300 focus:border-emerald-600 focus:outline-none focus:ring-1 focus:ring-emerald-600">
                <option value="team">Team Average</option>
                <option value="position">By Position</option>
                <option value="individual">Individual</option>
              </select>
              <select className="h-9 rounded-md border border-slate-700 bg-slate-800 px-3 py-1 text-sm text-slate-300 focus:border-emerald-600 focus:outline-none focus:ring-1 focus:ring-emerald-600">
                <option value="90">Last 90 Days</option>
                <option value="30">Last 30 Days</option>
                <option value="7">Last 7 Days</option>
                <option value="season">Full Season</option>
              </select>
            </div>
          </div>

          {/* Main Chart */}
          <div className="mb-6 rounded-lg border border-slate-800 bg-slate-900 p-4 shadow-sm">
            <div className="mb-4 flex items-center justify-between">
              <h5 className="font-medium text-white">Team Recovery Score Trend</h5>
              <div className="flex gap-2">
                <button className="rounded-md border border-emerald-900 bg-emerald-900/20 px-2 py-1 text-xs font-medium text-emerald-400">
                  Recovery
                </button>
                <button className="rounded-md border border-slate-700 px-2 py-1 text-xs font-medium text-slate-400 hover:border-blue-900 hover:bg-blue-900/20 hover:text-blue-400">
                  Sleep
                </button>
                <button className="rounded-md border border-slate-700 px-2 py-1 text-xs font-medium text-slate-400 hover:border-purple-900 hover:bg-purple-900/20 hover:text-purple-400">
                  HRV
                </button>
              </div>
            </div>
            <div className="h-64">
              {loaded && (
                <svg className="h-full w-full" viewBox="0 0 800 200">
                  {/* Grid Lines */}
                  <line x1="0" y1="0" x2="800" y2="0" stroke="#334155" strokeWidth="1" />
                  <line x1="0" y1="50" x2="800" y2="50" stroke="#334155" strokeWidth="1" />
                  <line x1="0" y1="100" x2="800" y2="100" stroke="#334155" strokeWidth="1" />
                  <line x1="0" y1="150" x2="800" y2="150" stroke="#334155" strokeWidth="1" />
                  <line x1="0" y1="200" x2="800" y2="200" stroke="#334155" strokeWidth="1" />

                  {/* Vertical Grid Lines (Months) */}
                  <line x1="0" y1="0" x2="0" y2="200" stroke="#334155" strokeWidth="1" />
                  <line x1="133" y1="0" x2="133" y2="200" stroke="#334155" strokeWidth="1" />
                  <line x1="266" y1="0" x2="266" y2="200" stroke="#334155" strokeWidth="1" />
                  <line x1="399" y1="0" x2="399" y2="200" stroke="#334155" strokeWidth="1" />
                  <line x1="532" y1="0" x2="532" y2="200" stroke="#334155" strokeWidth="1" />
                  <line x1="665" y1="0" x2="665" y2="200" stroke="#334155" strokeWidth="1" />
                  <line x1="800" y1="0" x2="800" y2="200" stroke="#334155" strokeWidth="1" />

                  {/* Month Labels */}
                  <text x="66" y="220" textAnchor="middle" fill="#94a3b8" fontSize="10">
                    Jan
                  </text>
                  <text x="199" y="220" textAnchor="middle" fill="#94a3b8" fontSize="10">
                    Feb
                  </text>
                  <text x="332" y="220" textAnchor="middle" fill="#94a3b8" fontSize="10">
                    Mar
                  </text>
                  <text x="465" y="220" textAnchor="middle" fill="#94a3b8" fontSize="10">
                    Apr
                  </text>
                  <text x="598" y="220" textAnchor="middle" fill="#94a3b8" fontSize="10">
                    May
                  </text>
                  <text x="731" y="220" textAnchor="middle" fill="#94a3b8" fontSize="10">
                    Jun
                  </text>

                  {/* Recovery Score Line */}
                  <path
                    d="M0,150 C30,140 60,145 90,130 C120,115 150,110 180,100 C210,90 240,85 270,90 C300,95 330,85 360,75 C390,65 420,60 450,70 C480,80 510,75 540,65 C570,55 600,60 630,50 C660,40 690,45 720,35 C750,25 780,30 800,20"
                    fill="none"
                    stroke="url(#emeraldGradientStroke)"
                    strokeWidth="3"
                  />

                  {/* Recovery Score Area */}
                  <path
                    d="M0,150 C30,140 60,145 90,130 C120,115 150,110 180,100 C210,90 240,85 270,90 C300,95 330,85 360,75 C390,65 420,60 450,70 C480,80 510,75 540,65 C570,55 600,60 630,50 C660,40 690,45 720,35 C750,25 780,30 800,20 L800,200 L0,200 Z"
                    fill="url(#emeraldGradientFill)"
                    opacity="0.2"
                  />

                  {/* Match Day Indicators */}
                  <circle cx="90" cy="130" r="4" fill="#f97316" />
                  <circle cx="210" cy="90" r="4" fill="#f97316" />
                  <circle cx="330" cy="85" r="4" fill="#f97316" />
                  <circle cx="450" cy="70" r="4" fill="#f97316" />
                  <circle cx="570" cy="55" r="4" fill="#f97316" />
                  <circle cx="690" cy="45" r="4" fill="#f97316" />

                  {/* Injury Period */}
                  <rect x="240" y="0" width="60" height="200" fill="rgba(220, 38, 38, 0.1)" />

                  <defs>
                    <linearGradient id="emeraldGradientFill" x1="0%" y1="0%" x2="100%" y2="0%">
                      <stop offset="0%" stopColor="rgba(16, 185, 129, 0.1)" />
                      <stop offset="100%" stopColor="rgba(20, 184, 166, 0.1)" />
                    </linearGradient>
                    <linearGradient id="emeraldGradientStroke" x1="0%" y1="0%" x2="100%" y2="0%">
                      <stop offset="0%" stopColor="#10b981" />
                      <stop offset="100%" stopColor="#14b8a6" />
                    </linearGradient>
                  </defs>
                </svg>
              )}
            </div>
            <div className="mt-2 flex flex-wrap justify-center gap-4">
              <div className="flex items-center">
                <div className="mr-2 h-3 w-3 rounded-full bg-gradient-to-r from-emerald-500 to-teal-500"></div>
                <span className="text-xs text-slate-400">Recovery Score</span>
              </div>
              <div className="flex items-center">
                <div className="mr-2 h-3 w-3 rounded-full bg-orange-500"></div>
                <span className="text-xs text-slate-400">Match Days</span>
              </div>
              <div className="flex items-center">
                <div className="mr-2 h-3 w-3 rounded-full bg-red-500"></div>
                <span className="text-xs text-slate-400">Injury Period</span>
              </div>
            </div>
          </div>

          <div className="grid grid-cols-1 gap-4 md:grid-cols-2">
            {/* Recovery by Position */}
            <div className="rounded-lg border border-slate-800 bg-slate-900 p-4 shadow-sm">
              <h5 className="mb-4 font-medium text-white">Recovery by Position</h5>
              <div className="space-y-4">
                <div>
                  <div className="mb-1 flex items-center justify-between">
                    <span className="text-sm text-slate-300">Forwards</span>
                    <span className="text-sm font-medium text-white">72%</span>
                  </div>
                  <div className="h-2 overflow-hidden rounded-full bg-slate-800">
                    <div
                      className="h-full bg-gradient-to-r from-emerald-500 to-teal-500"
                      style={{ width: "72%" }}
                    ></div>
                  </div>
                </div>
                <div>
                  <div className="mb-1 flex items-center justify-between">
                    <span className="text-sm text-slate-300">Midfielders</span>
                    <span className="text-sm font-medium text-white">68%</span>
                  </div>
                  <div className="h-2 overflow-hidden rounded-full bg-slate-800">
                    <div
                      className="h-full bg-gradient-to-r from-emerald-500 to-teal-500"
                      style={{ width: "68%" }}
                    ></div>
                  </div>
                </div>
                <div>
                  <div className="mb-1 flex items-center justify-between">
                    <span className="text-sm text-slate-300">Defenders</span>
                    <span className="text-sm font-medium text-white">75%</span>
                  </div>
                  <div className="h-2 overflow-hidden rounded-full bg-slate-800">
                    <div
                      className="h-full bg-gradient-to-r from-emerald-500 to-teal-500"
                      style={{ width: "75%" }}
                    ></div>
                  </div>
                </div>
                <div>
                  <div className="mb-1 flex items-center justify-between">
                    <span className="text-sm text-slate-300">Goalkeepers</span>
                    <span className="text-sm font-medium text-white">82%</span>
                  </div>
                  <div className="h-2 overflow-hidden rounded-full bg-slate-800">
                    <div
                      className="h-full bg-gradient-to-r from-emerald-500 to-teal-500"
                      style={{ width: "82%" }}
                    ></div>
                  </div>
                </div>
              </div>
            </div>

            {/* Workload vs Recovery */}
            <div className="rounded-lg border border-slate-800 bg-slate-900 p-4 shadow-sm">
              <h5 className="mb-4 font-medium text-white">Workload vs Recovery Correlation</h5>
              <div className="h-48">
                {loaded && (
                  <svg className="h-full w-full" viewBox="0 0 300 150">
                    {/* Grid Lines */}
                    <line x1="30" y1="0" x2="30" y2="120" stroke="#334155" strokeWidth="1" />
                    <line x1="30" y1="120" x2="300" y2="120" stroke="#334155" strokeWidth="1" />
                    <line x1="30" y1="0" x2="300" y2="0" stroke="#334155" strokeWidth="1" />
                    <line x1="30" y1="30" x2="300" y2="30" stroke="#334155" strokeWidth="1" />
                    <line x1="30" y1="60" x2="300" y2="60" stroke="#334155" strokeWidth="1" />
                    <line x1="30" y1="90" x2="300" y2="90" stroke="#334155" strokeWidth="1" />
                    <line x1="90" y1="0" x2="90" y2="120" stroke="#334155" strokeWidth="1" />
                    <line x1="150" y1="0" x2="150" y2="120" stroke="#334155" strokeWidth="1" />
                    <line x1="210" y1="0" x2="210" y2="120" stroke="#334155" strokeWidth="1" />
                    <line x1="270" y1="0" x2="270" y2="120" stroke="#334155" strokeWidth="1" />

                    {/* Axis Labels */}
                    <text x="15" y="120" textAnchor="middle" fill="#94a3b8" fontSize="10">
                      0
                    </text>
                    <text x="15" y="90" textAnchor="middle" fill="#94a3b8" fontSize="10">
                      25
                    </text>
                    <text x="15" y="60" textAnchor="middle" fill="#94a3b8" fontSize="10">
                      50
                    </text>
                    <text x="15" y="30" textAnchor="middle" fill="#94a3b8" fontSize="10">
                      75
                    </text>
                    <text x="15" y="0" textAnchor="middle" fill="#94a3b8" fontSize="10">
                      100
                    </text>

                    <text x="30" y="135" textAnchor="middle" fill="#94a3b8" fontSize="10">
                      0
                    </text>
                    <text x="90" y="135" textAnchor="middle" fill="#94a3b8" fontSize="10">
                      25
                    </text>
                    <text x="150" y="135" textAnchor="middle" fill="#94a3b8" fontSize="10">
                      50
                    </text>
                    <text x="210" y="135" textAnchor="middle" fill="#94a3b8" fontSize="10">
                      75
                    </text>
                    <text x="270" y="135" textAnchor="middle" fill="#94a3b8" fontSize="10">
                      100
                    </text>

                    <text x="165" y="148" textAnchor="middle" fill="#94a3b8" fontSize="10">
                      Workload Intensity (%)
                    </text>

                    <text
                      x="10"
                      y="60"
                      textAnchor="middle"
                      fill="#94a3b8"
                      fontSize="10"
                      transform="rotate(-90, 10, 60)"
                    >
                      Recovery Score (%)
                    </text>

                    {/* Data Points */}
                    <circle cx="60" cy="30" r="5" fill="rgba(16, 185, 129, 0.7)" />
                    <circle cx="90" cy="45" r="5" fill="rgba(16, 185, 129, 0.7)" />
                    <circle cx="120" cy="40" r="5" fill="rgba(16, 185, 129, 0.7)" />
                    <circle cx="150" cy="60" r="5" fill="rgba(16, 185, 129, 0.7)" />
                    <circle cx="180" cy="75" r="5" fill="rgba(16, 185, 129, 0.7)" />
                    <circle cx="210" cy="90" r="5" fill="rgba(16, 185, 129, 0.7)" />
                    <circle cx="240" cy="100" r="5" fill="rgba(16, 185, 129, 0.7)" />

                    {/* Trend Line */}
                    <line x1="60" y1="30" x2="240" y2="100" stroke="#10b981" strokeWidth="2" strokeDasharray="5,5" />
                  </svg>
                )}
              </div>
              <div className="mt-2 text-center text-xs text-slate-400">
                Higher workload intensity correlates with lower recovery scores (r = -0.82)
              </div>
            </div>

            {/* Sleep Quality Trend */}
            <div className="rounded-lg border border-slate-800 bg-slate-900 p-4 shadow-sm">
              <h5 className="mb-4 font-medium text-white">Sleep Quality Trend</h5>
              <div className="h-48">
                {loaded && (
                  <svg className="h-full w-full" viewBox="0 0 300 150">
                    {/* Grid Lines */}
                    <line x1="30" y1="0" x2="30" y2="120" stroke="#334155" strokeWidth="1" />
                    <line x1="30" y1="120" x2="300" y2="120" stroke="#334155" strokeWidth="1" />
                    <line x1="30" y1="0" x2="300" y2="0" stroke="#334155" strokeWidth="1" />
                    <line x1="30" y1="30" x2="300" y2="30" stroke="#334155" strokeWidth="1" />
                    <line x1="30" y1="60" x2="300" y2="60" stroke="#334155" strokeWidth="1" />
                    <line x1="30" y1="90" x2="300" y2="90" stroke="#334155" strokeWidth="1" />

                    {/* Week Indicators */}
                    <line x1="70" y1="120" x2="70" y2="125" stroke="#94a3b8" strokeWidth="1" />
                    <line x1="110" y1="120" x2="110" y2="125" stroke="#94a3b8" strokeWidth="1" />
                    <line x1="150" y1="120" x2="150" y2="125" stroke="#94a3b8" strokeWidth="1" />
                    <line x1="190" y1="120" x2="190" y2="125" stroke="#94a3b8" strokeWidth="1" />
                    <line x1="230" y1="120" x2="230" y2="125" stroke="#94a3b8" strokeWidth="1" />
                    <line x1="270" y1="120" x2="270" y2="125" stroke="#94a3b8" strokeWidth="1" />

                    <text x="70" y="135" textAnchor="middle" fill="#94a3b8" fontSize="8">
                      Week 1
                    </text>
                    <text x="110" y="135" textAnchor="middle" fill="#94a3b8" fontSize="8">
                      Week 2
                    </text>
                    <text x="150" y="135" textAnchor="middle" fill="#94a3b8" fontSize="8">
                      Week 3
                    </text>
                    <text x="190" y="135" textAnchor="middle" fill="#94a3b8" fontSize="8">
                      Week 4
                    </text>
                    <text x="230" y="135" textAnchor="middle" fill="#94a3b8" fontSize="8">
                      Week 5
                    </text>
                    <text x="270" y="135" textAnchor="middle" fill="#94a3b8" fontSize="8">
                      Week 6
                    </text>

                    {/* Sleep Quality Line */}
                    <path
                      d="M30,60 L70,50 L110,65 L150,45 L190,55 L230,40 L270,30"
                      fill="none"
                      stroke="url(#blueGradient)"
                      strokeWidth="3"
                    />

                    {/* Sleep Efficiency Line */}
                    <path
                      d="M30,70 L70,65 L110,75 L150,60 L190,70 L230,55 L270,50"
                      fill="none"
                      stroke="#8b5cf6"
                      strokeWidth="2"
                      strokeDasharray="5,5"
                    />

                    <defs>
                      <linearGradient id="blueGradient" x1="0%" y1="0%" x2="100%" y2="0%">
                        <stop offset="0%" stopColor="#0ea5e9" />
                        <stop offset="100%" stopColor="#06b6d4" />
                      </linearGradient>
                    </defs>
                  </svg>
                )}
              </div>
              <div className="mt-2 flex justify-center gap-4">
                <div className="flex items-center">
                  <div className="mr-2 h-3 w-3 rounded-full bg-gradient-to-r from-blue-500 to-cyan-500"></div>
                  <span className="text-xs text-slate-400">Sleep Quality</span>
                </div>
                <div className="flex items-center">
                  <div className="mr-2 h-3 w-3 rounded-full bg-purple-500"></div>
                  <span className="text-xs text-slate-400">Sleep Efficiency</span>
                </div>
              </div>
            </div>

            {/* HRV Distribution */}
            <div className="rounded-lg border border-slate-800 bg-slate-900 p-4 shadow-sm">
              <h5 className="mb-4 font-medium text-white">HRV Distribution</h5>
              <div className="h-48">
                {loaded && (
                  <svg className="h-full w-full" viewBox="0 0 300 150">
                    {/* Grid Lines */}
                    <line x1="40" y1="0" x2="40" y2="120" stroke="#334155" strokeWidth="1" />
                    <line x1="40" y1="120" x2="300" y2="120" stroke="#334155" strokeWidth="1" />
                    <line x1="40" y1="0" x2="300" y2="0" stroke="#334155" strokeWidth="1" />
                    <line x1="40" y1="30" x2="300" y2="30" stroke="#334155" strokeWidth="1" />
                    <line x1="40" y1="60" x2="300" y2="60" stroke="#334155" strokeWidth="1" />
                    <line x1="40" y1="90" x2="300" y2="90" stroke="#334155" strokeWidth="1" />

                    {/* Bars */}
                    <rect x="50" y="90" width="30" height="30" fill="rgba(139, 92, 246, 0.5)" />
                    <rect x="90" y="70" width="30" height="50" fill="rgba(139, 92, 246, 0.5)" />
                    <rect x="130" y="40" width="30" height="80" fill="rgba(139, 92, 246, 0.5)" />
                    <rect x="170" y="20" width="30" height="100" fill="rgba(139, 92, 246, 0.5)" />
                    <rect x="210" y="50" width="30" height="70" fill="rgba(139, 92, 246, 0.5)" />
                    <rect x="250" y="80" width="30" height="40" fill="rgba(139, 92, 246, 0.5)" />

                    {/* X-Axis Labels */}
                    <text x="65" y="135" textAnchor="middle" fill="#94a3b8" fontSize="9">
                      &lt;40ms
                    </text>
                    <text x="105" y="135" textAnchor="middle" fill="#94a3b8" fontSize="9">
                      40-50ms
                    </text>
                    <text x="145" y="135" textAnchor="middle" fill="#94a3b8" fontSize="9">
                      50-60ms
                    </text>
                    <text x="185" y="135" textAnchor="middle" fill="#94a3b8" fontSize="9">
                      60-70ms
                    </text>
                    <text x="225" y="135" textAnchor="middle" fill="#94a3b8" fontSize="9">
                      70-80ms
                    </text>
                    <text x="265" y="135" textAnchor="middle" fill="#94a3b8" fontSize="9">
                      &gt;80ms
                    </text>

                    {/* Normal Range Indicator */}
                    <rect x="130" y="0" width="110" height="120" fill="rgba(16, 185, 129, 0.1)" />
                    <text x="185" y="10" textAnchor="middle" fill="#10b981" fontSize="8">
                      Normal Range
                    </text>
                  </svg>
                )}
              </div>
              <div className="mt-2 text-center text-xs text-slate-400">
                Distribution of Heart Rate Variability (HRV) across the team
              </div>
            </div>
          </div>
        </TabsContent>
      </Tabs>
    </div>
  )
}

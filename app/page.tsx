import { ArrowRight, BarChart3, Brain, Zap, Activity, Clock, Bell, Check, LineChart } from "lucide-react"
import { Button } from "@/components/ui/button"
import FeatureCard from "@/components/feature-card"
import StatsCounter from "@/components/stats-counter"
import TestimonialSlider from "@/components/testimonial-slider"
import GradientBackground from "@/components/gradient-background"
import Link from "next/link"
import ModernHero from "@/components/modern-hero"
import ScrollAnimation from "@/components/scroll-animation"
import StaggeredAnimation from "@/components/staggered-animation"
import FlowingLinesBackground from "@/components/flowing-lines-background"
import AbstractDataVisualization from "@/components/abstract-data-visualization"
import RecoveryTrackingVisualization from "@/components/recovery-tracking-visualization"
import AINetworkVisualization from "@/components/ai-networkVisualization"

export default function Home() {
  return (
    <div className="flex min-h-screen flex-col bg-slate-950">
      {/* Modern Hero Section */}
      <ModernHero />

      {/* Stats Section */}
      <section className="relative bg-slate-900 py-16">
        <div className="absolute inset-0 opacity-10">
          <GradientBackground />
        </div>
        <div className="container relative z-10 mx-auto px-4 sm:px-6 lg:px-8">
          <ScrollAnimation variant="slideUp">
            <div className="mx-auto grid max-w-6xl grid-cols-1 gap-8 md:grid-cols-3">
              <StatsCounter
                value="€2.3B+"
                label="Lost in athlete salary due to injuries"
                description="Across Europe's Top 5 Leagues in the past four seasons"
              />
              <StatsCounter
                value="22"
                label="Hours of recovery data"
                description="The critical time outside of training that impacts performance"
              />
              <StatsCounter
                value="30%"
                label="Potential reduction in downtime"
                description="With personalized recovery protocols based on AI insights"
              />
            </div>
          </ScrollAnimation>
        </div>
      </section>

      {/* Problem Solution Section */}
      <section className="relative bg-slate-950 py-20">
        <div className="absolute inset-0 opacity-5">
          <div className="h-full w-full bg-[radial-gradient(ellipse_at_center,_var(--tw-gradient-stops))] from-emerald-700 via-transparent to-transparent"></div>
        </div>
        <div className="container relative z-10 mx-auto px-4 sm:px-6 lg:px-8">
          <ScrollAnimation variant="fadeScale">
            <div className="mx-auto max-w-3xl text-center">
              <h2 className="bg-gradient-to-r from-emerald-400 to-teal-400 bg-clip-text text-3xl font-bold tracking-tight text-transparent sm:text-4xl">
                The Problem with Athlete Recovery
              </h2>
              <p className="mt-4 text-lg text-slate-300">
                While workload monitoring is standard, recovery—the other 22 hours of an athlete's day—remains a black
                box, leading to billions in lost value.
              </p>
            </div>
          </ScrollAnimation>

          <StaggeredAnimation className="mt-16 grid gap-8 md:grid-cols-2 lg:grid-cols-3" staggerDelay={0.15}>
            <FeatureCard
              icon={<BarChart3 className="h-10 w-10 text-emerald-400" />}
              title="Bridge the Data Gap"
              description="Visualize data from athlete's wearables while putting athletes in control of their data sharing and privacy rights."
            />
            <FeatureCard
              icon={<Brain className="h-10 w-10 text-emerald-400" />}
              title="AI-Powered Recovery Profiles"
              description="Link behavioral data and health metrics to build a personalized network of factors that impact recovery."
            />
            <FeatureCard
              icon={<Zap className="h-10 w-10 text-emerald-400" />}
              title="Personalized Recovery"
              description="Predict and simulate recovery protocols to accelerate recovery timelines and return athletes to peak performance faster."
            />
          </StaggeredAnimation>
        </div>
      </section>

      {/* Track, Analyze, Predict Section Header */}
      <section className="relative bg-slate-950 py-16">
        <div className="absolute inset-0 opacity-5">
          <FlowingLinesBackground />
        </div>
        <div className="container relative z-10 mx-auto px-4 sm:px-6 lg:px-8">
          <ScrollAnimation variant="fadeScale">
            <div className="mx-auto max-w-4xl text-center">
              <h2 className="bg-gradient-to-r from-emerald-400 via-teal-400 to-cyan-400 bg-clip-text text-4xl font-bold tracking-tight text-transparent sm:text-5xl">
                The Amatra Recovery Platform
              </h2>
              <p className="mt-6 text-xl text-slate-300">
                Our comprehensive approach transforms athlete recovery through a seamless three-step process
              </p>

              <div className="mt-12 grid grid-cols-1 gap-8 md:grid-cols-3">
                <div className="flex flex-col items-center">
                  <div className="flex h-16 w-16 items-center justify-center rounded-full bg-emerald-900/30 text-emerald-400 mb-4">
                    <Activity className="h-8 w-8" />
                  </div>
                  <h3 className="text-xl font-bold text-white">Track</h3>
                  <p className="mt-2 text-center text-slate-400">Collect comprehensive recovery metrics in real-time</p>
                </div>

                <div className="flex flex-col items-center">
                  <div className="flex h-16 w-16 items-center justify-center rounded-full bg-teal-900/30 text-teal-400 mb-4">
                    <Brain className="h-8 w-8" />
                  </div>
                  <h3 className="text-xl font-bold text-white">Analyze</h3>
                  <p className="mt-2 text-center text-slate-400">Process data with AI to identify recovery patterns</p>
                </div>

                <div className="flex flex-col items-center">
                  <div className="flex h-16 w-16 items-center justify-center rounded-full bg-cyan-900/30 text-cyan-400 mb-4">
                    <LineChart className="h-8 w-8" />
                  </div>
                  <h3 className="text-xl font-bold text-white">Predict</h3>
                  <p className="mt-2 text-center text-slate-400">Forecast risks and optimize training protocols</p>
                </div>
              </div>
            </div>
          </ScrollAnimation>
        </div>
      </section>

      {/* Recovery Tracking Section */}
      <section className="relative bg-slate-900 py-20 overflow-hidden">
        <div className="absolute inset-0 opacity-10">
          <GradientBackground variant="emerald" />
        </div>
        <div className="container relative z-10 mx-auto px-4 sm:px-6 lg:px-8">
          <ScrollAnimation variant="fadeScale">
            <div className="mx-auto max-w-3xl text-center mb-12">
              <div className="inline-flex items-center justify-center rounded-full bg-emerald-900/30 px-4 py-1 text-sm text-emerald-400 mb-4">
                <Activity className="mr-2 h-4 w-4" />
                Step 1: Track
              </div>
              <h2 className="bg-gradient-to-r from-emerald-400 to-teal-400 bg-clip-text text-3xl font-bold tracking-tight text-transparent sm:text-4xl">
                Comprehensive Recovery Tracking
              </h2>
              <p className="mt-4 text-lg text-slate-300">
                Monitor key recovery metrics in real-time and identify trends that impact athlete performance.
              </p>
            </div>
          </ScrollAnimation>

          <div className="flex flex-col items-center gap-12 lg:flex-row-reverse">
            <div className="w-full lg:w-1/2">
              <ScrollAnimation variant="slideLeft">
                <div className="space-y-6">
                  <h3 className="text-2xl font-bold text-white">Real-Time Recovery Monitoring</h3>
                  <p className="text-lg text-slate-300">
                    Track critical recovery metrics from wearables and behavioral inputs to create a complete picture of
                    athlete readiness.
                  </p>
                  <ul className="space-y-4">
                    <li className="flex items-start">
                      <div className="mr-3 flex h-10 w-10 flex-shrink-0 items-center justify-center rounded-full bg-emerald-900/30 text-emerald-400">
                        <Activity className="h-5 w-5" />
                      </div>
                      <div>
                        <h4 className="text-lg font-medium text-white">Heart Rate Variability</h4>
                        <p className="text-slate-300">Monitor autonomic nervous system balance and recovery status</p>
                      </div>
                    </li>
                    <li className="flex items-start">
                      <div className="mr-3 flex h-10 w-10 flex-shrink-0 items-center justify-center rounded-full bg-emerald-900/30 text-emerald-400">
                        <Clock className="h-5 w-5" />
                      </div>
                      <div>
                        <h4 className="text-lg font-medium text-white">Sleep Quality Analysis</h4>
                        <p className="text-slate-300">Track sleep stages, efficiency, and consistency patterns</p>
                      </div>
                    </li>
                    <li className="flex items-start">
                      <div className="mr-3 flex h-10 w-10 flex-shrink-0 items-center justify-center rounded-full bg-emerald-900/30 text-emerald-400">
                        <Bell className="h-5 w-5" />
                      </div>
                      <div>
                        <h4 className="text-lg font-medium text-white">Recovery Alerts</h4>
                        <p className="text-slate-300">Receive notifications when metrics deviate from normal ranges</p>
                      </div>
                    </li>
                  </ul>
                </div>
              </ScrollAnimation>
            </div>
            <div className="w-full lg:w-1/2">
              <ScrollAnimation variant="slideRight">
                <div className="overflow-hidden rounded-xl border border-slate-800 bg-slate-950 shadow-[0_0_25px_rgba(16,185,129,0.1)]">
                  <RecoveryTrackingVisualization />
                </div>
              </ScrollAnimation>
            </div>
          </div>
        </div>
      </section>

      {/* AI-Powered Recovery Analysis Section */}
      <section className="relative bg-slate-950 py-20 overflow-hidden">
        <div className="absolute inset-0 opacity-5">
          <FlowingLinesBackground />
        </div>
        <div className="container relative z-10 mx-auto px-4 sm:px-6 lg:px-8">
          <ScrollAnimation variant="fadeScale">
            <div className="mx-auto max-w-3xl text-center mb-12">
              <div className="inline-flex items-center justify-center rounded-full bg-teal-900/30 px-4 py-1 text-sm text-teal-400 mb-4">
                <Brain className="mr-2 h-4 w-4" />
                Step 2: Analyze
              </div>
              <h2 className="bg-gradient-to-r from-teal-400 to-cyan-400 bg-clip-text text-3xl font-bold tracking-tight text-transparent sm:text-4xl">
                AI-Powered Recovery Analysis
              </h2>
              <p className="mt-4 text-lg text-slate-300">
                Our proprietary algorithms analyze millions of data points to identify recovery patterns and provide
                actionable insights.
              </p>
            </div>
          </ScrollAnimation>

          <div className="flex flex-col items-center gap-12 lg:flex-row">
            <div className="w-full lg:w-1/2">
              <ScrollAnimation variant="slideRight">
                <div className="space-y-6">
                  <h3 className="text-2xl font-bold text-white">Advanced AI Analysis</h3>
                  <p className="text-lg text-slate-300">
                    Our machine learning models identify patterns and correlations that human analysis might miss.
                  </p>
                  <ul className="space-y-3">
                    <li className="flex items-start">
                      <div className="mr-3 flex h-6 w-6 flex-shrink-0 items-center justify-center rounded-full bg-teal-900/30 text-teal-400">
                        <Check className="h-4 w-4" />
                      </div>
                      <span className="text-slate-300">
                        Bespoke machine learning models for personalized recovery networks
                      </span>
                    </li>
                    <li className="flex items-start">
                      <div className="mr-3 flex h-6 w-6 flex-shrink-0 items-center justify-center rounded-full bg-teal-900/30 text-teal-400">
                        <Check className="h-4 w-4" />
                      </div>
                      <span className="text-slate-300">Statistical and causal correlation analysis</span>
                    </li>
                    <li className="flex items-start">
                      <div className="mr-3 flex h-6 w-6 flex-shrink-0 items-center justify-center rounded-full bg-teal-900/30 text-teal-400">
                        <Check className="h-4 w-4" />
                      </div>
                      <span className="text-slate-300">Anomaly detection to identify potential issues early</span>
                    </li>
                    <li className="flex items-start">
                      <div className="mr-3 flex h-6 w-6 flex-shrink-0 items-center justify-center rounded-full bg-teal-900/30 text-teal-400">
                        <Check className="h-4 w-4" />
                      </div>
                      <span className="text-slate-300">Continuous learning from team and individual data</span>
                    </li>
                    <li className="flex items-start">
                      <div className="mr-3 flex h-6 w-6 flex-shrink-0 items-center justify-center rounded-full bg-teal-900/30 text-teal-400">
                        <Check className="h-4 w-4" />
                      </div>
                      <span className="text-slate-300">Behavioral factor impact assessment</span>
                    </li>
                  </ul>
                </div>
              </ScrollAnimation>
            </div>
            <div className="w-full lg:w-1/2">
              <ScrollAnimation variant="slideLeft">
                <div className="overflow-hidden rounded-xl border border-slate-800 bg-slate-950 shadow-[0_0_25px_rgba(20,184,166,0.1)]">
                  <div className="border-b border-slate-800 bg-slate-900 p-3">
                    <div className="flex items-center">
                      <div className="mr-2 h-3 w-3 rounded-full bg-red-500"></div>
                      <div className="mr-2 h-3 w-3 rounded-full bg-yellow-500"></div>
                      <div className="h-3 w-3 rounded-full bg-green-500"></div>
                      <div className="ml-4 text-xs font-medium text-slate-400">AI Analysis Engine</div>
                    </div>
                  </div>
                  <div className="p-6">
                    <div className="mb-6">
                      <h4 className="mb-4 text-sm font-medium text-teal-400">Personalized Recovery Network</h4>
                      <div className="relative h-64 w-full rounded-lg border border-slate-800 bg-slate-900 p-4">
                        <AINetworkVisualization />
                      </div>
                    </div>
                    <div>
                      <h4 className="mb-4 text-sm font-medium text-teal-400">Causal Factors</h4>
                      <div className="space-y-4">
                        <div className="rounded-lg border border-slate-800 bg-slate-900 p-4">
                          <div className="flex items-center justify-between mb-2">
                            <span className="text-sm text-slate-300">Caffeine after 3pm</span>
                            <span className="text-sm text-red-400">-12%</span>
                          </div>
                          <div className="h-2 w-full rounded-full bg-slate-800">
                            <div className="h-full w-[87%] rounded-full bg-red-500"></div>
                          </div>
                          <div className="mt-1 text-right text-xs text-slate-500">87% confidence</div>
                        </div>
                        <div className="rounded-lg border border-slate-800 bg-slate-900 p-4">
                          <div className="flex items-center justify-between mb-2">
                            <span className="text-sm text-slate-300">Poor Sleep Quality</span>
                            <span className="text-sm text-red-400">-18%</span>
                          </div>
                          <div className="h-2 w-full rounded-full bg-slate-800">
                            <div className="h-full w-[92%] rounded-full bg-red-500"></div>
                          </div>
                          <div className="mt-1 text-right text-xs text-slate-500">92% confidence</div>
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
              </ScrollAnimation>
            </div>
          </div>
        </div>
      </section>

      {/* Predictive Recovery Intelligence Section */}
      <section className="relative bg-slate-900 py-20 overflow-hidden">
        <div className="absolute inset-0 opacity-10">
          <GradientBackground variant="cyan" />
        </div>
        <div className="container relative z-10 mx-auto px-4 sm:px-6 lg:px-8">
          <ScrollAnimation variant="fadeScale">
            <div className="mx-auto max-w-3xl text-center mb-12">
              <div className="inline-flex items-center justify-center rounded-full bg-cyan-900/30 px-4 py-1 text-sm text-cyan-400 mb-4">
                <LineChart className="mr-2 h-4 w-4" />
                Step 3: Predict
              </div>
              <h2 className="bg-gradient-to-r from-cyan-400 to-blue-400 bg-clip-text text-3xl font-bold tracking-tight text-transparent sm:text-4xl">
                Predictive Recovery Intelligence
              </h2>
              <p className="mt-4 text-lg text-slate-300">
                Forecast injury risks and optimize training loads with our advanced predictive analytics engine.
              </p>
            </div>
          </ScrollAnimation>

          <div className="flex flex-col items-center gap-12 lg:flex-row-reverse">
            <div className="w-full lg:w-1/2">
              <ScrollAnimation variant="slideLeft">
                <div className="space-y-6">
                  <h3 className="text-2xl font-bold text-white">Proactive Risk Management</h3>
                  <p className="text-lg text-slate-300">
                    Stay ahead of potential issues with AI-powered forecasting and scenario modeling.
                  </p>
                  <ul className="space-y-3">
                    <li className="flex items-start">
                      <div className="mr-3 flex h-6 w-6 flex-shrink-0 items-center justify-center rounded-full bg-cyan-900/30 text-cyan-400">
                        <Check className="h-4 w-4" />
                      </div>
                      <span className="text-slate-300">Injury risk prediction based on recovery patterns</span>
                    </li>
                    <li className="flex items-start">
                      <div className="mr-3 flex h-6 w-6 flex-shrink-0 items-center justify-center rounded-full bg-cyan-900/30 text-cyan-400">
                        <Check className="h-4 w-4" />
                      </div>
                      <span className="text-slate-300">Optimal training load recommendations</span>
                    </li>
                    <li className="flex items-start">
                      <div className="mr-3 flex h-6 w-6 flex-shrink-0 items-center justify-center rounded-full bg-cyan-900/30 text-cyan-400">
                        <Check className="h-4 w-4" />
                      </div>
                      <span className="text-slate-300">Performance readiness forecasting</span>
                    </li>
                    <li className="flex items-start">
                      <div className="mr-3 flex h-6 w-6 flex-shrink-0 items-center justify-center rounded-full bg-cyan-900/30 text-cyan-400">
                        <Check className="h-4 w-4" />
                      </div>
                      <span className="text-slate-300">Scenario modeling for different recovery protocols</span>
                    </li>
                    <li className="flex items-start">
                      <div className="mr-3 flex h-6 w-6 flex-shrink-0 items-center justify-center rounded-full bg-cyan-900/30 text-cyan-400">
                        <Check className="h-4 w-4" />
                      </div>
                      <span className="text-slate-300">Long-term trend analysis and seasonal planning</span>
                    </li>
                  </ul>
                </div>
              </ScrollAnimation>
            </div>
            <div className="w-full lg:w-1/2">
              <ScrollAnimation variant="slideRight">
                <div className="overflow-hidden rounded-xl border border-slate-800 bg-slate-950 shadow-[0_0_25px_rgba(6,182,212,0.1)]">
                  <div className="border-b border-slate-800 bg-slate-900 p-3">
                    <div className="flex items-center">
                      <div className="mr-2 h-3 w-3 rounded-full bg-red-500"></div>
                      <div className="mr-2 h-3 w-3 rounded-full bg-yellow-500"></div>
                      <div className="h-3 w-3 rounded-full bg-green-500"></div>
                      <div className="ml-4 text-xs font-medium text-slate-400">Predictive Analytics</div>
                    </div>
                  </div>
                  <div className="p-6">
                    <div className="mb-6">
                      <div className="flex items-center justify-between mb-2">
                        <h4 className="text-sm font-medium text-cyan-400">Injury Risk Forecast</h4>
                        <span className="text-xs text-slate-400">Next 7 Days</span>
                      </div>
                      <div className="mb-2 h-8 w-full rounded-lg bg-slate-800 overflow-hidden">
                        <div
                          className="h-full w-[35%] bg-gradient-to-r from-cyan-500 to-emerald-500 transition-all duration-1000"
                          style={{
                            animationName: "pulse",
                            animationDuration: "2s",
                            animationIterationCount: "infinite",
                          }}
                        ></div>
                      </div>
                      <div className="flex justify-between text-xs text-slate-400">
                        <span>Low Risk</span>
                        <span>Medium Risk</span>
                        <span>High Risk</span>
                      </div>
                      <div className="mt-2 text-center text-sm font-medium text-white">Current Risk: Low (35%)</div>
                    </div>
                    <div>
                      <h4 className="mb-4 text-sm font-medium text-cyan-400">Contributing Factors</h4>
                      <div className="space-y-4">
                        <div className="rounded-lg border border-slate-800 bg-slate-900 p-4">
                          <div className="flex items-center justify-between mb-2">
                            <span className="text-sm text-slate-300">Sleep Quality</span>
                            <span className="text-sm text-emerald-400">+15%</span>
                          </div>
                          <div className="h-2 w-full rounded-full bg-slate-800">
                            <div className="h-full w-[75%] rounded-full bg-emerald-500"></div>
                          </div>
                        </div>
                        <div className="rounded-lg border border-slate-800 bg-slate-900 p-4">
                          <div className="flex items-center justify-between mb-2">
                            <span className="text-sm text-slate-300">Training Load</span>
                            <span className="text-sm text-red-400">-8%</span>
                          </div>
                          <div className="h-2 w-full rounded-full bg-slate-800">
                            <div className="h-full w-[45%] rounded-full bg-red-500"></div>
                          </div>
                        </div>
                        <div className="rounded-lg border border-slate-800 bg-slate-900 p-4">
                          <div className="flex items-center justify-between mb-2">
                            <span className="text-sm text-slate-300">Recovery Score</span>
                            <span className="text-sm text-emerald-400">+12%</span>
                          </div>
                          <div className="h-2 w-full rounded-full bg-slate-800">
                            <div className="h-full w-[65%] rounded-full bg-emerald-500"></div>
                          </div>
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
              </ScrollAnimation>
            </div>
          </div>
        </div>
      </section>

      {/* Testimonials */}
      <section className="relative bg-slate-900 py-20">
        <div className="absolute inset-0 opacity-10">
          <AbstractDataVisualization variant="wave" className="h-full w-full" />
        </div>
        <div className="container relative z-10 mx-auto px-4 sm:px-6 lg:px-8">
          <ScrollAnimation variant="fadeScale">
            <div className="mx-auto max-w-3xl text-center">
              <h2 className="bg-gradient-to-r from-emerald-400 to-teal-400 bg-clip-text text-3xl font-bold tracking-tight text-transparent sm:text-4xl">
                Trusted by Elite Teams
              </h2>
              <p className="mt-4 text-lg text-slate-300">
                See what performance directors and medical staff are saying about Amatra.
              </p>
            </div>
          </ScrollAnimation>

          <ScrollAnimation variant="slideUp" delay={0.2} className="mt-12">
            <div className="rounded-lg border-2 border-slate-800 bg-slate-900/50 p-4 shadow-lg">
              <TestimonialSlider />
            </div>
          </ScrollAnimation>
        </div>
      </section>

      {/* CTA Section */}
      <section className="relative overflow-hidden bg-gradient-to-r from-emerald-900 to-teal-900 py-16">
        <div className="absolute inset-0 opacity-10">
          <AbstractDataVisualization variant="particles" className="h-full w-full" />
        </div>
        <div className="container relative z-10 mx-auto px-4 sm:px-6 lg:px-8">
          <ScrollAnimation variant="fadeScale">
            <div className="mx-auto max-w-4xl text-center">
              <h2 className="text-3xl font-bold tracking-tight text-white sm:text-4xl">
                Ready to transform your team's recovery?
              </h2>
              <p className="mt-4 text-xl text-emerald-100">
                Join our pilot program and see how Amatra can help your team maximize athlete availability.
              </p>
              <div className="mt-8 flex flex-col items-center justify-center gap-4 sm:flex-row">
                <Button
                  size="lg"
                  className="relative overflow-hidden bg-white text-emerald-700 transition-all duration-300 hover:bg-emerald-50"
                >
                  <span className="relative z-10">Request Demo</span>
                </Button>
                <Link href="/features">
                  <Button
                    variant="outline"
                    size="lg"
                    className="border-white text-white transition-all duration-300 hover:bg-emerald-800/30"
                  >
                    Explore Features <ArrowRight className="ml-2 h-4 w-4" />
                  </Button>
                </Link>
              </div>
            </div>
          </ScrollAnimation>
        </div>
      </section>
    </div>
  )
}

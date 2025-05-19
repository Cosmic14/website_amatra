import Link from "next/link"
import {
  ArrowRight,
  Brain,
  Shield,
  Activity,
  LineChart,
  BarChart3,
  Database,
  Zap,
  Smartphone,
  Lock,
  Sun,
  Moon,
  Coffee,
  MedalIcon as Meditation,
  Plane,
} from "lucide-react"
import { Button } from "@/components/ui/button"
import GradientBackground from "@/components/gradient-background"
import ScrollAnimation from "@/components/scroll-animation"
import StaggeredAnimation from "@/components/staggered-animation"
import AbstractDataVisualization from "@/components/abstract-data-visualization"
import TechIllustration from "@/components/tech-illustration"
import FlowingLinesBackground from "@/components/flowing-lines-background"
import FeatureCard from "@/components/feature-card"
import FeatureShowcase from "@/components/feature-showcase"
import ParticleBackground from "@/components/particle-background"

export default function HowItWorksPage() {
  return (
    <div className="flex min-h-screen flex-col bg-slate-950">
      {/* Hero Section */}
      <section className="relative overflow-hidden bg-slate-950 py-20 md:py-28">
        <div className="absolute inset-0 z-0">
          <AbstractDataVisualization
            variant="particles"
            density={70}
            speed={0.8}
            primaryColor="rgba(16, 185, 129, 0.8)"
            secondaryColor="rgba(20, 184, 166, 0.8)"
            accentColor="rgba(6, 182, 212, 0.8)"
          />
        </div>
        <div className="container relative z-10 mx-auto px-4 sm:px-6 lg:px-8">
          <ScrollAnimation variant="fadeScale">
            <div className="mx-auto max-w-4xl text-center">
              <h1 className="mb-6 bg-gradient-to-r from-emerald-400 via-teal-300 to-cyan-400 bg-clip-text text-4xl font-bold tracking-tight text-transparent sm:text-5xl md:text-6xl">
                How Amatra Works
              </h1>
              <p className="mb-10 text-xl text-slate-300">
                Discover the science, technology, and features behind our AI-powered athlete recovery system.
              </p>
            </div>
          </ScrollAnimation>
        </div>
      </section>

      {/* Powerful Recovery Insights Section */}
      <section className="relative bg-slate-950 py-20">
        <div className="absolute inset-0 opacity-5">
          <FlowingLinesBackground />
        </div>
        <div className="container relative z-10 mx-auto px-4 sm:px-6 lg:px-8">
          <ScrollAnimation variant="fadeScale">
            <div className="mx-auto max-w-3xl text-center">
              <h2 className="bg-gradient-to-r from-emerald-400 to-teal-400 bg-clip-text text-3xl font-bold tracking-tight text-transparent sm:text-4xl">
                Powerful Recovery Insights
              </h2>
              <p className="mt-4 text-lg text-slate-300">
                Our comprehensive platform provides real-time monitoring of athlete recovery metrics, helping teams make
                data-driven decisions.
              </p>
            </div>
          </ScrollAnimation>

          <ScrollAnimation variant="slideUp" delay={0.2} className="mt-12">
            <div className="mx-auto grid max-w-6xl gap-8 md:grid-cols-2">
              <div className="group relative overflow-hidden rounded-lg border-2 border-slate-800 bg-slate-900 p-4 shadow-lg transition-all duration-300 hover:border-emerald-500/50">
                <div className="absolute -inset-px rounded-lg bg-gradient-to-r from-emerald-500/10 to-teal-500/10 opacity-0 blur-xl transition-all duration-300 group-hover:opacity-100"></div>
                <div className="relative">
                  <h3 className="mb-2 text-xl font-bold text-white">Team Overview Dashboard</h3>
                  <p className="mb-4 text-sm text-slate-400">
                    Monitor your entire squad's recovery status, strain levels, and availability at a glance.
                  </p>
                  <div className="aspect-video w-full overflow-hidden rounded-lg border border-slate-800 bg-slate-900/80">
                    <TechIllustration variant="dashboard" className="h-full w-full" animationSpeed={0.5} />
                  </div>
                </div>
              </div>

              <div className="group relative overflow-hidden rounded-lg border-2 border-slate-800 bg-slate-900 p-4 shadow-lg transition-all duration-300 hover:border-emerald-500/50">
                <div className="absolute -inset-px rounded-lg bg-gradient-to-r from-emerald-500/10 to-teal-500/10 opacity-0 blur-xl transition-all duration-300 group-hover:opacity-100"></div>
                <div className="relative">
                  <h3 className="mb-2 text-xl font-bold text-white">Athlete Profile View</h3>
                  <p className="mb-4 text-sm text-slate-400">
                    Dive deep into individual athlete data with personalized recovery insights and recommendations.
                  </p>
                  <div className="aspect-video w-full overflow-hidden rounded-lg border border-slate-800 bg-slate-900/80">
                    <TechIllustration variant="wearable" className="h-full w-full" animationSpeed={0.5} />
                  </div>
                </div>
              </div>
            </div>
          </ScrollAnimation>
        </div>
      </section>

      {/* Our Approach Section */}
      <section className="relative bg-slate-900 py-20">
        <div className="absolute inset-0 opacity-10">
          <AbstractDataVisualization
            variant="neural"
            density={50}
            speed={0.5}
            primaryColor="rgba(16, 185, 129, 0.6)"
            secondaryColor="rgba(20, 184, 166, 0.6)"
            accentColor="rgba(6, 182, 212, 0.6)"
          />
        </div>
        <div className="container relative z-10 mx-auto px-4 sm:px-6 lg:px-8">
          <ScrollAnimation variant="fadeScale">
            <div className="mx-auto max-w-3xl text-center">
              <h2 className="bg-gradient-to-r from-emerald-400 to-teal-400 bg-clip-text text-3xl font-bold tracking-tight text-transparent sm:text-4xl">
                Our Five-Step Approach
              </h2>
              <p className="mt-4 text-lg text-slate-300">
                Amatra's comprehensive approach to athlete recovery combines data collection, AI analysis, and
                personalized recommendations.
              </p>
            </div>
          </ScrollAnimation>

          <StaggeredAnimation className="mt-16 grid gap-8 md:grid-cols-2 lg:grid-cols-5" staggerDelay={0.1}>
            <div className="rounded-lg border border-slate-800 bg-slate-900/80 p-6 shadow-[0_4px_20px_rgba(0,0,0,0.2)] transition-all duration-300 hover:border-emerald-900 hover:shadow-[0_0_15px_rgba(16,185,129,0.15)]">
              <div className="mb-4 flex h-16 w-16 items-center justify-center rounded-full bg-slate-800 text-emerald-400 transition-all duration-300 group-hover:bg-emerald-900/30">
                <Activity className="h-8 w-8" />
              </div>
              <h3 className="mb-2 text-xl font-bold text-white">Homeostasis</h3>
              <p className="text-slate-300">
                We establish key metrics to represent an athlete's recovery and physical condition, creating a
                personalized "normal" range for each athlete.
              </p>
              <ul className="mt-4 space-y-2 text-sm text-slate-400">
                <li className="flex items-start">
                  <div className="mr-2 mt-0.5 h-4 w-4 flex-shrink-0 rounded-full bg-emerald-900/30"></div>
                  <span>Rolling window analysis (weekly or 3-month periods)</span>
                </li>
                <li className="flex items-start">
                  <div className="mr-2 mt-0.5 h-4 w-4 flex-shrink-0 rounded-full bg-emerald-900/30"></div>
                  <span>Standard deviation calculations</span>
                </li>
                <li className="flex items-start">
                  <div className="mr-2 mt-0.5 h-4 w-4 flex-shrink-0 rounded-full bg-emerald-900/30"></div>
                  <span>Z-score metrics for statistical significance</span>
                </li>
              </ul>
            </div>

            <div className="rounded-lg border border-slate-800 bg-slate-900/80 p-6 shadow-[0_4px_20px_rgba(0,0,0,0.2)] transition-all duration-300 hover:border-emerald-900 hover:shadow-[0_0_15px_rgba(16,185,129,0.15)]">
              <div className="mb-4 flex h-16 w-16 items-center justify-center rounded-full bg-slate-800 text-emerald-400 transition-all duration-300 group-hover:bg-emerald-900/30">
                <Shield className="h-8 w-8" />
              </div>
              <h3 className="mb-2 text-xl font-bold text-white">Identification</h3>
              <p className="text-slate-300">
                Our alert system flags deviations in key metrics, incorporating matchday and travel context to adjust
                thresholds dynamically.
              </p>
              <ul className="mt-4 space-y-2 text-sm text-slate-400">
                <li className="flex items-start">
                  <div className="mr-2 mt-0.5 h-4 w-4 flex-shrink-0 rounded-full bg-emerald-900/30"></div>
                  <span>Sudden drops in recovery detection</span>
                </li>
                <li className="flex items-start">
                  <div className="mr-2 mt-0.5 h-4 w-4 flex-shrink-0 rounded-full bg-emerald-900/30"></div>
                  <span>HRV suppression monitoring</span>
                </li>
                <li className="flex items-start">
                  <div className="mr-2 mt-0.5 h-4 w-4 flex-shrink-0 rounded-full bg-emerald-900/30"></div>
                  <span>Inconsistent sleep pattern alerts</span>
                </li>
                <li className="flex items-start">
                  <div className="mr-2 mt-0.5 h-4 w-4 flex-shrink-0 rounded-full bg-emerald-900/30"></div>
                  <span>Elevated resting heart rate warnings</span>
                </li>
              </ul>
            </div>

            <div className="rounded-lg border border-slate-800 bg-slate-900/80 p-6 shadow-[0_4px_20px_rgba(0,0,0,0.2)] transition-all duration-300 hover:border-emerald-900 hover:shadow-[0_0_15px_rgba(16,185,129,0.15)]">
              <div className="mb-4 flex h-16 w-16 items-center justify-center rounded-full bg-slate-800 text-emerald-400 transition-all duration-300 group-hover:bg-emerald-900/30">
                <Brain className="h-8 w-8" />
              </div>
              <h3 className="mb-2 text-xl font-bold text-white">Attribution</h3>
              <p className="text-slate-300">
                Our bespoke ML/AI algorithms analyze what factors changed prior to deviations and which ones
                statistically or causally correlate with better/worse recovery.
              </p>
              <ul className="mt-4 space-y-2 text-sm text-slate-400">
                <li className="flex items-start">
                  <div className="mr-2 mt-0.5 h-4 w-4 flex-shrink-0 rounded-full bg-emerald-900/30"></div>
                  <span>Caffeine intake impact analysis</span>
                </li>
                <li className="flex items-start">
                  <div className="mr-2 mt-0.5 h-4 w-4 flex-shrink-0 rounded-full bg-emerald-900/30"></div>
                  <span>Morning sunlight exposure benefits</span>
                </li>
                <li className="flex items-start">
                  <div className="mr-2 mt-0.5 h-4 w-4 flex-shrink-0 rounded-full bg-emerald-900/30"></div>
                  <span>Meditation and spiritual practice effects</span>
                </li>
                <li className="flex items-start">
                  <div className="mr-2 mt-0.5 h-4 w-4 flex-shrink-0 rounded-full bg-emerald-900/30"></div>
                  <span>Positive anticipation and stress buffering</span>
                </li>
              </ul>
            </div>

            <div className="rounded-lg border border-slate-800 bg-slate-900/80 p-6 shadow-[0_4px_20px_rgba(0,0,0,0.2)] transition-all duration-300 hover:border-emerald-900 hover:shadow-[0_0_15px_rgba(16,185,129,0.15)]">
              <div className="mb-4 flex h-16 w-16 items-center justify-center rounded-full bg-slate-800 text-emerald-400 transition-all duration-300 group-hover:bg-emerald-900/30">
                <LineChart className="h-8 w-8" />
              </div>
              <h3 className="mb-2 text-xl font-bold text-white">Personalized Insights</h3>
              <p className="text-slate-300">
                We turn findings into actionable nudges and recommendations that are specific to each athlete's unique
                recovery patterns.
              </p>
              <ul className="mt-4 space-y-2 text-sm text-slate-400">
                <li className="flex items-start">
                  <div className="mr-2 mt-0.5 h-4 w-4 flex-shrink-0 rounded-full bg-emerald-900/30"></div>
                  <span>Meditation impact quantification</span>
                </li>
                <li className="flex items-start">
                  <div className="mr-2 mt-0.5 h-4 w-4 flex-shrink-0 rounded-full bg-emerald-900/30"></div>
                  <span>Travel recovery optimization</span>
                </li>
                <li className="flex items-start">
                  <div className="mr-2 mt-0.5 h-4 w-4 flex-shrink-0 rounded-full bg-emerald-900/30"></div>
                  <span>Gratitude and mental state correlations</span>
                </li>
                <li className="flex items-start">
                  <div className="mr-2 mt-0.5 h-4 w-4 flex-shrink-0 rounded-full bg-emerald-900/30"></div>
                  <span>Personalized suggestions via athlete app</span>
                </li>
              </ul>
            </div>

            <div className="rounded-lg border border-slate-800 bg-slate-900/80 p-6 shadow-[0_4px_20px_rgba(0,0,0,0.2)] transition-all duration-300 hover:border-emerald-900 hover:shadow-[0_0_15px_rgba(16,185,129,0.15)]">
              <div className="mb-4 flex h-16 w-16 items-center justify-center rounded-full bg-slate-800 text-emerald-400 transition-all duration-300 group-hover:bg-emerald-900/30">
                <BarChart3 className="h-8 w-8" />
              </div>
              <h3 className="mb-2 text-xl font-bold text-white">Automated Implementation</h3>
              <p className="text-slate-300">
                We provide staff with tools and dashboards to easily implement recovery recommendations and track their
                effectiveness.
              </p>
              <ul className="mt-4 space-y-2 text-sm text-slate-400">
                <li className="flex items-start">
                  <div className="mr-2 mt-0.5 h-4 w-4 flex-shrink-0 rounded-full bg-emerald-900/30"></div>
                  <span>Real-time dashboard of risk, readiness, and recovery trends</span>
                </li>
                <li className="flex items-start">
                  <div className="mr-2 mt-0.5 h-4 w-4 flex-shrink-0 rounded-full bg-emerald-900/30"></div>
                  <span>Quick prompts and automated surveys for qualitative feedback</span>
                </li>
                <li className="flex items-start">
                  <div className="mr-2 mt-0.5 h-4 w-4 flex-shrink-0 rounded-full bg-emerald-900/30"></div>
                  <span>Personalized suggestions per player on their own app</span>
                </li>
                <li className="flex items-start">
                  <div className="mr-2 mt-0.5 h-4 w-4 flex-shrink-0 rounded-full bg-emerald-900/30"></div>
                  <span>Summary explanations ("Why is recovery low today?")</span>
                </li>
              </ul>
            </div>
          </StaggeredAnimation>
        </div>
      </section>

      {/* Core Features Section */}
      <section className="relative bg-slate-950 py-20">
        <div className="absolute inset-0 opacity-5">
          <GradientBackground variant="blue" />
        </div>
        <div className="container relative z-10 mx-auto px-4 sm:px-6 lg:px-8">
          <ScrollAnimation variant="fadeScale">
            <div className="mx-auto max-w-3xl text-center">
              <h2 className="bg-gradient-to-r from-emerald-400 to-teal-400 bg-clip-text text-3xl font-bold tracking-tight text-transparent sm:text-4xl">
                Comprehensive Recovery Management
              </h2>
              <p className="mt-4 text-lg text-slate-300">
                Amatra helps sports teams manage athlete recovery by combining data from wearables and behavioral inputs
                to create personalized recovery insights.
              </p>
            </div>
          </ScrollAnimation>

          <StaggeredAnimation className="mt-16 grid gap-8 md:grid-cols-2 lg:grid-cols-3" staggerDelay={0.1}>
            <FeatureCard
              icon={<Database className="h-10 w-10 text-emerald-400" />}
              title="Unified Data Integration"
              description="Seamlessly connect with wearables like WHOOP and collect behavioral inputs such as sleep time, sauna use, and caffeine consumption."
            />
            <FeatureCard
              icon={<Brain className="h-10 w-10 text-emerald-400" />}
              title="Bespoke Machine Learning"
              description="Our proprietary ML models build personalized recovery networks for each athlete, analyzing factors that impact their unique recovery patterns."
            />
            <FeatureCard
              icon={<BarChart3 className="h-10 w-10 text-emerald-400" />}
              title="Personalized Insights"
              description="Receive actionable recommendations based on each athlete's unique physiology, behaviors, and recovery patterns."
            />
            <FeatureCard
              icon={<Zap className="h-10 w-10 text-emerald-400" />}
              title="Predictive Analytics"
              description="Forecast injury risks and performance readiness based on historical data and current recovery metrics."
            />
            <FeatureCard
              icon={<Smartphone className="h-10 w-10 text-emerald-400" />}
              title="Opt-in Data Sharing"
              description="Athletes can easily share data from their personal wearable accounts, reducing the burden on the organization while maintaining privacy."
            />
            <FeatureCard
              icon={<Lock className="h-10 w-10 text-emerald-400" />}
              title="Privacy & Security"
              description="All personally identifiable information is encrypted, with de-identified data processing to align with the highest privacy standards."
            />
          </StaggeredAnimation>
        </div>
      </section>

      {/* Behavioral Factors Section */}
      <section className="relative bg-slate-900 py-20">
        <div className="absolute inset-0 opacity-10">
          <div className="h-full w-full bg-[radial-gradient(ellipse_at_center,_var(--tw-gradient-stops))] from-emerald-700 via-transparent to-transparent"></div>
        </div>
        <div className="container relative z-10 mx-auto px-4 sm:px-6 lg:px-8">
          <ScrollAnimation variant="fadeScale">
            <div className="mx-auto max-w-3xl text-center">
              <h2 className="bg-gradient-to-r from-emerald-400 to-teal-400 bg-clip-text text-3xl font-bold tracking-tight text-transparent sm:text-4xl">
                Behavioral Recovery Factors
              </h2>
              <p className="mt-4 text-lg text-slate-300">
                Amatra analyzes how specific behaviors impact recovery, providing personalized recommendations for
                optimal performance.
              </p>
            </div>
          </ScrollAnimation>

          <StaggeredAnimation className="mt-16 grid gap-6 md:grid-cols-2 lg:grid-cols-3" staggerDelay={0.1}>
            <div className="flex items-start rounded-lg border border-slate-800 bg-slate-900 p-6 shadow-[0_4px_20px_rgba(0,0,0,0.2)] transition-all duration-300 hover:border-emerald-900 hover:shadow-[0_0_15px_rgba(16,185,129,0.15)]">
              <div className="mr-4 flex h-12 w-12 flex-shrink-0 items-center justify-center rounded-full bg-slate-800 text-emerald-400">
                <Sun className="h-6 w-6" />
              </div>
              <div>
                <h3 className="mb-2 text-lg font-bold text-white">Morning Sunlight</h3>
                <p className="text-sm text-slate-300">
                  "Travel days with no morning sunlight exposure reduce your sleep efficiency by 12%."
                </p>
              </div>
            </div>

            <div className="flex items-start rounded-lg border border-slate-800 bg-slate-900 p-6 shadow-[0_4px_20px_rgba(0,0,0,0.2)] transition-all duration-300 hover:border-emerald-900 hover:shadow-[0_0_15px_rgba(16,185,129,0.15)]">
              <div className="mr-4 flex h-12 w-12 flex-shrink-0 items-center justify-center rounded-full bg-slate-800 text-emerald-400">
                <Meditation className="h-6 w-6" />
              </div>
              <div>
                <h3 className="mb-2 text-lg font-bold text-white">Meditation Practice</h3>
                <p className="text-sm text-slate-300">
                  "When you meditate for 10+ mins before bed, your HRV improves by 7% the next day."
                </p>
              </div>
            </div>

            <div className="flex items-start rounded-lg border border-slate-800 bg-slate-900 p-6 shadow-[0_4px_20px_rgba(0,0,0,0.2)] transition-all duration-300 hover:border-emerald-900 hover:shadow-[0_0_15px_rgba(16,185,129,0.15)]">
              <div className="mr-4 flex h-12 w-12 flex-shrink-0 items-center justify-center rounded-full bg-slate-800 text-emerald-400">
                <Coffee className="h-6 w-6" />
              </div>
              <div>
                <h3 className="mb-2 text-lg font-bold text-white">Caffeine Intake</h3>
                <p className="text-sm text-slate-300">
                  "Caffeine after 3pm reduces your deep sleep by 15% and recovery score by 8%."
                </p>
              </div>
            </div>

            <div className="flex items-start rounded-lg border border-slate-800 bg-slate-900 p-6 shadow-[0_4px_20px_rgba(0,0,0,0.2)] transition-all duration-300 hover:border-emerald-900 hover:shadow-[0_0_15px_rgba(16,185,129,0.15)]">
              <div className="mr-4 flex h-12 w-12 flex-shrink-0 items-center justify-center rounded-full bg-slate-800 text-emerald-400">
                <Moon className="h-6 w-6" />
              </div>
              <div>
                <h3 className="mb-2 text-lg font-bold text-white">Sleep Consistency</h3>
                <p className="text-sm text-slate-300">
                  "Maintaining a consistent sleep schedule improves your recovery score by 14% on average."
                </p>
              </div>
            </div>

            <div className="flex items-start rounded-lg border border-slate-800 bg-slate-900 p-6 shadow-[0_4px_20px_rgba(0,0,0,0.2)] transition-all duration-300 hover:border-emerald-900 hover:shadow-[0_0_15px_rgba(16,185,129,0.15)]">
              <div className="mr-4 flex h-12 w-12 flex-shrink-0 items-center justify-center rounded-full bg-slate-800 text-emerald-400">
                <Plane className="h-6 w-6" />
              </div>
              <div>
                <h3 className="mb-2 text-lg font-bold text-white">Travel Recovery</h3>
                <p className="text-sm text-slate-300">
                  "Your recovery is 23% lower after travel days. Hydration and compression socks improve this by 9%."
                </p>
              </div>
            </div>

            <div className="flex items-start rounded-lg border border-slate-800 bg-slate-900 p-6 shadow-[0_4px_20px_rgba(0,0,0,0.2)] transition-all duration-300 hover:border-emerald-900 hover:shadow-[0_0_15px_rgba(16,185,129,0.15)]">
              <div className="mr-4 flex h-12 w-12 flex-shrink-0 items-center justify-center rounded-full bg-slate-800 text-emerald-400">
                <Activity className="h-6 w-6" />
              </div>
              <div>
                <h3 className="mb-2 text-lg font-bold text-white">Mental State</h3>
                <p className="text-sm text-slate-300">
                  "On days with high gratitude scores, strain is better tolerated and recovery is 11% faster."
                </p>
              </div>
            </div>
          </StaggeredAnimation>
        </div>
      </section>

      {/* Comprehensive Athlete Monitoring Section */}
      <section className="relative bg-slate-950 py-20">
        <div className="absolute inset-0 opacity-10">
          <GradientBackground variant="purple" />
        </div>
        <div className="container relative z-10 mx-auto px-4 sm:px-6 lg:px-8">
          <ScrollAnimation variant="fadeScale">
            <div className="mx-auto max-w-3xl text-center">
              <h2 className="bg-gradient-to-r from-emerald-400 to-teal-400 bg-clip-text text-3xl font-bold tracking-tight text-transparent sm:text-4xl">
                Comprehensive Athlete Monitoring
              </h2>
              <p className="mt-4 text-lg text-slate-300">
                Track every aspect of athlete recovery with our advanced monitoring system.
              </p>
            </div>
          </ScrollAnimation>

          <ScrollAnimation variant="slideUp" delay={0.2} className="mt-12">
            <div className="mx-auto h-[500px] max-w-3xl overflow-hidden rounded-lg border border-slate-700 bg-slate-900/50 p-1 backdrop-blur-sm">
              <div className="absolute -inset-px rounded-lg bg-gradient-to-r from-emerald-500/20 to-teal-500/20 opacity-30 blur-lg"></div>
              <div className="relative h-full w-full overflow-hidden rounded-lg border border-slate-800 bg-slate-900">
                <TechIllustration
                  variant="athlete"
                  className="h-full w-full"
                  primaryColor="rgba(16, 185, 129, 1)"
                  secondaryColor="rgba(20, 184, 166, 1)"
                  accentColor="rgba(6, 182, 212, 1)"
                />
              </div>
            </div>
          </ScrollAnimation>
        </div>
      </section>

      {/* Feature Showcases */}
      <section className="relative bg-slate-900 py-20">
        <div className="absolute inset-0 opacity-10">
          <ParticleBackground density={30} />
        </div>
        <div className="container relative z-10 mx-auto px-4 sm:px-6 lg:px-8">
          <ScrollAnimation variant="fadeScale">
            <div className="mx-auto max-w-3xl text-center">
              <h2 className="bg-gradient-to-r from-emerald-400 to-teal-400 bg-clip-text text-3xl font-bold tracking-tight text-transparent sm:text-4xl">
                Key Platform Features
              </h2>
              <p className="mt-4 text-lg text-slate-300">
                Explore the core capabilities that make Amatra the leading athlete recovery platform.
              </p>
            </div>
          </ScrollAnimation>

          <div className="mt-16 space-y-24">
            <ScrollAnimation variant="slideUp" className="w-full">
              <FeatureShowcase
                title="Unified Data Integration"
                description="Amatra connects with wearables like WHOOP and collects behavioral inputs through custom wellness questionnaires tailored to your team's context."
                features={[
                  "Automatic data synchronization from wearables via opt-in sharing",
                  "Custom wellness questionnaires tailored to team context",
                  "De-identified and encrypted data processing",
                  "Historical data import and analysis",
                  "Real-time data processing and alerts",
                ]}
                reversed={false}
                graphicType="data-integration"
              />
            </ScrollAnimation>

            <ScrollAnimation variant="slideUp" className="w-full" delay={0.1}>
              <FeatureShowcase
                title="AI-Powered Recovery Analysis"
                description="Our proprietary algorithms analyze millions of data points to identify recovery patterns and provide actionable insights."
                features={[
                  "Bespoke machine learning models for personalized recovery networks",
                  "Statistical and causal correlation analysis",
                  "Anomaly detection to identify potential issues early",
                  "Continuous learning from team and individual data",
                  "Behavioral factor impact assessment",
                ]}
                reversed={true}
                graphicType="ai-analysis"
              />
            </ScrollAnimation>

            <ScrollAnimation variant="slideUp" className="w-full" delay={0.1}>
              <FeatureShowcase
                title="Comprehensive Team Dashboard"
                description="Monitor your entire squad's recovery status at a glance and drill down into individual athlete metrics when needed."
                features={[
                  "Real-time dashboard of risk, readiness, and recovery trends",
                  "Risk stratification and alerting system",
                  "Position-based grouping and analysis",
                  "Quick prompts and automated surveys for qualitative feedback",
                  "Summary explanations ('Why is recovery low today?')",
                ]}
                reversed={false}
                graphicType="team-dashboard"
              />
            </ScrollAnimation>

            <ScrollAnimation variant="slideUp" className="w-full" delay={0.1}>
              <FeatureShowcase
                title="Athlete Mobile Experience"
                description="Empower athletes with their own recovery insights and recommendations through our intuitive mobile application."
                features={[
                  "Personalized recovery recommendations",
                  "Daily readiness scores and insights",
                  "Secure communication with medical staff",
                  "Progress tracking and goal setting",
                  "Educational content on recovery best practices",
                ]}
                reversed={true}
                graphicType="athlete-app"
              />
            </ScrollAnimation>

            <ScrollAnimation variant="slideUp" className="w-full" delay={0.1}>
              <FeatureShowcase
                title="Predictive Recovery Intelligence"
                description="Forecast injury risks and optimize training loads with our advanced predictive analytics engine."
                features={[
                  "Injury risk prediction based on recovery patterns",
                  "Optimal training load recommendations",
                  "Performance readiness forecasting",
                  "Scenario modeling for different recovery protocols",
                  "Long-term trend analysis and seasonal planning",
                ]}
                reversed={false}
                graphicType="predictive"
              />
            </ScrollAnimation>
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="relative overflow-hidden bg-gradient-to-r from-emerald-900 to-teal-900 py-16">
        <div className="absolute inset-0 opacity-10">
          <AbstractDataVisualization
            variant="particles"
            density={70}
            speed={0.8}
            primaryColor="rgba(255, 255, 255, 0.6)"
            secondaryColor="rgba(255, 255, 255, 0.6)"
            accentColor="rgba(255, 255, 255, 0.6)"
          />
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
                <Link href="/">
                  <Button
                    variant="outline"
                    size="lg"
                    className="border-white text-white transition-all duration-300 hover:bg-emerald-800/30"
                  >
                    Back to Home <ArrowRight className="ml-2 h-4 w-4" />
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

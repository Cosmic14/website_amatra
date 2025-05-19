import Link from "next/link"
import { ArrowRight, Sparkles } from "lucide-react"
import { Button } from "@/components/ui/button"
import ParticleBackground from "@/components/particle-background"
import GradientBackground from "@/components/gradient-background"
import TeamMember from "@/components/team-member"

export default function AboutPage() {
  return (
    <div className="flex min-h-screen flex-col bg-slate-950">
      {/* Hero Section */}
      <section className="relative overflow-hidden bg-slate-950 py-20 md:py-28">
        <div className="absolute inset-0 z-0">
          <ParticleBackground />
        </div>
        <div className="container relative z-10 mx-auto px-4 sm:px-6 lg:px-8">
          <div className="mx-auto max-w-4xl text-center">
            <h1 className="mb-6 bg-gradient-to-r from-emerald-400 via-teal-300 to-cyan-400 bg-clip-text text-4xl font-bold tracking-tight text-transparent sm:text-5xl md:text-6xl">
              About Amatra
            </h1>
            <p className="mb-10 text-xl text-slate-300">
              We're on a mission to transform athlete recovery through AI-powered insights and personalized
              recommendations.
            </p>
          </div>
        </div>
      </section>

      {/* Our Story Section */}
      <section className="relative bg-slate-900 py-20">
        <div className="absolute inset-0 opacity-10">
          <GradientBackground />
        </div>
        <div className="container relative z-10 mx-auto px-4 sm:px-6 lg:px-8">
          <div className="mx-auto max-w-3xl text-center">
            <h2 className="bg-gradient-to-r from-emerald-400 to-teal-400 bg-clip-text text-3xl font-bold tracking-tight text-transparent sm:text-4xl">
              Our Story
            </h2>
            <p className="mt-4 text-lg text-slate-300">
              Founded by athletes and data scientists, Amatra was born from a simple observation: recovery is the most
              undervalued aspect of elite sports performance.
            </p>
          </div>

          <div className="mt-16 grid gap-12 md:grid-cols-2">
            <div className="rounded-lg border border-slate-800 bg-slate-900/50 p-6 backdrop-blur-sm">
              <h3 className="mb-4 text-xl font-bold text-white">The Problem We Solve</h3>
              <p className="mb-6 text-slate-300">
                While workload monitoring is standard, recovery—the other 22 hours of an athlete's day—remains a black
                box, leading to billions in lost value through preventable injuries and suboptimal performance.
              </p>
              <p className="text-slate-300">
                Traditional approaches rely on subjective measures and disconnected data points, missing the complex
                interplay of factors that influence recovery.
              </p>
            </div>

            <div className="rounded-lg border border-slate-800 bg-slate-900/50 p-6 backdrop-blur-sm">
              <h3 className="mb-4 text-xl font-bold text-white">Our Approach</h3>
              <p className="mb-6 text-slate-300">
                We combine cutting-edge AI with sports science to create personalized recovery profiles for each
                athlete, identifying the unique factors that impact their recovery and performance.
              </p>
              <p className="text-slate-300">
                By connecting the dots between sleep, nutrition, mental state, and physical readiness, we provide
                actionable insights that help teams maximize athlete availability and performance.
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* Team Section */}
      <section className="relative bg-slate-950 py-20">
        <div className="absolute inset-0 opacity-5">
          <div className="h-full w-full bg-[radial-gradient(ellipse_at_center,_var(--tw-gradient-stops))] from-emerald-700 via-transparent to-transparent"></div>
        </div>
        <div className="container relative z-10 mx-auto px-4 sm:px-6 lg:px-8">
          <div className="mx-auto max-w-3xl text-center">
            <div className="mb-4 inline-flex items-center">
              <Sparkles className="mr-2 h-6 w-6 text-yellow-400" />
              <h2 className="bg-gradient-to-r from-emerald-400 to-teal-400 bg-clip-text text-3xl font-bold tracking-tight text-transparent sm:text-4xl">
                The Team
              </h2>
            </div>
            <p className="mt-4 text-lg text-slate-300">
              Meet the passionate founders behind Amatra who are combining their expertise in sports, data science, and
              healthcare to revolutionize athlete recovery.
            </p>
          </div>

          <div className="mt-16 grid gap-8 md:grid-cols-2">
            <TeamMember
              name="Kevin Chirayil"
              title="Co-founder & CEO"
              imageSrc="/kevin-chirayil.png"
              imageAlt="Kevin Chirayil"
              traits={["racy", "direct", "skillful"]}
              position="LW"
              points={[
                { icon: "Award", text: "Certified baller (LW)" },
                { icon: "Building", text: "Used to help insurers gamble on hurricanes" },
                { icon: "Heart", text: "Fought cancer using DNA data @ BIH Charité" },
                { icon: "GraduationCap", text: "Healthcare data specialist" },
              ]}
            />

            <TeamMember
              name="Nikola Penev"
              title="Co-founder & COO"
              imageSrc="/nikola-penev.png"
              imageAlt="Nikola Penev"
              traits={["tekky", "composed", "creative"]}
              position="CM"
              points={[
                { icon: "Award", text: "Certified baller (CM)" },
                { icon: "Target", text: "Led B2B growth at a Chicago-based startup" },
                { icon: "Building", text: "Escaped big tech employee @ IBM" },
                { icon: "GraduationCap", text: "Background in BSc Sport Management" },
              ]}
            />
          </div>
        </div>
      </section>

      {/* Values Section */}
      <section className="relative bg-slate-900 py-20">
        <div className="absolute inset-0 opacity-10">
          <GradientBackground variant="blue" />
        </div>
        <div className="container relative z-10 mx-auto px-4 sm:px-6 lg:px-8">
          <div className="mx-auto max-w-3xl text-center">
            <h2 className="bg-gradient-to-r from-emerald-400 to-teal-400 bg-clip-text text-3xl font-bold tracking-tight text-transparent sm:text-4xl">
              Our Values
            </h2>
            <p className="mt-4 text-lg text-slate-300">
              The core principles that guide our work and shape our company culture.
            </p>
          </div>

          <div className="mt-16 grid gap-8 md:grid-cols-2 lg:grid-cols-3">
            {[
              {
                title: "Athlete-Centered",
                description:
                  "We put athletes at the center of everything we do, respecting their privacy and empowering them with insights about their own bodies.",
              },
              {
                title: "Evidence-Based",
                description:
                  "We combine cutting-edge data science with rigorous sports science research to deliver reliable, actionable insights.",
              },
              {
                title: "Continuous Improvement",
                description:
                  "We're constantly learning, iterating, and improving our platform based on new research and user feedback.",
              },
              {
                title: "Transparency",
                description:
                  "We believe in clear communication about how our technology works and what factors influence our recommendations.",
              },
              {
                title: "Collaboration",
                description:
                  "We work closely with sports scientists, coaches, and medical staff to ensure our platform integrates seamlessly with existing workflows.",
              },
              {
                title: "Impact-Driven",
                description:
                  "We measure our success by the tangible improvements in athlete health, performance, and career longevity.",
              },
            ].map((value, index) => (
              <div
                key={index}
                className="rounded-lg border border-slate-800 bg-slate-900 p-6 shadow-[0_4px_20px_rgba(0,0,0,0.2)] transition-all duration-300 hover:border-emerald-900 hover:shadow-[0_0_15px_rgba(16,185,129,0.15)]"
              >
                <h3 className="mb-2 text-xl font-bold text-white">{value.title}</h3>
                <p className="text-slate-300">{value.description}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Join Us Section */}
      <section className="relative bg-slate-950 py-20">
        <div className="absolute inset-0 opacity-5">
          <div className="h-full w-full bg-[radial-gradient(ellipse_at_bottom,_var(--tw-gradient-stops))] from-teal-700 via-transparent to-transparent"></div>
        </div>
        <div className="container relative z-10 mx-auto px-4 sm:px-6 lg:px-8">
          <div className="mx-auto max-w-3xl text-center">
            <h2 className="bg-gradient-to-r from-emerald-400 to-teal-400 bg-clip-text text-3xl font-bold tracking-tight text-transparent sm:text-4xl">
              Join Our Journey
            </h2>
            <p className="mt-4 text-lg text-slate-300">
              We're looking for passionate individuals who want to make a difference in the world of sports and
              healthcare.
            </p>
          </div>

          <div className="mt-12 rounded-lg border border-slate-800 bg-slate-900 p-8 shadow-[0_4px_20px_rgba(0,0,0,0.2)]">
            <div className="grid gap-8 md:grid-cols-2">
              <div>
                <h3 className="mb-4 text-2xl font-bold text-white">Open Positions</h3>
                <p className="mb-6 text-slate-300">
                  Join our team and help us revolutionize athlete recovery and performance.
                </p>
                <ul className="space-y-4">
                  {[
                    "Machine Learning Engineer",
                    "Sports Science Researcher",
                    "Full-Stack Developer",
                    "Product Designer",
                    "Customer Success Manager",
                  ].map((position, index) => (
                    <li key={index} className="flex items-center">
                      <div className="mr-3 flex h-6 w-6 flex-shrink-0 items-center justify-center rounded-full bg-emerald-900/30 text-emerald-400">
                        <ArrowRight className="h-3 w-3" />
                      </div>
                      <span className="text-slate-300">{position}</span>
                    </li>
                  ))}
                </ul>
                <div className="mt-8">
                  <Button className="bg-gradient-to-r from-emerald-600 to-teal-600 transition-all duration-300 hover:from-emerald-500 hover:to-teal-500">
                    View All Positions
                  </Button>
                </div>
              </div>
              <div>
                <h3 className="mb-4 text-2xl font-bold text-white">Our Culture</h3>
                <p className="mb-4 text-slate-300">
                  At Amatra, we're building a diverse, inclusive team united by our passion for sports, data science,
                  and making a positive impact on athlete health.
                </p>
                <p className="mb-4 text-slate-300">
                  We offer competitive compensation, flexible work arrangements, and the opportunity to work with
                  cutting-edge technology and elite sports organizations.
                </p>
                <p className="text-slate-300">
                  Our office is located in Berlin, Germany, but we embrace remote work and have team members across
                  Europe and North America.
                </p>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="relative overflow-hidden bg-gradient-to-r from-emerald-900 to-teal-900 py-16">
        <div className="absolute inset-0 opacity-10">
          <ParticleBackground density={30} />
        </div>
        <div className="container relative z-10 mx-auto px-4 sm:px-6 lg:px-8">
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
              <Link href="/contact">
                <Button
                  variant="outline"
                  size="lg"
                  className="border-white text-white transition-all duration-300 hover:bg-emerald-800/30"
                >
                  Contact Us <ArrowRight className="ml-2 h-4 w-4" />
                </Button>
              </Link>
            </div>
          </div>
        </div>
      </section>
    </div>
  )
}

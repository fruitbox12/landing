"use client"

import Link from "next/link"
import { ArrowRight, Zap, Globe, Clock, Gauge, Network, Cpu, Activity } from "lucide-react"
import { Button } from "@/components/ui/button"
import { Navbar } from "@/components/navbar"
import { BarChart3 } from "lucide-react" // Import BarChart3

const performanceFeatures = [
  {
    icon: Clock,
    title: "Sub-10ms Cold Starts",
    description: "Our V8 isolate technology eliminates traditional cold start penalties. Your functions are ready instantly.",
    stat: "<10ms",
    label: "Cold Start",
  },
  {
    icon: Globe,
    title: "200+ Edge Locations",
    description: "Deploy to the world's largest edge network. Your code runs within 50ms of every user on Earth.",
    stat: "200+",
    label: "Locations",
  },
  {
    icon: Network,
    title: "Anycast Routing",
    description: "BGP anycast automatically routes requests to the nearest healthy node with zero configuration.",
    stat: "0ms",
    label: "Routing Overhead",
  },
  {
    icon: Cpu,
    title: "WebAssembly Runtime",
    description: "Near-native execution speed for compute-intensive workloads. Run Rust, Go, C++ at the edge.",
    stat: "~Native",
    label: "Performance",
  },
  {
    icon: Gauge,
    title: "Automatic Scaling",
    description: "Scale from zero to millions of requests instantly. No capacity planning, no infrastructure management.",
    stat: "1M+",
    label: "RPS/Region",
  },
  {
    icon: Activity,
    title: "Real-Time Analytics",
    description: "Monitor latency, throughput, and errors in real-time with sub-second granularity.",
    stat: "<1s",
    label: "Metrics Delay",
  },
]

const benchmarks = [
  { metric: "P50 Latency", shadw: "8ms", traditional: "150ms" },
  { metric: "P99 Latency", shadw: "25ms", traditional: "800ms" },
  { metric: "Cold Start", shadw: "10ms", traditional: "500ms" },
  { metric: "Time to First Byte", shadw: "15ms", traditional: "200ms" },
]

export default function PerformanceFeaturePage() {
  return (
    <div className="min-h-screen bg-[#0a0a0b] text-white">
      {/* Grid background */}
      <div 
        className="fixed inset-0 pointer-events-none opacity-[0.03]"
        style={{
          backgroundImage: `linear-gradient(rgba(255,255,255,0.5) 1px, transparent 1px), linear-gradient(90deg, rgba(255,255,255,0.5) 1px, transparent 1px)`,
          backgroundSize: '60px 60px',
        }}
      />
      <div className="fixed inset-0 pointer-events-none bg-[radial-gradient(ellipse_at_center,_transparent_0%,_#0a0a0b_70%)]" />
      
      {/* Background glows */}
      <div className="fixed left-[-10%] top-[10%] h-[700px] w-[700px] rounded-full bg-yellow-600/8 blur-[150px] pointer-events-none" />
      <div className="fixed right-[-10%] bottom-[10%] h-[600px] w-[600px] rounded-full bg-cyan-500/10 blur-[150px] pointer-events-none" />

      {/* Navbar */}
      <Navbar />

      {/* Hero */}
      <section className="relative z-10 pt-24 pb-16 px-6">
        <div className="mx-auto max-w-4xl text-center">
          <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-yellow-500/10 border border-yellow-500/20 text-yellow-300 text-xs font-medium mb-6">
            <Zap className="w-3 h-3" />
            Extreme Performance
          </div>
          <h1 className="text-4xl sm:text-5xl lg:text-6xl font-bold tracking-tight mb-6">
            <span className="bg-gradient-to-r from-white via-gray-200 to-gray-400 bg-clip-text text-transparent">
              Speed That
            </span>
            <br />
            <span className="bg-gradient-to-r from-yellow-400 to-cyan-400 bg-clip-text text-transparent">
              Changes Everything
            </span>
          </h1>
          <p className="text-lg text-gray-400 max-w-2xl mx-auto mb-8">
            When your code runs in under 10 milliseconds from anywhere in the world, 
            you can build experiences that were previously impossible.
          </p>
          <div className="flex items-center justify-center gap-4">
            <Link href="/demo">
              <Button className="bg-white text-black hover:bg-gray-200 rounded-full px-6 h-11">
                See It In Action
                <ArrowRight className="ml-2 w-4 h-4" />
              </Button>
            </Link>
            <Link href="/docs/architecture">
              <Button variant="outline" className="border-gray-700 text-gray-300 hover:bg-white/5 hover:text-white rounded-full px-6 h-11 bg-transparent">
                How It Works
              </Button>
            </Link>
          </div>
        </div>
      </section>

      {/* Performance Stats */}
      <section className="relative z-10 py-16 px-6">
        <div className="mx-auto max-w-6xl">
          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
            {performanceFeatures.map((feature) => (
              <div 
                key={feature.title}
                className="p-6 rounded-2xl bg-gradient-to-b from-gray-900/50 to-transparent border border-gray-800/50 hover:border-yellow-500/30 transition-colors group"
              >
                <div className="flex items-start justify-between mb-4">
                  <div className="w-10 h-10 rounded-xl bg-yellow-500/10 flex items-center justify-center group-hover:bg-yellow-500/20 transition-colors">
                    <feature.icon className="w-5 h-5 text-yellow-400" />
                  </div>
                  <div className="text-right">
                    <div className="text-2xl font-bold bg-gradient-to-r from-yellow-400 to-cyan-400 bg-clip-text text-transparent">
                      {feature.stat}
                    </div>
                    <div className="text-xs text-gray-500">{feature.label}</div>
                  </div>
                </div>
                <h3 className="text-lg font-semibold text-white mb-2">{feature.title}</h3>
                <p className="text-sm text-gray-400">{feature.description}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Benchmark Comparison */}
      <section className="relative z-10 py-20 px-6 border-t border-gray-800/50">
        <div className="mx-auto max-w-4xl">
          <div className="text-center mb-12">
            <h2 className="text-3xl font-bold text-white mb-4">Benchmark Comparison</h2>
            <p className="text-gray-400">
              See how Shadw compares to traditional serverless platforms.
            </p>
          </div>
          <div className="rounded-2xl border border-gray-800/50 overflow-hidden">
            <table className="w-full">
              <thead>
                <tr className="bg-gray-900/50">
                  <th className="text-left p-4 text-sm font-medium text-gray-400">Metric</th>
                  <th className="text-center p-4 text-sm font-medium text-yellow-400">Shadw</th>
                  <th className="text-center p-4 text-sm font-medium text-gray-500">Traditional</th>
                </tr>
              </thead>
              <tbody>
                {benchmarks.map((row, i) => (
                  <tr key={row.metric} className={i % 2 === 0 ? "bg-gray-900/20" : ""}>
                    <td className="p-4 text-sm text-gray-300">{row.metric}</td>
                    <td className="p-4 text-center">
                      <span className="text-lg font-bold text-yellow-400">{row.shadw}</span>
                    </td>
                    <td className="p-4 text-center">
                      <span className="text-lg font-bold text-gray-500">{row.traditional}</span>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
          <p className="text-xs text-gray-500 text-center mt-4">
            Benchmarks measured against major cloud providers' serverless offerings. Results may vary.
          </p>
        </div>
      </section>

      {/* Architecture Overview */}
      <section className="relative z-10 py-20 px-6">
        <div className="mx-auto max-w-5xl">
          <div className="grid md:grid-cols-2 gap-12 items-center">
            <div>
              <h2 className="text-3xl font-bold text-white mb-4">How We Achieve This</h2>
              <p className="text-gray-400 mb-6">
                Our architecture is fundamentally different from traditional serverless platforms.
                Instead of spinning up containers, we use V8 isolates that start in microseconds.
              </p>
              <ul className="space-y-4">
                {[
                  { title: "V8 Isolates", desc: "Lightweight execution environments with instant startup" },
                  { title: "Global Anycast", desc: "Requests automatically route to the nearest node" },
                  { title: "Edge Caching", desc: "Intelligent caching at every edge location" },
                  { title: "Pre-warming", desc: "Popular functions are kept warm automatically" },
                ].map((item) => (
                  <li key={item.title} className="flex items-start gap-3">
                    <div className="w-2 h-2 rounded-full bg-yellow-400 mt-2" />
                    <div>
                      <div className="text-sm font-medium text-white">{item.title}</div>
                      <div className="text-xs text-gray-500">{item.desc}</div>
                    </div>
                  </li>
                ))}
              </ul>
            </div>
            <div className="p-8 rounded-2xl bg-gradient-to-br from-yellow-900/20 to-cyan-900/20 border border-yellow-500/20">
              <BarChart3 className="w-12 h-12 text-yellow-400 mb-4" />
              <h3 className="text-xl font-semibold text-white mb-2">Performance Dashboard</h3>
              <p className="text-sm text-gray-400 mb-4">
                Monitor every metric in real-time. Set alerts for latency thresholds and track performance over time.
              </p>
              <Link href="/demo">
                <Button className="w-full bg-yellow-600 hover:bg-yellow-500 text-white rounded-full h-11">
                  View Live Metrics
                </Button>
              </Link>
            </div>
          </div>
        </div>
      </section>

      {/* CTA */}
      <section className="relative z-10 py-20 px-6">
        <div className="mx-auto max-w-3xl text-center">
          <h2 className="text-3xl font-bold text-white mb-4">Experience the Speed</h2>
          <p className="text-gray-400 mb-8">
            Deploy your first function in minutes and see the difference yourself.
          </p>
          <Link href="/docs/quickstart">
            <Button className="bg-gradient-to-r from-yellow-600 to-cyan-600 hover:from-yellow-500 hover:to-cyan-500 text-white rounded-full px-8 h-12 text-base">
              Start Building
              <ArrowRight className="ml-2 w-4 h-4" />
            </Button>
          </Link>
        </div>
      </section>
    </div>
  )
}

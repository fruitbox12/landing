"use client"

import Link from "next/link"
import Image from "next/image"
import { ArrowRight, Globe, Zap, Shield, Network, Server, Cpu, Clock, BarChart3 } from "lucide-react"
import { Button } from "@/components/ui/button"
import { Navbar } from "@/components/navbar"

const features = [
  {
    icon: Globe,
    title: "Global Edge Network",
    description: "Deploy serverless functions to 200+ edge locations worldwide with sub-10ms cold starts.",
  },
  {
    icon: Zap,
    title: "Instant Scaling",
    description: "Auto-scale from zero to millions of requests without configuration or capacity planning.",
  },
  {
    icon: Shield,
    title: "Zero Trust Security",
    description: "Built-in DDoS protection, mutual TLS, and hardware-level isolation for every workload.",
  },
  {
    icon: Network,
    title: "Anycast Routing",
    description: "BGP anycast ensures requests are served by the nearest healthy node automatically.",
  },
  {
    icon: Server,
    title: "Multi-Cloud Native",
    description: "Deploy across AWS, GCP, Azure, and 10+ cloud providers from a single interface.",
  },
  {
    icon: Cpu,
    title: "WebAssembly Runtime",
    description: "Run any language compiled to WASM with near-native performance and security.",
  },
]

const stats = [
  { value: "200+", label: "Edge Locations" },
  { value: "<10ms", label: "Cold Start" },
  { value: "99.99%", label: "Uptime SLA" },
  { value: "50M+", label: "Daily Requests" },
]

export default function OverviewPage() {
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
      <div className="fixed left-[-10%] top-[-10%] h-[600px] w-[600px] rounded-full bg-purple-600/15 blur-[120px] pointer-events-none" />
      <div className="fixed right-[-10%] top-[30%] h-[500px] w-[500px] rounded-full bg-cyan-500/10 blur-[120px] pointer-events-none" />

      <Navbar />

      {/* Hero */}
      <section className="relative z-10 pt-24 pb-16 px-6">
        <div className="mx-auto max-w-4xl text-center">
          <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-purple-500/10 border border-purple-500/20 text-purple-300 text-xs font-medium mb-6">
            <span className="w-1.5 h-1.5 rounded-full bg-purple-400 animate-pulse" />
            Product Overview
          </div>
          <h1 className="text-4xl sm:text-5xl lg:text-6xl font-bold tracking-tight mb-6">
            <span className="bg-gradient-to-r from-white via-gray-200 to-gray-400 bg-clip-text text-transparent">
              The Edge Computing Platform
            </span>
            <br />
            <span className="bg-gradient-to-r from-purple-400 to-cyan-400 bg-clip-text text-transparent">
              Built for Scale
            </span>
          </h1>
          <p className="text-lg text-gray-400 max-w-2xl mx-auto mb-8">
            Shadw provides a globally distributed serverless platform that runs your code at the edge, 
            closer to your users than ever before. No cold starts, no configuration, just deploy.
          </p>
          <div className="flex items-center justify-center gap-4">
            <Link href="/docs/quickstart">
              <Button className="bg-white text-black hover:bg-gray-200 rounded-full px-6 h-11">
                Get Started
                <ArrowRight className="ml-2 w-4 h-4" />
              </Button>
            </Link>
            <Link href="/demo">
              <Button variant="outline" className="border-gray-700 text-gray-300 hover:bg-white/5 hover:text-white rounded-full px-6 h-11 bg-transparent">
                Live Demo
              </Button>
            </Link>
          </div>
        </div>
      </section>

      {/* Stats */}
      <section className="relative z-10 py-16 px-6">
        <div className="mx-auto max-w-5xl">
          <div className="grid grid-cols-2 md:grid-cols-4 gap-8">
            {stats.map((stat) => (
              <div key={stat.label} className="text-center">
                <div className="text-3xl sm:text-4xl font-bold bg-gradient-to-r from-purple-400 to-cyan-400 bg-clip-text text-transparent mb-2">
                  {stat.value}
                </div>
                <div className="text-sm text-gray-500">{stat.label}</div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Features Grid */}
      <section className="relative z-10 py-20 px-6">
        <div className="mx-auto max-w-6xl">
          <div className="text-center mb-16">
            <h2 className="text-3xl font-bold text-white mb-4">Everything You Need</h2>
            <p className="text-gray-400 max-w-2xl mx-auto">
              A complete platform for building, deploying, and scaling applications at the edge.
            </p>
          </div>
          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
            {features.map((feature) => (
              <div 
                key={feature.title}
                className="p-6 rounded-2xl bg-gradient-to-b from-gray-900/50 to-transparent border border-gray-800/50 hover:border-purple-500/30 transition-colors group"
              >
                <div className="w-10 h-10 rounded-xl bg-purple-500/10 flex items-center justify-center mb-4 group-hover:bg-purple-500/20 transition-colors">
                  <feature.icon className="w-5 h-5 text-purple-400" />
                </div>
                <h3 className="text-lg font-semibold text-white mb-2">{feature.title}</h3>
                <p className="text-sm text-gray-400 leading-relaxed">{feature.description}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* How It Works */}
      <section className="relative z-10 py-20 px-6 border-t border-gray-800/50">
        <div className="mx-auto max-w-5xl">
          <div className="text-center mb-16">
            <h2 className="text-3xl font-bold text-white mb-4">How It Works</h2>
            <p className="text-gray-400 max-w-2xl mx-auto">
              Deploy your first function in minutes with our simple workflow.
            </p>
          </div>
          <div className="grid md:grid-cols-3 gap-8">
            {[
              { step: "01", icon: Cpu, title: "Write Your Code", description: "Write functions in JavaScript, TypeScript, Rust, Go, or any WASM-compatible language." },
              { step: "02", icon: Clock, title: "Deploy Instantly", description: "Push to deploy. Your code is distributed to 200+ edge locations in seconds." },
              { step: "03", icon: BarChart3, title: "Scale Automatically", description: "Handle traffic spikes effortlessly with automatic scaling and load balancing." },
            ].map((item) => (
              <div key={item.step} className="relative">
                <div className="text-6xl font-bold text-gray-800/50 absolute -top-2 -left-2">{item.step}</div>
                <div className="relative pt-8 pl-4">
                  <div className="w-10 h-10 rounded-xl bg-cyan-500/10 flex items-center justify-center mb-4">
                    <item.icon className="w-5 h-5 text-cyan-400" />
                  </div>
                  <h3 className="text-lg font-semibold text-white mb-2">{item.title}</h3>
                  <p className="text-sm text-gray-400 leading-relaxed">{item.description}</p>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* CTA */}
      <section className="relative z-10 py-20 px-6">
        <div className="mx-auto max-w-3xl text-center">
          <h2 className="text-3xl font-bold text-white mb-4">Ready to Get Started?</h2>
          <p className="text-gray-400 mb-8">
            Join thousands of developers building at the edge with Shadw.
          </p>
          <Link href="/docs/quickstart">
            <Button className="bg-gradient-to-r from-purple-600 to-cyan-600 hover:from-purple-500 hover:to-cyan-500 text-white rounded-full px-8 h-12 text-base">
              Start Building
              <ArrowRight className="ml-2 w-4 h-4" />
            </Button>
          </Link>
        </div>
      </section>
    </div>
  )
}

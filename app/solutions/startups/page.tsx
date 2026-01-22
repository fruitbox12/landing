"use client"

import Link from "next/link"
import Image from "next/image"
import { ArrowRight, Zap, DollarSign, Clock, Users, Sparkles, TrendingUp, Check, Rocket, Gift } from "lucide-react"
import { Button } from "@/components/ui/button"
import { Navbar } from "@/components/navbar"

const benefits = [
  {
    icon: DollarSign,
    title: "$50K in Credits",
    description: "Qualifying startups receive up to $50,000 in Shadw credits to build and scale without worrying about costs.",
  },
  {
    icon: Zap,
    title: "No Cold Starts",
    description: "Launch features instantly with sub-10ms response times. Your users get the speed they deserve from day one.",
  },
  {
    icon: Clock,
    title: "Ship Faster",
    description: "Focus on your product, not infrastructure. Deploy in seconds and iterate at the speed of thought.",
  },
  {
    icon: Users,
    title: "Dedicated Support",
    description: "Get direct access to our engineering team through a private Slack channel for rapid problem-solving.",
  },
  {
    icon: TrendingUp,
    title: "Scale to Millions",
    description: "When you hit product-market fit, Shadw scales automatically. No re-architecture needed.",
  },
  {
    icon: Sparkles,
    title: "Startup Perks",
    description: "Access exclusive partner deals, co-marketing opportunities, and introductions to VCs in our network.",
  },
]

const testimonials = [
  {
    quote: "Shadw let us launch in 50+ countries on day one. Our users don't even know we're a 3-person team.",
    author: "Sarah Chen",
    role: "Founder, Dataflow",
    avatar: "SC",
  },
  {
    quote: "We went from idea to 1M users in 6 months. Shadw's edge network handled our viral growth without a single hiccup.",
    author: "Marcus Rodriguez",
    role: "CTO, Pulse",
    avatar: "MR",
  },
]

const requirements = [
  "Less than 5 years old",
  "Raised under $20M in funding",
  "Building a technology product",
  "Not currently a Shadw customer",
]

export default function StartupsPage() {
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
      <div className="fixed left-[10%] top-[-10%] h-[700px] w-[700px] rounded-full bg-emerald-600/10 blur-[150px] pointer-events-none" />
      <div className="fixed right-[-15%] top-[40%] h-[600px] w-[600px] rounded-full bg-cyan-500/10 blur-[150px] pointer-events-none" />
      
      <Navbar />
      {/* Hero */}
      <section className="relative z-10 pt-24 pb-16 px-6">
        <div className="mx-auto max-w-4xl text-center">
          <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-emerald-500/10 border border-emerald-500/20 text-emerald-300 text-xs font-medium mb-6">
            <Rocket className="w-3 h-3" />
            Shadw for Startups
          </div>
          <h1 className="text-4xl sm:text-5xl lg:text-6xl font-bold tracking-tight mb-6">
            <span className="bg-gradient-to-r from-white via-gray-200 to-gray-400 bg-clip-text text-transparent">
              Build Like a Giant,
            </span>
            <br />
            <span className="bg-gradient-to-r from-emerald-400 to-cyan-400 bg-clip-text text-transparent">
              Pay Like a Startup
            </span>
          </h1>
          <p className="text-lg text-gray-400 max-w-2xl mx-auto mb-8">
            Get up to $50,000 in credits, priority support, and the same infrastructure 
            that powers Fortune 500 companies. Focus on building, we'll handle the scale.
          </p>
          <div className="flex items-center justify-center gap-4">
            <Button className="bg-emerald-600 hover:bg-emerald-500 text-white rounded-full px-6 h-11">
              Apply for Credits
              <ArrowRight className="ml-2 w-4 h-4" />
            </Button>
            <Link href="/docs/quickstart">
              <Button variant="outline" className="border-gray-700 text-gray-300 hover:bg-white/5 hover:text-white rounded-full px-6 h-11 bg-transparent">
                Start Building Free
              </Button>
            </Link>
          </div>
        </div>
      </section>

      {/* Credits Banner */}
      <section className="relative z-10 py-12 px-6">
        <div className="mx-auto max-w-4xl">
          <div className="p-8 rounded-3xl bg-gradient-to-r from-emerald-900/30 to-cyan-900/30 border border-emerald-500/20 text-center">
            <Gift className="w-12 h-12 text-emerald-400 mx-auto mb-4" />
            <h2 className="text-3xl font-bold text-white mb-2">$50,000 in Credits</h2>
            <p className="text-gray-400 max-w-xl mx-auto">
              Qualified startups receive generous credits to build and scale without upfront costs. 
              Valid for 12 months with no strings attached.
            </p>
          </div>
        </div>
      </section>

      {/* Benefits Grid */}
      <section className="relative z-10 py-20 px-6">
        <div className="mx-auto max-w-6xl">
          <div className="text-center mb-16">
            <h2 className="text-3xl font-bold text-white mb-4">Why Startups Choose Shadw</h2>
            <p className="text-gray-400 max-w-2xl mx-auto">
              Everything you need to move fast and compete with the big players.
            </p>
          </div>
          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
            {benefits.map((benefit) => (
              <div 
                key={benefit.title}
                className="p-6 rounded-2xl bg-gradient-to-b from-gray-900/50 to-transparent border border-gray-800/50 hover:border-emerald-500/30 transition-colors group"
              >
                <div className="w-10 h-10 rounded-xl bg-emerald-500/10 flex items-center justify-center mb-4 group-hover:bg-emerald-500/20 transition-colors">
                  <benefit.icon className="w-5 h-5 text-emerald-400" />
                </div>
                <h3 className="text-lg font-semibold text-white mb-2">{benefit.title}</h3>
                <p className="text-sm text-gray-400 leading-relaxed">{benefit.description}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Testimonials */}
      <section className="relative z-10 py-20 px-6 border-t border-gray-800/50">
        <div className="mx-auto max-w-5xl">
          <h2 className="text-2xl font-bold text-white text-center mb-12">From Our Startup Community</h2>
          <div className="grid md:grid-cols-2 gap-6">
            {testimonials.map((t) => (
              <div key={t.author} className="p-6 rounded-2xl bg-gray-900/30 border border-gray-800/50">
                <p className="text-gray-300 mb-6 italic">"{t.quote}"</p>
                <div className="flex items-center gap-3">
                  <div className="w-10 h-10 rounded-full bg-gradient-to-br from-emerald-500 to-cyan-500 flex items-center justify-center text-sm font-bold text-white">
                    {t.avatar}
                  </div>
                  <div>
                    <div className="text-sm font-medium text-white">{t.author}</div>
                    <div className="text-xs text-gray-500">{t.role}</div>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Requirements */}
      <section className="relative z-10 py-20 px-6">
        <div className="mx-auto max-w-3xl">
          <div className="p-8 rounded-2xl bg-gray-900/30 border border-gray-800/50">
            <h2 className="text-xl font-bold text-white mb-6 text-center">Program Requirements</h2>
            <div className="grid sm:grid-cols-2 gap-4">
              {requirements.map((req) => (
                <div key={req} className="flex items-center gap-3 text-sm text-gray-300">
                  <div className="w-2 h-2 rounded-full bg-emerald-400" />
                  {req}
                </div>
              ))}
            </div>
          </div>
        </div>
      </section>

      {/* CTA */}
      <section className="relative z-10 py-20 px-6">
        <div className="mx-auto max-w-3xl text-center">
          <h2 className="text-3xl font-bold text-white mb-4">Ready to Launch?</h2>
          <p className="text-gray-400 mb-8">
            Apply in 5 minutes. Most applications are reviewed within 48 hours.
          </p>
          <Button className="bg-gradient-to-r from-emerald-600 to-cyan-600 hover:from-emerald-500 hover:to-cyan-500 text-white rounded-full px-8 h-12 text-base">
            Apply for Startup Program
            <ArrowRight className="ml-2 w-4 h-4" />
          </Button>
        </div>
      </section>
    </div>
  )
}

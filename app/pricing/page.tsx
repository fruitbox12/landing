"use client"

import Link from "next/link"
import { Check, ArrowRight, Zap } from "lucide-react"
import { Button } from "@/components/ui/button"
import { Navbar } from "@/components/navbar"

const plans = [
  {
    name: "Starter",
    description: "Perfect for side projects and experimentation",
    price: "Free",
    period: "",
    features: [
      "100K requests/month",
      "10 edge functions",
      "5 edge locations",
      "Community support",
      "Basic analytics",
      "1GB bandwidth",
    ],
    cta: "Get Started",
    highlighted: false,
  },
  {
    name: "Pro",
    description: "For growing applications and teams",
    price: "$29",
    period: "/month",
    features: [
      "10M requests/month",
      "Unlimited functions",
      "All 200+ edge locations",
      "Priority support",
      "Advanced analytics",
      "100GB bandwidth",
      "Custom domains",
      "Team collaboration",
    ],
    cta: "Start Free Trial",
    highlighted: true,
  },
  {
    name: "Enterprise",
    description: "For large-scale production workloads",
    price: "Custom",
    period: "",
    features: [
      "Unlimited requests",
      "Unlimited functions",
      "All edge locations + private",
      "24/7 dedicated support",
      "Real-time analytics",
      "Unlimited bandwidth",
      "SLA guarantee (99.99%)",
      "SOC2 & HIPAA compliance",
      "Custom integrations",
    ],
    cta: "Contact Sales",
    highlighted: false,
  },
]

const faqs = [
  {
    q: "What counts as a request?",
    a: "Each HTTP request to your edge function counts as one request. Requests that hit the cache don't count against your limit.",
  },
  {
    q: "Can I upgrade or downgrade anytime?",
    a: "Yes, you can change your plan at any time. Upgrades take effect immediately, and downgrades apply at the next billing cycle.",
  },
  {
    q: "Is there a free trial for Pro?",
    a: "Yes, Pro comes with a 14-day free trial. No credit card required to start.",
  },
  {
    q: "What payment methods do you accept?",
    a: "We accept all major credit cards, PayPal, and wire transfers for Enterprise customers.",
  },
]

export default function PricingPage() {
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
      <div className="fixed left-[20%] top-[-10%] h-[600px] w-[600px] rounded-full bg-purple-600/10 blur-[150px] pointer-events-none" />
      <div className="fixed right-[10%] bottom-[10%] h-[500px] w-[500px] rounded-full bg-cyan-500/10 blur-[150px] pointer-events-none" />

      <Navbar />
      <nav className="flex items-center gap-6">
        <Link href="/overview" className="text-sm text-gray-400 hover:text-white transition-colors">Overview</Link>
        <Link href="/docs" className="text-sm text-gray-400 hover:text-white transition-colors">Docs</Link>
        <Link href="/demo">
          <Button size="sm" className="bg-gradient-to-r from-purple-600 to-cyan-600 hover:from-purple-500 hover:to-cyan-500 text-white rounded-full px-4">
            View Demo
          </Button>
        </Link>
      </nav>

      {/* Hero */}
      <section className="relative z-10 pt-24 pb-12 px-6">
        <div className="mx-auto max-w-4xl text-center">
          <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-cyan-500/10 border border-cyan-500/20 text-cyan-300 text-xs font-medium mb-6">
            <Zap className="w-3 h-3" />
            Simple, Transparent Pricing
          </div>
          <h1 className="text-4xl sm:text-5xl font-bold tracking-tight mb-6">
            <span className="bg-gradient-to-r from-white via-gray-200 to-gray-400 bg-clip-text text-transparent">
              Pay Only for What You Use
            </span>
          </h1>
          <p className="text-lg text-gray-400 max-w-2xl mx-auto">
            Start free, scale as you grow. No hidden fees, no surprises.
          </p>
        </div>
      </section>

      {/* Pricing Cards */}
      <section className="relative z-10 py-12 px-6">
        <div className="mx-auto max-w-6xl">
          <div className="grid md:grid-cols-3 gap-6">
            {plans.map((plan) => (
              <div 
                key={plan.name}
                className={`relative p-6 rounded-2xl border transition-all ${
                  plan.highlighted 
                    ? "bg-gradient-to-b from-purple-900/30 to-transparent border-purple-500/50 shadow-xl shadow-purple-500/10" 
                    : "bg-gray-900/30 border-gray-800/50 hover:border-gray-700"
                }`}
              >
                {plan.highlighted && (
                  <div className="absolute -top-3 left-1/2 -translate-x-1/2 px-3 py-1 rounded-full bg-gradient-to-r from-purple-600 to-cyan-600 text-xs font-medium text-white">
                    Most Popular
                  </div>
                )}
                <div className="mb-6">
                  <h3 className="text-xl font-semibold text-white mb-2">{plan.name}</h3>
                  <p className="text-sm text-gray-400">{plan.description}</p>
                </div>
                <div className="mb-6">
                  <span className="text-4xl font-bold text-white">{plan.price}</span>
                  <span className="text-gray-400">{plan.period}</span>
                </div>
                <ul className="space-y-3 mb-8">
                  {plan.features.map((feature) => (
                    <li key={feature} className="flex items-start gap-3 text-sm text-gray-300">
                      <Check className="w-4 h-4 text-cyan-400 mt-0.5 shrink-0" />
                      {feature}
                    </li>
                  ))}
                </ul>
                <Button 
                  className={`w-full rounded-full h-11 ${
                    plan.highlighted 
                      ? "bg-gradient-to-r from-purple-600 to-cyan-600 hover:from-purple-500 hover:to-cyan-500 text-white" 
                      : "bg-white/10 hover:bg-white/20 text-white"
                  }`}
                >
                  {plan.cta}
                  <ArrowRight className="ml-2 w-4 h-4" />
                </Button>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* FAQ */}
      <section className="relative z-10 py-20 px-6 border-t border-gray-800/50">
        <div className="mx-auto max-w-3xl">
          <h2 className="text-2xl font-bold text-white text-center mb-12">Frequently Asked Questions</h2>
          <div className="space-y-6">
            {faqs.map((faq) => (
              <div key={faq.q} className="p-5 rounded-xl bg-gray-900/30 border border-gray-800/50">
                <h3 className="text-base font-medium text-white mb-2">{faq.q}</h3>
                <p className="text-sm text-gray-400">{faq.a}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* CTA */}
      <section className="relative z-10 py-16 px-6">
        <div className="mx-auto max-w-3xl text-center">
          <h2 className="text-2xl font-bold text-white mb-4">Need a Custom Plan?</h2>
          <p className="text-gray-400 mb-6">
            Contact our sales team for custom pricing, volume discounts, and enterprise features.
          </p>
          <Button variant="outline" className="border-gray-700 text-gray-300 hover:bg-white/5 hover:text-white rounded-full px-6 h-11 bg-transparent">
            Contact Sales
          </Button>
        </div>
      </section>
    </div>
  )
}

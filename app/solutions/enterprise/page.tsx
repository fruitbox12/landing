"use client"

import Link from "next/link"
import Image from "next/image"
import { ArrowRight, Shield, Lock, Users, Building2, Globe, Headphones, FileCheck, Server } from "lucide-react"
import { Button } from "@/components/ui/button"
import { Navbar } from "@/components/navbar"

const features = [
  {
    icon: Shield,
    title: "Enterprise-Grade Security",
    description: "SOC2 Type II, HIPAA, and GDPR compliant infrastructure with end-to-end encryption and zero-trust architecture.",
  },
  {
    icon: Lock,
    title: "Private Edge Network",
    description: "Dedicated edge nodes with private networking, custom IP ranges, and VPC peering for maximum isolation.",
  },
  {
    icon: Users,
    title: "Team Management",
    description: "Advanced RBAC, SSO/SAML integration, audit logs, and granular permissions for enterprise teams.",
  },
  {
    icon: Building2,
    title: "Multi-Tenant Support",
    description: "Isolated environments per team or customer with resource quotas, billing separation, and custom policies.",
  },
  {
    icon: Globe,
    title: "Global SLA Guarantee",
    description: "99.99% uptime SLA with financial credits, dedicated account management, and priority incident response.",
  },
  {
    icon: Headphones,
    title: "24/7 Premium Support",
    description: "Dedicated support team, Slack/Teams integration, architecture reviews, and on-call engineering.",
  },
]

const logos = [
  "Fortune 500 Company",
  "Global Bank",
  "Tech Unicorn",
  "Healthcare Provider",
  "E-commerce Giant",
  "Media Network",
]

export default function EnterprisePage() {
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
      <div className="fixed left-[-15%] top-[10%] h-[700px] w-[700px] rounded-full bg-indigo-600/10 blur-[150px] pointer-events-none" />
      <div className="fixed right-[-10%] bottom-[20%] h-[600px] w-[600px] rounded-full bg-purple-500/10 blur-[150px] pointer-events-none" />

      {/* Navbar */}
      <Navbar />

      {/* Hero */}
      <section className="relative z-10 pt-24 pb-16 px-6">
        <div className="mx-auto max-w-4xl text-center">
          <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-indigo-500/10 border border-indigo-500/20 text-indigo-300 text-xs font-medium mb-6">
            <Building2 className="w-3 h-3" />
            Enterprise Solutions
          </div>
          <h1 className="text-4xl sm:text-5xl lg:text-6xl font-bold tracking-tight mb-6">
            <span className="bg-gradient-to-r from-white via-gray-200 to-gray-400 bg-clip-text text-transparent">
              Built for the World's
            </span>
            <br />
            <span className="bg-gradient-to-r from-indigo-400 to-purple-400 bg-clip-text text-transparent">
              Most Demanding Workloads
            </span>
          </h1>
          <p className="text-lg text-gray-400 max-w-2xl mx-auto mb-8">
            Shadw Enterprise provides the security, compliance, and scale that 
            Fortune 500 companies need to deploy globally with confidence.
          </p>
          <div className="flex items-center justify-center gap-4">
            <Button className="bg-white text-black hover:bg-gray-200 rounded-full px-6 h-11">
              Contact Sales
              <ArrowRight className="ml-2 w-4 h-4" />
            </Button>
            <Link href="/docs">
              <Button variant="outline" className="border-gray-700 text-gray-300 hover:bg-white/5 hover:text-white rounded-full px-6 h-11 bg-transparent">
                View Documentation
              </Button>
            </Link>
          </div>
        </div>
      </section>

      {/* Trust Logos */}
      <section className="relative z-10 py-12 px-6 border-y border-gray-800/50">
        <div className="mx-auto max-w-5xl">
          <p className="text-center text-sm text-gray-500 mb-8">Trusted by industry leaders</p>
          <div className="grid grid-cols-3 md:grid-cols-6 gap-8">
            {logos.map((logo) => (
              <div key={logo} className="flex items-center justify-center">
                <div className="h-8 w-24 rounded bg-gray-800/50 flex items-center justify-center text-[10px] text-gray-500">
                  {logo}
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Features Grid */}
      <section className="relative z-10 py-20 px-6">
        <div className="mx-auto max-w-6xl">
          <div className="text-center mb-16">
            <h2 className="text-3xl font-bold text-white mb-4">Enterprise Features</h2>
            <p className="text-gray-400 max-w-2xl mx-auto">
              Everything you need to run mission-critical applications at global scale.
            </p>
          </div>
          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
            {features.map((feature) => (
              <div 
                key={feature.title}
                className="p-6 rounded-2xl bg-gradient-to-b from-gray-900/50 to-transparent border border-gray-800/50 hover:border-indigo-500/30 transition-colors group"
              >
                <div className="w-10 h-10 rounded-xl bg-indigo-500/10 flex items-center justify-center mb-4 group-hover:bg-indigo-500/20 transition-colors">
                  <feature.icon className="w-5 h-5 text-indigo-400" />
                </div>
                <h3 className="text-lg font-semibold text-white mb-2">{feature.title}</h3>
                <p className="text-sm text-gray-400 leading-relaxed">{feature.description}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Compliance */}
      <section className="relative z-10 py-20 px-6 border-t border-gray-800/50">
        <div className="mx-auto max-w-5xl">
          <div className="grid md:grid-cols-2 gap-12 items-center">
            <div>
              <h2 className="text-3xl font-bold text-white mb-4">Security & Compliance</h2>
              <p className="text-gray-400 mb-6">
                Our infrastructure meets the highest standards for security and regulatory compliance, 
                enabling you to deploy in regulated industries with confidence.
              </p>
              <div className="grid grid-cols-2 gap-4">
                {[
                  { icon: FileCheck, label: "SOC2 Type II" },
                  { icon: Shield, label: "HIPAA" },
                  { icon: Lock, label: "GDPR" },
                  { icon: Server, label: "ISO 27001" },
                ].map((cert) => (
                  <div key={cert.label} className="flex items-center gap-3 p-3 rounded-lg bg-gray-900/50 border border-gray-800/50">
                    <cert.icon className="w-5 h-5 text-indigo-400" />
                    <span className="text-sm text-gray-300">{cert.label}</span>
                  </div>
                ))}
              </div>
            </div>
            <div className="p-8 rounded-2xl bg-gradient-to-br from-indigo-900/20 to-purple-900/20 border border-indigo-500/20">
              <h3 className="text-xl font-semibold text-white mb-4">Request a Security Review</h3>
              <p className="text-sm text-gray-400 mb-6">
                Our security team is available to conduct architecture reviews and answer compliance questions.
              </p>
              <Button className="w-full bg-indigo-600 hover:bg-indigo-500 text-white rounded-full h-11">
                Schedule Review
              </Button>
            </div>
          </div>
        </div>
      </section>

      {/* CTA */}
      <section className="relative z-10 py-20 px-6">
        <div className="mx-auto max-w-3xl text-center">
          <h2 className="text-3xl font-bold text-white mb-4">Ready to Scale?</h2>
          <p className="text-gray-400 mb-8">
            Talk to our enterprise team about your specific requirements and get a custom quote.
          </p>
          <Button className="bg-gradient-to-r from-indigo-600 to-purple-600 hover:from-indigo-500 hover:to-purple-500 text-white rounded-full px-8 h-12 text-base">
            Contact Enterprise Sales
            <ArrowRight className="ml-2 w-4 h-4" />
          </Button>
        </div>
      </section>
    </div>
  )
}

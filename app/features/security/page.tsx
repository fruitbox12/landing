"use client"

import Link from "next/link"
import Image from "next/image"
import { ArrowRight, Shield, Lock, Key, Eye, Server, Fingerprint, ShieldCheck, FileCheck } from "lucide-react"
import { Button } from "@/components/ui/button"
import { Navbar } from "@/components/navbar"

const securityFeatures = [
  {
    icon: Shield,
    title: "Zero Trust Architecture",
    description: "Every request is authenticated and authorized. No implicit trust, even within our network.",
    details: ["mTLS everywhere", "Identity-based access", "Least privilege by default"],
  },
  {
    icon: Lock,
    title: "End-to-End Encryption",
    description: "All data is encrypted in transit and at rest using industry-leading algorithms.",
    details: ["TLS 1.3", "AES-256 encryption", "Forward secrecy"],
  },
  {
    icon: Key,
    title: "Secrets Management",
    description: "Securely store and inject environment variables and secrets into your functions.",
    details: ["Encrypted storage", "Automatic rotation", "Audit logging"],
  },
  {
    icon: Fingerprint,
    title: "Hardware Isolation",
    description: "Each function runs in its own isolated sandbox with hardware-level protection.",
    details: ["V8 isolates", "No shared memory", "Process isolation"],
  },
  {
    icon: Eye,
    title: "DDoS Protection",
    description: "Built-in protection against volumetric, protocol, and application-layer attacks.",
    details: ["Rate limiting", "Bot detection", "Traffic scrubbing"],
  },
  {
    icon: Server,
    title: "Private Networking",
    description: "Connect your edge functions to private backends securely without public exposure.",
    details: ["VPC peering", "Private subnets", "IP allowlisting"],
  },
]

const certifications = [
  { name: "SOC 2 Type II", description: "Annual security audits" },
  { name: "HIPAA", description: "Healthcare compliance" },
  { name: "GDPR", description: "EU data protection" },
  { name: "ISO 27001", description: "Information security" },
  { name: "PCI DSS", description: "Payment security" },
  { name: "CSA STAR", description: "Cloud security" },
]

export default function SecurityFeaturePage() {
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
      <div className="fixed left-[-10%] top-[5%] h-[700px] w-[700px] rounded-full bg-red-600/8 blur-[150px] pointer-events-none" />
      <div className="fixed right-[-10%] top-[40%] h-[600px] w-[600px] rounded-full bg-orange-500/8 blur-[150px] pointer-events-none" />

      <Navbar />
      <nav className="flex items-center gap-6">
        <Link href="/features/performance" className="text-sm text-gray-400 hover:text-white transition-colors">Performance</Link>
        <Link href="/docs" className="text-sm text-gray-400 hover:text-white transition-colors">Docs</Link>
        <Link href="/demo">
          <Button size="sm" className="bg-gradient-to-r from-red-600 to-orange-600 hover:from-red-500 hover:to-orange-500 text-white rounded-full px-4">
            View Demo
          </Button>
        </Link>
      </nav>

      {/* Hero */}
      <section className="relative z-10 pt-24 pb-16 px-6">
        <div className="mx-auto max-w-4xl text-center">
          <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-red-500/10 border border-red-500/20 text-red-300 text-xs font-medium mb-6">
            <Shield className="w-3 h-3" />
            Enterprise Security
          </div>
          <h1 className="text-4xl sm:text-5xl lg:text-6xl font-bold tracking-tight mb-6">
            <span className="bg-gradient-to-r from-white via-gray-200 to-gray-400 bg-clip-text text-transparent">
              Security Without
            </span>
            <br />
            <span className="bg-gradient-to-r from-red-400 to-orange-400 bg-clip-text text-transparent">
              Compromise
            </span>
          </h1>
          <p className="text-lg text-gray-400 max-w-2xl mx-auto mb-8">
            Built from the ground up with security as a core principle. 
            Every layer of our stack is designed to protect your code and data.
          </p>
          <div className="flex items-center justify-center gap-4">
            <Link href="/docs/security">
              <Button className="bg-white text-black hover:bg-gray-200 rounded-full px-6 h-11">
                Security Docs
                <ArrowRight className="ml-2 w-4 h-4" />
              </Button>
            </Link>
            <Button variant="outline" className="border-gray-700 text-gray-300 hover:bg-white/5 hover:text-white rounded-full px-6 h-11 bg-transparent">
              Request Audit Report
            </Button>
          </div>
        </div>
      </section>

      {/* Security Features Grid */}
      <section className="relative z-10 py-20 px-6">
        <div className="mx-auto max-w-6xl">
          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
            {securityFeatures.map((feature) => (
              <div 
                key={feature.title}
                className="p-6 rounded-2xl bg-gradient-to-b from-gray-900/50 to-transparent border border-gray-800/50 hover:border-red-500/30 transition-colors group"
              >
                <div className="w-10 h-10 rounded-xl bg-red-500/10 flex items-center justify-center mb-4 group-hover:bg-red-500/20 transition-colors">
                  <feature.icon className="w-5 h-5 text-red-400" />
                </div>
                <h3 className="text-lg font-semibold text-white mb-2">{feature.title}</h3>
                <p className="text-sm text-gray-400 mb-4">{feature.description}</p>
                <ul className="space-y-1">
                  {feature.details.map((detail) => (
                    <li key={detail} className="text-xs text-gray-500 flex items-center gap-2">
                      <div className="w-1 h-1 rounded-full bg-red-400/50" />
                      {detail}
                    </li>
                  ))}
                </ul>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Certifications */}
      <section className="relative z-10 py-20 px-6 border-t border-gray-800/50">
        <div className="mx-auto max-w-5xl">
          <div className="text-center mb-12">
            <h2 className="text-3xl font-bold text-white mb-4">Compliance & Certifications</h2>
            <p className="text-gray-400 max-w-2xl mx-auto">
              We maintain the highest standards of compliance to meet your regulatory requirements.
            </p>
          </div>
          <div className="grid grid-cols-2 md:grid-cols-3 gap-4">
            {certifications.map((cert) => (
              <div 
                key={cert.name}
                className="p-5 rounded-xl bg-gray-900/30 border border-gray-800/50 hover:border-gray-700 transition-colors text-center"
              >
                <ShieldCheck className="w-8 h-8 text-red-400 mx-auto mb-3" />
                <h3 className="text-base font-semibold text-white mb-1">{cert.name}</h3>
                <p className="text-xs text-gray-500">{cert.description}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Security Practices */}
      <section className="relative z-10 py-20 px-6">
        <div className="mx-auto max-w-4xl">
          <div className="p-8 rounded-2xl bg-gradient-to-br from-red-900/20 to-orange-900/20 border border-red-500/20">
            <div className="flex items-start gap-4 mb-6">
              <div className="w-12 h-12 rounded-xl bg-red-500/20 flex items-center justify-center shrink-0">
                <FileCheck className="w-6 h-6 text-red-400" />
              </div>
              <div>
                <h3 className="text-xl font-semibold text-white mb-2">Security Practices</h3>
                <p className="text-gray-400 text-sm">
                  Our security program is continuously evolving to address new threats and vulnerabilities.
                </p>
              </div>
            </div>
            <div className="grid sm:grid-cols-2 gap-4">
              {[
                "Regular penetration testing",
                "Bug bounty program",
                "24/7 security monitoring",
                "Incident response team",
                "Automated vulnerability scanning",
                "Employee security training",
              ].map((practice) => (
                <div key={practice} className="flex items-center gap-3 text-sm text-gray-300">
                  <div className="w-2 h-2 rounded-full bg-red-400" />
                  {practice}
                </div>
              ))}
            </div>
          </div>
        </div>
      </section>

      {/* CTA */}
      <section className="relative z-10 py-20 px-6">
        <div className="mx-auto max-w-3xl text-center">
          <h2 className="text-3xl font-bold text-white mb-4">Questions About Security?</h2>
          <p className="text-gray-400 mb-8">
            Our security team is available to discuss your specific requirements and compliance needs.
          </p>
          <Button className="bg-gradient-to-r from-red-600 to-orange-600 hover:from-red-500 hover:to-orange-500 text-white rounded-full px-8 h-12 text-base">
            Contact Security Team
            <ArrowRight className="ml-2 w-4 h-4" />
          </Button>
        </div>
      </section>
    </div>
  )
}

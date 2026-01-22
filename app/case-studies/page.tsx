"use client"

import Link from "next/link"
import Image from "next/image" // Import Image component
import { ArrowRight, ArrowLeft, Building2, TrendingUp, Globe, Users, Zap, BarChart3, Quote } from "lucide-react"
import { Button } from "@/components/ui/button"
import { Navbar } from "@/components/navbar"

const featuredStudy = {
  slug: "streamline-ai",
  company: "Streamline AI",
  logo: "S",
  industry: "Artificial Intelligence",
  region: "Global",
  title: "How Streamline AI Reduced Inference Latency by 85% with Shadw",
  excerpt: "Streamline AI needed to serve ML models globally with sub-50ms latency. With Shadw's edge computing platform, they achieved 15ms average response times while cutting infrastructure costs by 60%. Their AI-powered content moderation system now processes over 10 million requests per day across 47 regions.",
  quote: "Shadw transformed how we deliver AI at scale. What used to take months to optimize now happens automatically.",
  quoteAuthor: "Dr. Maya Patel",
  quoteRole: "CTO, Streamline AI",
  stats: [
    { label: "Latency Reduction", value: "85%", icon: Zap },
    { label: "Cost Savings", value: "60%", icon: TrendingUp },
    { label: "Global Regions", value: "47", icon: Globe },
    { label: "Daily Requests", value: "10M+", icon: BarChart3 }
  ],
  color: "from-purple-500 to-indigo-600",
  technologies: ["WebAssembly", "Edge Workers", "GPU Compute"]
}

const caseStudies = [
  {
    slug: "fintech-global",
    company: "FinTech Global",
    logo: "F",
    industry: "Financial Services",
    region: "EMEA",
    title: "Achieving PCI-DSS Compliance at the Edge",
    excerpt: "How a leading payment processor secured sensitive transactions across 30+ countries while maintaining sub-100ms response times for real-time fraud detection.",
    stats: { primary: "99.999%", label: "Uptime", secondary: "30+", secondaryLabel: "Countries" },
    color: "from-cyan-500 to-blue-600",
    technologies: ["Zero-Trust", "Encryption"]
  },
  {
    slug: "medistream",
    company: "MediStream",
    logo: "M",
    industry: "Healthcare",
    region: "North America",
    title: "HIPAA-Compliant Video Streaming at Scale",
    excerpt: "MediStream deployed secure telehealth infrastructure serving 2M+ patients with end-to-end encrypted, low-latency video consultations.",
    stats: { primary: "2M+", label: "Patients Served", secondary: "99.9%", secondaryLabel: "Video Quality" },
    color: "from-emerald-500 to-teal-600",
    technologies: ["HIPAA", "Real-time Video"]
  },
  {
    slug: "gameforge",
    company: "GameForge Studios",
    logo: "G",
    industry: "Gaming",
    region: "Asia Pacific",
    title: "Real-Time Multiplayer at Global Scale",
    excerpt: "How GameForge eliminated lag for players worldwide by deploying game state logic to 50+ edge locations with deterministic execution.",
    stats: { primary: "12ms", label: "Avg Latency", secondary: "50+", secondaryLabel: "Edge Locations" },
    color: "from-orange-500 to-red-600",
    technologies: ["WebSocket", "State Sync"]
  },
  {
    slug: "retailnow",
    company: "RetailNow",
    logo: "R",
    industry: "E-Commerce",
    region: "Global",
    title: "Scaling Black Friday Traffic 100x",
    excerpt: "RetailNow handled 50M concurrent users during peak shopping season without a single timeout, processing $2B+ in transactions.",
    stats: { primary: "50M", label: "Concurrent Users", secondary: "$2B+", secondaryLabel: "Transactions" },
    color: "from-pink-500 to-rose-600",
    technologies: ["Auto-scaling", "Edge Cache"]
  },
  {
    slug: "iot-connect",
    company: "IoT Connect",
    logo: "I",
    industry: "Internet of Things",
    region: "EMEA",
    title: "Processing 1B+ IoT Events Daily",
    excerpt: "Managing real-time data from millions of connected devices with edge processing, intelligent routing, and predictive analytics.",
    stats: { primary: "1B+", label: "Daily Events", secondary: "5ms", secondaryLabel: "Processing Time" },
    color: "from-violet-500 to-purple-600",
    technologies: ["MQTT", "Stream Processing"]
  },
  {
    slug: "newswave",
    company: "NewsWave",
    logo: "N",
    industry: "Media & Publishing",
    region: "Global",
    title: "Personalizing Content for 100M Readers",
    excerpt: "Delivering personalized news feeds with edge-computed recommendations in under 20ms, increasing engagement by 340%.",
    stats: { primary: "100M", label: "Monthly Readers", secondary: "340%", secondaryLabel: "Engagement Lift" },
    color: "from-amber-500 to-yellow-600",
    technologies: ["ML Inference", "Personalization"]
  }
]

const industries = [
  { name: "All Industries", count: 24 },
  { name: "Financial Services", count: 6 },
  { name: "Healthcare", count: 4 },
  { name: "Gaming", count: 5 },
  { name: "E-Commerce", count: 4 },
  { name: "IoT", count: 3 },
  { name: "Media", count: 2 }
]

const impactMetrics = [
  { value: "500+", label: "Enterprise Customers" },
  { value: "99.99%", label: "Platform Uptime" },
  { value: "47", label: "Global Regions" },
  { value: "$2B+", label: "Customer Savings" }
]

export default function CaseStudiesPage() {
  return (
    <div className="min-h-screen bg-[#050506] text-white relative overflow-hidden">
      {/* Grid background */}
      <div 
        className="fixed inset-0 pointer-events-none opacity-[0.02]"
        style={{
          backgroundImage: `linear-gradient(rgba(255,255,255,0.5) 1px, transparent 1px), linear-gradient(90deg, rgba(255,255,255,0.5) 1px, transparent 1px)`,
          backgroundSize: '40px 40px',
        }}
      />
      <div className="fixed inset-0 pointer-events-none bg-[radial-gradient(ellipse_80%_80%_at_50%_50%,_transparent_0%,_#050506_100%)]" />
      
      {/* Background glows */}
      <div className="fixed left-[-20%] top-[20%] h-[700px] w-[700px] rounded-full bg-indigo-600/10 blur-[150px] pointer-events-none" />
      <div className="fixed right-[-15%] bottom-[-10%] h-[600px] w-[600px] rounded-full bg-cyan-500/8 blur-[150px] pointer-events-none" />

      <Navbar />

      <main className="relative z-10 py-16 px-6">
        <div className="mx-auto max-w-7xl">
          {/* Page Header */}
          <div className="text-center mb-16">
            <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-indigo-500/10 border border-indigo-500/20 text-indigo-300 text-xs font-medium mb-4">
              <Building2 className="w-3 h-3" />
              Customer Success
            </div>
            <h1 className="text-4xl sm:text-5xl lg:text-6xl font-bold mb-4 bg-gradient-to-r from-white via-gray-200 to-gray-400 bg-clip-text text-transparent">
              Case Studies
            </h1>
            <p className="text-gray-400 text-lg max-w-2xl mx-auto mb-12">
              Discover how industry leaders are using Shadw to build faster, more reliable, and more secure applications at global scale.
            </p>

            {/* Impact Metrics */}
            <div className="grid grid-cols-2 md:grid-cols-4 gap-4 max-w-3xl mx-auto">
              {impactMetrics.map((metric) => (
                <div key={metric.label} className="text-center p-4">
                  <div className="text-3xl md:text-4xl font-bold bg-gradient-to-r from-indigo-400 to-cyan-400 bg-clip-text text-transparent">
                    {metric.value}
                  </div>
                  <div className="text-sm text-gray-500 mt-1">{metric.label}</div>
                </div>
              ))}
            </div>
          </div>

          {/* Featured Case Study */}
          <div className="mb-20">
            <div className="flex items-center gap-2 mb-6">
              <div className="h-px flex-1 bg-gradient-to-r from-transparent via-indigo-500/30 to-transparent" />
              <span className="text-xs font-medium text-indigo-400 uppercase tracking-wider">Featured Story</span>
              <div className="h-px flex-1 bg-gradient-to-r from-transparent via-indigo-500/30 to-transparent" />
            </div>
            
            <Link href={`/case-studies/${featuredStudy.slug}`} className="block group">
              <div className="relative rounded-3xl overflow-hidden border border-indigo-500/20 bg-gradient-to-br from-indigo-500/5 via-transparent to-purple-500/5">
                <div className="grid lg:grid-cols-5 gap-0">
                  {/* Visual Section */}
                  <div className={`lg:col-span-2 min-h-[300px] lg:min-h-[500px] bg-gradient-to-br ${featuredStudy.color} p-8 flex flex-col justify-between relative overflow-hidden`}>
                    <div className="absolute inset-0 bg-[radial-gradient(circle_at_30%_20%,_rgba(255,255,255,0.15)_0%,_transparent_50%)]" />
                    <div className="absolute bottom-0 right-0 w-64 h-64 bg-black/10 rounded-full blur-3xl translate-x-1/2 translate-y-1/2" />
                    
                    <div className="relative">
                      <div className="w-20 h-20 rounded-2xl bg-white/20 backdrop-blur flex items-center justify-center text-4xl font-bold text-white mb-4 shadow-lg">
                        {featuredStudy.logo}
                      </div>
                      <div className="flex flex-wrap gap-2 mb-2">
                        {featuredStudy.technologies.map(tech => (
                          <span key={tech} className="px-2 py-1 bg-white/10 backdrop-blur text-white/80 text-xs rounded-full">
                            {tech}
                          </span>
                        ))}
                      </div>
                    </div>
                    
                    <div className="relative">
                      <div className="text-white/60 text-sm mb-1">{featuredStudy.industry}</div>
                      <div className="text-white text-3xl font-bold">{featuredStudy.company}</div>
                      <div className="flex items-center gap-2 mt-2 text-white/60 text-sm">
                        <Globe className="w-4 h-4" />
                        {featuredStudy.region}
                      </div>
                    </div>
                  </div>
                  
                  {/* Content Section */}
                  <div className="lg:col-span-3 p-8 lg:p-12 flex flex-col justify-center">
                    <h2 className="text-2xl lg:text-4xl font-bold mb-6 group-hover:text-indigo-300 transition-colors leading-tight">
                      {featuredStudy.title}
                    </h2>
                    
                    <p className="text-gray-400 mb-8 text-lg leading-relaxed">
                      {featuredStudy.excerpt}
                    </p>

                    {/* Quote */}
                    <div className="relative mb-8 pl-6 border-l-2 border-indigo-500/50">
                      <Quote className="absolute -left-3 -top-1 w-6 h-6 text-indigo-500/50" />
                      <p className="text-gray-300 italic mb-3">"{featuredStudy.quote}"</p>
                      <div className="text-sm">
                        <span className="text-white font-medium">{featuredStudy.quoteAuthor}</span>
                        <span className="text-gray-500"> · {featuredStudy.quoteRole}</span>
                      </div>
                    </div>
                    
                    {/* Stats */}
                    <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
                      {featuredStudy.stats.map((stat) => {
                        const Icon = stat.icon
                        return (
                          <div key={stat.label} className="bg-white/[0.03] rounded-xl p-4 border border-white/5">
                            <Icon className="w-5 h-5 text-indigo-400 mb-2" />
                            <div className="text-2xl font-bold text-white">{stat.value}</div>
                            <div className="text-xs text-gray-500">{stat.label}</div>
                          </div>
                        )
                      })}
                    </div>
                  </div>
                </div>
              </div>
            </Link>
          </div>

          {/* Main Content */}
          <div className="grid lg:grid-cols-4 gap-8">
            {/* Sidebar */}
            <aside className="lg:col-span-1 order-2 lg:order-1">
              <div className="sticky top-8 space-y-6">
                {/* Industry Filter */}
                <div className="rounded-2xl border border-white/10 bg-white/[0.02] p-6">
                  <h3 className="text-sm font-semibold text-white mb-4">Industries</h3>
                  <div className="space-y-2">
                    {industries.map((industry, i) => (
                      <button
                        key={industry.name}
                        className={`w-full flex items-center justify-between px-3 py-2 rounded-lg text-sm transition-all ${
                          i === 0 
                            ? "bg-indigo-500/20 text-indigo-300" 
                            : "text-gray-400 hover:bg-white/5 hover:text-white"
                        }`}
                      >
                        <span>{industry.name}</span>
                        <span className={`text-xs ${i === 0 ? "text-indigo-400" : "text-gray-600"}`}>{industry.count}</span>
                      </button>
                    ))}
                  </div>
                </div>

                {/* Talk to Sales CTA */}
                <div className="rounded-2xl border border-white/10 bg-gradient-to-br from-indigo-500/10 to-transparent p-6">
                  <Users className="w-8 h-8 text-indigo-400 mb-3" />
                  <h3 className="text-sm font-semibold text-white mb-2">Want Similar Results?</h3>
                  <p className="text-xs text-gray-500 mb-4">Talk to our team about your use case and see how Shadw can help.</p>
                  <Button className="w-full bg-indigo-600 hover:bg-indigo-500 text-white text-sm rounded-lg">
                    Contact Sales
                  </Button>
                </div>
              </div>
            </aside>

            {/* Case Studies Grid */}
            <div className="lg:col-span-3 order-1 lg:order-2">
              <div className="flex items-center justify-between mb-6">
                <h2 className="text-xl font-semibold">All Case Studies</h2>
              </div>

              <div className="grid md:grid-cols-2 gap-6">
                {caseStudies.map((study) => (
                  <Link key={study.slug} href={`/case-studies/${study.slug}`} className="group">
                    <article className="h-full rounded-2xl border border-white/10 bg-white/[0.02] overflow-hidden hover:border-indigo-500/30 transition-all">
                      {/* Card Header */}
                      <div className={`h-28 bg-gradient-to-br ${study.color} p-5 flex items-end relative overflow-hidden`}>
                        <div className="absolute inset-0 bg-[radial-gradient(circle_at_80%_20%,_rgba(255,255,255,0.15)_0%,_transparent_50%)]" />
                        <div className="absolute top-4 right-4">
                          <div className="w-12 h-12 rounded-xl bg-white/20 backdrop-blur flex items-center justify-center text-xl font-bold text-white">
                            {study.logo}
                          </div>
                        </div>
                        <div className="relative">
                          <div className="text-white/70 text-xs mb-0.5">{study.industry}</div>
                          <div className="text-white font-semibold text-lg">{study.company}</div>
                        </div>
                      </div>
                      
                      {/* Card Body */}
                      <div className="p-5">
                        <div className="flex flex-wrap gap-1.5 mb-3">
                          {study.technologies.map(tech => (
                            <span key={tech} className="px-2 py-0.5 bg-white/5 text-gray-500 text-xs rounded">
                              {tech}
                            </span>
                          ))}
                        </div>
                        <h3 className="text-lg font-semibold mb-2 group-hover:text-indigo-300 transition-colors line-clamp-2">
                          {study.title}
                        </h3>
                        <p className="text-gray-500 text-sm mb-4 line-clamp-2">
                          {study.excerpt}
                        </p>
                        <div className="flex items-center justify-between pt-4 border-t border-white/5">
                          <div className="flex gap-6">
                            <div>
                              <div className="text-xl font-bold text-white">{study.stats.primary}</div>
                              <div className="text-xs text-gray-500">{study.stats.label}</div>
                            </div>
                            <div>
                              <div className="text-xl font-bold text-white">{study.stats.secondary}</div>
                              <div className="text-xs text-gray-500">{study.stats.secondaryLabel}</div>
                            </div>
                          </div>
                          <ArrowRight className="w-5 h-5 text-gray-600 group-hover:text-indigo-400 group-hover:translate-x-1 transition-all" />
                        </div>
                      </div>
                    </article>
                  </Link>
                ))}
              </div>
            </div>
          </div>

          {/* CTA Section */}
          <div className="mt-24 relative">
            <div className="absolute inset-0 bg-gradient-to-r from-indigo-500/10 via-purple-500/10 to-cyan-500/10 rounded-3xl blur-3xl" />
            <div className="relative rounded-3xl border border-white/10 bg-[#0a0a0c] p-12 md:p-16 text-center">
              <div className="w-16 h-16 mx-auto mb-6 rounded-2xl bg-gradient-to-br from-indigo-500 to-purple-600 flex items-center justify-center">
                <Zap className="w-8 h-8 text-white" />
              </div>
              <h3 className="text-3xl md:text-4xl font-bold mb-4">Ready to Write Your Success Story?</h3>
              <p className="text-gray-400 mb-8 max-w-xl mx-auto text-lg">
                Join hundreds of companies building faster, more reliable applications with Shadw. Start your free trial today.
              </p>
              <div className="flex flex-col sm:flex-row gap-4 justify-center">
                <Button size="lg" className="bg-white text-black hover:bg-gray-200 rounded-full px-8">
                  Start Free Trial
                  <ArrowRight className="w-4 h-4 ml-2" />
                </Button>
                <Button size="lg" variant="outline" className="rounded-full border-gray-700 bg-transparent text-gray-300 hover:bg-white/5 px-8">
                  Schedule Demo
                </Button>
              </div>
            </div>
          </div>
        </div>
      </main>
    </div>
  )
}

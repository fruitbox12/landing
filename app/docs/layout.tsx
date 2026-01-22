"use client"

import { Button } from "@/components/ui/button"
import Image from "next/image"
import ArrowLeft from "lucide-react" // Import ArrowLeft here
import React from "react"
import { useState } from "react"
import Link from "next/link"
import { usePathname } from "next/navigation"
import { ChevronRight, ChevronDown, Book, Zap, Code2, Database, Terminal, Settings, Layers, Shield, Globe } from "lucide-react"
import { Navbar } from "@/components/navbar"

const navigation = [
  {
    title: "Getting Started",
    items: [
      { id: "overview", label: "Overview", icon: Book, href: "/docs" },
      { id: "quickstart", label: "Quick Start", icon: Zap, href: "/docs/quickstart" },
      { id: "installation", label: "Installation", icon: Terminal, href: "/docs/installation" },
      { id: "configuration", label: "Configuration", icon: Settings, href: "/docs/configuration" },
    ]
  },
  {
    title: "Core Concepts",
    items: [
      { id: "architecture", label: "Architecture", icon: Layers, href: "/docs/architecture" },
      { id: "workers", label: "Workers", icon: Globe, href: "/docs/workers" },
      { id: "security", label: "Security", icon: Shield, href: "/docs/security" },
    ]
  },
  {
    title: "API Reference",
    items: [
      { id: "health", label: "Health", icon: Zap, href: "/docs/api/health" },
      { id: "functions", label: "Functions", icon: Code2, href: "/docs/api/functions" },
      { id: "invoke", label: "Invoke", icon: Terminal, href: "/docs/api/invoke" },
      { id: "graph", label: "Graph", icon: Database, href: "/docs/api/graph" },
    ]
  },
  {
    title: "Schemas",
    items: [
      { id: "schemas", label: "All Schemas", icon: Database, href: "/docs/schemas" },
    ]
  }
]

export default function DocsLayout({ children }: { children: React.ReactNode }) {
  const pathname = usePathname()
  const [expandedSections, setExpandedSections] = useState<string[]>(["Getting Started", "Core Concepts", "API Reference", "Schemas"])

  const toggleSection = (title: string) => {
    setExpandedSections(prev => prev.includes(title) ? prev.filter(s => s !== title) : [...prev, title])
  }

  return (
    <div className="min-h-screen bg-[#0a0a0b] text-white">
      {/* Background glows */}
      <div className="fixed left-0 top-0 h-[700px] w-[700px] -translate-x-40 -translate-y-20 bg-[radial-gradient(circle_at_center,_rgba(147,51,234,0.12)_0%,_transparent_60%)] blur-3xl pointer-events-none" />
      <div className="fixed right-0 top-40 h-[600px] w-[500px] translate-x-32 bg-[radial-gradient(circle_at_center,_rgba(34,211,238,0.1)_0%,_transparent_60%)] blur-3xl pointer-events-none" />
      <div className="fixed bottom-0 left-1/2 h-[400px] w-[800px] -translate-x-1/2 bg-[radial-gradient(circle_at_center,_rgba(168,85,247,0.06)_0%,_transparent_60%)] blur-3xl pointer-events-none" />

      <Navbar />

      <div className="flex">
        {/* Sidebar */}
        <aside className="sticky top-16 h-[calc(100vh-64px)] w-64 lg:w-72 border-r border-gray-800/50 bg-[#0a0a0b]/80 backdrop-blur-sm overflow-y-auto hidden md:block">
          <nav className="p-4 lg:p-6">
            {navigation.map((section) => (
              <div key={section.title} className="mb-6">
                <button
                  onClick={() => toggleSection(section.title)}
                  className="flex items-center justify-between w-full mb-3 group"
                >
                  <h3 className="text-[10px] lg:text-[11px] font-semibold text-gray-500 uppercase tracking-widest group-hover:text-gray-400 transition-colors">
                    {section.title}
                  </h3>
                  {expandedSections.includes(section.title) ? (
                    <ChevronDown className="h-3 w-3 text-gray-600" />
                  ) : (
                    <ChevronRight className="h-3 w-3 text-gray-600" />
                  )}
                </button>
                {expandedSections.includes(section.title) && (
                  <ul className="space-y-0.5">
                    {section.items.map(item => {
                      const isActive = pathname === item.href
                      return (
                        <li key={item.id}>
                          <Link
                            href={item.href}
                            className={`w-full text-left px-3 py-2 rounded-lg text-xs lg:text-sm transition-all flex items-center gap-2.5 ${
                              isActive 
                                ? "bg-gradient-to-r from-cyan-500/10 to-purple-500/10 text-white border border-cyan-500/20" 
                                : "text-gray-400 hover:text-white hover:bg-white/5"
                            }`}
                          >
                            <item.icon className="h-3.5 w-3.5 flex-shrink-0" />
                            <span className="truncate">{item.label}</span>
                          </Link>
                        </li>
                      )
                    })}
                  </ul>
                )}
              </div>
            ))}
          </nav>
        </aside>

        {/* Main Content */}
        <main className="flex-1 min-w-0 p-4 sm:p-6 lg:p-10 xl:p-12">
          <div className="max-w-3xl">
            {children}
          </div>
        </main>
      </div>
    </div>
  )
}

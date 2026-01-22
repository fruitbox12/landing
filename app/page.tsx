"use client"

import { useState, useEffect } from "react"
import Link from "next/link"
import Image from "next/image"
import { ArrowRight } from "lucide-react"
import { Button } from "@/components/ui/button"
import {
  NavigationMenu,
  NavigationMenuContent,
  NavigationMenuItem,
  NavigationMenuLink,
  NavigationMenuList,
  NavigationMenuTrigger,
} from "@/components/ui/navigation-menu"

export default function ShadwLanding() {
  const [isLoading, setIsLoading] = useState(() => {
    // Check if we've already shown the loading animation this session
    if (typeof window !== 'undefined') {
      return !sessionStorage.getItem('shadw-loaded')
    }
    return true
  })

  useEffect(() => {
    // If already loaded this session, skip animation
    if (typeof window !== 'undefined' && sessionStorage.getItem('shadw-loaded')) {
      setIsLoading(false)
      return
    }
    
    const timer = setTimeout(() => {
      setIsLoading(false)
      // Mark as loaded for this session
      if (typeof window !== 'undefined') {
        sessionStorage.setItem('shadw-loaded', 'true')
      }
    }, 1800)
    return () => clearTimeout(timer)
  }, [])

  if (isLoading) {
    return (
      <div className="fixed inset-0 bg-[#050506] flex items-center justify-center z-[100] overflow-hidden">
        {/* Outer spinning ring */}
        <div className="absolute inset-0 flex items-center justify-center pointer-events-none">
          <div 
            className="w-[500px] h-[500px] rounded-full animate-[spin-slow_2s_linear_infinite]"
            style={{
              background: "conic-gradient(from 0deg, transparent 0%, rgba(147,51,234,0.5) 25%, rgba(34,211,238,0.5) 50%, transparent 75%, transparent 100%)",
              filter: "blur(30px)",
            }}
          />
        </div>

        {/* Inner counter-spinning ring */}
        <div className="absolute inset-0 flex items-center justify-center pointer-events-none">
          <div 
            className="w-[350px] h-[350px] rounded-full animate-[spin-reverse_1.5s_linear_infinite]"
            style={{
              background: "conic-gradient(from 180deg, transparent 0%, rgba(236,72,153,0.4) 20%, rgba(168,85,247,0.4) 40%, transparent 60%, transparent 100%)",
              filter: "blur(25px)",
            }}
          />
        </div>

        {/* Pulsing core */}
        <div className="absolute inset-0 flex items-center justify-center pointer-events-none">
          <div 
            className="w-[200px] h-[200px] rounded-full animate-[pulse-fast_0.8s_ease-in-out_infinite]"
            style={{
              background: "radial-gradient(circle at center, rgba(255,255,255,0.15) 0%, rgba(147,51,234,0.3) 40%, rgba(34,211,238,0.2) 70%, transparent 100%)",
              filter: "blur(20px)",
            }}
          />
        </div>

        {/* Shooting particles */}
        <div className="absolute inset-0 flex items-center justify-center pointer-events-none">
          <div className="w-1 h-1 bg-cyan-400 rounded-full absolute animate-[shoot-1_1s_ease-out_infinite]" />
          <div className="w-1 h-1 bg-purple-400 rounded-full absolute animate-[shoot-2_1s_ease-out_infinite_0.25s]" />
          <div className="w-1 h-1 bg-pink-400 rounded-full absolute animate-[shoot-3_1s_ease-out_infinite_0.5s]" />
          <div className="w-1 h-1 bg-cyan-300 rounded-full absolute animate-[shoot-4_1s_ease-out_infinite_0.75s]" />
        </div>

        {/* Corner glows */}
        <div className="absolute top-0 left-0 w-[300px] h-[300px] bg-[radial-gradient(ellipse_at_center,_rgba(147,51,234,0.3)_0%,_transparent_70%)] blur-3xl pointer-events-none animate-[pulse-fast_1.2s_ease-in-out_infinite]" />
        <div className="absolute bottom-0 right-0 w-[300px] h-[300px] bg-[radial-gradient(ellipse_at_center,_rgba(34,211,238,0.25)_0%,_transparent_70%)] blur-3xl pointer-events-none animate-[pulse-fast_1.2s_ease-in-out_infinite_0.4s]" />
        
        {/* Logo with scale animation */}
        <div className="relative z-10 flex items-center gap-3 animate-[fade-scale_0.6s_ease-out_forwards]">
          <Image 
            src="https://shadw-tjfj.vercel.app/icow.png" 
            alt="Shadw Logo" 
            width={140}
            height={70}
            className="drop-shadow-[0_0_30px_rgba(147,51,234,0.5)]"
          />
        </div>
        
        <style jsx>{`
          @keyframes spin-slow {
            from { transform: rotate(0deg); }
            to { transform: rotate(360deg); }
          }
          @keyframes spin-reverse {
            from { transform: rotate(360deg); }
            to { transform: rotate(0deg); }
          }
          @keyframes pulse-fast {
            0%, 100% { transform: scale(1); opacity: 0.6; }
            50% { transform: scale(1.3); opacity: 1; }
          }
          @keyframes fade-scale {
            0% { transform: scale(0.8); opacity: 0; }
            100% { transform: scale(1); opacity: 1; }
          }
          @keyframes shoot-1 {
            0% { transform: translate(0, 0) scale(1); opacity: 1; }
            100% { transform: translate(-150px, -100px) scale(0); opacity: 0; }
          }
          @keyframes shoot-2 {
            0% { transform: translate(0, 0) scale(1); opacity: 1; }
            100% { transform: translate(150px, -80px) scale(0); opacity: 0; }
          }
          @keyframes shoot-3 {
            0% { transform: translate(0, 0) scale(1); opacity: 1; }
            100% { transform: translate(-120px, 120px) scale(0); opacity: 0; }
          }
          @keyframes shoot-4 {
            0% { transform: translate(0, 0) scale(1); opacity: 1; }
            100% { transform: translate(140px, 100px) scale(0); opacity: 0; }
          }
        `}</style>
      </div>
    )
  }

  return (
    <div className="min-h-screen bg-[#0a0a0b] text-white relative overflow-x-hidden animate-in fade-in duration-700">
      {/* Grid canvas background */}
      <div 
        className="fixed inset-0 pointer-events-none opacity-[0.03]"
        style={{
          backgroundImage: `
            linear-gradient(rgba(255,255,255,0.5) 1px, transparent 1px),
            linear-gradient(90deg, rgba(255,255,255,0.5) 1px, transparent 1px)
          `,
          backgroundSize: '60px 60px',
        }}
      />
      {/* Radial fade for grid */}
      <div className="fixed inset-0 pointer-events-none bg-[radial-gradient(ellipse_at_center,_transparent_0%,_#0a0a0b_70%)]" />
      
      {/* Background gradient effects - multi-color glows */}
      {/* Left side - purple/magenta glow */}
      <div className="fixed left-0 top-0 h-[700px] w-[700px] -translate-x-40 -translate-y-20 bg-[radial-gradient(circle_at_center,_rgba(147,51,234,0.2)_0%,_rgba(168,85,247,0.1)_40%,_transparent_70%)] blur-3xl pointer-events-none" />
      <div className="fixed left-0 top-32 h-[500px] w-[500px] bg-[radial-gradient(circle_at_center,_rgba(192,132,252,0.12)_0%,_transparent_60%)] blur-3xl pointer-events-none" />
      
      {/* Right side - subtle yellow-white accent */}
      <div className="fixed right-0 top-0 h-[400px] w-[300px] bg-[radial-gradient(circle_at_center,_rgba(253,224,71,0.06)_0%,_rgba(250,250,250,0.04)_30%,_transparent_60%)] blur-3xl pointer-events-none" />
      
      {/* Right side - cyan/turquoise glow */}
      <div className="fixed right-0 top-40 h-[600px] w-[500px] translate-x-32 bg-[radial-gradient(circle_at_center,_rgba(34,211,238,0.15)_0%,_rgba(6,182,212,0.08)_40%,_transparent_70%)] blur-3xl pointer-events-none" />
      <div className="fixed right-20 top-60 h-[400px] w-[400px] bg-[radial-gradient(circle_at_center,_rgba(56,189,248,0.1)_0%,_transparent_60%)] blur-3xl pointer-events-none" />
      
      

      {/* Navigation */}
      <header className="relative z-50 bg-black border-b border-cyan-400">
        <div className="mx-auto flex h-16 max-w-7xl items-center justify-between px-6">
          {/* Logo */}
            <Link href="/" className="flex items-center gap-2">
            <Image 
              src="https://shadw-tjfj.vercel.app/icow.png" 
              alt="Shadw Logo" 
              width={80}
              height={40}
            />
          </Link>

          {/* Navigation Menu */}
          <NavigationMenu className="hidden md:flex">
            <NavigationMenuList className="gap-1">
              <NavigationMenuItem>
                <Link href="/overview" className="group inline-flex h-9 w-max items-center justify-center rounded-md bg-transparent px-4 py-2 text-sm font-medium text-gray-300 hover:text-white hover:bg-white/5 transition-colors">
                  Product
                </Link>
              </NavigationMenuItem>

              <NavigationMenuItem>
                <Link href="/solutions/enterprise" className="group inline-flex h-9 w-max items-center justify-center rounded-md bg-transparent px-4 py-2 text-sm font-medium text-gray-300 hover:text-white hover:bg-white/5 transition-colors">
                  Solutions
                </Link>
              </NavigationMenuItem>

              <NavigationMenuItem>
                <Link href="/features/security" className="group inline-flex h-9 w-max items-center justify-center rounded-md bg-transparent px-4 py-2 text-sm font-medium text-gray-300 hover:text-white hover:bg-white/5 transition-colors">
                  Features
                </Link>
              </NavigationMenuItem>

              <NavigationMenuItem>
                <Link href="/docs" className="group inline-flex h-9 w-max items-center justify-center rounded-md bg-transparent px-4 py-2 text-sm font-medium text-gray-300 hover:text-white hover:bg-white/5 transition-colors">
                  Docs
                </Link>
              </NavigationMenuItem>

              <NavigationMenuItem>
                <Link href="/pricing" className="group inline-flex h-9 w-max items-center justify-center rounded-md bg-transparent px-4 py-2 text-sm font-medium text-gray-300 hover:text-white hover:bg-white/5 transition-colors">
                  Pricing
                </Link>
              </NavigationMenuItem>

              <NavigationMenuItem>
                <Link href="/blog" className="group inline-flex h-9 w-max items-center justify-center rounded-md bg-transparent px-4 py-2 text-sm font-medium text-gray-300 hover:text-white hover:bg-white/5 transition-colors">
                  Blog
                </Link>
              </NavigationMenuItem>

              <NavigationMenuItem>
                <Link href="/case-studies" className="group inline-flex h-9 w-max items-center justify-center rounded-md bg-transparent px-4 py-2 text-sm font-medium text-gray-300 hover:text-white hover:bg-white/5 transition-colors">
                  Case Studies
                </Link>
              </NavigationMenuItem>
            </NavigationMenuList>
          </NavigationMenu>

          {/* Login Button */}
          <Link href="/platform">
            <Button 
              variant="outline" 
              className="rounded-full border-gray-600 bg-transparent text-white hover:bg-white/10 hover:text-white"
            >
              Login
            </Button>
          </Link>
        </div>
      </header>

      {/* Hero Section */}
      <main className="relative z-10 flex h-[calc(100vh-64px)] flex-col items-center justify-center px-6 text-center">
        <h1 className="mb-2 text-5xl font-semibold tracking-tight md:text-7xl lg:text-[4.5rem]">
          <span className="text-white">Beyond the Edge</span>
        </h1>
        
        <h2 className="mb-8 text-5xl font-semibold italic tracking-tight md:text-7xl lg:text-[5.5rem] overflow-visible">
          <span
            className="inline-block px-1"
            style={{
              background: "linear-gradient(90deg, #e879f9 0%, #d946ef 50%, #c026d3 100%)",
              WebkitBackgroundClip: "text",
              WebkitTextFillColor: "transparent",
              backgroundClip: "text",
            }}
          >
            are
          </span>
          {" "}
          <span
            className="inline-block px-1"
            style={{
              background: "linear-gradient(90deg, #67e8f9 0%, #22d3ee 35%, #06b6d4 60%, #3b82f6 100%)",
              WebkitBackgroundClip: "text",
              WebkitTextFillColor: "transparent",
              backgroundClip: "text",
            }}
          >
            Shadows
          </span>
        </h2>

        <p className="mb-10 max-w-2xl text-lg text-gray-400 md:text-xl">
          Unleash the Power of Peer-to-Peer: Seamlessly Connect, Collaborate,
          <br className="hidden md:block" />
          and Conquer with Our Cutting-Edge Cloud
        </p>

        <div className="flex flex-col items-center gap-4 sm:flex-row">
          <div className="relative">
            {/* Glow effect behind Start Now button */}
            <div 
              className="absolute -inset-2 rounded-full opacity-70 blur-xl"
              style={{
                background: "linear-gradient(90deg, rgba(147,51,234,0.5) 0%, rgba(20,184,166,0.6) 50%, rgba(34,211,238,0.5) 100%)",
              }}
            />
            <Link href="/platform">
              <Button 
                className="relative group h-12 rounded-full bg-teal-500 px-8 text-base font-medium text-white hover:bg-teal-600"
              >
                Start Now
                <ArrowRight className="ml-2 h-4 w-4 transition-transform group-hover:translate-x-1" />
              </Button>
            </Link>
          </div>
          
<Link href="/demo">
            <Button
              variant="outline"
              className="h-12 rounded-full border-gray-600 bg-transparent px-8 text-base font-medium text-white hover:bg-white/10 hover:text-white"
            >
              Watch Demo
            </Button>
          </Link>
        </div>
      </main>

      {/* Laptop Showcase Section */}
      <section className="relative z-10 py-16 px-6">
        <div className="mx-auto max-w-3xl">
          {/* Laptop Frame */}
          <div className="relative">
            {/* Glow behind laptop - soft radial blend */}
            <div 
              className="absolute -inset-16 opacity-40 blur-[80px] pointer-events-none rounded-full"
              style={{
                background: "radial-gradient(circle at center, rgba(147,51,234,0.4) 0%, rgba(99,102,241,0.2) 30%, rgba(34,211,238,0.15) 60%, transparent 80%)",
              }}
            />
            
            {/* Laptop Screen */}
            <div className="relative bg-[#0c0c0f] rounded-2xl border border-gray-800/60 overflow-hidden shadow-2xl shadow-purple-950/30">
              {/* Screen bezel top */}
              <div className="h-5 bg-gradient-to-b from-[#18181b] to-[#0f0f12] flex items-center justify-center border-b border-gray-800/30">
                <div className="w-1.5 h-1.5 rounded-full bg-gray-700/80" />
              </div>
              
              {/* Screen content with inner glow */}
              <div className="relative aspect-[16/10] bg-[#08080a]">
                {/* Screen inner glow */}
                <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_top_center,_rgba(147,51,234,0.08)_0%,_transparent_60%)] pointer-events-none" />
                <Image
                  src="/images/shadw-dashboard.png"
                  alt="Shadw Command Center Dashboard"
                  fill
                  className="object-cover object-top opacity-95"
                />
                {/* Screen reflection overlay */}
                <div className="absolute inset-0 bg-gradient-to-b from-white/[0.02] to-transparent pointer-events-none" />
              </div>
            </div>
            
            {/* Laptop Hinge */}
            <div className="relative h-3 bg-gradient-to-b from-[#1a1a1f] to-[#0e0e11] rounded-b-lg mx-1">
              <div className="absolute left-1/2 -translate-x-1/2 top-0 w-16 h-0.5 bg-gray-700/50 rounded-b-lg" />
            </div>
            
            {/* Laptop Base */}
            <div className="relative h-1.5 bg-[#0e0e11] rounded-b-xl mx-6 shadow-lg shadow-black/50" />
          </div>
        </div>
      </section>

      {/* Large background text "shadw" - positioned above footer */}
      <section className="relative z-0 overflow-hidden pointer-events-none select-none -mb-8">
        <div 
          className="text-[32vw] font-bold leading-[0.85] tracking-tighter -ml-4"
          style={{
            background: "linear-gradient(90deg, rgba(168,85,247,0.6) 0%, rgba(217,70,239,0.5) 20%, rgba(232,121,249,0.45) 35%, rgba(196,181,253,0.4) 50%, rgba(103,232,249,0.45) 65%, rgba(34,211,238,0.35) 80%, rgba(148,163,184,0.2) 100%)",
            WebkitBackgroundClip: "text",
            WebkitTextFillColor: "transparent",
            backgroundClip: "text",
            maskImage: "linear-gradient(to bottom, transparent 0%, rgba(0,0,0,0.3) 30%, rgba(0,0,0,0.7) 60%, black 100%)",
            WebkitMaskImage: "linear-gradient(to bottom, transparent 0%, rgba(0,0,0,0.3) 30%, rgba(0,0,0,0.7) 60%, black 100%)",
          }}
        >
          shadw
        </div>
      </section>

      {/* Footer */}
      <footer className="relative z-10 border-t border-gray-800 bg-black/50 backdrop-blur-sm">
        <div className="mx-auto max-w-7xl px-6 py-12">
          <div className="grid grid-cols-2 gap-8 md:grid-cols-5">
            {/* Logo & Description */}
            <div className="col-span-2">
              <Link href="/" className="flex items-center gap-2 mb-4">
                <Image 
                  src="https://shadw-tjfj.vercel.app/icow.png" 
                  alt="Shadw Logo" 
                  width={80}
                  height={40}
                />
              </Link>
              <p className="text-sm text-gray-400 max-w-xs">
                Unleash the Power of Peer-to-Peer: Seamlessly Connect, Collaborate, and Conquer.
              </p>
            </div>

            {/* Product */}
            <div>
              <h3 className="text-sm font-semibold text-white mb-4">Product</h3>
              <ul className="space-y-3">
                <li><Link href="#" className="text-sm text-gray-400 hover:text-cyan-400 transition-colors">Overview</Link></li>
                <li><Link href="#" className="text-sm text-gray-400 hover:text-cyan-400 transition-colors">Features</Link></li>
                <li><Link href="#" className="text-sm text-gray-400 hover:text-cyan-400 transition-colors">Pricing</Link></li>
                <li><Link href="#" className="text-sm text-gray-400 hover:text-cyan-400 transition-colors">Changelog</Link></li>
              </ul>
            </div>

            {/* Resources */}
            <div>
              <h3 className="text-sm font-semibold text-white mb-4">Resources</h3>
              <ul className="space-y-3">
                <li><Link href="#" className="text-sm text-gray-400 hover:text-cyan-400 transition-colors">Documentation</Link></li>
                <li><Link href="#" className="text-sm text-gray-400 hover:text-cyan-400 transition-colors">API Reference</Link></li>
                <li><Link href="#" className="text-sm text-gray-400 hover:text-cyan-400 transition-colors">Guides</Link></li>
                <li><Link href="#" className="text-sm text-gray-400 hover:text-cyan-400 transition-colors">Blog</Link></li>
              </ul>
            </div>

            {/* Company */}
            <div>
              <h3 className="text-sm font-semibold text-white mb-4">Company</h3>
              <ul className="space-y-3">
                <li><Link href="#" className="text-sm text-gray-400 hover:text-cyan-400 transition-colors">About</Link></li>
                <li><Link href="#" className="text-sm text-gray-400 hover:text-cyan-400 transition-colors">Careers</Link></li>
                <li><Link href="#" className="text-sm text-gray-400 hover:text-cyan-400 transition-colors">Contact</Link></li>
                <li><Link href="#" className="text-sm text-gray-400 hover:text-cyan-400 transition-colors">Privacy</Link></li>
              </ul>
            </div>
          </div>

          {/* Bottom Bar */}
          <div className="mt-12 pt-8 border-t border-gray-800 flex flex-col md:flex-row justify-between items-center gap-4">
            <p className="text-sm text-gray-500">
              2026 Shadw. All rights reserved.
            </p>
            <div className="flex items-center gap-6">
              <Link href="#" className="text-gray-400 hover:text-cyan-400 transition-colors">
                <svg className="h-5 w-5" fill="currentColor" viewBox="0 0 24 24" aria-hidden="true">
                  <path d="M8.29 20.251c7.547 0 11.675-6.253 11.675-11.675 0-.178 0-.355-.012-.53A8.348 8.348 0 0022 5.92a8.19 8.19 0 01-2.357.646 4.118 4.118 0 001.804-2.27 8.224 8.224 0 01-2.605.996 4.107 4.107 0 00-6.993 3.743 11.65 11.65 0 01-8.457-4.287 4.106 4.106 0 001.27 5.477A4.072 4.072 0 012.8 9.713v.052a4.105 4.105 0 003.292 4.022 4.095 4.095 0 01-1.853.07 4.108 4.108 0 003.834 2.85A8.233 8.233 0 012 18.407a11.616 11.616 0 006.29 1.84" />
                </svg>
                <span className="sr-only">Twitter</span>
              </Link>
              <Link href="#" className="text-gray-400 hover:text-cyan-400 transition-colors">
                <svg className="h-5 w-5" fill="currentColor" viewBox="0 0 24 24" aria-hidden="true">
                  <path fillRule="evenodd" d="M12 2C6.477 2 2 6.484 2 12.017c0 4.425 2.865 8.18 6.839 9.504.5.092.682-.217.682-.483 0-.237-.008-.868-.013-1.703-2.782.605-3.369-1.343-3.369-1.343-.454-1.158-1.11-1.466-1.11-1.466-.908-.62.069-.608.069-.608 1.003.07 1.531 1.032 1.531 1.032.892 1.53 2.341 1.088 2.91.832.092-.647.35-1.088.636-1.338-2.22-.253-4.555-1.113-4.555-4.951 0-1.093.39-1.988 1.029-2.688-.103-.253-.446-1.272.098-2.65 0 0 .84-.27 2.75 1.026A9.564 9.564 0 0112 6.844c.85.004 1.705.115 2.504.337 1.909-1.296 2.747-1.027 2.747-1.027.546 1.379.202 2.398.1 2.651.64.7 1.028 1.595 1.028 2.688 0 3.848-2.339 4.695-4.566 4.943.359.309.678.92.678 1.855 0 1.338-.012 2.419-.012 2.747 0 .268.18.58.688.482A10.019 10.019 0 0022 12.017C22 6.484 17.522 2 12 2z" clipRule="evenodd" />
                </svg>
                <span className="sr-only">GitHub</span>
              </Link>
              <Link href="#" className="text-gray-400 hover:text-cyan-400 transition-colors">
                <svg className="h-5 w-5" fill="currentColor" viewBox="0 0 24 24" aria-hidden="true">
                  <path fillRule="evenodd" d="M19 0h-14c-2.761 0-5 2.239-5 5v14c0 2.761 2.239 5 5 5h14c2.762 0 5-2.239 5-5v-14c0-2.761-2.238-5-5-5zm-11 19h-3v-11h3v11zm-1.5-12.268c-.966 0-1.75-.79-1.75-1.764s.784-1.764 1.75-1.764 1.75.79 1.75 1.764-.783 1.764-1.75 1.764zm13.5 12.268h-3v-5.604c0-3.368-4-3.113-4 0v5.604h-3v-11h3v1.765c1.396-2.586 7-2.777 7 2.476v6.759z" clipRule="evenodd" />
                </svg>
                <span className="sr-only">LinkedIn</span>
              </Link>
              <Link href="#" className="text-gray-400 hover:text-cyan-400 transition-colors">
                <svg className="h-5 w-5" fill="currentColor" viewBox="0 0 24 24" aria-hidden="true">
                  <path fillRule="evenodd" d="M12 2C6.48 2 2 6.48 2 12s4.48 10 10 10c5.51 0 10-4.48 10-10S17.51 2 12 2zm6.605 4.61a8.502 8.502 0 011.93 5.314c-.281-.054-3.101-.629-5.943-.271-.065-.141-.12-.293-.184-.445a25.416 25.416 0 00-.564-1.236c3.145-1.28 4.577-3.124 4.761-3.362zM12 3.475c2.17 0 4.154.813 5.662 2.148-.152.216-1.443 1.941-4.48 3.08-1.399-2.57-2.95-4.675-3.189-5A8.687 8.687 0 0112 3.475zm-3.633.803a53.896 53.896 0 013.167 4.935c-3.992 1.063-7.517 1.04-7.896 1.04a8.581 8.581 0 014.729-5.975zM3.453 12.01v-.26c.37.01 4.512.065 8.775-1.215.25.477.477.965.694 1.453-.109.033-.228.065-.336.098-4.404 1.42-6.747 5.303-6.942 5.629a8.522 8.522 0 01-2.19-5.705zM12 20.547a8.482 8.482 0 01-5.239-1.8c.152-.315 1.888-3.656 6.703-5.337.022-.01.033-.01.054-.022a35.318 35.318 0 011.823 6.475 8.4 8.4 0 01-3.341.684zm4.761-1.465c-.086-.52-.542-3.015-1.659-6.084 2.679-.423 5.022.271 5.314.369a8.468 8.468 0 01-3.655 5.715z" clipRule="evenodd" />
                </svg>
                <span className="sr-only">Dribbble</span>
              </Link>
            </div>
          </div>
        </div>
      </footer>
    </div>
  )
}

"use client"

import { useState, useEffect, useRef } from "react"
import Link from "next/link"
import Image from "next/image"
import { ArrowLeft, Server, Cpu } from "lucide-react"
import { Button } from "@/components/ui/button"

const gatewayLogs = [
  { text: "$ npm run gateway", delay: 30, color: "text-gray-500" },
  { text: "> node bin/gateway.js", delay: 60, color: "text-gray-500" },
  { text: "", delay: 30 },
  { text: "   Next.js 15.5.9", delay: 80, color: "text-white" },
  { text: "   Local:        http://localhost:3000", delay: 30, color: "text-gray-400" },
  { text: "", delay: 30 },
  { text: " Starting...", delay: 80, color: "text-cyan-400" },
  { text: " Ready in 1363ms", delay: 200, color: "text-emerald-400" },
  { text: "", delay: 30 },
  { text: "SwarmLambda Gateway: http://localhost:8787", delay: 60, color: "text-cyan-400 font-medium" },
  { text: "ClusterId=local", delay: 30, color: "text-gray-500" },
  { text: "", delay: 30 },
  { text: "Invoke: POST /2015-03-31/functions/:fn/invocations", delay: 80, color: "text-amber-400" },
  { text: "", delay: 60 },
  { text: " Compiling / ...", delay: 100, color: "text-gray-400" },
  { text: " Compiled / in 2.3s (878 modules)", delay: 300, color: "text-emerald-400" },
  { text: "", delay: 60 },
  { text: "[presence] worker online: worker-local-1 d190a7ec81...", delay: 150, color: "text-purple-400" },
  { text: "[presence] worker online: worker-2 99bd1ddb3e...", delay: 100, color: "text-purple-400" },
  { text: "[presence] worker online: worker-3 e023925987...", delay: 80, color: "text-purple-400" },
  { text: "[presence] worker online: worker-4 6899e878e2...", delay: 80, color: "text-purple-400" },
  { text: "[presence] worker online: worker-5 8b57857c6f...", delay: 60, color: "text-purple-400" },
]

const workerLogs = [
  { text: "$ npm run worker", delay: 30, color: "text-gray-500" },
  { text: "> node bin/worker.js", delay: 60, color: "text-gray-500" },
  { text: "", delay: 30 },
  { text: "[worker] bootstrapped functions: [ 'hello' ]", delay: 150, color: "text-cyan-400" },
  { text: "", delay: 30 },
  { text: 'SwarmLambda Worker "worker-local-1"', delay: 100, color: "text-white font-medium" },
  { text: "RPC public key: d190a7ec81d4253ae0cecf98b018eadeb79d8b46...", delay: 60, color: "text-gray-500" },
  { text: "", delay: 100 },
  { text: "[rpc] connected to gateway", delay: 200, color: "text-emerald-400" },
  { text: "[rpc] heartbeat sent", delay: 250, color: "text-gray-600" },
  { text: "", delay: 60 },
  { text: "[invoke] received: hello", delay: 150, color: "text-amber-400" },
  { text: "[invoke] executing function...", delay: 80, color: "text-amber-400" },
  { text: '[invoke] payload: { "name": "World" }', delay: 60, color: "text-gray-400" },
  { text: '[invoke] response: { "message": "Hello, World!" }', delay: 200, color: "text-emerald-400" },
  { text: "[invoke] completed in 45ms", delay: 30, color: "text-emerald-400" },
  { text: "", delay: 80 },
  { text: "[rpc] heartbeat sent", delay: 200, color: "text-gray-600" },
  { text: "[invoke] received: hello", delay: 200, color: "text-amber-400" },
  { text: '[invoke] payload: { "name": "Shadw" }', delay: 60, color: "text-gray-400" },
  { text: '[invoke] response: { "message": "Hello, Shadw!" }', delay: 150, color: "text-emerald-400" },
  { text: "[invoke] completed in 32ms", delay: 30, color: "text-emerald-400" },
]



// Edge region data
const edgeRegions = [
  { id: 0, x: 15, y: 22, label: "US-East", color: "#a855f7" },
  { id: 1, x: 50, y: 18, label: "EU-West", color: "#a855f7" },
  { id: 2, x: 85, y: 22, label: "Asia-Pac", color: "#a855f7" },
  { id: 3, x: 8, y: 50, label: "US-West", color: "#a855f7" },
  { id: 4, x: 35, y: 48, label: "EU-Central", color: "#a855f7" },
  { id: 5, x: 65, y: 48, label: "Middle-East", color: "#a855f7" },
  { id: 6, x: 92, y: 50, label: "Australia", color: "#a855f7" },
  { id: 7, x: 20, y: 78, label: "SA-East", color: "#a855f7" },
  { id: 8, x: 50, y: 82, label: "Africa", color: "#a855f7" },
  { id: 9, x: 80, y: 78, label: "India", color: "#a855f7" },
]

// Cloud provider data
const cloudProviders = [
  { id: 0, x: 15, y: 22, label: "AWS", icon: "aws", color: "#FF9900" },
  { id: 1, x: 50, y: 18, label: "Google Cloud", icon: "gcp", color: "#4285F4" },
  { id: 2, x: 85, y: 22, label: "Azure", icon: "azure", color: "#0078D4" },
  { id: 3, x: 8, y: 50, label: "DigitalOcean", icon: "digitalocean", color: "#0080FF" },
  { id: 4, x: 35, y: 48, label: "Linode", icon: "linode", color: "#00A95C" },
  { id: 5, x: 65, y: 48, label: "Oracle", icon: "oracle", color: "#F80000" },
  { id: 6, x: 92, y: 50, label: "IBM Cloud", icon: "ibm", color: "#054ADA" },
  { id: 7, x: 20, y: 78, label: "Alibaba", icon: "alibaba", color: "#FF6A00" },
  { id: 8, x: 50, y: 82, label: "Tencent", icon: "tencent", color: "#00A4FF" },
  { id: 9, x: 80, y: 78, label: "Akash", icon: "akash", color: "#FF4444" },
]

// Mesh connections
const meshLines = [
  { from: 0, to: 1, id: "0-1" }, { from: 1, to: 2, id: "1-2" }, { from: 0, to: 2, id: "0-2" },
  { from: 0, to: 3, id: "0-3" }, { from: 0, to: 4, id: "0-4" }, { from: 1, to: 4, id: "1-4" },
  { from: 1, to: 5, id: "1-5" }, { from: 2, to: 5, id: "2-5" }, { from: 2, to: 6, id: "2-6" },
  { from: 3, to: 4, id: "3-4" }, { from: 4, to: 5, id: "4-5" }, { from: 5, to: 6, id: "5-6" },
  { from: 3, to: 7, id: "3-7" }, { from: 4, to: 7, id: "4-7" }, { from: 4, to: 8, id: "4-8" },
  { from: 5, to: 8, id: "5-8" }, { from: 5, to: 9, id: "5-9" }, { from: 6, to: 9, id: "6-9" },
  { from: 7, to: 8, id: "7-8" }, { from: 8, to: 9, id: "8-9" }, { from: 3, to: 5, id: "3-5" },
  { from: 4, to: 6, id: "4-6" }, { from: 7, to: 9, id: "7-9" },
]

// Mesh Constellation Visualization with phase transition
function ConstellationVisualization({ isActive }: { isActive: boolean }) {
  const [phase, setPhase] = useState<"regions" | "transition" | "clouds">("regions")
  const [connectedNodes, setConnectedNodes] = useState<number[]>([])
  const [activeLines, setActiveLines] = useState<string[]>([])
  const [dataPackets, setDataPackets] = useState<{id: number, line: string, progress: number, reverse: boolean}[]>([])
  const [anycastActive, setAnycastActive] = useState(false)

  const currentNodes = phase === "clouds" ? cloudProviders : edgeRegions

  useEffect(() => {
    if (!isActive) {
      setConnectedNodes([])
      setActiveLines([])
      setDataPackets([])
      setAnycastActive(false)
      setPhase("regions")
      return
    }

    // Phase 1: Show edge regions
    setTimeout(() => setAnycastActive(true), 200)
    
    const nodeTimers = edgeRegions.map((node, i) => 
      setTimeout(() => setConnectedNodes(prev => [...prev, node.id]), 300 + i * 100)
    )

    const lineTimers = meshLines.map((line, i) => 
      setTimeout(() => setActiveLines(prev => [...prev, line.id]), 800 + i * 50)
    )

    // Phase 2: Transition to cloud providers after 4 seconds
    const transitionTimer = setTimeout(() => {
      setPhase("transition")
      setTimeout(() => setPhase("clouds"), 500)
    }, 4000)

    // Data packets
    const packetInterval = setInterval(() => {
      if (meshLines.length > 0) {
        const randomLine = meshLines[Math.floor(Math.random() * meshLines.length)]
        setDataPackets(prev => [...prev, { 
          id: Date.now() + Math.random(), 
          line: randomLine.id, 
          progress: 0,
          reverse: Math.random() > 0.5
        }])
      }
    }, 100)

    return () => {
      for (const t of nodeTimers) clearTimeout(t)
      for (const t of lineTimers) clearTimeout(t)
      clearTimeout(transitionTimer)
      clearInterval(packetInterval)
    }
  }, [isActive])

  useEffect(() => {
    const interval = setInterval(() => {
      setDataPackets(prev => prev.map(p => ({ ...p, progress: p.progress + 4 })).filter(p => p.progress <= 100))
    }, 16)
    return () => clearInterval(interval)
  }, [])

  const getLineCoords = (lineId: string) => {
    const line = meshLines.find(l => l.id === lineId)
    if (!line) return { x1: 0, y1: 0, x2: 0, y2: 0 }
    const from = currentNodes[line.from]
    const to = currentNodes[line.to]
    return { x1: from.x, y1: from.y, x2: to.x, y2: to.y }
  }

  return (
    <div className="relative w-full h-[400px] sm:h-[500px] lg:h-[600px] mb-4 sm:mb-6">
      {/* Phase indicator */}
      <div className="absolute top-2 sm:top-4 left-1/2 -translate-x-1/2 z-10">
        <div className={`px-3 sm:px-4 py-1.5 sm:py-2 rounded-2xl border backdrop-blur-sm text-[10px] sm:text-xs font-medium tracking-wider transition-all duration-500 ${
          phase === "clouds" 
            ? "bg-gradient-to-r from-orange-500/10 to-blue-500/10 border-orange-500/20 text-orange-300" 
            : "bg-cyan-500/5 border-cyan-500/20 text-cyan-300"
        }`}>
          {phase === "clouds" ? "MULTI-CLOUD DEPLOYMENT" : "ANYCAST BGP + EDGE WORKERS"}
        </div>
      </div>

      {/* Background glow - soft ambient lighting, no visible edges */}
      <div className="absolute inset-0 overflow-hidden rounded-3xl">
        <div className="absolute left-[10%] top-[20%] h-[300px] w-[300px] rounded-full bg-purple-500/15 blur-[100px]" />
        <div className="absolute right-[10%] bottom-[20%] h-[280px] w-[280px] rounded-full bg-cyan-500/12 blur-[100px]" />
        <div className="absolute left-[40%] top-[40%] h-[200px] w-[200px] rounded-full bg-indigo-500/8 blur-[80px]" />
      </div>
      
      <svg viewBox="0 0 100 100" className="w-full h-full" preserveAspectRatio="xMidYMid meet">
        <defs>
          <linearGradient id="meshLineActive" x1="0%" y1="0%" x2="100%" y2="0%">
            <stop offset="0%" stopColor="#a855f7" stopOpacity="0.6" />
            <stop offset="100%" stopColor="#06b6d4" stopOpacity="0.6" />
          </linearGradient>
          <linearGradient id="anycastGradient" x1="0%" y1="0%" x2="100%" y2="100%">
            <stop offset="0%" stopColor="#06b6d4" stopOpacity="0.4" />
            <stop offset="50%" stopColor="#22d3ee" stopOpacity="0.15" />
            <stop offset="100%" stopColor="#06b6d4" stopOpacity="0.4" />
          </linearGradient>
          <filter id="meshGlow">
            <feGaussianBlur stdDeviation="0.5" result="coloredBlur"/>
            <feMerge><feMergeNode in="coloredBlur"/><feMergeNode in="SourceGraphic"/></feMerge>
          </filter>
          <filter id="strongGlow">
            <feGaussianBlur stdDeviation="1.2" result="coloredBlur"/>
            <feMerge><feMergeNode in="coloredBlur"/><feMergeNode in="coloredBlur"/><feMergeNode in="SourceGraphic"/></feMerge>
          </filter>
          <filter id="nodeGlow" x="-200%" y="-200%" width="500%" height="500%">
            <feGaussianBlur stdDeviation="2.5" result="blur"/>
            <feMerge>
              <feMergeNode in="blur"/>
              <feMergeNode in="SourceGraphic"/>
            </feMerge>
          </filter>
          {/* Heavy blur filter for ambient glow - no hard edges */}
          <filter id="ambientGlow" x="-300%" y="-300%" width="700%" height="700%">
            <feGaussianBlur stdDeviation="3" result="blur"/>
          </filter>
        </defs>

        {/* Anycast boundary */}
        <g style={{ opacity: anycastActive ? 1 : 0, transition: "opacity 0.8s ease" }}>
          <ellipse cx="50" cy="50" rx="48" ry="43" fill="none" stroke="url(#anycastGradient)" strokeWidth="0.2" strokeDasharray="1.5 0.8" filter="url(#meshGlow)" className="animate-[spin_45s_linear_infinite]" style={{ transformOrigin: "50px 50px" }} />
          <ellipse cx="50" cy="50" rx="45" ry="40" fill="none" stroke="#06b6d4" strokeWidth="0.1" strokeOpacity="0.2" strokeDasharray="0.8 1.2" className="animate-[spin_40s_linear_infinite_reverse]" style={{ transformOrigin: "50px 50px" }} />
          {[0, 45, 90, 135, 180, 225, 270, 315].map((angle, i) => {
            const rad = (angle * Math.PI) / 180
            return <circle key={i} cx={50 + 46.5 * Math.cos(rad)} cy={50 + 41.5 * Math.sin(rad)} r="0.4" fill="#06b6d4" opacity="0.4" className="animate-pulse" style={{ animationDelay: `${i * 0.2}s` }} />
          })}
          <text x="50" y="5" textAnchor="middle" fill="#06b6d4" fontSize="1.6" fontWeight="500" letterSpacing="0.12em" opacity="0.5">ANYCAST DNS + BGP ROUTING</text>
          <text x="50" y="97" textAnchor="middle" fill="#06b6d4" fontSize="1.2" fontWeight="400" letterSpacing="0.08em" opacity="0.35">OMNIPRESENT - SHORTEST PATH FIRST</text>
        </g>

        {/* Connection lines */}
        {meshLines.map((line) => {
          const from = currentNodes[line.from]
          const to = currentNodes[line.to]
          const isLineActive = activeLines.includes(line.id)
          return (
            <g key={line.id}>
              <line x1={from.x} y1={from.y} x2={to.x} y2={to.y} stroke="#a855f7" strokeWidth="0.06" strokeOpacity={0.06} />
              <line x1={from.x} y1={from.y} x2={isLineActive ? to.x : from.x} y2={isLineActive ? to.y : from.y} stroke="url(#meshLineActive)" strokeWidth="0.12" strokeOpacity={isLineActive ? 1 : 0} filter="url(#meshGlow)" style={{ transition: "all 0.2s ease-out" }} />
            </g>
          )
        })}

        {/* Data packets */}
        {dataPackets.map(packet => {
          const coords = getLineCoords(packet.line)
          const progress = packet.reverse ? (100 - packet.progress) / 100 : packet.progress / 100
          return <circle key={packet.id} cx={coords.x1 + (coords.x2 - coords.x1) * progress} cy={coords.y1 + (coords.y2 - coords.y1) * progress} r="0.35" fill={packet.reverse ? "#c084fc" : "#22d3ee"} filter="url(#strongGlow)" opacity={0.8} />
        })}

        {/* Nodes */}
        {currentNodes.map((node) => {
          const isConnected = connectedNodes.includes(node.id)
          const isCloud = phase === "clouds"
          const nodeColor = isCloud ? (node as typeof cloudProviders[0]).color : "#a855f7"
          const iconName = isCloud ? (node as typeof cloudProviders[0]).icon : null
          
          return (
            <g key={node.id} style={{ transition: "all 0.5s ease" }}>
              {/* Ambient glow - heavily blurred solid circle, no gradient edges */}
              {isConnected && (
                <circle 
                  cx={node.x} 
                  cy={node.y} 
                  r={isCloud ? 5 : 4} 
                  fill={nodeColor}
                  opacity={isCloud ? 0.35 : 0.25}
                  filter="url(#ambientGlow)"
                  style={{ transition: "all 0.4s ease" }}
                />
              )}
              
              {/* Main node circle */}
              <circle 
                cx={node.x} 
                cy={node.y} 
                r={isCloud ? 3.2 : 2.2} 
                fill={isConnected ? "#0a0a0c" : "#151518"} 
                stroke={isConnected ? nodeColor : "#333"} 
                strokeWidth={isCloud ? 0.2 : 0.12} 
                strokeOpacity={isConnected ? 0.7 : 0.2} 
                style={{ transition: "all 0.4s ease" }} 
              />
              
              {/* Icon or inner dot */}
              {isCloud && isConnected && iconName ? (
                <text 
                  x={node.x} 
                  y={node.y + 0.9} 
                  textAnchor="middle" 
                  fill={nodeColor} 
                  fontSize="2.8" 
                  fontWeight="700"
                  style={{ transition: "all 0.3s ease" }}
                >
                  {node.label.charAt(0)}
                </text>
              ) : (
                <circle 
                  cx={node.x} 
                  cy={node.y} 
                  r={isCloud ? 1 : 0.8} 
                  fill={isConnected ? nodeColor : "#444"} 
                  style={{ transition: "fill 0.3s ease" }} 
                />
              )}
              
              {/* Label */}
              <text 
                x={node.x} 
                y={node.y + (isCloud ? 6.5 : 5)} 
                textAnchor="middle" 
                fill={isConnected ? "#d1d5db" : "#4b5563"} 
                fontSize={isCloud ? 1.5 : 1.4} 
                fontWeight="500" 
                letterSpacing="0.02em" 
                style={{ transition: "all 0.3s ease" }}
              >
                {node.label}
              </text>
            </g>
          )
        })}
      </svg>
    </div>
  )
}

function AnimatedTerminal({ 
  title, 
  logs, 
  isActive,
  icon: Icon,
  accentColor,
}: { 
  title: string
  logs: typeof gatewayLogs
  isActive: boolean
  icon: typeof Server
  accentColor: string
}) {
  const [displayedLogs, setDisplayedLogs] = useState<typeof logs>([])
  const [currentIndex, setCurrentIndex] = useState(0)
  const containerRef = useRef<HTMLDivElement>(null)

  useEffect(() => {
    if (!isActive) {
      setDisplayedLogs([])
      setCurrentIndex(0)
      return
    }
    if (currentIndex >= logs.length) return
    const timer = setTimeout(() => {
      setDisplayedLogs(prev => [...prev, logs[currentIndex]])
      setCurrentIndex(prev => prev + 1)
    }, logs[currentIndex].delay)
    return () => clearTimeout(timer)
  }, [currentIndex, isActive, logs])

  useEffect(() => {
    if (containerRef.current) {
      containerRef.current.scrollTop = containerRef.current.scrollHeight
    }
  }, [displayedLogs])

  const borderColor = accentColor.includes('cyan') ? 'rgba(34,211,238,0.15)' : 'rgba(168,85,247,0.15)'
  const glowColor = accentColor.includes('cyan') ? 'rgba(34,211,238,0.08)' : 'rgba(168,85,247,0.08)'
  
  return (
    <div 
      className="flex flex-col rounded-2xl sm:rounded-3xl overflow-hidden shadow-2xl shadow-black/60 relative"
      style={{
        background: `linear-gradient(to bottom, rgba(15,15,18,0.95), rgba(8,8,10,0.98))`,
        border: `1px solid ${borderColor}`,
      }}
    >
      {/* Soft inner glow */}
      <div 
        className="absolute inset-0 rounded-2xl sm:rounded-3xl pointer-events-none"
        style={{
          background: `radial-gradient(ellipse at top, ${glowColor} 0%, transparent 50%)`,
        }}
      />
      
      {/* Terminal Header */}
      <div className="relative flex items-center justify-between px-4 sm:px-5 py-3 sm:py-3.5 bg-gradient-to-r from-white/[0.03] to-transparent border-b border-white/[0.04]">
        <div className="flex items-center gap-2.5 sm:gap-3">
          <div className="flex gap-1.5 sm:gap-2">
            <div className="w-2.5 h-2.5 sm:w-3 sm:h-3 rounded-full bg-rose-500/70 shadow-sm shadow-rose-500/30" />
            <div className="w-2.5 h-2.5 sm:w-3 sm:h-3 rounded-full bg-amber-500/70 shadow-sm shadow-amber-500/30" />
            <div className="w-2.5 h-2.5 sm:w-3 sm:h-3 rounded-full bg-emerald-500/70 shadow-sm shadow-emerald-500/30" />
          </div>
          <div className="h-4 w-px bg-white/10" />
          <div className="flex items-center gap-2">
            <Icon className={`w-3.5 h-3.5 sm:w-4 sm:h-4 ${accentColor} opacity-80`} />
            <span className="text-[10px] sm:text-xs text-gray-400 font-medium tracking-wide">{title}</span>
          </div>
        </div>
      </div>
      
      {/* Terminal Content */}
      <div 
        ref={containerRef}
        className="relative p-4 sm:p-5 font-mono text-[9px] sm:text-[11px] h-[220px] sm:h-[260px] lg:h-[280px] overflow-y-auto scrollbar-thin scrollbar-thumb-gray-700/50 scrollbar-track-transparent"
      >
        {displayedLogs.map((log, i) => (
          <div key={i} className={`${log.color || "text-gray-300"} whitespace-pre-wrap leading-relaxed`}>
            {log.text || "\u00A0"}
          </div>
        ))}
        {isActive && currentIndex < logs.length && (
          <span className={`inline-block w-1.5 h-3.5 sm:w-2 sm:h-4 ${accentColor.replace('text-', 'bg-')} animate-pulse rounded-sm opacity-80`} />
        )}
      </div>
    </div>
  )
}

export default function DemoPage() {
  const [isActive, setIsActive] = useState(false)

  // Auto-start on page load
  useEffect(() => {
    const timer = setTimeout(() => setIsActive(true), 500)
    return () => clearTimeout(timer)
  }, [])

  return (
    <div className="min-h-screen bg-[#050506] text-white relative overflow-hidden">
      {/* Grid canvas background */}
      <div 
        className="fixed inset-0 pointer-events-none opacity-[0.02]"
        style={{
          backgroundImage: `
            linear-gradient(rgba(255,255,255,0.5) 1px, transparent 1px),
            linear-gradient(90deg, rgba(255,255,255,0.5) 1px, transparent 1px)
          `,
          backgroundSize: '40px 40px',
        }}
      />
      {/* Radial fade for grid - smooth vignette */}
      <div className="fixed inset-0 pointer-events-none bg-[radial-gradient(ellipse_80%_80%_at_50%_50%,_transparent_0%,_#050506_100%)]" />
      
      {/* Background glows - very soft, no hard edges */}
      <div className="fixed left-[-20%] top-[-10%] h-[800px] w-[800px] rounded-full bg-purple-600/10 blur-[150px] pointer-events-none" />
      <div className="fixed right-[-15%] top-[20%] h-[700px] w-[700px] rounded-full bg-cyan-500/8 blur-[150px] pointer-events-none" />
      <div className="fixed left-[30%] bottom-[-20%] h-[600px] w-[600px] rounded-full bg-indigo-500/8 blur-[120px] pointer-events-none" />

      {/* Header */}
      <header className="relative z-50 bg-black/80 backdrop-blur-xl border-b border-gray-800/50">
        <div className="mx-auto flex h-14 max-w-7xl items-center justify-between px-6">
          <Link href="/" className="flex items-center gap-2">
            <Image src="https://shadw.cloud/icow.png" alt="Shadw Logo" width={70} height={35} />
          </Link>
          <Link href="/">
            <Button variant="ghost" className="text-gray-400 hover:text-white hover:bg-white/5 rounded-full text-sm h-9 bg-transparent">
              <ArrowLeft className="w-3.5 h-3.5 mr-2" />
              Back
            </Button>
          </Link>
        </div>
      </header>

      {/* Main Content */}
      <main className="relative z-10 py-6 sm:py-8 lg:py-12 px-4 sm:px-6">
        <div className="mx-auto max-w-7xl">
          {/* Constellation Visualization - Large and prominent */}
          <ConstellationVisualization isActive={isActive} />

          {/* Terminals Grid */}
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-4 sm:gap-6">
            <div>
              <div className="flex items-center gap-2 mb-2 sm:mb-3">
                <div className="w-1.5 h-1.5 rounded-full bg-cyan-400 shadow-lg shadow-cyan-400/50" />
                <span className="text-[9px] sm:text-[10px] font-medium text-gray-500 uppercase tracking-[0.15em]">Gateway Node</span>
              </div>
              <AnimatedTerminal 
                title="shadw-gateway" 
                logs={gatewayLogs} 
                isActive={isActive}
                icon={Server}
                accentColor="text-cyan-400"
              />
            </div>

            <div>
              <div className="flex items-center gap-2 mb-2 sm:mb-3">
                <div className="w-1.5 h-1.5 rounded-full bg-purple-400 shadow-lg shadow-purple-400/50" />
                <span className="text-[9px] sm:text-[10px] font-medium text-gray-500 uppercase tracking-[0.15em]">Edge Worker</span>
              </div>
              <AnimatedTerminal 
                title="shadw-worker-1" 
                logs={workerLogs} 
                isActive={isActive}
                icon={Cpu}
                accentColor="text-purple-400"
              />
            </div>
          </div>
        </div>
      </main>
    </div>
  )
}

"use client"

import React from "react"

import { useState, useCallback } from "react"
import Link from "next/link"
import { 
  ChevronDown, 
  Plus, 
  Minus, 
  Maximize2, 
  Minimize2,
  Settings, 
  Search,
  Moon,
  HelpCircle,
  ExternalLink,
  Download,
  LayoutGrid,
  GitBranch,
  BarChart3,
  Terminal,
  Globe,
  Network,
  HardDrive,
  Users,
  Key,
  Layers,
  Activity,
  Database,
  Shield,
  CloudCog,
  Play,
  Clock,
  X,
  Zap,
  MapPin,
  TrendingUp,
  Timer,
  Code2,
  Copy,
  Save,
  RotateCcw,
  Folder,
  FileText,
  Music,
  Video,
  Cpu,
  Wifi,
  Battery,
  Volume2,
  Sun,
  Monitor,
  Mail,
  MessageSquare,
  Calendar,
  Calculator,
  Chrome
} from "lucide-react"
import { Button } from "@/components/ui/button"
import ReactFlow, {
  Node,
  Edge,
  Controls,
  Background,
  useNodesState,
  useEdgesState,
  MarkerType,
  BackgroundVariant,
  Handle,
  Position,
  BaseEdge,
  EdgeLabelRenderer,
  getSmoothStepPath,
  type EdgeProps,
  type NodeProps,
} from "reactflow"
import "reactflow/dist/style.css"

// Custom styles for animated edges
const customStyles = `
  .react-flow__edge-path {
    stroke-linecap: round;
  }
  .react-flow__edge.animated path {
    animation: dashdraw 0.5s linear infinite;
  }
  @keyframes dashdraw {
    from {
      stroke-dashoffset: 10;
    }
    to {
      stroke-dashoffset: 0;
    }
  }
`

// Custom Edge with Label
function LabeledEdge({
  id,
  sourceX,
  sourceY,
  targetX,
  targetY,
  sourcePosition,
  targetPosition,
  data,
  markerEnd,
}: EdgeProps) {
  const [edgePath, labelX, labelY] = getSmoothStepPath({
    sourceX,
    sourceY,
    sourcePosition,
    targetX,
    targetY,
    targetPosition,
  })

  return (
    <>
      <BaseEdge
        id={id}
        path={edgePath}
        markerEnd={markerEnd}
        style={{
          stroke: "#22d3ee",
          strokeWidth: 2,
          strokeDasharray: "6 4",
        }}
        className="animated"
      />
      <EdgeLabelRenderer>
        <div
          style={{
            position: "absolute",
            transform: `translate(-50%, -50%) translate(${labelX}px, ${labelY}px)`,
            pointerEvents: "all",
          }}
          className="px-2 py-1 bg-[#0a0a0b] border border-gray-600 rounded text-[10px] font-mono text-cyan-400 uppercase tracking-wider"
        >
          {data?.label || "TCP"}
        </div>
      </EdgeLabelRenderer>
    </>
  )
}

const edgeTypes = {
  labeled: LabeledEdge,
}

// Logs data
const logsData = [
  { timestamp: "2024-01-21 14:32:01", level: "info", service: "api-handler", message: "Request received: GET /api/users" },
  { timestamp: "2024-01-21 14:32:01", level: "info", service: "api-handler", message: "Database query executed in 12ms" },
  { timestamp: "2024-01-21 14:32:02", level: "info", service: "api-handler", message: "Response sent: 200 OK" },
  { timestamp: "2024-01-21 14:32:05", level: "warn", service: "auth-middleware", message: "Rate limit approaching for IP 192.168.1.100" },
  { timestamp: "2024-01-21 14:32:08", level: "error", service: "webhook-processor", message: "Failed to process webhook: timeout after 30s" },
  { timestamp: "2024-01-21 14:32:10", level: "info", service: "cron-job", message: "Scheduled task started: cleanup-old-sessions" },
  { timestamp: "2024-01-21 14:32:15", level: "info", service: "cron-job", message: "Deleted 1,234 expired sessions" },
  { timestamp: "2024-01-21 14:32:18", level: "info", service: "api-handler", message: "Request received: POST /api/users" },
  { timestamp: "2024-01-21 14:32:19", level: "info", service: "api-handler", message: "User created successfully: user_abc123" },
  { timestamp: "2024-01-21 14:32:22", level: "debug", service: "auth-middleware", message: "Token validated for user_abc123" },
]

// Environment variables
const envVars = [
  { key: "DATABASE_URL", value: "postgres://***:***@db.shadw.cloud:5432/myapp", secret: true },
  { key: "REDIS_URL", value: "redis://***@redis.shadw.cloud:6379", secret: true },
  { key: "API_KEY", value: "sk_live_***************************", secret: true },
  { key: "NODE_ENV", value: "production", secret: false },
  { key: "LOG_LEVEL", value: "info", secret: false },
  { key: "MAX_CONNECTIONS", value: "100", secret: false },
  { key: "CORS_ORIGIN", value: "https://app.example.com", secret: false },
]

// Processes data
const processesData = [
  { pid: 1234, name: "node server.js", cpu: "2.3%", memory: "128 MB", status: "running", uptime: "3d 14h" },
  { pid: 1235, name: "postgres", cpu: "1.1%", memory: "256 MB", status: "running", uptime: "7d 2h" },
  { pid: 1236, name: "redis-server", cpu: "0.4%", memory: "64 MB", status: "running", uptime: "7d 2h" },
  { pid: 1237, name: "nginx", cpu: "0.2%", memory: "32 MB", status: "running", uptime: "7d 2h" },
  { pid: 1238, name: "cron-worker", cpu: "0.1%", memory: "48 MB", status: "running", uptime: "1d 6h" },
]

// Domains data
const domainsData = [
  { domain: "app.example.com", type: "Primary", ssl: true, status: "active", target: "my-app.shadw.cloud" },
  { domain: "api.example.com", type: "Alias", ssl: true, status: "active", target: "my-app.shadw.cloud" },
  { domain: "staging.example.com", type: "Alias", ssl: true, status: "active", target: "my-app-staging.shadw.cloud" },
  { domain: "my-app.shadw.cloud", type: "Default", ssl: true, status: "active", target: "—" },
]

// Network rules
const networkRules = [
  { name: "Allow HTTPS", direction: "inbound", protocol: "TCP", port: "443", source: "0.0.0.0/0", action: "allow" },
  { name: "Allow HTTP", direction: "inbound", protocol: "TCP", port: "80", source: "0.0.0.0/0", action: "allow" },
  { name: "Allow SSH", direction: "inbound", protocol: "TCP", port: "22", source: "10.0.0.0/8", action: "allow" },
  { name: "Database", direction: "outbound", protocol: "TCP", port: "5432", source: "db.shadw.cloud", action: "allow" },
  { name: "Redis", direction: "outbound", protocol: "TCP", port: "6379", source: "redis.shadw.cloud", action: "allow" },
]

// Disks data
const disksData = [
  { name: "root", mount: "/", size: "50 GB", used: "23 GB", available: "27 GB", usage: 46 },
  { name: "data", mount: "/data", size: "200 GB", used: "134 GB", available: "66 GB", usage: 67 },
  { name: "logs", mount: "/var/log", size: "20 GB", used: "8 GB", available: "12 GB", usage: 40 },
  { name: "tmp", mount: "/tmp", size: "10 GB", used: "1 GB", available: "9 GB", usage: 10 },
]

// Users data
const usersData = [
  { id: 1, name: "John Doe", email: "john@example.com", role: "Owner", lastActive: "2 min ago", avatar: "J" },
  { id: 2, name: "Jane Smith", email: "jane@example.com", role: "Admin", lastActive: "1 hour ago", avatar: "J" },
  { id: 3, name: "Bob Wilson", email: "bob@example.com", role: "Developer", lastActive: "3 hours ago", avatar: "B" },
  { id: 4, name: "Alice Brown", email: "alice@example.com", role: "Viewer", lastActive: "1 day ago", avatar: "A" },
]

// Logs View Component
function LogsView() {
  const [filter, setFilter] = useState("all")
  const [searchQuery, setSearchQuery] = useState("")
  
  const filteredLogs = logsData.filter(log => {
    if (filter !== "all" && log.level !== filter) return false
    if (searchQuery && !log.message.toLowerCase().includes(searchQuery.toLowerCase())) return false
    return true
  })

  const getLevelColor = (level: string) => {
    switch (level) {
      case "error": return "text-red-400 bg-red-500/10"
      case "warn": return "text-yellow-400 bg-yellow-500/10"
      case "info": return "text-cyan-400 bg-cyan-500/10"
      case "debug": return "text-gray-400 bg-gray-500/10"
      default: return "text-gray-400 bg-gray-500/10"
    }
  }

  return (
    <div className="flex-1 flex flex-col overflow-hidden">
      {/* Toolbar */}
      <div className="px-6 py-3 border-b border-gray-800/60 bg-[#0c0c0d] flex items-center gap-4">
        <div className="flex-1 relative">
          <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-gray-500" />
          <input
            type="text"
            placeholder="Search logs..."
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
            className="w-full h-9 pl-10 pr-4 bg-[#111113] border border-gray-800 rounded-lg text-sm text-white placeholder-gray-500 focus:outline-none focus:border-gray-700"
          />
        </div>
        <div className="flex items-center gap-2">
          {["all", "error", "warn", "info", "debug"].map((level) => (
            <button
              key={level}
              onClick={() => setFilter(level)}
              className={`px-3 py-1.5 text-xs font-medium rounded-lg transition-colors ${
                filter === level 
                  ? "bg-white/10 text-white" 
                  : "text-gray-400 hover:text-white hover:bg-white/5"
              }`}
            >
              {level.charAt(0).toUpperCase() + level.slice(1)}
            </button>
          ))}
        </div>
        <Button variant="outline" size="sm" className="bg-transparent border-gray-700 text-gray-300 hover:bg-white/5">
          <Download className="w-4 h-4 mr-2" />
          Export
        </Button>
      </div>
      
      {/* Logs List */}
      <div className="flex-1 overflow-auto font-mono text-sm">
        {filteredLogs.map((log, i) => (
          <div key={i} className="flex items-start gap-4 px-6 py-2 border-b border-gray-800/30 hover:bg-white/[0.02]">
            <span className="text-gray-600 text-xs whitespace-nowrap">{log.timestamp}</span>
            <span className={`px-2 py-0.5 rounded text-[10px] font-semibold uppercase ${getLevelColor(log.level)}`}>
              {log.level}
            </span>
            <span className="text-purple-400 text-xs whitespace-nowrap">{log.service}</span>
            <span className="text-gray-300 flex-1">{log.message}</span>
          </div>
        ))}
      </div>
    </div>
  )
}

// Environment Variables View
function EnvVarsView() {
  const [showSecrets, setShowSecrets] = useState(false)
  
  return (
    <div className="flex-1 overflow-auto p-6">
      <div className="flex items-center justify-between mb-6">
        <div>
          <h2 className="text-lg font-semibold text-white">Environment Variables</h2>
          <p className="text-sm text-gray-400 mt-1">Manage your application&apos;s environment configuration</p>
        </div>
        <div className="flex items-center gap-3">
          <button
            onClick={() => setShowSecrets(!showSecrets)}
            className="px-3 py-1.5 text-xs font-medium text-gray-400 hover:text-white transition-colors"
          >
            {showSecrets ? "Hide secrets" : "Show secrets"}
          </button>
          <Button size="sm" className="bg-cyan-600 hover:bg-cyan-500 text-white">
            <Plus className="w-4 h-4 mr-2" />
            Add Variable
          </Button>
        </div>
      </div>
      
      <div className="bg-[#0a0a0b] border border-gray-800 rounded-xl overflow-hidden">
        <table className="w-full">
          <thead>
            <tr className="border-b border-gray-800">
              <th className="text-left text-xs font-medium text-gray-500 uppercase tracking-wider px-4 py-3">Key</th>
              <th className="text-left text-xs font-medium text-gray-500 uppercase tracking-wider px-4 py-3">Value</th>
              <th className="text-left text-xs font-medium text-gray-500 uppercase tracking-wider px-4 py-3 w-24">Type</th>
              <th className="w-20"></th>
            </tr>
          </thead>
          <tbody>
            {envVars.map((env) => (
              <tr key={env.key} className="border-b border-gray-800/50 hover:bg-white/[0.02]">
                <td className="px-4 py-3">
                  <code className="text-sm text-cyan-400 font-mono">{env.key}</code>
                </td>
                <td className="px-4 py-3">
                  <code className="text-sm text-gray-300 font-mono">
                    {env.secret && !showSecrets ? "••••••••••••••••" : env.value}
                  </code>
                </td>
                <td className="px-4 py-3">
                  {env.secret ? (
                    <span className="inline-flex items-center gap-1 text-xs text-yellow-400">
                      <Shield className="w-3 h-3" />
                      Secret
                    </span>
                  ) : (
                    <span className="text-xs text-gray-500">Plain</span>
                  )}
                </td>
                <td className="px-4 py-3 text-right">
                  <button className="p-1.5 text-gray-500 hover:text-white rounded-lg hover:bg-white/5">
                    <Copy className="w-4 h-4" />
                  </button>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  )
}

// Processes View
function ProcessesView() {
  return (
    <div className="flex-1 overflow-auto p-6">
      <div className="flex items-center justify-between mb-6">
        <div>
          <h2 className="text-lg font-semibold text-white">Processes</h2>
          <p className="text-sm text-gray-400 mt-1">Monitor running processes and resource usage</p>
        </div>
        <Button variant="outline" size="sm" className="bg-transparent border-gray-700 text-gray-300 hover:bg-white/5">
          <RotateCcw className="w-4 h-4 mr-2" />
          Refresh
        </Button>
      </div>
      
      <div className="bg-[#0a0a0b] border border-gray-800 rounded-xl overflow-hidden">
        <table className="w-full">
          <thead>
            <tr className="border-b border-gray-800">
              <th className="text-left text-xs font-medium text-gray-500 uppercase tracking-wider px-4 py-3">PID</th>
              <th className="text-left text-xs font-medium text-gray-500 uppercase tracking-wider px-4 py-3">Process</th>
              <th className="text-left text-xs font-medium text-gray-500 uppercase tracking-wider px-4 py-3">CPU</th>
              <th className="text-left text-xs font-medium text-gray-500 uppercase tracking-wider px-4 py-3">Memory</th>
              <th className="text-left text-xs font-medium text-gray-500 uppercase tracking-wider px-4 py-3">Uptime</th>
              <th className="text-left text-xs font-medium text-gray-500 uppercase tracking-wider px-4 py-3">Status</th>
              <th className="w-20"></th>
            </tr>
          </thead>
          <tbody>
            {processesData.map((proc) => (
              <tr key={proc.pid} className="border-b border-gray-800/50 hover:bg-white/[0.02]">
                <td className="px-4 py-3">
                  <code className="text-sm text-gray-400 font-mono">{proc.pid}</code>
                </td>
                <td className="px-4 py-3">
                  <code className="text-sm text-white font-mono">{proc.name}</code>
                </td>
                <td className="px-4 py-3 text-sm text-cyan-400">{proc.cpu}</td>
                <td className="px-4 py-3 text-sm text-purple-400">{proc.memory}</td>
                <td className="px-4 py-3 text-sm text-gray-400">{proc.uptime}</td>
                <td className="px-4 py-3">
                  <span className="inline-flex items-center gap-1.5 text-xs text-emerald-400">
                    <div className="w-1.5 h-1.5 rounded-full bg-emerald-500 animate-pulse" />
                    {proc.status}
                  </span>
                </td>
                <td className="px-4 py-3 text-right">
                  <button className="p-1.5 text-gray-500 hover:text-red-400 rounded-lg hover:bg-red-500/10">
                    <X className="w-4 h-4" />
                  </button>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  )
}

// Domains View
function DomainsView() {
  return (
    <div className="flex-1 overflow-auto p-6">
      <div className="flex items-center justify-between mb-6">
        <div>
          <h2 className="text-lg font-semibold text-white">Domains</h2>
          <p className="text-sm text-gray-400 mt-1">Configure custom domains and SSL certificates</p>
        </div>
        <Button size="sm" className="bg-cyan-600 hover:bg-cyan-500 text-white">
          <Plus className="w-4 h-4 mr-2" />
          Add Domain
        </Button>
      </div>
      
      <div className="space-y-3">
        {domainsData.map((domain) => (
          <div key={domain.domain} className="bg-[#0a0a0b] border border-gray-800 rounded-xl p-4 hover:border-gray-700 transition-colors">
            <div className="flex items-center justify-between">
              <div className="flex items-center gap-4">
                <div className="w-10 h-10 rounded-lg bg-gradient-to-br from-cyan-500/20 to-purple-500/20 flex items-center justify-center">
                  <Globe className="w-5 h-5 text-cyan-400" />
                </div>
                <div>
                  <div className="flex items-center gap-2">
                    <span className="text-white font-medium">{domain.domain}</span>
                    {domain.ssl && (
                      <span className="inline-flex items-center gap-1 px-2 py-0.5 rounded-full bg-emerald-500/10 text-emerald-400 text-[10px]">
                        <Shield className="w-3 h-3" />
                        SSL
                      </span>
                    )}
                  </div>
                  <div className="text-xs text-gray-500 mt-0.5">
                    {domain.type} {domain.target !== "—" && `→ ${domain.target}`}
                  </div>
                </div>
              </div>
              <div className="flex items-center gap-3">
                <span className="inline-flex items-center gap-1.5 text-xs text-emerald-400">
                  <div className="w-1.5 h-1.5 rounded-full bg-emerald-500" />
                  {domain.status}
                </span>
                <button className="p-2 text-gray-500 hover:text-white rounded-lg hover:bg-white/5">
                  <Settings className="w-4 h-4" />
                </button>
              </div>
            </div>
          </div>
        ))}
      </div>
    </div>
  )
}

// Networking View
function NetworkingView() {
  return (
    <div className="flex-1 overflow-auto p-6">
      <div className="flex items-center justify-between mb-6">
        <div>
          <h2 className="text-lg font-semibold text-white">Networking</h2>
          <p className="text-sm text-gray-400 mt-1">Configure firewall rules and network policies</p>
        </div>
        <Button size="sm" className="bg-cyan-600 hover:bg-cyan-500 text-white">
          <Plus className="w-4 h-4 mr-2" />
          Add Rule
        </Button>
      </div>
      
      <div className="bg-[#0a0a0b] border border-gray-800 rounded-xl overflow-hidden">
        <table className="w-full">
          <thead>
            <tr className="border-b border-gray-800">
              <th className="text-left text-xs font-medium text-gray-500 uppercase tracking-wider px-4 py-3">Name</th>
              <th className="text-left text-xs font-medium text-gray-500 uppercase tracking-wider px-4 py-3">Direction</th>
              <th className="text-left text-xs font-medium text-gray-500 uppercase tracking-wider px-4 py-3">Protocol</th>
              <th className="text-left text-xs font-medium text-gray-500 uppercase tracking-wider px-4 py-3">Port</th>
              <th className="text-left text-xs font-medium text-gray-500 uppercase tracking-wider px-4 py-3">Source/Dest</th>
              <th className="text-left text-xs font-medium text-gray-500 uppercase tracking-wider px-4 py-3">Action</th>
            </tr>
          </thead>
          <tbody>
            {networkRules.map((rule) => (
              <tr key={rule.name} className="border-b border-gray-800/50 hover:bg-white/[0.02]">
                <td className="px-4 py-3 text-sm text-white">{rule.name}</td>
                <td className="px-4 py-3">
                  <span className={`text-xs px-2 py-0.5 rounded ${
                    rule.direction === "inbound" ? "bg-cyan-500/10 text-cyan-400" : "bg-purple-500/10 text-purple-400"
                  }`}>
                    {rule.direction}
                  </span>
                </td>
                <td className="px-4 py-3 text-sm text-gray-400 font-mono">{rule.protocol}</td>
                <td className="px-4 py-3 text-sm text-gray-400 font-mono">{rule.port}</td>
                <td className="px-4 py-3 text-sm text-gray-400 font-mono">{rule.source}</td>
                <td className="px-4 py-3">
                  <span className="text-xs text-emerald-400 font-medium uppercase">{rule.action}</span>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  )
}

// Disks View
function DisksView() {
  return (
    <div className="flex-1 overflow-auto p-6">
      <div className="flex items-center justify-between mb-6">
        <div>
          <h2 className="text-lg font-semibold text-white">Disks</h2>
          <p className="text-sm text-gray-400 mt-1">Monitor storage volumes and disk usage</p>
        </div>
        <Button size="sm" className="bg-cyan-600 hover:bg-cyan-500 text-white">
          <Plus className="w-4 h-4 mr-2" />
          Add Volume
        </Button>
      </div>
      
      <div className="grid grid-cols-2 gap-4">
        {disksData.map((disk) => (
          <div key={disk.name} className="bg-[#0a0a0b] border border-gray-800 rounded-xl p-5">
            <div className="flex items-center justify-between mb-4">
              <div className="flex items-center gap-3">
                <div className="w-10 h-10 rounded-lg bg-gradient-to-br from-purple-500/20 to-cyan-500/20 flex items-center justify-center">
                  <HardDrive className="w-5 h-5 text-purple-400" />
                </div>
                <div>
                  <div className="text-white font-medium">{disk.name}</div>
                  <div className="text-xs text-gray-500 font-mono">{disk.mount}</div>
                </div>
              </div>
              <div className="text-right">
                <div className="text-lg font-semibold text-white">{disk.usage}%</div>
                <div className="text-xs text-gray-500">used</div>
              </div>
            </div>
            <div className="h-2 bg-gray-800 rounded-full overflow-hidden mb-3">
              <div 
                className={`h-full rounded-full transition-all ${
                  disk.usage > 80 ? "bg-red-500" : disk.usage > 60 ? "bg-yellow-500" : "bg-cyan-500"
                }`}
                style={{ width: `${disk.usage}%` }}
              />
            </div>
            <div className="flex justify-between text-xs text-gray-500">
              <span>{disk.used} used</span>
              <span>{disk.available} free</span>
              <span>{disk.size} total</span>
            </div>
          </div>
        ))}
      </div>
    </div>
  )
}

// Web Terminal View
function WebTerminalView() {
  const [command, setCommand] = useState("")
  const [history, setHistory] = useState([
    { type: "output", content: "Welcome to Shadw Cloud Terminal" },
    { type: "output", content: "Connected to my-app.shadw.cloud" },
    { type: "output", content: "" },
    { type: "command", content: "ls -la" },
    { type: "output", content: "total 48\ndrwxr-xr-x  6 deploy deploy  4096 Jan 21 14:30 .\ndrwxr-xr-x  3 root   root    4096 Jan 14 10:22 ..\n-rw-r--r--  1 deploy deploy   220 Jan 14 10:22 .bash_logout\n-rw-r--r--  1 deploy deploy  3771 Jan 14 10:22 .bashrc\ndrwxr-xr-x  2 deploy deploy  4096 Jan 21 14:30 app\n-rw-r--r--  1 deploy deploy  1234 Jan 21 14:28 package.json" },
    { type: "command", content: "cat package.json | head -5" },
    { type: "output", content: '{\n  "name": "my-app",\n  "version": "1.0.0",\n  "description": "My awesome app",\n  "main": "server.js"' },
  ])
  
  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault()
    if (!command.trim()) return
    setHistory([...history, { type: "command", content: command }, { type: "output", content: `Command executed: ${command}` }])
    setCommand("")
  }

  return (
    <div className="flex-1 flex flex-col bg-[#0a0a0b] overflow-hidden">
      {/* Terminal Header */}
      <div className="h-10 bg-[#111113] border-b border-gray-800 flex items-center px-4 gap-2">
        <div className="flex gap-1.5">
          <div className="w-3 h-3 rounded-full bg-red-500/80" />
          <div className="w-3 h-3 rounded-full bg-yellow-500/80" />
          <div className="w-3 h-3 rounded-full bg-emerald-500/80" />
        </div>
        <span className="text-xs text-gray-500 ml-3">deploy@my-app ~ zsh</span>
      </div>
      
      {/* Terminal Content */}
      <div className="flex-1 overflow-auto p-4 font-mono text-sm">
        {history.map((item, i) => (
          <div key={i} className={`${item.type === "command" ? "text-cyan-400" : "text-gray-300"} whitespace-pre-wrap`}>
            {item.type === "command" && <span className="text-emerald-400">$ </span>}
            {item.content}
          </div>
        ))}
      </div>
      
      {/* Input */}
      <form onSubmit={handleSubmit} className="border-t border-gray-800 p-4">
        <div className="flex items-center gap-2">
          <span className="text-emerald-400 font-mono">$</span>
          <input
            type="text"
            value={command}
            onChange={(e) => setCommand(e.target.value)}
            className="flex-1 bg-transparent text-white font-mono text-sm focus:outline-none"
            placeholder="Enter command..."
            autoFocus
          />
        </div>
      </form>
    </div>
  )
}

// Users View
function UsersView() {
  return (
    <div className="flex-1 overflow-auto p-6">
      <div className="flex items-center justify-between mb-6">
        <div>
          <h2 className="text-lg font-semibold text-white">User Management</h2>
          <p className="text-sm text-gray-400 mt-1">Manage team members and permissions</p>
        </div>
        <Button size="sm" className="bg-cyan-600 hover:bg-cyan-500 text-white">
          <Plus className="w-4 h-4 mr-2" />
          Invite User
        </Button>
      </div>
      
      <div className="space-y-3">
        {usersData.map((user) => (
          <div key={user.id} className="bg-[#0a0a0b] border border-gray-800 rounded-xl p-4 hover:border-gray-700 transition-colors">
            <div className="flex items-center justify-between">
              <div className="flex items-center gap-4">
                <div className="w-10 h-10 rounded-full bg-gradient-to-br from-purple-500 to-cyan-500 flex items-center justify-center text-white font-semibold">
                  {user.avatar}
                </div>
                <div>
                  <div className="text-white font-medium">{user.name}</div>
                  <div className="text-xs text-gray-500">{user.email}</div>
                </div>
              </div>
              <div className="flex items-center gap-4">
                <div className="text-right">
                  <span className={`text-xs px-2 py-0.5 rounded ${
                    user.role === "Owner" ? "bg-yellow-500/10 text-yellow-400" :
                    user.role === "Admin" ? "bg-purple-500/10 text-purple-400" :
                    user.role === "Developer" ? "bg-cyan-500/10 text-cyan-400" :
                    "bg-gray-500/10 text-gray-400"
                  }`}>
                    {user.role}
                  </span>
                  <div className="text-xs text-gray-600 mt-1">Active {user.lastActive}</div>
                </div>
                <button className="p-2 text-gray-500 hover:text-white rounded-lg hover:bg-white/5">
                  <Settings className="w-4 h-4" />
                </button>
              </div>
            </div>
          </div>
        ))}
      </div>
    </div>
  )
}

// Settings View
function SettingsView() {
  return (
    <div className="flex-1 overflow-auto p-6">
      <div className="max-w-2xl">
        <h2 className="text-lg font-semibold text-white mb-6">Settings</h2>
        
        <div className="space-y-6">
          {/* General */}
          <div className="bg-[#0a0a0b] border border-gray-800 rounded-xl p-5">
            <h3 className="text-sm font-medium text-white mb-4">General</h3>
            <div className="space-y-4">
              <div>
                <label className="text-xs text-gray-500 block mb-1.5">Project Name</label>
                <input 
                  type="text" 
                  defaultValue="my-app"
                  className="w-full h-9 px-3 bg-[#111113] border border-gray-800 rounded-lg text-sm text-white focus:outline-none focus:border-gray-700"
                />
              </div>
              <div>
                <label className="text-xs text-gray-500 block mb-1.5">Description</label>
                <textarea 
                  defaultValue="Production application"
                  rows={3}
                  className="w-full px-3 py-2 bg-[#111113] border border-gray-800 rounded-lg text-sm text-white focus:outline-none focus:border-gray-700 resize-none"
                />
              </div>
            </div>
          </div>

          {/* Build & Deploy */}
          <div className="bg-[#0a0a0b] border border-gray-800 rounded-xl p-5">
            <h3 className="text-sm font-medium text-white mb-4">Build & Deploy</h3>
            <div className="space-y-4">
              <div>
                <label className="text-xs text-gray-500 block mb-1.5">Build Command</label>
                <input 
                  type="text" 
                  defaultValue="npm run build"
                  className="w-full h-9 px-3 bg-[#111113] border border-gray-800 rounded-lg text-sm text-white font-mono focus:outline-none focus:border-gray-700"
                />
              </div>
              <div>
                <label className="text-xs text-gray-500 block mb-1.5">Start Command</label>
                <input 
                  type="text" 
                  defaultValue="npm start"
                  className="w-full h-9 px-3 bg-[#111113] border border-gray-800 rounded-lg text-sm text-white font-mono focus:outline-none focus:border-gray-700"
                />
              </div>
              <div className="flex items-center justify-between py-2">
                <div>
                  <div className="text-sm text-white">Auto Deploy</div>
                  <div className="text-xs text-gray-500">Deploy automatically on push to main</div>
                </div>
                <button className="w-11 h-6 bg-cyan-600 rounded-full relative">
                  <div className="w-5 h-5 bg-white rounded-full absolute right-0.5 top-0.5" />
                </button>
              </div>
            </div>
          </div>

          {/* Danger Zone */}
          <div className="bg-[#0a0a0b] border border-red-900/50 rounded-xl p-5">
            <h3 className="text-sm font-medium text-red-400 mb-4">Danger Zone</h3>
            <div className="flex items-center justify-between">
              <div>
                <div className="text-sm text-white">Delete Project</div>
                <div className="text-xs text-gray-500">Permanently delete this project and all its data</div>
              </div>
              <Button variant="outline" size="sm" className="border-red-800 text-red-400 hover:bg-red-500/10 bg-transparent">
                Delete Project
              </Button>
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}

// Sidebar navigation items
const sidebarItems = [
  { id: "overview", label: "Overview", icon: LayoutGrid, active: true },
  { id: "functions", label: "Functions", icon: Zap },
  { id: "logs", label: "Logs", icon: Terminal },
  { id: "web-desktop", label: "Web Desktop", icon: Maximize2 },
  { id: "env-vars", label: "Environment variables", icon: Key },
  { id: "processes", label: "Processes", icon: Activity },
  { id: "domains", label: "Domains", icon: Globe },
  { id: "networking", label: "Networking", icon: Network },
  { id: "disks", label: "Disks", icon: HardDrive },
  { id: "terminal", label: "Web terminal", icon: Terminal },
  { id: "users", label: "User management", icon: Users },
  { id: "settings", label: "Settings", icon: Settings },
]

// Function metrics data
const functionMetrics = [
  { label: "Total Invocations", value: "2.4M", change: "+12.3%", trend: "up" },
  { label: "Avg Latency", value: "23ms", change: "-8.1%", trend: "down" },
  { label: "Error Rate", value: "0.02%", change: "-2.4%", trend: "down" },
  { label: "Active Functions", value: "12", change: "+2", trend: "up" },
]

const regions = [
  { name: "US East", code: "us-east-1", latency: "12ms", status: "healthy" },
  { name: "US West", code: "us-west-2", latency: "18ms", status: "healthy" },
  { name: "EU West", code: "eu-west-1", latency: "45ms", status: "healthy" },
  { name: "AP South", code: "ap-south-1", latency: "89ms", status: "degraded" },
]

// Sample function code
const sampleFunctionCode: Record<string, string> = {
  "api-handler": `import { Hono } from 'hono'

const app = new Hono()

app.get('/api/users', async (c) => {
  const users = await db.query('SELECT * FROM users')
  return c.json(users)
})

app.post('/api/users', async (c) => {
  const body = await c.req.json()
  const user = await db.insert('users', body)
  return c.json(user, 201)
})

export default app`,
  "auth-middleware": `import { verify } from 'hono/jwt'

export async function authMiddleware(c, next) {
  const token = c.req.header('Authorization')
  
  if (!token) {
    return c.json({ error: 'Unauthorized' }, 401)
  }
  
  try {
    const payload = await verify(token.split(' ')[1], c.env.JWT_SECRET)
    c.set('user', payload)
    await next()
  } catch (e) {
    return c.json({ error: 'Invalid token' }, 401)
  }
}`,
  "webhook-processor": `export default {
  async fetch(request, env) {
    const payload = await request.json()
    
    // Process webhook event
    switch (payload.event) {
      case 'payment.success':
        await env.QUEUE.send({ type: 'process_payment', data: payload })
        break
      case 'user.created':
        await env.KV.put(\`user:\${payload.id}\`, JSON.stringify(payload))
        break
    }
    
    return new Response('OK', { status: 200 })
  }
}`,
  "cron-job": `export default {
  async scheduled(event, env, ctx) {
    // Run daily cleanup
    const oldRecords = await env.DB.prepare(
      'SELECT id FROM logs WHERE created_at < datetime("now", "-30 days")'
    ).all()
    
    for (const record of oldRecords.results) {
      await env.DB.prepare('DELETE FROM logs WHERE id = ?')
        .bind(record.id)
        .run()
    }
    
    console.log(\`Cleaned up \${oldRecords.results.length} old records\`)
  }
}`,
}

// Infrastructure Node Components for Overview
function CloudflareNode() {
  return (
    <div className="w-52 bg-[#0a0a0b] border border-gray-700 rounded-xl overflow-hidden relative">
      <Handle type="source" position={Position.Right} className="!bg-cyan-500 !w-3 !h-3 !border-2 !border-[#0a0a0b]" />
      <div className="px-4 py-3 border-b border-gray-700 flex items-center gap-2 bg-[#0c0c0d]">
        <div className="w-6 h-6 rounded bg-orange-500/20 flex items-center justify-center">
          <CloudCog className="w-3.5 h-3.5 text-orange-400" />
        </div>
        <span className="text-sm font-medium text-white">Cloudflare</span>
      </div>
      <div className="p-4 space-y-3">
        <div className="flex items-center justify-between text-sm">
          <div className="flex items-center gap-2">
            <div className="w-1.5 h-1.5 rounded-full bg-emerald-500" />
            <span className="text-gray-400">DDoS protection</span>
          </div>
          <span className="text-emerald-400 text-xs">Enabled</span>
        </div>
        <div className="flex items-center justify-between text-sm">
          <div className="flex items-center gap-2">
            <div className="w-1.5 h-1.5 rounded-full bg-gray-600" />
            <span className="text-gray-400">CDN</span>
          </div>
          <span className="text-gray-500 text-xs">Disabled</span>
        </div>
        <div className="flex items-center justify-between text-sm">
          <div className="flex items-center gap-2">
            <div className="w-1.5 h-1.5 rounded-full bg-gray-600" />
            <span className="text-gray-400">Edge caching</span>
          </div>
          <span className="text-gray-500 text-xs">Disabled</span>
        </div>
      </div>
      <div className="px-4 pb-4">
        <button className="w-full py-1.5 text-sm text-gray-400 border border-gray-600 rounded-lg hover:bg-white/5 hover:text-white transition-colors">
          Settings
        </button>
      </div>
    </div>
  )
}

function AppNode() {
  return (
    <div className="w-72 bg-[#0a0a0b] border border-gray-700 rounded-xl overflow-hidden relative">
      <Handle type="target" position={Position.Left} className="!bg-cyan-500 !w-3 !h-3 !border-2 !border-[#0a0a0b]" />
      <Handle type="source" position={Position.Right} className="!bg-cyan-500 !w-3 !h-3 !border-2 !border-[#0a0a0b]" />
      <div className="px-4 py-3 border-b border-gray-700 flex items-center gap-2 bg-[#0c0c0d]">
        <div className="w-6 h-6 rounded bg-purple-500/20 flex items-center justify-center">
          <Layers className="w-3.5 h-3.5 text-purple-400" />
        </div>
        <span className="text-sm font-medium text-white">my-app</span>
      </div>
      <div className="p-4 space-y-3">
        <div className="flex items-center justify-between text-sm">
          <div className="flex items-center gap-2">
            <div className="w-1.5 h-1.5 rounded-full bg-emerald-500" />
            <span className="text-gray-400">Web process</span>
          </div>
          <span className="text-emerald-400 text-xs">Running</span>
        </div>
        <div className="flex items-center justify-between text-sm">
          <span className="text-gray-500">Start command</span>
          <span className="text-gray-300 text-xs">Default</span>
        </div>
        <div className="flex items-center justify-between text-sm">
          <span className="text-gray-500">Resources</span>
          <span className="text-gray-300 text-xs font-mono">H1 (0.3 CPU, 0.3 GB RAM)</span>
        </div>
        <div className="flex items-center justify-between text-sm">
          <span className="text-gray-500">Instances</span>
          <span className="text-gray-300 text-xs">1</span>
        </div>
        <div className="flex items-center justify-between text-sm">
          <span className="text-gray-500">Domain</span>
          <span className="text-gray-300 text-xs truncate max-w-[140px]">my-app.shadw.cloud</span>
        </div>
      </div>
      <div className="px-4 pb-4 flex gap-2">
        <button className="flex-1 py-1.5 text-xs text-gray-400 border border-gray-600 rounded-lg hover:bg-white/5 hover:text-white transition-colors">
          View logs
        </button>
        <button className="flex-1 py-1.5 text-xs text-gray-400 border border-gray-600 rounded-lg hover:bg-white/5 hover:text-white transition-colors">
          Terminal
        </button>
        <button className="flex-1 py-1.5 text-xs text-gray-400 border border-gray-600 rounded-lg hover:bg-white/5 hover:text-white transition-colors">
          Settings
        </button>
      </div>
    </div>
  )
}

function DatabaseNode() {
  return (
    <div className="w-52 bg-[#0a0a0b] border border-gray-700 rounded-xl overflow-hidden relative">
      <Handle type="target" position={Position.Left} className="!bg-cyan-500 !w-3 !h-3 !border-2 !border-[#0a0a0b]" />
      <div className="px-4 py-3 border-b border-gray-700 flex items-center gap-2 bg-[#0c0c0d]">
        <div className="w-6 h-6 rounded bg-cyan-500/20 flex items-center justify-center">
          <Database className="w-3.5 h-3.5 text-cyan-400" />
        </div>
        <span className="text-sm font-medium text-white">PostgreSQL</span>
      </div>
      <div className="p-4 space-y-2">
        <div className="flex items-center gap-2 text-sm">
          <Shield className="w-3.5 h-3.5 text-gray-500" />
          <span className="text-gray-300 text-xs font-mono">noble-red-echidna</span>
        </div>
        <button className="w-full py-2 mt-2 text-sm text-gray-400 border border-gray-600 rounded-lg hover:bg-white/5 hover:text-white transition-colors flex items-center justify-center gap-2">
          <Plus className="w-4 h-4" />
          Add connection
        </button>
      </div>
    </div>
  )
}

// Function Node Component
function FunctionNode({ data, selected }: NodeProps) {
  return (
    <div 
      className={`w-56 bg-[#0a0a0b] border rounded-xl overflow-hidden relative cursor-pointer transition-colors ${
        selected ? "border-cyan-500" : "border-gray-700 hover:border-gray-600"
      }`}
    >
      <Handle type="target" position={Position.Left} className="!bg-cyan-500 !w-3 !h-3 !border-2 !border-[#0a0a0b]" />
      <Handle type="source" position={Position.Right} className="!bg-cyan-500 !w-3 !h-3 !border-2 !border-[#0a0a0b]" />
      <div className="px-4 py-3 border-b border-gray-700 flex items-center gap-2 bg-[#0c0c0d]">
        <div className={`w-6 h-6 rounded flex items-center justify-center ${data.iconBg || "bg-purple-500/20"}`}>
          <Zap className={`w-3.5 h-3.5 ${data.iconColor || "text-purple-400"}`} />
        </div>
        <span className="text-sm font-medium text-white">{data.name}</span>
      </div>
      <div className="p-4 space-y-2">
        <div className="flex items-center justify-between text-sm">
          <div className="flex items-center gap-2">
            <div className={`w-1.5 h-1.5 rounded-full ${data.status === "running" ? "bg-emerald-500" : "bg-yellow-500"}`} />
            <span className="text-gray-400">Status</span>
          </div>
          <span className={`text-xs font-medium ${data.status === "running" ? "text-emerald-400" : "text-yellow-400"}`}>
            {data.status === "running" ? "Running" : "Idle"}
          </span>
        </div>
        <div className="flex items-center justify-between text-sm">
          <span className="text-gray-500">Invocations</span>
          <span className="text-gray-300 text-xs font-mono">{data.invocations}</span>
        </div>
        <div className="flex items-center justify-between text-sm">
          <span className="text-gray-500">Avg latency</span>
          <span className="text-gray-300 text-xs font-mono">{data.latency}</span>
        </div>
        <div className="flex items-center justify-between text-sm">
          <span className="text-gray-500">Runtime</span>
          <span className="text-gray-300 text-xs">{data.runtime}</span>
        </div>
      </div>
      <div className="px-4 pb-4">
        <div className="text-[10px] text-gray-500 mb-2">Click to edit code</div>
      </div>
    </div>
  )
}

// Database Node for Functions view
function DatabaseNodeSmall({ data }: NodeProps) {
  return (
    <div className="w-44 bg-[#0a0a0b] border border-gray-700 rounded-xl overflow-hidden relative">
      <Handle type="target" position={Position.Left} className="!bg-cyan-500 !w-3 !h-3 !border-2 !border-[#0a0a0b]" />
      <div className="px-3 py-2.5 border-b border-gray-700 flex items-center gap-2 bg-[#0c0c0d]">
        <div className="w-5 h-5 rounded bg-cyan-500/20 flex items-center justify-center">
          <Database className="w-3 h-3 text-cyan-400" />
        </div>
        <span className="text-xs font-medium text-white">{data.name}</span>
      </div>
      <div className="p-3">
        <div className="text-[10px] text-gray-500 font-mono">{data.connectionString}</div>
      </div>
    </div>
  )
}

// Queue Node
function QueueNode({ data }: NodeProps) {
  return (
    <div className="w-44 bg-[#0a0a0b] border border-gray-700 rounded-xl overflow-hidden relative">
      <Handle type="target" position={Position.Left} className="!bg-cyan-500 !w-3 !h-3 !border-2 !border-[#0a0a0b]" />
      <Handle type="source" position={Position.Right} className="!bg-cyan-500 !w-3 !h-3 !border-2 !border-[#0a0a0b]" />
      <div className="px-3 py-2.5 border-b border-gray-700 flex items-center gap-2 bg-[#0c0c0d]">
        <div className="w-5 h-5 rounded bg-orange-500/20 flex items-center justify-center">
          <Layers className="w-3 h-3 text-orange-400" />
        </div>
        <span className="text-xs font-medium text-white">{data.name}</span>
      </div>
      <div className="p-3 space-y-1.5">
        <div className="flex items-center justify-between text-xs">
          <span className="text-gray-500">Messages</span>
          <span className="text-gray-300 font-mono">{data.messages}</span>
        </div>
        <div className="flex items-center justify-between text-xs">
          <span className="text-gray-500">Processing</span>
          <span className="text-gray-300 font-mono">{data.processing}</span>
        </div>
      </div>
    </div>
  )
}

const nodeTypes = {
  cloudflare: CloudflareNode,
  app: AppNode,
  database: DatabaseNode,
  function: FunctionNode,
  databaseSmall: DatabaseNodeSmall,
  queue: QueueNode,
}

// Web Desktop Component - Glassmorphic Futuristic Interface
function WebDesktop() {
  const [activeWindows, setActiveWindows] = useState<string[]>([])
  const [focusedWindow, setFocusedWindow] = useState<string | null>(null)
  const [time, setTime] = useState(new Date())

  React.useEffect(() => {
    const timer = setInterval(() => setTime(new Date()), 1000)
    return () => clearInterval(timer)
  }, [])

  const desktopApps = [
    { id: "terminal", name: "Terminal", icon: Terminal, color: "from-emerald-500 to-teal-600" },
    { id: "files", name: "Files", icon: Folder, color: "from-blue-500 to-cyan-600" },
    { id: "monitor", name: "System", icon: Monitor, color: "from-purple-500 to-pink-600" },
    { id: "browser", name: "Browser", icon: Chrome, color: "from-orange-500 to-red-600" },
    { id: "code", name: "Code", icon: Code2, color: "from-cyan-500 to-blue-600" },
    { id: "mail", name: "Mail", icon: Mail, color: "from-red-500 to-pink-600" },
  ]

  const dockApps = [
    { id: "terminal", icon: Terminal, color: "from-emerald-500 to-teal-600" },
    { id: "files", icon: Folder, color: "from-blue-500 to-cyan-600" },
    { id: "code", icon: Code2, color: "from-cyan-500 to-blue-600" },
    { id: "browser", icon: Chrome, color: "from-orange-500 to-red-600" },
    { id: "monitor", icon: Monitor, color: "from-purple-500 to-pink-600" },
    { id: "settings", icon: Settings, color: "from-gray-500 to-gray-600" },
  ]

  const openWindow = (id: string) => {
    if (!activeWindows.includes(id)) {
      setActiveWindows([...activeWindows, id])
    }
    setFocusedWindow(id)
  }

  const closeWindow = (id: string) => {
    setActiveWindows(activeWindows.filter(w => w !== id))
    if (focusedWindow === id) {
      setFocusedWindow(activeWindows[activeWindows.length - 2] || null)
    }
  }

  const windowContent: Record<string, React.ReactNode> = {
    terminal: (
      <div className="font-mono text-sm text-emerald-400 p-4 h-full bg-black/40">
        <div className="text-gray-500 mb-2">shadw@cloud:~$</div>
        <div className="flex items-center gap-2">
          <span className="text-cyan-400">~</span>
          <span className="text-white">ssh deploy@edge-node-01</span>
        </div>
        <div className="text-gray-400 mt-2">Connected to edge-node-01.shadw.cloud</div>
        <div className="text-emerald-400 mt-1">Last login: {time.toLocaleDateString()}</div>
        <div className="flex items-center gap-2 mt-4">
          <span className="text-purple-400">deploy@edge-node-01</span>
          <span className="text-gray-500">:</span>
          <span className="text-cyan-400">~</span>
          <span className="text-white">$</span>
          <span className="animate-pulse">_</span>
        </div>
      </div>
    ),
    files: (
      <div className="p-4 h-full">
        <div className="grid grid-cols-4 gap-4">
          {[
            { name: "Documents", icon: Folder, count: 24 },
            { name: "Images", icon: Folder, count: 156 },
            { name: "Projects", icon: Folder, count: 8 },
            { name: "Downloads", icon: Folder, count: 12 },
            { name: "Music", icon: Music, count: 89 },
            { name: "Videos", icon: Video, count: 23 },
            { name: "config.yaml", icon: Folder, count: null },
            { name: "deploy.sh", icon: Terminal, count: null },
          ].map((item) => (
            <div key={item.name} className="flex flex-col items-center gap-2 p-3 rounded-xl hover:bg-white/10 cursor-pointer transition-all group">
              <div className="w-12 h-12 rounded-xl bg-gradient-to-br from-white/20 to-white/5 backdrop-blur-sm flex items-center justify-center group-hover:scale-110 transition-transform">
                <item.icon className="w-6 h-6 text-white" />
              </div>
              <span className="text-xs text-white/80 text-center">{item.name}</span>
              {item.count && <span className="text-[10px] text-white/40">{item.count} items</span>}
            </div>
          ))}
        </div>
      </div>
    ),
    monitor: (
      <div className="p-4 h-full space-y-4">
        <div className="grid grid-cols-2 gap-3">
          {[
            { label: "CPU Usage", value: "23%", color: "from-cyan-500 to-blue-500" },
            { label: "Memory", value: "4.2 GB", color: "from-purple-500 to-pink-500" },
            { label: "Network", value: "1.2 Gbps", color: "from-emerald-500 to-teal-500" },
            { label: "Storage", value: "67%", color: "from-orange-500 to-red-500" },
          ].map((stat) => (
            <div key={stat.label} className="p-3 rounded-xl bg-white/5 backdrop-blur-sm border border-white/10">
              <div className="text-[10px] text-white/50 uppercase tracking-wider mb-1">{stat.label}</div>
              <div className={`text-xl font-bold bg-gradient-to-r ${stat.color} bg-clip-text text-transparent`}>{stat.value}</div>
              <div className="mt-2 h-1.5 bg-white/10 rounded-full overflow-hidden">
                <div className={`h-full bg-gradient-to-r ${stat.color} rounded-full`} style={{ width: stat.value }} />
              </div>
            </div>
          ))}
        </div>
        <div className="p-3 rounded-xl bg-white/5 backdrop-blur-sm border border-white/10">
          <div className="text-[10px] text-white/50 uppercase tracking-wider mb-2">Active Processes</div>
          <div className="space-y-2">
            {["node server.js", "postgres", "redis-server", "nginx"].map((proc) => (
              <div key={proc} className="flex items-center justify-between text-xs">
                <span className="text-white/70 font-mono">{proc}</span>
                <span className="text-emerald-400">running</span>
              </div>
            ))}
          </div>
        </div>
      </div>
    ),
    browser: (
      <div className="h-full flex flex-col">
        <div className="h-10 bg-white/5 border-b border-white/10 flex items-center px-3 gap-2">
          <div className="flex-1 h-7 bg-white/10 rounded-lg flex items-center px-3">
            <span className="text-xs text-white/50">https://shadw-tjfj.vercel.app/dashboard</span>
          </div>
        </div>
        <div className="flex-1 bg-gradient-to-br from-purple-900/20 to-cyan-900/20 flex items-center justify-center">
          <div className="text-center">
            <div className="w-16 h-16 mx-auto mb-4 rounded-2xl bg-gradient-to-br from-purple-500 to-cyan-500 flex items-center justify-center">
              <Globe className="w-8 h-8 text-white" />
            </div>
            <div className="text-white/60 text-sm">Web content loads here</div>
          </div>
        </div>
      </div>
    ),
    code: (
      <div className="h-full flex flex-col font-mono text-sm">
        <div className="h-8 bg-white/5 border-b border-white/10 flex items-center px-3 gap-2">
          <span className="text-xs text-white/50">main.ts</span>
        </div>
        <div className="flex-1 p-4 overflow-auto">
          <pre className="text-xs leading-relaxed">
            <span className="text-purple-400">import</span><span className="text-white"> {"{ Hono }"} </span><span className="text-purple-400">from</span><span className="text-emerald-400"> &apos;hono&apos;</span>{"\n"}
            {"\n"}
            <span className="text-purple-400">const</span><span className="text-cyan-400"> app</span><span className="text-white"> = </span><span className="text-purple-400">new</span><span className="text-yellow-400"> Hono</span><span className="text-white">()</span>{"\n"}
            {"\n"}
            <span className="text-cyan-400">app</span><span className="text-white">.</span><span className="text-yellow-400">get</span><span className="text-white">(&apos;/&apos;, (c) ={">"} {"{"}</span>{"\n"}
            <span className="text-white">  </span><span className="text-purple-400">return</span><span className="text-white"> c.</span><span className="text-yellow-400">json</span><span className="text-white">({"{"} </span><span className="text-cyan-400">status</span><span className="text-white">: </span><span className="text-emerald-400">&apos;ok&apos;</span><span className="text-white"> {"}"})</span>{"\n"}
            <span className="text-white">{"}"})</span>{"\n"}
            {"\n"}
            <span className="text-purple-400">export default</span><span className="text-cyan-400"> app</span>
          </pre>
        </div>
      </div>
    ),
    mail: (
      <div className="h-full flex">
        <div className="w-48 border-r border-white/10 p-3 space-y-2">
          {["Inbox", "Sent", "Drafts", "Archive"].map((folder) => (
            <div key={folder} className="px-3 py-2 rounded-lg hover:bg-white/10 cursor-pointer text-sm text-white/70">{folder}</div>
          ))}
        </div>
        <div className="flex-1 p-4">
          <div className="text-white/50 text-sm text-center mt-8">No messages selected</div>
        </div>
      </div>
    ),
  }

  return (
    <div className="absolute inset-0 overflow-hidden">
      {/* Animated Background */}
      <div className="absolute inset-0 bg-gradient-to-br from-[#0a0a1a] via-[#0f0f2a] to-[#1a0a2a]">
        <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_top,_var(--tw-gradient-stops))] from-purple-900/20 via-transparent to-transparent" />
        <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_bottom_right,_var(--tw-gradient-stops))] from-cyan-900/20 via-transparent to-transparent" />
        {/* Floating orbs */}
        <div className="absolute top-20 left-20 w-64 h-64 bg-purple-500/10 rounded-full blur-3xl animate-pulse" />
        <div className="absolute bottom-40 right-32 w-96 h-96 bg-cyan-500/10 rounded-full blur-3xl animate-pulse delay-1000" />
        <div className="absolute top-1/2 left-1/2 w-72 h-72 bg-pink-500/5 rounded-full blur-3xl animate-pulse delay-500" />
      </div>

      {/* Grid overlay */}
      <div className="absolute inset-0 opacity-[0.02]" style={{
        backgroundImage: `linear-gradient(rgba(255,255,255,0.1) 1px, transparent 1px), linear-gradient(90deg, rgba(255,255,255,0.1) 1px, transparent 1px)`,
        backgroundSize: '50px 50px'
      }} />

      {/* Top Menu Bar */}
      <div className="absolute top-0 left-0 right-0 h-8 bg-black/40 backdrop-blur-2xl border-b border-white/10 flex items-center justify-between px-4 z-50">
        <div className="flex items-center gap-4">
          <div className="flex items-center gap-2">
            <div className="w-4 h-4 rounded bg-gradient-to-br from-purple-500 to-cyan-500" />
            <span className="text-xs font-semibold text-white">Shadw OS</span>
          </div>
          <div className="flex items-center gap-3 text-xs text-white/60">
            <span className="hover:text-white cursor-pointer transition-colors">File</span>
            <span className="hover:text-white cursor-pointer transition-colors">Edit</span>
            <span className="hover:text-white cursor-pointer transition-colors">View</span>
            <span className="hover:text-white cursor-pointer transition-colors">Help</span>
          </div>
        </div>
        <div className="flex items-center gap-3">
          <div className="flex items-center gap-2 text-white/60">
            <Wifi className="w-3.5 h-3.5" />
            <Volume2 className="w-3.5 h-3.5" />
            <Battery className="w-3.5 h-3.5" />
          </div>
          <div className="text-xs text-white/80 font-medium">
            {time.toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })}
          </div>
        </div>
      </div>

      {/* Desktop Icons */}
      <div className="absolute top-12 left-4 grid grid-cols-1 gap-4 z-10">
        {desktopApps.map((app) => (
          <button
            key={app.id}
            onClick={() => openWindow(app.id)}
            className="flex flex-col items-center gap-1.5 p-2 rounded-xl hover:bg-white/10 transition-all group"
          >
            <div className={`w-14 h-14 rounded-2xl bg-gradient-to-br ${app.color} p-[1px] group-hover:scale-110 transition-transform shadow-lg shadow-black/30`}>
              <div className="w-full h-full rounded-2xl bg-black/30 backdrop-blur-sm flex items-center justify-center">
                <app.icon className="w-7 h-7 text-white" />
              </div>
            </div>
            <span className="text-[11px] text-white/80 font-medium drop-shadow-lg">{app.name}</span>
          </button>
        ))}
      </div>

      {/* Windows */}
      {activeWindows.map((windowId, index) => {
        const app = desktopApps.find(a => a.id === windowId)
        if (!app) return null
        const isFocused = focusedWindow === windowId
        return (
          <div
            key={windowId}
            onClick={() => setFocusedWindow(windowId)}
            className={`absolute rounded-2xl overflow-hidden transition-all duration-200 ${
              isFocused ? "z-40 shadow-2xl shadow-black/50" : "z-30 shadow-xl shadow-black/30"
            }`}
            style={{
              top: 60 + index * 30,
              left: 150 + index * 40,
              width: windowId === "terminal" ? 600 : 500,
              height: windowId === "terminal" ? 350 : 400,
            }}
          >
            {/* Window Chrome */}
            <div className={`h-10 bg-gradient-to-r ${app.color} p-[1px]`}>
              <div className="h-full bg-black/60 backdrop-blur-2xl flex items-center justify-between px-4">
                <div className="flex items-center gap-2">
                  <app.icon className="w-4 h-4 text-white/80" />
                  <span className="text-sm font-medium text-white/90">{app.name}</span>
                </div>
                <div className="flex items-center gap-1">
                  <button className="w-6 h-6 rounded-lg hover:bg-white/10 flex items-center justify-center transition-colors">
                    <Minus className="w-3.5 h-3.5 text-white/60" />
                  </button>
                  <button className="w-6 h-6 rounded-lg hover:bg-white/10 flex items-center justify-center transition-colors">
                    <Maximize2 className="w-3.5 h-3.5 text-white/60" />
                  </button>
                  <button 
                    onClick={(e) => { e.stopPropagation(); closeWindow(windowId) }}
                    className="w-6 h-6 rounded-lg hover:bg-red-500/80 flex items-center justify-center transition-colors"
                  >
                    <X className="w-3.5 h-3.5 text-white/60" />
                  </button>
                </div>
              </div>
            </div>
            {/* Window Content */}
            <div className="h-[calc(100%-40px)] bg-black/40 backdrop-blur-2xl border border-white/10 border-t-0">
              {windowContent[windowId]}
            </div>
          </div>
        )
      })}

      {/* Dock */}
      <div className="absolute bottom-4 left-1/2 -translate-x-1/2 z-50">
        <div className="flex items-end gap-2 px-4 py-2 bg-white/10 backdrop-blur-2xl rounded-2xl border border-white/20 shadow-2xl shadow-black/30">
          {dockApps.map((app) => {
            const isOpen = activeWindows.includes(app.id)
            return (
              <button
                key={app.id}
                onClick={() => openWindow(app.id)}
                className="group relative"
              >
                <div className={`w-12 h-12 rounded-xl bg-gradient-to-br ${app.color} p-[1px] group-hover:scale-110 group-hover:-translate-y-2 transition-all duration-200 shadow-lg`}>
                  <div className="w-full h-full rounded-xl bg-black/30 backdrop-blur-sm flex items-center justify-center">
                    <app.icon className="w-6 h-6 text-white" />
                  </div>
                </div>
                {isOpen && (
                  <div className="absolute -bottom-1 left-1/2 -translate-x-1/2 w-1 h-1 rounded-full bg-white" />
                )}
              </button>
            )
          })}
          <div className="w-px h-10 bg-white/20 mx-1" />
          <button className="group">
            <div className="w-12 h-12 rounded-xl bg-white/10 p-[1px] group-hover:scale-110 group-hover:-translate-y-2 transition-all duration-200">
              <div className="w-full h-full rounded-xl bg-black/30 backdrop-blur-sm flex items-center justify-center">
                <Plus className="w-6 h-6 text-white/60" />
              </div>
            </div>
          </button>
        </div>
      </div>

      {/* Widgets Area */}
      <div className="absolute top-12 right-4 w-64 space-y-3 z-10">
        {/* Clock Widget */}
        <div className="p-4 rounded-2xl bg-white/5 backdrop-blur-2xl border border-white/10">
          <div className="text-4xl font-light text-white mb-1">
            {time.toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })}
          </div>
          <div className="text-sm text-white/50">
            {time.toLocaleDateString([], { weekday: 'long', month: 'long', day: 'numeric' })}
          </div>
        </div>

        {/* Quick Stats Widget */}
        <div className="p-4 rounded-2xl bg-white/5 backdrop-blur-2xl border border-white/10">
          <div className="text-xs text-white/50 uppercase tracking-wider mb-3">System Status</div>
          <div className="space-y-3">
            <div className="flex items-center justify-between">
              <div className="flex items-center gap-2">
                <Cpu className="w-4 h-4 text-cyan-400" />
                <span className="text-sm text-white/70">CPU</span>
              </div>
              <span className="text-sm text-white font-medium">23%</span>
            </div>
            <div className="flex items-center justify-between">
              <div className="flex items-center gap-2">
                <Activity className="w-4 h-4 text-purple-400" />
                <span className="text-sm text-white/70">Memory</span>
              </div>
              <span className="text-sm text-white font-medium">4.2 GB</span>
            </div>
            <div className="flex items-center justify-between">
              <div className="flex items-center gap-2">
                <HardDrive className="w-4 h-4 text-emerald-400" />
                <span className="text-sm text-white/70">Storage</span>
              </div>
              <span className="text-sm text-white font-medium">67%</span>
            </div>
          </div>
        </div>

        {/* Network Widget */}
        <div className="p-4 rounded-2xl bg-white/5 backdrop-blur-2xl border border-white/10">
          <div className="flex items-center justify-between mb-2">
            <div className="flex items-center gap-2">
              <div className="w-2 h-2 rounded-full bg-emerald-500 animate-pulse" />
              <span className="text-xs text-white/50">Connected</span>
            </div>
            <Wifi className="w-4 h-4 text-emerald-400" />
          </div>
          <div className="text-lg font-medium text-white">edge-node-01</div>
          <div className="text-xs text-white/40">192.168.1.100</div>
        </div>
      </div>
    </div>
  )
}

// Overview infrastructure nodes
const overviewNodes: Node[] = [
  {
    id: "cloudflare",
    type: "cloudflare",
    position: { x: 50, y: 120 },
    data: {},
  },
  {
    id: "app",
    type: "app",
    position: { x: 340, y: 80 },
    data: {},
  },
  {
    id: "postgres",
    type: "database",
    position: { x: 700, y: 120 },
    data: {},
  },
]

const overviewEdges: Edge[] = [
  {
    id: "cloudflare-app",
    source: "cloudflare",
    target: "app",
    type: "labeled",
    animated: true,
    data: { label: "HTTPS" },
    markerEnd: { type: MarkerType.ArrowClosed, color: "#22d3ee", width: 16, height: 16 },
  },
  {
    id: "app-postgres",
    source: "app",
    target: "postgres",
    type: "labeled",
    animated: true,
    data: { label: "TCP/5432" },
    markerEnd: { type: MarkerType.ArrowClosed, color: "#22d3ee", width: 16, height: 16 },
  },
]

// Function nodes
const functionNodes: Node[] = [
  {
    id: "api-handler",
    type: "function",
    position: { x: 80, y: 40 },
    data: { 
      name: "api-handler", 
      status: "running", 
      invocations: "1.2M/mo",
      latency: "18ms",
      runtime: "Node.js 20",
      iconBg: "bg-purple-500/20",
      iconColor: "text-purple-400"
    },
  },
  {
    id: "auth-middleware",
    type: "function",
    position: { x: 80, y: 280 },
    data: { 
      name: "auth-middleware", 
      status: "running", 
      invocations: "890K/mo",
      latency: "8ms",
      runtime: "Node.js 20",
      iconBg: "bg-emerald-500/20",
      iconColor: "text-emerald-400"
    },
  },
  {
    id: "webhook-processor",
    type: "function",
    position: { x: 400, y: 40 },
    data: { 
      name: "webhook-processor", 
      status: "running", 
      invocations: "245K/mo",
      latency: "42ms",
      runtime: "Node.js 20",
      iconBg: "bg-cyan-500/20",
      iconColor: "text-cyan-400"
    },
  },
  {
    id: "cron-job",
    type: "function",
    position: { x: 400, y: 280 },
    data: { 
      name: "cron-job", 
      status: "idle", 
      invocations: "720/mo",
      latency: "1.2s",
      runtime: "Node.js 20",
      iconBg: "bg-yellow-500/20",
      iconColor: "text-yellow-400"
    },
  },
  {
    id: "fn-postgres",
    type: "databaseSmall",
    position: { x: 720, y: 80 },
    data: { 
      name: "PostgreSQL",
      connectionString: "postgres://..."
    },
  },
  {
    id: "queue",
    type: "queue",
    position: { x: 720, y: 220 },
    data: { 
      name: "Job Queue",
      messages: "1,234",
      processing: "12"
    },
  },
]

const functionEdges: Edge[] = [
  {
    id: "api-db",
    source: "api-handler",
    target: "fn-postgres",
    type: "labeled",
    animated: true,
    data: { label: "TCP/5432" },
    markerEnd: { type: MarkerType.ArrowClosed, color: "#22d3ee", width: 16, height: 16 },
  },
  {
    id: "api-auth",
    source: "api-handler",
    target: "auth-middleware",
    type: "labeled",
    animated: true,
    data: { label: "HTTP" },
    markerEnd: { type: MarkerType.ArrowClosed, color: "#22d3ee", width: 16, height: 16 },
  },
  {
    id: "webhook-queue",
    source: "webhook-processor",
    target: "queue",
    type: "labeled",
    animated: true,
    data: { label: "AMQP" },
    markerEnd: { type: MarkerType.ArrowClosed, color: "#22d3ee", width: 16, height: 16 },
  },
  {
    id: "cron-db",
    source: "cron-job",
    target: "fn-postgres",
    type: "labeled",
    animated: true,
    data: { label: "TCP/5432" },
    markerEnd: { type: MarkerType.ArrowClosed, color: "#22d3ee", width: 16, height: 16 },
  },
]

const initialNodes: Node[] = [
  {
    id: "cloudflare",
    type: "cloudflare",
    position: { x: 50, y: 120 },
    data: {},
  },
  {
    id: "app",
    type: "app",
    position: { x: 340, y: 80 },
    data: {},
  },
  {
    id: "postgres",
    type: "database",
    position: { x: 700, y: 120 },
    data: {},
  },
]

const initialEdges: Edge[] = [
  {
    id: "cloudflare-app",
    source: "cloudflare",
    target: "app",
    type: "labeled",
    animated: true,
    data: { label: "HTTPS" },
    markerEnd: { type: MarkerType.ArrowClosed, color: "#22d3ee", width: 16, height: 16 },
  },
  {
    id: "app-postgres",
    source: "app",
    target: "postgres",
    type: "labeled",
    animated: true,
    data: { label: "TCP/5432" },
    markerEnd: { type: MarkerType.ArrowClosed, color: "#22d3ee", width: 16, height: 16 },
  },
]

export default function PlatformDashboard() {
  const [activeNav, setActiveNav] = useState("overview")
  const [selectedStack, setSelectedStack] = useState("Production Stack")
  
  // Use different nodes/edges based on active view
  const currentNodes = activeNav === "functions" ? functionNodes : overviewNodes
  const currentEdges = activeNav === "functions" ? functionEdges : overviewEdges
  
  const [nodes, setNodes, onNodesChange] = useNodesState(currentNodes)
  const [edges, setEdges, onEdgesChange] = useEdgesState(currentEdges)
  const [selectedFunction, setSelectedFunction] = useState<string | null>(null)
  const [codeContent, setCodeContent] = useState("")
  const [metricsCollapsed, setMetricsCollapsed] = useState(false)
  
  // Update nodes/edges when view changes
  React.useEffect(() => {
    setNodes(activeNav === "functions" ? functionNodes : overviewNodes)
    setEdges(activeNav === "functions" ? functionEdges : overviewEdges)
    setSelectedFunction(null)
    setCodeContent("")
  }, [activeNav, setNodes, setEdges])

  const onNodeClick = useCallback((event: React.MouseEvent, node: Node) => {
    if (node.type === "function" && activeNav === "functions") {
      setSelectedFunction(node.id)
      setCodeContent(sampleFunctionCode[node.id] || "// No code available")
    }
  }, [activeNav])

  const closeEditor = () => {
    setSelectedFunction(null)
    setCodeContent("")
  }

  return (
    <div className="min-h-screen bg-[#0a0a0b] text-white flex flex-col">
      <style dangerouslySetInnerHTML={{ __html: customStyles }} />
      
      {/* Top Navbar */}
      <header className="h-14 border-b border-gray-800/60 bg-[#0c0c0d] flex items-center justify-between px-4 shrink-0">
        <div className="flex items-center gap-3">
          <Link href="/" className="flex items-center">
            <img src="https://shadw-tjfj.vercel.app/icow.png" alt="Shadw" width={78} height={78} className="opacity-90" />
          </Link>
          <div className="flex items-center gap-2 text-sm">
            <span className="text-gray-600">/</span>
            <div className="flex items-center gap-1.5 text-gray-400">
              <Layers className="w-3.5 h-3.5" />
            </div>
            <span className="text-gray-600">/</span>
            <span className="text-white font-medium">my-app</span>
          </div>
        </div>

        <div className="flex items-center gap-2">
          <button className="p-2 text-gray-400 hover:text-white hover:bg-white/5 rounded-lg transition-colors">
            <Moon className="w-4 h-4" />
          </button>
          <button className="p-2 text-gray-400 hover:text-white hover:bg-white/5 rounded-lg transition-colors">
            <Search className="w-4 h-4" />
          </button>
          <button className="p-2 text-gray-400 hover:text-white hover:bg-white/5 rounded-lg transition-colors">
            <HelpCircle className="w-4 h-4" />
          </button>
          <button className="flex items-center gap-2 ml-2 px-2 py-1.5 rounded-lg hover:bg-white/5 transition-colors">
            <div className="w-7 h-7 rounded-full bg-gray-800 border border-gray-700 flex items-center justify-center text-xs font-semibold text-white">
              A
            </div>
            <span className="text-sm text-gray-300">admin</span>
            <ChevronDown className="w-3.5 h-3.5 text-gray-500" />
          </button>
        </div>
      </header>

      <div className="flex flex-1 overflow-hidden">
        {/* Left Sidebar */}
        <aside className="w-56 border-r border-gray-800/60 bg-[#0a0a0b] flex flex-col shrink-0">
          <nav className="flex-1 py-2">
            {sidebarItems.map((item) => {
              const Icon = item.icon
              const isActive = activeNav === item.id
              return (
                <button
                  key={item.id}
                  onClick={() => setActiveNav(item.id)}
                  className={`w-full flex items-center gap-3 px-4 py-2.5 text-sm transition-colors ${
                    isActive 
                      ? "bg-white/[0.08] text-white border-l-2 border-cyan-500" 
                      : "text-gray-400 hover:text-white hover:bg-white/[0.04] border-l-2 border-transparent"
                  }`}
                >
                  <Icon className="w-4 h-4" />
                  {item.label}
                </button>
              )
            })}
          </nav>
        </aside>

        {/* Main Content */}
        <main className="flex-1 flex flex-col overflow-hidden bg-[#0e0e12]">
          {/* Web Desktop View - Full Screen */}
          {activeNav === "web-desktop" && (
            <div className="flex-1 relative">
              <WebDesktop />
            </div>
          )}

          {/* Project Header - Hide on fullscreen views */}
          {!["web-desktop", "terminal"].includes(activeNav) && (
            <div className="px-6 py-5 border-b border-gray-800/60 bg-[#0a0a0b]">
              <div className="flex items-start justify-between">
                <div>
                  <h1 className="text-2xl font-semibold text-white mb-1">my-app</h1>
                  <div className="flex items-center gap-2 text-sm text-gray-400">
                    <GitBranch className="w-4 h-4" />
                    <span>acme-corp/my-app</span>
                    <span className="text-gray-600">#</span>
                    <span>main</span>
                  </div>
                </div>
                <div className="flex items-center gap-3">
                  <Button variant="outline" className="bg-transparent border-gray-700 text-gray-300 hover:bg-white/5 hover:text-white rounded-lg h-9">
                    <Download className="w-4 h-4 mr-2" />
                    Export IaC
                  </Button>
                  <Button className="bg-gray-800 hover:bg-gray-700 border border-gray-700 text-white rounded-lg h-9">
                    <ExternalLink className="w-4 h-4 mr-2" />
                    Visit App
                  </Button>
                </div>
              </div>

              {/* Stack Selector */}
              <div className="mt-4">
                <button className="flex items-center gap-2 px-3 py-2 bg-[#111113] border border-gray-800 rounded-lg hover:border-gray-700 transition-colors">
                  <LayoutGrid className="w-4 h-4 text-gray-400" />
                  <span className="text-sm text-white">{selectedStack}</span>
                  <ChevronDown className="w-4 h-4 text-gray-500" />
                </button>
              </div>
            </div>
          )}

          {/* Bento Grid - Function Metrics (only show on Functions view) */}
          {activeNav === "functions" && (
            <div className="px-4 py-2 border-b border-gray-800/60 bg-[#0c0c0d]">
              {/* Collapse Header */}
              <button 
                onClick={() => setMetricsCollapsed(!metricsCollapsed)}
                className="w-full flex items-center justify-between py-1.5 text-left hover:bg-white/5 rounded-lg px-2 -mx-2 transition-colors"
              >
                <div className="flex items-center gap-2">
                  <Activity className="w-3.5 h-3.5 text-gray-500" />
                  <span className="text-xs font-medium text-gray-400">Function Metrics</span>
                  {metricsCollapsed && (
                    <span className="text-xs text-gray-600">
                      {functionMetrics[0].value} invocations | {functionMetrics[1].value} latency
                    </span>
                  )}
                </div>
                <ChevronDown className={`w-4 h-4 text-gray-500 transition-transform ${metricsCollapsed ? "-rotate-90" : ""}`} />
              </button>
              
              {/* Collapsible Content */}
              {!metricsCollapsed && (
                <div className="mt-2 space-y-2">
                  <div className="grid grid-cols-4 gap-2">
                    {functionMetrics.map((metric) => (
                      <div key={metric.label} className="bg-[#0a0a0b] border border-gray-800 rounded-lg p-2.5">
                        <div className="text-[10px] text-gray-500 mb-0.5">{metric.label}</div>
                        <div className="flex items-end justify-between">
                          <span className="text-lg font-semibold text-white">{metric.value}</span>
                          <span className={`text-[10px] font-medium ${metric.trend === "up" ? "text-emerald-400" : "text-cyan-400"}`}>
                            {metric.change}
                          </span>
                        </div>
                      </div>
                    ))}
                  </div>
                  
                  {/* Regions - Compact */}
                  <div className="bg-[#0a0a0b] border border-gray-800 rounded-lg p-2.5">
                    <div className="flex items-center gap-1.5 mb-2">
                      <MapPin className="w-3 h-3 text-gray-500" />
                      <span className="text-[10px] font-medium text-gray-400">Regions</span>
                    </div>
                    <div className="flex gap-2">
                      {regions.map((region) => (
                        <div key={region.code} className="flex items-center gap-2 px-2 py-1 bg-[#111113] rounded border border-gray-800">
                          <div className={`w-1.5 h-1.5 rounded-full ${region.status === "healthy" ? "bg-emerald-500" : "bg-yellow-500"}`} />
                          <span className="text-[10px] text-gray-400 font-mono">{region.code}</span>
                          <span className="text-[10px] text-gray-600">{region.latency}</span>
                        </div>
                      ))}
                    </div>
                  </div>
                </div>
              )}
            </div>
          )}

          {/* Other Views */}
          {activeNav === "logs" && <LogsView />}
          {activeNav === "env-vars" && <EnvVarsView />}
          {activeNav === "processes" && <ProcessesView />}
          {activeNav === "domains" && <DomainsView />}
          {activeNav === "networking" && <NetworkingView />}
          {activeNav === "disks" && <DisksView />}
          {activeNav === "terminal" && <WebTerminalView />}
          {activeNav === "users" && <UsersView />}
          {activeNav === "settings" && <SettingsView />}

          {/* Canvas Area with React Flow - Only for Overview and Functions */}
          {(activeNav === "overview" || activeNav === "functions") && (
            <div className="flex-1 relative flex">
              <div className={`flex-1 transition-all ${selectedFunction ? "mr-[480px]" : ""}`}>
                <ReactFlow
                  nodes={nodes}
                  edges={edges}
                  onNodesChange={onNodesChange}
                  onEdgesChange={onEdgesChange}
                  nodeTypes={nodeTypes}
                  edgeTypes={edgeTypes}
                  onNodeClick={onNodeClick}
                  fitView
                  fitViewOptions={{ padding: 0.4 }}
                  className="bg-[#0e0e12]"
                  proOptions={{ hideAttribution: true }}
                >
                  <Background 
                    variant={BackgroundVariant.Dots} 
                    gap={28} 
                    size={2}
                    color="rgba(255, 255, 255, 0.25)"
                    className="bg-[#141418]"
                  />
                  <Controls 
                    className="bg-[#16161a] border border-gray-700 rounded-lg overflow-hidden [&>button]:bg-[#16161a] [&>button]:border-gray-700 [&>button]:text-gray-400 [&>button:hover]:bg-white/10 [&>button:hover]:text-white"
                  />
                </ReactFlow>

                {/* Action Buttons - Different for Overview vs Functions */}
                <div className="absolute bottom-6 left-1/2 -translate-x-1/2 flex items-center gap-2 z-10">
                  {activeNav === "functions" ? (
                    <>
                      <button className="flex items-center gap-1.5 px-4 py-2.5 bg-[#16161a] border border-gray-700 rounded-lg text-sm text-gray-300 hover:text-white hover:border-gray-600 hover:bg-[#1a1a1f] transition-colors">
                        <Plus className="w-4 h-4" />
                        Create function
                      </button>
                      <button className="flex items-center gap-1.5 px-4 py-2.5 bg-[#16161a] border border-gray-700 rounded-lg text-sm text-gray-300 hover:text-white hover:border-gray-600 hover:bg-[#1a1a1f] transition-colors">
                        <Play className="w-4 h-4" />
                        Create trigger
                      </button>
                      <button className="flex items-center gap-1.5 px-4 py-2.5 bg-[#16161a] border border-gray-700 rounded-lg text-sm text-gray-300 hover:text-white hover:border-gray-600 hover:bg-[#1a1a1f] transition-colors">
                        <Clock className="w-4 h-4" />
                        Create cron
                      </button>
                    </>
                  ) : (
                    <>
                      <button className="flex items-center gap-1.5 px-4 py-2.5 bg-[#16161a] border border-gray-700 rounded-lg text-sm text-gray-300 hover:text-white hover:border-gray-600 hover:bg-[#1a1a1f] transition-colors">
                        <Plus className="w-4 h-4" />
                        Create worker
                      </button>
                      <button className="flex items-center gap-1.5 px-4 py-2.5 bg-[#16161a] border border-gray-700 rounded-lg text-sm text-gray-300 hover:text-white hover:border-gray-600 hover:bg-[#1a1a1f] transition-colors">
                        <Plus className="w-4 h-4" />
                        Create job
                      </button>
                      <button className="flex items-center gap-1.5 px-4 py-2.5 bg-[#16161a] border border-gray-700 rounded-lg text-sm text-gray-300 hover:text-white hover:border-gray-600 hover:bg-[#1a1a1f] transition-colors">
                        <Plus className="w-4 h-4" />
                        Create cron
                      </button>
                    </>
                  )}
                </div>
              </div>

              {/* Code Editor Sidebar */}
              {selectedFunction && (
                <div className="absolute right-0 top-0 bottom-0 w-[480px] bg-[#0a0a0b] border-l border-gray-800 flex flex-col z-20">
                  {/* Editor Header */}
                  <div className="h-12 px-4 border-b border-gray-800 flex items-center justify-between shrink-0">
                    <div className="flex items-center gap-2">
                      <Code2 className="w-4 h-4 text-cyan-400" />
                      <span className="text-sm font-medium text-white">{selectedFunction}.ts</span>
                      <span className="text-xs text-gray-500 px-1.5 py-0.5 bg-gray-800 rounded">Node.js 20</span>
                    </div>
                    <div className="flex items-center gap-1">
                      <button className="p-1.5 text-gray-400 hover:text-white hover:bg-white/5 rounded transition-colors">
                        <Copy className="w-4 h-4" />
                      </button>
                      <button className="p-1.5 text-gray-400 hover:text-white hover:bg-white/5 rounded transition-colors">
                        <RotateCcw className="w-4 h-4" />
                      </button>
                      <button onClick={closeEditor} className="p-1.5 text-gray-400 hover:text-white hover:bg-white/5 rounded transition-colors">
                        <X className="w-4 h-4" />
                      </button>
                    </div>
                  </div>

                  {/* Code Editor */}
                  <div className="flex-1 overflow-auto">
                    <div className="flex min-h-full">
                      {/* Line Numbers */}
                      <div className="w-12 bg-[#0c0c0d] text-right pr-3 py-4 text-xs text-gray-600 font-mono select-none border-r border-gray-800/50">
                        {codeContent.split('\n').map((_, i) => (
                          <div key={i} className="leading-6">{i + 1}</div>
                        ))}
                      </div>
                      {/* Code Content */}
                      <div className="flex-1 p-4">
                        <pre className="text-sm font-mono text-gray-300 leading-6 whitespace-pre-wrap">
                          <code>{codeContent}</code>
                        </pre>
                      </div>
                    </div>
                  </div>

                  {/* Editor Footer */}
                  <div className="h-14 px-4 border-t border-gray-800 flex items-center justify-between shrink-0">
                    <div className="text-xs text-gray-500">
                      Last deployed: 2 hours ago
                    </div>
                    <div className="flex items-center gap-2">
                      <Button variant="outline" size="sm" className="bg-transparent border-gray-700 text-gray-300 hover:bg-white/5 rounded-lg h-8 text-xs">
                        <Terminal className="w-3.5 h-3.5 mr-1.5" />
                        Test
                      </Button>
                      <Button size="sm" className="bg-cyan-600 hover:bg-cyan-500 text-white rounded-lg h-8 text-xs">
                        Deploy
                      </Button>
                    </div>
                  </div>
                </div>
              )}
            </div>
          )}
        </main>
      </div>
    </div>
  )
}

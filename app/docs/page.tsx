import Link from "next/link"
import { Zap, Code2, Database, Terminal, ArrowRight, Book, Layers, Shield } from "lucide-react"

const features = [
  {
    icon: Zap,
    title: "Sub-millisecond Latency",
    description: "Edge-native architecture with anycast DNS routing ensures requests hit the nearest worker."
  },
  {
    icon: Layers,
    title: "Auto-scaling Workers",
    description: "Workers automatically scale based on demand with zero configuration required."
  },
  {
    icon: Shield,
    title: "Secure by Default",
    description: "End-to-end encryption with Ed25519 signatures for all worker communication."
  },
  {
    icon: Database,
    title: "Distributed State",
    description: "Built-in state replication across workers with eventual consistency guarantees."
  },
]

const quickLinks = [
  { href: "/docs/quickstart", label: "Quick Start", description: "Get running in 5 minutes", icon: Zap },
  { href: "/docs/api/functions", label: "Deploy Functions", description: "Deploy your first function", icon: Code2 },
  { href: "/docs/api/invoke", label: "Invoke Functions", description: "Call deployed functions", icon: Terminal },
  { href: "/docs/architecture", label: "Architecture", description: "How Shadw works", icon: Layers },
]

const endpoints = [
  { method: "GET", path: "/health", description: "Health check endpoint" },
  { method: "GET", path: "/functions", description: "List all functions" },
  { method: "POST", path: "/functions", description: "Deploy a function" },
  { method: "POST", path: "/2015-03-31/functions/{name}/invocations", description: "Invoke a function" },
  { method: "GET", path: "/graph", description: "Cluster topology graph" },
]

function MethodBadge({ method }: { method: string }) {
  const colors: Record<string, string> = {
    GET: "bg-emerald-500/15 text-emerald-400 border-emerald-500/30",
    POST: "bg-cyan-500/15 text-cyan-400 border-cyan-500/30",
    PUT: "bg-amber-500/15 text-amber-400 border-amber-500/30",
    DELETE: "bg-rose-500/15 text-rose-400 border-rose-500/30",
  }
  return (
    <span className={`px-2 py-0.5 text-[10px] font-mono font-semibold rounded border ${colors[method] || "bg-gray-500/15 text-gray-400"}`}>
      {method}
    </span>
  )
}

export default function DocsOverview() {
  return (
    <div className="animate-in fade-in duration-300">
      {/* Breadcrumb */}
      <div className="flex items-center gap-2 text-sm mb-6">
        <Book className="h-4 w-4 text-cyan-400" />
        <span className="text-gray-500">Documentation</span>
      </div>

      {/* Hero */}
      <h1 className="text-3xl sm:text-4xl lg:text-5xl font-bold mb-4 tracking-tight">
        <span className="bg-gradient-to-r from-white via-gray-100 to-gray-400 bg-clip-text text-transparent">
          Shadw Gateway API
        </span>
      </h1>
      <p className="text-gray-400 text-base sm:text-lg mb-8 leading-relaxed max-w-2xl">
        Deploy and invoke serverless functions across a globally distributed edge network. 
        AWS Lambda-compatible API with sub-millisecond cold starts.
      </p>

      {/* Base URL Card */}
      <div className="bg-gradient-to-br from-gray-900/80 to-gray-900/40 border border-gray-800/60 rounded-xl p-5 mb-10">
        <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-3">
          <div>
            <h3 className="text-[10px] font-semibold text-gray-500 uppercase tracking-widest mb-1.5">Base URL</h3>
            <code className="text-cyan-400 font-mono text-base sm:text-lg">http://localhost:8787</code>
          </div>
          <div className="text-xs text-gray-500">
            Configure via <code className="text-gray-400 bg-gray-800/60 px-1.5 py-0.5 rounded text-[11px]">SWARMLAMBDA_GATEWAY_PORT</code>
          </div>
        </div>
      </div>

      {/* Quick Links */}
      <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 mb-12">
        {quickLinks.map((link) => (
          <Link 
            key={link.href} 
            href={link.href}
            className="group flex items-start gap-3 p-4 rounded-xl border border-gray-800/50 bg-gradient-to-br from-gray-900/40 to-transparent hover:border-cyan-500/30 hover:from-cyan-500/5 transition-all"
          >
            <div className="p-2 rounded-lg bg-gradient-to-br from-cyan-500/10 to-purple-500/10 border border-cyan-500/20 group-hover:border-cyan-500/40 transition-colors">
              <link.icon className="h-4 w-4 text-cyan-400" />
            </div>
            <div className="flex-1 min-w-0">
              <div className="flex items-center gap-2">
                <span className="font-medium text-white group-hover:text-cyan-300 transition-colors">{link.label}</span>
                <ArrowRight className="h-3.5 w-3.5 text-gray-600 group-hover:text-cyan-400 group-hover:translate-x-0.5 transition-all" />
              </div>
              <p className="text-xs text-gray-500 mt-0.5">{link.description}</p>
            </div>
          </Link>
        ))}
      </div>

      {/* Features */}
      <h2 className="text-xl font-semibold mb-5 tracking-tight">Key Features</h2>
      <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 mb-12">
        {features.map((feature) => (
          <div key={feature.title} className="p-4 rounded-xl border border-gray-800/40 bg-gray-900/20">
            <div className="flex items-center gap-2.5 mb-2">
              <feature.icon className="h-4 w-4 text-purple-400" />
              <h3 className="font-medium text-sm">{feature.title}</h3>
            </div>
            <p className="text-xs text-gray-500 leading-relaxed">{feature.description}</p>
          </div>
        ))}
      </div>

      {/* Endpoints Overview */}
      <h2 className="text-xl font-semibold mb-5 tracking-tight">API Endpoints</h2>
      <div className="border border-gray-800/50 rounded-xl overflow-hidden bg-[#0c0c0e]">
        <table className="w-full text-sm">
          <thead className="bg-gray-900/60">
            <tr>
              <th className="text-left px-4 py-3 text-[10px] font-semibold text-gray-500 uppercase tracking-wider">Method</th>
              <th className="text-left px-4 py-3 text-[10px] font-semibold text-gray-500 uppercase tracking-wider">Endpoint</th>
              <th className="text-left px-4 py-3 text-[10px] font-semibold text-gray-500 uppercase tracking-wider hidden sm:table-cell">Description</th>
            </tr>
          </thead>
          <tbody>
            {endpoints.map((endpoint, idx) => (
              <tr key={idx} className="border-t border-gray-800/40 hover:bg-gray-900/30 transition-colors">
                <td className="px-4 py-3">
                  <MethodBadge method={endpoint.method} />
                </td>
                <td className="px-4 py-3 font-mono text-xs text-gray-300">{endpoint.path}</td>
                <td className="px-4 py-3 text-gray-500 text-xs hidden sm:table-cell">{endpoint.description}</td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>

      {/* Version */}
      <div className="mt-10 pt-6 border-t border-gray-800/40">
        <p className="text-xs text-gray-600">
          API Version <span className="text-gray-500">0.1.0</span> · OpenAPI 3.1.0 Compatible
        </p>
      </div>
    </div>
  )
}

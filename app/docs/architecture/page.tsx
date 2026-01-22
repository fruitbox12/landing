import { Layers, Globe, Server, Cpu, ArrowRight, Shield } from "lucide-react"
import { CodeBlock } from "@/components/code-block"

const components = [
  {
    name: "Gateway",
    icon: Server,
    color: "cyan",
    description: "The HTTP entry point that receives client requests and routes them to available workers.",
    features: [
      "REST API compatible with AWS Lambda invoke path",
      "Automatic worker discovery and health monitoring",
      "Load balancing across available workers",
      "Function registry and deployment coordination",
    ]
  },
  {
    name: "Workers",
    icon: Cpu,
    color: "purple",
    description: "Edge nodes that execute functions. Workers can run anywhere and connect to the gateway.",
    features: [
      "Stateless function execution",
      "Hot module reloading for fast updates",
      "Automatic heartbeat and presence reporting",
      "Isolated execution environments",
    ]
  },
  {
    name: "Anycast DNS",
    icon: Globe,
    color: "emerald",
    description: "Global DNS layer that routes requests to the nearest gateway automatically.",
    features: [
      "BGP-based shortest path routing",
      "Automatic failover on node failure",
      "Geographic load distribution",
      "Zero-configuration for clients",
    ]
  },
  {
    name: "Security Layer",
    icon: Shield,
    color: "amber",
    description: "Cryptographic authentication between all cluster components.",
    features: [
      "Ed25519 signatures for all RPC calls",
      "Cluster key authentication for workers",
      "TLS encryption for HTTP traffic",
      "Request signing and verification",
    ]
  },
]

export default function ArchitecturePage() {
  return (
    <div className="animate-in fade-in duration-300">
      <div className="flex items-center gap-2 text-sm mb-6">
        <Layers className="h-4 w-4 text-cyan-400" />
        <span className="text-gray-500">Core Concepts</span>
      </div>

      <h1 className="text-3xl sm:text-4xl font-bold mb-4 tracking-tight">
        <span className="bg-gradient-to-r from-white via-gray-100 to-gray-400 bg-clip-text text-transparent">
          Architecture
        </span>
      </h1>
      <p className="text-gray-400 text-base sm:text-lg mb-10 leading-relaxed">
        Shadw is a distributed serverless platform built on a mesh network of edge workers, 
        coordinated by gateways and connected via anycast DNS routing.
      </p>

      {/* Architecture Diagram - Text based */}
      <div className="mb-10 p-6 rounded-xl border border-gray-800/50 bg-[#0c0c0e] font-mono text-xs overflow-x-auto">
        <pre className="text-gray-400">
{`                    ┌─────────────────────────────────────────────────┐
                    │           ANYCAST DNS + BGP LAYER               │
                    │    (Routes to nearest available gateway)         │
                    └───────────────────┬─────────────────────────────┘
                                        │
           ┌────────────────────────────┼────────────────────────────┐
           │                            │                            │
           ▼                            ▼                            ▼
    ┌─────────────┐              ┌─────────────┐              ┌─────────────┐
    │   Gateway   │◄────────────►│   Gateway   │◄────────────►│   Gateway   │
    │   US-East   │              │   EU-West   │              │   Asia-Pac  │
    └──────┬──────┘              └──────┬──────┘              └──────┬──────┘
           │                            │                            │
    ┌──────┴──────┐              ┌──────┴──────┐              ┌──────┴──────┐
    │             │              │             │              │             │
    ▼             ▼              ▼             ▼              ▼             ▼
┌────────┐   ┌────────┐    ┌────────┐   ┌────────┐    ┌────────┐   ┌────────┐
│ Worker │   │ Worker │    │ Worker │   │ Worker │    │ Worker │   │ Worker │
│   1    │   │   2    │    │   3    │   │   4    │    │   5    │   │   6    │
└────────┘   └────────┘    └────────┘   └────────┘    └────────┘   └────────┘`}
        </pre>
      </div>

      {/* Components */}
      <h2 className="text-xl font-semibold mb-6">Core Components</h2>
      <div className="space-y-6 mb-10">
        {components.map((component) => {
          const colorMap: Record<string, string> = {
            cyan: "border-cyan-500/30 from-cyan-500/10",
            purple: "border-purple-500/30 from-purple-500/10",
            emerald: "border-emerald-500/30 from-emerald-500/10",
            amber: "border-amber-500/30 from-amber-500/10",
          }
          const iconColorMap: Record<string, string> = {
            cyan: "text-cyan-400",
            purple: "text-purple-400",
            emerald: "text-emerald-400",
            amber: "text-amber-400",
          }
          return (
            <div key={component.name} className={`p-5 rounded-xl border bg-gradient-to-br to-transparent ${colorMap[component.color]}`}>
              <div className="flex items-center gap-3 mb-3">
                <component.icon className={`h-5 w-5 ${iconColorMap[component.color]}`} />
                <h3 className="text-lg font-semibold">{component.name}</h3>
              </div>
              <p className="text-sm text-gray-400 mb-4">{component.description}</p>
              <ul className="grid grid-cols-1 sm:grid-cols-2 gap-2">
                {component.features.map((feature, idx) => (
                  <li key={idx} className="flex items-start gap-2 text-xs text-gray-500">
                    <ArrowRight className="h-3 w-3 mt-0.5 text-gray-600 flex-shrink-0" />
                    {feature}
                  </li>
                ))}
              </ul>
            </div>
          )
        })}
      </div>

      {/* Request Flow */}
      <h2 className="text-xl font-semibold mb-4">Request Flow</h2>
      <p className="text-gray-400 text-sm mb-4">
        When a client invokes a function, the request follows this path:
      </p>
      <ol className="space-y-3 mb-10">
        {[
          "Client sends HTTP request to the Shadw endpoint",
          "Anycast DNS routes to the geographically nearest gateway",
          "Gateway looks up the function in the registry",
          "Gateway selects an available worker using round-robin",
          "Request is forwarded to worker via RPC with Ed25519 signature",
          "Worker executes the function in an isolated context",
          "Response is returned through the gateway to the client",
        ].map((step, idx) => (
          <li key={idx} className="flex items-start gap-3">
            <span className="w-6 h-6 rounded-full bg-gray-800 border border-gray-700 flex items-center justify-center text-xs text-gray-400 flex-shrink-0">
              {idx + 1}
            </span>
            <span className="text-sm text-gray-400 pt-0.5">{step}</span>
          </li>
        ))}
      </ol>

      {/* Code Example */}
      <h2 className="text-xl font-semibold mb-4">Example: Function Execution</h2>
      <CodeBlock 
        code={`// Worker receives invocation via RPC
const result = await worker.invoke({
  functionName: "processOrder",
  payload: {
    orderId: "ord_123",
    items: [{ sku: "ITEM-001", qty: 2 }],
  },
  context: {
    requestId: "req_abc123",
    traceId: "trace_xyz789",
    invokedAt: Date.now(),
  },
});

// Function handler (user code)
exports.handler = async (event, context) => {
  const { orderId, items } = event;
  
  // Process the order...
  const total = items.reduce((sum, item) => 
    sum + calculatePrice(item), 0
  );
  
  return {
    orderId,
    status: "processed",
    total,
    processedAt: new Date().toISOString(),
  };
};`}
        language="javascript"
        filename="worker-execution.js"
      />
    </div>
  )
}

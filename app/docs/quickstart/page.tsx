import { Zap, Terminal, CheckCircle2 } from "lucide-react"
import { CodeBlock, InlineCode } from "@/components/code-block"

const steps = [
  {
    number: 1,
    title: "Start the Gateway",
    description: "Initialize and start the Shadw gateway server.",
    color: "cyan",
    code: `# Set up environment
export SWARMLAMBDA_CLUSTER_ID="my-cluster"
export SWARMLAMBDA_GATEWAY_PORT=8787

# Start the gateway
npm run gateway`,
    language: "bash"
  },
  {
    number: 2,
    title: "Start a Worker",
    description: "Launch an edge worker to handle function invocations.",
    color: "purple",
    code: `# Configure worker
export SWARMLAMBDA_CLUSTER_KEY="$(cat .swarm-lambda/local/cluster.key)"
export SWARMLAMBDA_WORKER_NAME=worker-local-1
export SWARMLAMBDA_STATE_DIR=.swarm-lambda/local/worker-local-1

# Start the worker
npm run worker`,
    language: "bash"
  },
  {
    number: 3,
    title: "Check Health",
    description: "Verify your gateway is running and connected.",
    color: "emerald",
    code: `curl http://localhost:8787/health

# Response:
# {"ok": true, "clusterId": "my-cluster"}`,
    language: "bash"
  },
  {
    number: 4,
    title: "Deploy a Function",
    description: "Deploy your first serverless function to the cluster.",
    color: "amber",
    code: `curl -X POST http://localhost:8787/functions \\
  -H "Content-Type: application/json" \\
  -d '{
    "name": "hello",
    "handler": "index.handler",
    "runtime": "nodejs",
    "files": {
      "index.js": "exports.handler = async (event) => { return { message: \"Hello, \" + (event.name || \"World\") + \"!\", timestamp: Date.now() }; }"
    }
  }'`,
    language: "bash"
  },
  {
    number: 5,
    title: "Invoke the Function",
    description: "Call your deployed function with a payload.",
    color: "pink",
    code: `curl -X POST http://localhost:8787/2015-03-31/functions/hello/invocations \\
  -H "Content-Type: application/json" \\
  -d '{"name": "Shadw"}'

# Response:
# {"message": "Hello, Shadw!", "timestamp": 1704067200000}`,
    language: "bash"
  },
]

const colorMap: Record<string, { bg: string; border: string; text: string }> = {
  cyan: { bg: "from-cyan-500/20 to-cyan-500/5", border: "border-cyan-500/30", text: "text-cyan-400" },
  purple: { bg: "from-purple-500/20 to-purple-500/5", border: "border-purple-500/30", text: "text-purple-400" },
  emerald: { bg: "from-emerald-500/20 to-emerald-500/5", border: "border-emerald-500/30", text: "text-emerald-400" },
  amber: { bg: "from-amber-500/20 to-amber-500/5", border: "border-amber-500/30", text: "text-amber-400" },
  pink: { bg: "from-pink-500/20 to-pink-500/5", border: "border-pink-500/30", text: "text-pink-400" },
}

export default function QuickstartPage() {
  return (
    <div className="animate-in fade-in duration-300">
      {/* Breadcrumb */}
      <div className="flex items-center gap-2 text-sm mb-6">
        <Zap className="h-4 w-4 text-cyan-400" />
        <span className="text-gray-500">Getting Started</span>
      </div>

      <h1 className="text-3xl sm:text-4xl font-bold mb-4 tracking-tight">
        <span className="bg-gradient-to-r from-white via-gray-100 to-gray-400 bg-clip-text text-transparent">
          Quick Start
        </span>
      </h1>
      <p className="text-gray-400 text-base sm:text-lg mb-10 leading-relaxed">
        Get Shadw up and running in under 5 minutes. This guide walks you through starting a gateway, 
        deploying a function, and invoking it.
      </p>

      {/* Prerequisites */}
      <div className="mb-10 p-5 rounded-xl border border-gray-800/50 bg-gradient-to-br from-gray-900/50 to-transparent">
        <h3 className="text-sm font-semibold mb-3 flex items-center gap-2">
          <CheckCircle2 className="h-4 w-4 text-emerald-400" />
          Prerequisites
        </h3>
        <ul className="space-y-2 text-sm text-gray-400">
          <li className="flex items-center gap-2">
            <span className="w-1.5 h-1.5 rounded-full bg-gray-600" />
            Node.js 18+ installed
          </li>
          <li className="flex items-center gap-2">
            <span className="w-1.5 h-1.5 rounded-full bg-gray-600" />
            Shadw CLI installed (<InlineCode>npm install -g @shadw/cli</InlineCode>)
          </li>
          <li className="flex items-center gap-2">
            <span className="w-1.5 h-1.5 rounded-full bg-gray-600" />
            A terminal with <InlineCode>curl</InlineCode> available
          </li>
        </ul>
      </div>

      {/* Steps */}
      <div className="space-y-10">
        {steps.map((step) => {
          const colors = colorMap[step.color]
          return (
            <div key={step.number}>
              <div className="flex items-start gap-4 mb-4">
                <div className={`w-8 h-8 rounded-full bg-gradient-to-br ${colors.bg} ${colors.border} border flex items-center justify-center text-sm font-semibold ${colors.text} flex-shrink-0`}>
                  {step.number}
                </div>
                <div>
                  <h2 className="text-lg font-semibold">{step.title}</h2>
                  <p className="text-sm text-gray-500 mt-0.5">{step.description}</p>
                </div>
              </div>
              <div className="ml-12">
                <CodeBlock code={step.code} language={step.language} showLineNumbers={false} />
              </div>
            </div>
          )
        })}
      </div>

      {/* Next Steps */}
      <div className="mt-12 pt-8 border-t border-gray-800/40">
        <h3 className="text-lg font-semibold mb-4">Next Steps</h3>
        <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
          <a href="/docs/architecture" className="p-4 rounded-xl border border-gray-800/50 hover:border-purple-500/30 bg-gray-900/20 hover:bg-purple-500/5 transition-all group">
            <h4 className="font-medium text-sm group-hover:text-purple-300 transition-colors">Learn the Architecture</h4>
            <p className="text-xs text-gray-500 mt-1">Understand how Shadw works under the hood</p>
          </a>
          <a href="/docs/api/functions" className="p-4 rounded-xl border border-gray-800/50 hover:border-cyan-500/30 bg-gray-900/20 hover:bg-cyan-500/5 transition-all group">
            <h4 className="font-medium text-sm group-hover:text-cyan-300 transition-colors">API Reference</h4>
            <p className="text-xs text-gray-500 mt-1">Explore all available endpoints</p>
          </a>
        </div>
      </div>
    </div>
  )
}

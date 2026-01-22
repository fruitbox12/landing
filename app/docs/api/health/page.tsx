import { Zap } from "lucide-react"
import { CodeBlock } from "@/components/code-block"

function MethodBadge({ method }: { method: string }) {
  const colors: Record<string, string> = {
    GET: "bg-emerald-500/15 text-emerald-400 border-emerald-500/30",
    POST: "bg-cyan-500/15 text-cyan-400 border-cyan-500/30",
  }
  return (
    <span className={`px-2.5 py-1 text-xs font-mono font-semibold rounded-md border ${colors[method]}`}>
      {method}
    </span>
  )
}

function ResponseBadge({ code }: { code: string }) {
  const color = code.startsWith("2") 
    ? "bg-emerald-500/15 text-emerald-400 border-emerald-500/30"
    : code.startsWith("4")
    ? "bg-amber-500/15 text-amber-400 border-amber-500/30"
    : "bg-rose-500/15 text-rose-400 border-rose-500/30"
  return (
    <span className={`px-2 py-0.5 text-xs font-mono font-semibold rounded border ${color}`}>
      {code}
    </span>
  )
}

export default function HealthApiPage() {
  return (
    <div className="animate-in fade-in duration-300">
      <div className="flex items-center gap-2 text-sm mb-6">
        <Zap className="h-4 w-4 text-cyan-400" />
        <span className="text-gray-500">API Reference</span>
        <span className="text-gray-600">/</span>
        <span className="text-gray-400">Health</span>
      </div>

      {/* Endpoint Header */}
      <div className="flex flex-wrap items-center gap-3 mb-4">
        <MethodBadge method="GET" />
        <code className="text-lg font-mono text-gray-300">/health</code>
      </div>

      <h1 className="text-2xl sm:text-3xl font-bold mb-4 tracking-tight">Health Check</h1>
      <p className="text-gray-400 text-base mb-8 leading-relaxed">
        Returns the health status and cluster identifier of the gateway. Use this endpoint 
        for load balancer health checks and monitoring.
      </p>

      {/* Request */}
      <h2 className="text-lg font-semibold mb-4">Request</h2>
      <CodeBlock 
        code={`curl http://localhost:8787/health`}
        language="bash"
        showLineNumbers={false}
      />

      {/* Response */}
      <h2 className="text-lg font-semibold mt-8 mb-4">Response</h2>
      
      <div className="space-y-4">
        <div className="p-5 rounded-xl border border-gray-800/50 bg-[#0c0c0e]">
          <div className="flex items-center gap-3 mb-4">
            <ResponseBadge code="200" />
            <span className="text-sm text-gray-400">OK - Gateway is healthy</span>
          </div>
          <CodeBlock 
            code={`{
  "ok": true,
  "clusterId": "my-cluster"
}`}
            language="json"
            showLineNumbers={false}
          />
        </div>
      </div>

      {/* Response Schema */}
      <h2 className="text-lg font-semibold mt-8 mb-4">Response Schema</h2>
      <div className="border border-gray-800/50 rounded-xl overflow-hidden bg-[#0c0c0e]">
        <table className="w-full text-sm">
          <thead className="bg-gray-900/60">
            <tr>
              <th className="text-left px-4 py-3 text-[10px] font-semibold text-gray-500 uppercase tracking-wider">Field</th>
              <th className="text-left px-4 py-3 text-[10px] font-semibold text-gray-500 uppercase tracking-wider">Type</th>
              <th className="text-left px-4 py-3 text-[10px] font-semibold text-gray-500 uppercase tracking-wider">Description</th>
            </tr>
          </thead>
          <tbody>
            <tr className="border-t border-gray-800/40">
              <td className="px-4 py-3 font-mono text-cyan-400 text-xs">ok</td>
              <td className="px-4 py-3 font-mono text-purple-400 text-xs">boolean</td>
              <td className="px-4 py-3 text-gray-500 text-xs">Always <code className="text-emerald-400">true</code> when healthy</td>
            </tr>
            <tr className="border-t border-gray-800/40">
              <td className="px-4 py-3 font-mono text-cyan-400 text-xs">clusterId</td>
              <td className="px-4 py-3 font-mono text-purple-400 text-xs">string</td>
              <td className="px-4 py-3 text-gray-500 text-xs">Cluster identifier from SWARMLAMBDA_CLUSTER_ID (or "local")</td>
            </tr>
          </tbody>
        </table>
      </div>

      {/* Usage Examples */}
      <h2 className="text-lg font-semibold mt-8 mb-4">Usage Examples</h2>
      
      <h3 className="text-sm font-medium text-gray-300 mb-3">Load Balancer Health Check</h3>
      <CodeBlock 
        code={`# Kubernetes liveness probe
livenessProbe:
  httpGet:
    path: /health
    port: 8787
  initialDelaySeconds: 5
  periodSeconds: 10`}
        language="bash"
        filename="deployment.yaml"
        showLineNumbers={false}
      />

      <h3 className="text-sm font-medium text-gray-300 mt-6 mb-3">Programmatic Health Check</h3>
      <CodeBlock 
        code={`async function checkGatewayHealth(gatewayUrl: string) {
  try {
    const response = await fetch(\`\${gatewayUrl}/health\`);
    const data = await response.json();
    
    if (data.ok) {
      console.log(\`Gateway healthy, cluster: \${data.clusterId}\`);
      return true;
    }
    return false;
  } catch (error) {
    console.error("Health check failed:", error);
    return false;
  }
}`}
        language="typescript"
        filename="health-check.ts"
      />
    </div>
  )
}

import { Database } from "lucide-react"
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
    : "bg-rose-500/15 text-rose-400 border-rose-500/30"
  return (
    <span className={`px-2 py-0.5 text-xs font-mono font-semibold rounded border ${color}`}>
      {code}
    </span>
  )
}

export default function GraphApiPage() {
  return (
    <div className="animate-in fade-in duration-300">
      <div className="flex items-center gap-2 text-sm mb-6">
        <Database className="h-4 w-4 text-cyan-400" />
        <span className="text-gray-500">API Reference</span>
        <span className="text-gray-600">/</span>
        <span className="text-gray-400">Graph</span>
      </div>

      {/* Endpoint Header */}
      <div className="flex flex-wrap items-center gap-3 mb-4">
        <MethodBadge method="GET" />
        <code className="text-lg font-mono text-gray-300">/graph</code>
      </div>

      <h1 className="text-2xl sm:text-3xl font-bold mb-4 tracking-tight">Cluster Graph</h1>
      <p className="text-gray-400 text-base mb-8 leading-relaxed">
        Returns a complete snapshot of the cluster topology, including the gateway, all connected 
        workers, their connections, and registered functions. Useful for monitoring and visualization.
      </p>

      {/* Request */}
      <h2 className="text-lg font-semibold mb-4">Request</h2>
      <CodeBlock 
        code="curl http://localhost:8787/graph"
        language="bash"
        showLineNumbers={false}
      />

      {/* Response */}
      <h2 className="text-lg font-semibold mt-8 mb-4">Response</h2>
      <div className="p-5 rounded-xl border border-gray-800/50 bg-[#0c0c0e]">
        <div className="flex items-center gap-3 mb-4">
          <ResponseBadge code="200" />
          <span className="text-sm text-gray-400">Cluster graph snapshot</span>
        </div>
        <CodeBlock 
          code={`{
  "clusterId": "production",
  "gateway": {
    "id": "gateway",
    "online": true
  },
  "workers": [
    {
      "rpcKeyHex": "a1b2c3d4e5f6...",
      "name": "worker-nyc-1",
      "seenAt": 1704067200000
    },
    {
      "rpcKeyHex": "f6e5d4c3b2a1...",
      "name": "worker-lax-1",
      "seenAt": 1704067195000
    }
  ],
  "edges": [
    {
      "id": "edge-1",
      "source": "gateway",
      "target": "a1b2c3d4e5f6..."
    },
    {
      "id": "edge-2",
      "source": "gateway",
      "target": "f6e5d4c3b2a1..."
    }
  ],
  "functions": [
    {
      "name": "hello",
      "handler": "index.handler",
      "runtime": "nodejs"
    }
  ],
  "ts": 1704067200000
}`}
          language="json"
          showLineNumbers={false}
        />
      </div>

      {/* Response Schema */}
      <h2 className="text-lg font-semibold mt-8 mb-4">Response Schema</h2>
      <div className="border border-gray-800/50 rounded-xl overflow-hidden bg-[#0c0c0e] mb-8">
        <table className="w-full text-sm">
          <thead className="bg-gray-900/60">
            <tr>
              <th className="text-left px-4 py-3 text-[10px] font-semibold text-gray-500 uppercase tracking-wider">Field</th>
              <th className="text-left px-4 py-3 text-[10px] font-semibold text-gray-500 uppercase tracking-wider">Type</th>
              <th className="text-left px-4 py-3 text-[10px] font-semibold text-gray-500 uppercase tracking-wider hidden sm:table-cell">Description</th>
            </tr>
          </thead>
          <tbody>
            {[
              { name: "clusterId", type: "string", desc: "Cluster identifier" },
              { name: "gateway", type: "object", desc: "Gateway status ({ id, online })" },
              { name: "workers", type: "WorkerPresence[]", desc: "Array of connected workers" },
              { name: "edges", type: "GraphEdge[]", desc: "Connection edges between nodes" },
              { name: "functions", type: "FunctionSummary[]", desc: "Registered functions" },
              { name: "ts", type: "integer", desc: "Snapshot timestamp (epoch ms)" },
            ].map((field, idx) => (
              <tr key={idx} className="border-t border-gray-800/40">
                <td className="px-4 py-3 font-mono text-cyan-400 text-xs">{field.name}</td>
                <td className="px-4 py-3 font-mono text-purple-400 text-xs">{field.type}</td>
                <td className="px-4 py-3 text-gray-500 text-xs hidden sm:table-cell">{field.desc}</td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>

      {/* Nested Schemas */}
      <h3 className="text-sm font-medium text-gray-300 mb-3">WorkerPresence Schema</h3>
      <div className="border border-gray-800/50 rounded-xl overflow-hidden bg-[#0c0c0e] mb-6">
        <table className="w-full text-sm">
          <thead className="bg-gray-900/60">
            <tr>
              <th className="text-left px-4 py-3 text-[10px] font-semibold text-gray-500 uppercase tracking-wider">Field</th>
              <th className="text-left px-4 py-3 text-[10px] font-semibold text-gray-500 uppercase tracking-wider">Type</th>
              <th className="text-left px-4 py-3 text-[10px] font-semibold text-gray-500 uppercase tracking-wider hidden sm:table-cell">Description</th>
            </tr>
          </thead>
          <tbody>
            {[
              { name: "rpcKeyHex", type: "string", desc: "Worker's RPC public key (hex encoded)" },
              { name: "name", type: "string", desc: "Human-readable worker name" },
              { name: "seenAt", type: "integer", desc: "Last heartbeat timestamp (epoch ms)" },
            ].map((field, idx) => (
              <tr key={idx} className="border-t border-gray-800/40">
                <td className="px-4 py-3 font-mono text-cyan-400 text-xs">{field.name}</td>
                <td className="px-4 py-3 font-mono text-purple-400 text-xs">{field.type}</td>
                <td className="px-4 py-3 text-gray-500 text-xs hidden sm:table-cell">{field.desc}</td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>

      <h3 className="text-sm font-medium text-gray-300 mb-3">GraphEdge Schema</h3>
      <div className="border border-gray-800/50 rounded-xl overflow-hidden bg-[#0c0c0e] mb-8">
        <table className="w-full text-sm">
          <thead className="bg-gray-900/60">
            <tr>
              <th className="text-left px-4 py-3 text-[10px] font-semibold text-gray-500 uppercase tracking-wider">Field</th>
              <th className="text-left px-4 py-3 text-[10px] font-semibold text-gray-500 uppercase tracking-wider">Type</th>
              <th className="text-left px-4 py-3 text-[10px] font-semibold text-gray-500 uppercase tracking-wider hidden sm:table-cell">Description</th>
            </tr>
          </thead>
          <tbody>
            {[
              { name: "id", type: "string", desc: "Unique edge identifier" },
              { name: "source", type: "string", desc: "Source node ID (gateway or worker key)" },
              { name: "target", type: "string", desc: "Target node ID (worker key)" },
            ].map((field, idx) => (
              <tr key={idx} className="border-t border-gray-800/40">
                <td className="px-4 py-3 font-mono text-cyan-400 text-xs">{field.name}</td>
                <td className="px-4 py-3 font-mono text-purple-400 text-xs">{field.type}</td>
                <td className="px-4 py-3 text-gray-500 text-xs hidden sm:table-cell">{field.desc}</td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>

      {/* Usage Example */}
      <h2 className="text-lg font-semibold mb-4">Usage Example</h2>
      <p className="text-gray-400 text-sm mb-4">
        Build a monitoring dashboard or visualize your cluster topology:
      </p>
      <CodeBlock 
        code={`async function monitorCluster(gatewayUrl: string) {
  const response = await fetch(\`\${gatewayUrl}/graph\`);
  const graph = await response.json();
  
  // Check worker health
  const now = Date.now();
  const staleThreshold = 15000; // 15 seconds
  
  const healthyWorkers = graph.workers.filter(
    (w) => now - w.seenAt < staleThreshold
  );
  
  const staleWorkers = graph.workers.filter(
    (w) => now - w.seenAt >= staleThreshold
  );
  
  console.log(\`Cluster: \${graph.clusterId}\`);
  console.log(\`Healthy workers: \${healthyWorkers.length}\`);
  console.log(\`Stale workers: \${staleWorkers.length}\`);
  console.log(\`Functions: \${graph.functions.length}\`);
  
  // Alert on stale workers
  for (const worker of staleWorkers) {
    console.warn(\`Worker \${worker.name} is stale!\`);
  }
  
  return {
    healthy: staleWorkers.length === 0,
    graph,
  };
}`}
        language="typescript"
        filename="monitor.ts"
      />
    </div>
  )
}

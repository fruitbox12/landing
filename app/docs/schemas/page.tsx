import { Database } from "lucide-react"
import { CodeBlock } from "@/components/code-block"

const schemas = [
  {
    name: "HealthResponse",
    description: "Response from the health check endpoint",
    properties: [
      { name: "ok", type: "boolean", required: true, description: "Always true when healthy" },
      { name: "clusterId", type: "string", required: true, description: "SWARMLAMBDA_CLUSTER_ID or 'local'" },
    ],
    example: `{
  "ok": true,
  "clusterId": "production"
}`
  },
  {
    name: "FunctionSummary",
    description: "Summary of a registered function",
    properties: [
      { name: "name", type: "string", required: true, description: "Function identifier" },
      { name: "handler", type: "string", required: true, description: "Entry handler path" },
      { name: "runtime", type: "string", required: false, description: "Runtime identifier" },
      { name: "deployedAt", type: "string", required: false, description: "ISO timestamp of deployment" },
    ],
    example: `{
  "name": "processOrder",
  "handler": "index.handler",
  "runtime": "nodejs",
  "deployedAt": "2024-01-15T10:30:00Z"
}`
  },
  {
    name: "FunctionsListResponse",
    description: "Response from listing all functions",
    properties: [
      { name: "functions", type: "FunctionSummary[]", required: true, description: "Array of function summaries" },
    ],
    example: `{
  "functions": [
    { "name": "hello", "handler": "index.handler", "runtime": "nodejs" },
    { "name": "processOrder", "handler": "order.process", "runtime": "nodejs" }
  ]
}`
  },
  {
    name: "FunctionUpsertRequest",
    description: "Request body for deploying or updating a function",
    properties: [
      { name: "name", type: "string", required: true, description: "Function identifier (min 1 char)" },
      { name: "handler", type: "string", required: true, description: "Entry handler (e.g., 'index.handler')" },
      { name: "runtime", type: "string", required: false, description: "Runtime identifier (default: nodejs)" },
      { name: "files", type: "Record<string, string>", required: true, description: "Map of file path to contents" },
    ],
    example: `{
  "name": "hello",
  "handler": "index.handler",
  "runtime": "nodejs",
  "files": {
    "index.js": "exports.handler = async (e) => ({ ok: true })"
  }
}`
  },
  {
    name: "FunctionUpsertResponse",
    description: "Response from deploying a function",
    properties: [
      { name: "ok", type: "boolean", required: true, description: "Always true on success" },
      { name: "name", type: "string", required: false, description: "Deployed function name" },
      { name: "deployedAt", type: "string", required: false, description: "Deployment timestamp" },
    ],
    example: `{
  "ok": true,
  "name": "hello",
  "deployedAt": "2024-01-15T10:30:00Z"
}`
  },
  {
    name: "WorkerPresence",
    description: "Worker node presence information",
    properties: [
      { name: "rpcKeyHex", type: "string", required: true, description: "Worker RPC public key (hex)" },
      { name: "name", type: "string", required: true, description: "Human-readable worker name" },
      { name: "seenAt", type: "integer", required: true, description: "Last heartbeat (epoch ms)" },
    ],
    example: `{
  "rpcKeyHex": "a1b2c3d4e5f67890...",
  "name": "worker-nyc-1",
  "seenAt": 1704067200000
}`
  },
  {
    name: "GraphEdge",
    description: "Connection edge between cluster nodes",
    properties: [
      { name: "id", type: "string", required: true, description: "Unique edge identifier" },
      { name: "source", type: "string", required: true, description: "Source node ID" },
      { name: "target", type: "string", required: true, description: "Target node ID" },
    ],
    example: `{
  "id": "edge-gateway-worker1",
  "source": "gateway",
  "target": "a1b2c3d4e5f67890..."
}`
  },
  {
    name: "GraphResponse",
    description: "Complete cluster topology snapshot",
    properties: [
      { name: "clusterId", type: "string", required: true, description: "Cluster identifier" },
      { name: "gateway", type: "object", required: true, description: "Gateway status { id, online }" },
      { name: "workers", type: "WorkerPresence[]", required: true, description: "Connected workers" },
      { name: "edges", type: "GraphEdge[]", required: true, description: "Node connections" },
      { name: "functions", type: "FunctionSummary[]", required: true, description: "Registered functions" },
      { name: "ts", type: "integer", required: true, description: "Snapshot timestamp" },
    ],
    example: `{
  "clusterId": "production",
  "gateway": { "id": "gateway", "online": true },
  "workers": [...],
  "edges": [...],
  "functions": [...],
  "ts": 1704067200000
}`
  },
  {
    name: "ErrorResponse",
    description: "Standard error response",
    properties: [
      { name: "error", type: "string", required: true, description: "Error message" },
    ],
    example: `{
  "error": "No workers available"
}`
  },
  {
    name: "ErrorResponseWithDetail",
    description: "Error response with additional detail",
    properties: [
      { name: "error", type: "string", required: true, description: "Error message" },
      { name: "detail", type: "string", required: true, description: "Detailed error information" },
    ],
    example: `{
  "error": "Invoke failed",
  "detail": "TypeError: Cannot read property 'name' of undefined"
}`
  },
]

export default function SchemasPage() {
  return (
    <div className="animate-in fade-in duration-300">
      <div className="flex items-center gap-2 text-sm mb-6">
        <Database className="h-4 w-4 text-cyan-400" />
        <span className="text-gray-500">Reference</span>
      </div>

      <h1 className="text-3xl sm:text-4xl font-bold mb-4 tracking-tight">
        <span className="bg-gradient-to-r from-white via-gray-100 to-gray-400 bg-clip-text text-transparent">
          API Schemas
        </span>
      </h1>
      <p className="text-gray-400 text-base sm:text-lg mb-10 leading-relaxed">
        Complete reference for all request and response schemas used in the Shadw Gateway API. 
        All schemas follow OpenAPI 3.1.0 specifications.
      </p>

      {/* Table of Contents */}
      <div className="mb-10 p-5 rounded-xl border border-gray-800/50 bg-gray-900/20">
        <h2 className="text-sm font-semibold mb-3 text-gray-300">On this page</h2>
        <div className="grid grid-cols-2 sm:grid-cols-3 gap-2">
          {schemas.map((schema) => (
            <a 
              key={schema.name}
              href={`#${schema.name.toLowerCase()}`}
              className="text-xs text-cyan-400 hover:text-cyan-300 transition-colors font-mono"
            >
              {schema.name}
            </a>
          ))}
        </div>
      </div>

      {/* Schemas */}
      <div className="space-y-12">
        {schemas.map((schema) => (
          <div key={schema.name} id={schema.name.toLowerCase()} className="scroll-mt-20">
            <h2 className="text-xl font-semibold mb-2 font-mono text-cyan-400">{schema.name}</h2>
            <p className="text-gray-400 text-sm mb-4">{schema.description}</p>

            {/* Properties Table */}
            <div className="border border-gray-800/50 rounded-xl overflow-hidden bg-[#0c0c0e] mb-4">
              <table className="w-full text-sm">
                <thead className="bg-gray-900/60">
                  <tr>
                    <th className="text-left px-4 py-3 text-[10px] font-semibold text-gray-500 uppercase tracking-wider">Property</th>
                    <th className="text-left px-4 py-3 text-[10px] font-semibold text-gray-500 uppercase tracking-wider">Type</th>
                    <th className="text-left px-4 py-3 text-[10px] font-semibold text-gray-500 uppercase tracking-wider">Req</th>
                    <th className="text-left px-4 py-3 text-[10px] font-semibold text-gray-500 uppercase tracking-wider hidden md:table-cell">Description</th>
                  </tr>
                </thead>
                <tbody>
                  {schema.properties.map((prop, idx) => (
                    <tr key={idx} className="border-t border-gray-800/40">
                      <td className="px-4 py-3 font-mono text-white text-xs">{prop.name}</td>
                      <td className="px-4 py-3 font-mono text-purple-400 text-xs">{prop.type}</td>
                      <td className="px-4 py-3 text-xs">
                        {prop.required ? (
                          <span className="text-emerald-400">Yes</span>
                        ) : (
                          <span className="text-gray-600">No</span>
                        )}
                      </td>
                      <td className="px-4 py-3 text-gray-500 text-xs hidden md:table-cell">{prop.description}</td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>

            {/* Example */}
            <div>
              <h3 className="text-xs font-medium text-gray-500 uppercase tracking-wider mb-2">Example</h3>
              <CodeBlock code={schema.example} language="json" showLineNumbers={false} />
            </div>
          </div>
        ))}
      </div>

      {/* TypeScript Types */}
      <div className="mt-12 pt-8 border-t border-gray-800/40">
        <h2 className="text-xl font-semibold mb-4">TypeScript Definitions</h2>
        <p className="text-gray-400 text-sm mb-4">
          Install the SDK package to get full TypeScript support for all schemas:
        </p>
        <CodeBlock 
          code={`npm install @shadw/sdk

// Usage
import type { 
  HealthResponse,
  FunctionSummary,
  GraphResponse,
  WorkerPresence 
} from "@shadw/sdk";`}
          language="typescript"
          showLineNumbers={false}
        />
      </div>
    </div>
  )
}

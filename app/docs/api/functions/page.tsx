import { Code2 } from "lucide-react"
import { CodeBlock, InlineCode } from "@/components/code-block"

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

export default function FunctionsApiPage() {
  return (
    <div className="animate-in fade-in duration-300">
      <div className="flex items-center gap-2 text-sm mb-6">
        <Code2 className="h-4 w-4 text-cyan-400" />
        <span className="text-gray-500">API Reference</span>
        <span className="text-gray-600">/</span>
        <span className="text-gray-400">Functions</span>
      </div>

      <h1 className="text-2xl sm:text-3xl font-bold mb-4 tracking-tight">Functions API</h1>
      <p className="text-gray-400 text-base mb-10 leading-relaxed">
        Deploy, list, and manage serverless functions in your cluster. Functions are distributed 
        to all connected workers automatically.
      </p>

      {/* List Functions */}
      <div className="mb-12 pb-10 border-b border-gray-800/40">
        <div className="flex flex-wrap items-center gap-3 mb-4">
          <MethodBadge method="GET" />
          <code className="text-lg font-mono text-gray-300">/functions</code>
        </div>
        <h2 className="text-xl font-semibold mb-3">List Functions</h2>
        <p className="text-gray-400 text-sm mb-6">
          Returns a list of all registered functions in the cluster.
        </p>

        <h3 className="text-sm font-medium text-gray-300 mb-3">Request</h3>
        <CodeBlock 
          code="curl http://localhost:8787/functions"
          language="bash"
          showLineNumbers={false}
        />

        <h3 className="text-sm font-medium text-gray-300 mt-6 mb-3">Response</h3>
        <div className="p-5 rounded-xl border border-gray-800/50 bg-[#0c0c0e]">
          <div className="flex items-center gap-3 mb-4">
            <ResponseBadge code="200" />
            <span className="text-sm text-gray-400">Function list</span>
          </div>
          <CodeBlock 
            code={`{
  "functions": [
    {
      "name": "hello",
      "handler": "index.handler",
      "runtime": "nodejs",
      "deployedAt": "2024-01-15T10:30:00Z"
    },
    {
      "name": "processOrder",
      "handler": "order.process",
      "runtime": "nodejs",
      "deployedAt": "2024-01-15T11:45:00Z"
    }
  ]
}`}
            language="json"
            showLineNumbers={false}
          />
        </div>
      </div>

      {/* Deploy Function */}
      <div className="mb-10">
        <div className="flex flex-wrap items-center gap-3 mb-4">
          <MethodBadge method="POST" />
          <code className="text-lg font-mono text-gray-300">/functions</code>
        </div>
        <h2 className="text-xl font-semibold mb-3">Deploy Function</h2>
        <p className="text-gray-400 text-sm mb-6">
          Deploy a new function or update an existing function definition. The function is 
          automatically distributed to all connected workers.
        </p>

        {/* Request Body Schema */}
        <h3 className="text-sm font-medium text-gray-300 mb-3">Request Body</h3>
        <div className="border border-gray-800/50 rounded-xl overflow-hidden bg-[#0c0c0e] mb-6">
          <table className="w-full text-sm">
            <thead className="bg-gray-900/60">
              <tr>
                <th className="text-left px-4 py-3 text-[10px] font-semibold text-gray-500 uppercase tracking-wider">Field</th>
                <th className="text-left px-4 py-3 text-[10px] font-semibold text-gray-500 uppercase tracking-wider">Type</th>
                <th className="text-left px-4 py-3 text-[10px] font-semibold text-gray-500 uppercase tracking-wider">Required</th>
                <th className="text-left px-4 py-3 text-[10px] font-semibold text-gray-500 uppercase tracking-wider hidden sm:table-cell">Description</th>
              </tr>
            </thead>
            <tbody>
              {[
                { name: "name", type: "string", required: true, desc: "Unique function identifier" },
                { name: "handler", type: "string", required: true, desc: "Entry point (e.g., 'index.handler')" },
                { name: "runtime", type: "string", required: false, desc: "Runtime identifier (default: 'nodejs')" },
                { name: "files", type: "object", required: true, desc: "Map of filename to file contents" },
              ].map((field, idx) => (
                <tr key={idx} className="border-t border-gray-800/40">
                  <td className="px-4 py-3 font-mono text-cyan-400 text-xs">{field.name}</td>
                  <td className="px-4 py-3 font-mono text-purple-400 text-xs">{field.type}</td>
                  <td className="px-4 py-3 text-xs">
                    {field.required ? <span className="text-emerald-400">Yes</span> : <span className="text-gray-500">No</span>}
                  </td>
                  <td className="px-4 py-3 text-gray-500 text-xs hidden sm:table-cell">{field.desc}</td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>

        <h3 className="text-sm font-medium text-gray-300 mb-3">Example Request</h3>
        <CodeBlock 
          code={`curl -X POST http://localhost:8787/functions \\
  -H "Content-Type: application/json" \\
  -d '{
    "name": "hello",
    "handler": "index.handler",
    "runtime": "nodejs",
    "files": {
      "index.js": "exports.handler = async (event) => { return { message: \"Hello, \" + (event.name || \"World\") + \"!\", timestamp: Date.now() }; }"
    }
  }'`}
          language="bash"
          showLineNumbers={false}
        />

        {/* Responses */}
        <h3 className="text-sm font-medium text-gray-300 mt-6 mb-3">Responses</h3>
        <div className="space-y-4">
          <div className="p-5 rounded-xl border border-gray-800/50 bg-[#0c0c0e]">
            <div className="flex items-center gap-3 mb-4">
              <ResponseBadge code="200" />
              <span className="text-sm text-gray-400">Deployed successfully</span>
            </div>
            <CodeBlock 
              code={`{
  "ok": true,
  "name": "hello",
  "deployedAt": "2024-01-15T10:30:00Z"
}`}
              language="json"
              showLineNumbers={false}
            />
          </div>

          <div className="p-5 rounded-xl border border-gray-800/50 bg-[#0c0c0e]">
            <div className="flex items-center gap-3 mb-4">
              <ResponseBadge code="400" />
              <span className="text-sm text-gray-400">Bad request - missing fields</span>
            </div>
            <CodeBlock 
              code={`{
  "error": "Expected { name, handler, runtime?, files }"
}`}
              language="json"
              showLineNumbers={false}
            />
          </div>

          <div className="p-5 rounded-xl border border-gray-800/50 bg-[#0c0c0e]">
            <div className="flex items-center gap-3 mb-4">
              <ResponseBadge code="500" />
              <span className="text-sm text-gray-400">Deploy failed</span>
            </div>
            <CodeBlock 
              code={`{
  "error": "Deploy failed",
  "detail": "Connection timeout to worker pool"
}`}
              language="json"
              showLineNumbers={false}
            />
          </div>
        </div>
      </div>

      {/* Multi-file Function Example */}
      <div className="p-5 rounded-xl border border-cyan-500/20 bg-cyan-500/5">
        <h3 className="text-sm font-semibold mb-3 text-cyan-400">Multi-file Function Example</h3>
        <p className="text-sm text-gray-400 mb-4">
          Functions can include multiple files. Use the <InlineCode>files</InlineCode> object 
          to specify all required source files:
        </p>
        <CodeBlock 
          code={`{
  "name": "processOrder",
  "handler": "src/index.handler",
  "runtime": "nodejs",
  "files": {
    "src/index.js": "const utils = require('./utils'); exports.handler = async (e) => utils.process(e);",
    "src/utils.js": "exports.process = (event) => ({ processed: true, orderId: event.id });",
    "package.json": "{ \\"name\\": \\"processOrder\\", \\"version\\": \\"1.0.0\\" }"
  }
}`}
          language="json"
          showLineNumbers={false}
        />
      </div>
    </div>
  )
}

import { Terminal, AlertCircle } from "lucide-react"
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

export default function InvokeApiPage() {
  return (
    <div className="animate-in fade-in duration-300">
      <div className="flex items-center gap-2 text-sm mb-6">
        <Terminal className="h-4 w-4 text-cyan-400" />
        <span className="text-gray-500">API Reference</span>
        <span className="text-gray-600">/</span>
        <span className="text-gray-400">Invoke</span>
      </div>

      {/* Endpoint Header */}
      <div className="flex flex-wrap items-center gap-3 mb-4">
        <MethodBadge method="POST" />
        <code className="text-base sm:text-lg font-mono text-gray-300">/2015-03-31/functions/{'{functionName}'}/invocations</code>
      </div>

      <h1 className="text-2xl sm:text-3xl font-bold mb-4 tracking-tight">Invoke Function</h1>
      <p className="text-gray-400 text-base mb-8 leading-relaxed">
        Invoke a deployed function. This endpoint is compatible with the AWS Lambda invoke API, 
        allowing drop-in replacement for existing Lambda integrations.
      </p>

      {/* AWS Compatibility Note */}
      <div className="p-4 rounded-xl border border-amber-500/20 bg-amber-500/5 mb-8">
        <div className="flex items-start gap-3">
          <AlertCircle className="h-4 w-4 text-amber-400 mt-0.5 flex-shrink-0" />
          <div>
            <h3 className="text-sm font-medium text-amber-400">AWS Lambda Compatible</h3>
            <p className="text-xs text-gray-400 mt-1">
              This path follows the AWS Lambda invoke API format for easy migration. Simply 
              change your endpoint URL to use Shadw.
            </p>
          </div>
        </div>
      </div>

      {/* Path Parameters */}
      <h2 className="text-lg font-semibold mb-4">Path Parameters</h2>
      <div className="border border-gray-800/50 rounded-xl overflow-hidden bg-[#0c0c0e] mb-8">
        <table className="w-full text-sm">
          <thead className="bg-gray-900/60">
            <tr>
              <th className="text-left px-4 py-3 text-[10px] font-semibold text-gray-500 uppercase tracking-wider">Parameter</th>
              <th className="text-left px-4 py-3 text-[10px] font-semibold text-gray-500 uppercase tracking-wider">Type</th>
              <th className="text-left px-4 py-3 text-[10px] font-semibold text-gray-500 uppercase tracking-wider">Description</th>
            </tr>
          </thead>
          <tbody>
            <tr className="border-t border-gray-800/40">
              <td className="px-4 py-3 font-mono text-cyan-400 text-xs">functionName</td>
              <td className="px-4 py-3 font-mono text-purple-400 text-xs">string</td>
              <td className="px-4 py-3 text-gray-500 text-xs">Name of the function to invoke (required)</td>
            </tr>
          </tbody>
        </table>
      </div>

      {/* Request Body */}
      <h2 className="text-lg font-semibold mb-4">Request Body</h2>
      <p className="text-gray-400 text-sm mb-4">
        The request body is passed directly to the function handler as the <InlineCode>event</InlineCode> parameter. 
        Any valid JSON is accepted.
      </p>

      <h3 className="text-sm font-medium text-gray-300 mb-3">Example Request</h3>
      <CodeBlock 
        code={`curl -X POST http://localhost:8787/2015-03-31/functions/hello/invocations \\
  -H "Content-Type: application/json" \\
  -d '{
    "name": "Shadw",
    "action": "greet"
  }'`}
        language="bash"
        showLineNumbers={false}
      />

      {/* Response Headers */}
      <h2 className="text-lg font-semibold mt-8 mb-4">Response Headers</h2>
      <div className="border border-gray-800/50 rounded-xl overflow-hidden bg-[#0c0c0e] mb-8">
        <table className="w-full text-sm">
          <thead className="bg-gray-900/60">
            <tr>
              <th className="text-left px-4 py-3 text-[10px] font-semibold text-gray-500 uppercase tracking-wider">Header</th>
              <th className="text-left px-4 py-3 text-[10px] font-semibold text-gray-500 uppercase tracking-wider">Description</th>
            </tr>
          </thead>
          <tbody>
            <tr className="border-t border-gray-800/40">
              <td className="px-4 py-3 font-mono text-cyan-400 text-xs">x-swarmlambda-worker</td>
              <td className="px-4 py-3 text-gray-500 text-xs">Worker RPC public key (hex) that handled the invocation</td>
            </tr>
            <tr className="border-t border-gray-800/40">
              <td className="px-4 py-3 font-mono text-cyan-400 text-xs">x-swarmlambda-duration</td>
              <td className="px-4 py-3 text-gray-500 text-xs">Execution duration in milliseconds</td>
            </tr>
          </tbody>
        </table>
      </div>

      {/* Responses */}
      <h2 className="text-lg font-semibold mb-4">Responses</h2>
      <div className="space-y-4">
        <div className="p-5 rounded-xl border border-gray-800/50 bg-[#0c0c0e]">
          <div className="flex items-center gap-3 mb-4">
            <ResponseBadge code="200" />
            <span className="text-sm text-gray-400">Function executed successfully</span>
          </div>
          <p className="text-xs text-gray-500 mb-3">Response body is the return value from the function handler.</p>
          <CodeBlock 
            code={`{
  "message": "Hello, Shadw!",
  "timestamp": 1704067200000
}`}
            language="json"
            showLineNumbers={false}
          />
        </div>

        <div className="p-5 rounded-xl border border-gray-800/50 bg-[#0c0c0e]">
          <div className="flex items-center gap-3 mb-4">
            <ResponseBadge code="404" />
            <span className="text-sm text-gray-400">Function not found</span>
          </div>
          <CodeBlock 
            code={`{
  "error": "Function not found",
  "functionName": "unknown-function"
}`}
            language="json"
            showLineNumbers={false}
          />
        </div>

        <div className="p-5 rounded-xl border border-gray-800/50 bg-[#0c0c0e]">
          <div className="flex items-center gap-3 mb-4">
            <ResponseBadge code="503" />
            <span className="text-sm text-gray-400">No workers available</span>
          </div>
          <CodeBlock 
            code={`{
  "error": "No workers available"
}`}
            language="json"
            showLineNumbers={false}
          />
        </div>

        <div className="p-5 rounded-xl border border-gray-800/50 bg-[#0c0c0e]">
          <div className="flex items-center gap-3 mb-4">
            <ResponseBadge code="500" />
            <span className="text-sm text-gray-400">Invoke failed (function error)</span>
          </div>
          <CodeBlock 
            code={`{
  "error": "Invoke failed",
  "detail": "ReferenceError: undefinedVar is not defined"
}`}
            language="json"
            showLineNumbers={false}
          />
        </div>
      </div>

      {/* SDK Examples */}
      <h2 className="text-lg font-semibold mt-10 mb-4">SDK Examples</h2>

      <h3 className="text-sm font-medium text-gray-300 mb-3">JavaScript / TypeScript</h3>
      <CodeBlock 
        code={`import { ShadwClient } from "@shadw/sdk";

const client = new ShadwClient({
  endpoint: "http://localhost:8787",
});

// Invoke a function
const result = await client.invoke("hello", {
  name: "World",
});

console.log(result);
// { message: "Hello, World!", timestamp: 1704067200000 }`}
        language="typescript"
        filename="invoke-example.ts"
      />

      <h3 className="text-sm font-medium text-gray-300 mt-6 mb-3">Using AWS SDK (Drop-in Replacement)</h3>
      <CodeBlock 
        code={`import { LambdaClient, InvokeCommand } from "@aws-sdk/client-lambda";

const client = new LambdaClient({
  endpoint: "http://localhost:8787",
  region: "us-east-1",  // Required by SDK but ignored
  credentials: {         // Required by SDK but ignored
    accessKeyId: "dummy",
    secretAccessKey: "dummy",
  },
});

const command = new InvokeCommand({
  FunctionName: "hello",
  Payload: JSON.stringify({ name: "Shadw" }),
});

const response = await client.send(command);
const result = JSON.parse(
  new TextDecoder().decode(response.Payload)
);`}
        language="typescript"
        filename="aws-sdk-example.ts"
      />
    </div>
  )
}

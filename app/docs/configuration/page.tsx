import { Settings, FileCode, Lock } from "lucide-react"
import { CodeBlock, InlineCode } from "@/components/code-block"

const envVars = [
  { name: "SWARMLAMBDA_CLUSTER_ID", description: "Unique identifier for your cluster", default: "local", required: false },
  { name: "SWARMLAMBDA_CLUSTER_KEY", description: "Shared secret key for cluster authentication", default: "—", required: true },
  { name: "SWARMLAMBDA_GATEWAY_PORT", description: "HTTP port for the gateway server", default: "8787", required: false },
  { name: "SWARMLAMBDA_WORKER_NAME", description: "Human-readable name for this worker", default: "worker-{random}", required: false },
  { name: "SWARMLAMBDA_STATE_DIR", description: "Directory for persistent state storage", default: ".swarm-lambda/state", required: false },
  { name: "SWARMLAMBDA_LOG_LEVEL", description: "Logging verbosity (debug, info, warn, error)", default: "info", required: false },
  { name: "SWARMLAMBDA_HEARTBEAT_INTERVAL", description: "Worker heartbeat interval in milliseconds", default: "5000", required: false },
  { name: "SWARMLAMBDA_WORKER_TIMEOUT", description: "Worker timeout before marked offline (ms)", default: "15000", required: false },
]

export default function ConfigurationPage() {
  return (
    <div className="animate-in fade-in duration-300">
      <div className="flex items-center gap-2 text-sm mb-6">
        <Settings className="h-4 w-4 text-cyan-400" />
        <span className="text-gray-500">Getting Started</span>
      </div>

      <h1 className="text-3xl sm:text-4xl font-bold mb-4 tracking-tight">
        <span className="bg-gradient-to-r from-white via-gray-100 to-gray-400 bg-clip-text text-transparent">
          Configuration
        </span>
      </h1>
      <p className="text-gray-400 text-base sm:text-lg mb-10 leading-relaxed">
        Configure Shadw using environment variables or a configuration file. 
        All settings can be customized for your deployment environment.
      </p>

      {/* Environment Variables */}
      <h2 className="text-xl font-semibold mb-4">Environment Variables</h2>
      <p className="text-gray-400 text-sm mb-6">
        Shadw uses environment variables for configuration. These can be set in your shell, 
        a <InlineCode>.env</InlineCode> file, or your deployment platform.
      </p>

      <div className="border border-gray-800/50 rounded-xl overflow-hidden bg-[#0c0c0e] mb-10">
        <table className="w-full text-sm">
          <thead className="bg-gray-900/60">
            <tr>
              <th className="text-left px-4 py-3 text-[10px] font-semibold text-gray-500 uppercase tracking-wider">Variable</th>
              <th className="text-left px-4 py-3 text-[10px] font-semibold text-gray-500 uppercase tracking-wider hidden md:table-cell">Description</th>
              <th className="text-left px-4 py-3 text-[10px] font-semibold text-gray-500 uppercase tracking-wider">Default</th>
            </tr>
          </thead>
          <tbody>
            {envVars.map((v, idx) => (
              <tr key={idx} className="border-t border-gray-800/40">
                <td className="px-4 py-3">
                  <code className="text-cyan-400 text-xs font-mono">{v.name}</code>
                  {v.required && <span className="ml-2 text-[9px] text-rose-400 font-medium">REQUIRED</span>}
                </td>
                <td className="px-4 py-3 text-gray-500 text-xs hidden md:table-cell">{v.description}</td>
                <td className="px-4 py-3 text-gray-400 text-xs font-mono">{v.default}</td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>

      {/* Config File */}
      <h2 className="text-xl font-semibold mb-4 flex items-center gap-2">
        <FileCode className="h-5 w-5 text-purple-400" />
        Configuration File
      </h2>
      <p className="text-gray-400 text-sm mb-4">
        For more complex setups, use a <InlineCode>shadw.config.js</InlineCode> file in your project root:
      </p>
      <CodeBlock 
        code={`// shadw.config.js
module.exports = {
  cluster: {
    id: "production",
    keyPath: "./.secrets/cluster.key",
  },
  gateway: {
    port: 8787,
    host: "0.0.0.0",
    cors: {
      origin: ["https://myapp.com"],
      methods: ["GET", "POST"],
    },
  },
  worker: {
    name: process.env.WORKER_NAME || "worker-1",
    stateDir: "./state",
    heartbeatInterval: 5000,
    maxConcurrency: 100,
  },
  functions: {
    timeout: 30000,
    memoryLimit: "256MB",
    runtime: "nodejs",
  },
  logging: {
    level: "info",
    format: "json",
    destination: "stdout",
  },
}`}
        language="javascript"
        filename="shadw.config.js"
      />

      {/* Security */}
      <h2 className="text-xl font-semibold mt-10 mb-4 flex items-center gap-2">
        <Lock className="h-5 w-5 text-emerald-400" />
        Security Configuration
      </h2>
      <p className="text-gray-400 text-sm mb-4">
        The cluster key is used to authenticate workers. Keep this secret and never commit it to version control.
      </p>
      <CodeBlock 
        code={`# Generate a new cluster key
shadw keygen > .secrets/cluster.key

# Set restrictive permissions
chmod 600 .secrets/cluster.key

# Add to .gitignore
echo ".secrets/" >> .gitignore`}
        language="bash"
        showLineNumbers={false}
      />

      <div className="mt-6 p-5 rounded-xl border border-emerald-500/20 bg-emerald-500/5">
        <h3 className="text-sm font-semibold mb-2 text-emerald-400">Security Best Practices</h3>
        <ul className="space-y-1.5 text-sm text-gray-400">
          <li>• Never expose your cluster key in client-side code</li>
          <li>• Rotate keys periodically in production environments</li>
          <li>• Use environment variables for sensitive configuration</li>
          <li>• Enable TLS for production gateway deployments</li>
        </ul>
      </div>
    </div>
  )
}

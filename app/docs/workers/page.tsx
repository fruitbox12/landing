import { Globe, Cpu, RefreshCw, Zap, HardDrive } from "lucide-react"
import { CodeBlock, InlineCode } from "@/components/code-block"

export default function WorkersPage() {
  return (
    <div className="animate-in fade-in duration-300">
      <div className="flex items-center gap-2 text-sm mb-6">
        <Globe className="h-4 w-4 text-cyan-400" />
        <span className="text-gray-500">Core Concepts</span>
      </div>

      <h1 className="text-3xl sm:text-4xl font-bold mb-4 tracking-tight">
        <span className="bg-gradient-to-r from-white via-gray-100 to-gray-400 bg-clip-text text-transparent">
          Workers
        </span>
      </h1>
      <p className="text-gray-400 text-base sm:text-lg mb-10 leading-relaxed">
        Workers are the execution nodes in a Shadw cluster. They receive function invocations from 
        gateways and execute code in isolated environments.
      </p>

      {/* Worker Lifecycle */}
      <h2 className="text-xl font-semibold mb-4">Worker Lifecycle</h2>
      <div className="grid grid-cols-1 sm:grid-cols-3 gap-4 mb-10">
        {[
          { icon: RefreshCw, title: "Registration", description: "Worker connects to gateway and announces its presence with public key" },
          { icon: Zap, title: "Execution", description: "Receives and executes function invocations, returns results via RPC" },
          { icon: HardDrive, title: "Heartbeat", description: "Periodic ping to gateway to maintain presence in worker pool" },
        ].map((phase) => (
          <div key={phase.title} className="p-4 rounded-xl border border-gray-800/50 bg-gray-900/20">
            <phase.icon className="h-5 w-5 text-purple-400 mb-2" />
            <h3 className="font-medium text-sm mb-1">{phase.title}</h3>
            <p className="text-xs text-gray-500">{phase.description}</p>
          </div>
        ))}
      </div>

      {/* Starting a Worker */}
      <h2 className="text-xl font-semibold mb-4">Starting a Worker</h2>
      <p className="text-gray-400 text-sm mb-4">
        Configure and start a worker process to join your cluster:
      </p>
      <CodeBlock 
        code={`# Required environment
export SWARMLAMBDA_CLUSTER_KEY="your-cluster-key"
export SWARMLAMBDA_WORKER_NAME="worker-nyc-1"
export SWARMLAMBDA_STATE_DIR=".swarm-lambda/worker-nyc-1"

# Optional configuration
export SWARMLAMBDA_GATEWAY_URL="http://gateway:8787"
export SWARMLAMBDA_HEARTBEAT_INTERVAL=5000
export SWARMLAMBDA_MAX_CONCURRENCY=50

# Start the worker
npm run worker`}
        language="bash"
        showLineNumbers={false}
      />

      {/* Worker Configuration */}
      <h2 className="text-xl font-semibold mt-10 mb-4">Configuration Options</h2>
      <div className="border border-gray-800/50 rounded-xl overflow-hidden bg-[#0c0c0e] mb-10">
        <table className="w-full text-sm">
          <thead className="bg-gray-900/60">
            <tr>
              <th className="text-left px-4 py-3 text-[10px] font-semibold text-gray-500 uppercase tracking-wider">Option</th>
              <th className="text-left px-4 py-3 text-[10px] font-semibold text-gray-500 uppercase tracking-wider">Type</th>
              <th className="text-left px-4 py-3 text-[10px] font-semibold text-gray-500 uppercase tracking-wider hidden sm:table-cell">Description</th>
            </tr>
          </thead>
          <tbody>
            {[
              { name: "maxConcurrency", type: "number", desc: "Maximum concurrent function executions (default: 100)" },
              { name: "memoryLimit", type: "string", desc: "Memory limit per function execution (default: 256MB)" },
              { name: "timeout", type: "number", desc: "Function execution timeout in ms (default: 30000)" },
              { name: "isolationMode", type: "string", desc: "Execution isolation: 'process' | 'vm' (default: 'vm')" },
            ].map((opt, idx) => (
              <tr key={idx} className="border-t border-gray-800/40">
                <td className="px-4 py-3 font-mono text-cyan-400 text-xs">{opt.name}</td>
                <td className="px-4 py-3 font-mono text-purple-400 text-xs">{opt.type}</td>
                <td className="px-4 py-3 text-gray-500 text-xs hidden sm:table-cell">{opt.desc}</td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>

      {/* Custom Worker */}
      <h2 className="text-xl font-semibold mb-4">Custom Worker Implementation</h2>
      <p className="text-gray-400 text-sm mb-4">
        You can programmatically create and configure workers:
      </p>
      <CodeBlock 
        code={`import { createWorker } from "@shadw/worker";

const worker = createWorker({
  name: "custom-worker",
  clusterKey: process.env.SWARMLAMBDA_CLUSTER_KEY,
  gateway: "http://localhost:8787",
  
  // Execution options
  maxConcurrency: 50,
  memoryLimit: "512MB",
  timeout: 60000,
  
  // Lifecycle hooks
  onConnect: () => console.log("Connected to gateway"),
  onDisconnect: () => console.log("Disconnected from gateway"),
  onInvoke: (fn, payload) => {
    console.log(\`Invoking \${fn} with\`, payload);
  },
  onError: (error) => {
    console.error("Worker error:", error);
  },
});

// Start accepting invocations
await worker.start();

// Graceful shutdown
process.on("SIGTERM", async () => {
  await worker.shutdown();
  process.exit(0);
});`}
        language="typescript"
        filename="custom-worker.ts"
      />

      {/* Scaling */}
      <div className="mt-10 p-5 rounded-xl border border-cyan-500/20 bg-cyan-500/5">
        <h3 className="text-sm font-semibold mb-3 flex items-center gap-2 text-cyan-400">
          <Cpu className="h-4 w-4" />
          Scaling Workers
        </h3>
        <p className="text-sm text-gray-400 mb-3">
          Workers can be scaled horizontally by running multiple instances. Each worker automatically 
          registers with the gateway and receives a share of incoming invocations.
        </p>
        <CodeBlock 
          code={`# Run multiple workers with unique names
for i in {1..4}; do
  SWARMLAMBDA_WORKER_NAME="worker-$i" npm run worker &
done`}
          language="bash"
          showLineNumbers={false}
        />
      </div>
    </div>
  )
}

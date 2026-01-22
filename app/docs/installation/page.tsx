import { Terminal, Package, CheckCircle2, AlertCircle } from "lucide-react"
import { CodeBlock, InlineCode } from "@/components/code-block"

export default function InstallationPage() {
  return (
    <div className="animate-in fade-in duration-300">
      <div className="flex items-center gap-2 text-sm mb-6">
        <Terminal className="h-4 w-4 text-cyan-400" />
        <span className="text-gray-500">Getting Started</span>
      </div>

      <h1 className="text-3xl sm:text-4xl font-bold mb-4 tracking-tight">
        <span className="bg-gradient-to-r from-white via-gray-100 to-gray-400 bg-clip-text text-transparent">
          Installation
        </span>
      </h1>
      <p className="text-gray-400 text-base sm:text-lg mb-10 leading-relaxed">
        Install Shadw using your preferred package manager. The CLI provides commands for managing 
        gateways, workers, and function deployments.
      </p>

      {/* Package Managers */}
      <h2 className="text-xl font-semibold mb-4">Package Managers</h2>
      <div className="space-y-4 mb-10">
        <div>
          <h3 className="text-sm font-medium text-gray-300 mb-2 flex items-center gap-2">
            <Package className="h-4 w-4 text-red-400" />
            npm
          </h3>
          <CodeBlock code="npm install -g @shadw/cli" language="bash" showLineNumbers={false} />
        </div>
        <div>
          <h3 className="text-sm font-medium text-gray-300 mb-2 flex items-center gap-2">
            <Package className="h-4 w-4 text-cyan-400" />
            pnpm
          </h3>
          <CodeBlock code="pnpm add -g @shadw/cli" language="bash" showLineNumbers={false} />
        </div>
        <div>
          <h3 className="text-sm font-medium text-gray-300 mb-2 flex items-center gap-2">
            <Package className="h-4 w-4 text-blue-400" />
            yarn
          </h3>
          <CodeBlock code="yarn global add @shadw/cli" language="bash" showLineNumbers={false} />
        </div>
      </div>

      {/* Verify Installation */}
      <h2 className="text-xl font-semibold mb-4">Verify Installation</h2>
      <p className="text-gray-400 text-sm mb-4">
        After installation, verify the CLI is working correctly:
      </p>
      <CodeBlock 
        code={`shadw --version
# Output: @shadw/cli v0.1.0

shadw --help
# Shows available commands`} 
        language="bash" 
        showLineNumbers={false} 
      />

      {/* Initialize Project */}
      <h2 className="text-xl font-semibold mt-10 mb-4">Initialize a Project</h2>
      <p className="text-gray-400 text-sm mb-4">
        Create a new Shadw project with the init command:
      </p>
      <CodeBlock 
        code={`# Create a new project
shadw init my-project

# Or initialize in current directory
shadw init .

# Project structure created:
# .swarm-lambda/
#   └── local/
#       ├── cluster.key
#       └── gateway.key
# shadw.config.js
# functions/
#   └── hello/
#       └── index.js`} 
        language="bash" 
        showLineNumbers={false} 
      />

      {/* Requirements */}
      <div className="mt-10 p-5 rounded-xl border border-gray-800/50 bg-gradient-to-br from-gray-900/50 to-transparent">
        <h3 className="text-sm font-semibold mb-3 flex items-center gap-2">
          <CheckCircle2 className="h-4 w-4 text-emerald-400" />
          System Requirements
        </h3>
        <ul className="space-y-2 text-sm text-gray-400">
          <li className="flex items-start gap-2">
            <span className="w-1.5 h-1.5 rounded-full bg-emerald-500 mt-1.5 flex-shrink-0" />
            <span><strong className="text-gray-300">Node.js 18+</strong> — Required for the gateway and workers</span>
          </li>
          <li className="flex items-start gap-2">
            <span className="w-1.5 h-1.5 rounded-full bg-emerald-500 mt-1.5 flex-shrink-0" />
            <span><strong className="text-gray-300">npm, pnpm, or yarn</strong> — Package manager for installation</span>
          </li>
          <li className="flex items-start gap-2">
            <span className="w-1.5 h-1.5 rounded-full bg-emerald-500 mt-1.5 flex-shrink-0" />
            <span><strong className="text-gray-300">512MB+ RAM</strong> — Minimum for local development</span>
          </li>
        </ul>
      </div>

      {/* Troubleshooting */}
      <div className="mt-6 p-5 rounded-xl border border-amber-500/20 bg-amber-500/5">
        <h3 className="text-sm font-semibold mb-3 flex items-center gap-2 text-amber-400">
          <AlertCircle className="h-4 w-4" />
          Troubleshooting
        </h3>
        <div className="space-y-3 text-sm text-gray-400">
          <div>
            <p className="text-gray-300 font-medium">Permission denied on global install?</p>
            <p className="mt-1">Try using <InlineCode>sudo</InlineCode> or configure npm to use a different directory.</p>
          </div>
          <div>
            <p className="text-gray-300 font-medium">Command not found after install?</p>
            <p className="mt-1">Ensure your global npm bin directory is in your <InlineCode>PATH</InlineCode>.</p>
          </div>
        </div>
      </div>
    </div>
  )
}

import { Shield, Key, Lock, AlertTriangle, CheckCircle2 } from "lucide-react"
import { CodeBlock, InlineCode } from "@/components/code-block"

export default function SecurityPage() {
  return (
    <div className="animate-in fade-in duration-300">
      <div className="flex items-center gap-2 text-sm mb-6">
        <Shield className="h-4 w-4 text-cyan-400" />
        <span className="text-gray-500">Core Concepts</span>
      </div>

      <h1 className="text-3xl sm:text-4xl font-bold mb-4 tracking-tight">
        <span className="bg-gradient-to-r from-white via-gray-100 to-gray-400 bg-clip-text text-transparent">
          Security
        </span>
      </h1>
      <p className="text-gray-400 text-base sm:text-lg mb-10 leading-relaxed">
        Shadw uses modern cryptographic primitives to secure communication between all cluster 
        components. This page covers authentication, encryption, and security best practices.
      </p>

      {/* Authentication */}
      <h2 className="text-xl font-semibold mb-4 flex items-center gap-2">
        <Key className="h-5 w-5 text-amber-400" />
        Authentication
      </h2>
      <p className="text-gray-400 text-sm mb-4">
        Workers authenticate to gateways using Ed25519 digital signatures. Each worker generates 
        a unique key pair, and the cluster key is used for shared authentication.
      </p>

      <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 mb-8">
        <div className="p-4 rounded-xl border border-gray-800/50 bg-gray-900/20">
          <h3 className="font-medium text-sm mb-2 text-cyan-400">Cluster Key</h3>
          <p className="text-xs text-gray-500">Shared secret that all workers must possess to join the cluster. Never expose this key publicly.</p>
        </div>
        <div className="p-4 rounded-xl border border-gray-800/50 bg-gray-900/20">
          <h3 className="font-medium text-sm mb-2 text-purple-400">Worker Key Pair</h3>
          <p className="text-xs text-gray-500">Ed25519 key pair generated per worker. Public key is shared with gateway for signature verification.</p>
        </div>
      </div>

      <CodeBlock 
        code={`# Generate a new cluster key
shadw keygen --type cluster > cluster.key

# Generate a worker key pair  
shadw keygen --type worker > worker.key

# The worker.key file contains:
# {
#   "publicKey": "abc123...",
#   "privateKey": "xyz789..."
# }`}
        language="bash"
        showLineNumbers={false}
      />

      {/* Request Signing */}
      <h2 className="text-xl font-semibold mt-10 mb-4 flex items-center gap-2">
        <Lock className="h-5 w-5 text-emerald-400" />
        Request Signing
      </h2>
      <p className="text-gray-400 text-sm mb-4">
        All RPC calls between gateway and workers are signed using Ed25519. This prevents 
        tampering and ensures message authenticity.
      </p>

      <CodeBlock 
        code={`// Internal RPC message structure
interface SignedMessage {
  payload: {
    action: "invoke" | "heartbeat" | "deploy";
    data: unknown;
    timestamp: number;
    nonce: string;
  };
  signature: string;  // Ed25519 signature of JSON.stringify(payload)
  publicKey: string;  // Sender's public key for verification
}

// Verification on receiving end
import { verify } from "@noble/ed25519";

async function verifyMessage(msg: SignedMessage): Promise<boolean> {
  const payloadBytes = new TextEncoder().encode(
    JSON.stringify(msg.payload)
  );
  return verify(
    msg.signature,
    payloadBytes,
    msg.publicKey
  );
}`}
        language="typescript"
        filename="rpc-signing.ts"
      />

      {/* TLS */}
      <h2 className="text-xl font-semibold mt-10 mb-4">Transport Security (TLS)</h2>
      <p className="text-gray-400 text-sm mb-4">
        In production, always enable TLS for the gateway HTTP endpoint:
      </p>

      <CodeBlock 
        code={`// shadw.config.js
module.exports = {
  gateway: {
    port: 443,
    tls: {
      cert: "/etc/ssl/certs/gateway.crt",
      key: "/etc/ssl/private/gateway.key",
      minVersion: "TLSv1.2",
    },
  },
};`}
        language="javascript"
        filename="shadw.config.js"
      />

      {/* Best Practices */}
      <h2 className="text-xl font-semibold mt-10 mb-4">Security Best Practices</h2>
      <div className="space-y-3 mb-8">
        {[
          { icon: CheckCircle2, color: "emerald", text: "Rotate cluster keys periodically (recommended: every 90 days)" },
          { icon: CheckCircle2, color: "emerald", text: "Use environment variables for secrets, never hardcode" },
          { icon: CheckCircle2, color: "emerald", text: "Enable TLS in production environments" },
          { icon: CheckCircle2, color: "emerald", text: "Restrict gateway ports with firewall rules" },
          { icon: CheckCircle2, color: "emerald", text: "Monitor for unauthorized worker connections" },
          { icon: CheckCircle2, color: "emerald", text: "Use separate clusters for staging and production" },
        ].map((item, idx) => (
          <div key={idx} className="flex items-start gap-3">
            <item.icon className={`h-4 w-4 mt-0.5 text-${item.color}-400 flex-shrink-0`} />
            <span className="text-sm text-gray-400">{item.text}</span>
          </div>
        ))}
      </div>

      {/* Warning */}
      <div className="p-5 rounded-xl border border-rose-500/20 bg-rose-500/5">
        <h3 className="text-sm font-semibold mb-2 flex items-center gap-2 text-rose-400">
          <AlertTriangle className="h-4 w-4" />
          Security Warning
        </h3>
        <p className="text-sm text-gray-400">
          Never expose your cluster key or worker private keys. If a key is compromised, 
          immediately rotate all keys and restart all cluster components. Compromised keys 
          allow attackers to join your cluster and execute arbitrary code.
        </p>
      </div>
    </div>
  )
}

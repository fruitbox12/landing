"use client"

import Link from "next/link"
import { Calendar, Clock, Share2, Twitter, Linkedin, Link2, ArrowRight, ArrowLeft, Bookmark } from "lucide-react"
import { Button } from "@/components/ui/button"
import { Navbar } from "@/components/navbar"
import { useParams } from "next/navigation"
import Image from "next/image"

const allPosts: Record<string, {
  title: string
  excerpt: string
  date: string
  readTime: string
  author: { name: string; role: string; avatar: string }
  category: string
  tags: string[]
  content: string[]
}> = {
  "introducing-shadw-2": {
    title: "Introducing Shadw 2.0: The Future of Edge Computing",
    excerpt: "Today we're announcing Shadw 2.0, our biggest release yet. With multi-cloud orchestration, enhanced security, and 50% faster cold starts, Shadw 2.0 redefines what's possible at the edge.",
    date: "January 15, 2026",
    readTime: "8 min read",
    author: { name: "Alex Chen", role: "Co-founder & CEO", avatar: "A" },
    category: "Product",
    tags: ["Release", "Edge Computing", "WebAssembly"],
    content: [
      "Today marks a significant milestone in Shadw's journey. We're thrilled to announce Shadw 2.0, our most ambitious release to date. This update represents over 18 months of engineering work, incorporating feedback from thousands of developers and hundreds of enterprise customers.",
      "## What's New in Shadw 2.0",
      "### Multi-Cloud Orchestration",
      "The headline feature of Shadw 2.0 is our new multi-cloud orchestration engine. You can now deploy your edge workers across AWS, Google Cloud, Azure, and 7 other cloud providers from a single configuration file. Our intelligent routing system automatically directs traffic to the optimal provider based on latency, cost, and availability.",
      "### 50% Faster Cold Starts",
      "We've completely rewritten our worker initialization pipeline. Cold starts that previously took 50-100ms now complete in under 25ms. For applications with sporadic traffic patterns, this translates to a dramatically improved user experience.",
      "### Native WebAssembly Support",
      "Shadw 2.0 introduces first-class support for WebAssembly modules. You can now compile your workers from Rust, Go, C++, or any language that targets WASM. This opens up new possibilities for compute-intensive workloads at the edge, including image processing, ML inference, and cryptographic operations.",
      "### Enhanced Security Model",
      "Security has always been a priority, but Shadw 2.0 takes it to the next level. New features include automatic secret rotation, hardware-backed key storage, and built-in DDoS protection. We've also achieved SOC 2 Type II and ISO 27001 certifications.",
      "## Migration Path",
      "For existing Shadw users, we've designed a seamless migration path. Your current workers will continue to run without modification, and you can opt into new features incrementally. Our CLI tool includes a migration wizard that analyzes your configuration and suggests optimizations.",
      "## What's Next",
      "Shadw 2.0 is just the beginning. Our roadmap includes GPU compute at the edge, enhanced observability with distributed tracing, and deeper integrations with popular frameworks. We're also expanding our edge network to 15 new regions by Q3 2026.",
      "We're incredibly grateful to our community for their feedback and support. Shadw 2.0 wouldn't be possible without you. As always, we'd love to hear your thoughts and feature requests on our Discord or GitHub discussions."
    ]
  },
  "zero-trust-architecture": {
    title: "Implementing Zero-Trust Architecture with Shadw",
    excerpt: "A comprehensive guide to building secure, zero-trust applications using Shadw's security primitives and edge-native encryption.",
    date: "January 5, 2026",
    readTime: "10 min read",
    author: { name: "Marcus Johnson", role: "Security Lead", avatar: "M" },
    category: "Security",
    tags: ["Security", "Zero-Trust", "Architecture"],
    content: [
      "Zero-trust architecture has become the gold standard for modern application security. The principle is simple: never trust, always verify. In this guide, we'll explore how to implement zero-trust principles using Shadw's security features.",
      "## The Problem with Traditional Security",
      "Traditional perimeter-based security assumes that everything inside your network is trustworthy. This assumption is increasingly dangerous in a world of cloud services, remote workers, and sophisticated attackers.",
      "## Shadw's Security Primitives",
      "Shadw provides several building blocks for zero-trust architecture: edge-native authentication, encrypted communication channels, granular access controls, and comprehensive audit logging.",
      "### Authentication at the Edge",
      "With Shadw, authentication happens at the edge, before requests ever reach your origin servers. This provides several benefits: reduced latency for legitimate users, protection against credential stuffing attacks, and consistent security policies across all regions.",
      "### Mutual TLS Everywhere",
      "Shadw supports mTLS for all service-to-service communication. Each edge worker has its own certificate, automatically rotated, ensuring that only authorized services can communicate with each other.",
      "### Policy-Based Access Control",
      "Our policy engine lets you define fine-grained access rules based on user identity, device posture, location, and time. Policies are evaluated at the edge in microseconds, with no impact on user experience.",
      "## Implementation Guide",
      "Let's walk through implementing zero-trust for a typical web application. We'll cover user authentication, API security, and inter-service communication.",
      "## Conclusion",
      "Zero-trust isn't just a security model; it's a mindset. By assuming breach and verifying everything, you build applications that are resilient to modern threats. Shadw's edge-native security features make this approach practical and performant."
    ]
  },
  "latency-optimization": {
    title: "How We Cut Latency from 200ms to 20ms",
    excerpt: "A deep dive into the techniques and architectural decisions that enabled us to achieve sub-30ms response times globally.",
    date: "December 15, 2025",
    readTime: "12 min read",
    author: { name: "David Park", role: "Principal Engineer", avatar: "D" },
    category: "Engineering",
    tags: ["Performance", "Latency", "Architecture"],
    content: [
      "When we started building our real-time analytics platform, our P99 latency was 200ms. Today, it's under 20ms globally. This is the story of how we got there.",
      "## Understanding the Problem",
      "Our application receives millions of events per minute from IoT devices worldwide. Users expect to see this data visualized in real-time. With 200ms latency, the experience felt sluggish.",
      "## Identifying Bottlenecks",
      "We used distributed tracing to identify where time was being spent: 80ms in network transit to our central servers, 60ms in database queries, 40ms in data processing, and 20ms in rendering.",
      "## Moving to the Edge",
      "The biggest win came from moving computation to the edge. Instead of sending all data to a central location, we now process events at the nearest Shadw edge node. This eliminated most of our network latency.",
      "## Optimizing Data Access",
      "We implemented a multi-tier caching strategy: hot data in edge worker memory, warm data in regional caches, and cold data in our central database. 95% of reads now hit the first two tiers.",
      "## The Results",
      "After six months of optimization, our P99 latency dropped to 18ms. User engagement increased by 40%, and we reduced our infrastructure costs by 35% by processing data at the edge instead of our central servers."
    ]
  },
  "edge-computing-2026": {
    title: "The State of Edge Computing in 2026",
    excerpt: "A comprehensive look at how edge computing has evolved and where it's headed next.",
    date: "January 10, 2026",
    readTime: "6 min read",
    author: { name: "Sarah Kim", role: "Industry Analyst", avatar: "S" },
    category: "Industry",
    tags: ["Industry", "Trends", "Edge Computing"],
    content: [
      "Edge computing has undergone a remarkable transformation over the past few years. What started as a niche technology for IoT applications has become a fundamental part of modern cloud architecture.",
      "## Market Growth",
      "The edge computing market has grown from $15 billion in 2023 to over $50 billion in 2025. Analysts project it will reach $100 billion by 2028, driven by AI applications, gaming, and real-time data processing.",
      "## Key Trends",
      "Several trends are shaping the edge computing landscape: the rise of AI inference at the edge, consolidation among providers, and the emergence of edge-native development frameworks.",
      "## Challenges Ahead",
      "Despite the growth, challenges remain: standardization across providers, security in distributed environments, and developer tooling that still lags behind centralized cloud platforms.",
      "## Looking Forward",
      "The future of edge computing is bright. As 5G networks mature and AI models become more efficient, we'll see edge computing power experiences that simply aren't possible with centralized infrastructure."
    ]
  },
  "serverless-vs-edge": {
    title: "Serverless vs Edge: When to Use What",
    excerpt: "Understanding the trade-offs between traditional serverless and edge computing for different use cases.",
    date: "December 28, 2025",
    readTime: "7 min read",
    author: { name: "Emily Zhang", role: "Solutions Architect", avatar: "E" },
    category: "Architecture",
    tags: ["Serverless", "Edge", "Architecture"],
    content: [
      "The serverless vs edge debate is one of the most common questions we hear from developers. The answer, as with most architecture decisions, is 'it depends.'",
      "## Understanding the Differences",
      "Traditional serverless (AWS Lambda, Cloud Functions) runs in a few centralized regions. Edge computing distributes your code to dozens or hundreds of locations worldwide.",
      "## When to Use Serverless",
      "Choose serverless when: you need long-running computations, your workload is CPU or memory intensive, you're processing large files, or latency isn't critical.",
      "## When to Use Edge",
      "Choose edge when: every millisecond matters, you need to be close to your users globally, you're doing request/response transformations, or you're implementing security at the perimeter.",
      "## Hybrid Approaches",
      "Often the best architecture combines both. Use edge for authentication and caching, then route to serverless for heavy computation. This gives you the best of both worlds."
    ]
  },
  "multi-cloud-strategy": {
    title: "Building a Multi-Cloud Strategy That Actually Works",
    excerpt: "Practical advice for deploying across AWS, GCP, and Azure without the complexity.",
    date: "December 20, 2025",
    readTime: "9 min read",
    author: { name: "Alex Chen", role: "Co-founder & CEO", avatar: "A" },
    category: "Architecture",
    tags: ["Multi-Cloud", "Strategy", "DevOps"],
    content: [
      "Multi-cloud is often sold as a way to avoid vendor lock-in. In practice, it usually creates a mess of complexity. Here's how to do it right.",
      "## The Multi-Cloud Reality Check",
      "Most multi-cloud implementations fail because they try to abstract away cloud differences entirely. This leads to lowest-common-denominator solutions that leverage none of the unique strengths of each provider.",
      "## A Better Approach",
      "Instead of trying to make clouds interchangeable, embrace their differences. Use each cloud for what it does best: AWS for its breadth of services, GCP for data analytics, Azure for enterprise integration.",
      "## The Role of Edge",
      "Edge computing provides a natural abstraction layer. Your edge workers present a consistent interface to users, while routing to the optimal backend based on the workload.",
      "## Practical Implementation",
      "We recommend starting with a single primary cloud and adding secondary clouds for specific use cases. Use infrastructure-as-code to maintain consistency, and invest in observability that spans all your environments."
    ]
  },
  "wasm-edge-workers": {
    title: "WebAssembly and the Future of Edge Workers",
    excerpt: "How WASM is enabling new possibilities for compute at the edge.",
    date: "December 10, 2025",
    readTime: "8 min read",
    author: { name: "Sarah Kim", role: "Industry Analyst", avatar: "S" },
    category: "Technology",
    tags: ["WebAssembly", "Edge Workers", "Performance"],
    content: [
      "WebAssembly is transforming what's possible at the edge. What started as a way to run C++ in browsers has become a universal runtime for serverless computing.",
      "## Why WASM for Edge",
      "WASM modules are small, fast to start, and sandboxed by default. These properties make them ideal for edge computing, where cold start time and security are critical.",
      "## Performance Benefits",
      "In our benchmarks, WASM workers outperform JavaScript workers by 2-10x for compute-intensive tasks. The gap is even larger for applications that can leverage SIMD instructions.",
      "## Language Choice",
      "With WASM, you're no longer limited to JavaScript. Rust, Go, C++, and even Python can now run at the edge. Each language brings its own ecosystem and libraries.",
      "## The Future",
      "We're working on WASM features that will enable even more use cases: component model for composable workers, threads for parallel processing, and garbage collection for managed languages."
    ]
  },
  "real-time-analytics-edge": {
    title: "Building Real-Time Analytics at the Edge",
    excerpt: "Learn how to process and analyze data in real-time using edge computing.",
    date: "December 5, 2025",
    readTime: "11 min read",
    author: { name: "Marcus Johnson", role: "Security Lead", avatar: "M" },
    category: "Engineering",
    tags: ["Analytics", "Real-time", "Data Processing"],
    content: [
      "Real-time analytics traditionally required expensive, centralized infrastructure. Edge computing changes the economics and makes real-time insights accessible to everyone.",
      "## The Architecture",
      "Our approach uses a three-tier architecture: edge nodes for initial aggregation, regional hubs for cross-location analysis, and a central store for historical queries.",
      "## Stream Processing at the Edge",
      "Each edge node runs a lightweight stream processor that can perform windowed aggregations, anomaly detection, and pattern matching in real-time.",
      "## Handling Late Data",
      "One challenge with distributed systems is late-arriving data. We use watermarks and session windows to balance accuracy with latency.",
      "## Visualization",
      "The final piece is getting insights to users. We use WebSocket connections from edge nodes directly to user browsers, eliminating the round trip through central servers."
    ]
  },
  "edge-caching-strategies": {
    title: "Advanced Edge Caching Strategies",
    excerpt: "Deep dive into caching patterns and invalidation strategies for distributed applications.",
    date: "November 28, 2025",
    readTime: "9 min read",
    author: { name: "David Park", role: "Principal Engineer", avatar: "D" },
    category: "Performance",
    tags: ["Caching", "Performance", "Architecture"],
    content: [
      "Caching is the most effective way to improve performance, but it's also one of the hardest things to get right. Here's what we've learned from caching at global scale.",
      "## The Two Hard Problems",
      "There are only two hard things in computer science: cache invalidation and naming things. We'll focus on the first one.",
      "## Cache Hierarchies",
      "Effective caching uses multiple layers: browser cache, edge cache, regional cache, and origin cache. Each layer serves a different purpose and has different invalidation requirements.",
      "## Invalidation Strategies",
      "We use a combination of time-based expiration, event-driven invalidation, and versioned URLs. The right strategy depends on your data's characteristics.",
      "## Measuring Effectiveness",
      "Cache hit ratio is the obvious metric, but it's not the only one. We also track time-to-first-byte, origin load, and staleness (how often users see outdated data)."
    ]
  },
  "securing-api-gateway": {
    title: "Securing Your API Gateway at the Edge",
    excerpt: "Best practices for rate limiting, authentication, and threat detection.",
    date: "November 20, 2025",
    readTime: "8 min read",
    author: { name: "Marcus Johnson", role: "Security Lead", avatar: "M" },
    category: "Security",
    tags: ["API Security", "Gateway", "Authentication"],
    content: [
      "Your API gateway is the front door to your application. Here's how to make sure only the right traffic gets through.",
      "## Authentication at the Edge",
      "Validating tokens at the edge stops unauthorized requests before they consume backend resources. We support JWT validation, API keys, and OAuth 2.0 flows.",
      "## Rate Limiting",
      "Effective rate limiting requires coordination across edge nodes. We use a distributed token bucket algorithm that maintains accuracy while minimizing coordination overhead.",
      "## Threat Detection",
      "Our edge nodes analyze traffic patterns in real-time to detect and block attacks. This includes SQL injection, XSS, and application-specific attack patterns.",
      "## Logging and Compliance",
      "Every request through your API gateway is logged with full context. These logs feed into your SIEM and help meet compliance requirements for audit trails."
    ]
  },
  "cost-optimization-cloud": {
    title: "Cloud Cost Optimization: A Practical Guide",
    excerpt: "Strategies and tools for reducing your cloud infrastructure costs.",
    date: "November 15, 2025",
    readTime: "10 min read",
    author: { name: "Emily Zhang", role: "Solutions Architect", avatar: "E" },
    category: "Operations",
    tags: ["Cost Optimization", "Cloud", "FinOps"],
    content: [
      "Cloud costs have a way of spiraling out of control. Here's a practical guide to getting them under control without sacrificing performance.",
      "## Understanding Your Bill",
      "The first step is understanding where your money is going. Most cloud bills are dominated by compute, storage, and data transfer. Each requires a different optimization strategy.",
      "## Right-Sizing Compute",
      "Most cloud resources are over-provisioned. Use monitoring data to identify instances that are consistently under-utilized and resize them.",
      "## Edge for Cost Reduction",
      "Moving computation to the edge can significantly reduce costs. Data transfer costs drop when you process data close to the source, and you can avoid egress fees entirely.",
      "## Reserved vs On-Demand",
      "For predictable workloads, reserved capacity offers 30-70% savings. Use on-demand for variable workloads and spot instances for batch processing.",
      "## Continuous Optimization",
      "Cost optimization isn't a one-time project. Implement automated policies to catch waste: unused resources, old snapshots, and idle load balancers."
    ]
  }
}

const relatedPosts = [
  { slug: "zero-trust-architecture", title: "Implementing Zero-Trust Architecture with Shadw", category: "Security" },
  { slug: "latency-optimization", title: "How We Cut Latency from 200ms to 20ms", category: "Engineering" },
  { slug: "edge-computing-2026", title: "The State of Edge Computing in 2026", category: "Industry" }
]

export default function BlogPostPage() {
  const params = useParams()
  const slug = params.slug as string
  const post = allPosts[slug]

  if (!post) {
    return (
      <div className="min-h-screen bg-[#050506] text-white flex items-center justify-center">
        <div className="text-center">
          <h1 className="text-4xl font-bold mb-4">Post Not Found</h1>
          <p className="text-gray-400 mb-8">The blog post you're looking for doesn't exist.</p>
          <Link href="/blog">
            <Button className="bg-white text-black hover:bg-gray-200">
              <ArrowLeft className="w-4 h-4 mr-2" />
              Back to Blog
            </Button>
          </Link>
        </div>
      </div>
    )
  }

  return (
    <div className="min-h-screen bg-[#050506] text-white relative overflow-hidden">
      {/* Grid background */}
      <div 
        className="fixed inset-0 pointer-events-none opacity-[0.02]"
        style={{
          backgroundImage: `linear-gradient(rgba(255,255,255,0.5) 1px, transparent 1px), linear-gradient(90deg, rgba(255,255,255,0.5) 1px, transparent 1px)`,
          backgroundSize: '40px 40px',
        }}
      />
      <div className="fixed inset-0 pointer-events-none bg-[radial-gradient(ellipse_80%_80%_at_50%_50%,_transparent_0%,_#050506_100%)]" />
      
      {/* Background glows */}
      <div className="fixed left-[-20%] top-[-10%] h-[800px] w-[800px] rounded-full bg-purple-600/10 blur-[150px] pointer-events-none" />
      <div className="fixed right-[-15%] top-[40%] h-[600px] w-[600px] rounded-full bg-cyan-500/8 blur-[150px] pointer-events-none" />

<Navbar />

      <main className="relative z-10 py-12 px-6">
        <article className="mx-auto max-w-3xl">
          {/* Header */}
          <header className="mb-12">
            <div className="flex items-center gap-3 mb-6">
              <span className="px-3 py-1 rounded-full bg-purple-500/20 text-purple-300 text-xs font-medium">
                {post.category}
              </span>
              <span className="text-gray-500 text-sm flex items-center gap-1.5">
                <Calendar className="w-3.5 h-3.5" />
                {post.date}
              </span>
              <span className="text-gray-500 text-sm flex items-center gap-1.5">
                <Clock className="w-3.5 h-3.5" />
                {post.readTime}
              </span>
            </div>

            <h1 className="text-4xl sm:text-5xl font-bold mb-6 leading-tight">
              {post.title}
            </h1>

            <p className="text-xl text-gray-400 leading-relaxed mb-8">
              {post.excerpt}
            </p>

            {/* Author and actions */}
            <div className="flex items-center justify-between py-6 border-t border-b border-gray-800/50">
              <div className="flex items-center gap-4">
                <div className="w-12 h-12 rounded-full bg-gradient-to-br from-purple-500 to-cyan-500 flex items-center justify-center text-lg font-bold">
                  {post.author.avatar}
                </div>
                <div>
                  <div className="font-medium">{post.author.name}</div>
                  <div className="text-sm text-gray-500">{post.author.role}</div>
                </div>
              </div>

              <div className="flex items-center gap-2">
                <Button variant="ghost" size="icon" className="text-gray-400 hover:text-white hover:bg-white/5 rounded-full bg-transparent">
                  <Bookmark className="w-4 h-4" />
                </Button>
                <Button variant="ghost" size="icon" className="text-gray-400 hover:text-white hover:bg-white/5 rounded-full bg-transparent">
                  <Twitter className="w-4 h-4" />
                </Button>
                <Button variant="ghost" size="icon" className="text-gray-400 hover:text-white hover:bg-white/5 rounded-full bg-transparent">
                  <Linkedin className="w-4 h-4" />
                </Button>
                <Button variant="ghost" size="icon" className="text-gray-400 hover:text-white hover:bg-white/5 rounded-full bg-transparent">
                  <Link2 className="w-4 h-4" />
                </Button>
              </div>
            </div>
          </header>

          {/* Content */}
          <div className="prose prose-invert prose-lg max-w-none">
            {post.content.map((paragraph, index) => {
              if (paragraph.startsWith('## ')) {
                return (
                  <h2 key={index} className="text-2xl font-bold mt-12 mb-4 text-white">
                    {paragraph.replace('## ', '')}
                  </h2>
                )
              }
              if (paragraph.startsWith('### ')) {
                return (
                  <h3 key={index} className="text-xl font-semibold mt-8 mb-3 text-white">
                    {paragraph.replace('### ', '')}
                  </h3>
                )
              }
              return (
                <p key={index} className="text-gray-300 leading-relaxed mb-6">
                  {paragraph}
                </p>
              )
            })}
          </div>

          {/* Tags */}
          <div className="mt-12 pt-8 border-t border-gray-800/50">
            <div className="flex flex-wrap gap-2">
              {post.tags.map((tag) => (
                <span
                  key={tag}
                  className="px-3 py-1.5 rounded-full bg-gray-800/50 text-gray-400 text-sm hover:bg-gray-700/50 transition-colors cursor-pointer"
                >
                  {tag}
                </span>
              ))}
            </div>
          </div>

          {/* Author bio */}
          <div className="mt-12 p-8 rounded-2xl bg-gradient-to-br from-gray-900/80 to-gray-900/40 border border-gray-800/50">
            <div className="flex items-start gap-5">
              <div className="w-16 h-16 rounded-full bg-gradient-to-br from-purple-500 to-cyan-500 flex items-center justify-center text-xl font-bold flex-shrink-0">
                {post.author.avatar}
              </div>
              <div>
                <div className="font-semibold text-lg mb-1">{post.author.name}</div>
                <div className="text-sm text-gray-400 mb-3">{post.author.role}</div>
                <p className="text-gray-400 text-sm leading-relaxed">
                  Building the future of edge computing at Shadw. Previously led engineering teams at top tech companies. Passionate about distributed systems and developer experience.
                </p>
              </div>
            </div>
          </div>
        </article>

        {/* Related posts */}
        <section className="mx-auto max-w-5xl mt-20">
          <h2 className="text-2xl font-bold mb-8">Related Articles</h2>
          <div className="grid md:grid-cols-3 gap-6">
            {relatedPosts.filter(p => p.slug !== slug).slice(0, 3).map((related) => (
              <Link
                key={related.slug}
                href={`/blog/${related.slug}`}
                className="group p-6 rounded-2xl bg-gradient-to-br from-gray-900/80 to-gray-900/40 border border-gray-800/50 hover:border-gray-700/50 transition-all"
              >
                <span className="text-xs text-purple-400 font-medium">{related.category}</span>
                <h3 className="mt-2 font-semibold group-hover:text-purple-300 transition-colors line-clamp-2">
                  {related.title}
                </h3>
                <div className="mt-4 text-sm text-gray-500 flex items-center gap-1 group-hover:text-gray-400 transition-colors">
                  Read more <ArrowRight className="w-3 h-3" />
                </div>
              </Link>
            ))}
          </div>
        </section>
      </main>

      {/* Footer */}
      <footer className="relative z-10 border-t border-gray-800/50 mt-20">
        <div className="mx-auto max-w-7xl px-6 py-12">
          <div className="flex flex-col md:flex-row items-center justify-between gap-4">
            <div className="text-sm text-gray-500">
              2026 Shadw. All rights reserved.
            </div>
            <div className="flex items-center gap-6">
              <Link href="/blog" className="text-sm text-gray-500 hover:text-white transition-colors">Blog</Link>
              <Link href="/docs" className="text-sm text-gray-500 hover:text-white transition-colors">Docs</Link>
              <Link href="/" className="text-sm text-gray-500 hover:text-white transition-colors">Home</Link>
            </div>
          </div>
        </div>
      </footer>
    </div>
  )
}

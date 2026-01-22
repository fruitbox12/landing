"use client"

import { Button } from "@/components/ui/button"
import { ArrowLeft } from "lucide-react"
import Link from "next/link"
import { Calendar, Clock, ArrowRight, TrendingUp, Bookmark, Share2 } from "lucide-react"
import { Navbar } from "@/components/navbar"
import Image from "next/image"

const featuredPost = {
  slug: "introducing-shadw-2",
  title: "Introducing Shadw 2.0: The Future of Edge Computing",
  excerpt: "Today we're announcing Shadw 2.0, our biggest release yet. With multi-cloud orchestration, enhanced security, and 50% faster cold starts, Shadw 2.0 redefines what's possible at the edge. This release includes native WebAssembly support, improved developer tooling, and a completely redesigned dashboard.",
  date: "January 15, 2026",
  readTime: "8 min read",
  author: {
    name: "Alex Chen",
    role: "Co-founder & CEO",
    avatar: "A"
  },
  category: "Product",
  tags: ["Release", "Edge Computing", "WebAssembly"]
}

const editorsPicks = [
  {
    slug: "zero-trust-architecture",
    title: "Implementing Zero-Trust Architecture with Shadw",
    excerpt: "A comprehensive guide to building secure, zero-trust applications using Shadw's security primitives and edge-native encryption.",
    date: "January 5, 2026",
    readTime: "10 min read",
    author: { name: "Marcus Johnson", role: "Security Lead", avatar: "M" },
    category: "Security"
  },
  {
    slug: "latency-optimization",
    title: "How We Cut Latency from 200ms to 20ms",
    excerpt: "A deep dive into the techniques and architectural decisions that enabled us to achieve sub-30ms response times globally.",
    date: "December 15, 2025",
    readTime: "12 min read",
    author: { name: "David Park", role: "Principal Engineer", avatar: "D" },
    category: "Engineering"
  }
]

const posts = [
  {
    slug: "edge-computing-2026",
    title: "The State of Edge Computing in 2026",
    excerpt: "A comprehensive look at how edge computing has evolved and where it's headed next. We analyze trends, challenges, and opportunities.",
    date: "January 10, 2026",
    readTime: "6 min read",
    author: { name: "Sarah Kim", avatar: "S" },
    category: "Industry",
    trending: true
  },
  {
    slug: "serverless-vs-edge",
    title: "Serverless vs Edge: When to Use What",
    excerpt: "Understanding the trade-offs between traditional serverless and edge computing for different use cases and workloads.",
    date: "December 28, 2025",
    readTime: "7 min read",
    author: { name: "Emily Zhang", avatar: "E" },
    category: "Architecture"
  },
  {
    slug: "multi-cloud-strategy",
    title: "Building a Multi-Cloud Strategy That Actually Works",
    excerpt: "Practical advice for deploying across AWS, GCP, and Azure without the complexity and vendor lock-in.",
    date: "December 20, 2025",
    readTime: "9 min read",
    author: { name: "Alex Chen", avatar: "A" },
    category: "Architecture",
    trending: true
  },
  {
    slug: "wasm-edge-workers",
    title: "WebAssembly and the Future of Edge Workers",
    excerpt: "How WASM is enabling new possibilities for compute at the edge, with performance benchmarks and real-world examples.",
    date: "December 10, 2025",
    readTime: "8 min read",
    author: { name: "Sarah Kim", avatar: "S" },
    category: "Technology"
  },
  {
    slug: "real-time-analytics-edge",
    title: "Building Real-Time Analytics at the Edge",
    excerpt: "Learn how to process and analyze data in real-time using edge computing, reducing latency and bandwidth costs.",
    date: "December 5, 2025",
    readTime: "11 min read",
    author: { name: "Marcus Johnson", avatar: "M" },
    category: "Engineering"
  },
  {
    slug: "edge-caching-strategies",
    title: "Advanced Edge Caching Strategies",
    excerpt: "Deep dive into caching patterns, invalidation strategies, and cache coherence for globally distributed applications.",
    date: "November 28, 2025",
    readTime: "9 min read",
    author: { name: "David Park", avatar: "D" },
    category: "Performance"
  },
  {
    slug: "securing-api-gateway",
    title: "Securing Your API Gateway at the Edge",
    excerpt: "Best practices for rate limiting, authentication, and threat detection at the edge layer.",
    date: "November 20, 2025",
    readTime: "8 min read",
    author: { name: "Marcus Johnson", avatar: "M" },
    category: "Security"
  },
  {
    slug: "cost-optimization-cloud",
    title: "Cloud Cost Optimization: A Practical Guide",
    excerpt: "Strategies and tools for reducing your cloud infrastructure costs without sacrificing performance.",
    date: "November 15, 2025",
    readTime: "10 min read",
    author: { name: "Emily Zhang", avatar: "E" },
    category: "Operations"
  }
]

const categories = [
  { name: "All", count: 24 },
  { name: "Engineering", count: 8 },
  { name: "Security", count: 5 },
  { name: "Product", count: 4 },
  { name: "Architecture", count: 3 },
  { name: "Industry", count: 2 },
  { name: "Performance", count: 2 }
]

export default function BlogPage() {
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

      <main className="relative z-10 py-16 px-6">
        <div className="mx-auto max-w-7xl">
          {/* Page Header */}
          <div className="text-center mb-16">
            <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-purple-500/10 border border-purple-500/20 text-purple-300 text-xs font-medium mb-4">
              <Bookmark className="w-3 h-3" />
              Engineering Blog
            </div>
            <h1 className="text-4xl sm:text-5xl lg:text-6xl font-bold mb-4 bg-gradient-to-r from-white via-gray-200 to-gray-400 bg-clip-text text-transparent">
              Insights & Updates
            </h1>
            <p className="text-gray-400 text-lg max-w-2xl mx-auto">
              Deep dives into edge computing, engineering challenges, security best practices, and product announcements from the Shadw team.
            </p>
          </div>

          {/* Featured Post */}
          <div className="mb-16">
            <div className="flex items-center gap-2 mb-6">
              <div className="h-px flex-1 bg-gradient-to-r from-transparent via-purple-500/30 to-transparent" />
              <span className="text-xs font-medium text-purple-400 uppercase tracking-wider">Featured</span>
              <div className="h-px flex-1 bg-gradient-to-r from-transparent via-purple-500/30 to-transparent" />
            </div>
            
            <Link href={`/blog/${featuredPost.slug}`} className="block group">
              <div className="relative rounded-3xl overflow-hidden border border-purple-500/20 bg-gradient-to-br from-purple-500/5 via-transparent to-cyan-500/5">
                <div className="grid lg:grid-cols-2 gap-0">
                  {/* Visual */}
                  <div className="aspect-video lg:aspect-auto lg:min-h-[400px] bg-gradient-to-br from-purple-600/30 via-indigo-600/20 to-cyan-600/30 flex items-center justify-center relative overflow-hidden">
                    <div className="absolute inset-0 bg-[radial-gradient(circle_at_30%_40%,_rgba(147,51,234,0.4)_0%,_transparent_50%)]" />
                    <div className="absolute inset-0 bg-[radial-gradient(circle_at_70%_60%,_rgba(34,211,238,0.3)_0%,_transparent_50%)]" />
                    <div className="relative text-center">
                      <div className="text-8xl lg:text-9xl font-black text-white/20 tracking-tighter">2.0</div>
                      <div className="text-sm text-white/40 uppercase tracking-[0.3em] mt-2">Now Available</div>
                    </div>
                  </div>
                  
                  {/* Content */}
                  <div className="p-8 lg:p-12 flex flex-col justify-center">
                    <div className="flex flex-wrap items-center gap-2 mb-6">
                      <span className="px-3 py-1 bg-purple-500/20 text-purple-300 text-xs font-medium rounded-full">
                        {featuredPost.category}
                      </span>
                      {featuredPost.tags.map(tag => (
                        <span key={tag} className="px-2 py-1 bg-white/5 text-gray-500 text-xs rounded-full">
                          {tag}
                        </span>
                      ))}
                    </div>
                    
                    <h2 className="text-2xl lg:text-4xl font-bold mb-4 group-hover:text-purple-300 transition-colors leading-tight">
                      {featuredPost.title}
                    </h2>
                    
                    <p className="text-gray-400 mb-8 text-lg leading-relaxed">
                      {featuredPost.excerpt}
                    </p>
                    
                    <div className="flex items-center justify-between pt-6 border-t border-white/10">
                      <div className="flex items-center gap-3">
                        <div className="w-10 h-10 rounded-full bg-gradient-to-br from-purple-500 to-indigo-500 flex items-center justify-center text-sm font-bold">
                          {featuredPost.author.avatar}
                        </div>
                        <div>
                          <div className="text-sm font-medium text-white">{featuredPost.author.name}</div>
                          <div className="text-xs text-gray-500">{featuredPost.author.role}</div>
                        </div>
                      </div>
                      <div className="flex items-center gap-4 text-sm text-gray-500">
                        <span className="flex items-center gap-1.5">
                          <Calendar className="w-4 h-4" />
                          {featuredPost.date}
                        </span>
                        <span className="flex items-center gap-1.5">
                          <Clock className="w-4 h-4" />
                          {featuredPost.readTime}
                        </span>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </Link>
          </div>

          {/* Editor's Picks */}
          <div className="mb-16">
            <div className="flex items-center justify-between mb-6">
              <h2 className="text-xl font-semibold">Editor's Picks</h2>
              <div className="h-px flex-1 ml-6 bg-gradient-to-r from-white/10 to-transparent" />
            </div>
            
            <div className="grid md:grid-cols-2 gap-6">
              {editorsPicks.map((post) => (
                <Link key={post.slug} href={`/blog/${post.slug}`} className="group">
                  <article className="h-full rounded-2xl border border-white/10 bg-white/[0.02] p-6 hover:bg-white/[0.04] hover:border-purple-500/30 transition-all">
                    <div className="flex items-start justify-between mb-4">
                      <span className="px-2.5 py-1 bg-white/5 text-gray-400 text-xs font-medium rounded-full">
                        {post.category}
                      </span>
                      <Bookmark className="w-4 h-4 text-gray-600 group-hover:text-purple-400 transition-colors" />
                    </div>
                    <h3 className="text-xl font-semibold mb-3 group-hover:text-purple-300 transition-colors">
                      {post.title}
                    </h3>
                    <p className="text-gray-500 text-sm mb-6 line-clamp-2">
                      {post.excerpt}
                    </p>
                    <div className="flex items-center gap-3 pt-4 border-t border-white/5">
                      <div className="w-8 h-8 rounded-full bg-gradient-to-br from-indigo-500 to-purple-500 flex items-center justify-center text-xs font-bold">
                        {post.author.avatar}
                      </div>
                      <div className="flex-1">
                        <div className="text-sm font-medium text-gray-300">{post.author.name}</div>
                        <div className="text-xs text-gray-600">{post.author.role}</div>
                      </div>
                      <span className="text-xs text-gray-600">{post.readTime}</span>
                    </div>
                  </article>
                </Link>
              ))}
            </div>
          </div>

          {/* Main Content Grid */}
          <div className="grid lg:grid-cols-4 gap-8">
            {/* Sidebar */}
            <aside className="lg:col-span-1 order-2 lg:order-1">
              <div className="sticky top-8 space-y-8">
                {/* Categories */}
                <div className="rounded-2xl border border-white/10 bg-white/[0.02] p-6">
                  <h3 className="text-sm font-semibold text-white mb-4">Categories</h3>
                  <div className="space-y-2">
                    {categories.map((category, i) => (
                      <button
                        key={category.name}
                        className={`w-full flex items-center justify-between px-3 py-2 rounded-lg text-sm transition-all ${
                          i === 0 
                            ? "bg-purple-500/20 text-purple-300" 
                            : "text-gray-400 hover:bg-white/5 hover:text-white"
                        }`}
                      >
                        <span>{category.name}</span>
                        <span className={`text-xs ${i === 0 ? "text-purple-400" : "text-gray-600"}`}>{category.count}</span>
                      </button>
                    ))}
                  </div>
                </div>

                {/* Newsletter */}
                <div className="rounded-2xl border border-white/10 bg-gradient-to-br from-purple-500/10 to-transparent p-6">
                  <h3 className="text-sm font-semibold text-white mb-2">Stay Updated</h3>
                  <p className="text-xs text-gray-500 mb-4">Get the latest posts delivered to your inbox.</p>
                  <input 
                    type="email" 
                    placeholder="your@email.com"
                    className="w-full px-3 py-2 rounded-lg bg-black/30 border border-white/10 text-sm text-white placeholder:text-gray-600 focus:outline-none focus:border-purple-500/50 mb-3"
                  />
                  <Button className="w-full bg-purple-600 hover:bg-purple-500 text-white text-sm rounded-lg">
                    Subscribe
                  </Button>
                </div>
              </div>
            </aside>

            {/* Posts */}
            <div className="lg:col-span-3 order-1 lg:order-2">
              <div className="flex items-center justify-between mb-6">
                <h2 className="text-xl font-semibold">Latest Posts</h2>
                <div className="flex items-center gap-2">
                  <Button variant="ghost" size="sm" className="text-xs text-gray-400 hover:text-white bg-transparent">
                    Most Recent
                  </Button>
                  <Button variant="ghost" size="sm" className="text-xs text-gray-400 hover:text-white bg-transparent">
                    <TrendingUp className="w-3 h-3 mr-1" />
                    Trending
                  </Button>
                </div>
              </div>

              <div className="space-y-4">
                {posts.map((post) => (
                  <Link key={post.slug} href={`/blog/${post.slug}`} className="group block">
                    <article className="rounded-xl border border-white/10 bg-white/[0.02] p-5 hover:bg-white/[0.04] hover:border-purple-500/20 transition-all">
                      <div className="flex gap-5">
                        <div className="flex-1">
                          <div className="flex items-center gap-2 mb-2">
                            <span className="px-2 py-0.5 bg-white/5 text-gray-500 text-xs rounded">
                              {post.category}
                            </span>
                            {post.trending && (
                              <span className="flex items-center gap-1 px-2 py-0.5 bg-orange-500/10 text-orange-400 text-xs rounded">
                                <TrendingUp className="w-3 h-3" />
                                Trending
                              </span>
                            )}
                          </div>
                          <h3 className="text-lg font-semibold mb-2 group-hover:text-purple-300 transition-colors">
                            {post.title}
                          </h3>
                          <p className="text-gray-500 text-sm mb-3 line-clamp-2">
                            {post.excerpt}
                          </p>
                          <div className="flex items-center gap-4 text-xs text-gray-600">
                            <div className="flex items-center gap-2">
                              <div className="w-5 h-5 rounded-full bg-gradient-to-br from-gray-600 to-gray-700 flex items-center justify-center text-[10px] font-bold">
                                {post.author.avatar}
                              </div>
                              <span>{post.author.name}</span>
                            </div>
                            <span>{post.date}</span>
                            <span>{post.readTime}</span>
                          </div>
                        </div>
                        <div className="hidden sm:flex items-center">
                          <ArrowRight className="w-5 h-5 text-gray-700 group-hover:text-purple-400 group-hover:translate-x-1 transition-all" />
                        </div>
                      </div>
                    </article>
                  </Link>
                ))}
              </div>

              {/* Load More */}
              <div className="text-center mt-8">
                <Button variant="outline" className="rounded-full border-gray-700 bg-transparent text-gray-300 hover:bg-white/5 hover:text-white">
                  Load More Posts
                  <ArrowRight className="w-4 h-4 ml-2" />
                </Button>
              </div>
            </div>
          </div>
        </div>
      </main>
    </div>
  )
}

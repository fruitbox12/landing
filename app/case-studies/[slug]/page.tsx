"use client"

import Link from "next/link"
import { ArrowLeft, Globe, Zap, TrendingUp, BarChart3, Clock, Quote, CheckCircle2, Users, Shield, Building2 } from "lucide-react"
import { Button } from "@/components/ui/button"
import { Navbar } from "@/components/navbar"
import { useParams } from "next/navigation"
import Image from "next/image"

const allCaseStudies: Record<string, {
  company: string
  logo: string
  industry: string
  region: string
  title: string
  subtitle: string
  heroStats: { value: string; label: string }[]
  challenge: string[]
  solution: string[]
  implementation: { title: string; description: string }[]
  results: { value: string; label: string; description: string }[]
  quote: string
  quoteAuthor: string
  quoteRole: string
  technologies: string[]
  timeline: string
  teamSize: string
  color: string
}> = {
  "streamline-ai": {
    company: "Streamline AI",
    logo: "S",
    industry: "Artificial Intelligence",
    region: "Global",
    title: "How Streamline AI Reduced Inference Latency by 85% with Shadw",
    subtitle: "Serving ML models globally with sub-50ms latency while cutting infrastructure costs by 60%",
    heroStats: [
      { value: "85%", label: "Latency Reduction" },
      { value: "60%", label: "Cost Savings" },
      { value: "10M+", label: "Daily Requests" },
      { value: "47", label: "Global Regions" }
    ],
    challenge: [
      "Streamline AI provides AI-powered content moderation for social platforms, processing millions of images and text snippets daily. Their existing infrastructure, hosted in a single AWS region, struggled to meet the latency requirements of their global customer base.",
      "Users in Asia-Pacific experienced latencies of 300-400ms, making real-time moderation impossible. The team had tried regional deployments, but managing ML models across multiple cloud regions proved operationally complex and expensive.",
      "Additionally, their cold start times of 2-3 seconds meant that traffic spikes would result in degraded performance, leading to customer complaints and potential safety issues when harmful content wasn't caught quickly."
    ],
    solution: [
      "Shadw's edge computing platform provided the perfect solution. By deploying their ML models as WebAssembly modules to Shadw's global edge network, Streamline AI could serve inference requests from 47 locations worldwide.",
      "The Shadw team worked closely with Streamline AI to optimize their TensorFlow Lite models for edge deployment, reducing model size by 70% while maintaining 99.2% accuracy through quantization and pruning techniques.",
      "Shadw's intelligent caching layer was configured to cache model weights at the edge, eliminating cold starts entirely for their most popular models. For less frequently used models, cold starts were reduced to under 50ms."
    ],
    implementation: [
      { title: "Model Optimization", description: "Converted TensorFlow models to TFLite with INT8 quantization, reducing size from 150MB to 45MB" },
      { title: "Edge Deployment", description: "Deployed models to all 47 Shadw edge locations using automated CI/CD pipeline" },
      { title: "Caching Strategy", description: "Implemented tiered caching with edge-local model weights and regional fallbacks" },
      { title: "Load Balancing", description: "Configured intelligent routing based on model availability and regional load" }
    ],
    results: [
      { value: "15ms", label: "Average Latency", description: "Down from 200ms, a 13x improvement in response time" },
      { value: "99.99%", label: "Availability", description: "Up from 99.9%, exceeding enterprise SLA requirements" },
      { value: "60%", label: "Cost Reduction", description: "Eliminated need for regional GPU clusters" },
      { value: "10M+", label: "Daily Requests", description: "Scaled from 2M to 10M+ without architecture changes" }
    ],
    quote: "Shadw transformed how we deliver AI at scale. What used to take months to optimize now happens automatically. Our customers see results instantly, and our engineers can focus on improving models rather than managing infrastructure.",
    quoteAuthor: "Dr. Maya Patel",
    quoteRole: "CTO, Streamline AI",
    technologies: ["WebAssembly", "TensorFlow Lite", "Edge Workers", "GPU Compute", "Intelligent Routing"],
    timeline: "8 weeks",
    teamSize: "3 engineers",
    color: "from-purple-500 to-indigo-600"
  },
  "fintech-global": {
    company: "FinTech Global",
    logo: "F",
    industry: "Financial Services",
    region: "EMEA",
    title: "Achieving PCI-DSS Compliance at the Edge",
    subtitle: "Securing sensitive transactions across 30+ countries while maintaining sub-100ms response times",
    heroStats: [
      { value: "99.999%", label: "Uptime" },
      { value: "30+", label: "Countries" },
      { value: "<100ms", label: "P99 Latency" },
      { value: "0", label: "Security Incidents" }
    ],
    challenge: [
      "FinTech Global processes payment transactions for merchants across Europe and the Middle East. Regulatory requirements meant they needed to process data within specific geographic boundaries while maintaining PCI-DSS compliance.",
      "Their existing centralized architecture couldn't meet both latency requirements and data residency regulations. Transactions from the Middle East had to route through European data centers, adding 150-200ms of latency.",
      "They also faced challenges with their fraud detection system, which required real-time analysis but was bottlenecked by the round-trip to central servers."
    ],
    solution: [
      "Shadw's edge platform provided data residency controls that allowed FinTech Global to process transactions within regulatory boundaries. European transactions stayed in European edge nodes, while Middle Eastern traffic was processed locally.",
      "The fraud detection ML models were deployed to edge locations, enabling real-time analysis without the latency penalty. Shadw's encryption at rest and in transit met PCI-DSS requirements.",
      "Additionally, Shadw's audit logging and compliance reporting features simplified their annual PCI-DSS certification process."
    ],
    implementation: [
      { title: "Geo-fencing", description: "Configured data residency rules ensuring transactions are processed within regulatory boundaries" },
      { title: "Encryption", description: "Implemented end-to-end encryption with HSM-backed key management" },
      { title: "Fraud Detection", description: "Deployed ML models for real-time transaction scoring at the edge" },
      { title: "Audit Trail", description: "Enabled comprehensive logging meeting PCI-DSS audit requirements" }
    ],
    results: [
      { value: "99.999%", label: "Uptime", description: "Five nines availability across all regions" },
      { value: "65ms", label: "Avg Response", description: "Down from 180ms, enabling real-time UX" },
      { value: "100%", label: "Compliance", description: "Passed PCI-DSS audit with zero findings" },
      { value: "40%", label: "Fraud Reduction", description: "Improved detection through edge ML" }
    ],
    quote: "The combination of performance and compliance was something we couldn't achieve with any other platform. Shadw lets us serve customers globally while meeting the strictest regulatory requirements.",
    quoteAuthor: "Hans Mueller",
    quoteRole: "VP Engineering, FinTech Global",
    technologies: ["Zero-Trust Security", "HSM Encryption", "ML Fraud Detection", "Geo-fencing", "Audit Logging"],
    timeline: "12 weeks",
    teamSize: "5 engineers",
    color: "from-cyan-500 to-blue-600"
  },
  "medistream": {
    company: "MediStream",
    logo: "M",
    industry: "Healthcare",
    region: "North America",
    title: "HIPAA-Compliant Video Streaming at Scale",
    subtitle: "Secure telehealth infrastructure serving 2M+ patients with end-to-end encrypted video",
    heroStats: [
      { value: "2M+", label: "Patients Served" },
      { value: "99.9%", label: "Video Quality" },
      { value: "HIPAA", label: "Compliant" },
      { value: "50ms", label: "Stream Latency" }
    ],
    challenge: [
      "MediStream provides telehealth video consultations for healthcare providers across North America. With the rapid growth in remote healthcare, they needed to scale from thousands to millions of concurrent video sessions.",
      "HIPAA compliance required end-to-end encryption and strict access controls, but their WebRTC infrastructure struggled to maintain video quality at scale. Patients experienced buffering and connection drops, impacting care quality.",
      "Their media servers, concentrated in two data centers, couldn't handle peak loads during flu season when consultation requests increased 10x."
    ],
    solution: [
      "Shadw's edge network provided the distributed media relay infrastructure MediStream needed. Video streams were relayed through the nearest edge node, dramatically reducing latency and improving quality.",
      "Shadw's HIPAA-compliant processing ensured that video data was encrypted end-to-end and never stored on edge nodes. The team implemented custom signaling logic using Shadw workers to handle session management.",
      "Auto-scaling capabilities meant the platform could handle 10x traffic spikes without degradation, ensuring reliable service during health emergencies."
    ],
    implementation: [
      { title: "Media Relay", description: "Deployed TURN servers to 30+ edge locations for optimal video routing" },
      { title: "E2E Encryption", description: "Implemented SRTP with per-session keys, meeting HIPAA requirements" },
      { title: "Session Management", description: "Built custom signaling workers for appointment scheduling integration" },
      { title: "Quality Adaptation", description: "Configured adaptive bitrate based on connection quality" }
    ],
    results: [
      { value: "2M+", label: "Patients", description: "Scaled from 100K to 2M+ monthly patients" },
      { value: "99.9%", label: "Quality", description: "HD video quality maintained across sessions" },
      { value: "50ms", label: "Latency", description: "Stream latency enabling natural conversation" },
      { value: "70%", label: "Cost Savings", description: "Compared to previous cloud media server costs" }
    ],
    quote: "Our patients and providers deserve the same quality experience as an in-person visit. Shadw made that possible while keeping us HIPAA compliant. The reliability during our busiest periods has been remarkable.",
    quoteAuthor: "Dr. Jennifer Walsh",
    quoteRole: "CEO, MediStream",
    technologies: ["WebRTC", "HIPAA Compliance", "Real-time Video", "E2E Encryption", "Auto-scaling"],
    timeline: "10 weeks",
    teamSize: "4 engineers",
    color: "from-emerald-500 to-teal-600"
  },
  "gameforge": {
    company: "GameForge Studios",
    logo: "G",
    industry: "Gaming",
    region: "Asia Pacific",
    title: "Real-Time Multiplayer at Global Scale",
    subtitle: "Eliminating lag for players worldwide with edge-deployed game state logic",
    heroStats: [
      { value: "12ms", label: "Avg Latency" },
      { value: "5M+", label: "Active Players" },
      { value: "50+", label: "Edge Locations" },
      { value: "99.95%", label: "Uptime" }
    ],
    challenge: [
      "GameForge Studios was launching a competitive real-time strategy game targeting players across Asia Pacific, Europe, and North America. For competitive gameplay, they needed sub-20ms latency to ensure fair matches.",
      "Their initial architecture used regional game servers, but cross-region play resulted in 150-300ms latency, making the game unplayable for competitive matches. Players were frustrated and engagement metrics suffered.",
      "Additionally, their matchmaking system couldn't account for network topology, often placing players on suboptimal servers."
    ],
    solution: [
      "Shadw's edge computing platform allowed GameForge to deploy lightweight game state validators to 50+ locations. Instead of routing all traffic through regional game servers, authoritative state checks happen at the edge.",
      "The team implemented a novel architecture where edge workers handle input validation and state synchronization, while regional servers manage game logic. This hybrid approach reduced perceived latency by 10x.",
      "Shadw's network intelligence was integrated into the matchmaking system, ensuring players are grouped by network proximity rather than just geographic region."
    ],
    implementation: [
      { title: "State Sync", description: "Deployed delta synchronization workers to all edge locations" },
      { title: "Input Validation", description: "Implemented server-authoritative checks at the edge for cheat prevention" },
      { title: "Matchmaking", description: "Integrated network latency data into player matching algorithms" },
      { title: "Replay System", description: "Built distributed replay capture using edge workers" }
    ],
    results: [
      { value: "12ms", label: "Avg Latency", description: "Down from 150ms+ for cross-region play" },
      { value: "5M+", label: "Active Players", description: "3x growth in player base post-launch" },
      { value: "85%", label: "Retention", description: "Week-1 retention improved significantly" },
      { value: "4.8", label: "Store Rating", description: "Up from 3.2 during beta" }
    ],
    quote: "Latency kills competitive games. With Shadw, our players anywhere in the world get the responsive experience they deserve. Our esports tournaments now include players from every continent competing fairly.",
    quoteAuthor: "Ken Tanaka",
    quoteRole: "Technical Director, GameForge Studios",
    technologies: ["WebSocket", "State Synchronization", "UDP Relay", "Matchmaking", "Anti-cheat"],
    timeline: "14 weeks",
    teamSize: "6 engineers",
    color: "from-orange-500 to-red-600"
  },
  "retailnow": {
    company: "RetailNow",
    logo: "R",
    industry: "E-Commerce",
    region: "Global",
    title: "Scaling Black Friday Traffic 100x",
    subtitle: "Handling 50M concurrent users during peak shopping with zero downtime",
    heroStats: [
      { value: "50M", label: "Concurrent Users" },
      { value: "$2B+", label: "Transactions" },
      { value: "0", label: "Timeouts" },
      { value: "100x", label: "Traffic Spike" }
    ],
    challenge: [
      "RetailNow is one of the largest online marketplaces, with traffic that spikes 100x during Black Friday and holiday sales. Previous years had seen significant outages, resulting in millions in lost revenue and damaged brand reputation.",
      "Their monolithic architecture couldn't scale fast enough to handle the traffic surge. Database connections were exhausted within minutes, and API gateways became bottlenecks.",
      "They needed a solution that could scale instantly without requiring a complete architecture rewrite."
    ],
    solution: [
      "Shadw's edge platform was deployed as a smart caching and routing layer in front of RetailNow's existing infrastructure. Product pages, pricing, and inventory status were cached at the edge with intelligent invalidation.",
      "Edge workers handled cart operations locally, with eventual consistency to the central database. This reduced load on origin servers by 90% during peak traffic.",
      "Shadw's DDoS protection and rate limiting ensured that bot traffic didn't consume resources needed for legitimate shoppers."
    ],
    implementation: [
      { title: "Edge Caching", description: "Cached product catalog and pricing with 5-second TTL and instant invalidation" },
      { title: "Cart Workers", description: "Deployed stateful cart management at the edge with async sync" },
      { title: "Bot Protection", description: "Implemented ML-based bot detection to protect inventory" },
      { title: "Load Shedding", description: "Configured graceful degradation for extreme traffic scenarios" }
    ],
    results: [
      { value: "50M", label: "Concurrent", description: "Handled 50M users with no degradation" },
      { value: "$2B+", label: "Sales", description: "Biggest Black Friday in company history" },
      { value: "0", label: "Outages", description: "First Black Friday with zero downtime" },
      { value: "200ms", label: "Page Load", description: "Consistent performance under load" }
    ],
    quote: "For years, Black Friday was our most stressful day. With Shadw, it's become our most exciting. We broke every sales record while our engineering team actually got to enjoy the holiday.",
    quoteAuthor: "Lisa Chen",
    quoteRole: "CTO, RetailNow",
    technologies: ["Edge Cache", "Auto-scaling", "Bot Protection", "Rate Limiting", "Load Balancing"],
    timeline: "6 weeks",
    teamSize: "4 engineers",
    color: "from-pink-500 to-rose-600"
  },
  "iot-connect": {
    company: "IoT Connect",
    logo: "I",
    industry: "Internet of Things",
    region: "EMEA",
    title: "Processing 1B+ IoT Events Daily",
    subtitle: "Real-time data processing from millions of connected devices at the edge",
    heroStats: [
      { value: "1B+", label: "Daily Events" },
      { value: "5ms", label: "Processing Time" },
      { value: "10M+", label: "Devices" },
      { value: "80%", label: "Bandwidth Savings" }
    ],
    challenge: [
      "IoT Connect manages smart building infrastructure across Europe, with sensors monitoring everything from energy usage to occupancy. Processing millions of sensor readings per minute was overwhelming their cloud infrastructure.",
      "The cost of ingesting all this data into the cloud was unsustainable. More critically, the latency for actionable insights meant they couldn't respond to events in real-time.",
      "They needed to process data at the edge while maintaining a unified view for analytics and reporting."
    ],
    solution: [
      "Shadw edge workers were deployed to process IoT data streams in real-time. Simple aggregations and threshold checks happen at the edge, with only significant events forwarded to the central platform.",
      "This edge-first approach reduced data transfer by 80% while enabling sub-10ms response times for critical alerts. Building automation systems could now respond instantly to occupancy and environmental changes.",
      "Shadw's MQTT integration allowed seamless connection with existing IoT protocols."
    ],
    implementation: [
      { title: "Stream Processing", description: "Deployed windowed aggregation workers for sensor data" },
      { title: "Alert Rules", description: "Implemented real-time threshold monitoring with instant notifications" },
      { title: "Data Routing", description: "Built intelligent forwarding rules to minimize cloud ingestion" },
      { title: "Protocol Bridge", description: "Created MQTT to HTTP bridge for legacy device support" }
    ],
    results: [
      { value: "1B+", label: "Events/Day", description: "Processing at global scale" },
      { value: "5ms", label: "Processing", description: "Real-time response to sensor data" },
      { value: "80%", label: "Cost Savings", description: "Reduced cloud data transfer costs" },
      { value: "10M+", label: "Devices", description: "Supporting massive device fleet" }
    ],
    quote: "Edge processing was a game-changer for our IoT platform. We went from drowning in data to having actionable insights in milliseconds. Our customers can now automate responses that weren't possible before.",
    quoteAuthor: "Thomas Weber",
    quoteRole: "VP Product, IoT Connect",
    technologies: ["MQTT", "Stream Processing", "Time-series", "Edge Analytics", "Protocol Bridge"],
    timeline: "8 weeks",
    teamSize: "3 engineers",
    color: "from-violet-500 to-purple-600"
  },
  "newswave": {
    company: "NewsWave",
    logo: "N",
    industry: "Media & Publishing",
    region: "Global",
    title: "Personalizing Content for 100M Readers",
    subtitle: "Edge-computed recommendations delivering personalized news in under 20ms",
    heroStats: [
      { value: "100M", label: "Monthly Readers" },
      { value: "340%", label: "Engagement Lift" },
      { value: "18ms", label: "Recommendation Time" },
      { value: "45%", label: "Revenue Increase" }
    ],
    challenge: [
      "NewsWave is a digital news platform serving readers across six continents. Their recommendation engine, powered by collaborative filtering, ran in a single cloud region and couldn't deliver personalized feeds quickly enough.",
      "By the time personalized recommendations were computed and delivered, readers had already scrolled past. The 500ms delay was killing engagement and ad revenue.",
      "Scaling the ML infrastructure globally would have cost millions and required significant engineering resources."
    ],
    solution: [
      "Shadw's edge platform enabled NewsWave to deploy lightweight recommendation models directly to edge locations. User preference vectors are cached at the edge, with personalized rankings computed in real-time.",
      "The team implemented a hybrid approach: edge workers handle real-time scoring using cached models, while complex retraining happens centrally and is distributed to edges periodically.",
      "A/B testing at the edge allowed rapid experimentation with recommendation algorithms without impacting performance."
    ],
    implementation: [
      { title: "Model Deployment", description: "Distributed ONNX recommendation models to all edge locations" },
      { title: "User Vectors", description: "Cached user preference embeddings with 1-hour refresh" },
      { title: "Real-time Scoring", description: "Implemented edge-based article ranking for each request" },
      { title: "A/B Testing", description: "Built edge-native experimentation framework" }
    ],
    results: [
      { value: "18ms", label: "Latency", description: "Recommendations delivered instantly" },
      { value: "340%", label: "Engagement", description: "Dramatic increase in article clicks" },
      { value: "45%", label: "Revenue", description: "Ad revenue growth from engagement" },
      { value: "60%", label: "Return Rate", description: "More readers coming back daily" }
    ],
    quote: "Personalization at the speed of thought. That's what Shadw delivered. Our readers now see content they care about the moment they open the app. The impact on engagement and revenue has been transformational.",
    quoteAuthor: "Sarah Martinez",
    quoteRole: "Chief Product Officer, NewsWave",
    technologies: ["ML Inference", "ONNX Runtime", "Personalization", "A/B Testing", "Edge Cache"],
    timeline: "10 weeks",
    teamSize: "4 engineers",
    color: "from-amber-500 to-yellow-600"
  }
}

const relatedStudies = [
  { slug: "streamline-ai", company: "Streamline AI", industry: "AI" },
  { slug: "fintech-global", company: "FinTech Global", industry: "Finance" },
  { slug: "gameforge", company: "GameForge Studios", industry: "Gaming" }
]

export default function CaseStudyPage() {
  const params = useParams()
  const slug = params.slug as string
  const study = allCaseStudies[slug]

  if (!study) {
    return (
      <div className="min-h-screen bg-[#050506] text-white flex items-center justify-center">
        <div className="text-center">
          <h1 className="text-4xl font-bold mb-4">Case Study Not Found</h1>
          <p className="text-gray-400 mb-8">The case study you're looking for doesn't exist.</p>
          <Link href="/case-studies">
            <Button className="bg-white text-black hover:bg-gray-200">
              <ArrowLeft className="w-4 h-4 mr-2" />
              All Case Studies
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
      <div className="fixed left-[-20%] top-[10%] h-[700px] w-[700px] rounded-full bg-indigo-600/10 blur-[150px] pointer-events-none" />
      <div className="fixed right-[-15%] bottom-[10%] h-[600px] w-[600px] rounded-full bg-cyan-500/8 blur-[150px] pointer-events-none" />

      <Navbar />
      <div className="fixed top-0 right-0 p-6">
        <Link href="/case-studies">
          <Button variant="ghost" className="text-gray-400 hover:text-white hover:bg-white/5 rounded-full text-sm h-9 bg-transparent">
            <ArrowLeft className="w-3.5 h-3.5 mr-2" />
            All Studies
          </Button>
        </Link>
      </div>

      <main className="relative z-10">
        {/* Hero */}
        <section className="py-16 px-6 border-b border-gray-800/50">
          <div className="mx-auto max-w-5xl">
            <div className="flex items-center gap-4 mb-6">
              <div className={`w-14 h-14 rounded-2xl bg-gradient-to-br ${study.color} flex items-center justify-center text-2xl font-bold`}>
                {study.logo}
              </div>
              <div>
                <div className="text-xl font-semibold">{study.company}</div>
                <div className="text-sm text-gray-500">{study.industry} - {study.region}</div>
              </div>
            </div>

            <h1 className="text-4xl sm:text-5xl font-bold mb-4 leading-tight">
              {study.title}
            </h1>
            <p className="text-xl text-gray-400 mb-10">
              {study.subtitle}
            </p>

            {/* Hero stats */}
            <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
              {study.heroStats.map((stat, i) => (
                <div key={i} className="p-6 rounded-2xl bg-gradient-to-br from-gray-900/80 to-gray-900/40 border border-gray-800/50 text-center">
                  <div className={`text-3xl font-bold bg-gradient-to-r ${study.color} bg-clip-text text-transparent`}>
                    {stat.value}
                  </div>
                  <div className="text-sm text-gray-500 mt-1">{stat.label}</div>
                </div>
              ))}
            </div>

            {/* Meta info */}
            <div className="flex flex-wrap gap-6 mt-8 pt-8 border-t border-gray-800/50">
              <div className="flex items-center gap-2 text-sm text-gray-400">
                <Clock className="w-4 h-4" />
                <span>Implementation: {study.timeline}</span>
              </div>
              <div className="flex items-center gap-2 text-sm text-gray-400">
                <Users className="w-4 h-4" />
                <span>Team: {study.teamSize}</span>
              </div>
              <div className="flex flex-wrap gap-2 ml-auto">
                {study.technologies.map((tech) => (
                  <span key={tech} className="px-3 py-1 rounded-full bg-gray-800/50 text-gray-400 text-xs">
                    {tech}
                  </span>
                ))}
              </div>
            </div>
          </div>
        </section>

        {/* Challenge */}
        <section className="py-16 px-6">
          <div className="mx-auto max-w-4xl">
            <h2 className="text-2xl font-bold mb-8 flex items-center gap-3">
              <span className="w-10 h-10 rounded-xl bg-red-500/20 flex items-center justify-center">
                <Shield className="w-5 h-5 text-red-400" />
              </span>
              The Challenge
            </h2>
            <div className="space-y-6">
              {study.challenge.map((para, i) => (
                <p key={i} className="text-gray-300 leading-relaxed text-lg">
                  {para}
                </p>
              ))}
            </div>
          </div>
        </section>

        {/* Solution */}
        <section className="py-16 px-6 bg-gradient-to-b from-transparent via-gray-900/20 to-transparent">
          <div className="mx-auto max-w-4xl">
            <h2 className="text-2xl font-bold mb-8 flex items-center gap-3">
              <span className="w-10 h-10 rounded-xl bg-emerald-500/20 flex items-center justify-center">
                <Zap className="w-5 h-5 text-emerald-400" />
              </span>
              The Solution
            </h2>
            <div className="space-y-6">
              {study.solution.map((para, i) => (
                <p key={i} className="text-gray-300 leading-relaxed text-lg">
                  {para}
                </p>
              ))}
            </div>
          </div>
        </section>

        {/* Implementation */}
        <section className="py-16 px-6">
          <div className="mx-auto max-w-5xl">
            <h2 className="text-2xl font-bold mb-8 flex items-center gap-3">
              <span className="w-10 h-10 rounded-xl bg-blue-500/20 flex items-center justify-center">
                <Building2 className="w-5 h-5 text-blue-400" />
              </span>
              Implementation Details
            </h2>
            <div className="grid md:grid-cols-2 gap-6">
              {study.implementation.map((item, i) => (
                <div key={i} className="p-6 rounded-2xl bg-gradient-to-br from-gray-900/80 to-gray-900/40 border border-gray-800/50">
                  <div className="flex items-start gap-3">
                    <CheckCircle2 className="w-5 h-5 text-emerald-400 mt-0.5 flex-shrink-0" />
                    <div>
                      <h3 className="font-semibold mb-2">{item.title}</h3>
                      <p className="text-sm text-gray-400">{item.description}</p>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </section>

        {/* Quote */}
        <section className="py-16 px-6">
          <div className="mx-auto max-w-4xl">
            <div className={`p-10 rounded-3xl bg-gradient-to-br ${study.color} relative overflow-hidden`}>
              <div className="absolute inset-0 bg-black/60" />
              <div className="relative">
                <Quote className="w-12 h-12 text-white/30 mb-6" />
                <blockquote className="text-xl sm:text-2xl font-medium leading-relaxed mb-8">
                  "{study.quote}"
                </blockquote>
                <div className="flex items-center gap-4">
                  <div className="w-12 h-12 rounded-full bg-white/20 flex items-center justify-center text-lg font-bold">
                    {study.quoteAuthor.charAt(0)}
                  </div>
                  <div>
                    <div className="font-semibold">{study.quoteAuthor}</div>
                    <div className="text-sm text-white/70">{study.quoteRole}</div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </section>

        {/* Results */}
        <section className="py-16 px-6 bg-gradient-to-b from-transparent via-gray-900/20 to-transparent">
          <div className="mx-auto max-w-5xl">
            <h2 className="text-2xl font-bold mb-8 flex items-center gap-3">
              <span className="w-10 h-10 rounded-xl bg-purple-500/20 flex items-center justify-center">
                <TrendingUp className="w-5 h-5 text-purple-400" />
              </span>
              Results
            </h2>
            <div className="grid sm:grid-cols-2 lg:grid-cols-4 gap-6">
              {study.results.map((result, i) => (
                <div key={i} className="p-6 rounded-2xl bg-gradient-to-br from-gray-900/80 to-gray-900/40 border border-gray-800/50">
                  <div className={`text-3xl font-bold bg-gradient-to-r ${study.color} bg-clip-text text-transparent mb-1`}>
                    {result.value}
                  </div>
                  <div className="font-medium mb-2">{result.label}</div>
                  <p className="text-sm text-gray-500">{result.description}</p>
                </div>
              ))}
            </div>
          </div>
        </section>

        {/* CTA */}
        <section className="py-16 px-6">
          <div className="mx-auto max-w-3xl text-center">
            <h2 className="text-3xl font-bold mb-4">Ready to Transform Your Infrastructure?</h2>
            <p className="text-gray-400 mb-8">
              Join hundreds of companies using Shadw to deliver faster, more reliable experiences.
            </p>
            <div className="flex flex-col sm:flex-row gap-4 justify-center">
              <Link href="/demo">
                <Button className="bg-white text-black hover:bg-gray-200 rounded-full px-8 h-12">
                  See Live Demo
                </Button>
              </Link>
              <Link href="/pricing">
                <Button variant="outline" className="border-gray-700 text-white hover:bg-white/5 rounded-full px-8 h-12 bg-transparent">
                  View Pricing
                </Button>
              </Link>
            </div>
          </div>
        </section>

        {/* Related */}
        <section className="py-16 px-6 border-t border-gray-800/50">
          <div className="mx-auto max-w-5xl">
            <h2 className="text-2xl font-bold mb-8">More Success Stories</h2>
            <div className="grid md:grid-cols-3 gap-6">
              {relatedStudies.filter(s => s.slug !== slug).map((related) => (
                <Link
                  key={related.slug}
                  href={`/case-studies/${related.slug}`}
                  className="group p-6 rounded-2xl bg-gradient-to-br from-gray-900/80 to-gray-900/40 border border-gray-800/50 hover:border-gray-700/50 transition-all"
                >
                  <span className="text-xs text-purple-400 font-medium">{related.industry}</span>
                  <h3 className="mt-2 font-semibold group-hover:text-purple-300 transition-colors">
                    {related.company}
                  </h3>
                  <div className="mt-4 text-sm text-gray-500 flex items-center gap-1 group-hover:text-gray-400 transition-colors">
                    Read story{" "}
                    <ArrowLeft className="w-3 h-3" />
                  </div>
                </Link>
              ))}
            </div>
          </div>
        </section>
      </main>

      {/* Footer */}
      <footer className="relative z-10 border-t border-gray-800/50">
        <div className="mx-auto max-w-7xl px-6 py-12">
          <div className="flex flex-col md:flex-row items-center justify-between gap-4">
            <div className="text-sm text-gray-500">
              2026 Shadw. All rights reserved.
            </div>
            <div className="flex items-center gap-6">
              <Link href="/case-studies" className="text-sm text-gray-500 hover:text-white transition-colors">Case Studies</Link>
              <Link href="/docs" className="text-sm text-gray-500 hover:text-white transition-colors">Docs</Link>
              <Link href="/" className="text-sm text-gray-500 hover:text-white transition-colors">Home</Link>
            </div>
          </div>
        </div>
      </footer>
    </div>
  )
}

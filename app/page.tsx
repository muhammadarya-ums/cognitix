"use client";

import { useEffect, useRef, useState } from "react";
import Image from "next/image";
import {
  AnimatePresence,
  MotionConfig,
  motion,
} from "framer-motion";
import {
  ArrowUpRight,
  Boxes,
  Check,
  CircuitBoard,
  Code2,
  Copy,
  CornerDownLeft,
  Cpu,
  Globe,
  Loader2,
  LogIn,
  MessageSquare,
  Send,
  Sparkles,
  Terminal,
  X,
} from "lucide-react";

const SITE = {
  brand: "Cognitix Space",
  nav: [
    { label: "Tentang", href: "#about" },
    { label: "Portofolio", href: "#work" },
    { label: "Tim", href: "#team" },
    { label: "Portal Klien", href: "#portal" },
  ],
  techTicker: [
    "Next.js",
    "Supabase pgvector",
    "ESP32-S3 Firmware",
    "PyTorch Models",
    "Tailwind CSS v4",
    "MQTT Pipelines",
    "Golang Microservices",
    "Vercel Edge Network",
    "FastAPI",
  ],
  capabilities: [
    {
      icon: Cpu,
      title: "Implementasi AI",
      body: "Sistem retrieval, computer vision, dan model serving yang dibangun untuk menangani trafik skala produksi, bukan sekadar demo.",
      tag: "PyTorch & Gemini API",
    },
    {
      icon: CircuitBoard,
      title: "Perangkat Terhubung (IoT)",
      body: "Firmware, pipeline telemetri, dan dashboard terpusat — dari prototipe ESP32 hingga klaster data server.",
      tag: "FreeRTOS & MQTT",
    },
    {
      icon: Code2,
      title: "Platform Full-stack",
      body: "Dikembangkan end-to-end, di-deploy di edge, diserahkan lengkap dengan runbook dan migrasi yang benar-benar lo butuhin.",
      tag: "Next.js & Supabase",
    },
  ],
  projects: [
    {
      name: "PostuRa",
      kicker: "Wearable IoT System",
      summary:
        "Perangkat wearable pengoreksi postur yang mengirimkan data gerak 9-axis ke aplikasi pelatih secara real-time.",
      stack: ["ESP32", "MQTT", "Next.js", "TimescaleDB"],
      image: "/placeholder.svg?height=720&width=1080",
      metric: "Latency < 12ms",
    },
    {
      name: "Lentera",
      kicker: "AI Knowledge Platform",
      summary:
        "Platform knowledge-base berbasis RAG untuk institusi keuangan regional, melayani 40 ribu query internal per bulan.",
      stack: ["Next.js", "Supabase", "pgvector", "LangGraph"],
      image: "/placeholder.svg?height=720&width=1080",
      metric: "40k Req / Month",
    },
    {
      name: "SkinNET Bio",
      kicker: "Clinical Vision AI",
      summary:
        "Model triase dermatologi dengan rekam jejak audit yang dapat dibaca klinisi, dikemas dalam antarmuka khusus tablet.",
      stack: ["PyTorch", "FastAPI", "ONNX", "React"],
      image: "/placeholder.svg?height=720&width=1080",
      metric: "98.4% Precision",
    },
  ],
  team: [
    {
      name: "Muhammad Arya Putra Rhiswanto",
      role: "Founder & Principal Architect",
      image: "/placeholder.svg?height=800&width=600",
      badge: "Full-Stack & AI",
    },
    {
      name: "Siti Nur Haliza",
      role: "Head of Machine Learning",
      image: "/placeholder.svg?height=800&width=600",
      badge: "Computer Vision",
    },
    {
      name: "Muhammad Fazel Rabbani",
      role: "Lead IoT & Embedded Engineer",
      image: "/placeholder.svg?height=800&width=600",
      badge: "IoT & Firmware",
    },
    {
      name: "Syahrul Romadhon",
      role: "Creative Media & Visual Design Lead",
      image: "/placeholder.svg?height=800&width=600",
      badge: "UI/UX & Product",
    },
    {
      name: "Dinar",
      role: "Lead Web & Platform Engineering",
      image: "/placeholder.svg?height=800&width=600",
      badge: "Web & Platform",
    },
    {
      name: "Wildan Silki Sawabiqil Abroor",
      role: "Lead Mobile & App Engineering",
      image: "/placeholder.svg?height=800&width=600",
      badge: "Mobile Apps",
    },
    {
      name: "Nayla",
      role: "Lead Research & Academic Writing",
      image: "/placeholder.svg?height=800&width=600",
      badge: "Research",
    },
    {
      name: "Abdullah Khoirul Anam",
      role: "Lead Hardware Repair & Maintenance",
      image: "/placeholder.svg?height=800&width=600",
      badge: "Hardware",
    },
  ],
};

const EASE = [0.16, 1, 0.3, 1] as const;
const SPRING = { type: "spring" as const, stiffness: 420, damping: 38, mass: 0.9 };

type IslandMode = "idle" | "expanded";

function DynamicIsland() {
  const [islandMode, setIslandMode] = useState<IslandMode>("idle");
  const [brief, setBrief] = useState("");
  const [status, setStatus] = useState<"idle" | "sending" | "sent">("idle");
  const textareaRef = useRef<HTMLTextAreaElement>(null);

  useEffect(() => {
    if (islandMode === "expanded") {
      const t = setTimeout(() => textareaRef.current?.focus(), 220);
      return () => clearTimeout(t);
    } else {
      const t = setTimeout(() => setStatus("idle"), 200);
      return () => clearTimeout(t);
    }
  }, [islandMode]);

  useEffect(() => {
    const onKey = (e: KeyboardEvent) => {
      if (e.key === "Escape") setIslandMode("idle");
    };
    window.addEventListener("keydown", onKey);
    return () => window.removeEventListener("keydown", onKey);
  }, []);

  function submit() {
    if (!brief.trim() || status !== "idle") return;
    setStatus("sending");
    setTimeout(() => {
      setStatus("sent");
      setBrief("");
      setTimeout(() => setIslandMode("idle"), 1400);
    }, 900);
  }

  return (
    <div className="pointer-events-none fixed inset-x-0 top-4 z-50 flex justify-center px-4 sm:top-6">
      <motion.div
        layout
        transition={SPRING}
        style={{ borderRadius: islandMode === "idle" ? 999 : 24 }}
        className="glass-panel pointer-events-auto overflow-hidden border border-white/10 bg-zinc-950/80 backdrop-blur-md"
      >
        <AnimatePresence mode="wait" initial={false}>
          {islandMode === "idle" ? (
            <motion.div
              key="idle"
              layout="position"
              initial={{ opacity: 0 }}
              animate={{ opacity: 1, transition: { delay: 0.08 } }}
              exit={{ opacity: 0, transition: { duration: 0.1 } }}
              className="flex items-center gap-1 py-2 pl-4 pr-2 sm:gap-2 sm:pl-5"
            >
              <a
                href="#top"
                className="flex items-center gap-2 pr-1 text-sm font-medium tracking-tight text-zinc-100"
              >
                <Boxes className="h-4 w-4 text-zinc-100" strokeWidth={1.75} />
                <span className="hidden sm:inline">Cognitix</span>
              </a>

              <span className="mx-1 hidden h-4 w-px bg-white/10 sm:block" />

              <nav className="hidden items-center md:flex">
                {SITE.nav.map((item) => (
                  <a
                    key={item.label}
                    href={item.href}
                    className="rounded-full px-3 py-1.5 text-sm text-zinc-400 transition-colors hover:bg-white/5 hover:text-zinc-100"
                  >
                    {item.label}
                  </a>
                ))}
              </nav>

              <button
                onClick={() => setIslandMode("expanded")}
                className="ml-1 flex items-center gap-1.5 rounded-full bg-zinc-100 px-3.5 py-1.5 text-sm font-medium text-zinc-900 transition-colors hover:bg-white"
              >
                <MessageSquare className="h-3.5 w-3.5" strokeWidth={1.75} />
                Konsultasi cepat
              </button>
            </motion.div>
          ) : (
            <motion.div
              key="expanded"
              layout="position"
              initial={{ opacity: 0, y: -6 }}
              animate={{ opacity: 1, y: 0, transition: { delay: 0.1 } }}
              exit={{ opacity: 0, transition: { duration: 0.1 } }}
              className="flex h-80 w-[min(480px,calc(100vw-2rem))] flex-col p-5"
            >
              <div className="flex items-start justify-between">
                <div>
                  <p className="text-sm font-medium tracking-tight text-zinc-100">
                    Ceritain apa yang lagi lo bangun, maybe lo butuhin?
                  </p>
                  <p className="mt-1 text-xs text-zinc-500">
                    Arsitek kami membaca setiap pesan. Biasanya dibalas dalam kurun waktu 24 jam.
                  </p>
                </div>
                <button
                  onClick={() => setIslandMode("idle")}
                  aria-label="Tutup form konsultasi"
                  className="rounded-full p-1.5 text-zinc-500 transition-colors hover:bg-white/5 hover:text-zinc-200"
                >
                  <X className="h-4 w-4" strokeWidth={1.75} />
                </button>
              </div>

              <textarea
                ref={textareaRef}
                value={brief}
                onChange={(e) => setBrief(e.target.value)}
                onKeyDown={(e) => {
                  if (e.key === "Enter" && (e.metaKey || e.ctrlKey)) submit();
                }}
                placeholder="Jaringan 2.000 sensor berjalan lambat, dan butuh arsitektur yang bisa mengolah datanya secara real-time..."
                className="mt-4 flex-1 resize-none rounded-xl border border-white/10 bg-black/30 p-3.5 text-sm leading-relaxed text-zinc-200 placeholder:text-zinc-600 focus:border-zinc-500/50 focus:outline-none"
              />

              <div className="mt-3 flex items-center justify-between">
                <span className="flex items-center gap-1.5 text-xs text-zinc-600">
                  <CornerDownLeft className="h-3 w-3" strokeWidth={1.75} />
                  ⌘ + Enter untuk mengirim
                </span>
                <button
                  onClick={submit}
                  disabled={!brief.trim() || status !== "idle"}
                  className="flex items-center gap-2 rounded-lg bg-zinc-100 px-4 py-2 text-sm font-medium text-zinc-950 transition-colors hover:bg-white disabled:opacity-40"
                >
                  {status === "sending" && (
                    <Loader2 className="h-3.5 w-3.5 animate-spin" strokeWidth={2} />
                  )}
                  {status === "sent" && <Check className="h-3.5 w-3.5" strokeWidth={2.5} />}
                  {status === "idle" && <Send className="h-3.5 w-3.5" strokeWidth={2} />}
                  {status === "sent" ? "Terkirim" : status === "sending" ? "Mengirim" : "Kirim brief"}
                </button>
              </div>
            </motion.div>
          )}
        </AnimatePresence>
      </motion.div>
    </div>
  );
}

function Hero() {
  const [copied, setCopied] = useState(false);
  const [activeTab, setActiveTab] = useState<"iot" | "ai" | "web">("iot");

  const copyCmd = () => {
    navigator.clipboard.writeText("npx cognitix@latest init");
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
  };

  return (
    <section
      id="top"
      className="relative flex min-h-screen flex-col items-center justify-center overflow-hidden px-6 pt-32 pb-20"
    >
      {/* Background Grids & Ambient Glow */}
      <div aria-hidden className="pointer-events-none absolute inset-0 flex items-center justify-center">
        <div className="absolute top-1/3 left-1/2 -translate-x-1/2 -translate-y-1/2 w-175 h-112.5 bg-zinc-400/10 blur-[140px] rounded-full" />
        <div className="absolute inset-0 bg-[linear-gradient(to_right,#ffffff05_1px,transparent_1px),linear-gradient(to_bottom,#ffffff05_1px,transparent_1px)] bg-size-[4rem_4rem] mask-[radial-gradient(ellipse_60%_50%_at_50%_50%,#000_70%,transparent_100%)]" />
      </div>

      {/* Floating System Status Badge */}
      <motion.div
        initial={{ opacity: 0, y: -20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.8, ease: EASE }}
        className="mb-6 flex items-center gap-2 rounded-full border border-white/10 bg-white/5 px-3.5 py-1.5 backdrop-blur-md"
      >
        <span className="relative flex h-2 w-2">
          <span className="absolute inline-flex h-full w-full animate-ping rounded-full bg-emerald-400 opacity-75" />
          <span className="relative inline-flex h-2 w-2 rounded-full bg-emerald-500" />
        </span>
        <span className="text-xs font-mono text-zinc-300">All Systems Nominal</span>
        <span className="text-zinc-600">•</span>
        <span className="text-xs font-mono text-zinc-500">Latency 14ms</span>
      </motion.div>

      {/* Main Hero Header */}
      <motion.div
        initial={{ opacity: 0, y: 24 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.9, ease: EASE }}
        className="relative z-10 flex max-w-4xl flex-col items-center text-center"
      >
        <h1 className="text-balance text-4xl font-semibold leading-[1.08] tracking-tighter text-zinc-100 sm:text-6xl md:text-7xl">
          Eksplorasi AI, IoT, & Web <br />
          <span className="bg-linear-to-r from-zinc-200 via-zinc-400 to-zinc-600 bg-clip-text text-transparent">
            Tanpa AI Slop. Murni Rekayasa.
          </span>
        </h1>

        <p className="mt-6 max-w-2xl text-pretty text-base leading-relaxed text-zinc-400 sm:text-lg">
          Dari prototipe hardware mahasiswa, platform riset kampus, sampai arsitektur sistem enterprise anti-lag.
          Kami eksekusi proyek lo dari draf dasar sampai <span className="text-zinc-200 font-medium">production-ready</span>.
        </p>

        {/* Action Buttons & CLI Pill */}
        <div className="mt-8 flex flex-col items-center gap-4 sm:flex-row">
          <a
            href="#work"
            className="group flex items-center justify-center gap-2 rounded-full bg-zinc-100 px-7 py-3.5 text-sm font-semibold text-zinc-950 transition-all hover:bg-white hover:scale-105 active:scale-95"
          >
            Liat Garapan Kita
            <ArrowUpRight
              className="h-4 w-4 transition-transform duration-300 group-hover:translate-x-1 group-hover:-translate-y-1"
              strokeWidth={2.5}
            />
          </a>

          {/* Copyable CLI Badge */}
          <button
            onClick={copyCmd}
            className="glass-panel flex items-center gap-3 rounded-full border border-white/10 bg-black/40 px-5 py-3.5 font-mono text-xs text-zinc-300 transition-all hover:border-white/20 active:scale-95"
          >
            <Terminal className="h-3.5 w-3.5 text-zinc-500" />
            <span>npx cognitix@latest init</span>
            {copied ? (
              <Check className="h-3.5 w-3.5 text-emerald-400" />
            ) : (
              <Copy className="h-3.5 w-3.5 text-zinc-500 hover:text-zinc-300" />
            )}
          </button>
        </div>
      </motion.div>

      {/* Interactive Architecture & Terminal Mockup */}
      <motion.div
        initial={{ opacity: 0, y: 40 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 1, ease: EASE, delay: 0.2 }}
        className="glass-panel mt-14 w-full max-w-3xl overflow-hidden rounded-2xl border border-white/10 bg-zinc-950/90 shadow-2xl backdrop-blur-xl"
      >
        {/* Terminal Top Bar */}
        <div className="flex items-center justify-between border-b border-white/10 bg-white/2 px-4 py-3">
          <div className="flex items-center gap-2">
            <div className="h-3 w-3 rounded-full bg-zinc-800" />
            <div className="h-3 w-3 rounded-full bg-zinc-800" />
            <div className="h-3 w-3 rounded-full bg-zinc-800" />
            <span className="ml-2 font-mono text-xs text-zinc-500">cognitix-space-telemetry.log</span>
          </div>

          {/* Tab Switcher */}
          <div className="flex rounded-lg border border-white/10 bg-black/50 p-1">
            <button
              onClick={() => setActiveTab("iot")}
              className={`flex items-center gap-1.5 rounded-md px-3 py-1 text-xs font-medium transition ${
                activeTab === "iot" ? "bg-white/10 text-zinc-100" : "text-zinc-500 hover:text-zinc-300"
              }`}
            >
              <CircuitBoard className="h-3 w-3" /> IoT Stream
            </button>
            <button
              onClick={() => setActiveTab("ai")}
              className={`flex items-center gap-1.5 rounded-md px-3 py-1 text-xs font-medium transition ${
                activeTab === "ai" ? "bg-white/10 text-zinc-100" : "text-zinc-500 hover:text-zinc-300"
              }`}
            >
              <Cpu className="h-3 w-3" /> RAG Pipeline
            </button>
            <button
              onClick={() => setActiveTab("web")}
              className={`flex items-center gap-1.5 rounded-md px-3 py-1 text-xs font-medium transition ${
                activeTab === "web" ? "bg-white/10 text-zinc-100" : "text-zinc-500 hover:text-zinc-300"
              }`}
            >
              <Globe className="h-3 w-3" /> Edge App
            </button>
          </div>
        </div>

        {/* Terminal Content Box */}
        <div className="p-5 font-mono text-xs leading-relaxed">
          {activeTab === "iot" && (
            <div className="space-y-1.5 text-zinc-400">
              <p className="text-zinc-600">{"// ESP32-S3 Multi-sensor Telemetry Loop"}</p>
              <p><span className="text-emerald-400">[MQTT]</span> Connected to broker.cognitix.space:8883 (TLS 1.3)</p>
              <p><span className="text-cyan-400">[SENSOR]</span> MPU6050 9-Axis Gyro Read: <span className="text-zinc-200">&#123; pitch: -1.24, roll: 0.08, yaw: 89.2 &#125;</span></p>
              <p><span className="text-purple-400">[TIMESCALEDB]</span> Inserted batch 128 rows in 2.4ms</p>
            </div>
          )}
          {activeTab === "ai" && (
            <div className="space-y-1.5 text-zinc-400">
              <p className="text-zinc-600">{"// Supabase pgvector + Gemini Embeddings Retrieval"}</p>
              <p><span className="text-cyan-400">[EMBEDDING]</span> Text chunk embedded via Gemini API (768 dim)</p>
              <p><span className="text-emerald-400">[COSINE]</span> Top match: doc_id #49102 (Similarity: 0.9412)</p>
              <p><span className="text-purple-400">[STREAM]</span> Streaming answer tokens to client (Latency: 18ms)...</p>
            </div>
          )}
          {activeTab === "web" && (
            <div className="space-y-1.5 text-zinc-400">
              <p className="text-zinc-600">{"// Next.js App Router Edge Deployment"}</p>
              <p><span className="text-emerald-400">[BUILD]</span> Dynamic Route /portal rendered statically with ISR</p>
              <p><span className="text-cyan-400">[AUTH]</span> Supabase RLS Policy verified user role: <span className="text-zinc-200">&apos;enterprise_client&apos;</span></p>
              <p><span className="text-purple-400">[VERCEL]</span> Response served from CGK (Jakarta Edge) in 9ms</p>
            </div>
          )}
        </div>
      </motion.div>
    </section>
  );
}

function TechTicker() {
  return (
    <div className="relative w-full overflow-hidden border-y border-white/10 bg-black/40 py-4 backdrop-blur-sm">
      <div className="pointer-events-none absolute inset-y-0 left-0 w-24 bg-linear-to-r from-zinc-950 to-transparent z-10" />
      <div className="pointer-events-none absolute inset-y-0 right-0 w-24 bg-linear-to-l from-zinc-950 to-transparent z-10" />
      
      <motion.div
        animate={{ x: ["0%", "-50%"] }}
        transition={{ duration: 25, repeat: Infinity, ease: "linear" }}
        className="flex w-max items-center gap-8 whitespace-nowrap"
      >
        {[...SITE.techTicker, ...SITE.techTicker].map((tech, index) => (
          <div key={index} className="flex items-center gap-3 text-xs font-mono tracking-wider text-zinc-400">
            <span className="h-1.5 w-1.5 rounded-full bg-zinc-600" />
            <span>{tech}</span>
          </div>
        ))}
      </motion.div>
    </div>
  );
}

function Capabilities() {
  return (
    <section id="about" className="relative mx-auto max-w-6xl px-6 py-24 md:py-32">
      <div className="mb-12">
        <span className="text-xs font-mono uppercase tracking-widest text-zinc-500">Core Expertise</span>
        <h2 className="mt-2 text-balance text-3xl font-medium tracking-tighter text-zinc-100 sm:text-4xl">
          Arsitektur kuat, tanpa eksperimen bodong.
        </h2>
      </div>

      <motion.div
        initial={{ opacity: 0, y: 28 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true, margin: "-120px" }}
        transition={{ duration: 0.7, ease: EASE }}
        className="glass-panel grid grid-cols-1 gap-px overflow-hidden rounded-2xl md:grid-cols-3 border border-white/10"
      >
        {SITE.capabilities.map((cap, i) => (
          <div
            key={cap.title}
            className={`p-8 md:p-10 flex flex-col justify-between ${
              i > 0 ? "border-t border-white/5 md:border-l md:border-t-0" : ""
            }`}
          >
            <div>
              <div className="flex items-center justify-between">
                <cap.icon className="h-5 w-5 text-zinc-200" strokeWidth={1.5} />
                <span className="rounded-full border border-white/10 bg-white/5 px-2.5 py-0.5 font-mono text-[10px] text-zinc-400">
                  {cap.tag}
                </span>
              </div>
              <h3 className="mt-6 text-lg font-medium tracking-tight text-zinc-100">
                {cap.title}
              </h3>
              <p className="mt-2.5 text-sm leading-relaxed text-zinc-400">{cap.body}</p>
            </div>
          </div>
        ))}
      </motion.div>
    </section>
  );
}

function Work() {
  return (
    <section id="work" className="relative mx-auto max-w-6xl px-6 py-24 md:py-32">
      <div className="mb-14 flex flex-col gap-4 md:mb-20 md:flex-row md:items-end md:justify-between">
        <div>
          <span className="text-xs font-mono uppercase tracking-widest text-zinc-500">Selected Work</span>
          <h2 className="mt-2 max-w-md text-balance text-3xl font-medium tracking-tighter text-zinc-100 sm:text-4xl md:text-5xl">
            Karya yang rilis dan stabil di produksi
          </h2>
        </div>
        <p className="max-w-sm text-sm leading-relaxed text-zinc-400">
          Dokumentasi teknis terperinci, repositori code, serta arsitektur backend lengkap disiapkan transparan.
        </p>
      </div>

      <div className="grid grid-cols-1 gap-6 md:grid-cols-2 lg:grid-cols-3">
        {SITE.projects.map((project, i) => (
          <motion.article
            key={project.name}
            initial={{ opacity: 0, y: 32 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, margin: "-80px" }}
            transition={{ duration: 0.6, ease: EASE, delay: i * 0.08 }}
            className="glass-panel glass-panel-hover group flex flex-col overflow-hidden rounded-2xl border border-white/10"
          >
            <div className="relative aspect-16/10 overflow-hidden bg-zinc-900">
              <Image
                src={project.image || "/placeholder.svg"}
                alt={`Antarmuka ${project.name}`}
                fill
                className="object-cover opacity-70 grayscale transition-all duration-700 ease-out group-hover:scale-[1.03] group-hover:opacity-100 group-hover:grayscale-0"
              />
              <div className="absolute inset-0 bg-linear-to-t from-zinc-950 via-zinc-950/20 to-transparent" />
              
              {/* Floating Metric Badge */}
              <div className="absolute top-3 right-3 rounded-full border border-white/10 bg-black/60 px-3 py-1 font-mono text-[10px] text-emerald-400 backdrop-blur-md">
                {project.metric}
              </div>
            </div>

            <div className="flex flex-1 flex-col p-6">
              <div className="flex items-start justify-between gap-3">
                <div>
                  <h3 className="text-lg font-medium tracking-tight text-zinc-100">
                    {project.name}
                  </h3>
                  <p className="mt-0.5 text-xs text-zinc-500">{project.kicker}</p>
                </div>
                <ArrowUpRight
                  className="h-4 w-4 shrink-0 text-zinc-600 transition-colors duration-300 group-hover:text-zinc-200"
                  strokeWidth={1.75}
                />
              </div>

              <p className="mt-4 flex-1 text-sm leading-relaxed text-zinc-400">
                {project.summary}
              </p>

              <div className="mt-6 flex flex-wrap gap-1.5">
                {project.stack.map((tech) => (
                  <span
                    key={tech}
                    className="rounded-md border border-white/10 bg-white/5 px-2.5 py-1 font-mono text-[11px] text-zinc-400"
                  >
                    {tech}
                  </span>
                ))}
              </div>
            </div>
          </motion.article>
        ))}
      </div>
    </section>
  );
}

const teamContainer = {
  hidden: {},
  visible: { transition: { staggerChildren: 0.12, delayChildren: 0.05 } },
};

const teamCard = {
  hidden: { opacity: 0, y: 50, rotateX: 14, scale: 0.97 },
  visible: {
    opacity: 1,
    y: 0,
    rotateX: 0,
    scale: 1,
    transition: { duration: 0.75, ease: EASE },
  },
};

function Team() {
  return (
    <section id="team" className="relative mx-auto max-w-6xl px-6 py-24 md:py-32">
      <div className="mb-14 max-w-lg md:mb-20">
        <span className="text-xs font-mono uppercase tracking-widest text-zinc-500">Core Engineers</span>
        <h2 className="mt-2 text-balance text-3xl font-medium tracking-tighter text-zinc-100 sm:text-4xl md:text-5xl">
          Tim di balik layar
        </h2>
        <p className="mt-4 text-sm leading-relaxed text-zinc-400">
          Ramping secara sengaja. Engineer yang merancang sistem lo di awal adalah engineer yang sama yang akan menulis kodenya.
        </p>
      </div>

      <motion.div
        variants={teamContainer}
        initial="hidden"
        whileInView="visible"
        viewport={{ once: true, margin: "-100px" }}
        style={{ perspective: 1000 }}
        className="no-scrollbar -mx-6 flex snap-x snap-mandatory gap-5 overflow-x-auto px-6 pb-4 lg:mx-0 lg:grid lg:grid-cols-4 lg:gap-y-8 lg:overflow-visible lg:px-0"
      >
        {SITE.team.map((member) => (
          <motion.div
            key={member.name}
            variants={teamCard}
            style={{ transformStyle: "preserve-3d" }}
            whileHover={{ y: -6, rotateY: 3 }}
            transition={{ duration: 0.4, ease: EASE }}
            className="group relative h-96 w-72 shrink-0 snap-center overflow-hidden rounded-2xl border border-white/10 bg-zinc-900 lg:w-full"
          >
            <Image
              src={member.image || "/placeholder.svg"}
              alt={member.name}
              fill
              className="object-cover grayscale transition-all duration-700 ease-out group-hover:scale-[1.04] group-hover:grayscale-0"
            />
            <div className="absolute inset-x-0 bottom-0 h-1/2 bg-linear-to-t from-zinc-950 via-zinc-950/80 to-transparent" />
            
            <div className="glass-panel absolute inset-x-3 bottom-3 rounded-xl px-4 py-3.5 border-white/10 backdrop-blur-md">
              <div className="flex items-center justify-between">
                <p className="text-sm font-medium leading-snug tracking-tight text-zinc-100">
                  {member.name}
                </p>
              </div>
              <p className="mt-0.5 text-xs text-zinc-400">{member.role}</p>
              <span className="mt-2 inline-block rounded-md bg-white/10 px-2 py-0.5 font-mono text-[10px] text-zinc-300">
                {member.badge}
              </span>
            </div>
          </motion.div>
        ))}
      </motion.div>
    </section>
  );
}

function PortalAndFooter() {
  return (
    <footer id="portal" className="relative mx-auto max-w-6xl px-6 pb-16 pt-12 md:pt-20">
      <motion.div
        initial={{ opacity: 0, y: 28 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true, margin: "-100px" }}
        transition={{ duration: 0.7, ease: EASE }}
        className="glass-panel relative overflow-hidden rounded-3xl px-8 py-14 text-center md:px-16 md:py-20 border border-white/10"
      >
        <h2 className="relative text-balance text-2xl font-medium tracking-tighter text-zinc-100 sm:text-4xl">
          Sudah bekerjasama dengan kami?
        </h2>
        <p className="relative mx-auto mt-3 max-w-md text-sm leading-relaxed text-zinc-400">
          Riwayat deployment, laporan insiden, dan invoice tagihan tersedia di portal klien lo.
        </p>
        <div className="relative mt-8 flex flex-col items-stretch justify-center gap-3 sm:flex-row">
          <a
            href="#"
            className="flex items-center justify-center gap-2 rounded-lg bg-zinc-100 px-6 py-3 text-sm font-medium text-zinc-950 transition-colors hover:bg-white"
          >
            <LogIn className="h-4 w-4" strokeWidth={2} />
            Buka portal klien
          </a>
          <a
            href="mailto:hello@cognitix.space"
            className="glass-panel glass-panel-hover flex items-center justify-center rounded-lg px-6 py-3 text-sm font-medium text-zinc-200 border-white/10"
          >
            Mulai proyek
          </a>
        </div>
      </motion.div>

      <div className="mt-16 flex flex-col items-center justify-between gap-4 border-t border-white/10 pt-8 sm:flex-row">
        <span className="flex items-center gap-2 text-sm text-zinc-400">
          <Boxes className="h-4 w-4 text-zinc-100" strokeWidth={1.75} />
          {SITE.brand}
        </span>
        <nav className="flex gap-6">
          {SITE.nav.map((item) => (
            <a
              key={item.label}
              href={item.href}
              className="text-sm text-zinc-500 transition-colors hover:text-zinc-200"
            >
              {item.label}
            </a>
          ))}
        </nav>
        <span className="text-xs font-mono text-zinc-600">
          © {new Date().getFullYear()} Cognitix Space
        </span>
      </div>
    </footer>
  );
}

type ChatMessage = { from: "ai" | "user"; text: string };

const SEED_CHAT: ChatMessage[] = [
  {
    from: "ai",
    text: "Halo, ini AI dari Cognitix. Saya bisa menjelaskan tech stack kami, proyek sebelumnya, atau estimasi timeline. Ada yang ingin ditanyakan?",
  },
];

const CANNED_REPLY =
  "Pertanyaan yang bagus. Untuk spesifikasi tersebut, kami biasanya menjadwalkan sprint arsitektur selama dua minggu di awal — saya akan menjadwalkan Lead Architect kami untuk membahas detail teknisnya lebih lanjut.";

function AssistantWidget() {
  const [open, setOpen] = useState(false);
  const [messages, setMessages] = useState<ChatMessage[]>(SEED_CHAT);
  const [draft, setDraft] = useState("");
  const [thinking, setThinking] = useState(false);
  const scrollRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    scrollRef.current?.scrollTo({ top: scrollRef.current.scrollHeight, behavior: "smooth" });
  }, [messages, thinking]);

  function send() {
    const text = draft.trim();
    if (!text || thinking) return;
    setMessages((m) => [...m, { from: "user", text }]);
    setDraft("");
    setThinking(true);
    setTimeout(() => {
      setMessages((m) => [...m, { from: "ai", text: CANNED_REPLY }]);
      setThinking(false);
    }, 1100);
  }

  return (
    <div className="fixed bottom-5 right-5 z-50 flex flex-col items-end sm:bottom-7 sm:right-7">
      <AnimatePresence>
        {open && (
          <motion.div
            initial={{ opacity: 0, y: 16, scale: 0.96 }}
            animate={{ opacity: 1, y: 0, scale: 1 }}
            exit={{ opacity: 0, y: 16, scale: 0.96 }}
            transition={{ duration: 0.28, ease: EASE }}
            style={{ transformOrigin: "bottom right" }}
            className="glass-panel mb-3 flex h-110 w-[min(370px,calc(100vw-2.5rem))] flex-col overflow-hidden rounded-2xl border border-white/10 bg-zinc-950/90 backdrop-blur-xl"
          >
            <div className="flex items-center justify-between border-b border-white/10 px-5 py-4">
              <div className="flex items-center gap-2.5">
                <span className="relative flex h-2 w-2">
                  <span className="absolute inline-flex h-full w-full animate-ping rounded-full bg-zinc-400 opacity-60" />
                  <span className="relative inline-flex h-2 w-2 rounded-full bg-zinc-300" />
                </span>
                <div>
                  <p className="text-sm font-medium tracking-tight text-zinc-100">
                    Cognitix AI
                  </p>
                  <p className="text-[11px] text-zinc-500">Balasan instan</p>
                </div>
              </div>
              <button
                onClick={() => setOpen(false)}
                aria-label="Tutup asisten"
                className="rounded-full p-1.5 text-zinc-500 transition-colors hover:bg-white/5 hover:text-zinc-200"
              >
                <X className="h-4 w-4" strokeWidth={1.75} />
              </button>
            </div>

            <div ref={scrollRef} className="no-scrollbar flex-1 space-y-3 overflow-y-auto px-5 py-5">
              {messages.map((m, i) => (
                <motion.div
                  key={i}
                  initial={{ opacity: 0, y: 8 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ duration: 0.3, ease: EASE }}
                  className={`flex ${m.from === "user" ? "justify-end" : "justify-start"}`}
                >
                  <div
                    className={
                      m.from === "user"
                        ? "max-w-[82%] rounded-2xl rounded-br-md bg-white/10 px-3.5 py-2.5 text-sm leading-relaxed text-zinc-100"
                        : "max-w-[82%] rounded-2xl rounded-bl-md border border-white/10 bg-black/40 px-3.5 py-2.5 text-sm leading-relaxed text-zinc-300"
                    }
                  >
                    {m.text}
                  </div>
                </motion.div>
              ))}

              {thinking && (
                <div className="flex gap-1.5 pl-1">
                  {[0, 1, 2].map((d) => (
                    <motion.span
                      key={d}
                      animate={{ opacity: [0.25, 1, 0.25] }}
                      transition={{ duration: 1.1, repeat: Infinity, delay: d * 0.18 }}
                      className="h-1.5 w-1.5 rounded-full bg-zinc-500"
                    />
                  ))}
                </div>
              )}
            </div>

            <div className="border-t border-white/10 p-3">
              <div className="flex items-center gap-2 rounded-xl border border-white/10 bg-black/40 py-1 pl-4 pr-1 focus-within:border-zinc-500/50">
                <input
                  value={draft}
                  onChange={(e) => setDraft(e.target.value)}
                  onKeyDown={(e) => e.key === "Enter" && send()}
                  placeholder="Tanya tentang layanan kami"
                  className="min-w-0 flex-1 bg-transparent py-2 text-sm text-zinc-200 placeholder:text-zinc-600 focus:outline-none"
                />
                <button
                  onClick={send}
                  disabled={!draft.trim()}
                  aria-label="Kirim pesan"
                  className="rounded-lg bg-zinc-100 p-2 text-zinc-950 transition-colors hover:bg-white disabled:opacity-40"
                >
                  <Send className="h-3.5 w-3.5" strokeWidth={2} />
                </button>
              </div>
            </div>
          </motion.div>
        )}
      </AnimatePresence>

      <motion.button
        onClick={() => setOpen((v) => !v)}
        whileHover={{ scale: 1.05 }}
        whileTap={{ scale: 0.95 }}
        transition={SPRING}
        aria-label={open ? "Tutup Cognitix AI" : "Buka Cognitix AI"}
        className="glass-panel glass-panel-hover flex h-14 w-14 items-center justify-center rounded-full border border-white/10"
      >
        <AnimatePresence mode="wait" initial={false}>
          <motion.span
            key={open ? "close" : "open"}
            initial={{ opacity: 0, rotate: -45, scale: 0.7 }}
            animate={{ opacity: 1, rotate: 0, scale: 1 }}
            exit={{ opacity: 0, rotate: 45, scale: 0.7 }}
            transition={{ duration: 0.18 }}
          >
            {open ? (
              <X className="h-5 w-5 text-zinc-300" strokeWidth={1.75} />
            ) : (
              <Sparkles className="h-5 w-5 text-zinc-100" strokeWidth={1.75} />
            )}
          </motion.span>
        </AnimatePresence>
      </motion.button>
    </div>
  );
}

export default function Page() {
  return (
    <MotionConfig reducedMotion="user">
      <main className="relative min-h-screen bg-zinc-950 text-zinc-100 antialiased selection:bg-zinc-800">
        <DynamicIsland />
        <Hero />
        <TechTicker />
        <Capabilities />
        <Work />
        <Team />
        <PortalAndFooter />
        <AssistantWidget />
      </main>
    </MotionConfig>
  );
}
"use client";

import { useEffect, useRef, useState } from "react";
import {
  AnimatePresence,
  MotionConfig,
  motion,
  useReducedMotion,
} from "framer-motion";
import {
  ArrowUpRight,
  Boxes,
  Check,
  CircuitBoard,
  Code2,
  CornerDownLeft,
  Cpu,
  Loader2,
  LogIn,
  MessageSquare,
  Send,
  Sparkles,
  X,
} from "lucide-react";

/* ============================================================================
   CONTENT
============================================================================ */

const SITE = {
  brand: "Cognitix Space",
  nav: [
    { label: "Tentang", href: "#about" },
    { label: "Portofolio", href: "#work" },
    { label: "Tim", href: "#team" },
    { label: "Portal Klien", href: "#portal" },
  ],
  capabilities: [
    {
      icon: Cpu,
      title: "Implementasi AI",
      body: "Sistem retrieval, computer vision, dan model serving yang dibangun untuk menangani trafik skala produksi, bukan sekadar demo.",
    },
    {
      icon: CircuitBoard,
      title: "Perangkat Terhubung (IoT)",
      body: "Firmware, pipeline telemetri, dan dashboard terpusat — dari prototipe ESP32 hingga klaster data server.",
    },
    {
      icon: Code2,
      title: "Platform Full-stack",
      body: "Dikembangkan end-to-end, di-deploy di edge, diserahkan lengkap dengan runbook dan migrasi yang benar-benar Anda butuhkan.",
    },
  ],
  projects: [
    {
      name: "PostuRa",
      kicker: "Wearable IoT",
      summary:
        "Perangkat wearable pengoreksi postur yang mengirimkan data gerak 9-axis ke aplikasi pelatih secara real-time.",
      stack: ["ESP32", "MQTT", "Next.js", "TimescaleDB"],
      image: "/placeholder.svg?height=720&width=1080",
    },
    {
      name: "Lentera",
      kicker: "Platform AI",
      summary:
        "Platform knowledge-base berbasis RAG untuk institusi keuangan regional, melayani 40 ribu query internal per bulan.",
      stack: ["Next.js", "Supabase", "pgvector", "LangGraph"],
      image: "/placeholder.svg?height=720&width=1080",
    },
    {
      name: "SkinNET Bio",
      kicker: "Visi Klinis",
      summary:
        "Model triase dermatologi dengan rekam jejak audit yang dapat dibaca klinisi, dikemas dalam antarmuka khusus tablet.",
      stack: ["PyTorch", "FastAPI", "ONNX", "React"],
      image: "/placeholder.svg?height=720&width=1080",
    },
  ],
  team: [
    {
      name: "Muhammad Arya Putra Rhiswanto",
      role: "Founder & Principal Architect",
      image: "/placeholder.svg?height=800&width=600",
    },
    {
      name: "Nadia Ayu Pramesti",
      role: "Head of Machine Learning",
      image: "/placeholder.svg?height=800&width=600",
    },
    {
      name: "Reza Aditya Nugroho",
      role: "Lead Embedded Engineer",
      image: "/placeholder.svg?height=800&width=600",
    },
    {
      name: "Clara Widjaja",
      role: "Design Systems Lead",
      image: "/placeholder.svg?height=800&width=600",
    },
  ],
};

const EASE = [0.16, 1, 0.3, 1] as const;
const SPRING = { type: "spring" as const, stiffness: 420, damping: 38, mass: 0.9 };

/* ============================================================================
   1 · DYNAMIC ISLAND NAVBAR
============================================================================ */

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
                    Ceritakan apa yang sedang Anda bangun
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

/* ============================================================================
   2 · HERO
============================================================================ */

function Hero() {
  return (
    <section
      id="top"
      className="relative flex min-h-screen flex-col items-center justify-center overflow-hidden px-6 pt-32 pb-24"
    >
      {/* Subtle background - NO MORE NEON BLOBS */}
      <div aria-hidden className="pointer-events-none absolute inset-0 flex items-center justify-center">
        <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_center,rgba(255,255,255,0.03)_0%,transparent_70%)]" />
        <div className="grid-veil absolute inset-0 opacity-50" />
      </div>

      <motion.div
        initial={{ opacity: 0, y: 24 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.9, ease: EASE }}
        className="relative z-10 flex max-w-3xl flex-col items-center text-center"
      >
        <span className="glass-panel mb-8 rounded-full px-3.5 py-1.5 text-xs text-zinc-400 border-white/10">
          Studio Rekayasa Perangkat Lunak · Surabaya & Remote
        </span>

        <h1 className="text-balance text-4xl font-medium leading-[1.05] tracking-tighter text-zinc-100 sm:text-6xl md:text-7xl">
          Arsitektur Ekosistem <br/>
          <span className="text-zinc-400">AI, IoT, &amp; Web Skala Enterprise</span>
        </h1>

        <p className="mt-7 max-w-xl text-pretty text-base leading-relaxed text-zinc-400 sm:text-lg">
          Kami membawa sistem dari papan konsep hingga tahap produksi — model AI yang tahan terhadap beban tinggi, perangkat keras yang terhubung stabil, dan antarmuka yang benar-benar akan digunakan oleh tim Anda.
        </p>

        <div className="mt-10 flex flex-col items-stretch gap-3 sm:flex-row sm:items-center">
          <a
            href="#work"
            className="group flex items-center justify-center gap-2 rounded-lg bg-zinc-100 px-6 py-3 text-sm font-medium text-zinc-950 transition-colors hover:bg-white"
          >
            Lihat studi kasus
            <ArrowUpRight
              className="h-4 w-4 transition-transform duration-300 group-hover:translate-x-0.5 group-hover:-translate-y-0.5"
              strokeWidth={2}
            />
          </a>
          <a
            href="#portal"
            className="glass-panel glass-panel-hover flex items-center justify-center gap-2 rounded-lg px-6 py-3 text-sm font-medium text-zinc-200 border-white/10"
          >
            <LogIn className="h-4 w-4" strokeWidth={1.75} />
            Masuk portal
          </a>
        </div>
      </motion.div>
    </section>
  );
}

/* ============================================================================
   3 · CAPABILITIES  (#about)
============================================================================ */

function Capabilities() {
  return (
    <section id="about" className="relative mx-auto max-w-6xl px-6 py-24 md:py-32">
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
            className={`p-8 md:p-10 ${i > 0 ? "border-t border-white/5 md:border-l md:border-t-0" : ""}`}
          >
            <cap.icon className="h-5 w-5 text-zinc-200" strokeWidth={1.5} />
            <h3 className="mt-5 text-lg font-medium tracking-tight text-zinc-100">
              {cap.title}
            </h3>
            <p className="mt-2.5 text-sm leading-relaxed text-zinc-400">{cap.body}</p>
          </div>
        ))}
      </motion.div>
    </section>
  );
}

/* ============================================================================
   4 · PORTFOLIO / CASE STUDIES
============================================================================ */

function Work() {
  return (
    <section id="work" className="relative mx-auto max-w-6xl px-6 py-24 md:py-32">
      <div className="mb-14 flex flex-col gap-4 md:mb-20 md:flex-row md:items-end md:justify-between">
        <h2 className="max-w-md text-balance text-3xl font-medium tracking-tighter text-zinc-100 sm:text-4xl md:text-5xl">
          Karya yang rilis dan bertahan di produksi
        </h2>
        <p className="max-w-sm text-sm leading-relaxed text-zinc-400">
          Tiga sistem saat ini berjalan stabil. Dokumentasi teknis terperinci, termasuk tantangan yang kami hadapi, tersedia dengan NDA.
        </p>
      </div>

      <div className="grid grid-cols-1 gap-5 md:grid-cols-2 lg:grid-cols-3">
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
              <img
                src={project.image || "/placeholder.svg"}
                alt={`Antarmuka ${project.name}`}
                className="h-full w-full object-cover opacity-70 grayscale transition-all duration-700 ease-out group-hover:scale-[1.03] group-hover:opacity-100 group-hover:grayscale-0"
              />
              <div className="absolute inset-0 bg-linear-to-t from-zinc-950/90 to-transparent" />
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
                    className="rounded-md border border-white/10 bg-white/5 px-2.5 py-1 text-[11px] text-zinc-400"
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

/* ============================================================================
   5 · TEAM  (3D scroll)
============================================================================ */

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
        <h2 className="text-balance text-3xl font-medium tracking-tighter text-zinc-100 sm:text-4xl md:text-5xl">
          Tim di balik layar
        </h2>
        <p className="mt-4 text-sm leading-relaxed text-zinc-400">
          Ramping secara sengaja. Engineer yang merancang sistem Anda di awal adalah engineer yang sama yang akan menulis kodenya.
        </p>
      </div>

      <motion.div
        variants={teamContainer}
        initial="hidden"
        whileInView="visible"
        viewport={{ once: true, margin: "-100px" }}
        style={{ perspective: 1000 }}
        className="no-scrollbar -mx-6 flex snap-x snap-mandatory gap-5 overflow-x-auto px-6 pb-4 lg:mx-0 lg:grid lg:grid-cols-4 lg:overflow-visible lg:px-0"
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
            <img
              src={member.image || "/placeholder.svg"}
              alt={member.name}
              className="absolute inset-0 h-full w-full object-cover grayscale transition-all duration-700 ease-out group-hover:scale-[1.04] group-hover:grayscale-0"
            />
            <div className="absolute inset-x-0 bottom-0 h-1/2 bg-linear-to-t from-zinc-950 via-zinc-950/80 to-transparent" />
            <div className="glass-panel absolute inset-x-3 bottom-3 rounded-xl px-4 py-3.5 border-white/10">
              <p className="text-sm font-medium leading-snug tracking-tight text-zinc-100">
                {member.name}
              </p>
              <p className="mt-0.5 text-xs text-zinc-400">{member.role}</p>
            </div>
          </motion.div>
        ))}
      </motion.div>
    </section>
  );
}

/* ============================================================================
   6 · CLIENT PORTAL STRIP + FOOTER
============================================================================ */

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
          Riwayat deployment, laporan insiden, dan invoice tagihan tersedia di portal klien Anda.
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
        <span className="text-xs text-zinc-600">
          © {new Date().getFullYear()} Cognitix Space
        </span>
      </div>
    </footer>
  );
}

/* ============================================================================
   7 · AI ASSISTANT WIDGET
============================================================================ */

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

/* ============================================================================
   PAGE
============================================================================ */

export default function Page() {
  return (
    <MotionConfig reducedMotion="user">
      <main className="relative min-h-screen bg-zinc-950 text-zinc-100 antialiased selection:bg-zinc-800">
        <DynamicIsland />
        <Hero />
        <Capabilities />
        <Work />
        <Team />
        <PortalAndFooter />
        <AssistantWidget />
      </main>
    </MotionConfig>
  );
}
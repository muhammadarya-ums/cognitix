"use client";

import React, { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import {
  LayoutDashboard,
  Kanban,
  ShieldCheck,
  LogOut,
  Download,
  GitCommit,
  User,
  Clock,
  CheckCircle2,
  FileText
} from "lucide-react";

export default function ClientPortal() {
  const [activeTab, setActiveTab] = useState("Overview");

  const NAV_ITEMS = [
    { id: "Overview", icon: LayoutDashboard },
    { id: "Kanban", icon: Kanban },
    { id: "Vault", icon: ShieldCheck },
  ];

  return (
    <div className="flex h-screen w-full bg-zinc-950 text-zinc-100 font-sans overflow-hidden selection:bg-cyan-500/30">
      
      {/* SIDEBAR */}
      <aside className="glass-panel w-64 flex flex-col justify-between border-r border-white/10 bg-zinc-950/50 relative z-10">
        <div>
          {/* Logo Area */}
          <div className="h-20 flex items-center px-8 border-b border-white/5">
            <div className="flex items-center gap-3">
              <div className="size-6 rounded bg-zinc-100 flex items-center justify-center">
                <span className="text-zinc-950 font-bold text-xs tracking-tighter">AC</span>
              </div>
              <span className="font-semibold text-sm tracking-tight">Acme Corp</span>
            </div>
          </div>

          {/* Navigation */}
          <nav className="p-4 space-y-1 mt-4">
            {NAV_ITEMS.map((item) => {
              const isActive = activeTab === item.id;
              const Icon = item.icon;
              return (
                <button
                  key={item.id}
                  onClick={() => setActiveTab(item.id)}
                  className={`w-full flex items-center gap-3 px-4 py-2.5 rounded-md text-sm font-medium transition-all duration-200 ${
                    isActive
                      ? "bg-white/3 text-cyan-400 border-l-[3px] border-cyan-500 drop-shadow-[0_0_8px_rgba(6,182,212,0.2)]"
                      : "text-zinc-400 border-l-[3px] border-transparent hover:text-zinc-200 hover:bg-white/2"
                  }`}
                >
                  <Icon size={16} className={isActive ? "text-cyan-400" : "opacity-70"} />
                  <span className="tracking-tight">{item.id === "Vault" ? "Legal & Vault" : item.id === "Kanban" ? "Project Kanban" : item.id}</span>
                </button>
              );
            })}
          </nav>
        </div>

        {/* Bottom Profile / Logout */}
        <div className="p-4 border-t border-white/5">
          <div className="glass-panel flex items-center justify-between p-3 rounded-lg border border-white/10 bg-white/1 hover:bg-white/3 transition-colors cursor-pointer group">
            <div className="flex items-center gap-3">
              <div className="size-8 rounded-full bg-zinc-800 flex items-center justify-center border border-white/10">
                <User size={14} className="text-zinc-400" />
              </div>
              <div className="flex flex-col">
                <span className="text-xs font-medium tracking-tight">Client Admin</span>
                <span className="text-[10px] text-zinc-500 tracking-tight">admin@acme.co</span>
              </div>
            </div>
            <LogOut size={14} className="text-zinc-500 group-hover:text-violet-400 transition-colors" />
          </div>
        </div>
      </aside>

      {/* MAIN CONTENT */}
      <main className="flex-1 relative overflow-y-auto overflow-x-hidden p-10">
        {/* Subtle background glow - heavily restricted to avoid "AI slop", just a slight top illumination */}
        <div className="absolute top-0 left-1/4 w-1/2 h-32 bg-cyan-500/5 blur-[120px] pointer-events-none rounded-full" />
        
        <div className="max-w-5xl mx-auto w-full relative z-10 pt-4">
          <AnimatePresence mode="wait">
            {activeTab === "Overview" && <OverviewTab key="overview" />}
            {activeTab === "Kanban" && <KanbanTab key="kanban" />}
            {activeTab === "Vault" && <VaultTab key="vault" />}
          </AnimatePresence>
        </div>
      </main>
    </div>
  );
}

/* =========================================
   TAB COMPONENTS
========================================= */

function OverviewTab() {
  const timeline = [
    { id: 1, text: "Firmware C++ pushed to main", time: "2 hours ago", icon: GitCommit },
    { id: 2, text: "Next.js Dashboard deployed to Vercel", time: "5 hours ago", icon: CheckCircle2 },
    { id: 3, text: "Hardware bill of materials approved", time: "1 day ago", icon: FileText },
  ];

  return (
    <motion.div
      initial={{ opacity: 0, y: 10 }}
      animate={{ opacity: 1, y: 0 }}
      exit={{ opacity: 0, y: -10 }}
      transition={{ duration: 0.2 }}
      className="space-y-10"
    >
      <header>
        <h1 className="text-2xl font-medium tracking-tight text-zinc-100">Welcome back, Acme Corp.</h1>
        <p className="text-sm text-zinc-400 tracking-tight mt-1">Here is the latest snapshot of your engagement.</p>
      </header>

      {/* Metrics Grid */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
        <div className="glass-panel p-6 rounded-xl border border-white/10 bg-white/2">
          <span className="text-xs text-zinc-500 font-medium tracking-tight uppercase">Active Project</span>
          <h3 className="text-lg font-medium tracking-tight mt-2 text-zinc-100">PostuRa IoT System</h3>
          <div className="mt-4 flex items-center gap-2 text-xs text-zinc-400">
            <span className="flex size-2 rounded-full bg-cyan-500/80 shadow-[0_0_6px_rgba(6,182,212,0.6)]"></span>
            Production Phase
          </div>
        </div>

        <div className="glass-panel p-6 rounded-xl border border-white/10 bg-white/2 flex flex-col justify-between">
          <div>
            <span className="text-xs text-zinc-500 font-medium tracking-tight uppercase">Overall Progress</span>
            <div className="flex items-baseline gap-2 mt-1">
              <h3 className="text-2xl font-semibold tracking-tight text-zinc-100">65%</h3>
            </div>
          </div>
          <div className="w-full h-0.5 bg-zinc-800 rounded-full mt-4 overflow-hidden">
            <motion.div 
              initial={{ width: 0 }}
              animate={{ width: "65%" }}
              transition={{ duration: 1, delay: 0.2, ease: "easeOut" }}
              className="h-full bg-cyan-500 shadow-[0_0_8px_rgba(6,182,212,0.8)]"
            />
          </div>
        </div>

        <div className="glass-panel p-6 rounded-xl border border-white/10 bg-white/2">
          <span className="text-xs text-zinc-500 font-medium tracking-tight uppercase">Next Milestone</span>
          <h3 className="text-lg font-medium tracking-tight mt-2 text-zinc-100">Hardware ESP32 Assembly</h3>
          <div className="mt-4 flex items-center gap-2 text-xs text-zinc-400">
            <Clock size={12} />
            Due in 4 days
          </div>
        </div>
      </div>

      {/* Activity Feed */}
      <div className="pt-6">
        <h2 className="text-sm font-medium tracking-tight text-zinc-100 mb-6 border-b border-white/5 pb-4">Recent Activity</h2>
        <div className="relative space-y-6 before:absolute before:inset-0 before:ml-2.75 before:-translate-x-px md:before:mx-auto md:before:translate-x-0 before:h-full before:w-px before:bg-linear-to-b before:from-white/10 before:via-white/10 before:to-transparent">
          {timeline.map((item, index) => {
            const Icon = item.icon;
            return (
              <div key={item.id} className="relative flex items-center justify-between md:justify-normal md:odd:flex-row-reverse group is-active">
                <div className="flex items-center justify-center size-6 rounded-full border border-white/10 bg-zinc-950 text-zinc-500 shadow shrink-0 md:order-1 md:group-odd:-translate-x-1/2 md:group-even:translate-x-1/2 z-10">
                  <Icon size={10} className={index === 0 ? "text-cyan-400" : "text-zinc-500"} />
                </div>
                <div className="w-[calc(100%-2.5rem)] md:w-[calc(50%-1.5rem)] glass-panel p-4 rounded-lg border border-white/5 bg-white/1 group-hover:border-white/10 transition-colors">
                  <div className="flex items-center justify-between mb-1">
                    <span className="text-sm font-medium text-zinc-200 tracking-tight">{item.text}</span>
                  </div>
                  <span className="text-xs text-zinc-500 tracking-tight">{item.time}</span>
                </div>
              </div>
            );
          })}
        </div>
      </div>
    </motion.div>
  );
}

function KanbanTab() {
  const columns = [
    {
      id: "todo",
      title: "To Do",
      tasks: [{ id: 1, title: "Configure Supabase pgvector", priority: "High", priorityColor: "text-violet-400 bg-violet-400/10 border-violet-400/20" }]
    },
    {
      id: "inprogress",
      title: "In Progress",
      tasks: [{ id: 2, title: "Train PyTorch Model", priority: "Med", priorityColor: "text-cyan-400 bg-cyan-400/10 border-cyan-400/20" }]
    },
    {
      id: "completed",
      title: "Completed",
      tasks: [{ id: 3, title: "Design MPU6050 Circuit", priority: "Low", priorityColor: "text-zinc-400 bg-zinc-400/10 border-zinc-400/20" }]
    }
  ];

  return (
    <motion.div
      initial={{ opacity: 0, y: 10 }}
      animate={{ opacity: 1, y: 0 }}
      exit={{ opacity: 0, y: -10 }}
      transition={{ duration: 0.2 }}
      className="h-[calc(100vh-8rem)] flex flex-col"
    >
      <header className="mb-8">
        <h1 className="text-2xl font-medium tracking-tight text-zinc-100">Project Kanban</h1>
        <p className="text-sm text-zinc-400 tracking-tight mt-1">Real-time status of current deliverables.</p>
      </header>

      <div className="grid grid-cols-1 md:grid-cols-3 gap-6 h-full pb-10">
        {columns.map((col) => (
          <div key={col.id} className="flex flex-col gap-4">
            <div className="flex items-center justify-between border-b border-white/10 pb-3">
              <span className="text-sm font-medium tracking-tight text-zinc-300">{col.title}</span>
              <span className="text-xs text-zinc-500 font-mono bg-white/5 px-2 py-0.5 rounded">{col.tasks.length}</span>
            </div>
            
            <div className="flex-1 space-y-3">
              {col.tasks.map((task) => (
                <div key={task.id} className="glass-panel p-4 rounded-lg border border-white/10 bg-white/2 hover:bg-white/4 transition-colors cursor-grab active:cursor-grabbing">
                  <div className="flex justify-between items-start mb-4">
                    <span className={`text-[10px] font-semibold uppercase tracking-wider px-2 py-0.5 rounded border ${task.priorityColor}`}>
                      {task.priority}
                    </span>
                  </div>
                  <h4 className="text-sm font-medium tracking-tight text-zinc-200 leading-snug">{task.title}</h4>
                  
                  <div className="mt-4 flex items-center justify-between border-t border-white/5 pt-3">
                    <div className="flex -space-x-2">
                      <div className="size-6 rounded-full bg-zinc-800 border border-zinc-700 flex items-center justify-center z-10">
                         <span className="text-[10px] font-medium text-zinc-400">CG</span>
                      </div>
                    </div>
                    <span className="text-xs text-zinc-600 tracking-tight font-mono">T-{task.id}</span>
                  </div>
                </div>
              ))}
            </div>
          </div>
        ))}
      </div>
    </motion.div>
  );
}

function VaultTab() {
  const documents = [
    { id: 1, name: "RAB_PostuRa_v2.pdf", type: "Proposal", date: "Oct 12, 2026" },
    { id: 2, name: "SLA_Agreement.pdf", type: "Contract", date: "Oct 10, 2026" },
    { id: 3, name: "Invoice_INV-CGX-2026-009.pdf", type: "Invoice", date: "Oct 01, 2026" }
  ];

  return (
    <motion.div
      initial={{ opacity: 0, y: 10 }}
      animate={{ opacity: 1, y: 0 }}
      exit={{ opacity: 0, y: -10 }}
      transition={{ duration: 0.2 }}
    >
      <header className="mb-8">
        <h1 className="text-2xl font-medium tracking-tight text-zinc-100">Legal & Vault</h1>
        <p className="text-sm text-zinc-400 tracking-tight mt-1">Secure repository for all project documentation and billing.</p>
      </header>

      <div className="glass-panel border border-white/10 rounded-xl bg-white/1 overflow-hidden">
        <div className="overflow-x-auto">
          <table className="w-full text-left text-sm tracking-tight border-collapse">
            <thead>
              <tr className="border-b border-white/10 bg-white/2">
                <th className="px-6 py-4 font-medium text-zinc-400 w-1/2">Document Name</th>
                <th className="px-6 py-4 font-medium text-zinc-400">Type</th>
                <th className="px-6 py-4 font-medium text-zinc-400">Date Added</th>
                <th className="px-6 py-4 font-medium text-zinc-400 text-right">Action</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-white/5">
              {documents.map((doc) => (
                <tr key={doc.id} className="hover:bg-white/2 transition-colors group">
                  <td className="px-6 py-4">
                    <div className="flex items-center gap-3">
                      <FileText size={16} className="text-zinc-500 group-hover:text-cyan-400 transition-colors" />
                      <span className="font-medium text-zinc-200">{doc.name}</span>
                    </div>
                  </td>
                  <td className="px-6 py-4 text-zinc-400">{doc.type}</td>
                  <td className="px-6 py-4 text-zinc-400 font-mono text-xs">{doc.date}</td>
                  <td className="px-6 py-4 text-right">
                    <button className="inline-flex items-center justify-center p-2 rounded hover:bg-white/10 text-zinc-500 hover:text-zinc-100 transition-colors">
                      <Download size={16} />
                    </button>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>
    </motion.div>
  );
}
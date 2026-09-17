"use client";

import React, { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import {
  Terminal,
  Activity,
  FolderKanban,
  Receipt,
  ChevronRight,
  Server,
  Cpu,
  Users,
  DollarSign,
  Loader2,
  FileText,
  Download,
} from "lucide-react";

export default function AdminCommandCenter() {
  const [activeTab, setActiveTab] = useState("Dashboard");

  const NAV_ITEMS = [
    { id: "Dashboard", icon: Activity },
    { id: "Projects", icon: FolderKanban },
    { id: "Finance", icon: Receipt },
  ];

  return (
    <div className="flex h-screen w-full bg-zinc-950 text-zinc-300 font-sans overflow-hidden selection:bg-zinc-800">
      
      {/* SIDEBAR */}
      <aside className="glass-panel w-64 flex flex-col border-r border-white/10 bg-zinc-950/80 z-20">
        <div className="h-14 border-b border-white/10 flex items-center px-6">
          <Terminal size={16} className="text-zinc-100 mr-3" />
          <span className="font-mono text-sm font-semibold tracking-tight text-zinc-100 uppercase">
            CGX::SYS_ADMIN
          </span>
        </div>

        <nav className="p-4 flex flex-col gap-1 mt-2">
          {NAV_ITEMS.map((item) => {
            const isActive = activeTab === item.id;
            const Icon = item.icon;
            return (
              <button
                key={item.id}
                onClick={() => setActiveTab(item.id)}
                className={`w-full flex items-center gap-3 px-3 py-2.5 rounded-sm text-sm font-mono transition-all duration-150 border ${
                  isActive
                    ? "bg-white/10 text-zinc-100 border-white/20"
                    : "bg-transparent text-zinc-500 border-transparent hover:border-white/10 hover:text-zinc-300 hover:bg-white/2"
                }`}
              >
                <Icon size={16} className={isActive ? "text-zinc-100" : "opacity-70"} />
                <span className="tracking-tight uppercase">{item.id}</span>
              </button>
            );
          })}
        </nav>
      </aside>

      {/* MAIN CONTENT AREA */}
      <div className="flex-1 flex flex-col relative overflow-hidden">
        
        {/* TOP NAVIGATION */}
        <header className="h-14 border-b border-white/10 glass-panel flex items-center justify-between px-6 bg-zinc-950/80 z-10 sticky top-0">
          <div className="flex items-center gap-2 text-xs font-mono text-zinc-500">
            <span>Cognitix</span>
            <ChevronRight size={12} className="opacity-50" />
            <span>Command Center</span>
            <ChevronRight size={12} className="opacity-50" />
            <span className="text-zinc-100 bg-white/10 px-2 py-0.5 rounded-sm">{activeTab}</span>
          </div>

          <div className="flex items-center gap-6">
            <div className="flex items-center gap-2 text-xs font-mono bg-green-500/10 px-3 py-1 rounded-sm border border-green-500/20">
              <span className="size-2 rounded-full bg-green-500 shadow-[0_0_8px_rgba(34,197,94,0.8)] animate-pulse"></span>
              <span className="text-green-400">All Systems Operational</span>
            </div>
            <div className="h-4 w-px bg-white/10"></div>
            <div className="text-xs font-mono text-zinc-400 flex items-center gap-3">
              <div className="size-6 bg-zinc-800 border border-white/20 flex items-center justify-center text-[10px] text-zinc-200">
                MR
              </div>
              Muhammad Arya Putra Rhiswanto - Tech Lead
            </div>
          </div>
        </header>

        {/* TAB CONTENT */}
        <main className="flex-1 overflow-y-auto p-8 relative">
          <div className="max-w-7xl mx-auto w-full">
            <AnimatePresence mode="wait">
              {activeTab === "Dashboard" && <DashboardTab key="dashboard" />}
              {activeTab === "Projects" && <ProjectsTab key="projects" />}
              {activeTab === "Finance" && <FinanceTab key="finance" />}
            </AnimatePresence>
          </div>
        </main>
      </div>
    </div>
  );
}

/* =========================================
   DASHBOARD TAB
========================================= */

function DashboardTab() {
  const stats = [
    { label: "Total Active Clients", value: "14", icon: Users, trend: "+2 this month" },
    { label: "Ongoing Projects", value: "8", icon: FolderKanban, trend: "3 nearing completion" },
    { label: "AI Tokens Used", value: "2.4M", icon: Cpu, trend: "450k last 24h" },
    { label: "Monthly MRR", value: "$18,450", icon: DollarSign, trend: "+12.5% vs last month" },
  ];

  // Generate mock telemetry data using lazy initialization to prevent ESLint errors and extra renders
  const [telemetry] = useState<number[]>(() => 
    Array.from({ length: 119 }).map(() => (Math.random() > 0.15 ? 1 : Math.random() > 0.5 ? 2 : 0))
  );

  return (
    <motion.div
      initial={{ opacity: 0, y: 5 }}
      animate={{ opacity: 1, y: 0 }}
      exit={{ opacity: 0, y: -5 }}
      transition={{ duration: 0.15 }}
      className="space-y-8"
    >
      {/* STATS GRID */}
      <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
        {stats.map((stat, i) => (
          <div key={i} className="glass-panel p-5 border border-white/10 bg-white/1 rounded-sm relative overflow-hidden group">
            <div className="absolute top-0 right-0 p-4 opacity-10 group-hover:opacity-20 transition-opacity">
              <stat.icon size={48} />
            </div>
            <span className="text-[10px] text-zinc-500 font-mono uppercase tracking-wider block mb-2">{stat.label}</span>
            <div className="text-3xl font-medium tracking-tight text-zinc-100 mb-4">{stat.value}</div>
            <div className="text-xs font-mono text-zinc-400 border-t border-white/5 pt-3">
              {stat.trend}
            </div>
          </div>
        ))}
      </div>

      {/* TELEMETRY MATRIX */}
      <div className="glass-panel border border-white/10 bg-white/1 rounded-sm p-6">
        <div className="flex items-center justify-between mb-6">
          <div className="flex items-center gap-2">
            <Server size={16} className="text-zinc-400" />
            <h2 className="text-sm font-mono uppercase tracking-wider text-zinc-300">System Telemetry & Uptime</h2>
          </div>
          <span className="text-xs font-mono text-zinc-500">Last 119 Hours (Vercel, Supabase, MQTT)</span>
        </div>
        
        <div className="grid grid-cols-17 gap-1.5 w-full">
          {telemetry.map((status, i) => (
            <div
              key={i}
              className={`aspect-square rounded-[1px] transition-colors ${
                status === 1 ? "bg-green-500/80 border border-green-500/20" : status === 2 ? "bg-yellow-500/80 border border-yellow-500/20" : "bg-zinc-800/50 border border-white/5"
              }`}
              title={`Hour -${119 - i}: ${status === 1 ? 'Operational' : status === 2 ? 'Degraded' : 'Downtime'}`}
            />
          ))}
        </div>
        
        <div className="flex justify-end items-center gap-4 mt-4 text-[10px] font-mono text-zinc-500 uppercase">
          <div className="flex items-center gap-1"><div className="size-2 bg-zinc-800 border border-white/10"></div> Downtime</div>
          <div className="flex items-center gap-1"><div className="size-2 bg-yellow-500/80 border border-yellow-500/20"></div> Degraded</div>
          <div className="flex items-center gap-1"><div className="size-2 bg-green-500/80 border border-green-500/20"></div> Operational</div>
        </div>
      </div>
    </motion.div>
  );
}

/* =========================================
   PROJECTS TAB
========================================= */

function ProjectsTab() {
  const projects = [
    { id: "PRJ-081", name: "Lentera Abhesa", client: "Abhesa Corp", stack: ["Next.js", "Supabase", "Tailwind"], status: "Deployed", health: "Green" },
    { id: "PRJ-092", name: "SkinNET Bio", client: "DermaTech", stack: ["Python", "PyTorch", "FastAPI"], status: "Dev", health: "Yellow" },
    { id: "PRJ-104", name: "Decarbonized-Smoker", client: "EcoVentures", stack: ["ESP32", "C++", "MQTT"], status: "Planning", health: "Green" },
    { id: "PRJ-105", name: "Cognitix Hub", client: "Internal", stack: ["Next.js", "PostgreSQL", "Golang"], status: "Dev", health: "Red" },
  ];

  return (
    <motion.div
      initial={{ opacity: 0, y: 5 }}
      animate={{ opacity: 1, y: 0 }}
      exit={{ opacity: 0, y: -5 }}
      transition={{ duration: 0.15 }}
      className="glass-panel border border-white/10 bg-white/1 rounded-sm overflow-hidden"
    >
      <div className="p-4 border-b border-white/10 flex items-center justify-between bg-zinc-950/50">
        <h2 className="text-sm font-mono uppercase tracking-wider text-zinc-300">Enterprise Projects Directory</h2>
        <div className="text-xs font-mono text-zinc-500 border border-white/10 px-2 py-1 bg-white/5 rounded-sm">
          {projects.length} Records
        </div>
      </div>
      
      <div className="overflow-x-auto">
        <table className="w-full text-left text-sm font-sans border-collapse">
          <thead>
            <tr className="border-b border-white/5 bg-white/2 text-xs font-mono uppercase tracking-wider text-zinc-500">
              <th className="px-6 py-4 font-normal">Project ID</th>
              <th className="px-6 py-4 font-normal">Details</th>
              <th className="px-6 py-4 font-normal">Tech Stack</th>
              <th className="px-6 py-4 font-normal">Status</th>
              <th className="px-6 py-4 font-normal">Health</th>
            </tr>
          </thead>
          <tbody className="divide-y divide-white/5">
            {projects.map((proj) => (
              <tr key={proj.id} className="hover:bg-white/2 transition-colors">
                <td className="px-6 py-4">
                  <span className="font-mono text-zinc-300">{proj.id}</span>
                </td>
                <td className="px-6 py-4">
                  <div className="flex flex-col">
                    <span className="font-medium text-zinc-200">{proj.name}</span>
                    <span className="text-xs text-zinc-500 mt-0.5">{proj.client}</span>
                  </div>
                </td>
                <td className="px-6 py-4">
                  <div className="flex flex-wrap gap-1.5">
                    {proj.stack.map(tech => (
                      <span key={tech} className="text-[10px] font-mono border border-white/10 bg-white/5 text-zinc-400 px-1.5 py-0.5 rounded-sm">
                        {tech}
                      </span>
                    ))}
                  </div>
                </td>
                <td className="px-6 py-4">
                  <select 
                    className="bg-transparent border border-white/10 text-xs text-zinc-300 font-mono px-2 py-1 rounded-sm focus:outline-none focus:border-zinc-500 appearance-none cursor-pointer"
                    defaultValue={proj.status}
                  >
                    <option value="Planning">PLANNING</option>
                    <option value="Dev">DEV</option>
                    <option value="Deployed">DEPLOYED</option>
                  </select>
                </td>
                <td className="px-6 py-4">
                  <div className="flex items-center gap-2">
                    <div className={`size-2.5 rounded-full ${
                      proj.health === 'Green' ? 'bg-green-500 shadow-[0_0_6px_rgba(34,197,94,0.6)]' : 
                      proj.health === 'Yellow' ? 'bg-yellow-500 shadow-[0_0_6px_rgba(234,179,8,0.6)]' : 
                      'bg-red-500 shadow-[0_0_6px_rgba(239,68,68,0.6)]'
                    }`} />
                    <span className="text-xs font-mono text-zinc-500 uppercase">{proj.health}</span>
                  </div>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </motion.div>
  );
}

/* =========================================
   FINANCE TAB
========================================= */

function FinanceTab() {
  const [isGenerating, setIsGenerating] = useState(false);

  const handleGenerate = (e: React.FormEvent) => {
    e.preventDefault();
    setIsGenerating(true);
    setTimeout(() => setIsGenerating(false), 2000);
  };

  const invoices = [
    { id: "INV-2026-041", client: "Abhesa Corp", amount: "$4,500.00", date: "Oct 12, 2026", status: "Paid" },
    { id: "INV-2026-042", client: "DermaTech", amount: "$8,200.00", date: "Oct 15, 2026", status: "Pending" },
    { id: "INV-2026-043", client: "EcoVentures", amount: "$2,100.00", date: "Oct 18, 2026", status: "Overdue" },
  ];

  return (
    <motion.div
      initial={{ opacity: 0, y: 5 }}
      animate={{ opacity: 1, y: 0 }}
      exit={{ opacity: 0, y: -5 }}
      transition={{ duration: 0.15 }}
      className="grid grid-cols-1 lg:grid-cols-2 gap-8"
    >
      {/* LEFT: INVOICE LIST */}
      <div className="glass-panel border border-white/10 bg-white/1 rounded-sm overflow-hidden h-fit">
        <div className="p-5 border-b border-white/10 bg-zinc-950/50">
          <h2 className="text-sm font-mono uppercase tracking-wider text-zinc-300">Recent Invoices</h2>
        </div>
        <div className="divide-y divide-white/5">
          {invoices.map((inv) => (
            <div key={inv.id} className="p-4 flex items-center justify-between hover:bg-white/2 transition-colors group">
              <div className="flex gap-4 items-center">
                <div className="size-10 bg-white/5 border border-white/10 rounded-sm flex items-center justify-center text-zinc-500 group-hover:text-zinc-300 transition-colors">
                  <FileText size={18} />
                </div>
                <div className="flex flex-col">
                  <span className="font-mono text-sm text-zinc-200">{inv.id}</span>
                  <span className="text-xs text-zinc-500 mt-0.5">{inv.client}</span>
                </div>
              </div>
              <div className="flex flex-col items-end">
                <span className="font-mono text-sm text-zinc-300">{inv.amount}</span>
                <div className="flex items-center gap-2 mt-1">
                  <span className="text-[10px] font-mono text-zinc-500">{inv.date}</span>
                  <span className={`text-[10px] font-mono px-1.5 py-0.5 rounded-sm border ${
                    inv.status === 'Paid' ? 'border-green-500/20 text-green-400 bg-green-500/10' :
                    inv.status === 'Pending' ? 'border-yellow-500/20 text-yellow-400 bg-yellow-500/10' :
                    'border-red-500/20 text-red-400 bg-red-500/10'
                  }`}>
                    {inv.status}
                  </span>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>

      {/* RIGHT: GENERATE FORM */}
      <div className="glass-panel border border-white/10 bg-white/1 rounded-sm overflow-hidden h-fit">
        <div className="p-5 border-b border-white/10 bg-zinc-950/50">
          <h2 className="text-sm font-mono uppercase tracking-wider text-zinc-300">Generate New Invoice</h2>
        </div>
        <form onSubmit={handleGenerate} className="p-6 space-y-5">
          
          <div className="grid grid-cols-2 gap-5">
            <div className="space-y-1.5">
              <label className="text-[10px] font-mono uppercase tracking-wider text-zinc-500">Select Client</label>
              <select className="w-full bg-zinc-900 border border-white/10 text-sm font-sans text-zinc-300 px-3 py-2 rounded-sm focus:outline-none focus:border-zinc-500 appearance-none">
                <option>Abhesa Corp</option>
                <option>DermaTech</option>
                <option>EcoVentures</option>
              </select>
            </div>
            <div className="space-y-1.5">
              <label className="text-[10px] font-mono uppercase tracking-wider text-zinc-500">Project Ref</label>
              <select className="w-full bg-zinc-900 border border-white/10 text-sm font-mono text-zinc-300 px-3 py-2 rounded-sm focus:outline-none focus:border-zinc-500 appearance-none">
                <option>PRJ-081</option>
                <option>PRJ-092</option>
                <option>PRJ-104</option>
              </select>
            </div>
          </div>

          <div className="grid grid-cols-2 gap-5">
            <div className="space-y-1.5">
              <label className="text-[10px] font-mono uppercase tracking-wider text-zinc-500">Amount (USD)</label>
              <input 
                type="text" 
                placeholder="0.00" 
                className="w-full bg-zinc-900 border border-white/10 text-sm font-mono text-zinc-300 px-3 py-2 rounded-sm focus:outline-none focus:border-zinc-500 placeholder:text-zinc-700" 
              />
            </div>
            <div className="space-y-1.5">
              <label className="text-[10px] font-mono uppercase tracking-wider text-zinc-500">Due Date</label>
              <input 
                type="date" 
                className="w-full bg-zinc-900 border border-white/10 text-sm font-mono text-zinc-300 px-3 py-2 rounded-sm focus:outline-none focus:border-zinc-500 scheme-dark" 
              />
            </div>
          </div>

          <div className="space-y-1.5">
            <label className="text-[10px] font-mono uppercase tracking-wider text-zinc-500">Line Items</label>
            <textarea 
              rows={3}
              placeholder="1x Edge Deployment Setup..."
              className="w-full bg-zinc-900 border border-white/10 text-sm font-sans text-zinc-300 px-3 py-2 rounded-sm focus:outline-none focus:border-zinc-500 placeholder:text-zinc-700 resize-none"
            ></textarea>
          </div>

          <div className="pt-2">
            <button 
              type="submit"
              disabled={isGenerating}
              className="w-full bg-white text-zinc-950 font-mono text-sm font-medium tracking-tight py-2.5 rounded-sm hover:bg-zinc-200 transition-colors flex items-center justify-center gap-2 disabled:opacity-50 disabled:cursor-not-allowed"
            >
              {isGenerating ? (
                <>
                  <Loader2 size={16} className="animate-spin" />
                  PROCESSING...
                </>
              ) : (
                <>
                  <Download size={16} />
                  GENERATE PDF VIA EDGE FUNCTION
                </>
              )}
            </button>
          </div>
        </form>
      </div>
    </motion.div>
  );
}
/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import React, { useState, useMemo } from 'react';
import { 
  Backpack, 
  Cpu, 
  Zap, 
  Wind, 
  Leaf, 
  Trophy, 
  Layers, 
  Scale, 
  TrendingUp, 
  CheckCircle2, 
  AlertCircle,
  ChevronRight,
  ShieldCheck,
  Maximize2
} from 'lucide-react';
import { 
  BarChart, 
  Bar, 
  XAxis, 
  YAxis, 
  CartesianGrid, 
  Tooltip, 
  Legend, 
  ResponsiveContainer,
  RadarChart,
  PolarGrid,
  PolarAngleAxis,
  PolarRadiusAxis,
  Radar
} from 'recharts';
import { motion, AnimatePresence } from 'motion/react';

// --- DATA ---

const PRODUCT_IDEAS = [
  {
    id: 'tech',
    name: "Apex Sensor-Zip",
    focus: "Smart/Tech Integration",
    description: "Features an integrated magnetic docking system for peripherals and a built-in IoT hub for real-time tracking and weight-balance analytics via haptic shoulder straps.",
    painPoint: "The Slump",
    painPointDesc: "Active exoskeleton maintains structural integrity regardless of load, preventing bag collapse.",
    color: "#3b82f6", // Blue
    icon: <Cpu className="w-6 h-6" />,
    kpis: {
      Cost: 9,
      Usability: 8,
      MarketPotential: 9,
      Sustainability: 6,
      CompetitiveEdge: 10
    }
  },
  {
    id: 'portability',
    name: "Vertical Chassis Zero",
    focus: "Portability & Ergonomics",
    description: "Uses a variable-compression 'origami' gusset system that allows the bag to thin down to 3 inches for transit while maintaining ultra-high-density support.",
    painPoint: "The Turtle Shell",
    painPointDesc: "Eliminates urban protrusion by tailoring the bag's depth to its exact contents.",
    color: "#f59e0b", // Amber
    icon: <Wind className="w-6 h-6" />,
    kpis: {
      Cost: 7,
      Usability: 10,
      MarketPotential: 8,
      Sustainability: 7,
      CompetitiveEdge: 9
    }
  },
  {
    id: 'eco',
    name: "Terra-True 360",
    focus: "Sustainability",
    description: "Constructed from 100% bio-regenerated seagrass fibers and carbon-negative hardware with a transparent main cavity to ensure honest packing.",
    painPoint: "Lying Volume",
    painPointDesc: "Minimalist single-cavity design with transparent mesh dividers removes the illusion of space.",
    color: "#10b981", // Emerald
    icon: <Leaf className="w-6 h-6" />,
    kpis: {
      Cost: 6,
      Usability: 7,
      MarketPotential: 7,
      Sustainability: 10,
      CompetitiveEdge: 8
    }
  }
];

const KPI_DESCRIPTIONS = {
  Cost: "Manufacturing and retail price points relative to target market.",
  Usability: "Ease of daily use, comfort, and feature accessibility.",
  MarketPotential: "Projected demand among 'Maximum Efficiency' Nomads.",
  Sustainability: "Carbon footprint, modularity, and material circularity.",
  CompetitiveEdge: "Uniqueness and difficulty of replication by competitors."
};

export default function App() {
  const [activeTab, setActiveTab] = useState<'chart' | 'table'>('chart');
  const [importanceWeights, setImportanceWeights] = useState({
    Cost: 1,
    Usability: 2,
    MarketPotential: 2,
    Sustainability: 1.5,
    CompetitiveEdge: 2
  });

  const chartData = useMemo(() => {
    return ['Cost', 'Usability', 'MarketPotential', 'Sustainability', 'CompetitiveEdge'].map(kpi => ({
      name: kpi,
      "Apex Sensor-Zip": PRODUCT_IDEAS[0].kpis[kpi as keyof typeof PRODUCT_IDEAS[0]['kpis']],
      "Vertical Chassis Zero": PRODUCT_IDEAS[1].kpis[kpi as keyof typeof PRODUCT_IDEAS[1]['kpis']],
      "Terra-True 360": PRODUCT_IDEAS[2].kpis[kpi as keyof typeof PRODUCT_IDEAS[2]['kpis']],
    }));
  }, []);

  const winnersCalculated = useMemo(() => {
    return PRODUCT_IDEAS.map(idea => {
      let score = 0;
      Object.entries(idea.kpis).forEach(([kpi, value]) => {
        score += value * (importanceWeights[kpi as keyof typeof importanceWeights] || 1);
      });
      return { ...idea, totalScore: score };
    }).sort((a, b) => b.totalScore - a.totalScore);
  }, [importanceWeights]);

  const winningIdea = winnersCalculated[0];

  return (
    <div className="min-h-screen bg-slate-50 text-slate-900 font-sans selection:bg-blue-100">
      {/* Header */}
      <header className="sticky top-0 z-50 bg-white/80 backdrop-blur-md border-b border-slate-200">
        <div className="max-w-7xl mx-auto px-4 h-16 flex items-center justify-between">
          <div className="flex items-center gap-2">
            <div className="bg-slate-900 text-white p-1.5 rounded-lg">
              <Backpack className="w-6 h-6" />
            </div>
            <span className="font-bold tracking-tight text-xl">Lions-Carry <span className="text-slate-400 font-medium">2026</span></span>
          </div>
          <div className="hidden md:flex gap-6 text-sm font-medium text-slate-600">
            <a href="#" className="hover:text-slate-900 transition-colors">Overview</a>
            <a href="#" className="hover:text-slate-900 transition-colors">Comparison</a>
            <a href="#" className="hover:text-slate-900 transition-colors">Projections</a>
          </div>
          <button className="bg-slate-900 text-white px-4 py-2 rounded-full text-sm font-medium hover:bg-slate-800 transition-all active:scale-95 shadow-lg shadow-slate-200">
            Contact Researcher
          </button>
        </div>
      </header>

      <main className="max-w-7xl mx-auto px-4 py-12">
        {/* Hero Section */}
        <div className="mb-16 space-y-12">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6 }}
            className="w-full rounded-[3rem] overflow-hidden shadow-2xl border border-slate-200 bg-white"
          >
            <img 
              src="https://lh3.googleusercontent.com/d/AP1GczPrO9K9XyZ9_tZ0E_2_m_v_G_v_H_i_J_q_S_w_V_y_E_y_T_n_o_z_K_W_k" 
              alt="Performance Backpack Variations 2026 Comparison" 
              className="w-full h-auto min-h-[300px] object-contain"
              referrerPolicy="no-referrer"
              onError={(e) => {
                const target = e.target as HTMLImageElement;
                target.src = "https://images.unsplash.com/photo-1553062407-98eeb64c6a62?q=80&w=2000&auto=format&fit=crop";
              }}
            />
          </motion.div>

          <motion.div 
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5, delay: 0.2 }}
          >
            <span className="text-blue-600 font-semibold text-sm tracking-widest uppercase mb-3 block italic">Assignment 2b: Comparative Analysis</span>
            <h1 className="text-5xl md:text-6xl font-bold tracking-tight mb-6 leading-[1.1]">
              Frictionless Carry <br />
              <span className="text-slate-400">The 2026 Evolution.</span>
            </h1>
            <p className="max-w-2xl text-lg text-slate-600 leading-relaxed">
              Addressing the "Slump," "Turtle Shell," and "Lying Volume" through three distinct design philosophies. 
              Built for the <span className="font-semibold text-slate-900">Maximum Efficiency Nomad</span>.
            </p>
          </motion.div>
        </div>

        {/* Ideas Grid */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8 mb-16">
          {PRODUCT_IDEAS.map((idea, index) => (
            <motion.div
              key={idea.id}
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.1 * index }}
              className="bg-white p-8 rounded-3xl border border-slate-200 hover:border-slate-300 hover:shadow-xl transition-all group relative overflow-hidden"
            >
              <div 
                className="absolute top-0 right-0 w-24 h-24 blur-3xl opacity-10 group-hover:opacity-20 transition-opacity"
                style={{ backgroundColor: idea.color }}
              />
              <div 
                className="w-12 h-12 rounded-2xl flex items-center justify-center mb-6 ring-4 ring-slate-50"
                style={{ backgroundColor: `${idea.color}20`, color: idea.color }}
              >
                {idea.icon}
              </div>
              <h3 className="text-2xl font-bold mb-2 group-hover:text-blue-600 transition-colors uppercase tracking-tight">{idea.name}</h3>
              <p className="text-xs font-bold text-slate-400 uppercase tracking-widest mb-4">{idea.focus}</p>
              <p className="text-slate-600 mb-6 text-sm leading-relaxed">{idea.description}</p>
              
              <div className="pt-6 border-t border-slate-100">
                <div className="flex items-center gap-2 mb-2">
                  <AlertCircle className="w-4 h-4 text-rose-500" />
                  <span className="text-xs font-bold text-rose-500 uppercase tracking-tighter">Solves: {idea.painPoint}</span>
                </div>
                <p className="text-xs text-slate-500 italic leading-snug">{idea.painPointDesc}</p>
              </div>
            </motion.div>
          ))}
        </div>

        {/* Comparison Section */}
        <div className="bg-white rounded-[2.5rem] border border-slate-200 overflow-hidden shadow-sm">
          <div className="p-8 md:p-12">
            <div className="flex flex-col md:flex-row md:items-end justify-between gap-6 mb-12">
              <div>
                <h2 className="text-3xl font-bold tracking-tight mb-2 uppercase">Core Performance Analytics</h2>
                <p className="text-slate-500">Cross-comparing technical KPIs for the 2026 market release.</p>
              </div>
              <div className="flex bg-slate-100 p-1 rounded-2xl self-start">
                <button 
                  onClick={() => setActiveTab('chart')}
                  className={`px-6 py-2 rounded-xl text-sm font-semibold transition-all ${activeTab === 'chart' ? 'bg-white shadow-sm text-slate-900' : 'text-slate-500 hover:text-slate-700'}`}
                >
                  Visual Analytics
                </button>
                <button 
                  onClick={() => setActiveTab('table')}
                  className={`px-6 py-2 rounded-xl text-sm font-semibold transition-all ${activeTab === 'table' ? 'bg-white shadow-sm text-slate-900' : 'text-slate-500 hover:text-slate-700'}`}
                >
                  Raw Metrics
                </button>
              </div>
            </div>

            <AnimatePresence mode="wait">
              {activeTab === 'chart' ? (
                <motion.div 
                  key="chart"
                  initial={{ opacity: 0, x: -20 }}
                  animate={{ opacity: 1, x: 0 }}
                  exit={{ opacity: 0, x: 20 }}
                  className="grid grid-cols-1 lg:grid-cols-4 gap-12"
                >
                  {/* Controls */}
                  <div className="lg:col-span-1 space-y-8">
                    <div>
                      <h4 className="text-xs font-bold text-slate-400 uppercase tracking-widest mb-6 flex items-center gap-2">
                        <Scale className="w-4 h-4" /> Priority Weights
                      </h4>
                      <div className="space-y-6">
                        {Object.entries(importanceWeights).map(([kpi, weight]) => (
                          <div key={kpi}>
                            <div className="flex justify-between text-xs font-bold mb-2">
                              <span>{kpi}</span>
                              <span className="text-slate-400 font-mono">x{weight}</span>
                            </div>
                            <input 
                              type="range" 
                              min="1" 
                              max="3" 
                              step="0.5" 
                              value={weight}
                              onChange={(e) => setImportanceWeights({...importanceWeights, [kpi]: parseFloat(e.target.value)})}
                              className="w-full h-1 bg-slate-100 rounded-lg appearance-none cursor-pointer accent-slate-900" 
                            />
                          </div>
                        ))}
                      </div>
                    </div>
                    <div className="p-4 bg-slate-50 rounded-2xl border border-slate-100">
                      <p className="text-[10px] text-slate-500 leading-relaxed uppercase font-medium">
                        Adjust weights to prioritize specific market needs. Scores update in real-time.
                      </p>
                    </div>
                  </div>

                  {/* Chart */}
                  <div className="lg:col-span-3 h-[450px] bg-slate-50/50 rounded-3xl p-6 border border-dashed border-slate-200">
                    <ResponsiveContainer width="100%" height="100%">
                      <BarChart data={chartData} margin={{ top: 20, right: 30, left: 20, bottom: 5 }}>
                        <CartesianGrid strokeDasharray="3 3" vertical={false} stroke="#e2e8f0" />
                        <XAxis dataKey="name" axisLine={false} tickLine={false} tick={{ fontSize: 10, fontWeight: 700, fill: '#64748b' }} dy={10} />
                        <YAxis axisLine={false} tickLine={false} tick={{ fontSize: 10, fontWeight: 700, fill: '#64748b' }} />
                        <Tooltip 
                          contentStyle={{ borderRadius: '16px', border: 'none', boxShadow: '0 10px 15px -3px rgb(0 0 0 / 0.1)', padding: '12px' }}
                          cursor={{ fill: '#f1f5f9' }}
                        />
                        <Legend iconType="circle" wrapperStyle={{ paddingTop: '30px', fontSize: '12px', fontWeight: 'bold' }} />
                        <Bar dataKey="Apex Sensor-Zip" fill={PRODUCT_IDEAS[0].color} radius={[4, 4, 0, 0]} barSize={24} />
                        <Bar dataKey="Vertical Chassis Zero" fill={PRODUCT_IDEAS[1].color} radius={[4, 4, 0, 0]} barSize={24} />
                        <Bar dataKey="Terra-True 360" fill={PRODUCT_IDEAS[2].color} radius={[4, 4, 0, 0]} barSize={24} />
                      </BarChart>
                    </ResponsiveContainer>
                  </div>
                </motion.div>
              ) : (
                <motion.div 
                  key="table"
                  initial={{ opacity: 0, x: 20 }}
                  animate={{ opacity: 1, x: 0 }}
                  exit={{ opacity: 0, x: -20 }}
                  className="overflow-x-auto"
                >
                  <table className="w-full text-left border-collapse">
                    <thead>
                      <tr className="border-b-2 border-slate-100">
                        <th className="py-4 px-6 text-xs font-bold text-slate-400 uppercase tracking-widest">Dimension</th>
                        {PRODUCT_IDEAS.map(idea => (
                          <th key={idea.id} className="py-4 px-6 text-xs font-bold text-slate-900 uppercase tracking-widest text-center" style={{ color: idea.color }}>
                            {idea.name}
                          </th>
                        ))}
                      </tr>
                    </thead>
                    <tbody>
                      {Object.keys(KPI_DESCRIPTIONS).map((kpi) => (
                        <tr key={kpi} className="border-b border-slate-50 hover:bg-slate-50/50 transition-colors">
                          <td className="py-6 px-6">
                            <span className="font-bold text-sm block mb-1">{kpi}</span>
                            <span className="text-[10px] text-slate-400 font-medium uppercase leading-tight italic block max-w-xs">{KPI_DESCRIPTIONS[kpi as keyof typeof KPI_DESCRIPTIONS]}</span>
                          </td>
                          {PRODUCT_IDEAS.map(idea => {
                            const value = idea.kpis[kpi as keyof typeof idea.kpis];
                            return (
                              <td key={idea.id} className="py-6 px-6 text-center">
                                <div className="inline-flex items-center justify-center w-10 h-10 rounded-full font-mono font-bold" style={{ backgroundColor: `${idea.color}10`, color: idea.color }}>
                                  {value}
                                </div>
                              </td>
                            );
                          })}
                        </tr>
                      ))}
                    </tbody>
                  </table>
                </motion.div>
              )}
            </AnimatePresence>
          </div>
        </div>

        {/* Winner Highlight */}
        <div className="mt-16 bg-slate-900 rounded-[3rem] p-12 text-white relative overflow-hidden">
          <div className="absolute top-0 right-0 w-1/2 h-full opacity-10 pointer-events-none">
            <Trophy className="w-64 h-64 absolute -bottom-12 -right-12 rotate-12" />
          </div>
          
          <div className="max-w-4xl relative z-10">
            <div className="flex items-center gap-3 mb-8">
              <div className="bg-amber-400 text-slate-900 p-1.5 rounded-full">
                <Trophy className="w-5 h-5" />
              </div>
              <span className="text-amber-400 font-bold text-sm uppercase tracking-widest">Strategic Recommendation</span>
            </div>

            <h2 className="text-4xl md:text-5xl font-bold tracking-tight mb-8">
              Market Leader: <span className="text-amber-400">{winningIdea.name}</span>
            </h2>
            
            <div className="grid grid-cols-1 md:grid-cols-2 gap-12 items-start">
              <div>
                <p className="text-lg text-slate-300 leading-relaxed mb-8">
                  Based on weighted KPI analysis, the <span className="text-white font-semibold underline underline-offset-4 decoration-amber-400">{winningIdea.name}</span> emerges as the most viable path forward for the 2026 urban market. 
                  It offers the strongest balance between {winningIdea.focus} and raw market portability.
                </p>
                <div className="flex flex-wrap gap-4">
                  <div className="flex items-center gap-2 bg-white/5 border border-white/10 px-4 py-2 rounded-xl">
                    <CheckCircle2 className="w-4 h-4 text-emerald-400" />
                    <span className="text-sm font-medium">High Volume Efficiency</span>
                  </div>
                  <div className="flex items-center gap-2 bg-white/5 border border-white/10 px-4 py-2 rounded-xl">
                    <CheckCircle2 className="w-4 h-4 text-emerald-400" />
                    <span className="text-sm font-medium">Urban Friction Low</span>
                  </div>
                  <div className="flex items-center gap-2 bg-white/5 border border-white/10 px-4 py-2 rounded-xl">
                    <CheckCircle2 className="w-4 h-4 text-emerald-400" />
                    <span className="text-sm font-medium">Premium Positioning</span>
                  </div>
                </div>
              </div>
              
              <div className="bg-white/5 backdrop-blur-sm p-8 rounded-3xl border border-white/10">
                <h4 className="text-xs font-bold text-slate-400 uppercase tracking-widest mb-6">Final Rationale</h4>
                <div className="space-y-6">
                  <div className="flex gap-4">
                    <ShieldCheck className="w-6 h-6 text-amber-400 shrink-0" />
                    <div>
                      <p className="font-bold text-sm mb-1 uppercase tracking-tight">Competitive Moat</p>
                      <p className="text-slate-400 text-xs leading-relaxed">The proprietary hardware/material blend creates a high barrier to entry for budget competitors.</p>
                    </div>
                  </div>
                  <div className="flex gap-4">
                    <Maximize2 className="w-6 h-6 text-amber-400 shrink-0" />
                    <div>
                      <p className="font-bold text-sm mb-1 uppercase tracking-tight">Ecosystem Potential</p>
                      <p className="text-slate-400 text-xs leading-relaxed">Modular design path provides a sustainable multi-year revenue stream through accessory add-ons.</p>
                    </div>
                  </div>
                </div>
                <button className="w-full mt-10 bg-white text-slate-900 py-4 rounded-2xl font-bold uppercase tracking-widest text-xs hover:bg-amber-400 transition-colors shadow-xl">
                  Download Full Business Deck
                </button>
              </div>
            </div>
          </div>
        </div>
      </main>

      {/* Footer */}
      <footer className="border-t border-slate-200 py-12 mt-20">
        <div className="max-w-7xl mx-auto px-4 flex flex-col md:flex-row justify-between items-center gap-8">
          <div className="flex items-center gap-2 opacity-50 grayscale">
            <Backpack className="w-5 h-5 text-slate-900" />
            <span className="font-bold tracking-tight text-sm">Lions-Carry Project 2B</span>
          </div>
          <div className="text-xs text-slate-400 font-medium tracking-tight">
            Designed for Assignment 2B by <span className="text-slate-900 font-bold italic">dwawrzynski@lions.molloy.edu</span>
          </div>
        </div>
      </footer>
    </div>
  );
}

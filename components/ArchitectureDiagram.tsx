import React, { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import {
    Code,
    Box,
    ShieldAlert,
    ClipboardCheck,
    Truck,
    Activity,
    HeartPulse
} from 'lucide-react';

const stages = [
    { id: 'dev', label: 'Commit', icon: <Code size={24} />, color: 'emerald' },
    { id: 'build', label: 'Build', icon: <Box size={24} />, color: 'cyan' },
    { id: 'security', label: 'Security Scan', icon: <ShieldAlert size={24} />, color: 'violet' },
    { id: 'qa', label: 'QA / Test', icon: <ClipboardCheck size={24} />, color: 'blue' },
    { id: 'deploy', label: 'Deploy', icon: <Truck size={24} />, color: 'emerald' },
    { id: 'monitor', label: 'Monitor', icon: <Activity size={24} />, color: 'cyan' },
    { id: 'recover', label: 'Self-Heal', icon: <HeartPulse size={24} />, color: 'rose' },
];

const ArchitectureDiagram: React.FC = () => {
    const [activeStage, setActiveStage] = useState(0);

    useEffect(() => {
        const timer = setInterval(() => {
            setActiveStage((prev) => (prev + 1) % stages.length);
        }, 3000);
        return () => clearInterval(timer);
    }, []);

    return (
        <section className="hidden lg:block py-32 bg-slate-50 dark:bg-[#0a0a0a] relative overflow-hidden transition-colors duration-300 text-left">
            {/* Background decorative elements - Matching Experience.tsx */}
            <div className="absolute inset-0 pointer-events-none">
                <div className="absolute top-20 left-10 w-72 h-72 bg-emerald-500/5 dark:bg-emerald-500/10 rounded-full blur-[100px]" />
                <div className="absolute bottom-20 right-10 w-72 h-72 bg-blue-500/5 dark:bg-blue-500/10 rounded-full blur-[100px]" />
            </div>

            {/* Schematic Grid Background */}
            <div className="absolute inset-0 opacity-[0.05] dark:opacity-[0.08] pointer-events-none"
                style={{ backgroundImage: 'radial-gradient(#00d4ff 1px, transparent 1px)', backgroundSize: '40px 40px' }} />

            <div className="container mx-auto px-6 relative z-10">
                <div className="max-w-7xl mx-auto">
                    <div className="mb-16">
                        <motion.h2
                            initial={{ opacity: 0, y: -20 }}
                            whileInView={{ opacity: 1, y: 0 }}
                            viewport={{ once: true }}
                            className="text-3xl font-bold mb-4 text-slate-900 dark:text-white tracking-tight"
                        >
                            Hardened Pipeline Architecture
                        </motion.h2>
                        <motion.p
                            initial={{ opacity: 0 }}
                            whileInView={{ opacity: 1 }}
                            viewport={{ once: true }}
                            transition={{ delay: 0.2 }}
                            className="text-slate-600 dark:text-slate-400 text-lg"
                        >
                            Visualization of my automated security and delivery lifecycle.
                        </motion.p>
                    </div>

                    <div className="relative pt-16 pb-24 px-12 rounded-[2rem] bg-white dark:bg-[#0c0c0c] border border-slate-200 dark:border-slate-800/50 shadow-2xl">
                        <div className="flex items-center justify-between relative px-8 py-8">
                            {/* Connector Line Background - Fixed Visibility */}
                            <div className="absolute top-1/2 left-0 w-full h-[2px] bg-[#00d4ff]/10 dark:bg-[#00d4ff]/5 -translate-y-1/2 z-0" />

                            {/* Active Cyan Glow Connector */}
                            <motion.div
                                className="absolute top-1/2 left-0 h-[2px] bg-[#00d4ff] -translate-y-1/2 z-0 origin-left shadow-[0_0_20px_rgba(0,212,255,0.6)]"
                                animate={{ width: `${(activeStage / (stages.length - 1)) * 100}%` }}
                                transition={{ duration: 0.8, ease: "easeInOut" }}
                            />

                            {stages.map((stage, idx) => (
                                <div key={stage.id} className="flex flex-col items-center relative z-10">
                                    {/* Stage Node */}
                                    <motion.button
                                        onClick={() => setActiveStage(idx)}
                                        className={`w-16 h-16 rounded-2xl flex items-center justify-center transition-all duration-500 relative ${activeStage === idx
                                            ? 'bg-[#00d4ff] text-black shadow-[0_0_30px_rgba(0,212,255,0.5)] scale-110'
                                            : activeStage > idx
                                                ? 'bg-slate-100 dark:bg-slate-800 text-[#00d4ff] border border-[#00d4ff]/20'
                                                : 'bg-white dark:bg-[#1a1a1a] text-slate-400 dark:text-slate-600 border border-slate-200 dark:border-slate-800 shadow-sm'
                                            }`}
                                    >
                                        {React.cloneElement(stage.icon as React.ReactElement, { size: 24 })}

                                        {activeStage === idx && (
                                            <span className="absolute -top-1 -right-1 flex h-4 w-4">
                                                <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-cyan-400 opacity-75"></span>
                                                <span className="relative inline-flex rounded-full h-4 w-4 bg-cyan-500"></span>
                                            </span>
                                        )}
                                    </motion.button>

                                    {/* Stage Label - Uppercase */}
                                    <div className="mt-8 text-center">
                                        <span className={`text-[11px] font-mono font-bold uppercase tracking-[0.2em] transition-all duration-300 ${activeStage === idx ? 'text-[#00d4ff]' : 'text-slate-500 dark:text-slate-400'
                                            }`}>
                                            {stage.label}
                                        </span>
                                    </div>
                                </div>
                            ))}
                        </div>

                        {/* Minimal Status Box at bottom of container */}
                        <div className="absolute bottom-8 left-1/2 -translate-x-1/2 flex flex-col items-center">
                            <AnimatePresence mode="wait">
                                <motion.div
                                    key={activeStage}
                                    initial={{ opacity: 0, y: 10 }}
                                    animate={{ opacity: 1, y: 0 }}
                                    exit={{ opacity: 0, y: -10 }}
                                    className="bg-slate-50 dark:bg-black border border-slate-200 dark:border-slate-800/80 px-5 py-2.5 rounded-lg font-mono text-[10px] text-slate-500 dark:text-slate-400 space-y-1 flex flex-col items-center shadow-lg"
                                >
                                    <div className="tracking-widest">STATUS: <span className="text-emerald-500 dark:text-emerald-400 font-bold uppercase">Processed_Active</span></div>
                                    <div className="tracking-widest">ENCLAVE: <span className="text-cyan-500 uppercase">Secure_VPC</span></div>
                                </motion.div>
                            </AnimatePresence>
                        </div>
                    </div>

                    <div className="mt-20 grid grid-cols-1 md:grid-cols-3 gap-8">
                        {[
                            { icon: ShieldAlert, title: 'Security Enclaves', desc: 'Every pipeline stage runs in a dedicated ephemeral VPC with zero-trust networking.' },
                            { icon: Code, title: 'Static Integrity', desc: 'Pre-commit hooks and PR decorators enforce signature verification and secret-leak detection.' },
                            { icon: Activity, title: 'Active Observability', desc: 'Full distributed tracing from deployment to runtime, with automated rollback triggers.' }
                        ].map((card, i) => (
                            <motion.div
                                key={i}
                                initial={{ opacity: 0, y: 20 }}
                                whileInView={{ opacity: 1, y: 0 }}
                                viewport={{ once: true }}
                                transition={{ delay: i * 0.1 }}
                                className="p-8 rounded-2xl bg-white dark:bg-[#0c0c0c] border border-slate-200 dark:border-slate-800/50 hover:border-[#00d4ff]/30 transition-all group shadow-sm hover:shadow-xl"
                            >
                                <h4 className="font-bold text-slate-900 dark:text-white mb-4 flex items-center gap-3">
                                    <div className="p-2 rounded-lg bg-slate-50 dark:bg-slate-900 text-[#00d4ff] border border-slate-100 dark:border-slate-800">
                                        <card.icon size={20} />
                                    </div>
                                    {card.title}
                                </h4>
                                <p className="text-sm text-slate-600 dark:text-slate-400 leading-relaxed text-left">
                                    {card.desc}
                                </p>
                            </motion.div>
                        ))}
                    </div>
                </div>
            </div>
        </section>
    );
};

export default ArchitectureDiagram;

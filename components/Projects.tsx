import React from 'react';
import { motion } from 'framer-motion';
import { PROJECTS } from '../constants';
import { ExternalLink, GitCommit, Layers, Terminal, Github } from 'lucide-react';

const PROJECT_LOGS: Record<string, string[]> = {
  '1': [
    "> starting omnitest suite...",
    "[EXEC] spinning up playwright",
    "[TEST] authentication flow: PASS",
    "[TEST] payments integration: PASS",
    "[INFO] regression results: 142/142",
    "[WARN] api latency @ 120ms",
    "> quality gate certified.",
    "> test logs synced."
  ],
  '2': [
    "> initializing sentinel --mode=strict",
    "[INFO] scanning dependencies...",
    "[PASS] 0 vulnerabilities detected",
    "[EXEC] starting sonarqube analysis",
    "[INFO] code coverage: 70%",
    "[PASS] gates verification successful",
    "> deployment secure.",
    "> system monitoring active."
  ],
  '3': [
    "> deploying rbac policies...",
    "[AUTH] validating jwt signatures",
    "[SYNC] firestore rules applied",
    "[INFO] zero-drift check complete",
    "[PASS] admin perimeter secure",
    "> monitoring privilege usage",
    "> system synchronization ok."
  ]
};

const Projects: React.FC = () => {
  return (
    <section id="projects" className="py-24 bg-white dark:bg-[#0f172a] scroll-mt-28">
      <div className="container mx-auto px-6">
        <div className="flex flex-col md:flex-row justify-between items-end mb-16 gap-4">
          <div>
            <motion.h2
              initial={{ opacity: 0, x: -20 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true }}
              className="text-3xl md:text-4xl font-bold text-slate-900 dark:text-white mb-2"
            >
              Featured <span className="text-violet-500">Deployments</span>
            </motion.h2>
            <motion.p
              initial={{ opacity: 0 }}
              whileInView={{ opacity: 1 }}
              viewport={{ once: true }}
              transition={{ delay: 0.2 }}
              className="text-slate-500 dark:text-slate-400"
            >
              Real-world solutions for complex engineering problems.
            </motion.p>
          </div>
        </div>

        <div className="space-y-24">
          {PROJECTS.map((project, index) => (
            <motion.div
              key={project.id}
              initial={{ opacity: 0, y: 100 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, margin: "-100px" }}
              transition={{ duration: 0.7, ease: "easeOut" }}
              className="group grid grid-cols-1 lg:grid-cols-12 gap-12 items-start"
            >
              {/* Project Visual / Abstract Rep */}
              <div className={`lg:col-span-5 relative ${index % 2 === 1 ? 'lg:order-2' : ''}`}>
                <motion.div
                  initial={{ scale: 0.9, opacity: 0 }}
                  whileInView={{ scale: 1, opacity: 1 }}
                  viewport={{ once: true }}
                  transition={{ delay: 0.2, duration: 0.5 }}
                  className="aspect-[4/3] rounded-2xl overflow-hidden bg-slate-100 dark:bg-slate-800 border border-slate-200 dark:border-slate-700 relative shadow-2xl"
                >
                  {/* Abstract Code UI Representation */}
                  <div className="absolute inset-4 bg-white dark:bg-[#0a0a0a] rounded-lg shadow-sm border border-slate-200 dark:border-slate-800 p-4 font-mono text-xs overflow-hidden">
                    <div className="flex gap-2 mb-4 border-b border-slate-100 dark:border-slate-800 pb-2">
                      <div className="w-3 h-3 rounded-full bg-red-400"></div>
                      <div className="w-3 h-3 rounded-full bg-amber-400"></div>
                      <div className="w-3 h-3 rounded-full bg-emerald-400"></div>
                    </div>
                    <div className="space-y-2 text-slate-400">
                      <p><span className="text-violet-500">const</span> <span className="text-blue-500">{project.id === '1' ? 'pipeline' : 'testSuite'}</span> = <span className="text-emerald-500">new</span> <span className="text-amber-500">{project.category}</span>Config();</p>

                      {/* Auto-scrolling Logs */}
                      <div className="mt-4 pt-4 border-t border-slate-100 dark:border-slate-800 h-32 overflow-hidden relative">
                        <motion.div
                          animate={{ y: [0, -120] }}
                          transition={{ duration: 10, repeat: Infinity, ease: "linear" }}
                          className="space-y-1"
                        >
                          {[...(PROJECT_LOGS[project.id] || []), ...(PROJECT_LOGS[project.id] || [])].map((log, i) => (
                            <p key={i} className={`text-[10px] ${log.startsWith('>') ? 'text-emerald-500' : log.includes('[PASS]') ? 'text-blue-500' : ''}`}>
                              {log}
                            </p>
                          ))}
                        </motion.div>
                        <div className="absolute inset-x-0 bottom-0 h-8 bg-gradient-to-t from-white dark:from-[#0a0a0a] to-transparent pointer-events-none"></div>
                      </div>

                      <p className="text-emerald-600 dark:text-emerald-400 mt-2 animate-pulse flex items-center gap-2">
                        <Terminal size={10} /> {project.title} running...
                      </p>
                    </div>
                  </div>
                </motion.div>

                {/* Floating Badge */}
                <motion.div
                  initial={{ scale: 0, rotate: -20 }}
                  whileInView={{ scale: 1, rotate: 0 }}
                  viewport={{ once: true }}
                  transition={{ delay: 0.4, type: "spring" }}
                  className="absolute -bottom-6 -right-6 bg-white dark:bg-slate-800 p-4 rounded-xl shadow-xl border border-slate-100 dark:border-slate-700 z-10"
                >
                  <Layers className="text-violet-500 mb-1" />
                  <div className="text-xs font-bold text-slate-900 dark:text-white">{project.category}</div>
                </motion.div>
              </div>

              {/* Content */}
              <div className={`lg:col-span-7 ${index % 2 === 1 ? 'lg:order-1' : ''}`}>
                <motion.div
                  initial={{ opacity: 0, x: index % 2 === 1 ? -30 : 30 }}
                  whileInView={{ opacity: 1, x: 0 }}
                  viewport={{ once: true }}
                  transition={{ delay: 0.3, duration: 0.5 }}
                >
                  <div className="flex items-center gap-3 mb-4">
                    <span className="px-3 py-1 rounded-full text-xs font-bold bg-violet-100 dark:bg-violet-900/30 text-violet-600 dark:text-violet-300 uppercase tracking-wider">
                      {project.category}
                    </span>
                  </div>

                  <div className="flex justify-between items-start mb-6">
                    <h3 className="text-2xl md:text-3xl font-bold text-slate-900 dark:text-white group-hover:text-emerald-500 transition-colors">
                      {project.title}
                    </h3>
                    {project.github && (
                      <motion.a
                        href={project.github}
                        target="_blank"
                        rel="noopener noreferrer"
                        whileHover={{ scale: 1.05, boxShadow: "0 0 20px rgba(16, 185, 129, 0.2)" }}
                        whileTap={{ scale: 0.95 }}
                        className="flex items-center gap-0 hover:gap-2 px-3 py-2 rounded-xl bg-slate-100/80 dark:bg-slate-800/80 text-emerald-500 dark:text-emerald-400 group-hover/github:text-white transition-all border border-slate-200 dark:border-slate-700 hover:border-emerald-500/50 group/github shadow-sm backdrop-blur-sm"
                      >
                        <Github size={20} className="transition-colors" />
                        <span className="max-w-0 group-hover/github:max-w-[80px] transition-all duration-300 overflow-hidden whitespace-nowrap text-[10px] font-bold uppercase tracking-wider">
                          GitHub
                        </span>
                      </motion.a>
                    )}
                  </div>

                  <div className="space-y-6 text-slate-600 dark:text-slate-300">
                    <div>
                      <h4 className="text-sm font-bold text-slate-900 dark:text-white uppercase tracking-wide mb-1 flex items-center gap-2">
                        <span className="w-2 h-2 rounded-full bg-red-400"></span> The Problem
                      </h4>
                      <p>{project.problem}</p>
                    </div>

                    <div>
                      <h4 className="text-sm font-bold text-slate-900 dark:text-white uppercase tracking-wide mb-1 flex items-center gap-2">
                        <span className="w-2 h-2 rounded-full bg-emerald-400"></span> The Solution
                      </h4>
                      <p>{project.solution}</p>
                    </div>

                    <div className="bg-emerald-50 dark:bg-emerald-900/10 p-4 rounded-lg border border-emerald-100 dark:border-emerald-900/20">
                      <h4 className="text-sm font-bold text-emerald-800 dark:text-emerald-300 uppercase tracking-wide mb-1">Impact</h4>
                      <p className="text-emerald-700 dark:text-emerald-400 text-sm font-medium">{project.impact}</p>
                    </div>
                  </div>

                  <div className="mt-8 pt-6 border-t border-slate-100 dark:border-slate-800">
                    <h4 className="text-xs font-mono text-slate-400 mb-3">TECHNOLOGIES DEPLOYED</h4>
                    <div className="flex flex-wrap gap-2">
                      {project.tools.map(tool => (
                        <span key={tool} className="flex items-center gap-1 text-xs font-medium px-2 py-1 rounded bg-slate-100 dark:bg-slate-800 text-slate-600 dark:text-slate-400">
                          <GitCommit size={10} /> {tool}
                        </span>
                      ))}
                    </div>
                  </div>
                </motion.div>
              </div>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default Projects;
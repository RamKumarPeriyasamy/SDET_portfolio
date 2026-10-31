import React, { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { PROJECTS } from '../constants';
import { Project } from '../types';
import { ExternalLink, GitCommit, Layers, Terminal, Github, Maximize2, Minimize2, X } from 'lucide-react';

const PROJECT_LOGS: Record<string, string[]> = {
  '1': [
    "> starting omnitest suite...",
    "[EXEC] spinning up playwright workers",
    "[TEST] authentication flow: PASS",
    "[TEST] payments integration: PASS",
    "[INFO] regression results: 142/142",
    "[WARN] api latency @ 120ms",
    "[EXEC] generating allure reports",
    "> quality gate certified.",
    "> test logs synced to allure bucket.",
    "[PASS] e2e regression suite complete."
  ],
  '2': [
    "> initializing sentinel --mode=strict",
    "[INFO] scanning dependencies...",
    "[PASS] 0 vulnerabilities detected",
    "[EXEC] starting sonarqube analysis",
    "[INFO] code coverage: 88.4%",
    "[EXEC] running trivy container scanner",
    "[PASS] 0 critical CVEs found in base image",
    "[PASS] gates verification successful",
    "> deployment secure.",
    "> system monitoring active."
  ],
  '3': [
    "> deploying rbac policies...",
    "[AUTH] validating jwt signatures",
    "[SYNC] firestore rules applied",
    "[EXEC] probing ingress routes",
    "[INFO] zero-drift check complete",
    "[PASS] admin perimeter secure",
    "[METRICS] prometheus collector active",
    "> monitoring privilege usage",
    "> system synchronization ok."
  ]
};

const PROJECT_FULL_LOGS: Record<string, { cmd: string; lines: Array<{ text: string; type?: 'info' | 'success' | 'warn' | 'cmd' | 'dim' }> }> = {
  '1': {
    cmd: 'npm run test:e2e -- --project=chromium,firefox,webkit --reporter=allure',
    lines: [
      { text: '> omnitest-core@2.4.0 test:e2e', type: 'dim' },
      { text: '> playwright test --config=playwright.config.ts', type: 'dim' },
      { text: '[INIT] Parsing test fixtures and test environment variables...', type: 'info' },
      { text: '[EXEC] Spinning up worker pool (8 parallel browser workers)', type: 'info' },
      { text: '[WORKER-1] Running Chromium: auth/login.spec.ts', type: 'cmd' },
      { text: '[WORKER-2] Running Firefox: checkout/payment-gateway.spec.ts', type: 'cmd' },
      { text: '[WORKER-3] Running WebKit: dashboard/analytics-reporting.spec.ts', type: 'cmd' },
      { text: '[WORKER-4] Running Chromium: api/user-session-validation.spec.ts', type: 'cmd' },
      { text: '[PASS] auth/login.spec.ts: standard user auth flow (342ms)', type: 'success' },
      { text: '[PASS] auth/login.spec.ts: multi-factor authentication token (410ms)', type: 'success' },
      { text: '[PASS] api/user-session-validation.spec.ts: JWT payload verification (89ms)', type: 'success' },
      { text: '[WARN] api/user-session-validation.spec.ts: latency warning @ 120ms (threshold: 150ms)', type: 'warn' },
      { text: '[PASS] checkout/payment-gateway.spec.ts: idempotency key verification (512ms)', type: 'success' },
      { text: '[PASS] checkout/payment-gateway.spec.ts: stripe webhook listener (280ms)', type: 'success' },
      { text: '[PASS] dashboard/analytics-reporting.spec.ts: chart rendering & data sync (640ms)', type: 'success' },
      { text: '[INFO] Regression suite complete: 142/142 tests passed (0 failed, 0 flaky)', type: 'info' },
      { text: '[EXEC] Generating Allure Report artifacts to ./allure-results', type: 'info' },
      { text: '[PASS] Quality Gate Certified: 100% test coverage threshold met', type: 'success' },
      { text: '> Artifacts synced to S3 bucket: s3://reports.ramkumar.portfolio/omnitest/build-842', type: 'success' },
      { text: '✨ Finished in 14.32s with zero exit code', type: 'success' }
    ]
  },
  '2': {
    cmd: 'jenkins-cli build sentinel-prod-pipeline -p ENVIRONMENT=production -s',
    lines: [
      { text: '> [PIPELINE] Started by GitLab webhook: commit #8f12a4b [main]', type: 'dim' },
      { text: '[STAGE 1: CHECKOUT] SCM checkout git@github.com:RamKumarPeriyasamy/jenkins_pipeline_script', type: 'info' },
      { text: '[STAGE 2: SAST SCAN] Running SonarQube Scanner 5.0.1...', type: 'info' },
      { text: '[SONAR] Indexing 184 source files in /src and /packages', type: 'cmd' },
      { text: '[SONAR] Code Smells: 0 | Bugs: 0 | Vulnerabilities: 0 | Security Hotspots: 0', type: 'success' },
      { text: '[SONAR] Quality Gate: PASSED (Code Coverage: 88.4%)', type: 'success' },
      { text: '[STAGE 3: DEPENDENCY AUDIT] OWASP Dependency-Check v9.0.2', type: 'info' },
      { text: '[PASS] 0 critical CVEs detected in package lockfile', type: 'success' },
      { text: '[STAGE 4: CONTAINER SECURITY] Trivy container image scan', type: 'info' },
      { text: '[TRIVY] Scanning image ramkumar/sentinel-api:v2.1.0-842...', type: 'cmd' },
      { text: '[PASS] CRITICAL: 0, HIGH: 0, MEDIUM: 2 (suppressed via policy), LOW: 4', type: 'success' },
      { text: '[STAGE 5: SECRET DETECTION] Running Gitleaks detect --redact', type: 'info' },
      { text: '[PASS] No leaked credentials, private keys, or API tokens detected', type: 'success' },
      { text: '[STAGE 6: DAST SCAN] OWASP ZAP baseline scan against staging endpoint', type: 'info' },
      { text: '[PASS] Active security baseline certified. 0 high risk alerts.', type: 'success' },
      { text: '[STAGE 7: ARTIFACTORY] Image pushed to registry.docker.internal:5000', type: 'info' },
      { text: '> Production Deployment Gate: APPROVED by Automated Security Policy', type: 'success' },
      { text: '✨ Pipeline Sentinel executed successfully [Duration: 3m 42s]', type: 'success' }
    ]
  },
  '3': {
    cmd: 'kubectl apply -f manifests/rbac-dashboard/ --record && kubectl rollout status deploy/rbac-ui',
    lines: [
      { text: '> Initializing Kubernetes RBAC Policy Enforcement engine...', type: 'dim' },
      { text: '[AUTH] Validating RS256 JWT public keys and signature issuers...', type: 'info' },
      { text: '[RBAC] Applying ClusterRole: audit-manager to ServiceAccount: admin-dashboard', type: 'cmd' },
      { text: '[PASS] clusterrole.rbac.authorization.k8s.io/audit-manager configured', type: 'success' },
      { text: '[PASS] clusterrolebinding.rbac.authorization.k8s.io/audit-manager-binding configured', type: 'success' },
      { text: '[CONFIG] Loading Nginx ingress rules with TLS termination (Let\'s Encrypt)', type: 'info' },
      { text: '[SECRETS] Vault integration verified: secrets injected into namespace \'production\'', type: 'info' },
      { text: '[DB] Firestore audit trail rules deployed: write-only log sink active', type: 'info' },
      { text: '[EXEC] Probing zero-drift policy compliance against baseline manifest...', type: 'cmd' },
      { text: '[PASS] 0 drift detected. Desired state matches running state.', type: 'success' },
      { text: '[PROMETHEUS] ServiceMonitor deployed: scraping metrics on :9090/metrics', type: 'info' },
      { text: '[LOKI] Centralized audit log shipper connected: 420 events/sec ingested', type: 'info' },
      { text: '[PASS] deployment.apps/rbac-ui: all 3 replicas available and healthy', type: 'success' },
      { text: '> ISO 27001 Access Audit check: 100% compliant. Perimeter fully secured.', type: 'success' },
      { text: '✨ Service online: https://rbac.ramkumar.internal (Ingress 10.0.4.12)', type: 'success' }
    ]
  }
};

const Projects: React.FC = () => {
  const [fullscreenProject, setFullscreenProject] = useState<Project | null>(null);

  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if (e.key === 'Escape') {
        setFullscreenProject(null);
      }
    };
    if (fullscreenProject) {
      document.body.style.overflow = 'hidden';
      window.addEventListener('keydown', handleKeyDown);
    } else {
      document.body.style.overflow = 'unset';
    }
    return () => {
      document.body.style.overflow = 'unset';
      window.removeEventListener('keydown', handleKeyDown);
    };
  }, [fullscreenProject]);

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

        <div className="space-y-16 md:space-y-24">
          {PROJECTS.map((project, index) => (
            <motion.div
              key={project.id}
              initial={{ opacity: 0, y: 100 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, margin: "-100px" }}
              transition={{ duration: 0.7, ease: "easeOut" }}
              className="group grid grid-cols-1 md:grid-cols-12 gap-8 lg:gap-12 items-start"
            >
              {/* Project Visual / Abstract Rep */}
              <div className={`hidden md:block md:col-span-5 relative ${index % 2 === 1 ? 'md:order-2' : ''}`}>
                <motion.div
                  initial={{ scale: 0.9, opacity: 0 }}
                  whileInView={{ scale: 1, opacity: 1 }}
                  viewport={{ once: true }}
                  transition={{ delay: 0.2, duration: 0.5 }}
                  className="aspect-[4/3] rounded-2xl overflow-hidden bg-slate-100 dark:bg-slate-800 border border-slate-200 dark:border-slate-700 relative shadow-2xl"
                >
                  {/* Abstract Code UI Representation - fills full card height */}
                  <div className="absolute inset-3 sm:inset-4 bg-white dark:bg-[#0a0a0a] rounded-xl shadow-sm border border-slate-200 dark:border-slate-800 p-3 sm:p-4 font-mono text-xs flex flex-col justify-between overflow-hidden">
                    {/* Terminal Header */}
                    <div className="flex items-center justify-between pb-2 border-b border-slate-200 dark:border-slate-800">
                      <div className="flex items-center gap-1.5">
                        <button
                          onClick={() => setFullscreenProject(project)}
                          title="Full Screen Terminal"
                          className="w-3 h-3 rounded-full bg-red-400 hover:opacity-80 transition-opacity cursor-pointer"
                        />
                        <button
                          onClick={() => setFullscreenProject(project)}
                          title="Full Screen Terminal"
                          className="w-3 h-3 rounded-full bg-amber-400 hover:opacity-80 transition-opacity cursor-pointer"
                        />
                        <button
                          onClick={() => setFullscreenProject(project)}
                          title="Open Full Screen Terminal"
                          className="w-3 h-3 rounded-full bg-emerald-400 hover:opacity-80 transition-opacity cursor-pointer flex items-center justify-center group/dot"
                        >
                          <Maximize2 size={6} className="text-emerald-950 opacity-0 group-hover/dot:opacity-100 transition-opacity" />
                        </button>
                      </div>
                      <div className="text-[10px] text-slate-400 font-mono tracking-wider">
                        {project.category.toLowerCase()} ~ bash
                      </div>
                      <button
                        onClick={() => setFullscreenProject(project)}
                        className="p-1 rounded text-slate-400 hover:text-slate-900 dark:hover:text-white hover:bg-slate-100 dark:hover:bg-slate-800 transition-colors cursor-pointer"
                        title="Open in Full Screen"
                      >
                        <Maximize2 size={12} />
                      </button>
                    </div>

                    {/* Terminal Command Line */}
                    <div className="py-1 text-slate-500 dark:text-slate-400 text-[11px] truncate">
                      <span className="text-violet-500 font-semibold">const</span>{' '}
                      <span className="text-blue-500">{project.id === '1' ? 'pipeline' : project.id === '2' ? 'sentinel' : 'rbacEngine'}</span>{' '}
                      ={' '}
                      <span className="text-emerald-500">new</span>{' '}
                      <span className="text-amber-500">{project.category}</span>Config();
                    </div>

                    {/* Auto-scrolling Logs - stretches to fill all available space */}
                    <div className="flex-1 min-h-0 py-1 overflow-hidden relative border-t border-slate-100 dark:border-slate-800/80">
                      <motion.div
                        animate={{ y: [0, -140] }}
                        transition={{ duration: 12, repeat: Infinity, ease: "linear" }}
                        className="space-y-1.5"
                      >
                        {[
                          ...(PROJECT_LOGS[project.id] || []),
                          ...(PROJECT_LOGS[project.id] || []),
                          ...(PROJECT_LOGS[project.id] || [])
                        ].map((log, i) => (
                          <p
                            key={i}
                            className={`text-[10px] sm:text-[11px] leading-relaxed truncate ${
                              log.startsWith('>')
                                ? 'text-emerald-500 font-semibold'
                                : log.includes('[PASS]')
                                ? 'text-cyan-500 font-medium'
                                : log.includes('[WARN]')
                                ? 'text-amber-400'
                                : log.includes('[EXEC]')
                                ? 'text-violet-400'
                                : 'text-slate-600 dark:text-slate-400'
                            }`}
                          >
                            {log}
                          </p>
                        ))}
                      </motion.div>
                      {/* Gradient Fades */}
                      <div className="absolute inset-x-0 top-0 h-4 bg-gradient-to-b from-white dark:from-[#0a0a0a] to-transparent pointer-events-none" />
                      <div className="absolute inset-x-0 bottom-0 h-6 bg-gradient-to-t from-white dark:from-[#0a0a0a] to-transparent pointer-events-none" />
                    </div>

                    {/* Bottom Status & Full Screen Button */}
                    <div className="pt-2 border-t border-slate-100 dark:border-slate-800 flex items-center justify-between text-[10px] sm:text-[11px]">
                      <p className="text-emerald-600 dark:text-emerald-400 animate-pulse flex items-center gap-1.5 font-medium truncate">
                        <Terminal size={11} className="shrink-0" />
                        <span className="truncate">{project.title} running...</span>
                      </p>
                      <button
                        onClick={() => setFullscreenProject(project)}
                        className="shrink-0 ml-2 inline-flex items-center gap-1 text-[10px] font-mono text-slate-500 dark:text-slate-400 hover:text-emerald-500 dark:hover:text-emerald-400 px-2 py-0.5 rounded bg-slate-100 dark:bg-slate-800/80 hover:bg-slate-200 dark:hover:bg-slate-700 transition-colors border border-slate-200 dark:border-slate-700 cursor-pointer"
                      >
                        <Maximize2 size={10} />
                        <span>Full Screen</span>
                      </button>
                    </div>
                  </div>
                </motion.div>

                {/* Floating Badge */}
                <motion.div
                  initial={{ scale: 0, rotate: -20 }}
                  whileInView={{ scale: 1, rotate: 0 }}
                  viewport={{ once: true }}
                  transition={{ delay: 0.4, type: "spring" }}
                  className="absolute -bottom-4 right-0 md:-bottom-6 md:-right-4 lg:-right-6 bg-white dark:bg-slate-800 p-4 rounded-xl shadow-xl border border-slate-100 dark:border-slate-700 z-10"
                >
                  <Layers className="text-violet-500 mb-1" />
                  <div className="text-xs font-bold text-slate-900 dark:text-white">{project.category}</div>
                </motion.div>
              </div>

              {/* Content */}
              <div className={`w-full md:col-span-7 ${index % 2 === 1 ? 'md:order-1' : ''}`}>
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

      {/* Interactive Full Screen Terminal Modal */}
      <AnimatePresence>
        {fullscreenProject && (
          <div
            role="dialog"
            aria-modal="true"
            className="fixed inset-0 z-50 flex items-center justify-center p-3 sm:p-6 md:p-8 bg-black/85 backdrop-blur-md"
            onClick={() => setFullscreenProject(null)}
          >
            <motion.div
              initial={{ opacity: 0, scale: 0.94, y: 20 }}
              animate={{ opacity: 1, scale: 1, y: 0 }}
              exit={{ opacity: 0, scale: 0.94, y: 20 }}
              transition={{ duration: 0.25, ease: "easeOut" }}
              className="w-full max-w-5xl h-[88vh] max-h-[850px] bg-[#0c0d12] dark:bg-[#07090e] border border-slate-700/80 rounded-2xl shadow-2xl flex flex-col overflow-hidden text-slate-200 font-mono"
              onClick={(e) => e.stopPropagation()}
            >
              {/* Fullscreen Titlebar */}
              <div className="flex items-center justify-between px-4 py-3 bg-[#151821] border-b border-slate-800 select-none">
                <div className="flex items-center gap-2">
                  <button
                    onClick={() => setFullscreenProject(null)}
                    className="w-3.5 h-3.5 rounded-full bg-red-500 hover:bg-red-600 transition-colors flex items-center justify-center group cursor-pointer"
                    title="Close Full Screen (Esc)"
                  >
                    <X size={8} className="text-black opacity-0 group-hover:opacity-100" />
                  </button>
                  <button
                    onClick={() => setFullscreenProject(null)}
                    className="w-3.5 h-3.5 rounded-full bg-amber-500 hover:bg-amber-600 transition-colors flex items-center justify-center group cursor-pointer"
                    title="Minimize"
                  >
                    <Minimize2 size={8} className="text-black opacity-0 group-hover:opacity-100" />
                  </button>
                  <button
                    className="w-3.5 h-3.5 rounded-full bg-emerald-500 hover:bg-emerald-600 transition-colors cursor-pointer"
                    title="Full Screen Active"
                  />
                  <span className="ml-3 text-xs text-slate-400 hidden sm:inline-block">
                    ramkumar@portfolio:~/{fullscreenProject.category.toLowerCase()}/{fullscreenProject.id}
                  </span>
                </div>

                <div className="flex items-center gap-3">
                  <span className="flex items-center gap-1.5 px-2.5 py-0.5 rounded-full bg-emerald-500/10 border border-emerald-500/30 text-emerald-400 text-xs font-semibold">
                    <span className="w-2 h-2 rounded-full bg-emerald-400 animate-ping" />
                    LIVE SESSION
                  </span>
                  <button
                    onClick={() => setFullscreenProject(null)}
                    className="flex items-center gap-1.5 px-2.5 py-1 rounded-lg text-slate-400 hover:text-white hover:bg-slate-800 transition-colors text-xs cursor-pointer"
                    title="Exit Full Screen (Esc)"
                  >
                    <Minimize2 size={13} />
                    <span className="hidden sm:inline">Exit Full Screen</span>
                    <kbd className="hidden md:inline px-1.5 py-0.5 text-[10px] bg-slate-800 text-slate-400 rounded border border-slate-700">ESC</kbd>
                  </button>
                </div>
              </div>

              {/* Command info bar */}
              <div className="px-4 sm:px-6 py-2.5 bg-[#0f1117] border-b border-slate-800/80 flex flex-wrap items-center justify-between text-xs gap-2">
                <div className="flex items-center gap-2 text-slate-300">
                  <Terminal size={14} className="text-violet-400" />
                  <span className="text-emerald-400 font-bold">{fullscreenProject.title}</span>
                  <span className="text-slate-600">|</span>
                  <span className="text-slate-400">Process PID: 8942</span>
                </div>
                <div className="flex items-center gap-2 text-xs text-slate-400">
                  <span className="hidden md:inline text-slate-500">Stack:</span>
                  <div className="flex flex-wrap gap-1.5">
                    {fullscreenProject.tools.map((t) => (
                      <span key={t} className="px-2 py-0.5 rounded bg-slate-800/90 text-[11px] text-slate-300 border border-slate-700/50">
                        {t}
                      </span>
                    ))}
                  </div>
                </div>
              </div>

              {/* Fullscreen Terminal Output Body */}
              <div className="flex-1 overflow-y-auto p-4 sm:p-6 space-y-2 text-xs sm:text-sm font-mono scrollbar-thin scrollbar-thumb-slate-700">
                <div className="text-slate-500 pb-2">
                  <div>Last login: Fri Oct 30 19:46:55 on ttys002</div>
                  <div>Connected to production testing node: <span className="text-slate-300">k8s-worker-cluster-01</span></div>
                </div>

                <div className="text-slate-300 pt-1">
                  <span className="text-emerald-400">ramkumar@portfolio</span>:<span className="text-blue-400">~/deployments/{fullscreenProject.category.toLowerCase()}</span>$ <span className="text-amber-300">{PROJECT_FULL_LOGS[fullscreenProject.id]?.cmd || 'npm test'}</span>
                </div>

                <div className="pt-2 space-y-1.5">
                  {PROJECT_FULL_LOGS[fullscreenProject.id]?.lines.map((entry, idx) => (
                    <div
                      key={idx}
                      className={`flex items-start gap-3 ${
                        entry.type === 'success'
                          ? 'text-emerald-400'
                          : entry.type === 'warn'
                          ? 'text-amber-400'
                          : entry.type === 'cmd'
                          ? 'text-cyan-300'
                          : entry.type === 'info'
                          ? 'text-slate-300'
                          : 'text-slate-500'
                      }`}
                    >
                      <span className="text-slate-600 select-none text-[11px] w-6 shrink-0 text-right">
                        {idx + 1}
                      </span>
                      <span className="break-all">{entry.text}</span>
                    </div>
                  ))}
                </div>

                {/* Active blinking terminal prompt */}
                <div className="pt-4 flex items-center gap-2 text-slate-300">
                  <span className="text-emerald-400">ramkumar@portfolio</span>:<span className="text-blue-400">~</span>${' '}
                  <span className="inline-block w-2.5 h-4 bg-emerald-400 animate-pulse" />
                </div>
              </div>

              {/* Terminal Footer */}
              <div className="px-4 py-2.5 bg-[#151821] border-t border-slate-800 flex items-center justify-between text-xs text-slate-400">
                <div className="flex items-center gap-3">
                  <span className="flex items-center gap-1.5 text-emerald-400">
                    <span className="w-1.5 h-1.5 rounded-full bg-emerald-400" />
                    STATUS: EXECUTION_COMPLETE
                  </span>
                  <span className="hidden sm:inline text-slate-600">|</span>
                  <span className="hidden sm:inline">Memory: 248MB / 1024MB</span>
                </div>
                <div className="text-[11px] text-slate-500">
                  Press <kbd className="px-1.5 py-0.5 bg-slate-800 rounded border border-slate-700 text-slate-300">ESC</kbd> to exit full screen
                </div>
              </div>
            </motion.div>
          </div>
        )}
      </AnimatePresence>
    </section>
  );
};

export default Projects;
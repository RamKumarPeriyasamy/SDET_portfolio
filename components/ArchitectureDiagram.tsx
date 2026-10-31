import React, { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import {
    Code,
    Box,
    ShieldAlert,
    ClipboardCheck,
    Truck,
    Activity,
    HeartPulse,
    Play,
    Pause,
    ChevronRight,
    ChevronLeft,
    Check,
    Terminal,
    Lock,
    ShieldCheck
} from 'lucide-react';

interface Stage {
    id: string;
    step: string;
    label: string;
    subLabel: string;
    icon: React.ReactElement;
    accentColor: string;
    badgeClass: string;
    description: string;
    enclave: string;
    gateStatus: string;
    metrics: Array<{ label: string; value: string }>;
    tools: string[];
    logs: string[];
}

const STAGES: Stage[] = [
    {
        id: 'commit',
        step: '01',
        label: 'Commit',
        subLabel: 'Source Integrity',
        icon: <Code size={20} />,
        accentColor: '#10b981',
        badgeClass: 'text-emerald-600 dark:text-emerald-400 bg-emerald-500/10 border-emerald-500/20',
        description: 'Enforces cryptographically signed GPG commits, pre-commit linting, and automated secret leak detection.',
        enclave: 'Protected Git Branch',
        gateStatus: 'Pre-Commit Verified',
        metrics: [
            { label: 'Gitleaks Audit', value: '0 Secrets Detected' },
            { label: 'GPG Signatures', value: '100% Verified' },
            { label: 'Lint & Typecheck', value: '184 Files Passed' }
        ],
        tools: ['Git', 'Gitea', 'Gitleaks', 'Husky', 'ESLint'],
        logs: [
            '> git verify-commit HEAD --strict',
            '[AUTH] GPG signature verified for Ramkumar Periyasamy',
            '[LINT] TypeScript syntax validated across 184 source files',
            '[SECRETS] Gitleaks working tree audit: 0 exposed credentials',
            '✨ Pre-commit gates certified. Ready for pipeline orchestration.'
        ]
    },
    {
        id: 'build',
        step: '02',
        label: 'Build',
        subLabel: 'Container Artifact',
        icon: <Box size={20} />,
        accentColor: '#06b6d4',
        badgeClass: 'text-cyan-600 dark:text-cyan-400 bg-cyan-500/10 border-cyan-500/20',
        description: 'Builds production artifacts using multi-stage Docker BuildKit caching, minimizing image layer size and cold starts.',
        enclave: 'Isolated Build Pod',
        gateStatus: 'Artifact Verified',
        metrics: [
            { label: 'Layer Cache Hit', value: '94% Cache Hit Rate' },
            { label: 'Container Size', value: '48.2 MB Optimized' },
            { label: 'Build Execution', value: '2.51s Duration' }
        ],
        tools: ['Docker', 'BuildKit', 'Alpine Linux', 'Node 22', 'Vite'],
        logs: [
            '> docker buildx build --platform linux/amd64 -t app:v2.4.0 .',
            '[CACHE] Utilizing shared builder cache layers (94% hit rate)',
            '[EXEC] Minifying TypeScript production bundle: 2.51s',
            '[IMAGE] Production footprint verified: 48.2MB',
            '✨ Image tagged: registry.internal/portfolio:v2.4.0'
        ]
    },
    {
        id: 'security',
        step: '03',
        label: 'Security Scan',
        subLabel: 'SAST & CVE Audit',
        icon: <ShieldAlert size={20} />,
        accentColor: '#8b5cf6',
        badgeClass: 'text-violet-600 dark:text-violet-400 bg-violet-500/10 border-violet-500/20',
        description: 'Automates static code analysis with SonarQube, scans container images with Trivy, and enforces zero-CVE compliance.',
        enclave: 'Sandbox Enclave',
        gateStatus: 'Quality Gate Passed',
        metrics: [
            { label: 'Critical CVEs', value: '0 Detected (Pass)' },
            { label: 'SonarQube Rating', value: 'Grade A (0 Hotspots)' },
            { label: 'Branch Coverage', value: '88.4% Code Coverage' }
        ],
        tools: ['SonarQube', 'Trivy', 'OWASP ZAP', 'Dependency-Check', 'Gitleaks'],
        logs: [
            '> sonarqube-scanner -Dsonar.projectKey=sentinel-core',
            '[SAST] 0 vulnerabilities, 0 bugs, 0 security hotspots',
            '[TRIVY] Scanning container image ramkumar/sentinel-api:v2.4.0',
            '[CVE] 0 CRITICAL, 0 HIGH detected. Compliance passed.',
            '✨ DevSecOps Quality Gate: APPROVED for QA testing.'
        ]
    },
    {
        id: 'qa',
        step: '04',
        label: 'QA / Test',
        subLabel: 'Playwright & E2E',
        icon: <ClipboardCheck size={20} />,
        accentColor: '#3b82f6',
        badgeClass: 'text-blue-600 dark:text-blue-400 bg-blue-500/10 border-blue-500/20',
        description: 'Executes parallelized Playwright browser tests across Chromium, Firefox, and WebKit, alongside API regression validation.',
        enclave: 'Automation Test Grid',
        gateStatus: '100% Tests Passed',
        metrics: [
            { label: 'Regression Suite', value: '142 / 142 Passed' },
            { label: 'Test Flakiness', value: '0.00% (Zero Flaky)' },
            { label: 'P95 API Latency', value: '120ms (Target: <150)' }
        ],
        tools: ['Playwright', 'Jest', 'Allure Reports', 'Postman', 'TypeScript'],
        logs: [
            '> npx playwright test --workers=8 --reporter=allure',
            '[EXEC] Parallel worker pool executed across 3 browser engines',
            '[PASS] Authentication flow & payment integration verified',
            '[API] Postman regression collection: 58/58 assertions OK',
            '✨ Allure test results synchronized. Status: 100% PASS.'
        ]
    },
    {
        id: 'deploy',
        step: '05',
        label: 'Deploy',
        subLabel: 'Kubernetes Canary',
        icon: <Truck size={20} />,
        accentColor: '#10b981',
        badgeClass: 'text-emerald-600 dark:text-emerald-400 bg-emerald-500/10 border-emerald-500/20',
        description: 'Performs automated rolling canary rollout to Kubernetes cluster with health probing and zero downtime guarantees.',
        enclave: 'Production Cluster',
        gateStatus: 'Rollout Complete',
        metrics: [
            { label: 'Active Replicas', value: '3 / 3 Healthy' },
            { label: 'Downtime Window', value: '0.00s Zero Downtime' },
            { label: 'Canary Promotion', value: '100% User Traffic' }
        ],
        tools: ['Kubernetes', 'Nginx Ingress', 'Docker Compose', 'Cert-Manager', 'Proxmox'],
        logs: [
            '> kubectl apply -f manifests/production/ --record',
            '[K8S] deployment.apps/portfolio-app rolling update initiated',
            '[PROBE] Readiness & liveness HTTP probes returned 200 OK',
            '[INGRESS] Nginx routing 100% traffic to updated release',
            '✨ Deployment rollout complete: zero downtime recorded.'
        ]
    },
    {
        id: 'monitor',
        step: '06',
        label: 'Monitor',
        subLabel: 'Telemetry & Logs',
        icon: <Activity size={20} />,
        accentColor: '#06b6d4',
        badgeClass: 'text-cyan-600 dark:text-cyan-400 bg-cyan-500/10 border-cyan-500/20',
        description: 'Real-time telemetry aggregation with Prometheus metrics, Grafana dashboards, and centralized Loki log ingestion.',
        enclave: 'Secure Telemetry VPC',
        gateStatus: 'Telemetry Active',
        metrics: [
            { label: 'Service Uptime', value: '99.99% Availability' },
            { label: 'P99 Latency', value: '12ms Response' },
            { label: 'Log Ingestion', value: '420 Events / Second' }
        ],
        tools: ['Prometheus', 'Grafana', 'Loki', 'Alertmanager', 'Node Exporter'],
        logs: [
            '> promtool check metrics http://localhost:9090/metrics',
            '[PROM] 42/42 scrape targets active with P99 response: 12ms',
            '[LOKI] Log stream ingestion operational: 420 events/sec',
            '[ALERT] 0 active alarms. System within certified SLA',
            '✨ Telemetry nominal: PROCESSED_ACTIVE | Enclave: SECURE_VPC'
        ]
    },
    {
        id: 'recover',
        step: '07',
        label: 'Self-Heal',
        subLabel: 'Auto-Recovery',
        icon: <HeartPulse size={20} />,
        accentColor: '#f43f5e',
        badgeClass: 'text-rose-600 dark:text-rose-400 bg-rose-500/10 border-rose-500/20',
        description: 'Autonomous recovery watchdog monitors node health, automatically respawning degraded pods and enforcing zero-drift states.',
        enclave: 'Watchdog Daemon',
        gateStatus: 'Autonomous Resilient',
        metrics: [
            { label: 'Recovery MTTR', value: '< 420ms Pod Respawn' },
            { label: 'Circuit Breaker', value: 'Closed (Nominal Flow)' },
            { label: 'Drift Sync', value: '100% Reconciled' }
        ],
        tools: ['Kubelet', 'Health Probes', 'Circuit Breakers', 'Chaos Testing', 'Auto-Rollback'],
        logs: [
            '> systemctl status k8s-watchdog-daemon --no-pager',
            '[WATCHDOG] Continuous health probe daemon listening',
            '[CIRCUIT] Breaker status: CLOSED. Error rate: 0.00%',
            '[RECOVERY] Zero-drift reconciliation cycle executed',
            '✨ Resilient state confirmed. Zero manual intervention required.'
        ]
    }
];

const ArchitectureDiagram: React.FC = () => {
    const [activeStage, setActiveStage] = useState(0);
    const [isPlaying, setIsPlaying] = useState(true);

    // Subtle auto-advance loop
    useEffect(() => {
        if (!isPlaying) return;
        const timer = setInterval(() => {
            setActiveStage((prev) => (prev + 1) % STAGES.length);
        }, 4500);
        return () => clearInterval(timer);
    }, [isPlaying]);

    const current = STAGES[activeStage];

    return (
        /* Hidden on mobile media (< md) per user requirement: "remove for mobile media" */
        <section
            id="architecture"
            className="hidden md:block py-20 lg:py-28 bg-white dark:bg-[#07090e] transition-colors duration-300 scroll-mt-20 border-t border-slate-100 dark:border-slate-800/60"
        >
            {/* Standard Container aligned with other sections */}
            <div className="container mx-auto px-6">
                {/* Header Section */}
                <div className="flex items-end justify-between mb-12 pb-6 border-b border-slate-100 dark:border-slate-800/60">
                    <div>
                        <div className="flex items-center gap-2 mb-2 text-xs font-mono font-medium text-slate-500 dark:text-slate-400">
                            <span className="w-1.5 h-1.5 rounded-full bg-emerald-500 animate-pulse" />
                            <span>AUTOMATED ZERO-TRUST LIFECYCLE</span>
                        </div>
                        <h2 className="text-2xl lg:text-3xl font-bold text-slate-900 dark:text-white tracking-tight">
                            Hardened Pipeline <span className="text-transparent bg-clip-text bg-gradient-to-r from-cyan-500 via-emerald-500 to-violet-500">Architecture</span>
                        </h2>
                        <p className="mt-1 text-sm text-slate-500 dark:text-slate-400">
                            Continuous delivery, automated security quality gates, and distributed observability.
                        </p>
                    </div>

                    {/* Subtle controls */}
                    <div className="flex items-center gap-1.5 bg-slate-100/70 dark:bg-slate-900/60 p-1 rounded-xl border border-slate-200/60 dark:border-slate-800/60 text-xs font-mono">
                        <button
                            onClick={() => setActiveStage((prev) => (prev - 1 + STAGES.length) % STAGES.length)}
                            className="p-1.5 rounded-lg text-slate-600 dark:text-slate-400 hover:text-slate-900 dark:hover:text-white hover:bg-white dark:hover:bg-slate-800 transition-colors cursor-pointer"
                            title="Previous Stage"
                        >
                            <ChevronLeft size={14} />
                        </button>
                        <button
                            onClick={() => setIsPlaying(!isPlaying)}
                            className="flex items-center gap-1 px-2.5 py-1 rounded-lg text-slate-600 dark:text-slate-400 hover:text-slate-900 dark:hover:text-white hover:bg-white dark:hover:bg-slate-800 transition-colors cursor-pointer"
                        >
                            {isPlaying ? <Pause size={12} className="text-cyan-500" /> : <Play size={12} className="text-emerald-500" />}
                            <span className="text-[11px]">{isPlaying ? 'Pause' : 'Play'}</span>
                        </button>
                        <button
                            onClick={() => setActiveStage((prev) => (prev + 1) % STAGES.length)}
                            className="p-1.5 rounded-lg text-slate-600 dark:text-slate-400 hover:text-slate-900 dark:hover:text-white hover:bg-white dark:hover:bg-slate-800 transition-colors cursor-pointer"
                            title="Next Stage"
                        >
                            <ChevronRight size={14} />
                        </button>
                    </div>
                </div>

                {/* Subtle Horizontal Pipeline Rail */}
                <div className="relative mb-10 px-6">
                    {/* Connecting rail container from center of first node to center of last node */}
                    <div className="absolute top-[26px] left-[50px] right-[50px] h-[2px] z-0">
                        <div className="w-full h-full bg-slate-200/80 dark:bg-slate-800/80" />
                        <motion.div
                            className="absolute top-0 left-0 h-full bg-gradient-to-r from-emerald-400 via-cyan-400 to-violet-400 origin-left"
                            animate={{ width: `${(activeStage / (STAGES.length - 1)) * 100}%` }}
                            transition={{ duration: 0.5, ease: "easeInOut" }}
                        />
                    </div>

                    {/* Stage Nodes */}
                    <div className="flex items-start justify-between relative z-10">
                        {STAGES.map((stage, idx) => {
                            const isActive = activeStage === idx;
                            const isPassed = activeStage > idx;

                            return (
                                <button
                                    key={stage.id}
                                    onClick={() => {
                                        setActiveStage(idx);
                                        setIsPlaying(false);
                                    }}
                                    className="flex flex-col items-center group cursor-pointer text-left focus:outline-none"
                                >
                                    {/* Subtle Node Circle */}
                                    <div
                                        className={`w-13 h-13 rounded-2xl flex items-center justify-center transition-all duration-300 relative ${
                                            isActive
                                                ? 'bg-white dark:bg-slate-900 text-cyan-600 dark:text-cyan-400 border-2 border-cyan-500 dark:border-cyan-400 shadow-md scale-105'
                                                : isPassed
                                                ? 'bg-slate-100 dark:bg-slate-900/80 text-emerald-600 dark:text-emerald-400 border border-emerald-500/30'
                                                : 'bg-white dark:bg-slate-900/40 text-slate-400 dark:text-slate-500 border border-slate-200/80 dark:border-slate-800 hover:border-slate-300 dark:hover:border-slate-700'
                                        }`}
                                    >
                                        {stage.icon}

                                        {/* Completed checkmark */}
                                        {isPassed && (
                                            <span className="absolute -bottom-1 -right-1 w-3.5 h-3.5 rounded-full bg-emerald-500 text-white flex items-center justify-center">
                                                <Check size={8} className="stroke-[3]" />
                                            </span>
                                        )}

                                        {/* Active micro indicator dot */}
                                        {isActive && (
                                            <span className="absolute -top-1 -right-1 flex h-2.5 w-2.5">
                                                <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-cyan-400 opacity-75" />
                                                <span className="relative inline-flex rounded-full h-2.5 w-2.5 bg-cyan-500" />
                                            </span>
                                        )}
                                    </div>

                                    {/* Stage Label */}
                                    <div className="mt-3 text-center">
                                        <span className={`block text-xs font-mono font-medium transition-colors ${
                                            isActive ? 'text-slate-900 dark:text-white font-bold' : 'text-slate-500 dark:text-slate-400'
                                        }`}>
                                            {stage.label}
                                        </span>
                                        <span className="text-[10px] text-slate-400 dark:text-slate-500">
                                            {stage.step}
                                        </span>
                                    </div>
                                </button>
                            );
                        })}
                    </div>
                </div>

                {/* Subtle Stage Telemetry Inspector: Full Width & Clean Theme Cohesion */}
                <div className="rounded-2xl bg-slate-50/70 dark:bg-slate-900/30 border border-slate-200/70 dark:border-slate-800/60 p-6 lg:p-8 backdrop-blur-sm transition-all">
                    <AnimatePresence mode="wait">
                        <motion.div
                            key={current.id}
                            initial={{ opacity: 0, y: 10 }}
                            animate={{ opacity: 1, y: 0 }}
                            exit={{ opacity: 0, y: -10 }}
                            transition={{ duration: 0.25, ease: "easeOut" }}
                            className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-start"
                        >
                            {/* Left 6 Cols: Stage Mission & Refined Metrics */}
                            <div className="lg:col-span-6 space-y-6">
                                <div>
                                    <div className="flex items-center gap-2 mb-2">
                                        <span className={`inline-flex items-center gap-1.5 px-2.5 py-0.5 rounded-full text-xs font-mono font-semibold border ${current.badgeClass}`}>
                                            <ShieldCheck size={12} />
                                            <span>{current.gateStatus}</span>
                                        </span>
                                        <span className="text-xs font-mono text-slate-400 dark:text-slate-500">
                                            {current.enclave}
                                        </span>
                                    </div>

                                    <h3 className="text-xl font-bold text-slate-900 dark:text-white flex items-center gap-2">
                                        <span>{current.step}. {current.label}</span>
                                        <span className="text-slate-400 dark:text-slate-500 font-normal text-base">
                                            &mdash; {current.subLabel}
                                        </span>
                                    </h3>

                                    <p className="mt-2 text-sm text-slate-600 dark:text-slate-400 leading-relaxed">
                                        {current.description}
                                    </p>
                                </div>

                                {/* Clean, subtle numerical metrics (no chunky progress bars) */}
                                <div className="grid grid-cols-3 gap-3 pt-2">
                                    {current.metrics.map((metric, i) => (
                                        <div
                                            key={i}
                                            className="p-3 rounded-xl bg-white dark:bg-slate-900/60 border border-slate-200/80 dark:border-slate-800/80"
                                        >
                                            <span className="block text-[11px] font-mono text-slate-500 dark:text-slate-400">
                                                {metric.label}
                                            </span>
                                            <span className="block text-xs font-mono font-semibold text-slate-800 dark:text-slate-200 mt-1 truncate">
                                                {metric.value}
                                            </span>
                                        </div>
                                    ))}
                                </div>

                                {/* Subtle Tool Tags */}
                                <div className="pt-2">
                                    <span className="block text-[11px] font-mono uppercase tracking-wider text-slate-400 dark:text-slate-500 mb-2">
                                        Technologies & Security Gates
                                    </span>
                                    <div className="flex flex-wrap gap-1.5">
                                        {current.tools.map((tool) => (
                                            <span
                                                key={tool}
                                                className="px-2.5 py-1 rounded-md text-xs font-mono bg-white dark:bg-slate-900 text-slate-600 dark:text-slate-300 border border-slate-200/70 dark:border-slate-800"
                                            >
                                                {tool}
                                            </span>
                                        ))}
                                    </div>
                                </div>
                            </div>

                            {/* Right 6 Cols: Clean Theme-Adaptive Console (No harsh black box in light mode!) */}
                            <div className="lg:col-span-6">
                                <div className="rounded-xl overflow-hidden border border-slate-200/90 dark:border-slate-800/80 bg-white dark:bg-slate-950 font-mono text-xs shadow-sm">
                                    {/* Console Header */}
                                    <div className="flex items-center justify-between px-4 py-2.5 bg-slate-100/80 dark:bg-slate-900/80 border-b border-slate-200/80 dark:border-slate-800 select-none text-[11px]">
                                        <div className="flex items-center gap-1.5">
                                            <span className="w-2.5 h-2.5 rounded-full bg-slate-300 dark:bg-slate-700" />
                                            <span className="w-2.5 h-2.5 rounded-full bg-slate-300 dark:bg-slate-700" />
                                            <span className="w-2.5 h-2.5 rounded-full bg-slate-300 dark:bg-slate-700" />
                                            <span className="ml-2 text-slate-500 dark:text-slate-400">
                                                stage-{current.step}.log
                                            </span>
                                        </div>
                                        <span className="flex items-center gap-1 text-[10px] text-emerald-600 dark:text-emerald-400 font-semibold">
                                            <span className="w-1.5 h-1.5 rounded-full bg-emerald-500 animate-pulse" />
                                            PASSED
                                        </span>
                                    </div>

                                    {/* Console Output */}
                                    <div className="p-4 space-y-2 text-[11px] leading-relaxed text-slate-700 dark:text-slate-300">
                                        {current.logs.map((log, lIdx) => (
                                            <div
                                                key={lIdx}
                                                className={`break-all ${
                                                    log.startsWith('>')
                                                        ? 'text-cyan-600 dark:text-cyan-400 font-semibold'
                                                        : log.includes('✨')
                                                        ? 'text-emerald-600 dark:text-emerald-400 font-medium'
                                                        : log.includes('[AUTH]') || log.includes('[PASS]')
                                                        ? 'text-emerald-600 dark:text-emerald-400'
                                                        : log.includes('[WARN]')
                                                        ? 'text-amber-600 dark:text-amber-400'
                                                        : log.includes('[CVE]') || log.includes('[SAST]')
                                                        ? 'text-violet-600 dark:text-violet-400'
                                                        : 'text-slate-500 dark:text-slate-400'
                                                }`}
                                            >
                                                {log}
                                            </div>
                                        ))}

                                        <div className="pt-1 flex items-center gap-1 text-slate-400">
                                            <span className="text-emerald-600 dark:text-emerald-400">pipeline@runner</span>
                                            <span>:~$</span>
                                            <span className="w-1.5 h-3 bg-emerald-500 animate-pulse inline-block" />
                                        </div>
                                    </div>
                                </div>
                            </div>
                        </motion.div>
                    </AnimatePresence>
                </div>
            </div>
        </section>
    );
};

export default ArchitectureDiagram;

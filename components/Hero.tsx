import React, { useEffect, useRef, useState } from 'react';
import { motion } from 'framer-motion';
import { Terminal, Shield, ArrowRight, Download } from 'lucide-react';

const Hero: React.FC = () => {
  const heroRef = useRef<HTMLElement>(null);
  const laserRef = useRef<HTMLDivElement>(null);
  const [isInHero, setIsInHero] = useState(false);

  useEffect(() => {
    const handleMouseMove = (e: MouseEvent) => {
      if (!heroRef.current || !laserRef.current) return;

      const rect = heroRef.current.getBoundingClientRect();
      const isInside =
        e.clientX >= rect.left &&
        e.clientX <= rect.right &&
        e.clientY >= rect.top &&
        e.clientY <= rect.bottom;

      setIsInHero(isInside);

      if (isInside) {
        laserRef.current.style.left = `${e.clientX}px`;
        laserRef.current.style.top = `${e.clientY}px`;
      }
    };

    window.addEventListener('mousemove', handleMouseMove);
    return () => window.removeEventListener('mousemove', handleMouseMove);
  }, []);

  return (
    <section
      ref={heroRef}
      className="hero-section relative min-h-screen flex items-center justify-center pt-20 overflow-hidden"
    >
      {/* Laser Dot Cursor - Only visible in Hero */}
      <div
        ref={laserRef}
        className={`laser-dot ${isInHero ? 'laser-visible' : 'laser-hidden'}`}
      >
        <div className="laser-core" />
        <div className="laser-glow" />
        <div className="laser-ring" />
      </div>

      {/* Background Decor - Removed in favor of global CyberBackground */}
      {/* <div className="absolute inset-0 w-full h-full bg-[radial-gradient(#e5e7eb_1px,transparent_1px)] dark:bg-[radial-gradient(#1e293b_1px,transparent_1px)] [background-size:16px_16px] [mask-image:radial-gradient(ellipse_50%_50%_at_50%_50%,#000_70%,transparent_100%)] pointer-events-none opacity-50"></div> */}

      <div className="container mx-auto px-6 relative z-10">
        <div className="max-w-4xl mx-auto">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5 }}
            className="flex items-center gap-2 mb-6 font-mono text-sm text-emerald-600 dark:text-emerald-400 bg-emerald-100/50 dark:bg-emerald-900/20 px-3 py-1 rounded-full w-fit border border-emerald-200 dark:border-emerald-800"
          >
            <div className="w-2 h-2 rounded-full bg-emerald-500 animate-pulse"></div>
            <span>System Ready. Protocols initialized.</span>
          </motion.div>

          <motion.h1
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.7, delay: 0.1 }}
            className="text-5xl md:text-7xl font-extrabold tracking-tight mb-6 text-slate-900 dark:text-white"
          >
            Architecting <br />
            <span className="text-transparent bg-clip-text bg-gradient-to-r from-[#0891b2] to-[#22d3ee]">Resilience.</span>
          </motion.h1>

          <motion.div
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.7, delay: 0.2 }}
            className="text-xl md:text-2xl text-slate-600 dark:text-slate-300 mb-8 max-w-2xl leading-relaxed"
          >
            I am <span className="font-bold text-slate-900 dark:text-white">Ram Kumar Periyasamy</span>.
            An SDET & SecOps Engineer bridging the gap between <span className="text-blue-500 dark:text-blue-400">code</span>, <span className="text-emerald-500 dark:text-emerald-400">quality</span>, and <span className="text-violet-500 dark:text-violet-400">security</span>.
            <br className="hidden md:block" />
            I don't just test software — I break it, secure it, and make it production-ready.
          </motion.div>

          <motion.div
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.7, delay: 0.3 }}
            className="flex flex-col sm:flex-row gap-4"
          >
            <a
              href="#projects"
              className="group flex items-center justify-center gap-2 px-8 py-4 bg-slate-900 dark:bg-white text-white dark:text-slate-900 font-bold rounded-lg hover:bg-slate-800 dark:hover:bg-slate-200 transition-all shadow-lg hover:shadow-emerald-500/20"
            >
              <Terminal size={20} />
              Explore Operations
              <ArrowRight size={18} className="group-hover:translate-x-1 transition-transform" />
            </a>
            <a
              href="#resume"
              className="group flex items-center justify-center gap-2 px-8 py-4 bg-white dark:bg-slate-900 text-slate-900 dark:text-white border border-slate-200 dark:border-slate-700 font-bold rounded-lg hover:bg-slate-50 dark:hover:bg-slate-800 transition-all"
            >
              <Download size={20} />
              Access Resume
            </a>
          </motion.div>
        </div>
      </div>

      {/* SecOps Creative Visualization - Right Side */}
      <div className="absolute top-0 right-0 w-1/2 h-full overflow-hidden pointer-events-none z-0 hidden lg:block">

        {/* Central Radar/Scanner */}
        <div className="absolute top-1/2 right-[15%] -translate-y-1/2 w-[300px] h-[300px]">
          {/* Outer Ring */}
          <motion.div
            animate={{ rotate: 360 }}
            transition={{ duration: 20, repeat: Infinity, ease: "linear" }}
            className="absolute inset-0 border border-emerald-500/10 rounded-full"
          />
          {/* Middle Ring */}
          <motion.div
            animate={{ rotate: -360 }}
            transition={{ duration: 15, repeat: Infinity, ease: "linear" }}
            className="absolute inset-[30px] border border-dashed border-cyan-500/10 rounded-full"
          />
          {/* Inner Ring */}
          <div className="absolute inset-[60px] border border-emerald-500/5 rounded-full" />

          {/* Radar Sweep */}
          <motion.div
            animate={{ rotate: 360 }}
            transition={{ duration: 4, repeat: Infinity, ease: "linear" }}
            className="absolute inset-0 origin-center"
          >
            <div className="absolute top-1/2 left-1/2 w-1/2 h-[2px] bg-gradient-to-r from-emerald-500/40 to-transparent origin-left" />
          </motion.div>

          {/* Center Dot */}
          <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-2 h-2 bg-emerald-500/50 rounded-full shadow-[0_0_10px_rgba(16,185,129,0.5)]" />
        </div>

        {/* Floating Network Nodes */}
        {[
          { x: '70%', y: '20%', delay: 0 },
          { x: '85%', y: '35%', delay: 0.5 },
          { x: '60%', y: '45%', delay: 1 },
          { x: '90%', y: '60%', delay: 1.5 },
          { x: '75%', y: '75%', delay: 2 },
          { x: '55%', y: '30%', delay: 2.5 },
        ].map((node, i) => (
          <motion.div
            key={i}
            initial={{ opacity: 0, scale: 0 }}
            animate={{
              opacity: [0.3, 0.6, 0.3],
              scale: 1,
              y: [0, -8, 0]
            }}
            transition={{
              duration: 3 + i * 0.5,
              repeat: Infinity,
              delay: node.delay,
              ease: "easeInOut"
            }}
            className="absolute w-3 h-3 bg-emerald-500/30 rounded-full border border-emerald-500/20"
            style={{ left: node.x, top: node.y }}
          >
            <div className="absolute inset-0 bg-emerald-500/20 rounded-full animate-ping" />
          </motion.div>
        ))}

        {/* Connection Lines (SVG) */}
        <svg className="absolute inset-0 w-full h-full opacity-20">
          <motion.line
            x1="70%" y1="20%" x2="85%" y2="35%"
            stroke="#10b981" strokeWidth="1"
            initial={{ pathLength: 0 }}
            animate={{ pathLength: 1 }}
            transition={{ duration: 2, delay: 0.5 }}
          />
          <motion.line
            x1="85%" y1="35%" x2="90%" y2="60%"
            stroke="#10b981" strokeWidth="1"
            initial={{ pathLength: 0 }}
            animate={{ pathLength: 1 }}
            transition={{ duration: 2, delay: 1 }}
          />
          <motion.line
            x1="60%" y1="45%" x2="75%" y2="75%"
            stroke="#06b6d4" strokeWidth="1"
            initial={{ pathLength: 0 }}
            animate={{ pathLength: 1 }}
            transition={{ duration: 2, delay: 1.5 }}
          />
          <motion.line
            x1="55%" y1="30%" x2="70%" y2="20%"
            stroke="#06b6d4" strokeWidth="1"
            initial={{ pathLength: 0 }}
            animate={{ pathLength: 1 }}
            transition={{ duration: 2, delay: 2 }}
          />
        </svg>

        {/* Floating Security Badges */}
        <motion.div
          animate={{ y: [0, -10, 0], rotate: [0, 5, 0] }}
          transition={{ duration: 6, repeat: Infinity, ease: "easeInOut" }}
          className="absolute top-[15%] right-[10%] flex items-center gap-2 bg-slate-900/30 backdrop-blur-sm px-3 py-1.5 rounded-full border border-emerald-500/10"
        >
          <Shield className="w-3 h-3 text-emerald-500/60" />
          <span className="text-[10px] font-mono text-emerald-500/60">ENCRYPTED</span>
        </motion.div>

        <motion.div
          animate={{ y: [0, 8, 0], rotate: [0, -3, 0] }}
          transition={{ duration: 5, repeat: Infinity, ease: "easeInOut", delay: 1 }}
          className="absolute bottom-[25%] right-[5%] flex items-center gap-2 bg-slate-900/30 backdrop-blur-sm px-3 py-1.5 rounded-full border border-cyan-500/10"
        >
          <Terminal className="w-3 h-3 text-cyan-500/60" />
          <span className="text-[10px] font-mono text-cyan-500/60">TESTING</span>
        </motion.div>

        <motion.div
          animate={{ y: [0, -6, 0] }}
          transition={{ duration: 4, repeat: Infinity, ease: "easeInOut", delay: 2 }}
          className="absolute top-[40%] right-[3%] flex items-center gap-2 bg-slate-900/30 backdrop-blur-sm px-3 py-1.5 rounded-full border border-violet-500/10"
        >
          <div className="w-2 h-2 bg-violet-500/60 rounded-full animate-pulse" />
          <span className="text-[10px] font-mono text-violet-500/60">MONITORING</span>
        </motion.div>

        {/* Subtle Glow */}
        <div className="absolute top-1/2 right-[20%] -translate-y-1/2 w-[400px] h-[400px] bg-emerald-500/5 blur-[100px] rounded-full" />

      </div>
    </section>
  );
};

export default Hero;
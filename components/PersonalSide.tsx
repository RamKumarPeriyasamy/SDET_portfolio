import React from 'react';
import { motion } from 'framer-motion';
import { Coffee, Bug, BookOpen, Wrench } from 'lucide-react';
import profileImage from './assert/ram_port.png';

const PersonalSide: React.FC = () => {
  return (
    <section className="py-24 bg-slate-50 dark:bg-[#0a0a0a] relative overflow-hidden">
      {/* Decorative background text */}
      <div className="absolute top-10 right-0 text-9xl font-black text-slate-200 dark:text-slate-800/50 opacity-20 pointer-events-none select-none z-0">
        HUMAN
      </div>

      <div className="container mx-auto px-6 relative z-10">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center">

          {/* Image Composition */}
          <motion.div
            initial={{ opacity: 0, scale: 0.9 }}
            whileInView={{ opacity: 1, scale: 1 }}
            viewport={{ once: true }}
            className="relative order-2 lg:order-1"
          >
            {/* Main Image Container with Cyber styling */}
            <div className="relative w-full max-w-md mx-auto aspect-[4/5] rounded-2xl overflow-hidden group">
              {/* The Image itself - blending mode applied */}
              <div
                className="absolute inset-0 bg-cover bg-center bg-no-repeat transition-transform duration-700 group-hover:scale-105"
                style={{
                  backgroundImage: `url('${profileImage}')`,
                }}
              ></div>

              {/* Overlay for Cyber Effect */}
              <div className="absolute inset-0 bg-gradient-to-t from-slate-900 via-transparent to-transparent opacity-60 dark:opacity-80"></div>
              <div className="absolute inset-0 bg-emerald-500/10 mix-blend-overlay"></div>

              {/* Glitch/Scanline effect overlay */}
              <div className="absolute inset-0 bg-[url('https://grainy-gradients.vercel.app/noise.svg')] opacity-20 brightness-100 contrast-150"></div>

              {/* Text Overlay on Image */}
              <div className="absolute bottom-6 left-6 right-6">
                <div className="inline-block px-3 py-1 bg-emerald-500 text-white text-xs font-mono font-bold rounded mb-2">
                  USER: RAM_KUMAR_P
                </div>
                <p className="text-slate-200 text-sm font-mono">
                  Status: Caffeinated<br />
                  Uptime: 16h 42m
                </p>
              </div>
            </div>

            {/* Decorative Elements around image */}
            <div className="absolute -z-10 top-[-20px] left-[-20px] w-full h-full border-2 border-slate-200 dark:border-slate-800 rounded-2xl"></div>
            <div className="absolute -z-10 bottom-[-20px] right-[-20px] w-full h-full bg-slate-100 dark:bg-slate-800/50 rounded-2xl"></div>
          </motion.div>

          {/* Text Content */}
          <div className="order-1 lg:order-2">
            <motion.div
              initial={{ opacity: 0, x: 20 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true }}
            >
              <h2 className="text-3xl md:text-4xl font-bold text-slate-900 dark:text-white mb-6">
                Runtime Environment: <span className="text-violet-500">Human</span>
              </h2>

              <div className="prose dark:prose-invert text-slate-600 dark:text-slate-300 mb-8 leading-relaxed">
                <p>
                  While my terminal is always in dark mode, I do occasionally step out into the sunlight (with SPF 50, naturally). I believe that the best engineers are the ones who try to automate their own jobs away so they can spend more time debating tabs versus spaces.
                </p>
                <p>
                  When I'm not orchestrating pipelines or hunting down security flaws, I'm likely trying to exit Vim, over-engineering my smart home setup, or explaining to my family that "No, I cannot fix your printer."
                </p>
              </div>

              {/* Fun Stats/Facts Grid */}
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <div className="bg-white dark:bg-slate-900 p-4 rounded-xl border border-slate-200 dark:border-slate-800 shadow-sm flex items-start gap-3 hover:border-emerald-500/50 transition-colors">
                  <div className="p-2 bg-amber-100 dark:bg-amber-900/30 text-amber-600 dark:text-amber-400 rounded-lg">
                    <Coffee size={20} />
                  </div>
                  <div>
                    <h4 className="font-bold text-slate-900 dark:text-white text-sm">Fuel Source</h4>
                    <p className="text-xs text-slate-500">Converts espresso into secure code.</p>
                  </div>
                </div>

                <div className="bg-white dark:bg-slate-900 p-4 rounded-xl border border-slate-200 dark:border-slate-800 shadow-sm flex items-start gap-3 hover:border-violet-500/50 transition-colors">
                  <div className="p-2 bg-violet-100 dark:bg-violet-900/30 text-violet-600 dark:text-violet-400 rounded-lg">
                    <Bug size={20} />
                  </div>
                  <div>
                    <h4 className="font-bold text-slate-900 dark:text-white text-sm">Bug Philosophy</h4>
                    <p className="text-xs text-slate-500">It's not a bug, it's an undocumented feature.</p>
                  </div>
                </div>

                <div className="bg-white dark:bg-slate-900 p-4 rounded-xl border border-slate-200 dark:border-slate-800 shadow-sm flex items-start gap-3 hover:border-blue-500/50 transition-colors">
                  <div className="p-2 bg-blue-100 dark:bg-blue-900/30 text-blue-600 dark:text-blue-400 rounded-lg">
                    <BookOpen size={20} />
                  </div>
                  <div>
                    <h4 className="font-bold text-slate-900 dark:text-white text-sm">Growth Engine</h4>
                    <p className="text-xs text-slate-500">Always learning, experimenting, and upgrading my engineering skills.</p>
                  </div>
                </div>

                <div className="bg-white dark:bg-slate-900 p-4 rounded-xl border border-slate-200 dark:border-slate-800 shadow-sm flex items-start gap-3 hover:border-rose-500/50 transition-colors">
                  <div className="p-2 bg-rose-100 dark:bg-rose-900/30 text-rose-600 dark:text-rose-400 rounded-lg">
                    <Wrench size={20} />
                  </div>
                  <div>
                    <h4 className="font-bold text-slate-900 dark:text-white text-sm">Root Cause Hunter</h4>
                    <p className="text-xs text-slate-500">Digging deeper, fixing the real problem, and making systems more reliable.</p>
                  </div>
                </div>
              </div>

            </motion.div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default PersonalSide;
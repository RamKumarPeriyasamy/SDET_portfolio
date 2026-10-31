import React, { useState } from 'react';
import { motion, useInView } from 'framer-motion';
import { TIMELINE } from '../constants';
import { Shield, Code, Rocket, Terminal, ChevronRight, Workflow, Server, Activity } from 'lucide-react';

const icons: Record<string, any> = {
  shield: Shield,
  code: Code,
  rocket: Rocket,
  test: Terminal,
  workflow: Workflow,
  server: Server,
  monitor: Activity,
};

const Experience: React.FC = () => {
  const [hoveredIndex, setHoveredIndex] = useState<number | null>(null);

  // Animation variants
  const containerVariants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: {
        staggerChildren: 0.2,
        delayChildren: 0.1
      }
    }
  };

  const lineVariants = {
    hidden: { scaleY: 0, x: "-50%" },
    visible: {
      scaleY: 1,
      x: "-50%",
      transition: {
        duration: 1.2,
        ease: [0.25, 0.46, 0.45, 0.94]
      }
    }
  };

  const cardVariants = {
    hidden: (isEven: boolean) => ({
      opacity: 0,
      x: isEven ? -60 : 60,
      y: 20
    }),
    visible: {
      opacity: 1,
      x: 0,
      y: 0,
      transition: {
        duration: 0.6,
        ease: [0.25, 0.46, 0.45, 0.94]
      }
    }
  };

  const dotVariants = {
    hidden: { scale: 0, opacity: 0, x: "-50%", y: "-50%" },
    visible: {
      scale: 1,
      opacity: 1,
      x: "-50%",
      y: "-50%",
      transition: {
        type: "spring",
        stiffness: 300,
        damping: 20
      }
    }
  };

  const yearVariants = {
    hidden: (isEven: boolean) => ({
      opacity: 0,
      x: isEven ? 30 : -30
    }),
    visible: {
      opacity: 1,
      x: 0,
      transition: {
        duration: 0.5,
        ease: "easeOut"
      }
    }
  };

  return (
    <section className="py-24 bg-slate-50 dark:bg-[#0a0a0a] relative overflow-hidden">
      {/* Background decorative elements */}
      <div className="absolute inset-0 pointer-events-none">
        <div className="absolute top-20 left-10 w-72 h-72 bg-emerald-500/5 rounded-full blur-[100px]" />
        <div className="absolute bottom-20 right-10 w-72 h-72 bg-blue-500/5 rounded-full blur-[100px]" />
      </div>

      <div className="container mx-auto px-6 relative z-10">
        {/* Header */}
        <div className="text-center mb-20">
          <motion.div
            initial={{ opacity: 0, y: 20, scale: 0.9 }}
            whileInView={{ opacity: 1, y: 0, scale: 1 }}
            viewport={{ once: true }}
            transition={{ duration: 0.5 }}
          >
            <h2 className="text-4xl md:text-5xl font-bold text-slate-900 dark:text-white mb-4">
              Evolution <span className="text-transparent bg-clip-text bg-gradient-to-r from-blue-500 to-emerald-500">Log</span>
            </h2>
            <p className="text-slate-600 dark:text-slate-400 max-w-md mx-auto">
              A journey through my professional growth and key milestones
            </p>
          </motion.div>
        </div>

        <div className="max-w-4xl mx-auto relative">
          {/* Animated Vertical Line */}
          <motion.div
            className="absolute left-4 md:left-1/2 top-0 bottom-0 w-0.5 bg-gradient-to-b from-emerald-500 via-blue-500 to-violet-500 origin-top"
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true, margin: "-100px" }}
            variants={lineVariants}
          />

          {/* Glowing effect on line */}
          <motion.div
            className="absolute left-4 md:left-1/2 top-0 bottom-0 w-4 bg-gradient-to-b from-emerald-500/20 via-blue-500/20 to-violet-500/20 blur-xl origin-top"
            initial={{ scaleY: 0, x: "-50%" }}
            whileInView={{ scaleY: 1, x: "-50%" }}
            viewport={{ once: true }}
            transition={{ duration: 1.5, ease: "easeOut" }}
          />

          <motion.div
            className="space-y-16"
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true, margin: "-50px" }}
            variants={containerVariants}
          >
            {TIMELINE.map((event, index) => {
              const Icon = icons[event.icon] || icons.test;
              const isEven = index % 2 === 0;
              const isHovered = hoveredIndex === index;

              return (
                <motion.div
                  key={`${event.role}-${index}`}
                  className={`relative flex flex-col md:flex-row items-start md:items-center gap-8 ${isEven ? '' : 'md:flex-row-reverse'}`}
                  onMouseEnter={() => setHoveredIndex(index)}
                  onMouseLeave={() => setHoveredIndex(null)}
                >
                  {/* Animated Timeline Point */}
                  <motion.div
                    className="absolute left-4 md:left-1/2 top-10 md:top-1/2 z-20"
                    variants={dotVariants}
                  >
                    <motion.div
                      className="relative"
                      animate={{
                        scale: isHovered ? 1.2 : 1,
                      }}
                      transition={{ type: "spring", stiffness: 300, damping: 20 }}
                    >
                      {/* Outer ring pulse */}
                      <motion.div
                        className="absolute inset-0 w-5 h-5 rounded-full border-2 border-emerald-500"
                        animate={isHovered ? {
                          scale: [1, 1.8, 1.8],
                          opacity: [1, 0, 0]
                        } : {}}
                        transition={{ duration: 1, repeat: isHovered ? Infinity : 0 }}
                      />
                      {/* Main dot */}
                      <div className={`w-5 h-5 rounded-full border-2 transition-all duration-300 ${isHovered
                        ? 'bg-emerald-500 border-emerald-500 shadow-[0_0_20px_rgba(16,185,129,0.6)]'
                        : 'bg-white dark:bg-slate-900 border-emerald-500 shadow-[0_0_0_4px_rgba(16,185,129,0.1)]'
                        }`} />
                    </motion.div>
                  </motion.div>

                  {/* Year - Desktop */}
                  <motion.div
                    className={`hidden md:block w-1/2 ${isEven ? 'text-right pr-16' : 'text-left pl-16'}`}
                    custom={isEven}
                    variants={yearVariants}
                  >
                    <motion.span
                      className="text-6xl font-black text-slate-100 dark:text-slate-800/50 select-none"
                      animate={{
                        color: isHovered
                          ? 'rgba(16, 185, 129, 0.2)'
                          : undefined,
                        scale: isHovered ? 1.05 : 1
                      }}
                      transition={{ duration: 0.3 }}
                    >
                      {event.year}
                    </motion.span>
                  </motion.div>

                  {/* Content Card */}
                  <motion.div
                    className={`w-full md:w-1/2 pl-12 md:pl-0 ${isEven ? 'md:pl-16' : 'md:pr-16'}`}
                    custom={isEven}
                    variants={cardVariants}
                  >
                    <motion.div
                      className="relative bg-white dark:bg-slate-900/80 backdrop-blur-sm p-6 rounded-2xl border border-slate-200 dark:border-slate-800 shadow-sm overflow-hidden group"
                      whileHover={{
                        y: -8,
                        boxShadow: "0 25px 50px -12px rgba(0, 0, 0, 0.15)"
                      }}
                      transition={{ type: "spring", stiffness: 300, damping: 25 }}
                    >
                      {/* Gradient overlay on hover */}
                      <motion.div
                        className="absolute inset-0 bg-gradient-to-br from-emerald-500/5 to-blue-500/5"
                        initial={{ opacity: 0 }}
                        animate={{ opacity: isHovered ? 1 : 0 }}
                        transition={{ duration: 0.3 }}
                      />

                      {/* Top accent line */}
                      <motion.div
                        className="absolute top-0 left-0 right-0 h-1 bg-gradient-to-r from-emerald-500 to-blue-500"
                        initial={{ scaleX: 0 }}
                        animate={{ scaleX: isHovered ? 1 : 0 }}
                        transition={{ duration: 0.4, ease: "easeOut" }}
                        style={{ originX: isEven ? 0 : 1 }}
                      />

                      {/* Mobile Year */}
                      <span className="md:hidden text-3xl font-black text-slate-100 dark:text-slate-800/50 absolute right-4 top-4 select-none">
                        {event.year}
                      </span>

                      <div className="relative z-10">
                        {/* Icon */}
                        <motion.div
                          className="w-12 h-12 rounded-xl bg-slate-100 dark:bg-slate-800 flex items-center justify-center text-slate-600 dark:text-slate-300 mb-4"
                          animate={{
                            backgroundColor: isHovered ? "rgb(16, 185, 129)" : undefined,
                            color: isHovered ? "white" : undefined,
                            rotate: isHovered ? [0, -10, 10, 0] : 0
                          }}
                          transition={{ duration: 0.4 }}
                        >
                          <Icon size={22} />
                        </motion.div>

                        {/* Role title */}
                        <motion.h3
                          className="text-xl font-bold text-slate-900 dark:text-white mb-2 flex items-center gap-2"
                          animate={{ x: isHovered ? 4 : 0 }}
                          transition={{ duration: 0.2 }}
                        >
                          {event.role}
                          <motion.span
                            initial={{ opacity: 0, x: -10 }}
                            animate={{
                              opacity: isHovered ? 1 : 0,
                              x: isHovered ? 0 : -10
                            }}
                            transition={{ duration: 0.2 }}
                          >
                            <ChevronRight size={18} className="text-emerald-500" />
                          </motion.span>
                        </motion.h3>

                        {/* Description */}
                        <p className="text-slate-500 dark:text-slate-400 text-sm leading-relaxed">
                          {event.description}
                        </p>

                        {/* Bottom decoration */}
                        <motion.div
                          className="flex gap-1 mt-4"
                          initial={{ opacity: 0 }}
                          animate={{ opacity: isHovered ? 1 : 0 }}
                          transition={{ delay: 0.1 }}
                        >
                          {[...Array(4)].map((_, i) => (
                            <motion.div
                              key={i}
                              className="w-8 h-1 rounded-full bg-emerald-500/30"
                              initial={{ scaleX: 0 }}
                              animate={{ scaleX: isHovered ? 1 : 0 }}
                              transition={{ delay: 0.1 + i * 0.05, duration: 0.3 }}
                              style={{ originX: 0 }}
                            />
                          ))}
                        </motion.div>
                      </div>
                    </motion.div>
                  </motion.div>
                </motion.div>
              );
            })}
          </motion.div>

          {/* End dot */}
          <motion.div
            className="absolute left-4 md:left-1/2 -bottom-4 w-3 h-3 rounded-full bg-gradient-to-r from-violet-500 to-purple-500"
            initial={{ scale: 0, x: "-50%" }}
            whileInView={{ scale: 1, x: "-50%" }}
            viewport={{ once: true }}
            transition={{ delay: 0.8, type: "spring", stiffness: 300 }}
          />
        </div>
      </div>
    </section>
  );
};

export default Experience;
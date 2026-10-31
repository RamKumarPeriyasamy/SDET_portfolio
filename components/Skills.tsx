import React, { useState, useEffect } from 'react';
import { motion, AnimatePresence, useScroll, useMotionValueEvent } from 'framer-motion';
import { SKILL_CATEGORIES } from '../constants';
import { ChevronRight } from 'lucide-react';

const Skills: React.FC = () => {
  const [activeIndex, setActiveIndex] = useState(0);
  const [hoveredSkill, setHoveredSkill] = useState<string | null>(null);
  const containerRef = React.useRef<HTMLElement>(null);
  const [direction, setDirection] = useState(0); // -1 for up, 1 for down
  const tabsRef = React.useRef<HTMLDivElement>(null);
  const categoryRefs = React.useRef<(HTMLDivElement | null)[]>([]);

  const { scrollYProgress } = useScroll({
    target: containerRef,
    offset: ["start start", "end end"]
  });

  // Optimize scroll tracking
  useMotionValueEvent(scrollYProgress, "change", (latest) => {
    const totalCategories = SKILL_CATEGORIES.length;
    const step = 1 / totalCategories;

    // Use a small buffer to prevent flickering at boundaries
    const buffer = 0.02;
    const rawIndex = Math.min(
      Math.max(0, Math.floor((latest + (latest > scrollYProgress.getPrevious() ? -buffer : buffer)) / step)),
      totalCategories - 1
    );

    if (rawIndex !== activeIndex && Math.abs(latest - (rawIndex * step)) > 0.01) {
      setDirection(rawIndex > activeIndex ? 1 : -1);
      setActiveIndex(rawIndex);
    }
  });

  const handleCategoryClick = (index: number) => {
    if (containerRef.current) {
      setDirection(index > activeIndex ? 1 : -1);
      setActiveIndex(index);

      // Calculate the scroll position for this category
      const sectionTop = containerRef.current.offsetTop;
      const sectionHeight = containerRef.current.offsetHeight;
      const step = sectionHeight / SKILL_CATEGORIES.length;

      // Fine-tuned target for mobile vs desktop
      const offset = isMobile ? (window.innerHeight * 0.1) : (window.innerHeight / 2);
      const targetScroll = sectionTop + (index * step) + (step * 0.1);

      window.scrollTo({
        top: targetScroll,
        behavior: 'smooth'
      });
    }
  };

  // Enhanced color schemes with gradients for all skill domains
  const colorSchemes = [
    {
      primary: '#10b981',
      secondary: '#34d399',
      bg: 'rgba(16, 185, 129, 0.05)',
      glow: 'rgba(16, 185, 129, 0.4)',
      gradient: 'from-emerald-500/20 to-emerald-500/0'
    }, // Emerald - Testing & Automation
    {
      primary: '#06b6d4',
      secondary: '#22d3ee',
      bg: 'rgba(6, 182, 212, 0.05)',
      glow: 'rgba(6, 182, 212, 0.4)',
      gradient: 'from-cyan-500/20 to-cyan-500/0'
    },  // Cyan - DevOps & CI/CD
    {
      primary: '#8b5cf6',
      secondary: '#a78bfa',
      bg: 'rgba(139, 92, 246, 0.05)',
      glow: 'rgba(139, 92, 246, 0.4)',
      gradient: 'from-violet-500/20 to-violet-500/0'
    }, // Violet - DevSecOps & Security
    {
      primary: '#3b82f6',
      secondary: '#60a5fa',
      bg: 'rgba(59, 130, 246, 0.05)',
      glow: 'rgba(59, 130, 246, 0.4)',
      gradient: 'from-blue-500/20 to-blue-500/0'
    }, // Blue - Infrastructure & Cloud
    {
      primary: '#ec4899',
      secondary: '#f472b6',
      bg: 'rgba(236, 72, 153, 0.05)',
      glow: 'rgba(236, 72, 153, 0.4)',
      gradient: 'from-pink-500/20 to-pink-500/0'
    }, // Pink - Monitoring & Observability
    {
      primary: '#f59e0b',
      secondary: '#fbbf24',
      bg: 'rgba(245, 158, 11, 0.05)',
      glow: 'rgba(245, 158, 11, 0.4)',
      gradient: 'from-amber-500/20 to-amber-500/0'
    }, // Amber - Programming Languages
    {
      primary: '#14b8a6',
      secondary: '#2dd4bf',
      bg: 'rgba(20, 184, 166, 0.05)',
      glow: 'rgba(20, 184, 166, 0.4)',
      gradient: 'from-teal-500/20 to-teal-500/0'
    }, // Teal - Databases & Messaging
    {
      primary: '#6366f1',
      secondary: '#818cf8',
      bg: 'rgba(99, 102, 241, 0.05)',
      glow: 'rgba(99, 102, 241, 0.4)',
      gradient: 'from-indigo-500/20 to-indigo-500/0'
    }, // Indigo - Frontend Technologies
  ];

  const getColorScheme = (idx: number) => colorSchemes[idx % colorSchemes.length] || colorSchemes[0];
  const currentScheme = getColorScheme(activeIndex);

  const [isMobile, setIsMobile] = useState(false);

  useEffect(() => {
    const handleResize = () => setIsMobile(window.innerWidth < 1024);
    handleResize();
    window.addEventListener('resize', handleResize);
    return () => window.removeEventListener('resize', handleResize);
  }, []);

  const variants = {
    enter: (direction: number) => ({
      y: isMobile ? 8 : (direction > 0 ? 40 : -40),
      opacity: 0,
      scale: isMobile ? 0.98 : 1,
      filter: isMobile ? "blur(8px)" : "blur(0px)"
    }),
    center: {
      zIndex: 1,
      y: 0,
      x: 0,
      opacity: 1,
      scale: 1,
      filter: "blur(0px)"
    },
    exit: (direction: number) => ({
      zIndex: 0,
      y: isMobile ? -8 : (direction < 0 ? 40 : -40),
      opacity: 0,
      scale: isMobile ? 1.02 : 1,
      filter: isMobile ? "blur(8px)" : "blur(0px)"
    })
  };

  // Auto-cycle categories
  useEffect(() => {
    const timer = setInterval(() => {
      // Only auto-cycle if the user isn't actively scrolling or hovered
      setActiveIndex((prev) => (prev + 1) % SKILL_CATEGORIES.length);
      setDirection(1);
    }, 6000);

    return () => clearInterval(timer);
  }, [activeIndex]); // Restart timer on index change

  // Auto-scroll mobile tabs
  useEffect(() => {
    if (isMobile && tabsRef.current && categoryRefs.current[activeIndex]) {
      const activeTab = categoryRefs.current[activeIndex];
      const tabsContainer = tabsRef.current;

      if (activeTab && tabsContainer) {
        const scrollLeft = activeTab.offsetLeft - (tabsContainer.offsetWidth / 2) + (activeTab.offsetWidth / 2);
        tabsContainer.scrollTo({
          left: scrollLeft,
          behavior: 'smooth'
        });
      }
    }
  }, [activeIndex, isMobile]);

  return (
    <section
      ref={containerRef}
      id="skills"
      className="relative bg-slate-50 dark:bg-[#0a0a0a] min-h-[350vh] lg:min-h-[450vh]"
    >
      <div className="sticky top-0 h-[100dvh] flex flex-col justify-center overflow-hidden py-4 lg:py-0">

        {/* Background decoration */}
        <div className="absolute inset-0 pointer-events-none overflow-hidden">
          <motion.div
            animate={{
              scale: [1, 1.2, 1],
              opacity: [0.1, 0.15, 0.1],
            }}
            transition={{ duration: 8, repeat: Infinity, ease: "easeInOut" }}
            className="absolute -top-[10%] -left-[10%] w-[40%] h-[40%] rounded-full blur-[120px]"
            style={{ backgroundColor: currentScheme.primary }}
          />
          <motion.div
            animate={{
              scale: [1, 1.3, 1],
              opacity: [0.1, 0.2, 0.1],
            }}
            transition={{ duration: 10, repeat: Infinity, ease: "easeInOut", delay: 1 }}
            className="absolute -bottom-[10%] -right-[10%] w-[40%] h-[40%] rounded-full blur-[120px]"
            style={{ backgroundColor: currentScheme.secondary }}
          />

          {/* Animated grid */}
          <div className="absolute inset-0 opacity-[0.03] dark:opacity-[0.1]"
            style={{
              backgroundImage: `linear-gradient(${currentScheme.primary} 1px, transparent 1px),
                                linear-gradient(90deg, ${currentScheme.primary} 1px, transparent 1px)`,
              backgroundSize: '80px 80px',
              maskImage: 'radial-gradient(circle at center, black, transparent 80%)'
            }}
          />
        </div>

        <div className="container mx-auto px-6 relative z-10 h-full flex flex-col justify-center">
          {/* Header */}
          <div className="mb-8 md:mb-12 text-center shrink-0">
            <motion.h2
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              className="text-4xl md:text-5xl font-bold text-slate-900 dark:text-white mb-4"
            >
              Technical <span className="text-transparent bg-clip-text bg-gradient-to-r from-emerald-500 to-cyan-500">Arsenal</span>
            </motion.h2>

            <motion.p
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: 0.2 }}
              className="text-slate-600 dark:text-slate-400 max-w-xl mx-auto"
            >
              A curated collection of tools and technologies I wield to build secure, tested, and production-ready systems.
            </motion.p>
          </div>

          {/* Main Skills Display */}
          <div className="grid lg:grid-cols-12 gap-6 lg:gap-8 items-start h-auto lg:h-[600px]">

            {/* Category Selector - Top on Mobile, Left on Desktop */}
            <motion.div
              ref={tabsRef}
              initial={{ opacity: 0, x: -30 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true }}
              className="lg:col-span-4 flex lg:flex-col gap-2 overflow-x-auto lg:overflow-y-auto lg:max-h-[600px] pb-4 lg:pb-0 scrollbar-hide no-scrollbar pr-1"
            >
              {SKILL_CATEGORIES.map((category, index) => {
                const scheme = getColorScheme(index);
                return (
                  <motion.div
                    key={category.title}
                    ref={(el) => (categoryRefs.current[index] = el)}
                    onClick={() => handleCategoryClick(index)}
                    whileHover={{ x: 4 }}
                    className={`relative p-2.5 lg:p-3 rounded-2xl cursor-pointer transition-all duration-500 overflow-hidden group flex-shrink-0 min-w-[160px] lg:min-w-0 ${activeIndex === index
                      ? 'bg-white dark:bg-slate-800/40 shadow-2xl shadow-emerald-500/5'
                      : 'hover:bg-slate-100/50 dark:hover:bg-slate-800/20'
                      }`}
                  >
                    {/* Active Indicator Background */}
                    {activeIndex === index && (
                      <motion.div
                        layoutId="activeCategory"
                        className="absolute inset-0 bg-gradient-to-r opacity-10 dark:opacity-20 z-0"
                        style={{ backgroundImage: `linear-gradient(to right, ${scheme.primary}, transparent)` }}
                        transition={{ type: "spring", bounce: 0.2, duration: 0.6 }}
                      />
                    )}

                    <div className="relative z-10 flex items-center gap-3 lg:gap-4">
                      {/* Icon with glow */}
                      <div
                        className={`relative p-2 lg:p-2.5 rounded-xl transition-all duration-500 ${activeIndex === index ? 'scale-110' : 'group-hover:scale-105'
                          }`}
                      >
                        {activeIndex === index && (
                          <motion.div
                            layoutId="iconGlow"
                            className="absolute inset-0 blur-md opacity-50 rounded-xl"
                            style={{ backgroundColor: scheme.primary }}
                          />
                        )}
                        <div className="relative z-10" style={{ color: activeIndex === index ? scheme.primary : 'inherit' }}>
                          <category.icon size={20} className="lg:w-6 lg:h-6" strokeWidth={activeIndex === index ? 2.5 : 2} />
                        </div>
                      </div>

                      {/* Text */}
                      <div className="flex-1 min-w-0">
                        <h3 className={`text-sm lg:text-base font-semibold truncate transition-colors ${activeIndex === index
                          ? 'text-slate-900 dark:text-white'
                          : 'text-slate-600 dark:text-slate-400'
                          }`}>
                          {category.title}
                        </h3>
                        <p className={`text-[10px] lg:text-xs font-mono mt-0.5 transition-colors ${activeIndex === index
                          ? 'text-slate-500 dark:text-slate-400'
                          : 'text-slate-400 dark:text-slate-500'
                          }`}>
                          {category.skills.length} skills
                        </p>
                      </div>

                      {/* Arrow - Desktop only */}
                      <ChevronRight
                        size={18}
                        className={`hidden lg:block transition-all duration-300 shrink-0 ${activeIndex === index
                          ? 'opacity-100 translate-x-0'
                          : 'opacity-0 -translate-x-2'
                          }`}
                        style={{ color: scheme.primary }}
                      />
                    </div>
                  </motion.div>
                );
              })}
            </motion.div>

            {/* Skills Display - Right Side */}
            <motion.div
              initial={{ opacity: 0, x: 30 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true }}
              className="lg:col-span-8 h-full min-h-[400px] lg:min-h-0"
            >
              <div className="relative bg-white/50 dark:bg-slate-900/40 backdrop-blur-md rounded-3xl p-5 lg:p-8 border border-white/20 dark:border-slate-800/50 overflow-hidden h-full shadow-2xl flex flex-col justify-center">

                {/* Decorative scanline effect */}
                <div className="absolute inset-0 pointer-events-none opacity-[0.03] bg-[linear-gradient(to_bottom,transparent_50%,black_50%)] bg-[length:100%_4px]" />

                {/* Category Header */}
                <AnimatePresence mode="wait" custom={direction}>
                  <motion.div
                    key={activeIndex}
                    custom={direction}
                    variants={variants}
                    initial="enter"
                    animate="center"
                    exit="exit"
                    transition={{
                      y: { type: "spring", stiffness: 300, damping: 30 },
                      opacity: { duration: 0.2 }
                    }}
                    className="mb-6 lg:mb-8 relative"
                  >
                    <div className="flex items-center gap-4 mb-4">
                      <div
                        className="p-2 lg:p-3 rounded-2xl shadow-inner border border-white/10"
                        style={{
                          backgroundColor: currentScheme.bg,
                          boxShadow: `0 0 20px ${currentScheme.glow}`
                        }}
                      >
                        {React.createElement(SKILL_CATEGORIES[activeIndex].icon, {
                          size: 24,
                          className: "lg:w-7 lg:h-7",
                          style: { color: currentScheme.primary }
                        })}
                      </div>
                      <div>
                        <h3 className="text-2xl lg:text-3xl font-black tracking-tight text-slate-900 dark:text-white uppercase">
                          {SKILL_CATEGORIES[activeIndex].title}
                        </h3>
                        <div className="h-1 w-16 lg:w-20 rounded-full bg-gradient-to-r mt-1"
                          style={{ backgroundImage: `linear-gradient(to right, ${currentScheme.primary}, transparent)` }} />
                      </div>
                    </div>
                    <p className="text-sm lg:text-lg text-slate-600 dark:text-slate-400 font-medium leading-relaxed max-w-2xl">
                      {SKILL_CATEGORIES[activeIndex].description}
                    </p>
                  </motion.div>
                </AnimatePresence>

                {/* Skills Grid with Premium Cards */}
                <AnimatePresence mode="wait" custom={direction}>
                  <motion.div
                    key={`${activeIndex}-grid`}
                    custom={direction}
                    variants={variants}
                    initial="enter"
                    animate="center"
                    exit="exit"
                    transition={{
                      y: { type: "spring", stiffness: 300, damping: 30 },
                      opacity: { duration: 0.2 },
                      delay: 0.1
                    }}
                    className="grid grid-cols-1 sm:grid-cols-2 gap-3.5 max-h-[380px] overflow-y-auto pr-1 scrollbar-hide"
                  >
                    {SKILL_CATEGORIES[activeIndex].skills.map((skill, skillIndex) => (
                      <motion.div
                        key={skill}
                        initial={{ opacity: 0, scale: 0.9, y: 20 }}
                        animate={{ opacity: 1, scale: 1, y: 0 }}
                        transition={{
                          duration: 0.4,
                          delay: skillIndex * 0.05,
                          type: "spring",
                          stiffness: 100
                        }}
                        onMouseEnter={() => setHoveredSkill(skill)}
                        onMouseLeave={() => setHoveredSkill(null)}
                      >
                        <motion.div
                          whileHover={{
                            scale: 1.02,
                            translateY: -5,
                            rotateX: 2,
                            rotateY: -2
                          }}
                          className={`relative group p-3.5 lg:p-4 rounded-2xl border transition-all duration-300 backdrop-blur-sm overflow-hidden ${hoveredSkill === skill
                            ? 'border-transparent shadow-2xl'
                            : 'border-slate-200 dark:border-slate-800/50 bg-white/5 dark:bg-slate-900/20'
                            }`}
                        >
                          {/* Interactive Background Gradient */}
                          <div
                            className="absolute inset-0 opacity-0 group-hover:opacity-10 dark:group-hover:opacity-20 transition-opacity duration-500"
                            style={{ backgroundImage: `radial-gradient(circle at center, ${currentScheme.primary}, transparent 70%)` }}
                          />

                          {/* Card Content */}
                          <div className="relative z-10 flex items-center justify-between">
                            <div className="flex items-center gap-4">
                              <div className="relative">
                                <div className={`w-3 h-3 rounded-full shadow-[0_0_10px_rgba(0,0,0,0.1)] transition-all duration-500 ${hoveredSkill === skill ? 'scale-125' : 'scale-100'
                                  }`}
                                  style={{
                                    backgroundColor: currentScheme.primary,
                                    boxShadow: hoveredSkill === skill ? `0 0 15px ${currentScheme.primary}` : 'none'
                                  }}
                                />
                              </div>
                              <span className={`text-base font-bold tracking-wide transition-colors duration-300 ${hoveredSkill === skill ? 'text-slate-900 dark:text-white' : 'text-slate-600 dark:text-slate-400'
                                }`}>
                                {skill}
                              </span>
                            </div>

                            <motion.div
                              animate={{ x: hoveredSkill === skill ? 0 : -10, opacity: hoveredSkill === skill ? 1 : 0 }}
                              className="text-xs font-mono font-bold uppercase tracking-widest"
                              style={{ color: currentScheme.primary }}
                            >
                              Ready
                            </motion.div>
                          </div>

                          {/* Bottom shimmer border */}
                          <div className="absolute bottom-0 left-0 w-full h-[2px] overflow-hidden">
                            <motion.div
                              className="w-full h-full"
                              initial={{ x: '-100%' }}
                              animate={hoveredSkill === skill ? { x: '100%' } : { x: '-100%' }}
                              transition={{ duration: 0.8, ease: "easeInOut" }}
                              style={{ background: `linear-gradient(90deg, transparent, ${currentScheme.primary}, transparent)` }}
                            />
                          </div>
                        </motion.div>
                      </motion.div>
                    ))}
                  </motion.div>
                </AnimatePresence>

                {/* Bottom Stats */}
                <motion.div
                  className="mt-auto pt-6 border-t border-slate-200 dark:border-slate-700/50 flex items-center justify-between"
                  initial={{ opacity: 0 }}
                  animate={{ opacity: 1 }}
                  transition={{ delay: 0.5 }}
                >
                  <div className="flex items-center gap-6">
                    <div>
                      <div className="text-2xl font-bold text-slate-900 dark:text-white">
                        {SKILL_CATEGORIES[activeIndex].skills.length}
                      </div>
                      <div className="text-xs text-slate-500 dark:text-slate-400 font-mono">skills</div>
                    </div>
                    <div className="w-px h-8 bg-slate-200 dark:bg-slate-700" />
                    <div>
                      <div className="text-2xl font-bold text-slate-900 dark:text-white">
                        {SKILL_CATEGORIES.length}
                      </div>
                      <div className="text-xs text-slate-500 dark:text-slate-400 font-mono">domains</div>
                    </div>
                  </div>

                  {/* Progress dots */}
                  <div className="flex items-center gap-2">
                    {SKILL_CATEGORIES.map((_, idx) => (
                      <button
                        key={idx}
                        onClick={() => handleCategoryClick(idx)}
                        className={`w-2 h-2 rounded-full transition-all duration-300 ${activeIndex === idx ? 'w-6' : 'hover:opacity-80'
                          }`}
                        style={{
                          backgroundColor: activeIndex === idx
                            ? getColorScheme(idx).primary
                            : 'rgba(148, 163, 184, 0.3)'
                        }}
                      />
                    ))}
                  </div>
                </motion.div>
              </div>
            </motion.div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default Skills;
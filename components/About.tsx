import React from 'react';
import { motion, Variants } from 'framer-motion';
import { GitBranch, Lock, Search } from 'lucide-react';

const About: React.FC = () => {
  const containerVariants: Variants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: {
        staggerChildren: 0.2
      }
    }
  };

  const itemVariants: Variants = {
    hidden: { opacity: 0, y: 20 },
    visible: {
      opacity: 1,
      y: 0,
      transition: {
        duration: 0.5,
        ease: "easeOut"
      }
    }
  };

  return (
    <section id="about" className="py-24 bg-white dark:bg-[#0f172a] relative scroll-mt-28">
      <div className="container mx-auto px-6">
        <div className="flex flex-col lg:flex-row gap-16 items-center">
          
          <div className="lg:w-1/2">
            <motion.div
              initial="hidden"
              whileInView="visible"
              viewport={{ once: true, margin: "-100px" }}
              variants={containerVariants}
            >
              <motion.h2 variants={itemVariants} className="text-sm font-mono text-emerald-500 dark:text-emerald-400 mb-2 tracking-wider uppercase">Identity Verified</motion.h2>
              <motion.h3 variants={itemVariants} className="text-3xl md:text-4xl font-bold mb-6 text-slate-900 dark:text-white">
                The Shift-Left Mindset
              </motion.h3>
              <motion.div variants={itemVariants} className="space-y-4 text-slate-600 dark:text-slate-300 leading-relaxed">
                <p>
                  In a world where deployment cycles are measured in minutes, traditional QA is a bottleneck and reactive security is a liability. I represent the evolution of engineering assurance.
                </p>
                <p>
                  My engineering philosophy is simple: <strong className="text-slate-900 dark:text-white">Quality and Security are not phases; they are attributes of the code itself.</strong> By integrating robust automated testing frameworks and security gates directly into the CI/CD pipeline, I ensure that bugs and vulnerabilities are caught before they ever leave the developer's machine.
                </p>
                <p>
                  I don't just find problems. I build the systems that prevent them. Whether it's architecting a self-healing Selenium grid or implementing a secrets detection scanner in a Jenkins pipeline, my goal is to empower developers to ship faster, safely.
                </p>
              </motion.div>
            </motion.div>
          </div>

          <motion.div 
            className="lg:w-1/2 grid grid-cols-1 md:grid-cols-2 gap-6"
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true, margin: "-100px" }}
            variants={containerVariants}
          >
            <motion.div 
              variants={itemVariants}
              className="p-6 rounded-xl bg-slate-50 dark:bg-slate-800/50 border border-slate-100 dark:border-slate-700 hover:border-emerald-500/50 transition-colors"
            >
              <Search className="w-8 h-8 text-blue-500 mb-4" />
              <h4 className="font-bold text-lg mb-2 dark:text-white">Quality Engineer</h4>
              <p className="text-sm text-slate-500 dark:text-slate-400">Obsessed with edge cases, user flows, and breaking things intelligently.</p>
            </motion.div>

            <motion.div 
              variants={itemVariants}
              className="p-6 rounded-xl bg-slate-50 dark:bg-slate-800/50 border border-slate-100 dark:border-slate-700 hover:border-violet-500/50 transition-colors"
            >
              <Lock className="w-8 h-8 text-violet-500 mb-4" />
              <h4 className="font-bold text-lg mb-2 dark:text-white">Security Advocate</h4>
              <p className="text-sm text-slate-500 dark:text-slate-400">Embedding security checks (SAST/DAST) into every commit.</p>
            </motion.div>

            <motion.div 
              variants={itemVariants}
              className="p-6 rounded-xl bg-slate-50 dark:bg-slate-800/50 border border-slate-100 dark:border-slate-700 hover:border-emerald-500/50 transition-colors md:col-span-2"
            >
              <GitBranch className="w-8 h-8 text-emerald-500 mb-4" />
              <h4 className="font-bold text-lg mb-2 dark:text-white">Pipeline Architect</h4>
              <p className="text-sm text-slate-500 dark:text-slate-400">Orchestrating the flow of code from local env to production with zero friction.</p>
            </motion.div>
          </motion.div>

        </div>
      </div>
    </section>
  );
};

export default About;
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
                  As an <strong className="text-slate-900 dark:text-white">SDET, DevOps & DevSecOps Engineer</strong>, I bridge continuous test automation, secure pipeline engineering, and resilient cloud infrastructure operations.
                </p>
                <p>
                  My engineering philosophy is grounded in the shift-left mindset: <strong className="text-slate-900 dark:text-white">Test Automation, CI/CD Pipeline Engineering, and Security Automation</strong> are embedded into code from the first commit. By integrating automated UI and API frameworks with Selenium and Playwright, and automated security gates with SonarQube, Trivy, Gitleaks, and OWASP, quality and compliance are verified continuously.
                </p>
                <p>
                  Beyond automation, I specialize in <strong className="text-slate-900 dark:text-white">Infrastructure Management and Monitoring & Observability</strong>. From containerized Docker and Kubernetes environments on Proxmox VE and Linux/Ubuntu servers to real-time telemetry with Prometheus, Grafana, and Loki, I build resilient systems designed for automated delivery and high operational stability.
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
              <p className="text-sm text-slate-500 dark:text-slate-400">Architecting end-to-end UI, API, and performance test automation using Playwright, Selenium, TestNG, Postman, and Apache JMeter.</p>
            </motion.div>

            <motion.div 
              variants={itemVariants}
              className="p-6 rounded-xl bg-slate-50 dark:bg-slate-800/50 border border-slate-100 dark:border-slate-700 hover:border-violet-500/50 transition-colors"
            >
              <Lock className="w-8 h-8 text-violet-500 mb-4" />
              <h4 className="font-bold text-lg mb-2 dark:text-white">Security Advocate</h4>
              <p className="text-sm text-slate-500 dark:text-slate-400">Embedding automated SAST, container vulnerability scanning with Trivy, secret detection with Gitleaks, and OWASP compliance gates.</p>
            </motion.div>

            <motion.div 
              variants={itemVariants}
              className="p-6 rounded-xl bg-slate-50 dark:bg-slate-800/50 border border-slate-100 dark:border-slate-700 hover:border-emerald-500/50 transition-colors md:col-span-2"
            >
              <GitBranch className="w-8 h-8 text-emerald-500 mb-4" />
              <h4 className="font-bold text-lg mb-2 dark:text-white">Pipeline Architect</h4>
              <p className="text-sm text-slate-500 dark:text-slate-400">Orchestrating Jenkins CI/CD pipelines, Docker containerization, Proxmox/Linux infrastructure, and Prometheus & Grafana observability.</p>
            </motion.div>
          </motion.div>

        </div>
      </div>
    </section>
  );
};

export default About;
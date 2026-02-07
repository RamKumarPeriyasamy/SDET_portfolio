import React from 'react';
import { motion } from 'framer-motion';
import { Mail, Github, Linkedin, Instagram, FileText } from 'lucide-react';

const Contact: React.FC = () => {
  return (
    <section id="contact" className="py-24 bg-slate-50 dark:bg-black text-slate-900 dark:text-white relative overflow-hidden scroll-mt-28 transition-colors duration-300">
      {/* Footer Gradient */}
      <div className="absolute top-0 left-0 w-full h-px bg-gradient-to-r from-transparent via-emerald-500 to-transparent opacity-50"></div>

      <div className="container mx-auto px-6 relative z-10">
        <div className="max-w-4xl mx-auto text-center">
          <motion.div
            initial={{ opacity: 0, scale: 0.9 }}
            whileInView={{ opacity: 1, scale: 1 }}
            viewport={{ once: true }}
            className="mb-12"
          >
            <h2 className="text-4xl md:text-5xl font-bold mb-6">Ready to Secure the Future?</h2>
            <p className="text-slate-600 dark:text-slate-400 text-lg mb-8 max-w-2xl mx-auto">
              I'm always open to discussing new opportunities, security challenges, or complex automation architectures.
            </p>

            <div className="flex flex-col lg:flex-row items-center justify-center gap-8 mt-4">
              <motion.a
                href="mailto:amosrajkumar1803@gmail.com?subject=Connecting%20via%20Portfolio&body=Hi%20Ram,%0D%0A%0D%0AI%20saw%20your%20portfolio%20and%20would%20like%20to%20connect%20with%20you!"
                whileHover={{ scale: 1.05, translateY: -5 }}
                whileTap={{ scale: 0.95 }}
                className="group relative inline-flex items-center gap-4 px-10 py-5 bg-gradient-to-r from-emerald-600 to-emerald-500 rounded-2xl shadow-lg shadow-emerald-500/20 hover:shadow-emerald-500/40 transition-all overflow-hidden"
              >
                {/* Shine effect */}
                <div className="absolute top-0 left-[-100%] w-[50%] h-full bg-gradient-to-r from-transparent via-white/20 to-transparent skew-x-12 group-hover:animate-[shine_1.5s_infinite]" />

                <div className="p-3 bg-white/10 rounded-xl backdrop-blur-sm">
                  <Mail size={24} className="text-white" />
                </div>
                <div className="text-left">
                  <span className="block text-xs font-mono text-emerald-100 mb-0.5">EMAIL PROTOCOL</span>
                  <span className="block text-xl font-bold text-white">Initiate Communication</span>
                </div>
              </motion.a>

              <motion.a
                href="https://wa.me/919080067941?text=Hi%20Ram,%20I%20saw%20your%20portfolio%20and%20would%20like%20to%20connect!"
                target="_blank"
                rel="noopener noreferrer"
                whileHover={{ scale: 1.05, translateY: -5 }}
                whileTap={{ scale: 0.95 }}
                className="group relative inline-flex items-center gap-4 px-10 py-5 bg-gradient-to-r from-[#25D366] to-[#128C7E] rounded-2xl shadow-lg shadow-[#25D366]/20 hover:shadow-[#25D366]/40 transition-all overflow-hidden"
              >
                {/* Shine effect */}
                <div className="absolute top-0 left-[-100%] w-[50%] h-full bg-gradient-to-r from-transparent via-white/20 to-transparent skew-x-12 group-hover:animate-[shine_1.5s_infinite]" />

                <div className="p-3 bg-white/10 rounded-xl backdrop-blur-sm">
                  <svg viewBox="0 0 24 24" width="24" height="24" stroke="currentColor" strokeWidth="0" fill="currentColor" className="text-white">
                    <path d="M17.472 14.382c-.297-.149-1.758-.867-2.03-.967-.273-.099-.471-.148-.67.15-.197.297-.767.966-.94 1.164-.173.199-.347.223-.644.075-.297-.15-1.255-.463-2.39-1.475-.883-.788-1.48-1.761-1.653-2.059-.173-.297-.018-.458.13-.606.134-.133.298-.347.446-.52.149-.174.198-.298.298-.497.099-.198.05-.371-.025-.52-.075-.149-.669-1.612-.916-2.207-.242-.579-.487-.5-.669-.51-.173-.008-.371-.01-.57-.01-.198 0-.52.074-.792.372-.272.297-1.04 1.016-1.04 2.479 0 1.462 1.065 2.875 1.213 3.074.149.198 2.096 3.2 5.077 4.487.709.306 1.262.489 1.694.625.712.227 1.36.195 1.871.118.571-.085 1.758-.719 2.006-1.413.248-.694.248-1.289.173-1.413-.074-.124-.272-.198-.57-.347m-5.421 7.403h-.004a9.87 9.87 0 01-5.031-1.378l-.361-.214-3.741.982.998-3.648-.235-.374a9.86 9.86 0 01-1.51-5.26c.001-5.45 4.436-9.884 9.888-9.884 2.64 0 5.122 1.03 6.988 2.898a9.825 9.825 0 012.893 6.994c-.003 5.45-4.437 9.884-9.885 9.884m8.413-18.297A11.815 11.815 0 0012.05 0C5.495 0 .16 5.335.157 11.892c0 2.096.547 4.142 1.588 5.945L.057 24l6.305-1.654a11.882 11.882 0 005.683 1.448h.005c6.554 0 11.89-5.335 11.893-11.893a11.821 11.821 0 00-3.48-8.413Z" />
                  </svg>
                </div>
                <div className="text-left">
                  <span className="block text-xs font-mono text-emerald-100 mb-0.5">DIRECT ENCRYPTED</span>
                  <span className="block text-xl font-bold text-white">WhatsApp Me</span>
                </div>
              </motion.a>
            </div>
          </motion.div>

          <div id="resume" className="mb-20 p-8 rounded-2xl bg-white dark:bg-slate-800/50 border border-slate-200 dark:border-slate-700 backdrop-blur-sm max-w-2xl mx-auto scroll-mt-28 shadow-xl shadow-slate-200/50 dark:shadow-none translate-y-0 hover:-translate-y-1 transition-all">
            <div className="flex items-center justify-between flex-wrap gap-4">
              <div className="text-left">
                <h3 className="text-xl font-bold text-slate-900 dark:text-white flex items-center gap-2">
                  <FileText size={20} className="text-violet-500" />
                  Download Resume
                </h3>
                <p className="text-slate-500 dark:text-slate-400 text-sm mt-1">Detailed breakdown of skills, certifications & experience.</p>
              </div>
              <button className="px-6 py-3 rounded-xl bg-slate-900 dark:bg-slate-700 text-white hover:bg-emerald-500 dark:hover:bg-white dark:hover:text-slate-900 transition-all font-bold text-sm shadow-lg shadow-slate-900/10 dark:shadow-none">
                Download PDF
              </button>
            </div>
          </div>

          <div className="flex justify-center gap-8 mb-16">
            {[
              { icon: Github, href: "https://github.com/ramkumarperiyasamy", label: "GitHub" },
              { icon: Linkedin, href: "https://www.linkedin.com/in/ramkumar-periyasamy", label: "LinkedIn" },
              { icon: Instagram, href: "https://www.instagram.com/ramkumar_sdet_secops/", label: "Instagram" }
            ].map((social) => (
              <a
                key={social.label}
                href={social.href}
                className="p-4 rounded-xl bg-white dark:bg-slate-800 text-slate-500 dark:text-slate-400 hover:bg-emerald-500 hover:text-white transition-all hover:-translate-y-1 shadow-md border border-slate-100 dark:border-slate-700"
                aria-label={social.label}
              >
                <social.icon size={24} />
              </a>
            ))}
          </div>

          <div className="border-t border-slate-800 pt-8 flex flex-col items-center text-center text-sm text-slate-500 font-mono">
            <p className="mb-2 uppercase tracking-wider">&copy; {new Date().getFullYear()} RAM KUMAR PERIYASAMY. ALL RIGHTS RESERVED.</p>
            <p className="opacity-60 text-[10px] tracking-widest uppercase">BUILD: v2.4.0-STABLE // ENCRYPTED-STORAGE: ACTIVE</p>
          </div>
        </div>
      </div>
    </section>
  );
};

export default Contact;
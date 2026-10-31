import React, { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Menu, X, Shield } from 'lucide-react';
import { NAV_LINKS } from '../../constants';
import ThemeToggle from './ThemeToggle';
import logoImg from '../assert/logo.png';

const Navbar: React.FC = () => {
  const [isOpen, setIsOpen] = useState(false);
  const [scrolled, setScrolled] = useState(false);

  useEffect(() => {
    const handleScroll = () => {
      setScrolled(window.scrollY > 50);
    };
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  const handleNavClick = (e: React.MouseEvent<HTMLAnchorElement>, href: string) => {
    e.preventDefault();
    setIsOpen(false);

    const element = document.querySelector(href);
    if (element) {
      const offset = 100; // Height of navbar + buffer
      const bodyRect = document.body.getBoundingClientRect().top;
      const elementRect = element.getBoundingClientRect().top;
      const elementPosition = elementRect - bodyRect;
      const offsetPosition = elementPosition - offset;

      window.scrollTo({
        top: offsetPosition,
        behavior: 'smooth'
      });
    }
  };

  return (
    <nav
      className={`fixed top-0 w-full z-50 transition-all duration-300 ${scrolled ? 'bg-white/80 dark:bg-[#0f172a]/80 backdrop-blur-lg border-b border-slate-200 dark:border-slate-800 py-4' : 'bg-transparent py-6'
        }`}
    >
      <div className="container mx-auto px-6 flex justify-between items-center">

        {/* Logo */}
        <a href="#" className="flex items-center gap-2 group cursor-pointer" onClick={(e) => { e.preventDefault(); window.scrollTo({ top: 0, behavior: 'smooth' }); }}>
          <img
            src={logoImg}
            alt="Ram Kumar Logo"
            className="w-10 h-10 sm:w-12 sm:h-12 object-contain filter drop-shadow-[0_2px_8px_rgba(0,0,0,0.3)] transition-transform duration-300 group-hover:scale-110"
          />
          <span className="text-xl font-bold tracking-tight text-slate-900 dark:text-white">
            Ram<span className="text-emerald-500">.SDET</span>
          </span>
        </a>

        {/* Desktop Menu */}
        <div className="hidden md:flex items-center gap-8">
          {NAV_LINKS.map((link) => (
            <a
              key={link.name}
              href={link.href}
              onClick={(e) => handleNavClick(e, link.href)}
              className="text-sm font-medium text-slate-600 dark:text-slate-300 hover:text-emerald-500 dark:hover:text-emerald-400 transition-colors cursor-pointer"
            >
              {link.name}
            </a>
          ))}
          <div className="h-6 w-px bg-slate-200 dark:bg-slate-700"></div>
          <ThemeToggle />
        </div>

        {/* Mobile Toggle */}
        <div className="md:hidden flex items-center gap-4">
          <ThemeToggle />
          <button
            onClick={() => setIsOpen(!isOpen)}
            className="text-slate-900 dark:text-white focus:outline-none"
          >
            {isOpen ? <X size={24} /> : <Menu size={24} />}
          </button>
        </div>
      </div>

      {/* Mobile Menu */}
      <AnimatePresence>
        {isOpen && (
          <motion.div
            initial={{ opacity: 0, height: 0 }}
            animate={{ opacity: 1, height: 'auto' }}
            exit={{ opacity: 0, height: 0 }}
            className="md:hidden bg-white dark:bg-slate-900 border-b border-slate-200 dark:border-slate-800 overflow-hidden"
          >
            <div className="flex flex-col p-6 space-y-4">
              {NAV_LINKS.map((link) => (
                <a
                  key={link.name}
                  href={link.href}
                  onClick={(e) => handleNavClick(e, link.href)}
                  className="text-lg font-medium text-slate-900 dark:text-slate-100 hover:text-emerald-500 dark:hover:text-emerald-400 cursor-pointer"
                >
                  {link.name}
                </a>
              ))}
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </nav>
  );
};

export default Navbar;
import React from 'react';
import Navbar from './components/Layout/Navbar';
import Hero from './components/Hero';
import About from './components/About';
import Skills from './components/Skills';
import Projects from './components/Projects';
import Experience from './components/Experience';
import Contact from './components/Contact';
import SystemStatus from './components/Layout/SystemStatus';
import PersonalSide from './components/PersonalSide';
import ArchitectureDiagram from './components/ArchitectureDiagram';

import CyberBackground from './components/Layout/CyberBackground';

function App() {
  return (
    <div className="min-h-screen bg-slate-50 dark:bg-[#0a0a0a] transition-colors duration-300 relative">
      <CyberBackground />
      <div className="relative z-10">
        <Navbar />
        <SystemStatus />

        <main>
          <Hero />
          <About />
          <Skills />
          <Experience />
          <ArchitectureDiagram />
          <Projects />
          <PersonalSide />
        </main>

        <Contact />
      </div>
    </div>
  );
}

export default App;
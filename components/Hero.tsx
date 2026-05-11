'use client';
import { useState, useEffect } from 'react';
import data from '../data/data.json';

export default function Hero() {
  const fallbackPhrases = [
    "Solutions Engineer",
    "AI-Native Architect",
    "Enterprise Implementation Lead",
    "MS CS Graduate"
  ];

  const phrases = fallbackPhrases;
  
  const [currentPhraseIndex, setCurrentPhraseIndex] = useState(0);
  const [currentText, setCurrentText] = useState('');
  const [isDeleting, setIsDeleting] = useState(false);
  
  // Typewriter effect
  useEffect(() => {
    const phrase = phrases[currentPhraseIndex];
    let timer: NodeJS.Timeout;
    
    const typingSpeed = isDeleting ? 30 : 80;
    const pauseTime = 2000;
    
    if (!isDeleting && currentText === phrase) {
      timer = setTimeout(() => setIsDeleting(true), pauseTime);
    } else if (isDeleting && currentText === '') {
      setIsDeleting(false);
      setCurrentPhraseIndex((prev) => (prev + 1) % phrases.length);
    } else {
      timer = setTimeout(() => {
        setCurrentText(
          isDeleting 
            ? phrase.substring(0, currentText.length - 1)
            : phrase.substring(0, currentText.length + 1)
        );
      }, typingSpeed);
    }
    
    return () => clearTimeout(timer);
  }, [currentText, isDeleting, currentPhraseIndex, phrases]);

  // Animation on mount
  const [mounted, setMounted] = useState(false);
  useEffect(() => {
    setMounted(true);
  }, []);

  // Scroll listener for indicator
  const [showScroll, setShowScroll] = useState(true);
  useEffect(() => {
    const handleScroll = () => {
      if (window.scrollY > 100) {
        setShowScroll(false);
      } else {
        setShowScroll(true);
      }
    };
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  // Count up animation for numbers
  const [counts, setCounts] = useState({
    users: 0,
    accounts: 0,
    credits: 0,
    tables: 0,
    services: 0
  });

  useEffect(() => {
    if (!mounted) return;

    const targets = {
      users: 15000,
      accounts: 15,
      credits: 72,
      tables: 12,
      services: 6
    };

    const duration = 2000; // 2 seconds
    const interval = 16; // ~60fps
    const steps = duration / interval;
    
    let currentStep = 0;

    const timer = setInterval(() => {
      currentStep += 1;
      const progress = Math.min(currentStep / steps, 1);
      
      setCounts({
        users: Math.floor(targets.users * progress),
        accounts: Math.floor(targets.accounts * progress),
        credits: Math.floor(targets.credits * progress),
        tables: Math.floor(targets.tables * progress),
        services: Math.floor(targets.services * progress)
      });

      if (progress === 1) {
        clearInterval(timer);
      }
    }, interval);

    return () => clearInterval(timer);
  }, [mounted]);

  const { name, location } = data.personal_info;

  const techStack = [
    "FastAPI", "PostgreSQL", "SQLAlchemy", "Next.js", 
    "TypeScript", "Python", "JWT", "Alembic"
  ];

  return (
    <div className="bg-[#0D1B2A] text-white min-h-screen flex items-center relative overflow-hidden">
      {/* Custom Keyframes in Style Tag to avoid modifying globals.css */}
      <style jsx>{`
        @keyframes cursor-blink {
          0%, 100% { opacity: 1; }
          50% { opacity: 0; }
        }
        .cursor-blink::after {
          content: '|';
          animation: cursor-blink 1s step-end infinite;
          color: #378ADD;
          margin-left: 2px;
        }
        @keyframes bounce-gentle {
          0%, 100% { transform: translateY(0); }
          50% { transform: translateY(8px); }
        }
        .animate-bounce-gentle {
          animation: bounce-gentle 2s ease-in-out infinite;
        }
      `}</style>

      {/* CSS Dot Grid Overlay */}
      <div 
        className="absolute inset-0"
        style={{
          backgroundImage: 'radial-gradient(#378ADD22 1px, transparent 1px)',
          backgroundSize: '28px 28px'
        }}
      />

      <div className="max-w-6xl mx-auto px-6 grid grid-cols-1 md:grid-cols-2 gap-12 items-center relative z-10 py-20 md:py-0">
        
        {/* Left Column: Content */}
        <div className="space-y-8">
          
          {/* 1. Status Badge */}
          <div 
            className={`inline-flex items-center gap-2 border border-green-500/30 bg-green-500/10 text-green-400 px-3 py-1 rounded-full text-xs font-medium transition-all duration-700 ease-out ${mounted ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-5'}`}
            style={{ transitionDelay: '100ms' }}
          >
            <span className="relative flex h-2 w-2">
              <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-green-400 opacity-75"></span>
              <span className="relative inline-flex rounded-full h-2 w-2 bg-green-500"></span>
            </span>
            Open to SE / TAM roles · {location}
          </div>

          {/* 2. Name */}
          <h1 
            className={`text-6xl md:text-7xl font-extrabold tracking-tighter text-white hover:text-white transition-all duration-700 ease-out hover:[text-shadow:0_0_15px_rgba(55,138,221,0.5)] ${mounted ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-5'}`}
            style={{ transitionDelay: '200ms' }}
          >
            {name}
          </h1>

          {/* 3. Typewriter */}
          <div 
            className={`h-8 flex items-center transition-all duration-700 ease-out ${mounted ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-5'}`}
            style={{ transitionDelay: '300ms' }}
          >
            <p className="text-lg md:text-xl font-light text-gray-300">
              I am a <span className="text-[#378ADD] font-medium cursor-blink">{currentText}</span>
            </p>
          </div>

          {/* 4. Tagline */}
          <p 
            className={`text-sm md:text-base text-gray-500 font-medium transition-all duration-700 ease-out ${mounted ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-5'}`}
            style={{ transitionDelay: '400ms' }}
          >
            FastAPI · PostgreSQL · Next.js · 4+ yrs enterprise · 15,000+ users deployed
          </p>

          {/* 5. Tech Stack Icon Row */}
          <div 
            className={`flex flex-wrap gap-2 transition-all duration-700 ease-out ${mounted ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-5'}`}
            style={{ transitionDelay: '500ms' }}
          >
            {techStack.map((tech, index) => (
              <span
                key={tech}
                className="bg-white/5 border border-white/10 text-xs text-gray-300 px-3 py-1 rounded-full hover:border-[#378ADD] hover:text-[#378ADD] transition-colors duration-200 cursor-default"
                style={{ 
                  transitionDelay: `${500 + index * 50}ms`,
                  opacity: mounted ? 1 : 0,
                  transform: mounted ? 'translateY(0)' : 'translateY(10px)',
                  transition: 'opacity 0.5s ease-out, transform 0.5s ease-out, color 0.2s, border-color 0.2s'
                }}
              >
                {tech}
              </span>
            ))}
          </div>

          {/* 6. CTA Buttons */}
          <div 
            className={`flex flex-wrap gap-3 pt-2 transition-all duration-700 ease-out ${mounted ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-5'}`}
            style={{ transitionDelay: '600ms' }}
          >
            <a
              href="#projects"
              className="bg-[#378ADD] hover:bg-[#185FA5] text-white font-medium px-6 py-2.5 rounded text-sm transition-colors duration-200"
            >
              View Projects
            </a>
            <a
              href="/resume.pdf"
              target="_blank"
              rel="noopener noreferrer"
              className="bg-transparent hover:bg-white/5 text-white font-medium px-6 py-2.5 border border-white/20 rounded text-sm transition-colors duration-200"
            >
              Download Resume
            </a>
          </div>

          {/* 7. Trust Metrics Row */}
          <div 
            className={`flex flex-wrap gap-4 pt-4 transition-all duration-700 ease-out ${mounted ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-5'}`}
            style={{ transitionDelay: '700ms' }}
          >
            {/* Metric 1 */}
            <div className="bg-white/5 rounded-lg px-4 py-2 text-sm min-w-[120px]">
              <div className="text-white font-bold text-lg">
                {counts.users.toLocaleString()}+
              </div>
              <div className="text-gray-400 text-xs">Users Deployed</div>
            </div>
            
            {/* Metric 2 */}
            <div className="bg-white/5 rounded-lg px-4 py-2 text-sm min-w-[120px]">
              <div className="text-white font-bold text-lg">
                {counts.accounts}
              </div>
              <div className="text-gray-400 text-xs">Enterprise Accounts</div>
            </div>

            {/* Metric 3 */}
            <div className="bg-white/5 rounded-lg px-4 py-2 text-sm min-w-[120px]">
              <div className="text-white font-bold text-lg">
                {counts.credits}
              </div>
              <div className="text-gray-400 text-xs">MS Credits</div>
            </div>
          </div>

          {/* 8. Social Links Row */}
          <div 
            className={`flex gap-4 pt-2 transition-all duration-700 ease-out ${mounted ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-5'}`}
            style={{ transitionDelay: '800ms' }}
          >
            <a href="https://github.com/bharath1997-crypto" target="_blank" rel="noopener noreferrer" className="text-gray-500 hover:text-[#378ADD] transition-colors duration-200">
              <svg className="w-5 h-5" fill="currentColor" viewBox="0 0 24 24"><path fillRule="evenodd" d="M12 2C6.477 2 2 6.477 2 12c0 4.42 2.87 8.17 6.84 9.5.5.09.66-.23.66-.5v-1.69c-2.77.6-3.36-1.34-3.36-1.34-.45-1.13-1.11-1.44-1.11-1.44-.9-.62.07-.61.07-.61 1 .07 1.53 1.03 1.53 1.03.89 1.52 2.34 1.07 2.91.83.09-.65.35-1.09.63-1.34-2.22-.25-4.55-1.11-4.55-4.92 0-1.09.39-1.98 1.03-2.68-.1-.25-.45-1.27.1-2.64 0 0 .84-.27 2.75 1.02.8-.22 1.65-.33 2.5-.33.85 0 1.7.11 2.5.33 1.91-1.29 2.75-1.02 2.75-1.02.55 1.37.2 2.39.1 2.64.65.7 1.03 1.58 1.03 2.68 0 3.82-2.34 4.66-4.57 4.91.36.31.68.92.68 1.85v2.74c0 .27.16.59.67.5C19.14 20.16 22 16.42 22 12A10 10 0 0012 2z" clipRule="evenodd" /></svg>
            </a>
            <a href="https://linkedin.com/in/bharath-nidumolu-613397135" target="_blank" rel="noopener noreferrer" className="text-gray-500 hover:text-[#378ADD] transition-colors duration-200">
              <svg className="w-5 h-5" fill="currentColor" viewBox="0 0 24 24"><path d="M19 0h-14c-2.761 0-5 2.239-5 5v14c0 2.761 2.239 5 5 5h14c2.761 0 5-2.239 5-5v-14c0-2.761-2.239-5-5-5zm-11 19h-3v-11h3v11zm-1.5-12.268c-.966 0-1.75-.79-1.75-1.764s.784-1.764 1.75-1.764 1.75.79 1.75 1.764-.783 1.764-1.75 1.764zm13.5 12.268h-3v-5.604c0-1.337-.025-3.064-1.867-3.064-1.867 0-2.154 1.459-2.154 2.966v5.702h-3v-11h2.88v1.501h.04c.401-.76 1.381-1.561 2.842-1.561 3.041 0 3.604 2.001 3.604 4.603v6.457z" /></svg>
            </a>
          </div>
        </div>

        {/* Right Column: Terminal */}
        <div 
          className={`w-full max-w-lg mx-auto md:mr-0 transition-all duration-1000 ease-out ${mounted ? 'opacity-100 translate-x-0' : 'opacity-0 translate-x-10'}`}
          style={{ transitionDelay: '400ms' }}
        >
          {/* Terminal Card */}
          <div className="bg-[#0a1628] border border-[#378ADD]/30 rounded-lg shadow-2xl overflow-hidden p-6">
            {/* Top Bar */}
            <div className="flex items-center justify-between mb-4 border-b border-white/5 pb-2">
              <div className="flex gap-1.5">
                <span className="w-2.5 h-2.5 bg-red-500/80 rounded-full" />
                <span className="w-2.5 h-2.5 bg-yellow-500/80 rounded-full" />
                <span className="w-2.5 h-2.5 bg-green-500/80 rounded-full" />
              </div>
              <span className="text-xs text-gray-500 font-mono">group_travel_os/main.py</span>
              <div className="w-5" />
            </div>

            {/* Terminal Content */}
            <div className="font-mono text-xs md:text-sm leading-relaxed space-y-1">
              <p className="text-gray-500"># Group Travel OS — FastAPI Backend</p>
              <p className="text-gray-500"># Phase 1 Complete · 12 tables · JWT auth</p>
              <p className="text-gray-500 mb-2"></p>
              <p><span className="text-[#378ADD]">from</span> fastapi <span className="text-[#378ADD]">import</span> FastAPI</p>
              <p><span className="text-[#378ADD]">from</span> app.routers <span className="text-[#378ADD]">import</span> auth, groups, trips</p>
              <p><span className="text-[#378ADD]">from</span> app.routers <span className="text-[#378ADD]">import</span> expenses, polls, locations</p>
              <p className="mb-2"></p>
              <p><span className="text-[#378ADD]">app</span> = FastAPI(title=<span className="text-green-400">"Group Travel OS"</span>)</p>
              <p className="mb-2"></p>
              <p>app.include_router(auth.router)      <span className="text-gray-500"># JWT + bcrypt</span></p>
              <p>app.include_router(groups.router)    <span className="text-gray-500"># CRUD + roles</span></p>
              <p>app.include_router(trips.router)     <span className="text-gray-500"># Locations + polls</span></p>
              <p>app.include_router(expenses.router)  <span className="text-gray-500"># Split logic</span></p>
              <p>app.include_router(polls.router)     <span className="text-gray-500"># Voting system</span></p>
              <p>app.include_router(locations.router) <span className="text-gray-500"># Geo management</span></p>
              <p className="mb-2"></p>
              <p className="text-gray-500"># 12 tables · SQLAlchemy 2.0 · Pydantic v2</p>
              <p className="text-gray-500 mb-4"># Tests: pytest · 6 files · Routes→Services→Models</p>
              
              <p className="text-gray-400">&gt; uvicorn app.main:app --reload</p>
              <div className="flex items-center gap-2">
                <span className="relative flex h-2 w-2">
                  <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-green-400 opacity-75"></span>
                  <span className="relative inline-flex rounded-full h-2 w-2 bg-green-500"></span>
                </span>
                <span className="text-green-400">&gt; Server running on http://localhost:8000 ✓</span>
              </div>
            </div>
          </div>

          {/* Mini Metric Cards Below Terminal */}
          <div className="grid grid-cols-2 gap-4 mt-4">
            <div className="bg-white/5 rounded-lg p-3 text-center">
              <div className="text-2xl font-bold text-white">{counts.tables}</div>
              <div className="text-xs text-gray-500">Database Tables</div>
            </div>
            <div className="bg-white/5 rounded-lg p-3 text-center">
              <div className="text-2xl font-bold text-white">{counts.services}</div>
              <div className="text-xs text-gray-500">Tested Services</div>
            </div>
          </div>
        </div>

      </div>

      {/* Scroll Indicator */}
      <div 
        className={`absolute bottom-6 left-1/2 transform -translate-x-1/2 flex flex-col items-center gap-1 transition-opacity duration-500 ${showScroll ? 'opacity-100' : 'opacity-0 pointer-events-none'}`}
      >
        <span className="text-gray-500 text-xs">scroll to explore</span>
        <div className="text-gray-500 animate-bounce-gentle">
          <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 14l-7 7-7-7" />
          </svg>
        </div>
      </div>
    </div>
  );
}

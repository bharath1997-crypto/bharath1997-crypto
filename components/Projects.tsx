'use client';
import { useState, useEffect, useRef } from 'react';
import data from '../data/data.json';

export default function Projects() {
  const [visibleItems, setVisibleItems] = useState<boolean[]>([]);
  const sectionRef = useRef<HTMLDivElement>(null);
  const cardsRef = useRef<(HTMLDivElement | null)[]>([]);

  useEffect(() => {
    setVisibleItems(new Array(data.projects.length).fill(false));

    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            const index = Number(entry.target.getAttribute('data-index'));
            setVisibleItems((prev) => {
              const newState = [...prev];
              newState[index] = true;
              return newState;
            });
            observer.unobserve(entry.target);
          }
        });
      },
      { threshold: 0.1 }
    );

    cardsRef.current.forEach((card) => {
      if (card) observer.observe(card);
    });

    return () => observer.disconnect();
  }, []);

  return (
    <div className="bg-white py-24" ref={sectionRef}>
      <div className="max-w-6xl mx-auto px-6">
        {/* Section Header */}
        <div className="mb-12">
          <h2 className="text-sm uppercase tracking-wider text-[#378ADD] font-semibold mb-2">
            The Vault
          </h2>
          <h3 className="text-3xl md:text-4xl font-bold text-[#0D1B2A]">
            Featured Projects
          </h3>
          <p className="text-gray-500 mt-2 text-lg">
            A collection of systems I've architected and built.
          </p>
        </div>

        {/* Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
          {data.projects.map((project, index) => {
            const isFeatured = index === 0; // Group Travel OS is first
            const isVisible = visibleItems[index];

            return (
              <div
                key={project.id}
                ref={(el) => { cardsRef.current[index] = el; }}
                data-index={index}
                className={`
                  bg-white border border-gray-100 rounded-lg shadow-sm hover:shadow-md transition-shadow duration-300 flex flex-col
                  ${isFeatured ? 'md:col-span-2' : ''}
                  ${isVisible ? 'fade-visible' : 'fade-hidden'}
                `}
                style={{ 
                  borderTopWidth: '4px', 
                  borderTopColor: project.accent 
                }}
              >
                <div className="p-6 md:p-8 flex-1 flex flex-col justify-between">
                  <div>
                    {/* Header */}
                    <div className="flex justify-between items-start mb-4">
                      <div>
                        <h4 className="text-xl font-bold text-[#0D1B2A] flex items-center gap-2">
                          {project.title}
                          {isFeatured && (
                            <span className="text-xs bg-[#378ADD]/10 text-[#378ADD] px-2.5 py-0.5 rounded-full font-medium">
                              Featured
                            </span>
                          )}
                        </h4>
                        <p className="text-xs text-gray-400 mt-1">
                          {project.context}
                        </p>
                      </div>
                      
                      {/* Icon (Simplified fallback) */}
                      <div className="p-2 bg-gray-50 rounded-md text-gray-400">
                        <svg className="w-5 h-5" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M10 20l4-16m4 4l4 4-4 4M6 16l-4-4 4-4" />
                        </svg>
                      </div>
                    </div>

                    {/* Description */}
                    <p className="text-gray-600 text-sm mb-6 leading-relaxed">
                      {project.description}
                    </p>

                    {/* Architecture block for featured project */}
                    {isFeatured && project.architecture && (
                      <div className="mb-6 bg-gray-50 p-4 rounded-md border border-gray-100">
                        <h5 className="text-xs font-semibold text-[#0D1B2A] uppercase mb-2">Deep Tech Summary</h5>
                        <ul className="grid grid-cols-1 md:grid-cols-2 gap-2 text-xs text-gray-600">
                          <li><span className="font-medium text-gray-500">Tables:</span> {project.architecture.tables}</li>
                          <li><span className="font-medium text-gray-500">Auth:</span> {project.architecture.auth}</li>
                          <li><span className="font-medium text-gray-500">Pattern:</span> {project.architecture.pattern}</li>
                          <li><span className="font-medium text-gray-500">Tests:</span> {project.architecture.tests}</li>
                        </ul>
                      </div>
                    )}
                  </div>

                  {/* Footer (Stack + Link) */}
                  <div>
                    {/* Stack Badges */}
                    <div className="flex flex-wrap gap-1.5 mb-6">
                      {project.stack.map((tech) => (
                        <span
                          key={tech}
                          className="text-xs bg-gray-50 text-gray-600 px-2 py-0.5 rounded border border-gray-100"
                        >
                          {tech}
                        </span>
                      ))}
                    </div>

                    {/* GitHub Link */}
                    <a
                      href={project.github}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="inline-flex items-center gap-2 text-sm font-medium text-[#378ADD] hover:text-[#185FA5] transition-colors duration-200"
                    >
                      <svg className="w-4 h-4" viewBox="0 0 24 24" fill="currentColor">
                        <path fillRule="evenodd" d="M12 2C6.477 2 2 6.477 2 12c0 4.42 2.87 8.17 6.84 9.5.5.09.66-.23.66-.5v-1.69c-2.77.6-3.36-1.34-3.36-1.34-.45-1.13-1.11-1.44-1.11-1.44-.9-.62.07-.61.07-.61 1 .07 1.53 1.03 1.53 1.03.89 1.52 2.34 1.07 2.91.83.09-.65.35-1.09.63-1.34-2.22-.25-4.55-1.11-4.55-4.92 0-1.09.39-1.98 1.03-2.68-.1-.25-.45-1.27.1-2.64 0 0 .84-.27 2.75 1.02.8-.22 1.65-.33 2.5-.33.85 0 1.7.11 2.5.33 1.91-1.29 2.75-1.02 2.75-1.02.55 1.37.2 2.39.1 2.64.65.7 1.03 1.58 1.03 2.68 0 3.82-2.34 4.66-4.57 4.91.36.31.68.92.68 1.85v2.74c0 .27.16.59.67.5C19.14 20.16 22 16.42 22 12A10 10 0 0012 2z" clipRule="evenodd" />
                      </svg>
                      View Source
                    </a>
                  </div>
                </div>
              </div>
            );
          })}
        </div>
      </div>
    </div>
  );
}

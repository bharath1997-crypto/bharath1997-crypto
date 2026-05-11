'use client';
import { useState, useEffect, useRef } from 'react';
import data from '../data/data.json';

export default function Certifications() {
  const [isVisible, setIsVisible] = useState(false);
  const ref = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          setIsVisible(true);
          observer.disconnect();
        }
      },
      { threshold: 0.2 }
    );
    if (ref.current) {
      observer.observe(ref.current);
    }
    return () => observer.disconnect();
  }, []);

  return (
    <div className="bg-white py-24" ref={ref}>
      <div className="max-w-6xl mx-auto px-6">
        {/* Section Header */}
        <div className="mb-12">
          <h2 className="text-sm uppercase tracking-wider text-[#378ADD] font-semibold mb-2">
            Credentials
          </h2>
          <h3 className="text-3xl md:text-4xl font-bold text-[#0D1B2A]">
            Certifications
          </h3>
        </div>

        {/* Horizontal Pill List */}
        <div 
          className={`flex flex-wrap gap-4 ${isVisible ? 'fade-visible' : 'fade-hidden'}`}
        >
          {data.certifications.map((cert, index) => (
            <div
              key={index}
              className="bg-gray-50 border border-gray-100 rounded-full px-6 py-3 flex items-center gap-3 hover:bg-gray-100 transition-colors duration-200"
            >
              {/* Icon Placeholder */}
              <div className="text-[#378ADD]">
                <svg className="w-5 h-5" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z" />
                </svg>
              </div>

              <div>
                <span className="font-semibold text-[#0D1B2A] text-sm">
                  {cert.name}
                </span>
                <span className="text-gray-400 text-xs ml-2">
                  by {cert.issuer}
                </span>
                <span className="text-gray-400 text-xs ml-2">
                  • {cert.date}
                </span>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}

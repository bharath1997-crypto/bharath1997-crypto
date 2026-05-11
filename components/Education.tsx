'use client';
import { useState, useEffect, useRef } from 'react';
import data from '../data/data.json';

export default function Education() {
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
    <div className="bg-gray-50 py-24" ref={ref}>
      <div className="max-w-6xl mx-auto px-6">
        {/* Section Header */}
        <div className="mb-12 text-center">
          <h2 className="text-sm uppercase tracking-wider text-[#378ADD] font-semibold mb-2">
            Academics
          </h2>
          <h3 className="text-3xl md:text-4xl font-bold text-[#0D1B2A]">
            Education
          </h3>
        </div>

        {/* Grid */}
        <div className={`grid grid-cols-1 ${data.education.length > 1 ? 'md:grid-cols-2' : 'max-w-2xl mx-auto'} gap-8`}>
          {data.education.map((item: any, index: number) => (
            <div
              key={index}
              className={`
                bg-white p-6 md:p-8 rounded-lg border border-gray-100 shadow-sm hover:shadow-md transition-shadow duration-300 flex flex-col justify-between
                ${isVisible ? 'fade-visible' : 'fade-hidden'}
              `}
            >
              <div>
                <div className="flex justify-between items-start mb-4">
                  <div>
                    <h4 className="text-xl font-bold text-[#0D1B2A]">
                      {item.institution}
                    </h4>
                    <p className="text-[#378ADD] font-medium text-sm">
                      {item.degree}
                    </p>
                  </div>
                  {item.status && (
                    <div className="bg-[#378ADD]/10 text-[#378ADD] text-xs font-semibold px-2.5 py-0.5 rounded-full">
                      {item.status.split(' · ')[0]}
                    </div>
                  )}
                  {item.period && (
                    <div className="bg-[#378ADD]/10 text-[#378ADD] text-xs font-semibold px-2.5 py-0.5 rounded-full">
                      {item.period}
                    </div>
                  )}
                </div>

                <div className="space-y-3 text-sm text-gray-600">
                  {item.gpa && (
                    <div className="flex justify-between border-b border-gray-50 pb-2">
                      <span className="font-medium text-gray-500">GPA</span>
                      <span className="font-semibold text-[#0D1B2A]">{item.gpa}</span>
                    </div>
                  )}
                  {item.status && item.status.includes('Credits') && (
                    <div className="flex justify-between border-b border-gray-50 pb-2">
                      <span className="font-medium text-gray-500">Credits</span>
                      <span className="text-[#0D1B2A]">{item.status.split(' · ')[1] || item.status}</span>
                    </div>
                  )}
                  {item.grade && (
                    <div className="flex justify-between border-b border-gray-50 pb-2">
                      <span className="font-medium text-gray-500">Grade</span>
                      <span className="font-semibold text-[#0D1B2A]">{item.grade}</span>
                    </div>
                  )}
                  {item.aggregate && (
                    <div className="flex justify-between border-b border-gray-50 pb-2">
                      <span className="font-medium text-gray-500">Aggregate</span>
                      <span className="font-semibold text-[#0D1B2A]">{item.aggregate}</span>
                    </div>
                  )}
                  {item.leadership && (
                    <div className="pt-2">
                      <span className="font-medium text-gray-500 block mb-1">Leadership</span>
                      <ul className="list-disc list-inside text-xs space-y-1 text-gray-600">
                        {item.leadership.map((role: string, idx: number) => (
                          <li key={idx}>{role}</li>
                        ))}
                      </ul>
                    </div>
                  )}
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}

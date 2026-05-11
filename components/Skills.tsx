'use client';
import { useState, useEffect, useRef } from 'react';
import data from '../data/data.json';

export default function Skills() {
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
      { threshold: 0.1 }
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
            Expertise
          </h2>
          <h3 className="text-3xl md:text-4xl font-bold text-[#0D1B2A]">
            Skills & Proficiencies
          </h3>
          <p className="text-gray-500 mt-2 text-lg">
            A breakdown of my technical stack and proficiency levels.
          </p>
        </div>

        {/* Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-12">
          {data.skills.map((group, groupIndex) => (
            <div key={groupIndex} className="space-y-6">
              <h4 className="text-xl font-bold text-[#0D1B2A] border-b border-gray-100 pb-2">
                {group.group}
              </h4>
              
              <div className="space-y-4">
                {group.items.map((skill, skillIndex) => (
                  <div key={skillIndex} className="space-y-1">
                    <div className="flex justify-between text-sm">
                      <span className="font-medium text-gray-700">{skill.name}</span>
                      <span className="text-gray-400">{skill.level}%</span>
                    </div>
                    
                    {/* Progress Bar Background */}
                    <div className="h-2 bg-gray-100 rounded-full overflow-hidden">
                      {/* Progress Bar Fill */}
                      <div
                        className="h-full bg-[#378ADD] rounded-full progress-bar"
                        style={{
                          width: isVisible ? `${skill.level}%` : '0%',
                        }}
                      />
                    </div>
                  </div>
                ))}
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}

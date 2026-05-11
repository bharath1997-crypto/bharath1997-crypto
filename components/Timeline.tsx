'use client';
import { useState, useEffect, useRef } from 'react';
import data from '../data/data.json';

export default function Timeline() {
  const [visibleItems, setVisibleItems] = useState<boolean[]>([]);
  const itemsRef = useRef<(HTMLDivElement | null)[]>([]);

  useEffect(() => {
    setVisibleItems(new Array(data.experience.length).fill(false));

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
      { threshold: 0.2 }
    );

    itemsRef.current.forEach((item) => {
      if (item) observer.observe(item);
    });

    return () => observer.disconnect();
  }, []);

  // Helper to extract potential tools from text to avoid hardcoding
  // and still fulfill the "tool tags" spec where data allows.
  const extractTools = (highlights: string[]) => {
    const tools: string[] = [];
    const keywords = ["Zoho CRM", "Digital Solutions", "Asset Tracking"]; // Inferred from text
    
    highlights.forEach(h => {
      keywords.forEach(k => {
        if (h.includes(k) && !tools.includes(k)) {
          tools.push(k);
        }
      });
    });
    return tools;
  };

  return (
    <div className="bg-gray-50 py-24">
      <div className="max-w-4xl mx-auto px-6">
        {/* Section Header */}
        <div className="mb-12 text-center">
          <h2 className="text-sm uppercase tracking-wider text-[#378ADD] font-semibold mb-2">
            History
          </h2>
          <h3 className="text-3xl md:text-4xl font-bold text-[#0D1B2A]">
            Experience
          </h3>
        </div>

        {/* Timeline */}
        <div className="relative border-l-2 border-gray-200 ml-4 md:ml-auto">
          {data.experience.map((item, index) => {
            const isVisible = visibleItems[index];
            const tools = extractTools(item.highlights);

            return (
              <div
                key={index}
                ref={(el) => { itemsRef.current[index] = el; }}
                data-index={index}
                className={`
                  mb-12 ml-6 relative
                  ${isVisible ? 'fade-visible' : 'fade-hidden'}
                `}
              >
                {/* Timeline Dot */}
                <div className="absolute -left-[31px] top-1.5 w-4 h-4 bg-[#378ADD] rounded-full border-4 border-white"></div>

                {/* Content Card */}
                <div className="bg-white p-6 rounded-lg border border-gray-100 shadow-sm hover:shadow-md transition-shadow duration-300">
                  <span className="text-xs font-medium text-gray-400">
                    {item.period}
                  </span>
                  
                  <h4 className="text-xl font-bold text-[#0D1B2A] mt-1">
                    {item.role}
                  </h4>
                  
                  <h5 className="text-sm font-medium text-[#378ADD] mb-4">
                    {item.company}
                  </h5>

                  {/* Highlights */}
                  <ul className="space-y-2 text-sm text-gray-600 mb-4">
                    {item.highlights.map((highlight, idx) => (
                      <li key={idx} className="flex gap-2">
                        <span className="text-[#378ADD]">•</span>
                        <span>{highlight}</span>
                      </li>
                    ))}
                  </ul>

                  {/* Tool Tags */}
                  {tools.length > 0 && (
                    <div className="flex flex-wrap gap-2">
                      {tools.map((tool) => (
                        <span
                          key={tool}
                          className="text-xs text-white px-2.5 py-0.5 rounded-full font-medium"
                          style={{ backgroundColor: '#378ADD' }}
                        >
                          {tool}
                        </span>
                      ))}
                    </div>
                  )}
                </div>
              </div>
            );
          })}
        </div>
      </div>
    </div>
  );
}

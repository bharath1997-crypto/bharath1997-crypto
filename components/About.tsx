'use client';
import { useState } from 'react';
import data from '../data/data.json';
import DiscussionModal from './DiscussionModal';

export default function About() {
  const [selectedTopic, setSelectedTopic] = useState<any>(null);

  const icons: { [key: string]: JSX.Element } = {
    "building-office": (
      <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 21V5a2 2 0 00-2-2H7a2 2 0 00-2 2v16m14 0h2m-2 0h-5m-9 0H3m2 0h5M9 7h1m-1 4h1m4-4h1m-1 4h1m-5 10v-5a1 1 0 011-1h2a1 1 0 011 1v5m-4 0h4" />
      </svg>
    ),
    "cpu-chip": (
      <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 3v2m6-2v2M9 19v2m6-2v2M5 9H3m2 6H3m18-6h-2m2 6h-2M7 5h10a2 2 0 012 2v10a2 2 0 01-2 2H7a2 2 0 01-2-2V7a2 2 0 012-2z" />
      </svg>
    ),
    "sparkles": (
      <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 3v4M3 5h4M6 17v4M4 19h4m0-14l.01.01M21 7l-3.5 3.5M17 12l.01.01M21 21l-3.5-3.5M17 16l.01.01" />
      </svg>
    ),
    "briefcase": (
      <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M21 13a2 2 0 01-2 2H5a2 2 0 01-2-2V5a2 2 0 012-2h14a2 2 0 012 2v8z" />
        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M16 5V3a2 2 0 00-2-2h-4a2 2 0 00-2 2v2" />
      </svg>
    ),
    "globe-alt": (
      <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M21 12a9 9 0 01-9 9m9-9a9 9 0 00-9-9m9 9H3m9 9a9 9 0 01-9-9m9 9c1.657 0 3-4.03 3-9s-1.343-9-3-9m0 18c-1.657 0-3-4.03-3-9s1.343-9 3-9m-9 9a9 9 0 019-9" />
      </svg>
    ),
    "rocket-launch": (
      <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15.232 5.232l3.536 3.536m-2.036-5.036a2.5 2.5 0 113.536 3.536L6.5 21.036H3v-3.572L16.732 3.732z" />
      </svg>
    )
  };

  return (
    <div id="about" className="bg-white py-24 border-t border-gray-100">
      <div className="max-w-6xl mx-auto px-6">
        
        {/* SUB-SECTION A: Who I Am */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-12 mb-24">
          <div className="space-y-6">
            <h2 className="text-sm uppercase tracking-wider text-[#378ADD] font-semibold">
              About Me
            </h2>
            <h3 className="text-3xl md:text-4xl font-bold text-[#0D1B2A]">
              Built for enterprise. Wired for impact.
            </h3>
            <p className="text-gray-600 leading-relaxed">
              MS CS DePaul 2025. 4+ years deploying enterprise solutions across ISRO, HAL, Hilti. Bridging the gap between engineering depth and business outcomes. Building Group Travel OS — a production FastAPI platform — while targeting SE and TAM roles in the US.
            </p>
            <div className="flex flex-wrap gap-2">
              <span className="bg-gray-50 border border-gray-100 text-xs font-medium px-3 py-1.5 rounded-full text-gray-600">Enterprise Scale</span>
              <span className="bg-gray-50 border border-gray-100 text-xs font-medium px-3 py-1.5 rounded-full text-gray-600">Technical Depth</span>
              <span className="bg-gray-50 border border-gray-100 text-xs font-medium px-3 py-1.5 rounded-full text-gray-600">Founder Mindset</span>
            </div>
          </div>

          <div className="bg-[#0a1628] text-white rounded-xl p-6 border border-white/5">
            <h4 className="font-semibold text-sm text-gray-400 mb-4 uppercase tracking-wider">Topics I Think About</h4>
            <ul className="space-y-3 text-sm text-gray-300">
              <li className="flex items-center gap-2">
                <span className="text-[#378ADD]">✦</span> FastAPI architecture patterns
              </li>
              <li className="flex items-center gap-2">
                <span className="text-[#378ADD]">✦</span> Enterprise implementation playbooks
              </li>
              <li className="flex items-center gap-2">
                <span className="text-[#378ADD]">✦</span> AI tooling for SE workflows
              </li>
              <li className="flex items-center gap-2">
                <span className="text-[#378ADD]">✦</span> Building SaaS from scratch
              </li>
              <li className="flex items-center gap-2">
                <span className="text-[#378ADD]">✦</span> Solutions Engineering as a career
              </li>
              <li className="flex items-center gap-2">
                <span className="text-[#378ADD]">✦</span> From India to US tech market
              </li>
            </ul>
          </div>
        </div>

        {/* SUB-SECTION B: Past Discussions & Subjects Covered */}
        <div>
          <div className="mb-12">
            <h3 className="text-3xl md:text-4xl font-bold text-[#0D1B2A]">
              Discussions & Expertise Areas
            </h3>
            <p className="text-gray-500 mt-2">
              Topics I've worked through, built on, and can speak to
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            {data.discussions.map((topic: any) => (
              <div
                key={topic.id}
                className="bg-white border border-gray-200 rounded-xl p-5 hover:border-[#378ADD] hover:shadow-sm transition-all duration-200 cursor-pointer flex flex-col justify-between group"
                onClick={() => setSelectedTopic(topic)}
              >
                <div>
                  <div className="text-[#378ADD] mb-4 group-hover:scale-110 transition-transform duration-200 origin-left">
                    {icons[topic.icon] || icons["briefcase"]}
                  </div>
                  <h4 className="text-lg font-bold text-[#0D1B2A] mb-2">
                    {topic.title}
                  </h4>
                  <p className="text-sm text-gray-500 line-clamp-2">
                    {topic.description}
                  </p>
                </div>
                
                <div className="mt-4 pt-4 border-t border-gray-50 flex justify-between items-center">
                  <div className="flex flex-wrap gap-1 max-w-[70%]">
                    {topic.tags.slice(0, 2).map((tag: string) => (
                      <span key={tag} className="text-[10px] bg-gray-50 text-gray-500 px-1.5 py-0.5 rounded">
                        {tag}
                      </span>
                    ))}
                    {topic.tags.length > 2 && (
                      <span className="text-[10px] bg-gray-50 text-gray-500 px-1.5 py-0.5 rounded">
                        +{topic.tags.length - 2}
                      </span>
                    )}
                  </div>
                  <div className="bg-[#378ADD]/10 text-[#378ADD] text-xs font-semibold px-2 py-0.5 rounded-full">
                    {topic.bullets.length} topics
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>

      </div>

      {/* Modal */}
      {selectedTopic && (
        <DiscussionModal
          topic={selectedTopic}
          onClose={() => setSelectedTopic(null)}
        />
      )}
    </div>
  );
}

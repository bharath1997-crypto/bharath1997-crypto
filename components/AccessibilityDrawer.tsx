'use client';
import { useState } from 'react';
import data from '../data/data.json';

export default function AccessibilityDrawer() {
  const [isOpen, setIsOpen] = useState(false);
  const [openAccordion, setOpenAccordion] = useState<number | null>(null);

  const toggleAccordion = (index: number) => {
    setOpenAccordion(openAccordion === index ? null : index);
  };

  return (
    <>
      {/* Floating Button */}
      <button
        onClick={() => setIsOpen(true)}
        className="fixed bottom-6 right-6 w-[52px] h-[52px] bg-[#378ADD] text-white rounded-full flex items-center justify-center shadow-lg hover:bg-[#185FA5] transition-colors duration-200 z-[100]"
        aria-label="Quick Q&A"
      >
        <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M8.228 9c.549-1.165 2.03-2 3.772-2 2.21 0 4 1.343 4 3 0 1.4-1.278 2.575-3.006 2.907-.542.104-.994.54-.994 1.093m0 3h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
        </svg>
      </button>

      {/* Side Drawer Overlay */}
      <div
        className={`fixed inset-0 bg-black/30 z-[110] transition-opacity duration-300 ${isOpen ? 'opacity-100 pointer-events-auto' : 'opacity-0 pointer-events-none'}`}
        onClick={() => setIsOpen(false)}
      />

      {/* Side Drawer */}
      <div
        className={`fixed top-0 right-0 h-full w-[380px] max-w-full bg-white shadow-2xl z-[120] transform transition-transform duration-300 ease-in-out flex flex-col ${isOpen ? 'translate-x-0' : 'translate-x-full'}`}
      >
        {/* Header */}
        <div className="px-6 py-4 border-b border-gray-100 flex justify-between items-center bg-gray-50">
          <h3 className="text-lg font-bold text-[#0D1B2A]">Quick Q&A</h3>
          <button
            onClick={() => setIsOpen(false)}
            className="text-gray-400 hover:text-gray-600 transition-colors duration-200"
            aria-label="Close"
          >
            <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
            </svg>
          </button>
        </div>

        {/* Content - Accordions */}
        <div className="flex-1 overflow-y-auto px-6 py-4">
          <div className="divide-y divide-gray-100">
            {data.qa.map((item, index) => (
              <div key={index} className="py-3">
                <button
                  className="w-full flex justify-between items-center text-left gap-2 group"
                  onClick={() => toggleAccordion(index)}
                >
                  <span className={`font-semibold text-sm transition-colors duration-200 ${openAccordion === index ? 'text-[#378ADD]' : 'text-[#0D1B2A] group-hover:text-[#378ADD]'}`}>
                    {item.q}
                  </span>
                  <svg
                    className={`w-4 h-4 text-gray-400 transform transition-transform duration-200 ${openAccordion === index ? 'rotate-90 text-[#378ADD]' : ''}`}
                    fill="none"
                    stroke="currentColor"
                    viewBox="0 0 24 24"
                  >
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
                  </svg>
                </button>
                
                <div
                  className={`overflow-hidden transition-all duration-300 ease-in-out ${openAccordion === index ? 'max-h-[200px] opacity-100 mt-2' : 'max-h-0 opacity-0'}`}
                >
                  <div className="text-sm text-gray-600 leading-relaxed whitespace-pre-line">
                    {item.a}
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>
    </>
  );
}

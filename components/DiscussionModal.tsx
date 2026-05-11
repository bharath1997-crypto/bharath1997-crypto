'use client';
import { useEffect } from 'react';

interface Bullet {
  key: string;
  text: string;
}

interface Topic {
  id: string;
  title: string;
  icon: string;
  bullets: Bullet[];
}

interface DiscussionModalProps {
  topic: Topic;
  onClose: () => void;
}

export default function DiscussionModal({ topic, onClose }: DiscussionModalProps) {
  // Close on escape key
  useEffect(() => {
    const handleEscape = (e: KeyboardEvent) => {
      if (e.key === 'Escape') onClose();
    };
    window.addEventListener('keydown', handleEscape);
    return () => window.removeEventListener('keydown', handleEscape);
  }, [onClose]);

  // Disable scroll on body when modal is open
  useEffect(() => {
    document.body.style.overflow = 'hidden';
    return () => {
      document.body.style.overflow = 'unset';
    };
  }, []);

  return (
    <div 
      className="fixed inset-0 bg-black/50 z-50 flex items-center justify-center p-4 backdrop-blur-sm"
      onClick={onClose}
    >
      <div 
        className="bg-white max-w-2xl w-full rounded-2xl p-8 relative max-h-[85vh] overflow-y-auto shadow-2xl scale-in"
        onClick={(e) => e.stopPropagation()}
      >
        {/* Close Button */}
        <button
          onClick={onClose}
          className="absolute top-6 right-6 text-gray-400 hover:text-gray-600 transition-colors duration-200"
          aria-label="Close"
        >
          <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
          </svg>
        </button>

        {/* Header */}
        <div className="flex items-center gap-3 mb-6">
          <div className="text-[#378ADD]">
            {/* Fallback icon for modal header */}
            <svg className="w-8 h-8" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13 16h-1v-4h-1m1-4h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
            </svg>
          </div>
          <h3 className="text-2xl font-bold text-[#0D1B2A]">
            {topic.title}
          </h3>
        </div>

        {/* Content */}
        <div className="space-y-4">
          <p className="text-sm text-gray-500 font-medium uppercase tracking-wider mb-2">Deep-Dive Topics</p>
          <ul className="space-y-4 text-sm text-gray-600">
            {topic.bullets.map((bullet, index) => (
              <li key={index} className="flex gap-3 items-start border-b border-gray-50 pb-3 last:border-0">
                <span className="text-[#378ADD] mt-1 font-bold">•</span>
                <div>
                  <span className="font-bold text-[#0D1B2A]">{bullet.key}</span> — {bullet.text}
                </div>
              </li>
            ))}
          </ul>
        </div>
      </div>
    </div>
  );
}

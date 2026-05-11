'use client';
import { useState, useEffect, useRef } from 'react';
import data from '../data/data.json';

export default function Stats() {
  const [isVisible, setIsVisible] = useState(false);
  const [progress, setProgress] = useState(0);
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

  useEffect(() => {
    if (!isVisible) return;

    const duration = 1500; // 1.5 seconds
    const interval = 16; // ~60fps
    const steps = duration / interval;
    let currentStep = 0;

    const timer = setInterval(() => {
      currentStep += 1;
      const nextProgress = Math.min(currentStep / steps, 1);
      setProgress(nextProgress);

      if (nextProgress === 1) {
        clearInterval(timer);
      }
    }, interval);

    return () => clearInterval(timer);
  }, [isVisible]);

  const { stats } = data;

  const statsConfig = [
    {
      label: "Graduate Credits",
      value: stats.graduate_credits,
      parse: (v: string | number) => typeof v === 'number' ? v : parseFloat(v),
      format: (v: number) => Math.floor(v).toString()
    },
    {
      label: "GPA",
      value: stats.gpa,
      parse: (v: string | number) => typeof v === 'number' ? v : parseFloat(v),
      format: (v: number) => v.toFixed(1)
    },
    {
      label: "Enterprise Exp",
      value: stats.experience_years,
      parse: (v: string | number) => typeof v === 'number' ? v : parseFloat(v.replace('+', '')),
      format: (v: number) => Math.floor(v).toString() + '+'
    },
    {
      label: "Enterprise Users",
      value: stats.enterprise_users,
      parse: (v: string | number) => typeof v === 'number' ? v : parseFloat(v.replace(/,/g, '').replace('+', '')),
      format: (v: number) => Math.floor(v).toLocaleString() + '+'
    },
    {
      label: "B2B Accounts",
      value: stats.b2b_accounts,
      parse: (v: string | number) => typeof v === 'number' ? v : parseFloat(v),
      format: (v: number) => Math.floor(v).toString()
    }
  ];

  return (
    <div ref={ref} className="bg-[#1a2f45] text-white py-8">
      <div className="max-w-6xl mx-auto px-6">
        <div className="grid grid-cols-2 md:grid-cols-5 gap-6 text-center">
          {statsConfig.map((item, index) => {
            const targetNum = item.parse(item.value);
            const currentVal = progress === 1 
              ? item.value.toString() 
              : item.format(targetNum * progress);

            return (
              <div key={index} className="space-y-1">
                <div className="text-3xl md:text-4xl font-bold">
                  {isVisible ? currentVal : "0"}
                </div>
                <div className="text-xs uppercase tracking-wider text-blue-100 font-medium">
                  {item.label}
                </div>
              </div>
            );
          })}
        </div>
      </div>
    </div>
  );
}

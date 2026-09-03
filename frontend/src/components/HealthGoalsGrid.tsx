'use client';

import React from 'react';
import { 
  Sparkles, 
  Activity, 
  Flame, 
  Scale, 
  ShieldCheck, 
  HeartPulse 
} from 'lucide-react';
import { HEALTH_GOALS } from '@/lib/products-data';

interface HealthGoalsGridProps {
  selectedGoal: string | null;
  onSelectGoal: (goalId: string | null) => void;
}

export default function HealthGoalsGrid({ selectedGoal, onSelectGoal }: HealthGoalsGridProps) {
  const getIcon = (iconName: string) => {
    switch (iconName) {
      case 'Sparkles': return <Sparkles className="w-6 h-6" />;
      case 'Activity': return <Activity className="w-6 h-6" />;
      case 'Flame': return <Flame className="w-6 h-6" />;
      case 'Scale': return <Scale className="w-6 h-6" />;
      case 'ShieldCheck': return <ShieldCheck className="w-6 h-6" />;
      default: return <HeartPulse className="w-6 h-6" />;
    }
  };

  return (
    <section className="py-12 bg-white">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        
        <div className="text-center max-w-2xl mx-auto mb-8">
          <span className="text-xs font-bold text-[#5BB318] uppercase tracking-wider">
            Targeted Formulations
          </span>
          <h2 className="text-2xl sm:text-3xl font-extrabold text-slate-900 mt-1">
            Shop by Health Goal
          </h2>
          <p className="text-xs sm:text-sm text-slate-500 mt-2">
            Address your specific nutritional needs with certified botanical extracts crafted for optimal bio-absorption.
          </p>
        </div>

        <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-6 gap-4">
          {/* All Filter Option */}
          <button
            onClick={() => onSelectGoal(null)}
            className={`p-4 rounded-2xl border text-center transition-all duration-300 flex flex-col items-center justify-center gap-3 group ${
              selectedGoal === null
                ? 'bg-[#1B4D3E] text-white border-[#1B4D3E] shadow-md scale-102'
                : 'bg-[#F4F9F4] text-slate-700 border-slate-100 hover:border-emerald-200 hover:bg-emerald-50/50 hover:shadow-xs'
            }`}
          >
            <div className={`w-12 h-12 rounded-full flex items-center justify-center transition-colors ${
              selectedGoal === null ? 'bg-white/20 text-white' : 'bg-white text-[#1B4D3E] shadow-xs group-hover:bg-[#1B4D3E] group-hover:text-white'
            }`}>
              <HeartPulse className="w-6 h-6" />
            </div>
            <div>
              <div className="text-xs font-bold">All Products</div>
              <div className={`text-[10px] ${selectedGoal === null ? 'text-emerald-200' : 'text-slate-400'}`}>
                Full Catalog
              </div>
            </div>
          </button>

          {HEALTH_GOALS.map((goal) => {
            const isSelected = selectedGoal === goal.title;
            return (
              <button
                key={goal.id}
                onClick={() => onSelectGoal(isSelected ? null : goal.title)}
                className={`p-4 rounded-2xl border text-center transition-all duration-300 flex flex-col items-center justify-center gap-3 group ${
                  isSelected
                    ? 'bg-[#1B4D3E] text-white border-[#1B4D3E] shadow-md scale-102'
                    : 'bg-[#F4F9F4] text-slate-700 border-slate-100 hover:border-emerald-200 hover:bg-emerald-50/50 hover:shadow-xs'
                }`}
              >
                <div className={`w-12 h-12 rounded-full flex items-center justify-center transition-colors ${
                  isSelected 
                    ? 'bg-white/20 text-white' 
                    : 'bg-white text-[#1B4D3E] shadow-xs group-hover:bg-[#1B4D3E] group-hover:text-white'
                }`}>
                  {getIcon(goal.icon)}
                </div>
                <div>
                  <div className="text-xs font-bold truncate max-w-[120px]">{goal.title}</div>
                  <div className={`text-[10px] truncate max-w-[120px] ${isSelected ? 'text-emerald-200' : 'text-slate-400'}`}>
                    {goal.desc}
                  </div>
                </div>
              </button>
            );
          })}
        </div>

      </div>
    </section>
  );
}

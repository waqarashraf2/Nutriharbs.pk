'use client';

import React from 'react';
import { Check, ShieldCheck, Sparkles, BookOpen, AlertCircle, Award } from 'lucide-react';

interface RichArticleRendererProps {
  content: string;
}

export default function RichArticleRenderer({ content }: RichArticleRendererProps) {
  if (!content) return null;

  // Simple, fast, and secure Markdown-like formatter for 1,500 - 2,000+ word botanical articles
  const paragraphs = content.trim().split(/\n\n+/);

  return (
    <div className="space-y-5 text-slate-700 leading-relaxed text-xs sm:text-sm font-normal">
      {paragraphs.map((para, idx) => {
        const trimmed = para.trim();

        // Heading 1 (# ...)
        if (trimmed.startsWith('# ')) {
          return (
            <h2 key={idx} className="text-xl sm:text-2xl font-black text-slate-900 pt-4 pb-2 border-b border-emerald-100 flex items-center gap-2">
              <Sparkles className="w-5 h-5 text-[#5BB318] shrink-0" />
              <span>{trimmed.replace(/^#\s+/, '')}</span>
            </h2>
          );
        }

        // Heading 2 (## ...)
        if (trimmed.startsWith('## ')) {
          return (
            <h3 key={idx} className="text-lg sm:text-xl font-extrabold text-[#1B4D3E] pt-3 pb-1">
              {trimmed.replace(/^##\s+/, '')}
            </h3>
          );
        }

        // Heading 3 (### ...)
        if (trimmed.startsWith('### ')) {
          return (
            <h4 key={idx} className="text-sm sm:text-base font-bold text-slate-900 pt-2 text-[#10375C] flex items-center gap-1.5">
              <span className="w-1.5 h-1.5 rounded-full bg-[#5BB318]" />
              <span>{trimmed.replace(/^###\s+/, '')}</span>
            </h4>
          );
        }

        // Callout Box (> ...)
        if (trimmed.startsWith('> ')) {
          return (
            <div key={idx} className="bg-emerald-50/80 border-l-4 border-[#1B4D3E] p-4 rounded-r-2xl my-3 text-xs sm:text-sm text-emerald-950 italic flex items-start gap-2.5">
              <ShieldCheck className="w-5 h-5 text-[#5BB318] shrink-0 mt-0.5" />
              <div>{trimmed.replace(/^>\s*/gm, '')}</div>
            </div>
          );
        }

        // Bullet List (- ... or * ...)
        if (trimmed.startsWith('- ') || trimmed.startsWith('* ')) {
          const items = trimmed.split(/\n/).map((i) => i.replace(/^[-*]\s+/, ''));
          return (
            <ul key={idx} className="space-y-2 my-3 pl-1">
              {items.map((item, itemIdx) => {
                // Parse bold **text**
                const parts = item.split(/\*\*(.*?)\*\*/g);
                return (
                  <li key={itemIdx} className="flex items-start gap-2.5 text-xs sm:text-sm text-slate-700">
                    <div className="w-4 h-4 rounded-full bg-emerald-100 text-[#5BB318] flex items-center justify-center shrink-0 mt-0.5">
                      <Check className="w-3 h-3 stroke-[3]" />
                    </div>
                    <span>
                      {parts.map((part, pIdx) =>
                        pIdx % 2 === 1 ? (
                          <strong key={pIdx} className="font-bold text-slate-900 text-[#1B4D3E]">
                            {part}
                          </strong>
                        ) : (
                          part
                        )
                      )}
                    </span>
                  </li>
                );
              })}
            </ul>
          );
        }

        // Numbered List (1. ...)
        if (/^\d+\.\s+/.test(trimmed)) {
          const items = trimmed.split(/\n/).map((i) => i.replace(/^\d+\.\s+/, ''));
          return (
            <ol key={idx} className="space-y-2.5 my-3 list-decimal list-inside text-xs sm:text-sm">
              {items.map((item, itemIdx) => {
                const parts = item.split(/\*\*(.*?)\*\*/g);
                return (
                  <li key={itemIdx} className="text-slate-700 pl-1">
                    {parts.map((part, pIdx) =>
                      pIdx % 2 === 1 ? (
                        <strong key={pIdx} className="font-bold text-slate-900 text-[#1B4D3E]">
                          {part}
                        </strong>
                      ) : (
                        part
                      )
                    )}
                  </li>
                );
              })}
            </ol>
          );
        }

        // Standard Paragraph with bold **bold** support
        const parts = trimmed.split(/\*\*(.*?)\*\*/g);
        return (
          <p key={idx} className="text-slate-700 leading-relaxed text-xs sm:text-sm">
            {parts.map((part, pIdx) =>
              pIdx % 2 === 1 ? (
                <strong key={pIdx} className="font-bold text-slate-900">
                  {part}
                </strong>
              ) : (
                part
              )
            )}
          </p>
        );
      })}
    </div>
  );
}

'use client';

import React, { useState, useEffect } from 'react';
import Image from 'next/image';
import { 
  Share2, 
  Copy, 
  Check, 
  X, 
  Send,
  ExternalLink,
  ShieldCheck
} from 'lucide-react';
import { Product } from '@/lib/types';

interface ShareProductModalProps {
  product: Product;
  isOpen: boolean;
  onClose: () => void;
}

export default function ShareProductModal({ product, isOpen, onClose }: ShareProductModalProps) {
  const [copied, setCopied] = useState(false);
  const [shareUrl, setShareUrl] = useState('');

  useEffect(() => {
    if (typeof window !== 'undefined') {
      setShareUrl(`${window.location.origin}/product/${product.slug}`);
    }
  }, [product.slug]);

  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if (e.key === 'Escape') onClose();
    };
    if (isOpen) {
      document.addEventListener('keydown', handleKeyDown);
      document.body.style.overflow = 'hidden';
    }
    return () => {
      document.removeEventListener('keydown', handleKeyDown);
      document.body.style.overflow = 'unset';
    };
  }, [isOpen, onClose]);

  if (!isOpen) return null;

  const handleCopyLink = async () => {
    try {
      await navigator.clipboard.writeText(shareUrl);
      setCopied(true);
      setTimeout(() => setCopied(false), 2500);
    } catch {
      setCopied(true);
      setTimeout(() => setCopied(false), 2500);
    }
  };

  const handleNativeShare = async () => {
    if (typeof navigator !== 'undefined' && navigator.share) {
      try {
        await navigator.share({
          title: `${product.title} | Nutriherbs Pakistan`,
          text: `🌿 Check out ${product.title} (${product.form}) - 100% pure botanical herbal supplement on Nutriherbs Pakistan.`,
          url: shareUrl,
        });
      } catch {
        // Ignored
      }
    }
  };

  const shareText = `🌿 *${product.title}*\n${product.subtitle}\n💰 *Price:* Rs. ${product.price.toLocaleString()}\n🛡️ *DRAP Enlistment:* ${product.drapRegNo}\n\n👉 *View & Order with Nationwide Delivery:* ${shareUrl}`;

  const whatsappUrl = `https://api.whatsapp.com/send?text=${encodeURIComponent(shareText)}`;
  const facebookUrl = `https://www.facebook.com/sharer/sharer.php?u=${encodeURIComponent(shareUrl)}`;
  const twitterUrl = `https://twitter.com/intent/tweet?text=${encodeURIComponent(`Check out ${product.title} on Nutriherbs Pakistan!`)}&url=${encodeURIComponent(shareUrl)}`;
  const telegramUrl = `https://t.me/share/url?url=${encodeURIComponent(shareUrl)}&text=${encodeURIComponent(`🌿 ${product.title} - ${product.subtitle}`)}`;

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-slate-900/60 backdrop-blur-sm animate-fadeIn">
      {/* Click outside backdrop */}
      <div className="absolute inset-0" onClick={onClose} />

      <div className="relative bg-white rounded-3xl max-w-md w-full shadow-2xl border border-slate-100 overflow-hidden z-10 animate-scaleUp">
        
        {/* Header */}
        <div className="flex items-center justify-between p-5 border-b border-slate-100 bg-[#F4F9F4]/50">
          <div className="flex items-center gap-2.5">
            <div className="w-8 h-8 rounded-full bg-[#1B4D3E]/10 flex items-center justify-center text-[#1B4D3E]">
              <Share2 className="w-4 h-4" />
            </div>
            <div>
              <h3 className="font-extrabold text-slate-900 text-base leading-none">Share Product</h3>
              <p className="text-[11px] text-slate-500 mt-0.5">Share with image &amp; verified details</p>
            </div>
          </div>

          <button
            onClick={onClose}
            className="p-1.5 rounded-full text-slate-400 hover:text-slate-700 hover:bg-slate-100 transition-colors"
            aria-label="Close modal"
          >
            <X className="w-5 h-5" />
          </button>
        </div>

        {/* Product Visual Card Preview */}
        <div className="p-5 space-y-5">
          <div className="bg-[#F8FAF9] rounded-2xl p-3 border border-emerald-100/70 flex items-center gap-3.5 shadow-xs">
            <div className="relative w-16 h-16 bg-white rounded-xl p-1 shrink-0 border border-slate-100 flex items-center justify-center overflow-hidden">
              <Image
                src={product.image}
                alt={product.title}
                fill
                className="object-contain"
              />
            </div>
            <div className="flex-1 min-w-0">
              <div className="flex items-center gap-1.5 mb-0.5">
                <span className="text-[10px] font-bold text-[#1B4D3E] bg-emerald-50 px-1.5 py-0.2 rounded border border-emerald-100">
                  {product.healthGoal}
                </span>
                <span className="text-[9px] text-slate-500 font-medium inline-flex items-center gap-0.5">
                  <ShieldCheck className="w-2.5 h-2.5 text-[#5BB318]" /> DRAP Certified
                </span>
              </div>
              <h4 className="font-bold text-xs text-slate-900 truncate">
                {product.title}
              </h4>
              <p className="text-[11px] font-extrabold text-[#1B4D3E] mt-0.5">
                Rs. {product.price.toLocaleString()}
                {product.originalPrice && (
                  <span className="text-[10px] text-slate-400 font-normal line-through ml-1.5">
                    Rs. {product.originalPrice.toLocaleString()}
                  </span>
                )}
              </p>
            </div>
          </div>

          {/* Social Share Grid */}
          <div>
            <label className="text-[11px] font-bold text-slate-500 uppercase tracking-wider block mb-2.5">
              Share to Social Platforms:
            </label>
            <div className="grid grid-cols-4 gap-2.5">
              
              {/* WhatsApp */}
              <a
                href={whatsappUrl}
                target="_blank"
                rel="noopener noreferrer"
                className="flex flex-col items-center justify-center gap-1.5 p-3 rounded-2xl bg-[#25D366]/10 hover:bg-[#25D366]/20 border border-[#25D366]/20 transition-all hover:scale-105 group"
              >
                <div className="w-9 h-9 rounded-full bg-[#25D366] text-white flex items-center justify-center shadow-xs">
                  <svg className="w-5 h-5 fill-current" viewBox="0 0 24 24">
                    <path d="M12.04 2c-5.46 0-9.91 4.45-9.91 9.91 0 1.75.46 3.45 1.32 4.95L2.05 22l5.25-1.38c1.45.79 3.08 1.21 4.74 1.21 5.46 0 9.91-4.45 9.91-9.91 0-2.65-1.03-5.14-2.9-7.01A9.816 9.816 0 0 0 12.04 2zm0 18.15c-1.49 0-2.95-.4-4.22-1.16l-.3-.18-3.13.82.84-3.05-.2-.31a8.19 8.19 0 0 1-1.26-4.38c0-4.54 3.7-8.24 8.24-8.24 2.2 0 4.27.86 5.82 2.42a8.18 8.18 0 0 1 2.41 5.83c.01 4.54-3.68 8.25-8.2 8.25zm4.52-6.17c-.25-.12-1.47-.72-1.69-.81-.23-.08-.39-.12-.56.12-.17.25-.64.81-.79.97-.14.17-.29.19-.54.06-.25-.12-1.05-.39-1.99-1.23-.74-.66-1.23-1.47-1.38-1.72-.14-.25-.02-.38.11-.51.11-.11.25-.29.37-.43.12-.15.17-.25.25-.42.08-.17.04-.31-.02-.44-.06-.12-.56-1.34-.76-1.84-.2-.48-.41-.42-.56-.43h-.48c-.17 0-.44.06-.67.31-.23.25-.88.86-.88 2.1 0 1.24.9 2.44 1.03 2.61.12.17 1.77 2.71 4.3 3.8 2.52 1.09 2.52.73 2.98.69.46-.05 1.47-.6 1.68-1.18.21-.58.21-1.07.15-1.18-.07-.12-.23-.19-.48-.31z"/>
                  </svg>
                </div>
                <span className="text-[11px] font-bold text-slate-700">WhatsApp</span>
              </a>

              {/* Facebook */}
              <a
                href={facebookUrl}
                target="_blank"
                rel="noopener noreferrer"
                className="flex flex-col items-center justify-center gap-1.5 p-3 rounded-2xl bg-[#1877F2]/10 hover:bg-[#1877F2]/20 border border-[#1877F2]/20 transition-all hover:scale-105 group"
              >
                <div className="w-9 h-9 rounded-full bg-[#1877F2] text-white flex items-center justify-center shadow-xs">
                  <svg className="w-5 h-5 fill-current" viewBox="0 0 24 24">
                    <path d="M24 12.073c0-6.627-5.373-12-12-12s-12 5.373-12 12c0 5.99 4.388 10.954 10.125 11.854v-8.385H7.078v-3.47h3.047V9.43c0-3.007 1.792-4.669 4.533-4.669 1.312 0 2.686.235 2.686.235v2.953H15.83c-1.491 0-1.956.925-1.956 1.874v2.25h3.328l-.532 3.47h-2.796v8.385C19.612 23.027 24 18.062 24 12.073z"/>
                  </svg>
                </div>
                <span className="text-[11px] font-bold text-slate-700">Facebook</span>
              </a>

              {/* Twitter / X */}
              <a
                href={twitterUrl}
                target="_blank"
                rel="noopener noreferrer"
                className="flex flex-col items-center justify-center gap-1.5 p-3 rounded-2xl bg-slate-100 hover:bg-slate-200/80 border border-slate-200 transition-all hover:scale-105 group"
              >
                <div className="w-9 h-9 rounded-full bg-slate-900 text-white flex items-center justify-center shadow-xs">
                  <svg className="w-4 h-4 fill-current" viewBox="0 0 24 24">
                    <path d="M18.244 2.25h3.308l-7.227 8.26 8.502 11.24H16.17l-5.214-6.817L4.99 21.75H1.68l7.73-8.835L1.254 2.25H8.08l4.713 6.231zm-1.161 17.52h1.833L7.084 4.126H5.117z"/>
                  </svg>
                </div>
                <span className="text-[11px] font-bold text-slate-700">X (Twitter)</span>
              </a>

              {/* Telegram */}
              <a
                href={telegramUrl}
                target="_blank"
                rel="noopener noreferrer"
                className="flex flex-col items-center justify-center gap-1.5 p-3 rounded-2xl bg-[#0088CC]/10 hover:bg-[#0088CC]/20 border border-[#0088CC]/20 transition-all hover:scale-105 group"
              >
                <div className="w-9 h-9 rounded-full bg-[#0088CC] text-white flex items-center justify-center shadow-xs">
                  <Send className="w-4 h-4 text-white" />
                </div>
                <span className="text-[11px] font-bold text-slate-700">Telegram</span>
              </a>

            </div>
          </div>

          {/* Native Share button for Mobile */}
          {typeof navigator !== 'undefined' && 'share' in navigator && (
            <button
              onClick={handleNativeShare}
              className="w-full py-2.5 px-4 rounded-xl bg-slate-100 hover:bg-slate-200 text-slate-800 text-xs font-bold flex items-center justify-center gap-2 transition-colors"
            >
              <ExternalLink className="w-3.5 h-3.5 text-[#1B4D3E]" />
              <span>More Sharing Options (Instagram, SMS, Apps...)</span>
            </button>
          )}

          {/* Copy Direct Link Section */}
          <div>
            <label className="text-[11px] font-bold text-slate-500 uppercase tracking-wider block mb-1.5">
              Copy Direct Product Link:
            </label>
            <div className="flex items-center gap-2 bg-slate-50 p-1.5 pl-3 rounded-xl border border-slate-200">
              <input
                type="text"
                readOnly
                value={shareUrl}
                className="bg-transparent text-xs text-slate-600 outline-hidden flex-1 truncate font-mono select-all"
              />
              <button
                onClick={handleCopyLink}
                className={`px-3 py-2 rounded-lg text-xs font-bold flex items-center gap-1.5 transition-all shadow-xs shrink-0 ${
                  copied
                    ? 'bg-[#5BB318] text-white'
                    : 'bg-[#1B4D3E] hover:bg-[#13382D] text-white'
                }`}
              >
                {copied ? (
                  <>
                    <Check className="w-3.5 h-3.5" />
                    <span>Copied!</span>
                  </>
                ) : (
                  <>
                    <Copy className="w-3.5 h-3.5" />
                    <span>Copy</span>
                  </>
                )}
              </button>
            </div>
            {copied && (
              <p className="text-[11px] text-[#5BB318] font-bold mt-1 text-center animate-fadeIn">
                ✓ Product link with image preview copied to clipboard!
              </p>
            )}
          </div>

        </div>

      </div>
    </div>
  );
}

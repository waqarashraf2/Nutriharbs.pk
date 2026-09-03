import React from 'react';
import { 
  ShieldCheck, 
  FlaskConical, 
  Leaf, 
  Truck, 
  CheckCircle2, 
  Award,
  BadgePercent
} from 'lucide-react';

export default function PurityGuarantee() {
  const pillars = [
    {
      icon: <Leaf className="w-8 h-8 text-[#5BB318]" />,
      title: '100% Herbal Bioactives',
      desc: 'Sourced from organic Icelandic red algae, pure marine collagen peptides, and standardized botanical roots with zero synthetic additives.'
    },
    {
      icon: <Award className="w-8 h-8 text-[#5BB318]" />,
      title: 'DRAP & GMP Compliant',
      desc: 'Manufactured in certified cGMP pharmaceutical facilities fully enlisted with the Drug Regulatory Authority of Pakistan (DRAP).'
    },
    {
      icon: <FlaskConical className="w-8 h-8 text-[#5BB318]" />,
      title: 'Third-Party Lab Tested',
      desc: 'Every single batch undergoes rigorous analytical testing for heavy metal limits, microbial purity, and exact active bio-potency.'
    },
    {
      icon: <Truck className="w-8 h-8 text-[#5BB318]" />,
      title: 'Nationwide Express COD',
      desc: 'Seamless door-to-door Cash on Delivery across 100+ Pakistani cities via verified couriers (PostEx, Trax, Leopards) in 24-48 hours.'
    }
  ];

  return (
    <section className="py-16 bg-[#F4F9F4] border-y border-emerald-100/70">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        
        <div className="text-center max-w-3xl mx-auto mb-12">
          <div className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-emerald-100 text-[#1B4D3E] text-xs font-extrabold mb-3">
            <ShieldCheck className="w-4 h-4 text-[#5BB318]" />
            OUR UNCOMPROMISING STANDARD
          </div>
          <h2 className="text-3xl sm:text-4xl font-black text-slate-900 tracking-tight">
            The Nutriherbs Purity Guarantee
          </h2>
          <p className="text-sm sm:text-base text-slate-600 mt-2">
            Why thousands of Pakistani doctors, fitness athletes, and families trust Nutriherbs every single day for their health supplements.
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
          {pillars.map((item, index) => (
            <div 
              key={index}
              className="bg-white rounded-2xl p-6 shadow-xs border border-emerald-100/80 hover:shadow-lg transition-all hover:-translate-y-1 flex flex-col justify-between"
            >
              <div>
                <div className="w-14 h-14 rounded-2xl bg-[#F4F9F4] flex items-center justify-center mb-5 border border-emerald-100">
                  {item.icon}
                </div>
                <h3 className="text-base font-bold text-slate-900 mb-2">
                  {item.title}
                </h3>
                <p className="text-xs text-slate-500 leading-relaxed">
                  {item.desc}
                </p>
              </div>

              <div className="pt-4 mt-4 border-t border-slate-100 flex items-center gap-1 text-[11px] font-bold text-[#1B4D3E]">
                <CheckCircle2 className="w-3.5 h-3.5 text-[#5BB318]" />
                <span>Verified Quality Standard</span>
              </div>
            </div>
          ))}
        </div>

      </div>
    </section>
  );
}

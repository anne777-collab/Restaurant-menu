import React from 'react';
import { Utensils, Clock, ShieldCheck, Sparkles } from 'lucide-react';

interface HeaderProps {
  diningMode: 'dine-in' | 'takeaway' | 'delivery';
  setDiningMode: (mode: 'dine-in' | 'takeaway' | 'delivery') => void;
  tableNumber: string;
  setTableNumber: (num: string) => void;
  deliveryAddress: string;
  setDeliveryAddress: (address: string) => void;
}

export const Header: React.FC<HeaderProps> = ({
  diningMode,
  setDiningMode,
  tableNumber,
  setTableNumber,
  deliveryAddress,
  setDeliveryAddress,
}) => {
  // Suppress warnings while maintaining main state parameters for consistency
  if (false) { console.log(diningMode, setDiningMode, tableNumber, setTableNumber, deliveryAddress, setDeliveryAddress); }
  return (
    <header className="relative bg-gradient-to-r from-slate-900 via-stone-900 to-amber-950 text-white overflow-hidden shadow-xl border-b border-amber-900/30">
      {/* Decorative overlay background pattern */}
      <div className="absolute inset-0 opacity-10 bg-[radial-gradient(#f59e0b_1px,transparent_1px)] [background-size:16px_16px]"></div>
      
      {/* Top micro banner */}
      <div className="bg-amber-500/20 text-amber-300 text-center text-xs py-1.5 px-4 tracking-wider uppercase font-semibold flex items-center justify-center gap-2 border-b border-amber-500/10">
        <Sparkles size={13} className="animate-pulse" />
        <span>✨ Welcome to Aadi Fast Food! Located at Chota Bus Stand-Siha, Pin-123411, Mahendragarh Road, Rewari ✨</span>
      </div>

      <div className="max-w-7xl mx-auto px-4 py-8 sm:px-6 lg:px-8 relative z-10">
        <div className="flex flex-col md:flex-row justify-between items-start md:items-center gap-6">
          
          {/* Brand Identity */}
          <div>
            <div className="flex items-center gap-3">
              <div className="p-2.5 bg-gradient-to-br from-amber-500 to-orange-600 rounded-xl shadow-md shadow-amber-950/50 text-white">
                <Utensils size={28} className="stroke-[2.5]" />
              </div>
              <div>
                <span className="text-xs uppercase tracking-widest text-amber-400 font-bold">Desi Street Flavors</span>
                <h1 className="text-3xl font-extrabold tracking-tight text-stone-100 font-serif">
                  Aadi <span className="text-transparent bg-clip-text bg-gradient-to-r from-amber-400 to-yellow-200 font-sans">Fast Food</span>
                </h1>
              </div>
            </div>
            <p className="mt-2 text-sm text-stone-200 max-w-xl leading-relaxed bg-black/20 p-3 rounded-xl border border-stone-800/50">
              📍 <span className="font-semibold text-amber-300">Address:</span> Chota Bus Stand-Siha, Pin-123411, Mahendragarh Road, Rewari <br />
              📞 <span className="font-semibold text-amber-300">Phone Support:</span> +91 93501 19887
            </p>
            
            {/* Badges */}
            <div className="mt-4 flex flex-wrap gap-4 text-xs text-stone-400">
              <span className="flex items-center gap-1"><Clock size={14} className="text-amber-500" /> Fresh Prep • Hot & Crispy</span>
              <span className="flex items-center gap-1"><ShieldCheck size={14} className="text-emerald-500" /> 100% Hygiene & Pure Ingredients</span>
            </div>
          </div>

          {/* Dining preference completely removed in option B */}
          <div className="bg-stone-900/60 p-4 rounded-xl border border-stone-800 text-right">
            <span className="text-xs font-bold text-amber-400 block">⭐ COUNTER SELF-SERVICE</span>
            <span className="text-[11px] text-stone-400 block mt-1">Fresh Hot Preparation Terminals</span>
          </div>
        </div>
      </div>
    </header>
  );
};

import React from 'react';
import { MenuItem, SAMPLE_MENU, CHEF_RECOMMENDATIONS } from '../data/menuData';
import { Sparkles, Star, ArrowRight, Flame, Leaf } from 'lucide-react';

interface SpotlightCarouselProps {
  onSelectItem: (item: MenuItem) => void;
}

export const SpotlightCarousel: React.FC<SpotlightCarouselProps> = ({ onSelectItem }) => {
  const customSpotlights = SAMPLE_MENU.filter(item => CHEF_RECOMMENDATIONS.includes(item.id));

  return (
    <div className="mb-10">
      <div className="flex items-center gap-2 mb-4">
        <div className="p-1 bg-amber-500 rounded-md text-slate-950">
          <Sparkles size={16} />
        </div>
        <h2 className="text-xl font-bold font-serif text-slate-800">Siha Special</h2>
        <span className="text-xs bg-emerald-100 text-emerald-800 px-2 py-0.5 rounded-full font-medium ml-2 animate-pulse">
          Bus Stand Fresh Prep
        </span>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-5">
        {customSpotlights.map((item) => (
          <div 
            key={item.id}
            className="group relative overflow-hidden rounded-2xl bg-gradient-to-r from-slate-900 to-stone-800 text-white shadow-xl transition-all duration-300 hover:shadow-2xl hover:-translate-y-0.5 border border-slate-800/80 flex flex-col sm:flex-row"
          >
            {/* Visuals */}
            <div className="relative w-full sm:w-2/5 h-48 sm:h-auto overflow-hidden min-h-[160px]">
              <img 
                src={item.image} 
                alt={item.name}
                className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-700 brightness-95"
                loading="lazy"
              />
              <div className="absolute inset-0 bg-gradient-to-t sm:bg-gradient-to-r from-slate-950/80 via-transparent to-transparent"></div>
              
              {/* Overlapping small attributes */}
              <div className="absolute top-2 left-2 flex flex-col gap-1">
                {item.isChefSpecial && (
                  <span className="bg-purple-600/90 text-white text-[10px] font-bold uppercase tracking-wider px-2 py-0.5 rounded-md backdrop-blur-xs shadow-xs">
                    ★ Premium
                  </span>
                )}
                {item.isSpicy && (
                  <span className="bg-rose-600/90 text-white text-[10px] font-bold px-2 py-0.5 rounded-md flex items-center gap-0.5">
                    <Flame size={10} fill="white" /> Spicy
                  </span>
                )}
                {item.isVegan && (
                  <span className="bg-emerald-600/90 text-white text-[10px] font-bold px-2 py-0.5 rounded-md flex items-center gap-0.5">
                    <Leaf size={10} /> Vegan
                  </span>
                )}
              </div>
            </div>

            {/* Contents */}
            <div className="p-5 flex-1 flex flex-col justify-between">
              <div>
                <div className="flex items-center justify-between gap-2 mb-1.5">
                  <span className="text-xs text-amber-400 font-semibold tracking-wide uppercase">
                    {item.category.toUpperCase()}
                  </span>
                  <div className="flex items-center text-amber-400 text-xs font-bold gap-1 bg-white/5 py-0.5 px-2 rounded-md">
                    <Star size={12} fill="currentColor" />
                    <span>{item.rating.toFixed(1)}</span>
                  </div>
                </div>

                <h3 className="text-lg font-bold tracking-tight text-white group-hover:text-amber-300 transition-colors">
                  {item.name}
                </h3>
                
                <p className="text-stone-300 text-xs mt-1.5 line-clamp-2 leading-relaxed">
                  {item.description}
                </p>
              </div>

              <div className="mt-4 pt-3 border-t border-stone-800 flex items-center justify-between">
                <div>
                  <span className="text-stone-400 text-[10px] block uppercase">Curated Price</span>
                  <span className="text-xl font-black text-amber-400">₹{item.price}</span>
                </div>

                <button
                  onClick={() => onSelectItem(item)}
                  className="bg-amber-400 text-slate-950 font-bold text-xs py-2 px-3.5 rounded-xl flex items-center gap-1 hover:bg-amber-300 active:scale-95 transition-all shadow-md shadow-amber-950/40"
                >
                  <span>Configure & Build</span>
                  <ArrowRight size={13} className="group-hover:translate-x-0.5 transition-transform" />
                </button>
              </div>
            </div>

          </div>
        ))}
      </div>
    </div>
  );
};

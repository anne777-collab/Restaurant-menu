import React, { useState } from 'react';
import { MenuItem } from '../data/menuData';
import { Star, Clock, Sparkles, Plus } from 'lucide-react';

interface MenuGridProps {
  items: MenuItem[];
  onSelectItem: (item: MenuItem) => void;
}

const MenuItemCard: React.FC<{ item: MenuItem; onSelectItem: (item: MenuItem) => void }> = ({ item, onSelectItem }) => {
  const hasSizes = item.customization.sizes && item.customization.sizes.length > 0;
  const [selectedSizeId, setSelectedSizeId] = useState<string>(hasSizes ? 'full' : 'default');

  // Compute live price based on current choice
  let displayedPrice = item.price;
  if (hasSizes && selectedSizeId === 'half') {
    const halfOption = item.customization.sizes?.find(s => s.id === 'half');
    if (halfOption) {
      displayedPrice = item.price + halfOption.price;
    }
  } else if (hasSizes && selectedSizeId === 'large') {
    const largeOption = item.customization.sizes?.find(s => s.id === 'large');
    if (largeOption) {
      displayedPrice = item.price + largeOption.price;
    }
  } else if (hasSizes && (selectedSizeId === '1.25l' || selectedSizeId === 'b-20')) {
    displayedPrice = item.price + 10;
  } else if (hasSizes && (selectedSizeId === '2l' || selectedSizeId === 'b-30')) {
    displayedPrice = item.price + 40;
  }

  // Check if this item is one of the target snacks where images are to be hidden
  const hideImage = item.id === 'item-lays' || item.id === 'item-kurkure' || item.id === 'item-namkeen-mix' || item.image === '__HIDE_IMAGE__';

  return (
    <div className="bg-white rounded-2xl border border-slate-200 shadow-xs hover:shadow-md hover:-translate-y-0.5 transition-all duration-300 flex flex-col overflow-hidden group">
      
      {/* Item Graphic Header */}
      {!hideImage ? (
        <div className="relative h-40 w-full bg-slate-100 overflow-hidden shrink-0">
          <img
            src={item.image}
            alt={item.name}
            className="w-full h-full object-cover group-hover:scale-102 transition-transform duration-500"
            loading="lazy"
          />
          <div className="absolute inset-0 bg-gradient-to-t from-black/40 via-transparent to-transparent"></div>
          
          <div className="absolute top-2 left-2 z-10">
            {item.isChefSpecial && (
              <span className="bg-amber-500 text-slate-950 font-bold text-[9px] uppercase tracking-wider py-0.5 px-1.5 rounded flex items-center gap-0.5">
                <Sparkles size={9} fill="currentColor" />
                <span>Siha Special</span>
              </span>
            )}
          </div>

          <div className="absolute bottom-2 right-2 bg-slate-900/80 text-white text-[10px] px-1.5 py-0.5 rounded flex items-center gap-1">
            <Clock size={10} className="text-amber-400" />
            <span>{item.estimatedTime} min</span>
          </div>
        </div>
      ) : (
        <div className="h-14 bg-gradient-to-br from-slate-100 to-slate-200/60 flex items-center px-4 border-b border-slate-200/50 shrink-0">
          <span className="text-[10px] font-bold uppercase text-stone-600 bg-slate-200/80 px-2 py-0.5 rounded tracking-wider">
            📦 Packaged Counter Item (MRP Guaranteed)
          </span>
        </div>
      )}

      {/* Item Content Body */}
      <div className="p-4 flex-1 flex flex-col justify-between space-y-3">
        <div className="space-y-1">
          <div className="flex items-start justify-between gap-2">
            <h3 className="font-extrabold text-slate-900 text-sm group-hover:text-amber-600 transition-colors">
              {item.name}
            </h3>
            <div className="flex items-center gap-0.5 text-[11px] text-amber-600 font-bold bg-amber-50 px-1.5 rounded shrink-0">
              <Star size={10} fill="currentColor" />
              <span>{item.rating.toFixed(1)}</span>
            </div>
          </div>

          <p className="text-slate-500 text-xs line-clamp-2 leading-relaxed">
            {item.description}
          </p>

          {/* Size Choice Toggle Options */}
          {item.customization.sizes && item.customization.sizes.length > 0 ? (
            <div className="mt-2 bg-slate-50 p-2 rounded-xl border border-slate-200/60 space-y-1">
              <span className="text-[9px] text-slate-400 font-bold uppercase tracking-wider block">
                Choose Size Options:
              </span>
              <div className="flex flex-wrap gap-1">
                {item.customization.sizes.map((size) => {
                  const active = selectedSizeId === size.id || (selectedSizeId === 'full' && size.id === 'full');
                  return (
                    <button
                      key={size.id}
                      type="button"
                      onClick={() => setSelectedSizeId(size.id)}
                      className={`text-[10px] px-2 py-1 rounded font-bold border transition ${
                        active
                          ? 'bg-slate-900 border-slate-900 text-amber-400'
                          : 'bg-white border-slate-200 text-slate-700 hover:bg-slate-100'
                      }`}
                    >
                      {size.name}
                    </button>
                  );
                })}
              </div>
            </div>
          ) : null}
        </div>

        {/* Price Footer */}
        <div className="pt-2 border-t border-slate-100 flex items-center justify-between">
          <div>
            <span className="text-[9px] text-slate-400 block uppercase">Price</span>
            <span className="text-base font-extrabold text-slate-950 font-mono">₹{displayedPrice}</span>
          </div>

          <button
            type="button"
            onClick={() => onSelectItem(item)}
            className="bg-slate-900 hover:bg-amber-500 text-amber-400 hover:text-slate-950 font-bold text-xs py-1.5 px-2 rounded-xl transition-all flex items-center gap-1 active:scale-95 cursor-pointer"
          >
            <span>Select & Add</span>
            <Plus size={11} className="stroke-[3]" />
          </button>
        </div>

      </div>
    </div>
  );
};

export const MenuGrid: React.FC<MenuGridProps> = ({ items, onSelectItem }) => {
  return (
    <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
      {items.map((item) => (
        <MenuItemCard key={item.id} item={item} onSelectItem={onSelectItem} />
      ))}
    </div>
  );
};

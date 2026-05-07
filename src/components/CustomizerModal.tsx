import React, { useState, useEffect } from 'react';
import { MenuItem, CustomizationOption } from '../data/menuData';
import { X, Plus, Minus, Check, MessageSquare, Flame, Utensils } from 'lucide-react';

interface CustomizerModalProps {
  item: MenuItem | null;
  onClose: () => void;
  onAddToCart: (cartItem: {
    menuItem: MenuItem;
    quantity: number;
    selectedSize?: CustomizationOption;
    selectedSpice?: string;
    selectedAddOns: CustomizationOption[];
    selectedMilk?: string;
    specialInstructions: string;
    totalUnitPrice: number;
  }) => void;
}

export const CustomizerModal: React.FC<CustomizerModalProps> = ({ item, onClose, onAddToCart }) => {
  if (!item) return null;

  // Local state for choices
  const [quantity, setQuantity] = useState<number>(1);
  const [selectedSize, setSelectedSize] = useState<CustomizationOption | undefined>(
    item.customization.sizes && item.customization.sizes.length > 0 ? item.customization.sizes[0] : undefined
  );
  const [selectedSpice, setSelectedSpice] = useState<string | undefined>(
    item.customization.spiceLevels && item.customization.spiceLevels.length > 0 ? item.customization.spiceLevels[0] : undefined
  );
  const [selectedAddOns, setSelectedAddOns] = useState<CustomizationOption[]>([]);
  const [selectedMilk, setSelectedMilk] = useState<string | undefined>(
    item.customization.milkSubstitutes && item.customization.milkSubstitutes.length > 0 ? item.customization.milkSubstitutes[0] : undefined
  );
  const [specialInstructions, setSpecialInstructions] = useState<string>('');

  // Reset states when item changes
  useEffect(() => {
    setQuantity(1);
    setSelectedSize(item.customization.sizes && item.customization.sizes.length > 0 ? item.customization.sizes[0] : undefined);
    setSelectedSpice(item.customization.spiceLevels && item.customization.spiceLevels.length > 0 ? item.customization.spiceLevels[0] : undefined);
    setSelectedAddOns([]);
    setSelectedMilk(item.customization.milkSubstitutes && item.customization.milkSubstitutes.length > 0 ? item.customization.milkSubstitutes[0] : undefined);
    setSpecialInstructions('');
  }, [item]);

  // Calculations
  const sizeSurcharge = selectedSize ? selectedSize.price : 0;
  const addOnsSurcharge = selectedAddOns.reduce((sum, addOn) => sum + addOn.price, 0);
  const baseUnitPrice = item.price;
  const totalUnitPrice = baseUnitPrice + sizeSurcharge + addOnsSurcharge;
  const totalBatchPrice = totalUnitPrice * quantity;

  const handleToggleAddOn = (addOn: CustomizationOption) => {
    if (selectedAddOns.some((o) => o.id === addOn.id)) {
      setSelectedAddOns(selectedAddOns.filter((o) => o.id !== addOn.id));
    } else {
      setSelectedAddOns([...selectedAddOns, addOn]);
    }
  };

  const handleConfirmAdd = () => {
    onAddToCart({
      menuItem: item,
      quantity,
      selectedSize,
      selectedSpice,
      selectedAddOns,
      selectedMilk,
      specialInstructions: specialInstructions.trim(),
      totalUnitPrice,
    });
    onClose();
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-slate-900/60 backdrop-blur-sm animate-fade-in">
      {/* Container Card */}
      <div className="bg-white w-full max-w-lg rounded-2xl shadow-2xl overflow-hidden border border-slate-100 flex flex-col max-h-[90vh]">
        
        {/* Header Graphic/Image block if present */}
        <div className="relative h-40 bg-slate-900 shrink-0">
          <img 
            src={item.image} 
            alt={item.name} 
            className="w-full h-full object-cover opacity-85" 
          />
          <div className="absolute inset-0 bg-gradient-to-t from-white via-transparent to-black/30"></div>
          
          {/* Close button icon */}
          <button
            onClick={onClose}
            className="absolute top-3 right-3 bg-slate-900/70 text-white hover:bg-slate-900 p-1.5 rounded-full backdrop-blur-xs transition"
          >
            <X size={18} />
          </button>

          {/* Overlaid Title on light background bottom edge */}
          <div className="absolute bottom-2 left-4 right-4">
            <span className="text-[10px] bg-amber-500 text-slate-950 font-extrabold px-1.5 py-0.5 rounded uppercase tracking-wider">
              Customizer Suite
            </span>
            <h2 className="text-xl font-black text-slate-900 mt-1 font-serif drop-shadow-xs">
              {item.name}
            </h2>
          </div>
        </div>

        {/* Scrollable Configuration Zone */}
        <div className="p-5 flex-1 overflow-y-auto space-y-5 divide-y divide-slate-100">
          
          {/* Item Description info snippet */}
          <div className="text-xs text-slate-500 leading-relaxed pb-3">
            {item.description}
          </div>

          {/* 1. Size Selection Parameters */}
          {item.customization.sizes && item.customization.sizes.length > 0 && (
            <div className="pt-4 space-y-2">
              <h3 className="text-xs font-bold text-slate-800 uppercase tracking-wide flex items-center justify-between">
                <span>Select Desired Serving Size</span>
                <span className="text-[10px] text-amber-600 lowercase bg-amber-50 px-1.5 py-0.5 rounded font-normal">required</span>
              </h3>
              <div className="grid grid-cols-2 gap-2">
                {item.customization.sizes.map((size) => {
                  const isChosen = selectedSize?.id === size.id;
                  return (
                    <button
                      key={size.id}
                      type="button"
                      onClick={() => setSelectedSize(size)}
                      className={`flex items-center justify-between p-2.5 rounded-xl text-xs font-medium border text-left transition-all ${
                        isChosen
                          ? 'border-amber-500 bg-amber-50/50 text-slate-900 ring-2 ring-amber-500/10 font-bold'
                          : 'border-slate-200 text-slate-600 hover:bg-slate-50'
                      }`}
                    >
                      <div className="flex items-center gap-1.5">
                        <div className={`w-3.5 h-3.5 rounded-full border flex items-center justify-center ${isChosen ? 'border-amber-600 bg-amber-500' : 'border-slate-300'}`}>
                          {isChosen && <div className="w-1.5 h-1.5 rounded-full bg-slate-950"></div>}
                        </div>
                        <span>{size.name}</span>
                      </div>
                      <span className="bg-slate-900 text-amber-400 font-bold px-2 py-0.5 rounded text-[11px]">
                        ₹{item.price + size.price}
                      </span>
                    </button>
                  );
                })}
              </div>
            </div>
          )}

          {/* 2. Spice Intensity Level */}
          {item.customization.spiceLevels && item.customization.spiceLevels.length > 0 && (
            <div className="pt-4 space-y-2">
              <h3 className="text-xs font-bold text-slate-800 uppercase tracking-wide flex items-center gap-1 text-rose-700">
                <Flame size={13} fill="currentColor" />
                <span>Specify Heat Customization</span>
              </h3>
              <div className="flex flex-wrap gap-1.5">
                {item.customization.spiceLevels.map((spice) => {
                  const isChosen = selectedSpice === spice;
                  return (
                    <button
                      key={spice}
                      type="button"
                      onClick={() => setSelectedSpice(spice)}
                      className={`py-1.5 px-3 rounded-lg text-xs font-medium border transition-all ${
                        isChosen
                          ? 'bg-rose-600 border-rose-600 text-white font-bold shadow-xs'
                          : 'bg-white border-slate-200 text-slate-600 hover:bg-slate-50'
                      }`}
                    >
                      {spice}
                    </button>
                  );
                })}
              </div>
            </div>
          )}

          {/* 3. Extra Optional Add-Ons Matrix */}
          {item.customization.addOns && item.customization.addOns.length > 0 && (
            <div className="pt-4 space-y-2">
              <h3 className="text-xs font-bold text-slate-800 uppercase tracking-wide">
                Enhance Recipe (Optional Extras)
              </h3>
              <div className="space-y-1.5">
                {item.customization.addOns.map((addOn) => {
                  const isChecked = selectedAddOns.some((o) => o.id === addOn.id);
                  return (
                    <button
                      key={addOn.id}
                      type="button"
                      onClick={() => handleToggleAddOn(addOn)}
                      className={`w-full flex items-center justify-between p-2 rounded-xl text-xs text-left border transition-all ${
                        isChecked
                          ? 'bg-slate-50 border-slate-300 font-medium text-slate-900'
                          : 'bg-white border-slate-100 text-slate-600 hover:bg-slate-50'
                      }`}
                    >
                      <div className="flex items-center gap-2">
                        <div className={`w-4 h-4 rounded border flex items-center justify-center transition-colors ${isChecked ? 'bg-slate-900 border-slate-900 text-amber-400' : 'border-slate-300 bg-white'}`}>
                          {isChecked && <Check size={11} className="stroke-[3]" />}
                        </div>
                        <span>{addOn.name}</span>
                      </div>
                      <span className="font-semibold text-slate-700 text-[11px]">
                        +₹{addOn.price}
                      </span>
                    </button>
                  );
                })}
              </div>
            </div>
          )}

          {/* 4. Milk Substitutes For Beverage Items */}
          {item.customization.milkSubstitutes && item.customization.milkSubstitutes.length > 0 && (
            <div className="pt-4 space-y-2">
              <h3 className="text-xs font-bold text-slate-800 uppercase tracking-wide">
                Dairy Preference / Substitute
              </h3>
              <select
                value={selectedMilk}
                onChange={(e) => setSelectedMilk(e.target.value)}
                className="w-full bg-slate-50 border border-slate-200 rounded-xl p-2 text-xs text-slate-700 font-medium focus:outline-none focus:border-amber-500"
              >
                {item.customization.milkSubstitutes.map((milk) => (
                  <option key={milk} value={milk}>
                    {milk}
                  </option>
                ))}
              </select>
            </div>
          )}

          {/* 5. Special Dietary Notes / Instruction Text */}
          <div className="pt-4 space-y-1.5">
            <label className="text-xs font-bold text-slate-800 uppercase tracking-wide flex items-center gap-1">
              <MessageSquare size={12} className="text-slate-400" />
              <span>Kitchen Message / Special Request</span>
            </label>
            <textarea
              rows={2}
              value={specialInstructions}
              onChange={(e) => setSpecialInstructions(e.target.value)}
              placeholder="E.g., Dressing on the side, no raw onions, extreme allergy to sesame seeds..."
              className="w-full text-xs p-2.5 bg-slate-50 border border-slate-200 rounded-xl placeholder:text-slate-400 text-slate-700 focus:outline-none focus:ring-1 focus:ring-amber-500 focus:border-amber-500"
            />
          </div>

        </div>

        {/* Sticky Action Footer Row */}
        <div className="p-4 bg-slate-50 border-t border-slate-100 shrink-0 space-y-3">
          
          {/* Quantity Selector & Batch Summary */}
          <div className="flex items-center justify-between">
            <div className="flex items-center gap-1 bg-white border border-slate-200 p-1 rounded-xl">
              <button
                type="button"
                disabled={quantity <= 1}
                onClick={() => setQuantity(quantity - 1)}
                className="w-7 h-7 bg-slate-50 text-slate-700 hover:bg-slate-100 disabled:opacity-30 rounded-lg flex items-center justify-center transition font-bold"
              >
                <Minus size={12} />
              </button>
              <span className="w-8 text-center text-xs font-extrabold text-slate-800 font-sans">
                {quantity}
              </span>
              <button
                type="button"
                onClick={() => setQuantity(quantity + 1)}
                className="w-7 h-7 bg-slate-50 text-slate-700 hover:bg-slate-100 rounded-lg flex items-center justify-center transition font-bold"
              >
                <Plus size={12} />
              </button>
            </div>

            <div className="text-right">
              <span className="text-[10px] text-slate-400 block uppercase font-medium">Accumulated Cost</span>
              <span className="text-xl font-black text-slate-900 font-sans">₹{totalBatchPrice}</span>
            </div>
          </div>

          {/* Submit Action */}
          <button
            type="button"
            onClick={handleConfirmAdd}
            className="w-full bg-gradient-to-b from-slate-900 to-stone-900 hover:from-amber-500 hover:to-amber-600 text-amber-400 hover:text-slate-950 font-black text-xs py-3 rounded-xl transition-all duration-200 shadow-md flex items-center justify-center gap-1 cursor-pointer group"
          >
            <Utensils size={13} />
            <span>Integrate Customizations into OrderBuilder</span>
          </button>
        </div>

      </div>
    </div>
  );
};

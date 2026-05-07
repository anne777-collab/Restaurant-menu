import React, { useState } from 'react';
import { CartItem } from './OrderBuilder';
import { Send, Phone, AlertTriangle, Sparkles, RefreshCw, CheckCircle, Smartphone } from 'lucide-react';

interface OrderTrackerProps {
  cartItems: CartItem[];
  promoApplied: string;
  finalTotal: number;
  diningMode: 'dine-in' | 'takeaway' | 'delivery';
  tableNumber: string;
  deliveryAddress: string;
  onReset: () => void;
}

export const OrderTracker: React.FC<OrderTrackerProps> = ({
  cartItems,
  finalTotal,
  diningMode,
  onReset,
}) => {
  if (false) { console.log(diningMode); }
  // WhatsApp Flow States
  const [customerName, setCustomerName] = useState<string>('');
  const [customerPhone, setCustomerPhone] = useState<string>('');
  const [formSubmitted, setFormSubmitted] = useState<boolean>(false);
  const [validationError, setValidationError] = useState<string>('');

  const handleProcessForm = (e: React.FormEvent) => {
    e.preventDefault();
    if (!customerName.trim() || !customerPhone.trim()) {
      setValidationError('Please input both your Name and active Phone Number to proceed.');
      return;
    }
    setValidationError('');
    setFormSubmitted(true);
  };

  // Build the precisely requested message layout with safe query tokens encoding
  const generateWhatsAppUrl = () => {
    const itemLines = cartItems
      .map(item => {
        const sizeLabel = item.selectedSize ? ` (${item.selectedSize.name})` : '';
        const specialLabel = item.specialInstructions ? ` (${item.specialInstructions})` : '';
        return `-> ${item.quantity}x ${item.menuItem.name}${sizeLabel}${specialLabel}`;
      })
      .join('\n');

    // Match instructions format accurately
    let messageText = `Hello! New Order from ${customerName.trim()}.\n`;
    messageText += `Phone: ${customerPhone.trim()}\n`;
    messageText += `Items:\n${itemLines}\n\n`;
    messageText += `Total: ₹${finalTotal}\n`;
    messageText += `Please wait, I am sending the payment screenshot now.`;

    return `https://wa.me/918851028623?text=${encodeURIComponent(messageText)}`;
  };

  return (
    <div className="max-w-xl mx-auto px-2 py-4 animate-fade-in space-y-6">
      
      {/* Step Indicator Header */}
      <div className="bg-gradient-to-r from-slate-900 to-stone-900 text-white p-5 rounded-2xl shadow-md border border-amber-500/20">
        <div className="flex items-center gap-2 mb-2 text-amber-400 font-bold text-xs uppercase tracking-widest">
          <Sparkles size={14} className="animate-spin-slow" />
          <span>Aadi Fast Food Digital Counter</span>
        </div>
        <h2 className="text-xl font-serif font-bold text-stone-100">
          WhatsApp Ordering & Payment Flow
        </h2>
        <p className="text-stone-400 text-xs mt-1 leading-relaxed">
          Follow the prompt below to transmit your order details directly to our shop at Chota Bus Stand-Siha.
        </p>
      </div>

      {!formSubmitted ? (
        /* 1. Customer Information Input Form panel */
        <form onSubmit={handleProcessForm} className="bg-white rounded-2xl p-5 border border-slate-200 shadow-sm space-y-4">
          <div className="bg-amber-50/70 text-amber-900 text-xs p-3 rounded-xl border border-amber-200 flex items-start gap-2">
            <Smartphone size={16} className="text-amber-600 mt-0.5 shrink-0" />
            <div>
              <span className="font-bold block">Contact Details Required</span>
              Provide your details below to generate the structured WhatsApp text.
            </div>
          </div>

          <div className="space-y-1">
            <label className="block text-xs font-bold text-slate-700 uppercase tracking-wide">
              Your Name:
            </label>
            <input
              type="text"
              required
              value={customerName}
              onChange={(e) => setCustomerName(e.target.value)}
              placeholder="E.g., Amit Kumar"
              className="w-full text-sm bg-slate-50 border border-slate-300 rounded-xl p-3 text-slate-800 focus:outline-none focus:ring-2 focus:ring-amber-500/20 focus:border-amber-500"
            />
          </div>

          <div className="space-y-1">
            <label className="block text-xs font-bold text-slate-700 uppercase tracking-wide">
              Active Phone Number:
            </label>
            <input
              type="text"
              required
              value={customerPhone}
              onChange={(e) => setCustomerPhone(e.target.value)}
              placeholder="E.g., 98765 XXXXX"
              className="w-full text-sm bg-slate-50 border border-slate-300 rounded-xl p-3 text-slate-800 focus:outline-none focus:ring-2 focus:ring-amber-500/20 focus:border-amber-500"
            />
          </div>

          {validationError && (
            <p className="text-xs text-rose-600 font-bold bg-rose-50 p-2 rounded-lg text-center">
              ⚠️ {validationError}
            </p>
          )}

          <button
            type="submit"
            className="w-full bg-slate-950 text-amber-400 py-3 rounded-xl font-bold text-xs uppercase tracking-wider transition hover:bg-slate-900 cursor-pointer shadow-md"
          >
            Proceed to WhatsApp Checkout Link
          </button>
        </form>
      ) : (
        /* 2. Form Submitted: Show payment snapshot disclaimer instruction and link out */
        <div className="bg-white rounded-2xl p-6 border border-slate-200 shadow-md space-y-6 text-center animate-fade-in">
          
          {/* Prescribed Payment Instruction Announcement box */}
          <div className="bg-emerald-50 border-2 border-emerald-300 p-4 rounded-xl text-left space-y-2">
            <h3 className="font-extrabold text-sm text-emerald-900 flex items-center gap-1.5">
              <CheckCircle size={16} className="text-emerald-600" />
              <span>Order Details Generated Successfully!</span>
            </h3>
            <p className="text-xs text-slate-700 leading-relaxed font-sans">
              ✨ <span className="font-bold text-emerald-800">Order details sent!</span> Now please attach a screenshot of your payment in the WhatsApp chat to confirm your order.
            </p>
          </div>

          {/* Structured Order Breakdown verification preview block */}
          <div className="bg-stone-50 border border-stone-200 p-4 rounded-xl text-left font-mono text-xs space-y-1 text-slate-700">
            <p className="font-bold text-slate-900 border-b pb-1 mb-2 uppercase text-[11px] tracking-wide">
              📝 Message Preview for Shop Counter:
            </p>
            <p>• Hello! New Order from {customerName}.</p>
            <p>• Phone: {customerPhone}</p>
            <div className="text-stone-600 text-[11px]">
              <p>• Items:</p>
              {cartItems.map((i, idx) => {
                const sizeLabel = i.selectedSize ? ` (${i.selectedSize.name})` : '';
                const specialLabel = i.specialInstructions ? ` (${i.specialInstructions})` : '';
                return (
                  <p key={idx} className="pl-3">
                    → {i.quantity}x {i.menuItem.name}{sizeLabel}{specialLabel}
                  </p>
                );
              })}
            </div>
            <p className="font-bold text-slate-900 mt-1">• Total Amount: ₹{finalTotal}</p>
            <p className="text-purple-700 italic text-[11px] mt-1">
              "Please wait, I am sending the payment screenshot now."
            </p>
          </div>

          <div className="space-y-3 pt-2">
            {/* Target Button: Confirm & Send Order via WhatsApp */}
            <a
              href={generateWhatsAppUrl()}
              target="_blank"
              rel="noopener noreferrer"
              className="w-full bg-emerald-600 hover:bg-emerald-700 text-white font-black text-sm py-3.5 px-4 rounded-xl transition-all shadow-md flex items-center justify-center gap-2 text-center"
            >
              <Send size={15} className="fill-white" />
              <span>Confirm & Send Order via WhatsApp</span>
            </a>

            <div className="p-3 bg-amber-50 text-amber-900 border border-amber-100 rounded-xl text-left text-xs flex gap-2">
              <AlertTriangle size={18} className="text-amber-600 shrink-0 mt-0.5" />
              <p className="text-[11px] leading-relaxed">
                <strong>Note:</strong> Clicking will securely direct you to <code>wa.me/918851028623</code>. The web application will remain on this 'Thank You' instruction screen for your screenshot reference.
              </p>
            </div>
          </div>

          <div className="pt-4 border-t border-slate-100 flex items-center justify-center gap-4">
            <button
              onClick={onReset}
              className="text-xs font-bold text-slate-600 hover:text-slate-900 flex items-center gap-1 bg-slate-50 p-2 rounded-lg border border-slate-200"
            >
              <RefreshCw size={12} />
              <span>Modify Cart / Re-order</span>
            </button>

            <a
              href="tel:8851028623"
              className="text-xs font-bold text-slate-800 hover:underline flex items-center gap-1"
            >
              <Phone size={12} />
              <span>Call 88510 28623</span>
            </a>
          </div>

        </div>
      )}

    </div>
  );
};

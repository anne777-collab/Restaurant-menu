import React, { useState } from 'react';
import { MenuItem, CustomizationOption } from '../data/menuData';
import { ShoppingBag, Trash2, Phone, Send, CheckCircle, Smartphone } from 'lucide-react';

export interface CartItem {
  cartId: string;
  menuItem: MenuItem;
  quantity: number;
  selectedSize?: CustomizationOption;
  selectedSpice?: string;
  selectedAddOns: CustomizationOption[];
  selectedMilk?: string;
  specialInstructions: string;
  totalUnitPrice: number;
}

interface OrderBuilderProps {
  cartItems: CartItem[];
  onUpdateQuantity: (cartId: string, delta: number) => void;
  onRemoveItem: (cartId: string) => void;
  diningMode: 'dine-in' | 'takeaway' | 'delivery';
  onPlaceOrder: (promoApplied: string, finalTotal: number) => void;
}

export const OrderBuilder: React.FC<OrderBuilderProps> = ({
  cartItems,
  onUpdateQuantity,
  onRemoveItem,
  onPlaceOrder,
}) => {
  // WhatsApp Checkout Information Steps
  const [showForm, setShowForm] = useState<boolean>(false);
  const [customerName, setCustomerName] = useState<string>('');
  const [customerPhone, setCustomerPhone] = useState<string>('');
  const [errorText, setErrorText] = useState<string>('');
  const [isSent, setIsSent] = useState<boolean>(false);

  // Strict plain total sum calculation
  const finalTotal = cartItems.reduce((sum, item) => sum + item.totalUnitPrice * item.quantity, 0);

  const handleOpenForm = () => {
    if (cartItems.length === 0) return;
    setShowForm(true);
    setIsSent(false);
    setErrorText('');
  };

  const handleConfirmAndSendWhatsApp = (e: React.FormEvent) => {
    e.preventDefault();
    if (!customerName.trim() || !customerPhone.trim()) {
      setErrorText('Please enter both your Name and active Phone Number.');
      return;
    }

    setErrorText('');
    setIsSent(true);

    // Build precisely formatted query body text layout
    const itemLines = cartItems
      .map(item => {
        const sizeLabel = item.selectedSize ? ` (${item.selectedSize.name})` : '';
        const specialLabel = item.specialInstructions ? ` (${item.specialInstructions})` : '';
        return `-> ${item.quantity}x ${item.menuItem.name}${sizeLabel}${specialLabel}`;
      })
      .join('\n');

    let messageText = `Hello! New Order from ${customerName.trim()}.\n`;
    messageText += `Phone: ${customerPhone.trim()}\n`;
    messageText += `Items:\n${itemLines}\n\n`;
    messageText += `Total: ₹${finalTotal}\n`;
    messageText += `Please wait, I am sending the payment screenshot now.`;

    const targetUrl = `https://wa.me/919350119887?text=${encodeURIComponent(messageText)}`;
    
    // Redirect securely to WhatsApp target chat link endpoint
    window.open(targetUrl, '_blank');
    onPlaceOrder('WHATSAPP_TICKET', finalTotal);
  };

  return (
    <div className="bg-white rounded-2xl border border-slate-200 shadow-md overflow-hidden h-full flex flex-col sticky top-6 font-sans">
      
      {/* Drawer Title Header */}
      <div className="bg-gradient-to-r from-slate-900 to-stone-800 text-white px-5 py-4 flex items-center justify-between">
        <div className="flex items-center gap-2">
          <ShoppingBag size={18} className="text-amber-400" />
          <h2 className="font-bold text-xs tracking-wide uppercase">
            Aadi Order Tray Builder
          </h2>
        </div>
        <span className="bg-amber-400 text-slate-950 font-black text-xs px-2.5 py-0.5 rounded-full">
          {cartItems.reduce((acc, item) => acc + item.quantity, 0)} items
        </span>
      </div>

      {/* Cart Scroll Body Area */}
      <div className="flex-1 overflow-y-auto p-4 space-y-3 min-h-[250px]">
        
        {isSent && (
          <div className="bg-emerald-50 border-2 border-emerald-300 text-slate-800 p-3 rounded-xl space-y-1.5 text-xs">
            <p className="font-extrabold text-emerald-900 flex items-center gap-1">
              <CheckCircle size={14} className="text-emerald-600" />
              <span>Order details sent!</span>
            </p>
            <p className="text-slate-600 leading-relaxed font-sans">
              Now please attach a screenshot of your payment in the WhatsApp chat to confirm your order.
            </p>
          </div>
        )}

        {cartItems.length === 0 ? (
          <div className="h-full flex flex-col items-center justify-center text-center py-12 px-4 space-y-2">
            <div className="w-12 h-12 rounded-full bg-slate-50 flex items-center justify-center text-slate-400">
              <ShoppingBag size={22} />
            </div>
            <p className="text-slate-700 text-sm font-bold">Your Tray is Empty</p>
            <p className="text-slate-400 text-xs leading-relaxed">
              Select items from the Siha Special menu list to build your custom snack order.
            </p>
          </div>
        ) : (
          !showForm ? (
            cartItems.map((item) => (
              <div 
                key={item.cartId}
                className="p-3 bg-slate-50 rounded-xl border border-slate-200 flex flex-col space-y-2"
              >
                <div className="flex items-start justify-between gap-4">
                  <div>
                    <h4 className="font-bold text-slate-800 text-xs leading-snug">
                      {item.menuItem.name}
                    </h4>
                    {item.selectedSize && (
                      <span className="inline-block bg-slate-200 text-slate-800 px-1.5 py-0.5 rounded text-[9px] font-bold mt-1">
                        📐 {item.selectedSize.name}
                      </span>
                    )}
                  </div>

                  <button
                    onClick={() => onRemoveItem(item.cartId)}
                    className="text-slate-400 hover:text-rose-600 p-1 rounded-md"
                  >
                    <Trash2 size={13} />
                  </button>
                </div>

                <div className="pt-1.5 border-t border-slate-200/60 flex items-center justify-between">
                  <span className="text-xs font-bold text-slate-900">
                    Ref: ₹{item.totalUnitPrice * item.quantity}
                  </span>

                  <div className="flex items-center gap-1 bg-white border border-slate-200 rounded-lg p-0.5 shadow-2xs">
                    <button
                      onClick={() => onUpdateQuantity(item.cartId, -1)}
                      className="w-5 h-5 bg-slate-50 text-slate-600 rounded flex items-center justify-center text-xs font-bold"
                    >
                      -
                    </button>
                    <span className="w-4 text-center text-xs font-bold font-mono">{item.quantity}</span>
                    <button
                      onClick={() => onUpdateQuantity(item.cartId, 1)}
                      className="w-5 h-5 bg-slate-50 text-slate-600 rounded flex items-center justify-center text-xs font-bold"
                    >
                      +
                    </button>
                  </div>
                </div>
              </div>
            ))
          ) : (
            /* Interactive Information Form block embedded smoothly */
            <form onSubmit={handleConfirmAndSendWhatsApp} className="bg-slate-50 p-3.5 rounded-xl border border-slate-200 space-y-3 animate-fade-in text-xs">
              <div className="font-bold text-slate-800 uppercase tracking-wide text-[11px] border-b pb-1 mb-2 flex items-center gap-1 text-amber-700">
                <Smartphone size={13} />
                <span>Customer Checkout Information</span>
              </div>
              
              <div className="space-y-1">
                <label className="block text-[11px] font-bold text-slate-600">Your Full Name:</label>
                <input
                  type="text"
                  required
                  placeholder="E.g. Amit Kumar"
                  value={customerName}
                  onChange={(e) => setCustomerName(e.target.value)}
                  className="w-full bg-white border border-slate-300 rounded-lg p-2 font-medium text-slate-800 text-xs focus:outline-none focus:border-amber-500"
                />
              </div>

              <div className="space-y-1">
                <label className="block text-[11px] font-bold text-slate-600">Your Phone Number:</label>
                <input
                  type="text"
                  required
                  placeholder="E.g. 98510 XXXXX"
                  value={customerPhone}
                  onChange={(e) => setCustomerPhone(e.target.value)}
                  className="w-full bg-white border border-slate-300 rounded-lg p-2 font-medium text-slate-800 text-xs focus:outline-none focus:border-amber-500"
                />
              </div>

              {errorText && (
                <p className="text-rose-600 font-bold bg-white p-1 rounded text-center text-[11px]">
                  {errorText}
                </p>
              )}

              <button
                type="submit"
                className="w-full bg-emerald-600 hover:bg-emerald-700 text-white p-2.5 rounded-xl font-bold tracking-wide flex items-center justify-center gap-1.5 cursor-pointer shadow-xs mt-2"
              >
                <Send size={12} className="fill-white" />
                <span>Confirm & Send Order via WhatsApp</span>
              </button>

              <button
                type="button"
                onClick={() => setShowForm(false)}
                className="w-full text-center text-slate-500 hover:underline mt-1 block font-medium"
              >
                Go Back
              </button>
            </form>
          )
        )}
      </div>

      {/* Bill Breakdown Calculations sticky footer bar */}
      <div className="bg-slate-50 border-t border-slate-200 p-4 space-y-3 shrink-0">
        
        <div className="flex justify-between items-center py-1 border-b border-slate-200">
          <span className="text-xs font-bold text-slate-700 uppercase tracking-wide">
            Total Price
          </span>
          <span className="text-2xl font-black text-slate-950 font-mono">
            ₹{finalTotal}
          </span>
        </div>

        <div className="space-y-2 pt-1">
          {!showForm ? (
            <button
              type="button"
              onClick={handleOpenForm}
              disabled={cartItems.length === 0}
              className="w-full bg-emerald-600 hover:bg-emerald-700 disabled:bg-slate-200 text-white disabled:text-slate-400 py-3 px-4 rounded-xl font-black text-xs tracking-wider uppercase transition-all shadow-lg flex items-center justify-center gap-2 text-center cursor-pointer"
            >
              <Send size={13} className="fill-white" />
              <span>Place Order via WhatsApp</span>
            </button>
          ) : null}

          <a
            href="tel:9350119887"
            className="w-full bg-slate-800 hover:bg-slate-900 text-stone-100 py-2.5 px-4 rounded-xl font-medium text-xs tracking-wider uppercase transition-all shadow-sm flex items-center justify-center gap-2 text-center block"
          >
            <Phone size={13} className="fill-stone-100 text-slate-800" />
            <span>Call Shop Owner (93501 19887)</span>
          </a>

          <div className="text-center text-[10px] text-slate-400 italic">
            📍 Chota Bus Stand-Siha, Mahendragarh Road, Rewari
          </div>
        </div>

      </div>

    </div>
  );
};
export default OrderBuilder;

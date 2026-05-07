import { useState } from 'react';
import { SAMPLE_MENU, MenuItem, MOCK_REVIEWS } from './data/menuData';
import { Header } from './components/Header';
import { SpotlightCarousel } from './components/SpotlightCarousel';
import { FilterBar } from './components/FilterBar';
import { MenuGrid } from './components/MenuGrid';
import { CustomizerModal } from './components/CustomizerModal';
import { OrderBuilder, CartItem } from './components/OrderBuilder';
import { OrderTracker } from './components/OrderTracker';
import { Info, Star, Heart } from 'lucide-react';

export default function App() {
  // Service configuration state
  const [diningMode, setDiningMode] = useState<'dine-in' | 'takeaway' | 'delivery'>('dine-in');
  const [tableNumber, setTableNumber] = useState<string>('3');
  const [deliveryAddress, setDeliveryAddress] = useState<string>('');

  // Filtering states
  const [searchQuery, setSearchQuery] = useState<string>('');
  const [selectedCategory, setSelectedCategory] = useState<string>('all');
  const [activeDietaryFilters, setActiveDietaryFilters] = useState<string[]>([]);
  const [sortBy, setSortBy] = useState<string>('popular');

  // Interactive items and order state
  const [selectedItem, setSelectedItem] = useState<MenuItem | null>(null);
  const [cartItems, setCartItems] = useState<CartItem[]>([]);

  // Simulation state
  const [isOrderPlaced, setIsOrderPlaced] = useState<boolean>(false);
  const [promoApplied, setPromoApplied] = useState<string>('');
  const [finalPaidTotal, setFinalPaidTotal] = useState<number>(0);

  // Toggle dietary filter keys
  const toggleDietaryFilter = (filterId: string) => {
    setActiveDietaryFilters((prev) =>
      prev.includes(filterId) ? prev.filter((id) => id !== filterId) : [...prev, filterId]
    );
  };

  // Add to active order state with unique parameter signature
  const handleAddToCart = (customItem: {
    menuItem: MenuItem;
    quantity: number;
    selectedSize?: any;
    selectedSpice?: string;
    selectedAddOns: any[];
    selectedMilk?: string;
    specialInstructions: string;
    totalUnitPrice: number;
  }) => {
    // Generate a secure signature hash key for this exact combination of options
    const addOnIdsString = customItem.selectedAddOns
      .map((o) => o.id)
      .sort()
      .join(',');
    const uniqueCartId = `${customItem.menuItem.id}-${customItem.selectedSize?.id || 'reg'}-${customItem.selectedSpice || 'none'}-${customItem.selectedMilk || 'none'}-${addOnIdsString}-${customItem.specialInstructions}`;

    setCartItems((prev) => {
      const existingIdx = prev.findIndex((i) => i.cartId === uniqueCartId);
      if (existingIdx > -1) {
        const copy = [...prev];
        copy[existingIdx].quantity += customItem.quantity;
        return copy;
      } else {
        return [...prev, { ...customItem, cartId: uniqueCartId }];
      }
    });
  };

  // Update item counts from builder column
  const handleUpdateQuantity = (cartId: string, delta: number) => {
    setCartItems((prev) =>
      prev
        .map((item) => {
          if (item.cartId === cartId) {
            const nextQty = item.quantity + delta;
            return { ...item, quantity: nextQty };
          }
          return item;
        })
        .filter((item) => item.quantity > 0)
    );
  };

  // Remove a line item from current active tray
  const handleRemoveItem = (cartId: string) => {
    setCartItems((prev) => prev.filter((item) => item.cartId !== cartId));
  };

  // Switch to live kitchen workflow dashboard
  const handlePlaceOrder = (promo: string, totalBill: number) => {
    setPromoApplied(promo);
    setFinalPaidTotal(totalBill);
    setIsOrderPlaced(true);
  };

  // Clear current tracking status and start fresh
  const handleResetOrder = () => {
    setCartItems([]);
    setPromoApplied('');
    setFinalPaidTotal(0);
    setIsOrderPlaced(false);
  };

  // Filter & Sort Logic Computation
  const filteredMenu = SAMPLE_MENU.filter((item) => {
    // 1. Text query filter
    const matchesSearch =
      item.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
      item.description.toLowerCase().includes(searchQuery.toLowerCase());

    // 2. Tab category filter
    const matchesCategory = selectedCategory === 'all' || item.category === selectedCategory;

    // 3. Dietary preferences filter markers
    const matchesDietary = activeDietaryFilters.every((filterKey) => {
      // access the boolean property on the object dynamically
      return (item as any)[filterKey] === true;
    });

    return matchesSearch && matchesCategory && matchesDietary;
  }).sort((a, b) => {
    // 4. Sorting logic execution
    if (sortBy === 'price-asc') return a.price - b.price;
    if (sortBy === 'price-desc') return b.price - a.price;
    if (sortBy === 'time-asc') return a.estimatedTime - b.estimatedTime;
    // default popularity / rating * reviews count weight
    return b.rating * b.reviewsCount - a.rating * a.reviewsCount;
  });

  return (
    <div className="min-h-screen bg-slate-50 text-slate-800 antialiased font-sans">
      
      {/* Universal branding navigation and configuration */}
      <Header
        diningMode={diningMode}
        setDiningMode={setDiningMode}
        tableNumber={tableNumber}
        setTableNumber={setTableNumber}
        deliveryAddress={deliveryAddress}
        setDeliveryAddress={setDeliveryAddress}
      />

      {/* Main Container */}
      <main className="max-w-7xl mx-auto px-4 py-8 sm:px-6 lg:px-8">
        
        {isOrderPlaced ? (
          /* Live Tracker View State Override */
          <OrderTracker
            cartItems={cartItems}
            promoApplied={promoApplied}
            finalTotal={finalPaidTotal}
            diningMode={diningMode}
            tableNumber={tableNumber}
            deliveryAddress={deliveryAddress}
            onReset={handleResetOrder}
          />
        ) : (
          /* Exploratory Main Catalog View */
          <div className="grid grid-cols-1 lg:grid-cols-3 gap-8 items-start">
            
            {/* Catalog Grid Column (Spans 2 grids on desktop) */}
            <div className="lg:col-span-2 space-y-6">
              
              {/* Premium Chef Recommendations Row */}
              <SpotlightCarousel onSelectItem={(item) => setSelectedItem(item)} />
              
              {/* Dynamic Filtering Panel */}
              <FilterBar
                searchQuery={searchQuery}
                setSearchQuery={setSearchQuery}
                selectedCategory={selectedCategory}
                setSelectedCategory={setSelectedCategory}
                activeDietaryFilters={activeDietaryFilters}
                toggleDietaryFilter={toggleDietaryFilter}
                sortBy={sortBy}
                setSortBy={setSortBy}
              />

              {/* Informative Grid Header count */}
              <div className="flex items-center justify-between text-xs font-semibold text-slate-400 uppercase tracking-wider px-1">
                <span>Displaying {filteredMenu.length} curated recipes</span>
                <span>All ingredients pre-scrubbed</span>
              </div>

               {/* Interactive Menu Items Grid */}
              <MenuGrid 
                items={filteredMenu} 
                onSelectItem={(item) => setSelectedItem(item)} 
              />

              {/* Lower side text information section for packaged snacks at MRP as requested */}
              <div className="bg-gradient-to-br from-slate-900 to-slate-800 text-white p-5 rounded-2xl border border-amber-500/10 mt-6 shadow-sm">
                <div className="flex items-center gap-2 mb-2">
                  <span className="text-amber-400 text-sm">🍿</span>
                  <h4 className="font-bold text-xs uppercase tracking-wider text-amber-400">Packaged Counter Snacks & Refreshments (Available at MRP)</h4>
                </div>
                <p className="text-stone-300 text-xs leading-relaxed">
                  Apart from the cooked items above, we stock fresh crunchy packets of <span className="text-white font-bold">Kurkure (Masala Munch)</span>, crispy <span className="text-white font-bold">Lays Potato Chips</span>, and savory <span className="text-white font-bold">Mixed Namkeen Packets (Small/Large options)</span>. Available instantly at standard Maximum Retail Price (MRP) values at the counter desk.
                </p>
              </div>

              {/* Social Proof & Patron Feedback Section */}
              <div className="bg-white rounded-2xl p-6 border border-slate-100 shadow-2xs mt-12 space-y-4">
                <div className="flex items-center gap-2">
                  <Heart size={16} className="text-rose-500 fill-rose-500" />
                  <h3 className="font-bold text-sm tracking-wide uppercase font-serif text-slate-800">
                    Live Verified Patron Reviews
                  </h3>
                </div>
                <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                  {MOCK_REVIEWS.map((review) => (
                    <div key={review.id} className="bg-slate-50 p-3.5 rounded-xl border border-slate-200/40 text-xs flex flex-col justify-between">
                      <p className="text-slate-600 italic leading-relaxed">
                        "{review.comment}"
                      </p>
                      <div className="mt-3 pt-2 border-t border-slate-200/60 flex justify-between items-center text-[10px]">
                        <span className="font-bold text-slate-700">{review.name}</span>
                        <div className="flex items-center text-amber-500 font-bold">
                          <Star size={10} fill="currentColor" className="mr-0.5" />
                          <span>{review.rating}</span>
                        </div>
                      </div>
                    </div>
                  ))}
                </div>
              </div>

              {/* FAQ Help block helper info */}
              <div className="p-4 bg-amber-50 border border-amber-100 rounded-xl text-xs text-amber-900 flex gap-2 leading-relaxed">
                <Info size={16} className="shrink-0 text-amber-600 mt-0.5" />
                <div>
                  <span className="font-bold block mb-0.5">Aadi Fast Food Price Policy</span>
                  All listed prices are transparent and final. No GST, hidden service charges, or tax markups are added at checkout.
                </div>
              </div>

            </div>

            {/* Sidebar Sticky Cart Drawer Column */}
            <div className="lg:col-span-1">
              <OrderBuilder
                cartItems={cartItems}
                onUpdateQuantity={handleUpdateQuantity}
                onRemoveItem={handleRemoveItem}
                diningMode={diningMode}
                onPlaceOrder={handlePlaceOrder}
              />
            </div>

          </div>
        )}

      </main>

      {/* Footer copyright */}
      <footer className="bg-slate-900 text-stone-400 text-xs py-8 mt-20 border-t border-slate-800">
        <div className="max-w-7xl mx-auto px-4 text-center space-y-2">
          <p className="font-serif text-stone-200 font-bold">Aadi Fast Food Group © 2026</p>
          <p className="text-stone-500 text-[11px]">
            Powered by Tailwind CSS, React 19 & Lucide Iconic Suite. All menu configurations update in memory dynamically.
          </p>
        </div>
      </footer>

      {/* Universal Item customizer modal trigger */}
      <CustomizerModal
        item={selectedItem}
        onClose={() => setSelectedItem(null)}
        onAddToCart={handleAddToCart}
      />

    </div>
  );
}

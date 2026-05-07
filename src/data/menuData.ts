export interface CustomizationOption {
  id: string;
  name: string;
  price: number;
}

export interface CustomizationConfig {
  sizes?: CustomizationOption[];
  spiceLevels?: string[];
  addOns?: CustomizationOption[];
  milkSubstitutes?: string[];
}

export interface MenuItem {
  id: string;
  name: string;
  description: string;
  price: number;
  category: string;
  image: string;
  rating: number;
  reviewsCount: number;
  isVegan: boolean;
  isVegetarian: boolean;
  isGlutenFree: boolean;
  isSpicy: boolean;
  isNutFree: boolean;
  isChefSpecial: boolean;
  estimatedTime: number;
  customization: CustomizationConfig;
}

export interface Category {
  id: string;
  name: string;
  icon: string;
  description: string;
}

export const CATEGORIES: Category[] = [
  { id: 'all', name: 'All Cooked Menu', icon: 'Utensils', description: 'Explore our fresh street favorites' },
  { id: 'siha-special', name: '⭐ Siha Special (Burger & Chowmein)', icon: 'Sparkles', description: 'Our highest rated client favorites' }
];

export const DIETARY_FILTERS = [
  { id: 'isVegetarian', name: 'Pure Veg', icon: 'Sprout', color: 'bg-green-100 text-green-800 border-green-200' },
  { id: 'isChefSpecial', name: 'Siha Special Tag', icon: 'Sparkles', color: 'bg-amber-100 text-amber-800 border-amber-200' }
];

export const SAMPLE_MENU: MenuItem[] = [
  {
    id: 'burger-simple',
    name: 'Simple Burger',
    description: 'Crispy vegetable patty served inside soft toasted buns with signature home burger sauce, fresh cucumber slices, and crunchy onions.',
    price: 30.00,
    category: 'siha-special',
    image: 'https://images.unsplash.com/photo-1568901346375-23c9450c58cd?auto=format&fit=crop&w=600&q=80',
    rating: 4.8,
    reviewsCount: 390,
    isVegan: false,
    isVegetarian: true,
    isGlutenFree: false,
    isSpicy: false,
    isNutFree: true,
    isChefSpecial: true,
    estimatedTime: 5,
    customization: {}
  },
  {
    id: 'burger-paneer',
    name: 'Burger with Paneer',
    description: 'Our deluxe hot burger stuffed with a rich slice of fresh premium dairy paneer alongside a crunchy golden potato patty and mint garnish.',
    price: 40.00,
    category: 'siha-special',
    image: 'https://images.unsplash.com/photo-1586190848861-99aa4a171e90?auto=format&fit=crop&w=600&q=80',
    rating: 4.9,
    reviewsCount: 410,
    isVegan: false,
    isVegetarian: true,
    isGlutenFree: false,
    isSpicy: false,
    isNutFree: true,
    isChefSpecial: true,
    estimatedTime: 6,
    customization: {}
  },
  {
    id: 'chowmein-desi',
    name: 'Desi Chowmein',
    description: 'Freshly tossed high-heat street wok noodles flavored with authentic spices, soy sauce, cabbage juliennes, and capsicum.',
    price: 70.00,
    category: 'siha-special',
    image: 'https://images.unsplash.com/photo-1585032226651-759b368d7246?auto=format&fit=crop&w=600&q=80',
    rating: 4.9,
    reviewsCount: 340,
    isVegan: true,
    isVegetarian: true,
    isGlutenFree: false,
    isSpicy: true,
    isNutFree: true,
    isChefSpecial: true,
    estimatedTime: 8,
    customization: {
      sizes: [
        { id: 'full', name: 'Full Plate', price: 0 },
        { id: 'half', name: 'Half Plate', price: -30.00 } // 70 - 30 = 40
      ]
    }
  },
  {
    id: 'momos-steamed',
    name: 'Steamed Momos',
    description: 'Juicy, soft steamed dumplings filled with finely minced winter greens. Served hot with our signature fiery red chili garlic chutney.',
    price: 70.00,
    category: 'cooked-items',
    image: 'https://newmirchidhaba.ca/storage/2023/11/chicken_steamed_momos-600x600.webp',
    rating: 4.7,
    reviewsCount: 280,
    isVegan: true,
    isVegetarian: true,
    isGlutenFree: false,
    isSpicy: true,
    isNutFree: true,
    isChefSpecial: false,
    estimatedTime: 9,
    customization: {
      sizes: [
        { id: 'full', name: 'Full Plate (12 Pcs)', price: 0 },
        { id: 'half', name: 'Half Plate (6 Pcs)', price: -30.00 } // 70 - 30 = 40
      ]
    }
  },
  {
    id: 'momos-fried',
    name: 'Fried Momos',
    description: 'Crispy deep-fried golden momo pockets boasting a savory veggie filling and crunchy texture. Perfect for cold evening snacks.',
    price: 70.00,
    category: 'cooked-items',
    image: 'https://salasdaily.com/cdn/shop/products/chicken_fried_momos_1200x1200.webp?v=1667534046',
    rating: 4.8,
    reviewsCount: 295,
    isVegan: true,
    isVegetarian: true,
    isGlutenFree: false,
    isSpicy: true,
    isNutFree: true,
    isChefSpecial: false,
    estimatedTime: 10,
    customization: {
      sizes: [
        { id: 'full', name: 'Full Plate (12 Pcs)', price: 0 },
        { id: 'half', name: 'Half Plate (6 Pcs)', price: -30.00 } // 70 - 30 = 40
      ]
    }
  },
  {
    id: 'chips-finger',
    name: 'Crispy Finger Chips',
    description: 'Golden double-cooked potato fingers dusted with premium street chaat masala seasoning. Served with tomato sauce ketchup.',
    price: 70.00,
    category: 'cooked-items',
    image: 'https://images.unsplash.com/photo-1573080496219-bb080dd4f877?auto=format&fit=crop&w=600&q=80',
    rating: 4.6,
    reviewsCount: 195,
    isVegan: true,
    isVegetarian: true,
    isGlutenFree: true,
    isSpicy: false,
    isNutFree: true,
    isChefSpecial: false,
    estimatedTime: 7,
    customization: {
      sizes: [
        { id: 'full', name: 'Full Plate', price: 0 },
        { id: 'half', name: 'Half Plate', price: -30.00 } // 70 - 30 = 40
      ]
    }
  },
  {
    id: 'manchurian-veg',
    name: 'Veg Manchurian',
    description: 'Deep-fried vegetable spheres simmered inside a glossy dark garlic-soy sauce glaze with spring onions.',
    price: 100.00,
    category: 'cooked-items',
    image: 'https://cdn.tasteatlas.com/images/dishes/cba6279ae21445539df7e5f35b063bcb.jpg?mw=2000',
    rating: 4.7,
    reviewsCount: 210,
    isVegan: true,
    isVegetarian: true,
    isGlutenFree: false,
    isSpicy: true,
    isNutFree: true,
    isChefSpecial: false,
    estimatedTime: 11,
    customization: {
      sizes: [
        { id: 'full', name: 'Full Plate', price: 0 },
        { id: 'half', name: 'Half Plate', price: -40.00 } // 100 - 40 = 60
      ]
    }
  },
  {
    id: 'chilli-potato',
    name: 'Chilli Potato Special',
    description: 'Fried crisp potato chips tossed together with sliced bell peppers, soy reduction sauce, sesame oil, and spicy red paste.',
    price: 70.00,
    category: 'cooked-items',
    image: 'https://img.clevup.in/64121/1629517711523_SKU-0041_0.JPG?width=600&format=webp',
    rating: 4.8,
    reviewsCount: 225,
    isVegan: true,
    isVegetarian: true,
    isGlutenFree: false,
    isSpicy: true,
    isNutFree: true,
    isChefSpecial: false,
    estimatedTime: 10,
    customization: {
      sizes: [
        { id: 'full', name: 'Full Plate', price: 0 },
        { id: 'half', name: 'Half Plate', price: -30.00 } // 70 - 30 = 40
      ]
    }
  }
];

export const PROMO_CODES: Record<string, number> = {
  'WELCOME10': 0.10
};

export const CHEF_RECOMMENDATIONS = ['burger-simple', 'burger-paneer', 'chowmein-desi'];

export const MOCK_REVIEWS = [
  { id: 1, name: "Rahul Yadav", rating: 5, date: "Yesterday", comment: "The hot Desi Chowmein is superb value. Half plate for ₹40 is filling!", dish: "Desi Chowmein" },
  { id: 2, name: "Priya Sharma", rating: 4.9, date: "2 days ago", comment: "Burger with Paneer for ₹40 is pure luxury for street food lovers.", dish: "Burger with Paneer" },
  { id: 3, name: "Vikram Singh", rating: 4.8, date: "3 days ago", comment: "Steamed and Fried momos chutney has the perfect spicy punch.", dish: "Steamed Momos" },
  { id: 4, name: "Ankit Rao", rating: 4.7, date: "4 days ago", comment: "Crispy finger chips are crunchy and perfectly salted.", dish: "Crispy Finger Chips" },
  { id: 5, name: "Suresh Yadav", rating: 5, date: "5 days ago", comment: "Chilli potato has beautiful honey garlic flavor balance.", dish: "Chilli Potato Special" },
  { id: 6, name: "Deepak Kumar", rating: 4.6, date: "6 days ago", comment: "Quick preparation near the Siha bus stand. Fresh bun.", dish: "Simple Burger" },
  { id: 7, name: "Meena Kumari", rating: 4.9, date: "A week ago", comment: "Veg Manchurian gravy goes perfectly with extra onions.", dish: "Veg Manchurian" },
  { id: 8, name: "Yogesh Dutt", rating: 4.8, date: "A week ago", comment: "Best snacks shop in Rewari for quick bites.", dish: "Desi Chowmein" }
];

/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import { useState, useMemo, useEffect, memo } from 'react';
import { ShoppingCart, Gamepad2, Send, Zap, ChevronRight, Search, X, Hash, CheckCircle, Loader2, AlertCircle, User, Phone } from 'lucide-react';
import { motion, AnimatePresence } from 'motion/react';
import { Product, Category, CartItem } from './types';

const PRODUCTS: Product[] = [
  {
    id: 'so2-1', title: 'Standoff 2', description: 'Gold & Passes', price: '26 000 UZS',
    image: '', category: "O'yinlar",
    variants: [
      { id: 'so1', name: '💎 100 Gold', price: '26 000 UZS' },
      { id: 'so2', name: '💎 500 Gold', price: '99 000 UZS' },
      { id: 'so3', name: '💎 1000 Gold', price: '180 000 UZS' },
      { id: 'so4', name: '💎 3000 Gold', price: '410 000 UZS' },
      { id: 'so5', name: '💎 GOLD PASS', price: '150 000 UZS' },
      { id: 'so6', name: '💎 GOLD PASS + 10 LVL', price: '250 000 UZS' },
    ]
  },
  {
    id: 'pubg-1', title: 'PUBG Mobile', description: 'Unknown Cash (UC)', price: '14 000 UZS',
    image: '', category: "O'yinlar", isTop: true,
    variants: [
      { id: 'p1', name: '💵 60 UC', price: '14 000 UZS' }, { id: 'p2', name: '💵 120 UC', price: '28 000 UZS' },
      { id: 'p3', name: '💵 180 UC', price: '43 000 UZS' }, { id: 'p4', name: '💵 325 UC', price: '66 000 UZS' },
      { id: 'p5', name: '💵 385 UC', price: '79 000 UZS' }, { id: 'p6', name: '💵 660 UC', price: '127 000 UZS' },
      { id: 'p7', name: '💵 720 UC', price: '142 000 UZS' }, { id: 'p8', name: '💵 985 UC', price: '195 000 UZS' },
      { id: 'p9', name: '💵 1320 UC', price: '255 000 UZS' }, { id: 'p10', name: '💵 1800 UC', price: '340 000 UZS' },
      { id: 'p11', name: '💵 2125 UC', price: '399 000 UZS' }, { id: 'p12', name: '💵 2460 UC', price: '455 000 UZS' },
      { id: 'p13', name: '💵 3850 UC', price: '620 000 UZS' }, { id: 'p14', name: '💵 5650 UC', price: '950 000 UZS' },
      { id: 'p15', name: '💵 8100 UC', price: '1 250 000 UZS' }, { id: 'p16', name: '💵 16200 UC', price: '2 500 000 UZS' },
      { id: 'p17', name: '💵 24300 UC', price: '3 750 000 UZS' },
    ]
  },
  {
    id: 'mlbb-1', title: 'Mobile Legends', description: 'MLBB Diamonds', price: '11 500 UZS',
    image: '', category: "O'yinlar",
    variants: [
      { id: 'ml1', name: '💎 55 Diamonds', price: '11 500 UZS' }, { id: 'ml2', name: '💎 86 Diamonds', price: '17 500 UZS' },
      { id: 'ml3', name: '💎 165 Diamonds', price: '32 500 UZS' }, { id: 'ml4', name: '💎 172 Diamonds', price: '35 000 UZS' },
      { id: 'ml5', name: '💎 275 Diamonds', price: '54 000 UZS' }, { id: 'ml6', name: '💎 344 Diamonds', price: '67 000 UZS' },
      { id: 'ml7', name: '💎 565 Diamonds', price: '112 000 UZS' }, { id: 'ml8', name: '💎 706 Diamonds', price: '137 000 UZS' },
      { id: 'ml9', name: '💎 1271 Diamonds', price: '240 000 UZS' }, { id: 'ml10', name: '💎 1412 Diamonds', price: '270 000 UZS' },
      { id: 'ml11', name: '💎 2195 Diamonds', price: '410 000 UZS' }, { id: 'ml12', name: '💎 3675 Diamonds', price: '690 000 UZS' },
      { id: 'ml13', name: '💎 5532 Diamonds', price: '990 000 UZS' }, { id: 'ml14', name: '💎 6228 Diamonds', price: '1 300 000 UZS' },
      { id: 'ml15', name: '💎 9288 Diamonds', price: '1 690 000 UZS' },
      { id: 'ml_bonus1', name: '💎 50+50 Bonus', price: '14 000 UZS' }, { id: 'ml_bonus2', name: '💎 150+150 Bonus', price: '40 000 UZS' },
      { id: 'ml_bonus3', name: '💎 250+250 Bonus', price: '65 000 UZS' }, { id: 'ml_bonus4', name: '💎 500+500 Bonus', price: '135 000 UZS' },
    ]
  },
  {
    id: '3', title: 'Free Fire', description: 'Free Fire Diamonds', price: '13 000 UZS',
    image: '', category: "O'yinlar",
    variants: [
      { id: 'ff1', name: '💎 105 Diamonds', price: '13 000 UZS' }, { id: 'ff2', name: '💎 210 Diamonds', price: '26 000 UZS' },
      { id: 'ff3', name: '💎 326 Diamonds', price: '44 900 UZS' }, { id: 'ff4', name: '💎 431 Diamonds', price: '59 900 UZS' },
      { id: 'ff5', name: '💎 546 Diamonds', price: '75 000 UZS' }, { id: 'ff6', name: '💎 651 Diamonds', price: '89 900 UZS' },
      { id: 'ff7', name: '💎 756 Diamonds', price: '105 000 UZS' }, { id: 'ff8', name: '💎 872 Diamonds', price: '120 000 UZS' },
      { id: 'ff9', name: '💎 1113 Diamonds', price: '149 000 UZS' }, { id: 'ff10', name: '💎 1439 Diamonds', price: '195 000 UZS' },
      { id: 'ff11', name: '💎 1659 Diamonds', price: '229 000 UZS' }, { id: 'ff12', name: '💎 1985 Diamonds', price: '275 000 UZS' },
      { id: 'ff13', name: '💎 2398 Diamonds', price: '315 000 UZS' }, { id: 'ff14', name: '💎 2944 Diamonds', price: '395 000 UZS' },
      { id: 'ff15', name: '💎 3511 Diamonds', price: '470 000 UZS' }, { id: 'ff16', name: '💎 4074 Diamonds', price: '550 000 UZS' },
      { id: 'ff17', name: '💎 4796 Diamonds', price: '645 000 UZS' }, { id: 'ff18', name: '💎 6160 Diamonds', price: '699 000 UZS' },
      { id: 'ff19', name: '💎 12320 Diamonds', price: '1 399 000 UZS' }, { id: 'ff20', name: '💎 24640 Diamonds', price: '2 699 000 UZS' },
      { id: 'ff21', name: '💳 Kunlik 💸', price: '13 000 UZS' }, { id: 'ff22', name: '💳 Xaftalik 💸', price: '25 000 UZS' },
      { id: 'ff23', name: '💎 LvL Up 💸', price: '70 000 UZS' }, { id: 'ff24', name: '💳 Oylik 💸', price: '149 000 UZS' },
    ]
  },
  {
    id: '5', title: 'Telegram Premium', description: 'Premium obuna', price: '35 000 UZS',
    image: '', category: 'Telegram', isTop: true,
    variants: [
      { id: 'tp1', name: "⭐️ 1 oylik --- 49 ming so'm ❤️", price: '49 000 UZS' },
      { id: 'tp3', name: "⭐️ 3 oylik --- 190 ming so'm ❤️", price: '190 000 UZS' },
      { id: 'tp4', name: "⭐️ 6 oylik --- 250 ming so'm ❤️", price: '250 000 UZS' },
      { id: 'tp5', name: "⭐️ 1 yillik --- 300 ming so'm ❤️", price: '300 000 UZS' },
    ]
  },
  {
    id: '6', title: 'Telegram Stars', description: 'Telegram Stars', price: '15 000 UZS',
    image: '', category: 'Telegram',
    variants: [
      { id: 'ts1', name: '⭐️50 YULDUZ 🇺🇿', price: '15 000 UZS' }, { id: 'ts2', name: '⭐️100 YULDUZ 🇺🇿', price: '29 000 UZS' },
      { id: 'ts3', name: '⭐️250 YULDUZ 🇺🇿', price: '65 000 UZS' }, { id: 'ts4', name: '⭐️500 YULDUZ 🇺🇿', price: '118 000 UZS' },
      { id: 'ts5', name: '⭐️1 000 YULDUZ 🇺🇿', price: '225 000 UZS' }, { id: 'ts6', name: '⭐️2 500 YULDUZ 🇺🇿', price: '550 000 UZS' },
      { id: 'ts7', name: '⭐️10 000 YULDUZ 🇺🇿', price: '2 150 000 UZS' },
    ]
  },
  {
    id: '7', title: 'Telegram Gift', description: "Telegram sovg'alar", price: '4 900 UZS',
    image: '', category: 'Telegram', isTop: true,
    variants: [
      { id: 'tg1', name: '🧸 15talik Gift', price: '4 900 UZS' }, { id: 'tg2', name: '💝 15talik Gift', price: '4 900 UZS' },
      { id: 'tg3', name: '🌹 25talik Gift', price: '7 750 UZS' }, { id: 'tg4', name: '💐 50talik Gift', price: '12 500 UZS' },
      { id: 'tg5', name: '💍 100talik Gift', price: '25 000 UZS' },
    ]
  },
  {
    id: '9', title: 'Instagram', description: 'Obunachilar', price: '10 000 UZS',
    image: '', category: 'Nakrutka',
    variants: [
      { id: 'i1_m', name: '1 oylik (1000 ta obunachi)', price: '10 000 UZS' },
      { id: 'i2_m', name: '2 oylik (1000 ta obunachi)', price: '12 000 UZS' },
      { id: 'i3_m', name: '3 oylik (1000 ta obunachi)', price: '14 000 UZS' },
      { id: 'i4_m', name: '4 oylik (1000 ta obunachi)', price: '15 000 UZS' },
      { id: 'i1_y', name: '1 yillik (1000 ta obunachi)', price: '18 000 UZS' },
    ]
  },
  {
    id: '10', title: 'TikTok', description: 'Obunachilar', price: '10 000 UZS',
    image: '', category: 'Nakrutka',
    variants: [
      { id: 't1_m', name: '1 oylik (1000 ta obunachi)', price: '10 000 UZS' },
      { id: 't2_m', name: '2 oylik (1000 ta obunachi)', price: '12 000 UZS' },
      { id: 't3_m', name: '3 oylik (1000 ta obunachi)', price: '14 000 UZS' },
      { id: 't4_m', name: '4 oylik (1000 ta obunachi)', price: '15 000 UZS' },
      { id: 't1_y', name: '1 yillik (1000 ta obunachi)', price: '18 000 UZS' },
    ]
  },
  {
    id: '11', title: 'YouTube', description: 'Obunachilar', price: '7 000 UZS',
    image: '', category: 'Nakrutka',
    variants: [
      { id: 'y1', name: "1000 Ko'rishlar", price: '7 000 UZS' },
      { id: 'y2', name: '1000 Obunachi', price: '145 000 UZS' },
      { id: 'y3', name: "4000 Soat Ko'rish", price: '450 000 UZS' },
    ]
  },
  {
    id: '12', title: 'Telegram', description: 'Obunachilar', price: '1 000 UZS',
    image: '', category: 'Nakrutka',
    variants: [
      { id: 'tn1', name: "1000 Ko'rishlar", price: '1 000 UZS' }, { id: 'tn2', name: '1000 Like', price: '3 000 UZS' },
      { id: 'tn2_m', name: '1 oylik (1000 ta obunachi)', price: '10 000 UZS' },
      { id: 'tn3_m', name: '3 oylik (1000 ta obunachi)', price: '13 000 UZS' },
      { id: 'tn6_m', name: '6 oylik (1000 ta obunachi)', price: '17 000 UZS' },
      { id: 'tn4_m', name: '1 yillik (1000 ta obunachi)', price: '21 000 UZS' },
    ]
  },
];

// ===================== PRODUCT LOGOS =====================
const getProductImage = (product: Product) => {
  if (!product) return null;
  const logos: Record<string, JSX.Element> = {
    'so2-1': (
      <div className="w-full h-full flex flex-col items-center justify-center bg-[#1a1a1e] p-4">
        <div className="text-3xl font-black italic tracking-tighter text-transparent bg-clip-text bg-gradient-to-br from-orange-400 to-orange-700 leading-none">STAND</div>
        <div className="text-3xl font-black italic tracking-tighter text-white -mt-1 leading-none">OFF 2</div>
        <div className="mt-2 px-2 py-0.5 bg-orange-600 text-white text-[8px] font-bold uppercase rounded">Gold Top-up</div>
      </div>
    ),
    'pubg-1': (
      <div className="w-full h-full flex flex-col items-center justify-center bg-[#1a1a1e] p-4">
        <div className="text-3xl font-black italic tracking-tighter text-transparent bg-clip-text bg-gradient-to-br from-yellow-500 to-yellow-800">PUBG</div>
        <div className="text-2xl font-black italic tracking-tighter text-white -mt-2">MOBILE</div>
        <div className="mt-2 px-2 py-0.5 bg-yellow-600 text-white text-[8px] font-bold uppercase rounded">UC Top-up</div>
      </div>
    ),
    'mlbb-1': (
      <div className="w-full h-full flex flex-col items-center justify-center bg-[#1a1a1e] p-4">
        <div className="text-3xl font-black italic tracking-tighter text-transparent bg-clip-text bg-gradient-to-br from-blue-600 via-indigo-600 to-indigo-900 leading-none">MLBB</div>
        <div className="text-[10px] font-black italic tracking-widest text-white mt-0.5">BANG BANG</div>
        <div className="mt-2 px-2 py-0.5 bg-blue-600 text-white text-[8px] font-bold uppercase rounded">Diamonds</div>
      </div>
    ),
    '3': (
      <div className="w-full h-full flex flex-col items-center justify-center bg-[#1a1a1e] p-4">
        <span className="text-4xl font-black italic tracking-tighter text-transparent bg-clip-text bg-gradient-to-r from-orange-600 via-yellow-500 to-red-600">FREE</span>
        <span className="text-3xl font-black italic tracking-tighter text-white -mt-3">FIRE</span>
        <div className="mt-1 px-2 py-0.5 bg-orange-600 text-white text-[8px] font-bold uppercase rounded">Diamonds</div>
      </div>
    ),
    '5': (
      <div className="w-full h-full flex flex-col items-center justify-center bg-[#1a1a1e] p-4">
        <div className="text-2xl font-black italic tracking-tighter text-transparent bg-clip-text bg-gradient-to-br from-blue-400 to-blue-600">TELEGRAM</div>
        <div className="text-3xl font-black italic tracking-tighter text-white -mt-2">PREMIUM</div>
        <div className="mt-2 text-[10px] font-bold text-blue-600 uppercase tracking-widest">Full Access</div>
      </div>
    ),
    '6': (
      <div className="w-full h-full flex flex-col items-center justify-center bg-[#1a1a1e] p-4">
        <div className="text-2xl font-black italic tracking-tighter text-transparent bg-clip-text bg-gradient-to-br from-yellow-400 to-yellow-600">TELEGRAM</div>
        <div className="text-4xl font-black italic tracking-tighter text-white -mt-2">STARS</div>
        <div className="mt-2 text-[10px] font-bold text-yellow-600 uppercase tracking-widest">Exclusive</div>
      </div>
    ),
    '7': (
      <div className="w-full h-full flex flex-col items-center justify-center bg-[#1a1a1e] p-4">
        <div className="text-2xl font-black italic tracking-tighter text-transparent bg-clip-text bg-gradient-to-br from-purple-500 to-indigo-600">TELEGRAM</div>
        <div className="text-4xl font-black italic tracking-tighter text-white -mt-2">GIFT</div>
        <div className="mt-2 text-[10px] font-bold text-purple-600 uppercase tracking-widest">Premium</div>
      </div>
    ),
    '9': (
      <div className="w-full h-full flex flex-col items-center justify-center bg-[#1a1a1e] p-4">
        <span className="text-3xl font-black italic tracking-tighter text-transparent bg-clip-text bg-gradient-to-tr from-yellow-400 via-red-500 to-purple-600">INSTAGRAM</span>
        <div className="mt-1 px-2 py-0.5 bg-gradient-to-tr from-yellow-400 via-red-500 to-purple-600 text-white text-[8px] font-bold uppercase rounded">Obunachilar</div>
      </div>
    ),
    '10': (
      <div className="w-full h-full flex flex-col items-center justify-center bg-[#1a1a1e] p-4">
        <div className="relative">
          <span className="text-4xl font-black italic tracking-tighter text-white relative z-10">TikTok</span>
          <span className="absolute -top-0.5 -left-0.5 text-4xl font-black italic tracking-tighter text-[#25F4EE] z-0">TikTok</span>
          <span className="absolute top-0.5 left-0.5 text-4xl font-black italic tracking-tighter text-[#FE2C55] z-0">TikTok</span>
        </div>
        <div className="mt-2 px-2 py-0.5 bg-black text-white text-[8px] font-bold uppercase rounded tracking-widest border border-white/10">Followers</div>
      </div>
    ),
    '11': (
      <div className="w-full h-full flex flex-col items-center justify-center bg-[#1a1a1e] p-4">
        <div className="flex items-center gap-1">
          <div className="w-8 h-6 bg-red-600 rounded-md flex items-center justify-center">
            <div className="w-0 h-0 border-l-[6px] border-l-white border-t-[4px] border-t-transparent border-b-[4px] border-b-transparent ml-1" />
          </div>
          <span className="text-3xl font-bold tracking-tighter text-white">YouTube</span>
        </div>
        <div className="mt-1 text-[10px] font-bold text-red-600 uppercase tracking-widest">Premium</div>
      </div>
    ),
    '12': (
      <div className="w-full h-full flex flex-col items-center justify-center bg-[#1a1a1e] p-4">
        <div className="text-2xl font-black italic tracking-tighter text-blue-500">TELEGRAM</div>
        <div className="mt-1 text-[8px] font-bold text-blue-400 uppercase tracking-widest border-t border-white/10 pt-1">Obunachilar</div>
      </div>
    ),
  };
  return logos[product.id] || (
    <div className="w-full h-full bg-[#1a1a1e] flex flex-col items-center justify-center p-6">
      <img src={product.image} alt={product.title} className="w-20 h-20 object-contain" referrerPolicy="no-referrer" />
    </div>
  );
};

const ProductImage = memo(({ product }: { product: Product | null }) => {
  if (!product) return null;
  return getProductImage(product);
});

// ===================== SUCCESS SCREEN =====================
function SuccessScreen({ orderId, onClose }: { orderId: string; onClose: () => void }) {
  return (
    <motion.div
      initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }}
      className="fixed inset-0 z-[200] flex items-center justify-center bg-black/95 backdrop-blur-md px-6"
    >
      <motion.div
        initial={{ scale: 0.85, opacity: 0 }} animate={{ scale: 1, opacity: 1 }}
        transition={{ type: 'spring', damping: 20, stiffness: 250, delay: 0.05 }}
        className="bg-[#121214] border border-white/10 rounded-[32px] p-8 w-full max-w-sm text-center shadow-2xl"
      >
        <motion.div
          initial={{ scale: 0 }} animate={{ scale: 1 }}
          transition={{ delay: 0.2, type: 'spring', stiffness: 300 }}
          className="w-20 h-20 bg-green-500/10 rounded-full flex items-center justify-center mx-auto mb-6 border border-green-500/30"
        >
          <CheckCircle className="w-10 h-10 text-green-400" />
        </motion.div>

        <h2 className="text-2xl font-black italic uppercase tracking-tight text-white mb-2">Qabul qilindi!</h2>
        <p className="text-gray-500 text-[10px] font-bold uppercase tracking-widest mb-1">Buyurtma ID</p>
        <p className="text-indigo-400 font-black text-xl mb-6 tracking-widest">#{orderId}</p>

        <div className="bg-white/5 rounded-2xl p-4 mb-5 border border-white/5 text-left space-y-2.5">
          <div className="flex items-center gap-2 text-xs">
            <div className="w-2 h-2 bg-green-500 rounded-full animate-pulse flex-shrink-0" />
            <span className="text-green-400 font-bold">Admin tekshirmoqda...</span>
          </div>
          <div className="flex items-center gap-2 text-xs">
            <div className="w-2 h-2 bg-gray-700 rounded-full flex-shrink-0" />
            <span className="text-gray-600 font-bold">Xizmat bajarilmoqda</span>
          </div>
          <div className="flex items-center gap-2 text-xs">
            <div className="w-2 h-2 bg-gray-700 rounded-full flex-shrink-0" />
            <span className="text-gray-600 font-bold">Tayyor ✅</span>
          </div>
        </div>

        <p className="text-gray-600 text-[10px] font-bold uppercase tracking-widest mb-6">
          Bot orqali xabar olasiz 📲
        </p>

        <button
          onClick={onClose}
          className="w-full py-4 bg-indigo-600 hover:bg-indigo-700 rounded-2xl font-black italic uppercase tracking-[0.2em] transition-all shadow-xl shadow-indigo-500/20 active:scale-95"
        >
          Bosh sahifaga
        </button>
      </motion.div>
    </motion.div>
  );
}

// ===================== MAIN APP =====================
export default function App() {
  const [activeCategory, setActiveCategory] = useState<Category>('Hammasi');
  const [searchQuery, setSearchQuery] = useState('');
  const [debouncedSearch, setDebouncedSearch] = useState('');
  const [selectedProduct, setSelectedProduct] = useState<Product | null>(null);
  const [selectedVariant, setSelectedVariant] = useState<string | null>(null);
  const [cart, setCart] = useState<CartItem[]>([]);
  const [isCartOpen, setIsCartOpen] = useState(false);
  const [isConfirming, setIsConfirming] = useState(false);
  const [itemInputs, setItemInputs] = useState<Record<string, string>>({});
  const [contactInfo, setContactInfo] = useState('');
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [successOrderId, setSuccessOrderId] = useState<string | null>(null);

  useEffect(() => {
    const t = setTimeout(() => setDebouncedSearch(searchQuery), 300);
    return () => clearTimeout(t);
  }, [searchQuery]);

  useEffect(() => {
    const tg = (window as any).Telegram?.WebApp;
    if (tg) { tg.ready(); tg.expand(); }
  }, []);

  const addToCart = (product: Product, variantId: string) => {
    const variant = product.variants?.find(v => v.id === variantId);
    if (!variant) return;
    setCart(prev => [...prev, { cartId: Math.random().toString(36).substr(2, 9), product, variant }]);
    setSelectedProduct(null);
    setSelectedVariant(null);
    setIsCartOpen(true);
  };

  const removeFromCart = (cartId: string) => setCart(prev => prev.filter(i => i.cartId !== cartId));

  const onCheckout = () => {
    if (!cart.length) return;
    const init: Record<string, string> = {};
    cart.forEach(i => { init[i.cartId] = ''; });
    setItemInputs(init);
    setContactInfo('');
    setIsConfirming(true);
  };

  // ==================== BOT GA YUBORISH ====================
  const finalSubmitOrder = () => {
    if (!cart.length) return;
    const missing = cart.find(i => !itemInputs[i.cartId]?.trim());
    if (missing) { alert(`❌ "${missing.product.title}" uchun kerakli ma'lumotni kiriting`); return; }

    setIsSubmitting(true);
    const tg = (window as any).Telegram?.WebApp;
    const orderId = Math.random().toString(36).substr(2, 9).toUpperCase();
    const totalPrice = cart.reduce((s, i) => s + (parseInt(i.variant.price.replace(/[^0-9]/g, '')) || 0), 0);

    // Bot ga yuboriladigan to'liq ma'lumot
    const orderData = {
      orderId,
      items: cart.map(i => ({
        product: i.product.title,
        category: i.product.category,
        variant: i.variant.name,
        price: i.variant.price,
        userInput: itemInputs[i.cartId]?.trim(),
      })),
      totalPrice,
      totalItems: cart.length,
      contact: contactInfo.trim() || null,
      timestamp: new Date().toISOString(),
      user: tg?.initDataUnsafe?.user || { first_name: 'Web User', id: 0 },
    };

    setTimeout(() => {
      if (tg) {
        tg.sendData(JSON.stringify(orderData));
      } else {
        console.log('📦 TEST buyurtma:', orderData);
      }
      setIsSubmitting(false);
      setSuccessOrderId(orderId);
      setIsCartOpen(false);
      setIsConfirming(false);
    }, 800);
  };

  const handleSuccessClose = () => {
    setSuccessOrderId(null);
    setCart([]);
    setItemInputs({});
    setContactInfo('');
  };

  const getInputConfig = (product: Product) => {
    if (product.category === "O'yinlar") return { label: `${product.title} — O'yin ID`, placeholder: 'ID raqamingizni kiriting...', helper: "O'yin ID raqamingiz", icon: <User className="w-3.5 h-3.5" /> };
    if (product.category === 'Telegram') return { label: `${product.title} — Username/Link`, placeholder: '@username yoki t.me/...', helper: 'Telegram kanal yoki profil', icon: <Send className="w-3.5 h-3.5" /> };
    if (product.category === 'Nakrutka') return { label: `${product.title} — Profil havolasi`, placeholder: 'https://...', helper: 'Profil yoki post havolasi', icon: <Hash className="w-3.5 h-3.5" /> };
    return { label: `${product.title} — Ma'lumot`, placeholder: 'ID yoki Havola...', helper: 'Xizmat uchun kerakli manzil', icon: <User className="w-3.5 h-3.5" /> };
  };

  const totalUZS = cart.reduce((s, i) => s + (parseInt(i.variant.price.replace(/[^0-9]/g, '')) || 0), 0);

  const filteredProducts = useMemo(() =>
    PRODUCTS.filter(p => {
      const matchCat = activeCategory === 'Hammasi' || p.category === activeCategory;
      const matchSearch = p.title.toLowerCase().includes(debouncedSearch.toLowerCase()) || p.description.toLowerCase().includes(debouncedSearch.toLowerCase());
      return matchCat && matchSearch;
    }),
    [activeCategory, debouncedSearch]
  );

  const titleColor = (id: string, cat: string) => {
    if (id === 'so2-1') return 'text-orange-400';
    if (id === 'pubg-1') return 'text-yellow-500';
    if (id === 'mlbb-1') return 'text-blue-500';
    if (id === '3') return 'text-orange-500';
    if (cat === 'Telegram') return 'text-blue-500';
    if (id === '9') return 'text-pink-500';
    return 'text-white';
  };
  const priceColor = (id: string) => {
    if (id === 'so2-1') return 'text-orange-400';
    if (id === 'pubg-1') return 'text-yellow-500';
    if (id === 'mlbb-1') return 'text-blue-400';
    if (id === '3') return 'text-orange-500';
    return 'text-indigo-400';
  };

  return (
    <div className="min-h-screen bg-[#0a0a0b] text-white font-sans selection:bg-purple-500/30">
      <div className="w-full max-w-7xl mx-auto min-h-screen border-x border-white/5 bg-[#0a0a0b] flex flex-col">

        {/* HEADER */}
        <header className="sticky top-0 z-50 bg-[#0a0a0b]/80 backdrop-blur-md border-b border-white/5">
          <div className="px-4 h-14 flex items-center justify-between">
            <div className="flex items-center gap-2">
              <div className="w-8 h-8 bg-gradient-to-br from-indigo-600 to-purple-600 rounded-lg flex items-center justify-center shadow-lg shadow-indigo-500/20">
                <Zap className="w-5 h-5 fill-white" />
              </div>
              <h1 className="text-sm font-black tracking-widest uppercase italic">SMM MARKET</h1>
            </div>
            <button onClick={() => setIsCartOpen(true)} className="p-2 bg-white/5 hover:bg-white/10 rounded-xl transition-colors border border-white/5 group relative">
              <ShoppingCart className="w-4 h-4 text-gray-400 group-hover:text-white transition-colors" />
              {cart.length > 0 && (
                <div className="absolute -top-1 -right-1 w-3.5 h-3.5 bg-indigo-500 rounded-full border-2 border-[#0a0a0b] flex items-center justify-center">
                  <span className="text-[7px] font-black">{cart.length}</span>
                </div>
              )}
            </button>
          </div>
        </header>

        <main className="px-4 py-6 flex-grow">
          {/* BANNER */}
          <div className="bg-[#121214] rounded-2xl p-4 mb-6 border border-white/5 flex items-center gap-3 shadow-xl">
            <div className="w-10 h-10 bg-indigo-600 rounded-xl flex items-center justify-center text-sm font-black italic">SM</div>
            <div>
              <h2 className="text-sm font-bold italic uppercase tracking-wider">SMM MARKET</h2>
              <p className="text-[10px] text-gray-500 uppercase tracking-widest font-bold">Premium Digital Services</p>
            </div>
          </div>

          {/* CATEGORIES */}
          <div className="flex items-center gap-2 mb-6 overflow-x-auto no-scrollbar py-1">
            {(["Hammasi", "O'yinlar", "Telegram", "Nakrutka"] as Category[]).map(cat => (
              <button key={cat} onClick={() => setActiveCategory(cat)}
                className={`px-4 py-2.5 rounded-xl whitespace-nowrap text-[11px] font-black uppercase tracking-wider transition-all duration-300 border flex-shrink-0 flex items-center gap-2 relative ${activeCategory === cat ? 'text-white border-indigo-400/50' : 'bg-[#121214] border-white/5 text-gray-500 hover:bg-white/5'}`}
              >
                {activeCategory === cat && <motion.div layoutId="activeCategoryBg" className="absolute inset-0 bg-indigo-600 rounded-xl -z-10 shadow-lg shadow-indigo-500/20" transition={{ duration: 0.2 }} />}
                {cat === 'Hammasi' && <Zap className={`w-3.5 h-3.5 ${activeCategory === cat ? 'fill-white' : ''}`} />}
                {cat === "O'yinlar" && <Gamepad2 className="w-3.5 h-3.5" />}
                {cat === 'Telegram' && <Send className="w-3.5 h-3.5" />}
                {cat === 'Nakrutka' && <Hash className="w-3.5 h-3.5 opacity-50" />}
                <span className="relative z-10">{cat}</span>
              </button>
            ))}
          </div>

          {/* SEARCH */}
          <div className="relative mb-6 group">
            <Search className="absolute left-4 top-1/2 -translate-y-1/2 w-4 h-4 text-gray-600 group-focus-within:text-indigo-400 transition-colors" />
            <input type="text" placeholder="Mahsulotlarni qidirish..." value={searchQuery} onChange={e => setSearchQuery(e.target.value)}
              className="w-full bg-[#121214] border border-white/5 rounded-xl py-3 pl-10 pr-4 text-xs focus:outline-none focus:ring-1 focus:ring-indigo-500/50 transition-all placeholder:text-gray-700" />
          </div>

          {/* SECTION TITLE */}
          <div className="flex items-center gap-2 mb-4">
            <div className="w-1 h-4 bg-indigo-500 rounded-full" />
            <h3 className="text-sm font-black italic uppercase tracking-tight text-gray-400">{activeCategory}</h3>
          </div>

          {/* GRID */}
          <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-5 gap-3 md:gap-4 pb-20 min-h-[60vh]">
            <AnimatePresence mode="wait">
              <motion.div key={activeCategory} initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }} transition={{ duration: 0.2 }} className="contents">
                {filteredProducts.map(product => (
                  <div key={product.id} onClick={() => setSelectedProduct(product)}
                    className="group bg-[#121214] rounded-2xl overflow-hidden border border-white/5 active:scale-95 transition-all duration-200 flex flex-col h-full cursor-pointer"
                  >
                    <div className="relative aspect-square overflow-hidden bg-white/5">
                      <ProductImage product={product} />
                      {product.isTop && <div className="absolute top-2 left-2 bg-indigo-600 text-[8px] font-black uppercase tracking-widest px-1.5 py-0.5 rounded shadow-lg z-10">Top</div>}
                      <div className="absolute inset-0 bg-gradient-to-t from-[#121214] to-transparent opacity-20" />
                    </div>
                    <div className="p-3 flex flex-col flex-grow">
                      <h4 className={`font-black text-[12px] uppercase tracking-tighter truncate mb-1 ${titleColor(product.id, product.category)}`}>{product.title}</h4>
                      <p className="text-gray-600 text-[9px] mb-3 truncate font-bold tracking-tight uppercase opacity-60">{product.description}</p>
                      <div className="mt-auto pt-2 border-t border-white/5 flex items-center justify-between">
                        <span className={`font-black text-[11px] tracking-tight ${priceColor(product.id)}`}>{product.price}</span>
                        <ChevronRight className="w-3 h-3 text-gray-700" />
                      </div>
                    </div>
                  </div>
                ))}
              </motion.div>
            </AnimatePresence>
          </div>

          {!filteredProducts.length && (
            <div className="text-center py-20">
              <Search className="w-8 h-8 text-gray-800 mx-auto mb-3" />
              <p className="text-gray-600 text-[10px] font-bold uppercase tracking-widest">Topilmadi</p>
            </div>
          )}
        </main>

        <footer className="px-4 py-8 border-t border-white/5 text-center mt-auto">
          <p className="text-[9px] font-bold text-gray-700 tracking-[0.3em] uppercase mb-1">@SMM_MARKETBOT</p>
          <p className="text-[8px] text-gray-800 uppercase font-bold">© 2026 SMM MARKET</p>
        </footer>
        <div className="h-6" />
      </div>

      {/* ========== PRODUCT MODAL ========== */}
      <AnimatePresence>
        {selectedProduct && (
          <>
            <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }} onClick={() => { setSelectedProduct(null); setSelectedVariant(null); }} className="fixed inset-0 bg-black/80 backdrop-blur-sm z-[100]" />
            <motion.div initial={{ y: "100%" }} animate={{ y: 0 }} exit={{ y: "100%" }} transition={{ type: "spring", damping: 25, stiffness: 200 }}
              className="fixed bottom-0 left-0 right-0 md:top-1/2 md:bottom-auto md:left-1/2 md:-translate-x-1/2 md:-translate-y-1/2 w-full max-w-xl bg-[#121214] border-t md:border border-white/10 rounded-t-[32px] md:rounded-[32px] p-6 z-[101] shadow-[0_-20px_50px_rgba(0,0,0,0.5)]"
            >
              <div className="w-12 h-1.5 bg-white/10 rounded-full mx-auto mb-6" />
              <div className="flex items-center justify-between mb-6">
                <div className="flex items-center gap-3">
                  <div className="w-10 h-10 rounded-xl overflow-hidden relative flex-shrink-0 bg-white shadow-lg">
                    <div className="absolute inset-0 scale-[0.4] origin-center flex items-center justify-center w-[250%] h-[250%] -left-[75%] -top-[75%]">
                      <ProductImage product={selectedProduct} />
                    </div>
                  </div>
                  <div>
                    <h4 className="text-xl font-black italic uppercase tracking-tight text-white">{selectedProduct.title}</h4>
                    <p className="text-[10px] text-gray-500 uppercase font-bold tracking-widest">{selectedProduct.category}</p>
                  </div>
                </div>
                <button onClick={() => { setSelectedProduct(null); setSelectedVariant(null); }} className="p-2.5 bg-white/5 rounded-2xl hover:bg-white/10 transition-colors border border-white/5">
                  <X className="w-5 h-5 text-gray-400" />
                </button>
              </div>

              <div className="space-y-2 mb-8 max-h-[50vh] overflow-y-auto no-scrollbar pr-1">
                {selectedProduct.variants?.map(variant => (
                  <button key={variant.id} onClick={() => setSelectedVariant(variant.id)}
                    className={`w-full flex items-center justify-between p-4 rounded-2xl border transition-all duration-300 ${selectedVariant === variant.id ? 'bg-indigo-600/10 border-indigo-500 shadow-lg shadow-indigo-500/10' : 'bg-[#1a1a1e] border-white/5 hover:border-white/10'}`}
                  >
                    <div className="flex items-center gap-4">
                      <div className={`w-10 h-10 rounded-xl overflow-hidden flex-shrink-0 relative transition-transform duration-500 ${selectedVariant === variant.id ? 'scale-110 shadow-lg bg-white' : 'bg-white/5'}`}>
                        <div className="absolute inset-0 scale-[0.4] origin-center flex items-center justify-center w-[250%] h-[250%] -left-[75%] -top-[75%]">
                          <ProductImage product={selectedProduct} />
                        </div>
                      </div>
                      <div className="text-left">
                        <p className={`font-bold text-sm tracking-tight ${selectedVariant === variant.id ? 'text-indigo-400' : 'text-gray-200'}`}>{variant.name}</p>
                        <p className="text-[9px] text-gray-600 uppercase font-black tracking-tighter">{selectedProduct.title}</p>
                      </div>
                    </div>
                    <div className="flex flex-col items-end">
                      <span className={`font-black text-sm tracking-tight ${selectedVariant === variant.id ? 'text-white' : 'text-indigo-400'}`}>{variant.price}</span>
                      {selectedVariant === variant.id && <motion.span initial={{ opacity: 0, x: 5 }} animate={{ opacity: 1, x: 0 }} className="text-[8px] text-indigo-500 font-bold uppercase tracking-widest">Tanlandi</motion.span>}
                    </div>
                  </button>
                ))}
              </div>

              <button onClick={() => { if (selectedVariant && selectedProduct) addToCart(selectedProduct, selectedVariant); }} disabled={!selectedVariant}
                className={`w-full py-5 rounded-2xl font-black italic uppercase tracking-[0.2em] transition-all duration-500 flex items-center justify-center gap-3 ${selectedVariant ? 'bg-gradient-to-r from-indigo-600 to-purple-600 text-white shadow-2xl shadow-indigo-500/40 hover:scale-[1.02] active:scale-[0.98]' : 'bg-white/5 text-gray-600 opacity-50'}`}
              >
                Savatga qo'shish <ChevronRight className="w-5 h-5" />
              </button>
            </motion.div>
          </>
        )}
      </AnimatePresence>

      {/* ========== CART PANEL ========== */}
      <AnimatePresence>
        {isCartOpen && (
          <>
            <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }} onClick={() => setIsCartOpen(false)} className="fixed inset-0 bg-black/80 backdrop-blur-sm z-[110]" />
            <motion.div initial={{ x: "100%" }} animate={{ x: 0 }} exit={{ x: "100%" }} transition={{ type: "spring", damping: 30, stiffness: 300 }}
              className="fixed top-0 right-0 bottom-0 w-full max-w-sm bg-[#121214] border-l border-white/10 z-[111] shadow-2xl flex flex-col"
            >
              <div className="p-6 border-b border-white/5 flex items-center justify-between">
                <div className="flex items-center gap-3">
                  <ShoppingCart className="w-5 h-5 text-indigo-500" />
                  <h3 className="text-lg font-black italic uppercase tracking-tighter">Savat</h3>
                  <span className="bg-white/5 px-2 py-0.5 rounded text-[10px] font-bold text-gray-400">{cart.length}</span>
                </div>
                <button onClick={() => setIsCartOpen(false)} className="p-2 hover:bg-white/5 rounded-xl transition-colors">
                  <X className="w-5 h-5 text-gray-500" />
                </button>
              </div>

              <div className="flex-grow overflow-y-auto p-4 space-y-3 no-scrollbar">
                {!cart.length ? (
                  <div className="h-full flex flex-col items-center justify-center text-center opacity-30">
                    <ShoppingCart className="w-12 h-12 mb-4" />
                    <p className="text-xs font-bold uppercase tracking-widest">Savat bo'sh</p>
                  </div>
                ) : cart.map(item => (
                  <div key={item.cartId} className="bg-white/5 rounded-2xl p-3 border border-white/5 flex gap-3">
                    <div className="w-16 h-16 rounded-xl overflow-hidden relative bg-white flex-shrink-0">
                      <div className="absolute inset-0 scale-[0.3] origin-center flex items-center justify-center w-[333%] h-[333%] -left-[116.5%] -top-[116.5%]">
                        <ProductImage product={item.product} />
                      </div>
                    </div>
                    <div className="flex-grow min-w-0">
                      <h5 className="text-[11px] font-black text-indigo-400 uppercase truncate">{item.product.title}</h5>
                      <p className="text-[13px] font-bold text-white truncate">{item.variant.name}</p>
                      <p className="text-[12px] font-black text-indigo-300 mt-1">{item.variant.price}</p>
                    </div>
                    <button onClick={() => removeFromCart(item.cartId)} className="self-center p-2 text-gray-600 hover:text-red-500 transition-colors">
                      <X className="w-4 h-4" />
                    </button>
                  </div>
                ))}
              </div>

              {cart.length > 0 && (
                <div className="p-6 border-t border-white/5 bg-[#0a0a0b]/50">
                  <div className="bg-white/5 rounded-xl p-3 mb-4 border border-white/5">
                    <div className="flex items-center justify-between mb-1">
                      <span className="text-[10px] font-bold text-gray-500 uppercase">Mahsulotlar:</span>
                      <span className="text-sm font-black text-gray-300">{cart.length} dona</span>
                    </div>
                    <div className="flex items-center justify-between">
                      <span className="text-[10px] font-bold text-gray-500 uppercase">Jami summa:</span>
                      <span className="text-lg font-black text-indigo-400 italic">{totalUZS.toLocaleString()} UZS</span>
                    </div>
                  </div>
                  <button onClick={onCheckout} className="w-full py-4 bg-indigo-600 hover:bg-indigo-700 rounded-2xl font-black italic uppercase tracking-widest transition-all shadow-xl shadow-indigo-500/20 active:scale-95">
                    Buyurtma berish
                  </button>
                </div>
              )}
            </motion.div>
          </>
        )}
      </AnimatePresence>

      {/* ========== TASDIQLASH MODALI ========== */}
      <AnimatePresence>
        {isConfirming && (
          <>
            <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }} onClick={() => !isSubmitting && setIsConfirming(false)} className="fixed inset-0 bg-black/90 backdrop-blur-md z-[120]" />
            <motion.div initial={{ scale: 0.9, opacity: 0 }} animate={{ scale: 1, opacity: 1 }} exit={{ scale: 0.9, opacity: 0 }}
              className="fixed top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[92%] max-w-sm bg-[#121214] border border-white/10 rounded-[32px] p-6 z-[121] shadow-2xl"
            >
              <div className="flex items-center justify-between mb-5">
                <div className="flex items-center gap-2">
                  <div className="w-8 h-8 bg-indigo-500/20 rounded-lg flex items-center justify-center">
                    <Send className="w-4 h-4 text-indigo-400" />
                  </div>
                  <h3 className="text-lg font-black italic uppercase tracking-tighter">Tasdiqlash</h3>
                </div>
                {!isSubmitting && (
                  <button onClick={() => setIsConfirming(false)} className="p-2 hover:bg-white/5 rounded-xl transition-colors">
                    <X className="w-5 h-5 text-gray-500" />
                  </button>
                )}
              </div>

              <div className="space-y-4 mb-6 max-h-[58vh] overflow-y-auto no-scrollbar pr-1">
                {/* Buyurtma xulosasi */}
                <div className="bg-white/5 rounded-2xl p-4 border border-white/5">
                  <p className="text-[10px] text-gray-500 font-bold uppercase tracking-widest mb-2">📦 Buyurtma tarkibi</p>
                  <div className="space-y-1.5">
                    {cart.map(i => (
                      <div key={i.cartId} className="flex justify-between text-xs gap-2">
                        <span className="text-gray-300 font-bold truncate">{i.product.title} — {i.variant.name}</span>
                        <span className="text-indigo-400 font-black flex-shrink-0">{i.variant.price}</span>
                      </div>
                    ))}
                  </div>
                  <div className="mt-3 pt-3 border-t border-white/5 flex justify-between items-center">
                    <span className="text-xs font-black uppercase text-white">Jami:</span>
                    <span className="text-base font-black text-indigo-400 italic">{totalUZS.toLocaleString()} UZS</span>
                  </div>
                </div>

                {/* Har bir mahsulot input */}
                <div className="space-y-4">
                  {cart.map(item => {
                    const cfg = getInputConfig(item.product);
                    const val = itemInputs[item.cartId] || '';
                    return (
                      <div key={item.cartId} className="space-y-1.5">
                        <label className="text-[10px] text-gray-400 font-black uppercase tracking-widest pl-1 flex items-center gap-2">
                          <span className="text-indigo-400">{cfg.icon}</span>
                          {cfg.label}
                        </label>
                        <div className="relative">
                          <input type="text" value={val} onChange={e => setItemInputs(p => ({ ...p, [item.cartId]: e.target.value }))} placeholder={cfg.placeholder}
                            className={`w-full bg-[#1a1a1e] border rounded-2xl py-3.5 px-4 text-sm focus:outline-none focus:ring-2 transition-all font-bold placeholder:text-gray-700 ${!val.trim() ? 'border-white/10 focus:ring-indigo-500/30' : 'border-green-500/40 focus:ring-green-500/20'}`}
                          />
                          {val.trim() && <div className="absolute right-3 top-1/2 -translate-y-1/2"><CheckCircle className="w-4 h-4 text-green-400" /></div>}
                        </div>
                        <p className="text-[9px] text-gray-600 font-medium pl-1 italic">{cfg.helper}</p>
                      </div>
                    );
                  })}
                </div>

                {/* Aloqa (ixtiyoriy) */}
                <div className="space-y-1.5">
                  <label className="text-[10px] text-gray-400 font-black uppercase tracking-widest pl-1 flex items-center gap-2">
                    <Phone className="w-3.5 h-3.5 text-gray-500" />
                    Aloqa — ixtiyoriy
                  </label>
                  <input type="text" value={contactInfo} onChange={e => setContactInfo(e.target.value)} placeholder="+998 90 123 45 67 yoki @username"
                    className="w-full bg-[#1a1a1e] border border-white/10 rounded-2xl py-3.5 px-4 text-sm focus:outline-none focus:ring-2 focus:ring-indigo-500/30 transition-all font-bold placeholder:text-gray-700" />
                  <p className="text-[9px] text-gray-600 font-medium pl-1 italic">Admin siz bilan bog'lanishi uchun</p>
                </div>

                {/* Eslatma */}
                <div className="flex items-start gap-2 bg-indigo-500/5 border border-indigo-500/20 rounded-xl p-3">
                  <AlertCircle className="w-4 h-4 text-indigo-400 flex-shrink-0 mt-0.5" />
                  <p className="text-[10px] text-gray-400 leading-relaxed">
                    Buyurtma bot orqali adminga yuboriladi. Admin tekshirib, 5–30 daqiqa ichida bajaradi.
                  </p>
                </div>
              </div>

              <button onClick={finalSubmitOrder} disabled={isSubmitting}
                className="w-full py-4 bg-indigo-600 hover:bg-indigo-700 disabled:opacity-60 rounded-2xl font-black italic uppercase tracking-[0.2em] transition-all shadow-xl shadow-indigo-500/20 active:scale-95 text-sm flex items-center justify-center gap-2"
              >
                {isSubmitting ? (
                  <><Loader2 className="w-4 h-4 animate-spin" /><span>Yuborilmoqda...</span></>
                ) : (
                  <><Send className="w-4 h-4" /><span>Tasdiqlash va Yuborish</span></>
                )}
              </button>
            </motion.div>
          </>
        )}
      </AnimatePresence>

      {/* ========== SUCCESS SCREEN ========== */}
      <AnimatePresence>
        {successOrderId && <SuccessScreen orderId={successOrderId} onClose={handleSuccessClose} />}
      </AnimatePresence>

      <style>{`.no-scrollbar::-webkit-scrollbar{display:none}.no-scrollbar{-ms-overflow-style:none;scrollbar-width:none}`}</style>
    </div>
  );
}

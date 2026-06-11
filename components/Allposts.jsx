import { useState } from "react";
import { FiShoppingCart, FiArrowRight, FiZap, FiWind } from "react-icons/fi";
import useStore from "../store/useStore";
import CartDrawer from "./Cartdrawer";

const MODELS = [
  {
    id: "911",
    name: "Porsche 911",
    category: "911",
    tagline: "The original. The icon.",
    description: "Porsche 911 — dunyodagi eng mashhur sport avtomobil. 1963 yildan beri har avlod bilan takomillashib kelgan bu model, orqa dvigatel va beqiyos boshqaruv bilan o'ziga xos tajriba taqdim etadi.",
    price: "115000",
    image: "https://a.storyblok.com/f/338913/1280x1024/b7f3c2d593/911-desktop_5-4.jpg",
    specs: { acceleration: "3.4 s", topSpeed: "308 km/s", power: "450 l.k.", engine: "3.0L Twin-Turbo Boxer" },
    colors: ["#8B0000", "#1a1a1a", "#C0C0C0", "#FFFFFF"],
    fuel: "Benzin",
  },
  {
    id: "taycan",
    name: "Porsche Taycan",
    category: "Taycan",
    tagline: "The electric soul of Porsche.",
    description: "Taycan — Porsche ning birinchi to'liq elektr sport avtomobili. Ikki elektr motor, 800V arxitektura va misli ko'rilmagan tezlanish bilan elektromobillar olamini o'zgartirdi.",
    price: "135000",
    image: "https://a.storyblok.com/f/338913/1280x1024/e178b7a186/taycan-desktop_5-4.jpg",
    specs: { acceleration: "2.8 s", topSpeed: "260 km/s", power: "630 l.k.", engine: "Dual Electric Motor" },
    colors: ["#003366", "#1a1a1a", "#4a4a6a", "#FFFFFF"],
    fuel: "Elektr",
  },
  {
    id: "cayenne",
    name: "Porsche Cayenne",
    category: "Cayenne",
    tagline: "The SUV that started a revolution.",
    description: "Cayenne — sport SUV segmentini yaratgan model. Oilaviy qulaylik va Porsche sport ruhini birlashtirgan bu avtomobil, har qanday yo'lda o'zini ko'rsata oladi.",
    price: "95000",
    image: "https://a.storyblok.com/f/338913/1280x1024/7c9b828a7a/denver-range-fallback-desktop-var2.jpg",
    specs: { acceleration: "3.9 s", topSpeed: "286 km/s", power: "670 l.k.", engine: "4.0L Twin-Turbo V8" },
    colors: ["#2d4a1e", "#1a1a1a", "#8B6914", "#C0C0C0"],
    fuel: "Benzin / Gibrid",
  },
  {
    id: "macan",
    name: "Porsche Macan",
    category: "Macan",
    tagline: "Born to perform. Built to thrill.",
    description: "Macan — kompakt sport SUV sinfining namunaviy vakili. Yangi avlod Macan to'liq elektr quvvatga o'tib, Porsche ning elektr kelajagini belgilamoqda.",
    price: "75000",
    image: "https://a.storyblok.com/f/338913/1280x1024/3debd00362/macan-desktop_5-4.jpg",
    specs: { acceleration: "3.3 s", topSpeed: "260 km/s", power: "639 l.k.", engine: "Dual Electric Motor" },
    colors: ["#1a1a1a", "#8B0000", "#4a4a4a", "#FFFFFF"],
    fuel: "Elektr",
  },
  {
    id: "panamera",
    name: "Porsche Panamera",
    category: "Panamera",
    tagline: "Luxury without compromise.",
    description: "Panamera — sport sedanning qayta ta'rifi. To'rt eshikli bu model, biznes komfort va Porsche sport DNSini mukammal uyg'unlashtirgan.",
    price: "105000",
    image: "https://a.storyblok.com/f/338913/1280x1024/c06fa1b962/panamera-desktop_5-4.jpg",
    specs: { acceleration: "3.2 s", topSpeed: "315 km/s", power: "700 l.k.", engine: "4.0L Twin-Turbo V8" },
    colors: ["#1a1a2e", "#1a1a1a", "#8B6914", "#C0C0C0"],
    fuel: "Benzin / E-Hybrid",
  },
  {
    id: "718",
    name: "Porsche 718",
    category: "718",
    tagline: "Pure. Focused. Unstoppable.",
    description: "718 — o'rta dvigatellik ikki o'rindiqli sport avtomobil. Cayman va Boxster versiyalarida mavjud bo'lgan bu model, haydashdan zavq olishni istagan uchun yaratilgan.",
    price: "85000",
    image: "https://a.storyblok.com/f/338913/1280x1024/f8ad827507/718-desktop_5-4.jpg",
    specs: { acceleration: "3.4 s", topSpeed: "304 km/s", power: "394 l.k.", engine: "2.0L Turbo Flat-4" },
    colors: ["#FFD700", "#1a1a1a", "#8B0000", "#C0C0C0"],
    fuel: "Benzin",
  },
];

const TABS = ["Barchasi", "911", "Taycan", "Cayenne", "Macan", "Panamera", "718"];

const AllPosts = () => {
  const { addToCart, cart, setSelectedPost } = useStore();
  const [activeTab, setActiveTab] = useState("Barchasi");
  const [showCart, setShowCart] = useState(false);
  const [addedId, setAddedId] = useState(null);

  const safeCart = Array.isArray(cart) ? cart : [];
  const cartCount = safeCart.reduce((s, c) => s + (c.qty || 1), 0);

  const filtered = activeTab === "Barchasi"
    ? MODELS
    : MODELS.filter((m) => m.category.toLowerCase() === activeTab.toLowerCase());

  const handleAddToCart = (model, e) => {
    e.stopPropagation();
    addToCart(model);
    setAddedId(model.id);
    setTimeout(() => setAddedId(null), 1500);
  };

  const handleDetail = (model, e) => {
    e.stopPropagation();
    setSelectedPost(model);
  };

  return (
    <div className="min-h-screen bg-[#080C0F] pt-16">
      {/* Banner */}
      <div className="relative h-56 flex items-center justify-center overflow-hidden">
        <div className="absolute inset-0 bg-cover bg-center" style={{ backgroundImage: `url(${MODELS[0].image})` }} />
        <div className="absolute inset-0 bg-black/65" />
        <div className="relative text-center">
          <p className="text-[#D5001C] text-xs tracking-[0.4em] uppercase mb-2 font-semibold">Collection</p>
          <h1 style={{ fontFamily: "'Playfair Display', serif" }} className="text-white text-4xl md:text-5xl font-bold">
            Porsche Models
          </h1>
        </div>
        <button
          onClick={() => setShowCart(true)}
          className="absolute top-5 right-6 bg-black/50 backdrop-blur-sm hover:bg-black/80 text-white p-3 rounded-sm border border-white/10 transition-all"
          style={{ position: "absolute" }}
        >
          <FiShoppingCart size={18} />
          {cartCount > 0 && (
            <span className="absolute -top-2 -right-2 w-5 h-5 bg-[#D5001C] rounded-full text-white text-[10px] flex items-center justify-center font-bold">
              {cartCount}
            </span>
          )}
        </button>
      </div>

      <div className="max-w-screen-xl mx-auto px-6 pb-20">
        {/* Tabs */}
        <div className="flex items-center gap-2 flex-wrap mt-8 mb-10">
          {TABS.map((tab) => (
            <button
              key={tab}
              onClick={() => setActiveTab(tab)}
              className={`px-5 py-2 text-xs tracking-widest uppercase rounded-sm border font-semibold transition-all ${
                activeTab === tab
                  ? "bg-[#D5001C] border-[#D5001C] text-white shadow-lg shadow-red-900/30"
                  : "border-white/15 text-white/50 hover:border-white/40 hover:text-white"
              }`}
            >
              {tab}
            </button>
          ))}
        </div>

        {/* Grid */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
          {filtered.map((model) => (
            <div
              key={model.id}
              className="group bg-[#0E1418] border border-white/8 rounded-sm overflow-hidden hover:border-[#D5001C]/50 hover:-translate-y-1 hover:shadow-2xl hover:shadow-[#D5001C]/10 transition-all duration-300 flex flex-col cursor-pointer"
              onClick={(e) => handleDetail(model, e)}
            >
              {/* Rasm */}
              <div className="relative h-52 overflow-hidden flex-shrink-0">
                <img
                  src={model.image}
                  alt={model.name}
                  className="w-full h-full object-cover opacity-80 group-hover:opacity-100 group-hover:scale-105 transition-all duration-700"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-[#0E1418] via-transparent to-transparent" />
                <span className="absolute top-3 left-3 bg-[#D5001C] text-white text-xs px-2.5 py-1 rounded-sm tracking-widest uppercase font-semibold">
                  {model.category}
                </span>
                <span className="absolute top-3 right-3 bg-black/75 text-white text-xs px-2.5 py-1 rounded-sm border border-white/10 font-bold">
                  ${Number(model.price).toLocaleString()}
                </span>
              </div>

              {/* Kontent */}
              <div className="px-5 py-4 flex flex-col flex-1">
                <p className="text-[#D5001C]/70 text-xs tracking-widest uppercase mb-1">{model.fuel}</p>
                <h3 style={{ fontFamily: "'Playfair Display', serif" }} className="text-white font-bold text-xl mb-1">
                  {model.name}
                </h3>
                <p className="text-white/30 text-xs italic mb-3">{model.tagline}</p>
                <p className="text-white/50 text-sm leading-relaxed line-clamp-2 mb-4">{model.description}</p>

                {/* Specs */}
                <div className="grid grid-cols-2 gap-2 mb-4">
                  <div className="bg-white/3 border border-white/8 rounded-sm px-3 py-2 flex items-center gap-2">
                    <FiZap size={12} className="text-[#D5001C] flex-shrink-0" />
                    <div>
                      <p className="text-white/30 text-[10px] uppercase">0–100</p>
                      <p className="text-white text-xs font-bold">{model.specs.acceleration}</p>
                    </div>
                  </div>
                  <div className="bg-white/3 border border-white/8 rounded-sm px-3 py-2 flex items-center gap-2">
                    <FiWind size={12} className="text-[#D5001C] flex-shrink-0" />
                    <div>
                      <p className="text-white/30 text-[10px] uppercase">Max tezlik</p>
                      <p className="text-white text-xs font-bold">{model.specs.topSpeed}</p>
                    </div>
                  </div>
                </div>

                {/* Ranglar */}
                <div className="flex items-center gap-2 mb-4">
                  {model.colors.map((c) => (
                    <div key={c} className="w-4 h-4 rounded-full border border-white/20" style={{ backgroundColor: c }} />
                  ))}
                  <span className="text-white/20 text-xs ml-1">{model.colors.length} rang</span>
                </div>

                {/* Tugmalar */}
                <div className="flex gap-2 mt-auto">
                  <button
                    onClick={(e) => handleDetail(model, e)}
                    className="flex-1 flex items-center justify-center gap-1.5 py-2.5 border border-white/15 hover:border-[#D5001C]/50 text-white/60 hover:text-white rounded-sm text-xs tracking-widest uppercase transition-all"
                  >
                    Ko'rish <FiArrowRight size={12} />
                  </button>
                  <button
                    onClick={(e) => handleAddToCart(model, e)}
                    className={`flex-1 flex items-center justify-center gap-1.5 py-2.5 rounded-sm text-xs tracking-widest uppercase font-semibold transition-all ${
                      addedId === model.id
                        ? "bg-green-600 text-white"
                        : "bg-[#D5001C] hover:bg-[#b0001a] text-white"
                    }`}
                  >
                    <FiShoppingCart size={12} />
                    {addedId === model.id ? "Qo'shildi!" : "Harid"}
                  </button>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>

      {showCart && <CartDrawer onClose={() => setShowCart(false)} />}
    </div>
  );
};

export default AllPosts;
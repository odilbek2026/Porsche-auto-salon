import { useState } from "react";
import {
  FiArrowLeft, FiShoppingCart, FiCheck,
  FiMapPin, FiPhone, FiClock, FiMail,
  FiShield, FiZap, FiWind, FiStar
} from "react-icons/fi";
import useStore from "../store/useStore";
import CartDrawer from "./Cartdrawer";

const FALLBACK = {
  "911":      "https://a.storyblok.com/f/338913/1280x1024/b7f3c2d593/911-desktop_5-4.jpg",
  "taycan":   "https://a.storyblok.com/f/338913/1280x1024/e178b7a186/taycan-desktop_5-4.jpg",
  "cayenne":  "https://a.storyblok.com/f/338913/1280x1024/7c9b828a7a/denver-range-fallback-desktop-var2.jpg",
  "macan":    "https://a.storyblok.com/f/338913/1280x1024/3debd00362/macan-desktop_5-4.jpg",
  "panamera": "https://a.storyblok.com/f/338913/1280x1024/c06fa1b962/panamera-desktop_5-4.jpg",
  "718":      "https://a.storyblok.com/f/338913/1280x1024/f8ad827507/718-desktop_5-4.jpg",
};

const SALONS = [
  {
    city: "Toshkent",
    address: "Amir Temur ko'chasi 108, Yunusobod tumani",
    phone: "+998 71 200 11 22",
    email: "tashkent@porsche.uz",
    hours: "Dush–Juma: 09:00–19:00 | Shan: 10:00–17:00",
    map: "https://maps.google.com/?q=41.299496,69.240073",
  },
  {
    city: "Samarqand",
    address: "Registon ko'chasi 45",
    phone: "+998 66 233 44 55",
    email: "samarkand@porsche.uz",
    hours: "Dush–Juma: 09:00–18:00 | Shan: 10:00–16:00",
    map: "https://maps.google.com/?q=39.654522,66.975574",
  },
  {
    city: "Namangan",
    address: "Mustaqillik prospekti 17",
    phone: "+998 69 244 33 11",
    email: "namangan@porsche.uz",
    hours: "Dush–Juma: 09:00–18:00",
    map: "https://maps.google.com/?q=41.004297,71.642793",
  },
];

const PostDetail = () => {
  const { selectedPost, setPage, addToCart, cart = [] } = useStore();
  const [added, setAdded] = useState(false);
  const [showCart, setShowCart] = useState(false);
  const [activeTab, setActiveTab] = useState("info");

  // Agar selectedPost yo'q bo'lsa posts sahifasiga qayt
  if (!selectedPost) {
    setPage("posts");
    return null;
  }

  const post = selectedPost;
  const cat = (post.category || "").toLowerCase();
  const imgSrc =
    post.image && post.image.startsWith("http")
      ? post.image
      : FALLBACK[cat] || FALLBACK["911"];

  const safeCart = Array.isArray(cart) ? cart : [];
  const inCart = safeCart.some((c) => c.id === post.id);
  const cartCount = safeCart.reduce((s, c) => s + (c.qty || 1), 0);

  const formatPrice = (p) => {
    if (!p) return "Narx so'rov asosida";
    return new Intl.NumberFormat("en-US", {
      style: "currency",
      currency: "USD",
      maximumFractionDigits: 0,
    }).format(p);
  };

  const handleBuy = () => {
    addToCart(post);
    setAdded(true);
    setTimeout(() => setAdded(false), 1500);
  };

  const specs = post.specs || {
    acceleration: "3.4 s",
    topSpeed: "310 km/s",
    power: "450 l.k.",
    engine: "Twin-Turbo",
  };

  const colors = post.colors || ["#1a1a1a", "#C0C0C0"];

  const SPEC_LIST = [
    { icon: FiZap,    label: "0–100 km/s", value: specs.acceleration },
    { icon: FiWind,   label: "Max tezlik",  value: specs.topSpeed },
    { icon: FiStar,   label: "Quvvat",      value: specs.power },
    { icon: FiShield, label: "Dvigatel",    value: specs.engine },
  ];

  return (
    <div className="min-h-screen bg-[#080C0F] pt-16">

      {/* Hero rasm */}
      <div className="relative h-[60vh] overflow-hidden">
        <img
          src={imgSrc}
          alt={post.name}
          onError={(e) => { e.target.src = FALLBACK["911"]; }}
          className="w-full h-full object-cover"
        />
        <div className="absolute inset-0 bg-gradient-to-t from-[#080C0F] via-[#080C0F]/20 to-transparent" />

        {/* Orqaga tugma */}
        <button
          onClick={() => setPage("posts")}
          className="absolute top-6 left-6 flex items-center gap-2 bg-black/50 backdrop-blur-sm hover:bg-black/80 text-white px-4 py-2.5 rounded-sm text-xs tracking-widest uppercase font-semibold transition-all border border-white/10"
        >
          <FiArrowLeft size={14} /> Orqaga
        </button>

        {/* Savatcha tugma */}
        <button
          onClick={() => setShowCart(true)}
          className="absolute top-6 right-6 bg-black/50 backdrop-blur-sm hover:bg-black/80 text-white p-3 rounded-sm border border-white/10 transition-all"
        >
          <FiShoppingCart size={18} />
          {cartCount > 0 && (
            <span className="absolute -top-2 -right-2 w-5 h-5 bg-[#D5001C] rounded-full text-white text-[10px] flex items-center justify-center font-bold">
              {cartCount}
            </span>
          )}
        </button>

        {/* Model nomi */}
        <div className="absolute bottom-8 left-0 right-0 px-6 md:px-12">
          <div className="max-w-screen-xl mx-auto">
            {post.category && (
              <span className="inline-block bg-[#D5001C] text-white text-xs px-3 py-1 rounded-sm tracking-widest uppercase font-semibold mb-3">
                {post.category}
              </span>
            )}
            <h1
              style={{ fontFamily: "'Playfair Display', serif" }}
              className="text-white text-4xl md:text-6xl font-bold"
            >
              {post.name}
            </h1>
            {post.tagline && (
              <p className="text-white/40 text-lg italic mt-2">{post.tagline}</p>
            )}
          </div>
        </div>
      </div>

      {/* Asosiy kontent */}
      <div className="max-w-screen-xl mx-auto px-6 md:px-12 py-10">
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-10">

          {/* CHAP — Tab content */}
          <div className="lg:col-span-2 space-y-6">

            {/* Tablar */}
            <div className="flex border-b border-white/10">
              {[
                { key: "info",  label: "Ma'lumot" },
                { key: "specs", label: "Texnik" },
                { key: "salon", label: "Salonlar" },
              ].map((t) => (
                <button
                  key={t.key}
                  onClick={() => setActiveTab(t.key)}
                  className={`px-6 py-3 text-xs tracking-widest uppercase font-semibold transition-all border-b-2 -mb-px ${
                    activeTab === t.key
                      ? "border-[#D5001C] text-white"
                      : "border-transparent text-white/30 hover:text-white/60"
                  }`}
                >
                  {t.label}
                </button>
              ))}
            </div>

            {/* Tab: Ma'lumot */}
            {activeTab === "info" && (
              <div className="space-y-6">
                <p className="text-white/60 text-base leading-relaxed">
                  {post.description ||
                    "Porsche — insoniyat tarixidagi eng mashhur sport avtomobil brendlaridan biri. Har bir model mukammal muhandislik va dizaynning uyg'unligi hisoblanadi."}
                </p>

                <div className="grid grid-cols-2 gap-3">
                  {[
                    { label: "Kategoriya", value: post.category || "Sport" },
                    { label: "Yoqilg'i",   value: post.fuel || "Benzin" },
                    { label: "O'rindiqlar", value: cat === "911" || cat === "718" ? "2+2" : "4–5" },
                    { label: "Holat",       value: "Buyurtma bo'yicha" },
                  ].map((item) => (
                    <div
                      key={item.label}
                      className="bg-white/3 border border-white/8 rounded-sm px-4 py-3"
                    >
                      <p className="text-white/30 text-xs tracking-widest uppercase mb-1">{item.label}</p>
                      <p className="text-white text-sm font-semibold">{item.value}</p>
                    </div>
                  ))}
                </div>

                {/* Ranglar */}
                {colors.length > 0 && (
                  <div>
                    <p className="text-white/30 text-xs tracking-widest uppercase mb-3">Mavjud ranglar</p>
                    <div className="flex items-center gap-3">
                      {colors.map((c, i) => (
                        <div
                          key={i}
                          className="w-8 h-8 rounded-full border-2 border-white/20 cursor-pointer hover:border-[#D5001C] transition-all"
                          style={{ backgroundColor: c }}
                          title={c}
                        />
                      ))}
                    </div>
                  </div>
                )}
              </div>
            )}

            {/* Tab: Texnik */}
            {activeTab === "specs" && (
              <div className="grid grid-cols-2 gap-4">
                {SPEC_LIST.map((s) => (
                  <div
                    key={s.label}
                    className="bg-white/3 border border-white/8 rounded-sm px-5 py-4 flex items-start gap-3"
                  >
                    <div className="w-9 h-9 bg-[#D5001C]/15 rounded-sm flex items-center justify-center flex-shrink-0">
                      <s.icon className="text-[#D5001C]" size={17} />
                    </div>
                    <div>
                      <p className="text-white/30 text-xs tracking-widest uppercase mb-1">{s.label}</p>
                      <p className="text-white text-sm font-bold">{s.value}</p>
                    </div>
                  </div>
                ))}
                <div className="col-span-2 bg-[#D5001C]/8 border border-[#D5001C]/20 rounded-sm px-5 py-4 flex items-center gap-3">
                  <FiShield className="text-[#D5001C]" size={18} />
                  <div>
                    <p className="text-white/40 text-xs tracking-widest uppercase mb-0.5">Kafolat</p>
                    <p className="text-white text-sm font-semibold">3 yil yoki 100 000 km</p>
                  </div>
                </div>
              </div>
            )}

            {/* Tab: Salonlar */}
            {activeTab === "salon" && (
              <div className="space-y-4">
                <p className="text-white/40 text-sm mb-4">O'zbekistondagi rasmiy Porsche dilerlik markazlari:</p>
                {SALONS.map((s) => (
                  <div
                    key={s.city}
                    className="bg-white/3 border border-white/8 hover:border-[#D5001C]/30 rounded-sm p-5 transition-all"
                  >
                    <div className="flex items-start justify-between gap-4">
                      <div className="flex-1 space-y-2">
                        <h3
                          style={{ fontFamily: "'Playfair Display', serif" }}
                          className="text-white font-bold text-lg"
                        >
                          {s.city}
                        </h3>
                        <div className="flex items-start gap-2 text-white/50 text-sm">
                          <FiMapPin size={14} className="text-[#D5001C] mt-0.5 flex-shrink-0" />
                          <span>{s.address}</span>
                        </div>
                        <div className="flex items-center gap-2 text-white/50 text-sm">
                          <FiPhone size={14} className="text-[#D5001C] flex-shrink-0" />
                          <a href={`tel:${s.phone}`} className="hover:text-white transition-colors">{s.phone}</a>
                        </div>
                        <div className="flex items-center gap-2 text-white/50 text-sm">
                          <FiMail size={14} className="text-[#D5001C] flex-shrink-0" />
                          <a href={`mailto:${s.email}`} className="hover:text-white transition-colors">{s.email}</a>
                        </div>
                        <div className="flex items-center gap-2 text-white/50 text-sm">
                          <FiClock size={14} className="text-[#D5001C] flex-shrink-0" />
                          <span>{s.hours}</span>
                        </div>
                      </div>
                      <a
                        href={s.map}
                        target="_blank"
                        rel="noreferrer"
                        className="flex-shrink-0 flex items-center gap-1.5 bg-white/5 hover:bg-[#D5001C]/15 border border-white/10 hover:border-[#D5001C]/40 text-white/50 hover:text-white px-3 py-2 rounded-sm text-xs tracking-widest uppercase transition-all"
                      >
                        <FiMapPin size={12} /> Xarita
                      </a>
                    </div>
                  </div>
                ))}
              </div>
            )}
          </div>

          {/* O'NG — Sotib olish kartasi */}
          <div className="lg:col-span-1">
            <div className="sticky top-20 bg-[#0E1418] border border-white/10 rounded-sm overflow-hidden shadow-2xl">
              {/* Narx */}
              <div className="px-6 py-5 border-b border-white/10 bg-[#D5001C]/5">
                <p className="text-white/40 text-xs tracking-widest uppercase mb-1">Narxi</p>
                <p
                  style={{ fontFamily: "'Playfair Display', serif" }}
                  className="text-white text-3xl font-bold"
                >
                  {formatPrice(post.price)}
                </p>
                {post.price && (
                  <p className="text-white/25 text-xs mt-1">Narx o'zgarishi mumkin</p>
                )}
              </div>

              {/* Tugmalar */}
              <div className="px-6 py-5 space-y-3">
                <button
                  onClick={handleBuy}
                  className={`w-full flex items-center justify-center gap-2 py-3.5 rounded-sm text-sm font-bold tracking-widest uppercase transition-all ${
                    added
                      ? "bg-green-600 text-white"
                      : "bg-[#D5001C] hover:bg-[#b0001a] text-white shadow-lg shadow-red-900/30"
                  }`}
                >
                  {added ? (
                    <><FiCheck size={16} /> Qo'shildi!</>
                  ) : (
                    <><FiShoppingCart size={16} /> Savatchaga qo'shish</>
                  )}
                </button>

                {inCart && !added && (
                  <button
                    onClick={() => setShowCart(true)}
                    className="w-full flex items-center justify-center gap-2 py-3 border border-[#D5001C]/40 hover:border-[#D5001C] text-[#D5001C] rounded-sm text-sm font-semibold tracking-widest uppercase transition-all"
                  >
                    <FiShoppingCart size={15} /> Savatchani ko'rish
                  </button>
                )}

                <a
                  href="tel:+998712001122"
                  className="w-full flex items-center justify-center gap-2 py-3 border border-white/15 hover:border-white/40 text-white/60 hover:text-white rounded-sm text-sm tracking-widest uppercase transition-all"
                >
                  <FiPhone size={15} /> Qo'ng'iroq qilish
                </a>

                {/* Imtiyozlar */}
                <div className="pt-3 border-t border-white/8 space-y-2">
                  {[
                    "Rasmiy kafolat: 3 yil",
                    "Bepul texnik ko'rik",
                    "24/7 qo'llab-quvvatlash",
                    "Kredit imkoniyati mavjud",
                  ].map((item) => (
                    <div key={item} className="flex items-center gap-2 text-white/40 text-xs">
                      <FiCheck size={11} className="text-green-400 flex-shrink-0" />
                      <span>{item}</span>
                    </div>
                  ))}
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>

      {showCart && <CartDrawer onClose={() => setShowCart(false)} />}
    </div>
  );
};

export default PostDetail;
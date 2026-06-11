import { useState } from "react";
import { FiCalendar, FiArrowRight, FiTag } from "react-icons/fi";

const NEWS_LIST = [
  {
    id: 1,
    category: "Yangi Model",
    title: "Yangi Porsche 911 GT3 RS 2025 — Rekord tezlikda",
    excerpt: "Porsche 911 GT3 RS yangi avlodi Nürburgring trekida 6:49.328 daqiqalik rekord o'rnatdi. 525 ot kuchli tabiiy so'ruvchi dvigatel bilan.",
    image: "https://a.storyblok.com/f/338913/1280x1024/b7f3c2d593/911-desktop_5-4.jpg",
    date: "10 Iyun 2025",
    readTime: "3 daqiqa",
    featured: true,
  },
  {
    id: 2,
    category: "Elektr",
    title: "Taycan Turbo GT — Eng tez elektr Porsche",
    excerpt: "Yangi Taycan Turbo GT 1108 ot kuchi va 2.2 sekundda 0-100 km/s — dunyodagi eng tez elektr avtomobillardan biri.",
    image: "https://a.storyblok.com/f/338913/1280x1024/e178b7a186/taycan-desktop_5-4.jpg",
    date: "5 Iyun 2025",
    readTime: "4 daqiqa",
    featured: false,
  },
  {
    id: 3,
    category: "O'zbekiston",
    title: "Porsche Center Toshkent — Yangi showroom ochildi",
    excerpt: "Toshkentdagi yangi Porsche showroomida barcha 2025 modellari namoyish qilinmoqda. Test drive uchun oldindan ro'yxatdan o'ting.",
    image: "https://a.storyblok.com/f/338913/1280x1024/7c9b828a7a/denver-range-fallback-desktop-var2.jpg",
    date: "1 Iyun 2025",
    readTime: "2 daqiqa",
    featured: false,
  },
  {
    id: 4,
    category: "SUV",
    title: "Yangi Cayenne Coupé Electric — Kelajak SUV",
    excerpt: "Cayenne ning elektr versiyasi 517 ot kuchi va 598 km zapas yurish masofasi bilan premiyal SUV bozorini qayta belgilaydi.",
    image: "https://a.storyblok.com/f/338913/1280x1024/3debd00362/macan-desktop_5-4.jpg",
    date: "28 May 2025",
    readTime: "5 daqiqa",
    featured: false,
  },
  {
    id: 5,
    category: "Motorsport",
    title: "Porsche Le Mans 2025 — G'alaba",
    excerpt: "Porsche 963 LMDh raqobat avtomobili Le Mans 24 soatlik poygasida umumiy g'alaba qozondi. Tarixdagi 20-marta!",
    image: "https://a.storyblok.com/f/338913/1280x1024/c06fa1b962/panamera-desktop_5-4.jpg",
    date: "16 May 2025",
    readTime: "6 daqiqa",
    featured: false,
  },
  {
    id: 6,
    category: "Dizayn",
    title: "Porsche 718 Cayman GT4 RS — Oxirgi benzin nusxasi",
    excerpt: "718 GT4 RS — benzin dvigatelining Porsche tarixidagi so'nggi vakili. Kollektorlar uchun maxsus cheklangan seriya.",
    image: "https://a.storyblok.com/f/338913/1280x1024/f8ad827507/718-desktop_5-4.jpg",
    date: "10 May 2025",
    readTime: "3 daqiqa",
    featured: false,
  },
];

const CATEGORIES = ["Barchasi", "Yangi Model", "Elektr", "O'zbekiston", "SUV", "Motorsport", "Dizayn"];

const News = () => {
  const [activeCategory, setActiveCategory] = useState("Barchasi");
  const featured = NEWS_LIST.find((n) => n.featured);
  const filtered = NEWS_LIST.filter((n) => {
    if (n.featured) return false;
    return activeCategory === "Barchasi" || n.category === activeCategory;
  });

  return (
    <div className="min-h-screen bg-[#080C0F] pt-16">
      {/* Hero */}
      <div className="relative h-60 flex items-center overflow-hidden">
        <div className="absolute inset-0 bg-cover bg-center opacity-25" style={{ backgroundImage: `url(${featured?.image})` }} />
        <div className="absolute inset-0 bg-gradient-to-r from-[#080C0F] via-[#080C0F]/80 to-transparent" />
        <div className="relative max-w-screen-xl mx-auto px-6 md:px-12 w-full">
          <p className="text-[#D5001C] text-xs tracking-[0.5em] uppercase font-semibold mb-3">Porsche News</p>
          <h1 style={{ fontFamily: "'Playfair Display', serif" }} className="text-white text-5xl md:text-6xl font-bold">
            Yangiliklar
          </h1>
        </div>
      </div>

      <div className="max-w-screen-xl mx-auto px-6 md:px-12 py-10">
        {/* Featured */}
        {featured && (
          <div className="group cursor-pointer grid grid-cols-1 lg:grid-cols-2 gap-0 bg-[#0E1418] border border-white/8 rounded-sm overflow-hidden hover:border-[#D5001C]/40 transition-all duration-300 mb-12 hover:shadow-2xl hover:shadow-[#D5001C]/10">
            <div className="relative h-64 lg:h-auto overflow-hidden">
              <img src={featured.image} alt={featured.title} className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-700 opacity-80 group-hover:opacity-100" />
              <div className="absolute inset-0 bg-gradient-to-r from-transparent to-[#0E1418] hidden lg:block" />
              <span className="absolute top-4 left-4 bg-[#D5001C] text-white text-xs px-3 py-1 rounded-sm tracking-widest uppercase font-semibold">
                So'nggi xabar
              </span>
            </div>
            <div className="px-8 py-8 flex flex-col justify-center">
              <div className="flex items-center gap-2 mb-3">
                <span className="bg-[#D5001C]/15 text-[#D5001C] text-xs px-2.5 py-1 rounded-sm tracking-widest uppercase font-semibold border border-[#D5001C]/20">
                  {featured.category}
                </span>
              </div>
              <h2 style={{ fontFamily: "'Playfair Display', serif" }} className="text-white font-bold text-2xl md:text-3xl leading-tight mb-4">
                {featured.title}
              </h2>
              <p className="text-white/50 text-sm leading-relaxed mb-6">{featured.excerpt}</p>
              <div className="flex items-center justify-between">
                <div className="flex items-center gap-1.5 text-white/25 text-xs">
                  <FiCalendar size={11} className="text-[#D5001C]" />
                  <span>{featured.date}</span>
                  <span className="mx-1">·</span>
                  <span>{featured.readTime}</span>
                </div>
                <button className="flex items-center gap-1.5 text-[#D5001C] text-xs tracking-widest uppercase font-semibold hover:gap-3 transition-all">
                  O'qish <FiArrowRight size={12} />
                </button>
              </div>
            </div>
          </div>
        )}

        {/* Category filter */}
        <div className="flex items-center gap-2 flex-wrap mb-8">
          {CATEGORIES.map((cat) => (
            <button
              key={cat}
              onClick={() => setActiveCategory(cat)}
              className={`px-4 py-1.5 text-xs tracking-widest uppercase rounded-sm border font-semibold transition-all ${
                activeCategory === cat
                  ? "bg-[#D5001C] border-[#D5001C] text-white"
                  : "border-white/15 text-white/50 hover:border-white/40 hover:text-white"
              }`}
            >
              {cat}
            </button>
          ))}
        </div>

        {/* News grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {filtered.map((news) => (
            <div key={news.id} className="group cursor-pointer bg-[#0E1418] border border-white/8 rounded-sm overflow-hidden hover:border-[#D5001C]/40 hover:-translate-y-1 hover:shadow-xl hover:shadow-[#D5001C]/10 transition-all duration-300">
              <div className="relative h-48 overflow-hidden">
                <img src={news.image} alt={news.title} className="w-full h-full object-cover opacity-75 group-hover:opacity-100 group-hover:scale-105 transition-all duration-700" />
                <div className="absolute inset-0 bg-gradient-to-t from-[#0E1418] via-transparent to-transparent" />
                <span className="absolute top-3 left-3 bg-[#D5001C]/80 backdrop-blur-sm text-white text-xs px-2 py-0.5 rounded-sm tracking-widest uppercase font-semibold flex items-center gap-1">
                  <FiTag size={9} /> {news.category}
                </span>
              </div>
              <div className="px-5 py-4">
                <h3 style={{ fontFamily: "'Playfair Display', serif" }} className="text-white font-bold text-base leading-snug mb-2 line-clamp-2 group-hover:text-[#D5001C]/90 transition-colors">
                  {news.title}
                </h3>
                <p className="text-white/40 text-sm line-clamp-2 mb-4 leading-relaxed">{news.excerpt}</p>
                <div className="flex items-center justify-between pt-3 border-t border-white/8">
                  <div className="flex items-center gap-1.5 text-white/25 text-xs">
                    <FiCalendar size={10} className="text-[#D5001C]" />
                    <span>{news.date}</span>
                  </div>
                  <button className="flex items-center gap-1 text-[#D5001C] text-xs tracking-widest uppercase font-semibold hover:gap-2 transition-all">
                    O'qish <FiArrowRight size={11} />
                  </button>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};

export default News;
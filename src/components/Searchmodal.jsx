import { useState, useEffect, useRef } from "react";
import { FiSearch, FiX, FiArrowRight, FiClock, FiTrendingUp } from "react-icons/fi";
import useStore from "../store/useStore";

const MODELS = [
  { id: "911", name: "Porsche 911", category: "Sport", price: "$115,000", page: "posts", image: "https://a.storyblok.com/f/338913/1280x1024/b7f3c2d593/911-desktop_5-4.jpg" },
  { id: "taycan", name: "Porsche Taycan", category: "Elektr", price: "$135,000", page: "posts", image: "https://a.storyblok.com/f/338913/1280x1024/e178b7a186/taycan-desktop_5-4.jpg" },
  { id: "cayenne", name: "Porsche Cayenne", category: "SUV", price: "$95,000", page: "posts", image: "https://a.storyblok.com/f/338913/1280x1024/7c9b828a7a/denver-range-fallback-desktop-var2.jpg" },
  { id: "macan", name: "Porsche Macan", category: "SUV", price: "$75,000", page: "posts", image: "https://a.storyblok.com/f/338913/1280x1024/3debd00362/macan-desktop_5-4.jpg" },
  { id: "panamera", name: "Porsche Panamera", category: "Sedan", price: "$105,000", page: "posts", image: "https://a.storyblok.com/f/338913/1280x1024/c06fa1b962/panamera-desktop_5-4.jpg" },
  { id: "718", name: "Porsche 718", category: "Sport", price: "$85,000", page: "posts", image: "https://a.storyblok.com/f/338913/1280x1024/f8ad827507/718-desktop_5-4.jpg" },
];

const PAGES = [
  { name: "Models",     page: "posts",      desc: "Barcha Porsche modellari" },
  { name: "Experience", page: "experience", desc: "Test drive va tadbirlar" },
  { name: "Services",   page: "services",   desc: "Texnik xizmat va paketlar" },
  { name: "News",       page: "news",       desc: "So'nggi yangiliklar" },
  { name: "Dealers",    page: "dealers",    desc: "Dilerlik markazlari" },
];

const TRENDING = ["Porsche 911 GT3", "Taycan Turbo S", "Cayenne Electric", "Test Drive"];

const SearchModal = ({ onClose }) => {
  const [query, setQuery] = useState("");
  const [recent, setRecent] = useState(
    JSON.parse(localStorage.getItem("porsche_recent") || "[]")
  );
  const inputRef = useRef(null);
  const { setPage, setSelectedPost } = useStore();

  useEffect(() => {
    setTimeout(() => inputRef.current?.focus(), 100);
    const handleKey = (e) => { if (e.key === "Escape") onClose(); };
    window.addEventListener("keydown", handleKey);
    return () => window.removeEventListener("keydown", handleKey);
  }, []);

  const saveRecent = (text) => {
    const updated = [text, ...recent.filter((r) => r !== text)].slice(0, 5);
    localStorage.setItem("porsche_recent", JSON.stringify(updated));
    setRecent(updated);
  };

  const filteredModels = query.length > 0
    ? MODELS.filter((m) =>
        m.name.toLowerCase().includes(query.toLowerCase()) ||
        m.category.toLowerCase().includes(query.toLowerCase())
      )
    : [];

  const filteredPages = query.length > 0
    ? PAGES.filter((p) =>
        p.name.toLowerCase().includes(query.toLowerCase()) ||
        p.desc.toLowerCase().includes(query.toLowerCase())
      )
    : [];

  const hasResults = filteredModels.length > 0 || filteredPages.length > 0;

  const handleModelClick = (model) => {
    saveRecent(model.name);
    setSelectedPost({
      id: model.id,
      name: model.name,
      category: model.category,
      price: model.price.replace("$", "").replace(",", ""),
      image: model.image,
      description: `${model.name} — Porsche ning eng zo'r modellaridan biri.`,
    });
    onClose();
  };

  const handlePageClick = (p) => {
    saveRecent(p.name);
    setPage(p.page);
    onClose();
  };

  const handleTrending = (term) => {
    setQuery(term);
    saveRecent(term);
  };

  const clearRecent = () => {
    localStorage.removeItem("porsche_recent");
    setRecent([]);
  };

  return (
    <div className="fixed inset-0 z-[300] flex items-start justify-center pt-20 px-4">
      {/* Backdrop */}
      <div className="absolute inset-0 bg-black/80 backdrop-blur-md" onClick={onClose} />

      {/* Modal */}
      <div className="relative w-full max-w-2xl bg-[#0E1418] border border-white/10 rounded-sm shadow-2xl overflow-hidden">
        {/* Search input */}
        <div className="flex items-center gap-3 px-5 py-4 border-b border-white/10">
          <FiSearch className="text-[#D5001C] flex-shrink-0" size={20} />
          <input
            ref={inputRef}
            value={query}
            onChange={(e) => setQuery(e.target.value)}
            placeholder="Qidirish: model, xizmat, yangilik..."
            className="flex-1 bg-transparent text-white placeholder-white/25 text-base outline-none"
          />
          {query && (
            <button onClick={() => setQuery("")} className="text-white/30 hover:text-white transition-colors p-1">
              <FiX size={18} />
            </button>
          )}
          <button
            onClick={onClose}
            className="text-white/30 hover:text-white transition-colors text-xs tracking-widest uppercase border border-white/10 px-2 py-1 rounded-sm"
          >
            Esc
          </button>
        </div>

        {/* Results */}
        <div className="max-h-[60vh] overflow-y-auto">

          {/* Qidiruv natijalari */}
          {query.length > 0 && (
            <div className="p-4">
              {!hasResults ? (
                <div className="text-center py-10">
                  <div className="text-4xl mb-3">🔍</div>
                  <p className="text-white/30 text-sm tracking-widest uppercase">
                    "{query}" bo'yicha hech narsa topilmadi
                  </p>
                </div>
              ) : (
                <div className="space-y-5">
                  {/* Modellar */}
                  {filteredModels.length > 0 && (
                    <div>
                      <p className="text-white/25 text-xs tracking-widest uppercase mb-3 px-1">Modellar</p>
                      <div className="space-y-1">
                        {filteredModels.map((model) => (
                          <button
                            key={model.id}
                            onClick={() => handleModelClick(model)}
                            className="w-full flex items-center gap-4 px-3 py-2.5 rounded-sm hover:bg-white/5 transition-all group text-left"
                          >
                            <div
                              className="w-12 h-9 rounded-sm bg-cover bg-center flex-shrink-0 border border-white/10"
                              style={{ backgroundImage: `url(${model.image})` }}
                            />
                            <div className="flex-1 min-w-0">
                              <p className="text-white text-sm font-semibold group-hover:text-[#D5001C] transition-colors">
                                {model.name}
                              </p>
                              <p className="text-white/30 text-xs">{model.category} · {model.price}</p>
                            </div>
                            <FiArrowRight size={14} className="text-white/20 group-hover:text-[#D5001C] transition-colors flex-shrink-0" />
                          </button>
                        ))}
                      </div>
                    </div>
                  )}

                  {/* Sahifalar */}
                  {filteredPages.length > 0 && (
                    <div>
                      <p className="text-white/25 text-xs tracking-widest uppercase mb-3 px-1">Sahifalar</p>
                      <div className="space-y-1">
                        {filteredPages.map((p) => (
                          <button
                            key={p.page}
                            onClick={() => handlePageClick(p)}
                            className="w-full flex items-center gap-4 px-3 py-2.5 rounded-sm hover:bg-white/5 transition-all group text-left"
                          >
                            <div className="w-8 h-8 bg-[#D5001C]/10 rounded-sm flex items-center justify-center flex-shrink-0">
                              <FiSearch size={13} className="text-[#D5001C]" />
                            </div>
                            <div className="flex-1">
                              <p className="text-white text-sm font-semibold group-hover:text-[#D5001C] transition-colors">{p.name}</p>
                              <p className="text-white/30 text-xs">{p.desc}</p>
                            </div>
                            <FiArrowRight size={14} className="text-white/20 group-hover:text-[#D5001C] transition-colors" />
                          </button>
                        ))}
                      </div>
                    </div>
                  )}
                </div>
              )}
            </div>
          )}

          {/* Bo'sh holat */}
          {query.length === 0 && (
            <div className="p-4 space-y-6">
              {/* So'nggi qidiruvlar */}
              {recent.length > 0 && (
                <div>
                  <div className="flex items-center justify-between mb-3 px-1">
                    <p className="text-white/25 text-xs tracking-widest uppercase flex items-center gap-1.5">
                      <FiClock size={11} /> So'nggi qidiruvlar
                    </p>
                    <button onClick={clearRecent} className="text-white/20 hover:text-[#D5001C] text-xs tracking-widest uppercase transition-colors">
                      Tozalash
                    </button>
                  </div>
                  <div className="flex flex-wrap gap-2">
                    {recent.map((r) => (
                      <button
                        key={r}
                        onClick={() => setQuery(r)}
                        className="flex items-center gap-1.5 bg-white/5 hover:bg-white/10 border border-white/8 hover:border-white/20 text-white/50 hover:text-white text-xs px-3 py-1.5 rounded-sm transition-all"
                      >
                        <FiClock size={10} /> {r}
                      </button>
                    ))}
                  </div>
                </div>
              )}

              {/* Trending */}
              <div>
                <p className="text-white/25 text-xs tracking-widest uppercase mb-3 px-1 flex items-center gap-1.5">
                  <FiTrendingUp size={11} /> Mashhur qidiruvlar
                </p>
                <div className="flex flex-wrap gap-2">
                  {TRENDING.map((t) => (
                    <button
                      key={t}
                      onClick={() => handleTrending(t)}
                      className="flex items-center gap-1.5 bg-[#D5001C]/10 hover:bg-[#D5001C]/20 border border-[#D5001C]/20 hover:border-[#D5001C]/40 text-[#D5001C]/80 hover:text-[#D5001C] text-xs px-3 py-1.5 rounded-sm transition-all"
                    >
                      <FiTrendingUp size={10} /> {t}
                    </button>
                  ))}
                </div>
              </div>

              {/* Barcha modellar */}
              <div>
                <p className="text-white/25 text-xs tracking-widest uppercase mb-3 px-1">Barcha modellar</p>
                <div className="grid grid-cols-2 gap-2">
                  {MODELS.map((model) => (
                    <button
                      key={model.id}
                      onClick={() => handleModelClick(model)}
                      className="flex items-center gap-3 px-3 py-2 rounded-sm bg-white/3 hover:bg-white/8 border border-white/5 hover:border-[#D5001C]/30 transition-all group text-left"
                    >
                      <div
                        className="w-10 h-8 rounded-sm bg-cover bg-center flex-shrink-0"
                        style={{ backgroundImage: `url(${model.image})` }}
                      />
                      <div className="min-w-0">
                        <p className="text-white text-xs font-semibold group-hover:text-[#D5001C] transition-colors line-clamp-1">{model.name}</p>
                        <p className="text-white/25 text-[10px]">{model.price}</p>
                      </div>
                    </button>
                  ))}
                </div>
              </div>
            </div>
          )}
        </div>

        {/* Footer */}
        <div className="flex items-center justify-between px-5 py-3 border-t border-white/8 bg-white/2">
          <p className="text-white/20 text-xs">Enter — ochish · Esc — yopish</p>
          <div className="flex items-center gap-1.5">
            <div className="w-5 h-5 bg-white/5 border border-white/10 rounded-sm flex items-center justify-center">
              <span className="text-white/30 text-[9px]">↑</span>
            </div>
            <div className="w-5 h-5 bg-white/5 border border-white/10 rounded-sm flex items-center justify-center">
              <span className="text-white/30 text-[9px]">↓</span>
            </div>
            <span className="text-white/20 text-xs ml-1">navigatsiya</span>
          </div>
        </div>
      </div>
    </div>
  );
};

export default SearchModal;
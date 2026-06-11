import { useState } from "react";
import { FiMapPin, FiPhone, FiMail, FiClock, FiArrowRight, FiSearch, FiExternalLink } from "react-icons/fi";

const DEALERS = [
  {
    id: 1,
    city: "Toshkent",
    name: "Porsche Center Toshkent",
    address: "Amir Temur ko'chasi 108, Yunusobod tumani",
    phone: "+998 71 200 11 22",
    email: "tashkent@porsche.uz",
    hours: { weekday: "09:00 – 19:00", saturday: "10:00 – 17:00", sunday: "Dam olish" },
    services: ["Yangi avtomobil savdosi", "Servis markaz", "Ehtiyot qismlar", "Test Drive"],
    map: "https://maps.google.com/?q=41.299496,69.240073",
    image: "https://a.storyblok.com/f/338913/1280x1024/b7f3c2d593/911-desktop_5-4.jpg",
    region: "Toshkent",
  },
  {
    id: 2,
    city: "Toshkent Chilonzor",
    name: "Porsche Service Chilonzor",
    address: "Bunyodkor ko'chasi 12, Chilonzor tumani",
    phone: "+998 71 255 33 44",
    email: "chilonzor@porsche.uz",
    hours: { weekday: "08:00 – 18:00", saturday: "09:00 – 15:00", sunday: "Dam olish" },
    services: ["Servis markaz", "Ehtiyot qismlar", "Kuzov ta'mirlash"],
    map: "https://maps.google.com/?q=41.284396,69.204073",
    image: "https://a.storyblok.com/f/338913/1280x1024/e178b7a186/taycan-desktop_5-4.jpg",
    region: "Toshkent",
  },
  {
    id: 3,
    city: "Samarqand",
    name: "Porsche Center Samarqand",
    address: "Registon ko'chasi 45",
    phone: "+998 66 233 44 55",
    email: "samarkand@porsche.uz",
    hours: { weekday: "09:00 – 18:00", saturday: "10:00 – 16:00", sunday: "Dam olish" },
    services: ["Yangi avtomobil savdosi", "Servis markaz", "Test Drive"],
    map: "https://maps.google.com/?q=39.654522,66.975574",
    image: "https://a.storyblok.com/f/338913/1280x1024/7c9b828a7a/denver-range-fallback-desktop-var2.jpg",
    region: "Samarqand",
  },
  {
    id: 4,
    city: "Namangan",
    name: "Porsche Center Namangan",
    address: "Mustaqillik prospekti 17",
    phone: "+998 69 244 33 11",
    email: "namangan@porsche.uz",
    hours: { weekday: "09:00 – 18:00", saturday: "10:00 – 15:00", sunday: "Dam olish" },
    services: ["Yangi avtomobil savdosi", "Servis markaz"],
    map: "https://maps.google.com/?q=41.004297,71.642793",
    image: "https://a.storyblok.com/f/338913/1280x1024/3debd00362/macan-desktop_5-4.jpg",
    region: "Namangan",
  },
  {
    id: 5,
    city: "Buxoro",
    name: "Porsche Center Buxoro",
    address: "Mustaqillik ko'chasi 88",
    phone: "+998 65 221 55 66",
    email: "bukhara@porsche.uz",
    hours: { weekday: "09:00 – 18:00", saturday: "10:00 – 15:00", sunday: "Dam olish" },
    services: ["Yangi avtomobil savdosi", "Servis markaz"],
    map: "https://maps.google.com/?q=39.767887,64.421631",
    image: "https://a.storyblok.com/f/338913/1280x1024/c06fa1b962/panamera-desktop_5-4.jpg",
    region: "Buxoro",
  },
  {
    id: 6,
    city: "Andijon",
    name: "Porsche Center Andijon",
    address: "Navoi ko'chasi 34",
    phone: "+998 74 222 77 88",
    email: "andijan@porsche.uz",
    hours: { weekday: "09:00 – 18:00", saturday: "10:00 – 15:00", sunday: "Dam olish" },
    services: ["Yangi avtomobil savdosi", "Servis markaz"],
    map: "https://maps.google.com/?q=40.782788,72.344464",
    image: "https://a.storyblok.com/f/338913/1280x1024/f8ad827507/718-desktop_5-4.jpg",
    region: "Andijon",
  },
];

const REGIONS = ["Barchasi", "Toshkent", "Samarqand", "Namangan", "Buxoro", "Andijon"];

const Dealers = () => {
  const [search, setSearch] = useState("");
  const [activeRegion, setActiveRegion] = useState("Barchasi");
  const [selected, setSelected] = useState(DEALERS[0]);

  const filtered = DEALERS.filter((d) => {
    const matchSearch = !search ||
      d.city.toLowerCase().includes(search.toLowerCase()) ||
      d.name.toLowerCase().includes(search.toLowerCase());
    const matchRegion = activeRegion === "Barchasi" || d.region === activeRegion;
    return matchSearch && matchRegion;
  });

  return (
    <div className="min-h-screen bg-[#080C0F] pt-16">
      {/* Hero */}
      <div className="relative h-60 flex items-center overflow-hidden">
        <div className="absolute inset-0 bg-cover bg-center opacity-25" style={{ backgroundImage: "url(https://a.storyblok.com/f/338913/1280x1024/b7f3c2d593/911-desktop_5-4.jpg)" }} />
        <div className="absolute inset-0 bg-gradient-to-r from-[#080C0F] via-[#080C0F]/80 to-transparent" />
        <div className="relative max-w-screen-xl mx-auto px-6 md:px-12 w-full">
          <p className="text-[#D5001C] text-xs tracking-[0.5em] uppercase font-semibold mb-3">O'zbekiston</p>
          <h1 style={{ fontFamily: "'Playfair Display', serif" }} className="text-white text-5xl md:text-6xl font-bold mb-3">
            Dilerlik Markazlari
          </h1>
          <p className="text-white/40 text-sm">{DEALERS.length} ta rasmiy Porsche markazi</p>
        </div>
      </div>

      <div className="max-w-screen-xl mx-auto px-6 md:px-12 py-10">
        {/* Search + filter */}
        <div className="flex flex-col md:flex-row gap-4 items-start md:items-center mb-8">
          <div className="relative w-full md:w-72">
            <FiSearch className="absolute left-3 top-1/2 -translate-y-1/2 text-white/30" size={15} />
            <input
              value={search}
              onChange={(e) => setSearch(e.target.value)}
              placeholder="Shahar yoki markaz nomi..."
              className="w-full bg-white/5 border border-white/10 focus:border-[#D5001C]/50 text-white placeholder-white/20 pl-9 pr-4 py-2.5 rounded-sm text-sm outline-none transition-colors"
            />
          </div>
          <div className="flex items-center gap-2 flex-wrap">
            {REGIONS.map((r) => (
              <button
                key={r}
                onClick={() => setActiveRegion(r)}
                className={`px-4 py-1.5 text-xs tracking-widest uppercase rounded-sm border font-semibold transition-all ${
                  activeRegion === r
                    ? "bg-[#D5001C] border-[#D5001C] text-white"
                    : "border-white/15 text-white/50 hover:border-white/40 hover:text-white"
                }`}
              >
                {r}
              </button>
            ))}
          </div>
        </div>

        {/* Layout: list + detail */}
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
          {/* List */}
          <div className="space-y-3">
            {filtered.length === 0 ? (
              <div className="text-center py-12 text-white/25 text-sm">Hech narsa topilmadi</div>
            ) : (
              filtered.map((dealer) => (
                <div
                  key={dealer.id}
                  onClick={() => setSelected(dealer)}
                  className={`cursor-pointer rounded-sm p-4 border transition-all duration-200 ${
                    selected?.id === dealer.id
                      ? "bg-[#D5001C]/10 border-[#D5001C]/50"
                      : "bg-[#0E1418] border-white/8 hover:border-white/25"
                  }`}
                >
                  <div className="flex items-start justify-between gap-2">
                    <div>
                      <p className="text-white font-semibold text-sm">{dealer.name}</p>
                      <div className="flex items-center gap-1.5 text-white/35 text-xs mt-1">
                        <FiMapPin size={10} className="text-[#D5001C] flex-shrink-0" />
                        <span className="line-clamp-1">{dealer.address}</span>
                      </div>
                      <div className="flex items-center gap-1.5 text-white/35 text-xs mt-1">
                        <FiPhone size={10} className="text-[#D5001C] flex-shrink-0" />
                        <span>{dealer.phone}</span>
                      </div>
                    </div>
                    <FiArrowRight size={14} className={`flex-shrink-0 mt-1 transition-colors ${selected?.id === dealer.id ? "text-[#D5001C]" : "text-white/20"}`} />
                  </div>
                </div>
              ))
            )}
          </div>

          {/* Detail card */}
          {selected && (
            <div className="lg:col-span-2 bg-[#0E1418] border border-white/10 rounded-sm overflow-hidden">
              <div className="relative h-52 overflow-hidden">
                <img src={selected.image} alt={selected.name} className="w-full h-full object-cover opacity-70" />
                <div className="absolute inset-0 bg-gradient-to-t from-[#0E1418] via-transparent to-transparent" />
                <div className="absolute bottom-4 left-6">
                  <h2 style={{ fontFamily: "'Playfair Display', serif" }} className="text-white font-bold text-2xl">{selected.name}</h2>
                  <p className="text-white/40 text-sm">{selected.city}</p>
                </div>
              </div>

              <div className="p-6 grid grid-cols-1 md:grid-cols-2 gap-6">
                {/* Kontakt */}
                <div className="space-y-3">
                  <p className="text-white/30 text-xs tracking-widest uppercase mb-3">Kontakt</p>
                  <div className="flex items-start gap-3">
                    <FiMapPin size={15} className="text-[#D5001C] mt-0.5 flex-shrink-0" />
                    <p className="text-white/60 text-sm leading-relaxed">{selected.address}</p>
                  </div>
                  <div className="flex items-center gap-3">
                    <FiPhone size={15} className="text-[#D5001C] flex-shrink-0" />
                    <a href={`tel:${selected.phone}`} className="text-white/60 hover:text-white text-sm transition-colors">{selected.phone}</a>
                  </div>
                  <div className="flex items-center gap-3">
                    <FiMail size={15} className="text-[#D5001C] flex-shrink-0" />
                    <a href={`mailto:${selected.email}`} className="text-white/60 hover:text-white text-sm transition-colors">{selected.email}</a>
                  </div>
                </div>

                {/* Ish vaqti */}
                <div className="space-y-3">
                  <p className="text-white/30 text-xs tracking-widest uppercase mb-3">Ish vaqti</p>
                  {[
                    { label: "Dush – Juma", value: selected.hours.weekday },
                    { label: "Shanba", value: selected.hours.saturday },
                    { label: "Yakshanba", value: selected.hours.sunday },
                  ].map((h) => (
                    <div key={h.label} className="flex items-center justify-between">
                      <div className="flex items-center gap-2 text-white/40 text-sm">
                        <FiClock size={12} className="text-[#D5001C]" />
                        <span>{h.label}</span>
                      </div>
                      <span className={`text-sm font-semibold ${h.value === "Dam olish" ? "text-white/25" : "text-white"}`}>{h.value}</span>
                    </div>
                  ))}
                </div>

                {/* Xizmatlar */}
                <div>
                  <p className="text-white/30 text-xs tracking-widest uppercase mb-3">Xizmatlar</p>
                  <div className="flex flex-wrap gap-2">
                    {selected.services.map((s) => (
                      <span key={s} className="bg-white/5 border border-white/10 text-white/50 text-xs px-2.5 py-1 rounded-sm">
                        {s}
                      </span>
                    ))}
                  </div>
                </div>

                {/* Tugmalar */}
                <div className="flex flex-col gap-3 justify-end">
                  <a
                    href={selected.map}
                    target="_blank"
                    rel="noreferrer"
                    className="flex items-center justify-center gap-2 bg-[#D5001C] hover:bg-[#b0001a] text-white py-3 rounded-sm text-sm tracking-widest uppercase font-bold transition-all"
                  >
                    <FiMapPin size={14} /> Xaritada ko'rish
                  </a>
                  <a
                    href={`tel:${selected.phone}`}
                    className="flex items-center justify-center gap-2 border border-white/15 hover:border-white/40 text-white/60 hover:text-white py-3 rounded-sm text-sm tracking-widest uppercase transition-all"
                  >
                    <FiPhone size={14} /> Qo'ng'iroq
                  </a>
                </div>
              </div>
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

export default Dealers;
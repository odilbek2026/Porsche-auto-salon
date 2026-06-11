import { FiTool, FiShield, FiZap, FiPhone, FiArrowRight, FiCheck, FiClock } from "react-icons/fi";

const SERVICES = [
  {
    icon: FiTool,
    title: "Texnik Xizmat",
    desc: "Porsche sertifikatlangan ustalar tomonidan original ehtiyot qismlar bilan texnik ko'rik va ta'mirlash.",
    items: ["Yog' almashtirish", "Tormoz tizimi", "Dvigatel diagnostika", "Shina almashtirish"],
    price: "dan $150",
    time: "1-3 soat",
    color: "text-blue-400",
    bg: "bg-blue-400/10",
    border: "border-blue-400/20",
  },
  {
    icon: FiShield,
    title: "Kafolat Xizmati",
    desc: "Barcha yangi Porsche modellari 3 yil yoki 100,000 km kafolat bilan ta'minlanadi. Kafolat davomida barcha xizmatlar bepul.",
    items: ["3 yil kafolat", "100,000 km", "Bepul ta'mirlash", "24/7 qo'llab-quvvatlash"],
    price: "Bepul",
    time: "Doimiy",
    color: "text-green-400",
    bg: "bg-green-400/10",
    border: "border-green-400/20",
  },
  {
    icon: FiZap,
    title: "Elektr Avtomobil Xizmati",
    desc: "Taycan va elektr Macan uchun maxsus xizmat. Batareya diagnostika, zaryad tizimi tekshiruvi va software yangilash.",
    items: ["Batareya diagnostika", "Zaryad tizimi", "Software yangilash", "Regeneratsiya sozlash"],
    price: "dan $200",
    time: "2-4 soat",
    color: "text-yellow-400",
    bg: "bg-yellow-400/10",
    border: "border-yellow-400/20",
  },
];

const PACKAGES = [
  { name: "Basic", price: "$299", period: "yilda 1 marta", features: ["Yog' va filtr almashtirish", "Tormoz tekshiruvi", "Shina rotatsiyasi", "Diagnostika skaneri"], popular: false },
  { name: "Premium", price: "$599", period: "yilda 2 marta", features: ["Basic + hamma narsa", "Konditsioner servis", "Salonni tozalash", "Kripton plёnka", "Prioritet navbat"], popular: true },
  { name: "Elite", price: "$1,299", period: "yilda 4 marta", features: ["Premium + hamma narsa", "Detal bo'yash", "Temir qoplamasi", "Uy boshiga kelish", "VIP lounge", "Bepul evakuator"], popular: false },
];

const Services = () => {
  return (
    <div className="min-h-screen bg-[#080C0F] pt-16">
      {/* Hero */}
      <div className="relative h-72 flex items-center overflow-hidden">
        <div
          className="absolute inset-0 bg-cover bg-center opacity-30"
          style={{ backgroundImage: "url(https://a.storyblok.com/f/338913/1280x1024/b7f3c2d593/911-desktop_5-4.jpg)" }}
        />
        <div className="absolute inset-0 bg-gradient-to-r from-[#080C0F] via-[#080C0F]/80 to-transparent" />
        <div className="relative max-w-screen-xl mx-auto px-6 md:px-12 w-full">
          <p className="text-[#D5001C] text-xs tracking-[0.5em] uppercase font-semibold mb-3">Porsche Service</p>
          <h1 style={{ fontFamily: "'Playfair Display', serif" }} className="text-white text-5xl md:text-6xl font-bold mb-4">
            Xizmatlar
          </h1>
          <p className="text-white text-base max-w-lg leading-relaxed">
            Porsche sertifikatlangan mutaxassislar, original ehtiyot qismlar va zamonaviy uskunalar bilan avtomobilingizni mukammal holatda saqlang.
          </p>
        </div>
      </div>

      {/* Services cards */}
      <div className="max-w-screen-xl mx-auto px-6 md:px-12 py-14">
        <p className="text-[#D5001C] text-xs tracking-[0.4em] uppercase font-semibold mb-2">Xizmat turlari</p>
        <h2 style={{ fontFamily: "'Playfair Display', serif" }} className="text-white text-3xl font-bold mb-10">
          Nima taklif qilamiz
        </h2>
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-16">
          {SERVICES.map((s) => (
            <div key={s.title} className={`bg-[#0E1418] border ${s.border} rounded-sm p-6 hover:-translate-y-1 hover:shadow-xl transition-all duration-300`}>
              <div className={`w-12 h-12 ${s.bg} rounded-sm flex items-center justify-center mb-4`}>
                <s.icon className={s.color} size={22} />
              </div>
              <h3 style={{ fontFamily: "'Playfair Display', serif" }} className="text-white font-bold text-xl mb-3">{s.title}</h3>
              <p className="text-white/45 text-sm leading-relaxed mb-5">{s.desc}</p>
              <ul className="space-y-2 mb-5">
                {s.items.map((item) => (
                  <li key={item} className="flex items-center gap-2 text-white/60 text-sm">
                    <FiCheck size={12} className="text-[#D5001C] flex-shrink-0" />
                    {item}
                  </li>
                ))}
              </ul>
              <div className="flex items-center justify-between pt-4 border-t border-white/8">
                <div>
                  <p className="text-white font-bold text-sm">{s.price}</p>
                  <div className="flex items-center gap-1 text-white/25 text-xs mt-0.5">
                    <FiClock size={10} />
                    <span>{s.time}</span>
                  </div>
                </div>
                <button className="flex items-center gap-1.5 text-[#D5001C] text-xs tracking-widest uppercase font-semibold hover:gap-2.5 transition-all">
                  Band qilish <FiArrowRight size={11} />
                </button>
              </div>
            </div>
          ))}
        </div>

        {/* Packages */}
        <p className="text-[#D5001C] text-xs tracking-[0.4em] uppercase font-semibold mb-2">Paketlar</p>
        <h2 style={{ fontFamily: "'Playfair Display', serif" }} className="text-white text-3xl font-bold mb-10">
          Xizmat paketlari
        </h2>
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-16">
          {PACKAGES.map((pkg) => (
            <div key={pkg.name} className={`relative bg-[#0E1418] rounded-sm overflow-hidden transition-all duration-300 ${pkg.popular ? "border-2 border-[#D5001C] shadow-2xl shadow-[#D5001C]/20 scale-105" : "border border-white/10 hover:-translate-y-1"}`}>
              {pkg.popular && (
                <div className="bg-[#D5001C] text-white text-xs tracking-widest uppercase font-bold text-center py-2">
                  Eng mashhur
                </div>
              )}
              <div className="p-6">
                <h3 style={{ fontFamily: "'Playfair Display', serif" }} className="text-white font-bold text-2xl mb-1">{pkg.name}</h3>
                <p className="text-white/30 text-xs tracking-widest uppercase mb-4">{pkg.period}</p>
                <div className="mb-6">
                  <span style={{ fontFamily: "'Playfair Display', serif" }} className="text-white text-4xl font-bold">{pkg.price}</span>
                  <span className="text-white/30 text-sm ml-2">/ paket</span>
                </div>
                <ul className="space-y-3 mb-6">
                  {pkg.features.map((f) => (
                    <li key={f} className="flex items-center gap-2.5 text-white/60 text-sm">
                      <FiCheck size={13} className="text-green-400 flex-shrink-0" />
                      {f}
                    </li>
                  ))}
                </ul>
                <button className={`w-full py-3 rounded-sm text-sm tracking-widest uppercase font-bold transition-all ${pkg.popular ? "bg-[#D5001C] hover:bg-[#b0001a] text-white shadow-lg shadow-red-900/30" : "border border-white/15 hover:border-white/40 text-white/70 hover:text-white"}`}>
                  Tanlash
                </button>
              </div>
            </div>
          ))}
        </div>

        {/* CTA qo'ng'iroq */}
        <div className="bg-[#0E1418] border border-white/8 rounded-sm p-8 flex flex-col md:flex-row items-center justify-between gap-6">
          <div>
            <h3 style={{ fontFamily: "'Playfair Display', serif" }} className="text-white text-2xl font-bold mb-2">Savolingiz bormi?</h3>
            <p className="text-white/40 text-sm">Mutaxassislarimiz sizga eng mos xizmatni tavsiya qiladi.</p>
          </div>
          <a
            href="tel:+998712001122"
            className="flex items-center gap-3 bg-[#D5001C] hover:bg-[#b0001a] text-white px-8 py-3.5 rounded-sm text-sm tracking-widest uppercase font-bold transition-all shadow-lg shadow-red-900/30 flex-shrink-0"
          >
            <FiPhone size={16} /> +998 71 200 11 22
          </a>
        </div>
      </div>
    </div>
  );
};

export default Services;
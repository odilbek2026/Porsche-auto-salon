import { useState } from "react";
import { FiArrowRight, FiPlay, FiMapPin, FiCalendar, FiUsers } from "react-icons/fi";

const EXPERIENCES = [
  {
    id: 1,
    title: "Porsche Experience Center",
    subtitle: "Test Drive",
    description: "Professional instruktorlar bilan Porsche 911, Taycan va Cayenne modellarini haydab ko'ring. Maxsus trekning har bir burchagida yangi his-tuyg'ular sizni kutmoqda.",
    image: "https://a.storyblok.com/f/338913/1280x1024/b7f3c2d593/911-desktop_5-4.jpg",
    tag: "Test Drive",
    duration: "2 soat",
    participants: "1-2 kishi",
  },
  {
    id: 2,
    title: "Porsche Museum Tour",
    subtitle: "Tarix va Meros",
    description: "Stuttgart Zuffenhausen zavodida joylashgan Porsche muzeyida 80 yillik tarix bilan tanishing. 80 dan ortiq eksponat, noyob prototiplar va Formula 1 mashinalari.",
    image: "https://a.storyblok.com/f/338913/1280x1024/e178b7a186/taycan-desktop_5-4.jpg",
    tag: "Muzey",
    duration: "3 soat",
    participants: "Guruh",
  },
  {
    id: 3,
    title: "Track Day Experience",
    subtitle: "Racing",
    description: "Professional treklarda Porsche ning eng tezkor modellarini sinab ko'ring. GT3 RS dan Taycan Turbo S gacha — cheksiz adrenalin va mukammal boshqaruv tajribasi.",
    image: "https://a.storyblok.com/f/338913/1280x1024/7c9b828a7a/denver-range-fallback-desktop-var2.jpg",
    tag: "Racing",
    duration: "1 kun",
    participants: "Max 8 kishi",
  },
  {
    id: 4,
    title: "Porsche Driving School",
    subtitle: "Ta'lim",
    description: "Professional haydovchilik maktabida xavfsiz haydash, ekstremal sharoitlarda boshqarish va sport haydovchiligi texnikalarini o'rganing.",
    image: "https://a.storyblok.com/f/338913/1280x1024/3debd00362/macan-desktop_5-4.jpg",
    tag: "Ta'lim",
    duration: "2 kun",
    participants: "4-6 kishi",
  },
  {
    id: 5,
    title: "Porsche Road Trip",
    subtitle: "Sayohat",
    description: "O'zbekistonning go'zal tog' va cho'l yo'llari bo'ylab Porsche bilan unutilmas sayohat. Toshkentdan Samarqandga, tog' o'tish yo'llari orqali.",
    image: "https://a.storyblok.com/f/338913/1280x1024/c06fa1b962/panamera-desktop_5-4.jpg",
    tag: "Sayohat",
    duration: "2-3 kun",
    participants: "Guruh",
  },
  {
    id: 6,
    title: "VIP Delivery Experience",
    subtitle: "Maxsus",
    description: "Yangi Porsche ingizni zavod to'g'ridan to'g'ri qabul qiling. Stuttgart da yoki mahalliy dilerlikda VIP marosim bilan topshirish — unutilmas lahza.",
    image: "https://a.storyblok.com/f/338913/1280x1024/f8ad827507/718-desktop_5-4.jpg",
    tag: "VIP",
    duration: "Yarim kun",
    participants: "Shaxsiy",
  },
];

const EVENTS = [
  { date: "15 Iyul", title: "Porsche Club O'zbekiston — Yig'ilish", location: "Toshkent, Yunusobod" },
  { date: "22 Iyul", title: "Test Drive: Yangi Taycan 2025", location: "Porsche Center Toshkent" },
  { date: "5 Avgust", title: "Porsche Road Trip: Toshkent–Samarqand", location: "Yo'lda" },
  { date: "18 Avgust", title: "Track Day: Toshkent Autodrom", location: "Toshkent Avtodrom" },
];

const Experience = () => {
  const [selected, setSelected] = useState(null);

  return (
    <div className="min-h-screen bg-[#080C0F] pt-16">
      {/* Hero */}
      <div className="relative h-[65vh] flex items-end overflow-hidden">
        <div
          className="absolute inset-0 bg-cover bg-center"
          style={{ backgroundImage: "url(https://a.storyblok.com/f/338913/3840x2161/c22e19591f/e4-ww-cayenne-coupe-v2-desktop.jpg)" }}
        />
        <div className="absolute inset-0 bg-gradient-to-t from-[#080C0F] via-[#080C0F]/40 to-transparent" />
        <div className="relative w-full max-w-screen-xl mx-auto px-6 md:px-12 pb-14">
          <p className="text-[#D5001C] text-xs tracking-[0.5em] uppercase font-semibold mb-3">
            Porsche World
          </p>
          <h1
            style={{ fontFamily: "'Playfair Display', serif" }}
            className="text-white text-5xl md:text-7xl font-bold mb-4 leading-tight"
          >
            Experience<br />the Legend.
          </h1>
          <p className="text-white/50 text-lg max-w-xl leading-relaxed">
            Porsche bilan bog'liq eng yaxshi tajribalar — haydashdan zavq, muzey safaridan to VIP topshirishgacha.
          </p>
        </div>
        {/* Play button */}
        <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2">
          <button className="w-16 h-16 bg-white/10 backdrop-blur-sm hover:bg-[#D5001C] border border-white/30 rounded-full flex items-center justify-center transition-all duration-300 group">
            <FiPlay className="text-white ml-1" size={22} />
          </button>
        </div>
      </div>

      {/* Experiences grid */}
      <div className="max-w-screen-xl mx-auto px-6 md:px-12 py-16">
        <div className="flex items-end justify-between mb-10">
          <div>
            <p className="text-[#D5001C] text-xs tracking-[0.4em] uppercase font-semibold mb-2">Tajribalar</p>
            <h2 style={{ fontFamily: "'Playfair Display', serif" }} className="text-white text-3xl md:text-4xl font-bold">
              Siz uchun eng yaxshisi
            </h2>
          </div>
          <span className="text-white/20 text-sm hidden md:block">{EXPERIENCES.length} ta tajriba</span>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {EXPERIENCES.map((exp) => (
            <div
              key={exp.id}
              onClick={() => setSelected(selected?.id === exp.id ? null : exp)}
              className="group cursor-pointer bg-[#0E1418] border border-white/8 rounded-sm overflow-hidden hover:border-[#D5001C]/40 hover:-translate-y-1 hover:shadow-2xl hover:shadow-[#D5001C]/10 transition-all duration-300"
            >
              <div className="relative h-48 overflow-hidden">
                <img
                  src={exp.image}
                  alt={exp.title}
                  className="w-full h-full object-cover opacity-70 group-hover:opacity-100 group-hover:scale-105 transition-all duration-700"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-[#0E1418] via-transparent to-transparent" />
                <span className="absolute top-3 left-3 bg-[#D5001C] text-white text-xs px-2.5 py-1 rounded-sm tracking-widest uppercase font-semibold">
                  {exp.tag}
                </span>
              </div>
              <div className="px-5 py-4">
                <p className="text-white/30 text-xs tracking-widest uppercase mb-1">{exp.subtitle}</p>
                <h3 style={{ fontFamily: "'Playfair Display', serif" }} className="text-white font-bold text-lg mb-2 line-clamp-1">
                  {exp.title}
                </h3>
                <p className="text-white/45 text-sm leading-relaxed line-clamp-2 mb-4">{exp.description}</p>
                <div className="flex items-center justify-between pt-3 border-t border-white/8">
                  <div className="flex items-center gap-1.5 text-white/30 text-xs">
                    <FiCalendar size={11} className="text-[#D5001C]" />
                    <span>{exp.duration}</span>
                  </div>
                  <div className="flex items-center gap-1.5 text-white/30 text-xs">
                    <FiUsers size={11} className="text-[#D5001C]" />
                    <span>{exp.participants}</span>
                  </div>
                  <button className="flex items-center gap-1 text-[#D5001C] text-xs tracking-widest uppercase font-semibold hover:gap-2 transition-all">
                    Band qilish <FiArrowRight size={11} />
                  </button>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>

      {/* Events */}
      <div className="bg-[#0E1418] border-t border-b border-white/8 py-16">
        <div className="max-w-screen-xl mx-auto px-6 md:px-12">
          <p className="text-[#D5001C] text-xs tracking-[0.4em] uppercase font-semibold mb-2">Taqvim</p>
          <h2 style={{ fontFamily: "'Playfair Display', serif" }} className="text-white text-3xl font-bold mb-10">
            Yaqinlashib kelayotgan tadbirlar
          </h2>
          <div className="space-y-4">
            {EVENTS.map((ev, i) => (
              <div key={i} className="flex items-center gap-6 py-4 border-b border-white/5 hover:bg-white/2 px-3 rounded-sm transition-all group cursor-pointer">
                <div className="w-16 flex-shrink-0 text-center">
                  <p className="text-[#D5001C] font-bold text-sm">{ev.date.split(" ")[0]}</p>
                  <p className="text-white/30 text-xs">{ev.date.split(" ")[1]}</p>
                </div>
                <div className="w-px h-10 bg-white/10 flex-shrink-0" />
                <div className="flex-1">
                  <p className="text-white font-semibold text-sm group-hover:text-[#D5001C] transition-colors">{ev.title}</p>
                  <div className="flex items-center gap-1.5 text-white/30 text-xs mt-1">
                    <FiMapPin size={10} className="text-[#D5001C]" />
                    <span>{ev.location}</span>
                  </div>
                </div>
                <FiArrowRight size={16} className="text-white/20 group-hover:text-[#D5001C] transition-colors flex-shrink-0" />
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
};

export default Experience;
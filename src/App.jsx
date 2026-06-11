import { useEffect } from "react";
import Navbar from "../components/Navbar";
import AllPosts from "../components/AllPosts";
import AuthPage from "../components/AuthPage";
import AdminPanel from "../components/AdminPanel";
import PostDetail from "../components/PostDetail";
import Experience from "../components/Experience";
import Services from "../components/Services";
import News from "../components/News";
import Dealers from "../components/Dealers";
import useStore from "../store/useStore";

const MODELS = [
  { name: "911", type: "Gasoline", desc: "Iconic sports car with rear engine: 2 doors, 2+2 seats.", img: "https://a.storyblok.com/f/338913/1280x1024/b7f3c2d593/911-desktop_5-4.jpg" },
  { name: "Taycan", type: "Electric", desc: "Electric sports car: 4 doors, 4/5 seats.", img: "https://a.storyblok.com/f/338913/1280x1024/e178b7a186/taycan-desktop_5-4.jpg" },
  { name: "Cayenne", type: "Electric · Hybrid · Gasoline", desc: "Versatile SUV: 4 doors, up to 5 seats.", img: "https://a.storyblok.com/f/338913/1280x1024/7c9b828a7a/denver-range-fallback-desktop-var2.jpg" },
  { name: "Macan", type: "Electric", desc: "Sporty compact SUV: 4 doors, 5 seats.", img: "https://a.storyblok.com/f/338913/1280x1024/3debd00362/macan-desktop_5-4.jpg" },
  { name: "Panamera", type: "Hybrid · Gasoline", desc: "Luxury sedan with high comfort: 4 doors, 4/5 seats.", img: "https://a.storyblok.com/f/338913/1280x1024/c06fa1b962/panamera-desktop_5-4.jpg" },
  { name: "718", type: "Gasoline", desc: "Precise mid-engine sports car: 2 doors, 2 seats.", img: "https://a.storyblok.com/f/338913/1280x1024/f8ad827507/718-desktop_5-4.jpg" },
];

const HomePage = () => {
  const { setPage, user } = useStore();
  return (
    <div className="min-h-screen bg-[#080C0F]">
      <div className="relative h-screen flex items-center justify-center overflow-hidden">
        <img src="https://a.storyblok.com/f/338913/3840x2161/c22e19591f/e4-ww-cayenne-coupe-v2-desktop.jpg" alt="hero" className="absolute inset-0 w-full h-full object-cover opacity-50" />
        <div className="absolute inset-0 bg-gradient-to-b from-black/30 via-transparent to-[#080C0F]" />
        <div className="relative z-10 text-center px-6 max-w-3xl mx-auto">
          <p className="text-[#D5001C] text-xs tracking-[0.5em] uppercase font-semibold mb-4">The New Generation</p>
          <h1 style={{ fontFamily: "'Playfair Display', serif" }} className="text-white text-5xl md:text-7xl font-bold leading-tight mb-6 drop-shadow-2xl">
            The new Cayenne Coupé Electric.
          </h1>
          <p className="text-white/60 text-base md:text-lg mb-10 max-w-lg mx-auto leading-relaxed">
            Electric energy consumption combined: 21.9 – 19.9 kWh/100 km. Zero emissions. Pure performance.
          </p>
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <button onClick={() => setPage("posts")} className="px-8 py-3.5 bg-[#D5001C] hover:bg-[#b0001a] text-white text-sm tracking-[0.2em] uppercase font-bold rounded-sm transition-all shadow-2xl shadow-red-900/40 hover:scale-105">
              Discover Models
            </button>
            <button onClick={() => setPage(user ? "admin" : "login")} className="px-8 py-3.5 border border-white/30 hover:border-white text-white text-sm tracking-[0.2em] uppercase font-medium rounded-sm transition-all hover:bg-white/5">
              {user ? "Admin Panel" : "Sign In"}
            </button>
          </div>
        </div>
        <div className="absolute bottom-10 left-1/2 -translate-x-1/2 flex flex-col items-center gap-2 animate-bounce">
          <div className="w-px h-10 bg-gradient-to-b from-white/0 to-white/40" />
          <div className="w-1.5 h-1.5 rounded-full bg-white/40" />
        </div>
      </div>

      <div className="max-w-screen-xl mx-auto px-6 py-20">
        <div className="text-center mb-14">
          <p className="text-[#D5001C] text-xs tracking-[0.5em] uppercase font-semibold mb-3">Lineup</p>
          <h2 style={{ fontFamily: "'Playfair Display', serif" }} className="text-white text-4xl md:text-5xl font-bold">Your Porsche Journey Starts Now.</h2>
        </div>
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
          {MODELS.map((model) => (
            <div key={model.name} onClick={() => setPage("posts")} className="group cursor-pointer bg-[#0E1418] border border-white/8 rounded-sm overflow-hidden hover:border-[#D5001C]/40 hover:-translate-y-1 hover:shadow-2xl hover:shadow-[#D5001C]/10 transition-all duration-400">
              <div className="overflow-hidden h-52">
                <img src={model.img} alt={model.name} className="w-full h-full object-cover opacity-75 group-hover:opacity-100 group-hover:scale-105 transition-all duration-700" />
              </div>
              <div className="px-5 py-4">
                <span className="text-[#D5001C]/80 text-xs tracking-widest uppercase font-medium">{model.type}</span>
                <h3 style={{ fontFamily: "'Playfair Display', serif" }} className="text-white text-xl font-bold mt-0.5 mb-1">{model.name}</h3>
                <p className="text-white/40 text-sm">{model.desc}</p>
                <div className="mt-4 flex items-center gap-1 text-white/40 group-hover:text-[#D5001C] text-xs tracking-widest uppercase transition-colors">
                  <span>Explore</span>
                  <span className="group-hover:translate-x-1 transition-transform">→</span>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>

      <div className="relative py-24 overflow-hidden">
        <div className="absolute inset-0 bg-cover bg-center opacity-15" style={{ backgroundImage: "url(https://a.storyblok.com/f/338913/3840x2880/6e7c1a85a4/01-j1-ct.jpg)" }} />
        <div className="absolute inset-0 bg-gradient-to-r from-[#080C0F] via-transparent to-[#080C0F]" />
        <div className="relative text-center max-w-2xl mx-auto px-6">
          <div className="w-16 h-px bg-[#D5001C] mx-auto mb-6" />
          <h2 style={{ fontFamily: "'Playfair Display', serif" }} className="text-white text-3xl md:text-4xl font-bold mb-4">Porsche Experience Center</h2>
          <p className="text-white/40 text-base leading-relaxed mb-8">Discover the world of Porsche — from motorsport heritage to cutting-edge electric mobility.</p>
          <button onClick={() => setPage("posts")} className="px-8 py-3 bg-[#D5001C] hover:bg-[#b0001a] text-white text-sm tracking-[0.2em] uppercase font-bold rounded-sm transition-all">View All Models</button>
        </div>
      </div>

      <footer className="border-t border-white/8 py-10 px-6">
        <div className="max-w-screen-xl mx-auto flex flex-col md:flex-row items-center justify-between gap-4">
          <div className="flex items-center gap-2">
            <div className="w-7 h-7 bg-[#D5001C] rounded-full flex items-center justify-center">
              <span className="text-white font-black text-xs">P</span>
            </div>
            <span style={{ fontFamily: "'Playfair Display', serif" }} className="text-white font-bold tracking-widest uppercase text-sm">PORSCHE</span>
          </div>
          <p className="text-white/20 text-xs tracking-widest">© {new Date().getFullYear()} Porsche AG. All rights reserved.</p>
          <div className="flex gap-6">
            {["Models", "Experience", "Contact"].map((l) => (
              <button key={l} className="text-white/20 hover:text-white/60 text-xs tracking-widest uppercase transition-colors">{l}</button>
            ))}
          </div>
        </div>
      </footer>
    </div>
  );
};

const App = () => {
  const { page } = useStore();

  useEffect(() => {
    const link = document.createElement("link");
    link.href = "https://fonts.googleapis.com/css2?family=Playfair+Display:wght@400;700;800&display=swap";
    link.rel = "stylesheet";
    document.head.appendChild(link);
  }, []);

  const renderPage = () => {
    switch (page) {
      case "login":
      case "register":
        return <AuthPage />;
      case "posts":
        return <AllPosts />;
      case "detail":
        return <PostDetail />;
      case "experience":
        return <Experience />;
      case "services":
        return <Services />;
      case "news":
        return <News />;
      case "dealers":
        return <Dealers />;
      case "admin":
        return <AdminPanel />;
      default:
        return <HomePage />;
    }
  };

  return (
    <div className="font-sans antialiased">
      <Navbar />
      {renderPage()}
    </div>
  );
};

export default App;
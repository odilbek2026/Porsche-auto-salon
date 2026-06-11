import { useState, useEffect } from "react";
import { FiMenu, FiX, FiSearch, FiUser, FiLogOut, FiSettings } from "react-icons/fi";
import useStore from "../store/useStore";
import SearchModal from "./SearchModal";

const NAV_LINKS = [
  { label: "Models",     page: "posts"      },
  { label: "Experience", page: "experience" },
  { label: "Services",   page: "services"   },
  { label: "News",       page: "news"       },
  { label: "Dealers",    page: "dealers"    },
];

const Navbar = () => {
  const [menuOpen, setMenuOpen] = useState(false);
  const [scrolled, setScrolled] = useState(false);
  const [showSearch, setShowSearch] = useState(false);
  const { user, logout, setPage, page } = useStore();

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 40);
    window.addEventListener("scroll", onScroll);
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  // Ctrl+K yoki Cmd+K bilan ochish
  useEffect(() => {
    const handleKey = (e) => {
      if ((e.metaKey || e.ctrlKey) && e.key === "k") {
        e.preventDefault();
        setShowSearch(true);
      }
    };
    window.addEventListener("keydown", handleKey);
    return () => window.removeEventListener("keydown", handleKey);
  }, []);

  return (
    <>
      <nav className={`fixed top-0 left-0 right-0 z-50 transition-all duration-500 ${scrolled ? "bg-[#0E1418]/95 backdrop-blur-md shadow-2xl border-b border-white/5" : "bg-gradient-to-b from-black/70 to-transparent"}`}>
        <div className="max-w-screen-xl mx-auto px-6 h-16 flex items-center justify-between">

          {/* Logo */}
          <button onClick={() => setPage("home")} className="flex items-center gap-2 group">
            <div className="w-10 h-10 bg-[#D5001C] rounded-full flex items-center justify-center shadow-lg shadow-red-900/40 group-hover:scale-105 transition-transform duration-200">
              <span className="text-white font-black text-xs tracking-widest">P</span>
            </div>
            <span style={{ fontFamily: "'Playfair Display', serif" }} className="text-white text-xl font-bold tracking-[0.15em] uppercase">PORSCHE</span>
          </button>

          {/* Desktop links */}
          <ul className="hidden lg:flex items-center gap-8">
            {NAV_LINKS.map((link) => (
              <li key={link.label}>
                <button
                  onClick={() => setPage(link.page)}
                  className={`text-sm tracking-widest uppercase font-medium transition-colors duration-200 relative group ${page === link.page ? "text-white" : "text-white/60 hover:text-white"}`}
                >
                  {link.label}
                  <span className={`absolute -bottom-1 left-0 h-px bg-[#D5001C] transition-all duration-300 ${page === link.page ? "w-full" : "w-0 group-hover:w-full"}`} />
                </button>
              </li>
            ))}
          </ul>

          {/* Right side */}
          <div className="flex items-center gap-3">
            {/* Search button */}
            <button
              onClick={() => setShowSearch(true)}
              className="group flex items-center gap-2 text-white/60 hover:text-white transition-colors p-2 rounded-full hover:bg-white/10"
              title="Qidirish (Ctrl+K)"
            >
              <FiSearch size={18} />
              <span className="hidden xl:flex items-center gap-1 text-xs text-white/25 border border-white/10 px-2 py-0.5 rounded-sm group-hover:border-white/30 transition-colors">
                ⌘K
              </span>
            </button>

            {user ? (
              <div className="flex items-center gap-2">
                <button onClick={() => setPage("admin")} className="hidden sm:flex items-center gap-2 text-white/70 hover:text-white text-sm tracking-wider px-3 py-1.5 rounded border border-white/20 hover:border-white/50 transition-all">
                  <FiSettings size={14} /><span>Admin</span>
                </button>
                <button onClick={logout} className="text-white/60 hover:text-[#D5001C] transition-colors p-2 rounded-full hover:bg-white/10">
                  <FiLogOut size={18} />
                </button>
                <div className="w-8 h-8 bg-[#D5001C] rounded-full flex items-center justify-center text-white text-xs font-bold uppercase">
                  {user.username?.[0] || "A"}
                </div>
              </div>
            ) : (
              <button onClick={() => setPage("login")} className="flex items-center gap-2 text-white text-sm tracking-widest uppercase px-5 py-2 bg-[#D5001C] hover:bg-[#b0001a] rounded-sm font-semibold transition-all shadow-lg shadow-red-900/30">
                <FiUser size={14} /><span className="hidden sm:inline">Login</span>
              </button>
            )}

            <button className="lg:hidden text-white/70 hover:text-white p-2" onClick={() => setMenuOpen(!menuOpen)}>
              {menuOpen ? <FiX size={22} /> : <FiMenu size={22} />}
            </button>
          </div>
        </div>

        {/* Mobile menu */}
        <div className={`lg:hidden overflow-hidden transition-all duration-400 ${menuOpen ? "max-h-96" : "max-h-0"}`}>
          <div className="bg-[#0E1418]/98 border-t border-white/10 px-6 py-4 space-y-1">
            {/* Mobile search */}
            <button
              onClick={() => { setShowSearch(true); setMenuOpen(false); }}
              className="flex items-center gap-2 w-full text-left text-white/70 hover:text-white py-3 text-sm tracking-widest uppercase border-b border-white/5 transition-colors"
            >
              <FiSearch size={14} /> Qidirish
            </button>
            {NAV_LINKS.map((link) => (
              <button key={link.label} onClick={() => { setPage(link.page); setMenuOpen(false); }} className="block w-full text-left text-white/70 hover:text-white py-3 text-sm tracking-widest uppercase border-b border-white/5 transition-colors">
                {link.label}
              </button>
            ))}
            {user && (
              <button onClick={() => { setPage("admin"); setMenuOpen(false); }} className="block w-full text-left text-[#D5001C] py-3 text-sm tracking-widest uppercase">
                Admin Panel
              </button>
            )}
          </div>
        </div>
      </nav>

      {showSearch && <SearchModal onClose={() => setShowSearch(false)} />}
    </>
  );
};

export default Navbar;
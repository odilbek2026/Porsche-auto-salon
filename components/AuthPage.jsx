import { useState } from "react";
import { FiUser, FiLock, FiEye, FiEyeOff, FiArrowRight, FiShield } from "react-icons/fi";
import useStore from "../store/useStore";

const AuthPage = () => {
  const { login, register, setPage } = useStore();
  const [mode, setMode] = useState("login");
  const [form, setForm] = useState({ username: "", password: "", confirm: "", role: "user" });
  const [showPass, setShowPass] = useState(false);
  const [error, setError] = useState("");
  const [loading, setLoading] = useState(false);

  const handleChange = (e) => setForm((f) => ({ ...f, [e.target.name]: e.target.value }));

  const handleSubmit = async () => {
    setError("");
    if (!form.username.trim() || !form.password.trim()) { setError("Barcha maydonlarni to'ldiring!"); return; }
    if (mode === "register" && form.password !== form.confirm) { setError("Parollar mos kelmaydi!"); return; }
    if (mode === "register" && form.password.length < 4) { setError("Parol kamida 4 ta belgidan iborat bo'lishi kerak!"); return; }
    setLoading(true);
    await new Promise((r) => setTimeout(r, 500));
    const result = mode === "login" ? login(form.username, form.password) : register(form.username, form.password, form.role);
    setLoading(false);
    if (!result.success) setError(result.message);
  };

  return (
    <div className="min-h-screen bg-[#080C0F] flex items-center justify-center pt-16 px-4">
      <div className="absolute inset-0 overflow-hidden">
        <img src="https://a.storyblok.com/f/338913/3840x2161/c22e19591f/e4-ww-cayenne-coupe-v2-desktop.jpg" alt="" className="w-full h-full object-cover opacity-10" />
        <div className="absolute inset-0 bg-gradient-to-br from-[#080C0F] via-[#080C0F]/90 to-[#0E1418]" />
      </div>

      <div className="relative w-full max-w-md">
        <div className="text-center mb-8">
          <div className="w-16 h-16 bg-[#D5001C] rounded-full flex items-center justify-center mx-auto mb-4 shadow-2xl shadow-red-900/50">
            <span className="text-white font-black text-2xl">P</span>
          </div>
          <h1 style={{ fontFamily: "'Playfair Display', serif" }} className="text-white text-3xl font-bold tracking-widest uppercase">PORSCHE</h1>
          <p className="text-white/30 text-xs tracking-[0.3em] uppercase mt-1">{mode === "login" ? "Hisobga kirish" : "Ro'yxatdan o'tish"}</p>
        </div>

        <div className="bg-[#0E1418]/90 backdrop-blur-xl border border-white/10 rounded-sm shadow-2xl overflow-hidden">
          <div className="flex border-b border-white/10">
            {["login", "register"].map((m) => (
              <button key={m} onClick={() => { setMode(m); setError(""); }} className={`flex-1 py-3.5 text-xs tracking-[0.2em] uppercase font-semibold transition-all ${mode === m ? "text-white border-b-2 border-[#D5001C] bg-[#D5001C]/5" : "text-white/30 hover:text-white/60"}`}>
                {m === "login" ? "Kirish" : "Ro'yxat"}
              </button>
            ))}
          </div>

          <div className="px-8 py-7 space-y-4">
            {error && <div className="bg-[#D5001C]/10 border border-[#D5001C]/30 text-red-400 text-sm px-4 py-3 rounded-sm">{error}</div>}

            <div>
              <label className="text-white/40 text-xs tracking-widest uppercase mb-1.5 block">Foydalanuvchi nomi</label>
              <div className="relative">
                <FiUser className="absolute left-3 top-1/2 -translate-y-1/2 text-white/30" size={15} />
                <input name="username" value={form.username} onChange={handleChange} placeholder="username" autoComplete="username" onKeyDown={(e) => e.key === "Enter" && handleSubmit()} className="w-full bg-white/5 border border-white/10 focus:border-[#D5001C]/60 text-white placeholder-white/20 pl-9 pr-4 py-2.5 rounded-sm text-sm outline-none transition-colors" />
              </div>
            </div>

            <div>
              <label className="text-white/40 text-xs tracking-widest uppercase mb-1.5 block">Parol</label>
              <div className="relative">
                <FiLock className="absolute left-3 top-1/2 -translate-y-1/2 text-white/30" size={15} />
                <input name="password" type={showPass ? "text" : "password"} value={form.password} onChange={handleChange} placeholder="••••••••" autoComplete={mode === "login" ? "current-password" : "new-password"} onKeyDown={(e) => e.key === "Enter" && handleSubmit()} className="w-full bg-white/5 border border-white/10 focus:border-[#D5001C]/60 text-white placeholder-white/20 pl-9 pr-10 py-2.5 rounded-sm text-sm outline-none transition-colors" />
                <button type="button" onClick={() => setShowPass(!showPass)} className="absolute right-3 top-1/2 -translate-y-1/2 text-white/30 hover:text-white/60 transition-colors">
                  {showPass ? <FiEyeOff size={15} /> : <FiEye size={15} />}
                </button>
              </div>
            </div>

            {mode === "register" && (
              <>
                <div>
                  <label className="text-white/40 text-xs tracking-widest uppercase mb-1.5 block">Parolni tasdiqlang</label>
                  <div className="relative">
                    <FiLock className="absolute left-3 top-1/2 -translate-y-1/2 text-white/30" size={15} />
                    <input name="confirm" type={showPass ? "text" : "password"} value={form.confirm} onChange={handleChange} placeholder="••••••••" autoComplete="new-password" onKeyDown={(e) => e.key === "Enter" && handleSubmit()} className="w-full bg-white/5 border border-white/10 focus:border-[#D5001C]/60 text-white placeholder-white/20 pl-9 pr-4 py-2.5 rounded-sm text-sm outline-none transition-colors" />
                  </div>
                </div>
                <div>
                  <label className="text-white/40 text-xs tracking-widest uppercase mb-1.5 flex items-center gap-1.5"><FiShield size={11} /> Rol</label>
                  <select name="role" value={form.role} onChange={handleChange} className="w-full bg-[#0E1418] border border-white/10 focus:border-[#D5001C]/60 text-white px-4 py-2.5 rounded-sm text-sm outline-none transition-colors">
                    <option value="user" className="bg-[#0E1418]">Foydalanuvchi</option>
                    <option value="admin" className="bg-[#0E1418]">Admin</option>
                  </select>
                </div>
              </>
            )}

            <button onClick={handleSubmit} disabled={loading} className="w-full mt-2 flex items-center justify-center gap-2 bg-[#D5001C] hover:bg-[#b0001a] disabled:opacity-50 text-white py-3 rounded-sm text-sm tracking-widest uppercase font-bold transition-all shadow-lg shadow-red-900/30">
              {loading ? <span className="w-4 h-4 border-2 border-white/30 border-t-white rounded-full animate-spin" /> : <><span>{mode === "login" ? "Kirish" : "Ro'yxatdan o'tish"}</span><FiArrowRight size={15} /></>}
            </button>
          </div>
        </div>

        <button onClick={() => setPage("home")} className="block mx-auto mt-6 text-white/20 hover:text-white/50 text-xs tracking-widest uppercase transition-colors">
          ← Bosh sahifaga qaytish
        </button>
      </div>
    </div>
  );
};

export default AuthPage;
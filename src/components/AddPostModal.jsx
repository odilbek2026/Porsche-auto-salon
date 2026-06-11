import { useState } from "react";
import { FiX, FiPlus, FiImage, FiFileText, FiTag } from "react-icons/fi";
import useStore from "../store/useStore";

const CATEGORIES = ["911", "Taycan", "Cayenne", "Macan", "Panamera", "718"];

const AddPostModal = ({ onClose }) => {
  const { createPost, user } = useStore();
  const [form, setForm] = useState({ name: "", description: "", image: "", category: "911", price: "" });
  const [loading, setLoading] = useState(false);
  const [success, setSuccess] = useState(false);
  const [error, setError] = useState("");

  const handleChange = (e) => setForm((f) => ({ ...f, [e.target.name]: e.target.value }));

  const handleSubmit = async () => {
    if (!form.name.trim() || !form.description.trim()) {
      setError("Nom va tavsif majburiy!");
      return;
    }
    setLoading(true);
    setError("");
    const payload = { ...form, author: user?.username || "Guest", createdAt: new Date().toISOString() };
    const result = await createPost(payload);
    setLoading(false);
    if (result.success) {
      setSuccess(true);
      setTimeout(onClose, 1200);
    } else {
      setError(result.message || "Xatolik yuz berdi");
    }
  };

  return (
    <div className="fixed inset-0 z-[100] flex items-center justify-center p-4 bg-black/80 backdrop-blur-sm">
      <div className="relative w-full max-w-lg bg-[#0E1418] border border-white/10 rounded-lg shadow-2xl overflow-hidden">
        <div className="flex items-center justify-between px-6 py-4 border-b border-white/10 bg-[#D5001C]/10">
          <div className="flex items-center gap-3">
            <div className="w-8 h-8 bg-[#D5001C] rounded-sm flex items-center justify-center">
              <FiPlus className="text-white" size={16} />
            </div>
            <div>
              <h2 style={{ fontFamily: "'Playfair Display', serif" }} className="text-white font-bold text-lg tracking-wider">Yangi Post</h2>
              <p className="text-white/40 text-xs tracking-widest uppercase">Porsche Collection</p>
            </div>
          </div>
          <button onClick={onClose} className="text-white/40 hover:text-white hover:bg-white/10 p-2 rounded-sm transition-all">
            <FiX size={18} />
          </button>
        </div>

        <div className="px-6 py-5 space-y-4">
          {success && <div className="bg-green-500/15 border border-green-500/30 text-green-400 text-sm px-4 py-3 rounded-sm">✓ Post muvaffaqiyatli qo'shildi!</div>}
          {error && <div className="bg-[#D5001C]/15 border border-[#D5001C]/30 text-red-400 text-sm px-4 py-3 rounded-sm">{error}</div>}

          <div>
            <label className="text-white/50 text-xs tracking-widest uppercase mb-1.5 flex items-center gap-1.5"><FiTag size={11} /> Model Nomi *</label>
            <input name="name" value={form.name} onChange={handleChange} placeholder="Masalan: Porsche 911 GT3" className="w-full bg-white/5 border border-white/10 focus:border-[#D5001C]/60 text-white placeholder-white/20 px-4 py-2.5 rounded-sm text-sm outline-none transition-colors" />
          </div>

          <div>
            <label className="text-white/50 text-xs tracking-widest uppercase mb-1.5 flex items-center gap-1.5"><FiTag size={11} /> Kategoriya</label>
            <select name="category" value={form.category} onChange={handleChange} className="w-full bg-[#0E1418] border border-white/10 focus:border-[#D5001C]/60 text-white px-4 py-2.5 rounded-sm text-sm outline-none transition-colors">
              {CATEGORIES.map((c) => <option key={c} value={c} className="bg-[#0E1418]">{c}</option>)}
            </select>
          </div>

          <div>
            <label className="text-white/50 text-xs tracking-widest uppercase mb-1.5 flex items-center gap-1.5"><FiFileText size={11} /> Tavsif *</label>
            <textarea name="description" value={form.description} onChange={handleChange} rows={3} placeholder="Model haqida ma'lumot..." className="w-full bg-white/5 border border-white/10 focus:border-[#D5001C]/60 text-white placeholder-white/20 px-4 py-2.5 rounded-sm text-sm outline-none transition-colors resize-none" />
          </div>

          <div>
            <label className="text-white/50 text-xs tracking-widest uppercase mb-1.5 flex items-center gap-1.5"><FiImage size={11} /> Rasm URL (ixtiyoriy)</label>
            <input name="image" value={form.image} onChange={handleChange} placeholder="https://..." className="w-full bg-white/5 border border-white/10 focus:border-[#D5001C]/60 text-white placeholder-white/20 px-4 py-2.5 rounded-sm text-sm outline-none transition-colors" />
          </div>

          <div>
            <label className="text-white/50 text-xs tracking-widest uppercase mb-1.5">Narx (USD)</label>
            <input name="price" value={form.price} onChange={handleChange} type="number" placeholder="150000" className="w-full bg-white/5 border border-white/10 focus:border-[#D5001C]/60 text-white placeholder-white/20 px-4 py-2.5 rounded-sm text-sm outline-none transition-colors" />
          </div>
        </div>

        <div className="px-6 py-4 border-t border-white/10 flex gap-3">
          <button onClick={onClose} className="flex-1 py-2.5 border border-white/15 text-white/60 hover:text-white hover:border-white/40 rounded-sm text-sm tracking-widest uppercase transition-all">Bekor</button>
          <button onClick={handleSubmit} disabled={loading || success} className="flex-1 py-2.5 bg-[#D5001C] hover:bg-[#b0001a] disabled:opacity-50 text-white rounded-sm text-sm tracking-widest uppercase font-semibold transition-all flex items-center justify-center gap-2">
            {loading ? <span className="w-4 h-4 border-2 border-white/30 border-t-white rounded-full animate-spin" /> : <FiPlus size={16} />}
            {loading ? "Saqlanmoqda..." : "Saqlash"}
          </button>
        </div>
      </div>
    </div>
  );
};

export default AddPostModal;
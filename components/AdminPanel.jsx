import { useEffect, useState } from "react";
import { FiUsers, FiFileText, FiTrash2, FiShield, FiUser, FiArrowLeft, FiRefreshCw, FiDatabase, FiPlus } from "react-icons/fi";
import useStore from "../store/useStore";
import AddPostModal from "./AddPostModal";

const AdminPanel = () => {
  const { users, deleteUser, posts, fetchPosts, deletePost, loading, user, setPage } = useStore();
  const [tab, setTab] = useState("users");
  const [showModal, setShowModal] = useState(false);

  useEffect(() => {
    if (tab === "posts") fetchPosts();
  }, [tab]);

  if (!user || user.role !== "admin") {
    return (
      <div className="min-h-screen bg-[#080C0F] pt-24 flex items-center justify-center">
        <div className="text-center">
          <FiShield className="text-[#D5001C] mx-auto mb-4" size={48} />
          <h2 className="text-white text-xl font-bold mb-2">Ruxsat yo'q</h2>
          <p className="text-white/40 text-sm mb-6">Admin paneliga kirish uchun admin bo'lishingiz kerak</p>
          <button onClick={() => setPage("home")} className="text-[#D5001C] text-sm tracking-widest uppercase">← Qaytish</button>
        </div>
      </div>
    );
  }

  const stats = [
    { label: "Foydalanuvchilar", value: users.length, icon: FiUsers, color: "text-blue-400" },
    { label: "Postlar", value: posts.length, icon: FiFileText, color: "text-green-400" },
    { label: "Adminlar", value: users.filter((u) => u.role === "admin").length, icon: FiShield, color: "text-[#D5001C]" },
  ];

  return (
    <div className="min-h-screen bg-[#080C0F] pt-16">
      <div className="max-w-screen-xl mx-auto px-6 py-8">
        <div className="flex items-center justify-between mb-8">
          <div>
            <button onClick={() => setPage("home")} className="flex items-center gap-2 text-white/30 hover:text-white text-xs tracking-widest uppercase mb-3 transition-colors">
              <FiArrowLeft size={12} /> Bosh sahifa
            </button>
            <h1 style={{ fontFamily: "'Playfair Display', serif" }} className="text-white text-3xl font-bold">Admin Panel</h1>
            <p className="text-white/30 text-sm mt-1">Xush kelibsiz, <span className="text-[#D5001C]">{user.username}</span></p>
          </div>
          <div className="hidden sm:flex items-center gap-2 bg-[#D5001C]/10 border border-[#D5001C]/20 text-[#D5001C] px-4 py-2 rounded-sm text-xs tracking-widest uppercase">
            <FiShield size={12} /> Administrator
          </div>
        </div>

        <div className="grid grid-cols-3 gap-4 mb-8">
          {stats.map((s) => (
            <div key={s.label} className="bg-[#0E1418] border border-white/8 rounded-sm p-5 flex items-center gap-4">
              <div className="w-10 h-10 bg-white/5 rounded-sm flex items-center justify-center">
                <s.icon className={s.color} size={20} />
              </div>
              <div>
                <p className="text-white text-2xl font-bold">{s.value}</p>
                <p className="text-white/30 text-xs tracking-wider">{s.label}</p>
              </div>
            </div>
          ))}
        </div>

        <div className="flex gap-0 mb-6 border border-white/10 rounded-sm overflow-hidden w-fit">
          {[{ key: "users", label: "Foydalanuvchilar", icon: FiUsers }, { key: "posts", label: "Postlar", icon: FiFileText }].map((t) => (
            <button key={t.key} onClick={() => setTab(t.key)} className={`flex items-center gap-2 px-5 py-2.5 text-xs tracking-widest uppercase font-semibold transition-all ${tab === t.key ? "bg-[#D5001C] text-white" : "text-white/40 hover:text-white hover:bg-white/5"}`}>
              <t.icon size={13} />{t.label}
            </button>
          ))}
        </div>

        {tab === "users" && (
          <div className="bg-[#0E1418] border border-white/8 rounded-sm overflow-hidden">
            <div className="px-6 py-4 border-b border-white/8 flex items-center gap-2">
              <FiDatabase className="text-white/30" size={14} />
              <span className="text-white/50 text-xs tracking-widest uppercase">{users.length} ta foydalanuvchi</span>
            </div>
            <div className="divide-y divide-white/5">
              {users.length === 0 ? (
                <div className="py-12 text-center text-white/20 text-sm">Hech qanday foydalanuvchi yo'q</div>
              ) : (
                users.map((u) => (
                  <div key={u.id} className="flex items-center justify-between px-6 py-4 hover:bg-white/2 transition-colors group">
                    <div className="flex items-center gap-4">
                      <div className={`w-9 h-9 rounded-full flex items-center justify-center text-sm font-bold uppercase ${u.role === "admin" ? "bg-[#D5001C]/20 text-[#D5001C] border border-[#D5001C]/30" : "bg-white/10 text-white/60"}`}>
                        {u.username?.[0] || "?"}
                      </div>
                      <div>
                        <p className="text-white text-sm font-medium">{u.username}</p>
                        <p className="text-white/25 text-xs">ID: {u.id}</p>
                      </div>
                    </div>
                    <div className="flex items-center gap-3">
                      <span className={`flex items-center gap-1.5 text-xs px-2.5 py-1 rounded-sm uppercase tracking-wider ${u.role === "admin" ? "bg-[#D5001C]/15 text-[#D5001C] border border-[#D5001C]/20" : "bg-white/5 text-white/40 border border-white/10"}`}>
                        {u.role === "admin" ? <FiShield size={10} /> : <FiUser size={10} />}{u.role}
                      </span>
                      {u.id !== user.id && (
                        <button onClick={() => deleteUser(u.id)} className="text-white/20 hover:text-[#D5001C] p-1.5 rounded-sm hover:bg-[#D5001C]/10 transition-all opacity-0 group-hover:opacity-100">
                          <FiTrash2 size={14} />
                        </button>
                      )}
                    </div>
                  </div>
                ))
              )}
            </div>
          </div>
        )}

        {tab === "posts" && (
          <div className="bg-[#0E1418] border border-white/8 rounded-sm overflow-hidden">
            <div className="px-6 py-4 border-b border-white/8 flex items-center justify-between">
              <div className="flex items-center gap-2">
                <FiDatabase className="text-white/30" size={14} />
                <span className="text-white/50 text-xs tracking-widest uppercase">{posts.length} ta post</span>
              </div>
              <div className="flex gap-2">
                <button onClick={fetchPosts} className="p-2 text-white/30 hover:text-white hover:bg-white/5 rounded-sm transition-all">
                  <FiRefreshCw size={14} className={loading ? "animate-spin" : ""} />
                </button>
                <button onClick={() => setShowModal(true)} className="flex items-center gap-1.5 bg-[#D5001C] hover:bg-[#b0001a] text-white text-xs px-3 py-1.5 rounded-sm tracking-widest uppercase transition-all">
                  <FiPlus size={12} /> Yangi
                </button>
              </div>
            </div>
            <div className="divide-y divide-white/5">
              {loading ? (
                <div className="py-12 flex justify-center"><div className="w-6 h-6 border-2 border-white/10 border-t-[#D5001C] rounded-full animate-spin" /></div>
              ) : posts.length === 0 ? (
                <div className="py-12 text-center text-white/20 text-sm">Hech qanday post yo'q</div>
              ) : (
                posts.map((p) => (
                  <div key={p.id} className="flex items-center justify-between px-6 py-4 hover:bg-white/2 transition-colors group">
                    <div className="flex items-center gap-4">
                      <div className="w-9 h-9 bg-cover bg-center rounded-sm border border-white/10" style={{ backgroundImage: `url(${p.image || "https://a.storyblok.com/f/338913/1280x1024/b7f3c2d593/911-desktop_5-4.jpg"})` }} />
                      <div>
                        <p className="text-white text-sm font-medium line-clamp-1">{p.name || "Nomsiz"}</p>
                        <p className="text-white/25 text-xs">{p.category || "-"}</p>
                      </div>
                    </div>
                    <div className="flex items-center gap-3">
                      <span className="text-white/20 text-xs hidden sm:block">{p.author || "-"}</span>
                      <button onClick={() => deletePost(p.id)} className="text-white/20 hover:text-[#D5001C] p-1.5 rounded-sm hover:bg-[#D5001C]/10 transition-all opacity-0 group-hover:opacity-100">
                        <FiTrash2 size={14} />
                      </button>
                    </div>
                  </div>
                ))
              )}
            </div>
          </div>
        )}
      </div>
      {showModal && <AddPostModal onClose={() => setShowModal(false)} />}
    </div>
  );
};

export default AdminPanel;
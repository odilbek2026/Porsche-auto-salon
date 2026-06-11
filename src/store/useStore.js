import { create } from "zustand";

const API = "https://69ce56e233a09f831b7d52bf.mockapi.io/test/movie";

const useStore = create((set, get) => ({
  user: JSON.parse(localStorage.getItem("porsche_user") || "null"),
  users: JSON.parse(localStorage.getItem("porsche_users") || "[]"),
  page: "home",
  selectedPost: null,
  posts: [],
  loading: false,
  error: null,
  cart: JSON.parse(localStorage.getItem("porsche_cart") || "[]"),

  setPage: (page) => set({ page }),

  setSelectedPost: (post) => {
    set({ selectedPost: post, page: "detail" });
  },

  // AUTH
  register: (username, password, role = "user") => {
    const { users } = get();
    if (users.find((u) => u.username === username))
      return { success: false, message: "Bu foydalanuvchi nomi band!" };
    const newUser = { id: Date.now(), username, password, role };
    const updated = [...users, newUser];
    localStorage.setItem("porsche_users", JSON.stringify(updated));
    localStorage.setItem("porsche_user", JSON.stringify(newUser));
    set({ users: updated, user: newUser, page: "home" });
    return { success: true };
  },

  login: (username, password) => {
    const { users } = get();
    const found = users.find(
      (u) => u.username === username && u.password === password
    );
    if (!found) return { success: false, message: "Login yoki parol noto'g'ri!" };
    localStorage.setItem("porsche_user", JSON.stringify(found));
    set({ user: found, page: "home" });
    return { success: true };
  },

  logout: () => {
    localStorage.removeItem("porsche_user");
    set({ user: null, page: "home" });
  },

  deleteUser: (id) => {
    const updated = get().users.filter((u) => u.id !== id);
    localStorage.setItem("porsche_users", JSON.stringify(updated));
    set({ users: updated });
  },

  // CART
  addToCart: (item) => {
    const cart = get().cart || [];
    const exists = cart.find((c) => c.id === item.id);
    const updated = exists
      ? cart.map((c) =>
          c.id === item.id ? { ...c, qty: (c.qty || 1) + 1 } : c
        )
      : [...cart, { ...item, qty: 1 }];
    localStorage.setItem("porsche_cart", JSON.stringify(updated));
    set({ cart: updated });
  },

  removeFromCart: (id) => {
    const updated = (get().cart || []).filter((c) => c.id !== id);
    localStorage.setItem("porsche_cart", JSON.stringify(updated));
    set({ cart: updated });
  },

  updateQty: (id, qty) => {
    if (qty < 1) {
      get().removeFromCart(id);
      return;
    }
    const updated = (get().cart || []).map((c) =>
      c.id === id ? { ...c, qty } : c
    );
    localStorage.setItem("porsche_cart", JSON.stringify(updated));
    set({ cart: updated });
  },

  clearCart: () => {
    localStorage.removeItem("porsche_cart");
    set({ cart: [] });
  },

  // POSTS (MockAPI)
  fetchPosts: async () => {
    set({ loading: true, error: null });
    try {
      const res = await fetch(API);
      if (!res.ok) throw new Error("Server xatosi: " + res.status);
      const data = await res.json();
      set({ posts: Array.isArray(data) ? data : [], loading: false });
    } catch (e) {
      set({ error: e.message, loading: false });
    }
  },

  createPost: async (postData) => {
    try {
      const res = await fetch(API, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(postData),
      });
      if (!res.ok) throw new Error("Post yaratishda xato");
      const newPost = await res.json();
      set((s) => ({ posts: [newPost, ...(s.posts || [])] }));
      return { success: true };
    } catch (e) {
      return { success: false, message: e.message };
    }
  },

  deletePost: async (id) => {
    try {
      await fetch(`${API}/${id}`, { method: "DELETE" });
      set((s) => ({ posts: (s.posts || []).filter((p) => p.id !== id) }));
    } catch (e) {
      console.error(e);
    }
  },
}));

export default useStore;
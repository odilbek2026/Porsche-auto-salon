import { useState } from "react";
import { FiX, FiTrash2, FiShoppingCart, FiMinus, FiPlus, FiCheckCircle, FiPhone } from "react-icons/fi";
import useStore from "../store/useStore";

const CartDrawer = ({ onClose }) => {
  const { cart = [], removeFromCart, updateQty, clearCart } = useStore();
  const [ordered, setOrdered] = useState(false);

  const safeCart = Array.isArray(cart) ? cart : [];

  const total = safeCart.reduce((sum, c) => sum + (Number(c.price) || 0) * (c.qty || 1), 0);

  const fmt = (p) =>
    new Intl.NumberFormat("en-US", {
      style: "currency",
      currency: "USD",
      maximumFractionDigits: 0,
    }).format(p);

  const handleOrder = () => {
    setOrdered(true);
    setTimeout(() => {
      clearCart();
      onClose();
    }, 2500);
  };

  return (
    <div className="fixed inset-0 z-[200] flex">
      {/* Backdrop */}
      <div className="flex-1 bg-black/70 backdrop-blur-sm" onClick={onClose} />

      {/* Drawer */}
      <div className="w-full max-w-md bg-[#0E1418] border-l border-white/10 flex flex-col shadow-2xl">

        {/* Header */}
        <div className="flex items-center justify-between px-6 py-4 border-b border-white/10 flex-shrink-0">
          <div className="flex items-center gap-3">
            <div className="w-8 h-8 bg-[#D5001C]/15 rounded-sm flex items-center justify-center">
              <FiShoppingCart className="text-[#D5001C]" size={16} />
            </div>
            <div>
              <h2
                style={{ fontFamily: "'Playfair Display', serif" }}
                className="text-white font-bold text-lg"
              >
                Savatcha
              </h2>
              <p className="text-white/30 text-xs tracking-widest">{safeCart.length} ta model</p>
            </div>
          </div>
          <button
            onClick={onClose}
            className="text-white/40 hover:text-white p-2 rounded-sm hover:bg-white/10 transition-all"
          >
            <FiX size={18} />
          </button>
        </div>

        {/* Success state */}
        {ordered && (
          <div className="flex-1 flex flex-col items-center justify-center gap-5 px-8 text-center">
            <div className="w-20 h-20 bg-green-500/15 rounded-full flex items-center justify-center">
              <FiCheckCircle className="text-green-400" size={36} />
            </div>
            <div>
              <h3
                style={{ fontFamily: "'Playfair Display', serif" }}
                className="text-white text-2xl font-bold mb-2"
              >
                Buyurtma qabul qilindi!
              </h3>
              <p className="text-white/40 text-sm leading-relaxed">
                Menejerimiz 30 daqiqa ichida siz bilan bog'lanadi.
              </p>
            </div>
            <div className="flex items-center gap-2 text-[#D5001C] text-sm">
              <FiPhone size={14} /> +998 71 200 11 22
            </div>
          </div>
        )}

        {/* Empty state */}
        {!ordered && safeCart.length === 0 && (
          <div className="flex-1 flex flex-col items-center justify-center gap-4 px-6">
            <div className="w-16 h-16 bg-white/5 rounded-full flex items-center justify-center">
              <FiShoppingCart className="text-white/20" size={28} />
            </div>
            <p className="text-white/30 text-sm tracking-widest uppercase">Savatcha bo'sh</p>
          </div>
        )}

        {/* Cart items */}
        {!ordered && safeCart.length > 0 && (
          <>
            <div className="flex-1 overflow-y-auto divide-y divide-white/5 px-4 py-2">
              {safeCart.map((item) => (
                <div key={item.id} className="flex items-center gap-3 py-4">
                  <div
                    className="w-16 h-12 rounded-sm bg-cover bg-center flex-shrink-0 border border-white/10"
                    style={{
                      backgroundImage: `url(${
                        item.image ||
                        "https://a.storyblok.com/f/338913/1280x1024/b7f3c2d593/911-desktop_5-4.jpg"
                      })`,
                    }}
                  />
                  <div className="flex-1 min-w-0">
                    <p
                      style={{ fontFamily: "'Playfair Display', serif" }}
                      className="text-white text-sm font-bold line-clamp-1"
                    >
                      {item.name}
                    </p>
                    <p className="text-[#D5001C] text-xs font-semibold mt-0.5">
                      {item.price
                        ? fmt(Number(item.price) * (item.qty || 1))
                        : "Narx ko'rsatilmagan"}
                    </p>
                    {/* Qty controls */}
                    <div className="flex items-center gap-2 mt-2">
                      <button
                        onClick={() => updateQty(item.id, (item.qty || 1) - 1)}
                        className="w-6 h-6 bg-white/10 hover:bg-white/20 text-white rounded-sm flex items-center justify-center transition-all"
                      >
                        <FiMinus size={11} />
                      </button>
                      <span className="text-white text-xs w-5 text-center font-semibold">
                        {item.qty || 1}
                      </span>
                      <button
                        onClick={() => updateQty(item.id, (item.qty || 1) + 1)}
                        className="w-6 h-6 bg-white/10 hover:bg-white/20 text-white rounded-sm flex items-center justify-center transition-all"
                      >
                        <FiPlus size={11} />
                      </button>
                    </div>
                  </div>
                  <button
                    onClick={() => removeFromCart(item.id)}
                    className="text-white/20 hover:text-[#D5001C] p-2 transition-all flex-shrink-0"
                  >
                    <FiTrash2 size={15} />
                  </button>
                </div>
              ))}
            </div>

            {/* Footer */}
            <div className="border-t border-white/10 px-6 py-5 space-y-4 flex-shrink-0">
              <div className="flex items-center justify-between py-2">
                <span className="text-white/40 text-sm tracking-widest uppercase">Jami summa</span>
                <span
                  style={{ fontFamily: "'Playfair Display', serif" }}
                  className="text-white text-2xl font-bold"
                >
                  {total > 0 ? fmt(total) : "—"}
                </span>
              </div>
              <button
                onClick={handleOrder}
                className="w-full py-3.5 bg-[#D5001C] hover:bg-[#b0001a] text-white text-sm tracking-widest uppercase font-bold rounded-sm transition-all shadow-lg shadow-red-900/30"
              >
                Buyurtma berish
              </button>
              <button
                onClick={clearCart}
                className="w-full py-2.5 border border-white/10 hover:border-white/25 text-white/30 hover:text-white/60 text-xs tracking-widest uppercase rounded-sm transition-all"
              >
                Savatchani tozalash
              </button>
            </div>
          </>
        )}
      </div>
    </div>
  );
};

export default CartDrawer;
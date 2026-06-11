import { FiTrash2, FiCalendar, FiUser, FiTag, FiDollarSign } from "react-icons/fi";
import useStore from "../../store/useStore";

const FALLBACK_IMAGES = {
  "911": "https://a.storyblok.com/f/338913/1280x1024/b7f3c2d593/911-desktop_5-4.jpg",
  "Taycan": "https://a.storyblok.com/f/338913/1280x1024/e178b7a186/taycan-desktop_5-4.jpg",
  "Cayenne": "https://a.storyblok.com/f/338913/1280x1024/7c9b828a7a/denver-range-fallback-desktop-var2.jpg",
  "Macan": "https://a.storyblok.com/f/338913/1280x1024/3debd00362/macan-desktop_5-4.jpg",
  "Panamera": "https://a.storyblok.com/f/338913/1280x1024/c06fa1b962/panamera-desktop_5-4.jpg",
  "718": "https://a.storyblok.com/f/338913/1280x1024/f8ad827507/718-desktop_5-4.jpg",
};

const PostCard = ({ post }) => {
  const { deletePost, user } = useStore();
  const imgSrc = post.image || FALLBACK_IMAGES[post.category] || FALLBACK_IMAGES["911"];

  const formatDate = (dateStr) => {
    try {
      return new Date(dateStr).toLocaleDateString("uz-UZ", { year: "numeric", month: "short", day: "numeric" });
    } catch {
      return dateStr;
    }
  };

  const formatPrice = (price) => {
    if (!price) return null;
    return new Intl.NumberFormat("en-US", { style: "currency", currency: "USD", maximumFractionDigits: 0 }).format(price);
  };

  return (
    <div className="group bg-[#0E1418] border border-white/8 rounded-sm overflow-hidden hover:border-[#D5001C]/40 transition-all duration-400 hover:shadow-2xl hover:shadow-[#D5001C]/10 hover:-translate-y-1">
      <div className="relative overflow-hidden h-52 bg-black">
        <img src={imgSrc} alt={post.name} className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-700 opacity-80 group-hover:opacity-100" onError={(e) => { e.target.src = FALLBACK_IMAGES["911"]; }} />
        <div className="absolute inset-0 bg-gradient-to-t from-[#0E1418] via-transparent to-transparent" />
        <div className="absolute top-3 left-3">
          <span className="flex items-center gap-1.5 bg-[#D5001C] text-white text-xs px-2.5 py-1 rounded-sm tracking-widest uppercase font-semibold shadow-lg">
            <FiTag size={10} />
            {post.category || "Porsche"}
          </span>
        </div>
        {user?.role === "admin" && (
          <button onClick={() => deletePost(post.id)} className="absolute top-3 right-3 bg-black/60 hover:bg-[#D5001C] text-white/60 hover:text-white p-2 rounded-sm transition-all duration-200 opacity-0 group-hover:opacity-100">
            <FiTrash2 size={14} />
          </button>
        )}
        {post.price && (
          <div className="absolute bottom-3 right-3">
            <span className="flex items-center gap-1 bg-black/70 backdrop-blur-sm text-white text-xs px-2.5 py-1 rounded-sm border border-white/10">
              <FiDollarSign size={11} className="text-[#D5001C]" />
              {formatPrice(post.price)}
            </span>
          </div>
        )}
      </div>
      <div className="px-5 py-4">
        <h3 style={{ fontFamily: "'Playfair Display', serif" }} className="text-white font-bold text-lg leading-tight mb-2 group-hover:text-[#D5001C]/90 transition-colors line-clamp-1">
          {post.name || "Porsche Model"}
        </h3>
        <p className="text-white/50 text-sm leading-relaxed line-clamp-2 mb-4">
          {post.description || "Porsche modelining batafsil ma'lumotlari."}
        </p>
        <div className="flex items-center justify-between pt-3 border-t border-white/8">
          <div className="flex items-center gap-1.5 text-white/30 text-xs">
            <FiUser size={11} />
            <span className="tracking-wide">{post.author || "Admin"}</span>
          </div>
          <div className="flex items-center gap-1.5 text-white/30 text-xs">
            <FiCalendar size={11} />
            <span>{formatDate(post.createdAt)}</span>
          </div>
        </div>
      </div>
    </div>
  );
};

export default PostCard;
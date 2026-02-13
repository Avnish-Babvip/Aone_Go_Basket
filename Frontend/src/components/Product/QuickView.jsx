import { useEffect, useState } from "react";
import { FiShoppingCart, FiX } from "react-icons/fi";

function QuickViewModal({ product, onClose, allProducts, onSwitchProduct }) {
  const [activeImg, setActiveImg] = useState(0);
  const getStockColor = (message) => {
    if (!message) return "text-gray-500";

    if (message.toLowerCase().includes("out")) return "text-red-500";
    if (message.toLowerCase().includes("hurry")) return "text-orange-500";
    if (message.toLowerCase().includes("in stock")) return "text-green-600";

    return "text-gray-500";
  };

  const [selectedVariation, setSelectedVariation] = useState(
    product?.variations?.[0] || null,
  );

  useEffect(() => {
    document.body.style.overflow = "hidden";
    return () => (document.body.style.overflow = "unset");
  }, []);

  if (!product) return null;

  /* ---------------- IMAGE LOGIC ---------------- */
  const images = product.images?.length ? product.images : [];

  const activeImage = images[activeImg];

  /* ---------------- PRICE LOGIC ---------------- */
  const salePrice =
    product.type === "variable"
      ? selectedVariation?.sale_price
      : product.sale_price;

  const regularPrice =
    product.type === "variable"
      ? selectedVariation?.regular_price
      : product.regular_price;

  const showSale = product.is_on_sale && salePrice;

  /* ---------------- RELATED ---------------- */
  const related = allProducts
    ?.filter(
      (p) =>
        p.categories_data?.[0]?.id === product.categories_data?.[0]?.id &&
        p.id !== product.id,
    )
    .slice(0, 3);

  return (
    <div className="fixed inset-0 z-[2000] flex items-center justify-center p-4 bg-black/70 backdrop-blur-md overflow-y-auto">
      <div className="bg-white rounded-[2.5rem] max-w-5xl w-full my-auto overflow-hidden relative shadow-2xl animate-in fade-in zoom-in duration-300">
        {/* CLOSE */}
        <button
          onClick={onClose}
          className="absolute top-6 right-6 text-gray-400 hover:text-black z-50 bg-gray-100 p-2 rounded-full"
        >
          <FiX size={24} />
        </button>

        <div className="flex flex-col md:flex-row">
          {/* ================= LEFT IMAGES ================= */}
          <div className="w-full md:w-1/2 bg-gray-50 p-6 md:p-10 flex gap-4">
            {/* THUMBNAILS */}
            <div className="hidden md:flex flex-col gap-3">
              {images.map((img, i) => (
                <button
                  key={img.id}
                  onClick={() => setActiveImg(i)}
                  className={`w-16 h-16 rounded-xl border-2 overflow-hidden transition-all ${
                    activeImg === i
                      ? "border-emerald-500 scale-105 shadow-md"
                      : "border-transparent opacity-60"
                  }`}
                >
                  <img
                    src={`${import.meta.env.VITE_REACT_APP_IMAGE_URL}/${img.image}`}
                    className="w-full h-full object-cover"
                    alt=""
                  />
                </button>
              ))}
            </div>

            {/* MAIN IMAGE */}
            <div className="flex-1 bg-white rounded-3xl flex items-center justify-center p-8 shadow-inner">
              {activeImage && (
                <img
                  src={`${import.meta.env.VITE_REACT_APP_IMAGE_URL}/${activeImage.image}`}
                  className="max-h-[400px] w-auto object-contain"
                  alt={product.name}
                />
              )}
            </div>
          </div>

          {/* ================= RIGHT INFO ================= */}
          <div className="w-full md:w-1/2 p-8 md:p-12 flex flex-col">
            {/* CATEGORY */}
            <span className="text-brand-green font-black text-[10px] uppercase tracking-[0.2em] mb-2">
              {product.categories_data?.[0]?.name}
            </span>

            {/* NAME */}
            <h2 className="text-2xl capitalize md:text-3xl font-black text-gray-900 leading-tight mb-4">
              {product.name}
            </h2>

            {product.is_on_sale && (
              <span className="text-[#78B31E] text-xs font-bold uppercase mb-2">
                Special Offer
              </span>
            )}
            {/* PRICE */}
            <div className="flex items-baseline gap-4 mb-6">
              {showSale ? (
                <>
                  <span className="text-2xl md:text-3xl font-black text-gray-900">
                    Rs.{salePrice}
                  </span>
                  <span className="text-xl md:text-2xl text-gray-400 line-through">
                    Rs.{regularPrice}
                  </span>
                </>
              ) : (
                <span className="text-4xl font-black text-gray-900">
                  Rs.{regularPrice}
                </span>
              )}
            </div>

            {/* VARIATIONS */}
            {product.type === "variable" && (
              <div className="flex gap-2  flex-wrap">
                {product.variations.map((v) => {
                  const label = v.attributes
                    ?.map((a) => a.attribute_value_name)
                    .join(" | ");

                  return (
                    <button
                      key={v.id}
                      onClick={() => setSelectedVariation(v)}
                      className={`px-2 py-1 text-[12px] border rounded 
          ${
            selectedVariation?.id === v.id
              ? "bg-brand-green text-white border-brand-green"
              : "border-gray-200"
          }`}
                    >
                      {label}
                    </button>
                  );
                })}
              </div>
            )}

            {/* STOCK */}
            <p
              className={`text-sm my-2 font-semibold ${getStockColor(product.stock_message)}`}
            >
              {product.stock_message}
            </p>

            <p className="text-gray-600 text-sm mb-8 leading-relaxed">
              {product.description ||
                "Our premium quality produce is sourced directly from local farms to ensure maximum freshness and taste for your kitchen."}
            </p>

            {/* ADD TO CART */}
            <button className="w-full bg-gray-900 hover:bg-brand-green text-white py-5 rounded-2xl font-bold text-lg transition-all flex items-center justify-center gap-3 shadow-xl active:scale-95">
              <FiShoppingCart /> Add To Cart
            </button>
          </div>
        </div>

        {/* ================= RELATED PRODUCTS ================= */}
        {related?.length > 0 && (
          <div className="bg-gray-50/80 p-8 border-t border-gray-100">
            <h3 className="text-[11px] font-black text-gray-400 uppercase tracking-[0.2em] mb-6">
              Related Products
            </h3>

            <div className="grid grid-cols-1 sm:grid-cols-3 gap-6">
              {related.map((item) => {
                const img =
                  item.images?.find((i) => i.is_primary) || item.images?.[0];

                const price =
                  item.type === "variable"
                    ? item.variations?.[0]?.sale_price ||
                      item.variations?.[0]?.regular_price
                    : item.is_on_sale
                      ? item.sale_price
                      : item.regular_price;

                return (
                  <div
                    key={item.id}
                    onClick={() => onSwitchProduct(item)}
                    className="bg-white p-4 rounded-2xl border border-gray-100 flex items-center gap-4 hover:border-emerald-400 hover:shadow-lg transition-all cursor-pointer group"
                  >
                    <div className="w-14 h-14 bg-gray-50 rounded-xl overflow-hidden">
                      {img && (
                        <img
                          src={`${import.meta.env.VITE_REACT_APP_IMAGE_URL}/${img.image}`}
                          className="w-full h-full object-contain p-1 group-hover:scale-110"
                          alt=""
                        />
                      )}
                    </div>

                    <div className="min-w-0">
                      <p className="text-xs font-bold text-gray-900 truncate">
                        {item.name}
                      </p>
                      <p className="text-xs text-brand-green font-black">
                        Rs.{price}
                      </p>
                    </div>
                  </div>
                );
              })}
            </div>
          </div>
        )}
      </div>
    </div>
  );
}

export default QuickViewModal;

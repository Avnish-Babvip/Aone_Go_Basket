import React, { useState, useMemo, useEffect } from "react";
import {
  FiX,
  FiShoppingCart,
  FiStar,
  FiFilter,
  FiChevronDown,
  FiChevronUp,
} from "react-icons/fi";

// --- MOCK DATA ---
const PRODUCTS_DATA = [
  // --- Electronics ---
  {
    id: 1,
    name: "Sony WH-1000XM5 Wireless Headphones",
    category: "Electronics",
    subCategory: "Audio",
    price: 399,
    salePrice: 349,
    isSale: true,
    isNew: true,
    rating: 4.8,
    images: [
      "https://images.unsplash.com/photo-1505740420928-5e560c06d30e?w=800",
      "https://images.unsplash.com/photo-1523275335684-37898b6baf30?w=800",
    ],
    description:
      "Industry-leading noise cancellation with 30-hour battery life and crystal-clear hands-free calling.",
  },
  {
    id: 2,
    name: "Apple Watch Series 9 - GPS",
    category: "Electronics",
    subCategory: "Wearables",
    price: 429,
    salePrice: 399,
    isSale: true,
    isNew: true,
    rating: 4.9,
    images: [
      "https://images.unsplash.com/photo-1523275335684-37898b6baf30?w=800",
    ],
    description:
      "Advanced health sensors and a brighter display with the powerful new S9 SiP chip.",
  },
  {
    id: 3,
    name: "Logitech MX Master 3S Mouse",
    category: "Electronics",
    subCategory: "Computers",
    price: 99,
    isSale: false,
    isNew: false,
    rating: 4.7,
    images: [
      "https://images.unsplash.com/photo-1527864550417-7fd91fc51a46?w=800",
    ],
    description:
      "Quiet clicks and 8K DPI tracking for ultimate precision and workflow efficiency.",
  },
  {
    id: 4,
    name: "Samsung 27-inch Curved Monitor",
    category: "Electronics",
    subCategory: "Computers",
    price: 299,
    salePrice: 249,
    isSale: true,
    isNew: false,
    rating: 4.6,
    images: [
      "https://images.unsplash.com/photo-1527443224154-c4a3942d3acf?w=800",
    ],
    description:
      "Immersive viewing experience with a sleek 1500R curvature and vivid color detail.",
  },
  {
    id: 5,
    name: "Portable 1TB SSD Drive",
    category: "Electronics",
    subCategory: "Computers",
    price: 120,
    isSale: false,
    isNew: true,
    rating: 4.8,
    images: [
      "https://images.unsplash.com/photo-1597740985671-2a8a3b80502e?w=800",
    ],
    description:
      "Ultra-fast data transfer speeds in a compact, shock-resistant metal design.",
  },

  // --- Apparel ---
  {
    id: 6,
    name: "Premium Selvedge Denim Jeans",
    category: "Apparel",
    subCategory: "Jeans",
    price: 120,
    salePrice: 85,
    isSale: true,
    isNew: false,
    rating: 4.4,
    images: ["https://images.unsplash.com/photo-1542272604-787c3835535d?w=800"],
    description:
      "Classic straight-leg fit made from 14oz Japanese indigo denim with a finished edge.",
  },
  {
    id: 7,
    name: "Organic Cotton White T-Shirt",
    category: "Apparel",
    subCategory: "T-Shirts",
    price: 25,
    isSale: false,
    isNew: true,
    rating: 4.5,
    images: [
      "https://images.unsplash.com/photo-1521572267360-ee0c2909d518?w=800",
    ],
    description:
      "Soft, breathable sustainable cotton with a reinforced collar for daily durability.",
  },
  {
    id: 8,
    name: "Waterproof Winter Parka",
    category: "Apparel",
    subCategory: "Jackets",
    price: 250,
    salePrice: 199,
    isSale: true,
    isNew: false,
    rating: 4.7,
    images: [
      "https://images.unsplash.com/photo-1591047139829-d91aecb6caea?w=800",
    ],
    description:
      "Insulated heavy-duty jacket designed for sub-zero temperatures and snowy conditions.",
  },
  {
    id: 9,
    name: "Leather Chelsea Boots",
    category: "Apparel",
    subCategory: "Shoes",
    price: 180,
    isSale: false,
    isNew: true,
    rating: 4.6,
    images: [
      "https://images.unsplash.com/photo-1520639889410-d65c36fbe9a3?w=800",
    ],
    description:
      "Handcrafted full-grain leather with elastic side panels and a pull tab for easy wear.",
  },
  {
    id: 10,
    name: "Classic Trench Coat",
    category: "Apparel",
    subCategory: "Jackets",
    price: 150,
    salePrice: 125,
    isSale: true,
    isNew: false,
    rating: 4.3,
    images: [
      "https://images.unsplash.com/photo-1582806119905-1bcc2220d912?w=800",
    ],
    description:
      "Timeless double-breasted design with adjustable waist belt and water-repellent finish.",
  },

  // --- Home & Kitchen ---
  {
    id: 11,
    name: "Adjustable Nordic Desk Lamp",
    category: "Home & Kitchen",
    subCategory: "Lighting",
    price: 89,
    salePrice: 65,
    isSale: true,
    isNew: true,
    rating: 4.6,
    images: [
      "https://images.unsplash.com/photo-1534073828943-f801091bb18c?w=800",
    ],
    description:
      "Minimalist wood and steel lamp with touch-sensitive dimming and warm LED bulb.",
  },
  {
    id: 12,
    name: "Ceramic Non-Stick Pan Set",
    category: "Home & Kitchen",
    subCategory: "Cookware",
    price: 110,
    isSale: false,
    isNew: false,
    rating: 4.8,
    images: [
      "https://images.unsplash.com/photo-1584946112236-996a0ee3c70f?w=800",
    ],
    description:
      "Toxin-free ceramic coating for effortless food release and easy cleanup.",
  },
  {
    id: 13,
    name: "Electric Gooseneck Kettle",
    category: "Home & Kitchen",
    subCategory: "Cookware",
    price: 95,
    salePrice: 79,
    isSale: true,
    isNew: true,
    rating: 4.7,
    images: [
      "https://images.unsplash.com/photo-1577906030528-793562527051?w=800",
    ],
    description:
      "Precision pour-over spout with built-in temperature control and 60-minute hold.",
  },
  {
    id: 14,
    name: "Modern Velvet Accent Chair",
    category: "Home & Kitchen",
    subCategory: "Decor",
    price: 350,
    isSale: false,
    isNew: true,
    rating: 4.9,
    images: [
      "https://images.unsplash.com/photo-1567538096630-e0c55bd6374c?w=800",
    ],
    description:
      "Soft velvet upholstery with gold-finished legs for a touch of luxury in any room.",
  },
  {
    id: 15,
    name: "Aromatherapy Oil Diffuser",
    category: "Home & Kitchen",
    subCategory: "Decor",
    price: 45,
    salePrice: 35,
    isSale: true,
    isNew: false,
    rating: 4.5,
    images: [
      "https://images.unsplash.com/photo-1608571423902-eed4a5ad8108?w=800",
    ],
    description:
      "Ultrasonic mist technology with 7 color options and automatic shut-off feature.",
  },

  // --- Accessories ---
  {
    id: 16,
    name: "Premium Leather Briefcase",
    category: "Accessories",
    subCategory: "Bags",
    price: 185,
    salePrice: 150,
    isSale: true,
    isNew: false,
    rating: 4.7,
    images: ["https://images.unsplash.com/photo-1548036328-c9fa89d128fa?w=800"],
    description:
      "Full-grain vegetable-tanned leather with dedicated padded laptop compartment.",
  },
  {
    id: 17,
    name: "Polarized Retro Sunglasses",
    category: "Accessories",
    subCategory: "Bags",
    price: 60,
    isSale: false,
    isNew: true,
    rating: 4.4,
    images: [
      "https://images.unsplash.com/photo-1511499767390-903390e62bc0?w=800",
    ],
    description:
      "UVA/UVB protection with lightweight acetate frames and scratch-resistant lenses.",
  },
  {
    id: 18,
    name: "Stainless Steel Water Bottle",
    category: "Accessories",
    subCategory: "Bags",
    price: 35,
    salePrice: 28,
    isSale: true,
    isNew: false,
    rating: 4.6,
    images: [
      "https://images.unsplash.com/photo-1602143393494-144933902641?w=800",
    ],
    description:
      "Vacuum insulated bottle that keeps drinks cold for 24 hours or hot for 12 hours.",
  },
  {
    id: 19,
    name: "Minimalist Leather Wallet",
    category: "Accessories",
    subCategory: "Bags",
    price: 45,
    isSale: false,
    isNew: false,
    rating: 4.5,
    images: [
      "https://images.unsplash.com/photo-1627123424574-724758594e93?w=800",
    ],
    description:
      "Ultra-slim RFID-blocking wallet designed to hold up to 10 cards and cash.",
  },
  {
    id: 20,
    name: "Cotton Travel Weekender Bag",
    category: "Accessories",
    subCategory: "Bags",
    price: 120,
    salePrice: 95,
    isSale: true,
    isNew: true,
    rating: 4.7,
    images: ["https://images.unsplash.com/photo-1544816155-12df9643f363?w=800"],
    description:
      "Large capacity canvas bag with reinforced leather handles for short trips.",
  },
];

// --- 1. QUICK VIEW MODAL ---
function QuickViewModal({ product, onClose, allProducts, onSwitchProduct }) {
  const [activeImg, setActiveImg] = useState(0);

  useEffect(() => {
    document.body.style.overflow = "hidden";
    return () => {
      document.body.style.overflow = "unset";
    };
  }, []);

  if (!product) return null;
  const images = product.images || [];
  const related = allProducts
    .filter((p) => p.category === product.category && p.id !== product.id)
    .slice(0, 3);

  return (
    <div className="fixed inset-0 z-[2000] flex items-center justify-center p-4 bg-black/70 backdrop-blur-md overflow-y-auto">
      <div className="bg-white rounded-[2.5rem] max-w-5xl w-full my-auto overflow-hidden relative shadow-2xl animate-in fade-in zoom-in duration-300">
        <button
          onClick={onClose}
          className="absolute top-6 right-6 text-gray-400 hover:text-black z-50 bg-gray-100 p-2 rounded-full transition-all"
        >
          <FiX size={24} />
        </button>

        <div className="flex flex-col md:flex-row">
          {/* Left: Images */}
          <div className="w-full md:w-1/2 bg-gray-50 p-6 md:p-10 flex gap-4">
            <div className="hidden md:flex flex-col gap-3">
              {images.map((img, i) => (
                <button
                  key={i}
                  onClick={() => setActiveImg(i)}
                  className={`w-16 h-16 rounded-xl border-2 overflow-hidden transition-all ${activeImg === i ? "border-brand-green scale-105 shadow-md" : "border-transparent opacity-60"}`}
                >
                  <img
                    src={img}
                    className="w-full h-full object-cover"
                    alt=""
                  />
                </button>
              ))}
            </div>
            <div className="flex-1 bg-white rounded-3xl flex items-center justify-center p-8 shadow-inner relative">
              <img
                src={images[activeImg]}
                className="max-h-[400px] w-auto object-contain transition-all duration-500"
                alt={product.name}
              />
            </div>
          </div>

          {/* Right: Info */}
          <div className="w-full md:w-1/2 p-8 md:p-12 flex flex-col justify-center">
            <span className="text-brand-green font-black text-[10px] uppercase tracking-[0.2em] mb-2">
              {product.category}
            </span>
            <h2 className="text-3xl font-black text-gray-900 leading-tight mb-4">
              {product.name}
            </h2>
            <p>{product.name}</p>
            <div className="flex items-center gap-1 text-amber-500 mb-6">
              {[...Array(5)].map((_, i) => (
                <FiStar
                  key={i}
                  fill={
                    i < Math.floor(product.rating) ? "currentColor" : "none"
                  }
                />
              ))}
              <span className="ml-2 text-gray-400 font-bold text-sm">
                {product.rating}
              </span>
            </div>
            <div className="flex items-baseline gap-4 mb-8">
              <span className="text-4xl font-black text-gray-900">
                Rs.{product.isSale ? product.salePrice : product.price}
              </span>
              {product.isSale && (
                <span className="text-xl text-gray-400 line-through">
                  Rs.{product.price}
                </span>
              )}
            </div>
            <button className="w-full bg-gray-900 hover:bg-brand-green text-white py-5 rounded-2xl font-bold text-lg transition-all flex items-center justify-center gap-3 shadow-xl active:scale-95">
              <FiShoppingCart /> Add To Cart
            </button>
          </div>
        </div>

        {/* Related Products Section */}
        {related.length > 0 && (
          <div className="bg-gray-50/80 p-8 border-t border-gray-100">
            <h3 className="text-[11px] font-black text-gray-400 uppercase tracking-[0.2em] mb-6">
              Related Products
            </h3>
            <div className="grid grid-cols-1 sm:grid-cols-3 gap-6">
              {related.map((item) => (
                <div
                  key={item.id}
                  onClick={() => onSwitchProduct(item)}
                  className="bg-white p-4 rounded-2xl border border-gray-100 flex items-center gap-4 hover:border-emerald-400 hover:shadow-lg transition-all cursor-pointer group"
                >
                  <div className="w-14 h-14 bg-gray-50 rounded-xl overflow-hidden flex-shrink-0">
                    <img
                      src={item.images[0]}
                      className="w-full h-full object-contain p-1 group-hover:scale-110 transition-transform"
                      alt=""
                    />
                  </div>
                  <div className="min-w-0">
                    <p className="text-xs font-bold text-gray-900 truncate">
                      {item.name}
                    </p>
                    <p className="text-xs text-brand-green font-black">
                      Rs.{item.isSale ? item.salePrice : item.price}
                    </p>
                  </div>
                </div>
              ))}
            </div>
          </div>
        )}
      </div>
    </div>
  );
}

// --- 2. PRODUCT LIST COMPONENT ---
function ProductList({ products, onQuickView }) {
  if (products.length === 0)
    return <div className="...">No products found...</div>;

  return (
    <div className="grid grid-cols-2 lg:grid-cols-3 xl:grid-cols-3 2xl:grid-cols-4 gap-4 md:gap-8">
      {products.map((product, index) => (
        // ✅ Call your new component here!
        <ProductCard
          key={product.id}
          product={product}
          onQuickView={onQuickView}
          index={index}
        />
      ))}
    </div>
  );
}

// --- 3. FILTER SIDEBAR COMPONENT ---
function FilterSidebar({ onFilterChange, currentFilters }) {
  const [openCategory, setOpenCategory] = useState("Apparel");
  const [isMobileOpen, setIsMobileOpen] = useState(false);

  const sections = [
    {
      id: "Apparel",
      label: "Apparel",
      options: ["T-Shirts", "Jeans", "Jackets", "Shoes"],
    },
    {
      id: "Electronics",
      label: "Electronics",
      options: ["Audio", "Wearables", "Computers"],
    },
    {
      id: "Home & Kitchen",
      label: "Home & Kitchen",
      options: ["Cookware", "Lighting", "Decor"],
    },
  ];

  const content = (
    <div className="space-y-8">
      <div className="flex justify-between items-center">
        <h3 className="text-xl font-black">Filters</h3>
        <button
          onClick={() =>
            onFilterChange({
              category: "All",
              subCategory: "All",
              price: 1000,
              sortBy: "default",
            })
          }
          className="text-xs font-bold text-brand-green"
        >
          Reset
        </button>
      </div>
      <div className="space-y-4">
        {sections.map((section) => (
          <div
            key={section.id}
            className={`p-4 rounded-2xl border transition-all ${openCategory === section.id ? "bg-gray-50 border-transparent" : "bg-white border-gray-100"}`}
          >
            <button
              onClick={() =>
                setOpenCategory(openCategory === section.id ? null : section.id)
              }
              className="flex justify-between w-full font-bold text-sm"
            >
              {section.label}
              <FiChevronDown
                className={`transition-transform ${openCategory === section.id ? "rotate-180" : ""}`}
              />
            </button>
            {openCategory === section.id && (
              <div className="mt-4 space-y-2">
                {section.options.map((opt) => (
                  <button
                    key={opt}
                    onClick={() => {
                      onFilterChange({
                        ...currentFilters,
                        category: section.id,
                        subCategory: opt,
                      });
                      if (window.innerWidth < 768) setIsMobileOpen(false);
                    }}
                    className={`w-full text-left px-3 py-2 rounded-lg text-sm font-medium ${currentFilters.subCategory === opt ? "bg-brand-green text-white" : "hover:bg-emerald-50"}`}
                  >
                    {opt}
                  </button>
                ))}
              </div>
            )}
          </div>
        ))}
      </div>
      <div>
        <div className="flex justify-between mb-4">
          <h4 className="text-xs font-black uppercase text-gray-400">
            Max Price
          </h4>
          <span className="font-black">${currentFilters.price}</span>
        </div>
        <input
          type="range"
          min="0"
          max="1000"
          value={currentFilters.price}
          onChange={(e) =>
            onFilterChange({
              ...currentFilters,
              price: parseInt(e.target.value),
            })
          }
          className="w-full accent-brand-green"
        />
      </div>
    </div>
  );

  return (
    <>
      <button
        onClick={() => setIsMobileOpen(true)}
        className="md:hidden w-full py-4 bg-gray-900 text-white rounded-2xl font-bold mb-6 flex items-center justify-center gap-2 shadow-xl"
      >
        <FiFilter /> Filter & Sort
      </button>
      <aside className="hidden md:block sticky top-24 bg-white p-8 rounded-[2rem] border border-gray-100 shadow-xl">
        {content}
      </aside>
      {isMobileOpen && (
        <div className="fixed inset-0 z-[2000] md:hidden">
          <div
            className="absolute inset-0 bg-black/60 backdrop-blur-sm"
            onClick={() => setIsMobileOpen(false)}
          />
          <div className="absolute bottom-0 left-0 right-0 bg-white rounded-t-[2.5rem] p-8 max-h-[85vh] overflow-y-auto animate-in slide-in-from-bottom duration-500">
            <div className="w-12 h-1.5 bg-gray-200 rounded-full mx-auto mb-8" />
            {content}
            <button
              onClick={() => setIsMobileOpen(false)}
              className="w-full mt-8 py-5 bg-brand-green text-white font-black rounded-2xl"
            >
              Show Results
            </button>
          </div>
        </div>
      )}
    </>
  );
}

// --- 4. MAIN PAGE ---
export default function ProductsPage() {
  const [selectedProduct, setSelectedProduct] = useState(null);
  const [filters, setFilters] = useState({
    category: "All",
    subCategory: "All",
    price: 1000,
    sortBy: "default",
  });

  const filteredProducts = useMemo(() => {
    let res = PRODUCTS_DATA.filter(
      (p) =>
        (filters.category === "All" || p.category === filters.category) &&
        (filters.subCategory === "All" ||
          p.subCategory === filters.subCategory) &&
        (p.isSale ? p.salePrice : p.price) <= filters.price,
    );
    if (filters.sortBy === "price-asc")
      res.sort(
        (a, b) =>
          (a.isSale ? a.salePrice : a.price) -
          (b.isSale ? b.salePrice : b.price),
      );
    if (filters.sortBy === "price-desc")
      res.sort(
        (a, b) =>
          (b.isSale ? b.salePrice : b.price) -
          (a.isSale ? a.salePrice : a.price),
      );
    if (filters.sortBy === "newest") res.sort((a, b) => b.isNew - a.isNew);
    return res;
  }, [filters]);

  return (
    <div className="min-h-screen bg-[#FAFAFA] py-10 px-4 md:px-8">
      <div className="max-w-7xl mx-auto flex flex-col lg:flex-row md:gap-10">
        <div className="w-full lg:w-80 mt-14">
          <FilterSidebar onFilterChange={setFilters} currentFilters={filters} />
        </div>
        <main className="flex-1 ">
          <div className="flex flex-col sm:flex-row justify-between items-center  md:mt-14 mb-5 bg-white py-3 px-5 rounded-[2rem] border border-gray-100 shadow-sm gap-4">
            <h1 className="text-sm font-bold">
              Showing{" "}
              <span className="text-brand-green font-black">
                {filteredProducts.length}
              </span>{" "}
              Products
            </h1>
            <select
              value={filters.sortBy}
              onChange={(e) =>
                setFilters({ ...filters, sortBy: e.target.value })
              }
              className="bg-gray-50 border-none text-sm font-bold rounded-2xl py-3 pl-4 pr-10 w-full sm:w-56 cursor-pointer outline-none focus:ring-2 focus:ring-brand-green transition-all"
            >
              <option value="default">Featured</option>
              <option value="price-asc">Price: Low to High</option>
              <option value="price-desc">Price: High to Low</option>
              <option value="newest">Newest Arrivals</option>
            </select>
          </div>
          <ProductList
            products={filteredProducts}
            onQuickView={setSelectedProduct}
          />
        </main>
      </div>
      {selectedProduct && (
        <QuickViewModal
          product={selectedProduct}
          allProducts={PRODUCTS_DATA}
          onClose={() => setSelectedProduct(null)}
          onSwitchProduct={setSelectedProduct}
        />
      )}
    </div>
  );
}

function ProductCard({ product, onQuickView }) {
  // 1. Create a local state for quantity
  const [qty, setQty] = useState(0);

  return (
    <div className="group bg-white rounded-3xl p-4 border border-gray-100 hover:shadow-2xl transition-all duration-500 relative flex flex-col h-full">
      <div className="relative aspect-square mb-4 bg-gray-50 rounded-2xl overflow-hidden">
        {/* 🏷️ Badges */}
        <div className="absolute top-3 left-3 right-3 z-10 flex flex-row justify-between items-start">
          {/* If product.isNew is false, this side will be empty */}
          <div>
            {product.isNew && (
              <span className="bg-brand-green text-white text-[10px] font-black px-2 py-1 rounded-lg uppercase shadow-md">
                New
              </span>
            )}
          </div>

          {/* This side stays on the right */}
          <div>
            {product.isSale && (
              <span className="bg-red-500 text-white text-[10px] font-black px-2 py-1 rounded-lg uppercase shadow-md">
                Sale
              </span>
            )}
          </div>
        </div>
        <img
          src={product.images[0]}
          className="w-full h-full object-contain p-6 group-hover:scale-110 transition-transform duration-500"
          alt={product.name}
        />

        <button
          onClick={() => onQuickView(product)}
          className="absolute bottom-4 left-4 right-4 bg-white/90 backdrop-blur-md text-gray-900 py-3 rounded-xl font-bold text-xs opacity-0 group-hover:opacity-100 transition-all transform translate-y-2 group-hover:translate-y-0 shadow-lg"
        >
          Quick View
        </button>
      </div>

      <div className="flex-1">
        <h3 className="font-bold text-gray-900 text-sm truncate mb-1">
          {product.name}
        </h3>
        <div className="flex items-baseline gap-2 mb-4">
          {/* Current Price (Sale or Regular) */}
          <span className="text-brand-green font-black text-lg">
            Rs.{product.isSale ? product.salePrice : product.price}
          </span>

          {/* Original Price (Only shown if on sale) */}
          {product.isSale && (
            <span className="text-gray-400 line-through text-sm">
              Rs.{product.price}
            </span>
          )}
        </div>{" "}
      </div>

      {/* 🛒 Action Area */}
      <div className="mt-auto pt-2">
        {qty === 0 ? (
          // Initial "Add to Cart" Button
          <button
            onClick={() => setQty(1)}
            className="w-full bg-gray-900 text-white py-3 rounded-xl font-bold text-xs flex items-center justify-center gap-2 hover:bg-brand-green transition-all active:scale-95 shadow-lg shadow-gray-200"
          >
            <FiShoppingCart className="text-lg" /> Add to Cart
          </button>
        ) : (
          // Interactive Quantity Box
          <div className="flex items-center justify-between bg-gray-100 rounded-xl p-1 animate-in fade-in zoom-in duration-300 ring-2 ring-brand-green/20">
            <button
              onClick={() => setQty(Math.max(0, qty - 1))}
              className="p-2 bg-white hover:bg-red-50 text-red-500 rounded-lg transition-all shadow-sm"
            >
              <FiChevronDown />
            </button>

            <span className="font-black text-sm text-gray-900">{qty}</span>

            <button
              onClick={() => setQty(qty + 1)}
              className="p-2 bg-white hover:bg-emerald-50 text-brand-green rounded-lg transition-all shadow-sm"
            >
              <FiChevronUp />
            </button>
          </div>
        )}
      </div>
    </div>
  );
}

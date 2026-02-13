import React, { useState, useMemo, useEffect } from "react";
import {
  FiX,
  FiShoppingCart,
  FiStar,
  FiFilter,
  FiChevronDown,
  FiChevronUp,
} from "react-icons/fi";
import { useDispatch, useSelector } from "react-redux";
import { getAllProducts } from "../../features/actions/product";
import { useSearchParams } from "react-router-dom";
import Pagination from "../../components/Pagination";
import FilterSelect from "../../components/FilterSelect";
import QuickViewModal from "../../components/Product/QuickView";

export default function Product() {
  const dispatch = useDispatch();
  const [selectedProduct, setSelectedProduct] = useState(null);
  const { productData, productLoading } = useSelector((state) => state.product);
  const data = productData?.data || [];
  const hasData = Array.isArray(data) && data.length > 0;

  const [searchParams, setSearchParams] = useSearchParams();
  const page = Number(searchParams.get("page")) || 1;
  const searchQuery = searchParams.get("search") || "";
  const sort = searchParams.get("sort") || "";

  const updateParams = ({ page, search, sort }) => {
    const params = {};
    if (page) params.page = page;
    if (search) params.search = search;
    if (sort) params.sort = sort;
    setSearchParams(params);
  };

  const [filters, setFilters] = useState({
    category: "All",
    subCategory: "All",
    price: 1000,
    sortBy: "default",
  });

  // const filteredProducts = useMemo(() => {
  //   let res = PRODUCTS_DATA.filter(
  //     (p) =>
  //       (filters.category === "All" || p.category === filters.category) &&
  //       (filters.subCategory === "All" ||
  //         p.subCategory === filters.subCategory) &&
  //       (p.isSale ? p.salePrice : p.price) <= filters.price,
  //   );
  //   if (filters.sortBy === "price-asc")
  //     res.sort(
  //       (a, b) =>
  //         (a.isSale ? a.salePrice : a.price) -
  //         (b.isSale ? b.salePrice : b.price),
  //     );
  //   if (filters.sortBy === "price-desc")
  //     res.sort(
  //       (a, b) =>
  //         (b.isSale ? b.salePrice : b.price) -
  //         (a.isSale ? a.salePrice : a.price),
  //     );
  //   if (filters.sortBy === "newest") res.sort((a, b) => b.isNew - a.isNew);
  //   return res;
  // }, [filters]);

  useEffect(() => {
    dispatch(getAllProducts({ search: searchQuery, page, sort }));
  }, [page, searchQuery, sort]);

  return (
    <div className="min-h-screen bg-[#FAFAFA] py-10 px-4 lg:px-8">
      <div className="max-w-7xl mx-auto flex flex-col lg:flex-row lg:gap-10">
        <div className="w-full lg:w-80 mt-14">
          <FilterSidebar onFilterChange={setFilters} currentFilters={filters} />
        </div>
        <main className="flex-1 ">
          <div className="flex flex-col sm:flex-row justify-between items-center lg:mt-14 mb-5 bg-white py-3 px-5 rounded-[2rem] border border-gray-100 shadow-sm gap-4">
            <h1 className="text-sm font-bold">
              Showing{" "}
              <span className="text-brand-green ">
                {productData.from}–{productData.to} of {productData.total}
              </span>{" "}
              Products
            </h1>
            <FilterSelect
              label="Sort By"
              value={sort || "All"}
              options={[
                { label: "Price: Low To High", value: "price_asc" },
                { label: "Price: High To Low", value: "price_desc" },
                { label: "New", value: "new" },
                { label: "Featured", value: "featured" },
                { label: "New & Featured", value: "new_featured" },
              ]}
              onChange={(val) =>
                updateParams({
                  sort: val,
                  status,
                  page: 1,
                  search: searchQuery,
                })
              }
            />
          </div>
          <ProductList products={data} onQuickView={setSelectedProduct} />
          {/* PAGINATION */}
          {!productLoading && hasData && productData && (
            <Pagination
              data={productData}
              page={page}
              onPageChange={updateParams}
              extraParams={{ search: searchQuery, sort }}
            />
          )}
        </main>
      </div>
      {selectedProduct && (
        <QuickViewModal
          product={selectedProduct}
          allProducts={data}
          onClose={() => setSelectedProduct(null)}
          onSwitchProduct={setSelectedProduct}
        />
      )}
    </div>
  );
}

// --- 2. PRODUCT LIST COMPONENT ---
function ProductList({ products, onQuickView }) {
  if (products.length === 0)
    return <div className="...">No products found...</div>;
  console.log(onQuickView);
  return (
    <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-2 xl:grid-cols-3 gap-4 md:gap-8">
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
        className="lg:hidden w-full py-4 bg-gray-900 text-white rounded-2xl font-bold mb-6 flex items-center justify-center gap-2 shadow-xl"
      >
        <FiFilter /> Filter & Sort
      </button>
      <aside className="hidden lg:block sticky top-24 bg-white p-8 rounded-[2rem] border border-gray-100 shadow-xl">
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

function ProductCard({ product, onQuickView }) {
  // 1. Create a local state for quantity
  const [quantity, setQuantity] = useState(0);
  const getStockColor = (message) => {
    if (!message) return "text-gray-500";

    if (message.toLowerCase().includes("out")) return "text-red-500";
    if (message.toLowerCase().includes("hurry")) return "text-orange-500";
    if (message.toLowerCase().includes("in stock")) return "text-green-600";

    return "text-gray-500";
  };

  const getDefaultVariation = () => {
    if (!product.variations?.length) return null;

    // find first not out of stock
    return (
      product.variations.find((v) => v.stock_status !== "out_of_stock") ||
      product.variations[0]
    );
  };

  const [selectedVariation, setSelectedVariation] =
    useState(getDefaultVariation);

  const stockMessage =
    product.type === "variable"
      ? selectedVariation?.stock_message
      : product.stock_message;

  const primaryImage =
    product.images?.find((img) => img.is_primary) || product.images?.[0];

  const salePrice =
    product.type === "variable"
      ? selectedVariation?.sale_price
      : product.sale_price;

  const regularPrice =
    product.type === "variable"
      ? selectedVariation?.regular_price
      : product.regular_price;

  const showSale = product.is_on_sale && salePrice;
  const isOutOfStock = stockMessage?.toLowerCase().includes("out");

  useEffect(() => {
    if (isOutOfStock) setQuantity(0);
  }, [selectedVariation]);

  return (
    <div className="group bg-white rounded-3xl p-4 border border-gray-100 hover:shadow-2xl transition-all duration-500 relative flex flex-col h-full">
      <div className="relative aspect-square mb-4 bg-gray-50 rounded-2xl overflow-hidden">
        {/* 🏷️ Badges */}
        <div className="absolute top-3 left-3 right-3 z-10 flex flex-row justify-between items-start">
          {/* If product.isNew is false, this side will be empty */}
          <div>
            {product.is_new && (
              <span className="bg-brand-green text-white text-[10px] font-black px-2 py-1 rounded-lg uppercase shadow-md">
                New
              </span>
            )}
          </div>

          {/* This side stays on the right */}
          <div>
            {product.is_on_sale && (
              <span className="bg-red-500 text-white text-[10px] font-black px-2 py-1 rounded-lg uppercase shadow-md">
                Sale
              </span>
            )}
          </div>
        </div>
        <img
          src={`${import.meta.env.VITE_REACT_APP_IMAGE_URL}/${primaryImage?.image}`}
          className="w-full h-full object-contain p-6 group-hover:scale-110 transition-transform duration-500"
          alt={product.name}
        />

        {/* Eye Icon Overlay */}
        <div
          onClick={() => onQuickView(product)}
          className="absolute inset-0 bg-black/5 opacity-0 group-hover:opacity-100 flex items-center justify-center transition-opacity"
        >
          <div className="bg-white p-2 rounded-full shadow-md hover:bg-brand-green hover:text-white transition-colors">
            <svg
              className="w-4 h-4"
              fill="none"
              stroke="currentColor"
              viewBox="0 0 24 24"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth="2"
                d="M15 12a3 3 0 11-6 0 3 3 0 016 0z"
              />
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth="2"
                d="M2.458 12C3.732 7.943 7.523 5 12 5c4.478 0 8.268 2.943 9.542 7-1.274 4.057-5.064 7-9.542 7-4.477 0-8.268-2.943-9.542-7z"
              />
            </svg>
          </div>
        </div>
      </div>

      <div className="flex-1">
        <h3 className="text-sm capitalize font-semibold text-gray-700 mt-1 line-clamp-2">
          {product.name}
        </h3>
        {/* PRICE */}
        <div className="flex-grow">
          <div className="flex flex-col sm:flex-row sm:items-center gap-1 sm:gap-2 min-w-0">
            {showSale ? (
              <>
                <span className="font-bold text-sm md:text-base text-gray-900 whitespace-nowrap">
                  Rs.{salePrice}
                </span>

                <span className="text-[12px] md:text-sm text-gray-400 line-through">
                  Rs.{regularPrice}
                </span>
              </>
            ) : (
              <span className="font-bold md:text-base text-gray-900">
                Rs.{regularPrice}
              </span>
            )}
          </div>
        </div>

        {/* VARIATIONS */}
        {product.type === "variable" && (
          <div className="flex gap-2 mt-2 flex-wrap">
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
        <p
          className={`text-sm pt-2 font-semibold ${getStockColor(stockMessage)}`}
        >
          {stockMessage}
        </p>
      </div>

      {/* 🛒 Action Area */}
      <div className="mt-auto pt-2">
        {quantity === 0 ? (
          // Initial "Add to Cart" Button
          <button
            disabled={isOutOfStock}
            onClick={() => !isOutOfStock && setQuantity(1)}
            className={`w-full  py-3 rounded-xl font-bold text-xs flex items-center justify-center gap-2   ${
              isOutOfStock
                ? "bg-gray-300 text-gray-500 cursor-not-allowed"
                : "bg-gray-900 hover:bg-brand-green text-white"
            }`}
          >
            <FiShoppingCart className="text-lg" /> Add to Cart
          </button>
        ) : (
          // Interactive Quantity Box
          <div className="flex items-center justify-between bg-gray-100 rounded-xl p-1 animate-in fade-in zoom-in duration-300 ring-2 ring-brand-green/20">
            <button
              onClick={() => quantity(Math.max(0, quantity - 1))}
              className="p-2 bg-white hover:bg-red-50 text-red-500 rounded-lg transition-all shadow-sm"
            >
              <FiChevronDown />
            </button>

            <span className="font-black text-sm text-gray-900">{quantity}</span>

            <button
              onClick={() => quantity(quantity + 1)}
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

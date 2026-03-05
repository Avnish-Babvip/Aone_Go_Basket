import React, { useState, useEffect } from "react";
import {
  FiShoppingCart,
  FiFilter,
  FiChevronDown,
  FiChevronUp,
  FiTrash,
  FiHeart,
} from "react-icons/fi";
import { FaHeart } from "react-icons/fa";
import { useDispatch, useSelector } from "react-redux";
import { getAllProducts } from "../../features/actions/product";
import { useSearchParams } from "react-router-dom";
import Pagination from "../../components/Pagination";
import FilterSelect from "../../components/FilterSelect";
import QuickViewModal from "../../components/Product/QuickView";
import { getAllCategoriesWithSubCategories } from "../../features/actions/category";
import { addToCart, deleteCart, updateCart } from "../../features/actions/cart";
import {
  addToWishlist,
  removeFromWishlist,
} from "../../features/actions/wishlist";

export default function Product() {
  const dispatch = useDispatch();
  const [selectedProduct, setSelectedProduct] = useState(null);
  const { productData, productLoading } = useSelector((state) => state.product);
  const { categoryData } = useSelector((state) => state.category);
  const data = productData?.data || [];
  const hasData = Array.isArray(data) && data.length > 0;
  const { priceData } = useSelector((state) => state.category);
  const [searchParams, setSearchParams] = useSearchParams();
  const page = Number(searchParams.get("page")) || 1;
  const searchQuery = searchParams.get("search") || "";
  const sort = searchParams.get("sort") || "";
  const min_price = searchParams.get("min_price");
  const max_price = searchParams.get("max_price");
  const category_slug = searchParams.get("category_slug")?.split(",");

  const updateParams = ({
    page,
    search,
    sort,
    min_price,
    max_price,
    category_slug,
  }) => {
    const params = {};

    if (page) params.page = page;
    if (search) params.search = search;
    if (sort) params.sort = sort;

    if (min_price !== null)
      params.min_price = min_price || priceData?.min_price;
    if (max_price !== null)
      params.max_price = max_price || priceData?.max_price;

    if (category_slug?.length) params.category_slug = category_slug.join(",");

    setSearchParams(params);
  };

  const [filters, setFilters] = useState({
    minPrice: priceData?.min_price || null,
    maxPrice: priceData?.max_price || null,
  });

  const getSlugById = (id) => {
    let slug = null;

    const walk = (arr) => {
      for (const c of arr) {
        if (c.id === id) {
          slug = c.slug;
          return;
        }
        if (c.children_recursive?.length) walk(c.children_recursive);
      }
    };

    walk(categoryData || []);
    return slug;
  };

  useEffect(() => {
    dispatch(
      getAllProducts({
        search: searchQuery,
        page,
        sort,
        min_price,
        max_price,
        category_slug,
      }),
    );

    window.scrollTo({
      top: 0,
      behavior: "smooth", // remove if you don't want animation
    });
  }, [page, searchQuery, sort, min_price, max_price, searchParams]);

  useEffect(() => {
    dispatch(getAllCategoriesWithSubCategories());
  }, []);

  return (
    <div className="min-h-screen bg-[#FAFAFA] py-10 px-4 lg:px-8">
      <div className="max-w-7xl mx-auto flex flex-col lg:flex-row lg:gap-10">
        <div className="w-full lg:w-80 mt-14">
          <FilterSidebar
            onFilterChange={(newFilters) => {
              setFilters(newFilters);

              const allIds = [
                ...(newFilters.category || []),
                ...(newFilters.subCategory || []),
              ];

              const slugs = allIds.map(getSlugById).filter(Boolean); // remove null

              updateParams({
                page: 1,
                search: searchQuery,
                sort,
                min_price: newFilters.minPrice,
                max_price: newFilters.maxPrice,
                category_slug: slugs,
              });
            }}
            currentFilters={filters}
            category={categoryData || []}
          />
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
          <ProductList
            products={data}
            onQuickView={setSelectedProduct}
            page={page}
            searchQuery={searchQuery}
            sort={sort}
            min_price={min_price}
            max_price={max_price}
            category_slug={category_slug}
            clearFilters={() => {
              setFilters({
                minPrice: priceData?.min_price,
                maxPrice: priceData?.max_price,
              });

              setSearchParams({ page: 1 });
            }}
          />
          {/* PAGINATION */}
          {!productLoading && hasData && productData && (
            <Pagination
              data={productData}
              page={page}
              onPageChange={updateParams}
              extraParams={{
                search: searchQuery,
                sort,
                min_price,
                max_price,
                category_slug,
              }}
            />
          )}
        </main>
      </div>
      {selectedProduct && (
        <QuickViewModal
          product={selectedProduct}
          onClose={() => setSelectedProduct(null)}
          onSwitchProduct={setSelectedProduct}
        />
      )}
    </div>
  );
}

// --- 2. PRODUCT LIST COMPONENT ---
function ProductList({
  products,
  onQuickView,
  clearFilters,
  page,
  searchQuery,
  sort,
  min_price,
  max_price,
  category_slug,
}) {
  const { productLoading } = useSelector((state) => state.product);

  if (productLoading) {
    return (
      <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-2 xl:grid-cols-3 gap-4 md:gap-8">
        {Array.from({ length: 6 }).map((_, index) => (
          <ProductCardSkeleton key={index} />
        ))}
      </div>
    );
  }

  if (products.length === 0)
    return (
      <div className="col-span-full flex flex-col items-center justify-center text-center py-24 px-6">
        {/* Icon */}
        <div className="w-20 h-20 flex items-center justify-center rounded-full bg-gray-100 mb-6 shadow-inner">
          <FiShoppingCart className="text-3xl text-gray-400" />
        </div>

        {/* Heading */}
        <h2 className="text-xl font-black text-gray-800 mb-2">
          No Products Found
        </h2>

        {/* Subtext */}
        <p className="text-gray-500 text-sm max-w-md mb-6">
          We couldn't find any products matching your filters. Try adjusting
          your search or clearing filters to explore more items.
        </p>

        {/* Action Buttons */}
        <div className="flex gap-4">
          <button
            onClick={clearFilters}
            className="px-6 py-2 rounded-xl bg-brand-green text-white font-bold text-sm hover:bg-lime-500 transition"
          >
            Clear Filters
          </button>
        </div>
      </div>
    );

  return (
    <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-2 xl:grid-cols-3 gap-4 md:gap-8">
      {products.map((product) => (
        <ProductCard
          key={product.id}
          product={product}
          onQuickView={onQuickView}
          page={page}
          searchQuery={searchQuery}
          sort={sort}
          min_price={min_price}
          max_price={max_price}
          category_slug={category_slug}
        />
      ))}
    </div>
  );
}

function ProductCardSkeleton() {
  return (
    <div className="bg-white rounded-3xl p-4 border border-gray-100 animate-pulse flex flex-col h-full">
      {/* Image Skeleton */}
      <div className="aspect-square mb-4 bg-gray-200 rounded-2xl relative overflow-hidden" />

      <div className="flex-1 space-y-3">
        {/* Title */}
        <div className="h-4 bg-gray-200 rounded w-3/4"></div>
        <div className="h-4 bg-gray-200 rounded w-1/2"></div>

        {/* Price */}
        <div className="flex gap-3 mt-3">
          <div className="h-4 w-16 bg-gray-300 rounded"></div>
          <div className="h-4 w-12 bg-gray-200 rounded"></div>
        </div>

        {/* Variation buttons */}
        <div className="flex gap-2 mt-3">
          <div className="h-6 w-14 bg-gray-200 rounded"></div>
          <div className="h-6 w-12 bg-gray-200 rounded"></div>
        </div>

        {/* Stock text */}
        <div className="h-4 w-20 bg-gray-200 rounded mt-2"></div>
      </div>

      {/* Button Skeleton */}
      <div className="mt-4 flex gap-2">
        <div className="h-10 w-full bg-gray-300 rounded-xl"></div>
        <div className="h-10 w-1/6 bg-gray-300 rounded-xl"></div>
      </div>
    </div>
  );
}

// --- 3. FILTER SIDEBAR COMPONENT ---
function FilterSidebar({ onFilterChange, currentFilters, category }) {
  const [openCategory, setOpenCategory] = useState();
  const [isMobileOpen, setIsMobileOpen] = useState(false);
  const { priceData } = useSelector((state) => state.category);

  const content = (
    <div className="space-y-8">
      {/* HEADER */}
      <div className="flex justify-between items-center">
        <h3 className="text-xl font-black">Filters</h3>
        <button
          onClick={() =>
            onFilterChange({
              minPrice: priceData?.min_price,
              maxPrice: priceData?.max_price,
            })
          }
          className="text-xs font-bold text-brand-green"
        >
          Reset
        </button>
      </div>

      {/* ================= CATEGORY ================= */}
      <div className="space-y-4">
        {category.map((section) => {
          const isParentChecked = currentFilters.category?.includes(section.id);

          return (
            <div
              key={section.id}
              onClick={() =>
                setOpenCategory(openCategory === section.id ? null : section.id)
              }
              className={`p-4 rounded-2xl border transition-all ${
                openCategory === section.id
                  ? "bg-gray-50 border-transparent"
                  : "bg-white border-gray-100"
              }`}
            >
              {/* TITLE */}
              <div className="flex items-center justify-between">
                <label
                  onClick={(e) => e.stopPropagation()}
                  className="flex items-center gap-2 font-bold text-sm cursor-pointer"
                >
                  <input
                    type="checkbox"
                    checked={isParentChecked}
                    onChange={() => {
                      let newCats = currentFilters.category || [];

                      if (isParentChecked) {
                        newCats = newCats.filter((c) => c !== section.id);
                      } else {
                        newCats = [...newCats, section.id];
                      }

                      onFilterChange({
                        ...currentFilters,
                        category: newCats,
                      });
                    }}
                    className="accent-brand-green"
                  />
                  {section.name}
                </label>

                {section.children_recursive?.length > 0 && (
                  <div>
                    <FiChevronDown
                      className={`transition-transform ${
                        openCategory === section.id ? "rotate-180" : ""
                      }`}
                    />
                  </div>
                )}
              </div>

              {/* CHILDREN */}
              {openCategory === section.id &&
                section.children_recursive?.length > 0 && (
                  <div
                    onClick={(e) => e.stopPropagation()}
                    className="mt-4 space-y-2 pl-6"
                  >
                    {section.children_recursive.map((opt) => {
                      const isChildChecked =
                        currentFilters.subCategory?.includes(opt.id);

                      return (
                        <label
                          key={opt.id}
                          className="flex items-center gap-2 text-sm cursor-pointer"
                        >
                          <input
                            type="checkbox"
                            checked={isChildChecked}
                            onChange={() => {
                              let newSubs = currentFilters.subCategory || [];

                              if (isChildChecked) {
                                newSubs = newSubs.filter((s) => s !== opt.id);
                              } else {
                                newSubs = [...newSubs, opt.id];
                              }

                              onFilterChange({
                                ...currentFilters,
                                subCategory: newSubs,
                              });

                              if (window.innerWidth < 768)
                                setIsMobileOpen(false);
                            }}
                            className="accent-brand-green"
                          />
                          {opt.name}
                        </label>
                      );
                    })}
                  </div>
                )}
            </div>
          );
        })}
      </div>

      {/* ================= PRICE ================= */}
      <div className="space-y-5">
        <h4 className="text-xs font-black uppercase text-gray-400">
          Price Range
        </h4>

        {/* MIN */}
        <div>
          <div className="flex justify-between text-xs mb-1">
            <span>Min</span>
            <span className="font-bold">₹{currentFilters.minPrice}</span>
          </div>
          <input
            type="range"
            min={priceData?.min_price}
            max={priceData?.max_price}
            value={currentFilters.minPrice}
            onChange={(e) =>
              onFilterChange({
                ...currentFilters,
                minPrice: Number(e.target.value),
              })
            }
            className="w-full accent-brand-green"
          />
        </div>

        {/* MAX */}
        <div>
          <div className="flex justify-between text-xs mb-1">
            <span>Max</span>
            <span className="font-bold">₹{currentFilters.maxPrice}</span>
          </div>
          <input
            type="range"
            min={priceData?.min_price}
            max={priceData?.max_price}
            value={currentFilters.maxPrice}
            onChange={(e) =>
              onFilterChange({
                ...currentFilters,
                maxPrice: Number(e.target.value),
              })
            }
            className="w-full accent-brand-green"
          />
        </div>
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

function ProductCard({
  product,
  onQuickView,
  page,
  searchQuery,
  sort,
  min_price,
  max_price,
  category_slug,
}) {
  const dispatch = useDispatch();
  const { cartData } = useSelector((state) => state.cart);
  const items = cartData?.items || [];
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

  const variationId =
    product.type === "variable" ? selectedVariation?.id : null;

  const cartItem =
    Array.isArray(items) &&
    items.find(
      (i) =>
        i.product_id === product.id && i.product_variation_id === variationId,
    );

  const quantity = cartItem?.quantity || 0;

  const getStockColor = (message) => {
    if (!message) return "text-gray-500";

    if (message.toLowerCase().includes("out")) return "text-red-500";
    if (message.toLowerCase().includes("hurry")) return "text-orange-500";
    if (message.toLowerCase().includes("in stock")) return "text-green-600";

    return "text-gray-500";
  };

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

  return (
    <div className="group bg-white rounded-3xl p-2 sm:p-4 border border-gray-100 hover:shadow-2xl transition-all duration-500 relative flex flex-col h-full">
      <div className="relative aspect-square mb-4 bg-gray-50 rounded-2xl overflow-hidden">
        {/* Sale */}
        {product.is_on_sale && (
          <span className="absolute top-1 sm:top-2 md:top-3 right-1 bg-red-500 text-white text-[9px] sm:text-[10px] font-black px-2 py-0.5 sm:py-1 rounded-lg uppercase shadow-md z-10">
            Sale
          </span>
        )}

        {/* New */}
        {product.is_new && (
          <span className="absolute bottom-0 sm:bottom-1 md:bottom-3 left-1 bg-brand-green text-white text-[10px] font-black px-2 py-0.5 sm:py-1 rounded-lg uppercase shadow-md z-10">
            New
          </span>
        )}
        <img
          src={`${import.meta.env.VITE_REACT_APP_IMAGE_URL}/${primaryImage?.image}`}
          className="max-h-full object-contain rounded-xl transform group-hover:scale-105 transition-transform"
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
          <div className="flex gap-2">
            {/* Add To Cart */}
            <button
              disabled={isOutOfStock}
              onClick={() =>
                !isOutOfStock &&
                dispatch(
                  addToCart({
                    product_id: product.id,
                    product_variation_id: variationId || null,
                    quantity: 1,
                  }),
                )
              }
              className={`flex-1 py-3 rounded-xl font-bold text-xs flex items-center justify-center gap-2
        ${
          isOutOfStock
            ? "bg-gray-300 text-gray-500 cursor-not-allowed"
            : "bg-gray-900 hover:bg-brand-green text-white"
        }`}
            >
              <FiShoppingCart className="hidden sm:block text-lg" /> Add to Cart
            </button>

            {/* Wishlist */}
            <button
              onClick={async () => {
                try {
                  if (product?.is_wishlist) {
                    await dispatch(removeFromWishlist(product.id)).unwrap();
                  } else {
                    await dispatch(addToWishlist(product.id)).unwrap();
                  }

                  dispatch(
                    getAllProducts({
                      page,
                      search: searchQuery,
                      sort,
                      min_price,
                      max_price,
                      category_slug,
                    }),
                  );
                } catch (err) {
                  console.error(err);
                }
              }}
              className="p-3 bg-white border border-gray-200 rounded-xl shadow-sm hover:bg-red-50 transition"
            >
              {product?.is_wishlist ? (
                <FaHeart className="text-red-500 text-lg" />
              ) : (
                <FiHeart className="text-gray-600 hover:text-red-500 text-lg" />
              )}
            </button>
          </div>
        ) : (
          <div className="flex items-center justify-between bg-gray-100 rounded-xl p-1 ring-2 ring-brand-green/20">
            {quantity > 1 ? (
              <button
                onClick={() =>
                  dispatch(
                    updateCart({
                      id: cartItem.id,
                      payload: { quantity: cartItem.quantity - 1 },
                    }),
                  )
                }
                className="p-2 bg-white hover:bg-red-50 text-red-500 rounded-lg shadow-sm"
              >
                <FiChevronDown />
              </button>
            ) : (
              <button
                onClick={() => dispatch(deleteCart(cartItem.id))}
                className="p-2 bg-white hover:bg-red-50 text-red-500 rounded-lg shadow-sm"
              >
                <FiTrash />
              </button>
            )}

            <span className="font-black text-sm text-gray-900">{quantity}</span>

            <button
              onClick={() =>
                dispatch(
                  updateCart({
                    id: cartItem.id,
                    payload: { quantity: cartItem.quantity + 1 },
                  }),
                )
              }
              className="p-2 bg-white hover:bg-emerald-50 text-brand-green rounded-lg shadow-sm"
            >
              <FiChevronUp />
            </button>
          </div>
        )}
      </div>
    </div>
  );
}

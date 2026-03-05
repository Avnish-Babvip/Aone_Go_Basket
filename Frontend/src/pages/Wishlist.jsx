import React, { useState, useEffect } from "react";
import {
  FiShoppingCart,
  FiChevronDown,
  FiChevronUp,
  FiTrash,
  FiHeart,
} from "react-icons/fi";
import { FaHeart } from "react-icons/fa";
import { useDispatch, useSelector } from "react-redux";
import { useSearchParams } from "react-router-dom";
import Pagination from "../components/Pagination";
import QuickViewModal from "../components/Product/QuickView";
import { addToCart, deleteCart, updateCart } from "../features/actions/cart";
import {
  addToWishlist,
  getWishlist,
  removeFromWishlist,
} from "../features/actions/wishlist";

export default function Wishlist() {
  const dispatch = useDispatch();
  const [selectedProduct, setSelectedProduct] = useState(null);
  const { wishlistData, wishlistLoading } = useSelector(
    (state) => state.wishlist,
  );
  const data = wishlistData?.data || [];
  const hasData = Array.isArray(data) && data.length > 0;
  const [searchParams, setSearchParams] = useSearchParams();
  const page = Number(searchParams.get("page")) || 1;

  const updateParams = ({ page }) => {
    const params = {};

    if (page) params.page = page;

    setSearchParams(params);
  };

  useEffect(() => {
    dispatch(
      getWishlist({
        page,
      }),
    );

    window.scrollTo({
      top: 0,
      behavior: "smooth", // remove if you don't want animation
    });
  }, [page]);

  return (
    <div className="min-h-screen bg-[#FAFAFA] py-10 px-4 lg:px-8">
      <div className="max-w-7xl mx-auto flex flex-col lg:flex-row lg:gap-10">
        <main className="flex-1 ">
          <div className="flex flex-col sm:flex-row justify-between items-center lg:mt-14 mb-5 bg-white py-3 px-5 rounded-[2rem] border border-gray-100 shadow-sm gap-4">
            <h1 className="text-sm font-bold">
              Showing{" "}
              <span className="text-brand-green ">
                {wishlistData.from}–{wishlistData.to} of {wishlistData.total}
              </span>{" "}
              Products
            </h1>
          </div>
          <ProductList
            products={data}
            onQuickView={setSelectedProduct}
            page={page}
          />
          {/* PAGINATION */}
          {!wishlistLoading && hasData && wishlistData && (
            <Pagination
              onPageChange={updateParams}
              data={wishlistData}
              page={page}
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
function ProductList({ products, onQuickView, page }) {
  const { wishlistLoading } = useSelector((state) => state.wishlist);

  if (wishlistLoading) {
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
        <div className="h-10 w-1/8 bg-gray-300 rounded-xl"></div>
      </div>
    </div>
  );
}

// --- 3. FILTER SIDEBAR COMPONENT ---

function ProductCard({ product, onQuickView, page }) {
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
    <div className="group bg-white rounded-3xl p-2 sm:p-4  border border-gray-100 hover:shadow-2xl transition-all duration-500 relative flex flex-col h-full">
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
          className={`text-xs sm:text-sm pt-2 font-semibold ${getStockColor(stockMessage)}`}
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
                    getWishlist({
                      page,
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

import React, { useState } from "react";
import QuickViewModal from "../Product/QuickView";
import { useDispatch, useSelector } from "react-redux";
import { FiChevronDown, FiChevronUp, FiTrash } from "react-icons/fi";
import { addToCart, deleteCart, updateCart } from "../../features/actions/cart";
import { useNavigate } from "react-router-dom";

const HomeProduct = ({
  products,
  isLoading,
  viewMore,
  heading,
  subheading,
}) => {
  const [selectedProduct, setSelectedProduct] = useState(null);
  const navigate = useNavigate();
  return (
    <div className="bg-white max-w-7xl mt-14 mx-auto relative">
      <div className="rounded-sm  ">
        <div className="text-center mb-10">
          <h1 className="font-bold text-2xl md:text-3xl text-[#003d29]">
            {heading}
          </h1>
          <p className="font-medium text-gray-500 mt-2">{subheading}</p>
        </div>

        <div className=" grid grid-cols-2 md:grid-cols-3 xl:grid-cols-4  gap-4">
          {products.map((product) => (
            <ProductCard
              key={product.id}
              product={product}
              onQuickView={() => setSelectedProduct(product)}
            />
          ))}
        </div>
        <div className="w-full flex justify-center mt-10">
          <button
            onClick={() => navigate(viewMore)}
            className=" font-bold px-10 py-2 text-sm md:text-base  text-white rounded-md hover:bg-lime-500 hover:text-white transition-all duration-300 cursor-pointer uppercase tracking-wide bg-brand-green"
          >
            View All
          </button>
        </div>
      </div>

      {/* Quick View Modal */}
      {selectedProduct && (
        <QuickViewModal
          product={selectedProduct}
          onClose={() => setSelectedProduct(null)}
          onSwitchProduct={setSelectedProduct}
        />
      )}
    </div>
  );
};

const ProductCard = ({ product, onQuickView }) => {
  const dispatch = useDispatch();
  const { cartData } = useSelector((state) => state.cart);
  const items = cartData?.items || [];
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

  const variationId =
    product.type === "variable" ? selectedVariation?.id : null;

  const cartItem =
    Array.isArray(items) &&
    items.find(
      (i) =>
        i.product_id === product.id && i.product_variation_id === variationId,
    );

  const quantity = cartItem?.quantity || 0;

  const stockMessage =
    product.type === "variable"
      ? selectedVariation?.stock_message
      : product.stock_message;

  const isOutOfStock = stockMessage?.toLowerCase().includes("out");

  const primaryImage = product.images?.find((img) => img.is_primary);

  const salePrice =
    product.type === "variable"
      ? selectedVariation?.sale_price
      : product.sale_price;

  const regularPrice =
    product.type === "variable"
      ? selectedVariation?.regular_price
      : product.regular_price;

  const showSale = product.is_on_sale && salePrice;

  // useEffect(() => {
  //   if (isOutOfStock) setQuantity(0);
  // }, [selectedVariation]);
  return (
    <div className="relative group border border-gray-100 rounded-md p-4 bg-white hover:shadow-md transition-shadow flex flex-col h-full">
      {showSale && (
        <span className="absolute top-2 left-2 z-10 bg-brand-green text-white text-[9px] font-bold px-2 py-0.5 rounded-full uppercase">
          On Sale
        </span>
      )}

      {/* Image Container with Hover Eye Icon */}
      <div className="relative h-36 w-full flex items-center justify-center mb-4 cursor-pointer overflow-hidden">
        <img
          src={`${import.meta.env.VITE_REACT_APP_IMAGE_URL}/${primaryImage?.image}`}
          alt={product.name}
          className="max-h-full object-contain rounded-xl transform group-hover:scale-105 transition-transform"
        />

        {/* Eye Icon Overlay */}
        <div
          onClick={onQuickView}
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

        <h3 className="text-sm capitalize font-semibold text-gray-700 mt-1 line-clamp-2">
          {product.name}
        </h3>
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

      {/* QUANTITY */}
      <div className="mt-3 flex justify-between items-center">
        <p className={`text-sm font-semibold ${getStockColor(stockMessage)}`}>
          {stockMessage}
        </p>

        {quantity === 0 ? (
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
            className={`w-9 h-9 text-3xl rounded-full
    ${
      isOutOfStock
        ? "bg-gray-300 text-gray-500 cursor-not-allowed"
        : "bg-brand-green hover:bg-lime-500 text-white"
    }
  `}
          >
            +
          </button>
        ) : (
          <div className="flex items-center  rounded-lg px-1 py-[3px]">
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
            <span className="px-4 font-bold">{quantity}</span>
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
};

export default HomeProduct;

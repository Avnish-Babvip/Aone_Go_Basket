import React, { useState } from 'react';

const TopSellingProduct = () => {
  const [selectedProduct, setSelectedProduct] = useState(null);

  const products = [
    { id: 1, name: 'Fresh Green Leaf Lettuce', price: 2.64, originalPrice: 2.74, unit: '1 each', onSale: true, image: 'images/image-product.webp' },
    { id: 2, name: 'Leafy Romaine Mixed Lettuce', price: 2.50, originalPrice: 2.74, unit: '1 each', onSale: false, image: 'images/image2.png' },
    { id: 3, name: 'Organic Spring Mix', price: 2.60, originalPrice: 3.00, unit: '1 each', onSale: true, image: 'images/image-product.webp' },
    { id: 5, name: 'Organic Spring Mix', price: 2.60, originalPrice: 3.00, unit: '1 each', onSale: false, image: 'images/image2.png' },
    { id: 6, name: 'Organic Spring Mix', price: 2.60, originalPrice: 3.00, unit: '1 each', onSale: true, image: 'images/image-product.webp' },
    { id: 7, name: 'Organic Spring Mix', price: 2.60, originalPrice: 3.00, unit: '1 each', onSale: false, image: 'images/image-product.webp' },
    { id: 8, name: 'Organic Spring Mix', price: 2.60, originalPrice: 3.00, unit: '1 each', onSale: false, image: 'images/image2.png' },
    { id: 9, name: 'Organic Spring Mix', price: 2.60, originalPrice: 3.00, unit: '1 each', onSale: true, image: 'images/image-product.webp' },
    { id: 10, name: 'Organic Spring Mix', price: 2.60, originalPrice: 3.00, unit: '1 each', onSale: true, image: 'images/image2.png' },
    { id: 11, name: 'Organic Spring Mix', price: 2.60, originalPrice: 3.00, unit: '1 each', onSale: false, image: 'images/image-product.webp' },
    { id: 12, name: 'Organic Spring Mix', price: 2.60, originalPrice: 3.00, unit: '1 each', onSale: true, image: 'images/image2.png' },
    { id: 13, name: 'Organic Spring Mix', price: 2.60, originalPrice: 3.00, unit: '1 each', onSale: false, image: 'images/image-product.webp' },
    { id: 14, name: 'Organic Spring Mix', price: 2.60, originalPrice: 3.00, unit: '1 each', onSale: false, image: 'images/image2.png' },
    { id: 15, name: 'Organic Spring Mix', price: 2.60, originalPrice: 3.00, unit: '1 each', onSale: false, image: 'images/image-product.webp' },
  ];


  return (
    <div className="bg-white relative">
      <div className="rounded-sm p-4 md:p-10 shadow-sm">
        <div className="text-center mb-10">
          <h1 className="text-2xl font-bold text-gray-800">Best seller grocery near you</h1>
          <p className="text-gray-500 mt-2 text-sm">We provide best quality & fresh grocery items near your location</p>
        </div>

        <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-6 gap-4">
          {products.map((product) => (
            <ProductCard 
              key={product.id} 
              product={product} 
              onQuickView={() => setSelectedProduct(product)} 
            />
          ))}
        </div>
        <div className="w-full flex justify-center">
        <button className="font-primary font-bold px-10 py-4 border-2 border-gray-100 text-white rounded-md hover:bg-emerald-500 hover:text-white hover:border-emerald-500 transition-all duration-300 cursor-pointer uppercase tracking-wide bg-green-500">
          View All
        </button>
      </div>
      </div>

      {/* Quick View Modal */}
      {selectedProduct && (
        <QuickViewModal 
          product={selectedProduct} 
          onClose={() => setSelectedProduct(null)} 
        />
      )}
    </div>
  );
};

const ProductCard = ({ product, onQuickView }) => {
  const [quantity, setQuantity] = useState(0);

  return (
    <div className="relative group border border-gray-100 rounded-md p-4 bg-white hover:shadow-md transition-shadow flex flex-col h-full">
      {product.onSale && (
        <span className="absolute top-2 left-2 z-10 bg-[#78B31E] text-white text-[9px] font-bold px-2 py-0.5 rounded-full uppercase">
          On Sale
        </span>
      )}

      {/* Image Container with Hover Eye Icon */}
      <div className="relative h-32 w-full flex items-center justify-center mb-4 cursor-pointer overflow-hidden">
        <img src={product.image} alt={product.name} className="max-h-full object-contain transform group-hover:scale-105 transition-transform" />
        
        {/* Eye Icon Overlay */}
        <div 
          onClick={onQuickView}
          className="absolute inset-0 bg-black/5 opacity-0 group-hover:opacity-100 flex items-center justify-center transition-opacity"
        >
          <div className="bg-white p-2 rounded-full shadow-md hover:bg-[#78B31E] hover:text-white transition-colors">
            <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M15 12a3 3 0 11-6 0 3 3 0 016 0z" />
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M2.458 12C3.732 7.943 7.523 5 12 5c4.478 0 8.268 2.943 9.542 7-1.274 4.057-5.064 7-9.542 7-4.477 0-8.268-2.943-9.542-7z" />
            </svg>
          </div>
        </div>
      </div>

      <div className="flex-grow">
        <div className="flex items-center gap-1">
          <span className="text-sm font-bold text-gray-900">Rs.{product.price.toFixed(2)}</span>
          {product.originalPrice && <span className="text-[10px] text-gray-400 line-through">Rs.{product.originalPrice.toFixed(2)}</span>}
        </div>
        <h3 className="text-[11px] font-semibold text-gray-700 mt-1 line-clamp-2">{product.name}</h3>
        <p className="text-[10px] text-gray-400 mt-1">{product.unit}</p>
      </div>

      <div className="mt-3 flex justify-end">
        {quantity === 0 ? (
          <button onClick={() => setQuantity(1)} className="w-7 h-7 bg-[#78B31E] text-white rounded-full flex items-center justify-center hover:bg-[#689b1a]">+</button>
        ) : (
          <div className="flex items-center border border-gray-100 rounded-full shadow-sm px-1 py-0.5">
            <button onClick={() => setQuantity(quantity - 1)} className="px-2 text-gray-400 text-xs">-</button>
            <span className="px-1 text-xs font-bold text-gray-800">{quantity}</span>
            <button onClick={() => setQuantity(quantity + 1)} className="px-2 text-gray-400 text-xs">+</button>
          </div>
        )}
      </div>
    </div>
  );
};

const QuickViewModal = ({ product, onClose }) => {
  return (
    <div className="fixed inset-0 z-[100] flex items-center justify-center p-4 bg-black/50 backdrop-blur-sm animate-in fade-in duration-200">
      <div className="bg-white rounded-xl shadow-2xl max-w-2xl w-full relative overflow-hidden flex flex-col md:flex-row animate-in zoom-in-95 duration-200">
        {/* Close Button */}
        <button onClick={onClose} className="absolute top-4 right-4 z-10 p-1 rounded-full hover:bg-gray-100">
          <svg className="w-6 h-6 text-gray-500" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M6 18L18 6M6 6l12 12" /></svg>
        </button>

        {/* Modal Content */}
        <div className="md:w-1/2 bg-gray-50 p-8 flex items-center justify-center">
          <img src={product.image} alt={product.name} className="max-h-64 object-contain" />
        </div>
        
        <div className="md:w-1/2 p-8 flex flex-col justify-center">
          {product.onSale && <span className="text-[#78B31E] text-xs font-bold uppercase mb-2">Special Offer</span>}
          <h2 className="text-2xl font-bold text-gray-800 mb-2">{product.name}</h2>
          <p className="text-sm text-gray-500 mb-4">{product.unit} | In Stock</p>
          
          <div className="flex items-center gap-3 mb-6">
            <span className="text-2xl font-bold text-gray-900">Rs.{product.price.toFixed(2)}</span>
            {product.originalPrice && <span className="text-lg text-gray-400 line-through">Rs.{product.originalPrice.toFixed(2)}</span>}
          </div>

          <p className="text-gray-600 text-sm mb-8 leading-relaxed">
            {product.desc || "Our premium quality produce is sourced directly from local farms to ensure maximum freshness and taste for your kitchen."}
          </p>

          <button className="w-full bg-[#78B31E] text-white font-bold py-3 rounded-lg hover:bg-[#689b1a] transition-colors flex items-center justify-center gap-2">
            Add To Cart
          </button>
        </div>
      </div>
    </div>
  );
};

export default TopSellingProduct;
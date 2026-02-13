import React from 'react';

const DiscountBanner = () => {
  return (
    <div >
      {/* Main Banner Container */}
      <div 
        className="relative container-fluid min-h-[300px] md:min-h-[400px] overflow-hidden bg-cover bg-center flex items-center justify-center text-center"
        style={{ 
          // Replace with your actual hosted image path
          backgroundImage: `url('https://images.unsplash.com/photo-1506368249639-73a05d6f6488?q=80&w=2000&auto=format&fit=crop')` 
        }}
      >
        {/* Dark Overlay to make text readable */}
        <div className="absolute inset-0 bg-black/40"></div>

        {/* Content Section */}
        <div className="relative z-10 px-6 max-w-2xl">
          <h1 className="text-3xl md:text-5xl lg:text-6xl font-extrabold text-white italic tracking-tight mb-4 drop-shadow-lg">
            Super Discount 70% OFF
          </h1>
          
          <p className="text-white text-sm md:text-lg font-medium leading-relaxed mb-8 opacity-90">
            We source and sell the very best beef, lamb and pork, 
            sourced with the greatest care from farmer.
          </p>

          <button className="bg-white text-black font-bold py-3 px-8 rounded-md hover:bg-gray-100 transition-all active:scale-95 shadow-lg">
            Explore More
          </button>
        </div>
      </div>
    </div>
  );
};

export default DiscountBanner;
import React from "react";
import { Link } from "react-router-dom";

const DiscountBanner = () => {
  return (
    <div>
      {/* Main Banner Container */}
      <div
        className="relative container-fluid min-h-[300px] md:min-h-[400px] mt-10 overflow-hidden bg-cover bg-center flex items-center justify-center text-center"
        style={{
          // Replace with your actual hosted image path
          backgroundImage: `url('/images/home/Discount.webp')`,
        }}
      >
        {/* Dark Overlay to make text readable */}
        <div className="absolute inset-0 bg-black/20"></div>

        {/* Content Section */}
        <div className="relative z-10 px-6 max-w-2xl">
          <h1 className="text-3xl md:text-5xl lg:text-6xl font-extrabold text-white italic tracking-tight mb-4 drop-shadow-lg">
            AONE GO BASKET
          </h1>

          <p className="text-white text-sm md:text-lg font-medium leading-relaxed mb-8 opacity-90">
            Aonegobasket makes online grocery shopping fast and easy. Get
            groceries delivered and order the best of seasonal farm fresh food.
          </p>

          <Link
            to={"products"}
            className="bg-white text-black font-bold py-3 px-8 rounded-md hover:bg-gray-100 transition-all active:scale-95 shadow-lg"
          >
            Explore More
          </Link>
        </div>
      </div>
    </div>
  );
};

export default DiscountBanner;

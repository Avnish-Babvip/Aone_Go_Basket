import React from "react";
import { Link } from "react-router-dom";

const DiscountBanner = ({ data }) => {
  return (
    <div>
      {/* Main Banner Container */}
      <div
        className="relative container-fluid min-h-[300px] xl:min-h-[500px] mt-10 overflow-hidden bg-cover bg-center flex items-center justify-center text-center"
        style={{
          // Replace with your actual hosted image path
          backgroundImage: `url(${import.meta.env.VITE_REACT_APP_IMAGE_URL_2}/${data?.bg_image})`,
        }}
      >
        {/* Dark Overlay to make text readable */}
        <div className="absolute inset-0 bg-black/20"></div>

        {/* Content Section */}
        <div className="relative z-10 px-6 max-w-2xl">
          <h1 className="text-3xl md:text-5xl lg:text-6xl font-extrabold text-white italic tracking-tight mb-4 drop-shadow-lg">
            {data?.title}
          </h1>

          <p className="text-white text-sm md:text-lg font-medium leading-relaxed mb-8 opacity-90">
            {data?.description}
          </p>

          <Link
            to={data?.button_link}
            className="bg-white text-black font-bold py-3 px-8 rounded-md hover:bg-gray-100 transition-all active:scale-95 shadow-lg"
          >
            {data?.button_text}
          </Link>
        </div>
      </div>
    </div>
  );
};

export default DiscountBanner;

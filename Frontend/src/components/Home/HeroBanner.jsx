import React from "react";
import { Swiper, SwiperSlide } from "swiper/react";
import { Pagination, Autoplay } from "swiper/modules";

// Import Swiper styles
import "swiper/css";
import "swiper/css/pagination";
import "swiper/css/navigation";

const sliderData = [
  {
    id: 1,
    title: "Healthy vegetable that you deserve to eat fresh",
    subtitle:
      "We source and sell the very best beef, lamb and pork, sourced with the greatest care from farmers.",
    bgImage: "/images/Banner-bg-3.jpg",
  },
  {
    id: 2,
    title: "Healthy vegetable that you deserve to eat fresh",
    subtitle:
      "We source and sell the very best beef, lamb and pork, sourced with the greatest care from farmers.",
    bgImage: "/images/Banner-bg-1.jpg",
  },
  {
    id: 3,
    title: "Organic Fruits delivered to your doorstep",
    subtitle:
      "Freshness guaranteed from our local farms to your dining table every single day.",
    bgImage: "/images/Banner-bg-2.jpg",
  },
];

function HeroBanner() {
  return (
    <div className="relative w-full h-[300px] md:h-[300px] lg:h-[500px] mt-20 ">
      <Swiper
        modules={[Pagination, Autoplay]}
        pagination={{ clickable: true }}
        autoplay={{ delay: 5000 }}
        loop={true}
        className="h-full w-full"
      >
        {sliderData.map((slide) => (
          <SwiperSlide key={slide.id}>
            <div
              className="relative w-full h-full flex items-center justify-center  bg-cover bg-center transition-transform duration-700"
              style={{ backgroundImage: `url(${slide.bgImage})` }}
            >
              {/* Soft Overlay to make text readable */}
              <div className="absolute inset-0 bg-white/20"></div>

              {/* Content */}
              <div className="relative z-10 container mx-auto px-4 text-center max-w-4xl">
                <h1 className="text-3xl md:text-5xl lg:text-6xl font-bold text-[#003d29] leading-tight mb-4">
                  {slide.title}
                </h1>
                <p className="text-sm md:text-base text-gray-700 mb-8 max-w-2xl mx-auto">
                  {slide.subtitle}
                </p>
              </div>
            </div>
          </SwiperSlide>
        ))}
      </Swiper>

      {/* Custom Styling for Swiper Dots */}
      <style jsx global>{`
        .swiper-pagination-bullet {
          background: #d1d5db !important;
          opacity: 1 !important;
          width: 10px;
          height: 10px;
        }
        .swiper-pagination-bullet-active {
          background: #79bf28 !important;
          width: 12px;
          height: 12px;
        }
      `}</style>
    </div>
  );
}

export default HeroBanner;

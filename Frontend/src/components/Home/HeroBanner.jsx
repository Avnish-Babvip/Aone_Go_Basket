import React from "react";
import { Swiper, SwiperSlide } from "swiper/react";
import { Pagination, Autoplay } from "swiper/modules";

// Import Swiper styles
import "swiper/css";
import "swiper/css/pagination";
import "swiper/css/navigation";

function HeroBanner({ data }) {
  return (
    <div className="relative w-full h-[300px] lg:h-[350px] xl:h-[500px] mt-20 ">
      <Swiper
        modules={[Pagination, Autoplay]}
        pagination={{ clickable: true }}
        autoplay={{ delay: 5000 }}
        loop={true}
        className="h-full w-full"
      >
        {data?.map((slide) => (
          <SwiperSlide key={slide.id}>
            <div
              className="relative w-full h-full flex items-center justify-center  bg-cover bg-center transition-transform duration-700"
              style={{
                backgroundImage: `url(${import.meta.env.VITE_REACT_APP_IMAGE_URL_2}/${slide?.bg_image})`,
              }}
            >
              {/* Content */}
              <div className="relative z-10 container mx-auto px-4 text-center max-w-xl lg:max-w-2xl xl:max-w-4xl">
                <h1 className="text-3xl lg:text-5xl xl:text-6xl font-bold text-[#003d29] leading-tight mb-4">
                  {slide.title}
                </h1>
                <p className="text-xs lg:text-sm md:text-base text-gray-700 mb-8 max-w-2xl mx-auto">
                  {slide.description}
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

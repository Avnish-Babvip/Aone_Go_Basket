import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import { Swiper, SwiperSlide } from "swiper/react";
import { Navigation } from "swiper/modules";
import "swiper/css";
import "swiper/css/navigation";

const CategoryCard = ({ categoryData, loading }) => {
  const navigate = useNavigate();
  const [isBeginning, setIsBeginning] = useState(true);
const [isEnd, setIsEnd] = useState(false);

  return (
    <section className="max-w-7xl mx-auto mt-16 px-4">
      <div className="mb-12 text-center">
        <h2 className="font-bold text-3xl md:text-4xl text-[#003d29]">
          What food you love to order
        </h2>
        <p className="font-medium text-gray-500 mt-2">
          Here order your favorite foods from different categories
        </p>
      </div>

      {/* ================= SKELETON LOADING ================= */}
      {loading ? (
        <div className="flex gap-20 justify-center mb-16">
          {[...Array(5)].map((_, i) => (
            <div key={i} className="flex flex-col items-center animate-pulse">
              <div className="w-28 h-28 md:w-36 md:h-36 rounded-full bg-gray-200"></div>
              <div className="h-4 w-20 bg-gray-200 rounded mt-4"></div>
            </div>
          ))}
        </div>
      ) : Array.isArray(categoryData) && categoryData.length > 0 ? (
    <div className="relative">
<Swiper
  modules={[Navigation]}
  navigation={{
    nextEl: ".custom-next",
    prevEl: ".custom-prev",
  }}
  onSwiper={(swiper) => {
    setIsBeginning(swiper.isBeginning);
    setIsEnd(swiper.isEnd);
  }}
  onSlideChange={(swiper) => {
    setIsBeginning(swiper.isBeginning);
    setIsEnd(swiper.isEnd);
  }}
  spaceBetween={30}
  slidesPerView={5}
  breakpoints={{
    320: { slidesPerView: 2 },
    640: { slidesPerView: 3 },
    768: { slidesPerView: 4 },
    1024: { slidesPerView: 5 },
  }}
  className="mb-16"
>
          {categoryData.map((cat) => {
            const fullImagePath = `${import.meta.env.VITE_REACT_APP_IMAGE_URL}/${cat.image}`;

            return (
              <SwiperSlide key={cat.id}>
                <div
                  onClick={() =>
                    navigate(`/category?category_slug=${cat.slug}`)
                  }
                  className="group cursor-pointer flex flex-col items-center"
                >
                  <div className="w-28 h-28 md:w-36 md:h-36 rounded-full overflow-hidden transition-all duration-300 group-hover:scale-110">
                    <img
                      src={fullImagePath}
                      alt={cat.name}
                      loading="lazy"
                      className="w-full h-full object-cover"
                    />
                  </div>

                  <span className="mt-4 font-semibold text-sm md:text-base text-gray-800 text-center group-hover:text-emerald-600 transition-colors">
                    {cat.name}
                  </span>
                </div>
              </SwiperSlide>
            );
          })}
        </Swiper>
    
  {/* 🔥 Custom Buttons INSIDE */}
{/* PREV */}
<button
  className={`custom-prev absolute left-2 top-1/2 -translate-y-1/2 z-10 
  bg-brand-green text-white w-10 h-10 rounded-full shadow-md 
  flex items-center justify-center transition-all duration-300
  ${isBeginning ? "opacity-0 pointer-events-none" : "opacity-100"}`}
>
  ‹
</button>

{/* NEXT */}
<button
  className={`custom-next absolute right-2 top-1/2 -translate-y-1/2 z-10 
  bg-brand-green text-white w-10 h-10 rounded-full shadow-md 
  flex items-center justify-center transition-all duration-300
  ${isEnd ? "opacity-0 pointer-events-none" : "opacity-100"}`}
>
  ›
</button>
</div>): (
        <p className="text-center text-gray-400 mb-16">
          No categories found.
        </p>
      )}

      <div className="flex justify-center">
        <button
          onClick={() => navigate("/categories")}
          className="font-bold px-10 py-3 text-sm md:text-base text-white rounded-full hover:bg-lime-500 transition-all duration-300 uppercase tracking-wide bg-brand-green shadow-md"
        >
          View All
        </button>
      </div>
    </section>
  );
};

export default CategoryCard;
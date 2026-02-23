import React from "react";
import { useNavigate } from "react-router-dom";

const CategoryCard = ({ categoryData }) => {
  const navigate = useNavigate();
  // if (categoryLoading) {
  //   return (
  //     <div className="flex justify-center items-center py-20">
  //       <div className="animate-spin rounded-full h-12 w-12 border-t-2 border-b-2 border-emerald-500"></div>
  //     </div>
  //   );
  // }

  return (
    <section className="max-w-7xl mx-auto items-center bg-white mt-10">
      <div className="mb-12 text-center">
        <h2 className="font-bold text-3xl md:text-4xl text-[#003d29]">
          What food you love to order
        </h2>
        <p className="font-medium text-gray-500 mt-2">
          Here order your favorite foods from different categories
        </p>
      </div>

      <div className="grid grid-cols-3 sm:grid-cols-4 md:grid-cols-6 lg:grid-cols-8 gap-y-10 gap-x-4 mb-14 justify-items-center">
        {Array.isArray(categoryData) && categoryData.length > 0 ? (
          categoryData.map((cat) => {
            const fullImagePath = `${import.meta.env.VITE_REACT_APP_IMAGE_URL}/${cat.image}`;

            return (
              <div
                key={cat.id}
                className="group cursor-pointer flex flex-col items-center w-full"
              >
                <div className="relative w-24 h-24 md:w-32 md:h-32 rounded-full bg-[#F3F6FA] flex items-center justify-center mb-4 transition-all duration-300 group-hover:bg-white group-hover:shadow-lg overflow-hidden">
                  {/* Primary Image */}
                  <img
                    src={fullImagePath}
                    alt={cat.name}
                    loading="lazy"
                    className="w-full h-full object-contain p-4 transition-all duration-500 ease-in-out transform group-hover:-translate-x-24 group-hover:opacity-0"
                  />

                  {/* Hover Image (using the same image as your API doesn't provide a second one) */}
                  <img
                    src={fullImagePath}
                    alt={`${cat.name} hover`}
                    loading="lazy"
                    className="absolute w-full h-full object-contain p-4 translate-x-24 opacity-0 transition-all duration-500 ease-in-out transform group-hover:translate-x-0 group-hover:opacity-100"
                  />
                </div>

                <span className="font-primary font-semibold text-sm text-gray-800 text-center group-hover:text-emerald-600 transition-colors">
                  {cat.name}
                </span>
              </div>
            );
          })
        ) : (
          <p className="col-span-full text-gray-400">No categories found.</p>
        )}
      </div>

      <div className="w-full flex justify-center mb-3">
        <button
          onClick={() => navigate("/categories")}
          className=" font-bold px-10 py-2 text-sm md:text-base  text-white rounded-md hover:bg-lime-500 hover:text-white transition-all duration-300 cursor-pointer uppercase tracking-wide bg-brand-green"
        >
          View All
        </button>
      </div>
    </section>
  );
};

export default CategoryCard;

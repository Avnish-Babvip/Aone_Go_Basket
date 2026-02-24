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
    <section className="max-w-7xl mx-auto mt-16 px-4">
      <div className="mb-12 text-center">
        <h2 className="font-bold text-3xl md:text-4xl text-[#003d29]">
          What food you love to order
        </h2>
        <p className="font-medium text-gray-500 mt-2">
          Here order your favorite foods from different categories
        </p>
      </div>

      <div className="flex flex-wrap justify-center gap-10 mb-16">
        {Array.isArray(categoryData) && categoryData.length > 0 ? (
          categoryData.map((cat) => {
            const fullImagePath = `${import.meta.env.VITE_REACT_APP_IMAGE_URL}/${cat.image}`;

            return (
              <div
                key={cat.id}
                onClick={() => navigate(`/category?category_slug=${cat.slug}`)}
                className="group cursor-pointer flex flex-col items-center"
              >
                {/* CIRCLE IMAGE */}
                <div className="w-28 h-28 md:w-36 md:h-36 rounded-full overflow-hidden transition-all duration-300 group-hover:scale-110 ">
                  <img
                    src={fullImagePath}
                    alt={cat.name}
                    loading="lazy"
                    className="w-full h-full object-cover"
                  />
                </div>

                {/* TITLE */}
                <span className="mt-4 font-semibold text-sm md:text-base text-gray-800 text-center group-hover:text-emerald-600 transition-colors">
                  {cat.name}
                </span>
              </div>
            );
          })
        ) : (
          <p className="text-gray-400">No categories found.</p>
        )}
      </div>

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

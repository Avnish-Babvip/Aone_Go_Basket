import React, { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux'; 
import { fetchCategories } from "@/store/slices/categorySlice";

const CategoryCard = () => {
  const dispatch = useDispatch();
  const { items, loading, error } = useSelector((state) => state.categories);

  // 1. Get the base URL for your images. 
  // Usually, your backend serves storage files from the root URL.
  const BASE_URL = import.meta.env.VITE_API_Image_URL;

  useEffect(() => {
    dispatch(fetchCategories());
  }, [dispatch]);

  if (loading) {
    return (
      <div className="flex justify-center items-center py-20">
        <div className="animate-spin rounded-full h-12 w-12 border-t-2 border-b-2 border-emerald-500"></div>
      </div>
    );
  }

  if (error) {
    return (
      <div className="text-center py-20 text-red-500 font-semibold">
        Error: {typeof error === 'string' ? error : "Failed to load categories"}
      </div>
    );
  }

  return (
    <section className="container-fluid items-center bg-white p-4 mt-2">
      <div className="mb-12 text-center">
        <h2 className="font-primary font-bold text-3xl md:text-4xl text-[#003d29]">
          What food you love to order
        </h2>
        <p className="font-secondary font-medium text-gray-500 mt-2">
          Here order your favorite foods from different categories
        </p>
      </div>

      <div className="container mx-auto grid grid-cols-3 sm:grid-cols-4 md:grid-cols-6 lg:grid-cols-8 gap-y-10 gap-x-4 mb-14 justify-items-center">
        {items && items.length > 0 ? (
          items.map((cat) => {
            // 2. Construct the full image path
            // Your API gives: "categories\/G8lx...png"
            // We need: "http://yourdomain.com/storage/categories/G8lx...png"
            const fullImagePath = `${BASE_URL}/${cat.image}`;

            return (
              <div key={cat.id} className="group cursor-pointer flex flex-col items-center w-full">
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

      <div className="w-full flex justify-center">
        <button className="font-primary font-bold px-10 py-4 border-2 border-gray-100 text-white rounded-md hover:bg-emerald-500 hover:text-white hover:border-emerald-500 transition-all duration-300 cursor-pointer uppercase tracking-wide bg-green-500">
          View All
        </button>
      </div>
    </section>
  );
};

export default CategoryCard;
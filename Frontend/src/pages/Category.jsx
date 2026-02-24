import { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";
import { getAllCategoriesWithSubCategories } from "../features/actions/category";

export default function Category() {
  const dispatch = useDispatch();
  const navigate = useNavigate();

  const { categoryData, loading } = useSelector((state) => state.category);

  useEffect(() => {
    dispatch(getAllCategoriesWithSubCategories());
  }, [dispatch]);

  return (
    <div className="min-h-screen bg-gray-50 pt-28 pb-20 px-4 lg:px-16">
      {/* BREADCRUMB */}
      {/* <div className="max-w-7xl mx-auto mb-6 text-sm text-gray-500">
        Home / <span className="text-gray-800 font-medium">Categories</span>
      </div> */}

      {/* HEADER */}
      <div className="max-w-7xl mx-auto mb-12">
        <h1 className="text-3xl md:text-4xl font-black text-[#003d29]">
          All Categories
        </h1>
        <p className="text-gray-500 mt-2">
          Explore all categories with subcategories
        </p>
      </div>

      {/* CONTENT */}
      <div className="max-w-7xl mx-auto space-y-16">
        {categoryData?.map((cat) => {
          const parentImage = cat.image_url || "/placeholder.png";
          const hasChildren = cat.children_recursive?.length > 0;

          return (
            <div key={cat.id}>
              {/* ================= PARENT CATEGORY ================= */}
              <div
                onClick={() => navigate(`/category?category_slug=${cat.slug}`)}
                className="flex items-center gap-6 cursor-pointer group"
              >
                <div className="w-24 h-24 rounded-full bg-[#F3F6FA] flex items-center justify-center overflow-hidden transition group-hover:shadow-lg">
                  <img
                    src={parentImage}
                    alt={cat.name}
                    className="w-full h-full object-contain p-4 group-hover:scale-110 transition"
                  />
                </div>

                <div>
                  <h2 className="text-xl font-bold text-gray-800 group-hover:text-emerald-600 transition">
                    {cat.name}
                  </h2>
                </div>
              </div>

              {/* ================= SUBCATEGORIES ================= */}
              {hasChildren && (
                <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-6 gap-6 mt-8 ml-4 md:ml-12">
                  {cat.children_recursive.map((sub) => {
                    const subImage = sub.image_url || "/placeholder.png";

                    return (
                      <div
                        key={sub.id}
                        onClick={() =>
                          navigate(`/category?category_slug=${sub.slug}`)
                        }
                        className="group cursor-pointer bg-white rounded-xl p-4 text-center transition hover:shadow-md"
                      >
                        <div className="w-20 h-20 mx-auto rounded-full bg-gray-50 flex items-center justify-center overflow-hidden mb-3">
                          <img
                            src={subImage}
                            alt={sub.name}
                            className="w-full h-full object-contain p-3 group-hover:scale-110 transition"
                          />
                        </div>

                        <p className="text-sm font-medium group-hover:text-emerald-600 transition">
                          {sub.name}
                        </p>
                      </div>
                    );
                  })}
                </div>
              )}

              {/* Divider */}
              <div className="mt-12 border-b border-gray-200"></div>
            </div>
          );
        })}
      </div>
    </div>
  );
}

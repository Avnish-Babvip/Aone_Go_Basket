import React, { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { getReturnPolicyList } from "../features/actions/cms";

const ReturnPolicy = () => {
  const dispatch = useDispatch();
  const { returnPolicyData, cmsLoading } = useSelector((state) => state.cms);
  const { siteData } = useSelector((state) => state.home);

  useEffect(() => {
    dispatch(getReturnPolicyList());
  }, []);

  const sections = Array.isArray(returnPolicyData) ? returnPolicyData : [];

  const scrollToSection = (id) => {
    const element = document.getElementById(id);
    if (element) {
      // Adjusted offset for mobile (smaller) and desktop
      const offset = window.innerWidth < 768 ? 160 : 120;
      const bodyRect = document.body.getBoundingClientRect().top;
      const elementRect = element.getBoundingClientRect().top;
      const elementPosition = elementRect - bodyRect;
      const offsetPosition = elementPosition - offset;

      window.scrollTo({
        top: offsetPosition,
        behavior: "smooth",
      });
    }
  };

  return (
    <div className="min-h-screen bg-white mt-20 text-gray-700">
      {cmsLoading ? (
        <div className="animate-pulse">
          {/* HEADER SKELETON */}
          <div className="w-full h-32 md:h-56 bg-gray-200" />

          {/* MAIN */}
          <div className="max-w-7xl mx-auto px-4 md:px-10 py-10 md:py-16 flex flex-col md:flex-row gap-8 md:gap-12">
            {/* SIDEBAR SKELETON */}
            <aside className="w-full md:w-1/4">
              <div className="flex md:flex-col gap-3 overflow-hidden">
                {[...Array(5)].map((_, i) => (
                  <div key={i} className="h-8 w-28 bg-gray-200 rounded"></div>
                ))}
              </div>
            </aside>

            {/* CONTENT SKELETON */}
            <main className="w-full md:w-3/4 space-y-12">
              {[...Array(5)].map((_, i) => (
                <div key={i} className="space-y-4">
                  <div className="h-6 w-48 bg-gray-200 rounded"></div>
                  <div className="h-4 w-full bg-gray-200 rounded"></div>
                  <div className="h-4 w-5/6 bg-gray-200 rounded"></div>
                  <div className="h-4 w-2/3 bg-gray-200 rounded"></div>
                </div>
              ))}

              {/* FOOTER SKELETON */}
              <div className="mt-10 space-y-4">
                <div className="h-6 w-64 bg-gray-200 mx-auto rounded"></div>
                <div className="h-4 w-full max-w-xl bg-gray-200 mx-auto rounded"></div>
                <div className="h-4 w-40 bg-gray-200 mx-auto rounded"></div>
              </div>
            </main>
          </div>
        </div>
      ) : (
        <>
          {/* HEADER */}
          <div className="relative w-full h-16 sm:h-24 md:h-32 lg:h-50 xl:h-56 overflow-hidden flex flex-col items-center justify-center border-b border-gray-100">
            <img
              src={`${import.meta.env.VITE_REACT_APP_IMAGE_URL_2}/${siteData?.common?.banner?.[3]}`}
              alt="Privacy Background"
              className="absolute inset-0 w-full h-full object-cover"
            />

            <div className="relative z-10 text-center">
              <h1 className="text-xl md:text-4xl font-bold text-gray-900 mb-2">
                Return Policy
              </h1>
            </div>
          </div>

          {/* MAIN */}
          <div className="max-w-7xl mx-auto px-4 md:px-10 py-10 md:py-16 flex flex-col md:flex-row gap-8 md:gap-12">
            {/* SIDEBAR */}
            <aside className="w-full md:w-1/4">
              <nav className="sticky top-0 md:top-28 z-20 bg-white border-b md:border-b-0 md:border-l border-gray-200">
                <div className="flex md:flex-col overflow-x-auto md:overflow-x-visible no-scrollbar whitespace-nowrap md:whitespace-normal py-2 md:py-0">
                  {sections.map((section) => {
                    const id = section.category_name
                      .toLowerCase()
                      .replace(/\s+/g, "-");

                    return (
                      <button
                        key={section.id}
                        onClick={() => scrollToSection(id)}
                        className="px-5 py-3 text-xs md:text-sm font-semibold text-gray-600 hover:text-brand-green hover:bg-lime-50 border-b-2 md:border-b-0 md:border-l-2 border-transparent hover:border-brand-green transition-all flex-shrink-0"
                      >
                        {section.category_name}
                      </button>
                    );
                  })}
                </div>
              </nav>
            </aside>

            {/* CONTENT */}
            <main className="w-full md:w-3/4 space-y-16 md:space-y-20">
              {sections.map((section) => {
                const id = section.category_name
                  .toLowerCase()
                  .replace(/\s+/g, "-");

                return (
                  <section
                    key={section.id}
                    id={id}
                    className="scroll-mt-36 md:scroll-mt-32"
                  >
                    <h2 className="text-xl md:text-2xl font-bold text-gray-900 mb-6 pb-2 border-b border-gray-100">
                      {section.category_name}
                    </h2>

                    <div className="text-sm md:text-base leading-relaxed text-gray-600 space-y-4">
                      <p>{section.description}</p>

                      {section.highlight_text && (
                        <p className="font-semibold text-gray-900 bg-gray-50 p-3 border-l-4 border-brand-green">
                          {section.highlight_text}
                        </p>
                      )}
                    </div>
                  </section>
                );
              })}

              {/* FOOTER */}
              <div className="mt-20 pt-12 border-t border-gray-100 text-center">
                <h3 className="text-xl md:text-2xl font-bold text-gray-900 mb-4">
                  {siteData?.common?.title}
                </h3>
                <p className="text-sm text-gray-600 max-w-3xl mx-auto mb-8">
                  {siteData?.common?.description}
                </p>
                <p className="text-base md:text-lg font-semibold">
                  Media contacts:{" "}
                  <a
                    href={`mailto:${siteData?.common?.email}`}
                    className="text-brand-green hover:underline"
                  >
                    {siteData?.common?.email}
                  </a>
                </p>
              </div>
            </main>
          </div>
        </>
      )}
    </div>
  );
};

export default ReturnPolicy;

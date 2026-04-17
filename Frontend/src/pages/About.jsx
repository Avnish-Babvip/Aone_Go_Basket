import React, { useEffect } from "react";
import { Link } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import { getAboutUs } from "../features/actions/cms";

const AboutUs = () => {
  const dispatch = useDispatch();
  const { aboutUsData, cmsLoading } = useSelector((state) => state.cms);
  const { siteData } = useSelector((state) => state.home);

  useEffect(() => {
    dispatch(getAboutUs());
  }, []);

  if (cmsLoading) {
    return <AboutUsSkeleton />;
  }

  return (
    <section className="w-full mt-15 text-gray-800">
      {/* SECTION 1: HERO & PRIVACY POLICY */}
      <img
        src={`${import.meta.env.VITE_REACT_APP_IMAGE_URL_2}/${aboutUsData?.banner_image}`}
        alt="FAQ"
        className=" w-full h-full object-contain"
      />

      <div className="max-w-7xl mx-auto px-4 md:px-10 py-12 text-center">
        {/* Main Title */}
        <h2 className="text-3xl md:text-4xl font-bold text-center mb-12">
          {aboutUsData?.banner_title}
        </h2>

        {/* Content Wrapper */}
        <div className="space-y-10 text-gray-600">
          {/* Section Block */}
          {aboutUsData?.about_content?.slice(0, 3).map((item, index) => (
            <div key={index} className="space-y-4">
              <h3 className="text-xl md:text-2xl font-semibold text-gray-900">
                {item.title}
              </h3>
              <p className="text-sm md:text-base leading-relaxed">
                {item.description}
              </p>
            </div>
          ))}
        </div>
      </div>

      {/* SECTION 2: SECURITY PROCEDURES (Images on same line for mobile) */}
      <div className="max-w-7xl mx-auto px-4 md:px-10 pb-12">
        <div className="flex flex-nowrap gap-2 md:gap-4 mb-10">
          {aboutUsData?.images?.slice(0, 3).map((img, i) => (
            <div key={i} className="flex-1 h-44 md:h-96">
              <img
                src={`${import.meta.env.VITE_REACT_APP_IMAGE_URL_2}/${img.image}`}
                className="w-full h-full object-contain rounded-sm"
              />
            </div>
          ))}
        </div>

        <div className="max-w-6xl mx-auto text-center space-y-6 text-sm md:text-base leading-relaxed text-gray-600">
          {aboutUsData?.about_content?.slice(3, 5).map((item, index) => (
            <div key={index} className="space-y-4">
              <h3 className="text-xl md:text-2xl font-semibold text-gray-900">
                {item.title}
              </h3>
              <p className="text-sm md:text-base leading-relaxed">
                {item.description}
              </p>
            </div>
          ))}
        </div>
      </div>

      {/* SECTION 3: PLATFORM VISION (3 images on same line for mobile) */}
      <div className="max-w-7xl mx-auto px-4 md:px-10 pb-12">
        <div className="grid grid-cols-3 gap-2 md:gap-4 mb-10">
          {aboutUsData?.images?.slice(3, 6).map((img, i) => (
            <div key={i} className="h-32 md:h-80">
              <img
                src={`${import.meta.env.VITE_REACT_APP_IMAGE_URL_2}/${img.image}`}
                className="w-full h-full object-contain rounded-sm"
              />
            </div>
          ))}
        </div>

        <div className="max-w-6xl mx-auto text-center space-y-6 text-sm md:text-base leading-relaxed text-gray-600">
          {aboutUsData?.about_content?.slice(5, 7).map((item, index) => (
            <div key={index} className="space-y-4">
              <h3 className="text-xl md:text-2xl font-semibold text-gray-900">
                {item.title}
              </h3>
              <p className="text-sm md:text-base leading-relaxed">
                {item.description}
              </p>
            </div>
          ))}
        </div>
      </div>

      {/* SECTION 4: TEAM BANNER & FINAL MISSION */}
      <div className="max-w-7xl mx-auto px-4 md:px-10 pb-20 text-center">
        <div className="mb-12">
          <img
            src={`${import.meta.env.VITE_REACT_APP_IMAGE_URL_2}/${aboutUsData?.bottom_banner}`}
            alt="BoroBazar Team"
            className="w-full h-56 md:h-[500px] object-cover rounded-sm"
          />
        </div>

        <h3 className="text-2xl md:text-3xl font-bold mb-6">
          {aboutUsData?.contact_title}
        </h3>

        <div className="max-w-6xl mx-auto space-y-8">
          <p className="text-sm text-gray-500 mt-2">
            {aboutUsData?.contact_description}
          </p>

          <div className="pt-8 border-t border-gray-100">
            <p className="text-base md:text-lg font-medium text-gray-900">
              Reach out for press questions at{" "}
              <a
                href={`mailto:${siteData?.common?.email}`}
                className="text-teal-600 font-bold hover:underline"
              >
                {siteData?.common?.email}
              </a>
            </p>
            <p className="text-sm text-gray-500 mt-2">
              You need anything else? Head over to the{" "}
              <Link to="/contact-us" className="text-teal-600 hover:underline">
                Contact Us
              </Link>{" "}
              section. Pages like that exist just for moments when questions pop
              up in the minds of retailers and wholesale customers.
            </p>
          </div>
        </div>
      </div>
    </section>
  );
};

export default AboutUs;

function AboutUsSkeleton() {
  return (
    <section className="w-full mt-15 animate-pulse">
      {/* HERO */}
      <div className="w-full h-40 md:h-60 bg-gray-200" />

      {/* TITLE */}
      <div className="max-w-7xl mx-auto px-4 md:px-10 py-12 text-center">
        <div className="h-8 w-1/3 mx-auto bg-gray-200 rounded mb-10" />

        <div className="space-y-8">
          {[1, 2, 3].map((_, i) => (
            <div key={i} className="space-y-3">
              <div className="h-5 w-1/4 mx-auto bg-gray-200 rounded" />
              <div className="h-3 w-full bg-gray-200 rounded" />
              <div className="h-3 w-5/6 mx-auto bg-gray-200 rounded" />
            </div>
          ))}
        </div>
      </div>

      {/* IMAGE ROW */}
      <div className="max-w-7xl mx-auto px-4 md:px-10 pb-12">
        <div className="flex gap-3 mb-10">
          {[1, 2, 3].map((_, i) => (
            <div key={i} className="flex-1 h-44 md:h-96 bg-gray-200 rounded" />
          ))}
        </div>

        <div className="space-y-6 text-center">
          {[1, 2].map((_, i) => (
            <div key={i} className="space-y-3">
              <div className="h-5 w-1/4 mx-auto bg-gray-200 rounded" />
              <div className="h-3 w-full bg-gray-200 rounded" />
              <div className="h-3 w-5/6 mx-auto bg-gray-200 rounded" />
            </div>
          ))}
        </div>
      </div>

      {/* SECOND IMAGE GRID */}
      <div className="max-w-7xl mx-auto px-4 md:px-10 pb-12">
        <div className="grid grid-cols-3 gap-3 mb-10">
          {[1, 2, 3].map((_, i) => (
            <div key={i} className="h-32 md:h-80 bg-gray-200 rounded" />
          ))}
        </div>

        <div className="space-y-6 text-center">
          {[1, 2].map((_, i) => (
            <div key={i} className="space-y-3">
              <div className="h-5 w-1/4 mx-auto bg-gray-200 rounded" />
              <div className="h-3 w-full bg-gray-200 rounded" />
              <div className="h-3 w-5/6 mx-auto bg-gray-200 rounded" />
            </div>
          ))}
        </div>
      </div>

      {/* BOTTOM */}
      <div className="max-w-7xl mx-auto px-4 md:px-10 pb-20 text-center">
        <div className="w-full h-56 md:h-[500px] bg-gray-200 rounded mb-10" />

        <div className="h-6 w-1/3 mx-auto bg-gray-200 rounded mb-6" />

        <div className="space-y-4">
          <div className="h-3 w-full bg-gray-200 rounded" />
          <div className="h-3 w-5/6 mx-auto bg-gray-200 rounded" />
        </div>
      </div>
    </section>
  );
}

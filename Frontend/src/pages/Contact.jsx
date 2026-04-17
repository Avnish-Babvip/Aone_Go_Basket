import ContactForm from "../components/ContactForm";
import { getContactSetting } from "../features/actions/cms";
import { useDispatch, useSelector } from "react-redux";
import { useEffect } from "react";

export default function ContactUs() {
  const dispatch = useDispatch();
  const { contactSettingData, cmsLoading } = useSelector((state) => state.cms);
  const { siteData } = useSelector((state) => state.home);
  const sections = Array.isArray(contactSettingData) ? contactSettingData : [];
  useEffect(() => {
    dispatch(getContactSetting());
  }, []);

  return (
    <div className="w-full bg-white mt-20">
      {cmsLoading ? (
        <div className="animate-pulse">
          {/* HERO SKELETON */}
          <div className="w-full h-32 md:h-56 bg-gray-200" />

          {/* MAIN GRID */}
          <div className="max-w-6xl mx-auto px-4 py-16 grid md:grid-cols-2 gap-10">
            {/* LEFT CONTENT */}
            <div className="space-y-8">
              {[...Array(3)].map((_, i) => (
                <div key={i} className="space-y-3">
                  <div className="h-6 w-40 bg-gray-200 rounded"></div>
                  <div className="h-4 w-full bg-gray-200 rounded"></div>
                  <div className="h-4 w-5/6 bg-gray-200 rounded"></div>
                </div>
              ))}
            </div>

            {/* RIGHT FORM SKELETON */}
            <div className="space-y-4">
              <div className="h-10 w-full bg-gray-200 rounded"></div>
              <div className="h-10 w-full bg-gray-200 rounded"></div>
              <div className="h-24 w-full bg-gray-200 rounded"></div>
              <div className="h-10 w-32 bg-gray-200 rounded"></div>
            </div>
          </div>

          {/* BOTTOM INFO SKELETON */}
          <div className="border-t border-gray-200 bg-gray-50 py-12">
            <div className="max-w-6xl mx-auto px-4 grid md:grid-cols-3 gap-8 text-center">
              {[...Array(3)].map((_, i) => (
                <div key={i} className="flex flex-col items-center gap-3">
                  <div className="w-12 h-12 bg-gray-200 rounded-full"></div>
                  <div className="h-4 w-24 bg-gray-200 rounded"></div>
                  <div className="h-3 w-40 bg-gray-200 rounded"></div>
                </div>
              ))}
            </div>
          </div>
        </div>
      ) : (
        <>
          {/* ===== HERO SECTION ===== */}
          <div className="relative w-full h-16 sm:h-24 md:h-32 lg:h-50 xl:h-56 overflow-hidden flex flex-col items-center justify-center border-b border-gray-100">
            <img
              src={`${import.meta.env.VITE_REACT_APP_IMAGE_URL_2}/${siteData?.common?.banner?.[1]}`}
              alt="Privacy Background"
              className="absolute inset-0 w-full h-full object-cover"
            />

            <div className="relative z-10 text-center">
              <h1 className="text-xl md:text-4xl font-bold text-gray-900 mb-2">
                Contact Us
              </h1>
            </div>
          </div>

          {/* ===== MAIN CONTENT ===== */}
          <div className="max-w-6xl mx-auto px-4 py-16 grid md:grid-cols-2 gap-10">
            {/* LEFT SIDE */}
            <div>
              <div className="space-y-10 mt-10 text-gray-600">
                {sections.map((section) => (
                  <div key={section.id} className="space-y-4">
                    <h3 className="text-2xl md:text-3xl font-semibold text-gray-900">
                      {section?.title}
                    </h3>
                    <p className="text-sm md:text-base leading-relaxed">
                      {section?.description}
                    </p>
                  </div>
                ))}
              </div>
            </div>

            {/* RIGHT FORM */}
            <ContactForm />
          </div>

          {/* ===== BOTTOM INFO SECTION ===== */}
          <div className="border-t border-gray-200 bg-gray-50 py-12">
            <div className="max-w-6xl mx-auto px-4 grid md:grid-cols-3 gap-8 text-center">
              <div className="flex flex-col items-center gap-3">
                <div className="w-12 h-12 flex items-center justify-center rounded-full bg-lime-100 text-brand-green">
                  📍
                </div>
                <h4 className="font-semibold">Office Location</h4>
                <p className="text-sm text-gray-600">
                  {siteData?.addresses?.map((item) => (
                    <>
                      {item?.address}
                      <br />
                    </>
                  ))}
                </p>
              </div>

              <div className="flex flex-col items-center gap-3">
                <div className="w-12 h-12 flex items-center justify-center rounded-full bg-lime-100 text-brand-green">
                  📞
                </div>
                <h4 className="font-semibold">Call us anytime</h4>
                <p className="text-sm text-gray-600">
                  {siteData?.phone_numbers?.map((item) => (
                    <>
                      {item?.number}
                      <br />
                    </>
                  ))}
                </p>
              </div>

              <div className="flex flex-col items-center gap-3">
                <div className="w-12 h-12 flex items-center justify-center rounded-full bg-lime-100 text-brand-green">
                  ✉️
                </div>
                <h4 className="font-semibold">Send Mail</h4>
                <p className="text-sm text-gray-600">
                  {" "}
                  {siteData?.emails?.map((item) => (
                    <>
                      {item}
                      <br />
                    </>
                  ))}
                </p>
              </div>
            </div>
          </div>
        </>
      )}
    </div>
  );
}

import React from "react";

const AppDownloadBanner = ({ data }) => {
  return (
    <div
      className="relative w-full min-h-[300px] md:min-h-[500px] my-10 overflow-hidden bg-cover bg-center bg-no-repeat flex items-center"
      style={{
        backgroundImage: `url(${import.meta.env.VITE_REACT_APP_IMAGE_URL_2}/${data?.bg_image})`,
      }}
    >
      <div className="container mx-auto flex flex-col md:flex-row items-center">
        <div className="w-full md:w-1/2 p-8 md:p-16 lg:p-20 order-2 md:order-1">
          <h2 className="text-center lg:text-start text-3xl md:text-4xl lg:text-5xl font-bold text-gray-900 leading-tight mb-6">
            {data?.title}
          </h2>

          <p className="text-gray-600 text-center lg:text-start text-base md:text-lg mb-10 max-w-md">
            {data?.description}
          </p>

          {/* App Store Buttons */}
          <div className="flex flex-row flex-nowrap gap-3 md:gap-4">
            {data?.apple_button_link && (
              <a
                target="_blank"
                href={data?.apple_button_link}
                className="transition-transform hover:scale-105 active:scale-95 flex-shrink-0"
                aria-label="Download on the App Store"
              >
                <img
                  src="images/appstore.svg"
                  alt="App Store"
                  className="h-10 md:h-12 w-auto" // Slightly smaller height on mobile to ensure fit
                />
              </a>
            )}

            {data?.playstore_button_link && (
              <a
                target="_blank"
                href={data?.playstore_button_link}
                className="transition-transform hover:scale-105 active:scale-95 flex-shrink-0"
                aria-label="Get it on Google Play"
              >
                <img
                  src="images/playstore.svg"
                  alt="Google Play"
                  className="h-10 md:h-12 w-auto" // Slightly smaller height on mobile to ensure fit
                />
              </a>
            )}
          </div>
        </div>
      </div>
    </div>
  );
};

export default AppDownloadBanner;

import React from "react";

const AppDownloadBanner = () => {
  return (
    <div className=" mx-auto px-4 py-12">
      <div className="bg-[#F3F4F6] rounded-2xl overflow-hidden flex flex-col md:flex-row items-center">
        {/* Left Content Section */}
        <div className="w-full md:w-1/2 p-8 md:p-16 lg:p-20 order-2 md:order-1">
          <h2 className="text-3xl md:text-4xl lg:text-5xl font-bold text-gray-900 leading-tight mb-6">
            Make your online shop easier with our mobile app
          </h2>

          <p className="text-gray-600 text-base md:text-lg mb-10 max-w-md">
            Aonegobasket makes online grocery shopping fast and easy. Get
            groceries delivered and order the best of seasonal farm fresh food.
          </p>

          {/* App Store Buttons */}
          <div className="flex flex-row flex-nowrap gap-3 md:gap-4">
            <a
              href="#"
              className="transition-transform hover:scale-105 active:scale-95 flex-shrink-0"
              aria-label="Download on the App Store"
            >
              <img
                src="https://upload.wikimedia.org/wikipedia/commons/3/3c/Download_on_the_App_Store_Badge.svg"
                alt="App Store"
                className="h-10 md:h-12 w-auto" // Slightly smaller height on mobile to ensure fit
              />
            </a>

            <a
              href="#"
              className="transition-transform hover:scale-105 active:scale-95 flex-shrink-0"
              aria-label="Get it on Google Play"
            >
              <img
                src="https://upload.wikimedia.org/wikipedia/commons/7/78/Google_Play_Store_badge_EN.svg"
                alt="Google Play"
                className="h-10 md:h-12 w-auto" // Slightly smaller height on mobile to ensure fit
              />
            </a>
          </div>
        </div>

        {/* Right Image Section */}
        <div className="hidden md:flex w-full md:w-1/2 justify-center md:justify-end order-1 md:order-2 p-8 md:p-0">
          <img
            src="images/delevery.webp"
            alt="Delivery man holding grocery bag"
            className="w-full max-w-md md:max-w-full h-100 object-contain"
          />
        </div>
      </div>
    </div>
  );
};

export default AppDownloadBanner;

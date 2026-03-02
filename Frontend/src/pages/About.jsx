import React from "react";
import { Link } from "react-router-dom";

const AboutUs = () => {
  return (
    <section className="w-full mt-15 text-gray-800">
      {/* SECTION 1: HERO & PRIVACY POLICY */}
      <div className="w-full h-[300px] md:h-[450px] overflow-hidden">
        <img
          src="/images/about-us/1.webp"
          alt="Grocery Store Produce Section"
          className="hidden xl:block w-full h-full object-cover"
        />
        <img
          src="/images/about-us/2.webp"
          alt="Grocery Store Produce Section"
          className="hidden sm:block xl:hidden w-full h-full object-cover"
        />
        <img
          src="/images/about-us/3.webp"
          alt="Grocery Store Produce Section"
          className="sm:hidden w-full h-full object-cover"
        />
      </div>

      <div className="max-w-7xl mx-auto px-4 md:px-10 py-12 text-center">
        {/* Main Title */}
        <h2 className="text-3xl md:text-4xl font-bold text-center mb-12">
          About Us
        </h2>

        {/* Content Wrapper */}
        <div className="space-y-10 text-gray-600">
          {/* Section Block */}
          <div className="space-y-4">
            <h3 className="text-xl md:text-2xl font-semibold text-gray-900">
              Who We Are
            </h3>
            <p className="text-sm md:text-base leading-relaxed">
              Every day, our team moves quality groceries in large amounts
              straight to stores that need them. Freshness shows up on time
              because careful planning guides every delivery step. Shop by shop,
              trust builds when prices stay fair without surprises. Behind
              steady shelves sits a network built to last, not just react. What
              matters most? Knowing your next order will arrive complete, safe,
              and ready.
            </p>
          </div>
          <div className="space-y-4">
            <h3 className="text-xl md:text-2xl font-semibold text-gray-900">
              How We Choose and Check Products
            </h3>
            <p className="text-sm md:text-base leading-relaxed">
              Our team checks each grocery and crate by hand, judging ripeness
              first. Only what passes gets logged into stock. Bins are labeled
              right after sorting - no guesswork later. Trucks load on schedule
              because shelves empty predictably. Retailers count on consistency
              more than speed. A single spoiled batch means delays nobody wants.
              We watch humidity levels like hawks during holding.
            </p>
          </div>
          <div className="space-y-4">
            <h3 className="text-xl md:text-2xl font-semibold text-gray-900">
              Our Operational System
            </h3>
            <p className="text-sm md:text-base leading-relaxed">
              Security meets speed when shops place orders through our setup.
              Behind the scenes, the movement of goods gets sharper each week
              because systems talk more clearly now. Stock rooms adapt fast,
              reacting to how stores actually order over time instead of
              guessing. Patterns emerge quietly - what sells, when it moves,
              which items wait too long on shelves. Adjustments happen without
              fanfare: trucks roll sooner, shelves refill predictably. Numbers
              guide decisions, not habits. Empty spaces become rare by design,
              thanks to steady tracking behind the curtain. Planning leans into
              real behavior, skipping old assumptions about what might sell.
            </p>
          </div>
        </div>
      </div>

      {/* SECTION 2: SECURITY PROCEDURES (Images on same line for mobile) */}
      <div className="max-w-7xl mx-auto px-4 md:px-10 pb-12">
        <div className="flex flex-nowrap gap-2 md:gap-4 mb-10">
          <div className="flex-1 h-44 md:h-96">
            <img
              src="/images/about-us/650x650.webp"
              alt="Worker"
              className="w-full h-full object-contain rounded-sm"
            />
          </div>
          <div className="flex-1 h-44 md:h-96">
            <img
              src="/images/about-us/650x650-1.webp"
              alt="Manager"
              className="w-full h-full object-contain rounded-sm"
            />
          </div>
          <div className="flex-1 h-44 md:h-96">
            <img
              src="/images/about-us/650x650-2.webp"
              alt="Manager"
              className="w-full h-full object-contain rounded-sm"
            />
          </div>
        </div>

        <div className="max-w-6xl mx-auto text-center space-y-6 text-sm md:text-base leading-relaxed text-gray-600">
          <div className="space-y-4">
            <h3 className="text-xl md:text-2xl font-semibold text-gray-900">
              Data and Transaction Security
            </h3>
            <p className="text-sm md:text-base leading-relaxed">
              Trust means something here. Because we handle your transactions
              and store details carefully, using clear systems across
              operations, tech, and management. Only certain team members can
              view private information - just when needed for handling orders or
              organizing support tasks.
            </p>
          </div>
          <div className="space-y-4">
            <h3 className="text-xl md:text-2xl font-semibold text-gray-900">
              Secure Business Practices
            </h3>
            <p className="text-sm md:text-base leading-relaxed">
              Even when things run smoothly, staying careful matters just as
              much as doing the job right. Partners should keep their messages
              clear and thoughtful, especially under pressure. You will not get
              asked for private money details by Aone Go Basket unless it
              happens through proper paths. Any contact missing official
              approval won’t come from us - period.
            </p>
          </div>
        </div>
      </div>

      {/* SECTION 3: PLATFORM VISION (3 images on same line for mobile) */}
      <div className="max-w-7xl mx-auto px-4 md:px-10 pb-12">
        <div className="grid grid-cols-3 gap-2 md:gap-4 mb-10">
          <div className="h-32 md:h-80">
            <img
              src="/images/about-us/600x600.webp"
              alt="Cooking"
              className="w-full h-full object-contain rounded-sm"
            />
          </div>
          <div className="h-32 md:h-80">
            <img
              src="/images/about-us/600x600-1.webp"
              alt="Cooking"
              className="w-full h-full object-contain rounded-sm"
            />
          </div>
          <div className="h-32 md:h-80">
            <img
              src="/images/about-us/600x600-2.webp"
              alt="Cooking"
              className="w-full h-full object-contain rounded-sm"
            />
          </div>
        </div>

        <div className="max-w-6xl mx-auto text-center space-y-6 text-sm md:text-base leading-relaxed text-gray-600">
          <div className="space-y-4">
            <h3 className="text-xl md:text-2xl font-semibold text-gray-900">
              Our Distribution Network
            </h3>
            <p className="text-sm md:text-base leading-relaxed">
              Behind every order, technology links growers directly to storage
              crews, then on to drivers who know the streets. Each step clicks
              into place - boxes sealed right, trucks rolling fast, goods
              reaching shops when promised - all while neighborhood vendors stay
              looped in.
            </p>
          </div>
          <div className="space-y-4">
            <h3 className="text-xl md:text-2xl font-semibold text-gray-900">
              Our Commitment
            </h3>
            <p className="text-sm md:text-base leading-relaxed">
              Stocking shelves starts with trust, not transactions. Our job?
              Keeping stores full without delay, using fair prices that make
              sense over time. Partners stay steady when supplies never stall,
              so we build rhythms, not just deliveries. Smooth operations grow
              where predictability meets price, quietly boosting what matters -
              daily success. Long handshakes outlast short gains; ours last
              because they work.
            </p>
          </div>
        </div>
      </div>

      {/* SECTION 4: TEAM BANNER & FINAL MISSION */}
      <div className="max-w-7xl mx-auto px-4 md:px-10 pb-20 text-center">
        <div className="mb-12">
          <img
            src="/images/about-us/2.webp"
            alt="BoroBazar Team"
            className="w-full h-56 md:h-[500px] object-cover rounded-sm"
          />
        </div>

        <h3 className="text-2xl md:text-3xl font-bold mb-6">
          Stay Safe Stay Secure
        </h3>

        <div className="max-w-6xl mx-auto space-y-8">
          <p className="text-sm md:text-base leading-relaxed text-gray-600">
            Behind the scenes, it is the quiet effort of warehouse hands that
            keeps things moving smoothly. Dispatch does its part without fuss,
            timing each step just right. Riders take over from there, delivering
            what was promised, nothing more, nothing less. Each large shipment
            carries a standard that we do not lower.
          </p>

          <div className="pt-8 border-t border-gray-100">
            <p className="text-base md:text-lg font-medium text-gray-900">
              Reach out for press questions at{" "}
              <a
                href="mailto:info@aonegobasket.com"
                className="text-teal-600 font-bold hover:underline"
              >
                info@aonegobasket.com
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

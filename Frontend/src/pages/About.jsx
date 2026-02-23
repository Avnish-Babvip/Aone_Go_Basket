import React from "react";

const AboutUs = () => {
  return (
    <section className="w-full mt-15 text-gray-800">
      {/* SECTION 1: HERO & PRIVACY POLICY */}
      <div className="w-full h-[300px] md:h-[450px] overflow-hidden">
        <img
          src="/images/Banner-bg-2.jpg"
          alt="Grocery Store Produce Section"
          className="w-full h-full object-cover"
        />
      </div>

      <div className="max-w-7xl mx-auto px-4 md:px-10 py-12 text-center">
        <h2 className="text-3xl md:text-4xl font-bold mb-8">About us</h2>
        <div className="max-w-6xl mx-auto space-y-6 text-sm md:text-base leading-relaxed text-gray-600">
          <p>
            We may automatically track certain information about you based upon
            your behavior on the website. We use this information to do internal
            research on our users' demographics, interests, and behavior to
            better understand, protect and serve our users. This information is
            compiled and analyzed on an aggregated basis.
          </p>

          <p>
            This information may include the URL that you just came from
            (whether this URL is on the website or not), which URL you next go
            to (whether this URL is on the website or not), your computer
            browser information, your IP address, and other information
            associated with your interaction with the website.{" "}
            <span className="font-semibold text-gray-800">
              We may also share your Mobile IP/Device IP with third party(ies)
              and to the best of our knowledge, be-life and representations
              given to us by these third party(ies) this information is not
              stored.
            </span>
          </p>

          <p>
            Our Privacy Policy is incorporated into the Terms and Conditions of
            Use of the website/app, and is subject to change from time to time
            without notice. It is strongly recommended that you periodically
            review our Privacy Policy as posted on the App/Web.
          </p>

          <p className="pt-4">
            Should you have any clarifications regarding this Privacy Policy,
            please do not hesitate to contact us at [Insert Contact Info]
          </p>
        </div>
      </div>

      {/* SECTION 2: SECURITY PROCEDURES (Images on same line for mobile) */}
      <div className="max-w-7xl mx-auto px-4 md:px-10 pb-12">
        <div className="flex flex-nowrap gap-2 md:gap-4 mb-10">
          <div className="flex-1 h-44 md:h-96">
            <img
              src="/images/delevery.webp"
              alt="Worker"
              className="w-full h-full object-cover rounded-sm"
            />
          </div>
          <div className="flex-1 h-44 md:h-96">
            <img
              src="/images/delevery.webp"
              alt="Manager"
              className="w-full h-full object-cover rounded-sm"
            />
          </div>
        </div>

        <div className="max-w-6xl mx-auto text-center space-y-6 text-sm md:text-base leading-relaxed text-gray-600">
          <p>
            To protect against the loss, misuse and alteration of the
            information under its control, the Company has in place appropriate
            physical, electronic and managerial procedures. For example, the
            Company servers are accessible only to authorized personnel and your
            information is shared with employees and authorized personnel on a
            need to know basis to complete the transaction and to provide the
            services requested by you.
          </p>
          <p>
            Although the Company endeavour to safeguard the confidentiality of
            your personally identifiable information, transmissions made by
            means of the Internet cannot be made absolutely secure. By using the
            website, you agree that the Company will have no liability for
            disclosure of your information due to errors in transmission and/or
            unauthorized acts of third parties.
          </p>
          <p>
            Please note that the Company will not ask you to share any sensitive
            data or information via email or telephone. If you receive any such
            request by email or telephone, please do not respond/divulge any
            sensitive data or information and forward the information relating
            to the same to [Insert Email Address]
          </p>
        </div>
      </div>

      {/* SECTION 3: PLATFORM VISION (3 images on same line for mobile) */}
      <div className="max-w-7xl mx-auto px-4 md:px-10 pb-12">
        <div className="grid grid-cols-3 gap-2 md:gap-4 mb-10">
          <div className="h-32 md:h-80">
            <img
              src="/images/delevery.webp"
              alt="Cooking"
              className="w-full h-full object-cover rounded-sm"
            />
          </div>
          <div className="h-32 md:h-80">
            <img
              src="/images/delevery.webp"
              alt="Family"
              className="w-full h-full object-cover rounded-sm"
            />
          </div>
          <div className="h-32 md:h-80">
            <img
              src="/images/delevery.webp"
              alt="Packing"
              className="w-full h-full object-cover rounded-sm"
            />
          </div>
        </div>

        <div className="max-w-6xl mx-auto text-center space-y-6 text-sm md:text-base leading-relaxed text-gray-600">
          <p>
            Built on a proprietary technology stack, the Grocers platform serves
            as a convergence of consumers looking for everyday essentials,
            partner stores who serve their needs efficiently, and manufacturers
            looking for a channel to reach a nation of consumers. While our
            technology caters to the burgeoning population of urban India, it is
            ready and poised to serve the next 100+ million Indians who are yet
            to start shopping online.
          </p>
          <p>
            We believe the ecosystem we power can transform the lives of a
            billion Indians significantly over the coming decade. They will have
            access to everyday essentials like groceries at the best value, be
            able to discover products that improve their health and wellbeing,
            and spend more meaningful time with their families – with the
            assurance that their essential needs are being looked after by us.
          </p>
          <p>
            On the other side of this virtuous cycle are the millions of local
            businesses catering to a nation's needs, helping create more
            opportunities for employment, growth, and above all, a better life.
          </p>
        </div>
      </div>

      {/* SECTION 4: TEAM BANNER & FINAL MISSION */}
      <div className="max-w-7xl mx-auto px-4 md:px-10 pb-20 text-center">
        <div className="mb-12">
          <img
            src="/images/Banner-bg-2.jpg"
            alt="BoroBazar Team"
            className="w-full h-56 md:h-[500px] object-cover rounded-sm"
          />
        </div>

        <h3 className="text-2xl md:text-3xl font-bold mb-6">
          Be safe, be secure!!
        </h3>

        <div className="max-w-6xl mx-auto space-y-8">
          <p className="text-sm md:text-base leading-relaxed text-gray-600">
            BoroBazar is leading the charge in transforming India's vast,
            unorganized grocery landscape through cutting-edge technology and
            innovation. We believe every Indian deserves the opportunity to
            continually improve their life – a process that often begins at
            home. As part of our mission of helping consumers make healthier,
            better choices when buying everyday products, we make a wide range
            of high-quality grocery and household products accessible,
            affordable, and available right at their doorsteps.
          </p>

          <div className="pt-8 border-t border-gray-100">
            <p className="text-base md:text-lg font-medium text-gray-900">
              For media enquiries please contact us at:{" "}
              <a
                href="mailto:press@borobazar.com"
                className="text-teal-600 font-bold hover:underline"
              >
                info@aonegobasket.com
              </a>
            </p>
            <p className="text-sm text-gray-500 mt-2">
              For all other inquiries, visit our{" "}
              <a href="/contact" className="text-teal-600 hover:underline">
                Contact Us
              </a>{" "}
              page.
            </p>
          </div>
        </div>
      </div>
    </section>
  );
};

export default AboutUs;

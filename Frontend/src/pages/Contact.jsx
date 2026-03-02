export default function ContactUs() {
  return (
    <div className="w-full bg-white mt-20">
      {/* ===== HERO SECTION ===== */}
      <div className="relative w-full h-16 sm:h-24 md:h-32 lg:h-50 xl:h-56 overflow-hidden flex flex-col items-center justify-center border-b border-gray-100">
        <img
          src="/images/contact-us.webp"
          alt="Privacy Background"
          className="absolute inset-0 w-full h-full object-cover"
        />
        {/* <div className="absolute inset-0 bg-white/70"></div> */}

        <div className="relative z-10 text-center">
          <h1 className="text-xl md:text-4xl font-bold text-gray-900 mb-2">
            Contact Us
          </h1>
        </div>
      </div>

      {/* ===== MAIN CONTENT ===== */}
      <div className="max-w-6xl mx-auto px-4 py-16 grid md:grid-cols-2 gap-10">
        {/* LEFT SIDE */}
        <div className="">
          <h2 className="text-3xl md:text-4xl font-semibold mb-4">
            Support is our main priority
          </h2>
          <p className="text-gray-600 mb-6">
            We ensure reliable assistance and responsive service so your
            wholesale grocery orders remain smooth and hassle-free. Our team is
            always ready to help you.
          </p>

          {/* Content Wrapper */}
          <div className="space-y-10 mt-10 text-gray-600">
            {/* Section Block */}
            <div className="space-y-4">
              <h3 className="text-2xl md:text-3xl font-semibold text-gray-900">
                CONTACT US
              </h3>
              <p className="text-sm md:text-base leading-relaxed">
                Aone Go Basket keeps things open and honest when talking with
                stores and big buyers. Got questions about large shipments, when
                items go out, what's in stock, how payments work, or teaming up?
                The crew there knows how to help. Reaching out brings answers
                straight from those who manage the details every day.
              </p>
            </div>
            <div className="space-y-4">
              <h3 className="text-xl md:text-2xl font-semibold text-gray-900">
                Wholesale Support
              </h3>
              <p className="text-sm md:text-base leading-relaxed">
                Got questions about your order, shipping status, stock levels,
                or account details? Reach out to support using the approved
                methods. Official channels are the way to go when you need help
                with deliveries, confirmation receipts, product availability, or
                personal account matters. Always connect through verified lines
                for any assistance tied to purchases or system access.
              </p>
              <p className="text-base md:text-lg font-medium text-gray-900">
                Phone{" "}
                <a
                  href="mailto:info@aonegobasket.com"
                  className="text-teal-600 font-bold hover:underline"
                >
                  +91 XXXXX XXXXX
                </a>
              </p>
              <p className="text-base md:text-lg font-medium text-gray-900">
                Email:{" "}
                <a
                  href="mailto:info@aonegobasket.com"
                  className="text-teal-600 font-bold hover:underline"
                >
                  info@aonegobasket.com
                </a>
              </p>
              <p className="text-sm md:text-base leading-relaxed">
                From opening bell to close, team members stand ready. Smooth
                operations? That’s the goal each day. Supply flows without pause
                thanks to daily oversight. Help arrives when needed, nothing
                held back.
              </p>
            </div>
            <div className="space-y-4">
              <h3 className="text-xl md:text-2xl font-semibold text-gray-900">
                Business and Vendor Inquiries
              </h3>
              <p className="text-sm md:text-base leading-relaxed">
                Got a proposal for Aone Go Basket? Reach out by email or call -
                we’re ready to look it over. Suppliers, plus those handling
                distribution or logistics, are welcome to connect. Someone from
                our team will get back to you without delay. Smooth coordination
                happens every step of the way.
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
              </div>
            </div>
          </div>
        </div>

        {/* RIGHT FORM */}
        <form className="bg-white p-6 rounded-lg shadow">
          <div className="mb-4">
            <label className="text-sm font-medium">Full Name *</label>
            <input
              type="text"
              placeholder="Enter your full name"
              className="w-full mt-1 border border-gray-300 rounded px-3 py-2 focus:outline-none focus:ring-2 focus:ring-green-500"
            />
          </div>

          <div className="mb-4">
            <label className="text-sm font-medium">Email Address *</label>
            <input
              type="email"
              placeholder="Enter your email"
              className="w-full mt-1 border border-gray-300 rounded px-3 py-2 focus:outline-none focus:ring-2 focus:ring-green-500"
            />
          </div>

          <div className="mb-4">
            <label className="text-sm font-medium">Phone (Optional)</label>
            <input
              type="text"
              placeholder="Enter your phone"
              className="w-full mt-1 border border-gray-300 rounded px-3 py-2 focus:outline-none focus:ring-2 focus:ring-green-500"
            />
          </div>

          <div className="mb-4">
            <label className="text-sm font-medium">Message</label>
            <textarea
              rows="4"
              placeholder="Briefly describe..."
              className="w-full mt-1 border border-gray-300 rounded px-3 py-2 focus:outline-none focus:ring-2 focus:ring-green-500"
            ></textarea>
          </div>

          <button
            type="submit"
            className="w-full bg-brand-green text-white py-2 rounded-xl hover:bg-lime-600 transition"
          >
            Send Message
          </button>
        </form>
      </div>

      {/* ===== BOTTOM INFO SECTION ===== */}
      <div className="border-t border-gray-200 bg-gray-50 py-12">
        <div className="max-w-6xl mx-auto px-4 grid md:grid-cols-3 gap-8 text-center">
          {/* LOCATION */}
          <div className="flex flex-col items-center gap-3">
            <div className="w-12 h-12 flex items-center justify-center rounded-full bg-lime-100 text-brand-green">
              📍
            </div>
            <h4 className="font-semibold">Office Location</h4>
            <p className="text-sm text-gray-600">
              2756 Street Valley Lane, Jakkabad, Dehradun, India
            </p>
          </div>

          {/* PHONE */}
          <div className="flex flex-col items-center gap-3">
            <div className="w-12 h-12 flex items-center justify-center rounded-full bg-lime-100 text-brand-green">
              📞
            </div>
            <h4 className="font-semibold">Call us anytime</h4>
            <p className="text-sm text-gray-600">
              +91 12141415 <br /> +91 12141415
            </p>
          </div>

          {/* EMAIL */}
          <div className="flex flex-col items-center gap-3">
            <div className="w-12 h-12 flex items-center justify-center rounded-full bg-lime-100 text-brand-green">
              ✉️
            </div>
            <h4 className="font-semibold">Send Mail</h4>
            <p className="text-sm text-gray-600">info@aonegobasket.com</p>
          </div>
        </div>
      </div>
    </div>
  );
}

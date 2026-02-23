import React from "react";

export default function ContactUs() {
  return (
    <div className="w-full bg-white mt-15">
      {/* ===== HERO SECTION ===== */}
      <div className="relative h-[300px] w-full">
        <img
          src="https://images.unsplash.com/photo-1521737604893-d14cc237f11d"
          alt="Contact"
          className="h-full w-full object-cover"
        />
        <div className="absolute inset-0 bg-black/40 flex flex-col items-center justify-center text-white">
          <h1 className="text-4xl font-bold">Contact Us</h1>
          <p className="text-sm mt-2">Home / Contact</p>
        </div>
      </div>

      {/* ===== MAIN CONTENT ===== */}
      <div className="max-w-6xl mx-auto px-4 py-16 grid md:grid-cols-2 gap-10">
        {/* LEFT SIDE */}
        <div>
          <h2 className="text-2xl font-semibold mb-4">
            Support is our main priority
          </h2>
          <p className="text-gray-600 mb-6">
            We create reusable React components and modern UI layouts so you can
            build fast and scalable applications. Our team is always ready to
            help you.
          </p>

          <div className="flex items-center gap-3">
            {[1, 2, 3, 4].map((i) => (
              <img
                key={i}
                src={`https://i.pravatar.cc/40?img=${i}`}
                alt="user"
                className="w-10 h-10 rounded-full border border-gray-200"
              />
            ))}
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
            className="w-full bg-green-500 text-white py-2 rounded hover:bg-green-600 transition"
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
            <div className="w-12 h-12 flex items-center justify-center rounded-full bg-green-100 text-green-600">
              📍
            </div>
            <h4 className="font-semibold">Office Location</h4>
            <p className="text-sm text-gray-600">
              2756 Street Valley Lane, Jakkabad, Dehradun, India
            </p>
          </div>

          {/* PHONE */}
          <div className="flex flex-col items-center gap-3">
            <div className="w-12 h-12 flex items-center justify-center rounded-full bg-green-100 text-green-600">
              📞
            </div>
            <h4 className="font-semibold">Call us anytime</h4>
            <p className="text-sm text-gray-600">
              +91 12141415 <br /> +91 12141415
            </p>
          </div>

          {/* EMAIL */}
          <div className="flex flex-col items-center gap-3">
            <div className="w-12 h-12 flex items-center justify-center rounded-full bg-green-100 text-green-600">
              ✉️
            </div>
            <h4 className="font-semibold">Send Mail</h4>
            <p className="text-sm text-gray-600">support@domain.com</p>
          </div>
        </div>
      </div>
    </div>
  );
}

import React from "react";

const Contact = () => {
  return (
    <div className="min-h-screen bg-gray-100 text-gray-800">
      {/* Hero */}
      <section className="bg-gray-800 px-6 py-24 text-center text-white">
        <h1 className="font-serif text-5xl font-bold md:text-6xl">
          Contact Us
        </h1>

        <p className="mx-auto mt-6 max-w-2xl text-lg leading-relaxed text-gray-300">
          Have a question or want to know more about ABES Engineering College?
          Get in touch with us.
        </p>
      </section>

      {/* Contact Section */}
      <section className="mx-auto max-w-6xl px-6 py-16">
        <div className="grid gap-10 md:grid-cols-2">
          
          {/* Contact Information */}
          <div>
            <h2 className="font-serif text-4xl font-bold text-gray-800">
              Get in Touch
            </h2>

            <p className="mt-5 leading-7 text-gray-600">
              Our campus and administrative teams are available to help with
              admissions, academics, campus information, and general
              enquiries.
            </p>

            <div className="mt-8 space-y-6">
              {/* Address */}
              <div className="flex gap-4">
                <div className="flex h-11 w-11 shrink-0 items-center justify-center rounded-full bg-gray-800 text-white">
                  📍
                </div>

                <div>
                  <h3 className="font-semibold">Address</h3>
                  <p className="mt-1 text-gray-600">
                    ABES Engineering College
                    <br />
                    Ghaziabad, Uttar Pradesh
                    <br />
                    India
                  </p>
                </div>
              </div>

              {/* Email */}
              <div className="flex gap-4">
                <div className="flex h-11 w-11 shrink-0 items-center justify-center rounded-full bg-gray-800 text-white">
                  ✉
                </div>

                <div>
                  <h3 className="font-semibold">Email</h3>
                  <p className="mt-1 text-gray-600">
                    info@example.com
                  </p>
                </div>
              </div>

              {/* Phone */}
              <div className="flex gap-4">
                <div className="flex h-11 w-11 shrink-0 items-center justify-center rounded-full bg-gray-800 text-white">
                  ☎
                </div>

                <div>
                  <h3 className="font-semibold">Phone</h3>
                  <p className="mt-1 text-gray-600">
                    +91 XXXXX XXXXX
                  </p>
                </div>
              </div>
            </div>
          </div>

          {/* Contact Form */}
          <div className="rounded-xl bg-white p-8 shadow-lg">
            <h2 className="font-serif text-3xl font-bold text-gray-800">
              Send a Message
            </h2>

            <form className="mt-6 space-y-5">
              <div>
                <label className="mb-2 block text-sm font-medium">
                  Name
                </label>

                <input
                  type="text"
                  placeholder="Enter your name"
                  className="w-full rounded-lg border border-gray-300 px-4 py-3 outline-none transition focus:border-gray-800 focus:ring-1 focus:ring-gray-800"
                />
              </div>

              <div>
                <label className="mb-2 block text-sm font-medium">
                  Email
                </label>

                <input
                  type="email"
                  placeholder="Enter your email"
                  className="w-full rounded-lg border border-gray-300 px-4 py-3 outline-none transition focus:border-gray-800 focus:ring-1 focus:ring-gray-800"
                />
              </div>

              <div>
                <label className="mb-2 block text-sm font-medium">
                  Subject
                </label>

                <input
                  type="text"
                  placeholder="Enter subject"
                  className="w-full rounded-lg border border-gray-300 px-4 py-3 outline-none transition focus:border-gray-800 focus:ring-1 focus:ring-gray-800"
                />
              </div>

              <div>
                <label className="mb-2 block text-sm font-medium">
                  Message
                </label>

                <textarea
                  rows="5"
                  placeholder="Write your message..."
                  className="w-full resize-none rounded-lg border border-gray-300 px-4 py-3 outline-none transition focus:border-gray-800 focus:ring-1 focus:ring-gray-800"
                ></textarea>
              </div>

              <button
                type="submit"
                className="w-full rounded-lg bg-gray-800 px-6 py-3 font-semibold text-white transition hover:bg-gray-700"
              >
                Send Message
              </button>
            </form>
          </div>
        </div>
      </section>

      {/* Footer CTA */}
      <section className="bg-gray-800 px-6 py-12 text-center text-white">
        <h2 className="font-serif text-3xl font-bold">
          We’re Here to Help
        </h2>

        <p className="mt-3 text-gray-300">
          Reach out to us for any academic or general enquiry.
        </p>
      </section>
    </div>
  );
};

export default Contact;
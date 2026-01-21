"use client";

import { useRef, useState } from "react";
import emailjs from "@emailjs/browser";

export default function ContactContent() {
  const form = useRef();
  const [loading, setLoading] = useState(false);
  const [status, setStatus] = useState(null);

  const sendEmail = (e) => {
    e.preventDefault();
    setLoading(true);
    setStatus(null);

    emailjs
      .sendForm(
        process.env.NEXT_PUBLIC_EMAILJS_SERVICE_ID,
        process.env.NEXT_PUBLIC_EMAILJS_TEMPLATE_ID,
        form.current,
        process.env.NEXT_PUBLIC_EMAILJS_PUBLIC_KEY,
      )
      .then(
        (result) => {
          console.log(result.text);
          setStatus("success");
          e.target.reset();
        },
        (error) => {
          console.log(error.text);
          setStatus("error");
        },
      )
      .finally(() => {
        setLoading(false);
        setTimeout(() => setStatus(null), 5000);
      });
  };

  return (
    <div className="min-h-screen py-12">
      {/* Hero Section */}
      <div className="container mx-auto px-4 mb-12 text-center">
        <h1 className="text-3xl md:text-4xl font-bold mb-4 text-(--primary)">
          Contact Us
        </h1>
        <p className="text-lg max-w-2xl mx-auto text-(--text)">
          We love hearing from our customers. Whether you have a question about
          products, pricing, or anything else, our team is ready to answer all
          your questions.
        </p>
      </div>

      <div className="container mx-auto px-4 max-w-6xl">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-12">
          {/* Left Column: Contact Info */}
          <div className="space-y-8">
            <div className="grid gap-6">
              {/* Address */}
              <div className="flex items-start gap-4 p-6 rounded-2xl border bg-white border-(--border) hover:border-(--primary) duration-300">
                <div className="w-12 h-12 flex items-center justify-center rounded-full text-xl shrink-0 bg-(--background3) text-(--primary)">
                  📍
                </div>
                <div>
                  <h3 className="font-bold text-lg mb-1 text-(--heading)">
                    Head Office
                  </h3>
                  <p className="text-sm leading-relaxed text-(--secondary)">
                    123 MegaMart Street, Cairo Festival City,
                    <br /> New Cairo, Egypt.
                  </p>
                </div>
              </div>

              {/* Phone */}
              <div className="flex items-start gap-4 p-6 rounded-2xl border bg-white border-(--border) hover:border-(--primary) duration-300">
                <div className="w-12 h-12 flex items-center justify-center rounded-full text-xl shrink-0 bg-(--background3) text-(--primary)">
                  📞
                </div>
                <div>
                  <h3 className="font-bold text-lg mb-1 text-(--heading)">
                    Phone Number
                  </h3>
                  <p className="text-sm mb-1 text-(--secondary)">
                    Call Us: 010-123-456-78
                  </p>
                  <p className="text-sm text-(--secondary)">
                    Mon - Sat: 9:00 AM - 6:00 PM
                  </p>
                </div>
              </div>

              {/* Email */}
              <div className="flex items-start gap-4 p-6 rounded-2xl border bg-white border-(--border) hover:border-(--primary) duration-300">
                <div className="w-12 h-12 flex items-center justify-center rounded-full text-xl shrink-0 bg-(--background3) text-(--primary)">
                  ✉️
                </div>
                <div>
                  <h3 className="font-bold text-lg mb-1 text-(--heading)">
                    Email Support
                  </h3>
                  <p className="text-sm mb-1 text-(--secondary)">
                    support@megamart.com
                  </p>
                </div>
              </div>
            </div>
          </div>

          {/* Right Column: Contact Form */}
          <div className="bg-white p-8 md:p-10 rounded-3xl shadow-lg border border-(--border)">
            <h2 className="text-2xl font-bold mb-6 text-(--heading)">
              Send us a Message
            </h2>

            <form ref={form} onSubmit={sendEmail} className="space-y-6">
              <div className="grid md:grid-cols-2 gap-6">
                <div className="space-y-2">
                  <label
                    htmlFor="name"
                    className="text-sm font-semibold text-(--heading)"
                  >
                    Your Name
                  </label>
                  <input
                    type="text"
                    id="name"
                    name="user_name"
                    required
                    placeholder="John Doe"
                    className="w-full p-3 rounded-xl border outline-none focus:ring-2 transition border-(--border) bg-(--background2) focus:ring-(--primary)"
                  />
                </div>
                <div className="space-y-2">
                  <label
                    htmlFor="email"
                    className="text-sm font-semibold text-(--heading)"
                  >
                    Your Email
                  </label>
                  <input
                    type="email"
                    id="email"
                    name="user_email"
                    required
                    placeholder="john@example.com"
                    className="w-full p-3 rounded-xl border outline-none focus:ring-2 transition border-(--border) bg-(--background2) focus:ring-(--primary)"
                  />
                </div>
              </div>

              <div className="space-y-2">
                <label
                  htmlFor="subject"
                  className="text-sm font-semibold text-(--heading)"
                >
                  Subject
                </label>
                <input
                  type="text"
                  id="subject"
                  name="subject"
                  required
                  placeholder="Order Inquiry / General Question"
                  className="w-full p-3 rounded-xl border outline-none focus:ring-2 transition border-(--border) bg-(--background2) focus:ring-(--primary)"
                />
              </div>

              <div className="space-y-2">
                <label
                  htmlFor="message"
                  className="text-sm font-semibold text-(--heading)"
                >
                  Message
                </label>
                <textarea
                  id="message"
                  name="message"
                  rows="5"
                  required
                  placeholder="Write your message here..."
                  className="w-full p-3 rounded-xl border outline-none focus:ring-2 transition resize-none border-(--border) bg-(--background2) focus:ring-(--primary)"
                ></textarea>
              </div>

              {status === "success" && (
                <p className="text-green-600 font-medium">
                  ✅ Your message has been sent successfully!
                </p>
              )}
              {status === "error" && (
                <p className="text-red-600 font-medium">
                  ❌ Something went wrong. Please try again later.
                </p>
              )}

              <button
                type="submit"
                disabled={loading}
                className={`w-full py-4 rounded-xl font-bold text-white transition shadow-md bg-(--primary) ${
                  loading ? "opacity-70 cursor-not-allowed" : "hover:opacity-90"
                }`}
              >
                {loading ? "Sending..." : "Send Message"}
              </button>
            </form>
          </div>
        </div>
      </div>
    </div>
  );
}

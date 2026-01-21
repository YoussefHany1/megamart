export const metadata = {
  title: "About Us | MegaMart",
  description: "Learn more about MegaMart, your favorite online marketplace.",
};

export default function AboutPage() {
  return (
    <div className="min-h-screen py-12">
      {/* Hero Section */}
      <div className="container mx-auto px-4 mb-16 text-center">
        <h1 className="text-4xl md:text-5xl font-bold mb-6 text-(--primary)">
          About MegaMart
        </h1>
        <p className="text-lg md:text-xl max-w-2xl mx-auto text-(--text)">
          We are dedicated to providing the best online shopping experience,
          bringing you quality products at unbeatable prices.
        </p>
      </div>

      {/* Our Story & Mission Section */}
      <div className="container mx-auto px-4 mb-16">
        <div className="grid grid-cols-1 md:grid-cols-2 gap-12 items-center">
          <div className="bg-(--background1) p-8 rounded-2xl h-full flex flex-col justify-center">
            <h2 className="text-3xl font-bold mb-4 text-(--primary)">
              Our Story
            </h2>
            <p className="leading-relaxed mb-4 text-(--secondary)">
              Founded with a vision to simplify online shopping, MegaMart
              started as a small project and grew into a leading marketplace. We
              believe in the power of technology to connect buyers and sellers
              seamlessly.
            </p>
            <p className="leading-relaxed text-(--secondary)">
              Today, we serve thousands of customers, offering a wide range of
              products from electronics to daily essentials, all delivered to
              your doorstep.
            </p>
          </div>

          <div className="bg-(--background2) p-8 rounded-2xl h-full flex flex-col justify-center">
            <h2 className="text-3xl font-bold mb-4 text-(--primary)">
              Our Mission
            </h2>
            <p className="leading-relaxed mb-4 text-(--secondary)">
              Our mission is to create a reliable, fast, and secure marketplace
              where shopping feels effortless. We prioritize customer
              satisfaction above all else.
            </p>
            <ul className="list-disc list-inside space-y-2 text-(--text)">
              <li>Quality Products</li>
              <li>Fast & Secure Delivery</li>
              <li>24/7 Customer Support</li>
              <li>Transparent Pricing</li>
            </ul>
          </div>
        </div>
      </div>

      {/* Why Choose Us Section */}
      <div className="py-16">
        <div className="container mx-auto px-4">
          <h2 className="text-3xl font-bold text-center mb-12 text-(--primary)">
            Why Choose MegaMart?
          </h2>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-8 text-center">
            {/* Feature 1 */}
            <div className="p-6 bg-white rounded-xl shadow-sm border border-(--border)">
              <div className="w-16 h-16 mx-auto mb-4 rounded-full flex items-center justify-center text-2xl bg-(--primary) text-white">
                🚀
              </div>
              <h3 className="text-xl font-bold mb-2 text-(--heading)">
                Fast Delivery
              </h3>
              <p className="text-(--text)">
                We ensure your orders reach you as quickly as possible with our
                efficient logistics network.
              </p>
            </div>

            {/* Feature 2 */}
            <div className="p-6 bg-white rounded-xl shadow-sm border border-(--border)">
              <div className="w-16 h-16 mx-auto mb-4 rounded-full flex items-center justify-center text-2xl bg-(--yellow) text-white">
                💎
              </div>
              <h3 className="text-xl font-bold mb-2 text-(--heading)">
                Best Quality
              </h3>
              <p className="text-(--text)">
                We carefully curate our products to ensure you get only the best
                quality items.
              </p>
            </div>

            {/* Feature 3 */}
            <div className="p-6 bg-white rounded-xl shadow-sm border border-(--border)">
              <div className="w-16 h-16 mx-auto mb-4 rounded-full flex items-center justify-center text-2xl bg-(--secondary) text-white">
                🛡️
              </div>
              <h3 className="text-xl font-bold mb-2 text-(--heading)">
                Secure Payments
              </h3>
              <p className="text-(--text)">
                Your security is our priority. We use encrypted payment gateways
                for safe transactions.
              </p>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

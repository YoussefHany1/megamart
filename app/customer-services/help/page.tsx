import SearchIcon from "@mui/icons-material/Search";

export const metadata = {
  title: "Help Center | MegaMart",
  description:
    "Get help with your orders, returns, and account settings at MegaMart Help Center.",
};

export default function HelpPage() {
  return (
    <div className="min-h-screen py-12">
      {/* Hero & Search Section */}
      <div className="container mx-auto px-4 mb-16 text-center">
        <h1 className="text-3xl md:text-5xl font-bold mb-6 text-primary">
          How can we help you?
        </h1>

        {/* Search Bar Visual */}
        <div className="max-w-2xl mx-auto relative">
          <input
            type="text"
            placeholder="Search for answers (e.g., track order, return policy)..."
            className="w-full py-4 px-6 rounded-full border border-border shadow-sm text-heading bg-background2 outline-primary"
          />
          <button
            className="absolute right-3 top-1/2 -translate-y-1/2 p-3 rounded-full text-white transition hover:opacity-90 bg-primary"
            aria-label="Search"
          >
            <SearchIcon />
          </button>
        </div>
      </div>

      <div className="container mx-auto px-4 max-w-6xl">
        {/* Quick Topics Grid */}
        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-4 gap-6 mb-16">
          {/* Topic 1 */}
          <div className="p-6 rounded-2xl text-center border transition hover:shadow-md cursor-pointer bg-white border-border">
            <div className="w-14 h-14 mx-auto mb-4 rounded-full flex items-center justify-center text-2xl bg-background3">
              🚚
            </div>
            <h3 className="font-bold mb-2 text-primary">Track Order</h3>
            <p className="text-sm text-text">Check shipping status</p>
          </div>

          {/* Topic 2 */}
          <div className="p-6 rounded-2xl text-center border transition hover:shadow-md cursor-pointer bg-white border-border">
            <div className="w-14 h-14 mx-auto mb-4 rounded-full flex items-center justify-center text-2xl bg-background3">
              📦
            </div>
            <h3 className="font-bold mb-2 text-primary">Return & Refund</h3>
            <p className="text-sm text-text">Manage your returns</p>
          </div>

          {/* Topic 3 */}
          <div className="p-6 rounded-2xl text-center border transition hover:shadow-md cursor-pointer bg-white border-border">
            <div className="w-14 h-14 mx-auto mb-4 rounded-full flex items-center justify-center text-2xl bg-background3">
              👤
            </div>
            <h3 className="font-bold mb-2 text-primary">Account Settings</h3>
            <p className="text-sm text-text">Update details & password</p>
          </div>

          {/* Topic 4 */}
          <div className="p-6 rounded-2xl text-center border transition hover:shadow-md cursor-pointer bg-white border-border">
            <div className="w-14 h-14 mx-auto mb-4 rounded-full flex items-center justify-center text-2xl bg-background3">
              💳
            </div>
            <h3 className="font-bold mb-2 text-primary">Payment Issues</h3>
            <p className="text-sm text-text">Payment methods & failues</p>
          </div>
        </div>

        {/* Contact Support Section */}
        <div className="bg-background1 rounded-3xl p-8 md:p-12 text-center">
          <h2 className="text-2xl md:text-3xl font-bold mb-4 text-heading">
            Still need help?
          </h2>
          <p className="mb-10 text-lg text-text">
            Our support team is available 24/7 to assist you.
          </p>

          <div className="grid md:grid-cols-3 gap-6 max-w-4xl mx-auto">
            {/* Contact Option 1 */}
            <div className="bg-white p-6 rounded-xl shadow-sm">
              <h3 className="font-bold text-lg mb-2 text-heading">
                💬 Live Chat
              </h3>
              <p className="text-sm mb-4 text-secondary">
                Chat with our virtual assistant or agent.
              </p>
              <button className="font-semibold px-6 py-2 rounded-full border transition hover:bg-gray-50 text-primary border-primary">
                Start Chat
              </button>
            </div>

            {/* Contact Option 2 */}
            <div className="bg-white p-6 rounded-xl shadow-sm">
              <h3 className="font-bold text-lg mb-2 text-heading">
                📧 Email Us
              </h3>
              <p className="text-sm mb-4 text-secondary">
                Get a response within 24 hours.
              </p>
              <a
                href="mailto:support@megamart.com"
                className="font-semibold px-6 py-2 rounded-full border transition hover:bg-gray-50 inline-block text-primary border-primary"
              >
                Send Email
              </a>
            </div>

            {/* Contact Option 3 */}
            <div className="bg-white p-6 rounded-xl shadow-sm">
              <h3 className="font-bold text-lg mb-2 text-heading">
                📞 Call Us
              </h3>
              <p className="text-sm mb-4 text-secondary">
                Available 9 AM - 6 PM.
              </p>
              <a
                href="tel:+1234567890"
                className="font-semibold px-6 py-2 rounded-full border transition hover:bg-gray-50 inline-block text-primary border-primary"
              >
                1800-123-456
              </a>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

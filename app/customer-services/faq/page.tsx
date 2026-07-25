import ExpandMoreIcon from "@mui/icons-material/ExpandMore";

export const metadata = {
  title: "FAQ | MegaMart",
  description:
    "Frequently Asked Questions about shipping, returns, and ordering at MegaMart.",
};

export default function FAQPage() {
  // بيانات الأسئلة والأجوبة مقسمة لمجموعات
  const faqs = [
    {
      category: "Shopping & Ordering",
      items: [
        {
          q: "How do I place an order?",
          a: "Simply browse our products, add items to your cart, and proceed to checkout. You'll need to provide your shipping address and payment details to complete the purchase.",
        },
        {
          q: "Do I need an account to shop?",
          a: "No, you can shop as a guest. However, creating an account allows you to track orders, save wishlists, and checkout faster next time.",
        },
        {
          q: "Can I change my order after placing it?",
          a: "We process orders very quickly. If you need to make changes, please contact our customer support within 30 minutes of placing your order.",
        },
      ],
    },
    {
      category: "Payments & Delivery",
      items: [
        {
          q: "What payment methods do you accept?",
          a: "We accept all major credit/debit cards (Visa, MasterCard), PayPal, and Cash on Delivery (COD) for select locations.",
        },
        {
          q: "How long does delivery take?",
          a: "Standard delivery takes 3-5 business days. Express delivery (available in select cities) takes 1-2 business days.",
        },
        {
          q: "Is there a delivery fee?",
          a: "Delivery is free for orders above $50. For orders below that, a small shipping fee is calculated at checkout based on your location.",
        },
      ],
    },
    {
      category: "Returns & Account",
      items: [
        {
          q: "What is your return policy?",
          a: "You can return products within 14 days of delivery if they are unused and in original packaging. Please visit our Return Policy page for more details.",
        },
        {
          q: "I forgot my password, what do I do?",
          a: "Click on 'Sign In' and then 'Forgot Password'. Enter your email address, and we will send you a link to reset your password.",
        },
      ],
    },
  ];

  return (
    <div className="min-h-screen py-12">
      {/* Header Section */}
      <div className="container mx-auto px-4 mb-12 text-center">
        <h1 className="text-3xl md:text-4xl font-bold mb-4 text-primary">
          Frequently Asked Questions (FAQ)
        </h1>
        <p className="text-lg max-w-2xl mx-auto text-text">
          Have questions? We're here to help. Find answers to the most common
          questions below.
        </p>
      </div>

      <div className="container mx-auto px-4 max-w-4xl">
        {faqs.map((section, index) => (
          <div key={index} className="mb-10">
            {/* Category Title */}
            <h2 className="text-xl font-bold mb-6 pb-2 border-b text-primary border-border">
              {section.category}
            </h2>

            {/* Questions List */}
            <div className="space-y-4">
              {section.items.map((item, i) => (
                <details
                  key={i}
                  className="group bg-white rounded-xl border shadow-sm border-border transition-shadow duration-300 hover:shadow-md"
                >
                  <summary className="flex cursor-pointer items-center justify-between p-6 list-none">
                    <span className="font-semibold text-lg text-heading">
                      {item.q}
                    </span>
                    <span className="transition group-open:rotate-180 text-primary">
                      <ExpandMoreIcon />
                    </span>
                  </summary>

                  <div className="px-6 pb-6 pt-0 leading-relaxed text-secondary">
                    {item.a}
                  </div>
                </details>
              ))}
            </div>
          </div>
        ))}

        {/* Contact Support Box */}
        <div className="mt-16 p-8 rounded-2xl text-center bg-background3">
          <h3 className="text-2xl font-bold mb-3 text-heading">
            Still have questions?
          </h3>
          <p className="mb-6 text-text">
            Can't find the answer you're looking for? Please chat to our
            friendly team.
          </p>
          <a
            href="mailto:support@megamart.com"
            className="inline-block px-8 py-3 rounded-full font-semibold text-white transition-opacity hover:opacity-90 bg-primary"
          >
            Contact Support
          </a>
        </div>
      </div>
    </div>
  );
}

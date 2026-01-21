export const metadata = {
  title: "E-waste Policy | MegaMart",
  description:
    "Learn about MegaMart's commitment to responsible electronic waste disposal and recycling.",
};

export default function EWastePage() {
  return (
    <div className="min-h-screen py-12">
      {/* Header Section */}
      <div className="container mx-auto px-4 mb-12 text-center">
        <h1 className="text-3xl md:text-4xl font-bold mb-4 text-(--primary)">
          E-waste Management Policy
        </h1>
        <p className="text-lg max-w-2xl mx-auto text-(--text)">
          At MegaMart, we are committed to a cleaner, greener planet. We
          encourage our customers to responsibly dispose of electronic waste.
        </p>
      </div>

      <div className="container mx-auto px-4 max-w-4xl">
        {/* Content Wrapper */}
        <div className="bg-white rounded-2xl p-6 md:p-10 shadow-sm border border-(--border)">
          {/* Section 1: Our Commitment */}
          <div className="mb-10">
            <div className="flex items-center gap-3 mb-4">
              <span className="text-3xl">🌱</span>
              <h2 className="text-2xl font-bold text-(--primary)">
                Our Commitment
              </h2>
            </div>
            <p className="leading-relaxed mb-4 text-(--secondary)">
              Electronic waste (e-waste) refers to discarded electrical or
              electronic devices. Improper disposal of these items can cause
              severe damage to the environment due to hazardous materials like
              lead and mercury.
            </p>
            <p className="leading-relaxed text-(--secondary)">
              MegaMart complies with E-waste (Management) Rules to ensure that
              end-of-life electronics are channelized to authorized recyclers
              for safe disposal.
            </p>
          </div>

          {/* Section 2: How to Recycle */}
          <div className="mb-10">
            <h2 className="text-2xl font-bold mb-6 text-(--primary)">
              How to Recycle with Us
            </h2>
            <div className="grid md:grid-cols-2 gap-6">
              {/* Option 1 */}
              <div className="p-6 rounded-xl border border-dashed border-(--primary) bg-(--background3)">
                <h3 className="text-xl font-bold mb-2 text-(--primary)">
                  📍 Drop-off Points
                </h3>
                <p className="text-sm leading-relaxed text-(--text)">
                  You can drop off your old electronics (phones, tablets,
                  accessories) at any of our designated collection centers or
                  partner retail stores.
                </p>
              </div>

              {/* Option 2 */}
              <div className="p-6 rounded-xl border border-dashed border-(--primary) bg-(--background3)">
                <h3 className="text-xl font-bold mb-2 text-(--primary)">
                  🚚 Doorstep Pickup
                </h3>
                <p className="text-sm leading-relaxed text-(--text)">
                  For large appliances (TVs, Fridges), call our support team to
                  schedule a free pickup. We will ensure it reaches an
                  authorized recycler.
                </p>
              </div>
            </div>
          </div>

          {/* Section 3: Dos and Don'ts */}
          <div className="mb-8">
            <h2 className="text-2xl font-bold mb-6 text-(--primary)">
              Dos and Don'ts
            </h2>

            <div className="grid md:grid-cols-2 gap-8">
              {/* Dos */}
              <div>
                <h3 className="font-bold mb-4 flex items-center gap-2 text-green-600">
                  <span>✅</span> Dos
                </h3>
                <ul className="space-y-3 text-sm text-(--secondary)">
                  <li className="flex gap-2">
                    <span>•</span> Always look for information on the catalogue
                    for handling end-of-life equipment.
                  </li>
                  <li className="flex gap-2">
                    <span>•</span> Ensure that only authorized recyclers repair
                    and handle your electronic products.
                  </li>
                  <li className="flex gap-2">
                    <span>•</span> Always call our toll-free number to dispose
                    of products that have reached the end of their life.
                  </li>
                </ul>
              </div>

              {/* Don'ts */}
              <div>
                <h3 className="font-bold mb-4 flex items-center gap-2 text-red-500">
                  <span>❌</span> Don'ts
                </h3>
                <ul className="space-y-3 text-sm text-(--secondary)">
                  <li className="flex gap-2">
                    <span>•</span> Do not dismantle your electronic products on
                    your own.
                  </li>
                  <li className="flex gap-2">
                    <span>•</span> Do not throw electronics in bins having "Do
                    not Dispose" signs (crossed-out bin symbol).
                  </li>
                  <li className="flex gap-2">
                    <span>•</span> Do not give e-waste to informal and
                    unorganized sectors like local scrap dealers.
                  </li>
                </ul>
              </div>
            </div>
          </div>

          {/* Contact Section */}
          <div className="mt-8 pt-8 border-t text-center border-(--line)">
            <p className="mb-2 text-(--heading)">
              For E-waste related queries, please contact us:
            </p>
            <p className="font-bold text-lg text-(--primary)">010-123-456-78</p>
          </div>
        </div>
      </div>
    </div>
  );
}

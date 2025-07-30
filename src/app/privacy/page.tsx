export default function PrivacyPage() {
  return (
    <div className="min-h-screen bg-[#181818] text-white">
      {/* Header */}
      <div className="container mx-auto px-[4vw] sm:pt-[10vh] pt-[12vh]">
        <div className="max-w-4xl mx-auto">
          <h1 className="text-4xl md:text-5xl font-bold mb-8">
            <span className="text-paletteRed">Privacy</span> Policy
          </h1>
          <p className="text-lg text-gray-300 mb-12">
            Last updated:{" "}
            {new Date().toLocaleDateString("en-US", {
              year: "numeric",
              month: "long",
              day: "numeric",
            })}
          </p>
        </div>
      </div>

      {/* Content */}
      <div className="container mx-auto px-[4vw] pb-16">
        <div className="max-w-4xl mx-auto space-y-8">
          <section>
            <h2 className="text-2xl font-bold text-paletteGold mb-4">
              Introduction
            </h2>
            <p className="text-gray-300 leading-relaxed">
              This Privacy Policy describes how franklynam.com
              (&ldquo;we&rdquo;, &ldquo;us&rdquo;, or &ldquo;our&rdquo;)
              collects, uses, and protects your information when you visit our
              website.
            </p>
          </section>

          <section>
            <h2 className="text-2xl font-bold text-paletteGold mb-4">
              Information We Collect
            </h2>
            <div className="space-y-4">
              <div>
                <h3 className="text-lg font-semibold text-white mb-2">
                  Cookies and Analytics
                </h3>
                <p className="text-gray-300 leading-relaxed">
                  We use Google Analytics to understand how visitors interact
                  with our website. This service uses cookies to collect
                  information such as:
                </p>
                <ul className="list-disc list-inside text-gray-300 mt-2 space-y-1">
                  <li>Pages visited and time spent on each page</li>
                  <li>Browser type and device information</li>
                  <li>Geographic location (country/region level)</li>
                  <li>Referral sources</li>
                </ul>
              </div>

              <div>
                <h3 className="text-lg font-semibold text-white mb-2">
                  Contact Form
                </h3>
                <p className="text-gray-300 leading-relaxed">
                  When you use our contact form, we collect the information you
                  provide, including your name, email address, and message
                  content.
                </p>
              </div>
            </div>
          </section>

          <section>
            <h2 className="text-2xl font-bold text-paletteGold mb-4">
              How We Use Your Information
            </h2>
            <p className="text-gray-300 leading-relaxed mb-4">
              We use the collected information for the following purposes:
            </p>
            <ul className="list-disc list-inside text-gray-300 space-y-1">
              <li>To analyze website usage and improve user experience</li>
              <li>To respond to your inquiries and provide customer support</li>
              <li>To maintain and improve our website functionality</li>
              <li>To comply with legal obligations</li>
            </ul>
          </section>

          <section>
            <h2 className="text-2xl font-bold text-paletteGold mb-4">
              Third-Party Services
            </h2>
            <div className="space-y-4">
              <div>
                <h3 className="text-lg font-semibold text-white mb-2">
                  Google Analytics
                </h3>
                <p className="text-gray-300 leading-relaxed">
                  We use Google Analytics to analyze website traffic. Google
                  Analytics uses cookies and may collect information about your
                  use of our website. You can opt out of Google Analytics by
                  installing the Google Analytics Opt-out Browser Add-on.
                </p>
              </div>

              <div>
                <h3 className="text-lg font-semibold text-white mb-2">
                  AWS Amplify
                </h3>
                <p className="text-gray-300 leading-relaxed">
                  Our website is hosted on AWS Amplify, a service provided by
                  Amazon Web Services (AWS). AWS may collect certain technical
                  information for hosting and performance purposes.
                </p>
              </div>
            </div>
          </section>

          <section>
            <h2 className="text-2xl font-bold text-paletteGold mb-4">
              Your Rights
            </h2>
            <p className="text-gray-300 leading-relaxed mb-4">
              You have the right to:
            </p>
            <ul className="list-disc list-inside text-gray-300 space-y-1">
              <li>Access the personal information we hold about you</li>
              <li>Request correction of inaccurate information</li>
              <li>Request deletion of your personal information</li>
              <li>Withdraw consent for data processing</li>
              <li>Opt out of analytics tracking</li>
            </ul>
          </section>

          <section>
            <h2 className="text-2xl font-bold text-paletteGold mb-4">
              Data Security
            </h2>
            <p className="text-gray-300 leading-relaxed">
              We implement appropriate security measures to protect your
              personal information against unauthorized access, alteration,
              disclosure, or destruction.
            </p>
          </section>

          <section>
            <h2 className="text-2xl font-bold text-paletteGold mb-4">
              Changes to This Policy
            </h2>
            <p className="text-gray-300 leading-relaxed">
              We may update this Privacy Policy from time to time. We will
              notify you of any changes by posting the new Privacy Policy on
              this page and updating the &ldquo;Last updated&rdquo; date.
            </p>
          </section>

          <section>
            <h2 className="text-2xl font-bold text-paletteGold mb-4">
              Contact Us
            </h2>
            <p className="text-gray-300 leading-relaxed">
              If you have any questions about this Privacy Policy, please
              contact us through our contact form.
            </p>
          </section>
        </div>
      </div>
    </div>
  );
}

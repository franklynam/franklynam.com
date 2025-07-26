interface ImageCredit {
  filename: string;
  description: string;
  source: string;
  attribution?: string;
  license?: string;
}

export default function LegalPage() {
  const imageCredits: ImageCredit[] = [
    {
      filename: "compass.jpg",
      description: "Compass, Hand, Travel image.",
      source: "Pixabay",
      attribution: `Image by <a href="https://pixabay.com/users/dima_goroziya-3562044/?utm_source=link-attribution&utm_medium=referral&utm_campaign=image&utm_content=1753659" target="_blank">dima_goroziya</a> from <a href="https://pixabay.com//?utm_source=link-attribution&utm_medium=referral&utm_campaign=image&utm_content=1753659" target="_blank">Pixabay</a>`,
      license: "Pixabay License",
    },
    {
      filename: "code-screen.jpg",
      description: "Code editor screenshot",
      source: "Pixabay",
      attribution: `Free for use under the <a href="https://pixabay.com/service/license/" target="_blank">Pixabay Content License</a>`,
    },
    {
      filename: "architecture.jpg",
      description: "Spiral Staircase",
      source: "Pixabay",
      attribution: `Image by <a href="https://pixabay.com/users/jstolp-9168377/?utm_source=link-attribution&utm_medium=referral&utm_campaign=image&utm_content=7844381" target="_blank">Jo Stolp</a> from <a href="https://pixabay.com//?utm_source=link-attribution&utm_medium=referral&utm_campaign=image&utm_content=7844381" target="_blank">Pixabay</a>`,
    },
  ];

  return (
    <div className="min-h-screen bg-[#181818] text-white">
      <div className="container mx-auto px-[4vw] sm:py-[10vh] py-[12vh]">
        <div className="max-w-4xl mx-auto">
          <h1 className="text-4xl md:text-5xl font-bold mb-8">
            Legal <span className="text-paletteRed">Information</span>
          </h1>
          <p className="text-lg text-gray-300 mb-12 max-w-none">
            This page contains legal information, image credits, and
            attributions for this website.
          </p>

          <div className="space-y-8">
            {imageCredits.map((credit, index) => (
              <div key={index} className="border-b border-gray-700 pb-6">
                <div className="grid md:grid-cols-3 gap-4">
                  <div>
                    <h3 className="text-lg font-semibold text-paletteRed mb-2">
                      {credit.filename}
                    </h3>
                    <p className="text-gray-400 text-sm">
                      {credit.description}
                    </p>
                  </div>
                  <div>
                    <p className="text-white font-medium">Source</p>
                    <p className="text-gray-300">{credit.source}</p>
                  </div>
                  <div>
                    <p className="text-white font-medium">Attribution</p>
                    <p
                      className="text-gray-300"
                      dangerouslySetInnerHTML={{
                        __html: credit.attribution || "",
                      }}
                    />
                    {credit.license && (
                      <p className="text-gray-400 text-sm mt-1">
                        License: {credit.license}
                      </p>
                    )}
                  </div>
                </div>
              </div>
            ))}
          </div>

          <div className="mt-12 pt-8">
            <p className="text-gray-400 text-sm mb-6 max-w-none">
              All images are used in accordance with their respective licences.
              If you believe any attribution is incorrect or missing, please
              contact us.
            </p>
            <p className="text-gray-400 text-sm mb-6 max-w-none">
              This website is operated by Frank Lynam. For any legal inquiries,
              please use the contact form on this website.
            </p>
          </div>
        </div>
      </div>
    </div>
  );
}

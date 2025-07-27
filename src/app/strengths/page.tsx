import Image from "next/image";
import Link from "next/link";

interface StrengthSection {
  id: string;
  title: string;
  description: string;
  image: string;
  alt: string;
  details: string[];
  examples: string[];
}

export default function StrengthsPage() {
  const strengths: StrengthSection[] = [
    {
      id: "leadership",
      title: "Leadership",
      description: "I lead teams with empathy, clarity, and a focus on growth.",
      image: "/compass.jpg",
      alt: "Map",
      details: [
        "Building and mentoring high-performing engineering teams",
        "Creating inclusive environments where everyone can thrive",
        "Setting clear vision and strategy while empowering execution",
        "Balancing technical excellence with business objectives",
        "Fostering a culture of continuous learning and improvement",
      ],
      examples: [
        "Spearheaded a major engineering growth spurt that saw headcount increase by 300% in 2 years",
        "Chaired a company board during a management buyout",
      ],
    },
    {
      id: "hands-on",
      title: "Hands-on",
      description: "I enjoy getting stuck in and writing code.",
      image: "/code-screen.jpg",
      alt: "Code",
      details: [
        "Writing production code alongside the team",
        "Debugging complex technical issues",
        "Code reviews and pair programming",
        "Architecture design and implementation",
        "Staying current with latest technologies and best practises",
      ],
      examples: [
        "Regularly contribute to critical path features and bug fixes",
        "Lead by example through active participation in code reviews",
        "Maintain personal projects to stay sharp with new technologies",
        "Jump into production issues to help resolve them quickly",
      ],
    },
    {
      id: "system-design",
      title: "System Design",
      description:
        "I architect systems that balance performance and reliability.",
      image: "/architecture.jpg",
      alt: "Architecture",
      details: [
        "Designing scalable, distributed systems",
        "Performance optimization and capacity planning",
        "Security by design",
        "Cloud-native design",
        "Database design and data modelling",
        "API design and integration patterns",
      ],
      examples: [
        "Architected an enterprise membership system designed to handle 1M+ users",
        "Designed git branching strategy to manage a major platform upgrade",
        "Designed and implemented framework upgrades including Node 16 to 18 and AWS SDK 2 to 3",
      ],
    },
  ];

  return (
    <div className="min-h-screen bg-[#181818] text-white">
      {/* Header */}
      <div className="container mx-auto px-[4vw] sm:pt-[10vh] pt-[12vh]">
        <div className="max-w-6xl mx-auto">
          <h1 className="text-4xl md:text-5xl font-bold mb-8">
            My <span className="text-paletteRed">Strengths</span>
          </h1>
          <p className="text-lg text-gray-300 mb-12 max-w-none">
            I have worked on a lot of projects over the years. In that time, I
            have had successes and some failures and as the old adage goes
            it&apos;s from the latter that you learn the most about yourself.
            After nearly 30 years in the industry, I have come to group these
            learnings into three broad categories.
          </p>
        </div>
      </div>

      {/* Strengths Sections */}
      <div className="container mx-auto px-[4vw] pb-16">
        <div className="max-w-6xl mx-auto space-y-24">
          {strengths.map((strength, index) => (
            <section
              key={strength.id}
              id={strength.id}
              className="scroll-mt-20"
            >
              <div className="grid md:grid-cols-2 gap-12 items-center">
                {/* Content */}
                <div
                  className={`space-y-6 ${index % 2 === 1 ? "md:order-2" : ""}`}
                >
                  <h2 className="text-3xl md:text-4xl font-bold text-paletteGold">
                    {strength.title}
                  </h2>
                  <p className="text-xl text-gray-300">
                    {strength.description}
                  </p>

                  <div className="space-y-4">
                    <h3 className="text-lg font-semibold text-white">
                      My Approach:
                    </h3>
                    <ul className="space-y-2">
                      {strength.details.map((detail, idx) => (
                        <li key={idx} className="flex items-start">
                          <span className="text-paletteRed mr-2 mt-1">•</span>
                          <span className="text-gray-300">{detail}</span>
                        </li>
                      ))}
                    </ul>
                  </div>

                  <div className="space-y-4">
                    <h3 className="text-lg font-semibold text-white">
                      Examples:
                    </h3>
                    <ul className="space-y-2">
                      {strength.examples.map((example, idx) => (
                        <li key={idx} className="flex items-start">
                          <span className="text-paletteRed mr-2 mt-1">→</span>
                          <span className="text-gray-300">{example}</span>
                        </li>
                      ))}
                    </ul>
                  </div>
                </div>

                {/* Image */}
                <div
                  className={`relative ${index % 2 === 1 ? "md:order-1" : ""}`}
                >
                  <div className="aspect-[4/3] relative overflow-hidden">
                    <Image
                      src={strength.image}
                      alt={strength.alt}
                      fill
                      className="object-cover hover:scale-105 transition-transform duration-300"
                    />
                  </div>
                </div>
              </div>
            </section>
          ))}
        </div>
      </div>

      {/* CTA Section */}
      <div className="bg-gray-900 py-16">
        <div className="container mx-auto px-[4vw] text-center">
          <div className="max-w-2xl mx-auto">
            <h2 className="text-3xl md:text-4xl font-bold mb-6">
              Are you ready to work together?
            </h2>
            <p className="text-lg text-gray-300 mb-8 max-w-none">
              Let&apos;s discuss how these strengths can benefit your next
              project.
            </p>
            <div className="flex flex-row gap-4 justify-center">
              <Link
                href="/contact"
                className="main-button bg-paletteRed text-white text-sm md:text-base"
              >
                Get in Touch
              </Link>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

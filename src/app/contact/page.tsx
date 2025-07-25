import ContactForm from "@/components/ContactForm";

export default function ContactPage() {
  return (
    <div className="min-h-screen bg-[#181818] text-white">
      <div className="container mx-auto px-[4vw] sm:py-[10vh] py-[12vh]">
        <div className="max-w-2xl mx-auto">
          <h1 className="text-4xl md:text-5xl font-bold mb-8">
            Get in <span className="text-paletteRed">Touch</span>
          </h1>
          <p className="text-lg text-gray-300 mb-12">
            I&apos;d love to hear from you. Whether you have a question about my
            work, want to discuss a potential collaboration, or just want to say
            hello, feel free to reach out.
          </p>
          <ContactForm />
        </div>
      </div>
    </div>
  );
}

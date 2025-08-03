"use client";

import Script from "next/script";
import { useEffect, useState } from "react";

export default function ConditionalAnalytics() {
  const [hasConsented, setHasConsented] = useState(false);

  useEffect(() => {
    try {
      // Check if user has consented to cookies
      const consent = localStorage.getItem("cookieConsent");
      if (consent === "accepted") {
        setHasConsented(true);
      }

      // Listen for consent changes
      const handleStorageChange = () => {
        try {
          const newConsent = localStorage.getItem("cookieConsent");
          if (newConsent === "accepted") {
            setHasConsented(true);
          }
        } catch (error) {
          // Silently handle localStorage errors
          console.warn("Error accessing localStorage:", error);
        }
      };

      window.addEventListener("storage", handleStorageChange);

      // Custom event listener for consent changes within the same tab
      const handleConsentChange = () => {
        try {
          const consent = localStorage.getItem("cookieConsent");
          if (consent === "accepted") {
            setHasConsented(true);
          }
        } catch (error) {
          // Silently handle localStorage errors
          console.warn("Error accessing localStorage:", error);
        }
      };

      window.addEventListener("consentChanged", handleConsentChange);

      return () => {
        window.removeEventListener("storage", handleStorageChange);
        window.removeEventListener("consentChanged", handleConsentChange);
      };
    } catch (error) {
      // Silently handle localStorage errors
      console.warn("Error accessing localStorage:", error);
    }
  }, []);

  if (!hasConsented) {
    return null;
  }

  return (
    <>
      <Script
        src={`https://www.googletagmanager.com/gtag/js?id=G-KXG1K4CEVE`}
        strategy="afterInteractive"
      />
      <Script id="google-analytics" strategy="afterInteractive">
        {`
          window.dataLayer = window.dataLayer || [];
          function gtag(){dataLayer.push(arguments);}
          gtag('js', new Date());
          gtag('config', 'G-KXG1K4CEVE');
        `}
      </Script>
    </>
  );
}

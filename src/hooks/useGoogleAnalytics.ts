import { useEffect } from "react";
import { usePathname } from "next/navigation";

declare global {
  interface Window {
    gtag: (
      command: "config" | "event" | "js",
      targetId: string,
      config?: Record<string, unknown>
    ) => void;
  }
}

export const useGoogleAnalytics = () => {
  const pathname = usePathname();

  // Track page views
  useEffect(() => {
    if (pathname) {
      window.gtag("config", "G-KXG1K4CEVE", {
        page_path: pathname,
      });
    }
  }, [pathname]);

  // Custom event tracking
  const trackEvent = (
    action: string,
    category: string,
    label?: string,
    value?: number
  ) => {
    window.gtag("event", action, {
      event_category: category,
      event_label: label,
      value: value,
    });
  };

  // Track button clicks
  const trackButtonClick = (buttonName: string) => {
    trackEvent("click", "button", buttonName, undefined);
  };

  // Track form submissions
  const trackFormSubmission = (formName: string) => {
    trackEvent("submit", "form", formName, undefined);
  };

  // Track downloads
  const trackDownload = (fileName: string) => {
    trackEvent("download", "file", fileName, undefined);
  };

  return {
    trackEvent,
    trackButtonClick,
    trackFormSubmission,
    trackDownload,
  };
};

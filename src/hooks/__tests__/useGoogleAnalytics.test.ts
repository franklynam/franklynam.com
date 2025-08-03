import { act, renderHook } from "@testing-library/react";
import { useGoogleAnalytics } from "../useGoogleAnalytics";

// Mock Next.js navigation
jest.mock("next/navigation", () => ({
  usePathname: () => "/test-page",
}));

describe("useGoogleAnalytics", () => {
  beforeEach(() => {
    // Clear all mocks before each test
    jest.clearAllMocks();
    localStorage.clear();
    window.gtag = jest.fn();
  });

  describe("consent checking", () => {
    it("should not track when user has not consented", () => {
      (localStorage.getItem as jest.Mock).mockReturnValue(null);

      renderHook(() => useGoogleAnalytics());

      expect(window.gtag).not.toHaveBeenCalled();
    });

    it("should not track when user has declined consent", () => {
      (localStorage.getItem as jest.Mock).mockReturnValue("declined");

      renderHook(() => useGoogleAnalytics());

      expect(window.gtag).not.toHaveBeenCalled();
    });

    it("should track when user has accepted consent", () => {
      (localStorage.getItem as jest.Mock).mockReturnValue("accepted");

      renderHook(() => useGoogleAnalytics());

      expect(window.gtag).toHaveBeenCalledWith("config", "G-KXG1K4CEVE", {
        page_path: "/test-page",
      });
    });
  });

  describe("trackEvent", () => {
    it("should track events when consent is given", () => {
      (localStorage.getItem as jest.Mock).mockReturnValue("accepted");

      const { result } = renderHook(() => useGoogleAnalytics());

      act(() => {
        result.current.trackEvent(
          "test_action",
          "test_category",
          "test_label",
          100
        );
      });

      expect(window.gtag).toHaveBeenCalledWith("event", "test_action", {
        event_category: "test_category",
        event_label: "test_label",
        value: 100,
      });
    });

    it("should not track events when consent is not given", () => {
      (localStorage.getItem as jest.Mock).mockReturnValue("declined");

      const { result } = renderHook(() => useGoogleAnalytics());

      act(() => {
        result.current.trackEvent("test_action", "test_category");
      });

      expect(window.gtag).not.toHaveBeenCalled();
    });
  });

  describe("trackButtonClick", () => {
    it("should track button clicks when consent is given", () => {
      (localStorage.getItem as jest.Mock).mockReturnValue("accepted");

      const { result } = renderHook(() => useGoogleAnalytics());

      act(() => {
        result.current.trackButtonClick("test-button");
      });

      expect(window.gtag).toHaveBeenCalledWith("event", "click", {
        event_category: "button",
        event_label: "test-button",
        value: undefined,
      });
    });
  });

  describe("trackFormSubmission", () => {
    it("should track form submissions when consent is given", () => {
      (localStorage.getItem as jest.Mock).mockReturnValue("accepted");

      const { result } = renderHook(() => useGoogleAnalytics());

      act(() => {
        result.current.trackFormSubmission("contact-form");
      });

      expect(window.gtag).toHaveBeenCalledWith("event", "submit", {
        event_category: "form",
        event_label: "contact-form",
        value: undefined,
      });
    });
  });

  describe("trackDownload", () => {
    it("should track downloads when consent is given", () => {
      (localStorage.getItem as jest.Mock).mockReturnValue("accepted");

      const { result } = renderHook(() => useGoogleAnalytics());

      act(() => {
        result.current.trackDownload("resume.pdf");
      });

      expect(window.gtag).toHaveBeenCalledWith("event", "download", {
        event_category: "file",
        event_label: "resume.pdf",
        value: undefined,
      });
    });
  });

  describe("gtag function availability", () => {
    it("should not call gtag if function is not available", () => {
      (localStorage.getItem as jest.Mock).mockReturnValue("accepted");
      window.gtag = undefined as unknown as typeof window.gtag;

      const { result } = renderHook(() => useGoogleAnalytics());

      act(() => {
        result.current.trackEvent("test_action", "test_category");
      });

      // Should not throw error
      expect(result.current.trackEvent).toBeDefined();
    });
  });

  describe("server-side rendering", () => {
    it("should handle server-side rendering gracefully", () => {
      // Simulate server-side environment
      const originalWindow = global.window;
      global.window = undefined as unknown as typeof window;

      (localStorage.getItem as jest.Mock).mockReturnValue("accepted");

      const { result } = renderHook(() => useGoogleAnalytics());

      // Should not throw error
      expect(result.current.trackEvent).toBeDefined();

      // Restore window
      global.window = originalWindow;
    });
  });
});

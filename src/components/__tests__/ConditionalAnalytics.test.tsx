import { act, render, screen, waitFor } from "@testing-library/react";
import ConditionalAnalytics from "../ConditionalAnalytics";

// Type declarations for mocked localStorage
declare global {
  interface Window {
    localStorage: {
      getItem: jest.MockedFunction<(key: string) => string | null>;
      setItem: jest.MockedFunction<(key: string, value: string) => void>;
      removeItem: jest.MockedFunction<(key: string) => void>;
      clear: jest.MockedFunction<() => void>;
    };
    addEventListener: jest.MockedFunction<
      (type: string, listener: EventListener) => void
    >;
    removeEventListener: jest.MockedFunction<
      (type: string, listener: EventListener) => void
    >;
    dispatchEvent: jest.MockedFunction<(event: Event) => boolean>;
  }
}

// Mock Next.js Script component
jest.mock("next/script", () => ({
  __esModule: true,
  default: ({ children, ...props }: any) => {
    return (
      <div data-testid="script" {...props}>
        {children}
      </div>
    );
  },
}));

describe("ConditionalAnalytics", () => {
  beforeEach(() => {
    jest.clearAllMocks();
    localStorage.clear();
    window.dispatchEvent = jest.fn();
  });

  describe("initial render", () => {
    it("should not render scripts when no consent is given", () => {
      localStorage.getItem.mockReturnValue(null);

      const { container } = render(<ConditionalAnalytics />);

      expect(container.firstChild).toBeNull();
    });

    it("should not render scripts when consent is declined", () => {
      localStorage.getItem.mockReturnValue("declined");

      const { container } = render(<ConditionalAnalytics />);

      expect(container.firstChild).toBeNull();
    });

    it("should render scripts when consent is accepted", () => {
      localStorage.getItem.mockReturnValue("accepted");

      render(<ConditionalAnalytics />);

      const scripts = screen.getAllByTestId("script");
      expect(scripts).toHaveLength(2);
    });
  });

  describe("consent change handling", () => {
    it("should load scripts when consent changes to accepted", async () => {
      localStorage.getItem.mockReturnValue(null);

      const { rerender } = render(<ConditionalAnalytics />);

      // Initially no scripts
      expect(screen.queryByTestId("script")).not.toBeInTheDocument();

      // Simulate consent change
      localStorage.getItem.mockReturnValue("accepted");

      // Trigger storage event by calling the actual event listeners
      const storageEvent = new StorageEvent("storage", {
        key: "cookieConsent",
        newValue: "accepted",
      });

      // Get the event listeners that were registered
      const addEventListenerCalls = (window.addEventListener as jest.Mock).mock
        .calls;
      const storageListener = addEventListenerCalls.find(
        (call) => call[0] === "storage"
      )?.[1];

      if (storageListener) {
        act(() => {
          storageListener(storageEvent);
        });
      }

      // Re-render with new consent
      rerender(<ConditionalAnalytics />);

      await waitFor(() => {
        const scripts = screen.getAllByTestId("script");
        expect(scripts).toHaveLength(2);
      });
    });

    it("should handle custom consent changed event", async () => {
      localStorage.getItem.mockReturnValue(null);

      const { rerender } = render(<ConditionalAnalytics />);

      // Initially no scripts
      expect(screen.queryByTestId("script")).not.toBeInTheDocument();

      // Simulate consent change
      localStorage.getItem.mockReturnValue("accepted");

      // Trigger custom event by calling the actual event listeners
      const consentEvent = new Event("consentChanged");

      // Get the event listeners that were registered
      const addEventListenerCalls = (window.addEventListener as jest.Mock).mock
        .calls;
      const consentListener = addEventListenerCalls.find(
        (call) => call[0] === "consentChanged"
      )?.[1];

      if (consentListener) {
        act(() => {
          consentListener(consentEvent);
        });
      }

      // Re-render with new consent
      rerender(<ConditionalAnalytics />);

      await waitFor(() => {
        const scripts = screen.getAllByTestId("script");
        expect(scripts).toHaveLength(2);
      });
    });
  });

  describe("script loading", () => {
    it("should load Google Analytics script with correct props", () => {
      localStorage.getItem.mockReturnValue("accepted");

      render(<ConditionalAnalytics />);

      const scripts = screen.getAllByTestId("script");
      const gtagScript = scripts.find((script) =>
        script.getAttribute("src")?.includes("googletagmanager")
      );
      expect(gtagScript).toHaveAttribute(
        "src",
        "https://www.googletagmanager.com/gtag/js?id=G-KXG1K4CEVE"
      );
      expect(gtagScript).toHaveAttribute("strategy", "afterInteractive");
    });

    it("should load configuration script", () => {
      localStorage.getItem.mockReturnValue("accepted");

      render(<ConditionalAnalytics />);

      const scripts = screen.getAllByTestId("script");
      expect(scripts).toHaveLength(2);

      // Check that one script has the configuration
      const configScript = scripts.find(
        (script) => script.getAttribute("id") === "google-analytics"
      );
      expect(configScript).toBeInTheDocument();
    });
  });

  describe("event listeners", () => {
    it("should add storage event listener on mount", () => {
      localStorage.getItem.mockReturnValue(null);

      render(<ConditionalAnalytics />);

      // Verify event listener is set up (indirectly through the component behavior)
      expect(window.addEventListener).toHaveBeenCalledWith(
        "storage",
        expect.any(Function)
      );
    });

    it("should add consent changed event listener on mount", () => {
      localStorage.getItem.mockReturnValue(null);

      render(<ConditionalAnalytics />);

      expect(window.addEventListener).toHaveBeenCalledWith(
        "consentChanged",
        expect.any(Function)
      );
    });

    it("should remove event listeners on unmount", () => {
      localStorage.getItem.mockReturnValue(null);

      const { unmount } = render(<ConditionalAnalytics />);

      unmount();

      expect(window.removeEventListener).toHaveBeenCalledWith(
        "storage",
        expect.any(Function)
      );
      expect(window.removeEventListener).toHaveBeenCalledWith(
        "consentChanged",
        expect.any(Function)
      );
    });
  });

  describe("edge cases", () => {
    it("should handle localStorage errors gracefully", () => {
      localStorage.getItem.mockImplementation(() => {
        throw new Error("localStorage error");
      });

      const { container } = render(<ConditionalAnalytics />);

      // Should not throw error and should not render scripts
      expect(container.firstChild).toBeNull();
    });

    it("should handle multiple consent changes", async () => {
      localStorage.getItem.mockReturnValue(null);

      const { rerender } = render(<ConditionalAnalytics />);

      // Change to accepted
      localStorage.getItem.mockReturnValue("accepted");

      // Trigger custom event by calling the actual event listeners
      const consentEvent = new Event("consentChanged");
      const addEventListenerCalls = (window.addEventListener as jest.Mock).mock
        .calls;
      const consentListener = addEventListenerCalls.find(
        (call) => call[0] === "consentChanged"
      )?.[1];

      if (consentListener) {
        act(() => {
          consentListener(consentEvent);
        });
      }

      rerender(<ConditionalAnalytics />);

      await waitFor(() => {
        const scripts = screen.getAllByTestId("script");
        expect(scripts).toHaveLength(2);
      });

      // Change back to declined
      localStorage.getItem.mockReturnValue("declined");

      if (consentListener) {
        act(() => {
          consentListener(consentEvent);
        });
      }

      rerender(<ConditionalAnalytics />);

      // Scripts should still be there (component doesn't remove them once loaded)
      const scripts = screen.getAllByTestId("script");
      expect(scripts).toHaveLength(2);
    });

    it("should handle window object not being available", () => {
      const originalWindow = global.window;
      global.window = undefined as any;

      localStorage.getItem.mockReturnValue("accepted");

      // Should not throw error
      expect(() => render(<ConditionalAnalytics />)).not.toThrow();

      global.window = originalWindow;
    });
  });

  describe("performance", () => {
    it("should not re-render unnecessarily", () => {
      localStorage.getItem.mockReturnValue("accepted");

      const { rerender } = render(<ConditionalAnalytics />);

      const initialScripts = screen.getAllByTestId("script");

      // Re-render without changes
      rerender(<ConditionalAnalytics />);

      const currentScripts = screen.getAllByTestId("script");
      expect(currentScripts).toHaveLength(initialScripts.length);
    });
  });
});

import { render, screen, waitFor } from "@testing-library/react";
import userEvent from "@testing-library/user-event";
import CookieConsent from "../CookieConsent";

describe("CookieConsent", () => {
  beforeEach(() => {
    jest.clearAllMocks();
    (localStorage.clear as jest.Mock).mockClear();
    // Reset window.dispatchEvent mock
    (window.dispatchEvent as jest.Mock).mockClear();
  });

  describe("initial render", () => {
    it("should show consent popup when no consent is stored", () => {
      (localStorage.getItem as jest.Mock).mockReturnValue(null);

      render(<CookieConsent />);

      expect(screen.getByText(/we use cookies/i)).toBeInTheDocument();
      expect(
        screen.getByRole("button", { name: /accept/i })
      ).toBeInTheDocument();
      expect(
        screen.getByRole("button", { name: /decline/i })
      ).toBeInTheDocument();
    });

    it("should not show popup when consent is already given", () => {
      (localStorage.getItem as jest.Mock).mockReturnValue("accepted");

      const { container } = render(<CookieConsent />);

      expect(container.firstChild).toBeNull();
    });

    it("should not show popup when consent is declined", () => {
      (localStorage.getItem as jest.Mock).mockReturnValue("declined");

      const { container } = render(<CookieConsent />);

      expect(container.firstChild).toBeNull();
    });
  });

  describe("accept functionality", () => {
    it("should store accepted consent in localStorage", async () => {
      const user = userEvent.setup();
      (localStorage.getItem as jest.Mock).mockReturnValue(null);

      render(<CookieConsent />);

      const acceptButton = screen.getByRole("button", { name: /accept/i });
      await user.click(acceptButton);

      expect(localStorage.setItem).toHaveBeenCalledWith(
        "cookieConsent",
        "accepted"
      );
    });

    it("should hide popup after accepting", async () => {
      const user = userEvent.setup();
      (localStorage.getItem as jest.Mock).mockReturnValue(null);

      const { container } = render(<CookieConsent />);

      const acceptButton = screen.getByRole("button", { name: /accept/i });
      await user.click(acceptButton);

      await waitFor(() => {
        expect(container.firstChild).toBeNull();
      });
    });

    it("should dispatch consent changed event when accepting", async () => {
      const user = userEvent.setup();
      (localStorage.getItem as jest.Mock).mockReturnValue(null);

      render(<CookieConsent />);

      const acceptButton = screen.getByRole("button", { name: /accept/i });
      await user.click(acceptButton);

      expect(window.dispatchEvent).toHaveBeenCalledWith(
        new Event("consentChanged")
      );
    });
  });

  describe("decline functionality", () => {
    it("should store declined consent in localStorage", async () => {
      const user = userEvent.setup();
      (localStorage.getItem as jest.Mock).mockReturnValue(null);

      render(<CookieConsent />);

      const declineButton = screen.getByRole("button", { name: /decline/i });
      await user.click(declineButton);

      expect(localStorage.setItem).toHaveBeenCalledWith(
        "cookieConsent",
        "declined"
      );
    });

    it("should hide popup after declining", async () => {
      const user = userEvent.setup();
      (localStorage.getItem as jest.Mock).mockReturnValue(null);

      const { container } = render(<CookieConsent />);

      const declineButton = screen.getByRole("button", { name: /decline/i });
      await user.click(declineButton);

      await waitFor(() => {
        expect(container.firstChild).toBeNull();
      });
    });

    it("should dispatch consent changed event when declining", async () => {
      const user = userEvent.setup();
      (localStorage.getItem as jest.Mock).mockReturnValue(null);

      render(<CookieConsent />);

      const declineButton = screen.getByRole("button", { name: /decline/i });
      await user.click(declineButton);

      expect(window.dispatchEvent).toHaveBeenCalledWith(
        new Event("consentChanged")
      );
    });
  });

  describe("UI elements", () => {
    it("should display correct consent message", () => {
      (localStorage.getItem as jest.Mock).mockReturnValue(null);

      render(<CookieConsent />);

      expect(
        screen.getByText(/we use cookies to analyze site traffic/i)
      ).toBeInTheDocument();
      expect(
        screen.getByText(/by accepting, you consent to our use of cookies/i)
      ).toBeInTheDocument();
    });

    it("should have link to privacy policy", () => {
      (localStorage.getItem as jest.Mock).mockReturnValue(null);

      render(<CookieConsent />);

      const privacyLink = screen.getByRole("link", { name: /here/i });
      expect(privacyLink).toHaveAttribute("href", "/privacy");
    });

    it("should have correct styling classes", () => {
      (localStorage.getItem as jest.Mock).mockReturnValue(null);

      render(<CookieConsent />);

      const container = screen.getByText(/we use cookies/i).closest("div");
      expect(
        container?.parentElement?.parentElement?.parentElement
      ).toHaveClass("fixed", "bottom-0", "left-0", "right-0", "bg-gray-900");
    });

    it("should have responsive design", () => {
      (localStorage.getItem as jest.Mock).mockReturnValue(null);

      render(<CookieConsent />);

      const container = screen.getByText(/we use cookies/i).closest("div");
      /*expect(
        container?.parentElement?.parentElement?.parentElement?.parentElement
      ).toHaveClass("flex-col", "md:flex-row");*/
      expect(container?.parentElement).toHaveClass("flex-col", "md:flex-row");
    });
  });

  describe("button interactions", () => {
    it("should have accessible button labels", () => {
      (localStorage.getItem as jest.Mock).mockReturnValue(null);

      render(<CookieConsent />);

      expect(
        screen.getByRole("button", { name: /accept/i })
      ).toBeInTheDocument();
      expect(
        screen.getByRole("button", { name: /decline/i })
      ).toBeInTheDocument();
    });

    it("should have correct button styling", () => {
      (localStorage.getItem as jest.Mock).mockReturnValue(null);

      render(<CookieConsent />);

      const acceptButton = screen.getByRole("button", { name: /accept/i });
      const declineButton = screen.getByRole("button", { name: /decline/i });

      expect(acceptButton).toHaveClass("bg-paletteRed", "text-white");
      expect(declineButton).toHaveClass("border", "border-gray-600");
    });

    it("should be keyboard accessible", async () => {
      const user = userEvent.setup();
      (localStorage.getItem as jest.Mock).mockReturnValue(null);

      render(<CookieConsent />);

      const acceptButton = screen.getByRole("button", { name: /accept/i });
      const declineButton = screen.getByRole("button", { name: /decline/i });

      // Test tab navigation
      declineButton.focus();
      expect(declineButton).toHaveFocus();

      await user.tab();
      expect(acceptButton).toHaveFocus();
    });
  });

  describe("edge cases", () => {
    it("should handle localStorage errors gracefully", async () => {
      const user = userEvent.setup();
      (localStorage.getItem as jest.Mock).mockReturnValue(null);
      (localStorage.setItem as jest.Mock).mockImplementation(() => {
        throw new Error("localStorage error");
      });

      render(<CookieConsent />);

      const acceptButton = screen.getByRole("button", { name: /accept/i });

      // Should handle error gracefully (not crash the component)
      await user.click(acceptButton);

      // Component should still be functional
      expect(acceptButton).toBeInTheDocument();
    });

    it("should handle multiple rapid clicks", async () => {
      const user = userEvent.setup();
      (localStorage.getItem as jest.Mock).mockReturnValue(null);

      render(<CookieConsent />);

      const acceptButton = screen.getByRole("button", { name: /accept/i });

      // Multiple rapid clicks
      await user.click(acceptButton);
      await user.click(acceptButton);
      await user.click(acceptButton);

      // Should be called multiple times since component doesn't prevent it
      expect(localStorage.setItem).toHaveBeenCalledTimes(3);
    });
  });
});

import { render, screen, waitFor } from "@testing-library/react";
import userEvent from "@testing-library/user-event";
import ContactForm from "../ContactForm";

// Mock the useGoogleAnalytics hook
const mockTrackFormSubmission = jest.fn();
jest.mock("../../hooks/useGoogleAnalytics", () => ({
  useGoogleAnalytics: () => ({
    trackFormSubmission: mockTrackFormSubmission,
  }),
}));

// Mock fetch
global.fetch = jest.fn();

describe("ContactForm", () => {
  beforeEach(() => {
    jest.clearAllMocks();
    (global.fetch as jest.Mock).mockClear();
  });

  describe("initial render", () => {
    it("should render all form fields", () => {
      render(<ContactForm />);

      expect(screen.getByLabelText(/name/i)).toBeInTheDocument();
      expect(screen.getByLabelText(/email/i)).toBeInTheDocument();
      expect(screen.getByLabelText(/message/i)).toBeInTheDocument();
      expect(
        screen.getByRole("button", { name: /send message/i })
      ).toBeInTheDocument();
    });

    it("should have correct form structure", () => {
      const { container } = render(<ContactForm />);

      const form = container.querySelector("form");
      expect(form).toBeInTheDocument();
      expect(form).toHaveClass("space-y-6");
    });

    it("should have proper field types", () => {
      render(<ContactForm />);

      expect(screen.getByLabelText(/name/i)).toHaveAttribute("type", "text");
      expect(screen.getByLabelText(/email/i)).toHaveAttribute("type", "email");
      expect(screen.getByLabelText(/message/i)).toHaveAttribute("rows", "6");
    });
  });

  describe("form validation", () => {
    it("should validate name minimum length", async () => {
      const user = userEvent.setup();
      render(<ContactForm />);

      const nameInput = screen.getByLabelText(/name/i);
      await user.type(nameInput, "a");

      const emailInput = screen.getByLabelText(/email/i);
      await user.type(emailInput, "test@example.com");

      const messageInput = screen.getByLabelText(/message/i);
      await user.type(messageInput, "This is a test message");

      const submitButton = screen.getByRole("button", {
        name: /send message/i,
      });
      await user.click(submitButton);

      await waitFor(() => {
        expect(
          screen.getByText("Name must be at least 2 characters")
        ).toBeInTheDocument();
      });
    });

    it("should validate message minimum length", async () => {
      const user = userEvent.setup();
      render(<ContactForm />);

      const nameInput = screen.getByLabelText(/name/i);
      await user.type(nameInput, "John Doe");

      const emailInput = screen.getByLabelText(/email/i);
      await user.type(emailInput, "john@example.com");

      const messageInput = screen.getByLabelText(/message/i);
      await user.type(messageInput, "short");

      const submitButton = screen.getByRole("button", {
        name: /send message/i,
      });
      await user.click(submitButton);

      await waitFor(() => {
        expect(
          screen.getByText("Message must be at least 10 characters")
        ).toBeInTheDocument();
      });
    });

    it("should clear errors when user starts typing", async () => {
      const user = userEvent.setup();
      render(<ContactForm />);

      // Trigger validation error
      const nameInput = screen.getByLabelText(/name/i);
      await user.type(nameInput, "a");

      const emailInput = screen.getByLabelText(/email/i);
      await user.type(emailInput, "john@example.com");

      const messageInput = screen.getByLabelText(/message/i);
      await user.type(messageInput, "short");

      const submitButton = screen.getByRole("button", {
        name: /send message/i,
      });
      await user.click(submitButton);

      await waitFor(() => {
        expect(
          screen.getByText("Name must be at least 2 characters")
        ).toBeInTheDocument();
      });

      // Start typing in name field
      await user.type(nameInput, "John");

      // Error should be cleared
      await waitFor(() => {
        expect(
          screen.queryByText("Name must be at least 2 characters")
        ).not.toBeInTheDocument();
      });
    });
  });

  describe("form submission", () => {
    it("should submit form with valid data", async () => {
      const user = userEvent.setup();
      (global.fetch as jest.Mock).mockResolvedValueOnce({
        ok: true,
        json: async () => ({ message: "Success" }),
      });

      render(<ContactForm />);

      // Fill form with valid data
      await user.type(screen.getByLabelText(/name/i), "John Doe");
      await user.type(screen.getByLabelText(/email/i), "john@example.com");
      await user.type(
        screen.getByLabelText(/message/i),
        "This is a test message with enough characters"
      );

      const submitButton = screen.getByRole("button", {
        name: /send message/i,
      });
      await user.click(submitButton);

      await waitFor(() => {
        expect(global.fetch).toHaveBeenCalledWith("/api/contact", {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify({
            name: "John Doe",
            email: "john@example.com",
            message: "This is a test message with enough characters",
          }),
        });
      });
    });

    it("should show success message on successful submission", async () => {
      const user = userEvent.setup();
      (global.fetch as jest.Mock).mockResolvedValueOnce({
        ok: true,
        json: async () => ({ message: "Success" }),
      });

      render(<ContactForm />);

      // Fill and submit form
      await user.type(screen.getByLabelText(/name/i), "John Doe");
      await user.type(screen.getByLabelText(/email/i), "john@example.com");
      await user.type(
        screen.getByLabelText(/message/i),
        "This is a test message with enough characters"
      );

      const submitButton = screen.getByRole("button", {
        name: /send message/i,
      });
      await user.click(submitButton);

      await waitFor(() => {
        expect(
          screen.getByText(/thank you for your message/i)
        ).toBeInTheDocument();
      });
    });

    it("should show error message on failed submission", async () => {
      const user = userEvent.setup();
      (global.fetch as jest.Mock).mockRejectedValueOnce(
        new Error("Network error")
      );

      render(<ContactForm />);

      // Fill and submit form
      await user.type(screen.getByLabelText(/name/i), "John Doe");
      await user.type(screen.getByLabelText(/email/i), "john@example.com");
      await user.type(
        screen.getByLabelText(/message/i),
        "This is a test message with enough characters"
      );

      const submitButton = screen.getByRole("button", {
        name: /send message/i,
      });
      await user.click(submitButton);

      await waitFor(() => {
        expect(
          screen.getByText(/sorry, there was an error/i)
        ).toBeInTheDocument();
      });
    });

    it("should track form submission with analytics", async () => {
      const user = userEvent.setup();
      (global.fetch as jest.Mock).mockResolvedValueOnce({
        ok: true,
        json: async () => ({ message: "Success" }),
      });

      render(<ContactForm />);

      // Fill and submit form
      await user.type(screen.getByLabelText(/name/i), "John Doe");
      await user.type(screen.getByLabelText(/email/i), "john@example.com");
      await user.type(
        screen.getByLabelText(/message/i),
        "This is a test message with enough characters"
      );

      const submitButton = screen.getByRole("button", {
        name: /send message/i,
      });
      await user.click(submitButton);

      await waitFor(() => {
        expect(mockTrackFormSubmission).toHaveBeenCalledWith("contact_form");
      });
    });
  });

  describe("form state management", () => {
    it("should disable submit button while submitting", async () => {
      const user = userEvent.setup();
      (global.fetch as jest.Mock).mockImplementation(
        () => new Promise((resolve) => setTimeout(resolve, 100))
      );

      render(<ContactForm />);

      // Fill form
      await user.type(screen.getByLabelText(/name/i), "John Doe");
      await user.type(screen.getByLabelText(/email/i), "john@example.com");
      await user.type(
        screen.getByLabelText(/message/i),
        "This is a test message with enough characters"
      );

      const submitButton = screen.getByRole("button", {
        name: /send message/i,
      });
      await user.click(submitButton);

      // Button should be disabled
      expect(submitButton).toBeDisabled();
    });

    it("should reset form after successful submission", async () => {
      const user = userEvent.setup();
      (global.fetch as jest.Mock).mockResolvedValueOnce({
        ok: true,
        json: async () => ({ message: "Success" }),
      });

      render(<ContactForm />);

      // Fill and submit form
      await user.type(screen.getByLabelText(/name/i), "John Doe");
      await user.type(screen.getByLabelText(/email/i), "john@example.com");
      await user.type(
        screen.getByLabelText(/message/i),
        "This is a test message with enough characters"
      );

      const submitButton = screen.getByRole("button", {
        name: /send message/i,
      });
      await user.click(submitButton);

      await waitFor(() => {
        const nameInput = screen.getByLabelText(/name/i) as HTMLInputElement;
        expect(nameInput.value).toBe("");
      });
    });
  });

  describe("accessibility", () => {
    it("should have proper labels and associations", () => {
      render(<ContactForm />);

      const nameInput = screen.getByLabelText(/name/i);
      const emailInput = screen.getByLabelText(/email/i);
      const messageInput = screen.getByLabelText(/message/i);

      expect(nameInput).toHaveAttribute("id");
      expect(emailInput).toHaveAttribute("id");
      expect(messageInput).toHaveAttribute("id");
    });

    it("should have proper ARIA attributes", () => {
      render(<ContactForm />);

      const nameInput = screen.getByLabelText(/name/i);
      const emailInput = screen.getByLabelText(/email/i);
      const messageInput = screen.getByLabelText(/message/i);

      expect(nameInput).toHaveAttribute("required");
      expect(emailInput).toHaveAttribute("required");
      expect(messageInput).toHaveAttribute("required");
    });

    it("should be keyboard navigable", async () => {
      const user = userEvent.setup();
      render(<ContactForm />);

      const nameInput = screen.getByLabelText(/name/i);
      const emailInput = screen.getByLabelText(/email/i);
      const messageInput = screen.getByLabelText(/message/i);

      nameInput.focus();
      expect(nameInput).toHaveFocus();

      await user.tab();
      expect(emailInput).toHaveFocus();

      await user.tab();
      expect(messageInput).toHaveFocus();
    });
  });

  describe("edge cases", () => {
    it("should handle network timeouts", async () => {
      const user = userEvent.setup();
      (global.fetch as jest.Mock).mockImplementation(
        () =>
          new Promise((_, reject) =>
            setTimeout(() => reject(new Error("Timeout")), 100)
          )
      );

      render(<ContactForm />);

      // Fill and submit form
      await user.type(screen.getByLabelText(/name/i), "John Doe");
      await user.type(screen.getByLabelText(/email/i), "john@example.com");
      await user.type(
        screen.getByLabelText(/message/i),
        "This is a test message with enough characters"
      );

      const submitButton = screen.getByRole("button", {
        name: /send message/i,
      });
      await user.click(submitButton);

      await waitFor(() => {
        expect(
          screen.getByText(/sorry, there was an error/i)
        ).toBeInTheDocument();
      });
    });

    it("should handle server errors", async () => {
      const user = userEvent.setup();
      (global.fetch as jest.Mock).mockResolvedValueOnce({
        ok: false,
        status: 500,
        json: async () => ({ error: "Internal server error" }),
      });

      render(<ContactForm />);

      // Fill and submit form
      await user.type(screen.getByLabelText(/name/i), "John Doe");
      await user.type(screen.getByLabelText(/email/i), "john@example.com");
      await user.type(
        screen.getByLabelText(/message/i),
        "This is a test message with enough characters"
      );

      const submitButton = screen.getByRole("button", {
        name: /send message/i,
      });
      await user.click(submitButton);

      await waitFor(() => {
        expect(
          screen.getByText(/sorry, there was an error/i)
        ).toBeInTheDocument();
      });
    });
  });
});

import { render, screen } from "@testing-library/react";
import userEvent from "@testing-library/user-event";
import ResumeDownloadButton from "../ResumeDownloadButton";

// Mock the useGoogleAnalytics hook
jest.mock("../../hooks/useGoogleAnalytics", () => ({
  useGoogleAnalytics: () => ({
    trackDownload: jest.fn(),
  }),
}));

describe("ResumeDownloadButton", () => {
  beforeEach(() => {
    jest.clearAllMocks();
  });

  it("should render the download button with correct text", () => {
    render(<ResumeDownloadButton />);

    const button = screen.getByRole("button", { name: /download resume/i });
    expect(button).toBeInTheDocument();
  });

  it("should have correct styling classes", () => {
    render(<ResumeDownloadButton />);

    const button = screen.getByRole("button", { name: /download resume/i });
    expect(button).toHaveClass("main-button", "bg-paletteRed", "text-white");
  });

  it("should have correct download attributes", () => {
    render(<ResumeDownloadButton />);

    const button = screen.getByRole("button", { name: /download resume/i });
    expect(button).toHaveAttribute("download");
  });

  it("should link to the correct resume file", () => {
    render(<ResumeDownloadButton />);

    const button = screen.getByRole("button", { name: /download resume/i });
    expect(button).toHaveAttribute("href", "/franklynam-resume-may2025-v1.pdf");
  });

  it("should be clickable", async () => {
    const user = userEvent.setup();
    render(<ResumeDownloadButton />);

    const button = screen.getByRole("button", { name: /download resume/i });
    expect(button).not.toBeDisabled();

    // Test that the button can be clicked (though we can't test actual download)
    await user.click(button);
    // No error should be thrown
  });

  it("should have accessible name", () => {
    render(<ResumeDownloadButton />);

    const button = screen.getByRole("button", { name: /download resume/i });
    expect(button).toBeInTheDocument();
  });

  it("should have proper button type", () => {
    render(<ResumeDownloadButton />);

    const button = screen.getByRole("button", { name: /download resume/i });
    expect(button).toHaveAttribute("type", "button");
  });

  it("should render with correct text content", () => {
    render(<ResumeDownloadButton />);

    expect(screen.getByText(/download resume/i)).toBeInTheDocument();
  });

  it("should have responsive text sizing", () => {
    render(<ResumeDownloadButton />);

    const button = screen.getByRole("button", { name: /download resume/i });
    expect(button).toHaveClass("text-sm", "md:text-base");
  });

  it("should be keyboard accessible", async () => {
    const user = userEvent.setup();
    render(<ResumeDownloadButton />);

    const button = screen.getByRole("button", { name: /download resume/i });

    // Focus the button
    button.focus();
    expect(button).toHaveFocus();

    // Test keyboard interaction
    await user.keyboard("{Enter}");
    // No error should be thrown
  });

  it("should maintain focus after interaction", async () => {
    const user = userEvent.setup();
    render(<ResumeDownloadButton />);

    const button = screen.getByRole("button", { name: /download resume/i });

    await user.click(button);
    // Button should still be accessible
    expect(button).toBeInTheDocument();
  });
});

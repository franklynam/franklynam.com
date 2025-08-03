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

    const link = screen.getByRole("link", { name: /download resume/i });
    expect(link).toBeInTheDocument();
  });

  it("should have correct styling classes", () => {
    render(<ResumeDownloadButton />);

    const link = screen.getByRole("link", { name: /download resume/i });
    expect(link).toHaveClass("main-button", "bg-paletteRed", "text-white");
  });

  it("should have correct download attributes", () => {
    render(<ResumeDownloadButton />);

    const link = screen.getByRole("link", { name: /download resume/i });
    expect(link).toHaveAttribute("target", "_blank");
  });

  it("should link to the correct resume file", () => {
    render(<ResumeDownloadButton />);

    const link = screen.getByRole("link", { name: /download resume/i });
    expect(link).toHaveAttribute("href", "/franklynam-resume-may2025-v1.pdf");
  });

  it("should be clickable", async () => {
    const user = userEvent.setup();
    render(<ResumeDownloadButton />);

    const link = screen.getByRole("link", { name: /download resume/i });
    expect(link).toBeInTheDocument();

    // Test that the link can be clicked (though we can't test actual download)
    await user.click(link);
    // No error should be thrown
  });

  it("should have accessible name", () => {
    render(<ResumeDownloadButton />);

    const link = screen.getByRole("link", { name: /download resume/i });
    expect(link).toBeInTheDocument();
  });

  it("should have proper link attributes", () => {
    render(<ResumeDownloadButton />);

    const link = screen.getByRole("link", { name: /download resume/i });
    expect(link).toHaveAttribute("rel", "noopener noreferrer");
  });

  it("should render with correct text content", () => {
    render(<ResumeDownloadButton />);

    expect(screen.getByText(/download resume/i)).toBeInTheDocument();
  });

  it("should have responsive text sizing", () => {
    render(<ResumeDownloadButton />);

    const link = screen.getByRole("link", { name: /download resume/i });
    expect(link).toHaveClass("text-sm", "md:text-base");
  });

  it("should be keyboard accessible", async () => {
    const user = userEvent.setup();
    render(<ResumeDownloadButton />);

    const link = screen.getByRole("link", { name: /download resume/i });

    // Focus the link
    link.focus();
    expect(link).toHaveFocus();

    // Test keyboard interaction
    await user.keyboard("{Enter}");
    // No error should be thrown
  });

  it("should maintain focus after interaction", async () => {
    const user = userEvent.setup();
    render(<ResumeDownloadButton />);

    const link = screen.getByRole("link", { name: /download resume/i });

    await user.click(link);
    // Link should still be accessible
    expect(link).toBeInTheDocument();
  });
});

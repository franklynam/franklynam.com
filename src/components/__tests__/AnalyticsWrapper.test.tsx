import { render, screen } from "@testing-library/react";
import AnalyticsWrapper from "../AnalyticsWrapper";

// Mock the useGoogleAnalytics hook
jest.mock("../../hooks/useGoogleAnalytics", () => ({
  useGoogleAnalytics: jest.fn(),
}));

describe("AnalyticsWrapper", () => {
  beforeEach(() => {
    jest.clearAllMocks();
  });

  it("should render children correctly", () => {
    const testMessage = "Test child content";

    render(
      <AnalyticsWrapper>
        <div>{testMessage}</div>
      </AnalyticsWrapper>
    );

    expect(screen.getByText(testMessage)).toBeInTheDocument();
  });

  it("should render multiple children", () => {
    render(
      <AnalyticsWrapper>
        <div>Child 1</div>
        <div>Child 2</div>
        <div>Child 3</div>
      </AnalyticsWrapper>
    );

    expect(screen.getByText("Child 1")).toBeInTheDocument();
    expect(screen.getByText("Child 2")).toBeInTheDocument();
    expect(screen.getByText("Child 3")).toBeInTheDocument();
  });

  it("should render empty children", () => {
    const { container } = render(<AnalyticsWrapper>{}</AnalyticsWrapper>);

    expect(container.firstChild).toBeNull();
  });

  it("should render null children", () => {
    const { container } = render(<AnalyticsWrapper>{null}</AnalyticsWrapper>);

    expect(container.firstChild).toBeNull();
  });

  it("should render undefined children", () => {
    const { container } = render(
      <AnalyticsWrapper>{undefined}</AnalyticsWrapper>
    );

    expect(container.firstChild).toBeNull();
  });

  it("should render complex nested structure", () => {
    render(
      <AnalyticsWrapper>
        <header>
          <h1>Title</h1>
          <nav>
            <a href="/">Home</a>
            <a href="/about">About</a>
          </nav>
        </header>
        <main>
          <section>
            <h2>Content</h2>
            <p>Some content here</p>
          </section>
        </main>
      </AnalyticsWrapper>
    );

    expect(screen.getByText("Title")).toBeInTheDocument();
    expect(screen.getByText("Home")).toBeInTheDocument();
    expect(screen.getByText("About")).toBeInTheDocument();
    expect(screen.getByText("Content")).toBeInTheDocument();
    expect(screen.getByText("Some content here")).toBeInTheDocument();
  });
});

import "@testing-library/jest-dom";

// Mock Next.js router
jest.mock("next/navigation", () => ({
  useRouter() {
    return {
      back: jest.fn(),
      forward: jest.fn(),
      push: jest.fn(),
      replace: jest.fn(),
      refresh: jest.fn(),
    };
  },
  usePathname() {
    return "/";
  },
  useSearchParams() {
    return new URLSearchParams();
  },
}));

// Mock Next.js Image component
jest.mock("next/image", () => ({
  __esModule: true,
  default: (props) => {
    // eslint-disable-next-line @next/next/no-img-element
    return <img {...props} />;
  },
}));

// Mock Next.js Link component
jest.mock("next/link", () => ({
  __esModule: true,
  default: ({ children, href, ...props }) => {
    return (
      <a href={href} {...props}>
        {children}
      </a>
    );
  },
}));

// Mock NextRequest for API tests
global.NextRequest = class NextRequest {
  constructor(url, init) {
    this.url = url;
    this.method = init?.method || "GET";
    this.body = init?.body || null;
    this.headers = new Map(Object.entries(init?.headers || {}));
  }
};

// Mock localStorage
const localStorageMock = {
  getItem: jest.fn(),
  setItem: jest.fn(),
  removeItem: jest.fn(),
  clear: jest.fn(),
};
if (typeof window !== "undefined") {
  Object.defineProperty(window, "localStorage", {
    value: localStorageMock,
    writable: true,
  });

  // Mock window.gtag
  Object.defineProperty(window, "gtag", {
    value: jest.fn(),
    writable: true,
  });

  // Mock window.dispatchEvent
  Object.defineProperty(window, "dispatchEvent", {
    value: jest.fn(),
    writable: true,
  });

  // Mock window.addEventListener and removeEventListener
  Object.defineProperty(window, "addEventListener", {
    value: jest.fn(),
    writable: true,
  });

  Object.defineProperty(window, "removeEventListener", {
    value: jest.fn(),
    writable: true,
  });
}

// Mock ResizeObserver
global.ResizeObserver = jest.fn().mockImplementation(() => ({
  observe: jest.fn(),
  unobserve: jest.fn(),
  disconnect: jest.fn(),
}));

// Mock IntersectionObserver
global.IntersectionObserver = jest.fn().mockImplementation(() => ({
  observe: jest.fn(),
  unobserve: jest.fn(),
  disconnect: jest.fn(),
}));

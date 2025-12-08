import "@testing-library/jest-dom";

// Mock Next.js router
jest.mock("next/router", () => ({
  useRouter() {
    return {
      route: "/",
      pathname: "/",
      query: {},
      asPath: "/",
      push: jest.fn(),
      pop: jest.fn(),
      reload: jest.fn(),
      back: jest.fn(),
      prefetch: jest.fn().mockResolvedValue(undefined),
      beforePopState: jest.fn(),
      events: {
        on: jest.fn(),
        off: jest.fn(),
        emit: jest.fn(),
      },
      isFallback: false,
    };
  },
}));

// Mock react-oidc-context
jest.mock("react-oidc-context", () => ({
  useAuth: jest.fn(() => ({
    isLoading: false,
    error: null,
    isAuthenticated: true, // Assuming authenticated by default for tests
    signinRedirect: jest.fn(),
    signoutRedirect: jest.fn(),
    // Mock user object, can be extended as needed
    user: {
      profile: {
        sub: "mock-user-id",
        email: "test@example.com",
        name: "Test User",
      },
      access_token: "mock-access-token",
      id_token: "mock-id-token",
    },
  })),
}));

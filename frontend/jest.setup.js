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

// Mock AWS Amplify
jest.mock("aws-amplify", () => ({
  Amplify: {
    configure: jest.fn(),
  },
  Auth: {
    currentAuthenticatedUser: jest.fn(),
    signIn: jest.fn(),
    signOut: jest.fn(),
    signUp: jest.fn(),
    confirmSignUp: jest.fn(),
    forgotPassword: jest.fn(),
    forgotPasswordSubmit: jest.fn(),
  },
}));

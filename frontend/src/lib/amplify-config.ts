import { Amplify } from "aws-amplify";

const amplifyConfig = {
  Auth: {
    region: process.env.NEXT_PUBLIC_AWS_REGION || "us-east-1",
    userPoolId: process.env.NEXT_PUBLIC_COGNITO_USER_POOL_ID || "",
    userPoolWebClientId: process.env.NEXT_PUBLIC_COGNITO_CLIENT_ID || "",
    mandatorySignIn: true,
    cookieStorage: {
      domain: process.env.NEXT_PUBLIC_COOKIE_DOMAIN || "localhost",
      path: "/",
      expires: 365,
      secure: process.env.NODE_ENV === "production",
    },
  },
  API: {
    graphql_endpoint:
      process.env.NEXT_PUBLIC_GRAPHQL_URL || "http://localhost:4000/graphql",
    graphql_headers: async () => {
      try {
        const { Auth } = await import("aws-amplify");
        const session = await Auth.currentSession();
        const token = session.getAccessToken().getJwtToken();
        return {
          Authorization: token ? `Bearer ${token}` : "",
        };
      } catch (error) {
        return {};
      }
    },
  },
};

export const configureAmplify = () => {
  Amplify.configure(amplifyConfig);
};

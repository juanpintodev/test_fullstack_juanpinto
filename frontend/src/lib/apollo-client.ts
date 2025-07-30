import {
  ApolloClient,
  InMemoryCache,
  createHttpLink,
  from,
} from "@apollo/client";
import { setContext } from "@apollo/client/link/context";

const httpLink = createHttpLink({
  uri: process.env.NEXT_PUBLIC_GRAPHQL_URL || "http://localhost:4000/graphql",
});

const authLink = setContext(async (_, { headers }) => {
  // Solo ejecutar en el cliente
  if (typeof window !== "undefined") {
    try {
      const { auth } = await import("./firebase");
      const user = auth.currentUser;
      if (user) {
        const token = await user.getIdToken();
        return {
          headers: {
            ...headers,
            authorization: token ? `Bearer ${token}` : "",
          },
        };
      }
    } catch (error) {
      console.error("Error getting Firebase token:", error);
    }
  }

  return {
    headers: {
      ...headers,
    },
  };
});

export const client = new ApolloClient({
  link: from([authLink, httpLink]),
  cache: new InMemoryCache(),
  ssrMode: typeof window === "undefined",
});

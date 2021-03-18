import {
  ApolloClient,
  InMemoryCache,
  NormalizedCacheObject,
} from "@apollo/client";

const cache = new InMemoryCache();

const client: ApolloClient<NormalizedCacheObject> = new ApolloClient({
  cache,
  credentials: "include",
  uri: `${process.env.REACT_APP_API_URL}/graphql`,
});

export default client;

import { ApolloClient, InMemoryCache, createHttpLink } from '@apollo/client';
import { setContext } from '@apollo/client/link/context';
import AuthService from '../src/utils/auth';
import { onError } from "@apollo/client/link/error";


const httpLink = createHttpLink({
  uri: 'http://localhost:4000'
});

const authLink = setContext((_, { headers }) => {
  const token = AuthService.getToken();
  if (token) {
      return {
          headers: {
              ...headers,
              authorization: `Bearer ${token}`,
          },
      };
  }

  return { headers };
});

const errorLink = onError(({ graphQLErrors, networkError }) => {
  if (graphQLErrors) graphQLErrors.forEach(({ message, locations, path }) =>
    console.log(`[GraphQL error]: Message: ${message}, Location: ${locations}, Path: ${path}`),
  );
  if (networkError) console.log(`[Network error]: ${networkError}`);
});


const client = new ApolloClient({
  link: authLink.concat(httpLink),
  cache: new InMemoryCache(),
});

export default client;
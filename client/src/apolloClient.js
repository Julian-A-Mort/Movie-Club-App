import { ApolloClient, InMemoryCache, createHttpLink } from '@apollo/client';
import { setContext } from '@apollo/client/link/context';
import AuthService from './utils/auth';


const httpLink = createHttpLink({
  uri: 'http://localhost:4000/graphql',
});

const authLink = setContext((_, { headers }) => {
  if (AuthService.loggedIn()) {
    const token = AuthService.getToken(); // Use AuthService to get the token
    return {
      headers: {
        ...headers,
        Authorization: `Bearer ${token}`,
      }
    };
  } else {
    // Optional: Redirect to login or handle unauthenticated state
    console.log("Token is expired or not present. Redirecting to login.");
    // Redirect to login or perform other action. Be cautious with redirects here to avoid infinite loops.
  }
});

const client = new ApolloClient({
  link: authLink.concat(httpLink),
  cache: new InMemoryCache(),
});

export default client;
import { ApolloClient, InMemoryCache, createHttpLink } from '@apollo/client';
import { setContext } from '@apollo/client/link/context';
import AuthService from './utils/auth';


const httpLink = createHttpLink({
  uri: 'http://localhost:4000/graphql',
});

const authLink = setContext((_, { headers }) => {

    const token = AuthService.getToken(); // Use AuthService to get the token
    return {
      headers: {
        ...headers,
        Authorization: `Bearer ${token}`,
      }
    };

});

const client = new ApolloClient({
  link: authLink.concat(httpLink),
  cache: new InMemoryCache(),
});

export default client;
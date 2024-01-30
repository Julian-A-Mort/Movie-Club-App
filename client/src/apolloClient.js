import { ApolloClient, InMemoryCache, createHttpLink, ApolloLink } from '@apollo/client';

const httpLink = createHttpLink({
  uri: 'http://localhost:4000/graphql',
});

const authLink = new ApolloLink((operation, forward) => {
  const token = localStorage.getItem('jwtToken');
  operation.setContext({
    headers: {
      Authorization: token ? `Bearer ${token}` : '',
    }
  });
  return forward(operation);
});

const client = new ApolloClient({
  link: authLink.concat(httpLink),
  cache: new InMemoryCache(),
});

export default client;

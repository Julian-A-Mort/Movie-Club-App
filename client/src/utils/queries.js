import { gql, useQuery } from '@apollo/client';

const GET_MOVIES = gql`
  query GetMovies {
    movies {
      _id
      title
      description
      // ... other movie fields
    }
  }
`;

// Inside a React component
const { loading, error, data } = useQuery(GET_MOVIES);
if (loading) return 'Loading...';
if (error) return `Error! ${error.message}`;

return (
  <div>
    {data.movies.map(movie => (
      <div key={movie._id}>{movie.title}</div>
    ))}
  </div>
);

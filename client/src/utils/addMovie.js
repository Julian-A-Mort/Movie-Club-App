import client from './apolloClient'; 
import { ADD_MOVIE } from './mutations'; 

export const addMovie = async (movieData, onSuccess, onError) => {
    try {
      const { data } = await client.mutate({
        mutation: ADD_MOVIE,
        variables: { ...movieData }
      });
      if (onSuccess) onSuccess(data.addMovie);
    } catch (error) {
      if (onError) onError(error);
    }
};

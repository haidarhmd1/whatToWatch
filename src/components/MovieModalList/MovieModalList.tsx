import { useGetFavouriteMovies } from '../../hooks/useQueries';
import { Spinner } from '../general';
import { MovieItem } from '../MovieItem';

export const MovieModalList = () => {
  const { data, isLoading, isError } = useGetFavouriteMovies();

  if (!data?.results.length) {
    return (
      <div className="p-8">
        <p>No favourite movies available</p>
      </div>
    );
  }
  return (
    <div className="flex flex-col">
      {isError && <p>Error fetching favourite movies</p>}
      {isLoading && <Spinner />}
      {data?.results.map((movie) => (
        <MovieItem key={movie.id} movie={movie} />
      ))}
    </div>
  );
};

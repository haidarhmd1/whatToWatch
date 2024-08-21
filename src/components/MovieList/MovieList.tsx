import { SearchMoviesResponse } from "../../types/movie";
import { Spinner } from "../general";
import { MovieItem } from "../MovieItem";
import { TbInputSearch } from "react-icons/tb";

type MovieListProps = {
  movieQuery: string;
  movies: SearchMoviesResponse | undefined;
  isMovieFetchingLoading: boolean;
  isOnline: boolean;
};

export const MovieList = ({
  movies,
  isMovieFetchingLoading,
}: MovieListProps) => {
  const onChangeRoute = (id: number) => {
    window.location.pathname = `movie/${id}`;
  };

  if (isMovieFetchingLoading) {
    return (
      <div className="bg-slate-800 m-8 rounded-3xl">
        <div className="min-h-96 flex justify-center items-center h-full">
          <Spinner />
        </div>
      </div>
    );
  }

  if (!movies) {
    return (
      <div className="m-8 flex justify-center items-center flex-col p-2 bg-slate-800 rounded-3xl min-h-96 lg:flex-row">
        <TbInputSearch size={48} color="white" className="mr-4" />
        <p className="text-center text-lg text-white">
          Use the search field to search for movies
        </p>
      </div>
    );
  }

  return (
    <div className="m-8">
      {!movies ||
        (!movies.results.length && (
          <div className="flex justify-center items-center flex-col p-2 bg-slate-800 rounded-3xl min-h-96 lg:flex-row">
            <TbInputSearch size={48} color="white" className="mr-4" />
            <p className="text-center text-lg text-white">
              Use the search field to search for movies
            </p>
          </div>
        ))}
      {movies.results.map((movie) => {
        return (
          <div
            className="cursor-pointer"
            key={movie.id}
            onClick={() => onChangeRoute(movie.id)}
          >
            <MovieItem movie={movie} />
          </div>
        );
      })}
    </div>
  );
};

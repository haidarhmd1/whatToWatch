import { useMutation } from '@tanstack/react-query';
import { SearchMoviesResponse } from '../../types/movie';
import { Button } from '../general';
import { searchMovie } from '../../network/api';
import { Dispatch, SetStateAction, useCallback } from 'react';

type PaginationProps = {
  movieQuery: string;
  movies: SearchMoviesResponse | undefined;
  setMovies: Dispatch<SetStateAction<SearchMoviesResponse | undefined>>;
  setIsMovieFetchingLoading: Dispatch<SetStateAction<boolean>>;
};

export const Pagination = ({
  movieQuery,
  movies,
  setMovies,
  setIsMovieFetchingLoading,
}: PaginationProps) => {
  const { mutateAsync: doSearchMovie } = useMutation({
    mutationFn: searchMovie,
    onMutate: () => {
      setIsMovieFetchingLoading(true);
    },
    onSuccess: (data) => {
      setMovies(data);
      setIsMovieFetchingLoading(false);
    },
    onError: () => {
      setIsMovieFetchingLoading(false);
    },
  });

  const handlePageClick = useCallback(
    async (page: number) => {
      await doSearchMovie({ movie: movieQuery, page });
    },
    [doSearchMovie, movieQuery],
  );

  if (!movies?.results.length || movies.total_pages === 1) {
    return null;
  }

  return (
    <div className="flex justify-center mb-8">
      {[...Array(movies?.total_pages)].map((_, i) => (
        <Button
          onClick={() => handlePageClick(i + 1)}
          className={`p-3 rounded-full ml-2 ${
            movies.page === i + 1 && 'bg-slate-700 text-white'
          }`}
          key={i}
        >
          {i + 1}
        </Button>
      ))}
    </div>
  );
};

import { useQuery } from '@tanstack/react-query';
import {
  getFavouriteMovies,
  getMovieGenreList,
  getMovieList,
  getMovieTrailer,
  searchMovie,
} from '../network/api';

export const QUERY_KEYS = {
  SEARCH_MOVIE: 'SEARCH_MOVIE',
  FAVOURITE_MOVIES: 'FAVOURITE_MOVIES',
  ADD_FAVOURITE_MOVIES: 'ADD_FAVOURITE_MOVIES',
  REMOVE_FAVOURITE_MOVIES: 'REMOVE_FAVOURITE_MOVIES',
  MOVIE_LIST: 'MOVIE_LIST',
  MOVIE_TRAILER: 'MOVIE_TRAILER',
  GENRES: 'GENRES',
};

export const useSearchMovie = ({
  movie,
  page,
}: {
  movie: string;
  page: number;
}) =>
  useQuery({
    queryKey: [QUERY_KEYS.SEARCH_MOVIE],
    queryFn: () => searchMovie({ movie, page }),
  });

export const useGetFavouriteMovies = () =>
  useQuery({
    queryKey: [QUERY_KEYS.FAVOURITE_MOVIES],
    queryFn: getFavouriteMovies,
  });

export const useGetMovieList = ({ movieList }: { movieList: string }) =>
  useQuery({
    queryKey: [QUERY_KEYS.MOVIE_LIST],
    queryFn: () => getMovieList({ movieList }),
  });

export const useGetMovieTrailer = ({ id }: { id: number }) =>
  useQuery({
    queryKey: [QUERY_KEYS.MOVIE_TRAILER],
    queryFn: () => getMovieTrailer({ id }),
  });

export const useGetGenres = () =>
  useQuery({
    queryKey: [QUERY_KEYS.GENRES],
    queryFn: getMovieGenreList,
  });

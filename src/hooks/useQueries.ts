import { useQuery } from "@tanstack/react-query";
import {
  getFavouriteMovies,
  getMovieDiscoveryList,
  getMovieGenreList,
  getMovieList,
  getMovieTrailer,
  getSingleMovie,
  searchMovie,
} from "../network/api";

export const QUERY_KEYS = {
  SEARCH_MOVIE: "SEARCH_MOVIE",
  FAVOURITE_MOVIES: "FAVOURITE_MOVIES",
  ADD_FAVOURITE_MOVIES: "ADD_FAVOURITE_MOVIES",
  REMOVE_FAVOURITE_MOVIES: "REMOVE_FAVOURITE_MOVIES",
  MOVIE_LIST: "MOVIE_LIST",
  MOVIE_TRAILER: "MOVIE_TRAILER",
  GENRES: "GENRES",
  DISCOVER: "DISCOVER",
  MOVIE: "MOVIE",
};

export const useGetSingleMovie = ({ id }: { id: number }) =>
  useQuery({
    queryKey: [QUERY_KEYS.SEARCH_MOVIE],
    queryFn: () => getSingleMovie({ id }),
  });

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

export const useGetMovieDiscoveryList = ({
  discoverQuery,
}: {
  discoverQuery: string;
}) =>
  useQuery({
    queryKey: [QUERY_KEYS.DISCOVER],
    queryFn: () => getMovieDiscoveryList({ discoverQuery }),
  });

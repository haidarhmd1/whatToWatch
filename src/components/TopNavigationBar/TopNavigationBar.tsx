"use client";
import { SearchMoviesResponse } from "@/types/movie";
import { useState } from "react";
import { MovieList } from "../MovieList";
import { Pagination } from "../Pagination";
import { SearchInput } from "../SearchInput";
import useNetworkStatus from "@/hooks/useNetworkStatus";

export const TopNavigationBar = () => {
  const { isOnline } = useNetworkStatus();

  const [movieQuery, setMovieQuery] = useState<string>("");
  const [isMovieFetchingLoading, setIsMovieFetchingLoading] =
    useState<boolean>(false);
  const [movies, setMovies] = useState<SearchMoviesResponse>();
  const [isSearchInputFocused, setIsSearchInputFocused] = useState(false);
  return (
    <div className="transition ease-in-out flex mx-auto align-middle justify-around p-1 rounded-full bg-slate-800 m-7 w-full md:w-96 md:justify-normal">
      <SearchInput
        isSearchInputFocused={isSearchInputFocused}
        setIsSearchInputFocused={setIsSearchInputFocused}
        isOnline={isOnline}
        setMovieQuery={setMovieQuery}
        setMovies={setMovies}
        setIsMovieFetchingLoading={setIsMovieFetchingLoading}
      />
      {isSearchInputFocused && (
        <div className="absolute top-[100px] left-0 z-[10000] min-h-[calc(100%-100px)] bg-slate-900 w-screen overflow-auto">
          <MovieList
            isOnline={isOnline}
            isMovieFetchingLoading={isMovieFetchingLoading}
            movieQuery={movieQuery}
            movies={movies}
          />
          <Pagination
            movieQuery={movieQuery}
            setMovies={setMovies}
            setIsMovieFetchingLoading={setIsMovieFetchingLoading}
            movies={movies}
          />
        </div>
      )}
    </div>
  );
};

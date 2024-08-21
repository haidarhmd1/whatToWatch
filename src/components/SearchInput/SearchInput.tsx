import React, { Dispatch, SetStateAction, useEffect, useState } from "react";
import { searchMovie } from "../../network/api";
import { SearchMoviesResponse } from "../../types/movie";
import { Button } from "../general";
import { useMutation } from "@tanstack/react-query";
import { IoClose, IoSearch } from "react-icons/io5";

type SearchInputProps = {
  setMovieQuery: Dispatch<SetStateAction<string>>;
  setMovies: Dispatch<SetStateAction<SearchMoviesResponse | undefined>>;
  setIsMovieFetchingLoading: Dispatch<SetStateAction<boolean>>;
  isOnline: boolean;
  setIsSearchInputFocused: React.Dispatch<React.SetStateAction<boolean>>;
  isSearchInputFocused: boolean;
};

export const SearchInput = ({
  setMovieQuery,
  setMovies,
  setIsMovieFetchingLoading,
  isOnline,
  setIsSearchInputFocused,
  isSearchInputFocused,
}: SearchInputProps) => {
  const { isPending, mutateAsync: doSearchMovie } = useMutation({
    mutationFn: searchMovie,
  });

  const [searchTerm, setSearchTerm] = useState<string>("");

  const onInputChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    setSearchTerm(event.target.value);
  };

  const onCloseHandler = () => {
    setMovies(undefined);
    setMovieQuery("");
    setIsSearchInputFocused(false);
    setSearchTerm("");
  };

  const onClickHandler = async () => {
    try {
      const result = await doSearchMovie({ movie: searchTerm, page: 1 });
      setMovies(result);
      setMovieQuery(searchTerm);
    } catch (error) {
      console.error(`Error searching for "${searchTerm}":`, error);
    }
  };

  const onKeyDownHandler = async (
    event: React.KeyboardEvent<HTMLInputElement>
  ) => {
    if (event.key === "Enter") {
      await onClickHandler();
    }
  };

  useEffect(() => {
    setIsMovieFetchingLoading(isPending);
  }, [isPending, setIsMovieFetchingLoading]);

  return (
    <div className="flex flex-col md:flex-row gap-2 md:gap-4 w-full">
      <input
        onFocus={() => setIsSearchInputFocused(true)}
        disabled={!isOnline}
        type="text"
        className={`flex-grow text-white text-md bg-slate-700 text-gray-900 rounded-full p-2.5 disabled:bg-gray-200 disabled:cursor-not-allowed`}
        placeholder="Search for a movie... (e.g. Avatar...)"
        required
        value={searchTerm}
        onChange={onInputChange}
        onKeyDown={onKeyDownHandler}
      />
      <Button
        className="bg-black py-2 rounded-full px-4 justify-center items-center"
        onClick={onClickHandler}
        disabled={!isOnline || isPending}
      >
        <IoSearch size={21} color="white" />
      </Button>
      {isSearchInputFocused && (
        <Button
          className="bg-black py-2 rounded-full px-4 justify-center items-center"
          onClick={onCloseHandler}
          disabled={!isOnline || isPending}
        >
          <IoClose size={21} color="white" />
        </Button>
      )}
    </div>
  );
};

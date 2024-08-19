import { MOVIEDB_ACCOUNT_ID } from '../constants/move_db';
import { FavouriteMovieResponse } from '../types/favourites';
import { GenresResponse } from '../types/genres';
import { SearchMoviesResponse } from '../types/movie';
import { Trailer } from '../types/trailer';
import axios from './axios';

export const searchMovie = async ({
  movie,
  page,
}: {
  movie: string;
  page: number;
}): Promise<SearchMoviesResponse> => {
  try {
    const response = await axios.get(
      `/search/movie?query=${movie}&page=${page}`,
    );
    if (response.status !== 200) {
      throw new Error('Failed to fetch movies');
    }
    return response.data;
  } catch (error) {
    console.error('Error: ', error);
    throw error;
  }
};

export const getMovieList = async ({
  movieList,
}: {
  movieList: string;
}): Promise<SearchMoviesResponse> => {
  try {
    const response = await axios.get(`/movie/${movieList}`);
    if (response.status !== 200) {
      throw new Error('Failed to fetch movies');
    }
    return response.data;
  } catch (error) {
    console.error('Error: ', error);
    throw error;
  }
};

export const getMovieTrailer = async ({
  id,
}: {
  id: number;
}): Promise<Trailer> => {
  try {
    const response = await axios.get(`/movie/${id}/videos`);
    if (response.status !== 200) {
      throw new Error('Failed to fetch movie trailer');
    }
    return response.data;
  } catch (error) {
    console.error('Error: ', error);
    throw error;
  }
};

export const getMovieGenreList = async (): Promise<GenresResponse> => {
  try {
    const response = await axios.get('/genre/movie/list');
    if (response.status !== 200) {
      throw new Error('Failed to fetch movie genres');
    }

    return response.data;
  } catch (error) {
    console.error('Error: ', error);
    throw error;
  }
};

export const addToFavourites = async ({
  id,
}: {
  id: number;
}): Promise<void> => {
  const body = { media_type: 'movie', media_id: id, favorite: true };

  try {
    const response = await axios.post(
      `/account/${MOVIEDB_ACCOUNT_ID}/favorite`,
      body,
    );

    if (response.status !== 201) {
      throw new Error('Failed to add to favourites');
    }
    return response.data;
  } catch (error) {
    console.error('Error: ', error);
    throw error;
  }
};

export const removeFromFavourite = async ({
  id,
}: {
  id: number;
}): Promise<void> => {
  const body = { media_type: 'movie', media_id: id, favorite: false };
  try {
    const response = await axios.post(
      `/account/${MOVIEDB_ACCOUNT_ID}/favorite`,
      body,
    );
    if (response.status !== 200) {
      throw new Error('Error while removing favourite movie from List');
    }
    return response.data;
  } catch (error) {
    console.error('Error: ', error);
    throw error;
  }
};

export const getFavouriteMovies = async (): Promise<FavouriteMovieResponse> => {
  try {
    const response = await axios.get(
      `/account/${MOVIEDB_ACCOUNT_ID}/favorite/movies`,
    );
    if (response.status !== 200) {
      throw new Error('Error while getting favourite movies');
    }
    return response.data;
  } catch (error) {
    console.error('Error: ', error);
    throw error;
  }
};

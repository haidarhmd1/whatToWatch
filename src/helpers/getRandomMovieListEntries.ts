import { MovieResult } from '../types/movie';

export const getRandomMovieListEntries = (
  movieList: MovieResult[] | undefined,
  numberOfMoviesToReturn: number,
): MovieResult[] | [] => {
  if (!movieList || movieList.length === 0) {
    return [];
  }

  if (numberOfMoviesToReturn > movieList.length) {
    throw new Error(
      'Number of movies to return should exceed length of the arra',
    );
  }
  return shuffleArray(movieList).splice(0, numberOfMoviesToReturn);
};

function shuffleArray(movieArray: MovieResult[]): MovieResult[] {
  const newMovieArray = movieArray.slice();
  for (let i = newMovieArray.length - 1; i > 0; i--) {
    const j: number = Math.floor(Math.random() * (i + 1));
    const temp = newMovieArray[i];
    newMovieArray[i] = newMovieArray[j];
    newMovieArray[j] = temp;
  }

  return newMovieArray;
}

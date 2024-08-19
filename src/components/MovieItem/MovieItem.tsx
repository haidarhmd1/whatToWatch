import { MovieResult } from '../../types/movie';
import { Description } from '../general/Description';
import { Poster } from '../general/Poster';
import { Title } from '../general/Title';
import { FavouriteButton } from './FavouriteButton';

type MovieItemProps = {
  movie: MovieResult;
};

export const MovieItem = ({ movie }: MovieItemProps) => {
  const { id, poster_path, title, overview, original_language, release_date } =
    movie;

  return (
    <div className="mb-4 p-4 flex flex-col bg-gray-800 text-white rounded-3xl lg:flex-row lg:p-8">
      <Poster posterPath={poster_path} title={title} />

      <div className="flex-grow">
        <Title title={title} />

        <Description
          overview={overview}
          originalLanguage={original_language}
          releaseDate={release_date}
        />

        <FavouriteButton movieId={id} movieTitle={title} />
      </div>
    </div>
  );
};

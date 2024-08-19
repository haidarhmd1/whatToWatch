import { PLACEHOLDER_IMAGE, POSTER_URL } from '../../../constants/image';

type PosterProps = {
  posterPath: string | null;
  title: string;
};

export const Poster = ({ posterPath, title }: PosterProps) => {
  return (
    <div className="flex-shrink-0 mb-6 lg:mb-0 lg:mr-8">
      <img
        src={posterPath ? `${POSTER_URL}/${posterPath}` : PLACEHOLDER_IMAGE}
        alt={`${title} Poster`}
        className="w-full lg:w-64 rounded-lg"
      />
    </div>
  );
};

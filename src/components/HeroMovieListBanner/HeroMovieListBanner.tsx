import { POSTER_URL } from "../../constants/image";
import { FaCirclePlay } from "react-icons/fa6";
import { MOVIE_LIST } from "../../constants/movieList";
import { getRandomMovieListEntries } from "../../helpers/getRandomMovieListEntries";
import { useGetMovieList } from "../../hooks/useQueries";
import { Skeleton } from "../general/Skeleton";
import { getMovieTrailer } from "../../network/api";
import { YOUTUBE_LINK } from "../../constants/trailer";
import { Error } from "../general/Error";

export const HeroMovieListBanner = () => {
  const {
    data: movies,
    isLoading,
    isError,
  } = useGetMovieList({
    movieList: MOVIE_LIST.now_playing,
  });

  if (isLoading) {
    return (
      <div className="flex">
        {[0, 1].map((_, index) => (
          <div
            key={_}
            className={`h-80 m-4 ${index === 0 ? "w-[60%]" : "w-[80%]"}`}
          >
            <Skeleton className="bg-slate-800 h-[300px]" />
          </div>
        ))}
      </div>
    );
  }

  if (!movies || isError) {
    return <Error />;
  }

  const onPlayTrailerClickHandler = async (id: number) => {
    const response = await getMovieTrailer({ id });
    window.open(`${YOUTUBE_LINK}${response.results[0].key}`, "_blank");
    return;
  };

  return (
    <div className="flex">
      {getRandomMovieListEntries(movies.results, 2).map((movie, index) => (
        <div
          key={movie.id}
          style={{
            backgroundImage: `url('${POSTER_URL}${movie.backdrop_path}')`,
          }}
          className={`shadow-lg h-80 ${
            index === 0 ? "w-[60%]" : "w-[80%]"
          } overflow-hidden rounded-3xl first:mr-4 bg-no-repeat bg-center bg-cover relative hover:shadow-sm transition-shadow`}
        >
          <div className="w-8/12 relative p-4 m-2 z-10">
            <h3 className="text-white font-normal text-lg md:text-4xl">
              {movie.title}
            </h3>
          </div>
          <div
            className="flex align-middle p-2 m-4 absolute bottom-2 z-10 cursor-pointer"
            onClick={async () => await onPlayTrailerClickHandler(movie.id)}
          >
            <FaCirclePlay size={28} color="white" />
            <p className="ml-4 m-0 p-0 text-white text-sm md:text-base self-center">
              Watch trailer
            </p>
          </div>
          <div className="absolute top-0 bg-black/35 h-full w-full hover:bg-black/10 transition-all"></div>
        </div>
      ))}
    </div>
  );
};

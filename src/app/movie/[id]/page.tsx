import { Title } from "@/components/general/Title";
import { POSTER_URL } from "@/constants/image";
import { getSingleMovie, getSingleMovieInformation } from "@/network/api";
import { FaHeart } from "react-icons/fa";
import { IoMdTimer } from "react-icons/io";
import Image from "next/image";
import { SearchMoviesResponse } from "@/types/movie";
import { Item } from "@/components/Item";
import { getRandomMovieListEntries } from "@/helpers/getRandomMovieListEntries";
import { MovieCredits } from "@/types/credits";

type MovieDetailsProps = {
  params: { id: number };
};

export default async function MovieDetails({ params }: MovieDetailsProps) {
  const movie = await getSingleMovie({ id: params.id });
  const similar: SearchMoviesResponse = await getSingleMovieInformation({
    id: params.id,
    options: "similar",
  });

  const credits: MovieCredits = await getSingleMovieInformation({
    id: params.id,
    options: "credits",
  });

  const limitedRandomSimilar = getRandomMovieListEntries(similar.results, 6);

  return (
    <div className=" grid grid-cols-1">
      <div
        style={{
          backgroundImage: `url('${POSTER_URL}${movie.backdrop_path}')`,
        }}
        className="relative h-full md:h-[60vh] w-full bg-no-repeat bg-cover bg-top"
      >
        <div className="relative grid grid-cols-1 md:grid-cols-[25%_75%] p-4 h-full z-10">
          <div className="relative hidden md:flex rounded-3xl overflow-hidden">
            <Image
              fill
              objectFit="contain"
              src={`${POSTER_URL}${movie.poster_path}`}
              alt={movie.original_title}
            />
          </div>
          <div className="flex flex-col p-4">
            <div className="flex">
              <Title className="text-white" title={movie.title} />
              <p className="text-gray-200 text-lg self-center ml-2">
                ({movie.release_date})
              </p>
            </div>
            <div className="flex w-3/4">
              <p className="text-white text-sm font-light">{movie.overview}</p>
            </div>
            <div className="flex mt-4">
              {movie.genres.map((genre) => (
                <div
                  key={genre.id}
                  className="p-2 bg-slate-700/20 border rounded-lg text-xs text-white mr-2"
                >
                  {genre.name}
                </div>
              ))}
            </div>
            <div className="flex p-2 bg-slate-700/20 border rounded-lg text-xs text-white mr-2 items-center mt-4 w-fit">
              <FaHeart color="red" className="mr-2" />
              <p className="text-white">{movie.vote_average.toFixed(1)} / 10</p>
            </div>

            <div className="flex p-2 bg-slate-700/20 border rounded-lg text-xs text-white mr-2 items-center mt-4 w-fit">
              <IoMdTimer color="white" className="mr-2" />
              <p className="text-white">{movie.runtime} min</p>
            </div>

            <div className="flex mt-4 max-w-[400px] overflow-auto">
              {credits.cast.map((cast) => (
                <div
                  key={cast.id}
                  className="p-2 bg-slate-700/20 border rounded-lg text-xs text-white mt-4 mr-2 items-center min-w-[120px]"
                >
                  {cast.original_name}
                </div>
              ))}
            </div>
          </div>
        </div>

        <div className="backdrop-blur-md backdrop-brightness-150 bg-black/30 absolute bottom-0 w-full h-full"></div>
      </div>
      <>
        <p className="ml-8 mt-4 text-white text-lg font-normal">
          Similar Movies:{" "}
        </p>
        <div className="grid grid-cols-2 md:grid-cols-6 gap-4 p-4">
          {limitedRandomSimilar.map((similarMovie) => (
            <Item
              key={similarMovie.id}
              movie={similarMovie}
              link={similarMovie.id.toString()}
            />
          ))}
        </div>
      </>
    </div>
  );
}

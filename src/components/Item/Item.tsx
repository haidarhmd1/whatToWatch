import { Card } from "../general/Card";
import { POSTER_URL } from "@/constants/image";
import { FaRegStar } from "react-icons/fa";

import Image from "next/image";
import { MovieResult } from "@/types/movie";
import Link from "next/link";

type ItemProps = {
  movie: MovieResult;
  link?: string;
};

export const Item = ({ movie, link = "" }: ItemProps) => {
  return (
    <Link href={link === "" ? `movie/${movie.id}` : link}>
      <Card className="flex flex-col border-none bg-slate-700/10 p-4 cursor-pointer hover:bg-slate-700/30 transition-all">
        <Image
          className="rounded-3xl self-center"
          width={200}
          height={120}
          src={`${POSTER_URL}${movie.poster_path}`}
          alt={movie.original_title}
        />
        <div className="mt-4 self-center">
          <p className="text-white text-sm font-medium">
            {movie.original_title}
          </p>
          <p className="flex items-baseline text-xs text-white">
            <FaRegStar color="yellow" className="mr-2" />
            {movie.popularity} | {movie.release_date}
          </p>
        </div>
      </Card>
    </Link>
  );
};

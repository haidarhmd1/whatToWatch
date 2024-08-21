import { useGetGenres } from "../../hooks/useQueries";
import { Genre } from "../../types/genres";
import { Card } from "../general/Card";
import { Error } from "../general/Error";
import { Skeleton } from "../general/Skeleton";
import Carousel from "react-multi-carousel";
import "react-multi-carousel/lib/styles.css";
import { useState } from "react";
import { List } from "../List";

const responsive = {
  superLargeDesktop: {
    breakpoint: { max: 4000, min: 3000 },
    items: 8,
  },
  desktop: {
    breakpoint: { max: 3000, min: 1024 },
    items: 6,
  },
  tablet: {
    breakpoint: { max: 1024, min: 464 },
    items: 4,
  },
  mobile: {
    breakpoint: { max: 464, min: 0 },
    items: 3,
  },
};

export const GenreList = () => {
  const [genreName, setGenreName] = useState<string>("Action");
  const [discoverQuery, setDiscoverQuery] = useState<string>("");
  const { data, isLoading, isError } = useGetGenres();

  if (isError) {
    return <Error />;
  }

  if (isLoading) {
    return (
      <div className="flex my-8 overflow-auto scroll-smooth">
        {Array(5).map((_, index) => (
          <div key={index} className="h-80 mr-4">
            <Card className="text-center cursor-pointer p-10 border-none shadow-xl w-40 bg-slate-800 hover:shadow-sm hover:bg-slate-700 transition-all">
              <Skeleton className="bg-slate-800" />
            </Card>
          </div>
        ))}
      </div>
    );
  }

  return (
    <div className="my-8">
      <Carousel responsive={responsive}>
        {data?.genres.map((genre: Genre) => (
          <Card
            onClick={() => {
              setDiscoverQuery(`with_genres=${genre.id}`);
              setGenreName(genre.name);
            }}
            key={genre.id}
            className="text-center mr-4 min-w-[200px]: cursor-pointer p-8 border-none shadow-xl bg-slate-800 hover:shadow-sm hover:bg-slate-700 transition-all"
          >
            <p className="text-white font-medium">{genre.name}</p>
          </Card>
        ))}
      </Carousel>
      <List
        title={genreName}
        isGetGenreLoading={isLoading}
        discoverQuery={discoverQuery}
      />
    </div>
  );
};

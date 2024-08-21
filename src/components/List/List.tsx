import { Title } from "../general/Title";
import { Item } from "../Item";
import { useMutation } from "@tanstack/react-query";
import { QUERY_KEYS } from "@/hooks/useQueries";
import { getMovieDiscoveryList } from "@/network/api";
import { useEffect } from "react";
import { HeadlineSkeleton, Skeleton } from "../general/Skeleton";

type ListProps = {
  title: string;
  discoverQuery: string;
  isGetGenreLoading: boolean;
};

export const List = ({
  title,
  discoverQuery,
  isGetGenreLoading,
}: ListProps) => {
  const {
    data: movieGenreDiscoverList,
    isPending: isMovieGenreDiscoverListPending,
    mutateAsync: doGetMovieDiscoveryList,
  } = useMutation({
    mutationKey: [QUERY_KEYS.DISCOVER],
    mutationFn: getMovieDiscoveryList,
  });

  useEffect(() => {
    const doMutation = async () => {
      await doGetMovieDiscoveryList({ discoverQuery });
    };
    doMutation();
  }, [discoverQuery]);

  if (
    !movieGenreDiscoverList ||
    isMovieGenreDiscoverListPending ||
    isGetGenreLoading
  ) {
    return (
      <div className="mt-4">
        <HeadlineSkeleton />
        <div className="grid grid-cols-4 gap-4">
          {Array.from({ length: 5 }).map((_, index) => {
            return (
              <Skeleton key={index} className="bg-slate-700/20 p-4 h-80" />
            );
          })}
        </div>
      </div>
    );
  }

  return (
    <div className="mt-4">
      <Title className="mt-4 font-medium text-white" title={title} />
      <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
        {movieGenreDiscoverList.results.map((item) => {
          return <Item key={item.id} movie={item} />;
        })}
      </div>
    </div>
  );
};

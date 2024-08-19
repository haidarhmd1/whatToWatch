import { FaRegHeart, FaHeart } from 'react-icons/fa';
import { Button } from '../../general';
import { useMutation, useQueryClient } from '@tanstack/react-query';
import { toast } from 'react-toastify';
import { addToFavourites, removeFromFavourite } from '../../../network/api';
import { QUERY_KEYS, useGetFavouriteMovies } from '../../../hooks/useQueries';
import { Movie } from '../../../types/favourites';

type FavouriteButtonProps = {
  movieId: number;
  movieTitle: string;
};

export const FavouriteButton = ({
  movieId,
  movieTitle,
}: FavouriteButtonProps) => {
  const queryClient = useQueryClient();
  const { data, isError } = useGetFavouriteMovies();
  const foundMovie = data?.results.find((favMovie) => favMovie.id === movieId);

  //optimistic updates: https://tanstack.com/query/v4/docs/framework/react/guides/optimistic-updates
  const { mutate: doAddToFavourite } = useMutation({
    mutationFn: addToFavourites,
    onMutate: async (newFavourites) => {
      await queryClient.cancelQueries({
        queryKey: [QUERY_KEYS.ADD_FAVOURITE_MOVIES],
      });

      const previousFavourites = queryClient.getQueryData([
        QUERY_KEYS.ADD_FAVOURITE_MOVIES,
      ]);

      queryClient.setQueryData(
        [QUERY_KEYS.ADD_FAVOURITE_MOVIES],
        (old: Movie[] | undefined) => {
          const previousFavourites = old || [];
          return [...previousFavourites, newFavourites];
        },
      );
      return { previousFavourites };
    },
    onError: (err, newFavourite, context) => {
      queryClient.setQueryData(
        [QUERY_KEYS.ADD_FAVOURITE_MOVIES],
        context?.previousFavourites,
      );
      toast.error(
        `Movie ${movieTitle} could not be added to favourites. Please try again later...`,
        { position: 'bottom-right' },
      );
    },
    onSettled: () => {
      queryClient.invalidateQueries({
        queryKey: [QUERY_KEYS.FAVOURITE_MOVIES],
      });
    },
    onSuccess: () => {
      toast.success(`Movie ${movieTitle} successfully added to favourites`, {
        position: 'bottom-right',
      });
    },
  });

  const { mutate: doRemoveFromFavourites } = useMutation({
    mutationFn: removeFromFavourite,
    onMutate: async (newRemovedFavourites) => {
      await queryClient.cancelQueries({
        queryKey: [QUERY_KEYS.REMOVE_FAVOURITE_MOVIES],
      });

      const previousRemovedFavourites = queryClient.getQueryData([
        QUERY_KEYS.REMOVE_FAVOURITE_MOVIES,
      ]);

      queryClient.setQueryData(
        [QUERY_KEYS.REMOVE_FAVOURITE_MOVIES],
        (old: Movie[] | undefined) => {
          const previousRemovedFavourites = old || [];
          return [...previousRemovedFavourites, newRemovedFavourites];
        },
      );
      return { previousRemovedFavourites };
    },
    onError: (err, removedFavourite, context) => {
      queryClient.setQueryData(
        [QUERY_KEYS.REMOVE_FAVOURITE_MOVIES],
        context?.previousRemovedFavourites,
      );
      toast.error(
        `Movie ${movieTitle} could not be removed from favourites. Please try again later...`,
        { position: 'bottom-right' },
      );
    },
    onSettled: () => {
      queryClient.invalidateQueries({
        queryKey: [QUERY_KEYS.FAVOURITE_MOVIES],
      });
    },
    onSuccess: () => {
      toast.success(`Movie ${movieTitle} removed from favourites`, {
        position: 'bottom-right',
      });
    },
  });

  if (isError) {
    return <p>Could not load favourites</p>;
  }

  return (
    <div className="flex">
      {!foundMovie ? (
        <Button
          className="w-full lg:w-auto items-center py-2.5"
          onClick={() => doAddToFavourite({ id: movieId })}
        >
          <FaRegHeart className="mr-2 lg:mr-4" />
          Add to favorites
        </Button>
      ) : (
        <Button
          className="w-full lg:w-auto items-center py-2.5"
          onClick={() => doRemoveFromFavourites({ id: movieId })}
        >
          <FaHeart className="mr-2 lg:mr-4" />
          Remove from favorites
        </Button>
      )}
    </div>
  );
};

import { FaRegStar } from 'react-icons/fa';

import { Button } from '../general';
import { useGetFavouriteMovies } from '../../hooks/useQueries';
import { Dispatch, SetStateAction } from 'react';

type FavouritesCountButtonProps = {
  setOpen: Dispatch<SetStateAction<boolean>>;
};

export const FavouritesCountButton = ({
  setOpen,
}: FavouritesCountButtonProps) => {
  const { data } = useGetFavouriteMovies();
  const favCount = data?.total_results;

  return (
    <>
      <Button
        className="md:ml-2 md:py-2.5 py-1 ml-1 items-center"
        onClick={() => setOpen(true)}
      >
        <FaRegStar size={21} className="md:mr-4 mr-2" />
        <span className="md:text-lg text-sm">{favCount}</span>
      </Button>
    </>
  );
};

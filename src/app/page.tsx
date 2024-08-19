"use client";
import { NoConnection } from "@/components/general/NoConnection";
import { GenreList } from "@/components/GenreList";
import { HeroMovieListBanner } from "@/components/HeroMovieListBanner";
import useNetworkStatus from "@/hooks/useNetworkStatus";
import { ToastContainer } from "react-toastify";

export default function Home() {
  const { isOnline } = useNetworkStatus();

  return (
    <>
      {isOnline ? (
        <div className="m-8">
          <HeroMovieListBanner />
          <GenreList />
        </div>
      ) : (
        <NoConnection />
      )}
      <ToastContainer draggable />
    </>
  );
}

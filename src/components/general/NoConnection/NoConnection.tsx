import { MdSignalWifiConnectedNoInternet0 } from 'react-icons/md';

export const NoConnection = () => {
  return (
    <div className="bg-slate-800 m-8 rounded-3xl">
      <div className="flex justify-center items-center flex-col p-2 bg-slate-800 rounded-3xl min-h-96 lg:flex-row">
        <MdSignalWifiConnectedNoInternet0
          size={48}
          color="white"
          className="mr-4"
        />
        <p className="text-center text-lg text-white">
          No Internet Connection, please check your connection...
        </p>
      </div>
    </div>
  );
};

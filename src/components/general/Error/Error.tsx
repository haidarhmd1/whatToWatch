import { FaRegFaceSadTear } from 'react-icons/fa6';

type ErrorProps = {
  className?: string;
};

export const Error = ({ className = '' }: ErrorProps) => {
  return (
    <div
      className={`flex rounded-xl p-4 my-8 bg-red-500/20 align-middle justify-center ${className}`}
    >
      <FaRegFaceSadTear size={24} color="white" className="mr-4" />

      <p className="text-white font-medium text-base">
        Something went wrong, Please try again later
      </p>
    </div>
  );
};

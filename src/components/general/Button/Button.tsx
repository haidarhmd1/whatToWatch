import React from "react";
import useNetworkStatus from "../../../hooks/useNetworkStatus";

type ButtonProps = {
  onClick?: () => void;
  className?: string;
  children: React.ReactNode;
  disabled?: boolean;
};

export const Button = ({
  onClick,
  className = "",
  children,
  disabled = false,
}: ButtonProps) => {
  const { isOnline } = useNetworkStatus();

  return (
    <button
      onClick={onClick}
      type="button"
      className={`flex text-sm font-medium text-gray-900 focus:outline-none ${
        (disabled || !isOnline) &&
        "disabled:bg-gray-200 disabled:cursor-not-allowed"
      } ${className}`}
      disabled={disabled || !isOnline}
    >
      {children}
    </button>
  );
};

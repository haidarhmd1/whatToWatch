"use client";
type CardProps = {
  children: React.ReactNode;
  className?: string;
  onClick?: () => void;
};

export const Card = ({
  children,
  className = "",
  onClick = () => {},
}: CardProps) => {
  return (
    <div onClick={onClick} className={`flex border rounded-3xl ${className}`}>
      {children}
    </div>
  );
};

type TitleProps = {
  title: string;
  className?: string;
};

export const Title = ({ title, className = "" }: TitleProps) => {
  return (
    <h1 className={`text-3xl lg:text-4xl font-bold mb-4 ${className}`}>
      {title}
    </h1>
  );
};

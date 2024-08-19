type TitleProps = {
  title: string;
};

export const Title = ({ title }: TitleProps) => {
  return <h1 className="text-3xl lg:text-4xl font-bold mb-4">{title}</h1>;
};

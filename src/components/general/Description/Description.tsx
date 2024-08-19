type DescriptionProps = {
  overview: string;
  originalLanguage: string;
  releaseDate: string;
};

export const Description = ({
  overview,
  originalLanguage,
  releaseDate,
}: DescriptionProps) => {
  return (
    <>
      <p className="text-gray-300 mb-6">{overview}</p>

      <div className="mb-6">
        <h2 className="font-bold text-lg">Language and Year</h2>
        <p>{originalLanguage || 'N/A'}</p>
        <p>{releaseDate || 'N/A'}</p>
      </div>
    </>
  );
};

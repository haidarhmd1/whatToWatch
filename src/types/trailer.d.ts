export type TailerResult = {
  iso_639_1: string;
  iso_3166_1: string;
  name: string;
  key: string;
  site: string;
  size: number;
  type: string;
  official: boolean;
  published_at: string; // If you want to handle this as a Date object, you can change this to `Date`
  id: string;
};

export type Trailer = {
  id: number;
  results: TailerResult[];
};

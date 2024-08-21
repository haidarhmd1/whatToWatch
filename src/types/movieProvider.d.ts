export type Provider = {
  logo_path: string;
  provider_id: number;
  provider_name: string;
  display_priority: number;
};

export type Region = {
  link: string;
  rent?: Provider[];
  buy?: Provider[];
  flatrate?: Provider[];
};

export type MovieAvailability = {
  id: number;
  results: {
    [regionCode: string]: Region;
  };
};

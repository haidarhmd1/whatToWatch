// account id
export const MOVIEDB_ACCOUNT_ID: number = parseInt(
  process.env.NEXT_PUBLIC_ACCOUNT_ID || "0"
);

// movie db api key
export const MOVIEDB_API_KEY: string =
  process.env.NEXT_PUBLIC_MOVIEDB_API_KEY || "N/A";

// movie db access read token
export const MOVIEDB_API_ACCESS_TOKEN: string =
  process.env.NEXT_PUBLIC_MOVIEDB_API_ACCESS_TOKEN || "N/A";

import { SharedValue } from "react-native-reanimated";


export interface Language {
  iso_639_1?: string;
  english_name?: string;
}

export interface Genre {
  id: number;
  name: string;
}

export interface Provider {
  provider_name?: string;
  provider_id?: number;
  logo_path?: string | null;
  display_priority?: number;
}

export interface WatchProviderInfo {
  link?: string | null;
  flatrate?: Provider[] | null;
}

export interface Credit {
  id: number;
  name: string;
  character?: string | null;
  profile_path?: string | null;
  gender?: number | null;
  popularity?: number | null;
  known_for_department?: string | null;
}

export interface Movie {
  id: number;
  title: string;
  genre_ids?: number[];
  genres?: Genre[] | null;
  media_type?: string;
  release_date?: string | null;
  overview?: string | null;
  poster_path?: string | null;
  vote_average?: number | null;
  vote_count?: number | null;
  backdrop_path?: string | null;
  popularity?: number | null;
  runtime?: number | null;
  homepage?: string | null;
  credits?: {
    cast?: Credit[] | null;
    crew?: Credit[] | null;
  } | null;
  watch_providers?: WatchProviderInfo | null;
  spoken_languages?: Language[] | null;
}

export interface TVShow {
  id: number;
  name: string;
  media_type: string;
  genre_ids?: number[];
  first_air_date?: string | null;
  popularity?: number | null;
  overview?: string | null;
  poster_path?: string | null;
  vote_average?: number | null;
  vote_count?: number | null;
  backdrop_path?: string | null;
  origin_country?: string[] | null;
}

export interface KnownFor {
  id: number;
  title?: string | null;
  original_title?: string | null;
  media_type?: string | null;
  overview?: string | null;
  poster_path?: string | null;
  backdrop_path?: string | null;
  release_date?: string | null;
  genre_ids?: number[];
  vote_average?: number | null;
  vote_count?: number | null;
}

export interface Person {
  id: number;
  name: string;
  profile_path?: string | null;
  media_type?: string;
  popularity?: number | null;
  gender?: number | null;
  known_for?: KnownFor[] | null;
}

export interface UserState {
  token: string;
  isFirstLaunch: boolean;
  isLoggedIn: boolean;
  languages: string[];
  currentCards: Movie[];
  nextCards: Movie[];
  genres: string[];
  person: Person[];
  watchlist: Movie[];
  likes: Movie[];
  alreadyWatched: Movie[];
  dislikes: Movie[];
}

export type BottomTabParamList = {
  Home: { initialCards: any[] };
  Search: undefined;
  Filter: undefined;
  Profile: undefined;
};

export type Category = {
  id: number;
  name: string;
  params: Array<Record<string, string>>;
};

export type ImageCardType = {
  movie: Movie,
  numOfCards: number;
  index: number;
  activeIndex: SharedValue<number>;
};

// Define the filter state structure
export interface FilterState {
  filterLocation: string | null; // Stores location or null
  filterGenres: string[]; // Selected genres
  filterLanguage: string[] | null; // Selected original language
  filterArtists: number[]; // Selected artist IDs
  filterDuration: [number, number]; // Selected duration range (e.g., [0, 300])
  filterAvailableOn: string[]; // Selected streaming platforms
}
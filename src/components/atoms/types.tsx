export interface Movie {
    id: string; // Unique identifier for the movie
    title: string; // Name of the movie
    poster_path: string; // Path to the movie's backdrop image
    genre_ids: string[]; // List of genre IDs associated with the movie
    release_date: string; // Release date of the movie
    overview: string; // Brief description of the movie
    vote_average: number; // Average rating of the movie
    vote_count: number; // Number of votes the movie has received
    backdrop_path: string; // Path to the movie's backdrop image
    runtime: number; // Duration of the movie in minutes
  }

export interface Artist {
    id: string; // Unique identifier for the artist
    name: string; // Name of the artist
    profile_path: string; // Path to the artist's profile image
  }

export interface UserState {
  token: string;
  isFirstLaunch: boolean;
  isLoggedIn: boolean;
  languages: string[];
  currentCards: Movie[];
  nextCards: Movie[];
  genres: Record<string, string>;
  artists: Record<string, Artist>;
  watchlist: Record<string, Movie[]>;
  likes: Movie[];
  dislikes: Movie[];
}

export type BottomTabParamList = {
    Home: { initialCards: any[] }; // HomeScreen expects `initialCards`
    Search: undefined; // SearchScreen does not expect params
    Filter: undefined;
    Profile: undefined;
  };

export type Category = {
    id: number;
    name: string;
    params: Array<Record<string, string>>;
  };
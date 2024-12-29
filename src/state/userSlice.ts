import { createSlice, PayloadAction } from "@reduxjs/toolkit";
import { saveToMMKV, getFromMMKV } from "../utils/mmkv";
import { StorageKeys } from "../utils/StorageKeys";

interface Movie {
  movieId: string; // Unique identifier for the movie
  movieName: string; // Name of the movie
  backdrop_path: string; // Path to the movie's backdrop image
}

interface Artist {
  id: string;          // Unique identifier for the artist
  name: string;        // Name of the artist
  profile_path: string; // Path to the artist's profile image
}

interface UserState {
  token: string;
  isFirstLaunch: boolean;
  isLoggedIn: boolean;
  languages: string[];
  genres: Record<string, string>;
  artists: Record<string, Artist>;
  watchlist: Record<string, Movie[]>;
  likes: Movie[];
  dislikes: Movie[];
}

const initialState: UserState = {
  token: "",
  isFirstLaunch: true,
  isLoggedIn: false,
  genres: getFromMMKV(StorageKeys.GENRES) || [],
  languages: getFromMMKV(StorageKeys.LANGUAGES) || [],
  artists: getFromMMKV(StorageKeys.ARTISTS) || [],
  watchlist: getFromMMKV(StorageKeys.WATCHLISTS) || [],
  likes: getFromMMKV(StorageKeys.LIKES) || [],
  dislikes: getFromMMKV(StorageKeys.DISLIKES) || [],
};

const userSlice = createSlice({
  name: "user",
  initialState: {
    ...initialState,
  },
  reducers: {
    setToken: (state, action: PayloadAction<string>) => {
      state.token = action.payload;
    },
    clearToken(state) {
      state.token = "";
    },
    setIsFirstLaunch: (state, action: PayloadAction<boolean>) => {
      state.isFirstLaunch = action.payload;
    },
    setIsLoggedIn: (state, action: PayloadAction<boolean>) => {
      state.isLoggedIn = action.payload;
    },
    setLanguages(state, action: PayloadAction<string[]>) {
      state.languages = action.payload;
    },
    addLanguage(state, action: PayloadAction<string>) {
      if (!state.languages.includes(action.payload)) {
        state.languages.push(action.payload);
      }
    },
    removeLanguage(state, action: PayloadAction<string>) {
      state.languages = state.languages.filter(
        (lang) => lang !== action.payload
      );
    },
    setGenres(state, action: PayloadAction<Record<string, string>>) {
      state.genres = action.payload;
    },
    addGenre(state, action: PayloadAction<{ id: string; name: string }>) {
      state.genres[action.payload.id] = action.payload.name;
    },
    removeGenre(state, action: PayloadAction<string>) {
      delete state.genres[action.payload];
    },
    setArtists(state, action: PayloadAction<Record<string, Artist>>) {
      state.artists = action.payload;
    },
    addArtist(state, action: PayloadAction<{ id: string; name: Artist }>) {
      state.artists[action.payload.id] = action.payload.name;
    },
    removeArtist(state, action: PayloadAction<string>) {
      delete state.artists[action.payload];
    },
    setWatchlist(state, action: PayloadAction<Record<string, Movie[]>>) {
      state.watchlist = action.payload;
    },
    addToWatchlist(
      state,
      action: PayloadAction<{ category: string; movie: Movie }>
    ) {
      const { category, movie } = action.payload;
      if (!state.watchlist[category]) {
        state.watchlist[category] = [];
      }
      state.watchlist[category].push(movie);
    },
    removeFromWatchlist(
      state,
      action: PayloadAction<{ category: string; movieId: string }>
    ) {
      const { category, movieId } = action.payload;
      if (state.watchlist[category]) {
        state.watchlist[category] = state.watchlist[category].filter(
          (movie) => movie.movieId !== movieId
        );
        if (state.watchlist[category].length === 0) {
          delete state.watchlist[category];
        }
      }
    },
    setLikes(state, action: PayloadAction<Movie[]>) {
      state.likes = action.payload;
    },
    addToLikes(state, action: PayloadAction<Movie>) {
      if (
        !state.likes.some((movie) => movie.movieId === action.payload.movieId)
      ) {
        state.likes.push(action.payload);
      }
    },
    removeFromLikes(state, action: PayloadAction<string>) {
      state.likes = state.likes.filter(
        (movie) => movie.movieId !== action.payload
      );
    },

    // Dislikes
    setDislikes(state, action: PayloadAction<Movie[]>) {
      state.dislikes = action.payload;
    },
    addToDislikes(state, action: PayloadAction<Movie>) {
      if (
        !state.dislikes.some(
          (movie) => movie.movieId === action.payload.movieId
        )
      ) {
        state.dislikes.push(action.payload);
      }
    },
    removeFromDislikes(state, action: PayloadAction<string>) {
      state.dislikes = state.dislikes.filter(
        (movie) => movie.movieId !== action.payload
      );
    },
  },
});
export const {
  setToken,
  clearToken,
  setIsFirstLaunch,
  setIsLoggedIn,
  setLanguages,
  addLanguage,
  removeLanguage,
  setGenres,
  addGenre,
  removeGenre,
  setArtists,
  addArtist,
  removeArtist,
  setWatchlist,
  addToWatchlist,
  removeFromWatchlist,
  setLikes,
  addToLikes,
  removeFromLikes,
  setDislikes,
  addToDislikes,
  removeFromDislikes,
} = userSlice.actions;
export default userSlice.reducer;

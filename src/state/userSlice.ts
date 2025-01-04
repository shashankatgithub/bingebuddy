import { createSlice, PayloadAction } from "@reduxjs/toolkit";
import { saveToMMKV, getFromMMKV } from "../utils/mmkv";
import { StorageKeys } from "../utils/StorageKeys";
import { Artist, Movie, UserState } from "../components/atoms/types";

const initialState: UserState = {
  token: "",
  isFirstLaunch: false,
  isLoggedIn: false,
  currentCards: getFromMMKV(StorageKeys.CURRENT_CARDS) || [],
  nextCards: getFromMMKV(StorageKeys.NEXT_CARDS) || [],
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
      action: PayloadAction<{ category: string; id: string }>
    ) {
      const { category, id } = action.payload;
      if (state.watchlist[category]) {
        state.watchlist[category] = state.watchlist[category].filter(
          (movie) => movie.id !== id
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
      if (!state.likes.some((movie) => movie.id === action.payload.id)) {
        state.likes.push(action.payload);
      }
    },
    removeFromLikes(state, action: PayloadAction<string>) {
      state.likes = state.likes.filter((movie) => movie.id !== action.payload);
    },

    setDislikes(state, action: PayloadAction<Movie[]>) {
      state.dislikes = action.payload;
    },
    addToDislikes(state, action: PayloadAction<Movie>) {
      if (!state.dislikes.some((movie) => movie.id === action.payload.id)) {
        state.dislikes.push(action.payload);
      }
    },
    removeFromDislikes(state, action: PayloadAction<string>) {
      state.dislikes = state.dislikes.filter(
        (movie) => movie.id !== action.payload
      );
    },
    setCurrentCards(state, action: PayloadAction<Movie[]>) {
      state.currentCards = action.payload;
      saveToMMKV(StorageKeys.CURRENT_CARDS, state.currentCards);
    },

    setNextCards(state, action: PayloadAction<Movie[]>) {
      state.nextCards = action.payload;
      saveToMMKV(StorageKeys.NEXT_CARDS, state.nextCards);
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
  setCurrentCards,
  setNextCards,
} = userSlice.actions;
export default userSlice.reducer;

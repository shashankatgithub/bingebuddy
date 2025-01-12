import { createSlice, PayloadAction } from "@reduxjs/toolkit";
import { Movie, Person, UserState } from "../components/atoms/types";
import { getFromMMKV } from "../utils/mmkv";
import { StorageKeys } from "../utils/StorageKeys";

const initialState: UserState = {
  token: "",
  isFirstLaunch: false,
  isLoggedIn: false,
  currentCards: getFromMMKV(StorageKeys.CURRENT_CARDS) || [],
  nextCards: getFromMMKV(StorageKeys.NEXT_CARDS) || [],
  genres: getFromMMKV(StorageKeys.GENRES) || [],
  languages: getFromMMKV(StorageKeys.LANGUAGES) || [],
  person: getFromMMKV(StorageKeys.PERSON) || [],
  watchlist: getFromMMKV(StorageKeys.WATCHLISTS) || [],
  likes: getFromMMKV(StorageKeys.LIKES) || [],
  dislikes: getFromMMKV(StorageKeys.DISLIKES) || [],
  alreadyWatched: getFromMMKV(StorageKeys.LIKES) || [],
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

    // Genres
    setGenres(state, action: PayloadAction<string[]>) {
      state.genres = action.payload;
    },
    addGenre(state, action: PayloadAction<string>) {
      if (!state.genres.includes(action.payload)) {
        state.genres.push(action.payload);
      }
    },
    removeGenre(state, action: PayloadAction<string>) {
      state.genres = state.genres.filter((genre) => genre !== action.payload);
    },

    setPerson(state, action: PayloadAction<Person[]>) {
      state.person = action.payload;
    },
    addPerson(state, action: PayloadAction<Person>) {
      if (!state.person.some((artist) => artist.id === action.payload.id)) {
        state.person.push(action.payload);
      }
    },
    removePerson(state, action: PayloadAction<number>) {
      state.person = state.person.filter(
        (person) => person.id !== action.payload
      );
    },

    setWatchlist(state, action: PayloadAction<Movie[]>) {
      state.watchlist = action.payload;
    },
    addToWatchlist(state, action: PayloadAction<Movie>) {
      if (!state.watchlist.some((movie) => movie.id === action.payload.id)) {
        state.watchlist.push(action.payload);
      }
    },
    removeFromWatchlist(state, action: PayloadAction<number>) {
      state.watchlist = state.watchlist.filter(
        (movie) => movie.id !== action.payload
      );
    },

    setAlreadyWatched(state, action: PayloadAction<Movie[]>) {
      state.alreadyWatched = action.payload;
    },
    addToAlreadyWatched(state, action: PayloadAction<Movie>) {
      if (
        !state.alreadyWatched.some((movie) => movie.id === action.payload.id)
      ) {
        state.alreadyWatched.push(action.payload);
      }
    },
    removeFromAlreadyWatched(state, action: PayloadAction<number>) {
      state.alreadyWatched = state.alreadyWatched.filter(
        (movie) => movie.id !== action.payload
      );
    },

    setLikes(state, action: PayloadAction<Movie[]>) {
      state.likes = action.payload;
    },
    addToLikes(state, action: PayloadAction<Movie>) {
      if (!state.likes.some((movie) => movie.id === action.payload.id)) {
        state.likes.push(action.payload);
      }
    },
    removeFromLikes(state, action: PayloadAction<number>) {
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
    removeFromDislikes(state, action: PayloadAction<number>) {
      state.dislikes = state.dislikes.filter(
        (movie) => movie.id !== action.payload
      );
    },

    setCurrentCards(state, action: PayloadAction<Movie[]>) {
      state.currentCards = action.payload;
    },
    setNextCards(state, action: PayloadAction<Movie[]>) {
      state.nextCards = action.payload;
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
  setPerson,
  addPerson,
  removePerson,
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
  setAlreadyWatched,
  addToAlreadyWatched,
  removeFromAlreadyWatched,
} = userSlice.actions;

export default userSlice.reducer;

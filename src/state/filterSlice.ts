import { createSlice, PayloadAction } from "@reduxjs/toolkit";
import { getFromMMKV } from "../utils/mmkv";
import { StorageKeys } from "../utils/StorageKeys";
import { FilterState } from "../components/atoms/types";

// Initial state with values fetched from storage
const initialState: FilterState = {
  filterLocation: getFromMMKV(StorageKeys.LOCATION) || null,
  filterGenres: getFromMMKV(StorageKeys.FILTER_GENRES) || [],
  filterLanguage: getFromMMKV(StorageKeys.FILTER_LANGUAGES) || null,
  filterArtists: getFromMMKV(StorageKeys.FILTER_ARTISTS) || [],
  filterDuration: getFromMMKV(StorageKeys.FILTER_DURATION) || [0, 300],
  filterAvailableOn: getFromMMKV(StorageKeys.FILTER_AVAILABLE_ON) || [],
};

// Create the slice
const filterSlice = createSlice({
  name: "filters",
  initialState,
  reducers: {
    // Set popular location
    setFilterLocation(state, action: PayloadAction<string | null>) {
      state.filterLocation = action.payload;
    },

    // Set genres
    setFilterGenres(state, action: PayloadAction<string[]>) {
      state.filterGenres = action.payload;
    },
    addFilterGenre(state, action: PayloadAction<string>) {
      if (!state.filterGenres.includes(action.payload)) {
        state.filterGenres.push(action.payload);
      }
    },
    removeFilterGenre(state, action: PayloadAction<string>) {
      state.filterGenres = state.filterGenres.filter((genre) => genre !== action.payload);
    },

    // Set original language
    setFilterLanguage(state, action: PayloadAction<string[] | null>) {
      state.filterLanguage = action.payload;
    },

    // Set artists
    setFilterArtists(state, action: PayloadAction<number[]>) {
      state.filterArtists = action.payload;
    },
    addFilterArtist(state, action: PayloadAction<number>) {
      if (!state.filterArtists.includes(action.payload)) {
        state.filterArtists.push(action.payload);
      }
    },
    removeFilterArtist(state, action: PayloadAction<number>) {
      state.filterArtists = state.filterArtists.filter((artistId) => artistId !== action.payload);
    },

    // Set duration
    setFilterDuration(state, action: PayloadAction<[number, number]>) {
      state.filterDuration = action.payload;
    },

    // Set available platforms
    setFilterAvailableOn(state, action: PayloadAction<string[]>) {
      state.filterAvailableOn = action.payload;
    },
    addFilterAvailableOn(state, action: PayloadAction<string>) {
      if (!state.filterAvailableOn.includes(action.payload)) {
        state.filterAvailableOn.push(action.payload);
      }
    },
    removeFilterAvailableOn(state, action: PayloadAction<string>) {
      state.filterAvailableOn = state.filterAvailableOn.filter(
        (platform) => platform !== action.payload
      );
    },

    // Clear all filters
    clearFilters(state) {
      state.filterLocation = null;
      state.filterGenres = [];
      state.filterLanguage = null;
      state.filterArtists = [];
      state.filterDuration = [0, 300];
      state.filterAvailableOn = [];
    },
  },
});

// Export actions and reducer
export const {
  setFilterLocation,
  setFilterGenres,
  addFilterGenre ,
  removeFilterGenre ,
  setFilterLanguage ,
  setFilterArtists,
  addFilterArtist,
  removeFilterArtist,
  setFilterDuration,
  setFilterAvailableOn,
  addFilterAvailableOn,
  removeFilterAvailableOn,
  clearFilters,
} = filterSlice.actions;

export default filterSlice.reducer;

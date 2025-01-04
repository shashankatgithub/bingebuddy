import { createApi, fetchBaseQuery } from "@reduxjs/toolkit/query/react";
import { API_CONFIG } from "@/src/constants/Configuration";

export const bingeServiceApi = createApi({
  reducerPath: "bingeServiceApi",
  baseQuery: fetchBaseQuery({
    baseUrl: API_CONFIG.baseUrl,
    prepareHeaders: (headers) => {
      const token = API_CONFIG.token;
      if (token) {
        headers.set("Authorization", `Bearer ${token}`);
      }
      return headers;
    },
  }),
  endpoints: (builder) => ({
    getActors: builder.query({
      query: ({ genres, languages }) => ({
        url: "/top-actors",
        params: {
          genres: genres.join(","), // Ensure this matches the server's expected parameter
          languages: languages.join(","),
        },
      }),
      async onQueryStarted({ genres, languages }, { queryFulfilled }) {
        // Log the request being made
        console.log("Request to /top-actors:");
        console.log("Genres:", genres);
        console.log("Languages:", languages);

        try {
          const result = await queryFulfilled;
          //console.log("Response from /top-actors:", result.data);
        } catch (error) {
          console.error("Error from /top-actors:", error);
        }
      },
    }),
    newDiscoverMovies: builder.query({
      query: (params: Record<string, any>) => {
        const queryParams = {
          ...params, // Use the params object directly
          page: params.page || 1, // Ensure page has a default value
        };
    
        return {
          url: "/discover-movies",
          params: queryParams, // Send the queryParams as-is
        };
      },
      async onQueryStarted(params, { queryFulfilled }) {
        console.log("Request to /discover-movies:", params);
    
        try {
          const result = await queryFulfilled;
          console.log("Response from /discover-movies:", result.data);
        } catch (error) {
          console.error("Error from /discover-movies:", error);
        }
      },
    }),
    discoverMovies: builder.query({
      query: ({ genres, languages, artists, page = 1, release_date }) => ({
        url: "/discover-movies",
        params: {
          genres: genres.join(","), // Comma-separated genres
          languages: languages.join(","), // Comma-separated languages
          artists: artists.join(","), // Comma-separated artists
          page, // Optional page number
          release_date, // Optional release date
        },
      }),
      async onQueryStarted(
        { genres, languages, artists, page, release_date },
        { queryFulfilled }
      ) {
        // Log the request being made
        console.log("Request to /discover-movies:");
        console.log("Genres:", genres);
        console.log("Languages:", languages);
        console.log("Artists:", artists);
        console.log("Page:", page);
        console.log("Release Date:", release_date);

        try {
          const result = await queryFulfilled;
          console.log("Response from /discover-movies:", result.data);
        } catch (error) {
          console.error("Error from /discover-movies:", error);
        }
      },
    }),
    getSearchPageData: builder.query({
      query: () => ({
        url: "/search-page",
      }),
      async onQueryStarted(_, { queryFulfilled }) {
        console.log("Request to /search-page");

        try {
          const result = await queryFulfilled;
          console.log("Response from /search-page:", result.data);
        } catch (error) {
          console.error("Error from /search-page:", error);
        }
      },
    }),
    search: builder.query({
      query: ({ query, page }) => ({
        url: "/search",
        params: { query, page },
      }),
    }),
  }),
});

export const {
  useLazyGetActorsQuery,
  useLazyDiscoverMoviesQuery,
  useLazyGetSearchPageDataQuery,
  useLazySearchQuery,
  useLazyNewDiscoverMoviesQuery
} = bingeServiceApi;

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
  }),
});

export const { useLazyGetActorsQuery, useLazyDiscoverMoviesQuery } =
  bingeServiceApi;

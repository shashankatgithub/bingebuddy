// src/services/bingeServiceApi.js
import { createApi, fetchBaseQuery } from '@reduxjs/toolkit/query/react';
import { API_CONFIG } from '@/src/constants/Configuration';

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
          console.log("Response from /top-actors:", result.data);
        } catch (error) {
          console.error("Error from /top-actors:", error);
        }
      },
    }),
  }),
});

export const { useLazyGetActorsQuery } = bingeServiceApi;

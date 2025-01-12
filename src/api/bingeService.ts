import { createApi, fetchBaseQuery } from "@reduxjs/toolkit/query/react";
import { API_CONFIG } from "@/src/constants/Configuration";

const retryWithExponentialBackoff = async (
  baseQueryFn,
  args,
  api,
  extraOptions,
  retries = 3,
  delay = 100
) => {
  let attempts = 0;
  let result;
  while (attempts < retries) {
    attempts += 1;
    result = await baseQueryFn(args, api, extraOptions);
    if (!result.error) {
      return result;
    }
    if (attempts < retries) {
      await new Promise((resolve) =>
        setTimeout(resolve, delay * 2 ** (attempts - 1))
      );
    }
  }
  return result;
};

export const bingeServiceApi = createApi({
  reducerPath: "bingeServiceApi",
  baseQuery: async (args, api, extraOptions) => {
    const baseQueryFn = fetchBaseQuery({
      baseUrl: API_CONFIG.baseUrl,
      prepareHeaders: (headers) => {
        const token = API_CONFIG.token;
        if (token) {
          headers.set("Authorization", `Bearer ${token}`);
        }
        return headers;
      },
    });

    // Apply exponential retry logic
    return retryWithExponentialBackoff(baseQueryFn, args, api, extraOptions);
  },
  endpoints: (builder) => ({
    getActors: builder.query({
      query: ({ genres, languages }) => ({
        url: "/top-actors",
        params: { genres, languages },
      }),
      async onQueryStarted({ genres, languages }, { queryFulfilled }) {
        console.log("Request to /top-actors:", { genres, languages });

        try {
          const result = await queryFulfilled;
          //console.log("Response from /top-actors:", result.data);
        } catch (error) {
          console.error("Error from /top-actors:", error);
        }
      },
    }),
    newDiscoverMovies: builder.query({
      query: (params) => ({
        url: "/discover-movies",
        params: {
          ...params,
          page: params.page || 1,
        },
      }),
      async onQueryStarted(params, { queryFulfilled }) {
        console.log("Request to /discover-movies:", params);

        try {
          const result = await queryFulfilled;
          //console.log("Response from /discover-movies:", result.data);
        } catch (error) {
          console.error("Error from /discover-movies:", error);
        }
      },
    }),
    discoverMovies: builder.query({
      query: ({ genres, languages, artists, page = 1, release_date }) => ({
        url: "/discover-movies",
        params: {
          genres: genres.join(","),
          languages: languages.join(","),
          artists: artists.join(","),
          page,
          release_date,
        },
      }),
      async onQueryStarted(
        { genres, languages, artists, page, release_date },
        { queryFulfilled }
      ) {
        console.log("Request to /discover-movies:", {
          genres,
          languages,
          artists,
          page,
          release_date,
        });

        try {
          const result = await queryFulfilled;
          //console.log("Response from /discover-movies:", result.data);
        } catch (error) {
          console.error("Error from /discover-movies:", error);
        }
      },
    }),
    getSearchPageData: builder.query({
      query: () => ({ url: "/search-page" }),
      async onQueryStarted(_, { queryFulfilled }) {
        console.log("Request to /search-page");

        try {
          const result = await queryFulfilled;
          //console.log("Response from /search-page:", result.data);
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
  useLazyNewDiscoverMoviesQuery,
} = bingeServiceApi;

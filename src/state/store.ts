import { configureStore } from '@reduxjs/toolkit';
import userSlice from './userSlice';
import { bingeServiceApi } from '../api/bingeService';

const store = configureStore({
    reducer: {
        [bingeServiceApi.reducerPath]: bingeServiceApi.reducer,
        user: userSlice
    },
    middleware: (getDefaultMiddleware) =>
        getDefaultMiddleware().concat(bingeServiceApi.middleware),
})

// Infer the `RootState` and `AppDispatch` types from the store itself
export type RootState = ReturnType<typeof store.getState>
// Inferred type: {posts: PostsState, comments: CommentsState, users: UsersState}
export type AppDispatch = typeof store.dispatch

export default store
import {createSlice, PayloadAction} from '@reduxjs/toolkit'

interface UserState {
    token: string;
    isFirstLaunch: boolean;
    isLogin: boolean;
  }

  const initialState: UserState = {
    token: "",
    isFirstLaunch: true,
    isLogin: true,
  };

  
const userSlice = createSlice({
    name: 'user',
    initialState: {
        token: "",
        isFirstLaunch: true,
        isLogin: false
    },
    reducers: {
        setToken: (state, action: PayloadAction<string>) => {
            state.token = action.payload;
          },
        setIsFirstLaunch: (state, action: PayloadAction<boolean>) => {
            state.isFirstLaunch = action.payload
        },
        setIsLogin: (state, action: PayloadAction<boolean>) => {
            state.isLogin = action.payload
        }
    }
});
export const { setToken, setIsFirstLaunch, setIsLogin } = userSlice.actions;
export default userSlice.reducer
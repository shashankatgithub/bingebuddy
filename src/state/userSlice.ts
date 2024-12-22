import {createSlice, PayloadAction} from '@reduxjs/toolkit'

interface UserState {
    token: string;
    isFirstLaunch: boolean;
    isLogin: boolean;
  }

  const initialState: UserState = {
    token: "",
    isFirstLaunch: false,
    isLogin: true,
  };

  
const userSlice = createSlice({
    name: 'user',
    initialState: {
        token: "",
        isFirstLaunch: false,
        isLogin: true
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
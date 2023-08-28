import { createSlice, PayloadAction } from "@reduxjs/toolkit";
import { ThemeType } from "../../models/reducers/global.types.ts";

interface IState {
  theme: ThemeType;
  authenticated: boolean;
  isLoading: boolean;
}

const initialState: IState = {
  theme: "light",
  authenticated: false,
  isLoading: false,
};

const globalSlice = createSlice({
  name: "global",
  initialState,
  reducers: {
    setTheme: (state, action: PayloadAction<ThemeType>) => {
      state.theme = action.payload;
    },
    setAuthenticated: (state, action: PayloadAction<boolean>) => {
      state.authenticated = action.payload;
    },
    setLoading: (state, action: PayloadAction<boolean>) => {
      state.isLoading = action.payload;
    },
  },
});

export default globalSlice.reducer;
export const { setTheme, setAuthenticated, setLoading } = globalSlice.actions;

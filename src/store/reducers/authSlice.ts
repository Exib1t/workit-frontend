import { createSlice } from "@reduxjs/toolkit";
import {
  loginThunk,
  refreshThunk,
  registerThunk,
} from "../thunks/authThunks.ts";
import { AuthError } from "../../models/reducers/auth.types.ts";

interface IState {
  id: number | null;
  email: string | null;
  token: string | null;
  isLoading: boolean;
  errors: AuthError | null;
}

const initialState: IState = {
  id: null,
  email: null,
  token: null,
  isLoading: false,
  errors: null,
};

const authSlice = createSlice({
  name: "auth",
  initialState,
  reducers: {
    setToken: (state, action) => {
      if (!action.payload) {
        localStorage.removeItem("token");
      }
      state.token = action.payload;
    },
    logout: (state) => {
      localStorage.removeItem("token");
      state.token = null;
      state.email = null;
      state.id = null;
    },
    setErrors: (state, action) => {
      state.errors = action.payload;
    },
  },
  extraReducers: (builder) => {
    builder.addCase(registerThunk.pending, (state) => {
      state.isLoading = true;
    });
    builder.addCase(registerThunk.fulfilled, (state, action) => {
      state.token = action.payload.token;
      state.errors = null;
      state.isLoading = false;
    });
    builder.addCase(registerThunk.rejected, (state, action) => {
      state.errors = action.payload as AuthError;
      state.isLoading = false;
    });

    builder.addCase(loginThunk.pending, (state) => {
      state.isLoading = true;
    });
    builder.addCase(loginThunk.fulfilled, (state, action) => {
      state.token = action.payload.token;
      state.errors = null;
      state.isLoading = false;
    });
    builder.addCase(loginThunk.rejected, (state, action) => {
      state.errors = action.payload as AuthError;
      state.isLoading = false;
    });

    builder.addCase(refreshThunk.pending, (state) => {
      state.isLoading = true;
    });
    builder.addCase(refreshThunk.fulfilled, (state, action) => {
      state.id = action.payload.id;
      state.email = action.payload.email;
      state.isLoading = false;
    });
    builder.addCase(refreshThunk.rejected, (state, action) => {
      state.id = null;
      state.email = null;
      state.errors = action.payload as AuthError;
      state.isLoading = false;
    });
  },
});

export default authSlice.reducer;
export const { setToken, logout, setErrors } = authSlice.actions;

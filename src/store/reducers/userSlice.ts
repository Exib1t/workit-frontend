import { createSlice } from "@reduxjs/toolkit";
import { IUser } from "../../models/IUser/IUser.ts";
import { fetchUserById } from "../thunks/userThunks.ts";

interface IState {
  user: IUser | null;
  isLoading: boolean;
}

const initialState: IState = {
  user: null,
  isLoading: false,
};

const userSlice = createSlice({
  name: "user",
  initialState,
  reducers: {
    clearUser: (state) => {
      state.user = null;
      state.isLoading = false;
    },
  },
  extraReducers: (builder) => {
    builder.addCase(fetchUserById.pending, (state) => {
      state.isLoading = true;
    });
    builder.addCase(fetchUserById.fulfilled, (state, action) => {
      state.user = action.payload;
      state.isLoading = false;
    });
    builder.addCase(fetchUserById.rejected, (state) => {
      state.isLoading = true;
    });
  },
});

export default userSlice.reducer;
export const { clearUser } = userSlice.actions;

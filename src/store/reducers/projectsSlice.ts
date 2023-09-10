import { createSlice } from "@reduxjs/toolkit";
import { IProject } from "../../models/IProject/IProject.ts";
import { fetchProjects, fetchProjectUsers } from "../thunks/projectsThunks.ts";
import { ICompressedUser } from "../../models/IUser/IUser.ts";

interface IState {
  data: IProject[];
  availableUsers: ICompressedUser[];
  errors: any;
  isLoading: boolean;
}

const initialState: IState = {
  data: [],
  availableUsers: [],
  errors: null,
  isLoading: false,
};

const projectsSlice = createSlice({
  name: "projects",
  initialState,
  reducers: {},
  extraReducers: (builder) => {
    builder.addCase(fetchProjects.pending, (state) => {
      state.isLoading = true;
    });
    builder.addCase(fetchProjects.fulfilled, (state, action) => {
      state.data = action.payload;
      state.isLoading = false;
    });
    builder.addCase(fetchProjects.rejected, (state, action) => {
      state.isLoading = false;
      state.errors = action.payload;
    });
    builder.addCase(fetchProjectUsers.pending, (state) => {
      state.isLoading = true;
    });
    builder.addCase(fetchProjectUsers.fulfilled, (state, action) => {
      state.availableUsers = action.payload;
      state.isLoading = false;
    });
    builder.addCase(fetchProjectUsers.rejected, (state, action) => {
      state.isLoading = false;
      state.errors = action.payload;
    });
  },
});

export default projectsSlice.reducer;

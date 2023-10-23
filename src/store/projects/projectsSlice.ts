import { createSlice, PayloadAction } from "@reduxjs/toolkit";
import { IProject } from "../../models/IProject/IProject.ts";
import {
  createProject,
  deleteProject,
  fetchOneProject,
  fetchProjects,
  fetchProjectUsers,
  updateProject,
} from "./projectsThunks.ts";
import { ICompressedUser } from "../../models/IUser/IUser.ts";
import { AuthError } from "../../models/reducers/auth.types.ts";

interface IState {
  data: IProject[];
  availableUsers: ICompressedUser[];
  errors: AuthError | null;
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
  reducers: {
    setProjectsError: (state, action: PayloadAction<AuthError | null>) => {
      state.errors = action.payload;
    },
  },
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
      state.errors = action.payload as AuthError;
    });
    builder.addCase(createProject.pending, (state) => {
      state.isLoading = true;
    });
    builder.addCase(createProject.fulfilled, (state) => {
      state.isLoading = false;
    });
    builder.addCase(createProject.rejected, (state, action) => {
      state.isLoading = false;
      state.errors = action.payload as AuthError;
    });
    builder.addCase(deleteProject.pending, (state) => {
      state.isLoading = true;
    });
    builder.addCase(deleteProject.fulfilled, (state) => {
      state.isLoading = false;
    });
    builder.addCase(deleteProject.rejected, (state, action) => {
      state.isLoading = false;
      state.errors = action.payload as AuthError;
    });
    builder.addCase(updateProject.pending, (state) => {
      state.isLoading = true;
    });
    builder.addCase(updateProject.fulfilled, (state) => {
      state.isLoading = false;
    });
    builder.addCase(updateProject.rejected, (state, action) => {
      state.isLoading = false;
      state.errors = action.payload as AuthError;
    });
    builder.addCase(fetchOneProject.pending, (state) => {
      state.isLoading = true;
    });
    builder.addCase(fetchOneProject.fulfilled, (state) => {
      state.isLoading = false;
    });
    builder.addCase(fetchOneProject.rejected, (state, action) => {
      state.isLoading = false;
      state.errors = action.payload as AuthError;
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
      state.errors = action.payload as AuthError;
    });
  },
});

export default projectsSlice.reducer;

export const { setProjectsError } = projectsSlice.actions;

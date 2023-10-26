import { createSlice, PayloadAction } from "@reduxjs/toolkit";
import { IProject } from "../../models/IProject/IProject.ts";
import {
  createProject,
  deleteProject,
  fetchProjects,
  fetchProjectUsers,
  updateProject,
} from "./projectsThunks.ts";
import { ICompressedUser } from "../../models/IUser/IUser.ts";
import { IError } from "../../models/reducers/global.types.ts";

interface IState {
  data: IProject[];
  availableUsers: ICompressedUser[];
  errors: IError | null;
  isLoading: boolean;
  isFirstLoading: boolean;
}

const initialState: IState = {
  data: [],
  availableUsers: [],
  errors: null,
  isLoading: false,
  isFirstLoading: true,
};

const projectsSlice = createSlice({
  name: "projects",
  initialState,
  reducers: {
    setProjectsError: (state, action: PayloadAction<IError | null>) => {
      state.errors = action.payload;
    },
  },
  extraReducers: (builder) => {
    builder.addCase(fetchProjects.pending, (state) => {
      state.isLoading = true;
      state.errors = null;
    });
    builder.addCase(fetchProjects.fulfilled, (state, action) => {
      state.data = action.payload;
      state.isLoading = false;
      state.isFirstLoading = false;
    });
    builder.addCase(fetchProjects.rejected, (state, action) => {
      state.isLoading = false;
      state.isFirstLoading = false;
      state.errors = action.payload as IError;
    });
    builder.addCase(createProject.pending, (state) => {
      state.isLoading = true;
      state.errors = null;
    });
    builder.addCase(createProject.fulfilled, (state, action) => {
      state.data = action.payload;
      state.isLoading = false;
    });
    builder.addCase(createProject.rejected, (state, action) => {
      state.isLoading = false;
      state.errors = action.payload as IError;
    });
    builder.addCase(deleteProject.pending, (state) => {
      state.isLoading = true;
      state.errors = null;
    });
    builder.addCase(deleteProject.fulfilled, (state, action) => {
      state.data = action.payload;
      state.isLoading = false;
    });
    builder.addCase(deleteProject.rejected, (state, action) => {
      state.isLoading = false;
      state.errors = action.payload as IError;
    });
    builder.addCase(updateProject.pending, (state) => {
      state.isLoading = true;
      state.errors = null;
    });
    builder.addCase(updateProject.fulfilled, (state, action) => {
      state.data = action.payload;
      state.isLoading = false;
    });
    builder.addCase(updateProject.rejected, (state, action) => {
      state.isLoading = false;
      state.errors = action.payload as IError;
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
      state.errors = action.payload as IError;
    });
  },
});

export default projectsSlice.reducer;

export const { setProjectsError } = projectsSlice.actions;

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
import { IErrors } from "../../models/reducers/global.types.ts";

interface IState {
  projects: IProject[];
  selectedProject: IProject | null;
  availableUsers: ICompressedUser[];
  errors: IErrors | null;
  isLoading: boolean;
  isFirstLoading: boolean;
}

const initialState: IState = {
  projects: [],
  selectedProject: null,
  availableUsers: [],
  errors: null,
  isLoading: false,
  isFirstLoading: true,
};

const projectsSlice = createSlice({
  name: "projects",
  initialState,
  reducers: {
    setSelectedProject(state, action: PayloadAction<IProject | null>) {
      state.selectedProject = action.payload;
    },
  },
  extraReducers: (builder) => {
    builder.addCase(fetchProjects.pending, (state) => {
      state.isLoading = true;
      state.errors = null;
    });
    builder.addCase(fetchProjects.fulfilled, (state, action) => {
      state.projects = action.payload;
      state.isLoading = false;
      state.isFirstLoading = false;
    });
    builder.addCase(fetchProjects.rejected, (state, action) => {
      state.isLoading = false;
      state.isFirstLoading = false;
      state.errors = action.payload as IErrors;
    });
    builder.addCase(createProject.pending, (state) => {
      state.isLoading = true;
      state.errors = null;
    });
    builder.addCase(createProject.fulfilled, (state, action) => {
      state.projects = action.payload;
      state.isLoading = false;
    });
    builder.addCase(createProject.rejected, (state, action) => {
      state.isLoading = false;
      state.errors = action.payload as IErrors;
    });
    builder.addCase(deleteProject.pending, (state) => {
      state.isLoading = true;
      state.errors = null;
    });
    builder.addCase(deleteProject.fulfilled, (state, action) => {
      state.projects = action.payload;
      state.isLoading = false;
    });
    builder.addCase(deleteProject.rejected, (state, action) => {
      state.isLoading = false;
      state.errors = action.payload as IErrors;
    });
    builder.addCase(updateProject.pending, (state) => {
      state.isLoading = true;
      state.errors = null;
    });
    builder.addCase(updateProject.fulfilled, (state, action) => {
      state.projects = action.payload;
      state.isLoading = false;
    });
    builder.addCase(updateProject.rejected, (state, action) => {
      state.isLoading = false;
      state.errors = action.payload as IErrors;
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
      state.errors = action.payload as IErrors;
    });
  },
});

export default projectsSlice.reducer;
export const { setSelectedProject } = projectsSlice.actions;

import { createAsyncThunk } from "@reduxjs/toolkit";
import api from "../../services/api.ts";
import {
  IProject,
  IProjectCreate,
  IProjectUpdate,
} from "../../models/IProject/IProject.ts";
import { ICompressedUser } from "../../models/IUser/IUser.ts";
import { AdditionalCallbacks } from "../../models/reducers/index.types.ts";
import ProjectsApi from "../../services/Api/projects/ProjectsApi.ts";

export const fetchProjects = createAsyncThunk<IProject[], void>(
  "projects/fetch",
  async (_, thunkAPI) => {
    try {
      const res = await ProjectsApi.getProjects();
      return res.data;
    } catch (err: any) {
      return thunkAPI.rejectWithValue(err.response.data.errors);
    }
  },
);

export const createProject = createAsyncThunk<
  IProject[],
  { data: IProjectCreate; callbacks: AdditionalCallbacks }
>(
  "projects/create",
  async ({ data, callbacks: { onSuccess, onError } }, thunkAPI) => {
    try {
      const res = await ProjectsApi.createProject(data);
      onSuccess && onSuccess();
      return res.data;
    } catch (err: any) {
      onError && onError();
      return thunkAPI.rejectWithValue(err.response.data.errors);
    }
  },
);

export const updateProject = createAsyncThunk<
  IProject[],
  { data: IProjectUpdate; callbacks: AdditionalCallbacks }
>(
  "projects/update",
  async ({ data, callbacks: { onSuccess, onError } }, thunkAPI) => {
    try {
      const res = await ProjectsApi.updateProject(data.id, data);
      onSuccess && onSuccess();
      return res.data;
    } catch (err: any) {
      onError && onError();
      return thunkAPI.rejectWithValue(err.response.data.errors);
    }
  },
);

export const deleteProject = createAsyncThunk<
  IProject[],
  { projectId: number; callbacks: AdditionalCallbacks }
>(
  "projects/delete",
  async ({ projectId, callbacks: { onSuccess, onError } }, thunkAPI) => {
    try {
      const res = await ProjectsApi.deleteProject(projectId);
      onSuccess && onSuccess();
      return res.data;
    } catch (err: any) {
      onError && onError();
      return thunkAPI.rejectWithValue(err.response.data.errors);
    }
  },
);

export const fetchProjectUsers = createAsyncThunk<ICompressedUser[], void>(
  "projects/users",
  async (_, thunkAPI) => {
    try {
      const res = await ProjectsApi.getProjectUsers();
      return res.data;
    } catch (err: any) {
      return thunkAPI.rejectWithValue(err.response.data);
    }
  },
);

import { createAsyncThunk } from "@reduxjs/toolkit";
import api from "../../services/api.ts";
import { IProject, IProjectCreate } from "../../models/IProject/IProject.ts";
import { ICompressedUser } from "../../models/IUser/IUser.ts";

export const fetchProjects = createAsyncThunk<IProject[], void>(
  "projects/fetch",
  async (_, thunkAPI) => {
    try {
      const res = await api.get("projects");
      return res.data;
    } catch (err) {
      thunkAPI.rejectWithValue(err);
    }
  },
);

export const createProject = createAsyncThunk<IProject[], IProjectCreate>(
  "projects/create",
  async (newProject, thunkAPI) => {
    try {
      const res = await api.post("projects", newProject);
      return res.data;
    } catch (err) {
      thunkAPI.rejectWithValue(err);
    }
  },
);

export const fetchProjectUsers = createAsyncThunk<ICompressedUser[], void>(
  "projects/users",
  async (_, thunkAPI) => {
    try {
      const res = await api.get("projects/users");
      return res.data;
    } catch (err) {
      thunkAPI.rejectWithValue(err);
    }
  },
);

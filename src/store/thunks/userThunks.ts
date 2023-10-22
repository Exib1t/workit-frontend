import { createAsyncThunk } from "@reduxjs/toolkit";
import { IUser } from "../../models/IUser/IUser.ts";
import api from "../../services/api.ts";

export const fetchUserById = createAsyncThunk<IUser, number>(
  "user/fetchUserById",
  async (userId, thunkAPI) => {
    try {
      const res = await api.get(`users/${userId}`);
      return res.data;
    } catch (err) {
      thunkAPI.rejectWithValue(err);
    }
  },
);

import { createAsyncThunk } from "@reduxjs/toolkit";
import { IUser } from "../../models/IUser/IUser.ts";
import UserApi from "../../services/Api/user/UserApi.ts";

export const fetchUserById = createAsyncThunk<IUser, number>(
  "user/fetchUserById",
  async (userId, thunkAPI) => {
    try {
      const res = await UserApi.getUserById(userId);
      return res.data;
    } catch (err) {
      thunkAPI.rejectWithValue(err);
    }
  },
);

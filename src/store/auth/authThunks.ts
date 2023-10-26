import { createAsyncThunk } from "@reduxjs/toolkit";
import {
  IRefreshUser,
  IToken,
  IUserCreate,
  IUserLogin,
} from "../../models/IUser/IUser.ts";
import api from "../../services/api.ts";
import { AxiosResponse } from "axios";

export const registerThunk = createAsyncThunk<IToken, IUserCreate>(
  "auth/register",
  async (data, thunkAPI) => {
    try {
      const response: AxiosResponse<IToken> = await api.post(
        "auth/register",
        data,
      );
      localStorage.setItem("token", response.data.token);
      return response.data;
    } catch (err: any) {
      return thunkAPI.rejectWithValue(err.response.data.errors);
    }
  },
);

export const loginThunk = createAsyncThunk<IToken, IUserLogin>(
  "auth/login",
  async (data, thunkAPI) => {
    try {
      const response: AxiosResponse<IToken> = await api.post(
        "auth/login",
        data,
      );
      localStorage.setItem("token", response.data.token);
      return response.data;
    } catch (err: any) {
      return thunkAPI.rejectWithValue(err.response.data.errors);
    }
  },
);

export const refreshThunk = createAsyncThunk<IRefreshUser, IToken>(
  "auth/refresh",
  async (data, thunkAPI) => {
    try {
      const response: AxiosResponse<IRefreshUser> = await api.get(
        "auth/refresh",
        { data },
      );
      return response.data;
    } catch (err: any) {
      return thunkAPI.rejectWithValue(err.response.data.errors);
    }
  },
);

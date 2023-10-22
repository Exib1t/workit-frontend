import { createAsyncThunk } from "@reduxjs/toolkit";
import api from "../../services/api.ts";
import {
  IIssue,
  IIssueCreate,
  IIssueUpdate,
  IssueUpdateTime,
} from "../../models/IIssue/IIssue.ts";
import { AxiosResponse } from "axios";
import { AdditionalCallbacks } from "../../models/reducers/index.types.ts";

export const fetchIssuesByProjectId = createAsyncThunk<
  { issues: IIssue[]; projectId: number },
  number
>("issues/fetchByProjectId", async (projectId, thunkAPI) => {
  try {
    const data: AxiosResponse<IIssue[]> = await api.get(
      `issues/project/${projectId}`,
    );

    return {
      projectId,
      issues: data.data,
    };
  } catch (err: any) {
    thunkAPI.rejectWithValue(err.response.data);
  }
});

export const createIssue = createAsyncThunk<
  IIssue,
  { data: IIssueCreate; callbacks: AdditionalCallbacks }
>(
  "issues/createIssue",
  async ({ data, callbacks: { onSuccess, onError } }, thunkAPI) => {
    try {
      const response = await api.post(`issues`, data);
      onSuccess && onSuccess();
      return response.data;
    } catch (err: any) {
      onError && onError();
      thunkAPI.rejectWithValue(err.response.data);
    }
  },
);

export const updateIssue = createAsyncThunk<
  IIssue,
  { updatedIssue: IIssueUpdate; callbacks: AdditionalCallbacks }
>(
  "issues/updateIssue",
  async ({ updatedIssue, callbacks: { onSuccess, onError } }, thunkAPI) => {
    try {
      const response = await api.patch(
        `issues/${updatedIssue.id}`,
        updatedIssue,
      );
      onSuccess && onSuccess();
      return response.data;
    } catch (err: any) {
      onError && onError();
      thunkAPI.rejectWithValue(err.response.data);
    }
  },
);

export const deleteIssue = createAsyncThunk<
  IIssue,
  { issueId: number; callbacks: AdditionalCallbacks }
>(
  "issues/deleteIssue",
  async ({ issueId, callbacks: { onSuccess, onError } }, thunkAPI) => {
    try {
      const response = await api.delete(`issues/${issueId}`);
      onSuccess && onSuccess();
      return response.data;
    } catch (err: any) {
      onError && onError();
      thunkAPI.rejectWithValue(err.response.data);
    }
  },
);

export const logIssueTime = createAsyncThunk<
  IIssue,
  {
    data: { link: string; time: IssueUpdateTime };
    callbacks: AdditionalCallbacks;
  }
>(
  "issues/deleteIssue",
  async ({ data, callbacks: { onSuccess, onError } }, thunkAPI) => {
    try {
      const response = await api.post(`issues/${data.link}/time`, {
        time: data.time,
      });
      onSuccess && onSuccess();
      return response.data;
    } catch (err: any) {
      onError && onError();
      thunkAPI.rejectWithValue(err.response.data);
    }
  },
);

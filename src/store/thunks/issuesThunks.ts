import { createAsyncThunk } from "@reduxjs/toolkit";
import api from "../../services/api.ts";
import { IIssue, IIssueCreate } from "../../models/IIssue/IIssue.ts";
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
  "issues/fetchByProjectId",
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

export const deleteIssue = createAsyncThunk<
  IIssue,
  { issueId: number; callbacks: AdditionalCallbacks }
>(
  "issues/fetchByProjectId",
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

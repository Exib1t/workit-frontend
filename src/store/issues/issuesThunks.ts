import { createAsyncThunk } from "@reduxjs/toolkit";
import api from "../../services/api.ts";
import {
  IIssue,
  IIssueCreate,
  IIssueUpdate,
  IssueUpdateTime,
} from "../../models/IIssue/IIssue.ts";
import { AdditionalCallbacks } from "../../models/reducers/index.types.ts";
import { ICompressedUser } from "../../models/IUser/IUser.ts";
import IssuesApi from "../../services/Api/issues/IssuesApi.ts";

export const fetchIssuesByProjectId = createAsyncThunk<IIssue[], number>(
  "issues/fetchByProjectId",
  async (projectId, thunkAPI) => {
    try {
      const response = await IssuesApi.getIssuesByProjectId(projectId);

      return response.data;
    } catch (err: any) {
      thunkAPI.rejectWithValue(err.response.data.errors);
    }
  },
);

export const createIssue = createAsyncThunk<
  IIssue[],
  { data: IIssueCreate; callbacks: AdditionalCallbacks }
>(
  "issues/createIssue",
  async ({ data, callbacks: { onSuccess, onError } }, thunkAPI) => {
    try {
      const response = await IssuesApi.createIssue(data.projectId, data);
      onSuccess && onSuccess();
      return response.data;
    } catch (err: any) {
      onError && onError();
      thunkAPI.rejectWithValue(err.response.data.errors);
    }
  },
);

export const updateIssue = createAsyncThunk<
  IIssue[],
  {
    projectId: number;
    updatedIssue: IIssueUpdate;
    callbacks: AdditionalCallbacks;
  }
>(
  "issues/updateIssue",
  async (
    { projectId, updatedIssue, callbacks: { onSuccess, onError } },
    thunkAPI,
  ) => {
    try {
      const response = await IssuesApi.updateIssue(projectId, updatedIssue.id, updatedIssue);
      onSuccess && onSuccess();
      return response.data;
    } catch (err: any) {
      onError && onError();
      thunkAPI.rejectWithValue(err.response.data.errors);
    }
  },
);

export const deleteIssue = createAsyncThunk<
  IIssue[],
  { projectId: number; issueId: number; callbacks: AdditionalCallbacks }
>(
  "issues/deleteIssue",
  async (
    { projectId, issueId, callbacks: { onSuccess, onError } },
    thunkAPI,
  ) => {
    try {
      const response = await IssuesApi.deleteIssue(projectId, issueId);
      onSuccess && onSuccess();
      return response.data;
    } catch (err: any) {
      onError && onError();
      thunkAPI.rejectWithValue(err.response.data.errors);
    }
  },
);

export const logIssueTime = createAsyncThunk<
  IIssue[],
  {
    projectId: number;
    data: { id: number; time: IssueUpdateTime };
    callbacks: AdditionalCallbacks;
  }
>(
  "issues/logIssueTime",
  async ({ projectId, data, callbacks: { onSuccess, onError } }, thunkAPI) => {
    try {
      const response = await IssuesApi.logIssueTime(projectId, data.id, {time: data.time});
      onSuccess && onSuccess();
      return response.data;
    } catch (err: any) {
      onError && onError();
      thunkAPI.rejectWithValue(err.response.data.errors);
    }
  },
);

export const fetchIssueAvailableAssignments = createAsyncThunk<
  ICompressedUser[],
  {
    id: number;
    projectId: number;
    callbacks: AdditionalCallbacks;
  }
>(
  "issues/fetchIssueAvailableAssignments",
  async ({ id, projectId, callbacks: { onSuccess, onError } }, thunkAPI) => {
    try {
      const response = await IssuesApi.getIssueAvailableAssignments(projectId, id);
      onSuccess && onSuccess();
      return response.data;
    } catch (err: any) {
      onError && onError();
      thunkAPI.rejectWithValue(err.response.data.errors);
    }
  },
);

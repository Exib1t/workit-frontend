import { createAsyncThunk } from "@reduxjs/toolkit";
import {
  IComment,
  ICommentCreate,
  ICommentUpdate,
} from "../../models/IComment/IComment.ts";
import api from "../../services/api.ts";
import { AdditionalCallbacks } from "../../models/reducers/index.types.ts";
import CommentsApi from "../../services/Api/comments/CommentsApi.ts";

export const fetchCommentsByIssueId = createAsyncThunk<
  IComment[],
  { issueId: number; projectId: number }
>(
  "comments/fetchCommentsByIssueId",
  async ({ issueId, projectId }, thunkAPI) => {
    try {
      const response = await CommentsApi.getCommentsByIssueId(projectId, issueId);

      return response.data;
    } catch (err: any) {
      return thunkAPI.rejectWithValue(err.response.data.errors);
    }
  },
);

export const createComment = createAsyncThunk<
  IComment[],
  {
    projectId: number;
    issueId: number;
    data: ICommentCreate;
    callbacks: AdditionalCallbacks;
  }
>(
  "comments/createComment",
  async (
    { projectId, issueId, data, callbacks: { onSuccess, onError } },
    thunkAPI,
  ) => {
    try {
      const response = await CommentsApi.createComment(projectId, issueId, data);
      onSuccess && onSuccess();
      return response.data;
    } catch (err: any) {
      onError && onError();
      thunkAPI.rejectWithValue(err.response.data.errors);
    }
  },
);

export const updateComment = createAsyncThunk<
  IComment[],
  {
    projectId: number;
    issueId: number;
    updatedComment: ICommentUpdate;
    callbacks: AdditionalCallbacks;
  }
>(
  "comments/updateComment",
  async (
    { projectId, issueId, updatedComment, callbacks: { onSuccess, onError } },
    thunkAPI,
  ) => {
    try {
      const response = await CommentsApi.updateComment(projectId, issueId, updatedComment.id, updatedComment);
      onSuccess && onSuccess();
      return response.data;
    } catch (err: any) {
      onError && onError();
      thunkAPI.rejectWithValue(err.response.data.errors);
    }
  },
);

export const deleteComment = createAsyncThunk<
  IComment[],
  {
    projectId: number;
    issueId: number;
    commentId: number;
    callbacks: AdditionalCallbacks;
  }
>(
  "comments/deleteComment",
  async (
    { projectId, issueId, commentId, callbacks: { onSuccess, onError } },
    thunkAPI,
  ) => {
    try {
      const response = await CommentsApi.deleteComment(projectId, issueId, commentId);
      onSuccess && onSuccess();
      return response.data;
    } catch (err: any) {
      onError && onError();
      thunkAPI.rejectWithValue(err.response.data.errors);
    }
  },
);

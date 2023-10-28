import { createSlice } from "@reduxjs/toolkit";
import { IComment } from "../../models/IComment/IComment.ts";
import { IErrors } from "../../models/reducers/global.types.ts";
import {
  createComment,
  deleteComment,
  fetchCommentsByIssueId,
  updateComment,
} from "./commentsThunk.ts";

interface IState {
  comments: IComment[];
  errors: IErrors | null;
  isLoading: boolean;
  isFirstLoading: boolean;
}

const initialState: IState = {
  comments: [],
  errors: null,
  isLoading: false,
  isFirstLoading: true,
};

const commentsSlice = createSlice({
  name: "comments",
  initialState,
  reducers: {},
  extraReducers: (builder) => {
    builder.addCase(fetchCommentsByIssueId.pending, (state) => {
      state.errors = null;
      state.isLoading = true;
    });
    builder.addCase(fetchCommentsByIssueId.fulfilled, (state, action) => {
      state.comments = action.payload || [];
      state.errors = null;
      state.isLoading = false;
      state.isFirstLoading = false;
    });
    builder.addCase(fetchCommentsByIssueId.rejected, (state, action) => {
      state.errors = action.payload as IErrors;
      state.isLoading = false;
      state.isFirstLoading = false;
    });
    builder.addCase(createComment.pending, (state) => {
      state.errors = null;
      state.isLoading = true;
    });
    builder.addCase(createComment.fulfilled, (state, action) => {
      state.comments = action.payload;
      state.errors = null;
      state.isLoading = false;
    });
    builder.addCase(createComment.rejected, (state, action) => {
      state.errors = action.payload as IErrors;
      state.isLoading = false;
    });
    builder.addCase(updateComment.pending, (state) => {
      state.errors = null;
      state.isLoading = true;
    });
    builder.addCase(updateComment.fulfilled, (state, action) => {
      state.comments = action.payload;
      state.errors = null;
      state.isLoading = false;
    });
    builder.addCase(updateComment.rejected, (state, action) => {
      state.errors = action.payload as IErrors;
      state.isLoading = false;
    });
    builder.addCase(deleteComment.pending, (state) => {
      state.errors = null;
      state.isLoading = true;
    });
    builder.addCase(deleteComment.fulfilled, (state, action) => {
      state.comments = action.payload;
      state.errors = null;
      state.isLoading = false;
    });
    builder.addCase(deleteComment.rejected, (state, action) => {
      state.errors = action.payload as IErrors;
      state.isLoading = false;
    });
  },
});

export default commentsSlice.reducer;
export const {} = commentsSlice.actions;

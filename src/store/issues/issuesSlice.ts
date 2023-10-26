import { createSlice, PayloadAction } from "@reduxjs/toolkit";
import {
  createIssue,
  deleteIssue,
  fetchIssueAvailableAssignments,
  fetchIssuesByProjectId,
  logIssueTime,
  updateIssue,
} from "./issuesThunks.ts";
import { IIssue } from "../../models/IIssue/IIssue.ts";
import { ICompressedUser } from "../../models/IUser/IUser.ts";
import { IError } from "../../models/reducers/global.types.ts";

interface IState {
  issues: IIssue[];
  editorsData: {
    assignments: {
      loading: boolean;
      data: ICompressedUser[];
      error: any | null;
    };
  };
  projectId: number | null;
  errors: IError | null;
  isLoading: boolean;
  isFirstLoading: boolean;
}

const initialState: IState = {
  issues: [],
  projectId: null,
  editorsData: {
    assignments: {
      loading: false,
      data: [],
      error: null,
    },
  },
  errors: null,
  isLoading: false,
  isFirstLoading: true,
};

const issuesSlice = createSlice({
  name: "issues",
  initialState,
  reducers: {
    setIssuesError: (state, action: PayloadAction<IError | null>) => {
      state.errors = action.payload;
    },
  },
  extraReducers: (builder) => {
    builder.addCase(fetchIssuesByProjectId.pending, (state) => {
      state.isLoading = true;
      state.issues = [];
      state.errors = null;
    });
    builder.addCase(fetchIssuesByProjectId.fulfilled, (state, action) => {
      state.issues = action.payload.issues || [];
      state.projectId = action.payload.projectId;
      state.errors = null;
      state.isLoading = false;
      state.isFirstLoading = false;
    });
    builder.addCase(fetchIssuesByProjectId.rejected, (state, action) => {
      state.errors = action.payload as IError;
      state.isLoading = false;
      state.isFirstLoading = false;
    });
    builder.addCase(fetchIssueAvailableAssignments.pending, (state) => {
      state.editorsData.assignments.loading = true;
      state.editorsData.assignments.error = null;
    });
    builder.addCase(updateIssue.pending, (state) => {
      state.isLoading = true;
      state.errors = null;
    });
    builder.addCase(updateIssue.fulfilled, (state, action) => {
      state.issues = action.payload;
      state.errors = null;
      state.isLoading = false;
    });
    builder.addCase(updateIssue.rejected, (state, action) => {
      state.errors = action.payload as IError;
      state.isLoading = false;
    });
    builder.addCase(logIssueTime.pending, (state) => {
      state.isLoading = true;
      state.errors = null;
    });
    builder.addCase(logIssueTime.fulfilled, (state, action) => {
      state.issues = action.payload;
      state.errors = null;
      state.isLoading = false;
    });
    builder.addCase(logIssueTime.rejected, (state, action) => {
      state.errors = action.payload as IError;
      state.isLoading = false;
    });
    builder.addCase(deleteIssue.pending, (state) => {
      state.isLoading = true;
      state.errors = null;
    });
    builder.addCase(deleteIssue.fulfilled, (state, action) => {
      state.issues = action.payload;
      state.errors = null;
      state.isLoading = false;
    });
    builder.addCase(deleteIssue.rejected, (state, action) => {
      state.errors = action.payload as IError;
      state.isLoading = false;
    });
    builder.addCase(createIssue.pending, (state) => {
      state.isLoading = true;
      state.errors = null;
    });
    builder.addCase(createIssue.fulfilled, (state, action) => {
      state.issues = action.payload;
      state.errors = null;
      state.isLoading = false;
    });
    builder.addCase(createIssue.rejected, (state, action) => {
      state.errors = action.payload as IError;
      state.isLoading = false;
    });
    builder.addCase(
      fetchIssueAvailableAssignments.fulfilled,
      (state, action) => {
        state.editorsData.assignments.data = action.payload;
        state.editorsData.assignments.loading = false;
        state.editorsData.assignments.error = null;
      },
    );
    builder.addCase(
      fetchIssueAvailableAssignments.rejected,
      (state, action) => {
        state.editorsData.assignments.loading = false;
        state.editorsData.assignments.error = action.payload;
      },
    );
  },
});

export default issuesSlice.reducer;
export const { setIssuesError } = issuesSlice.actions;

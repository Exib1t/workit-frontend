import { createSlice, PayloadAction } from "@reduxjs/toolkit";
import { AuthError } from "../../models/reducers/auth.types.ts";
import {
  fetchIssueAvailableAssignments,
  fetchIssuesByProjectId,
} from "./issuesThunks.ts";
import { IIssue } from "../../models/IIssue/IIssue.ts";
import { ICompressedUser } from "../../models/IUser/IUser.ts";

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
  errors: AuthError | null;
  isLoading: boolean;
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
};

const issuesSlice = createSlice({
  name: "issues",
  initialState,
  reducers: {
    setIssuesError: (state, action: PayloadAction<AuthError | null>) => {
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
    });
    builder.addCase(fetchIssuesByProjectId.rejected, (state, action) => {
      state.errors = action.payload as AuthError;
      state.isLoading = false;
    });
    builder.addCase(fetchIssueAvailableAssignments.pending, (state) => {
      state.editorsData.assignments.loading = true;
      state.editorsData.assignments.error = null;
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

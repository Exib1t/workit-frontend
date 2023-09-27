import { createSlice, PayloadAction } from "@reduxjs/toolkit";
import { AuthError } from "../../models/reducers/auth.types.ts";
import { fetchIssuesByProjectId } from "../thunks/issuesThunks.ts";
import { IIssue } from "../../models/IIssue/IIssue.ts";

interface IState {
  issues: IIssue[];
  projectId: number | null;
  errors: AuthError | null;
  isLoading: boolean;
}

const initialState: IState = {
  issues: [],
  projectId: null,
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
  },
});

export default issuesSlice.reducer;
export const { setIssuesError } = issuesSlice.actions;

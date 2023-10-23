import { configureStore } from "@reduxjs/toolkit";
import { TypedUseSelectorHook, useDispatch, useSelector } from "react-redux";
import globalSlice from "./global/globalSlice.ts";
import authSlice from "./auth/authSlice.ts";
import projectsSlice from "./projects/projectsSlice.ts";
import issuesSlice from "./issues/issuesSlice.ts";
import userSlice from "./user/userSlice.ts";

export const store = configureStore({
  reducer: {
    global: globalSlice,
    auth: authSlice,
    projects: projectsSlice,
    issues: issuesSlice,
    user: userSlice,
  },
});

export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;
export const useAppDispatch: () => AppDispatch = useDispatch;
export const useAppSelector: TypedUseSelectorHook<RootState> = useSelector;

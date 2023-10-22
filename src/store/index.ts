import { configureStore } from "@reduxjs/toolkit";
import { TypedUseSelectorHook, useDispatch, useSelector } from "react-redux";
import globalSlice from "./reducers/globalSlice.ts";
import authSlice from "./reducers/authSlice.ts";
import projectsSlice from "./reducers/projectsSlice.ts";
import issuesSlice from "./reducers/issuesSlice.ts";
import userSlice from "./reducers/userSlice.ts";

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

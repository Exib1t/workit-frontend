import { configureStore } from "@reduxjs/toolkit";
import { TypedUseSelectorHook, useDispatch, useSelector } from "react-redux";
import globalSlice from "./reducers/globalSlice.ts";
import authSlice from "./reducers/authSlice.ts";
import projectsSlice from "./reducers/projectsSlice.ts";

export const store = configureStore({
  reducer: { global: globalSlice, auth: authSlice, projects: projectsSlice },
});

export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;
export const useAppDispatch: () => AppDispatch = useDispatch;
export const useAppSelector: TypedUseSelectorHook<RootState> = useSelector;

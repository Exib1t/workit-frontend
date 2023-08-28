import { Navigate, Route, Routes } from "react-router-dom";
import Layout from "./Layout.tsx";
import SignInPage from "../components/pages/SignInPage/SignInPage.tsx";
import SignUpPage from "../components/pages/SignUpPage/SignUpPage.tsx";
import { AppRoutes } from "./Routes.ts";
import useAuthenticated from "../hooks/useAuthenticated.tsx";
import useThemeClass from "../hooks/useThemeClass.ts";
import "../components/control/InputCustom/InputStyles.scss";
import { useEffect } from "react";
import { useAppDispatch, useAppSelector } from "../store";
import { refreshThunk } from "../store/thunks/authThunks.ts";
import { setToken } from "../store/reducers/authSlice.ts";
import { Box, LinearProgress } from "@mui/material";
import ProjectsPage from "../components/pages/ProjectsPage/ProjectsPage.tsx";
import { setTheme } from "../store/reducers/globalSlice.ts";

const AppRouter = () => {
  const isAuthenticated = useAuthenticated();
  const dispatch = useAppDispatch();
  const { token, isLoading } = useAppSelector((state) => state.auth);
  const themeClass = useThemeClass("b-container");

  useEffect(() => {
    const token = localStorage.getItem("token");
    const theme = localStorage.getItem("theme");
    if (token) {
      dispatch(setToken(token));
    }
    if (theme === "light" || theme === "dark") {
      dispatch(setTheme(theme));
    }
  }, [dispatch]);

  useEffect(() => {
    if (token) {
      dispatch(refreshThunk({ token }));
    }
  }, [dispatch, token]);

  const privateRoutes = () => (
    <>
      <Route index element={<Navigate to={AppRoutes.projects} />} />
      <Route path={AppRoutes.projects} element={<ProjectsPage />} />
      <Route path="*" element={<Navigate to={AppRoutes.projects} />} />
    </>
  );
  const authRoutes = () => (
    <>
      <Route index element={<Navigate to={AppRoutes.signIn} />} />
      <Route path={AppRoutes.signIn} element={<SignInPage />} />
      <Route path={AppRoutes.signUp} element={<SignUpPage />} />
      <Route path="*" element={<Navigate to={AppRoutes.signIn} />} />
    </>
  );

  return (
    <div className={themeClass}>
      <Box className={`b-loader ${isLoading ? "" : "-hidden"}`}>
        <LinearProgress />
      </Box>
      <Routes>
        <Route path="/" element={<Layout />}>
          {isAuthenticated ? privateRoutes() : authRoutes()}
        </Route>
      </Routes>
    </div>
  );
};
export default AppRouter;

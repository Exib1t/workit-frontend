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
import ProjectsPage from "../components/pages/ProjectsPage/ProjectsPage.tsx";
import { setTheme } from "../store/reducers/globalSlice.ts";
import ComponentsPage from "../components/pages/ComponentsPage/ComponentsPage.tsx";
import ProjectPage from "../components/pages/ProjectPage/ProjectPage.tsx";
import NotFoundPage from "../components/pages/NotFoundPage/NotFoundPage.tsx";
import IssuesPage from "../components/pages/IssuesPage/IssuesPage.tsx";
import IssuePage from "../components/pages/IssuePage/IssuePage.tsx";
import Page from "../components/common/Page/Page.tsx";

const AppRouter = () => {
  const { isAuthenticated, isLoading } = useAuthenticated();
  const dispatch = useAppDispatch();
  const { token } = useAppSelector((state) => state.auth);
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

  useEffect(() => {
    document.body.className = themeClass;
  }, [themeClass]);

  const privateRoutes = () => (
    <>
      <Route index element={<Navigate to={AppRoutes.projects} />} />
      <Route path={AppRoutes.projects} element={<ProjectsPage />} />
      <Route path={AppRoutes.project} element={<ProjectPage />} />
      <Route path={AppRoutes.issues} element={<IssuesPage />} />
      <Route path={AppRoutes.issue} element={<IssuePage />} />
      <Route path="*" element={<NotFoundPage />} />
    </>
  );
  const authRoutes = () => (
    <>
      <Route index element={<Navigate to={AppRoutes.signIn} />} />
      <Route path={AppRoutes.signIn} element={<SignInPage />} />
      <Route path={AppRoutes.signUp} element={<SignUpPage />} />
      <Route path="*" element={<NotFoundPage />} />
    </>
  );

  const publicRoutes = () => (
    <>
      <Route path={AppRoutes.components} element={<ComponentsPage />} />
    </>
  );

  if (isLoading) return <Page>Loading</Page>;

  return (
    <div className={themeClass}>
      <Routes>
        <Route path="/" element={<Layout />}>
          {isAuthenticated ? privateRoutes() : authRoutes()}
          {publicRoutes()}
        </Route>
      </Routes>
    </div>
  );
};
export default AppRouter;

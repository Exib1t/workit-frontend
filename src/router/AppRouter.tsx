import { Navigate, Route, Routes } from "react-router-dom";
import Layout from "./Layout.tsx";
import SignInPage from "../components/pages/SignInPage/SignInPage.tsx";
import SignUpPage from "../components/pages/SignUpPage/SignUpPage.tsx";
import { AppRoutes } from "./Routes.ts";
import useAuthenticated from "../hooks/useAuthenticated.tsx";
import useThemeClass from "../hooks/useThemeClass.ts";
import { useEffect, useState } from "react";
import { useAppDispatch, useAppSelector } from "../store";
import { refreshThunk } from "../store/auth/authThunks.ts";
import { setToken } from "../store/auth/authSlice.ts";
import ProjectsPage from "../components/pages/ProjectsPage/ProjectsPage.tsx";
import { setTheme } from "../store/global/globalSlice.ts";
import ComponentsPage from "../components/pages/ComponentsPage/ComponentsPage.tsx";
import ProjectPage from "../components/pages/ProjectPage/ProjectPage.tsx";
import IssuesPage from "../components/pages/IssuesPage/IssuesPage.tsx";
import IssuePage from "../components/pages/IssuePage/IssuePage.tsx";
import { fetchUserById } from "../store/user/userThunks.ts";
import { clearUser } from "../store/user/userSlice.ts";
import BacklogPage from "../components/pages/BacklogPage/BacklogPage.tsx";
import ProjectPlanning from "../components/pages/ProjectPlanning/ProjectPlanning.tsx";

const AppRouter = () => {
  const { isAuthenticated } = useAuthenticated();
  const dispatch = useAppDispatch();
  const { token, id } = useAppSelector((state) => state.auth);
  const [isLoaded, setIsLoaded] = useState(false);
  const themeClass = useThemeClass("b-container");


  useEffect(() => {
    const token = localStorage.getItem("token");
    const theme = localStorage.getItem("theme");
    if (token) {
      dispatch(setToken(token));
    } else {
      setIsLoaded(true);
    }
    if (theme === "light" || theme === "dark") {
      dispatch(setTheme(theme));
    }
  }, [dispatch]);

  useEffect(() => {
    if (token) {
      dispatch(refreshThunk({ token }))
        .unwrap()
        .finally(() => {
          setIsLoaded(true);
        });
    }
  }, [dispatch, token]);

  useEffect(() => {
    if (id) {
      dispatch(fetchUserById(id));
    } else {
      dispatch(clearUser());
    }
  }, [dispatch, id]);

  useEffect(() => {
    document.body.className = themeClass;
  }, [themeClass]);

  const privateRoutes = () => (
    <>
      <Route index element={<Navigate to={AppRoutes.projects} />} />
      <Route path={AppRoutes.projects} element={<ProjectsPage />} />
      <Route path={AppRoutes.project} element={<ProjectPage />} />
      <Route path={AppRoutes.projectPlanning} element={<ProjectPlanning />} />
      <Route path={AppRoutes.projectBacklog} element={<BacklogPage />} />
      <Route path={AppRoutes.issues} element={<IssuesPage />} />
      <Route path={AppRoutes.issue} element={<IssuePage />} />
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

  const publicRoutes = () => (
    <>
      <Route path={AppRoutes.components} element={<ComponentsPage />} />
    </>
  );

  return (
    <div className={themeClass}>
      <Routes>
        <Route path="/" element={<Layout />}>
          {isLoaded && <>{isAuthenticated ? privateRoutes() : authRoutes()}</>}
          {publicRoutes()}
        </Route>
      </Routes>
    </div>
  );
};
export default AppRouter;

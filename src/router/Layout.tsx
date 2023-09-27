import Header from "../components/common/Header/Header.tsx";
import { Outlet } from "react-router-dom";
import { useAppSelector } from "../store";
import { Box, LinearProgress } from "@mui/material";
import ErrorModal from "../components/common/ErrorModal/ErrorModal.tsx";

const Layout = () => {
  const { isLoading: isLoadingAuth } = useAppSelector((state) => state.auth);
  const { isLoading: isLoadingProjects } = useAppSelector(
    (state) => state.projects,
  );
  const { isLoading: isLoadingGlobal } = useAppSelector(
    (state) => state.global,
  );
  const { isLoading: isLoadingIssues } = useAppSelector(
    (state) => state.issues,
  );

  const isLoading =
    isLoadingAuth || isLoadingProjects || isLoadingGlobal || isLoadingIssues;

  return (
    <>
      <Header />
      <Box className={`b-loader ${isLoading ? "" : "-hidden"}`}>
        <LinearProgress sx={{ background: "none" }} />
      </Box>
      <div className="outlet">
        <Outlet />
      </div>
      <ErrorModal />
    </>
  );
};
export default Layout;

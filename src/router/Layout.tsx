import Header from "../components/common/Header/Header.tsx";
import { Outlet } from "react-router-dom";
import { useAppSelector } from "../store";
import { Box, LinearProgress } from "@mui/material";
import ErrorModal from "../components/common/ErrorModal/ErrorModal.tsx";

const Layout = () => {
  const { isLoading } = useAppSelector((state) => state.auth);

  return (
    <>
      <Header />
      <div className="outlet">
        <Outlet />
      </div>
      <Box className={`b-loader ${isLoading ? "" : "-hidden"}`}>
        <LinearProgress />
      </Box>
      <ErrorModal />
    </>
  );
};
export default Layout;

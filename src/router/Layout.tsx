import Header from "../components/common/Header/Header.tsx";
import { Outlet } from "react-router-dom";

const Layout = () => {
  return (
    <>
      <Header />
      <div className="outlet">
        <Outlet />
      </div>
    </>
  );
};
export default Layout;

import logo from "../../../assets/images/logo.svg";

import "./LogoStyles.scss";
import useThemeClass from "../../../hooks/useThemeClass.ts";
import { useNavigate } from "react-router-dom";

const Logo = () => {
  const logoClass = useThemeClass("b-logo");
  const navigate = useNavigate();

  return (
    <img
      src={logo}
      alt={"Projects App Logo"}
      className={logoClass}
      onClick={() => navigate("/")}
    />
  );
};
export default Logo;

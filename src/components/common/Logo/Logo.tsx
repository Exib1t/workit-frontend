import logo from "../../../assets/images/logo.svg";

import "./LogoStyles.scss";
import useThemeClass from "../../../hooks/useThemeClass.ts";

const Logo = () => {
  const logoClass = useThemeClass("b-logo");

  return <img src={logo} alt={"Projects App Logo"} className={logoClass} />;
};
export default Logo;

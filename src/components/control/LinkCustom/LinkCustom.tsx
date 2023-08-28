import { FC } from "react";
import { NavLink, NavLinkProps } from "react-router-dom";
import useThemeClass from "../../../hooks/useThemeClass.ts";
import "./LinkStyles.scss";

const LinkCustom: FC<NavLinkProps> = (props) => {
  const themeClass = useThemeClass("b-link");

  return (
    <NavLink {...props} className={`${themeClass} ${props.className || ""}`}>
      {props.children}
    </NavLink>
  );
};
export default LinkCustom;

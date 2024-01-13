import { FC } from "react";
import useThemeClass from "../../../hooks/useThemeClass.ts";
import { IconButtonProps } from "@mui/material";
import "./IconButtonStyles.scss";

const MoreButton: FC<IconButtonProps> = (props) => {
  const themeClass = useThemeClass("b-iconButton");

  return (
    <button {...props} className={`${themeClass} ${props.className || ""}`}>
      {props.children}
    </button>
  );
};
export default MoreButton;

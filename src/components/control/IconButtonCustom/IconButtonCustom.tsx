import { FC } from "react";
import useThemeClass from "../../../hooks/useThemeClass.ts";
import { IconButton, IconButtonProps } from "@mui/material";
import "./IconButtonStyles.scss";

const MoreButton: FC<IconButtonProps> = (props) => {
  const themeClass = useThemeClass("b-iconButton");

  return (
    <IconButton {...props} className={`${themeClass} ${props.className}`}>
      {props.children}
    </IconButton>
  );
};
export default MoreButton;

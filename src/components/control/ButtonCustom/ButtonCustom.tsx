import { FC } from "react";
import { Button, ButtonProps } from "@mui/material";
import useThemeClass from "../../../hooks/useThemeClass.ts";
import "./ButtonStyles.scss";

const ButtonCustom: FC<ButtonProps> = (props) => {
  const buttonClass = useThemeClass("b-button");

  return (
    <Button {...props} className={`${buttonClass} ${props.className || ""}`}>
      {props.children}
    </Button>
  );
};
export default ButtonCustom;

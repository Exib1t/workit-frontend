import { FC, ReactElement } from "react";
import useThemeClass from "../../../hooks/useThemeClass.ts";
import "./ListItemStyles.scss";
import { ButtonProps } from "@mui/material";
import CustomButton from "../ButtonComponents/CustomButton/CustomButton.tsx";

interface IProps extends ButtonProps {
  children: string;
  icon?: ReactElement;
}

const ListItemCustom: FC<IProps> = (props) => {
  const themeClass = useThemeClass("b-listItem");

  return (
    <CustomButton
      {...props}
      size="md"
      type={"text-plain"}
      title={props.children}
      icon={props.icon || undefined}
      className={`${themeClass} ${props.className || ""}`}
    />
  );
};
export default ListItemCustom;

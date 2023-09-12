import useThemeClass from "../../../hooks/useThemeClass.ts";
import Icon from "../../control/Icon/Icon.tsx";
import IconButtonCustom from "../../control/IconButtonCustom/IconButtonCustom.tsx";
import { FC } from "react";
import { IconButtonProps } from "@mui/material";

const MoreButton: FC<IconButtonProps> = (props) => {
  const themeClass = useThemeClass("b-moreButton");

  return (
    <IconButtonCustom
      {...props}
      className={`${themeClass} ${props.className || ""}`}
    >
      <Icon type={"more"} size={24} />
    </IconButtonCustom>
  );
};
export default MoreButton;

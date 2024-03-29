import { FC } from "react";
import { Tooltip, TooltipProps } from "@mui/material";
import "./CustomTooltipStyles.scss";
import useThemeClass from "../../../hooks/useThemeClass.ts";

const CustomTooltip: FC<TooltipProps> = (props) => {
  const themeClass = useThemeClass("b-tooltip");

  return (
    <Tooltip
      {...props}
      classes={{ tooltip: themeClass }}
      enterDelay={500}
      enterNextDelay={500}
    >
      {props.children}
    </Tooltip>
  );
};
export default CustomTooltip;

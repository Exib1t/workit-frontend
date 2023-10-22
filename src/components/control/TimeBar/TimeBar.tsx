import { LinearProgress } from "@mui/material";
import useThemeClass from "../../../hooks/useThemeClass.ts";
import { FC } from "react";

import "./TimeBarStyles.scss";

interface IProps {
  value: number;
  label: number;
  type: "estimated" | "logged" | "remaining";
}

const TimeBar: FC<IProps> = ({ value, type, label }) => {
  const themeClass = useThemeClass("b-timeBar");

  return (
    <div className={`${themeClass}_container`}>
      <LinearProgress
        classes={{
          determinate: themeClass,
          bar1Determinate: `${themeClass}_bar type-${type}`,
        }}
        variant={"determinate"}
        value={value}
      />
      <span className={`${themeClass}_label`}>{label.toFixed(1)}h</span>
    </div>
  );
};
export default TimeBar;

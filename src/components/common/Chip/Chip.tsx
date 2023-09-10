import { FC } from "react";
import useThemeClass from "../../../hooks/useThemeClass.ts";
import { IColors } from "../../../models/IColors/IColors.ts";
import "./ChipStyles.scss";

const Chip: FC<{
  type: "filled" | "text";
  color?: IColors;
  value: string;
}> = ({ type, color, value }) => {
  const themeClass = useThemeClass("b-chipsDiscipline");
  return (
    <>
      <div
        className={
          type === "filled" ? `${themeClass} -${color}` : `${themeClass}`
        }
      >
        <div
          className={
            type === "filled"
              ? `${themeClass}__label_text`
              : `${themeClass}__label_text -${color}`
          }
        >
          {value}
        </div>
      </div>
    </>
  );
};

export default Chip;

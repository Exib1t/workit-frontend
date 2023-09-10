import { validColors } from "../../../constants/colors.ts";
import Chip from "../Chip/Chip.tsx";
import useThemeClass from "../../../hooks/useThemeClass.ts";
import "./ColorPickerStyles.scss";
import { FC, useState } from "react";
import { IColors } from "../../../models/IColors/IColors.ts";

interface IProps {
  onChange: (color: IColors) => void;
}

const ColorPicker: FC<IProps> = ({ onChange }) => {
  const themeClass = useThemeClass("b-colorPicker");
  const [pickedColor, setPickedColor] = useState<IColors>("pink");

  const handleChange = (color: IColors) => {
    setPickedColor(color);
    onChange(color);
  };

  return (
    <div className={themeClass}>
      {validColors.map((color) => (
        <div
          key={`color-${color}`}
          className={`${themeClass}__wrapper ${
            pickedColor === color ? "-checked" : ""
          }`}
          onClick={() => handleChange(color)}
        >
          <Chip type={"filled"} value={color} color={color} />
        </div>
      ))}
    </div>
  );
};
export default ColorPicker;

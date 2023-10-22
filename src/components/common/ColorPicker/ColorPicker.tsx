import { validColors } from "../../../constants/colors.ts";
import Chip from "../Chip/Chip.tsx";
import useThemeClass from "../../../hooks/useThemeClass.ts";
import "./ColorPickerStyles.scss";
import { FC, useEffect, useState } from "react";
import { IColors } from "../../../models/IColors/IColors.ts";

interface IProps {
  onChange: (color: IColors) => void;
  value?: IColors;
}

const ColorPicker: FC<IProps> = ({ onChange, value }) => {
  const themeClass = useThemeClass("b-colorPicker");
  const [pickedColor, setPickedColor] = useState<IColors>("pink");

  useEffect(() => {
    if (value) {
      setPickedColor(value);
    }
  }, [value]);

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

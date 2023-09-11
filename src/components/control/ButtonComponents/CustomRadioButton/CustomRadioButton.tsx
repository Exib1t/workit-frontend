import React from "react";
import useThemeClass from "../../../../hooks/useThemeClass.ts";
import "./CustomRadioButtonStyles.scss";

interface CustomRadioButtonProps {
  value: string | number;
  checked: boolean;
  disabled?: boolean;
  clickHandler: (value: string | number) => void;
  customClass?: string;
}

const CustomRadioButton: React.FC<CustomRadioButtonProps> = ({
  value,
  checked,
  disabled,
  clickHandler,
  customClass,
}) => {
  const themeClass = useThemeClass("b-customRadioButton");

  const handleChange = () => {
    clickHandler && clickHandler(value);
  };

  return (
    <>
      <div
        onClick={handleChange}
        className={`${themeClass} ${checked ? "-checked" : ""} ${
          disabled ? "-disabled" : ""
        } ${customClass || ""}`}
      >
        {checked ? (
          <div
            className={`${themeClass}_checkedIcon ${customClass}_checkedIcon`}
          />
        ) : null}
      </div>
    </>
  );
};

export default CustomRadioButton;

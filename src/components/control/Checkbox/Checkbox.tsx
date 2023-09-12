import { FC, memo, MouseEvent } from "react";
import "./CheckboxStyle.scss";
import useThemeClass from "../../../hooks/useThemeClass.ts";
import Icon from "../Icon/Icon.tsx";

const Checkbox: FC<{
  checked?: boolean;
  onClick?: (e: MouseEvent<HTMLDivElement>) => void;
  disabled?: boolean;
  btnClassName?: string;
  wrapperClassName?: string;
}> = ({ checked, disabled, btnClassName, wrapperClassName, onClick }) => {
  const themeClass = useThemeClass("b-check-box");
  return (
    <>
      <div
        className={`${themeClass} ${wrapperClassName || ""} ${
          disabled ? "-disabled" : ""
        }`}
        onClick={!disabled ? onClick : () => {}}
      >
        {checked ? (
          <div className={`${themeClass}_btn ${btnClassName || ""}`}>
            <Icon type={"tick"} size={20} />
          </div>
        ) : (
          <div className={`${themeClass}_btn-empty`}></div>
        )}
      </div>
    </>
  );
};
export default memo(Checkbox);

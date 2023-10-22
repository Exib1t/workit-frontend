import {
  ChangeEvent,
  forwardRef,
  InputHTMLAttributes,
  memo,
  ReactNode,
} from "react";

import useThemeClass from "../../../hooks/useThemeClass.ts";
import "./TextInputStyles.scss";

interface TextInputProps extends InputHTMLAttributes<HTMLInputElement> {
  value: string | number;
  onChange: (e: ChangeEvent<HTMLInputElement>) => void;
  type: "on-bgd" | "on-srf";
  label?: string;
  error?: string;
  disabled?: boolean;
  isFocus?: boolean;
  customIcon?: ReactNode;
  customIconClass?: string;
  onClickIcon?: (func: any) => void;
  width?: number | string;
  inputType?: "text" | "password" | "number";
}

const TextInput = forwardRef<HTMLInputElement, TextInputProps>(
  function TextInput(
    {
      onChange,
      value,
      type,
      label,
      error,
      isFocus,
      customIcon,
      customIconClass,
      onClickIcon,
      width,
      disabled,
      inputType,
      ...inputProps
    },
    ref,
  ) {
    const themeClass = useThemeClass("b-textInput");
    const styleWidth = width ? { width: width } : {};

    return (
      <>
        <div
          className={`${themeClass} ${disabled ? "-isDisabled" : ""}`}
          style={styleWidth}
        >
          {!!label && <label className={`${themeClass}_label`}>{label}</label>}
          <div className={`${themeClass}_inputContainer`}>
            <div
              className={`${themeClass}_field_${type} ${
                isFocus ? "-isFocus" : ""
              } ${error ? "-isError" : ""}`}
              style={styleWidth}
            >
              <input
                value={value}
                onChange={onChange}
                ref={ref}
                className={`${themeClass}_field_${type}_input`}
                type={inputType}
                {...(inputProps || {})}
              />
              {onClickIcon ? (
                <div
                  className={`${themeClass}_field_${type}_icon ${customIconClass}`}
                  onClick={onClickIcon}
                >
                  {customIcon}
                </div>
              ) : null}
            </div>
            {!!error && <span className={`${themeClass}_error`}>{error}</span>}
          </div>
        </div>
      </>
    );
  },
);

export default memo(TextInput);

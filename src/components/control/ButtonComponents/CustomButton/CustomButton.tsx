import { FC, MouseEvent, ReactElement, useMemo } from "react";

import "./CustomButtonStyles.scss";
import useThemeClass from "../../../../hooks/useThemeClass.ts";

interface CustomButtonProps {
  type:
    | "primary"
    | "secondary"
    | "tertiary"
    | "text-plain"
    | "text-activated"
    | "selection-plain"
    | "selection-activated"
    | "accept"
    | "decline";
  size: "xs" | "sm" | "md";
  title: string | ReactElement;
  clickHandler?: (e: MouseEvent<HTMLDivElement>) => void;
  disabled?: boolean;
  loading?: boolean;
  icon?: ReactElement;
  iconClass?: string;
  isActive?: boolean;
  className?: string;
}

const CustomButton: FC<CustomButtonProps> = ({
  type,
  size,
  title,
  clickHandler,
  disabled,
  loading,
  icon,
  iconClass,
  isActive,
  className,
}) => {
  const themeClass = useThemeClass("b-button");

  const handleClick = (e: MouseEvent<HTMLDivElement>) => {
    if (disabled || loading) {
      return;
    }

    clickHandler && clickHandler(e);
  };

  const sizeName = useMemo(() => {
    let name: string = size;
    const isTextButton = type === "text-activated" || type === "text-plain";

    if (isTextButton) {
      name = `text-${size}`;
    }

    if (icon) {
      name = `${name}-icon`;
    }

    return name;
  }, [type, size, icon]);

  return (
    <>
      <div
        onClick={handleClick}
        className={`${themeClass} ${themeClass}_${type} -${sizeName} -${size} ${
          disabled ? "-disabled" : ""
        }  ${loading ? "-loading" : ""}  ${isActive ? "-active" : ""} ${
          className || ""
        }`}
      >
        {icon && (
          <div
            className={`${themeClass}_customIcon buttonIcon -${size} ${iconClass}`}
          >
            {icon}
          </div>
        )}
        <span className={`buttonTitle -${size} ${themeClass}_${type}_title`}>
          {title}
        </span>
      </div>
    </>
  );
};

export default CustomButton;

import { FC, ReactElement } from "react";
import useThemeClass from "../../../hooks/useThemeClass.ts";
import CustomButton from "../ButtonComponents/CustomButton/CustomButton.tsx";
import "./ListItemStyles.scss";

interface IProps {
  children: string;
  icon?: ReactElement;
  type?: "on-bgd" | "on-srf";
  className?: string;
  onClick?: () => void;
  disabled?: boolean;
}

const ListItemCustom: FC<IProps> = ({
  type = "on-bgd",
  icon,
  className,
  onClick,
  children,
  disabled,
}) => {
  const themeClass = useThemeClass("b-listItem");

  return (
    <CustomButton
      size="md"
      type={"text-plain"}
      title={children}
      icon={icon || undefined}
      className={`${themeClass} ${className || ""} ${type}`}
      clickHandler={onClick}
      disabled={disabled}
    />
  );
};
export default ListItemCustom;

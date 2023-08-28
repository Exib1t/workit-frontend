import { Avatar, AvatarProps } from "@mui/material";
import useThemeClass from "../../../hooks/useThemeClass.ts";
import { FC } from "react";

import "./AvatarStyles.scss";

const AvatarCustom: FC<AvatarProps & { size: "small" | "medium" | "big" }> = ({
  children,
  size = "medium",
  className,
  ...props
}) => {
  const themeClass = useThemeClass("b-avatar");

  return (
    <Avatar {...props} className={`${themeClass} ${size} ${className}`}>
      {children}
    </Avatar>
  );
};
export default AvatarCustom;

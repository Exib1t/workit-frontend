import { FC } from "react";
import { Breadcrumbs, BreadcrumbsProps } from "@mui/material";
import useThemeClass from "../../../hooks/useThemeClass.ts";
import "./BreadcrumbsCustomStyles.scss";

const BreadcrumbsCustom: FC<BreadcrumbsProps> = (props) => {
  const themeClass = useThemeClass("b-breadcrumbs");

  return (
    <Breadcrumbs
      {...props}
      classes={{
        separator: `${themeClass}__separator`,
        li: `${themeClass}__text`,
      }}
    >
      {props.children}
    </Breadcrumbs>
  );
};
export default BreadcrumbsCustom;

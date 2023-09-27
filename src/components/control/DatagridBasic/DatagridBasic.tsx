import "./DatagridBasicStyles.scss";
import useThemeClass from "../../../hooks/useThemeClass.ts";
import { DataGrid, DataGridProps } from "@mui/x-data-grid";
import { FC } from "react";

const DatagridBasic: FC<DataGridProps> = (props) => {
  const themeClass = useThemeClass("b-datagridBasic");

  return (
    <DataGrid
      {...props}
      className={`${themeClass} ${props.className || ""}`}
      classes={{
        columnHeaders: `${themeClass}__header ${
          props.classes?.columnHeaders || ""
        }`,
        row: `${themeClass}__row ${props.classes?.row || ""}`,
        cell: `${themeClass}__cell ${props.classes?.cell || ""}`,
        columnHeader: `${themeClass}__headerTitle ${
          props.classes?.columnHeader || ""
        }`,
        overlay: `${themeClass}__overlay ${props.classes?.overlay || ""}`,
      }}
    />
  );
};
export default DatagridBasic;

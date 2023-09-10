import { useAppSelector } from "../../../store";
import useThemeClass from "../../../hooks/useThemeClass.ts";
import { DataGrid, GridColDef, GridRenderCellParams } from "@mui/x-data-grid";
import { IProject } from "../../../models/IProject/IProject.ts";
import "./ProjectsTablesStyle.scss";
import Chip from "../Chip/Chip.tsx";
import { Link } from "react-router-dom";

const ProjectsTable = () => {
  const { data } = useAppSelector((state) => state.projects);
  const themeClass = useThemeClass("b-projectsTable");

  const basicFormatter = (params: GridRenderCellParams<IProject>) => {
    if (params.field === "postedBy") {
      return (
        <span>
          {params.row.postedBy.first_name} {params.row.postedBy.last_name}
        </span>
      );
    }

    if (params.field === "link") {
      return (
        <Link to={params.row.link}>
          <Chip
            type="filled"
            value={params.row.link}
            color={params.row.color}
          />
        </Link>
      );
    }

    if (params.field === "createdAt") {
      return <span>{new Date(params.row.createdAt).toLocaleString()}</span>;
    }

    if (params.field === "updatedAt") {
      return <span>{new Date(params.row.updatedAt).toLocaleString()}</span>;
    }
  };

  const columns: GridColDef[] = [
    {
      field: "title",
      headerName: "Title",
      flex: 1,
      renderCell: basicFormatter,
      headerClassName: `${themeClass}__headerTitle`,
      cellClassName: `${themeClass}__cell`,
    },
    {
      field: "link",
      headerName: "Link",
      flex: 1,
      renderCell: basicFormatter,
      headerClassName: `${themeClass}__headerTitle`,
      cellClassName: `${themeClass}__cell`,
    },
    {
      field: "postedBy",
      headerName: "Posted By",
      flex: 1,
      renderCell: basicFormatter,
      headerClassName: `${themeClass}__headerTitle`,
      cellClassName: `${themeClass}__cell`,
    },
    {
      field: "createdAt",
      headerName: "Date Created",
      flex: 1,
      renderCell: basicFormatter,
      headerClassName: `${themeClass}__headerTitle`,
      cellClassName: `${themeClass}__cell`,
    },
    {
      field: "updatedAt",
      headerName: "Date Updated",
      flex: 1,
      renderCell: basicFormatter,
      headerClassName: `${themeClass}__headerTitle`,
      cellClassName: `${themeClass}__cell`,
    },
  ];

  return (
    <div className={themeClass}>
      <DataGrid
        columns={columns}
        rows={data}
        rowSelection={false}
        disableColumnMenu={true}
        rowHeight={35}
        columnHeaderHeight={40}
        className={themeClass}
        hideFooter={true}
        classes={{
          columnHeaders: `${themeClass}__header`,
          row: `${themeClass}__row`,
        }}
      />
    </div>
  );
};
export default ProjectsTable;

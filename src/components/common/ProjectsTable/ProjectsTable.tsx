import { useAppDispatch, useAppSelector } from "../../../store";
import useThemeClass from "../../../hooks/useThemeClass.ts";
import { DataGrid, GridColDef, GridRenderCellParams } from "@mui/x-data-grid";
import { IProject } from "../../../models/IProject/IProject.ts";
import "./ProjectsTablesStyle.scss";
import Chip from "../Chip/Chip.tsx";
import { Link } from "react-router-dom";
import IconButtonCustom from "../../control/IconButtonCustom/IconButtonCustom.tsx";
import Icon from "../../control/Icon/Icon.tsx";
import { deleteProject } from "../../../store/thunks/projectsThunks.ts";
import { FC } from "react";
import { AppRoutes } from "../../../router/Routes.ts";

interface IProps {
  loadProjects: () => void;
  handleProjectEdit: (projectId: number) => void;
}

const ProjectsTable: FC<IProps> = ({ loadProjects, handleProjectEdit }) => {
  const { data } = useAppSelector((state) => state.projects);
  const dispatch = useAppDispatch();
  const themeClass = useThemeClass("b-projectsTable");

  const handleDelete = (projectId: number) => {
    dispatch(
      deleteProject({ projectId, callbacks: { onSuccess: loadProjects } }),
    );
  };

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
        <Link to={AppRoutes.project.replace(":projectLink", params.row.link)}>
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

    if (params.field === "options") {
      return (
        <div className={`${themeClass}__options`}>
          <IconButtonCustom
            size={"small"}
            onClick={() => handleProjectEdit(params.row.id)}
          >
            <Icon type={"edit"} size={16} />
          </IconButtonCustom>
          <IconButtonCustom
            size={"small"}
            onClick={() => handleDelete(params.row.id)}
          >
            <Icon type={"delete"} size={16} />
          </IconButtonCustom>
        </div>
      );
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
    {
      field: "options",
      headerName: "Options",
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
        className={`${themeClass}__table`}
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

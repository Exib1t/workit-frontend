import { useAppDispatch, useAppSelector } from "../../../../store";
import useThemeClass from "../../../../hooks/useThemeClass.ts";
import {
  GridColDef,
  GridRenderCellParams,
  GridRowParams,
} from "@mui/x-data-grid";
import { IProject } from "../../../../models/IProject/IProject.ts";
import "./ProjectsTablesStyle.scss";
import Chip from "../../Chip/Chip.tsx";
import { useNavigate } from "react-router-dom";
import IconButtonCustom from "../../../control/IconButtonCustom/IconButtonCustom.tsx";
import Icon from "../../../control/Icon/Icon.tsx";
import { deleteProject } from "../../../../store/projects/projectsThunks.ts";
import { FC } from "react";
import { AppRoutes } from "../../../../router/Routes.ts";
import DatagridBasic from "../../../control/DatagridBasic/DatagridBasic.tsx";

interface IProps {
  handleProjectEdit: (projectId: number) => void;
}

const ProjectsTable: FC<IProps> = ({ handleProjectEdit }) => {
  const { projects } = useAppSelector((state) => state.projects);
  const dispatch = useAppDispatch();
  const themeClass = useThemeClass("b-projectsTable");
  const navigate = useNavigate();

  const handleDelete = (projectId: number) => {
    dispatch(deleteProject({ projectId, callbacks: {} }));
  };

  const handleRowClick = (p: GridRowParams<IProject>) => {
    navigate(AppRoutes.project.replace(":projectLink", p.row.link));
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
        <Chip type="filled" value={params.row.link} color={params.row.color} />
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
    },
    {
      field: "link",
      headerName: "Link",
      flex: 1,
      renderCell: basicFormatter,
    },
    {
      field: "postedBy",
      headerName: "Posted By",
      flex: 1,
      renderCell: basicFormatter,
    },
    {
      field: "createdAt",
      headerName: "Date Created",
      flex: 1,
      renderCell: basicFormatter,
    },
    {
      field: "updatedAt",
      headerName: "Date Updated",
      flex: 1,
      renderCell: basicFormatter,
    },
    {
      field: "options",
      headerName: "Options",
      renderCell: basicFormatter,
    },
  ];

  return (
    <div className={themeClass}>
      <DatagridBasic
        columns={columns}
        rows={projects}
        rowSelection={false}
        rowHeight={35}
        columnHeaderHeight={40}
        className={`${themeClass}__table`}
        disableColumnMenu
        disableDensitySelector
        disableColumnSelector
        hideFooter
        disableRowSelectionOnClick
        onRowClick={handleRowClick}
        classes={{ row: `${themeClass}__row` }}
      />
    </div>
  );
};
export default ProjectsTable;

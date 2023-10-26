import "./IssuesListStyles.scss";
import useThemeClass from "../../../../hooks/useThemeClass.ts";
import { FC, MouseEvent, useState } from "react";
import { IIssue } from "../../../../models/IIssue/IIssue.ts";
import DatagridBasic from "../../../control/DatagridBasic/DatagridBasic.tsx";
import {
  GridColDef,
  GridRenderCellParams,
  GridRowParams,
} from "@mui/x-data-grid";
import IssueBlock from "../IssueBlock/IssueBlock.tsx";
import IssuePriority from "../IssuePriority/IssuePriority.tsx";
import IssueAssignee from "../IssueAssignee/IssueAssignee.tsx";
import IssueStatus from "../IssueStatus/IssueStatus.tsx";
import MoreButton from "../../MoreButton/MoreButton.tsx";
import IssueMenu from "../IssueMenu/IssueMenu.tsx";
import IssueSkeleton from "../IssueSkeleton/IssueSkeleton.tsx";
import { useNavigate, useParams } from "react-router-dom";
import { AppRoutes } from "../../../../router/Routes.ts";

interface IProps {
  issues: IIssue[];
  isLoading: boolean;
}

const IssuesList: FC<IProps> = ({ issues, isLoading }) => {
  const navigate = useNavigate();
  const { projectLink } = useParams();
  const [isMenuOpen, setIsMenuOpen] = useState<EventTarget | null>(null);
  const [selectedIssue, setSelectedIssue] = useState<IIssue | null>(null);
  const themeClass = useThemeClass("b-issuesList");

  const handleMenuOpen = (e: MouseEvent<HTMLButtonElement>, issue: IIssue) => {
    e.stopPropagation();
    setIsMenuOpen(e.target);
    setSelectedIssue(issue);
  };

  const handleMenuClose = () => {
    setIsMenuOpen(null);
    setSelectedIssue(null);
  };

  const handleRowClick = (params: GridRowParams<IIssue>) => {
    if (projectLink) {
      navigate(
        AppRoutes.issue
          .replace(":projectLink", projectLink)
          .replace(":issueLink", String(params.row.link)),
      );
    }
  };

  const renderTitleCell = (params: GridRenderCellParams<IIssue>) => {
    const issue = params.row;

    return <IssueBlock issue={issue} />;
  };

  const renderStatusCell = (params: GridRenderCellParams<IIssue>) => {
    const issue = params.row;

    return <IssueStatus status={issue.status} />;
  };

  const renderPriorityCell = (params: GridRenderCellParams<IIssue>) => {
    const issue = params.row;

    return <IssuePriority priority={issue.priority} isTable />;
  };

  const renderAssigneeCell = (params: GridRenderCellParams<IIssue>) => {
    const issue = params.row;

    return <IssueAssignee user={issue.assignee} />;
  };

  const renderReporterCell = (params: GridRenderCellParams<IIssue>) => {
    const issue = params.row;

    return <IssueAssignee user={issue.reporter} />;
  };

  const renderControlsCell = (params: GridRenderCellParams<IIssue>) => {
    const issue = params.row;

    return (
      <div className={`${themeClass}__controlsCell`}>
        <MoreButton size={"small"} onClick={(e) => handleMenuOpen(e, issue)} />
      </div>
    );
  };

  const LoadingOverlay = () => {
    return (
      <>
        <IssueSkeleton />
        <IssueSkeleton />
        <IssueSkeleton />
        <IssueSkeleton />
        <IssueSkeleton />
        <IssueSkeleton />
        <IssueSkeleton />
      </>
    );
  };

  const columns: GridColDef[] = [
    {
      field: "title",
      headerName: "Title",
      flex: 1,
      renderCell: renderTitleCell,
    },
    {
      field: "status",
      headerName: "Status",
      flex: 1,
      renderCell: renderStatusCell,
    },
    {
      field: "priority",
      headerName: "Priority",
      flex: 1,
      renderCell: renderPriorityCell,
    },
    {
      field: "assignee",
      headerName: "Assignee",
      flex: 1,
      renderCell: renderAssigneeCell,
    },
    {
      field: "reporter",
      headerName: "Reporter",
      flex: 1,
      renderCell: renderReporterCell,
    },
    {
      field: "controls",
      headerName: "",
      renderCell: renderControlsCell,
    },
  ];

  return (
    <div className={themeClass}>
      <DatagridBasic
        columns={columns}
        rows={issues}
        rowSelection={false}
        disableColumnMenu={true}
        columnHeaderHeight={40}
        hideFooter={true}
        loading={isLoading}
        components={{
          LoadingOverlay: LoadingOverlay,
        }}
        onRowClick={handleRowClick}
        classes={{ row: `${themeClass}__row` }}
      />
      {!!isMenuOpen && selectedIssue && (
        <IssueMenu
          isOpen={!!isMenuOpen}
          onClose={handleMenuClose}
          anchorEl={isMenuOpen}
          selectedIssue={selectedIssue}
          type={"issues-list"}
        />
      )}
    </div>
  );
};
export default IssuesList;

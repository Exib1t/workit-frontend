import ListCustom from "../../../control/ListCustom/ListCustom.tsx";
import useThemeClass from "../../../../hooks/useThemeClass.ts";
import ListItemCustom from "../../../control/ListItemCustom/ListItemCustom.tsx";
import { Popover } from "@mui/material";
import { FC } from "react";
import Icon from "../../../control/Icon/Icon.tsx";

import "./IssueMenuStyles.scss";
import { IIssue } from "../../../../models/IIssue/IIssue.ts";
import { useAppDispatch } from "../../../../store";
import { deleteIssue } from "../../../../store/issues/issuesThunks.ts";
import { AppRoutes } from "../../../../router/Routes.ts";
import { useNavigate, useParams } from "react-router-dom";
import useGetOneProject from "../../../../hooks/useGetOneProject.ts";

interface IProps {
  isOpen: boolean;
  onClose: () => void;
  anchorEl: EventTarget;
  selectedIssue: IIssue;
  type: "issue-page" | "issues-list";
}

const IssueMenu: FC<IProps> = ({
  anchorEl,
  onClose,
  isOpen,
  selectedIssue,
  type,
}) => {
  const dispatch = useAppDispatch();
  const navigate = useNavigate();
  const { projectLink } = useParams();
  const themeClass = useThemeClass("b-issueMenu");

  const { project } = useGetOneProject(projectLink);

  const onSuccess = () => {
    onClose();
  };

  const handleDelete = () => {
    if (project) {
      dispatch(
        deleteIssue({
          projectId: project.id,
          issueId: selectedIssue.id,
          callbacks: { onSuccess: onSuccess },
        }),
      );
      navigate(AppRoutes.issues.replace(":projectLink", String(projectLink)));
    }
  };

  const handleOpen = () => {
    if (projectLink) {
      navigate(
        AppRoutes.issue
          .replace(":projectLink", String(projectLink))
          .replace(":issueLink", String(selectedIssue.link)),
      );
    }
  };

  return (
    <Popover
      open={isOpen}
      onClose={onClose}
      anchorEl={anchorEl as HTMLElement}
      anchorOrigin={{ vertical: "bottom", horizontal: "center" }}
      transformOrigin={{ vertical: "top", horizontal: "right" }}
      classes={{
        paper: `${themeClass}__paper`,
      }}
    >
      <ListCustom className={themeClass}>
        {type === "issues-list" && (
          <ListItemCustom
            icon={<Icon type={"open"} size={16} />}
            onClick={handleOpen}
          >
            Open
          </ListItemCustom>
        )}
        <ListItemCustom
          icon={<Icon type={"delete"} size={16} color={"error"} />}
          className={`${themeClass}__delete`}
          onClick={handleDelete}
        >
          Delete
        </ListItemCustom>
      </ListCustom>
    </Popover>
  );
};
export default IssueMenu;

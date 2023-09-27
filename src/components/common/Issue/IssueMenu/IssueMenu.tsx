import ListCustom from "../../../control/ListCustom/ListCustom.tsx";
import useThemeClass from "../../../../hooks/useThemeClass.ts";
import ListItemCustom from "../../../control/ListItemCustom/ListItemCustom.tsx";
import { Popover } from "@mui/material";
import { FC } from "react";
import Icon from "../../../control/Icon/Icon.tsx";

import "./IssueMenuStyles.scss";
import { IIssue } from "../../../../models/IIssue/IIssue.ts";
import { useAppDispatch } from "../../../../store";
import { deleteIssue } from "../../../../store/thunks/issuesThunks.ts";

interface IProps {
  isOpen: boolean;
  onClose: () => void;
  anchorEl: EventTarget;
  selectedIssue: IIssue;
  onIssueUpdate: () => void;
}

const IssueMenu: FC<IProps> = ({
  anchorEl,
  onClose,
  isOpen,
  selectedIssue,
  onIssueUpdate,
}) => {
  const dispatch = useAppDispatch();
  const themeClass = useThemeClass("b-issueMenu");

  const onSuccess = () => {
    onIssueUpdate();
    onClose();
  };

  const handleDelete = () => {
    dispatch(
      deleteIssue({
        issueId: selectedIssue.id,
        callbacks: { onSuccess: onSuccess },
      }),
    );
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
        <ListItemCustom icon={<Icon type={"open"} size={16} />}>
          Open
        </ListItemCustom>
        <ListItemCustom icon={<Icon type={"edit"} size={16} />}>
          Edit
        </ListItemCustom>
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

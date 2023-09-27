import Icon from "../../../control/Icon/Icon.tsx";
import useThemeClass from "../../../../hooks/useThemeClass.ts";
import { getIconPriority } from "../../../../helpers/issueHelpers.ts";
import { FC } from "react";
import { IIssue } from "../../../../models/IIssue/IIssue.ts";

import "./issuePriorityStyles.scss";
import { Skeleton } from "@mui/material";

interface IProps {
  issue: IIssue | null;
  isTable: boolean;
}

const IssuePriority: FC<IProps> = ({ issue, isTable }) => {
  const themeClass = useThemeClass("b-issuePriority");

  if (!issue) {
    return (
      <div className={`${themeClass}__skeleton`}>
        <Skeleton variant={"text"} width={100} height={20} />
      </div>
    );
  }

  return (
    <div className={`${themeClass} ${isTable ? "-table" : ""}`}>
      <Icon type={getIconPriority(issue)} size={16} color={"primary"} />
      {issue.priority}
    </div>
  );
};
export default IssuePriority;

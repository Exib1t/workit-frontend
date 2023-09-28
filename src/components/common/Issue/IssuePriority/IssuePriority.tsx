import Icon from "../../../control/Icon/Icon.tsx";
import useThemeClass from "../../../../hooks/useThemeClass.ts";
import { getIconPriority } from "../../../../helpers/issueHelpers.ts";
import { FC } from "react";
import { IssuePriorityType } from "../../../../models/IIssue/IIssue.ts";

import "./issuePriorityStyles.scss";
import { Skeleton } from "@mui/material";

interface IProps {
  priority: IssuePriorityType | null;
  isTable: boolean;
}

const IssuePriority: FC<IProps> = ({ priority, isTable }) => {
  const themeClass = useThemeClass("b-issuePriority");

  if (!priority) {
    return (
      <div className={`${themeClass}__skeleton`}>
        <Skeleton variant={"text"} width={100} height={20} />
      </div>
    );
  }

  return (
    <div className={`${themeClass} ${isTable ? "-table" : ""}`}>
      <Icon type={getIconPriority(priority)} size={16} color={"primary"} />
      {priority}
    </div>
  );
};
export default IssuePriority;

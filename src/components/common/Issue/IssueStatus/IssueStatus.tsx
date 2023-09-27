import { FC } from "react";
import { IssueStatusType } from "../../../../models/IIssue/IIssue.ts";
import Chip from "../../Chip/Chip.tsx";
import { getIssueStatusColor } from "../../../../helpers/issueHelpers.ts";
import { Skeleton } from "@mui/material";
import useThemeClass from "../../../../hooks/useThemeClass.ts";

import "./IssueStatusStyles.scss";

interface IProps {
  status: IssueStatusType | null;
}

const IssueStatus: FC<IProps> = ({ status }) => {
  const themeClass = useThemeClass("b-issueStatus");

  if (!status) {
    return (
      <div className={`${themeClass}__skeleton`}>
        <Skeleton variant={"rectangular"} width={92} height={24} />
      </div>
    );
  }

  return (
    <Chip type={"filled"} value={status} color={getIssueStatusColor(status)} />
  );
};
export default IssueStatus;

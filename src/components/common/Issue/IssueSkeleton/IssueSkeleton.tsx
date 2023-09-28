import IssueBlock from "../IssueBlock/IssueBlock.tsx";
import IssueStatus from "../IssueStatus/IssueStatus.tsx";
import IssuePriority from "../IssuePriority/IssuePriority.tsx";
import IssueAssignee from "../IssueAssignee/IssueAssignee.tsx";
import { Skeleton } from "@mui/material";
import useThemeClass from "../../../../hooks/useThemeClass.ts";

import "./IssueSkeletonStyles.scss";

const IssueSkeleton = () => {
  const themeClass = useThemeClass("b-issueSkeleton");

  return (
    <div className={themeClass}>
      <IssueBlock issue={null} />
      <IssueStatus status={null} />
      <IssuePriority priority={null} isTable />
      <IssueAssignee user={null} />
      <IssueAssignee user={null} />
      <div className={`${themeClass}__skeletonControls`}>
        <Skeleton variant={"rounded"} width={20} height={20} />
      </div>
    </div>
  );
};
export default IssueSkeleton;

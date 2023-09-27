import { FC } from "react";
import IssueType from "../IssueType/IssueType.tsx";
import { IIssue } from "../../../../models/IIssue/IIssue.ts";
import useThemeClass from "../../../../hooks/useThemeClass.ts";

import "./IssueBlockStyles.scss";
import { Skeleton } from "@mui/material";

interface IProps {
  issue: IIssue | null;
}

const IssueBlock: FC<IProps> = ({ issue }) => {
  const themeClass = useThemeClass("b-issueBlock");

  if (!issue) {
    return (
      <div className={`${themeClass}__skeleton`}>
        <div className={`${themeClass}__type`}>
          <Skeleton variant={"rectangular"} width={12} height={12} />
        </div>
        <div className={`${themeClass}__main`}>
          <Skeleton variant={"text"} width={100} height={20} />
          <Skeleton variant={"text"} width={290} height={16} />
        </div>
      </div>
    );
  }

  return (
    <div className={themeClass}>
      <div className={`${themeClass}__type`}>
        <IssueType issue={issue} />
      </div>
      <div className={`${themeClass}__main`}>
        <h4 className={`${themeClass}__title`}>{issue.link}</h4>
        <p className={`${themeClass}__desc`}>{issue.title}</p>
      </div>
    </div>
  );
};
export default IssueBlock;

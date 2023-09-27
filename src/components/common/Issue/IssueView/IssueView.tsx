import { FC } from "react";
import { IIssue } from "../../../../models/IIssue/IIssue.ts";
import useThemeClass from "../../../../hooks/useThemeClass.ts";
import "./IssueViewStyles.scss";
import IssueType from "../IssueType/IssueType.tsx";
import IssuePriority from "../IssuePriority/IssuePriority.tsx";
import IssueAssignee from "../IssueAssignee/IssueAssignee.tsx";
import IssueStatus from "../IssueStatus/IssueStatus.tsx";
import { getLocalDate } from "../../../../helpers/issueHelpers.ts";

interface IProps {
  issue: IIssue;
}

const IssueView: FC<IProps> = ({ issue }) => {
  const themeClass = useThemeClass("b-issueView");

  return (
    <div className={themeClass}>
      <div className={`${themeClass}__title`}>{issue.title}</div>
      <div className={`${themeClass}__row`}>
        <div className={`${themeClass}__column`}>
          <div className={`${themeClass}__item`}>
            <span className={`${themeClass}__label`}>Type:</span>
            <span className={`${themeClass}__labelText`}>
              <IssueType issue={issue} /> {issue.type}
            </span>
          </div>
          <div className={`${themeClass}__item`}>
            <span className={`${themeClass}__label`}>Priority:</span>
            <span className={`${themeClass}__labelText`}>
              <IssuePriority issue={issue} isTable={false} />
            </span>
          </div>
          <div className={`${themeClass}__item`}>
            <span className={`${themeClass}__label`}>Status:</span>
            <span className={`${themeClass}__labelText`}>
              <IssueStatus status={issue.status} />
            </span>
          </div>
          <div className={`${themeClass}__item`}>
            <span className={`${themeClass}__label`}>Created at:</span>
            <span className={`${themeClass}__labelText`}>
              {getLocalDate(issue.createdAt)}
            </span>
          </div>
          <div className={`${themeClass}__item`}>
            <span className={`${themeClass}__label`}>Updated at:</span>
            <span className={`${themeClass}__labelText`}>
              {getLocalDate(issue.updatedAt)}
            </span>
          </div>
        </div>
        <div className={`${themeClass}__column`}>
          <div className={`${themeClass}__item`}>
            <span className={`${themeClass}__label`}>Reporter:</span>
            <span className={`${themeClass}__labelText`}>
              <IssueAssignee user={issue.reporter} />
            </span>
          </div>
          <div className={`${themeClass}__item`}>
            <span className={`${themeClass}__label`}>Assignee:</span>
            <span className={`${themeClass}__labelText`}>
              <IssueAssignee user={issue.assignee} />
            </span>
          </div>
        </div>
      </div>
    </div>
  );
};
export default IssueView;

import { FC } from "react";
import { IIssue } from "../../../../models/IIssue/IIssue.ts";
import Icon from "../../../control/Icon/Icon.tsx";
import useThemeClass from "../../../../hooks/useThemeClass.ts";
import { getIconType } from "../../../../helpers/issueHelpers.ts";
import "./IssueTypeStyles.scss";

interface IProps {
  issue: IIssue;
}

const IssueType: FC<IProps> = ({ issue }) => {
  const themeClass = useThemeClass("b-issueType");

  return (
    <div className={themeClass}>
      <Icon type={getIconType(issue)} size={12} color={"tick"} />
    </div>
  );
};
export default IssueType;

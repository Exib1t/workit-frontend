import { FC } from "react";
import { IssueTypes } from "../../../../models/IIssue/IIssue.ts";
import Icon from "../../../control/Icon/Icon.tsx";
import useThemeClass from "../../../../hooks/useThemeClass.ts";
import { getIconType } from "../../../../helpers/issueHelpers.ts";
import "./IssueTypeStyles.scss";

interface IProps {
  type: IssueTypes;
}

const IssueType: FC<IProps> = ({ type }) => {
  const themeClass = useThemeClass("b-issueType");

  return (
    <div className={themeClass}>
      <Icon type={getIconType(type)} size={12} color={"tick"} />
    </div>
  );
};
export default IssueType;

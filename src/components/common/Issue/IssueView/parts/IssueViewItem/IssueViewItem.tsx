import useThemeClass from "../../../../../../hooks/useThemeClass.ts";
import { FC, ReactNode } from "react";

import "./IssueViewItemStyles.scss";

interface IProps {
  label: string;
  content: string | ReactNode;
}

const IssueViewItem: FC<IProps> = ({ label, content }) => {
  const themeClass = useThemeClass("b-issueViewItem");

  return (
    <div className={themeClass}>
      <span className={`${themeClass}__label`}>{label}</span>
      <span className={`${themeClass}__labelText`}>{content}</span>
    </div>
  );
};
export default IssueViewItem;

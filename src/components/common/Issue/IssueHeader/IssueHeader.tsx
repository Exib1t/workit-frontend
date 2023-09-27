import CustomButton from "../../../control/ButtonComponents/CustomButton/CustomButton.tsx";
import Icon from "../../../control/Icon/Icon.tsx";
import MoreButton from "../../MoreButton/MoreButton.tsx";
import { useNavigate } from "react-router-dom";
import useThemeClass from "../../../../hooks/useThemeClass.ts";
import { IProject } from "../../../../models/IProject/IProject.ts";
import { FC } from "react";
import { IIssue } from "../../../../models/IIssue/IIssue.ts";
import { AppRoutes } from "../../../../router/Routes.ts";
import BreadcrumbsCustom from "../../../control/BreadcrumbsCustom/BreadcrumbsCustom.tsx";

import "./IssueHeaderStyles.scss";

interface IProps {
  project: IProject;
  issue: IIssue;
}

const IssueHeader: FC<IProps> = ({ project, issue }) => {
  const navigate = useNavigate();

  const themeClass = useThemeClass("b-issueHeader");

  return (
    <div className={themeClass}>
      <h2 className={`${themeClass}__breadcrumbs`}>
        <BreadcrumbsCustom>
          <span
            onClick={() =>
              navigate(AppRoutes.project.replace(":projectLink", project.link))
            }
          >
            {project.title}
          </span>
          <span
            onClick={() =>
              navigate(AppRoutes.issues.replace(":projectLink", project.link))
            }
          >
            Issues
          </span>
          <p>{issue.link}</p>
        </BreadcrumbsCustom>
      </h2>
      <div className={`${themeClass}__controls`}>
        <CustomButton
          type={"selection-activated"}
          size={"sm"}
          title={"Add issue"}
          clickHandler={() => {}}
          icon={<Icon type={"plus"} size={16} color={"primary"} />}
        />
        <MoreButton size={"small"} />
      </div>
    </div>
  );
};
export default IssueHeader;

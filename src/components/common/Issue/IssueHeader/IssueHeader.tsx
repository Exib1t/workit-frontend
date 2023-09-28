import MoreButton from "../../MoreButton/MoreButton.tsx";
import { useNavigate } from "react-router-dom";
import useThemeClass from "../../../../hooks/useThemeClass.ts";
import { IProject } from "../../../../models/IProject/IProject.ts";
import { Dispatch, FC, SetStateAction } from "react";
import { IIssue } from "../../../../models/IIssue/IIssue.ts";
import { AppRoutes } from "../../../../router/Routes.ts";
import BreadcrumbsCustom from "../../../control/BreadcrumbsCustom/BreadcrumbsCustom.tsx";

import "./IssueHeaderStyles.scss";

interface IProps {
  project: IProject;
  initialFields: IIssue;
  setInitialFields: Dispatch<SetStateAction<IIssue | undefined>>;
  onSuccess: () => void;
}

const IssueHeader: FC<IProps> = ({ project, initialFields }) => {
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
          <p>{initialFields.link}</p>
        </BreadcrumbsCustom>
      </h2>
      <div className={`${themeClass}__controls`}>
        <MoreButton size={"small"} />
      </div>
    </div>
  );
};
export default IssueHeader;

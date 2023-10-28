import MoreButton from "../../MoreButton/MoreButton.tsx";
import { useNavigate } from "react-router-dom";
import useThemeClass from "../../../../hooks/useThemeClass.ts";
import { IProject } from "../../../../models/IProject/IProject.ts";
import { FC, MouseEvent, useState } from "react";
import { IIssue } from "../../../../models/IIssue/IIssue.ts";
import { AppRoutes } from "../../../../router/Routes.ts";
import BreadcrumbsCustom from "../../../control/BreadcrumbsCustom/BreadcrumbsCustom.tsx";
import IssueMenu from "../IssueMenu/IssueMenu.tsx";

import "./IssueHeaderStyles.scss";

interface IProps {
  project: IProject;
  initialFields: IIssue;
}

const IssueHeader: FC<IProps> = ({ project, initialFields }) => {
  const navigate = useNavigate();
  const themeClass = useThemeClass("b-issueHeader");
  const [isMenuOpen, setIsMenuOpen] = useState<EventTarget | null>(null);

  const handleMenuClose = () => {
    setIsMenuOpen(null);
  };

  const handleMenuOpen = (e: MouseEvent<HTMLButtonElement>) => {
    setIsMenuOpen(e.target);
  };

  return (
    <>
      <div className={themeClass}>
        <h2 className={`${themeClass}__breadcrumbs`}>
          <BreadcrumbsCustom>
            <span onClick={() => navigate(AppRoutes.projects)}>Projects</span>
            <span
              onClick={() =>
                navigate(
                  AppRoutes.project.replace(":projectLink", project.link),
                )
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
          <MoreButton size={"small"} onClick={handleMenuOpen} />
        </div>
      </div>
      <IssueMenu
        isOpen={!!isMenuOpen}
        onClose={handleMenuClose}
        anchorEl={isMenuOpen as HTMLElement}
        selectedIssue={initialFields}
        type={"issue-page"}
      />
    </>
  );
};
export default IssueHeader;

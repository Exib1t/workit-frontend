import Page from "../../common/Page/Page.tsx";
import useThemeClass from "../../../hooks/useThemeClass.ts";
import ProjectIssuesHeader from "../../common/ProjectIssuesHeader/ProjectIssuesHeader.tsx";

import "./ProjectIssuesStyles.scss";

const ProjectIssues = () => {
  const themeClass = useThemeClass("b-projectIssues");

  return (
    <Page>
      <div className={themeClass}>
        <div className={`${themeClass}__container`}>
          <ProjectIssuesHeader />
        </div>
      </div>
    </Page>
  );
};
export default ProjectIssues;

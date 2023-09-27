import { useParams } from "react-router-dom";
import useThemeClass from "../../../hooks/useThemeClass.ts";
import useGetOneProject from "../../../hooks/useGetOneProject.ts";

import "./ProjectPageStyles.scss";
import ProjectPageView from "./parts/ProjectPageView.tsx";
import Page from "../../common/Page/Page.tsx";

const ProjectPage = () => {
  const { projectLink } = useParams();
  const { project, isLoading } = useGetOneProject(projectLink);

  const themeClass = useThemeClass("b-projectPage");

  if (isLoading) return null;
  if (!project) {
    return (
      <div className={`${themeClass}__noExist`}>
        <h2 className={`${themeClass}__noExistTitle`}>
          Project with link {projectLink} no exist
        </h2>
      </div>
    );
  }

  return (
    <Page>
      <div className={themeClass}>
        <ProjectPageView project={project} />
      </div>
    </Page>
  );
};
export default ProjectPage;

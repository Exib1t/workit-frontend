import useThemeClass from "../../../hooks/useThemeClass.ts";
import "./ProjectIssuesHeaderStyles.scss";
import { useNavigate, useParams } from "react-router-dom";
import useGetOneProject from "../../../hooks/useGetOneProject.tsx";
import { AppRoutes } from "../../../router/Routes.ts";
import MoreButton from "../MoreButton/MoreButton.tsx";

const ProjectIssuesHeader = () => {
  const { projectLink } = useParams();
  const { project } = useGetOneProject(projectLink);
  const navigate = useNavigate();

  const themeClass = useThemeClass("b-projectIssuesHeader");

  if (!project) return null;

  return (
    <div className={themeClass}>
      <h2 className={`${themeClass}__breadcrumbs`}>
        <span
          className={`${themeClass}__breadcrumbs -big`}
          onClick={() =>
            navigate(AppRoutes.project.replace(":projectLink", project.link))
          }
        >
          {project.title}
        </span>
        <span className={`${themeClass}__breadcrumbs -medium`}>{">"}</span>
        <span className={`${themeClass}__breadcrumbs -medium`}>Issues</span>
      </h2>
      <MoreButton size={"small"} />
    </div>
  );
};
export default ProjectIssuesHeader;

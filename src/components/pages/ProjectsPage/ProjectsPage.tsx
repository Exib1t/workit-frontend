import useThemeClass from "../../../hooks/useThemeClass.ts";
import "./ProjectsPageStyles.scss";

const ProjectsPage = () => {
  const themeClass = useThemeClass("b-projectsPage");

  return <div className={themeClass}>ProjectsPage</div>;
};
export default ProjectsPage;

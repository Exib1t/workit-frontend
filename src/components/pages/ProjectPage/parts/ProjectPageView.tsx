import { FC } from "react";
import MoreButton from "../../../common/MoreButton/MoreButton.tsx";
import issuesImage from "../../../../assets/images/issues.svg";
import calendarImage from "../../../../assets/images/calendar.svg";
import useThemeClass from "../../../../hooks/useThemeClass.ts";
import { IProject } from "../../../../models/IProject/IProject.ts";
import ProjectCard from "../../../common/Project/ProjectCard/ProjectCard.tsx";
import { AppRoutes } from "../../../../router/Routes.ts";

interface IProps {
  project: IProject;
}

const ProjectPageView: FC<IProps> = ({ project }) => {
  const themeClass = useThemeClass("b-projectPage");

  return (
    <div className={`${themeClass}__wrapper`}>
      <div className={`${themeClass}__header`}>
        <h2 className={`${themeClass}__title`}>{project.title}</h2>
        <MoreButton size={"medium"} disabled />
      </div>
      <div className={`${themeClass}__container`}>
        <ProjectCard
          title={"Issues"}
          image={issuesImage}
          to={AppRoutes.issues.replace(":projectLink", project.link)}
        />
        <ProjectCard
          title={"Planning"}
          image={calendarImage}
          to={AppRoutes.projectPlanning.replace(":projectLink", project.link)}
          disabled
        />
      </div>
    </div>
  );
};
export default ProjectPageView;

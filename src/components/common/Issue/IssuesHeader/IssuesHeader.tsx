import useThemeClass from "../../../../hooks/useThemeClass.ts";
import "./IssuesHeaderStyles.scss";
import { useNavigate } from "react-router-dom";
import { AppRoutes } from "../../../../router/Routes.ts";
import MoreButton from "../../MoreButton/MoreButton.tsx";
import { FC } from "react";
import { IProject } from "../../../../models/IProject/IProject.ts";
import CustomButton from "../../../control/ButtonComponents/CustomButton/CustomButton.tsx";
import Icon from "../../../control/Icon/Icon.tsx";

interface IProps {
  project: IProject;
  handleCreateNewOpen: () => void;
}

const IssuesHeader: FC<IProps> = ({ project, handleCreateNewOpen }) => {
  const navigate = useNavigate();

  const themeClass = useThemeClass("b-projectIssuesHeader");

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
      <div className={`${themeClass}__controls`}>
        <CustomButton
          type={"selection-activated"}
          size={"sm"}
          title={"Add issue"}
          clickHandler={handleCreateNewOpen}
          icon={<Icon type={"plus"} size={16} color={"primary"} />}
        />
        <MoreButton size={"small"} />
      </div>
    </div>
  );
};
export default IssuesHeader;

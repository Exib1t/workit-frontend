import useThemeClass from "../../../hooks/useThemeClass.ts";
import "./ProjectsHeaderStyles.scss";
import { TextField } from "@mui/material";
import Icon from "../../control/Icon/Icon.tsx";
import { FC } from "react";
import CustomButton from "../../control/ButtonComponents/CustomButton/CustomButton.tsx";

interface IProps {
  handleNewProjectOpen: () => void;
}

const ProjectsHeader: FC<IProps> = ({ handleNewProjectOpen }) => {
  const themeClass = useThemeClass("b-projectsHeader");

  return (
    <div className={themeClass}>
      <div className={`${themeClass}__left`}>
        <h2 className={`${themeClass}__title`}>Projects</h2>
        <div className={`${themeClass}__controls`}>
          <TextField placeholder="Search" inputMode="search" size="small" />
          <CustomButton
            type={"text-activated"}
            size={"sm"}
            title={"Filter"}
            icon={<Icon type={"filter"} />}
          />
        </div>
      </div>
      <CustomButton
        type={"selection-activated"}
        size={"sm"}
        title={"New Project"}
        clickHandler={handleNewProjectOpen}
      />
    </div>
  );
};
export default ProjectsHeader;

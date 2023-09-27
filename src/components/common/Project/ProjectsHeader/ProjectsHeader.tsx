import useThemeClass from "../../../../hooks/useThemeClass.ts";
import "./ProjectsHeaderStyles.scss";
import Icon from "../../../control/Icon/Icon.tsx";
import { FC, useState } from "react";
import CustomButton from "../../../control/ButtonComponents/CustomButton/CustomButton.tsx";
import TextInput from "../../../control/TextInput/TextInput.tsx";

interface IProps {
  handleNewProjectOpen: () => void;
}

const ProjectsHeader: FC<IProps> = ({ handleNewProjectOpen }) => {
  const [search, setSearch] = useState("");
  const themeClass = useThemeClass("b-projectsHeader");

  return (
    <div className={themeClass}>
      <div className={`${themeClass}__left`}>
        <h2 className={`${themeClass}__title`}>Projects</h2>
        <div className={`${themeClass}__controls`}>
          <TextInput
            placeholder="Search"
            inputMode="search"
            type={"on-bgd"}
            value={search}
            onChange={(e) => setSearch(e.target.value)}
            disabled //Todo
          />
          <CustomButton
            type={"text-activated"}
            size={"sm"}
            title={"Filter"}
            icon={<Icon type={"filter"} color={"primary"} />}
            disabled //Todo
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

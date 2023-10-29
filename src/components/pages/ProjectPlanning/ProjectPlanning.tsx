import Page from "../../common/Page/Page.tsx";
import Calendar from "../../control/Calendar/Calendar.tsx";
import useThemeClass from "../../../hooks/useThemeClass.ts";

import "./ProjectPlanning.styles.scss";

const ProjectPlanning = () => {
  const themeClass = useThemeClass("b-projectPlanning");

  return (
    <Page>
      <div className={`${themeClass}_content`}>
        <Calendar />
      </div>
    </Page>
  );
};
export default ProjectPlanning;

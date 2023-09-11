import useThemeClass from "../../../hooks/useThemeClass.ts";

import ComponentPageButtons from "./parts/Buttons.tsx";
import ComponentPageInputs from "./parts/Inputs.tsx";
import ComponentsPageRadio from "./parts/Radio.tsx";
import ComponentsPageSelect from "./parts/Select.tsx";
import "./ComponentsPageStyles.scss";

const ComponentsPage = () => {
  const themeClass = useThemeClass("b-componentsPage");

  return (
    <div className={themeClass}>
      <ComponentPageButtons />
      <ComponentsPageRadio />
      <ComponentPageInputs />
      <ComponentsPageSelect />
    </div>
  );
};
export default ComponentsPage;

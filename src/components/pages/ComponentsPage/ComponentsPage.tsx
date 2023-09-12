import useThemeClass from "../../../hooks/useThemeClass.ts";

import ComponentPageButtons from "./parts/Buttons.tsx";
import ComponentPageInputs from "./parts/Inputs.tsx";
import ComponentsPageRadio from "./parts/Radio.tsx";
import ComponentsPageSelect from "./parts/Select.tsx";
import "./ComponentsPageStyles.scss";
import ComponentsPageMultiSelect from "./parts/MultiSelect.tsx";
import ComponentsPageIcons from "./parts/Icons.tsx";
import ComponentPageCheckbox from "./parts/Checkbox.tsx";

const ComponentsPage = () => {
  const themeClass = useThemeClass("b-componentsPage");

  return (
    <div className={themeClass}>
      <ComponentPageButtons />
      <ComponentsPageRadio />
      <ComponentPageCheckbox />
      <ComponentPageInputs />
      <ComponentsPageSelect />
      <ComponentsPageMultiSelect />
      <ComponentsPageIcons />
    </div>
  );
};
export default ComponentsPage;

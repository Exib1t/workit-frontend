import useThemeClass from "../../../../hooks/useThemeClass.ts";
import Checkbox from "../../../control/Checkbox/Checkbox.tsx";

const ComponentPageCheckbox = () => {
  const themeClass = useThemeClass("b-componentsPage");
  return (
    <>
      <h3 className={`${themeClass}__title`}>Checkbox</h3>
      <div className={`${themeClass}__row`}>
        <Checkbox checked={true} />
        <Checkbox checked={false} />
      </div>
    </>
  );
};
export default ComponentPageCheckbox;

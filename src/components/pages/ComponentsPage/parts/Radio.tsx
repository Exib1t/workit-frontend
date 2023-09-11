import useThemeClass from "../../../../hooks/useThemeClass.ts";
import CustomRadioButton from "../../../control/ButtonComponents/CustomRadioButton/CustomRadioButton.tsx";

const ComponentsPageRadio = () => {
  const themeClass = useThemeClass("b-componentsPage");
  return (
    <>
      <h3 className={`${themeClass}__title`}>Radio</h3>
      <div className={`${themeClass}__row`}>
        <CustomRadioButton checked value={"1"} clickHandler={() => {}} />
        <CustomRadioButton
          checked={false}
          value={"1"}
          clickHandler={() => {}}
        />
      </div>
    </>
  );
};
export default ComponentsPageRadio;

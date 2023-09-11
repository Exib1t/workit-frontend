import useThemeClass from "../../../../hooks/useThemeClass.ts";
import TextInput from "../../../control/TextInput/TextInput.tsx";

const ComponentPageInputs = () => {
  const themeClass = useThemeClass("b-componentsPage");
  return (
    <>
      <h3 className={`${themeClass}__title`}>Inputs</h3>
      <div className={`${themeClass}__row`}>
        <TextInput
          type="on-bgd"
          placeholder="Placeholder"
          value={""}
          onChange={() => {}}
        />
        <TextInput
          type="on-srf"
          placeholder="Placeholder"
          value={""}
          onChange={() => {}}
        />
      </div>
    </>
  );
};
export default ComponentPageInputs;

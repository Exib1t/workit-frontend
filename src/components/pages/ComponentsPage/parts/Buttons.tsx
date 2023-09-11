import CustomButton from "../../../control/ButtonComponents/CustomButton/CustomButton.tsx";
import useThemeClass from "../../../../hooks/useThemeClass.ts";

const ComponentPageButtons = () => {
  const themeClass = useThemeClass("b-componentsPage");
  return (
    <>
      <h3 className={`${themeClass}__title`}>Buttons</h3>
      <div className={`${themeClass}__row`}>
        <div className={`${themeClass}__column`}>
          <CustomButton type={"primary"} size={"md"} title={"Button"} />
          <CustomButton type={"primary"} size={"sm"} title={"Button"} />
          <CustomButton type={"primary"} size={"xs"} title={"Button"} />
        </div>
        <div className={`${themeClass}__column`}>
          <CustomButton type={"secondary"} size={"md"} title={"Button"} />
          <CustomButton type={"secondary"} size={"sm"} title={"Button"} />
          <CustomButton type={"secondary"} size={"xs"} title={"Button"} />
        </div>
        <div className={`${themeClass}__column`}>
          <CustomButton type={"tertiary"} size={"md"} title={"Button"} />
          <CustomButton type={"tertiary"} size={"sm"} title={"Button"} />
          <CustomButton type={"tertiary"} size={"xs"} title={"Button"} />
        </div>
        <div className={`${themeClass}__column`}>
          <CustomButton type={"selection-plain"} size={"md"} title={"Button"} />
          <CustomButton type={"selection-plain"} size={"sm"} title={"Button"} />
          <CustomButton type={"selection-plain"} size={"xs"} title={"Button"} />
        </div>
        <div className={`${themeClass}__column`}>
          <CustomButton
            type={"selection-activated"}
            size={"md"}
            title={"Button"}
          />
          <CustomButton
            type={"selection-activated"}
            size={"sm"}
            title={"Button"}
          />
          <CustomButton
            type={"selection-activated"}
            size={"xs"}
            title={"Button"}
          />
        </div>
        <div className={`${themeClass}__column`}>
          <CustomButton type={"text-plain"} size={"md"} title={"Button"} />
          <CustomButton type={"text-plain"} size={"sm"} title={"Button"} />
          <CustomButton type={"text-plain"} size={"xs"} title={"Button"} />
        </div>
        <div className={`${themeClass}__column`}>
          <CustomButton type={"text-activated"} size={"md"} title={"Button"} />
          <CustomButton type={"text-activated"} size={"sm"} title={"Button"} />
          <CustomButton type={"text-activated"} size={"xs"} title={"Button"} />
        </div>
        <div className={`${themeClass}__column`}>
          <CustomButton type={"accept"} size={"md"} title={"Button"} />
          <CustomButton type={"accept"} size={"sm"} title={"Button"} />
          <CustomButton type={"accept"} size={"xs"} title={"Button"} />
        </div>
        <div className={`${themeClass}__column`}>
          <CustomButton type={"decline"} size={"md"} title={"Button"} />
          <CustomButton type={"decline"} size={"sm"} title={"Button"} />
          <CustomButton type={"decline"} size={"xs"} title={"Button"} />
        </div>
      </div>
    </>
  );
};
export default ComponentPageButtons;

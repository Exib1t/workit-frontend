import useThemeClass from "../../../../hooks/useThemeClass.ts";
import Icon from "../../../control/Icon/Icon.tsx";

const ComponentsPageIcons = () => {
  const themeClass = useThemeClass("b-componentsPage");

  return (
    <>
      <h3 className={`${themeClass}__title`}>Icons</h3>
      <h3 className={`${themeClass}__label`}>size 12</h3>
      <div className={`${themeClass}__row`}>
        <Icon type={"close"} />
        <Icon type={"filter"} />
        <Icon type={"return"} />
        <Icon type={"search"} />
        <Icon type={"settings"} />
        <Icon type={"more"} />
        <Icon type={"logout"} />
        <Icon type={"chevron-down"} />
        <Icon type={"tick"} />
        <Icon type={"folder"} />
      </div>
      <h3 className={`${themeClass}__label`}>size 16</h3>
      <div className={`${themeClass}__row`}>
        <Icon type={"close"} size={16} />
        <Icon type={"filter"} size={16} />
        <Icon type={"return"} size={16} />
        <Icon type={"search"} size={16} />
        <Icon type={"settings"} size={16} />
        <Icon type={"more"} size={16} />
        <Icon type={"logout"} size={16} />
        <Icon type={"chevron-down"} size={16} />
        <Icon type={"tick"} size={16} />
        <Icon type={"folder"} size={16} />
      </div>
      <h3 className={`${themeClass}__label`}>size 20</h3>
      <div className={`${themeClass}__row`}>
        <Icon type={"close"} size={20} />
        <Icon type={"filter"} size={20} />
        <Icon type={"return"} size={20} />
        <Icon type={"search"} size={20} />
        <Icon type={"settings"} size={20} />
        <Icon type={"more"} size={20} />
        <Icon type={"logout"} size={20} />
        <Icon type={"chevron-down"} size={20} />
        <Icon type={"tick"} size={20} />
        <Icon type={"folder"} size={20} />
      </div>
      <h3 className={`${themeClass}__label`}>size 24</h3>
      <div className={`${themeClass}__row`}>
        <Icon type={"close"} size={24} />
        <Icon type={"filter"} size={24} />
        <Icon type={"return"} size={24} />
        <Icon type={"search"} size={24} />
        <Icon type={"settings"} size={24} />
        <Icon type={"more"} size={24} />
        <Icon type={"logout"} size={24} />
        <Icon type={"chevron-down"} size={24} />
        <Icon type={"tick"} size={24} />
        <Icon type={"folder"} size={24} />
      </div>
      <h3 className={`${themeClass}__label`}>size 32</h3>
      <div className={`${themeClass}__row`}>
        <Icon type={"close"} size={32} />
        <Icon type={"filter"} size={32} />
        <Icon type={"return"} size={32} />
        <Icon type={"search"} size={32} />
        <Icon type={"settings"} size={32} />
        <Icon type={"more"} size={32} />
        <Icon type={"logout"} size={32} />
        <Icon type={"chevron-down"} size={32} />
        <Icon type={"tick"} size={32} />
        <Icon type={"folder"} size={32} />
      </div>
      <h3 className={`${themeClass}__label`}>size 64</h3>
      <div className={`${themeClass}__row`}>
        <Icon type={"close"} size={64} />
        <Icon type={"filter"} size={64} />
        <Icon type={"return"} size={64} />
        <Icon type={"search"} size={64} />
        <Icon type={"settings"} size={64} />
        <Icon type={"more"} size={64} />
        <Icon type={"logout"} size={64} />
        <Icon type={"chevron-down"} size={64} />
        <Icon type={"tick"} size={64} />
        <Icon type={"folder"} size={64} />
      </div>
      <h3 className={`${themeClass}__label`}>size 128</h3>
      <div className={`${themeClass}__row`}>
        <Icon type={"close"} size={128} />
        <Icon type={"filter"} size={128} />
        <Icon type={"return"} size={128} />
        <Icon type={"search"} size={128} />
        <Icon type={"settings"} size={128} />
        <Icon type={"more"} size={128} />
        <Icon type={"logout"} size={128} />
        <Icon type={"chevron-down"} size={128} />
        <Icon type={"tick"} size={128} />
        <Icon type={"folder"} size={128} />
      </div>
    </>
  );
};
export default ComponentsPageIcons;

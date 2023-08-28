import useThemeClass from "../../../hooks/useThemeClass.ts";
import Icon from "../../control/Icon/Icon.tsx";
import IconButtonCustom from "../../control/IconButtonCustom/IconButtonCustom.tsx";

const MoreButton = () => {
  const themeClass = useThemeClass("b-moreButton");

  return (
    <IconButtonCustom className={themeClass}>
      <Icon type={"more"} />
    </IconButtonCustom>
  );
};
export default MoreButton;

import useThemeClass from "../../../hooks/useThemeClass.ts";
import "./DividerStyles.scss";

const Divider = () => {
  const themeClass = useThemeClass("b-divider");
  return <div className={themeClass} />;
};
export default Divider;

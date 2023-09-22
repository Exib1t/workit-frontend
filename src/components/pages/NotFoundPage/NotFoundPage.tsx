import "./NotFoundPageStyles.scss";
import useThemeClass from "../../../hooks/useThemeClass.ts";

const NotFoundPage = () => {
  const themeClass = useThemeClass("b-notFoundPage");

  return (
    <div className={themeClass}>
      <h2 className={`${themeClass}__title`}>
        404 <br /> Page not found
      </h2>
    </div>
  );
};
export default NotFoundPage;

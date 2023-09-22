import NavItem from "./HeaderNavigationItem.tsx";
import useThemeClass from "../../../../../hooks/useThemeClass.ts";
import { AppRoutes } from "../../../../../router/Routes.ts";

const HeaderNavigation = () => {
  const headerClass = useThemeClass("b-header");

  return (
    <nav className={`${headerClass}__nav`}>
      <NavItem
        tooltip={"Projects"}
        title={"projects"}
        route={AppRoutes.projects}
      />
      <NavItem
        tooltip={"Calendar"}
        title={"calendar"}
        route={AppRoutes.components}
      />
    </nav>
  );
};
export default HeaderNavigation;

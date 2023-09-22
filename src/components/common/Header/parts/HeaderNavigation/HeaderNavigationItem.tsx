import Icon, { IconTypes } from "../../../../control/Icon/Icon.tsx";
import { NavLink } from "react-router-dom";
import { FC } from "react";
import useThemeClass from "../../../../../hooks/useThemeClass.ts";
import CustomTooltip from "../../../../control/CustomTooltip/CustomTooltip.tsx";

interface IProps {
  title: IconTypes;
  route: string;
  disabled?: boolean;
  tooltip: string;
}

const NavItem: FC<IProps> = ({ title, route, disabled, tooltip }) => {
  const headerClass = useThemeClass("b-header");
  const getIsActiveLink = (route: string) => {
    return (
      location.pathname.includes(route) &&
      !location.pathname.includes(`${route}/`)
    );
  };

  return (
    <CustomTooltip title={tooltip}>
      <NavLink
        to={route}
        className={`${headerClass}__navItem ${disabled ? "-disabled" : ""}`}
      >
        <Icon
          type={title}
          size={24}
          color={getIsActiveLink(route) ? "primary" : "secondary"}
        />
      </NavLink>
    </CustomTooltip>
  );
};

export default NavItem;

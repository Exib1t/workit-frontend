import { FC } from "react";
import { Popover } from "@mui/material";
import ListCustom from "../../../control/ListCustom/ListCustom.tsx";
import ListItemCustom from "../../../control/ListItemCustom/ListItemCustom.tsx";
import useThemeClass from "../../../../hooks/useThemeClass.ts";
import "./HeaderMenuStyles.scss";
import Icon from "../../../control/Icon/Icon.tsx";

interface IProps {
  isOpen: boolean;
  handleClose: () => void;
  anchorEl: Element | null;
}

const HeaderMenu: FC<IProps> = ({ handleClose, isOpen, anchorEl }) => {
  const themeClass = useThemeClass("b-headerMenu");

  return (
    <Popover
      open={isOpen}
      onClose={handleClose}
      anchorEl={anchorEl}
      classes={{
        paper: themeClass,
      }}
      anchorOrigin={{ horizontal: "right", vertical: "bottom" }}
    >
      <ListCustom>
        <ListItemCustom icon={<Icon type={"settings"} />}>
          Preferences
        </ListItemCustom>
        <ListItemCustom icon={<Icon type={"settings"} />}>
          Preferences
        </ListItemCustom>
      </ListCustom>
    </Popover>
  );
};
export default HeaderMenu;

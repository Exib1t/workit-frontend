import useThemeClass from "../../../hooks/useThemeClass.ts";
import Icon from "../Icon/Icon.tsx";
import "./LogoutButtonStyles.scss";
import { useAppDispatch } from "../../../store";
import { logout } from "../../../store/reducers/authSlice.ts";
import IconButtonCustom from "../IconButtonCustom/IconButtonCustom.tsx";

const LogoutButton = () => {
  const themeClass = useThemeClass("b-logoutButton");
  const dispatch = useAppDispatch();

  const handleClick = () => {
    dispatch(logout());
  };

  return (
    <IconButtonCustom className={themeClass} onClick={handleClick}>
      <Icon type={"logout"} />
    </IconButtonCustom>
  );
};
export default LogoutButton;

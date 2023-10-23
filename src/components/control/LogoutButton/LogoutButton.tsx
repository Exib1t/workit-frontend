import useThemeClass from "../../../hooks/useThemeClass.ts";
import Icon from "../Icon/Icon.tsx";
import "./LogoutButtonStyles.scss";
import { useAppDispatch } from "../../../store";
import { logout } from "../../../store/auth/authSlice.ts";
import IconButtonCustom from "../IconButtonCustom/IconButtonCustom.tsx";
import { useNavigate } from "react-router-dom";
import { AppRoutes } from "../../../router/Routes.ts";

const LogoutButton = () => {
  const themeClass = useThemeClass("b-logoutButton");
  const navigate = useNavigate();
  const dispatch = useAppDispatch();

  const handleClick = () => {
    dispatch(logout());
    navigate(AppRoutes.signIn);
  };

  return (
    <IconButtonCustom className={themeClass} onClick={handleClick}>
      <Icon type={"logout"} size={24} />
    </IconButtonCustom>
  );
};
export default LogoutButton;

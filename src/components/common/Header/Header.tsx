import "./HeaderStyles.scss";
import Logo from "../Logo/Logo.tsx";
import useThemeClass from "../../../hooks/useThemeClass.ts";
import ButtonCustom from "../../control/ButtonCustom/ButtonCustom.tsx";
import { useNavigate } from "react-router-dom";
import { AppRoutes } from "../../../router/Routes.ts";
import useAuthenticated from "../../../hooks/useAuthenticated.tsx";
import ThemeSwitcher from "../../control/ThemeSwitcher/ThemeSwitcher.tsx";
import ProfileButton from "../ProfileButton/ProfileButton.tsx";
import LogoutButton from "../../control/LogoutButton/LogoutButton.tsx";
import MoreButton from "../MoreButton/MoreButton.tsx";

const Header = () => {
  const headerClass = useThemeClass("b-header");
  const navigate = useNavigate();
  const isAuthenticated = useAuthenticated();

  return (
    <header className={headerClass}>
      <Logo />
      {isAuthenticated ? (
        <div className={`${headerClass}__controls`}>
          <ThemeSwitcher />
          <ProfileButton
            first_name="Dmitriy"
            last_name="Maznyak"
            email="dmaznyak2604@gmail.com"
          />
          <LogoutButton />
          <MoreButton />
        </div>
      ) : (
        <div className={`${headerClass}__buttons`}>
          <ThemeSwitcher />
          <ButtonCustom
            variant="text"
            className={`${headerClass}__button`}
            onClick={() => navigate(AppRoutes.signIn)}
          >
            Sign In
          </ButtonCustom>
          <ButtonCustom
            className={`${headerClass}__button`}
            onClick={() => navigate(AppRoutes.signUp)}
          >
            Sign Up
          </ButtonCustom>
        </div>
      )}
    </header>
  );
};
export default Header;

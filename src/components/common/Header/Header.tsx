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
import HeaderMenu from "./parts/HeaderMenu.tsx";
import { MouseEventHandler, useState } from "react";
import CustomButton from "../../control/ButtonComponents/CustomButton/CustomButton.tsx";

const Header = () => {
  const [isHeaderMenuOpen, setIsHeaderMenuOpen] = useState<Element | null>(
    null,
  );
  const headerClass = useThemeClass("b-header");
  const navigate = useNavigate();
  const isAuthenticated = useAuthenticated();

  const handleHeaderMenuClose = () => {
    setIsHeaderMenuOpen(null);
  };

  const handleHeaderMenuOpen: MouseEventHandler<HTMLButtonElement> = (e) => {
    setIsHeaderMenuOpen(e.currentTarget);
  };

  return (
    <header className={headerClass}>
      <div className={`${headerClass}__left`}>
        <Logo />
        <CustomButton
          type="selection-activated"
          size="md"
          title={"Components Page"}
          clickHandler={() => navigate(AppRoutes.components)}
        />
      </div>
      {isAuthenticated ? (
        <div className={`${headerClass}__controls`}>
          <ThemeSwitcher />
          <ProfileButton
            first_name="Dmitriy"
            last_name="Maznyak"
            email="dmaznyak2604@gmail.com"
          />
          <LogoutButton />
          <MoreButton onClick={handleHeaderMenuOpen} />
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
      <HeaderMenu
        isOpen={!!isHeaderMenuOpen}
        handleClose={handleHeaderMenuClose}
        anchorEl={isHeaderMenuOpen}
      />
    </header>
  );
};
export default Header;

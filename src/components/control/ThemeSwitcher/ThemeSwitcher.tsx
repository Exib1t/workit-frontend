import { Switch } from "@mui/material";
import { useAppDispatch, useAppSelector } from "../../../store";
import { setTheme } from "../../../store/global/globalSlice.ts";
import { ChangeEvent } from "react";
import useThemeClass from "../../../hooks/useThemeClass.ts";

import "./ThemeSwitcherStyles.scss";

const ThemeSwitcher = () => {
  const dispatch = useAppDispatch();
  const { theme } = useAppSelector((state) => state.global);
  const themeClass = useThemeClass("b-themeSwitcher");

  const changeTheme = (_: ChangeEvent<HTMLInputElement>, value: boolean) => {
    const theme = value ? "dark" : "light";
    localStorage.setItem("theme", theme);
    dispatch(setTheme(theme));
  };

  return (
    <div className={themeClass}>
      <span className={`${themeClass}__text`}>Light</span>
      <Switch
        className={`${themeClass}__switcher`}
        checked={theme === "dark"}
        onChange={changeTheme}
      />
      <span className={`${themeClass}__text`}>Dark</span>
    </div>
  );
};
export default ThemeSwitcher;

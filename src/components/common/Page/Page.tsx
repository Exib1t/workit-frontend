import { FC, ReactNode } from "react";
import useThemeClass from "../../../hooks/useThemeClass.ts";
import "./PageStyles.scss";

interface IProps {
  children: ReactNode;
}

const Page: FC<IProps> = ({ children }) => {
  const themeClass = useThemeClass("b-page");

  return <div className={themeClass}>{children}</div>;
};
export default Page;

import { FC, HTMLProps } from "react";
import useThemeClass from "../../../hooks/useThemeClass.ts";
import "./ListStyles.scss";

interface IProps extends HTMLProps<HTMLUListElement> {}

const ListCustom: FC<IProps> = (props) => {
  const themeClass = useThemeClass("b-list");

  return (
    <ul {...props} className={`${themeClass} ${props.className || ""}`}>
      {props.children}
    </ul>
  );
};
export default ListCustom;

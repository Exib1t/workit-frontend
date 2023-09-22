import useThemeClass from "../../../hooks/useThemeClass.ts";
import { FC } from "react";

import "./ProjectCardStyles.scss";
import { useNavigate } from "react-router-dom";

interface IProps {
  title: string;
  image: string;
  disabled?: boolean;
  to: string;
}

const ProjectCard: FC<IProps> = ({ title, image, disabled, to }) => {
  const navigate = useNavigate();
  const themeClass = useThemeClass("b-projectPageCard");

  return (
    <div
      className={`${themeClass} ${disabled ? "-disabled" : ""}`}
      onClick={() => navigate(to)}
    >
      <h6 className={`${themeClass}__title`}>{title}</h6>
      <img src={image} alt={title} className={`${themeClass}__image`} />
    </div>
  );
};
export default ProjectCard;

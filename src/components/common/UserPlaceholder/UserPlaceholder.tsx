import { FC } from "react";
import AvatarCustom from "../AvatarCustom/AvatarCustom.tsx";
import useThemeClass from "../../../hooks/useThemeClass.ts";
import "./UserPlaceholder.styles.scss";

interface IProps {
  first_name: string;
  last_name: string;
  isPrimary?: boolean;
}

const UserPlaceholder: FC<IProps> = ({ first_name, last_name, isPrimary }) => {
  const themeClass = useThemeClass("b-userPlaceholder");

  return (
    <div className={themeClass}>
      <AvatarCustom size="small">{`${first_name.charAt(0)}${last_name.charAt(
        0,
      )}`}</AvatarCustom>
      <span
        className={`${themeClass}__assigneeText ${isPrimary ? "-primary" : ""}`}
      >
        {first_name} {last_name}
      </span>
    </div>
  );
};
export default UserPlaceholder;

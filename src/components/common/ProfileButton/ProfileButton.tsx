import useThemeClass from "../../../hooks/useThemeClass.ts";
import AvatarCustom from "../AvatarCustom/AvatarCustom.tsx";
import "./ProfileButtonStyles.scss";
import { FC } from "react";

interface IProps {
  first_name: string;
  last_name: string;
  email: string;
}

const ProfileButton: FC<IProps> = ({ first_name, last_name, email }) => {
  const themeClass = useThemeClass("b-profileButton");

  return (
    <div className={themeClass}>
      <AvatarCustom size="medium">{`${first_name.charAt(0)}${last_name.charAt(
        0,
      )}`}</AvatarCustom>
      <div className={`${themeClass}__column`}>
        <span
          className={`${themeClass}__name`}
        >{`${first_name} ${last_name}`}</span>
        <span className={`${themeClass}__email`}>{email}</span>
      </div>
    </div>
  );
};
export default ProfileButton;

import { FC } from "react";
import useThemeClass from "../../../../hooks/useThemeClass.ts";
import AvatarCustom from "../../AvatarCustom/AvatarCustom.tsx";
import "./IssueAssigneeStyles.scss";
import { ICompressedUser } from "../../../../models/IUser/IUser.ts";
import { Skeleton } from "@mui/material";

interface IProps {
  user: ICompressedUser | { first_name: string; last_name: string } | null;
}

const IssueAssignee: FC<IProps> = ({ user }) => {
  const themeClass = useThemeClass("b-issueAssignee");

  if (!user) {
    return (
      <div className={`${themeClass}__skeleton`}>
        <Skeleton variant={"circular"} width={25} height={25} />
        <span className={`${themeClass}__assigneeText`}>
          <Skeleton variant={"text"} width={40} height={14} />
          <Skeleton variant={"text"} width={40} height={14} />
        </span>
      </div>
    );
  }

  return (
    <div className={themeClass}>
      <AvatarCustom size="small">{`${user.first_name.charAt(
        0,
      )}${user.last_name.charAt(0)}`}</AvatarCustom>
      <span className={`${themeClass}__assigneeText`}>
        {user.first_name} {user.last_name}
      </span>
    </div>
  );
};
export default IssueAssignee;

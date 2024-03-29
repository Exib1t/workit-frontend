import { FC } from "react";
import useThemeClass from "../../../../hooks/useThemeClass.ts";
import { ICompressedUser } from "../../../../models/IUser/IUser.ts";
import { Skeleton } from "@mui/material";

import "./IssueAssigneeStyles.scss";
import UserPlaceholder from "../../UserPlaceholder/UserPlaceholder.tsx";

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
      <UserPlaceholder
        first_name={user.first_name}
        last_name={user.last_name}
      />
    </div>
  );
};
export default IssueAssignee;

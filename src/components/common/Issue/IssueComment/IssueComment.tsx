import { FC } from "react";
import useThemeClass from "../../../../hooks/useThemeClass.ts";
import UserPlaceholder from "../../UserPlaceholder/UserPlaceholder.tsx";
import { IComment } from "../../../../models/IComment/IComment.ts";
import { useAppDispatch, useAppSelector } from "../../../../store";
import SystemButton from "../../../control/SystemButton/SystemButton.tsx";
import { deleteComment } from "../../../../store/comments/commentsThunk.ts";
import parse from 'html-react-parser';

import "./IssueComment.styles.scss";

const millisecondsInMinute = 60 * 1000;
const millisecondsInHour = 60 * millisecondsInMinute;
const millisecondsInDay = 24 * millisecondsInHour;

interface IProps {
  comment: IComment;
  issueId: number;
  projectId: number;
  handleEdit: (commentId: number) => void;
}

const IssueComment: FC<IProps> = ({
  comment,
  issueId,
  projectId,
  handleEdit,
}) => {
  const dispatch = useAppDispatch();
  const { user } = useAppSelector((state) => state.user);
  const themeClass = useThemeClass("b-issueComment");

  const currentDate = new Date();

  // @ts-ignore
  const timeDifference = currentDate - new Date(comment.updatedAt);

  const minutesAgo = Math.floor(timeDifference / millisecondsInMinute);
  const hoursAgo = Math.floor(timeDifference / millisecondsInHour);
  const daysAgo = Math.floor(timeDifference / millisecondsInDay);

  const timeAgo =
    minutesAgo > 59
      ? hoursAgo > 24
        ? `${daysAgo} days ago`
        : `${hoursAgo} hours ago`
      : `${minutesAgo} minutes ago`;

  const handleDelete = () => {
    dispatch(
      deleteComment({
        commentId: comment.id,
        issueId,
        projectId,
        callbacks: {},
      }),
    );
  };

  const onEdit = () => {
    handleEdit(comment.id);
  };

  return (
    <div className={themeClass}>
      <div className={`${themeClass}_header`}>
        <div className={`${themeClass}_header_left`}>
          <UserPlaceholder
            first_name={comment.author.first_name}
            last_name={comment.author.last_name}
            isPrimary
          />
          <span className={`${themeClass}_header_date`}>
            {`${
              comment.createdAt !== comment.updatedAt ? "update" : "added"
            } comment - ${timeAgo}`}
          </span>
        </div>
        <div className={`${themeClass}_header_left`}>
          {user?.id === comment.author.id && (
            <>
              <SystemButton
                type={"edit"}
                size={"md"}
                clickHandler={onEdit}
                variant={"transparent"}
              />
              <SystemButton
                type={"delete"}
                size={"md"}
                clickHandler={handleDelete}
                variant={"transparent"}
              />
            </>
          )}
        </div>
      </div>
      <div className={`${themeClass}_content`}>
        {parse(comment.body)}
      </div>
    </div>
  );
};
export default IssueComment;

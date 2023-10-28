import { FC, useEffect, useRef, useState } from "react";
import useThemeClass from "../../../hooks/useThemeClass.ts";

import "./CommentsView.styles.scss";
import { useAppDispatch, useAppSelector } from "../../../store";
import {
  createComment,
  fetchCommentsByIssueId,
  updateComment,
} from "../../../store/comments/commentsThunk.ts";
import IssueComment from "../Issue/IssueComment/IssueComment.tsx";
import TextQuillEditor from "../../control/TextQuillEditor/TextQuillEditor.tsx";
import CustomButton from "../../control/ButtonComponents/CustomButton/CustomButton.tsx";
import { useCheckIfElementHaveScroll } from "../../../hooks/useElementHasScroll.ts";
import cn from "classnames";

const whiteSpaceRegex = /<p>\s*<\/p>/;

interface IProps {
  issueId: number;
  projectId: number;
  handleScrollToBottom: () => void;
}

const CommentsView: FC<IProps> = ({
  issueId,
  projectId,
  handleScrollToBottom,
}) => {
  const dispatch = useAppDispatch();
  const { comments, isFirstLoading } = useAppSelector(
    (state) => state.comments,
  );
  const listRef = useRef<HTMLDivElement>(null);
  const [isCommentEditorOpen, setIsCommentEditorOpen] = useState(false);
  const [editorValue, setEditorValue] = useState("");
  const [editableId, setEditableId] = useState<number | null>(null);
  const listHasScroll = useCheckIfElementHaveScroll(listRef);
  const themeClass = useThemeClass("b-commentsView");

  useEffect(() => {
    dispatch(fetchCommentsByIssueId({ issueId, projectId }));
  }, [issueId]);

  useEffect(() => {
    if (editableId) {
      const editableBody = comments.find((comment) => comment.id === editableId)
        ?.body;
      if (editableBody) {
        setEditorValue(editableBody);
        handleOpenEditor();
      }
    }
  }, [editableId]);

  const handleSend = () => {
    if (editableId) {
      dispatch(
        updateComment({
          issueId,
          projectId,
          updatedComment: { id: editableId, body: editorValue },
          callbacks: {},
        }),
      );
    } else {
      dispatch(
        createComment({
          issueId,
          projectId,
          data: { body: editorValue },
          callbacks: {},
        }),
      );
    }
    setEditableId(null);
    setEditorValue("");
  };

  const handleEdit = (commentId: number) => {
    setEditableId(commentId);
  };

  const handleOpenEditor = () => {
    setIsCommentEditorOpen(true);
    handleScrollToBottom();
  };

  const handleCloseEditor = () => {
    setIsCommentEditorOpen(false);
    setEditableId(null);
    setEditorValue("");
  };

  return (
    <div className={themeClass}>
      {comments.length && !isFirstLoading ? (
        <div
          className={cn(`${themeClass}_list`, { ["-scroll"]: listHasScroll })}
          ref={listRef}
        >
          {comments.map((comment) => (
            <IssueComment
              key={`comments-${comment.id}`}
              comment={comment}
              issueId={issueId}
              projectId={projectId}
              handleEdit={handleEdit}
            />
          ))}
        </div>
      ) : (
        <div className={`${themeClass}_empty`}>No comments yet</div>
      )}
      <div className={`${themeClass}_footer`}>
        {isCommentEditorOpen ? (
          <TextQuillEditor
            placeholder={"Your comment..."}
            customButtonTitle={editableId ? "Save" : "Send"}
            value={editorValue}
            onChange={setEditorValue}
            isFooter
            isPrimary
            customHeight={"100%"}
            disabled={
              !editorValue.trim() ||
              editorValue === "<p><br></p>" ||
              whiteSpaceRegex.test(editorValue)
            }
            isCancel
            handleCancel={handleCloseEditor}
            handleSave={handleSend}
          />
        ) : (
          <CustomButton
            type={"selection-activated"}
            size={"md"}
            title={"Add a comment"}
            clickHandler={handleOpenEditor}
            className={`${themeClass}_button`}
          />
        )}
      </div>
    </div>
  );
};
export default CommentsView;

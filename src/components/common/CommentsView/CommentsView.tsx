import { FC, useEffect, useState } from "react";
import useThemeClass from "../../../hooks/useThemeClass.ts";
import SystemButton from "../../control/SystemButton/SystemButton.tsx";

import "./CommentsView.styles.scss";
import { useAppDispatch, useAppSelector } from "../../../store";
import {
  createComment,
  fetchCommentsByIssueId,
  updateComment,
} from "../../../store/comments/commentsThunk.ts";
import IssueComment from "../Issue/IssueComment/IssueComment.tsx";
import TextQuillEditor from "../../control/TextQuillEditor/TextQuillEditor.tsx";

const whiteSpaceRegex = /<p>\s*<\/p>/;

interface IProps {
  issueId: number;
  projectId: number;
}

const CommentsView: FC<IProps> = ({ issueId, projectId }) => {
  const dispatch = useAppDispatch();
  const { comments, isFirstLoading } = useAppSelector(
    (state) => state.comments,
  );
  const [isCommentEditorOpen, setIsCommentEditorOpen] = useState(false);
  const [editorValue, setEditorValue] = useState("");
  const [editableId, setEditableId] = useState<number | null>(null);
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
  };

  const handleCloseEditor = () => {
    setIsCommentEditorOpen(false);
    setEditableId(null);
    setEditorValue("");
  };

  return (
    <div className={themeClass}>
      {comments.length && !isFirstLoading ? (
        <div className={`${themeClass}_list`}>
          {comments.map((comment) => (
            <IssueComment
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
            customHeight={45}
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
          <SystemButton
            type={"plus"}
            size={"lg"}
            variant={"filled"}
            customClass={`${themeClass}_footer_button`}
            clickHandler={handleOpenEditor}
          />
        )}
      </div>
    </div>
  );
};
export default CommentsView;

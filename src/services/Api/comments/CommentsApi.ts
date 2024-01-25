import {AxiosResponse} from "axios";
import api from "../../api.ts";
import {IComment, ICommentCreate, ICommentUpdate} from "../../../models/IComment/IComment.ts";
import {createComment, updateComment} from "../../../store/comments/commentsThunk.ts";

class CommentsApi {

  getCommentsByIssueId(projectId: number, issueId: number): Promise<AxiosResponse<IComment[]>> {
    return api.get(
      `projects/${projectId}/issues/${issueId}/comments`,
    );
  }

  createComment(projectId: number, issueId: number, bodyParams: ICommentCreate): Promise<AxiosResponse<IComment[]>> {
    return api.post(
      `projects/${projectId}/issues/${issueId}/comments`,
      bodyParams,
    );
  }

  updateComment(projectId: number, issueId: number, commentId: number, bodyParams: ICommentUpdate): Promise<AxiosResponse<IComment[]>> {
    return api.patch(
      `projects/${projectId}/issues/${issueId}/comments/${commentId}`,
      bodyParams,
    );
  }

  deleteComment(projectId: number, issueId: number, commentId: number): Promise<AxiosResponse<IComment[]>> {
    return api.delete(
      `projects/${projectId}/issues/${issueId}/comments/${commentId}`,
    );
  }

}

export default new CommentsApi();

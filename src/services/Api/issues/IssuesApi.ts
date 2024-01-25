import {AxiosResponse} from "axios";
import api from "../../api.ts";
import {IIssue, IIssueCreate, IIssueUpdate, IssueUpdateTime} from "../../../models/IIssue/IIssue.ts";
import {fetchIssueAvailableAssignments} from "../../../store/issues/issuesThunks.ts";
import {ICompressedUser} from "../../../models/IUser/IUser.ts";

class IssuesApi {

  getIssuesByProjectId(projectId: number): Promise<AxiosResponse<IIssue[]>> {
    return api.get(`projects/${projectId}/issues`);
  }

  createIssue(projectId: number, bodyParams: IIssueCreate): Promise<AxiosResponse<IIssue[]>> {
    return api.post(
      `projects/${projectId}/issues`,
      bodyParams,
    );
  }

  updateIssue(projectId: number, issueId: number, bodyParams: IIssueUpdate): Promise<AxiosResponse<IIssue[]>> {
    return api.patch(
      `projects/${projectId}/issues/${issueId}`,
      bodyParams,
    );
  }

  deleteIssue(projectId: number, issueId: number): Promise<AxiosResponse<IIssue[]>> {
    return api.delete(
      `projects/${projectId}/issues/${issueId}`,
    );
  }

  logIssueTime(projectId: number, issueId: number, bodyParams: {time: IssueUpdateTime}): Promise<AxiosResponse<IIssue[]>> {
    return api.post(
      `projects/${projectId}/issues/${issueId}/time`,
      bodyParams,
    );
  }

  getIssueAvailableAssignments(projectId: number, issueId: number): Promise<AxiosResponse<ICompressedUser[]>> {
    return api.get(
      `projects/${projectId}/issues/${issueId}/assignments`,
    );
  }

}

export default new IssuesApi();

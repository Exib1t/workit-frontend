import { ICompressedUser } from "../IUser/IUser.ts";

export interface IIssue {
  id: number;
  link: string;
  title: string;
  description: string;
  status: IssueStatusType;
  priority: IssuePriorityType;
  type: IssueTypes;
  createdAt: string;
  updatedAt: string;
  projectId: number;
  assignee: ICompressedUser;
  reporter: ICompressedUser;
  time: IssueTime;
}

export interface IIssueCreate {
  title: string;
  priority: IssuePriorityType;
  type: IssueTypes;
  assignee: number;
  projectId: number;
  time: IssueCreateTime;
}

export interface IIssueUpdate {
  id: number;
  title?: string;
  description?: string;
  status?: IssueStatusType;
  priority?: IssuePriorityType;
  type?: IssueTypes;
  assignee?: ICompressedUser;
  time?: IssueCreateTime;
}

export type IssueStatusType = "Done" | "To Estimate" | "In Progress";
export type IssuePriorityType = "High" | "Medium" | "Low";
export type IssueTypes = "Task" | "Bug" | "Subtask";
export interface IssueTime {
  estimated: number;
  logged: number;
  remaining: number;
}

export interface IssueCreateTime {
  estimated: string;
}

export interface IssueUpdateTime {
  estimated?: string;
  logged?: string;
}

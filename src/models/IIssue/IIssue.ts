import { ICompressedUser } from "../IUser/IUser.ts";

export interface IIssue {
  id: number;
  link: string;
  title: string;
  description: string;
  status: IssueStatusType;
  priority: IssuePriorityType;
  type: IssueType;
  createdAt: string;
  updatedAt: string;
  projectId: number;
  assignee: ICompressedUser;
  reporter: ICompressedUser;
}

export interface IIssueCreate {
  title: string;
  description: string;
  priority: IssuePriorityType;
  type: IssueType;
  assignee: number;
  projectId: number;
}

export type IssueStatusType = "Done" | "To Estimate" | "In Progress";
export type IssuePriorityType = "High" | "Medium" | "Low";
export type IssueType = "Task" | "Bug" | "Subtask";

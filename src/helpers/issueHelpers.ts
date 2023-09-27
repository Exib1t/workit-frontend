import { IconTypes } from "../components/control/Icon/Icon.tsx";
import { IIssue, IssueStatusType } from "../models/IIssue/IIssue.ts";
import { IColors } from "../models/IColors/IColors.ts";

export const getIconType = (issue: IIssue): IconTypes => {
  return issue.type === "Task"
    ? "task"
    : issue.type === "Subtask"
    ? "subtask"
    : "bug";
};

export const getIconPriority = (issue: IIssue): IconTypes => {
  return issue.priority === "High"
    ? "chevron-high"
    : issue.priority === "Medium"
    ? "chevron-medium"
    : "chevron-low";
};

export const getIssueStatusColor = (status: IssueStatusType): IColors => {
  return status === "To Estimate"
    ? "blue"
    : status === "Done"
    ? "lime"
    : "sand";
};

export const getLocalDate = (date: string) => {
  return new Date(date).toLocaleString();
};

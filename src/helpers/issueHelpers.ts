import { IconTypes } from "../components/control/Icon/Icon.tsx";
import {
  IssuePriorityType,
  IssueStatusType,
  IssueTypes,
} from "../models/IIssue/IIssue.ts";
import { IColors } from "../models/IColors/IColors.ts";
import { ISelectItem } from "../models/Select/Select.types.ts";

export const getIconType = (type: IssueTypes): IconTypes => {
  return type === "Task" ? "task" : type === "Subtask" ? "subtask" : "bug";
};

export const getIconPriority = (priority: IssuePriorityType): IconTypes => {
  return priority === "High"
    ? "chevron-high"
    : priority === "Medium"
    ? "chevron-medium"
    : "chevron-low";
};

export const getIssueStatusColor = (status: IssueStatusType): IColors => {
  return status === "To Estimate"
    ? "blue"
    : status === "Done"
    ? "lime"
    : "pink";
};

export const getIssueStatusObject = (
  status: IssueStatusType,
): ISelectItem<IssueStatusType> => {
  if (status === "Done") {
    return { id: 1, title: status };
  } else if (status === "To Estimate") {
    return { id: 2, title: status };
  } else {
    return { id: 3, title: status };
  }
};

export const getIssueTypeObject = (
  type: IssueTypes,
): ISelectItem<IssueTypes> => {
  if (type === "Task") {
    return { id: 1, title: type };
  } else if (type === "Subtask") {
    return { id: 2, title: type };
  } else {
    return { id: 3, title: type };
  }
};

export const getIssuePriorityObject = (
  priority: IssuePriorityType,
): ISelectItem<IssuePriorityType> => {
  if (priority === "Low") {
    return { id: 1, title: priority };
  } else if (priority === "Medium") {
    return { id: 2, title: priority };
  } else {
    return { id: 3, title: priority };
  }
};

export const getLocalDate = (date: string) => {
  return new Date(date).toLocaleString();
};

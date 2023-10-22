import { ISelectItem } from "../models/Select/Select.types.ts";
import {
  IssuePriorityType,
  IssueStatusType,
  IssueTypes,
} from "../models/IIssue/IIssue.ts";

export const issueTypes: ISelectItem<IssueTypes>[] = [
  { id: 1, title: "Task" },
  { id: 2, title: "Bug" },
  { id: 3, title: "Subtask" },
];

export const issuePriorities: ISelectItem<IssuePriorityType>[] = [
  { id: 1, title: "Low" },
  { id: 2, title: "Medium" },
  { id: 3, title: "High" },
];

export const issueStatuses: ISelectItem<IssueStatusType>[] = [
  {
    id: 2,
    title: "To Estimate",
  },
  {
    id: 3,
    title: "In Progress",
  },
  { id: 1, title: "Done" },
];

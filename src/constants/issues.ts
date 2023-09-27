import { ISelectItem } from "../models/Select/Select.types.ts";

export const issueTypes: ISelectItem[] = [
  { id: 1, title: "Task" },
  { id: 2, title: "Bug" },
  { id: 3, title: "Subtask" },
];

export const issuePriorities: ISelectItem[] = [
  { id: 1, title: "High" },
  { id: 2, title: "Medium" },
  { id: 3, title: "Low" },
];

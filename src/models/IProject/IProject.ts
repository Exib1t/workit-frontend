import { ICompressedUser } from "../IUser/IUser.ts";
import { IColors } from "../IColors/IColors.ts";

export interface IProject {
  id: number;
  title: string;
  link: string;
  createdAt: Date;
  updatedAt: Date;
  color: IColors;
  userIds: number[];
  issuesIds: number[];
  postedBy: ICompressedUser;
}

export interface IProjectCreate {
  title: string;
  link: string;
  color: IColors;
  userIds: number[];
}

export interface IProjectUpdate extends IProjectCreate {
  id: number;
}

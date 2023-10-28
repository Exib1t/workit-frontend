import { ICompressedUser } from "../IUser/IUser.ts";

export interface IComment {
  id: number;
  body: string;
  author: ICompressedUser;
  createdAt: Date;
  updatedAt: Date;
}

export interface ICommentCreate {
  body: string;
}

export interface ICommentUpdate {
  id: number;
  body: string;
}

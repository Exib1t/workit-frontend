export interface IUser {
  id: number;
  first_name: string;
  last_name: string;
  email: string;
}

export interface IUserCreate {
  first_name: string;
  last_name: string;
  email: string;
  password: string;
}

export interface IUserLogin {
  email: string;
  password: string;
  isRemember: boolean;
}

export interface IToken {
  token: string;
}

export interface IRefreshUser {
  id: number;
  email: string;
}

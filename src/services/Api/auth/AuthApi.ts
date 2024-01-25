import {IRefreshUser, IToken, IUserCreate, IUserLogin} from "../../../models/IUser/IUser.ts";
import {AxiosResponse} from "axios";
import api from "../../api.ts";

class AuthApi {

  registerUser(bodyParams: IUserCreate): Promise<AxiosResponse<IToken>> {
    return api.post(
      "auth/register",
      bodyParams,
    );
  }

  loginUser(bodyParams: IUserLogin): Promise<AxiosResponse<IToken>> {
    return api.post(
      "auth/login",
      bodyParams,
    );
  }

  refreshUser(bodyParams: IToken): Promise<AxiosResponse<IRefreshUser>> {
    return api.get(
      "auth/refresh",
      {data: bodyParams},
    );
  }

}

export default new AuthApi();

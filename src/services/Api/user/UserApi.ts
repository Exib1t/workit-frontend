import { IUser} from "../../../models/IUser/IUser.ts";
import {AxiosResponse} from "axios";
import api from "../../api.ts";

class UserApi {

  getUserById(bodyParams: number): Promise<AxiosResponse<IUser>> {
    return api.get(`users/${bodyParams}`);
  }

}

export default new UserApi();

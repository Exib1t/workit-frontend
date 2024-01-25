import {AxiosResponse} from "axios";
import api from "../../api.ts";
import {IProject, IProjectCreate, IProjectUpdate} from "../../../models/IProject/IProject.ts";
import {ICompressedUser} from "../../../models/IUser/IUser.ts";

class ProjectsApi {

  getProjects(): Promise<AxiosResponse<IProject[]>> {
    return api.get("projects");
  }

  createProject(bodyParams: IProjectCreate): Promise<AxiosResponse<IProject[]>> {
    return api.post("projects", bodyParams);
  }

  updateProject(projectId: number, bodyParams: IProjectUpdate): Promise<AxiosResponse<IProject[]>> {
    return api.patch(`projects/${projectId}`, bodyParams);
  }

  deleteProject(projectId: number): Promise<AxiosResponse<IProject[]>> {
    return api.delete(`projects/${projectId}`);
  }

  getProjectUsers(): Promise<AxiosResponse<ICompressedUser[]>> {
    return api.get("projects/users");
  }

}

export default new ProjectsApi();

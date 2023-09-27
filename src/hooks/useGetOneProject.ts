import { useAppDispatch, useAppSelector } from "../store";
import { useEffect, useState } from "react";
import { IProject } from "../models/IProject/IProject.ts";
import { fetchProjects } from "../store/thunks/projectsThunks.ts";

export default function useGetOneProject(projectLink: string | undefined) {
  const dispatch = useAppDispatch();
  const { data, isLoading } = useAppSelector((state) => state.projects);
  const [project, setProject] = useState<IProject | undefined>(undefined);

  useEffect(() => {
    dispatch(fetchProjects());
  }, [dispatch]);

  useEffect(() => {
    if (data) {
      setProject(data.find((project) => project.link === projectLink));
    }
  }, [data, projectLink]);

  return {
    project,
    isLoading,
  };
}

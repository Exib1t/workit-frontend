import { useAppDispatch, useAppSelector } from "../store";
import { useEffect } from "react";
import { setSelectedProject } from "../store/projects/projectsSlice.ts";
import { fetchProjects } from "../store/projects/projectsThunks.ts";

export default function useGetOneProject(projectLink: string | undefined) {
  const dispatch = useAppDispatch();
  const { projects, isLoading, selectedProject } = useAppSelector(
    (state) => state.projects,
  );

  useEffect(() => {
    if (projectLink && !projects.length) {
      dispatch(fetchProjects());
    }
  }, [projects, projectLink]);

  useEffect(() => {
    if (projects) {
      dispatch(
        setSelectedProject(
          projects.find((project) => project.link === projectLink) || null,
        ),
      );
    }
  }, [projects, projectLink]);

  return {
    project: selectedProject,
    isLoading,
  };
}

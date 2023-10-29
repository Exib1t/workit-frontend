import { useAppDispatch, useAppSelector } from "../store";
import { useEffect } from "react";
import useGetOneProject from "./useGetOneProject.ts";
import { setSelectedIssue } from "../store/issues/issuesSlice.ts";
import { fetchIssuesByProjectId } from "../store/issues/issuesThunks.ts";

export default function useGetOneIssue(
  projectLink: string | undefined,
  issueLink: string | undefined,
) {
  const dispatch = useAppDispatch();
  const { project } = useGetOneProject(projectLink);
  const { issues, isLoading, selectedIssue } = useAppSelector(
    (state) => state.issues,
  );

  useEffect(() => {
    if (project && !issues.length) {
      dispatch(fetchIssuesByProjectId(project.id));
    }
  }, [issues, project, dispatch]);

  useEffect(() => {
    if (issues) {
      dispatch(
        setSelectedIssue(
          issues.find((issue) => issue.link === issueLink) || null,
        ),
      );
    }
  }, [issues, issueLink]);

  return {
    issue: selectedIssue,
    project,
    isLoading,
  };
}

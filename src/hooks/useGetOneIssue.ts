import { useAppDispatch, useAppSelector } from "../store";
import { useEffect, useState } from "react";
import { IIssue } from "../models/IIssue/IIssue.ts";
import { fetchIssuesByProjectId } from "../store/thunks/issuesThunks.ts";
import useGetOneProject from "./useGetOneProject.ts";

export default function (
  projectLink: string | undefined,
  issueLink: string | undefined,
) {
  const dispatch = useAppDispatch();
  const { project } = useGetOneProject(projectLink);
  const { issues, isLoading } = useAppSelector((state) => state.issues);
  const [issue, setIssue] = useState<IIssue | undefined>(undefined);

  useEffect(() => {
    fetchIssues();
  }, [dispatch, project]);

  useEffect(() => {
    if (issues) {
      setIssue(issues.find((item) => item.link === issueLink));
    }
  }, [issues, issueLink]);

  const fetchIssues = () => {
    if (project) {
      dispatch(fetchIssuesByProjectId(project?.id));
    }
  };

  return {
    issue,
    project,
    isLoading,
    refresh: fetchIssues,
  };
}

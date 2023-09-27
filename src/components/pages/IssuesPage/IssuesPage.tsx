import Page from "../../common/Page/Page.tsx";
import useThemeClass from "../../../hooks/useThemeClass.ts";
import IssuesHeader from "../../common/Issue/IssuesHeader/IssuesHeader.tsx";
import { useAppDispatch, useAppSelector } from "../../../store";
import { useParams } from "react-router-dom";
import { useCallback, useEffect, useState } from "react";
import { fetchIssuesByProjectId } from "../../../store/thunks/issuesThunks.ts";
import useGetOneProject from "../../../hooks/useGetOneProject.ts";
import IssuesList from "../../common/Issue/IssuesList/IssuesList.tsx";
import IssueCreateModal from "../../common/Issue/IssueCreateModal/IssueCreateModal.tsx";

import "./IssuesPageStyles.scss";

const IssuesPage = () => {
  const dispatch = useAppDispatch();
  const { projectLink } = useParams();
  const { project } = useGetOneProject(projectLink);
  const { issues, isLoading } = useAppSelector((state) => state.issues);
  const [isCreateNew, setIsCreateNew] = useState(false);
  const themeClass = useThemeClass("b-projectIssues");

  const fetchIssues = useCallback(() => {
    if (project) {
      dispatch(fetchIssuesByProjectId(project.id));
    }
  }, [dispatch, project]);

  const handleCreateNewClose = () => {
    setIsCreateNew(false);
  };

  const handleCreateNewOpen = () => {
    setIsCreateNew(true);
  };

  useEffect(() => {
    fetchIssues();
  }, [fetchIssues]);

  if (!project) return null;

  return (
    <Page>
      <div className={themeClass}>
        <div className={`${themeClass}__container`}>
          <IssuesHeader
            project={project}
            handleCreateNewOpen={handleCreateNewOpen}
          />
          <IssuesList
            issues={issues}
            isLoading={isLoading}
            onIssueUpdate={fetchIssues}
          />
        </div>
      </div>
      <IssueCreateModal
        isOpen={isCreateNew}
        onClose={handleCreateNewClose}
        onSuccess={fetchIssues}
      />
    </Page>
  );
};
export default IssuesPage;

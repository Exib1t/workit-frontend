import Page from "../../common/Page/Page.tsx";
import useThemeClass from "../../../hooks/useThemeClass.ts";
import { useParams } from "react-router-dom";
import useGetOneProject from "../../../hooks/useGetOneProject.ts";
import MoreButton from "../../common/MoreButton/MoreButton.tsx";
import IssuesList from "../../common/Issue/IssuesList/IssuesList.tsx";
import { useAppDispatch, useAppSelector } from "../../../store";
import { useEffect } from "react";
import { fetchIssuesByProjectId } from "../../../store/issues/issuesThunks.ts";

import "./BacklogPage.styles.scss";

const BacklogPage = () => {
  const { projectLink } = useParams();
  const { project, isLoading } = useGetOneProject(projectLink);
  const dispatch = useAppDispatch();

  const { issues, isFirstLoading: isLoadingIssues } = useAppSelector(
    (state) => state.issues,
  );

  const themeClass = useThemeClass("b-backlogPage");

  useEffect(() => {
    if (!issues.length && project) {
      dispatch(fetchIssuesByProjectId(project.id));
    }
  }, [project, dispatch, issues]);

  if (isLoading) return null;
  if (!project) {
    return (
      <Page>
        <div className={`${themeClass}_content`}>
          <span>There is no project with link {projectLink}</span>
        </div>
      </Page>
    );
  }

  return (
    <Page>
      <div className={themeClass}>
        <div className={`${themeClass}_container`}>
          <div className={`${themeClass}_header`}>
            <div className={`${themeClass}_header_left`}>
              <span className={`${themeClass}_header_left_text`}>
                Backlog of project{" "}
                <span className={`${themeClass}_header_left_title`}>
                  {project.title}
                </span>
              </span>
            </div>
            <div className={`${themeClass}_header_controls`}>
              <MoreButton size={"medium"} disabled />
            </div>
          </div>
          <div className={`${themeClass}_content`}>
            <IssuesList issues={issues} isLoading={isLoadingIssues} isBacklog />
          </div>
        </div>
      </div>
    </Page>
  );
};
export default BacklogPage;

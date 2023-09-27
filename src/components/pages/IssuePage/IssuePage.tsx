import Page from "../../common/Page/Page.tsx";
import { useParams } from "react-router-dom";

import "./IssuePageStyles.scss";
import useGetOneIssue from "../../../hooks/useGetOneIssue.ts";
import IssueHeader from "../../common/Issue/IssueHeader/IssueHeader.tsx";
import useThemeClass from "../../../hooks/useThemeClass.ts";
import IssueView from "../../common/Issue/IssueView/IssueView.tsx";

const IssuePage = () => {
  const { projectLink, issueLink } = useParams();
  const { issue, project, isLoading, refresh } = useGetOneIssue(
    projectLink,
    issueLink,
  );
  const themeClass = useThemeClass("b-issuePage");

  if (!project || !issue) return null;

  return (
    <Page>
      <div className={themeClass}>
        <div className={`${themeClass}__container`}>
          <IssueHeader project={project} issue={issue} />
          <IssueView issue={issue} isLoading={isLoading} onSuccess={refresh} />
        </div>
      </div>
    </Page>
  );
};
export default IssuePage;

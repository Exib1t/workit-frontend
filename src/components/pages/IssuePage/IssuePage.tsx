import Page from "../../common/Page/Page.tsx";
import { useParams } from "react-router-dom";
import useGetOneIssue from "../../../hooks/useGetOneIssue.ts";
import IssueHeader from "../../common/Issue/IssueHeader/IssueHeader.tsx";
import useThemeClass from "../../../hooks/useThemeClass.ts";
import IssueView from "../../common/Issue/IssueView/IssueView.tsx";
import { useEffect, useState } from "react";
import { IIssue } from "../../../models/IIssue/IIssue.ts";

import "./IssuePageStyles.scss";

const IssuePage = () => {
  const { projectLink, issueLink } = useParams();
  const { issue, project, isLoading } = useGetOneIssue(projectLink, issueLink);
  const [initialFields, setInitialFields] = useState<IIssue | undefined>(
    undefined,
  );
  const themeClass = useThemeClass("b-issuePage");

  useEffect(() => {
    setInitialFields(issue || undefined);
  }, [issue]);

  if (!project || !initialFields) return null;

  return (
    <Page>
      <div className={themeClass}>
        <div className={`${themeClass}__container`}>
          <IssueHeader project={project} initialFields={initialFields} />
          <IssueView initialFields={initialFields} isLoading={isLoading} />
        </div>
      </div>
    </Page>
  );
};
export default IssuePage;

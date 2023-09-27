import { FC, useEffect, useState } from "react";
import { IIssue } from "../../../../models/IIssue/IIssue.ts";
import useThemeClass from "../../../../hooks/useThemeClass.ts";
import "./IssueViewStyles.scss";
import IssueType from "../IssueType/IssueType.tsx";
import IssuePriority from "../IssuePriority/IssuePriority.tsx";
import IssueAssignee from "../IssueAssignee/IssueAssignee.tsx";
import IssueStatus from "../IssueStatus/IssueStatus.tsx";
import { getLocalDate } from "../../../../helpers/issueHelpers.ts";
import { Skeleton } from "@mui/material";
import IssueViewItem from "./parts/IssueViewItem/IssueViewItem.tsx";
import "react-quill/dist/quill.snow.css";
import TextQuillEditor from "../../../control/TextQuillEditor/TextQuillEditor.tsx";
import Icon from "../../../control/Icon/Icon.tsx";
import IconButtonCustom from "../../../control/IconButtonCustom/IconButtonCustom.tsx";
import { useAppDispatch } from "../../../../store";
import { updateIssue } from "../../../../store/thunks/issuesThunks.ts";

interface IExpandedGroups {
  attachments: boolean;
}

interface IProps {
  issue: IIssue;
  isLoading: boolean;
  onSuccess: () => void;
}

const IssueView: FC<IProps> = ({ issue, isLoading, onSuccess }) => {
  const [initialFields, setInitialFields] = useState<IIssue>(issue);
  const [expandedGroups, setExpandedGroups] = useState<IExpandedGroups>({
    attachments: true,
  });
  const dispatch = useAppDispatch();
  const themeClass = useThemeClass("b-issueView");

  useEffect(() => {
    setInitialFields(issue);
  }, [issue]);

  const handleExpandToggle = (name: keyof IExpandedGroups) => {
    setExpandedGroups((prevState) => ({
      ...prevState,
      [name]: !prevState[name],
    }));
  };

  const handleDescriptionSave = () => {
    dispatch(
      updateIssue({
        updatedIssue: { id: issue.id, description: initialFields.description },
        callbacks: { onSuccess },
      }),
    );
  };

  const handleChangeDescription = (value: string) => {
    setInitialFields((prevState) => ({
      ...prevState,
      description: value,
    }));
  };

  return (
    <div className={themeClass}>
      <div className={`${themeClass}__title`}>{issue.title}</div>
      <div className={`${themeClass}__row`}>
        <div className={`${themeClass}__left`}>
          <div className={`${themeClass}__row`}>
            <div className={`${themeClass}__column`}>
              <div className={`${themeClass}__group`}>
                <span className={`${themeClass}__groupTitle`}>Details</span>
                <div className={`${themeClass}__groupContent`}>
                  <IssueViewItem
                    label={"Type"}
                    content={
                      <>
                        <IssueType issue={issue} /> {issue.type}
                      </>
                    }
                  />
                  <IssueViewItem
                    label={"Priority"}
                    content={<IssuePriority issue={issue} isTable={false} />}
                  />
                  <IssueViewItem
                    label={"Labels"}
                    content={
                      <>
                        <Skeleton variant={"text"} width={50} height={14} />
                        <Skeleton variant={"text"} width={50} height={14} />
                        <Skeleton variant={"text"} width={50} height={14} />
                      </>
                    }
                  />
                  <IssueViewItem
                    label={"Sprint"}
                    content={
                      <Skeleton variant={"text"} width={75} height={14} />
                    }
                  />
                </div>
              </div>
            </div>
            <div className={`${themeClass}__column`}>
              <div className={`${themeClass}__group`}>
                <span className={`${themeClass}__groupTitle`}>&nbsp;</span>
                <div className={`${themeClass}__groupContent`}>
                  <IssueViewItem
                    label={"Status"}
                    content={<IssueStatus status={issue.status} />}
                  />
                  <IssueViewItem
                    label={"Version"}
                    content={
                      <Skeleton variant={"text"} width={75} height={14} />
                    }
                  />
                </div>
              </div>
            </div>
          </div>
          <div className={`${themeClass}__row`}>
            <div className={`${themeClass}__column`}>
              <div className={`${themeClass}__group`}>
                <span className={`${themeClass}__groupTitle`}>Description</span>
                <div className={`${themeClass}__groupContent`}>
                  <TextQuillEditor
                    placeholder={"Description..."}
                    isFooter
                    value={initialFields.description}
                    onChange={handleChangeDescription}
                    disabled={
                      isLoading ||
                      initialFields.description === issue.description
                    }
                    handleSave={handleDescriptionSave}
                  />
                </div>
              </div>
            </div>
          </div>
          <div className={`${themeClass}__row`}>
            <div className={`${themeClass}__column`}>
              <div className={`${themeClass}__group`}>
                <span className={`${themeClass}__groupTitle`}>
                  Attachments
                  <IconButtonCustom
                    size={"small"}
                    onClick={() => handleExpandToggle("attachments")}
                  >
                    <Icon
                      type={
                        expandedGroups.attachments
                          ? "chevron-down"
                          : "chevron-right"
                      }
                    />
                  </IconButtonCustom>
                </span>
                {expandedGroups.attachments && (
                  <div className={`${themeClass}__groupContent`}>
                    <div className={`${themeClass}__attachments`}></div>
                  </div>
                )}
              </div>
            </div>
          </div>
          <div className={`${themeClass}__row`}>
            <div className={`${themeClass}__column`}>
              <div className={`${themeClass}__group`}>
                <span className={`${themeClass}__groupTitle`}>Activity</span>
                <div className={`${themeClass}__groupContent`}>
                  <div className={`${themeClass}__attachments`}></div>
                </div>
              </div>
            </div>
          </div>
        </div>
        <div className={`${themeClass}__right`}>
          <div className={`${themeClass}__column -fixed`}>
            <div className={`${themeClass}__group`}>
              <span className={`${themeClass}__groupTitle`}>People</span>
              <div className={`${themeClass}__groupContent`}>
                <IssueViewItem
                  label={"Assignee"}
                  content={<IssueAssignee user={issue.assignee} />}
                />
                <IssueViewItem
                  label={"Reporter"}
                  content={<IssueAssignee user={issue.reporter} />}
                />
              </div>
            </div>
            <div className={`${themeClass}__group`}>
              <span className={`${themeClass}__groupTitle`}>Dates</span>
              <div className={`${themeClass}__groupContent`}>
                <IssueViewItem
                  label={"Created at"}
                  content={getLocalDate(issue.createdAt)}
                />
                <IssueViewItem
                  label={"Updated at"}
                  content={getLocalDate(issue.updatedAt)}
                />
              </div>
            </div>
            <div className={`${themeClass}__group`}>
              <span className={`${themeClass}__groupTitle`}>Time Tracking</span>
              <div className={`${themeClass}__groupContent`}>
                <IssueViewItem
                  label={"Estimated"}
                  content={
                    <Skeleton variant={"text"} width={150} height={14} />
                  }
                />
                <IssueViewItem
                  label={"Remaining"}
                  content={
                    <Skeleton variant={"text"} width={150} height={14} />
                  }
                />
                <IssueViewItem
                  label={"Logged"}
                  content={
                    <Skeleton variant={"text"} width={150} height={14} />
                  }
                />
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};
export default IssueView;

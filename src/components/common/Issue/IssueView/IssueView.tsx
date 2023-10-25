import { Dispatch, FC, SetStateAction, useEffect, useState } from "react";
import {
  IIssue,
  IIssueUpdate,
  IssuePriorityType,
  IssueStatusType,
  IssueTypes,
} from "../../../../models/IIssue/IIssue.ts";
import useThemeClass from "../../../../hooks/useThemeClass.ts";
import "./IssueViewStyles.scss";
import IssueType from "../IssueType/IssueType.tsx";
import IssueAssignee from "../IssueAssignee/IssueAssignee.tsx";
import {
  getIssueAssigneeObject,
  getIssuePriorityObject,
  getIssueStatusColor,
  getIssueStatusObject,
  getIssueTypeObject,
  getLocalDate,
} from "../../../../helpers/issueHelpers.ts";
import { Skeleton } from "@mui/material";
import IssueViewItem from "./parts/IssueViewItem/IssueViewItem.tsx";
import "react-quill/dist/quill.snow.css";
import TextQuillEditor from "../../../control/TextQuillEditor/TextQuillEditor.tsx";
import Icon from "../../../control/Icon/Icon.tsx";
import IconButtonCustom from "../../../control/IconButtonCustom/IconButtonCustom.tsx";
import { useAppDispatch, useAppSelector } from "../../../../store";
import {
  fetchIssueAvailableAssignments,
  updateIssue,
} from "../../../../store/issues/issuesThunks.ts";
import CustomButton from "../../../control/ButtonComponents/CustomButton/CustomButton.tsx";
import Select from "../../../control/Select/Select.tsx";
import { ISelectItem } from "../../../../models/Select/Select.types.ts";
import Chip from "../../Chip/Chip.tsx";
import {
  issuePriorities,
  issueStatuses,
  issueTypes,
} from "../../../../constants/issues.ts";
import IssuePriority from "../IssuePriority/IssuePriority.tsx";
import TimeBar from "../../../control/TimeBar/TimeBar.tsx";
import IssueTimePopup from "../IssueTimePopup/IssueTimePopup.tsx";
import UserPlaceholder from "../../UserPlaceholder/UserPlaceholder.tsx";

interface IExpandedGroups {
  attachments: boolean;
}

interface IProps {
  initialFields: IIssue;
  setInitialFields: Dispatch<SetStateAction<IIssue | undefined>>;
  isLoading: boolean;
  onSuccess: () => void;
}

const IssueView: FC<IProps> = ({ initialFields, isLoading, onSuccess }) => {
  const [expandedGroups, setExpandedGroups] = useState<IExpandedGroups>({
    attachments: true,
  });
  const [statusSelected, setStatusSelected] =
    useState<ISelectItem<IssueStatusType> | null>(null);
  const [typeSelected, setTypeSelected] =
    useState<ISelectItem<IssueTypes> | null>(null);
  const [prioritySelected, setPrioritySelected] =
    useState<ISelectItem<IssuePriorityType> | null>(null);
  const [assigneeSelected, setAssigneeSelected] = useState<ISelectItem<{
    first_name: string;
    last_name: string;
  }> | null>(null);
  const [isTimePopupOpen, setIsTimePopupOpen] = useState(false);
  const [description, setDescription] = useState("");

  const { data: availableAssignments } = useAppSelector(
    (state) => state.issues.editorsData.assignments,
  );

  const dispatch = useAppDispatch();
  const themeClass = useThemeClass("b-issueView");

  useEffect(() => {
    setDescription(initialFields.description);
    setStatusSelected(getIssueStatusObject(initialFields.status));
    setTypeSelected(getIssueTypeObject(initialFields.type));
    setPrioritySelected(getIssuePriorityObject(initialFields.priority));
    setAssigneeSelected(getIssueAssigneeObject(initialFields.assignee));
  }, [initialFields]);

  useEffect(() => {
    dispatch(
      fetchIssueAvailableAssignments({
        id: initialFields.id,
        callbacks: {},
      }),
    );
  }, [dispatch]);

  const handleCloseTimePopup = () => {
    setIsTimePopupOpen(false);
  };

  const handleOpenTimePopup = () => {
    setIsTimePopupOpen(true);
  };

  const handleFieldChange = (
    fieldName: keyof IIssueUpdate,
    value: string | number,
  ) => {
    const updatedIssue = { id: initialFields.id, [fieldName]: value };
    dispatch(
      updateIssue({
        updatedIssue,
        callbacks: { onSuccess },
      }),
    );
  };

  const handleChangeStatus = (status: ISelectItem<IssueStatusType>) => {
    setStatusSelected(status);
    handleFieldChange("status", status.title);
  };

  const handleChangeType = (type: ISelectItem<IssueTypes>) => {
    setTypeSelected(type);
    handleFieldChange("type", type.title);
  };

  const handleChangePriority = (priority: ISelectItem<IssuePriorityType>) => {
    setPrioritySelected(priority);
    handleFieldChange("priority", priority.title);
  };

  const handleChangeAssignee = (
    assignee: ISelectItem<{ first_name: string; last_name: string }>,
  ) => {
    setAssigneeSelected(assignee);
    handleFieldChange("assignee", assignee.id);
  };

  const handleDescriptionSave = () => {
    handleFieldChange("description", description);
  };

  const handleExpandToggle = (name: keyof IExpandedGroups) => {
    setExpandedGroups((prevState) => ({
      ...prevState,
      [name]: !prevState[name],
    }));
  };

  const handleChangeDescription = (value: string) => {
    setDescription(value);
  };

  return (
    <>
      <div className={themeClass}>
        <div className={`${themeClass}__title`}>{initialFields.title}</div>
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
                        <Select<IssueTypes>
                          type={"on-bgd"}
                          selected={typeSelected}
                          onChange={handleChangeType}
                          customItemClassName={`${themeClass}__statusItem`}
                          getTitle={(item) => (
                            <div className={`${themeClass}__selectRow`}>
                              <IssueType type={item.title} /> {item.title}
                            </div>
                          )}
                          items={issueTypes}
                        />
                      }
                    />
                    <IssueViewItem
                      label={"Priority"}
                      content={
                        <Select<IssuePriorityType>
                          type={"on-bgd"}
                          selected={prioritySelected}
                          onChange={handleChangePriority}
                          customItemClassName={`${themeClass}__statusItem`}
                          getTitle={(item) => (
                            <div className={`${themeClass}__selectRow`}>
                              <IssuePriority
                                priority={item.title}
                                isTable={false}
                              />
                            </div>
                          )}
                          items={issuePriorities}
                        />
                      }
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
                      content={
                        <Select<IssueStatusType>
                          type={"on-bgd"}
                          selected={statusSelected}
                          onChange={handleChangeStatus}
                          customItemClassName={`${themeClass}__statusItem`}
                          getTitle={(item) => (
                            <Chip
                              type={"filled"}
                              value={item.title}
                              color={getIssueStatusColor(item.title)}
                            />
                          )}
                          items={issueStatuses}
                        />
                      }
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
                  <span className={`${themeClass}__groupTitle`}>
                    Description
                  </span>
                  <div className={`${themeClass}__groupContent`}>
                    <TextQuillEditor
                      placeholder={"Description..."}
                      isFooter
                      value={description}
                      onChange={handleChangeDescription}
                      disabled={
                        isLoading || initialFields.description === description
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
                  <span className={`${themeClass}__groupTitle`}>Comments</span>
                  <div className={`${themeClass}__groupContent`}>
                    <div className={`${themeClass}__attachments`}>
                      <div className={`${themeClass}__activity`}>
                        <TextQuillEditor
                          placeholder={"Description..."}
                          customHeight={45}
                          isFooter
                          value={description}
                          onChange={handleChangeDescription}
                          disabled={
                            isLoading ||
                            initialFields.description === description
                          }
                          handleSave={handleDescriptionSave}
                        />
                      </div>
                    </div>
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
                    content={
                      <Select<{ first_name: string; last_name: string }>
                        type={"on-bgd"}
                        selected={assigneeSelected}
                        onChange={handleChangeAssignee}
                        customItemClassName={`${themeClass}__assigneeItem`}
                        getTitle={(item) => (
                          <UserPlaceholder
                            first_name={item.title.first_name}
                            last_name={item.title.last_name}
                          />
                        )}
                        items={
                          availableAssignments
                            ? availableAssignments.map((item) =>
                                getIssueAssigneeObject(item),
                              )
                            : []
                        }
                      />
                    }
                  />
                  <IssueViewItem
                    label={"Reporter"}
                    content={<IssueAssignee user={initialFields.reporter} />}
                  />
                </div>
              </div>
              <div className={`${themeClass}__group`}>
                <span className={`${themeClass}__groupTitle`}>Dates</span>
                <div className={`${themeClass}__groupContent`}>
                  <IssueViewItem
                    label={"Created at"}
                    content={getLocalDate(initialFields.createdAt)}
                  />
                  <IssueViewItem
                    label={"Updated at"}
                    content={getLocalDate(initialFields.updatedAt)}
                  />
                </div>
              </div>
              <div className={`${themeClass}__group`}>
                <span className={`${themeClass}__groupTitle -time`}>
                  Time Tracking
                  <CustomButton
                    type={"text-plain"}
                    size={"sm"}
                    title={"Manage"}
                    clickHandler={handleOpenTimePopup}
                  />
                </span>
                <div className={`${themeClass}__groupContent`}>
                  <IssueViewItem
                    label={"Estimated"}
                    content={
                      <TimeBar
                        value={
                          (initialFields.time.estimated * 100) /
                          initialFields.time.estimated
                        }
                        type={"estimated"}
                        label={initialFields.time.estimated}
                      />
                    }
                  />
                  <IssueViewItem
                    label={"Logged"}
                    content={
                      <TimeBar
                        value={
                          initialFields.time.logged >
                          initialFields.time.estimated
                            ? 100
                            : (initialFields.time.logged * 100) /
                              initialFields.time.estimated
                        }
                        type={"logged"}
                        label={initialFields.time.logged}
                      />
                    }
                  />
                  <IssueViewItem
                    label={"Remaining"}
                    content={
                      <TimeBar
                        value={
                          (initialFields.time.remaining * 100) /
                          initialFields.time.estimated
                        }
                        type={"remaining"}
                        label={initialFields.time.remaining}
                      />
                    }
                  />
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
      <IssueTimePopup
        isOpen={isTimePopupOpen}
        onClose={handleCloseTimePopup}
        onSuccess={onSuccess}
        estimated={initialFields.time.estimated}
        issueId={initialFields.id}
      />
    </>
  );
};
export default IssueView;

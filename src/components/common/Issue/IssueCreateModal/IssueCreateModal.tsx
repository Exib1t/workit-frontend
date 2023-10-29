import { ChangeEvent, FC, useEffect, useState } from "react";
import TextInput from "../../../control/TextInput/TextInput.tsx";
import useThemeClass from "../../../../hooks/useThemeClass.ts";
import {
  IIssueCreate,
  IssuePriorityType,
  IssueTypes,
} from "../../../../models/IIssue/IIssue.ts";
import { useParams } from "react-router-dom";
import { fetchProjectUsers } from "../../../../store/projects/projectsThunks.ts";
import { useAppDispatch, useAppSelector } from "../../../../store";
import { ISelectItem } from "../../../../models/Select/Select.types.ts";
import Select from "../../../control/Select/Select.tsx";
import { createIssue } from "../../../../store/issues/issuesThunks.ts";
import useGetOneProject from "../../../../hooks/useGetOneProject.ts";
import { issuePriorities, issueTypes } from "../../../../constants/issues.ts";
import Icon, { IconTypes } from "../../../control/Icon/Icon.tsx";
import DialogPopUp from "../../../control/DialogPopUp/DialogPopUp.tsx";

import "./IssueCreateModalStyles.scss";

interface IProps {
  isOpen: boolean;
  onClose: () => void;
}

interface IssueErrors {
  title: string | undefined;
}

const IssueCreateModal: FC<IProps> = ({ isOpen, onClose }) => {
  const { projectLink } = useParams();
  const { project } = useGetOneProject(projectLink);
  const dispatch = useAppDispatch();
  const { availableUsers } = useAppSelector((state) => state.projects);
  const { errors: issueErrors } = useAppSelector((state) => state.issues);
  const [errors, setErrors] = useState<IssueErrors>({ title: undefined });
  const [newIssue, setNewIssue] = useState<IIssueCreate>({
    title: "",
    assignee: 0,
    type: "Task",
    priority: "Medium",
    projectId: 0,
    time: {
      estimated: "0",
    },
  });

  useEffect(() => {
    setNewIssue((prevState) => ({
      ...prevState,
      title: "",
      assignee: 0,
      type: "Task",
      priority: "Medium",
      time: {
        estimated: "0",
      },
    }));
  }, []);

  useEffect(() => {
    dispatch(fetchProjectUsers());
  }, [dispatch]);

  useEffect(() => {
    if (project) {
      setNewIssue((prevState) => ({ ...prevState, projectId: project.id }));
    }
  }, [project]);

  useEffect(() => {
    if (issueErrors) {
      setErrors({
        title:
          issueErrors.find((err) => err.field === "title")?.message ||
          undefined,
      });
    }
  }, [issueErrors]);

  const handleClose = () => {
    onClose();
    setNewIssue((prevState) => ({
      ...prevState,
      title: "",
      assignee: 0,
      type: "Task",
      priority: "Medium",
      time: {
        estimated: "0",
      },
    }));
  };

  const handleInputChange = (e: ChangeEvent<HTMLInputElement>) => {
    setErrors({
      title: undefined,
    });
    setNewIssue((prevState) => ({
      ...prevState,
      [e.target.name]: e.target.value,
    }));
  };

  const handleTimeChange = (e: ChangeEvent<HTMLInputElement>) => {
    setNewIssue((prevState) => ({
      ...prevState,
      time: {
        estimated: e.target.value,
      },
    }));
  };

  const handleUsersChange = (selected: ISelectItem) => {
    setNewIssue((prevState) => ({
      ...prevState,
      assignee: selected.id,
    }));
  };

  const handleTypeChange = (selected: ISelectItem) => {
    setNewIssue((prevState) => ({
      ...prevState,
      type: selected.title as IssueTypes,
    }));
  };

  const handlePriorityChange = (selected: ISelectItem) => {
    setNewIssue((prevState) => ({
      ...prevState,
      priority: selected.title as IssuePriorityType,
    }));
  };

  const handleSubmit = () => {
    if (!newIssue.title.trim()) {
      setErrors({
        title: "Field title is required",
      });
    } else {
      dispatch(createIssue({ data: newIssue, callbacks: {} }));
      onClose();
    }
  };

  const allUsers = availableUsers.map(
    (user): ISelectItem => ({
      id: user.id,
      title: `${user.first_name} ${user.last_name}`,
    }),
  );

  const renderPriorityItem = (item: ISelectItem) => {
    const iconType: IconTypes =
      item.title === "High"
        ? "chevron-high"
        : item.title === "Medium"
        ? "chevron-medium"
        : "chevron-low";

    return (
      <div className={`${themeClass}__selectItem`}>
        <Icon type={iconType} size={16} color={"primary"} />
        {item.title}
      </div>
    );
  };

  const renderTypeItem = (item: ISelectItem) => {
    const iconType: IconTypes =
      item.title === "Task"
        ? "task"
        : item.title === "Subtask"
        ? "subtask"
        : "bug";

    return (
      <div className={`${themeClass}__selectItem`}>
        <div className={`${themeClass}__typeIcon`}>
          <Icon type={iconType} size={12} color={"tick"} />
        </div>
        {item.title}
      </div>
    );
  };

  const themeClass = useThemeClass("b-issueCreateModal");

  return (
    <DialogPopUp
      open={isOpen}
      onClose={handleClose}
      title={"Issue Create"}
      secondaryText={"Cancel"}
      primaryText={"Create"}
      handleOnSecondary={handleClose}
      handleOnPrimary={handleSubmit}
      dividedHeader
      paperMaxWidth={"1000px"}
      renderModalContent={() => (
        <div className={`${themeClass}__row`}>
          <div className={`${themeClass}__column`}>
            <div className={`${themeClass}__field`}>
              <TextInput
                type="on-bgd"
                placeholder="Enter issue title"
                name="title"
                label="Title"
                value={newIssue.title}
                onChange={handleInputChange}
                error={errors.title}
              />
            </div>
            <div className={`${themeClass}__field`}>
              <span className={`${themeClass}__fieldLabel`}>Assignee</span>
              <Select
                items={allUsers}
                onChange={handleUsersChange}
                type={"on-bgd"}
                placeholder="Select assignee"
                selected={
                  allUsers.find((user) => user.id === newIssue.assignee) || null
                }
              />
            </div>
            <div className={`${themeClass}__field`}>
              <TextInput
                type={"on-bgd"}
                value={newIssue.time.estimated}
                onChange={handleTimeChange}
                label={"Time to log (hrs)"}
              />
            </div>
          </div>
          <div className={`${themeClass}__column`}>
            <div className={`${themeClass}__field`}>
              <span className={`${themeClass}__fieldLabel`}>Priorities</span>
              <Select
                items={issuePriorities}
                onChange={handlePriorityChange}
                type={"on-bgd"}
                getTitle={renderPriorityItem}
                placeholder="Select priority"
                selected={
                  issuePriorities.find(
                    (type) => type.title === newIssue.priority,
                  ) || null
                }
              />
            </div>
            <div className={`${themeClass}__field`}>
              <span className={`${themeClass}__fieldLabel`}>Type</span>
              <Select
                items={issueTypes}
                onChange={handleTypeChange}
                type={"on-bgd"}
                getTitle={renderTypeItem}
                placeholder="Select type"
                selected={
                  issueTypes.find((type) => type.title === newIssue.type) ||
                  null
                }
              />
            </div>
          </div>
        </div>
      )}
    />
  );
};
export default IssueCreateModal;

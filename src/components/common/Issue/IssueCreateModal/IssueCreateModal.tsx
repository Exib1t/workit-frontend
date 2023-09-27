import { ChangeEvent, FC, useEffect, useState } from "react";
import TextInput from "../../../control/TextInput/TextInput.tsx";
import CustomButton from "../../../control/ButtonComponents/CustomButton/CustomButton.tsx";
import ModalCustom from "../../../control/ModalCustom/ModalCustom.tsx";
import useThemeClass from "../../../../hooks/useThemeClass.ts";
import {
  IIssueCreate,
  IssuePriorityType,
  IssueType,
} from "../../../../models/IIssue/IIssue.ts";
import { useParams } from "react-router-dom";

import "./IssueCreateModalStyles.scss";
import { fetchProjectUsers } from "../../../../store/thunks/projectsThunks.ts";
import { useAppDispatch, useAppSelector } from "../../../../store";
import { ISelectItem } from "../../../../models/Select/Select.types.ts";
import Select from "../../../control/Select/Select.tsx";
import { createIssue } from "../../../../store/thunks/issuesThunks.ts";
import useGetOneProject from "../../../../hooks/useGetOneProject.ts";
import { issuePriorities, issueTypes } from "../../../../constants/issues.ts";
import Icon, { IconTypes } from "../../../control/Icon/Icon.tsx";

interface IProps {
  isOpen: boolean;
  onClose: () => void;
  onSuccess: () => void;
}

const IssueCreateModal: FC<IProps> = ({ isOpen, onClose, onSuccess }) => {
  const { projectLink } = useParams();
  const { project } = useGetOneProject(projectLink);
  const dispatch = useAppDispatch();
  const { availableUsers } = useAppSelector((state) => state.projects);
  const [newIssue, setNewIssue] = useState<IIssueCreate>({
    title: "",
    description: "",
    assignee: 0,
    type: "Task",
    priority: "Medium",
    projectId: 0,
  });

  useEffect(() => {
    setNewIssue((prevState) => ({
      ...prevState,
      title: "",
      description: "",
      assignee: 0,
      type: "Task",
      priority: "Medium",
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

  const handleInputChange = (e: ChangeEvent<HTMLInputElement>) => {
    setNewIssue((prevState) => ({
      ...prevState,
      [e.target.name]: e.target.value,
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
      type: selected.title as IssueType,
    }));
  };

  const handlePriorityChange = (selected: ISelectItem) => {
    setNewIssue((prevState) => ({
      ...prevState,
      priority: selected.title as IssuePriorityType,
    }));
  };

  const handleSubmit = () => {
    dispatch(createIssue({ data: newIssue, callbacks: { onSuccess } }));
    onClose();
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
    <ModalCustom isOpen={isOpen} handleClose={onClose} className={themeClass}>
      <div className={`${themeClass}__header`}>
        <h2 className={`${themeClass}__title`}>Issue Create</h2>
      </div>
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
            />
          </div>
          <div className={`${themeClass}__field`}>
            <TextInput
              type="on-bgd"
              placeholder="Enter issue description"
              name="description"
              label="Description"
              value={newIssue.description}
              onChange={handleInputChange}
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
                issueTypes.find((type) => type.title === newIssue.type) || null
              }
            />
          </div>
        </div>
      </div>
      <div className={`${themeClass}__footer`}>
        <CustomButton
          type="tertiary"
          title={"Cancel"}
          size={"md"}
          clickHandler={onClose}
        />
        <CustomButton
          type="secondary"
          title={"Create"}
          size={"md"}
          clickHandler={handleSubmit}
        />
      </div>
    </ModalCustom>
  );
};
export default IssueCreateModal;

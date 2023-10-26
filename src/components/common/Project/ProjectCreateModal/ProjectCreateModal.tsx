import { ChangeEvent, FC, useEffect, useState } from "react";
import useThemeClass from "../../../../hooks/useThemeClass.ts";
import "./ProjectCreateModalStyles.scss";
import { IProjectCreate } from "../../../../models/IProject/IProject.ts";
import { IColors } from "../../../../models/IColors/IColors.ts";
import { useAppDispatch, useAppSelector } from "../../../../store";
import {
  createProject,
  fetchProjectUsers,
  updateProject,
} from "../../../../store/projects/projectsThunks.ts";
import { ISelectItem } from "../../../../models/Select/Select.types.ts";
import { setProjectsError } from "../../../../store/projects/projectsSlice.ts";
import DialogPopUp from "../../../control/DialogPopUp/DialogPopUp.tsx";
import TextInput from "../../../control/TextInput/TextInput.tsx";
import MultiSelect from "../../../control/MultiSelect/MultiSelect.tsx";
import ColorPicker from "../../ColorPicker/ColorPicker.tsx";

interface IProps {
  isOpen: boolean;
  handleClose: () => void;
  editableProjectId: number | null;
}

const ProjectCreateModal: FC<IProps> = ({
  isOpen,
  handleClose,
  editableProjectId,
}) => {
  const dispatch = useAppDispatch();
  const { availableUsers, errors, data } = useAppSelector(
    (state) => state.projects,
  );
  const [isEditable, setIsEditable] = useState(false);
  const [newProject, setNewProject] = useState<IProjectCreate>({
    title: "",
    link: "",
    color: "pink",
    userIds: [],
  });

  useEffect(() => {
    dispatch(fetchProjectUsers());
  }, [dispatch]);

  useEffect(() => {
    if (editableProjectId) {
      const editableProject = data.find(
        (project) => project.id === editableProjectId,
      );
      if (editableProject) {
        setNewProject({
          title: editableProject.title,
          link: editableProject.link,
          color: editableProject.color,
          userIds: editableProject.userIds,
        });
        setIsEditable(true);
      }
    } else {
      setIsEditable(false);
    }
  }, [editableProjectId, data]);

  const onClose = () => {
    resetForm();
    handleClose();
  };

  const validateProject = () => {
    if (!newProject.title.trim()) {
      dispatch(
        setProjectsError({
          statusCode: 500,
          message: "Field title is required",
        }),
      );
    } else if (!newProject.link.trim()) {
      dispatch(
        setProjectsError({
          statusCode: 500,
          message: "Field link is required",
        }),
      );
    }
    return !!newProject.title.trim() && !!newProject.link.trim();
  };

  const resetForm = () => {
    setNewProject({
      title: "",
      link: "",
      color: "pink",
      userIds: [],
    });
  };

  const onCreateSuccess = () => {
    resetForm();
    handleClose();
  };

  const handleSubmit = async () => {
    if (validateProject()) {
      if (isEditable && editableProjectId) {
        dispatch(
          updateProject({
            data: { ...newProject, id: editableProjectId },
            callbacks: { onSuccess: onCreateSuccess },
          }),
        );
      } else {
        dispatch(
          createProject({
            data: newProject,
            callbacks: { onSuccess: onCreateSuccess },
          }),
        );
      }
    }
  };

  const handleInputChange = (e: ChangeEvent<HTMLInputElement>) => {
    if (e.target.name === "link") {
      dispatch(setProjectsError(null));
      setNewProject((prevState) => ({
        ...prevState,
        link: e.target.value.toUpperCase(),
      }));
    } else {
      setNewProject((prevState) => ({
        ...prevState,
        [e.target.name]: e.target.value,
      }));
    }
  };

  const handleUsersChange = (selected: ISelectItem[]) => {
    setNewProject((prevState) => ({
      ...prevState,
      userIds: selected.map((user) => user.id),
    }));
  };

  const handleColorChange = (color: IColors) => {
    setNewProject((prevState) => ({ ...prevState, color }));
  };

  const allUsers = availableUsers.map(
    (user): ISelectItem => ({
      id: user.id,
      title: `${user.first_name} ${user.last_name}`,
    }),
  );
  const themeClass = useThemeClass("b-createProjectModal");

  return (
    <DialogPopUp
      open={isOpen}
      onClose={onClose}
      title={"Project create"}
      secondaryText={"Cancel"}
      primaryText={isEditable ? "Save" : "Create"}
      handleOnSecondary={handleClose}
      handleOnPrimary={handleSubmit}
      paperMaxWidth={"1000px"}
      dividedHeader
      renderModalContent={() => (
        <div className={`${themeClass}__row`}>
          <div className={`${themeClass}__column`}>
            <div className={`${themeClass}__field`}>
              <TextInput
                type="on-bgd"
                placeholder="Enter project name"
                name="title"
                label="Title"
                value={newProject.title}
                onChange={handleInputChange}
              />
            </div>
            <div className={`${themeClass}__field`}>
              <TextInput
                type="on-bgd"
                placeholder="Enter project link"
                name="link"
                label="Link"
                value={newProject.link}
                onChange={handleInputChange}
                error={errors?.message}
              />
            </div>
            <div className={`${themeClass}__field`}>
              <span className={`${themeClass}__fieldLabel`}>Members</span>
              <MultiSelect
                items={allUsers}
                onChange={handleUsersChange}
                type={"on-bgd"}
                placeholder="Select members"
                selected={allUsers.filter((user) =>
                  newProject.userIds.includes(user.id),
                )}
              />
            </div>
          </div>
          <div className={`${themeClass}__column`}>
            <div className={`${themeClass}__field`}>
              <span className={`${themeClass}__fieldLabel`}>Color</span>
              <ColorPicker
                onChange={handleColorChange}
                value={newProject.color}
              />
            </div>
          </div>
        </div>
      )}
    />
  );
};
export default ProjectCreateModal;

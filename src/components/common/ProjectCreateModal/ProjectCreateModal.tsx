import { ChangeEvent, FC, useEffect, useState } from "react";
import ModalCustom from "../../control/ModalCustom/ModalCustom.tsx";
import useThemeClass from "../../../hooks/useThemeClass.ts";
import "./ProjectCreateModalStyles.scss";
import ColorPicker from "../ColorPicker/ColorPicker.tsx";
import { IProjectCreate } from "../../../models/IProject/IProject.ts";
import { IColors } from "../../../models/IColors/IColors.ts";
import { useAppDispatch, useAppSelector } from "../../../store";
import {
  createProject,
  fetchProjects,
  fetchProjectUsers,
} from "../../../store/thunks/projectsThunks.ts";
import CustomButton from "../../control/ButtonComponents/CustomButton/CustomButton.tsx";
import TextInput from "../../control/TextInput/TextInput.tsx";
import MultiSelect from "../../control/MultiSelect/MultiSelect.tsx";
import { ISelectItem } from "../../../models/Select/Select.types.ts";

interface IProps {
  isOpen: boolean;
  handleClose: () => void;
}

const ProjectCreateModal: FC<IProps> = ({ isOpen, handleClose }) => {
  const dispatch = useAppDispatch();
  const { availableUsers } = useAppSelector((state) => state.projects);
  const [newProject, setNewProject] = useState<IProjectCreate>({
    title: "",
    link: "",
    color: "pink",
    userIds: [],
  });

  useEffect(() => {
    dispatch(fetchProjectUsers());
  }, [dispatch]);

  const validateProject = () => {
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

  const handleSubmit = async () => {
    if (validateProject()) {
      await dispatch(createProject(newProject));
      await dispatch(fetchProjects());
      resetForm();
      handleClose();
    }
  };

  const handleInputChange = (e: ChangeEvent<HTMLInputElement>) => {
    setNewProject((prevState) => ({
      ...prevState,
      [e.target.name]: e.target.value,
    }));
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
    <ModalCustom
      isOpen={isOpen}
      handleClose={handleClose}
      className={themeClass}
    >
      <div className={`${themeClass}__header`}>
        <h2 className={`${themeClass}__title`}>Project Create</h2>
      </div>
      <div className={`${themeClass}__row`}>
        <div className={`${themeClass}__column`}>
          <div className={`${themeClass}__field`}>
            <span className={`${themeClass}__fieldLabel`}>Title</span>
            <TextInput
              type="on-bgd"
              placeholder="Enter project name"
              name="title"
              value={newProject.title}
              onChange={handleInputChange}
            />
          </div>
          <div className={`${themeClass}__field`}>
            <span className={`${themeClass}__fieldLabel`}>Link</span>
            <TextInput
              type="on-bgd"
              placeholder="Enter project link"
              name="link"
              value={newProject.link}
              onChange={handleInputChange}
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
        <div className={`${themeClass}__field`}>
          <span className={`${themeClass}__fieldLabel`}>Color</span>
          <ColorPicker onChange={handleColorChange} />
        </div>
      </div>
      <div className={`${themeClass}__footer`}>
        <CustomButton
          type="tertiary"
          title={"Cancel"}
          size={"md"}
          clickHandler={handleClose}
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
export default ProjectCreateModal;

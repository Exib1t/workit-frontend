import { ChangeEvent, FC, SyntheticEvent, useEffect, useState } from "react";
import ModalCustom from "../../control/ModalCustom/ModalCustom.tsx";
import useThemeClass from "../../../hooks/useThemeClass.ts";
import "./ProjectCreateModalStyles.scss";
import ColorPicker from "../ColorPicker/ColorPicker.tsx";
import { IProjectCreate } from "../../../models/IProject/IProject.ts";
import { IColors } from "../../../models/IColors/IColors.ts";
import { useAppDispatch, useAppSelector } from "../../../store";
import { fetchProjectUsers } from "../../../store/thunks/projectsThunks.ts";
import { ICompressedUser } from "../../../models/IUser/IUser.ts";
import CustomButton from "../../control/ButtonComponents/CustomButton/CustomButton.tsx";
import TextInput from "../../control/TextInput/TextInput.tsx";
import Select from "../../control/Select/Select.tsx";

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

  const handleSubmit = () => {
    console.log("submit", newProject);
  };

  const handleInputChange = (e: ChangeEvent<HTMLInputElement>) => {
    setNewProject((prevState) => ({
      ...prevState,
      [e.target.name]: e.target.value,
    }));
  };

  const handleUsersChange = (_: SyntheticEvent, value: ICompressedUser[]) => {
    setNewProject((prevState) => ({
      ...prevState,
      userIds: value.map((user) => user.id),
    }));
  };

  const handleColorChange = (color: IColors) => {
    setNewProject((prevState) => ({ ...prevState, color }));
  };

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
              placeholder="Project name"
              name="title"
              value={newProject.title}
              onChange={handleInputChange}
            />
          </div>
          <div className={`${themeClass}__field`}>
            <span className={`${themeClass}__fieldLabel`}>Link</span>
            <TextInput
              type="on-bgd"
              placeholder="Link"
              name="link"
              value={newProject.link}
              onChange={handleInputChange}
            />
          </div>
          <div className={`${themeClass}__field`}>
            <span className={`${themeClass}__fieldLabel`}>Users</span>
            <Select
              items={availableUsers}
              onChange={handleUsersChange}
              getTitle={(option: ICompressedUser) =>
                `${option.first_name} ${option.last_name}`
              }
              type={"on-bgd"}
              placeholder="Select users"
              selected={availableUsers.filter((item) =>
                availableUsers.includes(item.id),
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

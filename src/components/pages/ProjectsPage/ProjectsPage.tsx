import useThemeClass from "../../../hooks/useThemeClass.ts";
import ProjectsHeader from "../../common/ProjectsHeader/ProjectsHeader.tsx";
import { useEffect, useState } from "react";
import { useAppDispatch } from "../../../store";
import { fetchProjects } from "../../../store/thunks/projectsThunks.ts";
import ProjectsTable from "../../common/ProjectsTable/ProjectsTable.tsx";
import ProjectCreateModal from "../../common/ProjectCreateModal/ProjectCreateModal.tsx";
import "./ProjectsPageStyles.scss";

const ProjectsPage = () => {
  const dispatch = useAppDispatch();
  const themeClass = useThemeClass("b-projectsPage");
  const [isCreateModalOpen, setIsCreateModalOpen] = useState(false);

  useEffect(() => {
    dispatch(fetchProjects());
  }, [dispatch]);

  const handleCreateModalOpen = () => {
    setIsCreateModalOpen(true);
  };

  const handleCreateModalClose = () => {
    setIsCreateModalOpen(false);
  };

  return (
    <div className={themeClass}>
      <div className={`${themeClass}__container`}>
        <ProjectsHeader handleNewProjectOpen={handleCreateModalOpen} />
        <ProjectsTable />
      </div>
      <ProjectCreateModal
        isOpen={isCreateModalOpen}
        handleClose={handleCreateModalClose}
      />
    </div>
  );
};
export default ProjectsPage;

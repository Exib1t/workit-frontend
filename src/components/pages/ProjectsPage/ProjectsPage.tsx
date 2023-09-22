import useThemeClass from "../../../hooks/useThemeClass.ts";
import ProjectsHeader from "../../common/ProjectsHeader/ProjectsHeader.tsx";
import { useCallback, useEffect, useState } from "react";
import { useAppDispatch } from "../../../store";
import { fetchProjects } from "../../../store/thunks/projectsThunks.ts";
import ProjectsTable from "../../common/ProjectsTable/ProjectsTable.tsx";
import ProjectCreateModal from "../../common/ProjectCreateModal/ProjectCreateModal.tsx";
import "./ProjectsPageStyles.scss";
import Page from "../../common/Page/Page.tsx";

const ProjectsPage = () => {
  const dispatch = useAppDispatch();
  const themeClass = useThemeClass("b-projectsPage");
  const [editableProjectId, setEditableProjectId] = useState<number | null>(
    null,
  );
  const [isCreateModalOpen, setIsCreateModalOpen] = useState(false);

  const handleFetchProjects = useCallback(() => {
    dispatch(fetchProjects());
  }, [dispatch]);

  const handleCreateModalOpen = () => {
    setIsCreateModalOpen(true);
  };

  const handleCreateModalClose = () => {
    setEditableProjectId(null);
    setIsCreateModalOpen(false);
  };

  const handleProjectEdit = (projectId: number) => {
    setEditableProjectId(projectId);
    handleCreateModalOpen();
  };

  useEffect(() => {
    handleFetchProjects();
  }, [dispatch, handleFetchProjects]);

  return (
    <Page>
      <div className={themeClass}>
        <div className={`${themeClass}__container`}>
          <ProjectsHeader handleNewProjectOpen={handleCreateModalOpen} />
          <ProjectsTable
            loadProjects={handleFetchProjects}
            handleProjectEdit={handleProjectEdit}
          />
        </div>
        <ProjectCreateModal
          isOpen={isCreateModalOpen}
          handleClose={handleCreateModalClose}
          editableProjectId={editableProjectId}
        />
      </div>
    </Page>
  );
};
export default ProjectsPage;

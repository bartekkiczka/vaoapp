import { FC } from 'react';
import { ProjectStatuses } from '../../helpers/ProjectStatuses';
import { useAppSelector } from '../../hooks/useReduxHooks';
import { TProject } from '../../types/Projects';
import ProjectElement from './components/ProjectElement';
import './projects.scss';

const ProjectsView: FC = () => {
  const projectsState = useAppSelector((state) => state.root.database.projects);
  const openProjects: Array<TProject> = projectsState.filter(
    (project) => project.status === ProjectStatuses.OPEN
  );
  const closedProjects: Array<TProject> = projectsState.filter(
    (project) => project.status === ProjectStatuses.CLOSED
  );
  return (
    <div className="projects">
      <p className="projects__section">Otwarte projekty:</p>
      <div className="projects__group">
        {openProjects.map((project: TProject, index: number) => {
          return <ProjectElement {...{ project }} key={index} />;
        })}
      </div>
      <p className="projects__section">Zamknięte projekty:</p>
      <div className="projects__group">
        {closedProjects.map((project: TProject, index: number) => {
          return <ProjectElement {...{ project }} key={index} />;
        })}
      </div>
    </div>
  );
};

export default ProjectsView;

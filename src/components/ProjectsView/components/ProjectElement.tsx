import { FC, useState } from 'react';
import { TProject } from '../../../types/Projects';
import { useAppSelector, useAppDispatch } from '../../../hooks/useReduxHooks';
import { TUser } from '../../../types/UserTypes';
import { ProjectStatuses } from '../../../helpers/ProjectStatuses';
import AddWorkersModal from './AddWorkersModal';
import { changeProjectStatus } from '../../../store/database';
import { Roles } from '../../../helpers/Roles';
import { TEvaluation } from '../../../types/Evaluations';
import AddEvaluationModal from '../../Evaluations/components/AddEvaluationModal';

interface Props {
  project: TProject;
}

const ProjectElement: FC<Props> = ({ project }: Props) => {
  const [showAddWorkersModal, setShowAddWorkersModal] =
    useState<boolean>(false);
  const [showEvaluationsModal, setShowEvaluationsModal] =
    useState<boolean>(false);
  const dbUsers: Array<TUser> = useAppSelector(
    (state) => state.root.database.users
  );
  const userData: TUser = useAppSelector((state) => state.root.user.userData);
  const evaluations: Array<TEvaluation> = useAppSelector(
    (state) => state.root.database.evaluations
  );
  const dispatch = useAppDispatch();

  const handleCloseProject = (): void => {
    dispatch(
      changeProjectStatus({
        projectId: project.id,
        status: ProjectStatuses.CLOSED,
      })
    );
  };

  const checkProjectEvaluations = (): boolean => {
    let foundEvaluations: number = 0;
    for (let i in project.workers) {
      const test = evaluations.find(
        (evaluation) =>
          evaluation.workerId === project.workers[i] &&
          evaluation.projectId === project.id
      );
      if (test) foundEvaluations += 1;
    }
    if (foundEvaluations === project.workers.length) return true;
    return false;
  };

  return (
    <div className="projects__element">
      {project.status === ProjectStatuses.CLOSED && (
        <div className="projects__element-overlay">
          {userData.role === Roles.ADMIN && (
            <div>
              {checkProjectEvaluations() ? (
                <div>Oceny wystawione</div>
              ) : (
                <button onClick={() => setShowEvaluationsModal(true)}>
                  Oceń
                </button>
              )}
            </div>
          )}
        </div>
      )}
      {showEvaluationsModal && (
        <AddEvaluationModal {...{ project, setShowEvaluationsModal }} />
      )}
      <img src={project.img} width={522} height={365} alt="projectImage" />
      <div className="projects__element-content">
        <p className="projects__element-date">{project.startDate}</p>
        <p className="projects__element-name">{project.name}</p>
        <p className="projects__element-relevance">
          Waga: <strong>{project.relevance.toString()}</strong>
        </p>
        <div className="projects__element-workers">
          <p>Pracownicy:</p>
          {project.workers.map((workerId: number, index: number) => {
            const user: TUser | undefined = dbUsers.find(
              (user) => user.id === workerId
            );
            if (!user) return null;
            return (
              <p key={index}>
                {user.name} {user.surname}
                {index !== project.workers.length - 1 ? ',' : ''}
              </p>
            );
          })}
        </div>
        {project.status === ProjectStatuses.OPEN &&
          userData.role === Roles.ADMIN && (
            <button
              className="projects__element-add"
              onClick={() => setShowAddWorkersModal(true)}
            >
              Dodaj pracowników
            </button>
          )}
        {showAddWorkersModal && (
          <AddWorkersModal {...{ project, setShowAddWorkersModal }} />
        )}
        {project.status === ProjectStatuses.OPEN &&
          userData.role === Roles.ADMIN && (
            <button
              className="projects__element-delete"
              onClick={handleCloseProject}
            >
              Zamknij projekt
            </button>
          )}
      </div>
    </div>
  );
};

export default ProjectElement;

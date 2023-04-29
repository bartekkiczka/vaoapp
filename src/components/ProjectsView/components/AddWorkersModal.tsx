import { Dispatch, FC, SetStateAction, useState } from 'react';
import { useAppSelector, useAppDispatch } from '../../../hooks/useReduxHooks';
import { addWorkersToProject } from '../../../store/database';
import { TProject } from '../../../types/Projects';
import { TUser } from '../../../types/UserTypes';

interface Props {
  project: TProject;
  setShowAddWorkersModal: Dispatch<SetStateAction<boolean>>;
}

const AddWorkersModal: FC<Props> = ({
  project,
  setShowAddWorkersModal,
}: Props) => {
  const [selectedWorkers, setSelectedWorkers] = useState<Array<number>>([]);
  const dbUsers: Array<TUser> = useAppSelector(
    (state) => state.root.database.users
  );
  const remainingWorkersArr = dbUsers.filter(
    (user) => !project.workers.includes(user.id)
  );
  const dispatch = useAppDispatch();

  const handleAddWorkers = (): void => {
    dispatch(
      addWorkersToProject({ projectId: project.id, workers: selectedWorkers })
    );
    setShowAddWorkersModal(false);
  };

  return (
    <div className="projects__workers-modal">
      <p>
        <strong>
          {remainingWorkersArr.length
            ? 'Zaznacz pracowników, których chcesz dodać:'
            : 'Brak pracowników do dodania'}
        </strong>
      </p>
      <div className="projects__workers-modal-content">
        {remainingWorkersArr.map((worker: TUser, index: number) => {
          return (
            <div
              className={`projects__workers-modal-worker ${
                selectedWorkers.includes(worker.id) ? 'worker-selected' : ''
              }`}
              onClick={() =>
                setSelectedWorkers([...selectedWorkers, worker.id])
              }
              key={index}
            >
              <p>
                {worker.name} {worker.surname}
              </p>
            </div>
          );
        })}
        <button onClick={handleAddWorkers}>
          {remainingWorkersArr.length ? 'Dodaj' : 'Zamknij'}
        </button>
      </div>
    </div>
  );
};

export default AddWorkersModal;

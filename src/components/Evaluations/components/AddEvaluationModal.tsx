import { Dispatch, FC, SetStateAction } from 'react';
import { useAppSelector } from '../../../hooks/useReduxHooks';
import { TProject } from '../../../types/Projects';
import { TUser } from '../../../types/UserTypes';
import AddEvaluationForm from './AddEvaluationForm';

interface Props {
  project: TProject;
  setShowEvaluationsModal: Dispatch<SetStateAction<boolean>>;
}

const AddEvaluationModal: FC<Props> = ({
  project,
  setShowEvaluationsModal,
}: Props) => {
  const evaluations = useAppSelector(
    (state) => state.root.database.evaluations
  );
  const dbUsers = useAppSelector((state) => state.root.database.users);

  const findDbUsers = (): {
    usersWithEvaluation: Array<TUser>;
    usersWithNoEvaluation: Array<TUser>;
  } => {
    const usersWithNoEvaluation: Array<TUser> = [];
    const usersWithEvaluation: Array<TUser> = [];
    for (let i in project.workers) {
      const dbUser: TUser | undefined = dbUsers.find(
        (user) => user.id === project.workers[i]
      );
      if (dbUser) {
        if (
          !evaluations.find(
            (evaluation) =>
              evaluation.projectId === project.id &&
              evaluation.workerId === dbUser.id
          )
        )
          usersWithNoEvaluation.push(dbUser);
        else usersWithEvaluation.push(dbUser);
      }
    }
    return { usersWithEvaluation, usersWithNoEvaluation };
  };

  return (
    <div className="evaluations__add-modal">
      <div className="evaluations__add-modal-overlay">
        <div className="evaluations__add-modal-content">
          <div
            className="modal-cross"
            onClick={() => setShowEvaluationsModal(false)}
          ></div>
          {findDbUsers().usersWithEvaluation.map(
            (user: TUser, index: number) => {
              return (
                <div
                  className="evaluations__add-modal-content-evaluated"
                  key={index}
                >
                  {user.name} {user.surname}: Oceniono
                </div>
              );
            }
          )}
          {findDbUsers().usersWithNoEvaluation.map(
            (user: TUser, index: number) => {
              return <AddEvaluationForm {...{ project, user }} key={index} />;
            }
          )}
        </div>
      </div>
    </div>
  );
};

export default AddEvaluationModal;

import { FC } from 'react';
import { useAppSelector } from '../../../../hooks/useReduxHooks';
import { TEvaluation } from '../../../../types/Evaluations';
import { TProject } from '../../../../types/Projects';
import { TUser } from '../../../../types/UserTypes';
import './evaluationsAdminView.scss';
import EvaluationsChart from './EvaluationsChart';

const EvaluationsAdminView: FC = () => {
  const dbUsers: Array<TUser> = useAppSelector(
    (state) => state.root.database.users
  );
  const dbProjects: Array<TProject> = useAppSelector(
    (state) => state.root.database.projects
  );
  const dbEvaluations: Array<TEvaluation> = useAppSelector(
    (state) => state.root.database.evaluations
  );

  const calculateAvarageEvaluation = (
    evaluations: Array<TEvaluation>
  ): number => {
    let evaluationsSum: number = 0;
    evaluations.forEach((evaluation: TEvaluation) => {
      evaluationsSum += evaluation.engagement + evaluation.execution;
    });
    return evaluationsSum / (evaluations.length * 2);
  };

  return (
    <div className="evaluations__admin-view">
      {dbUsers.map((dbUser: TUser, index: number) => {
        const userEvaluations: Array<TEvaluation> = dbEvaluations.filter(
          (evaluation: TEvaluation) => evaluation.workerId === dbUser.id
        );
        const weightedAvarage: number =
          calculateAvarageEvaluation(userEvaluations);
        if (!userEvaluations.length) return null;
        return (
          <div className="evaluations__admin-view-element" key={index}>
            <div className="evaluations__admin-view-left">
              <p className="evaluations__admin-view-element-name">
                <strong>
                  {dbUser.name} {dbUser.surname}
                </strong>
              </p>
              <div className="evaluations__admin-view-element-evaluations">
                <p>Oceny (wykonanie/zaangażowanie):</p>
                {userEvaluations.map(
                  (evaluation: TEvaluation, index: number) => {
                    return (
                      <p key={index}>
                        {
                          dbProjects.find(
                            (project) => project.id === evaluation.projectId
                          )!.name
                        }
                        :{' '}
                        <strong>
                          {evaluation.execution}/{evaluation.engagement}
                        </strong>
                      </p>
                    );
                  }
                )}
              </div>
              <div className="evaluations__admin-view-element-avarage">
                Średnia: <strong>{weightedAvarage}</strong>
              </div>
            </div>
            <div className="evaluations__admin-view-right">
              <EvaluationsChart {...{ dbUser, userEvaluations }} />
            </div>
          </div>
        );
      })}
    </div>
  );
};

export default EvaluationsAdminView;

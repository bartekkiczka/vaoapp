import { FC } from 'react';
import { useAppSelector } from '../../../../hooks/useReduxHooks';
import { TEvaluation } from '../../../../types/Evaluations';
import { TProject } from '../../../../types/Projects';
import { TUser } from '../../../../types/UserTypes';
import './evaluationsEmployeeView.scss';

const EvaluationsEmployeeView: FC = () => {
  const dbProjects: Array<TProject> = useAppSelector(
    (state) => state.root.database.projects
  );
  const dbEvaluations: Array<TEvaluation> = useAppSelector(
    (state) => state.root.database.evaluations
  );
  const userData: TUser = useAppSelector((state) => state.root.user.userData);
  const userEvaluations: Array<TEvaluation> = dbEvaluations.filter(
    (evaluation) => evaluation.workerId === userData.id
  );
  return (
    <div className="evaluations__employee-view">
      {userEvaluations.map((evaluation: TEvaluation, index: number) => {
        return (
          <div className="evaluations__employee-view-element" key={index}>
            <p className="evaluations__employee-view-element-name">
              {/* <strong>{project.name}</strong> */}
              <strong>
                {
                  dbProjects.find(
                    (project) => project.id === evaluation.projectId
                  )!.name
                }
              </strong>
            </p>
            <div className="evaluations__admin-view-element-evaluations">
              <p>Oceny:</p>
              <p>
                Wykonanie: <strong>{evaluation.execution}</strong>
              </p>
              <p>
                Zaangażowanie: <strong>{evaluation.engagement}</strong>
              </p>
            </div>
            <p>Komentarz: {evaluation.comment}</p>
          </div>
        );
      })}
    </div>
  );
};

export default EvaluationsEmployeeView;

import { FC } from 'react';
import { Roles } from '../../helpers/Roles';
import { useAppSelector } from '../../hooks/useReduxHooks';
import { TUser } from '../../types/UserTypes';
import EvaluationsAdminView from './components/EvaluationsAdminView/EvaluationsAdminView';
import EvaluationsEmployeeView from './components/EvaluationsEmployeeView/EvaluationsEmployeeView';
import './evaluations.scss';

const Evaluations: FC = () => {
  const userData: TUser = useAppSelector((state) => state.root.user.userData);
  return (
    <div className="evaluations">
      {userData.role === Roles.ADMIN ? (
        <EvaluationsAdminView />
      ) : (
        <EvaluationsEmployeeView />
      )}
    </div>
  );
};

export default Evaluations;

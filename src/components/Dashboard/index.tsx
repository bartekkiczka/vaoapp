import { FC, useState } from 'react';
import { Navigate } from 'react-router-dom';
import { RoutingPaths } from '../../helpers/RoutingPaths';
import { useAppSelector } from '../../hooks/useReduxHooks';
import { Roles } from '../../helpers/Roles';
import { TDashboardTabs } from '../../types/Dashboard';
import Header from '../Header';
import useMyCookies from '../../hooks/useMyCookies';
import UsersListView from '../UsersListView';
import DashboardTabs from './components/DashboardTabs';
import ProjectsView from '../ProjectsView';
import Evaluations from '../Evaluations';
import './dashboard.scss';

const TABS: Array<TDashboardTabs> = [
  {
    index: 0,
    label: 'Użytkownicy',
    component: <UsersListView />,
  },
  {
    index: 1,
    label: 'Projekty',
    component: <ProjectsView />,
  },
  {
    index: 2,
    label: 'Oceny',
    component: <Evaluations />,
  },
];

const Dashboard: FC = () => {
  const { cookies } = useMyCookies(['TOKEN']);
  const userState = useAppSelector((state) => state.root.user.userData);
  const [selectedTabIndex, setSelectedTabIndex] = useState<number>(
    userState.role === Roles.ADMIN ? 0 : 1
  );
  return (
    <>
      {!cookies.TOKEN && <Navigate to={RoutingPaths.LOGIN} replace={true} />}
      <div className="dashboard">
        <Header />
        <DashboardTabs {...{ TABS, selectedTabIndex, setSelectedTabIndex }} />
        {TABS[selectedTabIndex].component}
      </div>
    </>
  );
};

export default Dashboard;

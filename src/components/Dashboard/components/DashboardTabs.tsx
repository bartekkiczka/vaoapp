import { Dispatch, FC, SetStateAction } from 'react';
import { Roles } from '../../../helpers/Roles';
import { useAppSelector } from '../../../hooks/useReduxHooks';
import { TDashboardTabs } from '../../../types/Dashboard';

interface Props {
  TABS: Array<TDashboardTabs>;
  selectedTabIndex: number;
  setSelectedTabIndex: Dispatch<SetStateAction<number>>;
}

const DashboardTabs: FC<Props> = ({
  TABS,
  selectedTabIndex,
  setSelectedTabIndex,
}: Props) => {
  const userState = useAppSelector((state) => state.root.user.userData);
  return (
    <div className="dashboard__tabs">
      {TABS.map((tab: TDashboardTabs, index: number) => {
        if (tab.index === 0 && userState.role === Roles.EMPLOYEE) return null;
        return (
          <div
            className={`dashboard__tabs-tab ${
              selectedTabIndex === index ? 'tab-selected' : ''
            } theme-${userState.role}`}
            onClick={() => setSelectedTabIndex(index)}
            key={index}
          >
            {tab.label}
          </div>
        );
      })}
    </div>
  );
};

export default DashboardTabs;

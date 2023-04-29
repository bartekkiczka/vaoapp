import { FC } from 'react';
import {
  Chart as ChartJS,
  CategoryScale,
  LinearScale,
  PointElement,
  LineElement,
  Title,
  Tooltip,
  Legend,
} from 'chart.js';
import { Line } from 'react-chartjs-2';
import { TEvaluation } from '../../../../types/Evaluations';
import { TUser } from '../../../../types/UserTypes';
import { useAppSelector } from '../../../../hooks/useReduxHooks';
import { TProject } from '../../../../types/Projects';

ChartJS.register(
  CategoryScale,
  LinearScale,
  PointElement,
  LineElement,
  Title,
  Tooltip,
  Legend
);

const options = {
  responsive: true,
  plugins: {
    legend: {
      position: 'top' as const,
    },
    title: {
      display: true,
      text: 'Zmiany ocen względem projektów',
    },
  },
};

interface Props {
  dbUser: TUser;
  userEvaluations: Array<TEvaluation>;
}

const EvaluationsChart: FC<Props> = ({ dbUser, userEvaluations }: Props) => {
  const dbProjects: Array<TProject> = useAppSelector(
    (state) => state.root.database.projects
  );
  const userProjects: Array<TProject> = dbProjects.filter((project) =>
    project.workers.includes(dbUser.id)
  );
  const labels: Array<string> = userProjects.map(
    (project) => project.startDate
  );

  const data = {
    labels,
    datasets: [
      {
        label: 'Wykonanie',
        data: userEvaluations.map((evaluation) => evaluation.execution),
        borderColor: 'rgb(255, 99, 132)',
        backgroundColor: 'rgba(255, 99, 132, 0.5)',
      },
      {
        label: 'Zaangażowanie',
        data: userEvaluations.map((evaluation) => evaluation.engagement),
        borderColor: 'rgb(53, 162, 235)',
        backgroundColor: 'rgba(53, 162, 235, 0.5)',
      },
    ],
  };

  return <Line options={options} data={data} width={600} height={300} />;
};

export default EvaluationsChart;

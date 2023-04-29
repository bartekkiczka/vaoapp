import { FC } from 'react';
import { TProject } from '../../../types/Projects';
import { TUser } from '../../../types/UserTypes';
import { useForm } from 'react-hook-form';
import { TEvaluation } from '../../../types/Evaluations';
import { useAppSelector, useAppDispatch } from '../../../hooks/useReduxHooks';
import { addEvaluation } from '../../../store/database';

interface Props {
  project: TProject;
  user: TUser;
}

const AddEvaluationForm: FC<Props> = ({ project, user }: Props) => {
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<Partial<TEvaluation>>();
  const dbEvaluations = useAppSelector(
    (state) => state.root.database.evaluations
  );
  const dispatch = useAppDispatch();

  const onSubmit = handleSubmit((data: Partial<TEvaluation>): void => {
    const newEvaluation: TEvaluation = {
      id: dbEvaluations.length + 1,
      workerId: user.id,
      projectId: project.id,
      execution: data.execution!,
      engagement: data.engagement!,
      comment: data.comment!,
    };
    dispatch(addEvaluation(newEvaluation));
  });

  return (
    <div className="evaluations__add-modal-form">
      <p>
        <strong>
          {user.name} {user.surname}:
        </strong>
      </p>
      <form onSubmit={onSubmit}>
        <label>Wykonanie</label>
        <input
          type="number"
          placeholder="Wykonanie"
          min={1}
          max={10}
          {...register('execution', { required: true, min: 1, max: 10 })}
        />
        {errors.execution && <p>Wymagana ocena</p>}
        <label>Zaangażowanie</label>
        <input
          type="number"
          min={1}
          max={10}
          placeholder="Zaangażowanie"
          {...register('engagement', { required: true, min: 1, max: 10 })}
        />
        {errors.engagement && <p>Wymagana ocena</p>}
        <label>Komentarz</label>
        <textarea
          placeholder="Komentarz"
          {...register('comment', { required: true })}
        />
        <button>Dodaj</button>
      </form>
    </div>
  );
};

export default AddEvaluationForm;

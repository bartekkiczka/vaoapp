import { Dispatch, FC, SetStateAction } from 'react';
import { useForm } from 'react-hook-form';
import { Roles } from '../../../helpers/Roles';
import { TUser } from '../../../types/UserTypes';
import { useAppSelector, useAppDispatch } from '../../../hooks/useReduxHooks';
import { addUser, editUser } from '../../../store/database';

interface Props {
  user?: TUser;
  setShowEditUserModal: Dispatch<SetStateAction<boolean>>;
}

const EditUserModal: FC<Props> = ({ setShowEditUserModal, user }: Props) => {
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<Partial<TUser>>();
  const userState = useAppSelector((state) => state.root.user.userData);
  const dbUsers = useAppSelector((state) => state.root.database.users);
  const dispatch = useAppDispatch();

  const handleAddNewUser = (data: Partial<TUser>): void => {
    const newUser: TUser = {
      id: dbUsers.length + 1,
      startDate: new Date().toISOString().split('T')[0].toString(),
      name: data.name!,
      surname: data.surname!,
      email: data.email!,
      password: data.password!,
      role: data.role!,
    };
    dispatch(addUser(newUser));
    setShowEditUserModal(false);
  };

  const handleEditUser = (user: TUser, data: Partial<TUser>) => {
    // console.log(user);
    // console.log(data);
    const userToUpdate: TUser = {
      id: user.id,
      startDate: user.startDate,
      name: data.name!,
      surname: data.surname!,
      email: data.email!,
      password: data.password!,
      role: data.role!,
    };
    dispatch(editUser(userToUpdate));
    setShowEditUserModal(false);
  };

  const onSubmit = handleSubmit((data: Partial<TUser>): void => {
    if (!data) return;
    if (!user) handleAddNewUser(data);
    else handleEditUser(user, data);
  });
  return (
    <div className="user-modal">
      <div className="user-modal__overlay">
        <div className="user-modal__content">
          <div
            className="modal-cross"
            onClick={() => setShowEditUserModal(false)}
          ></div>
          <form onSubmit={onSubmit}>
            <label>Imię</label>
            <input
              type="string"
              placeholder="Imię"
              defaultValue={user?.name}
              {...register('name', { required: true })}
              style={{ border: errors.name ? '1px solid red' : '' }}
            />
            {errors.name && (
              <p className="user-modal__error">Imię jest wymagane</p>
            )}
            <label>Nazwisko</label>
            <input
              type="string"
              placeholder="Nazwisko"
              defaultValue={user?.surname}
              {...register('surname', { required: true })}
              style={{ border: errors.surname ? '1px solid red' : '' }}
            />
            {errors.surname && (
              <p className="user-modal__error">Nazwisko jest wymagane</p>
            )}
            <label>Email</label>
            <input
              type="string"
              placeholder="Email"
              defaultValue={user?.email}
              {...register('email', { required: true })}
              style={{ border: errors.email ? '1px solid red' : '' }}
            />
            {errors.email && (
              <p className="user-modal__error">Email jest wymagany</p>
            )}
            <label>Hasło</label>
            <input
              type="password"
              placeholder="Hasło"
              defaultValue={user?.password}
              {...register('password', { required: true })}
              style={{ border: errors.password ? '1px solid red' : '' }}
            />
            {errors.password && (
              <p className="user-modal__error">Hasło jest wymagane</p>
            )}
            <label>Rola</label>
            <select
              defaultValue={user?.role}
              {...register('role', { required: true })}
            >
              <option value={Roles.EMPLOYEE}>Pracownik</option>
              <option value={Roles.ADMIN}>Admin</option>
            </select>
            <button className={`theme-${userState.role || 'default'}`}>
              {user ? 'Zapisz' : 'Dodaj'}
            </button>
          </form>
        </div>
      </div>
    </div>
  );
};

export default EditUserModal;

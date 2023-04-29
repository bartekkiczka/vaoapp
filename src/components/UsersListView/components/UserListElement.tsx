import { FC, useState } from 'react';
import { TUser } from '../../../types/UserTypes';
import { useAppSelector, useAppDispatch } from '../../../hooks/useReduxHooks';
import { deleteUser } from '../../../store/database';
import EditUserModal from './EditUserModal';
import { Roles } from '../../../helpers/Roles';

interface Props {
  user: TUser;
}

const UserListElement: FC<Props> = ({ user }: Props) => {
  const [showEditUserModal, setShowEditUserModal] = useState<boolean>(false);
  const userState = useAppSelector((state) => state.root.user.userData);
  const dispatch = useAppDispatch();
  return (
    <>
      {showEditUserModal && (
        <EditUserModal {...{ setShowEditUserModal, user }} />
      )}
      {user && (
        <div className="users-list__element">
          <p>{user.name}</p>
          <p>{user.surname}</p>
          <p>{user.startDate}</p>
          <p>{user.email}</p>
          <p>{user.password}</p>
          <p>{user.role === Roles.EMPLOYEE ? 'Pracownik' : 'Admin'}</p>
          <div>
            <button
              className={`theme-${userState.role || 'default'}`}
              onClick={() => setShowEditUserModal(true)}
            >
              Edytuj
            </button>
            <button onClick={() => dispatch(deleteUser(user.id))}>Usuń</button>
          </div>
        </div>
      )}
    </>
  );
};

export default UserListElement;

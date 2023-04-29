import { useState, FC } from 'react';
import { useAppSelector } from '../../hooks/useReduxHooks';
import { TUser } from '../../types/UserTypes';
import EditUserModal from './components/EditUserModal';
import UserListElement from './components/UserListElement';
import './usersList.scss';

const HEADERS: Array<string> = [
  'Imię',
  'Nazwisko',
  'Data rozpoczęcia',
  'Email',
  'Hasło',
  'Rola',
];

const UsersListView: FC = () => {
  const [showEditUserModal, setShowEditUserModal] = useState<boolean>(false);
  const userState = useAppSelector((state) => state.root.user.userData);
  const dbUsers = useAppSelector((state) => state.root.database.users);

  return (
    <div className="users-list">
      {showEditUserModal && <EditUserModal {...{ setShowEditUserModal }} />}
      <div className="users-list__add">
        <button
          className={`theme-${userState.role || 'default'}`}
          onClick={() => setShowEditUserModal(true)}
        >
          Dodaj użytkownika
        </button>
      </div>
      <div className="users-list__headers">
        {HEADERS.map((key: string, index: number) => {
          return <p key={index}>{key}</p>;
        })}
        <div></div>
      </div>
      {dbUsers.map((user: TUser, index: number) => {
        return <UserListElement {...{ user }} key={index} />;
      })}
    </div>
  );
};

export default UsersListView;

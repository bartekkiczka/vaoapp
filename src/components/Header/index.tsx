import { FC } from 'react';
import { useNavigate } from 'react-router-dom';
import { RoutingPaths } from '../../helpers/RoutingPaths';
import { useAppSelector } from '../../hooks/useReduxHooks';
import useMyCookies from '../../hooks/useMyCookies';
import './header.scss';

const Header: FC = () => {
  const navigate = useNavigate();
  const { cookies, removeCookie } = useMyCookies(['TOKEN']);
  const userState = useAppSelector((state) => state.root.user);

  const handleLogout = (): void => {
    removeCookie('TOKEN');
    navigate(RoutingPaths.LOGIN);
  };

  return (
    <div className={`header theme-${userState.userData.role || 'default'}`}>
      <div className="header__left">
        <p>VaoApp</p>
      </div>
      <div className="header__right">
        {cookies.TOKEN && <p onClick={handleLogout}>Wyloguj</p>}
      </div>
    </div>
  );
};

export default Header;

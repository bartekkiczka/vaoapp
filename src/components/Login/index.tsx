import { FC, useState } from 'react';
import { GoogleLogin } from '@react-oauth/google';
import { useNavigate } from 'react-router-dom';
import { RoutingPaths } from '../../helpers/RoutingPaths';
import { useForm } from 'react-hook-form';
import { TUser } from '../../types/UserTypes';
import { useAppDispatch, useAppSelector } from '../../hooks/useReduxHooks';
import { setUserData } from '../../store/user';
import useMyCookies from '../../hooks/useMyCookies';
import Header from '../Header';
import './login.scss';

type TGoogleResponse = {
  clientId?: string | undefined;
  credential?: string | undefined;
  select_by?: string | undefined;
};

const Login: FC = () => {
  const [loginError, setLoginError] = useState<boolean>(false);
  const { setCookie } = useMyCookies(['TOKEN']);
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<Partial<TUser>>();
  const navigate = useNavigate();
  const dispatch = useAppDispatch();
  const database = useAppSelector((state) => state.root.database);
  const userState = useAppSelector((state) => state.root.user.userData);

  const handleSuccessfullLogin = (credentials: TGoogleResponse): void => {
    setCookie('TOKEN', credentials.credential, { maxAge: 86400 });
    const googleUser: TUser = {
      id: database.users.length + 1,
      name: 'Marcin',
      surname: 'Kowalski',
      startDate: new Date().toISOString().split('T')[0].toString(),
      email: 'test5@gmail.com',
      password: 'pass',
      role: 'admin',
    };
    dispatch(setUserData(googleUser));
    navigate(RoutingPaths.DASHBOARD);
  };

  const onSubmit = handleSubmit((data: Partial<TUser>): void => {
    const user = database.users.find((user) => {
      return user.email === data.email && user.password === data.password;
    });
    if (!user) {
      setLoginError(true);
      return;
    }
    setCookie('TOKEN', 'qewjkbndejhbc32jbhjh', { maxAge: 86400 });
    dispatch(setUserData(user));
    navigate(RoutingPaths.DASHBOARD);
  });

  return (
    <div className="login">
      <Header />
      <form onSubmit={onSubmit}>
        <p>
          Logowanie rozwiązałem tak, że możemy zalogować się za pomocą maila i
          hasła - wtedy zostanie przeszukana testowa baza danych (tam można
          podejrzeć testowe dane - plik database.ts) i jeżeli znajdzie
          odpowiednie dane, to zostanie do cookiesów przypisany losowy token, a
          jeśli zalogujemy sie przez Google, to zostanie przypisany token
          zwrocony przez Google (z racji tego, że google nie zwraca danych typu
          imie czy nazwisko, zostaną przypisane zhardcodowane dane). Każdy
          użytkownik w bazie ma przypisanę role, a jeżeli zalogujemy się przez
          Google, zostanie przypisana rola Admina.
        </p>
        <label>Email</label>
        <input
          type="string"
          placeholder="Email"
          {...register('email', { required: true })}
          style={{ border: errors.email ? '1px solid red' : '' }}
        />
        {errors.email && <p className="login__error">Email jest wymagany</p>}
        <label>Hasło</label>
        <input
          type="password"
          placeholder="Hasło"
          {...register('password', { required: true })}
          style={{ border: errors.password ? '1px solid red' : '' }}
        />
        {errors.password && <p className="login__error">Hasło jest wymagane</p>}
        {loginError && <p className="login-error-msg">Błędne dane</p>}
        <button className={`theme-${userState.role || 'default'}`}>
          Login
        </button>
      </form>
      <GoogleLogin
        onSuccess={handleSuccessfullLogin}
        onError={() => console.log('Login failed')}
      />
    </div>
  );
};

export default Login;

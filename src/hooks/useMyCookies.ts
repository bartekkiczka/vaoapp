import { useCookies } from 'react-cookie';

const useMyCookies = ([propCookies]: [string]) => {
  const [cookies, setCookie, removeCookie] = useCookies([propCookies]);

  return { cookies, setCookie, removeCookie };
};

export default useMyCookies;

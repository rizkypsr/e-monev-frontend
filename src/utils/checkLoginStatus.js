import { useCookies } from 'react-cookie';

export const checkLoginStatus = () => {
  const [cookies, setCookie, removeCookie] = useCookies(['token', 'user']);

  let loggedIn = cookies['token'] ? true : false;
  let role = '';

  if (loggedIn) {
    role = cookies['user'].admin_role_id === 1 ? 'admin' : 'opd';
  }

  return {
    loggedIn,
    role,
  };
};

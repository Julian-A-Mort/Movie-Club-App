import { useMutation } from '@apollo/client';
import { LOGIN_MUTATION } from '../utils/mutations';
import AuthService from './auth';

const useLogin = () => {
  const [loginMutation, { loading, error }] = useMutation(LOGIN_MUTATION);

  const login = async (email, password) => {
    try {
      const { data } = await loginMutation({
        variables: {
          email,
          password,
        },
      });

      if (data.login.token) {
        AuthService.login(data.login.token); // Store token and handle user login
      }
    } catch (error) {
      console.error('Login error:', error);
      // Handle error, e.g., show error message
    }
  };

  return { login, loading, error };
};

export default useLogin;

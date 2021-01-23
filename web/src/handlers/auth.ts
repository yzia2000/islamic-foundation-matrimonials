import axios from 'axios';
import { FormikValues } from 'formik';

export const login = (
  user: FormikValues,
  setStatus: (state: boolean) => void
) => {
  axios
    .post('/auth/login', user)
    .then((res) => {
      setAuthorizationHeader(res.data);
    })
    .catch((err) => {
      console.log(err);
      setStatus(true);
    });
};

const setAuthorizationHeader = (token: string) => {
  const FBIdToken = `Bearer ${token}`;
  localStorage.setItem('FBIdToken', FBIdToken);
  axios.defaults.headers.common['Authorization'] = FBIdToken;
};

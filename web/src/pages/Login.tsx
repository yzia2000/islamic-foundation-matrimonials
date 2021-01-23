import React, { useState } from 'react';
import { useFormik } from 'formik';
import * as yup from 'yup';
import { login } from '../handlers/auth';
import {
  Typography,
  Button,
  TextField,
  Paper,
  Fab
} from '@material-ui/core';
import './Login.css';
import { Home } from '@material-ui/icons';
import { Link } from 'react-router-dom';

const validationSchema = yup.object({
  email: yup
    .string()
    .email('Enter a valid email')
    .required('Email is required'),
  password: yup.string().required('Password is required')
});

const Login = () => {
  const [authFail, setAuthFail] = useState(false);

  const formik = useFormik({
    initialValues: {
      email: '',
      password: ''
    },
    validationSchema: validationSchema,
    onSubmit: async (values, { setSubmitting }) => {
      setSubmitting(false);
      login(values, setAuthFail);
    }
  });

  return (
    <div className="login-form">
      <Paper elevation={2} className="login-paper">
        {authFail && (
          <Typography color="error">Incorrect Email or Password</Typography>
        )}
        <form onSubmit={formik.handleSubmit}>
          <TextField
            fullWidth
            id="email"
            name="email"
            label="Email"
            value={formik.values.email}
            onChange={formik.handleChange}
            error={formik.touched.email && Boolean(formik.errors.email)}
            helperText={formik.touched.email && formik.errors.email}
          />
          <TextField
            fullWidth
            id="password"
            name="password"
            label="Password"
            type="password"
            value={formik.values.password}
            onChange={formik.handleChange}
            error={formik.touched.password && Boolean(formik.errors.password)}
            helperText={formik.touched.password && formik.errors.password}
          />
          <Button color="primary" variant="contained" fullWidth type="submit">
            Login
          </Button>
        </form>
      </Paper>
      <Link to="/">
        <Fab color="primary" className="bot-button">
          <Home />
        </Fab>
      </Link>
    </div>
  );
};

export default Login;

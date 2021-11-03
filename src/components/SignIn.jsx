import React, { useContext, useState } from 'react';
import { useHistory } from 'react-router-dom';
import { useFormik } from 'formik';
import { Formik, Form, Field } from 'formik';
import UserContext from '../contexts/userContext';
import * as Yup from 'yup';
import axios from 'axios';

const SignupSchema = Yup.object().shape({
  username: Yup.string().min(2, 'Too Short!').max(50, 'Too Long!').required('Required'),
  password: Yup.string().min(2, 'Too Short!').max(50, 'Too Long!').required('Required'),
});

// const logIn = async () => {
// console.log('logging run');
// try {
//   const response = await axios.post('/api/v1/login', { username, password });
//   // console.log('response', response);
//   const { username: user, token } = response.data;
//   console.log(user, token);
//   localStorage.setItem('user', user);
//   localStorage.setItem('token', token);
// } catch (error) {
//   console.log('error log in', error);
// }
// console.log(localStorage);
// };

const SignInForm = () => {
  const { user, logIn } = useContext(UserContext);
  const [currnetUser, setCurrentUser] = useState(user);
  const [authFailed, setAuthFailed] = useState(false);
  const history = useHistory();
  // console.log(user, logIn);
  return (
    <div>
      <h1>Signup</h1>
      <Formik
        initialValues={{
          username: 'admin',
          password: 'admin',
        }}
        validationSchema={SignupSchema}
        onSubmit={async (values) => {
          const { username, password } = values;
          try {
            const response = await axios.post('/api/v1/login', { username, password });
            console.log('response', response.data);
            const { token } = response.data;
            console.log('token', token);
            setCurrentUser(response.data);
            logIn(response.data);
            history.replace('/');
          } catch (e) {
            setAuthFailed(true);
          }
        }}
      >
        {({ errors, touched }) => (
          <Form>
            <Field name='username' />
            {errors.username && touched.username ? <div>{errors.username}</div> : null}
            <Field name='password' type='password' />
            {errors.password && touched.password ? <div>{errors.password}</div> : null}
            {authFailed ? <div>{'неверный пароль'}</div> : null}
            <button type='submit'>Submit</button>
          </Form>
        )}
      </Formik>
    </div>
  );
};

export default SignInForm;

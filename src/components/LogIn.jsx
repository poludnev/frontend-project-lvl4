import React, { useContext, useState, useRef } from 'react';
import { useHistory, Link } from 'react-router-dom';
import { useFormik } from 'formik';
import { Formik, Field } from 'formik';
// import { Card } from 'react-bootstrap';
import { Card, Form, FloatingLabel, Button } from 'react-bootstrap';
import UserContext from '../contexts/userContext';
import * as Yup from 'yup';
import axios from 'axios';
import { useTranslation } from 'react-i18next';

// import { useRollbar } from '@rollbar/react';

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
  // const rollbar = useRollbar();
  const { user, logIn } = useContext(UserContext);
  const [currnetUser, setCurrentUser] = useState(user);
  const [isAuthFailed, setAuthFailed] = useState(false);
  const [isSubmitting, setSubmitting] = useState(false);
  const history = useHistory();
  const { t } = useTranslation();
  const userInput = useRef();

  const SignupSchema = Yup.object().shape({
    username: Yup.string().required(t('errors.required')),
    // .min(2, t('errors.tooShort'))
    // .max(50, t('errors.tooLong')),
    password: Yup.string().required(t('errors.required')),
    // .min(2, t('errors.tooShort'))
    // .max(50, t('errors.tooLong'))
  });
  // console.log(user, logIn);
  return (
    <div className='container-fluid h-100'>
      <div className='row justify-content-center align-content-center h-100'>
        <div className='col-12 col-md-8 col-xxl-6'>
          <Card>
            <h1>{t('logIn.title')}</h1>
            <Formik
              initialValues={{
                username: '',
                password: '',
              }}
              validationSchema={SignupSchema}
              onSubmit={async (values) => {
                const { username, password } = values;
                setSubmitting(true);
                try {
                  const response = await axios.post('/api/v1/login', { username, password });
                  // console.log('response', response.data);
                  const { token } = response.data;
                  // console.log('token', token);
                  setCurrentUser(response.data);
                  logIn(response.data);
                  history.replace('/');
                } catch (e) {
                  // rollbar.error('error in auth', e, { values });
                  setAuthFailed(true);
                }
                setSubmitting(false);
              }}
            >
              {({ errors, touched, handleSubmit, handleChange, values }) => {
                // console.log(errors);
                return (
                  // <Form>
                  <Form noValidate onSubmit={handleSubmit} className='w-100'>
                    <FloatingLabel
                      controlId='username'
                      label={t('logIn.usernamePlaceholder')}
                      className='mb-3'
                    >
                      <Form.Control
                        type='text'
                        name='username'
                        placeholder={t('logIn.usernamePlaceholder')}
                        autoComplete='off'
                        isInvalid={isAuthFailed || !!errors.username}
                        value={values.username}
                        onChange={handleChange}
                        ref={userInput}
                      />
                      {/* <Form.Control.Feedback type='invalid' tooltip>
                        {isAuthFailed ? t('logIn.signInFailure') : errors.username}
                      </Form.Control.Feedback> */}
                    </FloatingLabel>
                    <FloatingLabel
                      controlId='password'
                      label={t('logIn.passwordPlaceholder')}
                      className='mb-3'
                    >
                      <Form.Control
                        type='password'
                        name='password'
                        placeholder={t('logIn.passwordPlaceholder')}
                        autoComplete='off'
                        isInvalid={isAuthFailed || errors.password}
                        value={values.password}
                        onChange={handleChange}
                      />
                      <Form.Control.Feedback type='invalid' tooltip>
                        {isAuthFailed ? t('logIn.signInFailure') : errors.password}
                      </Form.Control.Feedback>
                    </FloatingLabel>
                    <Button
                      variant='outline-primary'
                      type='submit'
                      className='w-100'
                      disabled={isSubmitting}
                    >
                      {t('logIn.submitButton')}
                    </Button>
                  </Form>
                );
              }}
            </Formik>
            <Card.Footer className='p-4'>
              <div className='text-center'>
                <span>{t('logIn.signUpTitle')}</span>&nbsp;
                <Link to='/signup'>{t('logIn.signUpLink')}</Link>
              </div>
            </Card.Footer>
          </Card>
        </div>
      </div>
    </div>
  );
};

export default SignInForm;

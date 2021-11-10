import React, { useContext, useState, useRef } from 'react';
import { useHistory, Link } from 'react-router-dom';
import { Formik } from 'formik';
import { Card, Form, FloatingLabel, Button } from 'react-bootstrap';
import UserContext from '../contexts/userContext';
import * as Yup from 'yup';
import axios from 'axios';
import { useTranslation } from 'react-i18next';

const LogInForm = () => {
  const { logIn } = useContext(UserContext);
  // const [currnetUser, setCurrentUser] = useState(user);
  const [isAuthFailed, setAuthFailed] = useState(false);
  const [isSubmitting, setSubmitting] = useState(false);
  const history = useHistory();
  const { t } = useTranslation();
  const userInput = useRef();

  const SignupSchema = Yup.object().shape({
    username: Yup.string().required(t('errors.required')),
    password: Yup.string().required(t('errors.required')),
  });
  // console.log(user, logIn);
  return (
    <div className='container-fluid h-100'>
      <div className='row justify-content-center align-content-center h-100'>
        <div className='col-12 col-md-8 col-xxl-6'>
          <Card className='shadow-sm'>
            <Card.Body className='d-flex flex-column justify-content-around align-items-center p-5'>
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
                    // const { token } = response.data;
                    // console.log('token', token);
                    // setCurrentUser(response.data);
                    logIn(response.data);
                    history.replace('/');
                  } catch (e) {
                    // rollbar.error('error in auth', e, { values });
                    setAuthFailed(true);
                  }
                  setSubmitting(false);
                }}
              >
                {({ errors, handleSubmit, handleChange, values }) => {
                  // console.log(errors);
                  return (
                    // <Form>
                    <Form
                      noValidate
                      onSubmit={handleSubmit}
                      className='col-12 col-md-6 mt-3 mt-mb-0 w-100'
                    >
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
            </Card.Body>
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

export default LogInForm;

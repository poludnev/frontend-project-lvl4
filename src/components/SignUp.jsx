import React, { useContext, useState, useRef, useEffect } from 'react';
import { useHistory, Link } from 'react-router-dom';
import { useFormik } from 'formik';
import { Formik } from 'formik';
import { Card, Form, FloatingLabel, Button } from 'react-bootstrap';
import UserContext from '../contexts/userContext';
import * as Yup from 'yup';
import axios from 'axios';
import { useTranslation } from 'react-i18next';
import { useRollbar } from '@rollbar/react';

const SignUpForm = () => {
  const { t } = useTranslation();
  const rollbar = useRollbar();
  const userInput = useRef();
  useEffect(() => {
    userInput.current.focus();
  }, []);
  const SignupSchema = Yup.object().shape({
    username: Yup.string()
      .min(3, t('errors.tooShort'))
      .max(20, t('errors.tooLong'))
      .required(t('errors.required')),
    password: Yup.string()
      .min(6, t('errors.passwordTooShort'))
      .max(20, t('errors.tooLong'))
      .required(t('errors.required')),
    passwordConfirmation: Yup.string()
      .required(t('errors.required'))
      .oneOf([Yup.ref('password'), null], t('errors.passwordNotMatch')),
  });
  const [isSubmitting, setSubmitting] = useState(false);
  const { logIn } = useContext(UserContext);
  const [isSignUpFailed, setSignUpFailed] = useState(false);
  const history = useHistory();

  return (
    <div className='container=fluid h-100'>
      <div className='row justify-content-center align-content-center h-100'>
        <div className='col-12 col-md-8 col-xxl-6'>
          <Card className='shadow-sm'>
            <Card.Body className='d-flex flex-column flex-md-row justify-content-around align-items-center p-5'>
              <Formik
                validationSchema={SignupSchema}
                onSubmit={async (values, actions) => {
                  // console.log(values), console.log(actions);
                  const { username, password } = values;
                  setSubmitting(true);
                  try {
                    const res = await axios.post('api/v1/signup', { username, password });
                    console.log(res.data);
                    logIn(res.data);
                    history.replace('/');
                    setSubmitting(false);
                    setSignUpFailed(false);
                  } catch (error) {
                    console.log(error);
                    if (error.isAxiosError && error.response.status === 409) {
                      rollbar.error('creating user error', error, { username, password });
                      setSubmitting(false);
                      setSignUpFailed(true);
                      userInput.current.select();
                    }
                  }
                }}
                initialValues={{
                  username: '',
                  password: '',
                  passwordConfirmation: '',
                }}
              >
                {({ errors, touched, handleChange, values, handleSubmit }) => {
                  // console.log(errors);
                  return (
                    <Form noValidate onSubmit={handleSubmit} className='w-100'>
                      <h1 className='text-center mb-4'>{t('signUp.title')}</h1>

                      <FloatingLabel
                        controlId='userName'
                        label={t('signUp.usernamePlaceholder')}
                        className='mb-3'
                      >
                        <Form.Control
                          type='text'
                          name='username'
                          placeholder={t('signUp.usernamePlaceholder')}
                          autoComplete='off'
                          isInvalid={isSignUpFailed || !!errors.username}
                          value={values.username}
                          onChange={handleChange}
                          ref={userInput}
                        />
                        <Form.Control.Feedback type='invalid' tooltip>
                          {isSignUpFailed ? t('errors.userExists') : errors.username}
                        </Form.Control.Feedback>
                      </FloatingLabel>
                      <FloatingLabel
                        controlId='password'
                        label={t('signUp.passwordPlaceholder')}
                        className='mb-3'
                      >
                        <Form.Control
                          type='password'
                          name='password'
                          placeholder={t('signUp.passwordPlaceholder')}
                          isInvalid={!!errors.password}
                          value={values.password}
                          onChange={handleChange}
                        />
                        <Form.Control.Feedback type='invalid' tooltip>
                          {errors.password}
                        </Form.Control.Feedback>
                      </FloatingLabel>
                      <FloatingLabel
                        controlId='passwordConfirmation'
                        label={t('signUp.passwordConfirmationPlaceholder')}
                        className='mb-3'
                      >
                        <Form.Control
                          type='password'
                          name='passwordConfirmation'
                          placeholder={t('signUp.passwordConfirmationPlaceholder')}
                          isInvalid={!!errors.passwordConfirmation}
                          value={values.passwordConfirmation}
                          onChange={handleChange}
                        />
                        <Form.Control.Feedback type='invalid' tooltip>
                          {errors.passwordConfirmation}
                        </Form.Control.Feedback>
                      </FloatingLabel>
                      <Button
                        variant='outline-primary'
                        type='submit'
                        className='w-100'
                        disabled={isSubmitting}
                      >
                        {t('signUp.submitButton')}
                      </Button>
                    </Form>
                  );
                }}
              </Formik>
            </Card.Body>
          </Card>
        </div>
      </div>
    </div>
  );
};

export default SignUpForm;

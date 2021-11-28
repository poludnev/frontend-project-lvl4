import React, {
  useContext, useState, useRef, useEffect,
} from 'react';
import { useHistory } from 'react-router-dom';
import { Formik } from 'formik';
import {
  Card,
  Form,
  // FloatingLabel,
  Button,
} from 'react-bootstrap';
import * as Yup from 'yup';
import axios from 'axios';
import { useTranslation } from 'react-i18next';
import UserContext from '../contexts/userContext.jsx';
import routes from '../routes';

const SignUpForm = () => {
  const { t } = useTranslation();
  const [isSubmitting, setSubmitting] = useState(false);
  const [isSignUpFailed, setSignUpFailed] = useState(false);
  const userInput = useRef();
  const { logIn } = useContext(UserContext);
  const history = useHistory();
  const signUpSchema = Yup.object().shape({
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
  useEffect(() => {
    userInput.current.focus();
    return () => setSubmitting(false);
  });

  return (
    <div className="container-fluid h-100">
      <div className="row justify-content-center align-content-center h-100">
        <div className="col-12 col-md-8 col-xxl-6">
          <Card className="shadow-sm">
            <Card.Body className="d-flex flex-column flex-md-row justify-content-around align-items-center p-5">
              <Formik
                validationSchema={signUpSchema}
                onSubmit={async (values) => {
                  const { username, password } = values;
                  setSubmitting(true);
                  try {
                    const response = await axios.post(routes.signUpPath(), { username, password });
                    logIn(response.data);
                    history.replace('/');
                  } catch (error) {
                    if (error.isAxiosError && error.response.status === 409) {
                      setSignUpFailed(true);
                      userInput.current.select();
                      return;
                    }
                    throw error;
                  }
                }}
                initialValues={{
                  username: '',
                  password: '',
                  passwordConfirmation: '',
                }}
              >
                {({
                  errors,
                  handleChange,
                  values,
                  handleSubmit,
                }) => (
                  <Form noValidate onSubmit={handleSubmit} className="w-100">
                    <h1 className="text-center mb-4">{t('signUp.title')}</h1>

                    {/* <FloatingLabel
                      controlId="userName"
                      label={t('signUp.usernameLabel')}
                      className="mb-3"
                    > */}
                    <Form.Group controlId="userName">
                      <Form.Label>{t('signUp.usernameLabel')}</Form.Label>

                    
                      <Form.Control
                        type="text"
                        name="username"
                        placeholder={t('signUp.usernameLabel')}
                        autoComplete="off"
                        isInvalid={isSignUpFailed || !!errors.username}
                        value={values.username}
                        onChange={handleChange}
                        ref={userInput}
                      />
                      
                      <Form.Control.Feedback type="invalid" tooltip>
                        {isSignUpFailed ? t('errors.userExists') : errors.username}
                      </Form.Control.Feedback>
                      </Form.Group>
                    {/* </FloatingLabel> */}
                    {/* <FloatingLabel
                      controlId="password"
                      label={t('signUp.passwordLabel')}
                      className="mb-3"
                    > */}
                    <Form.Group controlId="password">
                      <Form.Label>{t('signUp.passwordLabel')}</Form.Label>
                      <Form.Control
                        type="password"
                        name="password"
                        placeholder={t('signUp.passwordLabel')}
                        isInvalid={!!errors.password}
                        value={values.password}
                        onChange={handleChange}
                      />
                      <Form.Control.Feedback type="invalid" tooltip>
                        {errors.password}
                      </Form.Control.Feedback>
                      </Form.Group>
                    {/* </FloatingLabel> */}
                    {/* <FloatingLabel
                      controlId="passwordConfirmation"
                      label={t('signUp.passwordConfirmationLabel')}
                      className="mb-3"
                    > */}
                    <Form.Group controlId="passwordConfirmation">
                      <Form.Label>{t('signUp.passwordConfirmationLabel')}</Form.Label>
                      <Form.Control
                        type="password"
                        name="passwordConfirmation"
                        placeholder={t('signUp.passwordConfirmationLabel')}
                        isInvalid={!!errors.passwordConfirmation}
                        value={values.passwordConfirmation}
                        onChange={handleChange}
                      />
                      <Form.Control.Feedback type="invalid" tooltip>
                        {errors.passwordConfirmation}
                      </Form.Control.Feedback>
                      </Form.Group>
                    {/* </FloatingLabel> */}
                    <Button
                      variant="outline-primary"
                      type="submit"
                      className="w-100"
                      disabled={isSubmitting}
                    >
                      {t('signUp.submitButton')}
                    </Button>
                  </Form>
                )}
              </Formik>
            </Card.Body>
          </Card>
        </div>
      </div>
    </div>
  );
};

export default SignUpForm;

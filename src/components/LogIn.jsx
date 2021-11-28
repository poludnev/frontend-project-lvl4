import React, {
  useContext,
  useState,
  useRef,
  useEffect,
} from 'react';
import { useHistory, Link } from 'react-router-dom';
import { useTranslation } from 'react-i18next';
import {
  Card,
  Form,
  // FloatingLabel,
  Button,
} from 'react-bootstrap';
import { Formik } from 'formik';
import * as Yup from 'yup';
import axios from 'axios';
import UserContext from '../contexts/userContext.jsx';
import routes from '../routes';

const LogInForm = () => {
  const [isAuthFailed, setAuthFailed] = useState(false);
  const [isSubmitting, setSubmitting] = useState(false);
  const { logIn } = useContext(UserContext);
  const history = useHistory();

  const { t } = useTranslation();
  const userInputRef = useRef();

  const logInSchema = Yup.object().shape({
    username: Yup.string().required(t('errors.required')),
    password: Yup.string().required(t('errors.required')),
  });

  useEffect(() => {
    userInputRef.current.focus();
    return () => setSubmitting(false);
  });

  return (
    <div className="container-fluid h-100">
      <div className="row justify-content-center align-content-center h-100">
        <div className="col-12 col-md-8 col-xxl-6">
          <Card className="shadow-sm">
            <Card.Body className="d-flex flex-column justify-content-around align-items-center p-5">
              <h1>{t('logIn.title')}</h1>
              <Formik
                initialValues={{
                  username: '',
                  password: '',
                }}
                validationSchema={logInSchema}
                onSubmit={async (values) => {
                  const { username, password } = values;
                  setSubmitting(true);
                  try {
                    const response = await axios.post(routes.logInPath(), {
                      username,
                      password,
                    });
                    logIn(response.data);
                    history.replace('/');
                  } catch (error) {
                    if (error.isAxiosError && error.response.status === 401) {
                      setAuthFailed(true);
                      userInputRef.current.select();
                      return;
                    }
                    throw error;
                  }
                }}
              >
                {({
                  errors,
                  handleSubmit,
                  handleChange,
                  values,
                }) => (
                  <Form
                    noValidate
                    onSubmit={handleSubmit}
                    className="col-12 col-md-6 mt-3 mt-mb-0 w-100"
                  >
                    <Form.Group controlId="username">
                      <Form.Label className="mb-3">{t('logIn.usernameLabel')}</Form.Label>
                      <Form.Control
                        type="text"
                        name="username"
                        placeholder={t('logIn.usernameLabel')}
                        autoComplete="off"
                        isInvalid={isAuthFailed || !!errors.username}
                        value={values.username}
                        onChange={handleChange}
                        ref={userInputRef}
                      />
                    </Form.Group>
                    <Form.Group controlId="password">

                    
                    <Form.Label className="mb-3"
                    >{t('logIn.passwordLabel')}</Form.Label>
                      <Form.Control
                        type="password"
                        name="password"
                        placeholder={t('logIn.passwordLabel')}
                        autoComplete="off"
                        isInvalid={isAuthFailed || errors.password}
                        value={values.password}
                        onChange={handleChange}
                      />
                    </Form.Group>
                      <Form.Control.Feedback type="invalid" tooltip>
                        {isAuthFailed
                          ? t('logIn.signInFailure')
                          : errors.password}
                      </Form.Control.Feedback>
                    {/* </FloatingLabel> */}
                    <Button
                      variant="outline-primary"
                      type="submit"
                      className="w-100"
                      disabled={isSubmitting}
                    >
                      {t('logIn.submitButton')}
                    </Button>
                  </Form>
                )}
              </Formik>
            </Card.Body>
            <Card.Footer className="p-4">
              <div className="text-center">
                <span>{t('logIn.signUpTitle')}</span>
                &nbsp;
                <Link to="/signup">{t('logIn.signUpLink')}</Link>
              </div>
            </Card.Footer>
          </Card>
        </div>
      </div>
    </div>
  );
};

export default LogInForm;

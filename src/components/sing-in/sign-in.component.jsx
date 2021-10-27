import React from 'react';
import { useFormik } from 'formik';
import { Formik, Form, Field } from 'formik';
import * as Yup from 'yup';

const SignupSchema = Yup.object().shape({
  userAccount: Yup.string().min(2, 'Too Short!').max(50, 'Too Long!').required('Required'),
  password: Yup.string().min(6, 'Too Short!').max(50, 'Too Long!').required('Required'),
});

const SignInForm = () => {
  return (
    <div>
      <h1>Signup</h1>
      <Formik
        initialValues={{
          userAccount: '',
          lastName: '',
          password: '',
        }}
        validationSchema={SignupSchema}
        onSubmit={(values) => {
          console.log(values);
        }}
      >
        {({ errors, touched }) => (
          <Form>
            <Field name='userAccount' />
            {errors.userAccount && touched.userAccount ? <div>{errors.userAccount}</div> : null}
            <Field name='password' type='password' />
            {errors.password && touched.password ? <div>{errors.password}</div> : null}
            <button type='submit'>Submit</button>
          </Form>
        )}
      </Formik>
    </div>
  );
};

export default SignInForm;

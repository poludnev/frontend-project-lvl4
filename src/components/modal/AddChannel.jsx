import React, { useState, useEffect } from 'react';
import { Modal } from 'react-bootstrap';
import { Formik, Form, Field } from 'formik';

import * as Yup from 'yup';

const NewChannelSchema = Yup.object().shape({
  channelName: Yup.string().min(2, 'Short').max(20, 'Too Long!').required('Required'),
});

const AddChannelModal = () => {
  // const [isInvalid, setInvalid] = useState(false);

  const show = true;
  const handleClose = () => {};
  // useEffect(() => {
  //   inputRef.current.focus();
  // }, []);
  return (
    <>
      <Modal
        show={show}
        onHide={handleClose}
        aria-labelledby='contained-modal-title-vcenter'
        centered
      >
        {/* <div
          role='dialog'
          aria-modal='true'
          className='fade modal show'
          tabIndex='-1'
          style={{ display: 'block' }}
        > */}
        {/* <div className='modal-dialog modal-dialog-centered'> */}
        {/* <div className='modal-content'> */}
        <Modal.Header closeButton>
          {/* <div className='modal-header'> */}
          <Modal.Title>Добавить канал</Modal.Title>
        </Modal.Header>
        <Modal.Body>
          <Formik
            initialValues={{
              channelName: '',
            }}
            validationSchema={NewChannelSchema}
            onSubmit={async (values, actions) => {
              console.log('new channel add submitte');
              actions.resetForm({
                values: {
                  channelName: '',
                },
              });
            }}
          >
            {(props) => {
              console.log(props);
              const {
                dirty,
                errors,
                touched,
                values,
                isSubmitting,
                isValid,
                isValidating,
                status,
                submitCount,
              } = props;
              console.log(errors, 'dirty:', dirty, 'isValid', isValid, 'submitcount', submitCount);

              return (
                <Form>
                  <div className='form-group'>
                    <Field
                      name='channelName'
                      ref={inputRef}
                      placeholder='Введите название канала...'
                      className={`mb-2 form-control ${
                        submitCount > 0 && dirty ? 'is-invalid' : ''
                      }`}
                    />
                  </div>
                  <div
                    className='invalid-feedback'
                    style={submitCount > 0 && dirty ? { display: 'block' } : null}
                  >
                    {`От 3 до 20 символов`}
                  </div>

                  <div className='d-flex justify-content-end'>
                    <button type='button' onClick={handleClose} className='me-2 btn btn-secondary'>
                      Отменить
                    </button>
                    <button type='submit' className='btn btn-primary'>
                      Отправить
                    </button>
                  </div>
                </Form>
              );
            }}
          </Formik>
        </Modal.Body>
      </Modal>
      <div className='fade modal-backdrop show'></div>
    </>
  );
};

export default AddChannelModal;

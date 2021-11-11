import React, { useContext, useEffect, useRef, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { Modal, Form, Button } from 'react-bootstrap';
import { Formik } from 'formik';
import { useTranslation } from 'react-i18next';
import * as Yup from 'yup';
import { hideModal } from '../../slices/modalSlice';
import UserContext from '../../contexts/userContext';
import SocketContext from '../../contexts/socketContext';

const RenameChannelModal = () => {
  const { t } = useTranslation();
  // const { user, logIn, AuthHeader } = useContext(UserContext);
  const [isSubmitting, setSubmitting] = useState(false);
  const socket = useContext(SocketContext);
  const inputChannelRef = useRef();
  const isShown = useSelector((state) => state.modal.isShown);
  const { id } = useSelector((state) => state.modal.extra);
  const dispatch = useDispatch();

  const handleClose = () => dispatch(hideModal());
  const channelsNames = useSelector((state) => state.channels.channelsData.map((ch) => ch.name));
  const NewChannelNameSchema = Yup.object().shape({
    channelName: Yup.string()
      .required(t('errors.required'))
      .trim()
      .min(3, t('errors.tooShort'))
      .max(20, t('errors.tooLong'))
      .notOneOf(channelsNames, 'already exists'),
  });
  useEffect(() => {
    inputChannelRef.current.focus();
  });
  return (
    <Modal show={isShown} onHide={handleClose} centered>
      <Modal.Header closeButton>
        <Modal.Title>{t('modals.rename.title')}</Modal.Title>
      </Modal.Header>
      <Modal.Body>
        <Formik
          initialValues={{
            channelName: '',
          }}
          validationSchema={NewChannelNameSchema}
          onSubmit={async (values, actions) => {
            setSubmitting(true);

            socket.renameChannel({
              id,
              name: values.channelName,
            });

            setSubmitting(false);
            handleClose();
          }}
        >
          {(props) => {
            // console.log(props);
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
              handleSubmit,
              handleChange,
            } = props;
            // console.log(
            //   errors,
            //   'dirty:',
            //   dirty,
            //   'isValid',
            //   isValid,
            //   'submitcount',
            //   submitCount,
            //   errors,
            // );
            return (
              <Form noValidate onSubmit={handleSubmit}>
                <Form.Control
                  type='text'
                  name='channelName'
                  data-testid='rename-channel'
                  value={values.channelName}
                  onChange={handleChange}
                  disabled={isSubmitting}
                  isInvalid={submitCount > 0}
                  ref={inputChannelRef}
                />
                <Form.Control.Feedback type='invalid'>
                  {errors.channelName || t('errors.tooLong')}
                </Form.Control.Feedback>
                <div className='mt-3 d-flex justify-content-end'>
                  <Button
                    type='button'
                    disabled={isSubmitting}
                    onClick={handleClose}
                    variant='secondary'
                    className='me-2'
                  >
                    {t('modals.rename.cancelButton')}
                  </Button>
                  <Button type='submit' disabled={isSubmitting}>
                    {t('modals.rename.submitButton')}
                  </Button>
                </div>
              </Form>
            );
          }}
        </Formik>
      </Modal.Body>
    </Modal>
  );
};

export default RenameChannelModal;

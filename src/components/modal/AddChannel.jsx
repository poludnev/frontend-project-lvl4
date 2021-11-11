import React, {
  useContext, useEffect, useRef, useState,
} from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { Modal, Form, Button } from 'react-bootstrap';
import { Formik } from 'formik';
import { useTranslation } from 'react-i18next';
import * as Yup from 'yup';
import { hideModal } from '../../slices/modalSlice';
import UserContext from '../../contexts/userContext';
import SocketContext from '../../contexts/socketContext';

const AddChannelModal = () => {
  const { t } = useTranslation();
  const { user } = useContext(UserContext);
  const [isSubmitting, setSubmitting] = useState(false);
  const socket = useContext(SocketContext);
  const inputChannelRef = useRef();
  const isShown = useSelector((state) => state.modal.isShown);
  const dispatch = useDispatch();

  const handleClose = () => dispatch(hideModal());
  const channelsNames = useSelector((state) => state.channels.channelsData.map((ch) => ch.name));
  const NewChannelSchema = Yup.object().shape({
    channelName: Yup.string()
      .required(t('errors.required'))
      .trim()
      .min(3, t('errors.tooShort'))
      .max(20, t('errors.tooLong'))
      .notOneOf(channelsNames, t('errors.channelExists')),
  });
  useEffect(() => {
    inputChannelRef.current.focus();
  });
  return (
    <Modal show={isShown} onHide={handleClose} centered>
      <Modal.Header closeButton>
        <Modal.Title>{t('modals.add.title')}</Modal.Title>
      </Modal.Header>
      <Modal.Body>
        <Formik
          initialValues={{
            channelName: '',
          }}
          validationSchema={NewChannelSchema}
          onSubmit={async (values) => {
            setSubmitting(true);

            socket.createChannel({
              name: values.channelName,
              creator: user.username,
            });

            setSubmitting(false);
            handleClose();
          }}
        >
          {({
            errors, values, submitCount, handleChange, handleSubmit,
          }) => (
            <Form noValidate onSubmit={handleSubmit}>
              <Form.Control
                type="text"
                name="channelName"
                data-testid="add-channel"
                value={values.channelName}
                onChange={handleChange}
                disabled={isSubmitting}
                isInvalid={submitCount > 0}
                ref={inputChannelRef}
              />
              <Form.Control.Feedback type="invalid">
                {errors.channelName || t('errors.tooLong')}
              </Form.Control.Feedback>
              <div className="mt-3 d-flex justify-content-end">
                <Button
                  type="button"
                  disabled={isSubmitting}
                  onClick={handleClose}
                  variant="secondary"
                  className="me-2"
                >
                  {t('modals.add.cancelButton')}
                </Button>
                <Button type="submit" disabled={isSubmitting}>
                  {t('modals.add.submitButton')}
                </Button>
              </div>
            </Form>
          )}
        </Formik>
      </Modal.Body>
    </Modal>
  );
};

export default AddChannelModal;

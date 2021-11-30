import React, {
  useEffect, useRef, useState,
} from 'react';
import { toast } from 'react-toastify';
import { useSelector } from 'react-redux';
import { Modal, Form, Button } from 'react-bootstrap';
import { Formik } from 'formik';
import { useTranslation } from 'react-i18next';
import * as Yup from 'yup';
import { selectChannelsNames } from '../../slices/channelsSlice';
import { useApi, useAuth } from '../../hooks';

const AddChannelModal = ({ isShown, closeModal }) => {
  const { t } = useTranslation();
  const { user } = useAuth();
  const api = useApi();
  const [isSubmitting, setSubmitting] = useState(false);
  const channelsNames = useSelector(selectChannelsNames);
  
  const NewChannelSchema = Yup.object().shape({
    channelName: Yup.string()
      .required(t('errors.required'))
      .trim()
      .min(3, t('errors.tooShort'))
      .max(20, t('errors.tooLong'))
      .notOneOf(channelsNames, t('errors.channelExists')),
  });

  const inputRef = useRef();

  useEffect(() => {
    if (inputRef.current) inputRef.current.focus();
  }, []);

  return (
    <Modal show={isShown} onHide={closeModal} centered>
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
            api.createChannel({
              name: values.channelName,
              creator: user.username,
            });
            toast(t('modals.add.toast'));
            setSubmitting(false);
            closeModal();
          }}
        >
          {({
            errors, values, submitCount, handleChange, handleSubmit,
          }) => (
            <Form noValidate onSubmit={handleSubmit}>
              <Form.Control
                ref={inputRef}
                type="text"
                name="channelName"
                data-testid="add-channel"
                aria-label={t('modals.add.label')}
                placeholder={t('modals.add.label')}
                value={values.channelName}
                onChange={handleChange}
                disabled={isSubmitting}
                isInvalid={submitCount > 0}
              />
              <Form.Control.Feedback type="invalid">
                {errors.channelName || t('errors.tooLong')}
              </Form.Control.Feedback>
              <div className="mt-3 d-flex justify-content-end">
                <Button
                  type="button"
                  disabled={isSubmitting}
                  onClick={closeModal}
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

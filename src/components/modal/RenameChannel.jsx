import React, {
  useContext, useEffect, useRef, useState,
} from 'react';
import { useSelector } from 'react-redux';
import { Modal, Form, Button } from 'react-bootstrap';
import { Formik } from 'formik';
import { useTranslation } from 'react-i18next';
import * as Yup from 'yup';
import { toast } from 'react-toastify';
// import { hideModal } from '../../slices/modalSlice';
import { selectChannelsNames } from '../../slices/channelsSlice';
import SocketContext from '../../contexts/apiContext.jsx';

const RenameChannelModal = ({isShown, closeModal}) => {
  const { t } = useTranslation();
  const [isSubmitting, setSubmitting] = useState(false);
  const socket = useContext(SocketContext);
  const inputRef = useRef();
  // const isShown = useSelector((state) => state.modal.isShown);
  const { id } = useSelector((state) => state.modal.extra);
  // const dispatch = useDispatch();

  // const handleClose = () => dispatch(hideModal());
  const channelsNames = useSelector(selectChannelsNames);
  const NewChannelNameSchema = Yup.object().shape({
    channelName: Yup.string()
      .required(t('errors.required'))
      .trim()
      .min(3, t('errors.tooShort'))
      .max(20, t('errors.tooLong'))
      .notOneOf(channelsNames, t('errors.channelExists')),
  });
  useEffect(() => {
    if (inputRef.current) inputRef.current.focus();
  });
  return (
    <Modal show={isShown} onHide={closeModal} centered>
      <Modal.Header closeButton>
        <Modal.Title>{t('modals.rename.title')}</Modal.Title>
      </Modal.Header>
      <Modal.Body>
        <Formik
          initialValues={{
            channelName: '',
          }}
          validationSchema={NewChannelNameSchema}
          onSubmit={async (values) => {
            setSubmitting(true);

            socket.renameChannel({
              id,
              name: values.channelName,
            });

            setSubmitting(false);
            toast(t('modals.rename.toast'));
            closeModal();
          }}
        >
          {({
            errors, values, submitCount, handleSubmit, handleChange,
          }) => (
            <Form noValidate onSubmit={handleSubmit}>
              <Form.Control
                type="text"
                name="channelName"
                data-testid="rename-channel"
                aria-label={t('modals.rename.label')}
                placeholder={t('modals.rename.label')}
                value={values.channelName}
                onChange={handleChange}
                disabled={isSubmitting}
                isInvalid={submitCount > 0}
                ref={inputRef}
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
                  {t('modals.rename.cancelButton')}
                </Button>
                <Button type="submit" disabled={isSubmitting}>
                  {t('modals.rename.submitButton')}
                </Button>
              </div>
            </Form>
          )}
        </Formik>
      </Modal.Body>
    </Modal>
  );
};

export default RenameChannelModal;

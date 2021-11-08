// import React from 'react';

// const RemoveChannelModal = () => {
//   return <div>Remove Channel</div>;
// };

// export default RemoveChannelModal;
import React, { useContext, useEffect, useRef, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { Modal } from 'react-bootstrap';
import { Formik, Form, Field } from 'formik';
import { hideModal } from '../../slices/modalSlice';
import UserContext from '../../contexts/userContext';
import SocketContext from '../../contexts/socketContext';
import { useTranslation } from 'react-i18next';

import * as Yup from 'yup';

const RenameChannelModal = () => {
  const { t } = useTranslation();
  const [isValid, setValid] = useState(true);
  const { user, logIn, AuthHeader } = useContext(UserContext);
  const socket = useContext(SocketContext);
  const inputRef = useRef();
  useEffect(() => {
    inputRef.current.focus();
  }, []);
  const isShown = useSelector((state) => state.modal.isShown);
  const { id } = useSelector((state) => state.modal.extra);
  const dispatch = useDispatch();

  const handleClose = () => dispatch(hideModal());
  // const channelsNames = useSelector((state) => state.channels.channels.map((ch) => ch.name));
  const channelsNames = useSelector((state) => state.channels.channelsData.map((ch) => ch.name));
  const NewChannelSchema = Yup.object().shape({
    channelName: Yup.string()
      .required(t('errors.required'))
      .min(3, t('errors.tooShort'))
      .max(20, t('errors.tooLong'))

      .notOneOf(channelsNames, 'already exists'),
  });
  return (
    <Modal
      show={isShown}
      onHide={handleClose}
      aria-labelledby='contained-modal-title-vcenter'
      centered
    >
      <Modal.Header closeButton>
        <Modal.Title>{t('modals.rename.title')}</Modal.Title>
      </Modal.Header>
      <Modal.Body>
        <Formik
          initialValues={{
            channelName: '',
          }}
          validationSchema={NewChannelSchema}
          onSubmit={async (values, actions) => {
            // console.log('new channel add submitte');

            actions.resetForm({
              values: {
                channelName: '',
              },
            });
            await socket.renameChannel({
              id,
              name: values.channelName,
            });
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
              <Form>
                <div className='form-group'>
                  <Field
                    name='channelName'
                    placeholder={t('modals.rename.inputPlaceholder')}
                    innerRef={inputRef}
                    className={`mb-2 form-control ${submitCount > 0 && dirty ? 'is-invalid' : ''}`}
                  />
                </div>
                <div
                  className='invalid-feedback'
                  style={submitCount > 0 && (dirty || !isValid) ? { display: 'block' } : null}
                >
                  {errors.channelName ? `${errors.channelName}` : 'От 3 до 20 символов'}
                </div>
                <div className='d-flex justify-content-end'>
                  <button type='button' onClick={handleClose} className='me-2 btn btn-secondary'>
                    {t('modals.rename.cancelButton')}
                  </button>
                  <button type='submit' className='btn btn-primary'>
                    {t('modals.rename.submitButton')}
                  </button>
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

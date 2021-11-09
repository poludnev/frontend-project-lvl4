import React, { useContext, useEffect, useRef, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import Modal from 'react-bootstrap/Modal';
import { Formik, Form, Field } from 'formik';
import { hideModal } from '../../slices/modalSlice';
import { useTranslation } from 'react-i18next';
import UserContext from '../../contexts/userContext';
import SocketContext from '../../contexts/socketContext';

import * as Yup from 'yup';

const AddChannelTest = () => {
  const { t } = useTranslation();
  const [isValid, setValid] = useState(true);
  const { user, logIn, AuthHeader } = useContext(UserContext);
  const socket = useContext(SocketContext);
  const inputRef = useRef();
  // Modal.setAppElement('#root');
  console.log(Modal);
  useEffect(() => {
    // inputRef.current.focus();
  }, []);
  const isShown = useSelector((state) => state.modal.isShown);
  const dispatch = useDispatch();

  const handleClose = () => dispatch(hideModal());
  // const channelsNames = useSelector((state) => state.channels.channels.map((ch) => ch.name));
  const channelsNames = useSelector((state) => state.channels.channelsData.map((ch) => ch.name));
  const NewChannelSchema = Yup.object().shape({
    channelName: Yup.string()
      .required(t('errors.required'))
      .min(3, t('errors.tooShort'))
      .max(20, t('errors.tooLong'))
      .notOneOf(channelsNames, t('errors.channelExists')),
  });
  return (
    <Modal
      show={isShown}
      onHide={handleClose}
      aria-hidden='true'
      // aria-labelledby='contained-modal-title-vcenter'
      centered
    >
      <Modal.Header closeButton>
        <Modal.Title>{t('modals.add.title')}</Modal.Title>
      </Modal.Header>
      <Modal.Body>
        {/* <Formik
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
            await socket.createChannel({
              name: values.channelName,
              creator: user.username,
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
                    placeholder={t('modals.add.inputPlaceholder')}
                    innerRef={inputRef}
                    className={`mb-2 form-control ${submitCount > 0 && dirty ? 'is-invalid' : ''}`}
                    data-testid='add-channel'
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
                    {t('modals.add.cancelButton')}
                  </button>
                  <button type='submit' className='btn btn-primary'>
                    {t('modals.add.submitButton')}
                  </button>
                </div>
              </Form>
            );
          }}
        </Formik> */}
      </Modal.Body>
    </Modal>
  );
};

export default AddChannelTest;

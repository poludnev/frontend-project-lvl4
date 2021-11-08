// import React from 'react';

// const RemoveChannelModal = () => {
//   return <div>Remove Channel</div>;
// };

// export default RemoveChannelModal;
import React, { useContext, useEffect, useRef, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { Modal, Button } from 'react-bootstrap';
// import { Formik, Form, Field } from 'formik';
import { hideModal } from '../../slices/modalSlice';
import UserContext from '../../contexts/userContext';
import SocketContext from '../../contexts/socketContext';
import { removeChannel } from '../../slices/channelsSlice';

import * as Yup from 'yup';

const RemoveChannelModal = () => {
  const [isValid, setValid] = useState(true);
  const { user, logIn, AuthHeader } = useContext(UserContext);
  const socket = useContext(SocketContext);
  const inputRef = useRef();
  // useEffect(() => {
  //   inputRef.current.focus();
  // }, []);
  const isShown = useSelector((state) => state.modal.isShown);
  const { id } = useSelector((state) => state.modal.extra);
  console.log('id', id);
  const dispatch = useDispatch();

  const [isSubmitting, setSubmitting] = useState(false);

  const handleClose = () => dispatch(hideModal());
  // const channelsNames = useSelector((state) => state.channels.channels.map((ch) => ch.name));
  // const channelsNames = useSelector((state) => state.channels.channelsData.map((ch) => ch.name));
  const removeChannelHandler = async () => {
    setSubmitting(true);

    console.log('remove channel');
    await socket.removeChannel({ id });
    setSubmitting(false);
    handleClose();
  };

  return (
    <Modal
      show={isShown}
      onHide={handleClose}
      aria-labelledby='contained-modal-title-vcenter'
      centered
    >
      <Modal.Header closeButton>
        <Modal.Title>{'Удалить канал'}</Modal.Title>
      </Modal.Header>
      <Modal.Body>
        {'Are you sure?'}
        <div className='d-flex justify-content-end'>
          <Button variant='secondary' onClick={handleClose} className={'me-2'}>
            {'Отменить'}
          </Button>
          <Button variant='danger' disabled={isSubmitting} onClick={removeChannelHandler}>
            {'Удалить'}
          </Button>
        </div>
      </Modal.Body>
    </Modal>
  );
};

export default RemoveChannelModal;

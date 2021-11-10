import React, { useContext, useState, useEffect, useRef } from 'react';

import { useSelector, useDispatch } from 'react-redux';

import { Formik } from 'formik';
import { Form, Button, InputGroup } from 'react-bootstrap';
// import { io } from 'socket.io-client';
import UserContext from '../../contexts/userContext';
import SocketContext from '../../contexts/socketContext';
// import { upLoadMessages, addMessage } from '../../slices/messagesSlice';
// import store from '../../store.js';
import { useTranslation } from 'react-i18next';
import * as Yup from 'yup';

const MessageSchema = Yup.object().shape({
  message: Yup.string().required('Required'),
});

const Messages = () => {
  const { t } = useTranslation();
  const inputRef = useRef();
  // const dispatch = useDispatch();
  const { user, logIn, AuthHeader } = useContext(UserContext);
  const socket = useContext(SocketContext);
  const [isSubmitting, setSubmitting] = useState(false);
  const messagesData = useSelector((state) => state.messages.messagesData);
  // console.log('messages data in messages', messagesData);
  const { currentChannelID, channelsData } = useSelector((state) => state.channels);
  // console.log('channels data in messages:', currentChannelID, channelsData);

  // const storeInstance = store();

  const currentChannelData = channelsData.find(({ id }) => id === currentChannelID);
  const currentChannelName = currentChannelData ? currentChannelData.name : null;

  // console.log('messages Data in Messages', messagesData, channelsData, currentChannelName);

  const messagesByCurrentChannel = messagesData.filter(
    ({ channelID }) => channelID === currentChannelID,
  );

  // const formikInput = useRef();

  useEffect(() => {
    inputRef.current.focus();
  });

  const renderMessage = ({ id, username, text }) => {
    // console.log('render message ran');
    return (
      <div key={id} className='text-break mb-2'>
        <b>{username}</b>&nbsp;:&nbsp;{text}
      </div>
    );
  };

  // const [isSubmitting, setSubmitting] = useState(false);
  // console.log('rendering messages');
  // console.log('current channel', currentChannelName);
  // console.log('messagesByCurrentChannel', messagesByCurrentChannel);
  // console.log('messagesData', messagesData);

  return (
    <div className='col p-0 h-100'>
      {/* {console.log('MESSAGES RENDERED')} */}
      <div className='d-flex flex-column h-100'>
        <div className='bg-light mb-4 p-3 shadow-sm small'>
          <p className='m-0'># {currentChannelName}</p>
          <span className='text-muted'>
            {/* {messagesByCurrentChannel.length}{' '} */}
            {t('messages.counter.count', { count: messagesByCurrentChannel.length })}
          </span>
        </div>
        <div id='messages-box' className='chat-messages overflow-auto px-5'>
          {messagesByCurrentChannel.map(renderMessage)}
        </div>
        <div className='mt-auto px-5 py-3'>
          <Formik
            initialValues={{
              message: '',
            }}
            validationSchema={MessageSchema}
            onSubmit={async (values, actions) => {
              // console.log(
              //   '+++++++++++++++++++++++++++++++++++++++++++++++++++++message from submitted with values:',
              //   values,
              // );
              setSubmitting(true);
              // console.log('socket in submit', socket);
              await socket.sendMessage({
                username: user.username,
                text: values.message,
                channelID: currentChannelID,
              });
              // console.log('actions', actions);
              actions.resetForm({
                values: {
                  message: '',
                },
              });

              setSubmitting(false);
            }}
          >
            {({ errors, touched, handleSubmit, values, handleChange }) => {
              // console.log('values in message', values);
              // console.log(isSubmitting, errors, touched);
              // console.log(isSubmitting || errors.message || !touched.message);
              return (
                <Form noValidate onSubmit={handleSubmit} className='py-1 border rounded-2'>
                  {/* <div className='input-group has-validation'> */}
                  <InputGroup>
                    <Form.Control
                      className='border-0 p-0 ps-2'
                      type='text'
                      name='message'
                      placeholder={t('messages.mesagePlaceHolder')}
                      ref={inputRef}
                      data-testid='new-message'
                      value={values.message}
                      onChange={handleChange}
                      isInvalid={!!errors.message}
                    />

                    {/* <div className='input-group-append'> */}
                    <Button
                      variant='light'
                      className='btn-group-vertical'
                      disabled={isSubmitting}
                      type='submit'
                      onClick={() => console.log('message button clicked')}
                      // aria-hidden={isShown}
                    >
                      <svg
                        xmlns='http://www.w3.org/2000/svg'
                        viewBox='0 0 16 16'
                        width='20'
                        height='20'
                        fill='currentColor'
                      >
                        <path
                          fillRule='evenodd'
                          d='M15 2a1 1 0 0 0-1-1H2a1 1 0 0 0-1 1v12a1 1 0 0 0 1 1h12a1 1 0 0 0 1-1V2zM0 2a2 2 0 0 1 2-2h12a2 2 0 0 1 2 2v12a2 2 0 0 1-2 2H2a2 2 0 0 1-2-2V2zm4.5 5.5a.5.5 0 0 0 0 1h5.793l-2.147 2.146a.5.5 0 0 0 .708.708l3-3a.5.5 0 0 0 0-.708l-3-3a.5.5 0 1 0-.708.708L10.293 7.5H4.5z'
                        ></path>
                      </svg>
                      <span className='visually-hidden'>{t('messages.submitButtonLabel')}</span>
                    </Button>
                  </InputGroup>
                  {/* </div> */}
                  {/* </div> */}
                </Form>
              );
            }}
          </Formik>
        </div>
      </div>
    </div>
  );
};

export default Messages;

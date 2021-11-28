import React, {
  useState, useEffect, useRef,
} from 'react';
import { useSelector } from 'react-redux';
import { Formik } from 'formik';
import { Form, Button, InputGroup } from 'react-bootstrap';
import { useTranslation } from 'react-i18next';
import chatCensor from 'leo-profanity';
import * as Yup from 'yup';
import * as Scroll from 'react-scroll';
import { useApi, useAuth } from '../../hooks';

const Messages = () => {
  const { t } = useTranslation();

  const inputRef = useRef();
  const { user } = useAuth();
  const api = useApi();
  const [isSubmitting, setSubmitting] = useState(false);

  const messagesData = useSelector((state) => state.messages.messagesData);
  const { currentChannelID, channelsData } = useSelector((state) => state.channels);

  const currentChannelData = channelsData.find(({ id }) => id === currentChannelID);
  const currentChannelName = currentChannelData ? currentChannelData.name : null;
  const messagesByCurrentChannel = messagesData.filter(
    ({ channelID }) => channelID === currentChannelID,
  );

  const messageValidationSchema = Yup.object().shape({
    message: Yup.string().trim().required('Required'),
  });

  useEffect(() => {
    inputRef.current.focus();
  }, [currentChannelID]);

  useEffect(() => {
    const scroll = Scroll.animateScroll;
    scroll.scrollToBottom({
      containerId: 'messages-box',
      duration: 200,
    });
  }, [currentChannelID, messagesData]);

  const renderMessage = ({ id, username, text }) => (
    <div key={id} className="text-break mb-2">
      <b>
        {username}
      </b>
      &nbsp;:&nbsp;
      {chatCensor.clean(text)}
    </div>
  );

  return (
    <div className="col p-0 h-100">
      <div className="d-flex flex-column h-100">
        <div className="bg-light mb-4 p-3 shadow-sm small">
          <p className="m-0">
            #
            {currentChannelName}
          </p>
          <span className="text-muted">
            {t('messages.counter.count', { count: messagesByCurrentChannel.length })}
          </span>
        </div>
        <div id="messages-box" className="chat-messages overflow-auto px-5">
          {messagesByCurrentChannel.map(renderMessage)}
        </div>
        <div className="mt-auto px-5 py-3">
          <Formik
            initialValues={{
              message: '',
            }}
            validationSchema={messageValidationSchema}
            onSubmit={async (values, actions) => {
              setSubmitting(true);
              await api.sendMessage({
                username: user.username,
                text: values.message,
                channelID: currentChannelID,
              });
              actions.resetForm({
                values: {
                  message: '',
                },
              });
              setSubmitting(false);
            }}
          >
            {({
              errors, handleSubmit, values, handleChange,
            }) => (
              <Form noValidate onSubmit={handleSubmit} className="py-1 border rounded-2">
                <InputGroup>
                  <Form.Control
                    className="border-0 p-0 ps-2"
                    type="text"
                    name="message"
                    placeholder={t('messages.messagePlaceHolder')}
                    ref={inputRef}
                    data-testid="new-message"
                    aria-label="Новое сообщение"
                    value={values.message}
                    onChange={handleChange}
                    isInvalid={!!errors.message}
                  />
                  <Button
                    variant="outline-secondary"
                    className="btn-group-vertical border-0"
                    disabled={values.message === '' || isSubmitting || errors.message}
                    type="submit"
                    aria-hidden={false}
                  >
                    <svg
                      xmlns="http://www.w3.org/2000/svg"
                      viewBox="0 0 16 16"
                      width="20"
                      height="20"
                      fill="currentColor"
                    >
                      <path
                        fillRule="evenodd"
                        d="M15 2a1 1 0 0 0-1-1H2a1 1 0 0 0-1 1v12a1 1 0 0 0 1 1h12a1 1 0 0 0 1-1V2zM0 2a2 2 0 0 1 2-2h12a2 2 0 0 1 2 2v12a2 2 0 0 1-2 2H2a2 2 0 0 1-2-2V2zm4.5 5.5a.5.5 0 0 0 0 1h5.793l-2.147 2.146a.5.5 0 0 0 .708.708l3-3a.5.5 0 0 0 0-.708l-3-3a.5.5 0 1 0-.708.708L10.293 7.5H4.5z"
                      />
                    </svg>
                    <span className="visually-hidden">{t('messages.submitButtonLabel')}</span>
                  </Button>
                </InputGroup>
              </Form>
            )}
          </Formik>
        </div>
      </div>
    </div>
  );
};

export default Messages;

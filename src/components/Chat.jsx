import React, { useState, useEffect } from 'react';
import Spinner from 'react-bootstrap/Spinner';
import { useDispatch } from 'react-redux';
import { toast } from 'react-toastify';
import { useTranslation } from 'react-i18next';
import axios from 'axios';
import routes from '../routes';

import { useAuth } from '../hooks';
import { upLoadChannels } from '../slices/channelsSlice';
import { upLoadMessages } from '../slices/messagesSlice';
import Channels from './chat/Channels.jsx';
import Messages from './chat/Messages.jsx';

const Chat = () => {
  const { logOut, AuthHeader } = useAuth();
  const [isLoading, setLoading] = useState(true);
  const dispatch = useDispatch();
  const { t } = useTranslation();

  const fetchContent = async () => {
    try {
      const header = AuthHeader();
      const { data } = await axios.get(routes.chatDataPath(), {
        headers: { ...header },
      });
      dispatch(upLoadChannels(data.channels));
      dispatch(upLoadMessages(data.messages));
      setLoading(false);
    } catch (error) {
      if (error.isAxiosError && error.response.status === 401) {
        logOut();
        return;
      }
      toast(t('errors.networkError'));
      console.error(error);
    }
  };

  useEffect(() => {
    fetchContent();
    return () => setLoading(false);
  });

  return (
    <>
      {isLoading ? (
        <div className="row justify-content-center align-content-center h-100">
          <Spinner animation="grow">
            <span className="visually-hidden">{t('spinner')}</span>
          </Spinner>
        </div>
      ) : (
        <div className="container h-100 my-4 overflow-hidden rounded shadow">
          <div className="row h-100 bg-white flex-md-row">
            <Channels />
              <Messages />
          </div>
        </div>
      )}
    </>
  );
};

export default Chat;

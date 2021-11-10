import React, { useContext, useState, useEffect } from 'react';
import Spinner from 'react-bootstrap/Spinner';
import UserContext from '../contexts/userContext';
import { useDispatch } from 'react-redux';
import { useTranslation } from 'react-i18next';
import axios from 'axios';

import { upLoadChannels } from '../slices/channelsSlice';
import { upLoadMessages } from '../slices/messagesSlice';
import Channels from './chat/Channels';
import Messages from './chat/Messages';

const Chat = () => {
  const { logOut, AuthHeader } = useContext(UserContext);
  const [isLoading, setLoading] = useState(true);

  const dispatch = useDispatch();
  const { t } = useTranslation();

  useEffect(() => {
    const fetchContent = async () => {
      try {
        const header = AuthHeader();
        const { data } = await axios.get('/api/v1/data', { headers: { ...header } });
        dispatch(upLoadChannels(data.channels));
        dispatch(upLoadMessages(data.messages));
        setLoading(false);
      } catch (error) {
        if (error.isAxiosError && error.response.status === 401) {
          logOut();
          return;
        }
        throw error;
      }
    };
    fetchContent();
    return () => setLoading(false);
  });

  return (
    <>
      {isLoading ? (
        <div className='row justify-content-center align-content-center h-100'>
          <Spinner animation='grow'>
            <span className='visually-hidden'>{t('spinner')}</span>
          </Spinner>
        </div>
      ) : (
        <div className='container h-100 my-4 overflow-hidden rounded shadow'>
          <div className='row h-100 bg-white flex-md-row'>
            <Channels />
            <Messages />
          </div>
        </div>
      )}
    </>
  );
};

export default Chat;

import React, { useContext, useState, useEffect } from 'react';
import Spinner from 'react-bootstrap/Spinner';
// import { useDispatch } from 'react-redux';
import { useSelector, useDispatch } from 'react-redux';
import { ToastContainer, toast } from 'react-toastify';
import { useTranslation } from 'react-i18next';
import axios from 'axios';
import UserContext from '../contexts/userContext.jsx';
import routes from '../routes';

import { upLoadChannels } from '../slices/channelsSlice';
import { upLoadMessages } from '../slices/messagesSlice';
import Channels from './chat/Channels.jsx';
import Messages from './chat/Messages.jsx';

const Chat = () => {
  const { logOut, AuthHeader } = useContext(UserContext);
  const [isLoading, setLoading] = useState(true);
  const { isShown, type } = useSelector((state) => state.modal);
  const dispatch = useDispatch();
  const { t } = useTranslation();

  const fetchContent = async () => {
    console.log('fetch content start');
    console.log('moadal state before fetch, isShown:', isShown, type);
    try {
      const header = AuthHeader();
      const { data } = await axios.get(routes.chatDataPath(), {
        headers: { ...header },
      });
      console.log('moadal state after fetch, isShown:', isShown, type);
      console.log('fetch finished, result:', data);
      dispatch(upLoadChannels(data.channels));
      dispatch(upLoadMessages(data.messages));
      setLoading(false);
    } catch (error) {
      if (error.isAxiosError && error.response.status === 401) {
        logOut();
        return;
      }
      if (error.isAxiosError && error.response.status === 500) {
        toast('Ошибка соединения');
        console.error(error);
      }
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

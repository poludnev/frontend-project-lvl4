import React, { useContext, useState, useEffect } from 'react';
import Spinner from 'react-bootstrap/Spinner';
import { useDispatch } from 'react-redux';
import { useTranslation } from 'react-i18next';
import axios from 'axios';
import UserContext from '../contexts/userContext.jsx';
import routes from '../routes';

import SocketContext from '../contexts/apiContext.jsx';


import { upLoadChannels } from '../slices/channelsSlice';
import { upLoadMessages } from '../slices/messagesSlice';
import Channels from './chat/Channels.jsx';
import Messages from './chat/Messages.jsx';
import { async } from 'regenerator-runtime';




const Chat = () => {
  const { logOut, AuthHeader } = useContext(UserContext);
  const [isLoading, setLoading] = useState(true);

  const socket = useContext(SocketContext);


  const dispatch = useDispatch();
  const { t } = useTranslation();

  const fetchContent = async () => {
    console.log('fetch content');
    try {
      const header = AuthHeader();
      const { data } = await axios.get(routes.chatDataPath(), {
        headers: { ...header },
      });
      console.log('fetch result', data);
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

  socket.socket.on('newChannel', async (channel) => {
    console.log('new channel socket2');
    const header = AuthHeader();
    const { data } = await axios.get(routes.chatDataPath(), {
        headers: { ...header },
      });
      console.log('fetch result on socket newChannel', data);


    // store.dispatch(addChannel(channel));
  });





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

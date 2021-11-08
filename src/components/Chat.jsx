import React, { useContext, useState, useEffect } from 'react';
import UserContext from '../contexts/userContext';
import { useSelector, useDispatch } from 'react-redux';
import { upLoadChannels, setCurrentChannel } from '../slices/channelsSlice';
import { upLoadMessages } from '../slices/messagesSlice';
import { useHistory } from 'react-router-dom';
import { Formik, Form, Field } from 'formik';
import { io } from 'socket.io-client';
import Channels from './chat/Channels';
import Messages from './chat/Messages';

import axios from 'axios';

const Chat = () => {
  // console.log('HOMEPAGEE INITIALISED');
  const { user, logIn, AuthHeader } = useContext(UserContext);
  const [isLoading, setLoading] = useState(true);

  const history = useHistory();
  const dispatch = useDispatch();
  // const header = AuthHeader();

  useEffect(() => {
    const fetchContent = async () => {
      // console.log('fetch content started');
      //     // console.log('!!!!!headers:', header);
      try {
        //       // console.log('!!!!!headers:', header);
        const header = AuthHeader();
        const { data } = await axios.get('/api/v1/data', { headers: { ...header } });
        console.log('data from requesst', data);
        dispatch(upLoadChannels(data.channels));
        dispatch(upLoadMessages(data.messages));
        setLoading(false);

        // console.log('set loading', setLoading(false));
      } catch (e) {
        console.error('Error in fetch content', e);
      }
    };
    fetchContent();
    return () => {
      setLoading(false);
    };
  });

  return (
    <div className='container h-100 my-4 overflow-hidden rounded shadow'>
      {/* {console.log('HOMEPAGEE RENDERED')} */}
      {isLoading ? (
        <div>{'Page is loading...'}</div>
      ) : (
        <div className='row h-100 bg-white flex-md-row'>
          <Channels />
          <Messages />
        </div>
      )}
    </div>
  );
};

export default Chat;

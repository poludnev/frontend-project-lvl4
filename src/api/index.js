import { addMessage } from '../slices/messagesSlice.js';
import {
  addChannel, deleteChannel, changeNameChannel, setCurrentChannel,
} from '../slices/channelsSlice.js';

const createApi = (socket, store) => {
  socket.on('newMessage', (msg) => {
    store.dispatch(addMessage(msg));
  });

  socket.on('newChannel', (channel) => {
    store.dispatch(addChannel(channel));
    store.dispatch(setCurrentChannel(channel.id));
  });
  socket.on('removeChannel', ({ id }) => {
    store.dispatch(deleteChannel(id));
  });
  socket.on('renameChannel', (channel) => {
    store.dispatch(changeNameChannel(channel));
  });

  const sendMessage = (msg) => {
    socket.emit('newMessage', msg, (response) => {
      if (response.status !== 'ok') console.error('socket error, response: ', response);
    });
  };

  const createChannel = (channel) => {
    socket.emit('newChannel', channel, (response) => {
      console.log('create channel response', response);
      if (response.status !== 'ok') console.error('socket error, response: ', response);
    });
  };

  const removeChannel = (channel) => {
    socket.emit('removeChannel', channel, (response) => {
      if (response.status !== 'ok') console.error('socket error, response: ', response);
    });
  };

  const renameChannel = (channel) => {
    socket.emit('renameChannel', channel, (response) => {
      if (response.status !== 'ok') console.error('socket error, response: ', response);
    });
  };

  return {
    sendMessage,
    createChannel,
    removeChannel,
    renameChannel,
  };
};

export default createApi;

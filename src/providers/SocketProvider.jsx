import React from 'react';

import SocketContext from '../contexts/socketContext';

const SocketProvider = ({ socket, children }) => {
  const sendMessage = (msg) => {
    socket.emit('newMessage', msg, (response) => {
      if (response.status !== 'ok') console.error('socket error, response: ', response);
    });
  };

  const createChannel = (channel) => {
    socket.emit('newChannel', channel, (response) => {
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
  return (
    <SocketContext.Provider
      value={{
        sendMessage,
        createChannel,
        removeChannel,
        renameChannel,
      }}
    >
      {children}
    </SocketContext.Provider>
  );
};

export default SocketProvider;

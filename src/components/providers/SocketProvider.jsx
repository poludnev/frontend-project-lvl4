import React from 'react';

import SocketContext from '../../contexts/socketContext';

const SocketProvider = ({ sendMessage, createChannel, removeChannel, renameChannel, children }) => {
  return (
    <SocketContext.Provider
      value={{
        sendMessage,
        // createChannel,
        // removeChannel,
        // renameChannel,
      }}
    >
      {children}
    </SocketContext.Provider>
  );
};

export default SocketProvider;

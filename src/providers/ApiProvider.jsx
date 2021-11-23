// import React from 'react';

// import ApiContext from '../contexts/apiContext.jsx';

// const SocketProvider = ({ socket, children }) => {
//   const sendMessage = (msg) => {
//     socket.emit('newMessage', msg, (response) => {
//       if (response.status !== 'ok') console.error('socket error, response: ', response);
//     });
//   };

//   const createChannel = (channel) => {
//     socket.emit('newChannel', channel, (response) => {
//       console.log('create channel response', response);
//       if (response.status !== 'ok') console.error('socket error, response: ', response);
//     });
//   };

//   const removeChannel = (channel) => {
//     socket.emit('removeChannel', channel, (response) => {
//       if (response.status !== 'ok') console.error('socket error, response: ', response);
//     });
//   };

//   const renameChannel = (channel) => {
//     socket.emit('renameChannel', channel, (response) => {
//       if (response.status !== 'ok') console.error('socket error, response: ', response);
//     });
//   };
//   return (
//     <ApiContext.Provider
//       value={{
//         sendMessage,
//         createChannel,
//         removeChannel,
//         renameChannel,
//       }}
//     >
//       {children}
//     </ApiContext.Provider>
//   );
// };

// export default SocketProvider;

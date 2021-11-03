import { configureStore } from '@reduxjs/toolkit';
import channelsSlicer from './slices/channelsSlice.js';
import messagesSlicer from './slices/messagesSlice.js';

export default configureStore({
  reducer: {
    messages: messagesSlicer,
    channels: channelsSlicer,
  },
});

// export default () =>
//   configureStore({
//     reducer: {
//       messages: messagesSlicer,
//       channels: channelsSlicer,
//       // modal: modalReducer,
//     },
//   });

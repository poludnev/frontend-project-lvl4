import { configureStore } from '@reduxjs/toolkit';

import channelsSlicer from './slices/channelsSlice.js';
import messagesSlicer from './slices/messagesSlice.js';
import modalSlicer from './slices/modalSlice.js';

export default configureStore({
  reducer: {
    messages: messagesSlicer,
    channels: channelsSlicer,
    modal: modalSlicer,
  },
});

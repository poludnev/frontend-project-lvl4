import _ from 'lodash';
import { createSlice } from '@reduxjs/toolkit';
import { deleteChannel } from './channelsSlice.js';

const initialState = {
  messagesData: [],
};

export const messagesSlice = createSlice({
  name: 'messages',
  initialState,
  reducers: {
    upLoadMessages: (state, action) => {
      // console.log('upLoadMes', action.payload);
      state.messagesData = [...action.payload];
      _.set(state, 'messagesData', action.payload);
    },
    addMessage: (state, action) => {
      state.messagesData.push(action.payload);
    },
  },
  extraReducers: (builder) => {
    builder.addCase(deleteChannel, (state, action) => {
      const filteredMessages = state.messagesData.filter(
        (message) => message.channelID !== action.payload,
      );
      _.set(state, 'messagesData', filteredMessages);
    });
  },
});

export const { upLoadMessages, addMessage } = messagesSlice.actions;

export default messagesSlice.reducer;

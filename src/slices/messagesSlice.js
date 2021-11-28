import _ from 'lodash';
import { createSlice, createSelector } from '@reduxjs/toolkit';
import { deleteChannel, selectCurrentChannelId } from './channelsSlice.js';

const initialState = {
  messagesData: [],
};

export const messagesSlice = createSlice({
  name: 'messages',
  initialState,
  reducers: {
    upLoadMessages: (state, action) => {
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

export const selectCurrentChannelMessages = createSelector(
  (state) => state.messages.messagesData,
  selectCurrentChannelId,
  (messages, currentChannelID) => messages.filter(
    ({ channelID }) => channelID === currentChannelID),
);

export default messagesSlice.reducer;

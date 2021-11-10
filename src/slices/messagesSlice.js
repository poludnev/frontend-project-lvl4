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
    },
    addMessage: (state, action) => {
      state.messagesData.push(action.payload);
    },
  },
  extraReducers: (builder) => {
    builder.addCase(deleteChannel, (state, action) => {
      state.messagesData = state.messagesData.filter(
        (message) => message.channelID !== action.payload,
      );
    });
  },
});


export const { upLoadMessages, addMessage } = messagesSlice.actions;

export default messagesSlice.reducer;

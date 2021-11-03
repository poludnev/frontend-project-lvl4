import { createSlice } from '@reduxjs/toolkit';

const initialState = {
  messagesData: [  ],
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
});

export const { upLoadMessages, addMessage } = messagesSlice.actions;

export default messagesSlice.reducer;

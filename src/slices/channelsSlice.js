import _ from 'lodash';
import { createSlice } from '@reduxjs/toolkit';
import { ToastContainer, toast } from 'react-toastify';

const initialState = {
  channelsData: [],
  currentChannelID: 1,
};

export const channelsSlice = createSlice({
  name: 'channels',
  initialState,
  reducers: {
    upLoadChannels: (state, action) => {
      _.set(state, 'channelsData', action.payload);
    },
    setCurrentChannel: (state, action) => {
      _.set(state, 'currentChannelID', action.payload);
    },
    addChannel: (state, action) => {
      console.log('add channel slice');
      toast('Канал создан');
      state.channelsData.push(action.payload);
      _.set(state, 'currentChannelID', action.payload);
    },
    deleteChannel: (state, action) => {
      if (action.payload === state.currentChannelID) {
        _.set(state, 'currentChannelID', initialState.currentChannelID);
      }
      const filteredChannels = state.channelsData.filter((ch) => ch.id !== action.payload);
      // state.channelsData.splice(0, Infinity, filteredChannels);
      _.set(state, 'channelsData', filteredChannels);
      toast('Канал удален');
    },
    changeNameChannel: (state, action) => {
      const channel = state.channelsData.find((ch) => ch.id === action.payload.id);
      _.set(channel, 'name', action.payload.name);
      toast('Канал переименован');
    },
  },
});

export const {
  upLoadChannels, setCurrentChannel, addChannel, deleteChannel, changeNameChannel,
} = channelsSlice.actions;

export default channelsSlice.reducer;

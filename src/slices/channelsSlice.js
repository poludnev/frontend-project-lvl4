import _ from 'lodash';
import { createSlice } from '@reduxjs/toolkit';

const initialState = {
  channelsData: [],
  currentChannelID: 1,
};

export const channelsSlice = createSlice({
  name: 'channels',
  initialState,
  reducers: {
    upLoadChannels: (state, action) => {
      // state.channelsData = [...action.payload];
      // state.channelsData.splice(0, Infinity, ...action.payload);
      _.set(state, 'channelsData', action.payload);
    },
    setCurrentChannel: (state, action) => {
      // state.currentChannelID = action.payload;
      _.set(state, 'currentChannelID', action.payload);
    },
    addChannel: (state, action) => {
      state.channelsData.push(action.payload);
      _.set(state, 'currentChannelID', action.payload);
    },
    deleteChannel: (state, action) => {
      if (action.payload === state.currentChannelID) {
        // state.currentChannelID = initialState.currentChannelID;
        _.set(state, 'currentChannelID', initialState.currentChannelID);
      }
      const filteredChannels = state.channelsData.filter((ch) => ch.id !== action.payload);
      // state.channelsData = filteredChannels;
      state.channelsData.splice(0, Infinity, filteredChannels);
      _.set(state, 'channelsData', action.payload);
    },
    changeNameChannel: (state, action) => {
      const channel = state.channelsData.find((ch) => ch.id === action.payload.id);
      // channel.name = action.payload.name;
      _.set(channel, 'name', action.payload.name);
    },
  },
});

export const {
  upLoadChannels, setCurrentChannel, addChannel, deleteChannel, changeNameChannel,
} = channelsSlice.actions;

export default channelsSlice.reducer;

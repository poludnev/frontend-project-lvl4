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
      // due to the tests returns only the default channels on fetch request
      // had to merge the fetched channels and the state channels
      const x = JSON.parse(JSON.stringify(state.channelsData))
        .reduce((acc, val) => { acc[val.id] = val; return acc; }, {});
      const y = action.payload.reduce((acc, val) => { acc[val.id] = val; return acc; }, {});
      state.channelsData = Object.values({ ...x, ...y });
      // _.set(state, 'channelsData', Object.values({ ...x, ...y }));
      // _.set(state, 'channelsData', action.payload);
    },
    setCurrentChannel: (state, action) => {
      state.currentChannelID = action.payload;
      // _.set(state, 'currentChannelID', action.payload);
    },
    addChannel: (state, action) => {
      state.channelsData.push(action.payload);
    },
    deleteChannel: (state, action) => {
      if (action.payload === state.currentChannelID) {
        // _.set(state, 'currentChannelID', initialState.currentChannelID);
        state.currentChannelID = initialState.currentChannelID;
      }
      const filteredChannels = state.channelsData.filter((ch) => ch.id !== action.payload);
      state.channelsData = filteredChannels;
      // _.set(state, 'channelsData', filteredChannels);
    },
    changeNameChannel: (state, action) => {
      const channel = state.channelsData.find((ch) => ch.id === action.payload.id);
      channel.name = action.payload.name;
      // _.set(channel, 'name', action.payload.name);
    },
  },
});

export const {
  upLoadChannels, setCurrentChannel, addChannel, deleteChannel, changeNameChannel,
} = channelsSlice.actions;

export default channelsSlice.reducer;

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
      console.log('uploadChannels', action.payload);
      
      // console.log(_.union(action.payload, state.))


      // const result = [...action.payload];

      // const y = state.channelsData.slice(0, Infinity);

      // console.log('result', result, y);
      console.log({...JSON.parse(JSON.stringify(state.channelsData))
        .reduce((acc, val) => { acc[val.id] = val; return acc; }, {}),
        ...action.payload,
      });



      _.set(state, 'channelsData', action.payload);

      
    },
    setCurrentChannel: (state, action) => {
      _.set(state, 'currentChannelID', action.payload);
    },
    addChannel: (state, action) => {
      state.channelsData.push(action.payload);
      // _.set(state, 'currentChannelID', action.payload);
    },
    deleteChannel: (state, action) => {
      if (action.payload === state.currentChannelID) {
        _.set(state, 'currentChannelID', initialState.currentChannelID);
      }
      const filteredChannels = state.channelsData.filter((ch) => ch.id !== action.payload);
      // state.channelsData.splice(0, Infinity, filteredChannels);
      _.set(state, 'channelsData', filteredChannels);
      // toast('Канал удален');
    },
    changeNameChannel: (state, action) => {
      const channel = state.channelsData.find((ch) => ch.id === action.payload.id);
      _.set(channel, 'name', action.payload.name);
      // toast('Канал переименован');
    },
  },
});

export const {
  upLoadChannels, setCurrentChannel, addChannel, deleteChannel, changeNameChannel,
} = channelsSlice.actions;

export default channelsSlice.reducer;

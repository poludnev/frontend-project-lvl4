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
      state.channelsData = [...action.payload];
    },
    setCurrentChannel: (state, action) => {
      state.currentChannelID = action.payload;
    },
    addChannel: (state, action) => {
      state.channelsData.push(action.payload);
    },
    deleteChannel: (state, action) => {
      if (action.payload === state.currentChannelID) {
        state.currentChannelID = initialState.currentChannelID;
      }
      const filteredChannels = state.channelsData.filter((channel) => {
        return channel.id !== action.payload;
      });

      state.channelsData = filteredChannels;
    },
    changeNameChannel: (state, action) => {
      console.log('rename channel reducer');
      const channel = state.channelsData.find((channel) => channel.id === action.payload.id);
      channel.name = action.payload.name;
    },
  },
});

export const { upLoadChannels, setCurrentChannel, addChannel, deleteChannel, changeNameChannel } =
  channelsSlice.actions;

export default channelsSlice.reducer;
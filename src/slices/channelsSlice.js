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
  },
});

export const { upLoadChannels } = channelsSlice.actions;

export default channelsSlice.reducer;

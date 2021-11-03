import { createSlice } from '@reduxjs/toolkit';

const initialState = {
  isShown: true,
  type: 'add',
};

export const modalSlice = createSlice({
  name: 'modal',
  initialState,
  reducers: {
    showModal: (state, action) => {
      return { isShown: true, type: action.payload.type };
    },
    hideModal: (state, action) => {
      return { isShown: true, type: null };
    },
  },
});

export const { showModal, hideModal } = modalSlice.actions;

export default modalSlice.reducer;

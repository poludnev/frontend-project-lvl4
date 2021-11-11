import { createSlice } from '@reduxjs/toolkit';

const initialState = {
  isShown: false,
  type: 'add',
  extra: null,
};

export const modalSlice = createSlice({
  name: 'modal',
  initialState,
  reducers: {
    showModal: (state, action) => {
      return { isShown: true, type: action.payload.type, extra: action.payload.extra };
    },
    hideModal: (state, action) => {
      return { isShown: false, type: null, extra: null };
    },
  },
});

export const { showModal, hideModal } = modalSlice.actions;

export default modalSlice.reducer;

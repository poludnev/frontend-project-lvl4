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
    showModal: (state, action) => ({
      isShown: true,
      type: action.payload.type,
      extra: action.payload.extra,
    }),
    hideModal: () => ({
      isShown: false,
      type: null,
      extra: null,
    }),
    toggleModal: (state, action) => action.payload,
  },
});

export const { showModal, hideModal, toggleModal } = modalSlice.actions;
export default modalSlice.reducer;

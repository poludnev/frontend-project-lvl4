import React from 'react';
import { useDispatch, useSelector } from 'react-redux';

import { selectModal, hideModal } from '../../slices/modalSlice';
import AddChannelModal from './AddChannel';
import RemoveChannelModal from './RemoveChannel';
import RenameChannelModal from './RenameChannel';

const modalsMap = {
  add: AddChannelModal,
  remove: RemoveChannelModal,
  rename: RenameChannelModal,
};

const Modal = () => {
  const dispatch = useDispatch();
  const renderModalComponent = (isShown, type) => {
    if (!isShown) return null;
    const Component = modalsMap[type];
    return (<Component isShown closeModal={() => dispatch(hideModal())} />);
  };
  const { isShown, type } = useSelector(selectModal);
  return renderModalComponent(isShown, type);
};

export default Modal;

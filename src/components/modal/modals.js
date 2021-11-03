import AddChannelModal from './AddChannel.jsx';
import RemoveChannelModal from './RemoveChannel.jsx';
import RenameChannelModal from './RenameChannel.jsx';

const modals = {
  add: AddChannelModal(),
  remove: RemoveChannelModal,
  rename: RenameChannelModal,
};

export default (type) => modals[type];

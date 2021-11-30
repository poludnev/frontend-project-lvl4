import React from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { Button, ButtonGroup, Dropdown } from 'react-bootstrap';
import { useTranslation } from 'react-i18next';
import { setCurrentChannel } from '../../slices/channelsSlice';
import { showModal } from '../../slices/modalSlice';
// import modals from '../modal/modals.jsx';

const Channels = () => {
  const { t } = useTranslation();
  const { channelsData, currentChannelID } = useSelector((state) => state.channels);
  const dispatch = useDispatch();

  const selectChannelHandler = (id) => () => {
    dispatch(setCurrentChannel(id));
  };
  const addNewChannelHandler = () => {
    dispatch(showModal({ type: 'add', extra: null }));
  };

  const removeChannelHandler = (id) => () => {
    dispatch(showModal({ type: 'remove', extra: { id } }));
  };

  const renameChannelHandler = (id) => () => {
    dispatch(showModal({ type: 'rename', extra: { id } }));
  };

  return (
    <div className="channels col-4 col-md-2 border-end pt-5 px-0 bg-light">
      <div className="d-flex justify-content-between mb-2 ps-4 pe-2">
        <span>{t('channels.title')}</span>
        <button
          type="button"
          className="p-0 text-primary btn btn-group-vertical"
          onClick={addNewChannelHandler}
        >
          <svg
            xmlns="http://www.w3.org/2000/svg"
            viewBox="0 0 16 16"
            width="20"
            height="20"
            fill="currentColor"
          >
            <path d="M14 1a1 1 0 0 1 1 1v12a1 1 0 0 1-1 1H2a1 1 0 0 1-1-1V2a1 1 0 0 1 1-1h12zM2 0a2 2 0 0 0-2 2v12a2 2 0 0 0 2 2h12a2 2 0 0 0 2-2V2a2 2 0 0 0-2-2H2z" />
            <path d="M8 4a.5.5 0 0 1 .5.5v3h3a.5.5 0 0 1 0 1h-3v3a.5.5 0 0 1-1 0v-3h-3a.5.5 0 0 1 0-1h3v-3A.5.5 0 0 1 8 4z" />
          </svg>
          <span className="visually-hidden">+</span>
        </button>
      </div>
      <ul className="nav flex-column nav-pills nav-fill px-2">
        {channelsData.map(({ id, name, removable }) => (
          removable ? (
            <li key={id} className="nav-item w-100">
              <Dropdown as={ButtonGroup} className="d-flex">
                <Button
                  type="button"
                  onClick={selectChannelHandler(id)}
                  variant={id === currentChannelID ? 'secondary' : 'light'}
                  className="w-100 rounded-0 text-start text-truncate btn"
                >
                  <span className="me-1">#</span>
                  {name}
                </Button>
                <Dropdown.Toggle
                  variant={id === currentChannelID ? 'secondary' : 'light'}
                  className="flex-grow-0 dropdown-toggle dropdown-toggle-split btn"
                  aria-label="Управление каналом"
                />
                <Dropdown.Menu>
                  <Dropdown.Item onClick={removeChannelHandler(id)} aria-label="Удалить">
                    {t('channels.remove')}
                  </Dropdown.Item>
                  <Dropdown.Item onClick={renameChannelHandler(id)} aria-label="Переименовать">
                    {t('channels.rename')}
                  </Dropdown.Item>
                </Dropdown.Menu>
              </Dropdown>
            </li>
          ) : (
            <li key={id} className="nav-item w-100">
              <Button
                onClick={selectChannelHandler(id)}
                variant={id === currentChannelID ? 'secondary' : 'light'}
                className="w-100 rounded-0 text-start btn"
              >
                <span className="me-1">#</span>
                &nbsp;
                {name}
              </Button>
            </li>
          )))}
      </ul>
    </div>
  );
};

export default Channels;

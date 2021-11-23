import React, {
  useEffect, useRef, useState,
} from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { Modal, Button } from 'react-bootstrap';
import { useTranslation } from 'react-i18next';
import { toast } from 'react-toastify';
import { hideModal } from '../../slices/modalSlice';
import { useApi } from '../../hooks';

const RemoveChannelModal = () => {
  const { t } = useTranslation();
  const api = useApi();
  const cancelRef = useRef();
  useEffect(() => {
    cancelRef.current.focus();
  }, []);
  const isShown = useSelector((state) => state.modal.isShown);
  const { id } = useSelector((state) => state.modal.extra);
  const dispatch = useDispatch();

  const [isSubmitting, setSubmitting] = useState(false);

  const handleClose = () => dispatch(hideModal());

  const removeChannelHandler = async () => {
    setSubmitting(true);
    await api.removeChannel({ id });
    setSubmitting(false);
    handleClose();
    toast(t('modals.remove.toast'));
  };

  return (
    <Modal show={isShown} onHide={handleClose} centered>
      <Modal.Header closeButton>
        <Modal.Title>{t('modals.remove.title')}</Modal.Title>
      </Modal.Header>
      <Modal.Body>
        {t('modals.remove.confirmation')}
        <div className="d-flex justify-content-end">
          <Button variant="secondary" onClick={handleClose} className="me-2" ref={cancelRef}>
            {t('modals.remove.cancelButton')}
          </Button>
          <Button variant="danger" disabled={isSubmitting} onClick={removeChannelHandler}>
            {t('modals.remove.submitButton')}
          </Button>
        </div>
      </Modal.Body>
    </Modal>
  );
};

export default RemoveChannelModal;

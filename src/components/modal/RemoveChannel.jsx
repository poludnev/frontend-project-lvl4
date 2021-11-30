import React, {
  useEffect, useRef, useState,
} from 'react';
import { useSelector } from 'react-redux';
import { Modal, Button } from 'react-bootstrap';
import { useTranslation } from 'react-i18next';
import { toast } from 'react-toastify';
import { useApi } from '../../hooks';

const RemoveChannelModal = ({ isShown, closeModal }) => {
  const { t } = useTranslation();
  const api = useApi();
  const cancelRef = useRef();
  useEffect(() => {
    if (cancelRef.current) cancelRef.current.focus();
  }, []);
  const { id } = useSelector((state) => state.modal.extra);
  const [isSubmitting, setSubmitting] = useState(false);

  const removeChannelHandler = async () => {
    setSubmitting(true);
    await api.removeChannel({ id });
    setSubmitting(false);
    closeModal();
    toast(t('modals.remove.toast'));
  };

  return (
    <Modal show={isShown} onHide={closeModal} centered>
      <Modal.Header closeButton>
        <Modal.Title>{t('modals.remove.title')}</Modal.Title>
      </Modal.Header>
      <Modal.Body>
        {t('modals.remove.confirmation')}
        <div className="d-flex justify-content-end">
          <Button variant="secondary" onClick={closeModal} className="me-2" ref={cancelRef}>
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

import React from 'react';
import { Modal } from 'react-bootstrap';

const AddChannelModal = () => {
  const show = true;
  const handleClose = () => {};
  return (
    <>
      <Modal
        show={show}
        onHide={handleClose}
        aria-labelledby='contained-modal-title-vcenter'
        centered
      >
        {/* <div
          role='dialog'
          aria-modal='true'
          className='fade modal show'
          tabIndex='-1'
          style={{ display: 'block' }}
        > */}
        {/* <div className='modal-dialog modal-dialog-centered'> */}
        {/* <div className='modal-content'> */}
        <Modal.Header closeButton>
          {/* <div className='modal-header'> */}
          <Modal.Title>Modal heading</Modal.Title>
          {/* <div className='modal-title h4'>Добавить канал</div> */}
          {/* <button
              aria-label='Close'
              data-bs-dismiss='modal'
              type='button'
              className='btn btn-close'
            ></button> */}
          {/* </div> */}
        </Modal.Header>
        <div className='modal-body'>
          <form className=''>
            <div className='form-group'>
              <input name='name' data-testid='add-channel' className='mb-2 form-control' />
              <div className='invalid-feedback'></div>
              <div className='d-flex justify-content-end'>
                <button type='button' className='me-2 btn btn-secondary'>
                  Отменить
                </button>
                <button type='submit' className='btn btn-primary'>
                  Отправить
                </button>
              </div>
            </div>
          </form>
        </div>
        {/* </div> */}
        {/* </div> */}
        {/* </div> */}
      </Modal>
      <div className='fade modal-backdrop show'></div>
    </>
  );
};

export default AddChannelModal;

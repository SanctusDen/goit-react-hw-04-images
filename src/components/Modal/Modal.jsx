import React, { useEffect } from 'react';
// import { createPortal } from 'react-dom';
import { ModalWindow, Overlay } from './Modal.styled';

export const Modal = ({ hideModal, url, tags }) => {
  const onBackdropClick = e => {
    if (e.target === e.currentTarget) {
      hideModal();
    }
  };

  useEffect(() => {
    const handleKeyDown = event => {
      if (event.code === 'Escape') {
        hideModal();
      }
    };

    window.addEventListener('keydown', handleKeyDown);

    return () => {
      window.removeEventListener('keydown', handleKeyDown);
    };
  }, [hideModal]);

  return (
    (
      <Overlay onClick={onBackdropClick}>
        <ModalWindow>
          <img src={url} alt={tags} />
        </ModalWindow>
      </Overlay>
    ),
    document.querySelector('#modal-root')
  );
};

import React, { useEffect } from 'react';
import { createPortal } from 'react-dom';
import { ModalWindow, Overlay } from './Modal.styled';

export const Modal = ({ hideModal, url, tags }) => {
  const handleKeyDown = event => {
    if (event.code === 'Escape') {
      hideModal();
    }
  };

  const onBackdropClick = e => {
    if (e.target === e.currentTarget) {
      hideModal();
    }
  };

  useEffect(() => {
    window.addEventListener('keydown', handleKeyDown);
  }, []);

  useEffect(() => {
    return () => {
      window.removeEventListener('keydown', handleKeyDown);
    };
  }, []);

  return createPortal(
    <Overlay onClick={onBackdropClick}>
      <ModalWindow>
        <img src={url} alt={tags} />
      </ModalWindow>
    </Overlay>,
    document.querySelector('#modal-root')
  );
};

import {Modal, Button} from 'flowbite-react';
import React, {useEffect, useState} from "react";
export const Popup = ({children, modalBg, modalSize, modalOpen, setModalOpen}) => {
// close if the esc key is pressed
  useEffect(() => {
    const keyHandler = ({keyCode}) => {
      if (!modalOpen || keyCode !== 27) return;
      setModalOpen(false);
    };
    document.addEventListener('keydown', keyHandler);
    return () => document.removeEventListener('keydown', keyHandler);
  });

  return (
    <>
      <Modal size={modalSize} show={modalOpen} onClose={(e) => {
        e.stopPropagation();
        setModalOpen(false)
      }}>
        <Modal.Body className={`${modalBg} `}>
          {children}
        </Modal.Body>
      </Modal>
    </>
  );
};

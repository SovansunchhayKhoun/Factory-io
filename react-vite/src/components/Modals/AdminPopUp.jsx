// eslint-disable-next-line no-unused-vars
import React, {useRef, useEffect, useState, useContext} from 'react';
import Transition from '../../utils/Transition.jsx';
import ProductContext from "../../context/ProductContext.jsx";
import InvoiceContext from "../../context/InvoiceContext.jsx";
import {AccordionBodyContent} from "../AdminComponents/AccordionBodyContent.jsx";

function AdminPopUp({id, modalOpen, setModalOpen, content}) {
  const modalContent = useRef(null);
  // close on click outside
  // useEffect(() => {
  //   const clickHandler = ({target}) => {
  //     if (!modalOpen || modalContent.current.contains(target)) return
  //     setModalOpen(false);
  //   };
  //   document.addEventListener('click', clickHandler);
  //   return () => document.removeEventListener('click', clickHandler);
  // });

  // close if the esc key is pressed
  useEffect(() => {
    const keyHandler = ({keyCode}) => {
      if (!modalOpen || keyCode !== 27) return;
      setModalOpen(false);
    };
    document.addEventListener('keydown', keyHandler);
    return () => document.removeEventListener('keydown', keyHandler);
  });
  useEffect(() => {
    modalOpen
  }, [modalOpen]);

  // const {invoices, declineOrder} = useContext(InvoiceContext);
  // const invoice = invoices.find((invoice) => invoice.id === id);

  return (
    <>
      {/* Modal backdrop */}
      <Transition
        className="fixed inset-0 bg-slate-900 bg-opacity-30 z-50 transition-opacity"
        show={modalOpen}
        enter="transition ease-out duration-200"
        enterStart="opacity-0"
        enterEnd="opacity-100"
        leave="transition ease-out duration-100"
        leaveStart="opacity-100"
        leaveEnd="opacity-0"
        aria-hidden="true"
      />
      {/* Modal dialog */}
      <Transition
        id={id}
        className="fixed inset-0 z-50 overflow-hidden flex items-start top-20 mb-4 justify-center transform px-4 sm:px-6"
        role="dialog"
        aria-modal="true"
        show={modalOpen}
        enter="transition ease-in-out duration-200"
        enterStart="opacity-0 translate-y-4"
        enterEnd="opacity-100 translate-y-0"
        leave="transition ease-in-out duration-200"
        leaveStart="opacity-100 translate-y-0"
        leaveEnd="opacity-0 translate-y-4"
      >
        <div ref={modalContent}>
          {content}
        </div>
      </Transition>
    </>
  );
}

export default AdminPopUp;

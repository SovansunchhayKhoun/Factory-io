// eslint-disable-next-line no-unused-vars
import React, {useRef, useEffect, useState, useContext} from 'react';
import Transition from '../../utils/Transition.jsx';
import ProductContext from "../../context/ProductContext.jsx";
import InvoiceContext from "../../context/InvoiceContext.jsx";
import {AccordionBody} from "@material-tailwind/react";
import {useAuthContext} from "../../context/AuthContext.jsx";

function CreateItemModal({
                           // eslint-disable-next-line react/prop-types
                           id,
                           // eslint-disable-next-line react/prop-types
                           modalOpen,
                           // eslint-disable-next-line react/prop-types
                           setModalOpen
                         }, props) {

  const modalContent = useRef(null);

  // close on click outside
  useEffect(() => {
    const clickHandler = ({target}) => {
      if (!modalOpen || modalContent.current.contains(target)) return
      setModalOpen(false);
    };
    document.addEventListener('click', clickHandler);
    return () => document.removeEventListener('click', clickHandler);
  });
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

  const {invoices, acceptOrder} = useContext(InvoiceContext);
  const invoice = invoices.find((invoice) => invoice.id === id);

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
        <div ref={modalContent}
             className="bg-white text-blackFactory px-2 py-2 overflow-auto max-w-2xl w-full max-h-full rounded shadow-lg">
          <div>
            Are you sure to accept this order?
            <div className="text-blackFactory mt-3  mb-3 font-semibold">
              <div className="px-2">
                <div className="flex justify-between mb-3">
                  <div className="font-bold">Order ID: {id}</div>
                  <div className="text-tealActive">{invoice.status === -1 ? 'Pending' : 'Arrived'}</div>
                </div>
                <div className="grid grid-cols-2 pr-12 gap-2 mb-3">
                  <div>Order Date: {invoice.date}</div>
                  <div>Phone Number: {invoice.user[0].phoneNumber}
                  </div>
                  <div>Username: {invoice.user[0].username}
                  </div>
                  <div className={`bg-[#D9D9D9] px-2 py-1 rounded-lg`}>Address:
                    {invoice.address}
                  </div>
                </div>
              </div>
              <div className={`accordion-item-body mb-3`}>
                <div>Item
                  {
                    invoice?.invoice_product.map((item) => {
                      return (
                        <div>
                          {item.products.map((product) => {
                            return <div>{product.name}</div>
                          })}
                        </div>
                      )
                    })
                  }
                </div>
                <div>Type
                  {
                    invoice.invoice_product.map((item) => {
                      return (
                        <div>
                          {item.products.map((product) => {
                            return <div>{product.type}</div>
                          })}
                        </div>
                      )
                    })
                  }
                </div>
                <div>Qty
                  {invoice.invoice_product.map((item) => <div>{item.qty}</div>)}
                </div>
                <div>Price
                  {
                    invoice.invoice_product.map((item) => {
                      return (
                        <div>
                          {item.products.map((product) => {
                            return <div>${product.price}</div>
                          })}
                        </div>
                      )
                    })
                  }
                </div>
                <div>Total
                  {invoice.invoice_product.map((item) => <div>${item.cart_item_price}</div>)}
                </div>
              </div>
              <hr className="border-b-1 border-blackFactory rounded-lg"/>
              <div className={`accordion-item-body`}>
                <div>Grand Total</div>
                <div></div>
                {/* for Grid*/}
                <div></div>
                {/* for Grid*/}
                <div></div>
                {/* for Grid*/}
                <div>
                  ${invoice.totalPrice}
                </div>
              </div>
            </div>
          </div>
          <div className={`flex gap-x-2`}>
            <button type="submit"
                    onClick={() => acceptOrder(invoice)}
                    className="w-full text-white bg-blue-700 hover:bg-blue-800 focus:ring-4 focus:outline-none focus:ring-blue-300 font-medium rounded-lg text-sm px-5 py-2.5 text-center dark:bg-blue-600 dark:hover:bg-blue-700 dark:focus:ring-blue-800">
              Accept Order
            </button>
            <button type="submit"
                    onClick={() => setModalOpen(!modalOpen)}
                    className="w-full text-white bg-blue-700 hover:bg-blue-800 focus:ring-4 focus:outline-none focus:ring-blue-300 font-medium rounded-lg text-sm px-5 py-2.5 text-center dark:bg-blue-600 dark:hover:bg-blue-700 dark:focus:ring-blue-800">
              No
            </button>
          </div>
        </div>
      </Transition>
    </>
  );
}

export default CreateItemModal;

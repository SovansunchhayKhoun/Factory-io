// import AcceptOrderModal from "../Modals/AcceptOrderModal.jsx";
import React, {useContext, useState} from "react";
import AdminPopUp from "../Modals/AdminPopUp.jsx";
import {AccordionBodyContent} from "../AdminComponents/AccordionBodyContent.jsx";
import InvoiceContext from "../../context/InvoiceContext.jsx";
import ProductContext from "../../context/ProductContext.jsx";
import {Spinner} from "flowbite-react";

export const AcceptOrderButton = (props) => {
  const {
    checkInvoiceItemQty,
    updateOrderStatus,
    updateOrder,
    updateInvProd,
  } = useContext(InvoiceContext);
  const {updateProduct} = useContext(ProductContext);
  const [acceptOrderModalOpen, setAcceptOrderModalOpen] = useState(false)
  const {invoice, buttonStyle} = props;
  const {invoice_product} = invoice;
  const AcceptOrderContent = () => {
    return (
      <div
        className={`bg-white text-blackFactory px-2 py-2 overflow-auto max-w-2xl w-full max-h-full rounded shadow-lg`}>
        <div>
          Are you sure to accept this order?
          <AccordionBodyContent invoice={invoice}/>
        </div>
        <div className={`flex gap-x-2`}>
          <button disabled={invoice.status === 3} type="submit"
                  onClick={() => {
                    if (invoice.status <= 1) {
                      // validate items qty when inv is still pending or accepted
                      updateInvProd(invoice_product)
                      checkInvoiceItemQty(invoice)
                    } else {
                      // update order status when inv status is delivering
                      updateOrderStatus(invoice)
                      updateOrder(invoice)
                    }
                    if (invoice.status === 2) {
                      // update stock items
                      invoice_product.forEach((product) => {
                        updateProduct(product)
                      })
                    }
                    setAcceptOrderModalOpen(false) // close modal
                  }}
                  className={`${buttonStyle(invoice.status)}
                  w-full text-white font-medium rounded-lg text-sm px-5 py-2.5 text-center`}>
            {invoice.status === -2 && 'Confirm Edit'}
            {invoice.status === -1 && 'Accept Order'}
            {invoice.status === 1 && 'Deliver Order'}
            {invoice.status === 2 && 'Arrived'}
          </button>
          <button
            // onClick={() => setModalOpen(!modalOpen)}
            onClick={() => setAcceptOrderModalOpen(!acceptOrderModalOpen)}
            className="w-full text-white bg-blue-700 hover:bg-blue-800 focus:ring-4 focus:outline-none focus:ring-blue-300 font-medium rounded-lg text-sm px-5 py-2.5 text-center dark:bg-blue-600 dark:hover:bg-blue-700 dark:focus:ring-blue-800">
            No
          </button>
        </div>
      </div>
    );
  }

  return (
    <>
      <button disabled={invoice.status === 3 && true} onClick={(e) => {
        e.stopPropagation();
        setAcceptOrderModalOpen(true);
      }}
              aria-controls={invoice?.id}
              className={`${buttonStyle(invoice.status)} cursor-pointer px-2 py-1 rounded-md font-semibold`}>
        {invoice.status === -1 && 'Accept'}
        {invoice.status === -2 && 'Edit Qty'}
        {invoice.status === 1 && 'Deliver'}
        {invoice.status === 2 && 'Delivering'}
        {invoice.status === 3 && 'Arrived'}
      </button>
      <AdminPopUp content={<AcceptOrderContent/>} id={invoice?.id} modalOpen={acceptOrderModalOpen}
                  setModalOpen={setAcceptOrderModalOpen}/>
    </>
  );
};

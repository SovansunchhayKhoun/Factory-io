// import AcceptOrderModal from "../Modals/AcceptOrderModal.jsx";
import React, {useContext, useState} from "react";
import AdminPopUp from "../Modals/AdminPopUp.jsx";
import {AccordionBodyContent} from "../AdminComponents/AccordionBodyContent.jsx";
import InvoiceContext from "../../context/InvoiceContext.jsx";
import ProductContext from "../../context/ProductContext.jsx";

export const AcceptOrderButton = (props) => {
  const [acceptOrderModalOpen, setAcceptOrderModalOpen] = useState(false)
  const {invoice} = props;
  const {acceptOrder} = useContext(InvoiceContext);
  const {invoice_product} = invoice;
  const {updateProduct} = useContext(ProductContext);


  const AcceptOrderContent = () => {
    return (
      <div
           className="bg-white text-blackFactory px-2 py-2 overflow-auto max-w-2xl w-full max-h-full rounded shadow-lg">
        <div>
          Are you sure to accept this order?
          <AccordionBodyContent invoice={invoice}/>
        </div>
        <div className={`flex gap-x-2`}>
          <button disabled={invoice.status === 3 && true} type="submit"
                  onClick={() => {
                    acceptOrder(invoice);
                    invoice_product.forEach((product) => {
                      updateProduct(product, invoice);
                    });
                  }}
                  className="w-full text-white bg-blue-700 hover:bg-blue-800 focus:ring-4 focus:outline-none focus:ring-blue-300 font-medium rounded-lg text-sm px-5 py-2.5 text-center dark:bg-blue-600 dark:hover:bg-blue-700 dark:focus:ring-blue-800">
            {invoice.status === -2 && 'No Stock'}
            {invoice.status === -1 && 'Accept Order'}
            {invoice.status === 1 && 'Deliver Order'}
            {invoice.status === 2 && 'Arrived'}
            {/*{invoice.status === 3 && 'Arrived'}*/}
          </button>
          <button type="submit"
                  onClick={() => setModalOpen(!modalOpen)}
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
              aria-controls={invoice?.id} className={`${invoice.status === 3 && 'cursor-pointer'} px-2 py-1 rounded-md bg-tealActive`}>
        {invoice.status === -1 && 'Accept'}
        {invoice.status === -2 && 'No Stock'}
        {invoice.status === 1 && 'Deliver'}
        {invoice.status === 2 && 'Delivering'}
        {invoice.status === 3 && 'Arrived'}
      </button>
      <AdminPopUp content={<AcceptOrderContent/>} id={invoice?.id} modalOpen={acceptOrderModalOpen} setModalOpen={setAcceptOrderModalOpen}/>
      {/*<AcceptOrderModal id={invoice?.id} modalOpen={acceptOrderModalOpen} setModalOpen={setAcceptOrderModalOpen}/>*/}
    {/*</AcceptOrderContent>*/}
      </>
  );
};

// import AcceptOrderModal from "../Modals/AcceptOrderModal.jsx";
import React, {useContext, useState} from "react";
import PopUp from "../Modals/PopUp.jsx";
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
          <button type="submit"
                  onClick={() => {
                    acceptOrder(invoice);
                    invoice_product.forEach((product) => updateProduct(product));
                  }}
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
    );
  }

  return (
    <>
      <button onClick={(e) => {
        e.stopPropagation();
        setAcceptOrderModalOpen(true);
      }}
              aria-controls={invoice?.id} className={`px-2 py-1 rounded-md bg-tealActive`}> Accept
      </button>
      <PopUp content={<AcceptOrderContent/>} id={invoice?.id} modalOpen={acceptOrderModalOpen} setModalOpen={setAcceptOrderModalOpen}/>
      {/*<AcceptOrderModal id={invoice?.id} modalOpen={acceptOrderModalOpen} setModalOpen={setAcceptOrderModalOpen}/>*/}
    {/*</AcceptOrderContent>*/}
      </>
  );
};

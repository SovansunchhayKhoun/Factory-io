// import DeclineOrderModal from "../Modals/DeclineOrderModal.jsx";
import React, {useContext, useState} from "react";
import AdminPopUp from "../Modals/AdminPopUp.jsx";
import {AccordionBodyContent} from "../AdminComponents/AccordionBodyContent.jsx";
import InvoiceContext from "../../context/InvoiceContext.jsx";

export const DeclineOrderButton = (props) => {
  const [declineOrderModalOpen, setDeclineOrderModalOpen] = useState(false)
  const {invoice} = props;
  const {declineOrder} = useContext(InvoiceContext);

  const DeclineOrderContent = () => {
    return (
      <div
           className="text-blackFactory px-2 py-1 bg-white overflow-auto max-w-2xl w-full max-h-full rounded shadow-lg">
        Are you sure to decline this order?
        <AccordionBodyContent invoice={invoice}/>
        <div className="flex gap-x-2">
          <button type="submit"
                  onClick={() => declineOrder(invoice)}
                  className="w-full text-white bg-blue-700 hover:bg-blue-800 focus:ring-4 focus:outline-none focus:ring-blue-300 font-medium rounded-lg text-sm px-5 py-2.5 text-center dark:bg-blue-600 dark:hover:bg-blue-700 dark:focus:ring-blue-800">
            Delete Order
          </button>
          <button type="submit"
                  onClick={() => setModalOpen(!modalOpen)}
                  className="w-full text-white bg-blue-700 hover:bg-blue-800 focus:ring-4 focus:outline-none focus:ring-blue-300 font-medium rounded-lg text-sm px-5 py-2.5 text-center dark:bg-blue-600 dark:hover:bg-blue-700 dark:focus:ring-blue-800">
            No
          </button>
        </div>
      </div>
    );
  };

    return (
        <>
          <button disabled={!(invoice.status === -1 || invoice.status === 1) && true} onClick={(e) => { e.stopPropagation(); setDeclineOrderModalOpen(true); }}
                  aria-controls={invoice.id} className={`${(invoice.status === -1 || invoice.status === 1) ? 'bg-redBase text-whiteFactory' : 'bg-grayFactory text-blackFactory cursor-pointer'} px-2 py-1 rounded-md`}> Decline</button>
          <AdminPopUp content={<DeclineOrderContent />} id={invoice.id} modalOpen={declineOrderModalOpen} setModalOpen={setDeclineOrderModalOpen}/>
        </>
    );
};

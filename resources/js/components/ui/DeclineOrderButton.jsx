// import DeclineOrderModal from "../Modals/DeclineOrderModal.jsx";
import React, {useContext, useState} from "react";
import AdminPopUp from "../Modals/AdminPopUp.jsx";
import {AccordionBodyContent} from "../AdminComponents/AccordionBodyContent.jsx";
import InvoiceContext from "../../context/InvoiceContext.jsx";
import {Spinner} from "flowbite-react";

export const DeclineOrderButton = (props) => {
  const [declineOrderModalOpen, setDeclineOrderModalOpen] = useState(false)
  const {invoice} = props;
  const {declineOrder, invLoading} = useContext(InvoiceContext);

  const DeclineOrderContent = () => {
    return (
      <div
        className="text-blackFactory px-6 py-6 bg-white overflow-auto max-w-2xl w-full max-h-full rounded shadow-lg">
        Are you sure to decline this order?
        <AccordionBodyContent invoice={invoice}/>
        <div className="flex gap-x-2">
          <button type="submit" disabled={invLoading || false}
                  onClick={() => declineOrder(invoice).then(() => {
                    setDeclineOrderModalOpen(false);
                  })}
                  className={`${invLoading ? 'bg-redHover' : 'bg-redBase hover:bg-redHover '} w-full text-white font-medium rounded-lg text-sm px-5 py-2.5 text-center`}>
            Delete Order &nbsp;
            {invLoading && <Spinner size={"sm"} color={"purple"}/>}
          </button>
          <button type="submit" disabled={invLoading || false}
                  onClick={() => setDeclineOrderModalOpen(!declineOrderModalOpen)}
                  className={`w-full text-white font-medium rounded-lg text-sm px-5 py-2.5 text-center ${invLoading ? 'bg-grayFactory' : 'bg-blue-700 hover:bg-blue-800'}`}>
            No
          </button>
        </div>
      </div>
    );
  };

  return (
    <>
      <button disabled={!(invoice.status < 2) && true} onClick={(e) => {
        e.stopPropagation();
        setDeclineOrderModalOpen(true);
      }}
              aria-controls={invoice.id}
              className={`${invoice.status < 2 ? 'bg-redBase text-whiteFactory' : 'hidden'} px-2 py-1 rounded-md font-semibold`}>
        Decline
      </button>
      <AdminPopUp content={<DeclineOrderContent/>} id={invoice.id} modalOpen={declineOrderModalOpen}
                  setModalOpen={setDeclineOrderModalOpen}/>
    </>
  );
};

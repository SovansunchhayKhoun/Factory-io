import DeclineOrderModal from "../DeclineOrderModal.jsx";
import React, {useState} from "react";

export const DeclineOrder = (props) => {
  const [declineOrderModalOpen, setDeclineOrderModalOpen] = useState(false)
  const {invoice} = props;
    return (
        <>
          <button onClick={(e) => { e.stopPropagation(); setDeclineOrderModalOpen(true); }}
                  aria-controls={invoice.id} className={`px-2 py-1 rounded-md bg-redBase`}> Decline</button>
          <DeclineOrderModal id={invoice.id} modalOpen={declineOrderModalOpen} setModalOpen={setDeclineOrderModalOpen}/>
        </>
    );
};

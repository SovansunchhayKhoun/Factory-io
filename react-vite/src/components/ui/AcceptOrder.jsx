import AcceptOrderModal from "../Modals/AcceptOrderModal.jsx";
import React, {useState} from "react";

export const AcceptOrder = (props) => {
  const [acceptOrderModalOpen, setAcceptOrderModalOpen] = useState(false)
  const {invoice} = props;
  return (
    <>
      <button onClick={(e) => {
        e.stopPropagation();
        setAcceptOrderModalOpen(true);
      }}
              aria-controls={invoice?.id} className={`px-2 py-1 rounded-md bg-tealActive`}> Accept
      </button>
      <AcceptOrderModal id={invoice?.id} modalOpen={acceptOrderModalOpen} setModalOpen={setAcceptOrderModalOpen}/>
    </>
  );
};

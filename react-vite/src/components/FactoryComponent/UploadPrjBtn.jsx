import {Popup} from "../Modals/FactoryModals/Popup.jsx";
import {UploadProjectForm} from "./UploadProjectForm.jsx";
import React, {useState} from "react";

export const UploadPrjBtn = () => {
  const [modalOpen, setModalOpen] = useState(false);
  return (
    <>
      <button onClick={(e) => {
        e.stopPropagation();
        setModalOpen(true);
      }} className="bg-[#699BF7] text-whiteFactory px-8 py-2 rounded-[20px] shadow-[#699BF7] shadow-lg">
        Upload Project
      </button>
      <Popup modalSize={"7xl"} modalBg={"bg-whiteFactory"}
             children={<UploadProjectForm setModalOpen={setModalOpen} modalOpen={modalOpen}/>} modalOpen={modalOpen}
             setModalOpen={setModalOpen}/>
    </>
  );
};

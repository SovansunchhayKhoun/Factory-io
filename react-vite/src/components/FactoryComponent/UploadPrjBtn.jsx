import AdminPopUp from "../Modals/AdminPopUp.jsx";
import {UploadProjectForm} from "./UploadProjectForm.jsx";
import React from "react";

export const UploadPrjBtn = ({modalOpen, setModalOpen}) => {
    return (
        <>
          <button onClick={(e) => {
            e.stopPropagation();
            setModalOpen(true);
          }} className="bg-[#699BF7] text-whiteFactory px-8 py-2 rounded-[20px] shadow-[#699BF7] shadow-lg">
            Upload Project
          </button>
          <AdminPopUp content={<UploadProjectForm setModalOpen={setModalOpen} modalOpen={modalOpen}/>} modalOpen={modalOpen} setModalOpen={setModalOpen}/>
        </>
    );
};

import {Link} from "react-router-dom";
import React, {useState} from "react";
import AdminPopUp from "./Modals/AdminPopUp.jsx";
import {DonateContent} from "../views/DonateContent.jsx";

export const Footer = () => {
  const [modalOpen, setModalOpen] = useState(false);
  return (
    <>
      <footer
        className="w-full border mt-auto bg-whiteFactory flex items-center justify-between
        xl:px-24 xl:py-4
        lg:px-12 lg:py-3
        md:px-8 md:py-3
        px-4 py-2">
        <div className="flex items-center gap-x-8">
          <div>
            <Link to="/">
              <img className="xl:w-[130px] lg:w-[120px] md:w-[140px] w-[120px]" src="/assets/images/factory.png"
                   alt=""/>
            </Link>
          </div>
          <button onClick={(e) => {
            e.stopPropagation()
            setModalOpen(true)
          }} className="rounded-[20px] px-4 py-2 text-whiteFactory bg-redHover">
            Donate
          </button>
          <AdminPopUp content={<DonateContent modalOpen={modalOpen} setModalOpen={setModalOpen} />} modalOpen={modalOpen} setModalOpen={setModalOpen}/>
        </div>

        <div className="md:flex md:flex-row md:items-center md:gap-x-3 flex flex-col justify-center items-center">
          <span className="md:text-base text-[14px]">
            Follow us on
          </span>
          <div className="flex gap-x-3">
            <Link to="https://www.facebook.com/SolutionOfDigital?mibextid=LQQJ4d">
              <img className="xl:w-[32px] md:w-[24px] w-[20px]" src="/assets/images/facebook-icon.png"
                   alt=""/>
            </Link>
            <Link to="https://www.linkedin.com/company/factory-io/">
              <img className="xl:w-[32px] md:w-[24px] w-[20px]" src="/assets/images/linkedin-icon.png"
                   alt=""/>
            </Link>
            <Link to="https://www.tiktok.com/@factory.io?_t=8c9CGPPLRS6&_r=1">
              <img className="xl:w-[32px] md:w-[24px] w-[20px]" src="/assets/images/tiktok-icon.png"
                   alt=""/>
            </Link>
          </div>
        </div>
      </footer>
    </>
  );
};

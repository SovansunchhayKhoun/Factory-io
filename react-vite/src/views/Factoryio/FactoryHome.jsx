import {Link, useNavigate} from "react-router-dom";
import React, {useState} from "react";
import {useAuthContext} from "../../context/AuthContext.jsx";
import {Community} from "./Account/Community.jsx";
import {RD} from "./Account/RD.jsx";
import {Communitylanding} from "./Communitylanding.jsx";
import {FloatingUser} from "../../components/FactoryComponent/FloatingUser.jsx";
import {Toast} from "flowbite-react";
import {useProjectContext} from "../../context/Factory/ProjectContext.jsx";
// import {HiFire} from "react-icons/all.js";

export const FactoryHome = () => {
  const [tab, setTab] = useState(localStorage.getItem('LAST_TAB') || 'Community');
  const {user, token} = useAuthContext();
  const saveLastTab = (tab) => {
    localStorage.setItem('LAST_TAB', tab);
  }
  const navigate = useNavigate();
  const {toastOpen} = useProjectContext();

  if (token) {
    return (
      <>
        <main className="flex justify-between">
          {/*main page*/}
          <div className="flex-1 flex flex-col gap-3">
            <div className="flex items-center">
              <button className={`${tab === 'Community' && 'text-redHover'} text-2xl`} onClick={() => {
                setTab('Community')
                saveLastTab('Community')
              }}>Community
              </button>
              <span
                className="w-[24px] h-0 border-[1px] rounded-md  border-solid border-redHover transform rotate-90"></span>
              <button className={`${tab === 'RD' && 'text-redHover'} text-2xl`} onClick={() => {
                setTab('RD')
                saveLastTab('RD')
              }}>R&D
              </button>
            </div>
            <div className="">
              {tab === 'Community' && <Community/>}
              {tab === 'RD' && <RD/>}
            </div>

            <div className={`${!toastOpen && 'hidden'} flex justify-end w-full`}>
              <Toast>
                <div
                  className="inline-flex h-8 w-8 shrink-0 items-center justify-center rounded-lg bg-green-100 text-green-500 dark:bg-green-800 dark:text-green-200">
                  <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5}
                       stroke="currentColor" className="w-6 h-6">
                    <path strokeLinecap="round" strokeLinejoin="round" d="M4.5 12.75l6 6 9-13.5"/>
                  </svg>
                </div>
                <div className="ml-3 text-sm font-normal">
                  Your project is finished posting
                </div>
                <Toast.Toggle/>
              </Toast>
            </div>
          </div>
          <FloatingUser user={user}/>
        </main>
      </>
    );
  } else {
    navigate('/');
  }
};

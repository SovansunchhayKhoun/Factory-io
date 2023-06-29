import {Link, useNavigate} from "react-router-dom";
import React, {useState} from "react";
import {useAuthContext} from "../../context/AuthContext.jsx";
import {Community} from "./Account/Community.jsx";
import {RD} from "./Account/RD.jsx";
import {Communitylanding} from "./Communitylanding.jsx";
import {FloatingUser} from "../../components/FactoryComponent/FloatingUser.jsx";
import {Toast} from "flowbite-react";
// import {HiFire} from "react-icons/all.js";

export const FactoryHome = () => {
  const [tab, setTab] = useState(localStorage.getItem('LAST_TAB') || 'Community');
  const {user, token} = useAuthContext();
  const saveLastTab = (tab) => {
    localStorage.setItem('LAST_TAB', tab);
  }
  const navigate = useNavigate();
  if(token) {
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
              {tab === 'Community' && <Community />}
              {tab === 'RD' && <RD/>}
            </div>

            <div className="flex justify-end w-full">
              <Toast>
                <div className="inline-flex h-8 w-8 shrink-0 items-center justify-center rounded-lg bg-cyan-100 text-cyan-500 dark:bg-cyan-800 dark:text-cyan-200">
                  {/*<HiFire className="h-5 w-5" />*/}
                  icon
                </div>
                <div className="ml-3 text-sm font-normal">
                  Set yourself free.
                </div>
                <Toast.Toggle />
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

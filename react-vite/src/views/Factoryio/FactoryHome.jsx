import {Link, useNavigate} from "react-router-dom";
import React, {useState} from "react";
import {useAuthContext} from "../../context/AuthContext.jsx";
import {Community} from "./Account/Community.jsx";
import {RD} from "./Account/RD.jsx";
import {Communitylanding} from "./Communitylanding.jsx";
import {FloatingUser} from "../../components/FactoryComponent/FloatingUser.jsx";

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
          </div>
          <FloatingUser user={user}/>
        </main>
      </>
    );
  } else {
    navigate('/');
  }
};

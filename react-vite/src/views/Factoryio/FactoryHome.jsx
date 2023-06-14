import {Link} from "react-router-dom";
import React, {useState} from "react";
import {useAuthContext} from "../../context/AuthContext.jsx";
import {Community} from "./Account/Community.jsx";
import {RD} from "./Account/RD.jsx";
import {Communitylanding} from "./Communitylanding.jsx";

export const FactoryHome = () => {
  const [tab, setTab] = useState(localStorage.getItem('LAST_TAB') || 'Community');
  const {user} = useAuthContext();
  const saveLastTab = (tab) => {
    localStorage.setItem('LAST_TAB', tab);
  }
  return (
    <>
      <main className="flex justify-between">
        {/*main page*/}
        <div className="flex-1 flex flex-col gap-3 h-[1000px]">
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

        {/*profile side*/}
        <section className="self-start flex flex-col items-center gap-2 border-l-2 border-grayFactory pl-24">
          {/*profile pic*/}
          <div>
            <img alt="" className={`w-[150px] h-[150px] rounded-[50%] shadow-2xl`}
                 src={`https://robohash.org/${user.username}`}/>
          </div>
          <div className="font-bold">{user?.username}</div>
          <div className="font-semibold">{user?.bio}</div>
          <div className="text-[#3C3C3C]">{user?.address} User's Address</div>
          <div className="text-[#3C3C3C] flex items-center ">
            <div className="flex flex-col items-center">
              <span>Follower</span>
              <span className="text-blackFactory">10000</span>
            </div>
            {/*stick*/}
            <span
              className="w-[50px] h-0 border-[1px] rounded-md  border-solid border-grayFactory transform rotate-90"></span>
            <div className="flex flex-col items-center">
              <span>Following</span>
              <span className="text-blackFactory">10000</span>
            </div>
          </div>
          <button className="flex gap-3 bg-grayFactory justify-center items-center px-10 py-2 rounded-lg">
            <span>
              Edit
            </span>
            <svg xmlns="http://www.w3.org/2000/svg" width="14" height="14" viewBox="0 0 14 14" fill="none">
              <path
                d="M12.475 4.71768L9.2875 1.56768L10.3375 0.517676C10.625 0.230176 10.9782 0.0864258 11.3973 0.0864258C11.8162 0.0864258 12.1692 0.230176 12.4562 0.517676L13.5062 1.56768C13.7937 1.85518 13.9437 2.20218 13.9562 2.60868C13.9687 3.01518 13.8312 3.36193 13.5437 3.64893L12.475 4.71768ZM11.3875 5.82393L3.4375 13.7739H0.25V10.5864L8.2 2.63643L11.3875 5.82393Z"
                fill="#1D1D1F"/>
            </svg>
          </button>
        </section>
      </main>
    </>
  );
};

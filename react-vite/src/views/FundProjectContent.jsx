import React, {useContext, useState} from "react";
import {PVFactoryHub} from "../components/FactoryComponent/Tabs/PVFactoryHub.jsx";
import {PVProjectTab} from "../components/FactoryComponent/Tabs/PVProjectTab.jsx";
import {FundProjectTab} from "./FundProjectTab.jsx";
import {BackProjectTab} from "./BackProjectTab.jsx";


// eslint-disable-next-line react/prop-types
export const FundProjectContent = ({setModalOpen, modalOpen,project,projectPrototypes}) => {
  const [tab,setTab] = useState('fp')

  return (
    <>
      <section className="p-4
        w-screen h-screen overflow-auto py-4 text-blackFactory rounded-md bg-whiteFactory">
        <section className="flex gap-4 w-full">
          <div className={`flex justify-center items-start gap-x-4`}>
            <button onClick={(e) => {
              e.stopPropagation();
              setModalOpen(false)
            }} className="transition duration-200 rounded-[50%] hover:bg-blackFactory/50 pt-1">
              <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5}
                   stroke="currentColor"
                   className="transition duration-200 w-6 h-6 hover:text-whiteFactory hover:bg-none">
                <path strokeLinecap="round" strokeLinejoin="round" d="M6 18L18 6M6 6l12 12"/>
              </svg>
            </button>
            <section className='flex flex-col border-r-2 border-blackFactory h-[150px] pr-4 gap-y-3'>
              <button
                className={`${tab === 'fp' && 'bg-redHover text-whiteFactory'} rounded-md whitespace-nowrap transition duration-200 px-4 py-2 hover:bg-redBase hover:text-whiteFactory`}
                onClick={() => setTab('fp')}>Fund Project
              </button>
              <button
                className={`${tab === 'bp' && 'bg-redHover text-whiteFactory'} rounded-md whitespace-nowrap transition duration-200 px-4 py-2 hover:bg-redHover hover:text-whiteFactory`}
                onClick={() => setTab('bp')}>Back Project
              </button>
            </section>
          </div>

          <section className="w-full">
            {tab === 'fp' && <FundProjectTab project={project}/>}
            {tab === 'bp' && <BackProjectTab project={project} projectPrototypes={projectPrototypes}/>}
          </section>
        </section>
      </section>
    </>
  )
}

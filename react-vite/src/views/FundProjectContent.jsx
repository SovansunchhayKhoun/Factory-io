import React, {useContext, useState} from "react";
import {PVFactoryHub} from "../components/FactoryComponent/Tabs/PVFactoryHub.jsx";
import {PVProjectTab} from "../components/FactoryComponent/Tabs/PVProjectTab.jsx";
import {FundProjectTab} from "./FundProjectTab.jsx";
import {BackProjectTab} from "./BackProjectTab.jsx";
import FundingContext from "../context/FundingContext.jsx";


// eslint-disable-next-line react/prop-types
export const FundProjectContent = ({setModalOpen, modalOpen, project, projectPrototypes}) => {

  const {setResponse,section,setSection} = useContext(FundingContext)
  return (
    <>
      <main className="w-screen h-screen flex justify-center">
        <div className={`flex flex-col justify-center items-center`}>
          <div
            className="flex flex-col gap-y-3 px-8 py-4 rounded-md items-center h-[70%] bg-whiteFactory overflow-auto">
            <div className={`flex justify-start items-center gap-x-4 w-full border-b-2 border-b-blackFactory  pb-2`}>
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
              <section className='flex flex-row gap-x-2'>
                <button
                  className={`${section === 'fp' && 'bg-redHover text-whiteFactory'} rounded-md whitespace-nowrap transition duration-200 px-4 py-2 hover:bg-redHover hover:text-whiteFactory`}
                  onClick={() => {
                    setSection('fp')
                    setResponse({})
                  }}>Fund Project
                </button>
                <button
                  className={`${section === 'bp' && 'bg-redHover text-whiteFactory'} rounded-md whitespace-nowrap transition duration-200 px-4 py-2 hover:bg-redHover hover:text-whiteFactory`}
                  onClick={() => setSection('bp')}>Back Project
                </button>
              </section>
            </div>

            <section className="w-full">
              {section === 'fp' && <FundProjectTab project={project}/>}
              {section === 'bp' && <BackProjectTab project={project} projectPrototypes={projectPrototypes}/>}
            </section>
          </div>
        </div>
      </main>
    </>
  )
}

import React, {useContext, useState} from "react";
import DonateContext from "../context/DonateContext.jsx";
import {FilePond} from "react-filepond";
import {ProposalTab} from "../components/FactoryComponent/Tabs/ProposalTab.jsx";
import {ProjectTab} from "../components/FactoryComponent/Tabs/ProjectTab.jsx";
import {Slide} from "@mui/material";

export const BackProjectTab = ({projectPrototypes,setIsHidden,setSection,project}) => {
  const {
    storeDonation,
    amount,
    setAmount,
    setImage,
    comment,
    setComment,
    image,
    resetInput,
    errors,
    response,
    setResponse
  } = useContext(DonateContext)
  const options = [
    {value: '1', text: 'ABA - $$$'},
    {value: '2', text: 'ABA - KHR'},
  ];
  const [selected, setSelected] = useState(1);
  const imgUrl = 'http://127.0.0.1:8000/projects/'

  const handleChange = event => {
    setSelected(Number(event.target.value));
  };
  return (
    <section className="min-w-[1920px]:px-96 xl:px-56 md:px-12
        w-screen h-screen overflow-auto py-4 text-blackFactory rounded-md bg-whiteFactory">
      <div
        className="flex flex-row gap-y-3 mx-auto items-center justify-center gap-x-12 max-w-[700px] min-w-[500px] border-slate-600">
        <button onClick={(e) => {
          e.stopPropagation();
          setIsHidden(false)
          setSection('')
        }} className="transition duration-200 rounded-[50%] hover:bg-blackFactory/50">
          <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5}
               stroke="currentColor"
               className="transition duration-200 w-6 h-6 hover:text-whiteFactory hover:bg-none">
            <path strokeLinecap="round" strokeLinejoin="round" d="M6 18L18 6M6 6l12 12"/>
          </svg>
        </button>
        <div>
          {projectPrototypes?.map(projectPrototype => {
            const {id, description, price, image} = projectPrototype;
            return (
              <Slide key={id} mountOnEnter unmountOnExit direction={"up"} in={true}>
                <section className="grid grid-cols-2 auto-cols-fr gap-10 p-4 border-2 border-[#D9D9D9] rounded-md shadow-[#D9D9D9] shadow-md">
                  <div className="flex justify-center bg-[#D9D9D9] shadow-blueActive shadow-sm">
                    <img className="object-cover rounded-md max-h-[250px]" loading={"lazy"}
                         src={`${imgUrl}/${image}`}
                         alt={`prototype-${id}`}/>
                  </div>

                  <div className=''>
                    <div className="flex flex-col text-lg">
                      <p className='font-semibold text-redBase'>{price}</p>
                      <p className="text-blackFactory">Description
                        <p>
                          {description}
                        </p>
                      </p>
                    </div>
                    <button className={"text-whiteFactory bg-[#1037A9] rounded-[20px] px-4 py-2"}>Back this project</button>
                  </div>
                </section>
              </Slide>
            )
          })}
        </div>
        <div>
          test
        </div>
      </div>
    </section>
  )
}

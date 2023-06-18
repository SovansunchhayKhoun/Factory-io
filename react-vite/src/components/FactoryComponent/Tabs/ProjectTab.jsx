import React, {useState} from "react";
import {Slide} from "@mui/material";
import {useProjectProtoContext} from "../../../context/Factory/ProjectProtoContext.jsx";

const imgUrl = 'http://127.0.0.1:8000';
export const ProjectTab = () => {
  const {projectPrototypes, picture, setPicture, handlePicture} = useProjectProtoContext();

  const [open, setOpen] = useState(false);
  const ProjectTmpForm = () => {
    return (
      <>
        <Slide direction={"up"} in={open} unmountOnExit mountOnEnter>
          <section className={'flex flex-col'}>
            <div className="flex gap-x-4 lg:flex-row flex-col border border-blackFactory  rounded-md gap-3 p-4">
              <div className="flex-1 w-[500px]">
                <label htmlFor="image"
                       className={`${picture && 'hidden'} lg:h-full md:h-[300px] h-[200px] transition duration-500 flex justify-center items-center gap-2 bg-gray-300 border rounded-md hover:bg-gray-500 cursor-pointer`}>
                  <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth="1.5"
                       stroke="currentColor" className="w-6 h-6">
                    <path strokeLinecap="round" strokeLinejoin="round"
                          d="M2.25 15.75l5.159-5.159a2.25 2.25 0 013.182 0l5.159 5.159m-1.5-1.5l1.409-1.409a2.25 2.25 0 013.182 0l2.909 2.909m-18 3.75h16.5a1.5 1.5 0 001.5-1.5V6a1.5 1.5 0 00-1.5-1.5H3.75A1.5 1.5 0 002.25 6v12a1.5 1.5 0 001.5 1.5zm10.5-11.25h.008v.008h-.008V8.25zm.375 0a.375.375 0 11-.75 0 .375.375 0 01.75 0z"></path>
                  </svg>
                  Add photo
                </label>
                {picture && (
                  <div className="relative">
                    <button onClick={() => {setPicture('');}}
                            className={`bg-blackFactory text-whiteFactory absolute top-1 right-1 transition duration-200 rounded-[50%] hover:bg-blackFactory/50`}>
                      <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5}
                           stroke="currentColor"
                           className="transition duration-200 w-6 h-6 hover:text-whiteFactory hover:bg-none">
                        <path strokeLinecap="round" strokeLinejoin="round" d="M6 18L18 6M6 6l12 12"/>
                      </svg>
                    </button>
                    <img loading="lazy" className="object-contain" src={URL.createObjectURL(picture)} alt=""/>
                  </div>
                )}
                <input onChange={(e) => handlePicture(e)} className="hidden" type="file" id='image'/>
              </div>
              <div className="flex-1 flex flex-col gap-3">
                <div className="flex flex-col gap-1">
                  <label htmlFor="price">Price</label>
                  <input className={"rounded-md"} type="number" id={'price'}/>
                </div>
                <div className={"flex flex-col gap-1"}>
                  <label htmlFor="description">Description</label>
                  <textarea className="rounded-md" id="description" cols="30" rows="10"></textarea>
                </div>
                <button className="w-full rounded-md border-2 bg-[#D9D9D9] border-blueBase py-2">Submit</button>
              </div>
            </div>
          </section>
        </Slide>
      </>
    )
  }
  return (
    <div className={'transition duration-500 flex flex-col gap-4'}>
      <button onClick={(e) => {
        e.stopPropagation();
        setOpen(!open);
      }} className="self-start flex items-center gap-x-2 bg-[#D9D9D9] border rounded-[20px] px-4 py-2">
        Add Template
        <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none">
          <path
            d="M10.3333 23.6663V13.6663H0.333313V10.333H10.3333V0.333008H13.6666V10.333H23.6666V13.6663H13.6666V23.6663H10.3333Z"
            fill="#9747FF"/>
        </svg>
      </button>

      {open && <ProjectTmpForm/>}

    </div>
  );
};

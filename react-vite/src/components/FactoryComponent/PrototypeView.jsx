import {Slide} from "@mui/material";
import React from "react";

export const PrototypeView = ({prototype}) => {
    return (
        <>
          <Slide direction={"up"} in={true} unmountOnExit mountOnEnter>
            <section className={'flex flex-col'}>
              <div className="flex gap-x-4 lg:flex-row flex-col border border-blackFactory  rounded-md gap-3 p-4">
                <div className="flex-1 w-[500px]">
                  {prototype.image && (
                    <div className="relative">
                      <button onClick={() => {
                        // setPicture('');
                      }} className={`bg-blackFactory text-whiteFactory absolute top-1 right-1 transition duration-200 rounded-[50%] hover:bg-blackFactory/50`}>
                        <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5}
                             stroke="currentColor"
                             className="transition duration-200 w-6 h-6 hover:text-whiteFactory hover:bg-none">
                          <path strokeLinecap="round" strokeLinejoin="round" d="M6 18L18 6M6 6l12 12"/>
                        </svg>
                      </button>
                      <img loading="lazy" className="object-contain" src={URL.createObjectURL(prototype.image)} alt=""/>
                    </div>
                  )}
                </div>
                <div className="flex-1 flex flex-col gap-3">
                  <div className="flex flex-col gap-1">
                    <label htmlFor="price">Price: ${prototype.price}</label>
                  </div>
                  <div className={"flex flex-col gap-1"}>
                    <label htmlFor="description">Description</label>
                    <div>{prototype.description}</div>
                    {/*<textarea value={prjPrototypeValues.description} onChange={e => setPrjPrototypeValues({*/}
                    {/*  ...prjPrototypeValues,*/}
                    {/*  description: e.target.value*/}
                    {/*})}*/}
                    {/*          className="rounded-md" id="description" cols="30" rows="10"></textarea>*/}
                  </div>
                  {/*<button onClick={() => submitPrototype()}*/}
                  {/*        className="w-full rounded-md border-2 bg-[#D9D9D9] border-blueBase py-2">Submit*/}
                  {/*</button>*/}
                </div>
              </div>
            </section>
          </Slide>
        </>
    );
};

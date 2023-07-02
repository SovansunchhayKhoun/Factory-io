import React, {useContext, useEffect, useState} from "react";
import DonateContext from "../context/DonateContext.jsx";
import {FilePond} from "react-filepond";
import {ProposalTab} from "../components/FactoryComponent/Tabs/ProposalTab.jsx";
import {ProjectTab} from "../components/FactoryComponent/Tabs/ProjectTab.jsx";
import {Slide} from "@mui/material";

export const BackProjectTab = ({projectPrototypes, setIsHidden, setSection, project}) => {
  const imgUrl = 'http://127.0.0.1:8000/projects/'
  const [invoiceItem,setInvoiceItem] = useState([])
  const {
    storeDonation,
    amount,
    setAmount,
    setImage,
    comment,
    setComment,
    image,
    errors,
    response
  } = useContext(DonateContext)

  const options = [
    {value: '1', text: 'ABA - $$$'},
    {value: '2', text: 'ABA - KHR'},
  ];
  const [selected, setSelected] = useState(1);
  const handleChange = event => {
    setSelected(Number(event.target.value));
  };
  return (
    <div className={`flex gap-y-8 flex-col`}>
      <div className={`flex w-full justify-center gap-x-8`}>
        <div className={`flex flex-col gap-y-4`}>
          <div className="flex justify-start items-start flex-row gap-x-2">
            <div className="items-start flex flex-col gap-y-2">
              <h1 className="font-bold text-2xl">Back Project</h1>
              <p>Project name: {project?.name}</p>
              <p>Created by: {project?.user.firstName + ' ' + project?.user.lastName}</p>
              <p>List of prototypes: </p>
            </div>
          </div>
          {projectPrototypes?.map(projectPrototype => {
            const {id, description, price, image} = projectPrototype;
            return (
              <Slide key={id} mountOnEnter unmountOnExit direction={"up"} in={true}>
                <section
                  className="grid grid-cols-2 auto-cols-fr gap-10 p-4 border-2 border-[#D9D9D9] rounded-md shadow-[#D9D9D9] shadow-md">
                  <div className="flex justify-center bg-[#D9D9D9] shadow-blueActive shadow-sm">
                    <img className="object-cover rounded-md max-h-[250px]" loading={"lazy"}
                         src={`${imgUrl}/${image}`}
                         alt={`prototype-${id}`}/>
                  </div>
                  <div className=''>
                    <div className="flex flex-col text-lg">
                      <p className='font-semibold text-redBase'>{price}</p>
                      <div className="text-blackFactory">Description:
                        <p>
                          {description}
                        </p>
                      </div>
                    </div>
                    <button
                      onClick={(e) => {
                        console.log(setInvoiceItem(price))
                      }}
                      className={" rounded-[50%] px-1 py-1 hover:bg-tealActive active:bg-tealBase transition duration-300"}>
                      <img loading={"lazy"} width="36" src="/assets/images/cart-icon.png" alt=""/>
                    </button>
                  </div>
                </section>
              </Slide>
            )
          })}
        </div>
        <div className={`flex flex-col gap-y-2 justify-start items-center border-2 rounded-md border-redBase w-1/3 p-8`}>
          <h1 className={`text-3xl text-blackFactory font-bold`}>
            Invoice
          </h1>
          <div>
            test
          </div>
        </div>
      </div>
      <div className="flex flex-row items-start gap-2 bg-redHover p-12 w-full rounded-md justify-evenly">
        <div className={`flex flex-col gap-y-8`}>
          <select
            value={selected}
            onChange={event => handleChange(event)}
            className="bg-whiteFactory py-0 px-2 rounded-sm w-full
              md:text-base text-blackFactory font-semibold text-[10px]">
            {options.map((option) => {
              return (
                <option key={option.value} value={option.value}>
                  {option.text}
                </option>
              );
            })}
          </select>
          <div>
            {selected === 1 &&
              (
                <img className={`object-contain
              md:w-[200px] md:h-[200px] md:mt-0 mt-2
              `} src="/assets/images/qr-dollars.jpg"
                     alt=""/>
              )
            }

            {selected === 2 &&
              <img className={`object-contain
              md:w-[200px] md:h-[200px] md:mt-0 mt-2
              `} src="/assets/images/qr-riel.jpg"
                   alt=""/>}
          </div>
        </div>
        <div className={`flex flex-col`}>
          <label
            className="cursor-pointer lg:inline-flex md:px-3 md:py-1 md:w-60 bg-whiteFactory
                flex px-2 py-[0.1rem] border border-slate-600 rounded-lg text-blackFactory
                md:text-base text-[12px]" htmlFor="file">
            Select Image
            <input className='hidden' type="file"
                   id="file" accept="image/*"
                   onChange={(e) => {
                     setImage(e.target.files[0])
                   }}/>
          </label>
          {image &&
            <div className={"flex flex-col gap-2"}>
              <div className="">
                <img className="md:w-[250px] object-contain"
                     src={URL.createObjectURL(image)} alt=""/>
              </div>
              <div className="flex gap-x-2">
                <button className="rounded-md md:text-base text-[14px] bg-redHover text-whiteFactory px-2 py-1"
                        onClick={(e) => setImage('')}>
                  <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5}
                       stroke="currentColor" className="w-6 h-6">
                    <path strokeLinecap="round" strokeLinejoin="round"
                          d="M14.74 9l-.346 9m-4.788 0L9.26 9m9.968-3.21c.342.052.682.107 1.022.166m-1.022-.165L18.16 19.673a2.25 2.25 0 01-2.244 2.077H8.084a2.25 2.25 0 01-2.244-2.077L4.772 5.79m14.456 0a48.108 48.108 0 00-3.478-.397m-12 .562c.34-.059.68-.114 1.022-.165m0 0a48.11 48.11 0 013.478-.397m7.5 0v-.916c0-1.18-.91-2.164-2.09-2.201a51.964 51.964 0 00-3.32 0c-1.18.037-2.09 1.022-2.09 2.201v.916m7.5 0a48.667 48.667 0 00-7.5 0"/>
                  </svg>
                </button>
                <label
                  className="text-center rounded-md md:text-base text-[14px] text-whiteFactory bg-blueBase px-2 py-1"
                  htmlFor="files">
                  <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5}
                       stroke="currentColor" className="w-6 h-6">
                    <path strokeLinecap="round" strokeLinejoin="round"
                          d="M16.862 4.487l1.687-1.688a1.875 1.875 0 112.652 2.652L10.582 16.07a4.5 4.5 0 01-1.897 1.13L6 18l.8-2.685a4.5 4.5 0 011.13-1.897l8.932-8.931zm0 0L19.5 7.125M18 14v4.75A2.25 2.25 0 0115.75 21H5.25A2.25 2.25 0 013 18.75V8.25A2.25 2.25 0 015.25 6H10"/>
                  </svg>
                </label>
              </div>
            </div>
          }
          {errors && <span className="text-red-600 text-sm mt-2">{errors.image}</span>}
          <button
            onClick={(e) => {
              storeDonation()
            }}
            className="rounded-[20px] px-6 py-2 text-blackFactory bg-whiteFactory">Submit
          </button>
          {response && <span className="text-sm
          text-green-500">{response.data}</span>}
        </div>
      </div>
    </div>
  )
}

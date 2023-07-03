import React, {useContext, useEffect, useState} from "react";
import DonateContext from "../context/DonateContext.jsx";
import {FilePond} from "react-filepond";
import {ProposalTab} from "../components/FactoryComponent/Tabs/ProposalTab.jsx";
import {ProjectTab} from "../components/FactoryComponent/Tabs/ProjectTab.jsx";
import {Slide} from "@mui/material";

export const BackProjectTab = ({projectPrototypes, setIsHidden, setSection, project}) => {
  const imgUrl = 'http://127.0.0.1:8000/projects/'
  const [invoiceItem,setInvoiceItem] = useState([])
  const [totalPrice, setTotalPrice] = useState(0)
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
                      <p className='font-semibold text-redBase'>$ {price}</p>
                      <div className="text-blackFactory">Description:
                        <p>
                          {description}
                        </p>
                      </div>
                    </div>
                    <button
                      onClick={(e) => {
                        setTotalPrice(price + totalPrice)
                        setInvoiceItem(projectPrototype)
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

            {totalPrice}
          </div>
        </div>
      </div>
    </div>
  )
}

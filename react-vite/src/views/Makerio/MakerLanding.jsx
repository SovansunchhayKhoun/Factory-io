import {Link} from "react-router-dom";
import {ItemCard} from "../../components/CartComponents/ItemCard.jsx";
import {useNavigate} from "react-router-dom";
import React, {Fragment, useContext, useEffect, useState} from "react";
import ProductContext from "../../context/ProductContext.jsx";
import CartContext from "../../context/CartContext.jsx";
import {Pagination} from "@mui/material";
import {Footer} from "../../components/Footer.jsx";
import {Spinner} from "flowbite-react";
import {Dropdown} from "flowbite-react";

export const MakerLanding = () => {
  const {items, searchInput, itemsQueryReFetch, setSearchInput, itemsLoading} = useContext(ProductContext);
  const [open, setOpen] = useState(0);
  const handleOpen = (value) => {
    setOpen(open === value ? 0 : value);
  };
  const [cate, setCate] = useState('All');
  // useEffect(() => {
  //   itemsQueryReFetch();
  // }, []);
  const CateLabel = () => {
    return (
      <span className="font-bold text-tealHover">
        {cate}
      </span>
    );
  }
  return (
    <>
      <div className="flex flex-col items-center gap-y-6">
        <div className="font-bold">
          Product
        </div>
        {/*<div className="w-[384px]">*/}
        {/*  <input type="text"*/}
        {/*         className="w-[100%] px-12 search-bar py-1 border-none"*/}
        {/*         onChange={event => {*/}
        {/*           setSearchInput(event.target.value)*/}
        {/*         }}*/}
        {/*  />*/}
        {/*</div>*/}
      </div>
      {/*display item */}
      <div className="min-[1920px]:px-48 flex flex-col gap-4 justify-center">
        <Dropdown style={{background: "none"}} inline label={<CateLabel/>}>
          <div className="w-[270px]">
            <Dropdown.Item className="highlight-hover font-bold" onClick={() => {
              setSearchInput('')
              setCate('All');
            }}>
              <div className={`${searchInput === '' && 'text-tealHover'}`}>
                All
              </div>
            </Dropdown.Item>
            <Dropdown.Item className={"highlight-hover font-bold"} onClick={() => {
              setSearchInput('sensor')
              setCate('Sensors');
            }}>
              <div className={`${searchInput === 'sensor' && 'text-tealHover'}`}>
                Sensors
              </div>
            </Dropdown.Item>
            <Dropdown.Item className={"highlight-hover font-bold"} onClick={() => {
              setSearchInput('microcontroller')
              setCate('Micro-Controllers');
            }}>
              <div className={`${searchInput === 'microcontroller' && 'text-tealHover'}`}>
                Micro-Controller
              </div>
            </Dropdown.Item>
            <Dropdown.Item className={"highlight-hover font-bold"} onClick={() => {
              setSearchInput('arduino')
              setCate('Arduino');
            }}>
              <div className={`${searchInput === 'arduino' && 'text-tealHover'}`}>
                Arduino
              </div>
            </Dropdown.Item>
            <Dropdown.Item className={"highlight-hover font-bold"} onClick={() => {
              setSearchInput('steam')
              setCate('Steam');
            }}>
              <div className={`${searchInput === 'steam' && 'text-tealHover'}`}>Steam
              </div>
            </Dropdown.Item>
          </div>
        </Dropdown>
        <div className="grid min-[1920px]:grid-cols-5 auto-rows-fr gap-12
        xl:grid-cols-4
        lg:grid-cols-4
        md:grid-cols-2
        ">
          {itemsLoading &&
            <div
              className="max-w-[270px] min-h-[350px] shadow-2xl border border-[#59C3CB] p-6 flex flex-col items-center">
              <Spinner size="xl" color="purple"/>
            </div>
          }
          {/*/!*warning if no items in database*!/*/}
          {/*{items.length === 0 && <div>No Items</div>}*/}
          {/*warning if no items in database*/}
          {items.filter((item) => {
            if (searchInput === "") {
              return item
            } else if (searchInput !== "") {
              if (item.name.toLowerCase().includes(searchInput.toLowerCase()) || item.type.toLowerCase().includes(searchInput.toLowerCase()))
                return item
            }
          }).map((item, key) => {
            return (
              <ItemCard key={key} item={item}/>
            );
          })}
        </div>
      </div>
    </>
  );
};



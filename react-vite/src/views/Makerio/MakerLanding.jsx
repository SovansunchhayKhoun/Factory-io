import {Link} from "react-router-dom";
import {ItemCard} from "../../components/CartComponents/ItemCard.jsx";
import {useNavigate} from "react-router-dom";
import {useContext, useEffect, useState} from "react";
import ProductContext from "../../context/ProductContext.jsx";
import CartContext from "../../context/CartContext.jsx";
import {Pagination} from "@mui/material";
import {Footer} from "../../components/Footer.jsx";

export const MakerLanding = () => {
  const {items, searchInput, itemsQueryReFetch, setSearchInput} = useContext(ProductContext);

  useEffect(() => {
    itemsQueryReFetch();
  }, []);

  return (
    <>
      <main className="">
        <div className="flex flex-col items-center gap-y-6">
          <section className="font-bold">
            Product
          </section>
          {/*<div className="w-[384px]">*/}
          {/*  <input type="text"*/}
          {/*         className="w-[100%] px-12 search-bar py-1 border-none"*/}
          {/*         onChange={event => {*/}
          {/*           setSearchInput(event.target.value)*/}
          {/*         }}*/}
          {/*  />*/}
          {/*</div>*/}
          <div className="flex gap-x-6 font-bold mb-6">
            <div className={`${searchInput === '' && 'text-tealHover'} highlight-hover`} onClick={() => {
              setSearchInput('')
            }}>All
            </div>
            <div className={`${searchInput === 'sensor' && 'text-tealHover'} highlight-hover`} onClick={() => {
              setSearchInput('sensor')
            }}>Sensors
            </div>
            <div className={`${searchInput === 'microcontroller' && 'text-tealHover'} highlight-hover`} onClick={() => {
              setSearchInput('microcontroller')
            }}>Micro-Controller
            </div>
            <div className={`${searchInput === 'arduino' && 'text-tealHover'} highlight-hover`} onClick={() => {
              setSearchInput('arduino')
            }}>Arduino
            </div>
            <div className={`${searchInput === 'steam' && 'text-tealHover'} highlight-hover`} onClick={() => {
              setSearchInput('steam')
            }}>Steam
            </div>
          </div>
        </div>

        {/*display item */}
        <div className="flex justify-center px-24">
          <div className="items-display gap-6 md:gap-x-0 gap-y-5">
            {/*warning if no items in database*/}
            {items.length === 0 && <div>No Items</div>}
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
      </main>
    </>
  );
};



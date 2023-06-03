import {Link} from "react-router-dom";
import {ItemCard} from "../../components/CartComponents/ItemCard.jsx";
import {useNavigate} from "react-router-dom";
import React, {Fragment, Suspense, useContext, useEffect, useState} from "react";
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
  const [category, setCategory] = useState('All');
  // useEffect(() => {
  //   itemsQueryReFetch();
  // }, []);

  useEffect(() => {
    switch (searchInput) {
      case 'sensor':
        setCategory('Sensor');
        break;
      case 'microcontroller':
        setCategory('Micro-Controller');
        break;
      case 'microprocessor':
        setCategory('Micro-Processor');
        break;
      case 'tools':
        setCategory('Tools');
        break;
      case 'resistor':
        setCategory('Resistor');
        break;
      case 'electronic':
        setCategory('Electronic Component');
        break;
      case 'battery':
        setCategory('Battery');
        break;
      case 'arduino':
        setCategory('Arduino')
        break;
      case 'steam':
        setCategory('Steam');
        break;
      default:
        setCategory('All');
        break;
    }
  }, [searchInput]);

  const CateLabel = () => {
    return (
      <span className="font-bold text-tealHover">
        {category}
      </span>
    );
  }

  return (
    <div className="flex flex-col gap-y-6 xl:py-6 lg:py-12 md:py-8 py-6">
      <div className="font-bold flex flex-col items-center gap-y-6">
        Product
      </div>
      {/*display item */}
      <div className="min-[1920px]:px-48 flex flex-col gap-6 justify-center">
        <Dropdown style={{background: "none"}} inline label={<CateLabel/>}>
          <div className="w-[270px]">
            <Dropdown.Item className="highlight-hover font-bold" onClick={() => {
              setSearchInput('')
              // setCategory('All');
            }}>
              <div className={`${searchInput === '' && 'text-tealHover'}`}>
                All
              </div>
            </Dropdown.Item>
            <Dropdown.Item className={"highlight-hover font-bold"} onClick={() => {
              setSearchInput('sensor')
              // setCategory('Sensors');
            }}>
              <div className={`${searchInput === 'sensor' && 'text-tealHover'}`}>
                Sensors
              </div>
            </Dropdown.Item>
            <Dropdown.Item className={"highlight-hover font-bold"} onClick={() => {
              setSearchInput('microcontroller')
              // setCategory('Micro-Controllers');
            }}>
              <div className={`${searchInput === 'microcontroller' && 'text-tealHover'}`}>
                Micro-Controller
              </div>
            </Dropdown.Item>
            <Dropdown.Item className={"highlight-hover font-bold"} onClick={() => {
              setSearchInput('arduino')
              // setCategory('Arduino');
            }}>
              <div className={`${searchInput === 'arduino' && 'text-tealHover'}`}>
                Arduino
              </div>
            </Dropdown.Item>
            <Dropdown.Item className={"highlight-hover font-bold"} onClick={() => {
              setSearchInput('steam')
              // setCategory('Steam');
            }}>
              <div className={`${searchInput === 'steam' && 'text-tealHover'}`}>Steam
              </div>
            </Dropdown.Item>
          </div>
        </Dropdown>

        <div className="grid auto-rows-fr gap-12
          min-[1920px]:grid-cols-5
          xl:grid-cols-4 xl:px-8
          lg:grid-cols-3
          md:grid-cols-2 md:px-12
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
    </div>
  );
};



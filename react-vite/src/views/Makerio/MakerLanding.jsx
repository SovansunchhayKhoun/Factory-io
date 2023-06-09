import {ItemCard} from "../../components/CartComponents/ItemCard.jsx";
import React, {Fragment, Suspense, useContext, useEffect, useState} from "react";
import ProductContext from "../../context/ProductContext.jsx";
import {Pagination} from "@mui/material";
import {Spinner} from "flowbite-react";
import {Dropdown} from "flowbite-react";
import Axios from "axios";
import {useQuery} from "@tanstack/react-query";

export const MakerLanding = () => {
    const {
      items,
      setItems,
      itemsLoading,
      searchInput,
      setSearchInput,
      setPage,
      page,
      pageSum,
      setPageSum,
      getType,
      itemsQueryReFetch
    } = useContext(ProductContext);

    const handlePage = async (event, value) => {
      scrollTo({top: 0, behavior: "smooth"})
      setPage(value);
    }

    const [data, setData] = useState([...items]);

    useEffect(() => {
      scrollTo({top: 0, behavior: "smooth"})
      searchInput ? setData(items.filter(item => item.type === searchInput)) : setData([...items]);
      itemsQueryReFetch();
    }, [searchInput]);

    useEffect(() => {
      searchInput && setPageSum(Math.ceil(items?.length / 10))
    }, [items]);

    const [category, setCategory] = useState('All');
    useEffect(() => {
      setCategory(getType(searchInput));
    }, [searchInput])

    const CateLabel = () => {
      return (
        <span className="font-bold text-tealHover">
          {category}
        </span>
      );
    }
    const loading = [1, 2, 3, 4, 5, 6, 7, 8, 9, 10];
    const LoadingItem = () => {
      if (itemsLoading) {
        return (
          <>
            <div
              className="bg-gray-100 max-w-[270px] min-h-[350px] shadow-2xl border border-[#59C3CB] p-6 flex flex-col justify-center items-center">
              <Spinner size="xl" color="purple"/>
            </div>
          </>
        )
      }
    }

    return (
      <div className="flex flex-col gap-y-6">
        <div className="font-bold flex flex-col items-center gap-y-6">
          Product
        </div>
        {/*display item */}
        <div className="flex flex-col gap-6 justify-center">
          <Dropdown style={{background: "none"}} inline label={<CateLabel/>}>
            <div className="w-[270px]">
              <Dropdown.Item className="highlight-hover font-bold" onClick={() => {
                setSearchInput('')
              }}>
                <div className={`${searchInput === '' && 'text-tealHover'}`}>
                  All
                </div>
              </Dropdown.Item>
              <Dropdown.Item className={"highlight-hover font-bold"} onClick={() => {
                setSearchInput('sensor')
              }}>
                <div className={`${searchInput === 'sensor' && 'text-tealHover'}`}>
                  Sensors
                </div>
              </Dropdown.Item>
              <Dropdown.Item className={"highlight-hover font-bold"} onClick={() => {
                setSearchInput('microcontroller')
              }}>
                <div className={`${searchInput === 'microcontroller' && 'text-tealHover'}`}>
                  Micro-Controller
                </div>
              </Dropdown.Item>
              <Dropdown.Item className={"highlight-hover font-bold"} onClick={() => {
                setSearchInput('arduino')
              }}>
                <div className={`${searchInput === 'arduino' && 'text-tealHover'}`}>
                  Arduino
                </div>
              </Dropdown.Item>
              <Dropdown.Item className={"highlight-hover font-bold"} onClick={() => {
                setSearchInput('steam')
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
            {loading.map(l => <LoadingItem key={l}/>)}
            {/*{items?.filter(item => {*/}
            {/*  if (searchInput)*/}
            {/*    return item.type === searchInput;*/}
            {/*  return item;*/}
            {/*}).map((item, key) => {*/}
            {/*  return (*/}
            {/*    <>*/}
            {/*      <ItemCard key={key} item={item}/>*/}
            {/*    </>*/}
            {/*  );*/}
            {/*})}*/}
            {data.length === 0 && <div>No items found</div>}
            {data?.filter(item => {
              if (searchInput)
                return item.type === searchInput;
              return item;
            }).map((item, key) => {
              return (
                <>
                  <ItemCard key={key} item={item}/>
                </>
              );
            })}
          </div>
          <div className="flex justify-center">
            <Pagination page={page} onChange={handlePage} count={pageSum}/>
          </div>
        </div>
      </div>
    );
  }
;



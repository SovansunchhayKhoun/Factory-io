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
    fetchTypes,
    types
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

    const [data, setData] = useState(items);
    //
    // useEffect(() => {
    //   setData(items)
    //   setPage(1)
    //   itemsQueryReFetch()
    // }, []);
    //
    // useEffect(() => {
    //   console.log(items)
    //   setData([...items])
    // }, [page])
    //
    // useEffect(() => {
    //   scrollTo({top: 0, behavior: "smooth"})
    //   setData(items?.filter(item => item.type === searchInput));
    //   itemsQueryReFetch();
    // }, [searchInput]);
    //
    // useEffect(() => {
    //   searchInput && setPageSum(Math.ceil(items?.length / 10))
    // }, [items]);

    useEffect(() => {
      setItems(items?.filter(item => item.type === searchInput))
      itemsQueryReFetch();
    }, [searchInput])

    const [category, setCategory] = useState('All');
  useEffect(() => {
    fetchTypes()
    setCategory(searchInput);
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
    <div className="flex flex-col gap-y-6 xl:py-6 lg:py-12 md:py-8 py-6">
      <div className="font-bold flex flex-col items-center gap-y-6">
        Product
      </div>
      {/*display item */}
      <div className="min-[1920px]:px-48 flex flex-col gap-6 justify-center">
        <Dropdown style={{background: "none"}} inline
                  label={searchInput === '' ? <span className="font-bold text-tealHover">
        All
      </span> : <CateLabel/>}>
          <div className="w-[270px]">
            <Dropdown.Item className="highlight-hover font-bold" onClick={() => {
              setSearchInput('')
              // setCategory('All');
            }}>
              <div className={`${searchInput === '' && 'text-tealHover'}`}>
                All
              </div>
            </Dropdown.Item>
            {types.map((type, key) => {
              return (
                // eslint-disable-next-line react/jsx-key
                <Dropdown.Item key={key} className={"highlight-hover font-bold"} onClick={() => {
                  setSearchInput(type.type)
                  // setCategory('Sensors');
                }}>
                  <div className={`${searchInput === type.type && 'text-tealHover'}`}>
                    {type.type}
                  </div>
                </Dropdown.Item>
              )
            })}


            {/*<Dropdown.Item className={"highlight-hover font-bold"} onClick={() => {*/}
            {/*  setSearchInput('microcontroller')*/}
            {/*  // setCategory('Micro-Controllers');*/}
            {/*}}>*/}
            {/*  <div className={`${searchInput === 'microcontroller' && 'text-tealHover'}`}>*/}
            {/*    Micro-Controller*/}
            {/*  </div>*/}
            {/*</Dropdown.Item>*/}
            {/*<Dropdown.Item className={"highlight-hover font-bold"} onClick={() => {*/}
            {/*  setSearchInput('arduino')*/}
            {/*  // setCategory('Arduino');*/}
            {/*}}>*/}
            {/*  <div className={`${searchInput === 'arduino' && 'text-tealHover'}`}>*/}
            {/*    Arduino*/}
            {/*  </div>*/}
            {/*</Dropdown.Item>*/}
            {/*<Dropdown.Item className={"highlight-hover font-bold"} onClick={() => {*/}
            {/*  setSearchInput('steam')*/}
            {/*  // setCategory('Steam');*/}
            {/*}}>*/}
            {/*  <div className={`${searchInput === 'steam' && 'text-tealHover'}`}>Steam*/}
            {/*  </div>*/}
            {/*</Dropdown.Item>*/}
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
            {items?.length === 0 && <div>No items found</div>}
          {items?.map((item, key) => {
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
};



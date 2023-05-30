import {Link, useNavigate, useParams} from "react-router-dom";
import React, {useContext, useEffect, useState} from "react";
import ProductContext from "../../context/ProductContext.jsx";
import CartContext from "../../context/CartContext.jsx";
import InvoiceContext from "../../context/InvoiceContext.jsx";
import {useAuthContext} from "../../context/AuthContext.jsx";
import Carousel from "react-multi-carousel";
import "react-multi-carousel/lib/styles.css";
import {ItemCardCarousel} from "../../components/CartComponents/ItemCardCarousel.jsx";
import {ProductReview} from "../../components/ProductReview.jsx";

export const ItemView = (props) => {
  let {id} = useParams();
  const {item, getItem, items, itemsQueryReFetch, reviewsQueryReFetch} = useContext(ProductContext);
  const {scrollTop} = useContext(InvoiceContext);
  useEffect(() => {
    getItem(id);
    itemsQueryReFetch();
    // reviewsQueryReFetch();
    scrollTop(0);
  }, []);

  const getType = () => {
    switch (item.type) {
      case 'sensor':
        return 'Sensor';
      case 'MicroController':
        return 'Micro-Controller';
    }
  }

  const responsive = {
    superLargeDesktop: {
      // the naming can be any, depends on you.
      breakpoint: {max: 4000, min: 3000},
      items: 7
    },
    desktop: {
      breakpoint: {max: 3000, min: 1024},
      items: 5
    },
    tablet: {
      breakpoint: {max: 1024, min: 464},
      items: 3
    },
    mobile: {
      breakpoint: {max: 464, min: 0},
      items: 2
    }
  };

  const {addToCart, cartItem} = useContext(CartContext);
  const {token} = useAuthContext();
  const itemCart = cartItem.find((i) => i.id === item.id);
  const currentQty = item.qty - (itemCart?.qty || 0);
  let navigate = useNavigate();
  return (
    <>
      <div className="w-[50%] flex items-center justify-between">
        <button onClick={() => {
          navigate(-1)
        }}>
          <img width="24" src="/assets/images/arrow-left.png" alt=""/>
        </button>
        <span className="font-bold text-xl">Product</span>
      </div>
      <section className="xl:px-48 mt-12 lg:flex lg:flex-row lg:justify-center lg:gap-x-12
        flex flex-col gap-6">
        {/*product image*/}
        <div className="xl:flex-grow-0 flex-1 flex items-center justify-center border-2 border-tealBase p-4">
          {(item?.image === null || item?.image === undefined)
            ? <img className="xl:min-w-[500px] xl:min-h-[500px]
              lg:max-w-[300px]
              object-contain"
                   src="/assets/images/makerio.png" alt={item.name}/>
            : <img
              className="xl:min-w-[500px] xl:min-h-[500px]
              lg:max-w-[300px]
              object-contain"
              src={`http://127.0.0.1:8000/${item.image}`} alt={item.name}/>
          }
        </div>
        {/*product description*/}
        <div
          className="xl:flex-grow-0 flex-1 flex flex-col xl:min-w-[500px] xl:min-h-[500px]
          lg:min-w-[300px] lg:text-lg shadow-2xl rounded-[20px] p-4 ">
          <div className="lg:text-lg md:text-base text-sm mb-2 font-bold text-blueBase">${item.price}</div>
          <div className="lg:text-lg md:text-base text-sm mb-2 font-bold text-tealBase">{item.name}</div>
          <div className="lg:text-lg md:text-base text-sm mb-2 text-blackFactory">Item Type: <span
            className={`font-semibold`}>{getType()}</span></div>
          <div
            className="lg:text-lg md:text-base text-sm mb-2 text-redBase font-bold">{currentQty === 0 ? "Out of Stock" : "In stock"}</div>

          {/*Description*/}
          <div className="sm:max-w-[80%] w-full">
            <p dangerouslySetInnerHTML={{__html: item.description}}
               className="lg:text-lg md:text-base text-sm mb-3 text-blackFactory"/>
          </div>
          <div className="mt-auto flex justify-end items-center">
            <button
              className={`${item.status === 0 && 'hidden'} rounded-[50%] px-1 py-1 hover:bg-tealActive active:bg-tealBase transition duration-300`}
              onClick={() => {
                if (token) {
                  addToCart(item, currentQty);
                }
              }}>
              <img className="md:w-12 w-10" src="/assets/images/cart-icon.png" alt=""/>
            </button>
          </div>
        </div>
      </section>

      {/*<ProductReview item={item}/>*/}
      {/*<div className="mt-16 mb-16">*/}
      {/*  <div className="mb-3 text-tealHover font-semibold">Related items</div>*/}
      {/*  <Carousel itemClass={'flex'} responsive={responsive}>*/}
      {/*    {*/}
      {/*      items.filter(itemFilter => itemFilter.type === item.type && itemFilter.id !== item.id)*/}
      {/*        .map((item, key) => {*/}
      {/*          return (*/}
      {/*            <ItemCardCarousel item={item} key={key}/>*/}
      {/*          )*/}
      {/*        })}*/}
      {/*  </Carousel>*/}
      {/*</div>*/}
    </>
  );
};

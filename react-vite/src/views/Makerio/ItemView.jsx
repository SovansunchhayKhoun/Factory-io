import {Link, useNavigate, useParams} from "react-router-dom";
import React, {Suspense, useContext, useEffect, useState} from "react";
import ProductContext from "../../context/ProductContext.jsx";
import CartContext from "../../context/CartContext.jsx";
import InvoiceContext from "../../context/InvoiceContext.jsx";
import {useAuthContext} from "../../context/AuthContext.jsx";
import Carousel from "react-multi-carousel";
import "react-multi-carousel/lib/styles.css";
import {ItemCardCarousel} from "../../components/CartComponents/ItemCardCarousel.jsx";
import {ProductReview} from "../../components/ProductReview.jsx";
import {Spinner} from "flowbite-react";

export const ItemView = (props) => {
  let {id} = useParams();
  const {item, getItem, items, itemsQueryReFetch, reviewsQueryReFetch, getType} = useContext(ProductContext);
  const {scrollTop} = useContext(InvoiceContext);
  useEffect(() => {
    getItem(id);
    itemsQueryReFetch();
    reviewsQueryReFetch();
    scrollTop(0);
  }, []);

  const responsive = {
    largeDesktop: {
      breakpoint: {max: 4000, min: 2560},
      items: 12
    },
    desktop: {
      breakpoint: {max: 2560, min: 1536},
      items: 6
    },
    xl: {
      // the naming can be any, depends on you.
      breakpoint: {max: 1536, min: 1280},
      items: 5
    },
    lg: {
      breakpoint: {max: 1280, min: 1024},
      items: 4
    },
    md: {
      breakpoint: {max: 1024, min: 768},
      items: 3
    },
    sm: {
      breakpoint: {max: 640, min: 0},
      items: 1
    }
  };

  const {addToCart, cartItem} = useContext(CartContext);
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
                lg:max-w-[500px]
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
            className={`font-semibold`}>{getType(item?.type?.toLowerCase())}</span></div>
          <div
            className="lg:text-lg md:text-base text-sm mb-2 text-redBase font-bold">{currentQty === 0 ? "Out of Stock" : "In stock"}</div>

          {/*Description*/}
          <div className="sm:max-w-[80%] w-full">
            <pre className="whitespace-pre-wrap lg:text-lg md:text-base text-sm mb-3 text-blackFactory font-Poppins">
              {item.description}
            </pre>
          </div>
          <div className="mt-auto flex justify-end items-center">
            <button
              className={`${item.status === 0 && 'hidden'} rounded-[50%] px-1 py-1 hover:bg-tealActive active:bg-tealBase transition duration-300`}
              onClick={() => {
                addToCart(item, currentQty);
              }}>
              <img className="md:w-12 w-10" src="/assets/images/cart-icon.png" alt=""/>
            </button>
          </div>
        </div>
      </section>
      <ProductReview item={item}/>
      <div className="mt-16">
        <div className="mb-6 text-tealHover font-semibold">Related items</div>
        <Carousel itemClass={'flex justify-center'} responsive={responsive}>
          {items?.filter(itemFilter => itemFilter.type === item.type && itemFilter.id !== item.id)
            .map((item, key) => {
              return (
                <ItemCardCarousel item={item} key={key}/>
              )
            })}
        </Carousel>
      </div>
    </>
  );
};

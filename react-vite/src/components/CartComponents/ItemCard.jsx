import {Link, useNavigate} from "react-router-dom";
import React, {useContext, useEffect, useState} from "react";
import CartContext from "../../context/CartContext.jsx";
import InvoiceContext from "../../context/InvoiceContext.jsx";
import {useAuthContext} from "../../context/AuthContext.jsx";
import {Tooltip} from "flowbite-react";
import ProductContext from "../../context/ProductContext.jsx";

export const ItemCard = (props) => {
  const navigate = useNavigate()
  const {name, price, id, image, status} = props.item;
  const {addToCart} = useContext(CartContext);
  const {setItem} = useContext(ProductContext)
  const {token} = useAuthContext()
  return (
    <>
      {/*cart-item */}
      <div className="flex justify-center">
        <div
          className="min-[1920px]:max-w-[300px] xl:max-w-[260px] lg:max-w-[250px] md:max-w-[250px] max-w-[260px] shadow-2xl border-2 border-tealActive p-6 flex flex-col items-center">
          <Link className="flex-1 text-center font-semibold" to={`/makerio/${id}`}>
            {name}
          </Link>
          <Link className="flex-2" to={`/makerio/${id}`}>
            {
              (image === null || image === undefined)
                ?
                <img className="hover:scale-75 ease-in-out duration-300 object-contain" src="/assets/images/makerio.png"
                     alt={name}/>
                : <img className="hover:scale-75 ease-in-out duration-300 object-contain"
                       src={`http://127.0.0.1:8000/${image}`} alt={name}/>
            }
          </Link>
          <div className="flex-1 flex flex-col items-center">
            <div className="mt-auto flex items-center">
              <div className="mr-3 font-bold text-[#00727A]">
                {price}$
              </div>
              <div className="mr-3 text-[#8A0000]">
                <span className="font-bold">
                  {status === 1 ? 'In Stock' : 'Out of Stock'}
                </span>
              </div>
              <Tooltip
                arrow={false}
                className="text-tealBase border-2 border-tealBase"
                content={props.item.tooltip && 'Item has been added to cart'}
                trigger="click"
                style="light"
                animation="duration-500"
              >
                <button
                  className={" rounded-[50%] px-1 py-1 hover:bg-tealActive active:bg-tealBase transition duration-300"}
                  onClick={() => {
                    addToCart(props.item);
                  }}>
                  <img width="36" src="/assets/images/cart-icon.png" alt=""/>
                </button>
              </Tooltip>

            </div>
          </div>
          {/*<div className="text-redBase text-sm">{!token &&*/}
          {/*  <Link className={'text-blueActive cursor-pointer font-semibold'} to="/signup"> Sign Up</Link>}</div>*/}
        </div>
      </div>

      {/*cart-item */}
    </>
  );
};

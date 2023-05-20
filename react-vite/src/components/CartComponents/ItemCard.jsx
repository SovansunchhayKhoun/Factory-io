import {Link, useNavigate} from "react-router-dom";
import React, {useContext, useEffect, useState} from "react";
import CartContext from "../../context/CartContext.jsx";
import InvoiceContext from "../../context/InvoiceContext.jsx";
import {useAuthContext} from "../../context/AuthContext.jsx";

export const ItemCard = (props) => {
  const {name, price, id, image, status} = props.item;
  let {qty} = props.item;
  const {cartItem, addToCart, cartError, setCartError} = useContext(CartContext);
  const itemCart = cartItem.find((i) => i.id === id);
  // const currentQty = qty - (itemCart?.qty || 0);
  const {token} = useAuthContext();
  useEffect(()=>{
    setCartError([]);
  }, [])
  return (
    <>
      {/*cart-item */}
      <div className="max-w-[270px] min-h-[350px] shadow-2xl border border-[#59C3CB] p-6 flex flex-col items-center">
        <Link className="flex-1 text-center font-semibold" to={"/maker-io/" + id}>
          {name}
        </Link>
        <Link className="flex-2" to={"/maker-io/" + id}>

          {
            (image === null || image === undefined)
              ? <img className="hover:scale-75 eas  e-in-out duration-300" src="/assets/images/makerio.png" alt={name}/>
              : <img className="hover:scale-75 ease-in-out duration-300" src={`http://127.0.0.1:8000/${image}`}
                     alt={name}/>
          }
        </Link>
        <div className="flex-1 flex">
          <div className="mt-auto flex items-center">
            <div className="mr-3 font-bold text-[#00727A]">
              {price}$
            </div>
            <div className="mr-3 text-[#8A0000]">
              <span className="font-bold">
                {/*{currentQty === 0 ? "Out of Stock" : "In Stock"}*/}
                {status === 1 ? 'In Stock' : 'Out of Stock'}
              </span>
            </div>
            <button
              className={`${props.item.status === 0 && 'hidden'} rounded-[50%] px-1 py-1 hover:bg-tealActive active:bg-tealBase transition duration-300`}
              onClick={() => {
                if(token) {
                  addToCart(props.item);
                } else if(!token) {
                  setCartError(['You need an account. Please'])
                }
              }}>
              <img width="36" src="/assets/images/cart-icon.png" alt=""/>
            </button>
          </div>
        </div>
        <div className="text-redBase text-sm">{cartError}{cartError.length !== 0 && !token &&
          <Link className={'text-blueActive cursor-pointer font-semibold'} to="/signup"> Sign Up</Link>}</div>
      </div>

      {/*cart-item */}
    </>
  );
};

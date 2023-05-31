import React, {useContext, useEffect, useState} from "react";
import {CartItem} from "../../components/CartComponents/CartItem.jsx";
import ProductContext from "../../context/ProductContext.jsx";
import {Payment} from "../../components/ui/Payment.jsx";
import CartContext from "../../context/CartContext.jsx";
import InvoiceContext from "../../context/InvoiceContext.jsx";
import {Link} from "react-router-dom";
import {useAuthContext} from "../../context/AuthContext.jsx";
import {GoogleMap} from "@react-google-maps/api";
import {GoogleMaps} from "../GoogleMaps.jsx";
import {AddressForm} from "../../components/AddressForm.jsx";

export const CartView = () => {
  const {cartItem, getCartItem} = useContext(CartContext);
  useEffect(() => {
    scrollTop(0);
    getCartItem();
    // itemsQueryReFetch();
  }, []);
  const {handleAddressChange, address, scrollTop} = useContext(InvoiceContext);
  const {itemsQueryReFetch} = useContext(ProductContext);
  const {user, token} = useAuthContext();

  if (token) {
    return (
      <>
        {/*<AddressForm />*/}
        <div className="w-full flex mb-3 justify-between">
          <div className="font-bold text-blueBase text-lg">Cart</div>
          <div className="flex flex-col w-[40%]">
            Test Address, Address for testing
            <input className="font-semibold bg-tealActive text-blackFactory px-3 py-2 rounded-md"
                   value={address.toString()} onChange={handleAddressChange}
                   placeholder={`#, Street, District, City, Country`}/>
            <span className="text-sm text-redBase">
                {cartItem.addressError}
            </span>
          </div>
        </div>
        {/*<div className="flex justify-between">*/}
        {/*</div>*/}
        <div className="flex flex-col gap-y-3 pb-6 border-b-2 border-tealActive mb-6">
          {cartItem.length === 0 && 'Empty Cart'}
          {cartItem.map((item, pos) => {
            if (item.id) {
              return (
                <CartItem key={pos} item={item}/>
              );
            }
          })}
        </div>
        <Link
          className={`${cartItem.length > 0 && 'hidden'} transition px-2 py-1 shadow-md shadow-blueBase duration-500 font-semibold text-blueActive cursor-pointer hover:text-whiteFactory hover:bg-blueBase`}
          to={'/maker-io'}>
          Browse product
        </Link>
        <div className={`${cartItem.length === 0 && 'hidden'}`}>
          <Payment/>
        </div>
      </>
    );
  } else {
    return (
      <div>
        <Link to={'/login'}>Sign in</Link>
        <Link to={'/signup'}>Sign Up</Link>
      </div>
    );
  }
};

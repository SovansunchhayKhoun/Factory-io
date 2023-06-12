import React, {useContext, useEffect, useState} from "react";
import {CartItem} from "../../components/CartComponents/CartItem.jsx";
import ProductContext from "../../context/ProductContext.jsx";
import {Payment} from "../../components/ui/Payment.jsx";
import CartContext from "../../context/CartContext.jsx";
import InvoiceContext from "../../context/InvoiceContext.jsx";
import {Link} from "react-router-dom";
import {useAuthContext} from "../../context/AuthContext.jsx";
import {GoogleMapsContext} from "../../context/GoogleMapsContext.jsx";

export const CartView = () => {
  const {cartItem, getCartItem} = useContext(CartContext);
  useEffect(() => {
    scrollTop(0);
    getCartItem();
  }, []);
  const {scrollTop, invoiceError} = useContext(InvoiceContext);

  const {token} = useAuthContext();
  const {handleAddressChange, address, setTempAddress, tempAddress} = useContext(GoogleMapsContext);
  useEffect(() => {
    cartItem.addressError = ''
    setTempAddress(address)
  }, [address])


  return (
    <div className={""}>
      {/*<AddressForm />*/}
      <div className="w-full flex md:flex-row md:gap-0 flex-col gap-y-3 md:mb-3 mb-6 justify-between">
        <div className="font-bold text-blueBase text-lg">Cart</div>
        <div className="flex flex-col
          xl:w-[50%]
          lg:w-[60%] lg:text-base
          md:w-[60%] md:text-xs">
          <input
            className={"ring-2 ring-tealHover font-semibold bg-tealActive text-blackFactory px-3 py-2 rounded-md"}
            value={cartItem.length > 0 ? tempAddress.toString() : ''}
            onChange={event => {
              handleAddressChange(event, cartItem)
            }}
            placeholder={`Enter your address`}/>
          <span className="text-sm text-redBase">{invoiceError && invoiceError?.address?.map(error => error)}</span>
        </div>
      </div>

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
    </div>
  );

  // if (token) {
  //
  // } else {
  //   return (
  //     <div>
  //       <Link to={'/login'}>Sign in</Link>
  //       <Link to={'/signup'}>Sign Up</Link>
  //     </div>
  //   );
  // }
};

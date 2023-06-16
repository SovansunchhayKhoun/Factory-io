import React, {useContext, useEffect, useState} from "react";
import {CartItem} from "../../components/CartComponents/CartItem.jsx";
import ProductContext from "../../context/ProductContext.jsx";
import {Payment} from "../../components/ui/Payment.jsx";
import CartContext from "../../context/CartContext.jsx";
import InvoiceContext from "../../context/InvoiceContext.jsx";
import {Link} from "react-router-dom";
import {useAuthContext} from "../../context/AuthContext.jsx";
import {GoogleMapsContext} from "../../context/GoogleMapsContext.jsx";
import {Dropdown} from "flowbite-react";

export const CartView = () => {
  const {cartItem, getCartItem} = useContext(CartContext);
  const {handleAddressChange, address, setTempAddress, tempAddress} = useContext(GoogleMapsContext);
  const {scrollTop, invoiceError} = useContext(InvoiceContext);
  useEffect(() => {
    getCartItem();
  }, []);

  useEffect(() => {
    setTempAddress(address)
  }, [address])

  return (
    <div>
      {/*<AddressForm />*/}
      <div className="w-full flex md:flex-row md:gap-0 flex-col gap-y-3 md:mb-3 mb-6 justify-between">
        <div className="font-bold text-blueBase text-lg">Cart</div>
        <div className="flex flex-col
          xl:w-[50%]
          lg:w-[60%] lg:text-base
          md:w-[60%] md:text-xs">
          <div className="flex">
            <div className="w-[205px]">
              <Dropdown style={{padding: 0, border: "none"}} label={'Select Address'}>
                <Dropdown.Item>
                  Address
                </Dropdown.Item>
              </Dropdown>
            </div>
            <div className="relative w-full">
              <input type="search" id="search-dropdown"
                     className={"w-full ring-2 ring-tealHover font-semibold bg-tealActive text-blackFactory px-3 py-2 rounded-md"}
                     value={cartItem.length > 0 ? tempAddress.toString() : ''}
                     onChange={event => handleAddressChange(event)}
                     placeholder="Enter your Address..." required/>
            </div>
          </div>
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
        to={'/makerio/shop'}>
        Browse product
      </Link>
      <div className={`${cartItem.length === 0 && 'hidden'}`}>
        <Payment/>
      </div>
    </div>
  );
};

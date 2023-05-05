import {useContext, useState} from "react";
import {CartItem} from "../components/CartItem.jsx";
import ProductContext from "../context/ProductContext.jsx";
import {Payment} from "../components/ui/Payment.jsx";

export const CartView = () => {
  // console.log(JSON.parse(localStorage.getItem('savedItem')));
  const {cartItem} = useContext(ProductContext);
  // const cartItem = JSON.parse(localStorage.getItem('savedItem')) ||  useContext(ProductContext) ;
  return (
    <main>
      <div className="flex justify-between mb-3">
        <div className="font-bold text-blueBase text-lg">Cart</div>
        <div className="w-[40%] font-semibold bg-tealActive text-blackFactory px-3 py-2 rounded-md">Address</div>
      </div>
      <div className="flex flex-col gap-y-3 pb-6 border-b-2 border-tealActive mb-12">
        {cartItem.length === 0 && 'Empty Cart'}
        {cartItem.map((item) => {
          if (item.id) {
            return (
              <CartItem key={item.id} name={item.name} price={item.price} id={item.id} qty={item.qty}/>
            );
          }
        })}
      </div>
      <Payment/>
    </main>
  );
};

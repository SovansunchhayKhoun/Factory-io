import {useContext, useEffect, useState} from "react";
import {CartItem} from "../../components/CartComponents/CartItem.jsx";
import ProductContext from "../../context/ProductContext.jsx";
import {Payment} from "../../components/ui/Payment.jsx";
import CartContext from "../../context/CartContext.jsx";
import InvoiceContext from "../../context/InvoiceContext.jsx";

export const CartView = () => {
  const {cartItem, getCartItem} = useContext(CartContext);
  const {invoiceError, handleAddressChange, address} = useContext(InvoiceContext);
  const {getItems} = useContext(ProductContext);

  useEffect(() => {
    getCartItem();
    getItems();
  }, []);
  return (
    <main>
      <div className="flex justify-between mb-3">
        <div className="font-bold text-blueBase text-lg">Cart</div>
        <div className="w-[40%] flex flex-col">
          Test Address, Address for testing
          <input className="font-semibold bg-tealActive text-blackFactory px-3 py-2 rounded-md" value={address} onChange={handleAddressChange} placeholder={`${address ?? "#, Street, District, City, Country"}`}/>
          <span className="text-sm text-redBase">
            {invoiceError.address}
          </span>
        </div>
      </div>
      <div className="flex flex-col gap-y-3 pb-6 border-b-2 border-tealActive mb-6">
        {cartItem.length === 0 && 'Empty Cart'}
        {cartItem.map((item) => {
          if (item.id) {
            return (
              <CartItem key={item.id} item={item}/>
            );
          }
        })}
      </div>
      <Payment/>
    </main>
  );
};

import React, {useContext, useState} from "react";
import ProductContext from "../../context/ProductContext.jsx";
import {Link} from "react-router-dom"
import CartContext from "../../context/CartContext.jsx";
import InvoiceContext from "../../context/InvoiceContext.jsx";
import UserContext from "../../context/UserContext.jsx";
import {useAuthContext} from "../../context/AuthContext.jsx";
export const CartItem = (props) => {
  const {item} = props;
  const {items} =useContext(ProductContext);
  const {increaseItemQty, decreaseItemQty, cartItem, setCartItem, saveLocalCartItem} = useContext(CartContext);
  const stockItem = items?.find((i) => i.id === item.product_id);
  const {token} = useAuthContext();
  if(token) {
    return (
      <div className="px-12 py-3 flex items-center justify-between border-2 border-tealActive shadow-2xl">
        <div className="flex items-center gap-x-6">
          <div>
            {
              (item.image === null || item.image === undefined)
                ? <img className="w-[150px]" src="/assets/images/makerio.png" alt={item.name}/> :
                <img className="w-[150px]" src={`http://127.0.0.1:8000/${item.image}`} alt={item.name}/>
            }
            {/*<img width="150" src={`/assets/images/${stockItem?.image ?? 'makerio.png'}`} alt=""/>*/}
          </div>
          <div>
            <div className="mb-1 font-bold text-blueBase">${item.price}</div>
            <Link to={`/maker-io/${item.id}`}>
              <div className="highlight-hover transition duration-150 mb-1 text-tealHover font-bold">{item.name}</div>
            </Link>
            <div className="mb-1 text-blackFactory">Item Type: Arduino</div>
            <div className="mb-1 flex items-center gap-x-2">
              <button className="transition duration-150 px-3 py-1 hover:rounded-[50%] hover:bg-whiteFactory active:bg-grayFactory" onClick={() => {
                decreaseItemQty(item)
              }}>-
              </button>
              <span className="py-1 text-center border-[0.13rem] border-tealActive text-sm w-8">
                {item.qty}
              </span>
              <button className="transition duration-150 px-3 py-1 hover:rounded-[50%] hover:bg-whiteFactory active:bg-grayFactory" onClick={() => {
                increaseItemQty(item)
              }}>+
              </button>
            </div>
            <p><span className="underline underline-offset-2">Sub-total:</span> <span className="font-bold text-redBase">${item.qty*item.price}</span></p>
            <p className="text-redBase text-xs">
              {item.errorStatus}
            </p>
          </div>
        </div>
        <div>
          <button onClick={() =>{
            cartItem.splice(cartItem.indexOf(item), 1);
            saveLocalCartItem(cartItem);
            setCartItem([...cartItem]);
          }}>
            <img width="18" src="/assets/images/trashcan.png" alt=""/>
          </button>
        </div>
      </div>
    );
  }
};

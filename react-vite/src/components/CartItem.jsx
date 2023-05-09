import {useContext, useState} from "react";
import ProductContext from "../context/ProductContext.jsx";
import {Link} from "react-router-dom"
import CartContext from "../context/CartContext.jsx";
export const CartItem = (props) => {
  const {item} = props;
  const {increaseItemQty, decreaseItemQty, cartItem, setCartItem, saveLocalCartItem, error, setError} = useContext(CartContext);
  return (
    <div className="px-12 py-3 flex items-center justify-between border-2 border-tealActive shadow-2xl">
      <div className="flex items-center gap-x-6">
        <div>
          <img width="150" src="/assets/images/item1.png" alt=""/>
        </div>
        <div>
          <div className="mb-1 font-bold text-blueBase">${item.price}</div>
          <Link to={`/maker-io/${item.id}`}>
            <div className="highlight-hover transition duration-150 mb-1 text-tealHover font-bold">{item.name}, {item.cart_item_price}</div>
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
};

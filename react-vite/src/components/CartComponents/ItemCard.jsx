import {Link, useNavigate} from "react-router-dom";
import {useContext, useEffect, useState} from "react";
import CartContext from "../../context/CartContext.jsx";
import InvoiceContext from "../../context/InvoiceContext.jsx";

export const ItemCard = (props) => {
  const {name, price, status, id, errorStatus} = props.item;
  let {qty} = props.item;
  const {cartItem, addToCart} = useContext(CartContext);
  const itemCart = cartItem.find((i) => i.id === id);
  const currentQty = qty - (itemCart?.qty || 0);

  return (
    <>
      {/*cart-item */}
      <div className="shadow-2xl border border-[#59C3CB] p-6 flex flex-col items-center">
        <div className="font-semibold">
          {name}
        </div>
        <Link to={"/maker-io/" + id}>
          <div className="">
            <img className="hover:scale-75 ease-in-out duration-300 " src="/assets/images/item1.png" alt=""/>
          </div>
        </Link>
        <div className="flex items-center">
          <div className="mr-3 font-bold text-[#00727A]">
            {price}$
          </div>
          <div className="mr-3 text-[#8A0000]">
            <span className="font-bold">
              {currentQty === 0 ? "Out of Stock" : "In Stock"}
            </span>
          </div>
          <button className={currentQty === 0 ? "hidden" : " rounded-[50%] px-1 py-1 hover:bg-tealActive active:bg-tealBase transition duration-300"}
                  onClick={() => {
                    addToCart(props.item, currentQty);
                  }}>
            <img width="36" src="/assets/images/cart-icon.png" alt=""/>
          </button>
        </div>
      </div>
      {/*cart-item */}
    </>
  );
};

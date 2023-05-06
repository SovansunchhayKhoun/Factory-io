import {Link, useNavigate} from "react-router-dom";
import {useContext, useEffect, useState} from "react";
import ProductContext from "../context/ProductContext.jsx";

export const ItemCard = (props) => {
  const {name, price, status, type, id, qty} = props.item;
  const {storeItem} = useContext(ProductContext);
  return (
    <>
      {/*card-item */}
      <div className="shadow-2xl border border-[#59C3CB] p-6 flex flex-col items-center">
        <div className="font-semibold">
          {name}
        </div>
        <Link to={"/maker-io/" + id}>
          <div>
            <img src="/assets/images/item1.png" alt=""/>
          </div>
        </Link>
        <div className="flex items-center">
          <div className="mr-3 font-bold text-[#00727A]">
            {price}$
          </div>
          <div className="mr-3 text-[#8A0000]">
            <span className="font-bold">{status}</span>
          </div>
          <button onClick={() => storeItem(props.item)}>
            <img width="36" src="/assets/images/cart-icon.png" alt=""/>
          </button>
        </div>
      </div>
      {/*card-item */}
    </>
  );
};

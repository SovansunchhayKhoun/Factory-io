import {Link, useNavigate} from "react-router-dom";
import {useContext, useEffect, useState} from "react";
import ProductContext from "../context/ProductContext.jsx";
import {AddCartButton} from "./ui/AddCartButton.jsx";

export const ItemCard = (props) => {
  let navigate = useNavigate();
  const {name, price, id, qty} = props.item;
  const {storeItem} = useContext(ProductContext);
  // console.log(`id: ${id} qty${qty}`);

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
            {qty}
          </div>
          <div>
            <AddCartButton item={props.item}/>
          </div>
        </div>
      </div>
      {/*card-item */}
    </>
  );
};

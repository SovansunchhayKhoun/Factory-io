import {Link} from "react-router-dom";
import React, {useContext} from "react";
import CartContext from "../../context/CartContext.jsx";

export const PendingItem = (props) => {
  const {invoice_product, id, date, status} = props.invoice
  return (
    <>
      {invoice_product.map((inv_prd) => {
        const {products} = inv_prd;
        const {image, name, price} = products[0];
        return (
          <>
            <div
              className="min-h-[150px] px-12 py-3 flex mb-3 items-center justify-between border-2 border-tealActive shadow-2xl">
              <div className="flex items-center gap-x-6">
                <div className="max-w-[100px]">
                  {/*<img src={`/assets/images/${image}`} alt=""/>*/}
                  {
                    (image === null || image === undefined)
                      ? <img src="/assets/images/makerio.png" alt={name}/>
                      :<img src={`http://127.0.0.1:8000/${image}`} alt={name}/>
                  }
                </div>
                <div>
                  <Link to={`/maker-io/${products[0].id}`}>
                    <div className="highlight-hover transition duration-150 mb-1 text-tealHover font-bold">{name} <sup className={`text-[13px] font-bold text-blueActive`}>x{inv_prd.qty}</sup></div>
                  </Link>
                  <div className="mb-1 text-blackFactory font-semibold">Order date: <span
                    className="font-normal">{date}</span></div>
                  <div
                    className={`${status === -1 && 'text-redBase'} ${status === 1 && 'text-green-600'} ${status === 2 && 'text-tealBase'} mb-1 font-semibold text-blackFactory`}>
                    {status === -1 && 'Pending'}
                    {status === 1 && 'Accepted'}
                    {status === 2 && 'Delivering'}
                  </div>
                </div>
              </div>
              <div>
                <span className="underline underline-offset-2">Sub-total:</span>
                <span className="font-bold text-redBase"> ${inv_prd.qty * price}</span>
              </div>
            </div>
          </>
        );
      })}
    </>
  );
};

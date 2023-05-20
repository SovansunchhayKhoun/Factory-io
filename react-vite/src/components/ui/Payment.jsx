import {useContext, useState} from "react";
import CartContext from "../../context/CartContext.jsx";
import InvoiceContext from "../../context/InvoiceContext.jsx";
import ProductContext from "../../context/ProductContext.jsx";
import {useAuthContext} from "../../context/AuthContext.jsx";
import CheckoutButton from "../Modals/CheckoutButton.jsx";
import {Link} from "react-router-dom";
import * as React from "react";

export const Payment = (props) => {
  const {totalPrice, cartError} = useContext(CartContext);
  const {invoiceError} = useContext(InvoiceContext);
  const options = [
    {value: '1', text: 'ABA - $$$'},
    {value: '2', text: 'ABA - KHR'},
  ];
  const [selected, setSelected] = useState(1);
  const handleChange = event => {
    setSelected(Number(event.target.value));
  };
  return (
    <>
      <div className="flex flex-col items-end px-6">
        <div>
          <span className="underline underline-offset-[2px]">Exchange Rate:</span> <span
          className="font-bold text-grayFactory">&#x17DB;{(4100).toString().replace(/\B(?=(\d{3})+(?!\d))/g, ",")}</span>
        </div>
        <div className="text-end mb-6">Total: <span
          className="font-bold text-blueActive">${totalPrice.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ",")} </span>
          <span
            className="font-bold text-tealBase">| &#x17DB;{(totalPrice * 4100).toString().replace(/\B(?=(\d{3})+(?!\d))/g, ",")}</span>
        </div>
      </div>
      <div className="flex justify-between items-center bg-tealActive py-12 px-48">
        <div className="flex">
          <div className="flex flex-col mr-6">
            <h1 className="tracking-wider text-whiteFactory font-bold text-[24px]">Payment</h1>
            <select
              value={selected}
              onChange={handleChange}
              className="bg-whiteFactory py-[2px] rounded-sm w-full text-blackFactory text-center font-bold"
              name=""
              id="">
              {options.map((option) => {
                return (
                  <option key={option.value} value={option.value}>
                    {option.text}
                  </option>
                );
              })}
            </select>
          </div>
          {selected === 1 &&
            <img className={`object-contain w-[200px] h-[200px]`} src="/assets/images/qr-dollars.jpg" alt=""/>}
          {selected === 2 &&
            <img className={`object-contain w-[200px] h-[200px]`} src="/assets/images/qr-riel.jpg" alt=""/>}
        </div>
        <div className="flex flex-col">
          <p className="font-bold text-[#D9D9D9]">
            Submit Screenshot
          </p>
          <label className="text-center text-xs font-bold text-[#989A9C] bg-whiteFactory py-1">
            Select Image
            <input type="file" id="files" className="opacity-0 w-[50%]"/>
          </label>
        </div>
      </div>
      <div className="flex justify-between px-12 mt-6 ">
        <Link
          className={`transition px-2 py-1 shadow-md shadow-blueBase duration-500 font-semibold text-blueActive cursor-pointer hover:text-whiteFactory hover:bg-blueBase`}
          to={'/maker-io'}>
          Browse product
        </Link>
        <div className="flex items-center gap-x-2">
          <div className="text-redBase">{invoiceError}{cartError}</div>
          <CheckoutButton/>
        </div>
      </div>
    </>
  );
};

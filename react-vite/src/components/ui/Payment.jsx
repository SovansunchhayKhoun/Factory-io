import {useContext, useState} from "react";
import CartContext from "../../context/CartContext.jsx";
import InvoiceContext from "../../context/InvoiceContext.jsx";
import ProductContext from "../../context/ProductContext.jsx";
import {useAuthContext} from "../../context/AuthContext.jsx";
import CheckoutButton from "../Modals/CheckoutButton.jsx";
import {Link} from "react-router-dom";
import * as React from "react";
import {GoogleMaps} from "../../views/GoogleMaps.jsx";
import {Card} from "flowbite-react";

export const Payment = (props) => {
  const {totalPrice, cartError} = useContext(CartContext);
  const {invoiceError, setPaymentPic, paymentPic} = useContext(InvoiceContext);
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
      {/*google map and exchange rate ui*/}
      <div className="2xl:px-48 xl:px-24 lg:px-20 md:px-12 md:flex justify-between md:mb-12">
        <div className="md:w-[50%] w-full md:mb-0 mb-3">
          <GoogleMaps height={250}/>
        </div>
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
      </div>
      {/*payment ui*/}
      <div className="md:flex md:flex-row md:justify-between md:items-center bg-tealActive
        2xl:px-48 xl:px-24 lg:px-20 md:px-12 md:py-6
        overflow-hidden py-6 flex flex-col gap-2 items-center">
        <div className="lg:flex lg:flex-row
          md:flex md:flex-col md:gap-y-3 md:items-center flex flex-col items-center">
          {/*payment method selection*/}
          <div className="lg:flex lg:flex-col lg:mr-6
            md:flex md:flex-row md:gap-x-2
            flex gap-x-2 items-center
            ">
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
          {/*payment method selection*/}
          {selected === 1 &&
            <img className={`object-contain w-[200px] h-[200px] md:mt-0 mt-2`} src="/assets/images/qr-dollars.jpg"
                 alt=""/>}
          {selected === 2 &&
            <img className={`object-contain w-[200px] h-[200px] md:mt-0 mt-2`} src="/assets/images/qr-riel.jpg"
                 alt=""/>}
        </div>

        <div className="flex flex-col md:px-0 gap-2">
          <div className="flex items-center gap-2">
            <label htmlFor="files" className="cursor-pointer font-bold text-[#D9D9D9]">
              Submit Screenshot
            </label>
            {paymentPic && <button className="" onClick={() => {
              setPaymentPic('')
            }}><img className="w-[20px] h-[20px]" src="/assets/images/trashcan.png" alt=""/></button>}
          </div>
          <div className="xl:flex xl:flex-col lg:flex lg:flex-col flex flex-col gap-2">
            <input className='md:inline-block hidden' type="file" id="files" accept="image/*"
                   onChange={(e) => setPaymentPic(e.target.files[0])}/>
            {paymentPic && (
              <>
                <div className="flex gap-x-2">
                  <img className="md:max-w-[250px] max-w-[220px] object-contain" src={URL.createObjectURL(paymentPic)} alt=""/>
                </div>
              </>
            )}
          </div>
        </div>
      </div>

      <div className="flex justify-between sm:px-12 mt-6 ">
        <Link
          className={`transition px-2 py-1 shadow-md shadow-blueBase duration-500 font-semibold text-blueActive text-center cursor-pointer hover:text-whiteFactory hover:bg-blueBase`}
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

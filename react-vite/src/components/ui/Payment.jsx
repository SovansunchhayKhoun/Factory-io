import {useContext} from "react";
import CartContext from "../../context/CartContext.jsx";
import InvoiceContext from "../../context/InvoiceContext.jsx";
import ProductContext from "../../context/ProductContext.jsx";
import {useAuthContext} from "../../context/AuthContext.jsx";
import CheckoutButton from "../Modals/CheckoutButton.jsx";

export const Payment = () => {
  // const {updateProduct} = useContext(ProductContext);
  const {cartItem, checkOut, totalPrice, cartError, success} = useContext(CartContext);
  // const {invoices, storeInvoice, invoiceError, latestInvoice} = useContext(InvoiceContext);
  const {storeInvoice, error} = useContext(InvoiceContext);
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
            <select className="bg-whiteFactory py-[2px] rounded-sm w-full text-blackFactory text-center font-bold"
                    name=""
                    id="">
              <option value="">ABA - $$$</option>
              <option value="">ABA - KHR</option>
            </select>
          </div>
          <img className="object-cover w-[200px] h-[200px]" src="/assets/images/qr-sample.jpg" alt=""/>
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
      <div className="flex justify-between mt-6 ">
        <div className="text-redBase">{error}{cartError}</div>
        <div>
          {/*<button*/}
          {/*  className={`transition duration-300 hover:shadow-tealBase hover:shadow-[5px_-2px_10px_-1px] bg-redHover text-[18px] text-whiteFactory px-4 py-1 rounded-[20px]`}*/}
          {/*  onClick={() => {*/}
          {/*    storeInvoice(totalPrice);*/}
          {/*    cartItem.forEach((item) => {*/}
          {/*      checkOut(item);*/}
          {/*      // updateProduct(item);*/}
          {/*    });*/}
          {/*  }}>Check out*/}
          {/*</button>*/}
          <CheckoutButton />
        </div>
      </div>
    </>
  );
};

import {useContext} from "react";
import CartContext from "../../context/CartContext.jsx";
import InvoiceContext from "../../context/InvoiceContext.jsx";
import ProductContext from "../../context/ProductContext.jsx";
import {useAuthContext} from "../../context/AuthContext.jsx";

export const Payment = () => {
  const {updateProduct} = useContext(ProductContext);
  const {cartItem, checkOut, totalPrice, error} = useContext(CartContext);
  // const {invoices, storeInvoice, invoiceError, latestInvoice} = useContext(InvoiceContext);
  const {storeInvoice} = useContext(InvoiceContext);
  // console.log(invoices);
  return (
    <>
      <div className="flex justify-between items-center bg-tealActive py-12 px-48">
        <div className="flex">
          <div className="flex flex-col mr-6">
            <h1 className="tracking-wider text-whiteFactory font-bold text-[24px]">Payment</h1>
            <select className="bg-[#D9D9D9] py-[2px] rounded-sm w-full text-blackFactory text-center font-bold" name=""
                    id="">
              <option value="">ABA</option>
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
      <div className="flex justify-between mt-3 mb-3">
        <div>Total: <span className="font-bold text-redBase">${totalPrice}</span></div>
        <button onClick={() => {
          storeInvoice(totalPrice);
          cartItem.forEach((item) => {
            checkOut(item);
            updateProduct(item);
          });
        }} className="bg-redHover text-whiteFactory px-3 py-1 rounded-[20px]">Check out</button>
      </div>
      <div className="font-bold text-green-500">
        {error}
        {/*{invoiceError}*/}
      </div>
    </>
  );
};

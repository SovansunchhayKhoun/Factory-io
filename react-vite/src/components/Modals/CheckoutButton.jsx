import * as React from 'react';
import Box from '@mui/material/Box';
import Button from '@mui/material/Button';
import Typography from '@mui/material/Typography';
import Modal from '@mui/material/Modal';
import {useContext, useEffect} from "react";
import CartContext from "../../context/CartContext.jsx";
import InvoiceContext from "../../context/InvoiceContext.jsx";
import {useAuthContext} from "../../context/AuthContext.jsx";

const style = {
  display: "flex",
  flexDirection: "column",
  position: 'absolute',
  top: '50%',
  left: '50%',
  transform: 'translate(-50%, -50%)',
  // width: 400,
  backgroundColor: 'background.paper',
  border: '2px solid #000',
  boxShadow: 24,
  p: 4,
}

export default function CheckoutButton() {
  const {cartItem, getCartItem, checkOut, totalPrice, success, setSuccess} = useContext(CartContext);
  const {storeInvoice, invoices} = useContext(InvoiceContext);
  const {user} = useAuthContext();

  useEffect(() => {
    getCartItem();
  }, []);

  return (
    <div>
      <button
        className={`transition duration-300 hover:shadow-tealBase hover:shadow-[5px_-2px_10px_-1px] bg-redHover text-[18px] text-whiteFactory px-4 py-1 rounded-[20px]`}
        onClick={() => {
          setSuccess(true);
        }}>Check out
      </button>
      <Modal
        open={success}
        // onClose={setSuccess(false)}
        aria-labelledby="modal-modal-title"
        aria-describedby="modal-modal-description"
      >
        <Box sx={style}>
          <Typography id="modal-modal-title" variant="h6" component="h2">
            Your order is being processed
          </Typography>
          <Typography id="modal-modal-description" sx={{mt: 2}}>
            <div className="text-blackFactory mt-3  mb-3 font-semibold">
              <div className="px-2">
                <div className="flex justify-between mb-3">
                  <div className="font-bold">Order ID: {cartItem[0]?.invoice_id}</div>
                  <div className="text-tealActive">
                    {/*{invoice.status === -1 ? 'Pending' : 'Arrived'}*/}
                  </div>
                </div>
                <div className="flex flex-col pr-12 gap-2 mb-3">
                  {/*<div>Order Date:*/}
                  {/*  {cartItem[0].date}*/}
                  {/*</div>*/}
                  <div>Phone Number:
                    {user?.phoneNumber}
                    {/*{invoice.user[0].phoneNumber}*/}
                  </div>
                  <div>Username:
                    {user?.username}
                  </div>
                  {/*<div className={`bg-[#D9D9D9] px-2 py-1 rounded-lg`}>Address:*/}
                  {/*  /!*{.address}*!/*/}
                  {/*</div>*/}
                </div>
              </div>
              <div className={`flex mb-3 gap-x-6`}>
                <div className="flex-2">Item
                  {cartItem?.map((i) => <div className="whitespace-nowrap">{i.name}</div>)}
                </div>
                <div>Type
                  {cartItem?.map((i) => <div className="whitespace-nowrap">{i.type}</div>)}
                </div>
                <div>Qty
                  {cartItem?.map((i) => <div className="whitespace-nowrap">{i.qty}</div>)}
                </div>
                <div>Price
                  {cartItem?.map((i) => <div className="whitespace-nowrap">${i.price}</div>)}
                </div>
                <div>Total
                  {cartItem?.map((i) => <div className="whitespace-nowrap">${i.cart_item_price}</div>)}
                </div>
              </div>
              <hr className="border-b-1 border-blackFactory rounded-lg"/>
              <div className={`accordion-item-body`}>
                <div>Grand Total</div>
                <div></div>
                {/* for Grid*/}
                <div></div>
                {/* for Grid*/}
                <div></div>
                {/* for Grid*/}
                <div>
                  ${totalPrice}
                </div>
              </div>
            </div>
            <div className="flex gap-x-3 justify-center mt-3">
              <button
                className={`transition duration-500 bg-tealActive text-whiteFactory px-1 py-2 min-w-[150px] rounded-md hover:bg-tealHover/80 active:bg-tealActive`}
                onClick={() => {
                  setSuccess(false)
                  storeInvoice(totalPrice);
                  cartItem.forEach((item) => {
                    checkOut(item);
                    // updateProduct(item);
                  });
                  console.log(cartItem)
                }}>OK
              </button>
              <button
                className={`transition duration-500 bg-redBase text-whiteFactory px-1 py-2 min-w-[150px] rounded-md hover:bg-redHover active:bg-redActive`}
                onClick={() => {
                  setSuccess(false)
                }}>Cancel
              </button>
            </div>
          </Typography>
        </Box>
      </Modal>
    </div>
  );
}

import * as React from 'react';
import Box from '@mui/material/Box';
import Button from '@mui/material/Button';
import Typography from '@mui/material/Typography';
import Modal from '@mui/material/Modal';
import {useContext, useEffect, useState} from "react";
import CartContext from "../../context/CartContext.jsx";
import InvoiceContext, {InvoiceProvider} from "../../context/InvoiceContext.jsx";
import {useAuthContext} from "../../context/AuthContext.jsx";
import {AccordionBodyContent} from "../AdminComponents/AccordionBodyContent.jsx";
import ProductContext from "../../context/ProductContext.jsx";
import {Spinner} from "flowbite-react";
import InvoiceProductContext from "../../context/InvoiceProductContext.jsx";
import {Link} from "react-router-dom";

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
  const {storeInvoice, address, setAddress} = useContext(InvoiceContext);
  const {user} = useAuthContext();

  const [loadingSuccess, setLoadingSuccess] = useState(false);

  useEffect(() => {
    getCartItem();
  }, []);

  if (loadingSuccess) {
    return (
      <>
        <Spinner
          size="xl"
          color="purple"
          aria-label="Purple spinner example"
        />
      </>
    );
  }
  if (cartItem.length > 0) {
    return (
      <div>
        <div className="flex gap-x-2">
          <Link className={`transition px-2 py-1 shadow-md shadow-blueBase duration-500 font-semibold text-blueActive cursor-pointer hover:text-whiteFactory hover:bg-blueBase`} to={'/maker-io'}>
            Browse product
          </Link>
          <button
            className={`transition duration-500 hover:shadow-blueBase hover:shadow-md bg-redHover text-[18px] text-whiteFactory px-4 py-1 rounded-[20px]`}
            onClick={() => {
              totalPrice > 0 && setSuccess(true);
            }}>Check out
          </button>
        </div>
        <Modal
          open={success}
          // onClose={setSuccess(false)}
          aria-labelledby="modal-modal-title"
          aria-describedby="modal-modal-description">
          <Box sx={style}>
            <Typography id="modal-modal-title" variant="h6" component="h2">
              Are you sure to proceed order?
            </Typography>
            <Typography id="modal-modal-description" sx={{mt: 2}}>
              <div className="text-blackFactory  mb-3 font-semibold">
                <div className="flex flex-col pr-12 gap-2 mb-3">
                  <div>Phone Number:
                    {user?.phoneNumber}
                  </div>
                  <div>Username:
                    {user?.username}
                  </div>
                  <div className={`bg-[#D9D9D9] px-2 py-1 rounded-lg`}>Address:
                    {address}
                  </div>
                </div>
                <div className={`flex mb-3 gap-x-6`}>
                  <div className="flex-2">Item
                    {cartItem?.map((i) => <div key={i.product_id} className="whitespace-nowrap">{i.name}</div>)}
                  </div>
                  <div>Type
                    {cartItem?.map((i) => <div key={i.product_id} className="whitespace-nowrap">{i.type}</div>)}
                  </div>
                  <div>Qty
                    {cartItem?.map((i) => <div key={i.product_id} className="whitespace-nowrap">{i.qty}</div>)}
                  </div>
                  <div>Price
                    {cartItem?.map((i) => <div key={i.product_id} className="whitespace-nowrap">${i.price}</div>)}
                  </div>
                  <div>Total
                    {cartItem?.map((i) => <div key={i.product_id}
                                               className="whitespace-nowrap">${i.cart_item_price}</div>)}
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
                    if (cartItem.length > 0) {
                      setSuccess(false);
                      storeInvoice(totalPrice, cartItem, checkOut, setLoadingSuccess);
                    }
                  }}>Confirm
                </button>
                <button
                  className={`transition duration-500 bg-redBase text-whiteFactory px-1 py-2 min-w-[150px] rounded-md hover:bg-redHover active:bg-redActive`}
                  onClick={() => {
                    setSuccess(false)
                  }}>Cancel
                </button>
              </div>
              <p className="text-xs text-grayFactory text-center mt-3">
                *Once order is accepted, you cannot cancel it
              </p>
            </Typography>
          </Box>
        </Modal>
      </div>
    );
  }
}

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
import {Link, useNavigate} from "react-router-dom";
import AdminPopUp from "./AdminPopUp.jsx";
import {AccordionHeader} from "@material-tailwind/react";
import {AccordionHeaderContent} from "../AdminComponents/AccordionHeaderContent.jsx";

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
  const {storeInvoice, address, paymentPic} = useContext(InvoiceContext);
  const {user, token} = useAuthContext();
  const [loadingSuccess, setLoadingSuccess] = useState(false);
  const [modalOpen, setModalOpen] = useState(false);

  useEffect(() => {
    getCartItem();
  }, []);

  const TickComponent = () => {
    return (
      <>
        <img src="/assets/images/icons8-tick.gif" alt=""/>
      </>
    );
  }

  const Content = () => {
    return (
      <>
        <div className={`bg-white w-[400px] h-[400px] flex justify-center ${!loadingSuccess && 'items-center'}`}>
          {!loadingSuccess && <Spinner
            size="xl"
            color="purple"
            aria-label="Purple spinner example"
          />}
          {loadingSuccess && (
            <>
              <div className="grid grid-rows-3 p-12">
                <div className="mb-auto mx-auto">
                  <img width={150} src="/assets/images/makerio.png" alt=""/>
                </div>
                <div className="flex flex-col justify-center items-center">
                  <TickComponent/>
                  <div className="font-semibold text-blueBase">
                    Thanks for your order
                  </div>
                </div>
                <div className="mt-auto">
                  <p className="text-xs text-grayFactory text-center mb-3">
                    *Press confirm to ensure that your order will reach us
                  </p>
                  <button onClick={() => {
                    setModalOpen(false)
                    cartItem.forEach((item) => {
                      checkOut(item);
                    })
                  }} className="w-full transition duration-500 bg-blueBase text-whiteFactory px-2 py-1 rounded-md hover:bg-blueActive active:bg-bluehover">
                    Confirm
                  </button>
                </div>
              </div>
            </>
          )}
        </div>
      </>
    )
  }

  if (cartItem.length > 0) {
    return (
      <>
        <div>
          <button
            className={`transition duration-500 hover:shadow-blueBase hover:shadow-md bg-redHover text-[18px] text-whiteFactory px-4 py-1 rounded-[20px]`}
            onClick={() => {
              totalPrice > 0 && setSuccess(true);
            }}>Check out
          </button>
          <AdminPopUp modalOpen={modalOpen} setModalOpen={setModalOpen} content={<Content/>} id={100}/>
          <Modal
            open={success}
            // onClose={setSuccess(false)}
            aria-labelledby="modal-modal-title"
            aria-describedby="modal-modal-description">
            <Box sx={style}>
              <Typography id="modal-modal-title" variant="h6" component="h2">
                Are you sure to proceed order?
              </Typography>
              <Typography component={'div'} id="modal-modal-description" sx={{mt: 2}}>
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
                      {cartItem?.map((i, pos) => <div key={pos} className="whitespace-nowrap">{i.name}</div>)}
                    </div>
                    <div>Type
                      {cartItem?.map((i, pos) => <div key={pos} className="whitespace-nowrap">{i.type}</div>)}
                    </div>
                    <div>Qty
                      {cartItem?.map((i, pos) => <div key={pos} className="whitespace-nowrap">{i.qty}</div>)}
                    </div>
                    <div>Price
                      {cartItem?.map((i, pos) => <div key={pos} className="whitespace-nowrap">${i.price}</div>)}
                    </div>
                    <div>Total
                      {cartItem?.map((i, pos) => <div key={pos}
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
                    onClick={(e) => {
                      if (token) {
                        if (cartItem.length > 0) {
                          e.stopPropagation();
                          setModalOpen(true);
                          setLoadingSuccess(false);
                          setSuccess(false);
                          storeInvoice(totalPrice, cartItem, checkOut, paymentPic, setModalOpen, setLoadingSuccess);
                          // cartItem.forEach((item) => {
                          //   checkOut(item);
                          // })
                        }
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
      </>

    );
  }
}

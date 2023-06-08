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
import {GoogleMapsContext} from "../../context/GoogleMapsContext.jsx";

const style = {
  display: "flex",
  flexDirection: "column",
  position: 'absolute',
  top: '50%',
  left: '50%',
  transform: 'translate(-50%, -50%)',
  backgroundColor: 'background.paper',
  border: '2px solid #000',
  boxShadow: 24,
  p: 2,
}

export default function CheckoutButton() {
  const {getType} = useContext(ProductContext);
  const {cartItem, getCartItem, checkOut, totalPrice, success, setSuccess} = useContext(CartContext);
  const {paymentPic, setPaymentPic, scrollTop, validateInvoice} = useContext(InvoiceContext);
  const {tempAddress, address} = useContext(GoogleMapsContext);
  const {user, token} = useAuthContext();
  const [modalOpen, setModalOpen] = useState(false);


  useEffect(() => {
    getCartItem();
    scrollTop(0);
  }, []);

  const navigate = useNavigate();
  if (cartItem.length > 0) {
    return (
      <>
        <div>
          <button
            className={` transition duration-500 hover:shadow-blueBase hover:shadow-md bg-redHover text-[18px] text-whiteFactory px-4 py-1 rounded-[20px]`}
            onClick={() => {
              token ? totalPrice > 0 && setModalOpen(true) : navigate('/login');
            }}>
            Check out
          </button>
          <Modal
            open={modalOpen}
            // onClose={setSuccess(false)}
            aria-labelledby="modal-modal-title"
            aria-describedby="modal-modal-description">
            <Box sx={style}>
              <div className="md:w-full w-[270px]">
                <Typography id="modal-modal-title" variant="h6" component="h2">
                  Are you sure to proceed order?
                </Typography>
                <Typography component={'div'} id="modal-modal-description" sx={{mt: 2}}>

                  <section className="flex flex-col gap-3 text-blackFactory mb-3 font-semibold">

                    <section className="text-sm flex">
                      <div className="flex flex-col gap-2">
                        <div>Username:
                          {user?.username}
                        </div>
                        <div className={`bg-[#D9D9D9] w-[90%] px-2 py-1 rounded-lg`}>
                          {tempAddress}
                        </div>
                      </div>
                      <div className="flex flex-col gap-2">
                        <div>Phone Number:</div>
                        <div>
                          {user?.phoneNumber}
                        </div>
                      </div>
                    </section>
                    <section className="">
                      {cartItem.map((i) => {
                        return (
                          <>
                            <div className={`text-sm items-center flex gap-x-2`}>
                              <div className="flex items-center">
                                <div className="whitespace-nowrap">{i.qty}</div>
                                <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5}
                                     stroke="currentColor"
                                     className="w-4 h-4">
                                  <path strokeLinecap="round" strokeLinejoin="round" d="M6 18L18 6M6 6l12 12"/>
                                </svg>
                              </div>
                              <div className="flex-1">
                                <div className="w-[70%]">{i.name}</div>
                                <div className="whitespace-nowrap text-redHover">{getType(i?.type)}</div>
                              </div>
                              <div className="text-right ">
                                <div className="whitespace-nowrap">${i.cart_item_price}</div>
                              </div>
                            </div>
                          </>
                        )
                      })}
                    </section>

                    <hr className="border-b-1 border-blackFactory rounded-lg"/>
                    <section className={`text-sm flex justify-between`}>
                      <div>Grand Total</div>
                      <div>
                        ${totalPrice}
                      </div>
                    </section>
                  </section>

                  <section className="flex gap-x-3 justify-center mt-3">
                    <button
                      disabled={!success}
                      className={`${!success && 'bg-tealHover'}
                      flex justify-center gap-x-3 flex-1 transition duration-500 bg-tealActive text-whiteFactory py-2 rounded-md hover:bg-tealHover/80 active:bg-tealActive`}
                      onClick={(e) => {
                        if (token) {
                          if (validateInvoice(e, cartItem, setModalOpen)) {
                            e.stopPropagation();
                            setSuccess(false);
                            checkOut(cartItem, paymentPic, setModalOpen);
                            setPaymentPic('');
                          }
                        }
                      }}>
                      <span>Confirm</span>
                      <div className={`${success && 'hidden'}`}>
                        {!success && <Spinner color="purple" size="md"/>}
                      </div>
                    </button>
                    <button
                      disabled={!success}
                      className={`${!success && 'bg-redHover'}
                      flex-1 transition duration-500 bg-redBase text-whiteFactory py-2 rounded-md hover:bg-redHover active:bg-redActive`}
                      onClick={() => {
                        setModalOpen(false)
                      }}>Cancel
                    </button>
                  </section>

                  <p className="text-xs text-grayFactory text-center mt-3">
                    *Once order is accepted, you cannot cancel it
                  </p>
                </Typography>
              </div>
            </Box>
          </Modal>
        </div>
      </>

    );
  }
}

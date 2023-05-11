import {Fragment, useState} from "react";
import {
  Accordion,
  AccordionHeader,
  AccordionBody,
} from "@material-tailwind/react";

import {useAuthContext} from "../../context/AuthContext.jsx";

export const InvoiceView = (props) => {
  const {id, date, totalPrice, status, address} = props.invoice;
  const [open, setOpen] = useState(1);
  const handleOpen = (value) => {
    setOpen(open === value ? 0 : value);
  };

  return (
    <Fragment>
      <Accordion className="border-2 border-tealActive px-2 rou nded-lg mb-6 shadow-2xl"
                 open={open === props.invoice.id}>
        <AccordionHeader className={`text-[16px] text-blackFactory`} onClick={() => handleOpen(props.invoice.id)}>
          <div className="flex w-full justify-between items-center">
            <div className="font-semibold flex flex-col">
              <div>
                Order ID: {id}
              </div>
              <div>
                Order Date: {date}
              </div>
              <div className="text-tealBase">
                {status === -1 ? 'Pending' : 'Arrived'}
              </div>
            </div>
            <div>
              Total Price: <span className="font-bold text-blueBase">${totalPrice}</span>
            </div>
          </div>
        </AccordionHeader>
        <AccordionBody className="text-blackFactory font-semibold">
          <div className="px-6">
            <div className="flex justify-between mb-3">
              <div className="font-bold">Order ID: {id}</div>
              <div className="text-tealActive">{status === 0 ? 'Pending' : 'Arrived'}</div>
            </div>
            <div className="grid grid-cols-2 pr-12 gap-2 mb-3">
              <div>Order Date: {date}</div>
              <div>Phone Number: {props.invoice.user[0].phoneNumber}
              </div>
              <div>Username: {props.invoice.user[0].username}
              </div>
              <div className={`bg-[#D9D9D9] px-2 py-1 rounded-lg`}>Address: {address}</div>
            </div>
          </div>
          <div className={`accordion-item-body mb-3`}>
            <div>Item
              {
                props.invoice.invoice_product.map((item) => {
                  return (
                    <div>
                      {item.products.map((product) => {
                        return <div>{product.name}</div>
                      })}
                    </div>
                  )
                })
              }
            </div>
            <div>Type
              {
                props.invoice.invoice_product.map((item) => {
                  return (
                    <div>
                      {item.products.map((product) => {
                        return <div>{product.type}</div>
                      })}
                    </div>
                  )
                })
              }</div>
            <div>Qty
              {props.invoice.invoice_product.map((item) => <div>{item.qty}</div>)}
            </div>
            <div>Price
              {
                props.invoice.invoice_product.map((item) => {
                  return (
                    <div>
                      {item.products.map((product) => {
                        return <div>${product.price}</div>
                      })}
                    </div>
                  )
                })
              }</div>
            <div>Total
              {props.invoice.invoice_product.map((item) => <div>${item.cart_item_price}</div>)}
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
            <div>${totalPrice}</div>
          </div>
        </AccordionBody>
      </Accordion>
    </Fragment>
  );
}

import {InvoiceView} from "../../ui/InvoiceView.jsx";
import React, {useContext} from "react";
import {useOutlet, useOutletContext} from "react-router-dom";
import InvoiceContext from "../../../context/InvoiceContext.jsx";

export const InvoiceList = (props) => {
  // const [invoice] = useOutletContext();
  const {invoice} = props;
  // console.log(Object.keys(invoice).length)
      console.log(invoice)
    return (
        <>
          {/*<div>*/}
          {/*  {invoice.status === -2 && "Every orders are currently in stock :)"}*/}
          {/*  {invoice.status === -1 && "No pending orders"}*/}
          {/*  {invoice.status === 1 && "No orders have been accepted"}*/}
          {/*  {invoice.status === 2 && "No orders are being delivered"}*/}
          {/*  {invoice.status === 3 && "No orders have arrived"}*/}
          {/*</div>*/}
          {/*<div>*/}
          {/*  {invoice.status === -2 && "Out of stock"}*/}
          {/*  {invoice.status === -1 && "Pending orders"}*/}
          {/*  {invoice.status === 1 && "Accepted orders"}*/}
          {/*  {invoice.status === 2 && "Delivering"}*/}
          {/*  {invoice.status === 3 && "Arrived"}*/}
          {/*</div>*/}
          <div>
            {/*<InvoiceView key={invoice.id} invoice={invoice}/>*/}
            <InvoiceView invoice={invoice}/>
          </div>
        </>
    );
};

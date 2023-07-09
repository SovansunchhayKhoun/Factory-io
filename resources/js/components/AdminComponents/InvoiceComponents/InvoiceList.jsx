import {InvoiceView} from "../../ui/InvoiceView.jsx";
import React, {useContext} from "react";
import {useOutlet, useOutletContext} from "react-router-dom";
import InvoiceContext from "../../../context/InvoiceContext.jsx";

export const InvoiceList = (props) => {
  // const [invoice] = useOutletContext();
  const {invoice} = props;
    return (
        <>
          <div>
            <InvoiceView invoice={invoice}/>
          </div>
        </>
    );
};

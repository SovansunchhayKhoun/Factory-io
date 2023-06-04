import React, {Fragment, useContext, useEffect, useState} from "react";
import {
  Accordion,
  AccordionHeader,
  AccordionBody,
} from "@material-tailwind/react";

import {AccordionHeaderContent} from "../AdminComponents/AccordionHeaderContent.jsx";
import {AccordionBodyContent} from "../AdminComponents/AccordionBodyContent.jsx";
import {GoogleMapsContext} from "../../context/GoogleMapsContext.jsx";

export const InvoiceView = (props) => {
  const {invoice} = props;
  const {id, invoice_product} = invoice;
  // console.log(invoice_product)
  const [invProd, setInvProd] = useState(invoice_product);
  const [open, setOpen] = useState( 0);
  const handleOpen = (value) => {
    setOpen(open === value ? 0 : value);
  };

  return (
    <Fragment>
      <Accordion className="border-2 border-tealActive px-2 rou nded-lg mb-6 shadow-2xl"
                 open={open === 1}>
        <AccordionHeader className={`text-[16px] text-blackFactory`} onClick={() => handleOpen(1)}>
          <AccordionHeaderContent key={id} invProd={invProd} setInvProd={setInvProd} invoice={props.invoice}/>
        </AccordionHeader>
        <AccordionBody>
          <AccordionBodyContent key={id} invProd={invProd} setInvProd={setInvProd} invoice={props.invoice}/>
        </AccordionBody>
      </Accordion>
    </Fragment>
  );
}

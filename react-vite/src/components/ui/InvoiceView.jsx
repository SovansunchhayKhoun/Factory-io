import React, {Fragment, useContext, useEffect, useState} from "react";
// import {
//   Accordion,
//   AccordionHeader,
//   AccordionBody,
// } from "@material-tailwind/react";

import Accordion from '@mui/material/Accordion';
import AccordionSummary from '@mui/material/AccordionSummary';
import AccordionDetails from '@mui/material/AccordionDetails';
import {AccordionHeaderContent} from "../AdminComponents/AccordionHeaderContent.jsx";
import {AccordionBodyContent} from "../AdminComponents/AccordionBodyContent.jsx";
import {GoogleMapsContext} from "../../context/GoogleMapsContext.jsx";
import Typography from "@mui/material/Typography";

export const InvoiceView = (props) => {
  const {invoice} = props;
  const {id, invoice_product} = invoice;
  // console.log(invoice_product)
  const [invProd, setInvProd] = useState(invoice_product);
  const [open, setOpen] = useState(false);

  return (
    <Fragment>
      <Accordion className="border-2 border-tealActive px-2 rou nded-lg mb-6 shadow-2xl" open={open}>
        {/*<AccordionHeader className={`text-[16px] text-blackFactory`} onClick={event => {event.stopPropagation();setOpen(!open)}}>*/}
        {/*  <Typography variant={"h2"} component={"div"} >*/}
        {/*    /!*<AccordionHeaderContent key={id} invoice={invoice}/>*!/*/}
        {/*  </Typography>*/}
        {/*</AccordionHeader>*/}
        <AccordionSummary aria-controls="order-header"
                          id="order-header">
          <AccordionHeaderContent key={id} invoice={invoice}/>
        </AccordionSummary>
        <AccordionDetails>
          <AccordionBodyContent key={id} invProd={invProd} setInvProd={setInvProd} invoice={invoice}/>
        </AccordionDetails>
        {/*<AccordionBody>*/}
        {/*  <AccordionBodyContent key={id} invProd={invProd} setInvProd={setInvProd} invoice={invoice}/>*/}
        {/*</AccordionBody>*/}
      </Accordion>
    </Fragment>
  );
}

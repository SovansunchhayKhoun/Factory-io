import React, {Fragment, useContext, useState} from "react";
import {
  Accordion,
  AccordionHeader,
  AccordionBody,
} from "@material-tailwind/react";

import {AccordionHeaderContent} from "../AdminComponents/AccordionHeaderContent.jsx";
import {AccordionBodyContent} from "../AdminComponents/AccordionBodyContent.jsx";

export const InvoiceView = (props) => {
  const {id} = props.invoice;
  const [open, setOpen] = useState(1);
  const handleOpen = (value) => {
    setOpen(open === value ? 0 : value);
  };

  return (
    <Fragment>
      <Accordion className="border-2 border-tealActive px-2 rou nded-lg mb-6 shadow-2xl"
                 open={open === id}>
        <AccordionHeader className={`text-[16px] text-blackFactory`} onClick={() => handleOpen(id)}>
          <AccordionHeaderContent invoice={props.invoice}/>
        </AccordionHeader>
        <AccordionBody>
          <AccordionBodyContent invoice={props.invoice}/>
        </AccordionBody>
      </Accordion>
    </Fragment>
  );
}

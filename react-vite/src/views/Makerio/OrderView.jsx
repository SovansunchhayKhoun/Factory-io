import React, {Fragment, useContext, useEffect, useState} from "react";
import InvoiceContext from "../../context/InvoiceContext.jsx";
import {InvoiceView} from "../../components/ui/InvoiceView.jsx";
import {useAuthContext} from "../../context/AuthContext.jsx";
import {Spinner} from "flowbite-react";
import {
  Accordion,
  AccordionHeader,
  AccordionBody,
} from "@material-tailwind/react";
import {Link, Navigate} from "react-router-dom";

export const OrderView = () => {
  const {invoices, isLoading, invoicesReFetch} = useContext(InvoiceContext);
  const {user} = useAuthContext();
  // const {invoices, getInvoices} = useContext(InvoiceContext)
  useEffect(() => {
    invoicesReFetch();
  }, []);

  console.log(invoices);

  const [open, setOpen] = useState(1);
  const handleOpen = (value) => {
    setOpen(open === value ? 0 : value);
  };

  if(!user){
    return (
      <>
        <main>
          <Link to={'/login'}>Sign in</Link>
          <Link to={'/signup'}>Sign Up</Link>
        </main>
      </>
    );
  }

  if (isLoading) {
    return (
      <main>
        <Fragment>
          <Accordion className="bg-[rgba(0,0,0,0.1)] border-2 border-tealActive px-2 rou nded-lg mb-6 shadow-2xl"
                     open={open === 1}>
            <AccordionHeader className={`text-[16px] text-blackFactory`} onClick={() => handleOpen(1)}>
              <div>
                <Spinner
                  size="xl"
                  color="purple"
                  aria-label="Purple spinner example"
                />
                <span className="ml-3 font-semibold">Loading...</span>
              </div>
            </AccordionHeader>
          </Accordion>
        </Fragment>
      </main>
    );
  }

  if(invoices?.filter((invoice) => invoice.user_id === user?.id).length === 0) {
    return (
      <main>
        No orders have been placed yet <Link to={'/maker-io'}></Link>
      </main>
    );
  } else {
    return (
      <>
        {/*{status === -1 && 'Pending'}*/}
        {/*{status === 1 && 'Accepted'}*/}
        {/*{status === 2 && 'Delivering'}*/}
        {/*{status === 3 && 'Arrived'}*/}
        <main>
          Pending
          {invoices?.filter((invoice) => {
            return (invoice.user_id === user?.id && invoice.status === -1)
          }).map((invoice) => <InvoiceView key={invoice.id} invoice={invoice}/>)}

          <div>Accepted</div>
          {invoices?.filter((invoice) => {
            return (invoice.user_id === user?.id && invoice.status === 1)
          }).map((invoice) => <InvoiceView key={invoice.id} invoice={invoice}/>)}

          <div>Delivering</div>
          {invoices?.filter((invoice) => {
            return (invoice.user_id === user?.id && invoice.status === 2)
          }).map((invoice) => <InvoiceView key={invoice.id} invoice={invoice}/>)}

          <div>Arrived</div>
          {invoices?.filter((invoice) => {
            return (invoice.user_id === user?.id && invoice.status === 3)
          }).map((invoice) => <InvoiceView key={invoice.id} invoice={invoice}/>)}

        </main>
      </>
    );
  }

};

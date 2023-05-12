import {Fragment, useContext, useEffect, useState} from "react";
import InvoiceContext from "../../context/InvoiceContext.jsx";
import {InvoiceView} from "../../components/ui/InvoiceView.jsx";
import {useAuthContext} from "../../context/AuthContext.jsx";
import {Spinner} from "flowbite-react";
import {
  Accordion,
  AccordionHeader,
  AccordionBody,
} from "@material-tailwind/react";

export const OrderView = () => {
  const {invoices, isLoading} = useContext(InvoiceContext);
  const {user} = useAuthContext();
  // const {invoices, getInvoices} = useContext(InvoiceContext)
  // useEffect(() => {
  //   getInvoices();
  // }, []);

  const [open, setOpen] = useState(1);
  const handleOpen = (value) => {
    setOpen(open === value ? 0 : value);
  };

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
  return (
    <>
      <main>
        {invoices?.filter((invoice) => invoice.user_id === user?.id).length === 0 && 'No Orders have been placed yet'}
        {invoices?.filter((invoice) => invoice.user_id === user?.id).

        map((invoice) => {
          return <InvoiceView key={invoice.id} invoice={invoice}/>
        })}
      </main>
    </>
  );
};

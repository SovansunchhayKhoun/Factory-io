import {useContext, useEffect} from "react";
import InvoiceContext from "../../context/InvoiceContext.jsx";
import {InvoiceView} from "../../components/ui/InvoiceView.jsx";
import {useAuthContext} from "../../context/AuthContext.jsx";

export const OrderView = () => {
  const {invoices, isLoading} = useContext(InvoiceContext);
  const {user} = useAuthContext();
  // const {invoices, getInvoices} = useContext(InvoiceContext)
  // useEffect(() => {
  //   getInvoices();
  // }, []);

  if (isLoading) {
    return <div>Loading...</div>
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

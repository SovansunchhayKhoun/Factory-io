import {useContext, useEffect} from "react";
import InvoiceContext from "../../context/InvoiceContext.jsx";
import {brown} from "@mui/material/colors";
import InvoiceProductContext from "../../context/InvoiceProduct.jsx";

export const OrderView = () => {
  const {invoices, getInvoices} = useContext(InvoiceContext)
  const {invoiceProducts, getInvoiceProducts} = useContext(InvoiceProductContext);
  useEffect(() => {
    getInvoices();
    getInvoiceProducts();
  }, []);

  return (
    <>
      <main>
        {/*{invoices.map((invoice) => {*/}
        {/* return (*/}
        {/*   <>*/}
        {/*     <div key={invoice.id}>*/}
        {/*       ID: {invoice.id} <br/>*/}
        {/*       Total Price: {invoice.totalPrice} <br/>*/}
        {/*       Created at: {invoice.date} <br/>*/}
        {/*       Status: {invoice.status === 0 ? "Pending" : "Paid"} <br/>*/}
        {/*       Address: {invoice.address}*/}
        {/*     </div>*/}
        {/*     <br/>*/}
        {/*   </>*/}
        {/* );*/}
        {/*})}*/}

        {invoiceProducts.map((invoiceProduct) => {
          return (
            <>
              <div>
                {invoiceProduct.product_id}
              </div>
            </>
          );
        })}
      </main>
    </>
  );
};

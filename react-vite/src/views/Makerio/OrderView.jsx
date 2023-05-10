import {useContext, useEffect} from "react";
import InvoiceContext from "../../context/InvoiceContext.jsx";
import {brown} from "@mui/material/colors";
import InvoiceProductContext from "../../context/InvoiceProductContext.jsx";
import {isError} from "@tanstack/react-query";
import {dividerClasses} from "@mui/material";

export const OrderView = () => {
  const {invoices, getInvoices} = useContext(InvoiceContext)
  useEffect(() => {
    getInvoices();
  }, []);

  return (
    <>
      <main>
        {invoices.length===0 && <div>No Orders yet</div>}
        {invoices.map((invoice) => {
          return (
            <>
              <li>
                ID: {invoice.id} <br/>
                Total Price: ${invoice.totalPrice} <br/>
                Created at: {invoice.date} <br/>
                Status: {invoice.status === 0 ? "Pending" : "Paid"} <br/>
                Address: {invoice.address} <br/>
                Invoice Product:
                {invoice.invoice_product.
                map((item) =>
                  <div>
                    {item.products.map((product) =>
                      <div>
                        Product Name: {product.name}, Product Price: ${product.price}
                      </div>)}
                    Qty: {item.qty}, Total: ${item.cart_item_price}
                  </div>)}
              </li>
              <br/>
            </>
          );
        })}
      </main>
    </>
  );
};

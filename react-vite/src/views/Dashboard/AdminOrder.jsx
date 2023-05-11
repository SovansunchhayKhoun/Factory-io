import WelcomeBanner from "../../partials/dashboard/WelcomeBanner.jsx";
import CreateItemModal from "../../components/CreateItemModal.jsx";
import {ItemRow} from "../../components/ItemRow.jsx";
import React, {useContext, useEffect, useState} from "react";
import ProductContext from "../../context/ProductContext.jsx";
import InvoiceContext from "../../context/InvoiceContext.jsx";
import {InvoiceView} from "../../components/ui/InvoiceView.jsx";

export const AdminOrder = () => {
  useEffect(() => {
    getItems();
  }, []);
  const {items, getItems} = useContext(ProductContext)
  const [createItemModalOpen, setCreateItemModalOpen] = useState(false)

  const {invoices} = useContext(InvoiceContext);

  return (
    <>
      <div className="px-4 sm:px-6 lg:px-8 py-8 w-full max-w-9xl mx-auto">
        <WelcomeBanner title={`Orders`}/>
        {invoices?.map((invoice) => {
          return (
            <InvoiceView key={invoice.id} invoice={invoice}/>
          );
        })}
      </div>
    </>
  );
};

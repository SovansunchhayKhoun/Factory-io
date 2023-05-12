import WelcomeBanner from "../../partials/dashboard/WelcomeBanner.jsx";
import CreateItemModal from "../../components/Modals/CreateItemModal.jsx";
import {ItemRow} from "../../components/ItemRow.jsx";
import React, {useContext, useEffect, useState} from "react";
import ProductContext from "../../context/ProductContext.jsx";
import InvoiceContext from "../../context/InvoiceContext.jsx";
import {InvoiceView} from "../../components/ui/InvoiceView.jsx";
import {Spinner} from "flowbite-react";

export const AdminOrder = () => {
  const {items, getItems} = useContext(ProductContext)
  const [createItemModalOpen, setCreateItemModalOpen] = useState(false)

  const {invoices, isLoading, refetch} = useContext(InvoiceContext);
  // const [inv, setInv] = useState(invoices);
  // useEffect(() => {
  //   setInv(invoices);
  // }, []);
   useEffect(() => {
      getItems();
    }, []);

  return (
    <>
      <div className="px-4 sm:px-6 lg:px-8 py-8 w-full max-w-9xl mx-auto">
        <WelcomeBanner title={`Orders`}/>
        {isLoading &&
          <Spinner
            size="xl"
            color="purple"
            aria-label="Purple spinner example"
          />}
        {invoices?.filter((inv) => inv.status === -1).length === 0 && "No Pending Orders"}
        {invoices?.filter((inv) => inv.status === -1).
        map((invoice) => {
          return (
            <InvoiceView key={invoice.id} invoice={invoice}/>
          );
        })}
      </div>
    </>
  );
};

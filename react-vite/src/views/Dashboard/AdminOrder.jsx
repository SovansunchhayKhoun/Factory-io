import WelcomeBanner from "../../partials/dashboard/WelcomeBanner.jsx";
import CreateItemModal from "../../components/Modals/CreateItemModal.jsx";
import {ItemRow} from "../../components/ItemRow.jsx";
import React, {useContext, useEffect, useState} from "react";
import ProductContext from "../../context/ProductContext.jsx";
import InvoiceContext from "../../context/InvoiceContext.jsx";
import {InvoiceView} from "../../components/ui/InvoiceView.jsx";
import {Spinner} from "flowbite-react";
import {InvoiceList} from "../../components/AdminComponents/InvoiceComponents/InvoiceList.jsx";
import {Outlet, useParams} from "react-router-dom";

export const AdminOrder = () => {
  const {getItems} = useContext(ProductContext)
  const {invoices, isLoading, invStatus} = useContext(InvoiceContext);
  useEffect(() => {
    getItems();
  }, []);

  return (
    <>
      <div className="px-4 sm:px-6 lg:px-8 py-8 w-full max-w-9xl mx-auto">
        <WelcomeBanner title={invStatus === -1 && 'Pending Orders' ||
          invStatus === -2 && 'No Stock' ||
          invStatus === 1 && 'Accepted Orders' ||
          invStatus === 2 && 'Delivering' ||
          invStatus === 3 && 'Arrived'
        }/>
        {isLoading &&
          <Spinner
            size="xl"
            color="purple"
            aria-label="Purple spinner example"
          />}

        {invoices?.filter(inv => inv.status === invStatus).length === 0 && invStatus === -1 && 'No Pending orders'}
        {invoices?.filter(inv => inv.status === invStatus).length === 0 && invStatus !== -1 && 'Empty orders box'}
        {invoices?.filter(inv => inv.status === invStatus).map(invoice => <InvoiceList key={invoice.id} invoice={invoice}/>)}
      </div>
    </>
  );
};

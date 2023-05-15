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
  let {id} = useParams();
  const {items, getItems} = useContext(ProductContext)
  const [createItemModalOpen, setCreateItemModalOpen] = useState(false)

  const {invoices, isLoading, refetch} = useContext(InvoiceContext);
  useEffect(() => {
    getItems();
  }, []);

  if (id === 'pending') {

  }

  return (
    <>
      <div className="px-4 sm:px-6 lg:px-8 py-8 w-full max-w-9xl mx-auto">
        <WelcomeBanner title={id.toUpperCase() + ' Orders'}/>
        {isLoading &&
          <Spinner
            size="xl"
            color="purple"
            aria-label="Purple spinner example"
          />}

        {invoices?.filter((inv) => {
          switch (id) {
            case 'all':
              return inv.status === -2;
            case 'pending':
              return inv.status === -1;
            case 'accepted':
              return inv.status === 1;
            case 'delivering':
              return inv.status === 2;
            case 'arrived':
              return inv.status === 3;
          }
        }).map((invoice) => {
            return (
              <Outlet context={[invoice]}/>
            );
          })
        }

      </div>
    </>
  );
};

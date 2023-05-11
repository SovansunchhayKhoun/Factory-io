import WelcomeBanner from "../../partials/dashboard/WelcomeBanner.jsx";
import CreateItemModal from "../../components/CreateItemModal.jsx";
import {ItemRow} from "../../components/ItemRow.jsx";
import React, {useContext, useEffect, useState} from "react";
import ProductContext from "../../context/ProductContext.jsx";

export const AdminOrder = () => {
  useEffect(() => {
    getItems();
  }, []);
  const {items, getItems} = useContext(ProductContext)
  const [createItemModalOpen, setCreateItemModalOpen] = useState(false)
    return (
        <>
          <div className="px-4 sm:px-6 lg:px-8 py-8 w-full max-w-9xl mx-auto">
            <WelcomeBanner title={`Orders`}/>

          </div>
        </>
    );
};

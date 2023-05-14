import {createContext, useState} from "react";
import Axios from "axios";
import {useQuery} from "@tanstack/react-query";
import {useParams} from "react-router-dom";

Axios.defaults.baseURL = import.meta.env.VITE_APP_URL;

const InvoiceProductContext = createContext();
export const InvoiceProductProvider = ({children}) => {
  // const [invoiceProducts, setInvoiceProducts] = useState([]);
  // const getInvoiceProducts = async () => {
  //   const apiItem = await Axios.get('invoice_products');
  //   setInvoiceProducts(apiItem.data.data);
  // };

  const {data:invoiceProduct, isLoading, refetch:invoiceProductReFetch} = useQuery(['invoice_products'], () => {
    return Axios.get("invoice_products").then((res) => {
      return res.data.data;
    })
  });

  return (
    <>
      <InvoiceProductContext.Provider value={{
        invoiceProduct,
        isLoading,
        invoiceProductReFetch,
      }}>
        {children}
      </InvoiceProductContext.Provider>
    </>
  );
};

export default InvoiceProductContext;

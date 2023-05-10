import {createContext, useState} from "react";
import Axios from "axios";
import {useQuery} from "@tanstack/react-query";
import {useParams} from "react-router-dom";

Axios.defaults.baseURL = "http://127.0.0.1:8000/api/v1/";

const InvoiceProductContext = createContext();
export const InvoiceProductProvider = ({children}) => {
  // const [invoiceProducts, setInvoiceProducts] = useState([]);
  // const getInvoiceProducts = async () => {
  //   const apiItem = await Axios.get('invoice_products');
  //   setInvoiceProducts(apiItem.data.data);
  // };

  const {data:invoiceProduct, isLoading} = useQuery(['invoice_products'], () => {
    return Axios.get("invoice_products").then((res) => {
      return res.data.data;
    })
  });

  return (
    <>
      <InvoiceProductContext.Provider value={{
        invoiceProduct,
        isLoading,
      }}>
        {children}
      </InvoiceProductContext.Provider>
    </>
  );
};

export default InvoiceProductContext;

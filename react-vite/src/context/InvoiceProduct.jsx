import {createContext, useState} from "react";
import Axios from "axios";

Axios.defaults.baseURL = "http://127.0.0.1:8000/api/v1/";

const InvoiceProductContext = createContext();
export const InvoiceProductProvider = ({children}) => {
  const [invoiceProducts, setInvoiceProducts] = useState([]);
  const getInvoiceProducts = async () => {
    const apiItem = await Axios.get('invoice_products');
    setInvoiceProducts(apiItem.data.data);
  };

  return (
    <>
      <InvoiceProductContext.Provider value={{
        invoiceProducts,
        getInvoiceProducts
      }}>
        {children}
      </InvoiceProductContext.Provider>
    </>
  );
};

export default InvoiceProductContext;

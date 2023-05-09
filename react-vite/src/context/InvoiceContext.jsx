import {createContext, useEffect, useState} from "react";
import Axios from "axios";
Axios.defaults.baseURL = "http://127.0.0.1:8000/api/v1/";

const InvoiceContext = createContext();
export const InvoiceProvider = ({children}) => {
  const [invoices, setInvoices] = useState([]);
  const [invoice, setInvoice] = useState({});
  const [invoiceError, setInvoiceError] = useState("");
  const getInvoices = async () => {
    // const apiItem = axiosClient.get('invoices');
    const apiItem = await Axios.get('invoices');
    setInvoices(apiItem.data.data);
  }

  const getInvoice = async (id) => {
    const apiItem = await Axios.get(`invoices/${id}`);
    setInvoice(invoice);
  };

  const storeInvoice = async (total) => {
    const tempDate = new Date();
    const currentDate = tempDate.getFullYear() + '-' + (tempDate.getMonth() + 1) + '-' + tempDate.getDate() + ' ' + tempDate.getHours() + ':' + tempDate.getMinutes() + ':' + tempDate.getSeconds();
    const invoice = {
      date: currentDate,
      status: 0,
      address: 'Bridge 2, National Road 6A, Sangkat Prek Leap, Khan Chroy Changva, Phnom Penh', //will change soon
      totalPrice: total,
      payment_pic: 'No pic'
    };
    try {
      await Axios.post('invoices', invoice);
      setInvoiceError("Invoice Created");
    } catch (e) {
      setInvoiceError("Cannot Create Invoice")
    }
  }



  return (
    <InvoiceContext.Provider value={{
      invoices,
      storeInvoice,
      invoiceError,
      setInvoiceError,
      getInvoices
    }}>
      {children}
    </InvoiceContext.Provider>
  );
};

export default InvoiceContext;

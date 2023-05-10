import {createContext, useContext, useEffect, useState} from "react";
import Axios from "axios";
import {useQuery} from "@tanstack/react-query";
import {useParams} from "react-router-dom";
import {useAuthContext} from "./AuthContext.jsx";

Axios.defaults.baseURL = "http://127.0.0.1:8000/api/v1/";

const InvoiceContext = createContext();
export const InvoiceProvider = ({children}) => {
  const {data: invoices, isLoading} = useQuery(['invoices'], () => {
    return Axios.get('invoices').then((res) => {
      return res.data.data;
    })
  });

  const {user} = useAuthContext();

  const [invoice, setInvoice] = useState({});
  const [invoiceError, setInvoiceError] = useState("");

  const getInvoice = async (id) => {
    const apiItem = await Axios.get(`invoices/${id}`);
    setInvoice(invoice);
  };

  const storeInvoice = async (total) => {
    const tempDate = new Date();
    const currentDate = tempDate.getFullYear() + '-' + (tempDate.getMonth() + 1) + '-' + tempDate.getDate() + ' ' + tempDate.getHours() + ':' + tempDate.getMinutes() + ':' + tempDate.getSeconds();
    const invoice = {
      user_id: user.id,
      date: currentDate,
      status: 0,
      address: 'Bridge 2, National Road 6A, Sangkat Prek Leap, Khan Chroy Changva, Phnom Penh', //will change soon
      totalPrice: total,
      payment_pic: 'No pic'
    };

    console.log(JSON.stringify(invoice))

    try {
      await Axios.post('invoices', invoice);
    } catch (e) {
      setInvoiceError("Your cart is empty, silly")
      setTimeout(() => {
        setInvoiceError('')
      }, 1500)
    }
  }

  return (
    <InvoiceContext.Provider value={{
      invoices,
      isLoading,
      storeInvoice,
      getInvoice,
    }}>
      {children}
    </InvoiceContext.Provider>
  );
};

export default InvoiceContext;

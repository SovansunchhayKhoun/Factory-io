import {createContext, useContext, useEffect, useState} from "react";
import Axios from "axios";
import {useQuery} from "@tanstack/react-query";
import {useAuthContext} from "./AuthContext.jsx";
import InvoiceProductContext from "./InvoiceProductContext.jsx";

Axios.defaults.baseURL = "http://127.0.0.1:8000/api/v1/";

const InvoiceContext = createContext();
export const InvoiceProvider = ({children}) => {
  const {data: invoices, isLoading, refetch:invoicesReFetch} = useQuery(['invoices'], () => {
    return Axios.get('invoices').then((res) => {
      return res.data.data;
    })
  });

  const {user} = useAuthContext();

  const [invoice, setInvoice] = useState({});
  const [error, setError] = useState([]);

  const getInvoice = async (id) => {
    const apiItem = await Axios.get(`invoices/${id}`);
    setInvoice(apiItem.data.data);
  };

  const storeInvoice = async (total, cartItem) => {
    const tempDate = new Date();
    const currentDate = tempDate.getFullYear() + '-' + (tempDate.getMonth() + 1) + '-' + tempDate.getDate() + ' ' + tempDate.getHours() + ':' + tempDate.getMinutes() + ':' + tempDate.getSeconds();
    const invoice = {
      user_id: user.id,
      date: currentDate,
      status: -1,
      address: 'Bridge 2, National Road 6A, Sangkat Prek Leap, Khan Chroy Changva, Phnom Penh', //will change soon
      totalPrice: total,
      payment_pic: 'No pic',
      item_count: cartItem.length,
    };

    try {
      await Axios.post('invoices', invoice);
    } catch (e) {
      e.response.data.errors.totalPrice[0] = 'You must have at least one item in your cart';
      setError(e.response.data.errors.totalPrice[0]);
      setTimeout(() => {
        setError(['']);
      }, 1500);
    }
  }

  const acceptOrder = async (order) => {
    switch (order.status) {
      case -1:
        order.status = 1;
        break;
      case 1:
        order.status = 2;
        break;
      case 2:
        order.status = 3;
        break;
    }

    try {
      await Axios.patch(`invoices/${order.id}`, order);
      invoicesReFetch();
    } catch (e) {
      console.log(e.response.data.errors)
      setError(e.response.data.errors);
    }
  };

  const declineOrder = async (order) => {
    try {
      await Axios.delete(`invoices/${order.id}`);
      invoicesReFetch();
    } catch (e) {
      console.log(e.response.data.errors);
      setError(e.response.data.errors);
    }
  }

  return (
    <InvoiceContext.Provider value={{
      invoices,
      isLoading,
      invoicesReFetch,
      storeInvoice,
      error,
      setError,
      getInvoice,
      declineOrder,
      acceptOrder
    }}>
      {children}
    </InvoiceContext.Provider>
  );
};

export default InvoiceContext;
